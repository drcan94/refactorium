import { NextRequest, NextResponse } from "next/server";
import { withAdminAuth } from "@/lib/admin-auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";
import { UserRole } from "@prisma/client";

const updateSchema = z.object({
  name: z.string().optional(),
  email: z.string().email().optional(),
  role: z.nativeEnum(UserRole).optional(),
  bio: z.string().optional(),
  location: z.string().optional(),
  website: z.string().optional(),
  githubUrl: z.string().optional(),
  linkedinUrl: z.string().optional(),
  twitterUrl: z.string().optional(),
});

async function handler(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;

    if (req.method === "GET") {
      // Get single user
      const user = await prisma.user.findUnique({
        where: { id },
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
      });

      if (!user) {
        return NextResponse.json({ error: "User not found" }, { status: 404 });
      }

      return NextResponse.json({
        ...user,
        lastActivity: user.activities[0]?.createdAt || null,
      });
    }

    if (req.method === "PATCH") {
      // Update user
      const body = await req.json();
      const updateData = updateSchema.parse(body);

      const updatedUser = await prisma.user.update({
        where: { id },
        data: updateData,
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
      });

      return NextResponse.json({
        ...updatedUser,
        lastActivity: updatedUser.activities[0]?.createdAt || null,
      });
    }

    if (req.method === "DELETE") {
      // Delete user
      await prisma.user.delete({
        where: { id },
      });

      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
  } catch (error) {
    console.error("Error in admin user API:", error);
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid data", details: error.issues },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export const GET = withAdminAuth<{ id: string }>(handler);
export const PATCH = withAdminAuth<{ id: string }>(handler);
export const DELETE = withAdminAuth<{ id: string }>(handler);
