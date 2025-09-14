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
  TextInput,
  Textarea,
  Select,
  Alert,
  List,
} from "@mantine/core";
import {
  IconCoffee,
  IconBrandGithub,
  IconBrandTwitter,
  IconMail,
  IconInfoCircle,
  IconBug,
  IconBulb,
  IconQuestionMark,
} from "@tabler/icons-react";
import { useAnalytics } from "@/lib/hooks/use-analytics";
import { useEffect } from "react";

export default function SupportPage() {
  const analytics = useAnalytics();

  useEffect(() => {
    analytics.trackPageView("support");
  }, [analytics]);

  return (
    <Container size="lg" py="xl">
      {/* Hero Section */}
      <Stack gap="lg" mb="xl" align="center" ta="center">
        <Title order={1} size="h1">
          Support & Help
        </Title>
        <Text size="lg" c="dimmed" maw={600}>
          Need help with Refactorium? We're here to assist you. Choose the best
          way to get support.
        </Text>
      </Stack>

      {/* Support Options */}
      <Grid mb="xl">
        <Grid.Col span={{ base: 12, md: 6 }}>
          <Card shadow="sm" padding="xl" radius="md" withBorder h="100%">
            <Stack gap="lg" align="center" ta="center">
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
                <IconCoffee size={40} color="var(--mantine-color-orange-6)" />
              </Box>
              <Title order={2} size="h3">
                Buy Me a Coffee
              </Title>
              <Text size="sm" c="dimmed">
                Support the project development and get priority support. Every
                coffee helps us improve Refactorium.
              </Text>
              <Button
                size="lg"
                color="orange"
                leftSection={<IconCoffee size={20} />}
                component="a"
                href="https://buymeacoffee.com/drcan94c"
                target="_blank"
                rel="noopener noreferrer"
              >
                ☕ Support Us
              </Button>
            </Stack>
          </Card>
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 6 }}>
          <Card shadow="sm" padding="xl" radius="md" withBorder h="100%">
            <Stack gap="lg" align="center" ta="center">
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
                <IconBrandGithub
                  size={40}
                  color="var(--mantine-color-blue-6)"
                />
              </Box>
              <Title order={2} size="h3">
                GitHub Issues
              </Title>
              <Text size="sm" c="dimmed">
                Report bugs, request features, or contribute to the project.
                Open source and community-driven.
              </Text>
              <Button
                size="lg"
                variant="light"
                color="blue"
                leftSection={<IconBrandGithub size={20} />}
                component="a"
                href="https://github.com/drcan94/refactorium/issues"
                target="_blank"
                rel="noopener noreferrer"
              >
                Open Issue
              </Button>
            </Stack>
          </Card>
        </Grid.Col>
      </Grid>

      {/* Contact Section */}
      <Card shadow="sm" padding="xl" radius="md" withBorder mb="xl">
        <Stack gap="lg" align="center" ta="center">
          <Title order={2} size="h2">
            Contact Us
          </Title>
          <Text size="lg" c="dimmed">
            Have a question or suggestion? Send us an email and we'll get back
            to you.
          </Text>

          <Button
            size="xl"
            variant="light"
            leftSection={<IconMail size={24} />}
            component="a"
            href="mailto:drcan94@gmail.com?subject=Refactorium Support"
            style={{
              background: "linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)",
              color: "white",
              border: "none",
              boxShadow: "0 4px 15px rgba(79, 70, 229, 0.3)",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow =
                "0 6px 20px rgba(79, 70, 229, 0.4)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow =
                "0 4px 15px rgba(79, 70, 229, 0.3)";
            }}
          >
            📧 drcan94@gmail.com
          </Button>

          <Text size="sm" c="dimmed">
            Click the button above to open your email client with a pre-filled
            subject line.
          </Text>
        </Stack>
      </Card>

      {/* FAQ Section */}
      <Card shadow="sm" padding="xl" radius="md" withBorder mb="xl">
        <Stack gap="lg">
          <Title order={2} size="h2" ta="center">
            Frequently Asked Questions
          </Title>

          <Grid>
            <Grid.Col span={{ base: 12, md: 6 }}>
              <Stack gap="md">
                <Box>
                  <Text fw={600} mb="xs">
                    How do I contribute code smells?
                  </Text>
                  <Text size="sm" c="dimmed">
                    You can contribute by opening a GitHub issue with your code
                    smell example, or by submitting a pull request with the new
                    smell data.
                  </Text>
                </Box>

                <Box>
                  <Text fw={600} mb="xs">
                    Is Refactorium free to use?
                  </Text>
                  <Text size="sm" c="dimmed">
                    Yes! Refactorium is completely free and open source. We
                    appreciate any support through Buy Me a Coffee to help
                    maintain the project.
                  </Text>
                </Box>

                <Box>
                  <Text fw={600} mb="xs">
                    How do I report a bug?
                  </Text>
                  <Text size="sm" c="dimmed">
                    Please use GitHub Issues to report bugs. Include steps to
                    reproduce, expected behavior, and any error messages you
                    see.
                  </Text>
                </Box>
              </Stack>
            </Grid.Col>

            <Grid.Col span={{ base: 12, md: 6 }}>
              <Stack gap="md">
                <Box>
                  <Text fw={600} mb="xs">
                    Can I use Refactorium for teaching?
                  </Text>
                  <Text size="sm" c="dimmed">
                    Absolutely! Refactorium is perfect for educators. The
                    examples are designed to be clear and educational for
                    students learning code quality.
                  </Text>
                </Box>

                <Box>
                  <Text fw={600} mb="xs">
                    How often is the content updated?
                  </Text>
                  <Text size="sm" c="dimmed">
                    We regularly add new code smells and improve existing
                    examples. Follow our GitHub repository to stay updated on
                    new additions.
                  </Text>
                </Box>

                <Box>
                  <Text fw={600} mb="xs">
                    Can I integrate Refactorium with my CI/CD?
                  </Text>
                  <Text size="sm" c="dimmed">
                    While not directly integrated yet, you can use our examples
                    to create custom linting rules or code quality checks in
                    your pipeline.
                  </Text>
                </Box>
              </Stack>
            </Grid.Col>
          </Grid>
        </Stack>
      </Card>

      {/* Additional Resources */}
      <Card shadow="sm" padding="xl" radius="md" withBorder>
        <Stack gap="lg" align="center" ta="center">
          <Title order={2} size="h2">
            Additional Resources
          </Title>
          <Text size="sm" c="dimmed">
            Find more help and connect with the community
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
              href="mailto:hello@refactorium.dev"
            >
              Email
            </Button>
          </Group>
        </Stack>
      </Card>
    </Container>
  );
}
