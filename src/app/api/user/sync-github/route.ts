import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { isGitHubProfile, convertToAppProfile } from "@/types/github";

export async function POST() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    let githubData: any;

    // GitHub'dan güncel veri çek
    const githubResponse = await fetch("https://api.github.com/user", {
      headers: {
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        Accept: "application/vnd.github.v3+json",
      },
    });

    if (!githubResponse.ok) {
      // Eğer token yoksa, mevcut verileri kullan
      console.log("⚠️ GitHub API token not available, using existing data");
      const existingUser = await prisma.user.findUnique({
        where: { id: session.user.id },
        select: {
          name: true,
          bio: true,
          location: true,
          website: true,
          githubUrl: true,
          twitterUrl: true,
        },
      });

      if (!existingUser) {
        return NextResponse.json({ error: "User not found" }, { status: 404 });
      }

      githubData = {
        name: existingUser.name,
        bio: existingUser.bio,
        location: existingUser.location,
        website: existingUser.website,
        githubUrl: existingUser.githubUrl,
        twitterUrl: existingUser.twitterUrl,
      };

      console.log("🔄 Using existing user data for sync:", githubData);
    } else {
      const rawProfile = await githubResponse.json();

      // Type guard ile GitHub profile'ını kontrol et
      if (!isGitHubProfile(rawProfile)) {
        throw new Error("Invalid GitHub profile data received");
      }

      // GitHub profile'ını AppGitHubProfile'a çevir
      const appProfile = convertToAppProfile(rawProfile);

      console.log("🔄 Fresh GitHub data:", {
        name: appProfile.name,
        bio: appProfile.bio,
        location: appProfile.location,
        blog: appProfile.blog,
        twitter: appProfile.twitter_username,
        html_url: rawProfile.html_url,
      });

      // URL'leri düzgün formatla
      const websiteUrl = appProfile.blog
        ? appProfile.blog.startsWith("http")
          ? appProfile.blog
          : `https://${appProfile.blog}`
        : null;

      const twitterUrl = appProfile.twitter_username
        ? `https://twitter.com/${appProfile.twitter_username}`
        : null;

      githubData = {
        name: appProfile.name || session.user.name,
        bio: appProfile.bio || null,
        location: appProfile.location || null,
        website: websiteUrl,
        githubUrl: rawProfile.html_url || null,
        twitterUrl: twitterUrl,
      };

      console.log("✅ Processed GitHub data:", githubData);
    }

    // Kullanıcı profilini güncelle
    const updatedUser = await prisma.user.update({
      where: { id: session.user.id },
      data: githubData,
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
        bio: true,
        location: true,
        website: true,
        githubUrl: true,
        linkedinUrl: true,
        twitterUrl: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return NextResponse.json({
      message: "Profile synced successfully from GitHub",
      user: updatedUser,
    });
  } catch (error) {
    console.error("❌ Error syncing GitHub profile:", error);
    return NextResponse.json(
      { error: "Failed to sync profile from GitHub" },
      { status: 500 }
    );
  }
}
