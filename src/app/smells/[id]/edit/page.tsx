"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { useSession } from "next-auth/react";
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
  IconTrash,
} from "@tabler/icons-react";
import Link from "next/link";
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

interface Smell {
  id: string;
  title: string;
  category: SmellCategory;
  description: string;
  badCode: string;
  goodCode: string;
  testHint: string;
  difficulty: DifficultyLevel;
  tags: string;
  isPublished: boolean;
  problem?: string;
  solution?: string;
  testing?: string;
  examples?: string;
  references?: string;
  authorId?: string;
}

export default function EditSmellPage() {
  const router = useRouter();
  const params = useParams();
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [smell, setSmell] = useState<Smell | null>(null);
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

  // Fetch smell data
  useEffect(() => {
    const fetchSmell = async () => {
      try {
        const response = await fetch(`/api/smells/${params.id}`);
        const data = await response.json();

        if (response.ok) {
          setSmell(data);
          setFormData({
            title: data.title,
            description: data.description,
            category: data.category,
            difficulty: data.difficulty,
            tags: data.tags
              ? data.tags.split(",").map((tag: string) => tag.trim())
              : [],
            isPublished: data.isPublished,
            problem: data.problem || "",
            solution: data.solution || "",
            testing: data.testing || "",
            examples: data.examples || "",
            references: data.references || "",
            badCode: data.badCode,
            goodCode: data.goodCode,
            testHint: data.testHint,
          });
        } else {
          notifications.show({
            title: "Error",
            message: data.error || "Failed to fetch smell",
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
        setFetching(false);
      }
    };

    if (params.id) {
      fetchSmell();
    }
  }, [params.id]);

  // Update editors when form data changes
  useEffect(() => {
    if (problemEditor && formData.problem !== problemEditor.getHTML()) {
      problemEditor.commands.setContent(formData.problem);
    }
    if (solutionEditor && formData.solution !== solutionEditor.getHTML()) {
      solutionEditor.commands.setContent(formData.solution);
    }
    if (testingEditor && formData.testing !== testingEditor.getHTML()) {
      testingEditor.commands.setContent(formData.testing);
    }
    if (examplesEditor && formData.examples !== examplesEditor.getHTML()) {
      examplesEditor.commands.setContent(formData.examples);
    }
    if (
      referencesEditor &&
      formData.references !== referencesEditor.getHTML()
    ) {
      referencesEditor.commands.setContent(formData.references);
    }
  }, [
    formData,
    problemEditor,
    solutionEditor,
    testingEditor,
    examplesEditor,
    referencesEditor,
  ]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!session?.user?.id) {
      notifications.show({
        title: "Authentication Required",
        message: "Please sign in to edit a smell",
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
      const response = await fetch(`/api/smells/${params.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          tags: formData.tags.join(","),
        }),
      });

      if (response.ok) {
        notifications.show({
          title: "Success",
          message: "Smell updated successfully!",
          color: "green",
        });
        router.push(`/smells/${params.id}`);
      } else {
        const error = await response.json();
        notifications.show({
          title: "Error",
          message: error.error || "Failed to update smell",
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

  const handleDelete = async () => {
    if (
      !confirm(
        "Are you sure you want to delete this smell? This action cannot be undone."
      )
    ) {
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`/api/smells/${params.id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        notifications.show({
          title: "Success",
          message: "Smell deleted successfully!",
          color: "green",
        });
        router.push("/smells");
      } else {
        const error = await response.json();
        notifications.show({
          title: "Error",
          message: error.error || "Failed to delete smell",
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

  if (status === "loading" || fetching) {
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
          Please sign in to edit a smell.
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

  if (!smell) {
    return (
      <Container size="lg" py="xl">
        <Alert
          icon={<IconAlertCircle size={16} />}
          title="Smell Not Found"
          color="red"
        >
          The smell you're looking for doesn't exist.
        </Alert>
        <Button
          component={Link}
          href="/smells"
          mt="md"
          leftSection={<IconArrowLeft size={16} />}
        >
          Back to Smells
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
          href={`/smells/${params.id}`}
          variant="light"
          leftSection={<IconArrowLeft size={16} />}
        >
          Back to Smell
        </Button>
        <Button
          color="red"
          variant="light"
          leftSection={<IconTrash size={16} />}
          onClick={handleDelete}
          loading={loading}
        >
          Delete Smell
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
              Update Smell
            </Button>
          </Group>
        </Stack>
      </form>
    </Container>
  );
}
