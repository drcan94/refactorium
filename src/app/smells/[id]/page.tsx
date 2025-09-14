"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { useSession } from "next-auth/react";
import {
  Container,
  Title,
  Text,
  Stack,
  Group,
  Badge,
  Card,
  Button,
  ActionIcon,
  Grid,
  Box,
  Alert,
  Loader,
  Divider,
  Tabs,
} from "@mantine/core";
import { CodeHighlight } from "@mantine/code-highlight";
import {
  IconHeart,
  IconStar,
  IconArrowLeft,
  IconExternalLink,
  IconCode,
  IconBulb,
  IconCheck,
} from "@tabler/icons-react";
import Link from "next/link";

interface Smell {
  id: string;
  title: string;
  category: string;
  description: string;
  difficulty: number;
  tags: string;
  badCode: string;
  goodCode: string;
  testHint: string;
  _count: {
    favorites: number;
    progress: number;
  };
}

export default function SmellDetailPage() {
  const params = useParams();
  const { data: session, status } = useSession();
  const [mounted, setMounted] = useState(false);
  const [smell, setSmell] = useState<Smell | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isFavorited, setIsFavorited] = useState(false);
  const [favoritesLoading, setFavoritesLoading] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const fetchSmell = async () => {
      try {
        const response = await fetch(`/api/smells/${params.id}`);
        const data = await response.json();

        if (response.ok) {
          setSmell(data);
        } else {
          setError(data.error || "Failed to fetch smell");
        }
      } catch (err) {
        setError("Network error occurred");
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchSmell();
    }
  }, [params.id]);

  const handleFavoriteToggle = async () => {
    if (!smell || !session?.user?.id) return;

    setFavoritesLoading(true);
    try {
      const response = await fetch("/api/user/favorites", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          smellId: smell.id,
          action: isFavorited ? "remove" : "add",
        }),
      });

      if (response.ok) {
        setIsFavorited(!isFavorited);
      } else {
        const data = await response.json();
        console.error("Failed to toggle favorite:", data.error);
      }
    } catch (err) {
      console.error("Failed to toggle favorite:", err);
    } finally {
      setFavoritesLoading(false);
    }
  };

  const handleProgressUpdate = async (
    progressStatus: "started" | "completed"
  ) => {
    if (!smell || !session?.user?.id) return;

    try {
      const response = await fetch("/api/user/progress", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          smellId: smell.id,
          status: progressStatus,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        console.error("Failed to update progress:", data.error);
      }
    } catch (err) {
      console.error("Failed to update progress:", err);
    }
  };

  if (loading) {
    return (
      <Container size="lg" py="xl">
        <Group justify="center" py="xl">
          <Loader size="lg" />
          <Text>Loading smell details...</Text>
        </Group>
      </Container>
    );
  }

  if (error || !smell) {
    return (
      <Container size="lg" py="xl">
        <Alert color="red" title="Error">
          {error || "Smell not found"}
        </Alert>
        <Button
          component={Link}
          href="/"
          mt="md"
          leftSection={<IconArrowLeft size={16} />}
        >
          Back to Home
        </Button>
      </Container>
    );
  }

  const tags = smell.tags.split(",").map((tag) => tag.trim());

  return (
    <Container size="lg" py="xl">
      {/* Header */}
      <Group justify="space-between" mb="xl">
        <Button
          component={Link}
          href="/"
          variant="light"
          leftSection={<IconArrowLeft size={16} />}
        >
          Back to Home
        </Button>
        <Group gap="sm">
          {session?.user?.id ? (
            <ActionIcon
              variant={isFavorited ? "filled" : "light"}
              color={isFavorited ? "red" : "gray"}
              onClick={handleFavoriteToggle}
              loading={favoritesLoading}
              size="lg"
            >
              <IconHeart size={18} />
            </ActionIcon>
          ) : (
            <ActionIcon
              variant="light"
              color="gray"
              size="lg"
              title="Sign in to add to favorites"
              disabled
            >
              <IconHeart size={18} />
            </ActionIcon>
          )}
        </Group>
      </Group>

      {/* Smell Header */}
      <Stack gap="lg" mb="xl">
        <Group justify="space-between" align="flex-start">
          <div>
            <Title order={1} size="h1" mb="sm">
              {smell.title}
            </Title>
            <Group gap="sm" mb="md">
              <Badge color="blue" size="lg">
                {smell.category}
              </Badge>
              <Badge
                color={
                  smell.difficulty <= 2
                    ? "green"
                    : smell.difficulty <= 3
                    ? "yellow"
                    : "red"
                }
                variant="light"
                size="lg"
              >
                Difficulty: {smell.difficulty}/5
              </Badge>
            </Group>
          </div>
        </Group>

        <Text size="lg" c="dimmed">
          {smell.description}
        </Text>

        <Group gap="xs">
          {tags.map((tag) => (
            <Badge key={tag} variant="outline" size="sm">
              {tag}
            </Badge>
          ))}
        </Group>
      </Stack>

      {/* Progress Actions */}
      <Card shadow="sm" padding="lg" mb="xl">
        <Group justify="space-between">
          <Text fw={500}>Learning Progress</Text>
          {session?.user?.id ? (
            <Group gap="sm">
              <Button
                variant="light"
                size="sm"
                leftSection={<IconCode size={16} />}
                onClick={() => handleProgressUpdate("started")}
              >
                Mark as Started
              </Button>
              <Button
                variant="light"
                color="green"
                size="sm"
                leftSection={<IconCheck size={16} />}
                onClick={() => handleProgressUpdate("completed")}
              >
                Mark as Completed
              </Button>
            </Group>
          ) : (
            <Text size="sm" c="dimmed">
              Sign in to track your progress
            </Text>
          )}
        </Group>
      </Card>

      {/* Code Comparison */}
      <Tabs defaultValue="comparison" mb="xl">
        <Tabs.List>
          <Tabs.Tab value="comparison" leftSection={<IconCode size={16} />}>
            Side-by-Side Comparison
          </Tabs.Tab>
          <Tabs.Tab value="test-hints" leftSection={<IconBulb size={16} />}>
            Test Hints
          </Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="comparison" pt="lg">
          <Grid>
            <Grid.Col span={{ base: 12, md: 6 }}>
              <Card shadow="sm" padding="lg" h="100%">
                <Stack gap="md">
                  <Group justify="space-between">
                    <Title order={3} size="h4" c="red">
                      ❌ Problem Code
                    </Title>
                    <ActionIcon variant="light" size="sm">
                      <IconExternalLink size={14} />
                    </ActionIcon>
                  </Group>
                  <Box
                    style={{
                      border: "1px solid var(--mantine-color-red-3)",
                      borderRadius: "var(--mantine-radius-sm)",
                      overflow: "hidden",
                    }}
                  >
                    <CodeHighlight
                      code={smell.badCode}
                      language="typescript"
                      withCopyButton={false}
                      style={{ margin: 0 }}
                    />
                  </Box>
                  <Text size="sm" c="dimmed">
                    This code has issues with: maintainability, readability, and
                    potential bugs.
                  </Text>
                </Stack>
              </Card>
            </Grid.Col>

            <Grid.Col span={{ base: 12, md: 6 }}>
              <Card shadow="sm" padding="lg" h="100%">
                <Stack gap="md">
                  <Group justify="space-between">
                    <Title order={3} size="h4" c="green">
                      ✅ Refactored Code
                    </Title>
                    <ActionIcon variant="light" size="sm">
                      <IconExternalLink size={14} />
                    </ActionIcon>
                  </Group>
                  <Box
                    style={{
                      border: "1px solid var(--mantine-color-green-3)",
                      borderRadius: "var(--mantine-radius-sm)",
                      overflow: "hidden",
                    }}
                  >
                    <CodeHighlight
                      code={smell.goodCode}
                      language="typescript"
                      withCopyButton={false}
                      style={{ margin: 0 }}
                    />
                  </Box>
                  <Text size="sm" c="dimmed">
                    This refactored version is: maintainable, readable, and
                    follows best practices.
                  </Text>
                </Stack>
              </Card>
            </Grid.Col>
          </Grid>
        </Tabs.Panel>

        <Tabs.Panel value="test-hints" pt="lg">
          <Card shadow="sm" padding="lg">
            <Stack gap="md">
              <Group gap="sm" mb="md">
                <IconBulb size={20} />
                <Title order={3} size="h4">
                  Test Hints & Validation
                </Title>
              </Group>
              <Divider />
              <Text>{smell.testHint}</Text>

              <Alert color="blue" title="How to Test Your Refactor">
                <Stack gap="sm">
                  <Text size="sm">
                    • Run existing tests to ensure no functionality is broken
                  </Text>
                  <Text size="sm">
                    • Add new tests for the refactored functionality
                  </Text>
                  <Text size="sm">• Check code coverage hasn't decreased</Text>
                  <Text size="sm">• Verify performance hasn't degraded</Text>
                </Stack>
              </Alert>
            </Stack>
          </Card>
        </Tabs.Panel>
      </Tabs>

      {/* Stats */}
      <Card shadow="sm" padding="lg" mt="xl">
        <Group justify="space-around">
          <Stack gap="xs" align="center">
            <Text size="sm" c="dimmed">
              Favorites
            </Text>
            <Group gap="xs">
              <IconHeart size={16} />
              <Text fw={500}>{smell._count.favorites}</Text>
            </Group>
          </Stack>
          <Stack gap="xs" align="center">
            <Text size="sm" c="dimmed">
              Learners
            </Text>
            <Group gap="xs">
              <IconStar size={16} />
              <Text fw={500}>{smell._count.progress}</Text>
            </Group>
          </Stack>
        </Group>
      </Card>
    </Container>
  );
}
