import { NextRequest, NextResponse } from "next/server";
import { withAdminAuth } from "@/lib/admin-auth";
import { prisma } from "@/lib/prisma";

async function handler(req: NextRequest, context: { params: Promise<{}> }) {
  try {
    // Get total smells
    const totalSmells = await prisma.smell.count();

    // Get published vs draft smells
    const publishedSmells = await prisma.smell.count({
      where: { isPublished: true },
    });

    const draftSmells = await prisma.smell.count({
      where: { isPublished: false },
    });

    // Get total users
    const totalUsers = await prisma.user.count();

    // Get active users (users with recent activity - last 30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const activeUsers = await prisma.user.count({
      where: {
        OR: [
          { updatedAt: { gte: thirtyDaysAgo } },
          {
            activities: {
              some: {
                createdAt: { gte: thirtyDaysAgo },
              },
            },
          },
        ],
      },
    });

    // Get total favorites
    const totalFavorites = await prisma.userSmell.count();

    // Get total progress records
    const totalProgress = await prisma.userProgress.count();

    // Get recent activity (last 7 days)
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const recentActivity = await prisma.userActivity.count({
      where: {
        createdAt: { gte: sevenDaysAgo },
      },
    });

    return NextResponse.json({
      totalSmells,
      publishedSmells,
      draftSmells,
      totalUsers,
      activeUsers,
      totalFavorites,
      totalProgress,
      recentActivity,
    });
  } catch (error) {
    console.error("Error fetching admin stats:", error);
    return NextResponse.json(
      { error: "Failed to fetch admin statistics" },
      { status: 500 }
    );
  }
}

export const GET = withAdminAuth(handler);
