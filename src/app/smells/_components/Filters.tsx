"use client";

import {
  Card,
  Stack,
  Group,
  TextInput,
  Select,
  MultiSelect,
  Badge,
  Button,
  Grid,
  Title,
  ActionIcon,
  Text,
} from "@mantine/core";
import {
  IconSearch,
  IconFilter,
  IconX,
  IconSortAscending,
  IconSortDescending,
} from "@tabler/icons-react";
import { SmellCategory, DifficultyLevel, FilterState } from "@/lib/types";
import {
  SMELL_CATEGORIES_OPTIONS,
  DIFFICULTY_LEVELS_OPTIONS,
  SORT_OPTIONS,
  SORT_ORDER_OPTIONS,
  getCategoryLabel,
  getDifficultyLabel,
} from "@/lib/constants";

interface FiltersProps {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
  onClearFilters: () => void;
  hasActiveFilters: boolean;
}

export function Filters({
  filters,
  onFiltersChange,
  onClearFilters,
  hasActiveFilters,
}: FiltersProps) {
  return (
    <Card shadow="sm" padding="xl" radius="md" mb="xl">
      <Stack gap="md">
        <Group justify="space-between" align="center">
          <Group gap="xs">
            <IconFilter size={20} />
            <Title order={3} size="h4">
              Filters & Search
            </Title>
          </Group>
          {hasActiveFilters && (
            <Button
              variant="light"
              size="sm"
              leftSection={<IconX size={16} />}
              onClick={onClearFilters}
            >
              Clear All
            </Button>
          )}
        </Group>

        <Grid>
          <Grid.Col span={{ base: 12, md: 6 }}>
            <TextInput
              label="Search"
              placeholder="Search by title, description, tags, or category..."
              leftSection={<IconSearch size={16} />}
              value={filters.search}
              onChange={(event) =>
                onFiltersChange({
                  ...filters,
                  search: event.currentTarget.value,
                })
              }
            />
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 3 }}>
            <Select
              label="Sort By"
              data={SORT_OPTIONS}
              value={filters.sortBy}
              onChange={(value) =>
                onFiltersChange({
                  ...filters,
                  sortBy: (value as FilterState["sortBy"]) || "title",
                })
              }
            />
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 3 }}>
            <Select
              label="Order"
              data={SORT_ORDER_OPTIONS}
              value={filters.sortOrder}
              onChange={(value) =>
                onFiltersChange({
                  ...filters,
                  sortOrder: value as "asc" | "desc",
                })
              }
              leftSection={
                filters.sortOrder === "asc" ? (
                  <IconSortAscending size={16} />
                ) : (
                  <IconSortDescending size={16} />
                )
              }
            />
          </Grid.Col>
        </Grid>

        <Grid>
          <Grid.Col span={{ base: 12, md: 6 }}>
            <MultiSelect
              label="Categories"
              placeholder="Select categories..."
              data={SMELL_CATEGORIES_OPTIONS}
              value={filters.categories}
              onChange={(value) =>
                onFiltersChange({
                  ...filters,
                  categories: value as SmellCategory[],
                })
              }
            />
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 6 }}>
            <MultiSelect
              label="Difficulty"
              placeholder="Select difficulty levels..."
              data={DIFFICULTY_LEVELS_OPTIONS}
              value={filters.difficulties}
              onChange={(value) =>
                onFiltersChange({
                  ...filters,
                  difficulties: value as DifficultyLevel[],
                })
              }
            />
          </Grid.Col>
        </Grid>

        {/* Active Filters Display */}
        {hasActiveFilters && (
          <Stack gap="sm">
            <Text size="sm" fw={500}>
              Active Filters:
            </Text>
            <Group gap="xs">
              {filters.categories.map((category) => (
                <Badge
                  key={category}
                  variant="light"
                  size="sm"
                  rightSection={
                    <ActionIcon
                      size="xs"
                      variant="transparent"
                      onClick={() =>
                        onFiltersChange({
                          ...filters,
                          categories: filters.categories.filter(
                            (c) => c !== category
                          ),
                        })
                      }
                    >
                      <IconX size={10} />
                    </ActionIcon>
                  }
                >
                  {getCategoryLabel(category)}
                </Badge>
              ))}
              {filters.difficulties.map((difficulty) => (
                <Badge
                  key={difficulty}
                  variant="light"
                  size="sm"
                  rightSection={
                    <ActionIcon
                      size="xs"
                      variant="transparent"
                      onClick={() =>
                        onFiltersChange({
                          ...filters,
                          difficulties: filters.difficulties.filter(
                            (d) => d !== difficulty
                          ),
                        })
                      }
                    >
                      <IconX size={10} />
                    </ActionIcon>
                  }
                >
                  {getDifficultyLabel(difficulty)}
                </Badge>
              ))}
            </Group>
          </Stack>
        )}
      </Stack>
    </Card>
  );
}
