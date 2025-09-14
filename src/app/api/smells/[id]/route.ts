import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";
import { DifficultyLevel, SmellCategory } from "@prisma/client";

const paramsSchema = z.object({
  id: z.string(),
});

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params;
    const { id } = paramsSchema.parse(resolvedParams);

    const smell = await prisma.smell.findUnique({
      where: { id },
      include: {
        _count: {
          select: {
            favorites: true,
            progress: true,
          },
        },
      },
    });

    if (!smell) {
      return NextResponse.json({ error: "Smell not found" }, { status: 404 });
    }

    return NextResponse.json(smell);
  } catch (error) {
    console.error("Error fetching smell:", error);

    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Invalid smell ID" }, { status: 400 });
    }

    return NextResponse.json(
      { error: "Failed to fetch smell" },
      { status: 500 }
    );
  }
}

// Update smell (admin only)
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params;
    const { id } = paramsSchema.parse(resolvedParams);
    const body = await request.json();

    const smellSchema = z.object({
      title: z.string().min(1).max(100).optional(),
      category: z.nativeEnum(SmellCategory).optional(),
      description: z.string().min(1).optional(),
      badCode: z.string().min(1).optional(),
      goodCode: z.string().min(1).optional(),
      testHint: z.string().min(1).optional(),
      difficulty: z.nativeEnum(DifficultyLevel).optional(),
      tags: z.string().optional(),
    });

    const validatedData = smellSchema.parse(body);

    const smell = await prisma.smell.update({
      where: { id },
      data: validatedData,
    });

    return NextResponse.json(smell);
  } catch (error) {
    console.error("Error updating smell:", error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Validation failed", details: error.issues },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Failed to update smell" },
      { status: 500 }
    );
  }
}

// Delete smell (admin only)
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params;
    const { id } = paramsSchema.parse(resolvedParams);

    await prisma.smell.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting smell:", error);

    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Invalid smell ID" }, { status: 400 });
    }

    return NextResponse.json(
      { error: "Failed to delete smell" },
      { status: 500 }
    );
  }
}
