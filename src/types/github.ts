// GitHub API response types
export interface GitHubProfile {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  gravatar_id: string | null;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: string;
  site_admin: boolean;
  name: string | null;
  company: string | null;
  blog: string | null;
  location: string | null;
  email: string | null;
  hireable: boolean | null;
  bio: string | null;
  twitter_username: string | null;
  public_repos: number;
  public_gists: number;
  followers: number;
  following: number;
  created_at: string;
  updated_at: string;
}

// Simplified version for our app
export interface AppGitHubProfile {
  login: string;
  name: string | null;
  email: string | null;
  avatar_url: string;
  bio: string | null;
  location: string | null;
  blog: string | null;
  twitter_username: string | null;
  public_repos: number;
  followers: number;
  following: number;
}

// Type guard to check if profile is GitHub profile
export function isGitHubProfile(profile: unknown): profile is GitHubProfile {
  return (
    typeof profile === "object" &&
    profile !== null &&
    "login" in profile &&
    "avatar_url" in profile &&
    typeof (profile as any).login === "string"
  );
}

// Convert GitHub API profile to our app profile
export function convertToAppProfile(profile: GitHubProfile): AppGitHubProfile {
  return {
    login: profile.login,
    name: profile.name,
    email: profile.email,
    avatar_url: profile.avatar_url,
    bio: profile.bio,
    location: profile.location,
    blog: profile.blog,
    twitter_username: profile.twitter_username,
    public_repos: profile.public_repos,
    followers: profile.followers,
    following: profile.following,
  };
}
