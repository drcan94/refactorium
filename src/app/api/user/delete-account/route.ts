import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";

export async function DELETE() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = session.user.id;

    // Delete user and all related data (Cascade will handle related records)
    await prisma.user.delete({
      where: { id: userId },
    });

    console.log("✅ User deleted successfully:", userId);

    // Clear all cookies
    const cookieStore = await cookies();

    // Clear NextAuth cookies
    cookieStore.delete("next-auth.session-token");
    cookieStore.delete("next-auth.csrf-token");
    cookieStore.delete("next-auth.callback-url");

    // Clear any other cookies
    const allCookies = cookieStore.getAll();
    allCookies.forEach((cookie: any) => {
      cookieStore.delete(cookie.name);
    });

    console.log("✅ All cookies cleared");

    return NextResponse.json({
      message: "Account deleted successfully",
      clearStorage: true, // Signal to frontend to clear localStorage
    });
  } catch (error) {
    console.error("❌ Error deleting account:", error);
    return NextResponse.json(
      { error: "Failed to delete account" },
      { status: 500 }
    );
  }
}
