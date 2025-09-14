import { useQuery } from "@tanstack/react-query";

interface UserFavorites {
  favorites: Array<{ smell: { id: string } }>;
}

interface UserProgress {
  progress: Array<{ smell: { id: string } }>;
}

const fetchUserFavorites = async (): Promise<UserFavorites> => {
  const response = await fetch("/api/user/favorites");
  if (!response.ok) {
    throw new Error("Failed to fetch favorites");
  }
  return response.json();
};

const fetchUserProgress = async (): Promise<UserProgress> => {
  const response = await fetch("/api/user/progress");
  if (!response.ok) {
    throw new Error("Failed to fetch progress");
  }
  return response.json();
};

export const useUserFavorites = (enabled: boolean = true) => {
  return useQuery({
    queryKey: ["user-favorites"],
    queryFn: fetchUserFavorites,
    enabled,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
};

export const useUserProgress = (enabled: boolean = true) => {
  return useQuery({
    queryKey: ["user-progress"],
    queryFn: fetchUserProgress,
    enabled,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
};
