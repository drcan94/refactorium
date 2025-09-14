import { DefaultSession } from "next-auth";
import { AppGitHubProfile } from "./github";

interface ExtendedUser {
  id: string;
  githubProfile?: AppGitHubProfile;
  bio?: string | null;
  location?: string | null;
  website?: string | null;
  githubUrl?: string | null;
  linkedinUrl?: string | null;
  twitterUrl?: string | null;
}

declare module "next-auth" {
  interface Session {
    user: ExtendedUser & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    uid: string;
    githubProfile?: AppGitHubProfile;
  }
}
