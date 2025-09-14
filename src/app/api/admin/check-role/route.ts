import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { isAdmin, isModeratorOrAdmin } from "@/lib/admin-auth";

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json(
        {
          isAdmin: false,
          isModerator: false,
          error: "No session found",
        },
        { status: 401 }
      );
    }

    const [adminStatus, moderatorStatus] = await Promise.all([
      isAdmin(session.user.id),
      isModeratorOrAdmin(session.user.id),
    ]);

    return NextResponse.json({
      isAdmin: adminStatus,
      isModerator: moderatorStatus,
      userId: session.user.id,
    });
  } catch (error) {
    console.error("Error checking user role:", error);
    return NextResponse.json(
      {
        isAdmin: false,
        isModerator: false,
        error: "Internal server error",
      },
      { status: 500 }
    );
  }
}
