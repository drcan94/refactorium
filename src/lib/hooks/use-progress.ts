import { useMutation, useQueryClient } from "@tanstack/react-query";
import { notifications } from "@mantine/notifications";

interface ProgressAction {
  smellId: string;
  action: "add" | "remove";
}

const updateProgress = async (data: ProgressAction) => {
  const response = await fetch("/api/user/progress", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Failed to update progress");
  }

  return response.json();
};

export const useProgressMutation = (smellId?: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateProgress,
    onMutate: async (variables) => {
      const { smellId, action } = variables;

      // Cancel any outgoing refetches
      await queryClient.cancelQueries({ queryKey: ["user-progress"] });
      await queryClient.cancelQueries({ queryKey: ["smells"] });

      // Snapshot the previous value
      const previousProgress = queryClient.getQueryData(["user-progress"]);
      const previousSmells = queryClient.getQueryData(["smells"]);

      // Optimistically update progress
      queryClient.setQueryData(["user-progress"], (old: any) => {
        if (!old) return old;

        const progress = new Set(
          old.progress?.map((p: any) => p.smell?.id || p.id) || []
        );

        if (action === "add") {
          progress.add(smellId);
        } else {
          progress.delete(smellId);
        }

        return {
          ...old,
          progress: Array.from(progress).map((id) => ({ smell: { id } })),
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
                  progress: Math.max(0, smell._count.progress + countChange),
                },
              };
            }
            return smell;
          }),
        };
      });

      return { previousProgress, previousSmells };
    },
    onError: (err, variables, context) => {
      // Rollback on error
      if (context?.previousProgress) {
        queryClient.setQueryData(["user-progress"], context.previousProgress);
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
            ? "Added to progress"
            : "Removed from progress",
        color: "green",
      });
    },
    onSettled: () => {
      // Refetch to ensure consistency
      queryClient.invalidateQueries({ queryKey: ["user-progress"] });
      queryClient.invalidateQueries({ queryKey: ["smells"] });
    },
  });
};
