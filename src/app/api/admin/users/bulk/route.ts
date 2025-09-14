import { NextRequest, NextResponse } from "next/server";
import { withAdminAuth } from "@/lib/admin-auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";
import { UserRole } from "@prisma/client";

const bulkActionSchema = z.object({
  action: z.enum(["makeAdmin", "makeModerator", "makeUser", "delete"]),
  userIds: z.array(z.string()),
});

async function handler(req: NextRequest, context: { params: Promise<{}> }) {
  try {
    const body = await req.json();
    const { action, userIds } = bulkActionSchema.parse(body);

    if (userIds.length === 0) {
      return NextResponse.json({ error: "No users selected" }, { status: 400 });
    }

    let result;

    switch (action) {
      case "makeAdmin":
        result = await prisma.user.updateMany({
          where: { id: { in: userIds } },
          data: { role: UserRole.ADMIN },
        });
        break;

      case "makeModerator":
        result = await prisma.user.updateMany({
          where: { id: { in: userIds } },
          data: { role: UserRole.MODERATOR },
        });
        break;

      case "makeUser":
        result = await prisma.user.updateMany({
          where: { id: { in: userIds } },
          data: { role: UserRole.USER },
        });
        break;

      case "delete":
        result = await prisma.user.deleteMany({
          where: { id: { in: userIds } },
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
    console.error("Error in bulk user operations:", error);
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid data", details: error.issues },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: "Failed to perform bulk operation" },
      { status: 500 }
    );
  }
}

export const POST = withAdminAuth(handler);
