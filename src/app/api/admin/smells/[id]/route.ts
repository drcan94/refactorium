import { NextRequest, NextResponse } from "next/server";
import { withAdminAuth } from "@/lib/admin-auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const updateSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  category: z.string().optional(),
  difficulty: z.string().optional(),
  tags: z.string().optional(),
  isPublished: z.boolean().optional(),
  problem: z.string().optional(),
  solution: z.string().optional(),
  testing: z.string().optional(),
  examples: z.string().optional(),
  references: z.string().optional(),
  badCode: z.string().optional(),
  goodCode: z.string().optional(),
  testHint: z.string().optional(),
});

async function handler(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;

    if (req.method === "GET") {
      // Get single smell
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
    }

    if (req.method === "PATCH") {
      // Update smell
      const body = await req.json();
      const updateData = updateSchema.parse(body);

      const updatedSmell = await prisma.smell.update({
        where: { id },
        data: {
          ...updateData,
          category: updateData.category as any,
          difficulty: updateData.difficulty as any,
        },
        include: {
          _count: {
            select: {
              favorites: true,
              progress: true,
            },
          },
        },
      });

      return NextResponse.json(updatedSmell);
    }

    if (req.method === "DELETE") {
      // Delete smell
      await prisma.smell.delete({
        where: { id },
      });

      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
  } catch (error) {
    console.error("Error in admin smell API:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export const GET = withAdminAuth<{ id: string }>(handler);
export const PATCH = withAdminAuth<{ id: string }>(handler);
export const DELETE = withAdminAuth<{ id: string }>(handler);
