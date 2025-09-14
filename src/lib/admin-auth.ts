import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { UserRole } from "@prisma/client";

// Admin role kontrolü
export async function isAdmin(userId: string): Promise<boolean> {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { role: true },
    });

    return user?.role === UserRole.ADMIN;
  } catch (error) {
    console.error("Error checking admin role:", error);
    return false;
  }
}

// Moderator veya Admin role kontrolü
export async function isModeratorOrAdmin(userId: string): Promise<boolean> {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { role: true },
    });

    return user?.role === UserRole.ADMIN || user?.role === UserRole.MODERATOR;
  } catch (error) {
    console.error("Error checking moderator/admin role:", error);
    return false;
  }
}

// Admin middleware - API routes için
export function withAdminAuth<T = {}>(
  handler: (
    req: NextRequest,
    context: { params: Promise<T> }
  ) => Promise<NextResponse>
) {
  return async (req: NextRequest, context: { params: Promise<T> }) => {
    try {
      const session = await getServerSession(authOptions);

      if (!session?.user?.id) {
        return NextResponse.json(
          { error: "Unauthorized - No session found" },
          { status: 401 }
        );
      }

      const isUserAdmin = await isAdmin(session.user.id);

      if (!isUserAdmin) {
        return NextResponse.json(
          { error: "Forbidden - Admin access required" },
          { status: 403 }
        );
      }

      return handler(req, context);
    } catch (error) {
      console.error("Admin auth middleware error:", error);
      return NextResponse.json(
        { error: "Internal server error" },
        { status: 500 }
      );
    }
  };
}

// Moderator/Admin middleware - API routes için
export function withModeratorAuth<T = {}>(
  handler: (
    req: NextRequest,
    context: { params: Promise<T> }
  ) => Promise<NextResponse>
) {
  return async (req: NextRequest, context: { params: Promise<T> }) => {
    try {
      const session = await getServerSession(authOptions);

      if (!session?.user?.id) {
        return NextResponse.json(
          { error: "Unauthorized - No session found" },
          { status: 401 }
        );
      }

      const isUserModerator = await isModeratorOrAdmin(session.user.id);

      if (!isUserModerator) {
        return NextResponse.json(
          { error: "Forbidden - Moderator access required" },
          { status: 403 }
        );
      }

      return handler(req, context);
    } catch (error) {
      console.error("Moderator auth middleware error:", error);
      return NextResponse.json(
        { error: "Internal server error" },
        { status: 500 }
      );
    }
  };
}
