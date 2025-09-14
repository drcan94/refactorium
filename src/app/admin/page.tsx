"use client";

import {
  Container,
  Title,
  Grid,
  Card,
  Text,
  Group,
  Badge,
  Stack,
  Button,
} from "@mantine/core";
import {
  IconCode,
  IconUsers,
  IconHeart,
  IconStar,
  IconTrendingUp,
  IconEye,
  IconClock,
} from "@tabler/icons-react";
import { useAdminAuth } from "@/lib/hooks/use-admin-auth";
import { useEffect, useState } from "react";

interface DashboardStats {
  totalSmells: number;
  publishedSmells: number;
  draftSmells: number;
  totalUsers: number;
  activeUsers: number;
  totalFavorites: number;
  totalProgress: number;
  recentActivity: number;
}

export default function AdminDashboard() {
  const { isAdmin, isModerator } = useAdminAuth();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch("/api/admin/stats");
        const data = await response.json();
        setStats(data);
      } catch (error) {
        console.error("Error fetching admin stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <Container size="lg" py="xl">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500 mx-auto"></div>
          <Text mt="md">Loading dashboard...</Text>
        </div>
      </Container>
    );
  }

  return (
    <Container size="lg" py="xl">
      <Stack gap="xl">
        {/* Header */}
        <div>
          <Title order={1} size="h2">
            Admin Dashboard
          </Title>
          <Text c="dimmed" size="sm">
            Welcome to the admin panel. Manage your code smells and users.
          </Text>
        </div>

        {/* Stats Grid */}
        <Grid>
          <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
            <Card shadow="sm" padding="lg" radius="md" withBorder>
              <Group justify="space-between">
                <div>
                  <Text size="sm" c="dimmed" tt="uppercase" fw={700}>
                    Total Smells
                  </Text>
                  <Text size="xl" fw={700}>
                    {stats?.totalSmells || 0}
                  </Text>
                </div>
                <IconCode size={32} className="text-blue-500" />
              </Group>
            </Card>
          </Grid.Col>

          <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
            <Card shadow="sm" padding="lg" radius="md" withBorder>
              <Group justify="space-between">
                <div>
                  <Text size="sm" c="dimmed" tt="uppercase" fw={700}>
                    Published
                  </Text>
                  <Text size="xl" fw={700}>
                    {stats?.publishedSmells || 0}
                  </Text>
                </div>
                <IconTrendingUp size={32} className="text-green-500" />
              </Group>
            </Card>
          </Grid.Col>

          <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
            <Card shadow="sm" padding="lg" radius="md" withBorder>
              <Group justify="space-between">
                <div>
                  <Text size="sm" c="dimmed" tt="uppercase" fw={700}>
                    Total Users
                  </Text>
                  <Text size="xl" fw={700}>
                    {stats?.totalUsers || 0}
                  </Text>
                </div>
                <IconUsers size={32} className="text-purple-500" />
              </Group>
            </Card>
          </Grid.Col>

          <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
            <Card shadow="sm" padding="lg" radius="md" withBorder>
              <Group justify="space-between">
                <div>
                  <Text size="sm" c="dimmed" tt="uppercase" fw={700}>
                    Active Users
                  </Text>
                  <Text size="xl" fw={700}>
                    {stats?.activeUsers || 0}
                  </Text>
                </div>
                <IconEye size={32} className="text-orange-500" />
              </Group>
            </Card>
          </Grid.Col>
        </Grid>

        {/* Additional Stats */}
        <Grid>
          <Grid.Col span={{ base: 12, sm: 6, md: 4 }}>
            <Card shadow="sm" padding="lg" radius="md" withBorder>
              <Group justify="space-between">
                <div>
                  <Text size="sm" c="dimmed" tt="uppercase" fw={700}>
                    Total Favorites
                  </Text>
                  <Text size="xl" fw={700}>
                    {stats?.totalFavorites || 0}
                  </Text>
                </div>
                <IconHeart size={32} className="text-red-500" />
              </Group>
            </Card>
          </Grid.Col>

          <Grid.Col span={{ base: 12, sm: 6, md: 4 }}>
            <Card shadow="sm" padding="lg" radius="md" withBorder>
              <Group justify="space-between">
                <div>
                  <Text size="sm" c="dimmed" tt="uppercase" fw={700}>
                    In Progress
                  </Text>
                  <Text size="xl" fw={700}>
                    {stats?.totalProgress || 0}
                  </Text>
                </div>
                <IconStar size={32} className="text-yellow-500" />
              </Group>
            </Card>
          </Grid.Col>

          <Grid.Col span={{ base: 12, sm: 6, md: 4 }}>
            <Card shadow="sm" padding="lg" radius="md" withBorder>
              <Group justify="space-between">
                <div>
                  <Text size="sm" c="dimmed" tt="uppercase" fw={700}>
                    Draft Smells
                  </Text>
                  <Text size="xl" fw={700}>
                    {stats?.draftSmells || 0}
                  </Text>
                </div>
                <IconClock size={32} className="text-gray-500" />
              </Group>
            </Card>
          </Grid.Col>
        </Grid>

        {/* Quick Actions */}
        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <Title order={3} size="h4" mb="md">
            Quick Actions
          </Title>
          <Group>
            <Button variant="light" leftSection={<IconCode size={16} />}>
              Add New Smell
            </Button>
            <Button variant="light" leftSection={<IconUsers size={16} />}>
              View Users
            </Button>
            <Button variant="light" leftSection={<IconTrendingUp size={16} />}>
              View Analytics
            </Button>
          </Group>
        </Card>

        {/* Role Info */}
        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <Group justify="space-between">
            <div>
              <Title order={4} size="h5">
                Your Role
              </Title>
              <Text c="dimmed">
                {isAdmin ? "Administrator" : "Moderator"} - You have access to
                admin features.
              </Text>
            </div>
            <Badge color={isAdmin ? "red" : "blue"} size="lg">
              {isAdmin ? "ADMIN" : "MODERATOR"}
            </Badge>
          </Group>
        </Card>
      </Stack>
    </Container>
  );
}
