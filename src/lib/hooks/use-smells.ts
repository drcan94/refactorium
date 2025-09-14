import { useQuery, useQueryClient } from "@tanstack/react-query";
import { SmellWithCounts } from "@/lib/types";

export interface SmellsQueryParams {
  search?: string;
  categories?: string[];
  difficulties?: string[];
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  page: number;
  limit: number;
}

export interface SmellsResponse {
  smells: SmellWithCounts[];
  total: number;
  page: number;
  limit: number;
}

const fetchSmells = async (
  params: SmellsQueryParams
): Promise<SmellsResponse> => {
  const searchParams = new URLSearchParams();

  console.log("🔍 Frontend params:", {
    search: params.search,
    categories: params.categories,
    difficulties: params.difficulties,
    sortBy: params.sortBy,
    sortOrder: params.sortOrder,
    page: params.page,
    limit: params.limit,
  });

  if (params.search) searchParams.append("search", params.search);
  if (params.categories?.length) {
    params.categories.forEach((cat) => searchParams.append("category", cat));
  }
  if (params.difficulties?.length) {
    params.difficulties.forEach((diff) =>
      searchParams.append("difficulty", diff)
    );
  }

  if (params.sortBy) {
    searchParams.append("sortBy", params.sortBy);
  }

  if (params.sortOrder) {
    searchParams.append("sortOrder", params.sortOrder);
  }

  const offset = (params.page - 1) * params.limit;
  searchParams.append("limit", params.limit.toString());
  searchParams.append("offset", offset.toString());

  const response = await fetch(`/api/smells?${searchParams.toString()}`);
  if (!response.ok) {
    throw new Error("Failed to fetch smells");
  }

  return response.json();
};

export const useSmells = (params: SmellsQueryParams) => {
  return useQuery({
    queryKey: ["smells", params],
    queryFn: () => fetchSmells(params),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
  });
};

export const useSmellsCache = () => {
  const queryClient = useQueryClient();

  const getCachedSmells = (
    params: SmellsQueryParams
  ): SmellWithCounts[] | undefined => {
    const queryKey = ["smells", params];
    const cachedData = queryClient.getQueryData<SmellsResponse>(queryKey);
    return cachedData?.smells;
  };

  const prefetchNextPage = (params: SmellsQueryParams) => {
    const nextPageParams = { ...params, page: params.page + 1 };
    queryClient.prefetchQuery({
      queryKey: ["smells", nextPageParams],
      queryFn: () => fetchSmells(nextPageParams),
      staleTime: 10 * 60 * 1000, // 10 minutes
      gcTime: 30 * 60 * 1000, // 30 minutes
    });
  };

  const prefetchPrevPage = (params: SmellsQueryParams) => {
    if (params.page > 1) {
      const prevPageParams = { ...params, page: params.page - 1 };
      queryClient.prefetchQuery({
        queryKey: ["smells", prevPageParams],
        queryFn: () => fetchSmells(prevPageParams),
        staleTime: 10 * 60 * 1000, // 10 minutes
        gcTime: 30 * 60 * 1000, // 30 minutes
      });
    }
  };

  const prefetchAdjacentPages = (params: SmellsQueryParams) => {
    // Prefetch next 2 pages
    for (let i = 1; i <= 2; i++) {
      const nextPageParams = { ...params, page: params.page + i };
      queryClient.prefetchQuery({
        queryKey: ["smells", nextPageParams],
        queryFn: () => fetchSmells(nextPageParams),
        staleTime: 10 * 60 * 1000,
        gcTime: 30 * 60 * 1000,
      });
    }

    // Prefetch previous 2 pages
    for (let i = 1; i <= 2; i++) {
      if (params.page - i > 0) {
        const prevPageParams = { ...params, page: params.page - i };
        queryClient.prefetchQuery({
          queryKey: ["smells", prevPageParams],
          queryFn: () => fetchSmells(prevPageParams),
          staleTime: 10 * 60 * 1000,
          gcTime: 30 * 60 * 1000,
        });
      }
    }
  };

  return {
    getCachedSmells,
    prefetchNextPage,
    prefetchPrevPage,
    prefetchAdjacentPages,
  };
};
