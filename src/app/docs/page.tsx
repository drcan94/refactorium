"use client";

import { useState } from "react";
import {
  Container,
  Title,
  Text,
  Stack,
  Group,
  Card,
  Button,
  Badge,
  Tabs,
  Grid,
  Box,
  Alert,
  Code,
  Divider,
  ActionIcon,
  Tooltip,
} from "@mantine/core";
import {
  IconCode,
  IconBulb,
  IconCheck,
  IconX,
  IconStar,
  IconHeart,
  IconExternalLink,
  IconInfoCircle,
} from "@tabler/icons-react";
import { SmellWithCounts } from "@/lib/types";
import {
  getDifficultyStars,
  getDifficultyColor,
  getCategoryLabel,
} from "@/lib/constants";

// Sample code smells for demonstration
const sampleSmells: SmellWithCounts[] = [
  {
    id: "demo-1",
    title: "Magic Numbers",
    category: "READABILITY" as any,
    description:
      "Unexplained numeric literals that make code hard to understand and maintain.",
    difficulty: "BEGINNER" as any,
    tags: "constants,readability,maintenance",
    isPublished: true,
    problem: null,
    solution: null,
    testing: null,
    examples: null,
    references: null,
    badCode: `function calculateDiscount(price, userType) {
  if (userType === 'premium') {
    return price * 0.15; // What is 0.15?
  } else if (userType === 'vip') {
    return price * 0.25; // What is 0.25?
  }
  return price * 0.05; // What is 0.05?
}`,
    goodCode: `const DISCOUNT_RATES = {
  PREMIUM: 0.15,
  VIP: 0.25,
  STANDARD: 0.05
} as const;

function calculateDiscount(price: number, userType: UserType): number {
  const discountRate = DISCOUNT_RATES[userType] || DISCOUNT_RATES.STANDARD;
  return price * discountRate;
}`,
    testHint:
      "Test with different discount rates and user types. Verify constants are used correctly.",
    createdAt: new Date(),
    updatedAt: new Date(),
    _count: { favorites: 12, progress: 8 },
  },
  {
    id: "demo-2",
    title: "Long Parameter List",
    category: "CODE_SMELL" as any,
    description:
      "Functions with too many parameters that are hard to understand and maintain.",
    difficulty: "EASY" as any,
    tags: "functions,parameters,refactoring",
    isPublished: true,
    problem: null,
    solution: null,
    testing: null,
    examples: null,
    references: null,
    badCode: `function createUser(firstName, lastName, email, phone, address, city, state, zipCode, country, dateOfBirth, gender, occupation, salary, department, managerId, startDate, isActive, notes) {
  // Function with 18 parameters!
  return {
    firstName, lastName, email, phone, address, city, state, zipCode,
    country, dateOfBirth, gender, occupation, salary, department,
    managerId, startDate, isActive, notes
  };
}`,
    goodCode: `interface UserData {
  personalInfo: PersonalInfo;
  contactInfo: ContactInfo;
  employmentInfo: EmploymentInfo;
  metadata: UserMetadata;
}

function createUser(userData: UserData): User {
  return {
    ...userData.personalInfo,
    ...userData.contactInfo,
    ...userData.employmentInfo,
    ...userData.metadata
  };
}`,
    testHint:
      "Test with different combinations of user data. Verify the object structure is maintained.",
    createdAt: new Date(),
    updatedAt: new Date(),
    _count: { favorites: 15, progress: 6 },
  },
];

