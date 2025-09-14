import { z } from "zod";
import { Theme, DifficultyLevel, ProfileVisibility } from "@prisma/client";

export const smellSchema = z.object({
  id: z.string(),
  title: z.string(),
  category: z.string(),
  description: z.string(),
  badCode: z.string(),
  goodCode: z.string(),
  testHint: z.string(),
  difficulty: z.number().min(1).max(5),
  tags: z.array(z.string()),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const createSmellSchema = smellSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const userSchema = z.object({
  id: z.string(),
  name: z.string().nullable(),
  email: z.email(),
  emailVerified: z.date().nullable(),
  image: z.string().nullable(),
  bio: z.string().nullable(),
  location: z.string().nullable(),
  website: z.url().nullable().or(z.literal("")),
  githubUrl: z.url().nullable().or(z.literal("")),
  linkedinUrl: z.url().nullable().or(z.literal("")),
  twitterUrl: z.url().nullable().or(z.literal("")),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const updateUserProfileSchema = z.object({
  name: z.string().min(1, "Name is required").max(100, "Name too long"),
  bio: z.string().max(500, "Bio too long").nullable(),
  location: z.string().max(100, "Location too long").nullable(),
  website: z.url("Invalid website URL").nullable().or(z.literal("")),
  linkedinUrl: z.url("Invalid LinkedIn URL").nullable().or(z.literal("")),
  twitterUrl: z.url("Invalid Twitter URL").nullable().or(z.literal("")),
  // githubUrl kaldırıldı - otomatik olarak GitHub'dan gelir
});

export const userPreferencesSchema = z.object({
  id: z.string(),
  userId: z.string(),
  theme: z.enum(["light", "dark", "auto"]),
  language: z.string(),
  defaultDifficulty: z.enum(["all", "beginner", "intermediate", "advanced"]),
  emailUpdates: z.boolean(),
  progressReminders: z.boolean(),
  newSmells: z.boolean(),
  weeklyDigest: z.boolean(),
  profileVisibility: z.enum(["public", "private"]),
  showProgress: z.boolean(),
  allowAnalytics: z.boolean(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const updateUserPreferencesSchema = z.object({
  theme: z.enum(Theme).optional(),
  defaultDifficulty: z.enum(DifficultyLevel).optional(),
  emailUpdates: z.boolean().optional(),
  progressReminders: z.boolean().optional(),
  newSmells: z.boolean().optional(),
  weeklyDigest: z.boolean().optional(),
  profileVisibility: z.enum(ProfileVisibility).optional(),
  showProgress: z.boolean().optional(),
  allowAnalytics: z.boolean().optional(),
});

export const userProgressSchema = z.object({
  id: z.string(),
  userId: z.string(),
  smellId: z.string(),
  completed: z.boolean(),
  createdAt: z.date(),
});

export const userSmellSchema = z.object({
  id: z.string(),
  userId: z.string(),
  smellId: z.string(),
});

export type Smell = z.infer<typeof smellSchema>;
export type CreateSmell = z.infer<typeof createSmellSchema>;
export type User = z.infer<typeof userSchema>;
export type UpdateUserProfile = z.infer<typeof updateUserProfileSchema>;
export type UserPreferences = z.infer<typeof userPreferencesSchema>;
export type UpdateUserPreferences = z.infer<typeof updateUserPreferencesSchema>;
export type UserProgress = z.infer<typeof userProgressSchema>;
export type UserSmell = z.infer<typeof userSmellSchema>;
