import { NextRequest, NextResponse } from "next/server";
import { withAdminAuth } from "@/lib/admin-auth";
import { prisma } from "@/lib/prisma";

async function handler(req: NextRequest, context: { params: Promise<{}> }) {
  try {
    // Get system performance metrics
    const totalSmells = await prisma.smell.count();
    const totalUsers = await prisma.user.count();
    const totalFavorites = await prisma.userSmell.count();
    const totalProgress = await prisma.userProgress.count();
    const totalActivities = await prisma.userActivity.count();

    // Get recent activity (last 24 hours)
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    const recentActivity = await prisma.userActivity.count({
      where: {
        createdAt: { gte: yesterday },
      },
    });

    // Get user engagement metrics
    const activeUsers = await prisma.user.count({
      where: {
        OR: [
          { updatedAt: { gte: yesterday } },
          {
            activities: {
              some: {
                createdAt: { gte: yesterday },
              },
            },
          },
        ],
      },
    });

    // Get content creation metrics
    const smellsThisWeek = await prisma.smell.count({
      where: {
        createdAt: {
          gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
        },
      },
    });

    const smellsThisMonth = await prisma.smell.count({
      where: {
        createdAt: {
          gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
        },
      },
    });

    // Get user growth metrics
    const usersThisWeek = await prisma.user.count({
      where: {
        createdAt: {
          gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
        },
      },
    });

    const usersThisMonth = await prisma.user.count({
      where: {
        createdAt: {
          gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
        },
      },
    });

    // Get most active time periods
    const hourlyActivity = [];
    for (let hour = 0; hour < 24; hour++) {
      const startHour = new Date();
      startHour.setHours(hour, 0, 0, 0);
      const endHour = new Date();
      endHour.setHours(hour + 1, 0, 0, 0);

      const activityCount = await prisma.userActivity.count({
        where: {
          createdAt: {
            gte: startHour,
            lt: endHour,
          },
        },
      });

      hourlyActivity.push({
        hour,
        count: activityCount,
      });
    }

    // Get error rates (simplified - in a real app, you'd track actual errors)
    const errorRate = 0.02; // 2% error rate (placeholder)

    // Get average response time (placeholder)
    const averageResponseTime = 150; // 150ms (placeholder)

    // Get system uptime (placeholder)
    const uptime = 99.9; // 99.9% uptime (placeholder)

    return NextResponse.json({
      performance: {
        averageLoadTime: averageResponseTime,
        errorRate: errorRate,
        uptime: uptime,
      },
      engagement: {
        totalUsers,
        activeUsers,
        recentActivity,
        userEngagementRate:
          totalUsers > 0 ? (activeUsers / totalUsers) * 100 : 0,
      },
      content: {
        totalSmells,
        smellsThisWeek,
        smellsThisMonth,
        contentCreationRate: smellsThisWeek / 7, // smells per day
      },
      growth: {
        usersThisWeek,
        usersThisMonth,
        userGrowthRate:
          usersThisMonth > 0 ? (usersThisWeek / usersThisMonth) * 100 : 0,
      },
      activity: {
        totalFavorites,
        totalProgress,
        totalActivities,
        hourlyActivity,
      },
    });
  } catch (error) {
    console.error("Error fetching system analytics:", error);
    return NextResponse.json(
      { error: "Failed to fetch system analytics" },
      { status: 500 }
    );
  }
}

export const GET = withAdminAuth(handler);
