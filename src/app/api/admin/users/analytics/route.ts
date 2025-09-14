import { NextRequest, NextResponse } from "next/server";
import { withAdminAuth } from "@/lib/admin-auth";
import { prisma } from "@/lib/prisma";

async function handler(req: NextRequest, context: { params: Promise<{}> }) {
  try {
    // Get total users
    const totalUsers = await prisma.user.count();

    // Get active users (last 30 days)
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

    // Get new users this month
    const thisMonth = new Date();
    thisMonth.setDate(1);
    thisMonth.setHours(0, 0, 0, 0);

    const newUsersThisMonth = await prisma.user.count({
      where: {
        createdAt: { gte: thisMonth },
      },
    });

    // Get users by role
    const usersByRole = await prisma.user.groupBy({
      by: ["role"],
      _count: {
        role: true,
      },
    });

    // Get top users by activity
    const topUsers = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        _count: {
          select: {
            favorites: true,
            progress: true,
            activities: true,
          },
        },
        activities: {
          select: {
            createdAt: true,
          },
          orderBy: {
            createdAt: "desc",
          },
          take: 1,
        },
      },
      orderBy: {
        activities: {
          _count: "desc",
        },
      },
      take: 10,
    });

    // Calculate growth rate (simplified)
    const lastMonth = new Date();
    lastMonth.setMonth(lastMonth.getMonth() - 1);
    lastMonth.setDate(1);
    lastMonth.setHours(0, 0, 0, 0);

    const usersLastMonth = await prisma.user.count({
      where: {
        createdAt: { lt: thisMonth, gte: lastMonth },
      },
    });

    const userGrowthRate =
      usersLastMonth > 0
        ? ((newUsersThisMonth - usersLastMonth) / usersLastMonth) * 100
        : 0;

    // Get user activity over time (last 30 days)
    const activityData = [];
    for (let i = 29; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      date.setHours(0, 0, 0, 0);

      const nextDate = new Date(date);
      nextDate.setDate(nextDate.getDate() + 1);

      const dailyActivity = await prisma.userActivity.count({
        where: {
          createdAt: {
            gte: date,
            lt: nextDate,
          },
        },
      });

      activityData.push({
        date: date.toISOString().split("T")[0],
        count: dailyActivity,
      });
    }

    return NextResponse.json({
      totalUsers,
      activeUsers,
      newUsersThisMonth,
      userGrowthRate: Math.round(userGrowthRate * 100) / 100,
      usersByRole: usersByRole.reduce((acc, item) => {
        acc[item.role] = item._count.role;
        return acc;
      }, {} as Record<string, number>),
      topUsers: topUsers.map((user) => ({
        id: user.id,
        name: user.name || "No Name",
        email: user.email,
        favoritesCount: user._count.favorites,
        progressCount: user._count.progress,
        activitiesCount: user._count.activities,
        lastActive: user.activities[0]?.createdAt || null,
      })),
      activityData,
    });
  } catch (error) {
    console.error("Error fetching user analytics:", error);
    return NextResponse.json(
      { error: "Failed to fetch user analytics" },
      { status: 500 }
    );
  }
}

export const GET = withAdminAuth(handler);
