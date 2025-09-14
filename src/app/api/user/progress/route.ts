import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";
import { requireAuth } from "@/lib/auth-utils";

export async function GET(request: NextRequest) {
  try {
    // Check authentication
    const userId = await requireAuth(request);
    if (!userId) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    const userProgress = await prisma.userProgress.findMany({
      where: { userId },
      include: {
        smell: {
          select: {
            id: true,
            title: true,
            category: true,
            description: true,
            difficulty: true,
            tags: true,
            createdAt: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ progress: userProgress });
  } catch (error) {
    console.error("Error fetching progress:", error);
    return NextResponse.json(
      { error: "Failed to fetch progress" },
      { status: 500 }
    );
  }
}

// Add/remove progress
export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const userId = await requireAuth(request);
    if (!userId) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    const body = await request.json();

    const progressSchema = z.object({
      smellId: z.string(),
      action: z.enum(["add", "remove"]),
    });

    const { smellId, action } = progressSchema.parse(body);

    if (action === "add") {
      // Check if already exists
      const existing = await prisma.userProgress.findUnique({
        where: {
          userId_smellId: {
            userId,
            smellId,
          },
        },
      });

      if (existing) {
        return NextResponse.json(
          { error: "Already in progress" },
          { status: 400 }
        );
      }

      // Add to progress
      const userProgress = await prisma.userProgress.create({
        data: {
          userId,
          smellId,
        },
        include: {
          smell: {
            select: {
              id: true,
              title: true,
              category: true,
              description: true,
              difficulty: true,
              tags: true,
            },
          },
        },
      });

      return NextResponse.json({
        message: "Added to progress",
        progress: userProgress,
      });
    } else {
      // Remove from progress
      await prisma.userProgress.deleteMany({
        where: {
          userId,
          smellId,
        },
      });

      return NextResponse.json({
        message: "Removed from progress",
      });
    }
  } catch (error) {
    console.error("Error managing progress:", error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Validation failed", details: error.issues },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Failed to manage progress" },
      { status: 500 }
    );
  }
}
