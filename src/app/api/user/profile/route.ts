import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { updateUserProfileSchema } from "@/lib/schemas";
import { UserProfileResponse } from "@/lib/types";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      include: {
        preferences: true,
      },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const response: UserProfileResponse = { user };
    return NextResponse.json(response);
  } catch (error) {
    console.error("Error fetching user profile:", error);
    return NextResponse.json(
      { error: "Failed to fetch user profile" },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const validatedData = updateUserProfileSchema.parse(body);

    // Convert empty strings to null for optional fields
    // GitHub URL'ini güncelleme - sadece GitHub'dan gelir
    const updateData = {
      name: validatedData.name,
      bio: validatedData.bio === "" ? null : validatedData.bio,
      location: validatedData.location === "" ? null : validatedData.location,
      website: validatedData.website === "" ? null : validatedData.website,
      linkedinUrl:
        validatedData.linkedinUrl === "" ? null : validatedData.linkedinUrl,
      twitterUrl:
        validatedData.twitterUrl === "" ? null : validatedData.twitterUrl,
      // githubUrl'yi dahil etme - otomatik olarak GitHub'dan gelir
    };

    const updatedUser = await prisma.user.update({
      where: { id: session.user.id },
      data: updateData,
      include: {
        preferences: true,
      },
    });

    const response: UserProfileResponse = { user: updatedUser };
    return NextResponse.json(response);
  } catch (error) {
    if (error instanceof Error && error.name === "ZodError") {
      return NextResponse.json(
        { error: "Invalid input data", details: error.message },
        { status: 400 }
      );
    }

    console.error("Error updating user profile:", error);
    return NextResponse.json(
      { error: "Failed to update user profile" },
      { status: 500 }
    );
  }
}