export default function DocsPage() {
  const [selectedSmell, setSelectedSmell] = useState<SmellWithCounts>(
    sampleSmells[0]
  );
  const [activeTab, setActiveTab] = useState<string | null>("overview");

  return (
    <Container size="lg" py="xl">
      <Stack gap="xl">
        {/* Hero Section */}
        <Stack gap="md" ta="center">
          <Title order={1} size="h1">
            Interactive Code Smells Guide
          </Title>
          <Text size="lg" c="dimmed" maw={600} mx="auto">
            Learn to identify, understand, and refactor code smells through
            interactive examples. Master the art of clean code with real-world
            scenarios.
          </Text>
        </Stack>

        {/* Quick Stats */}
        <Grid>
          <Grid.Col span={{ base: 12, sm: 4 }}>
            <Card shadow="sm" padding="lg" ta="center">
              <Stack gap="sm">
                <Box
                  style={{
                    width: 60,
                    height: 60,
                    borderRadius: "50%",
                    background: "var(--mantine-color-blue-light)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto",
                  }}
                >
                  <IconCode size={30} color="var(--mantine-color-blue-6)" />
                </Box>
                <Title order={4}>Interactive Examples</Title>
                <Text size="sm" c="dimmed">
                  Hands-on code examples you can explore and understand
                </Text>
              </Stack>
            </Card>
          </Grid.Col>
          <Grid.Col span={{ base: 12, sm: 4 }}>
            <Card shadow="sm" padding="lg" ta="center">
              <Stack gap="sm">
                <Box
                  style={{
                    width: 60,
                    height: 60,
                    borderRadius: "50%",
                    background: "var(--mantine-color-green-light)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto",
                  }}
                >
                  <IconBulb size={30} color="var(--mantine-color-green-6)" />
                </Box>
                <Title order={4}>Best Practices</Title>
                <Text size="sm" c="dimmed">
                  Learn proven refactoring techniques and patterns
                </Text>
              </Stack>
            </Card>
          </Grid.Col>
          <Grid.Col span={{ base: 12, sm: 4 }}>
            <Card shadow="sm" padding="lg" ta="center">
              <Stack gap="sm">
                <Box
                  style={{
                    width: 60,
                    height: 60,
                    borderRadius: "50%",
                    background: "var(--mantine-color-orange-light)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto",
                  }}
                >
                  <IconCheck size={30} color="var(--mantine-color-orange-6)" />
                </Box>
                <Title order={4}>Test Strategies</Title>
                <Text size="sm" c="dimmed">
                  Understand how to test refactored code effectively
                </Text>
              </Stack>
            </Card>
          </Grid.Col>
        </Grid>

        {/* Interactive Examples */}
        <Card shadow="sm" padding="xl">
          <Stack gap="lg">
            <Group justify="space-between" align="flex-start">
              <Box>
                <Title order={2} mb="sm">
                  Interactive Code Smell Examples
                </Title>
                <Text c="dimmed">
                  Select a code smell below to see the problem, solution, and
                  testing approach.
                </Text>
              </Box>
              <Button
                variant="light"
                rightSection={<IconExternalLink size={16} />}
                component="a"
                href="/smells"
              >
                Explore All Smells
              </Button>
            </Group>

            {/* Smell Selection */}
            <Grid>
              {sampleSmells.map((smell) => (
                <Grid.Col key={smell.id} span={{ base: 12, md: 6 }}>
                  <Card
                    shadow="sm"
                    padding="md"
                    radius="md"
                    style={{
                      cursor: "pointer",
                      border:
                        selectedSmell.id === smell.id
                          ? "2px solid var(--mantine-color-blue-5)"
                          : "1px solid var(--mantine-color-gray-3)",
                    }}
                    onClick={() => setSelectedSmell(smell)}
                  >
                    <Stack gap="sm">
                      <Group justify="space-between" align="flex-start">
                        <Title order={4} size="h5">
                          {smell.title}
                        </Title>
                        <Badge
                          color={getDifficultyColor(smell.difficulty)}
                          variant="light"
                          size="sm"
                        >
                          {Array.from(
                            { length: getDifficultyStars(smell.difficulty) },
                            (_, i) => (
                              <IconStar key={i} size={12} fill="currentColor" />
                            )
                          )}
                        </Badge>
                      </Group>
                      <Badge color="blue" size="sm">
                        {getCategoryLabel(smell.category)}
                      </Badge>
                      <Text size="sm" c="dimmed" lineClamp={2}>
                        {smell.description}
                      </Text>
                      <Group justify="space-between">
                        <Group gap="xs">
                          <Group gap="xs">
                            <IconHeart size={14} color="red" />
                            <Text size="xs" c="dimmed">
                              {smell._count.favorites}
                            </Text>
                          </Group>
                          <Group gap="xs">
                            <IconStar size={14} color="orange" />
                            <Text size="xs" c="dimmed">
                              {smell._count.progress}
                            </Text>
                          </Group>
                        </Group>
                        {selectedSmell.id === smell.id && (
                          <Badge color="blue" size="sm">
                            Selected
                          </Badge>
                        )}
                      </Group>
                    </Stack>
                  </Card>
                </Grid.Col>
              ))}
            </Grid>

            {/* Selected Smell Details */}
            <Divider />

            <Tabs value={activeTab} onChange={setActiveTab}>
              <Tabs.List>
                <Tabs.Tab
                  value="overview"
                  leftSection={<IconInfoCircle size={16} />}
                >
                  Overview
                </Tabs.Tab>
                <Tabs.Tab value="problem" leftSection={<IconX size={16} />}>
                  Problem
                </Tabs.Tab>
                <Tabs.Tab
                  value="solution"
                  leftSection={<IconCheck size={16} />}
                >
                  Solution
                </Tabs.Tab>
                <Tabs.Tab value="testing" leftSection={<IconBulb size={16} />}>
                  Testing
                </Tabs.Tab>
              </Tabs.List>

              <Tabs.Panel value="overview" pt="md">
                <Stack gap="md">
                  <Title order={3}>{selectedSmell.title}</Title>
                  <Text>{selectedSmell.description}</Text>

                  <Group gap="md">
                    <Badge color="blue" size="lg">
                      {getCategoryLabel(selectedSmell.category)}
                    </Badge>
                    <Badge
                      color={getDifficultyColor(selectedSmell.difficulty)}
                      variant="light"
                      size="lg"
                    >
                      {Array.from(
                        {
                          length: getDifficultyStars(selectedSmell.difficulty),
                        },
                        (_, i) => (
                          <IconStar key={i} size={14} fill="currentColor" />
                        )
                      )}
                    </Badge>
                  </Group>

                  <Alert
                    icon={<IconInfoCircle size={16} />}
                    color="blue"
                    variant="light"
                  >
                    <Text size="sm">
                      <strong>Tags:</strong> {selectedSmell.tags}
                    </Text>
                  </Alert>
                </Stack>
              </Tabs.Panel>

              <Tabs.Panel value="problem" pt="md">
                <Stack gap="md">
                  <Title order={3}>The Problem</Title>
                  <Text c="dimmed">
                    Here's what the code looks like before refactoring - notice
                    the issues:
                  </Text>
                  <Code block>{selectedSmell.badCode}</Code>
                  <Alert color="red" variant="light" icon={<IconX size={16} />}>
                    <Text size="sm">
                      <strong>Issues:</strong> This code has several problems
                      that make it hard to maintain, understand, and test. Can
                      you identify them?
                    </Text>
                  </Alert>
                </Stack>
              </Tabs.Panel>

              <Tabs.Panel value="solution" pt="md">
                <Stack gap="md">
                  <Title order={3}>The Solution</Title>
                  <Text c="dimmed">
                    Here's how we can refactor the code to make it cleaner and
                    more maintainable:
                  </Text>
                  <Code block>{selectedSmell.goodCode}</Code>
                  <Alert
                    color="green"
                    variant="light"
                    icon={<IconCheck size={16} />}
                  >
                    <Text size="sm">
                      <strong>Improvements:</strong> The refactored code is more
                      readable, maintainable, and follows best practices.
                    </Text>
                  </Alert>
                </Stack>
              </Tabs.Panel>

              <Tabs.Panel value="testing" pt="md">
                <Stack gap="md">
                  <Title order={3}>Testing Strategy</Title>
                  <Text c="dimmed">
                    Here's how to test the refactored code effectively:
                  </Text>
                  <Alert
                    color="yellow"
                    variant="light"
                    icon={<IconBulb size={16} />}
                  >
                    <Text size="sm">
                      <strong>Test Hint:</strong> {selectedSmell.testHint}
                    </Text>
                  </Alert>

                  <Card
                    shadow="sm"
                    padding="md"
                    bg="var(--mantine-color-gray-0)"
                  >
                    <Stack gap="sm">
                      <Title order={4} size="h5">
                        Testing Checklist
                      </Title>
                      <Stack gap="xs">
                        <Group gap="xs">
                          <IconCheck size={16} color="green" />
                          <Text size="sm">
                            Test all code paths and edge cases
                          </Text>
                        </Group>
                        <Group gap="xs">
                          <IconCheck size={16} color="green" />
                          <Text size="sm">
                            Verify the refactored code produces the same results
                          </Text>
                        </Group>
                        <Group gap="xs">
                          <IconCheck size={16} color="green" />
                          <Text size="sm">
                            Test error handling and validation
                          </Text>
                        </Group>
                        <Group gap="xs">
                          <IconCheck size={16} color="green" />
                          <Text size="sm">
                            Ensure performance is maintained or improved
                          </Text>
                        </Group>
                      </Stack>
                    </Stack>
                  </Card>
                </Stack>
              </Tabs.Panel>
            </Tabs>
          </Stack>
        </Card>

        {/* Getting Started */}
        <Card shadow="sm" padding="xl">
          <Stack gap="md">
            <Title order={2}>Getting Started</Title>
            <Text c="dimmed">
              Ready to start learning? Here's how to make the most of this
              interactive guide:
            </Text>

            <Grid>
              <Grid.Col span={{ base: 12, md: 4 }}>
                <Stack gap="sm">
                  <Title order={4} size="h5">
                    1. Explore Examples
                  </Title>
                  <Text size="sm">
                    Click through different code smells to see various problems
                    and solutions.
                  </Text>
                </Stack>
              </Grid.Col>
              <Grid.Col span={{ base: 12, md: 4 }}>
                <Stack gap="sm">
                  <Title order={4} size="h5">
                    2. Understand Patterns
                  </Title>
                  <Text size="sm">
                    Look for common patterns in the refactored solutions that
                    you can apply elsewhere.
                  </Text>
                </Stack>
              </Grid.Col>
              <Grid.Col span={{ base: 12, md: 4 }}>
                <Stack gap="sm">
                  <Title order={4} size="h5">
                    3. Practice Testing
                  </Title>
                  <Text size="sm">
                    Use the testing strategies to ensure your refactored code
                    works correctly.
                  </Text>
                </Stack>
              </Grid.Col>
            </Grid>

            <Group justify="center" mt="md">
              <Button
                size="lg"
                rightSection={<IconExternalLink size={18} />}
                component="a"
                href="/smells"
              >
                Start Exploring All Smells
              </Button>
            </Group>
          </Stack>
        </Card>
      </Stack>
    </Container>
  );
}
