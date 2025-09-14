import { NextRequest, NextResponse } from "next/server";
import { withAdminAuth } from "@/lib/admin-auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const querySchema = z.object({
  page: z.string().default("1"),
  limit: z.string().default("10"),
  search: z.string().optional(),
  role: z.string().optional(),
  status: z.string().optional(),
  sortBy: z.string().default("createdAt"),
  sortOrder: z.enum(["asc", "desc"]).default("desc"),
});

async function handler(req: NextRequest, context: { params: Promise<{}> }) {
  try {
    const { searchParams } = new URL(req.url);
    const query = querySchema.parse({
      page: searchParams.get("page"),
      limit: searchParams.get("limit"),
      search: searchParams.get("search"),
      role: searchParams.get("role"),
      status: searchParams.get("status"),
      sortBy: searchParams.get("sortBy"),
      sortOrder: searchParams.get("sortOrder"),
    });

    const page = parseInt(query.page);
    const limit = parseInt(query.limit);
    const offset = (page - 1) * limit;

    // Build where clause
    const where: any = {};

    if (query.search) {
      where.OR = [
        { name: { contains: query.search, mode: "insensitive" } },
        { email: { contains: query.search, mode: "insensitive" } },
      ];
    }

    if (query.role) {
      where.role = query.role;
    }

    if (query.status === "active") {
      // Active users are those with recent activity (last 30 days)
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      where.updatedAt = { gte: thirtyDaysAgo };
    } else if (query.status === "inactive") {
      // Inactive users are those without recent activity
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      where.updatedAt = { lt: thirtyDaysAgo };
    }

    // Build orderBy clause
    let orderBy: any = {};
    switch (query.sortBy) {
      case "name":
        orderBy = { name: query.sortOrder };
        break;
      case "email":
        orderBy = { email: query.sortOrder };
        break;
      case "role":
        orderBy = { role: query.sortOrder };
        break;
      case "createdAt":
      default:
        orderBy = { createdAt: query.sortOrder };
        break;
    }

    // Get users with counts and last activity
    const [users, total] = await Promise.all([
      prisma.user.findMany({
        where,
        orderBy,
        skip: offset,
        take: limit,
        include: {
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
      }),
      prisma.user.count({ where }),
    ]);

    // Transform users to include lastActivity
    const transformedUsers = users.map((user) => ({
      ...user,
      lastActivity: user.activities[0]?.createdAt || null,
    }));

    const totalPages = Math.ceil(total / limit);

    return NextResponse.json({
      users: transformedUsers,
      total,
      page,
      limit,
      totalPages,
    });
  } catch (error) {
    console.error("Error fetching admin users:", error);
    return NextResponse.json(
      { error: "Failed to fetch users" },
      { status: 500 }
    );
  }
}

export const GET = withAdminAuth(handler);
