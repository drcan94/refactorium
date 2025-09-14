"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import {
  Container,
  Title,
  Text,
  Stack,
  Card,
  Group,
  Loader,
  Alert,
  Grid,
  Button,
} from "@mantine/core";
import { useDebouncedValue } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { useSession } from "next-auth/react";
import { useSmells, useSmellsCache } from "@/lib/hooks/use-smells";
import { useUserFavorites, useUserProgress } from "@/lib/hooks/use-user-data";
import { useFavoriteMutation } from "@/lib/hooks/use-favorites";
import { useProgressMutation } from "@/lib/hooks/use-progress";
import { IconRefresh } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import {
  SmellCategory,
  DifficultyLevel,
  SmellWithCounts,
  FilterState,
} from "@/lib/types";
import { SmellCard, Filters, Pagination } from "./_components";

export default function SmellsPage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const { data: session, status: sessionStatus } = useSession();
  const [loadingFavorites, setLoadingFavorites] = useState<Set<string>>(
    new Set()
  );
  const [loadingProgress, setLoadingProgress] = useState<Set<string>>(
    new Set()
  );

  const [filters, setFilters] = useState<FilterState>({
    search: "",
    categories: [],
    difficulties: [],
    sortBy: "title",
    sortOrder: "asc",
  });

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(4);

  const [debouncedSearch] = useDebouncedValue(filters.search, 300);

  // React Query for smells data
  const smellsQuery = useSmells({
    search: debouncedSearch,
    categories: filters.categories,
    difficulties: filters.difficulties,
    sortBy: filters.sortBy,
    sortOrder: filters.sortOrder,
    page: currentPage,
    limit: itemsPerPage,
  });

  const { prefetchNextPage, prefetchPrevPage, prefetchAdjacentPages } =
    useSmellsCache();

  // User data queries
  const userFavoritesQuery = useUserFavorites(!!session?.user?.id);
  const userProgressQuery = useUserProgress(!!session?.user?.id);

  // Mutations
  const favoriteMutation = useFavoriteMutation();
  const progressMutation = useProgressMutation();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Reset to page 1 when items per page changes
  useEffect(() => {
    setCurrentPage(1);
  }, [itemsPerPage]);

  // Extract data from React Query
  const smells = smellsQuery.data?.smells || [];
  const totalItems = smellsQuery.data?.total || 0;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const isLoading = smellsQuery.isLoading;
  const isError = smellsQuery.isError;
  const error = smellsQuery.error;

  // User data
  const favorites =
    userFavoritesQuery.data?.favorites?.map((f) => f.smell.id) || [];
  const progress =
    userProgressQuery.data?.progress?.map((p) => p.smell.id) || [];

  // Initial loading - show full page loading only on first load
  const isInitialLoading =
    sessionStatus === "loading" || (isFirstLoad && isLoading);

  // Cards loading - show loading only on cards when filtering/pagination
  const isCardsLoading = isLoading && !isInitialLoading;

  // Mark first load as complete when data is loaded
  useEffect(() => {
    if (isFirstLoad && !isLoading && smells.length > 0) {
      setIsFirstLoad(false);
    }
  }, [isFirstLoad, isLoading, smells.length]);

  // Prefetch adjacent pages for better UX
  useEffect(() => {
    if (mounted && !isInitialLoading && !isCardsLoading) {
      const queryParams = {
        search: debouncedSearch,
        categories: filters.categories,
        difficulties: filters.difficulties,
        sortBy: filters.sortBy,
        sortOrder: filters.sortOrder,
        page: currentPage,
        limit: itemsPerPage,
      };

      // Prefetch adjacent pages for faster navigation
      prefetchAdjacentPages(queryParams);
    }
  }, [
    mounted,
    isInitialLoading,
    isCardsLoading,
    currentPage,
    itemsPerPage,
    debouncedSearch,
    filters.categories,
    filters.difficulties,
    filters.sortBy,
    filters.sortOrder,
    prefetchAdjacentPages,
  ]);

  const handleFavoriteToggle = useCallback(
    (smellId: string) => {
      if (!session?.user?.id) {
        notifications.show({
          title: "Sign In Required",
          message: "Please sign in to add smells to favorites",
          color: "blue",
        });
        return;
      }

      const favorites =
        userFavoritesQuery.data?.favorites?.map((f) => f.smell.id) || [];
      const isFavorited = favorites.includes(smellId);

      // Add to loading state
      setLoadingFavorites((prev) => new Set(prev).add(smellId));

      favoriteMutation.mutate(
        {
          smellId,
          action: isFavorited ? "remove" : "add",
        },
        {
          onSettled: () => {
            // Remove from loading state
            setLoadingFavorites((prev) => {
              const newSet = new Set(prev);
              newSet.delete(smellId);
              return newSet;
            });
          },
        }
      );
    },
    [session?.user?.id, userFavoritesQuery.data, favoriteMutation]
  );

  const handleProgressToggle = useCallback(
    (smellId: string) => {
      if (!session?.user?.id) {
        notifications.show({
          title: "Sign In Required",
          message: "Please sign in to track your progress",
          color: "blue",
        });
        return;
      }

      const progress =
        userProgressQuery.data?.progress?.map((p) => p.smell.id) || [];
      const isInProgress = progress.includes(smellId);

      // Add to loading state
      setLoadingProgress((prev) => new Set(prev).add(smellId));

      progressMutation.mutate(
        {
          smellId,
          action: isInProgress ? "remove" : "add",
        },
        {
          onSettled: () => {
            // Remove from loading state
            setLoadingProgress((prev) => {
              const newSet = new Set(prev);
              newSet.delete(smellId);
              return newSet;
            });
          },
        }
      );
    },
    [session?.user?.id, userProgressQuery.data, progressMutation]
  );

  const clearFilters = useCallback(() => {
    setFilters({
      search: "",
      categories: [],
      difficulties: [],
      sortBy: "title",
      sortOrder: "asc",
    });
    setCurrentPage(1);
  }, [setFilters, setCurrentPage]);

  const hasActiveFilters = useMemo(
    () =>
      filters.search ||
      filters.categories.length > 0 ||
      filters.difficulties.length > 0 ||
      filters.sortBy !== "title" ||
      filters.sortOrder !== "asc",
    [filters]
  );

  const handleEdit = useCallback(
    (smellId: string) => {
      router.push(`/smells/${smellId}/edit`);
    },
    [router]
  );

  const handleDelete = useCallback(
    async (smellId: string) => {
      if (
        !confirm(
          "Are you sure you want to delete this smell? This action cannot be undone."
        )
      ) {
        return;
      }

      try {
        const response = await fetch(`/api/smells/${smellId}`, {
          method: "DELETE",
        });

        if (response.ok) {
          notifications.show({
            title: "Success",
            message: "Smell deleted successfully!",
            color: "green",
          });
          // Refresh the data
          smellsQuery.refetch();
        } else {
          const error = await response.json();
          notifications.show({
            title: "Error",
            message: error.error || "Failed to delete smell",
            color: "red",
          });
        }
      } catch (error) {
        notifications.show({
          title: "Error",
          message: "Network error occurred",
          color: "red",
        });
      }
    },
    [smellsQuery]
  );

  if (!mounted || isInitialLoading) {
    return (
      <Container size="lg" py="xl">
        <Group justify="center" py="xl">
          <Loader size="lg" />
          <Text>Loading...</Text>
        </Group>
      </Container>
    );
  }

  if (isError) {
    return (
      <Container size="lg" py="xl">
        <Alert color="red" title="Error">
          {error?.message || "Failed to load smells"}
        </Alert>
        <Button
          onClick={() => smellsQuery.refetch()}
          mt="md"
          leftSection={<IconRefresh size={16} />}
        >
          Try Again
        </Button>
      </Container>
    );
  }

  return (
    <Container size="lg" py="xl">
      {/* Header */}
      <Stack gap="lg" mb="xl">
        <Title order={1} size="h2" ta="center">
          Code Smells Library
        </Title>
        <Text size="lg" c="dimmed" ta="center">
          Explore and learn from real-world code smells. Find patterns to avoid
          and refactoring techniques to improve your code quality.
        </Text>
      </Stack>

      {/* Filters */}
      <Filters
        filters={filters}
        onFiltersChange={(newFilters) => setFilters(newFilters)}
        onClearFilters={clearFilters}
        hasActiveFilters={!!hasActiveFilters}
      />

      {/* Results Summary */}
      <Group justify="space-between" mb="lg">
        <Text size="sm" c="dimmed">
          Showing {smells.length} of {totalItems} smells
        </Text>
      </Group>

      {/* Smells Grid */}
      {isCardsLoading ? (
        <Card shadow="sm" padding="xl" radius="md" ta="center">
          <Stack gap="md" align="center">
            <Loader size="md" />
            <Text size="sm" c="dimmed">
              Loading smells...
            </Text>
          </Stack>
        </Card>
      ) : smells.length === 0 ? (
        <Card shadow="sm" padding="xl" radius="md" ta="center">
          <Stack gap="md">
            <Text size="lg" c="dimmed">
              No smells found
            </Text>
            <Text size="sm" c="dimmed">
              Try adjusting your search criteria or filters
            </Text>
            {hasActiveFilters && (
              <Button variant="light" onClick={clearFilters}>
                Clear Filters
              </Button>
            )}
          </Stack>
        </Card>
      ) : (
        <Grid mb="xl">
          {smells.map((smell: SmellWithCounts) => {
            const isFavorited = favorites.includes(smell.id);
            const isInProgress = progress.includes(smell.id);
            const isFavoriteLoading = loadingFavorites.has(smell.id);
            const isProgressLoading = loadingProgress.has(smell.id);

            return (
              <Grid.Col key={smell.id} span={{ base: 12, sm: 6, md: 4 }}>
                <SmellCard
                  smell={smell}
                  isFavorited={isFavorited}
                  isInProgress={isInProgress}
                  isFavoriteLoading={isFavoriteLoading}
                  isProgressLoading={isProgressLoading}
                  onFavoriteToggle={handleFavoriteToggle}
                  onProgressToggle={handleProgressToggle}
                  showAuthButtons={!!session}
                  showEditButtons={!!session}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                  currentUserId={session?.user?.id}
                />
              </Grid.Col>
            );
          })}
        </Grid>
      )}

      {/* Pagination */}
      {totalItems > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={totalItems}
          itemsPerPage={itemsPerPage}
          onPageChange={setCurrentPage}
          onItemsPerPageChange={setItemsPerPage}
        />
      )}
    </Container>
  );
}
