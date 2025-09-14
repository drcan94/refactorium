"use client";

import { useState } from "react";
import { Button, Text, Container, Stack, Group, Badge } from "@mantine/core";

export default function ApiTestPage() {
  const [smells, setSmells] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const testSmellsAPI = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/smells");
      const data = await response.json();

      if (response.ok) {
        setSmells(data);
      } else {
        setError(`Error: ${data.error}`);
      }
    } catch (err) {
      setError(`Network error: ${err}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container size="md" py="xl">
      <Stack gap="lg">
        <Text size="xl" fw={500}>
          API Test Page
        </Text>

        <Button onClick={testSmellsAPI} loading={loading} disabled={loading}>
          Test Smells API
        </Button>

        {error && (
          <Text c="red" size="sm">
            {error}
          </Text>
        )}

        {smells && (
          <Stack gap="md">
            <Text size="lg" fw={500}>
              API Response ({smells.smells?.length || 0} smells)
            </Text>

            {smells.smells?.map((smell: any) => (
              <div
                key={smell.id}
                style={{
                  border: "1px solid #e9ecef",
                  padding: "12px",
                  borderRadius: "8px",
                }}
              >
                <Group justify="space-between" mb="xs">
                  <Text fw={500}>{smell.title}</Text>
                  <Badge color="blue" size="sm">
                    {smell.category}
                  </Badge>
                </Group>
                <Text size="sm" c="dimmed">
                  {smell.description}
                </Text>
                <Group gap="xs" mt="xs">
                  <Badge size="xs" variant="light">
                    Difficulty: {smell.difficulty}
                  </Badge>
                  <Badge size="xs" variant="light">
                    Favorites: {smell._count?.favorites || 0}
                  </Badge>
                </Group>
              </div>
            ))}
          </Stack>
        )}
      </Stack>
    </Container>
  );
}
