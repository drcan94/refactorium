import {
  SmellCategory,
  DifficultyLevel,
  ProfileVisibility,
  Theme,
} from "@prisma/client";

// Smell Categories
export const SMELL_CATEGORIES = [
  { value: SmellCategory.CODE_SMELL, label: "Code Smell" },
  { value: SmellCategory.DESIGN_PATTERN, label: "Design Pattern" },
  { value: SmellCategory.REFACTORING, label: "Refactoring" },
  { value: SmellCategory.PERFORMANCE, label: "Performance" },
  { value: SmellCategory.SECURITY, label: "Security" },
  { value: SmellCategory.MAINTAINABILITY, label: "Maintainability" },
  { value: SmellCategory.READABILITY, label: "Readability" },
  { value: SmellCategory.TESTING, label: "Testing" },
  { value: SmellCategory.ARCHITECTURE, label: "Architecture" },
  { value: SmellCategory.BEST_PRACTICE, label: "Best Practice" },
] as const;

// Difficulty Levels
export const DIFFICULTY_LEVELS = [
  {
    value: DifficultyLevel.BEGINNER,
    label: "Beginner (1⭐)",
    stars: 1,
    color: "green" as const,
  },
  {
    value: DifficultyLevel.EASY,
    label: "Easy (2⭐)",
    stars: 2,
    color: "green" as const,
  },
  {
    value: DifficultyLevel.MEDIUM,
    label: "Medium (3⭐)",
    stars: 3,
    color: "yellow" as const,
  },
  {
    value: DifficultyLevel.HARD,
    label: "Hard (4⭐)",
    stars: 4,
    color: "orange" as const,
  },
  {
    value: DifficultyLevel.EXPERT,
    label: "Expert (5⭐)",
    stars: 5,
    color: "red" as const,
  },
] as const;

// Profile Visibility Options
export const PROFILE_VISIBILITY_OPTIONS = [
  { value: ProfileVisibility.PUBLIC, label: "Public" },
  { value: ProfileVisibility.PRIVATE, label: "Private" },
] as const;

// Theme Options
export const THEME_OPTIONS = [
  { value: Theme.LIGHT, label: "Light" },
  { value: Theme.DARK, label: "Dark" },
  { value: Theme.AUTO, label: "Auto" },
] as const;

// Sort Options
export const SORT_OPTIONS = [
  { value: "title", label: "Title" },
  { value: "difficulty", label: "Difficulty" },
  { value: "popularity", label: "Popularity" },
  { value: "createdAt", label: "Date Added" },
  { value: "updatedAt", label: "Last Updated" },
] as const;

// Sort Order Options
export const SORT_ORDER_OPTIONS = [
  { value: "asc", label: "Ascending" },
  { value: "desc", label: "Descending" },
] as const;

// Helper functions
export const getDifficultyStars = (difficulty: DifficultyLevel): number => {
  const level = DIFFICULTY_LEVELS.find((d) => d.value === difficulty);
  return level?.stars || 1;
};

export const getDifficultyColor = (difficulty: DifficultyLevel): string => {
  const level = DIFFICULTY_LEVELS.find((d) => d.value === difficulty);
  return level?.color || "gray";
};

export const getDifficultyLabel = (difficulty: DifficultyLevel): string => {
  const level = DIFFICULTY_LEVELS.find((d) => d.value === difficulty);
  return level?.label || "Unknown";
};

export const getCategoryLabel = (category: SmellCategory): string => {
  const cat = SMELL_CATEGORIES.find((c) => c.value === category);
  return cat?.label || "Unknown";
};

// For MultiSelect components (string values)
export const SMELL_CATEGORIES_OPTIONS = SMELL_CATEGORIES.map((cat) => ({
  value: cat.value,
  label: cat.label,
}));

export const DIFFICULTY_LEVELS_OPTIONS = DIFFICULTY_LEVELS.map((level) => ({
  value: level.value,
  label: level.label,
}));

export const PROFILE_VISIBILITY_OPTIONS_SELECT = PROFILE_VISIBILITY_OPTIONS.map(
  (opt) => ({
    value: opt.value,
    label: opt.label,
  })
);

export const THEME_OPTIONS_SELECT = THEME_OPTIONS.map((opt) => ({
  value: opt.value,
  label: opt.label,
}));
