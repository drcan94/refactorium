"use client";

import {
  Container,
  Title,
  Text,
  Grid,
  Card,
  Stack,
  Group,
  Badge,
  Loader,
  Center,
  Tabs,
  Select,
  Button,
  Alert,
} from "@mantine/core";
import {
  IconTrendingUp,
  IconTrendingDown,
  IconUsers,
  IconCode,
  IconHeart,
  IconStar,
  IconCalendar,
  IconChartBar,
  IconRefresh,
  IconAlertCircle,
} from "@tabler/icons-react";
import { useAdminAuth } from "@/lib/hooks/use-admin-auth";
import { useEffect, useState } from "react";
import { LineChart, BarChart, PieChart, AreaChart } from "@mantine/charts";

interface AnalyticsData {
  overview: {
    totalSmells: number;
    publishedSmells: number;
    draftSmells: number;
    totalUsers: number;
    activeUsers: number;
    totalFavorites: number;
    totalProgress: number;
    recentActivity: number;
  };
  userAnalytics: {
    totalUsers: number;
    activeUsers: number;
    newUsersThisMonth: number;
    userGrowthRate: number;
    usersByRole: Record<string, number>;
    topUsers: Array<{
      id: string;
      name: string;
      email: string;
      favoritesCount: number;
      progressCount: number;
      activitiesCount: number;
      lastActive: string | null;
    }>;
    activityData: Array<{
      date: string;
      count: number;
    }>;
  };
  smellAnalytics: {
    smellsByCategory: Record<string, number>;
    smellsByDifficulty: Record<string, number>;
    popularSmells: Array<{
      id: string;
      title: string;
      favorites: number;
      progress: number;
    }>;
    smellsOverTime: Array<{
      date: string;
      count: number;
    }>;
  };
}

