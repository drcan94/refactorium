import {
  Smell,
  User,
  UserPreferences,
  UserSmell,
  UserProgress,
  UserActivity,
  SmellCategory,
  DifficultyLevel,
  ProfileVisibility,
  Theme,
  UserRole,
} from "@prisma/client";

// Base Prisma types
export type {
  Smell,
  User,
  UserPreferences,
  UserSmell,
  UserProgress,
  UserActivity,
} from "@prisma/client";

// Export enums directly
export {
  SmellCategory,
  DifficultyLevel,
  ProfileVisibility,
  Theme,
  UserRole,
} from "@prisma/client";

// Extended types with relations
export type SmellWithCounts = Smell & {
  _count: {
    favorites: number;
    progress: number;
  };
};

export type UserWithProfile = User & {
  preferences?: UserPreferences | null;
};

export type UserWithCounts = User & {
  _count: {
    favorites: number;
    progress: number;
  };
};

export type UserWithDetails = User & {
  preferences?: UserPreferences | null;
  favorites?: UserSmellWithDetails[];
  progress?: UserProgressWithDetails[];
  _count: {
    favorites: number;
    progress: number;
  };
};

// API Response types
export type SmellsResponse = {
  smells: SmellWithCounts[];
  total: number;
  page: number;
  limit: number;
};

export type UserProfileResponse = {
  user: UserWithProfile;
};

export type UserPreferencesResponse = {
  preferences: UserPreferences;
};

export type UserFavoritesResponse = {
  favorites: SmellWithCounts[];
  total: number;
};

export type UserSmellWithDetails = UserSmell & {
  smell: SmellWithCounts;
};

export type UserProgressWithDetails = UserProgress & {
  smell: SmellWithCounts;
};

export type UserProgressResponse = {
  progress: UserProgressWithDetails[];
  total: number;
};

// Form types
export type UpdateUserProfileData = {
  name: string;
  bio?: string | null;
  location?: string | null;
  website?: string | null;
  linkedinUrl?: string | null;
  twitterUrl?: string | null;
};

export type UpdateUserPreferencesData = {
  theme?: Theme;
  defaultDifficulty?: DifficultyLevel | null;
  emailUpdates?: boolean;
  progressReminders?: boolean;
  newSmells?: boolean;
  weeklyDigest?: boolean;
  profileVisibility?: ProfileVisibility;
  showProgress?: boolean;
  allowAnalytics?: boolean;
};

// Filter types
export type SmellFilters = {
  search?: string;
  categories?: SmellCategory[];
  difficulties?: DifficultyLevel[];
  sortBy?:
    | "title"
    | "difficulty"
    | "popularity"
    | "createdAt"
    | "updatedAt"
    | "category";
  sortOrder?: "asc" | "desc";
  page?: number;
  limit?: number;
};

// Session types
export type SessionUser = {
  id: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
  bio?: string | null;
  location?: string | null;
  website?: string | null;
  githubUrl?: string | null;
  linkedinUrl?: string | null;
  twitterUrl?: string | null;
};

export type AppSession = {
  user: SessionUser;
  expires: string;
};

// GitHub types
export type GitHubProfile = {
  id: number;
  login: string;
  name: string | null;
  email: string | null;
  bio: string | null;
  avatar_url: string;
  html_url: string;
  location: string | null;
  blog: string | null;
  twitter_username: string | null;
  followers: number;
  following: number;
  public_repos: number;
  created_at: string;
  updated_at: string;
};

export type AppGitHubProfile = {
  id: number;
  login: string;
  name: string | null;
  email: string | null;
  bio: string | null;
  avatar_url: string;
  html_url: string;
  location: string | null;
  blog: string | null;
  twitter_username: string | null;
  followers: number;
  following: number;
  public_repos: number;
  created_at: string;
  updated_at: string;
};

// Utility types
export type ApiResponse<T> = {
  data?: T;
  error?: string;
  message?: string;
};

export type PaginatedResponse<T> = {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
};

// Component props types
export type SmellCardProps = {
  smell: SmellWithCounts;
  isFavorited?: boolean;
  onFavoriteToggle?: (smellId: string) => void;
  isLoading?: boolean;
};

export type FilterState = {
  search: string;
  categories: SmellCategory[];
  difficulties: DifficultyLevel[];
  sortBy:
    | "title"
    | "difficulty"
    | "popularity"
    | "createdAt"
    | "updatedAt"
    | "category";
  sortOrder: "asc" | "desc";
};

// Admin Panel Types
export type AdminUser = User & {
  _count: {
    favorites: number;
    progress: number;
    activities: number;
  };
  lastActivity?: Date;
};

export type AdminSmell = Smell & {
  _count: {
    favorites: number;
    progress: number;
  };
  author?: {
    id: string;
    name: string;
    email: string;
  };
};

export type AdminSmellForm = {
  title: string;
  description: string;
  category: SmellCategory;
  difficulty: DifficultyLevel;
  tags: string;
  problem?: string;
  solution?: string;
  testing?: string;
  examples?: string;
  references?: string;
  badCode: string;
  goodCode: string;
  testHint: string;
  isPublished: boolean;
};

export type SystemAnalytics = {
  smells: {
    total: number;
    published: number;
    draft: number;
    byCategory: Record<SmellCategory, number>;
    byDifficulty: Record<DifficultyLevel, number>;
  };
  users: {
    total: number;
    active: number;
    newThisMonth: number;
    growthRate: number;
  };
  interactions: {
    totalFavorites: number;
    totalProgress: number;
    totalViews: number;
    popularSmells: Array<{
      id: string;
      title: string;
      views: number;
      favorites: number;
    }>;
  };
  performance: {
    averageLoadTime: number;
    errorRate: number;
    uptime: number;
  };
};

export type UserAnalytics = {
  totalUsers: number;
  activeUsers: number;
  newUsersThisMonth: number;
  userGrowthRate: number;
  topUsers: Array<{
    id: string;
    name: string;
    email: string;
    favoritesCount: number;
    progressCount: number;
    lastActive: Date;
  }>;
};

export type BulkOperation = {
  action: "publish" | "unpublish" | "delete" | "changeCategory";
  smellIds: string[];
  data?: any;
};
