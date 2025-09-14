"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Container,
  Title,
  Text,
  Stack,
  Group,
  Button,
  Card,
  TextInput,
  Select,
  Textarea,
  MultiSelect,
  Switch,
  Alert,
  Loader,
  Box,
} from "@mantine/core";
import { RichTextEditor } from "@mantine/tiptap";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import { createLowlight } from "lowlight";
import {
  IconArrowLeft,
  IconCode,
  IconCheck,
  IconAlertCircle,
} from "@tabler/icons-react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { notifications } from "@mantine/notifications";
import { SmellCategory, DifficultyLevel } from "@/lib/types";
import { getCategoryLabel, getDifficultyLabel } from "@/lib/constants";

const categories = Object.values(SmellCategory).map((category) => ({
  value: category,
  label: getCategoryLabel(category),
}));

const difficulties = Object.values(DifficultyLevel).map((difficulty) => ({
  value: difficulty,
  label: getDifficultyLabel(difficulty),
}));

export default function NewSmellPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "" as SmellCategory | "",
    difficulty: "" as DifficultyLevel | "",
    tags: [] as string[],
    isPublished: false,
    problem: "",
    solution: "",
    testing: "",
    examples: "",
    references: "",
    badCode: "",
    goodCode: "",
    testHint: "",
  });

  const lowlight = createLowlight();

  // Rich text editors
  const problemEditor = useEditor({
    extensions: [
      StarterKit,
      CodeBlockLowlight.configure({
        lowlight,
      }),
    ],
    content: formData.problem,
    onUpdate: ({ editor }) => {
      setFormData((prev) => ({ ...prev, problem: editor.getHTML() }));
    },
  });

  const solutionEditor = useEditor({
    extensions: [
      StarterKit,
      CodeBlockLowlight.configure({
        lowlight,
      }),
    ],
    content: formData.solution,
    onUpdate: ({ editor }) => {
      setFormData((prev) => ({ ...prev, solution: editor.getHTML() }));
    },
  });

  const testingEditor = useEditor({
    extensions: [
      StarterKit,
      CodeBlockLowlight.configure({
        lowlight,
      }),
    ],
    content: formData.testing,
    onUpdate: ({ editor }) => {
      setFormData((prev) => ({ ...prev, testing: editor.getHTML() }));
    },
  });

  const examplesEditor = useEditor({
    extensions: [
      StarterKit,
      CodeBlockLowlight.configure({
        lowlight,
      }),
    ],
    content: formData.examples,
    onUpdate: ({ editor }) => {
      setFormData((prev) => ({ ...prev, examples: editor.getHTML() }));
    },
  });

  const referencesEditor = useEditor({
    extensions: [
      StarterKit,
      CodeBlockLowlight.configure({
        lowlight,
      }),
    ],
    content: formData.references,
    onUpdate: ({ editor }) => {
      setFormData((prev) => ({ ...prev, references: editor.getHTML() }));
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!session?.user?.id) {
      notifications.show({
        title: "Authentication Required",
        message: "Please sign in to create a smell",
        color: "red",
      });
      return;
    }

    if (
      !formData.title ||
      !formData.description ||
      !formData.badCode ||
      !formData.goodCode ||
      !formData.testHint
    ) {
      notifications.show({
        title: "Missing Required Fields",
        message: "Please fill in all required fields",
        color: "red",
      });
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("/api/smells", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          tags: formData.tags.join(","),
        }),
      });

      if (response.ok) {
        const smell = await response.json();
        notifications.show({
          title: "Success",
          message: "Smell created successfully!",
          color: "green",
        });
        router.push(`/smells/${smell.id}`);
      } else {
        const error = await response.json();
        notifications.show({
          title: "Error",
          message: error.error || "Failed to create smell",
          color: "red",
        });
      }
    } catch (error) {
      notifications.show({
        title: "Error",
        message: "Network error occurred",
        color: "red",
      });
    } finally {
      setLoading(false);
    }
  };

  if (status === "loading") {
    return (
      <Container size="lg" py="xl">
        <Group justify="center" py="xl">
          <Loader size="lg" />
          <Text>Loading...</Text>
        </Group>
      </Container>
    );
  }

  if (status === "unauthenticated") {
    return (
      <Container size="lg" py="xl">
        <Alert
          icon={<IconAlertCircle size={16} />}
          title="Authentication Required"
          color="blue"
        >
          Please sign in to create a new code smell.
        </Alert>
        <Button
          component={Link}
          href="/api/auth/signin"
          mt="md"
          leftSection={<IconCode size={16} />}
        >
          Sign In
        </Button>
      </Container>
    );
  }

  return (
    <Container size="lg" py="xl">
      {/* Header */}
      <Group justify="space-between" mb="xl">
        <Button
          component={Link}
          href="/smells"
          variant="light"
          leftSection={<IconArrowLeft size={16} />}
        >
          Back to Smells
        </Button>
      </Group>

      <form onSubmit={handleSubmit}>
        <Stack gap="xl">
          {/* Basic Information */}
          <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Stack gap="md">
              <Title order={2} size="h3">
                Basic Information
              </Title>

              <TextInput
                label="Title"
                placeholder="Enter smell title"
                value={formData.title}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, title: e.target.value }))
                }
                required
              />

              <Textarea
                label="Description"
                placeholder="Describe the code smell"
                value={formData.description}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
                minRows={3}
                required
              />

              <Group grow>
                <Select
                  label="Category"
                  placeholder="Select category"
                  data={categories}
                  value={formData.category}
                  onChange={(value) =>
                    setFormData((prev) => ({
                      ...prev,
                      category: value as SmellCategory,
                    }))
                  }
                  required
                />

                <Select
                  label="Difficulty"
                  placeholder="Select difficulty"
                  data={difficulties}
                  value={formData.difficulty}
                  onChange={(value) =>
                    setFormData((prev) => ({
                      ...prev,
                      difficulty: value as DifficultyLevel,
                    }))
                  }
                  required
                />
              </Group>

              <MultiSelect
                label="Tags"
                placeholder="Add tags (press Enter to add)"
                data={[]}
                value={formData.tags}
                onChange={(value) =>
                  setFormData((prev) => ({ ...prev, tags: value }))
                }
                searchable
              />

              <Switch
                label="Publish immediately"
                description="Make this smell visible to other users"
                checked={formData.isPublished}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    isPublished: e.currentTarget.checked,
                  }))
                }
              />
            </Stack>
          </Card>

          {/* Code Examples */}
          <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Stack gap="md">
              <Title order={2} size="h3">
                Code Examples
              </Title>

              <Textarea
                label="Bad Code"
                placeholder="Paste the problematic code here"
                value={formData.badCode}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, badCode: e.target.value }))
                }
                minRows={6}
                required
              />

              <Textarea
                label="Good Code"
                placeholder="Paste the refactored code here"
                value={formData.goodCode}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, goodCode: e.target.value }))
                }
                minRows={6}
                required
              />

              <TextInput
                label="Test Hint"
                placeholder="Provide a hint for testing the refactor"
                value={formData.testHint}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, testHint: e.target.value }))
                }
                required
              />
            </Stack>
          </Card>

          {/* Detailed Information */}
          <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Stack gap="md">
              <Title order={2} size="h3">
                Detailed Information (Optional)
              </Title>

              <Box>
                <Text size="sm" fw={500} mb="xs">
                  Problem Description
                </Text>
                <RichTextEditor editor={problemEditor}>
                  <RichTextEditor.Content />
                </RichTextEditor>
              </Box>

              <Box>
                <Text size="sm" fw={500} mb="xs">
                  Solution Description
                </Text>
                <RichTextEditor editor={solutionEditor}>
                  <RichTextEditor.Content />
                </RichTextEditor>
              </Box>

              <Box>
                <Text size="sm" fw={500} mb="xs">
                  Testing Guidelines
                </Text>
                <RichTextEditor editor={testingEditor}>
                  <RichTextEditor.Content />
                </RichTextEditor>
              </Box>

              <Box>
                <Text size="sm" fw={500} mb="xs">
                  Additional Examples
                </Text>
                <RichTextEditor editor={examplesEditor}>
                  <RichTextEditor.Content />
                </RichTextEditor>
              </Box>

              <Box>
                <Text size="sm" fw={500} mb="xs">
                  References
                </Text>
                <RichTextEditor editor={referencesEditor}>
                  <RichTextEditor.Content />
                </RichTextEditor>
              </Box>
            </Stack>
          </Card>

          {/* Submit Button */}
          <Group justify="flex-end">
            <Button
              type="submit"
              size="lg"
              leftSection={<IconCheck size={18} />}
              loading={loading}
            >
              Create Smell
            </Button>
          </Group>
        </Stack>
      </form>
    </Container>
  );
}
