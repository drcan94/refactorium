"use client";

import {
  Group,
  Button,
  Title,
  Text,
  Stack,
  Grid,
  Card,
  Badge,
  TextInput,
  Select,
  MultiSelect,
  ActionIcon,
  Box,
  Loader,
  Combobox,
  useCombobox,
} from "@mantine/core";
import {
  IconSearch,
  IconHeart,
  IconStar,
  IconCode,
  IconCoffee,
} from "@tabler/icons-react";
import { useState, useEffect, useMemo } from "react";
import { useDebouncedCallback } from "@mantine/hooks";
import { useSession } from "next-auth/react";
import { useAnalytics } from "@/lib/hooks/use-analytics";

import { SmellWithCounts } from "@/lib/types";
import {
  getDifficultyStars,
  getDifficultyColor,
  getCategoryLabel,
  getDifficultyLabel,
} from "@/lib/constants";
import { SmellCard } from "./smells/_components/SmellCard";

import styles from "./page.module.css";

export default function Home() {
  const analytics = useAnalytics();
  const { data: session, status } = useSession();
  const combobox = useCombobox();
  const [mounted, setMounted] = useState(false);
  const [originalSmells, setOriginalSmells] = useState<SmellWithCounts[]>([]);
  const [smellsLoading, setSmellsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState<string | null>(
    null
  );
  const [searchSuggestions, setSearchSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState(-1);

  useEffect(() => {
    setMounted(true);
    analytics.trackPageView("home");
  }, [analytics]);

  // Fetch initial 6 smells from API (only once)
  useEffect(() => {
    const fetchInitialSmells = async () => {
      try {
        setSmellsLoading(true);
        const params = new URLSearchParams();
        params.append("limit", "6");
        params.append("sortBy", "createdAt");
        params.append("sortOrder", "desc");

        const response = await fetch(`/api/smells?${params.toString()}`);
        const data = await response.json();

        if (response.ok) {
          console.log("🔍 Initial API Response:", {
            total: data.total,
            smellsCount: data.smells?.length || 0,
            smells:
              data.smells?.map(
                (s: { id: any; title: any; difficulty: any }) => ({
                  id: s.id,
                  title: s.title,
                  difficulty: s.difficulty,
                })
              ) || [],
          });
          setOriginalSmells(data.smells || []);
        } else {
          console.error("Failed to fetch smells:", data.error);
        }
      } catch (error) {
        console.error("Error fetching smells:", error);
      } finally {
        setSmellsLoading(false);
      }
    };

    if (mounted) {
      fetchInitialSmells();
    }
  }, [mounted]);

  // Suggestions'ları searchQuery ve smells değişince yeniden hesapla
  useEffect(() => {
    console.log("🔍 Suggestions useEffect triggered:", {
      searchQuery,
      smellsLength: originalSmells.length,
      showSuggestions,
    });

    const q = searchQuery.trim().toLowerCase();
    if (q.length <= 1) {
      console.log("🔍 Query too short, clearing suggestions");
      setSearchSuggestions([]);
      setShowSuggestions(false);
      setSelectedSuggestionIndex(-1);
      return;
    }

    console.log(
      "🔍 Generating suggestions for query:",
      q,
      "smells count:",
      originalSmells.length
    );
    const suggestions = generateSearchSuggestions(searchQuery, originalSmells);
    console.log("🔍 Generated suggestions:", suggestions);
    setSearchSuggestions(suggestions);
    setShowSuggestions(suggestions.length > 0);
    setSelectedSuggestionIndex(suggestions.length ? 0 : -1);
  }, [searchQuery, originalSmells]);

  // Client-side filtering of the initial 6 smells
  const filteredSmells = useMemo(() => {
    if (originalSmells.length === 0) return [];

    let filtered = [...originalSmells];

    // Apply search filter
    if (debouncedSearchQuery) {
      const query = debouncedSearchQuery.toLowerCase();
      filtered = filtered.filter((smell) => {
        const titleMatch = smell.title.toLowerCase().includes(query);
        const descriptionMatch = smell.description
          .toLowerCase()
          .includes(query);
        const tagsMatch = smell.tags.toLowerCase().includes(query);
        const categoryMatch = getCategoryLabel(smell.category)
          .toLowerCase()
          .includes(query);
        return titleMatch || descriptionMatch || tagsMatch || categoryMatch;
      });
    }

    // Apply category filter
    if (selectedCategory && selectedCategory !== "All Categories") {
      filtered = filtered.filter(
        (smell) => getCategoryLabel(smell.category) === selectedCategory
      );
    }

    // Apply difficulty filter
    if (selectedDifficulty && selectedDifficulty !== "all") {
      filtered = filtered.filter(
        (smell) => smell.difficulty === selectedDifficulty
      );
    }

    console.log("🔍 Client-side filtering:", {
      originalCount: originalSmells.length,
      filteredCount: filtered.length,
      searchQuery: debouncedSearchQuery,
      selectedCategory,
      selectedDifficulty,
    });

    return filtered;
  }, [
    originalSmells,
    debouncedSearchQuery,
    selectedCategory,
    selectedDifficulty,
  ]);

  // Debounced search callback - hem searchQuery hem debouncedSearchQuery'yi set et
  const debouncedSearch = useDebouncedCallback(
    (query: string) => {
      setSearchQuery(query);
      setDebouncedSearchQuery(query);
    },
    300 // 300ms delay
  );

  // Generate search suggestions from existing data - null-safe
  const generateSearchSuggestions = (
    query: string,
    smellsData: SmellWithCounts[]
  ): string[] => {
    const suggestions = new Set<string>();
    const lowerQuery = query.toLowerCase();

    smellsData.forEach((smell) => {
      // Add titles that match
      if (smell.title?.toLowerCase().includes(lowerQuery)) {
        suggestions.add(smell.title);
      }

      // Add categories that match
      const categoryLabel = getCategoryLabel(smell.category);
      if (categoryLabel?.toLowerCase().includes(lowerQuery)) {
        suggestions.add(categoryLabel);
      }

      // Add tags that match - null-safe
      const tags = (smell.tags ?? "")
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean);

      for (const tag of tags) {
        if (tag.toLowerCase().includes(lowerQuery)) {
          suggestions.add(tag);
        }
      }

      // Add titles when description matches - description içinde arama yapınca başlığı öner
      if (smell.description?.toLowerCase().includes(lowerQuery)) {
        suggestions.add(smell.title);
      }
    });

    return Array.from(suggestions).slice(0, 5); // Limit to 5 suggestions
  };

  // Handle keyboard navigation in search suggestions
  const handleSearchKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (!showSuggestions || searchSuggestions.length === 0) return;

    switch (event.key) {
      case "ArrowDown":
        event.preventDefault();
        setSelectedSuggestionIndex((prev) =>
          prev < searchSuggestions.length - 1 ? prev + 1 : prev
        );
        break;
      case "ArrowUp":
        event.preventDefault();
        setSelectedSuggestionIndex((prev) => (prev > 0 ? prev - 1 : -1));
        break;
      case "Enter":
        event.preventDefault();
        if (
          selectedSuggestionIndex >= 0 &&
          selectedSuggestionIndex < searchSuggestions.length
        ) {
          const selectedSuggestion = searchSuggestions[selectedSuggestionIndex];
          setSearchQuery(selectedSuggestion);
          setDebouncedSearchQuery(selectedSuggestion);
          setShowSuggestions(false);
          setSearchSuggestions([]);
          setSelectedSuggestionIndex(-1);
        }
        break;
      case "Escape":
        event.preventDefault();
        setShowSuggestions(false);
        setSelectedSuggestionIndex(-1);
        break;
    }
  };

  if (!mounted) {
    return null;
  }

  // Get unique categories from smells for filter dropdown
  // Generate categories from current smells - sadece mevcut kategoriler
  const categories = Array.from(
    new Set(originalSmells.map((smell) => getCategoryLabel(smell.category)))
  ).sort();

  // Generate difficulty levels from current smells - sadece mevcut difficulty'ler
  const uniqueDifficulties = Array.from(
    new Set(originalSmells.map((smell) => smell.difficulty))
  );

  const difficultyLevels = uniqueDifficulties
    .map((difficulty) => ({
      value: difficulty,
      label: `${getDifficultyLabel(difficulty)} (${getDifficultyStars(
        difficulty
      )} star${getDifficultyStars(difficulty) > 1 ? "s" : ""})`,
    }))
    .sort((a, b) => getDifficultyStars(a.value) - getDifficultyStars(b.value));

  return (
    <>
      {/* Hero Section */}
      <Stack gap="lg" mb="xl" className={styles.hero}>
        <Title order={1} size="h1" ta="center">
          Code Smell Playground
        </Title>
        <Text size="lg" c="dimmed" ta="center" maw={600} mx="auto">
          Learn-by-doing: transform small code snippets from problem to refactor
          with side-by-side context. Perfect for the AI era.
        </Text>
        <Group justify="center" className={styles.actions}>
          <Button
            size="md"
            leftSection={<IconCode size={18} />}
            component="a"
            href="/smells"
          >
            Explore Smells
          </Button>
          <Button variant="light" size="md" component="a" href="/docs">
            Read the Docs
          </Button>
          <Button variant="outline" size="md" component="a" href="/about">
            About
          </Button>
        </Group>
      </Stack>

      {/* Search and Filter */}
      <Stack gap="md" mb="xl">
        {/* Search Section */}
        <Card shadow="sm" padding="md">
          <Combobox
            onOptionSubmit={(value) => {
              setSearchQuery(value);
              setDebouncedSearchQuery(value);
              combobox.closeDropdown();
            }}
            store={combobox}
          >
            <Combobox.Target>
              <TextInput
                placeholder="Search code smells by title, description, or tags..."
                leftSection={<IconSearch size={18} />}
                size="lg"
                value={searchQuery}
                onChange={(event) => {
                  const value = event.currentTarget.value;
                  setSearchQuery(value);
                  setSelectedSuggestionIndex(-1);
                  debouncedSearch(value);
                  combobox.openDropdown();
                }}
                onFocus={() => {
                  if (searchSuggestions.length > 0) {
                    combobox.openDropdown();
                  }
                }}
                onBlur={() => {
                  setTimeout(() => combobox.closeDropdown(), 200);
                }}
                styles={{
                  input: {
                    fontSize: "16px",
                    height: "48px",
                  },
                }}
              />
            </Combobox.Target>

            <Combobox.Dropdown>
              <Combobox.Options>
                {searchSuggestions.length > 0 ? (
                  searchSuggestions.map((suggestion, index) => (
                    <Combobox.Option
                      key={index}
                      value={suggestion}
                      style={{
                        padding: "12px 16px",
                        cursor: "pointer",
                      }}
                    >
                      <Text size="sm" fw={500}>
                        {suggestion}
                      </Text>
                    </Combobox.Option>
                  ))
                ) : (
                  <Combobox.Empty>No suggestions found</Combobox.Empty>
                )}
              </Combobox.Options>
            </Combobox.Dropdown>
          </Combobox>
        </Card>

        {/* Filter Section */}
        <Card shadow="sm" padding="md">
          <Grid>
            <Grid.Col span={{ base: 12, md: 6 }}>
              <Select
                label="Categories"
                placeholder="Select category to filter..."
                data={categories}
                value={selectedCategory}
                onChange={(value) => setSelectedCategory(value)}
                clearable
                styles={{
                  input: {
                    minHeight: 44,
                    textAlign: "left",
                  },
                }}
              />
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 6 }}>
              <Select
                label="Difficulty Level"
                placeholder="Select difficulty level..."
                data={[
                  { value: "all", label: "All Levels" },
                  ...difficultyLevels,
                ]}
                value={selectedDifficulty}
                onChange={(value) => setSelectedDifficulty(value)}
                styles={{
                  input: {
                    minHeight: 44,
                    textAlign: "left",
                  },
                }}
              />
            </Grid.Col>
          </Grid>
        </Card>
      </Stack>

      {/* Smells Grid */}
      <Grid>
        {smellsLoading ? (
          <Grid.Col span={12}>
            <Group justify="center" py="xl">
              <Loader size="lg" />
            </Group>
          </Grid.Col>
        ) : filteredSmells.length === 0 ? (
          <Grid.Col span={12}>
            <Text ta="center" c="dimmed" py="xl">
              No code smells found. Try adjusting your search criteria.
            </Text>
          </Grid.Col>
        ) : (
          filteredSmells.map((smell) => (
            <Grid.Col key={smell.id} span={{ base: 12, sm: 6, md: 4 }}>
              <SmellCard smell={smell} showAuthButtons={false} />
            </Grid.Col>
          ))
        )}
      </Grid>

      {/* Why This Matters Section */}
      <Box mt="xl" pt="xl">
        <Title order={2} ta="center" mb="lg">
          Why This Matters in the AI Era
        </Title>
        <Grid>
          <Grid.Col span={{ base: 12, md: 4 }}>
            <Stack gap="sm" align="center" ta="center">
              <Box
                style={{
                  width: 60,
                  height: 60,
                  borderRadius: "50%",
                  background: "var(--mantine-color-blue-light)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <IconCode size={30} color="var(--mantine-color-blue-6)" />
              </Box>
              <Title order={4}>AI Guardrails</Title>
              <Text size="sm" c="dimmed">
                Catch AI-introduced smells early with human-in-the-loop
                validation
              </Text>
            </Stack>
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 4 }}>
            <Stack gap="sm" align="center" ta="center">
              <Box
                style={{
                  width: 60,
                  height: 60,
                  borderRadius: "50%",
                  background: "var(--mantine-color-green-light)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <IconStar size={30} color="var(--mantine-color-green-6)" />
              </Box>
              <Title order={4}>Concrete Examples</Title>
              <Text size="sm" c="dimmed">
                Turn vague "best practices" into copy-ready refactor patterns
              </Text>
            </Stack>
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 4 }}>
            <Stack gap="sm" align="center" ta="center">
              <Box
                style={{
                  width: 60,
                  height: 60,
                  borderRadius: "50%",
                  background: "var(--mantine-color-orange-light)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <IconHeart size={30} color="var(--mantine-color-orange-6)" />
              </Box>
              <Title order={4}>Team Standards</Title>
              <Text size="sm" c="dimmed">
                Create living catalogs of anti-patterns for CI automation
              </Text>
            </Stack>
          </Grid.Col>
        </Grid>
      </Box>

      {/* Support Section */}
      <Box mt="xl" pt="xl" ta="center">
        <Text size="sm" c="dimmed" mb="md">
          Enjoying Refactorium? Consider supporting the project:
        </Text>
        <Button
          size="sm"
          variant="light"
          color="orange"
          leftSection={<IconCoffee size={16} />}
          component="a"
          href="https://buymeacoffee.com/drcan94c"
          target="_blank"
          rel="noopener noreferrer"
        >
          ☕ Buy Me a Coffee
        </Button>
      </Box>
    </>
  );
}
