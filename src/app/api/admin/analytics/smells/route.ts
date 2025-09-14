import { NextRequest, NextResponse } from "next/server";
import { withAdminAuth } from "@/lib/admin-auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const querySchema = z.object({
  timeRange: z.string().default("30d"),
});

async function handler(req: NextRequest, context: { params: Promise<{}> }) {
  try {
    const { searchParams } = new URL(req.url);
    const query = querySchema.parse({
      timeRange: searchParams.get("timeRange"),
    });

    // Calculate date range
    const now = new Date();
    let startDate = new Date();
    
    switch (query.timeRange) {
      case "7d":
        startDate.setDate(now.getDate() - 7);
        break;
      case "30d":
        startDate.setDate(now.getDate() - 30);
        break;
      case "90d":
        startDate.setDate(now.getDate() - 90);
        break;
      case "1y":
        startDate.setFullYear(now.getFullYear() - 1);
        break;
      default:
        startDate.setDate(now.getDate() - 30);
    }

    startDate.setHours(0, 0, 0, 0);

    // Get smells by category
    const smellsByCategory = await prisma.smell.groupBy({
      by: ["category"],
      _count: {
        category: true,
      },
    });

    // Get smells by difficulty
    const smellsByDifficulty = await prisma.smell.groupBy({
      by: ["difficulty"],
      _count: {
        difficulty: true,
      },
    });

    // Get popular smells (by favorites and progress)
    const popularSmells = await prisma.smell.findMany({
      select: {
        id: true,
        title: true,
        _count: {
          select: {
            favorites: true,
            progress: true,
          },
        },
      },
      orderBy: [
        { favorites: { _count: "desc" } },
        { progress: { _count: "desc" } },
      ],
      take: 20,
    });

    // Get smells created over time
    const smellsOverTime = [];
    const daysDiff = Math.ceil((now.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
    
    for (let i = daysDiff; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      date.setHours(0, 0, 0, 0);
      
      const nextDate = new Date(date);
      nextDate.setDate(nextDate.getDate() + 1);

      const dailySmells = await prisma.smell.count({
        where: {
          createdAt: {
            gte: date,
            lt: nextDate,
          },
        },
      });

      smellsOverTime.push({
        date: date.toISOString().split('T')[0],
        count: dailySmells,
      });
    }

    // Get smells by publication status
    const publishedSmells = await prisma.smell.count({
      where: { isPublished: true },
    });

    const draftSmells = await prisma.smell.count({
      where: { isPublished: false },
    });

    // Get most active categories (by user interactions)
    const categoryActivity = await prisma.smell.findMany({
      select: {
        category: true,
        _count: {
          select: {
            favorites: true,
            progress: true,
          },
        },
      },
    });

    const categoryStats = categoryActivity.reduce((acc, smell) => {
      if (!acc[smell.category]) {
        acc[smell.category] = {
          favorites: 0,
          progress: 0,
        };
      }
      acc[smell.category].favorites += smell._count.favorites;
      acc[smell.category].progress += smell._count.progress;
      return acc;
    }, {} as Record<string, { favorites: number; progress: number }>);

    return NextResponse.json({
      smellsByCategory: smellsByCategory.reduce((acc, item) => {
        acc[item.category] = item._count.category;
        return acc;
      }, {} as Record<string, number>),
      smellsByDifficulty: smellsByDifficulty.reduce((acc, item) => {
        acc[item.difficulty] = item._count.difficulty;
        return acc;
      }, {} as Record<string, number>),
      popularSmells: popularSmells.map((smell) => ({
        id: smell.id,
        title: smell.title,
        favorites: smell._count.favorites,
        progress: smell._count.progress,
      })),
      smellsOverTime,
      publishedSmells,
      draftSmells,
      categoryStats,
    });
  } catch (error) {
    console.error("Error fetching smell analytics:", error);
    return NextResponse.json(
      { error: "Failed to fetch smell analytics" },
      { status: 500 }
    );
  }
}

export const GET = withAdminAuth(handler);