export default function AdminAnalyticsPage() {
  const { isAdmin, isModerator } = useAdminAuth();
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState("30d");
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    fetchAnalytics();
  }, [timeRange]);

  const fetchAnalytics = async () => {
    setLoading(true);
    try {
      const [overviewRes, userRes, smellRes] = await Promise.all([
        fetch("/api/admin/stats"),
        fetch("/api/admin/users/analytics"),
        fetch(`/api/admin/analytics/smells?timeRange=${timeRange}`),
      ]);

      const [overview, userAnalytics, smellAnalytics] = await Promise.all([
        overviewRes.json(),
        userRes.json(),
        smellRes.json(),
      ]);

      setData({
        overview,
        userAnalytics,
        smellAnalytics,
      });
    } catch (error) {
      console.error("Error fetching analytics:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Container size="lg" py="xl">
        <Center>
          <Stack align="center">
            <Loader size="lg" />
            <Text>Loading analytics...</Text>
          </Stack>
        </Center>
      </Container>
    );
  }

  if (!data) {
    return (
      <Container size="lg" py="xl">
        <Alert
          icon={<IconAlertCircle size={16} />}
          title="Error"
          color="red"
        >
          Failed to load analytics data
        </Alert>
      </Container>
    );
  }

  return (
    <Container size="lg" py="xl">
      <Stack gap="xl">
        {/* Header */}
        <Group justify="space-between">
          <div>
            <Title order={1} size="h2">
              Analytics Dashboard
            </Title>
            <Text c="dimmed" size="sm">
              Comprehensive insights into your platform's performance
            </Text>
          </div>
          <Group>
            <Select
              placeholder="Time Range"
              data={[
                { value: "7d", label: "Last 7 days" },
                { value: "30d", label: "Last 30 days" },
                { value: "90d", label: "Last 90 days" },
                { value: "1y", label: "Last year" },
              ]}
              value={timeRange}
              onChange={(value) => setTimeRange(value || "30d")}
            />
            <Button
              variant="light"
              leftSection={<IconRefresh size={16} />}
              onClick={fetchAnalytics}
            >
              Refresh
            </Button>
          </Group>
        </Group>

        {/* Overview Cards */}
        <Grid>
          <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
            <Card shadow="sm" padding="lg" radius="md" withBorder>
              <Group justify="space-between">
                <div>
                  <Text size="sm" c="dimmed" tt="uppercase" fw={700}>
                    Total Smells
                  </Text>
                  <Text size="xl" fw={700}>
                    {data.overview.totalSmells}
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
                    Total Users
                  </Text>
                  <Text size="xl" fw={700}>
                    {data.overview.totalUsers}
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
                    {data.overview.activeUsers}
                  </Text>
                  <Group gap="xs" mt="xs">
                    {data.userAnalytics.userGrowthRate > 0 ? (
                      <IconTrendingUp size={14} color="green" />
                    ) : (
                      <IconTrendingDown size={14} color="red" />
                    )}
                    <Text size="xs" c={data.userAnalytics.userGrowthRate > 0 ? "green" : "red"}>
                      {Math.abs(data.userAnalytics.userGrowthRate)}%
                    </Text>
                  </Group>
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
                    Total Favorites
                  </Text>
                  <Text size="xl" fw={700}>
                    {data.overview.totalFavorites}
                  </Text>
                </div>
                <IconHeart size={32} className="text-red-500" />
              </Group>
            </Card>
          </Grid.Col>
        </Grid>

        {/* Detailed Analytics Tabs */}
        <Tabs value={activeTab} onChange={(value) => setActiveTab(value || "overview")}>
          <Tabs.List>
            <Tabs.Tab value="overview" leftSection={<IconChartBar size={16} />}>
              Overview
            </Tabs.Tab>
            <Tabs.Tab value="users" leftSection={<IconUsers size={16} />}>
              Users
            </Tabs.Tab>
            <Tabs.Tab value="smells" leftSection={<IconCode size={16} />}>
              Smells
            </Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="overview" pt="md">
            <Grid>
              <Grid.Col span={{ base: 12, md: 8 }}>
                <Card shadow="sm" padding="lg" radius="md" withBorder>
                  <Title order={3} size="h4" mb="md">
                    User Activity Over Time
                  </Title>
                  <AreaChart
                    h={300}
                    data={data.userAnalytics.activityData}
                    dataKey="date"
                    series={[
                      { name: "count", color: "blue", label: "Daily Activity" },
                    ]}
                    curveType="linear"
                  />
                </Card>
              </Grid.Col>

              <Grid.Col span={{ base: 12, md: 4 }}>
                <Card shadow="sm" padding="lg" radius="md" withBorder>
                  <Title order={3} size="h4" mb="md">
                    Users by Role
                  </Title>
                  <PieChart
                    h={300}
                    data={Object.entries(data.userAnalytics.usersByRole).map(([role, count]) => ({
                      name: role,
                      value: count,
                      color: role === "ADMIN" ? "red" : role === "MODERATOR" ? "blue" : "gray",
                    }))}
                    withTooltip
                    tooltipDataSource="segment"
                  />
                </Card>
              </Grid.Col>
            </Grid>
          </Tabs.Panel>

          <Tabs.Panel value="users" pt="md">
            <Grid>
              <Grid.Col span={{ base: 12, md: 6 }}>
                <Card shadow="sm" padding="lg" radius="md" withBorder>
                  <Title order={3} size="h4" mb="md">
                    User Growth
                  </Title>
                  <BarChart
                    h={300}
                    data={data.userAnalytics.activityData}
                    dataKey="date"
                    series={[
                      { name: "count", color: "blue", label: "New Users" },
                    ]}
                  />
                </Card>
              </Grid.Col>

              <Grid.Col span={{ base: 12, md: 6 }}>
                <Card shadow="sm" padding="lg" radius="md" withBorder>
                  <Title order={3} size="h4" mb="md">
                    Top Active Users
                  </Title>
                  <Stack gap="sm">
                    {data.userAnalytics.topUsers.slice(0, 5).map((user, index) => (
                      <Group key={user.id} justify="space-between">
                        <Group gap="sm">
                          <Badge size="sm" color="blue">
                            #{index + 1}
                          </Badge>
                          <div>
                            <Text size="sm" fw={500}>
                              {user.name}
                            </Text>
                            <Text size="xs" c="dimmed">
                              {user.email}
                            </Text>
                          </div>
                        </Group>
                        <Group gap="xs">
                          <Group gap={4}>
                            <IconHeart size={12} color="red" />
                            <Text size="xs">{user.favoritesCount}</Text>
                          </Group>
                          <Group gap={4}>
                            <IconStar size={12} color="orange" />
                            <Text size="xs">{user.progressCount}</Text>
                          </Group>
                        </Group>
                      </Group>
                    ))}
                  </Stack>
                </Card>
              </Grid.Col>
            </Grid>
          </Tabs.Panel>

          <Tabs.Panel value="smells" pt="md">
            <Grid>
              <Grid.Col span={{ base: 12, md: 6 }}>
                <Card shadow="sm" padding="lg" radius="md" withBorder>
                  <Title order={3} size="h4" mb="md">
                    Smells by Category
                  </Title>
                  <BarChart
                    h={300}
                    data={Object.entries(data.smellAnalytics.smellsByCategory).map(([category, count]) => ({
                      category,
                      count,
                    }))}
                    dataKey="category"
                    series={[
                      { name: "count", color: "blue", label: "Count" },
                    ]}
                  />
                </Card>
              </Grid.Col>

              <Grid.Col span={{ base: 12, md: 6 }}>
                <Card shadow="sm" padding="lg" radius="md" withBorder>
                  <Title order={3} size="h4" mb="md">
                    Smells by Difficulty
                  </Title>
                  <PieChart
                    h={300}
                    data={Object.entries(data.smellAnalytics.smellsByDifficulty).map(([difficulty, count]) => ({
                      name: difficulty,
                      value: count,
                      color: difficulty === "EXPERT" ? "red" : difficulty === "HARD" ? "orange" : difficulty === "MEDIUM" ? "yellow" : "green",
                    }))}
                    withTooltip
                    tooltipDataSource="segment"
                  />
                </Card>
              </Grid.Col>

              <Grid.Col span={12}>
                <Card shadow="sm" padding="lg" radius="md" withBorder>
                  <Title order={3} size="h4" mb="md">
                    Popular Smells
                  </Title>
                  <Stack gap="sm">
                    {data.smellAnalytics.popularSmells.slice(0, 10).map((smell, index) => (
                      <Group key={smell.id} justify="space-between">
                        <Group gap="sm">
                          <Badge size="sm" color="blue">
                            #{index + 1}
                          </Badge>
                          <Text size="sm" fw={500}>
                            {smell.title}
                          </Text>
                        </Group>
                        <Group gap="xs">
                          <Group gap={4}>
                            <IconHeart size={12} color="red" />
                            <Text size="xs">{smell.favorites}</Text>
                          </Group>
                          <Group gap={4}>
                            <IconStar size={12} color="orange" />
                            <Text size="xs">{smell.progress}</Text>
                          </Group>
                        </Group>
                      </Group>
                    ))}
                  </Stack>
                </Card>
              </Grid.Col>
            </Grid>
          </Tabs.Panel>
        </Tabs>
      </Stack>
    </Container>
  );
}
