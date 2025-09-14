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

    const userSmells = await prisma.userSmell.findMany({
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

    const favorites = userSmells.map((us) => ({
      id: us.id,
      smell: us.smell,
      addedAt: us.createdAt,
    }));

    return NextResponse.json({ favorites });
  } catch (error) {
    console.error("Error fetching favorites:", error);
    return NextResponse.json(
      { error: "Failed to fetch favorites" },
      { status: 500 }
    );
  }
}

// Add/remove favorite
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

    const favoriteSchema = z.object({
      smellId: z.string(),
      action: z.enum(["add", "remove"]),
    });

    const { smellId, action } = favoriteSchema.parse(body);

    if (action === "add") {
      // Check if already exists
      const existing = await prisma.userSmell.findUnique({
        where: {
          userId_smellId: {
            userId,
            smellId,
          },
        },
      });

      if (existing) {
        return NextResponse.json(
          { error: "Already in favorites" },
          { status: 400 }
        );
      }

      // Add to favorites
      const userSmell = await prisma.userSmell.create({
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
        message: "Added to favorites",
        favorite: userSmell,
      });
    } else {
      // Remove from favorites
      await prisma.userSmell.deleteMany({
        where: {
          userId,
          smellId,
        },
      });

      return NextResponse.json({
        message: "Removed from favorites",
      });
    }
  } catch (error) {
    console.error("Error managing favorite:", error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Validation failed", details: error.issues },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Failed to manage favorite" },
      { status: 500 }
    );
  }
}
