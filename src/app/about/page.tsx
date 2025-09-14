"use client";

import {
  Container,
  Title,
  Text,
  Stack,
  Group,
  Button,
  Card,
  Grid,
  Box,
  Divider,
  Badge,
  List,
  ThemeIcon,
  Anchor,
} from "@mantine/core";
import {
  IconCode,
  IconHeart,
  IconUsers,
  IconCoffee,
  IconBrandGithub,
  IconBrandTwitter,
  IconMail,
  IconCheck,
} from "@tabler/icons-react";
import { useAnalytics } from "@/lib/hooks/use-analytics";
import { useEffect } from "react";

export default function AboutPage() {
  const analytics = useAnalytics();

  useEffect(() => {
    analytics.trackPageView("about");
  }, [analytics]);

  return (
    <Container size="lg" py="xl">
      {/* Hero Section */}
      <Stack gap="lg" mb="xl" align="center" ta="center">
        <Title order={1} size="h1">
          About Refactorium
        </Title>
        <Text size="xl" c="dimmed" maw={800}>
          A learn-by-doing playground for code quality patterns. Transform small
          code snippets from problem to refactor with side-by-side context.
        </Text>
        <Group gap="md" mt="md">
          <Badge color="blue" variant="light" size="lg">
            Open Source
          </Badge>
          <Badge color="green" variant="light" size="lg">
            Community Driven
          </Badge>
          <Badge color="orange" variant="light" size="lg">
            AI Era Ready
          </Badge>
        </Group>
      </Stack>

      {/* Vision Section */}
      <Card shadow="sm" padding="xl" radius="md" withBorder mb="xl">
        <Stack gap="lg">
          <Title order={2} size="h2" ta="center">
            Our Vision
          </Title>
          <Text size="lg" ta="center" c="dimmed">
            Empower developers with why-first, example-driven learning of code
            quality. Build a community-curated library of smells and refactor
            patterns that is easy to consume, remix, and extend.
          </Text>
        </Stack>
      </Card>

      {/* Why This Matters Section */}
      <Box mb="xl">
        <Title order={2} size="h2" ta="center" mb="lg">
          Why This Matters in the AI Era
        </Title>
        <Grid>
          <Grid.Col span={{ base: 12, md: 4 }}>
            <Stack gap="md" align="center" ta="center">
              <Box
                style={{
                  width: 80,
                  height: 80,
                  borderRadius: "50%",
                  background: "var(--mantine-color-blue-light)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <IconCode size={40} color="var(--mantine-color-blue-6)" />
              </Box>
              <Title order={3}>AI Guardrails</Title>
              <Text size="sm" c="dimmed">
                Catch AI-introduced smells early with human-in-the-loop
                validation. AI can produce "plausible" code that hides
                maintainability risks.
              </Text>
            </Stack>
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 4 }}>
            <Stack gap="md" align="center" ta="center">
              <Box
                style={{
                  width: 80,
                  height: 80,
                  borderRadius: "50%",
                  background: "var(--mantine-color-green-light)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <IconUsers size={40} color="var(--mantine-color-green-6)" />
              </Box>
              <Title order={3}>Collective Intelligence</Title>
              <Text size="sm" c="dimmed">
                Capture team knowledge as reusable refactor patterns that humans
                and AI can apply consistently across projects.
              </Text>
            </Stack>
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 4 }}>
            <Stack gap="md" align="center" ta="center">
              <Box
                style={{
                  width: 80,
                  height: 80,
                  borderRadius: "50%",
                  background: "var(--mantine-color-orange-light)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <IconHeart size={40} color="var(--mantine-color-orange-6)" />
              </Box>
              <Title order={3}>Safety Rails</Title>
              <Text size="sm" c="dimmed">
                Encourage experimentation with AI while providing fast feedback
                loops to avoid long-term quality debt.
              </Text>
            </Stack>
          </Grid.Col>
        </Grid>
      </Box>

      {/* Principles Section */}
      <Card shadow="sm" padding="xl" radius="md" withBorder mb="xl">
        <Stack gap="lg">
          <Title order={2} size="h2" ta="center">
            Our Principles
          </Title>
          <Grid>
            <Grid.Col span={{ base: 12, md: 6 }}>
              <List
                spacing="sm"
                size="sm"
                center
                icon={
                  <ThemeIcon color="blue" size={24} radius="xl">
                    <IconCheck size={16} />
                  </ThemeIcon>
                }
              >
                <List.Item>
                  <Text fw={500}>Open Source & Build-in-Public</Text>
                  <Text size="sm" c="dimmed">
                    Transparent development with community involvement
                  </Text>
                </List.Item>
                <List.Item>
                  <Text fw={500}>Simplicity</Text>
                  <Text size="sm" c="dimmed">
                    Zero-friction setup and contribution
                  </Text>
                </List.Item>
                <List.Item>
                  <Text fw={500}>Explainability</Text>
                  <Text size="sm" c="dimmed">
                    Each example includes smell signals, impact, and better
                    approach
                  </Text>
                </List.Item>
              </List>
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 6 }}>
              <List
                spacing="sm"
                size="sm"
                center
                icon={
                  <ThemeIcon color="green" size={24} radius="xl">
                    <IconCheck size={16} />
                  </ThemeIcon>
                }
              >
                <List.Item>
                  <Text fw={500}>Accessibility</Text>
                  <Text size="sm" c="dimmed">
                    Keyboard-first, light/dark themes, copy-friendly snippets
                  </Text>
                </List.Item>
                <List.Item>
                  <Text fw={500}>Pragmatism</Text>
                  <Text size="sm" c="dimmed">
                    Next.js + Mantine for fast iteration and strong DX
                  </Text>
                </List.Item>
                <List.Item>
                  <Text fw={500}>Open Standards</Text>
                  <Text size="sm" c="dimmed">
                    Portable smell definitions mappable to linters and CI bots
                  </Text>
                </List.Item>
              </List>
            </Grid.Col>
          </Grid>
        </Stack>
      </Card>

      {/* Support Section */}
      <Card shadow="sm" padding="xl" radius="md" withBorder mb="xl">
        <Stack gap="lg" align="center" ta="center">
          <Box
            style={{
              width: 80,
              height: 80,
              borderRadius: "50%",
              background: "var(--mantine-color-red-light)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <IconHeart size={40} color="var(--mantine-color-red-6)" />
          </Box>
          <Title order={2} size="h2">
            Support the Project
          </Title>
          <Text size="lg" c="dimmed" maw={600}>
            Refactorium is fully open-source and donation-based. If this project
            helps you or your team, consider supporting its development.
          </Text>

          <Button
            size="xl"
            color="orange"
            leftSection={<IconCoffee size={24} />}
            component="a"
            href="https://buymeacoffee.com/drcan94c"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              background: "linear-gradient(135deg, #ff6b35 0%, #f7931e 100%)",
              border: "none",
              boxShadow: "0 4px 15px rgba(255, 107, 53, 0.3)",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow =
                "0 6px 20px rgba(255, 107, 53, 0.4)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow =
                "0 4px 15px rgba(255, 107, 53, 0.3)";
            }}
          >
            ☕ Buy Me a Coffee
          </Button>

          <Text size="sm" c="dimmed" mt="lg" maw={500} ta="center">
            <strong>Fuel the development!</strong> Every coffee helps us
            maintain the servers, develop new features, and create more
            educational content for the developer community. Your support keeps
            Refactorium free and open-source for everyone.
          </Text>
        </Stack>
      </Card>

      {/* Connect Section */}
      <Card shadow="sm" padding="xl" radius="md" withBorder mb="xl">
        <Stack gap="lg" align="center" ta="center">
          <Title order={2} size="h2">
            Connect & Contribute
          </Title>
          <Text size="lg" c="dimmed" maw={600}>
            Join our community to share knowledge, report issues, or contribute
            to the project's development.
          </Text>

          <Group gap="md" mt="md">
            <Button
              size="lg"
              variant="light"
              leftSection={<IconBrandGithub size={20} />}
              component="a"
              href="https://github.com/drcan94/refactorium"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </Button>
            <Button
              size="lg"
              variant="light"
              leftSection={<IconBrandTwitter size={20} />}
              component="a"
              href="https://twitter.com/drcan94"
              target="_blank"
              rel="noopener noreferrer"
            >
              Twitter
            </Button>
            <Button
              size="lg"
              variant="light"
              leftSection={<IconMail size={20} />}
              component="a"
              href="mailto:drcan94@gmail.com"
            >
              Email
            </Button>
          </Group>
        </Stack>
      </Card>

      {/* Footer Links */}
      <Box ta="center" mt="xl">
        <Group gap="xl" justify="center">
          <Anchor href="/docs" size="sm">
            Documentation
          </Anchor>
          <Anchor href="/smells" size="sm">
            Explore Smells
          </Anchor>
          <Anchor href="/support" size="sm">
            Support
          </Anchor>
          <Anchor href="/settings" size="sm">
            Settings
          </Anchor>
        </Group>
      </Box>
    </Container>
  );
}
