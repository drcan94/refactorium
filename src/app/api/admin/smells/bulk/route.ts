import { NextRequest, NextResponse } from "next/server";
import { withAdminAuth } from "@/lib/admin-auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const bulkActionSchema = z.object({
  action: z.enum(["publish", "unpublish", "delete", "changeCategory"]),
  smellIds: z.array(z.string()),
  data: z.any().optional(),
});

async function handler(req: NextRequest, context: { params: Promise<{}> }) {
  try {
    const body = await req.json();
    const { action, smellIds, data } = bulkActionSchema.parse(body);

    if (smellIds.length === 0) {
      return NextResponse.json(
        { error: "No smells selected" },
        { status: 400 }
      );
    }

    let result;

    switch (action) {
      case "publish":
        result = await prisma.smell.updateMany({
          where: { id: { in: smellIds } },
          data: { isPublished: true },
        });
        break;

      case "unpublish":
        result = await prisma.smell.updateMany({
          where: { id: { in: smellIds } },
          data: { isPublished: false },
        });
        break;

      case "delete":
        result = await prisma.smell.deleteMany({
          where: { id: { in: smellIds } },
        });
        break;

      case "changeCategory":
        if (!data?.category) {
          return NextResponse.json(
            { error: "Category is required for changeCategory action" },
            { status: 400 }
          );
        }
        result = await prisma.smell.updateMany({
          where: { id: { in: smellIds } },
          data: { category: data.category },
        });
        break;

      default:
        return NextResponse.json({ error: "Invalid action" }, { status: 400 });
    }

    return NextResponse.json({
      success: true,
      affectedCount: result.count,
      action,
    });
  } catch (error) {
    console.error("Error in bulk operations:", error);
    return NextResponse.json(
      { error: "Failed to perform bulk operation" },
      { status: 500 }
    );
  }
}

export const POST = withAdminAuth(handler);
