import { NextAuthOptions } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import GitHubProvider from "next-auth/providers/github";
import { prisma } from "./prisma";
import { isGitHubProfile, convertToAppProfile } from "@/types/github";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
      allowDangerousEmailAccountLinking: true,
      authorization: {
        params: {
          scope: "read:user user:email",
        },
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account?.provider === "github" && isGitHubProfile(profile)) {
        try {
          // GitHub profile'ını AppGitHubProfile'a çevir
          const appProfile = convertToAppProfile(profile);

          console.log("🔄 Processing GitHub profile:", {
            email: user.email,
            name: appProfile.name,
            avatar: appProfile.avatar_url,
            bio: appProfile.bio,
            location: appProfile.location,
            blog: appProfile.blog,
            twitter: appProfile.twitter_username,
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

          console.log("✅ Processed URLs:", {
            websiteUrl,
            twitterUrl,
            githubUrl: profile.html_url,
          });

          // Kullanıcıyı veritabanında güncelle/oluştur
          await prisma.user.upsert({
            where: { email: user.email! },
            update: {
              name: appProfile.name || user.name,
              image: appProfile.avatar_url || user.image,
              bio: appProfile.bio,
              location: appProfile.location,
              website: websiteUrl,
              githubUrl: profile.html_url,
              twitterUrl: twitterUrl,
            },
            create: {
              email: user.email!,
              name: appProfile.name || user.name,
              image: appProfile.avatar_url || user.image,
              bio: appProfile.bio,
              location: appProfile.location,
              website: websiteUrl,
              githubUrl: profile.html_url,
              twitterUrl: twitterUrl,
            },
          });
        } catch (error) {
          console.error("❌ Error updating user profile from GitHub:", error);
        }
      }
      return true;
    },
    async jwt({ token, user, account, profile }) {
      if (account?.provider === "github" && profile) {
        // Type-safe GitHub profile handling
        if (isGitHubProfile(profile)) {
          token.githubProfile = convertToAppProfile(profile);
        } else {
          console.warn(
            "Received non-GitHub profile for GitHub provider:",
            profile
          );
        }
      }

      if (user) {
        token.uid = user.id;
        token.sub = user.id;
      }

      return token;
    },
    session: async ({ session, token }) => {
      if (session?.user && token?.sub) {
        session.user.id = token.sub;

        // Veritabanından güncel kullanıcı bilgilerini çek
        try {
          console.log("🔍 Fetching user data for session:", token.sub);
          const dbUser = await prisma.user.findUnique({
            where: { id: token.sub },
            select: {
              name: true,
              email: true,
              image: true,
              bio: true,
              location: true,
              website: true,
              githubUrl: true,
              linkedinUrl: true,
              twitterUrl: true,
            },
          });

          console.log("📊 Database user data:", dbUser);

          if (dbUser) {
            // Session'daki user bilgilerini veritabanından gelen bilgilerle güncelle
            session.user.name = dbUser.name;
            session.user.email = dbUser.email;
            session.user.image = dbUser.image;
            // Ek bilgileri session'a ekle
            session.user.bio = dbUser.bio;
            session.user.location = dbUser.location;
            session.user.website = dbUser.website;
            session.user.githubUrl = dbUser.githubUrl;
            session.user.linkedinUrl = dbUser.linkedinUrl;
            session.user.twitterUrl = dbUser.twitterUrl;

            console.log("✅ Updated session user:", {
              name: session.user.name,
              email: session.user.email,
              bio: session.user.bio,
              location: session.user.location,
              website: session.user.website,
              githubUrl: session.user.githubUrl,
              twitterUrl: session.user.twitterUrl,
            });
          } else {
            console.log("❌ No user found in database for ID:", token.sub);
          }
        } catch (error) {
          console.error("❌ Error fetching user data for session:", error);
        }

        // GitHub profile bilgilerini session'a ekle
        if (token.githubProfile) {
          session.user.githubProfile = token.githubProfile;
          console.log(
            "🔗 Added GitHub profile to session:",
            token.githubProfile
          );
        }
      }
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/auth/signin",
  },
};
