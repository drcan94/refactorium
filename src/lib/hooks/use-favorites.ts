import { useMutation, useQueryClient } from "@tanstack/react-query";
import { notifications } from "@mantine/notifications";

interface FavoriteAction {
  smellId: string;
  action: "add" | "remove";
}

const updateFavorite = async (data: FavoriteAction) => {
  const response = await fetch("/api/user/favorites", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Failed to update favorites");
  }

  return response.json();
};

export const useFavoriteMutation = (smellId?: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateFavorite,
    onMutate: async (variables) => {
      const { smellId, action } = variables;

      // Cancel any outgoing refetches
      await queryClient.cancelQueries({ queryKey: ["user-favorites"] });
      await queryClient.cancelQueries({ queryKey: ["smells"] });

      // Snapshot the previous value
      const previousFavorites = queryClient.getQueryData(["user-favorites"]);
      const previousSmells = queryClient.getQueryData(["smells"]);

      // Optimistically update favorites
      queryClient.setQueryData(["user-favorites"], (old: any) => {
        if (!old) return old;

        const favorites = new Set(
          old.favorites?.map((f: any) => f.smell?.id || f.id) || []
        );

        if (action === "add") {
          favorites.add(smellId);
        } else {
          favorites.delete(smellId);
        }

        return {
          ...old,
          favorites: Array.from(favorites).map((id) => ({ smell: { id } })),
        };
      });

      // Optimistically update smells counts
      queryClient.setQueriesData({ queryKey: ["smells"] }, (old: any) => {
        if (!old?.smells) return old;

        return {
          ...old,
          smells: old.smells.map((smell: any) => {
            if (smell.id === smellId) {
              const countChange = action === "add" ? 1 : -1;
              return {
                ...smell,
                _count: {
                  ...smell._count,
                  favorites: Math.max(0, smell._count.favorites + countChange),
                },
              };
            }
            return smell;
          }),
        };
      });

      return { previousFavorites, previousSmells };
    },
    onError: (err, variables, context) => {
      // Rollback on error
      if (context?.previousFavorites) {
        queryClient.setQueryData(["user-favorites"], context.previousFavorites);
      }
      if (context?.previousSmells) {
        queryClient.setQueryData(["smells"], context.previousSmells);
      }

      notifications.show({
        title: "Error",
        message: err.message,
        color: "red",
      });
    },
    onSuccess: (data, variables) => {
      notifications.show({
        title: "Success",
        message:
          variables.action === "add"
            ? "Added to favorites"
            : "Removed from favorites",
        color: "green",
      });
    },
    onSettled: () => {
      // Refetch to ensure consistency
      queryClient.invalidateQueries({ queryKey: ["user-favorites"] });
      queryClient.invalidateQueries({ queryKey: ["smells"] });
    },
  });
};
