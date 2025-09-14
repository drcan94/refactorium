"use client";

import {
  Container,
  Title,
  Text,
  Card,
  Stack,
  TextInput,
  Textarea,
  Select,
  Switch,
  Button,
  Group,
  Grid,
  Alert,
} from "@mantine/core";
import { IconArrowLeft, IconAlertCircle } from "@tabler/icons-react";
import { useAdminAuth } from "@/lib/hooks/use-admin-auth";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { AdminSmellForm, SmellCategory, DifficultyLevel } from "@/lib/types";
import { getCategoryLabel, getDifficultyLabel } from "@/lib/constants";

const initialForm: AdminSmellForm = {
  title: "",
  description: "",
  category: SmellCategory.CODE_SMELL,
  difficulty: DifficultyLevel.BEGINNER,
  tags: "",
  problem: "",
  solution: "",
  testing: "",
  examples: "",
  references: "",
  badCode: "",
  goodCode: "",
  testHint: "",
  isPublished: false,
};

export default function NewSmellPage() {
  const { isAdmin, isModerator } = useAdminAuth();
  const router = useRouter();
  const [form, setForm] = useState<AdminSmellForm>(initialForm);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/admin/smells", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (response.ok) {
        router.push("/admin/smells");
      } else {
        const errorData = await response.json();
        setError(errorData.error || "Failed to create smell");
      }
    } catch (err) {
      setError("An error occurred while creating the smell");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field: keyof AdminSmellForm, value: any) => {
    setForm({ ...form, [field]: value });
  };

  return (
    <Container size="lg" py="xl">
      <Stack gap="xl">
        {/* Header */}
        <Group>
          <Button
            variant="light"
            leftSection={<IconArrowLeft size={16} />}
            onClick={() => router.back()}
          >
            Back
          </Button>
          <div>
            <Title order={1} size="h2">
              Create New Smell
            </Title>
            <Text c="dimmed" size="sm">
              Add a new code smell to the collection
            </Text>
          </div>
        </Group>

        {/* Error Alert */}
        {error && (
          <Alert
            icon={<IconAlertCircle size={16} />}
            title="Error"
            color="red"
            onClose={() => setError(null)}
            withCloseButton
          >
            {error}
          </Alert>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Stack gap="md">
              {/* Basic Information */}
              <div>
                <Title order={3} size="h4" mb="md">
                  Basic Information
                </Title>
                <Grid>
                  <Grid.Col span={{ base: 12, md: 8 }}>
                    <TextInput
                      label="Title"
                      placeholder="Enter smell title"
                      value={form.title}
                      onChange={(e) => handleChange("title", e.target.value)}
                      required
                    />
                  </Grid.Col>
                  <Grid.Col span={{ base: 12, md: 4 }}>
                    <Switch
                      label="Published"
                      description="Make this smell visible to users"
                      checked={form.isPublished}
                      onChange={(e) =>
                        handleChange("isPublished", e.currentTarget.checked)
                      }
                    />
                  </Grid.Col>
                </Grid>

                <Textarea
                  label="Description"
                  placeholder="Brief description of the smell"
                  value={form.description}
                  onChange={(e) => handleChange("description", e.target.value)}
                  minRows={3}
                  required
                  mt="md"
                />

                <Grid mt="md">
                  <Grid.Col span={{ base: 12, md: 6 }}>
                    <Select
                      label="Category"
                      data={Object.values(SmellCategory).map((cat) => ({
                        value: cat,
                        label: getCategoryLabel(cat),
                      }))}
                      value={form.category}
                      onChange={(value) => handleChange("category", value)}
                      required
                    />
                  </Grid.Col>
                  <Grid.Col span={{ base: 12, md: 6 }}>
                    <Select
                      label="Difficulty Level"
                      data={Object.values(DifficultyLevel).map((diff) => ({
                        value: diff,
                        label: getDifficultyLabel(diff),
                      }))}
                      value={form.difficulty}
                      onChange={(value) => handleChange("difficulty", value)}
                      required
                    />
                  </Grid.Col>
                </Grid>

                <TextInput
                  label="Tags"
                  placeholder="comma-separated tags"
                  value={form.tags}
                  onChange={(e) => handleChange("tags", e.target.value)}
                  mt="md"
                />
              </div>

              {/* Code Examples */}
              <div>
                <Title order={3} size="h4" mb="md">
                  Code Examples
                </Title>
                <Textarea
                  label="Bad Code"
                  placeholder="Example of the problematic code"
                  value={form.badCode || ""}
                  onChange={(e) => handleChange("badCode", e.target.value)}
                  minRows={6}
                  required
                />

                <Textarea
                  label="Good Code"
                  placeholder="Example of the improved code"
                  value={form.goodCode || ""}
                  onChange={(e) => handleChange("goodCode", e.target.value)}
                  minRows={6}
                  required
                  mt="md"
                />

                <Textarea
                  label="Test Hint"
                  placeholder="Hint for testing the refactoring"
                  value={form.testHint || ""}
                  onChange={(e) => handleChange("testHint", e.target.value)}
                  minRows={3}
                  mt="md"
                />
              </div>

              {/* Detailed Information */}
              <div>
                <Title order={3} size="h4" mb="md">
                  Detailed Information
                </Title>
                <Textarea
                  label="Problem"
                  placeholder="Detailed explanation of the problem"
                  value={form.problem || ""}
                  onChange={(e) => handleChange("problem", e.target.value)}
                  minRows={4}
                />

                <Textarea
                  label="Solution"
                  placeholder="Detailed explanation of the solution"
                  value={form.solution || ""}
                  onChange={(e) => handleChange("solution", e.target.value)}
                  minRows={4}
                  mt="md"
                />

                <Textarea
                  label="Testing Guidelines"
                  placeholder="How to test the refactoring"
                  value={form.testing || ""}
                  onChange={(e) => handleChange("testing", e.target.value)}
                  minRows={3}
                  mt="md"
                />

                <Textarea
                  label="Additional Examples"
                  placeholder="More code examples or variations"
                  value={form.examples || ""}
                  onChange={(e) => handleChange("examples", e.target.value)}
                  minRows={3}
                  mt="md"
                />

                <Textarea
                  label="References"
                  placeholder="Links to related resources or documentation"
                  value={form.references || ""}
                  onChange={(e) => handleChange("references", e.target.value)}
                  minRows={2}
                  mt="md"
                />
              </div>

              {/* Actions */}
              <Group justify="flex-end" mt="xl">
                <Button
                  variant="light"
                  onClick={() => router.back()}
                  disabled={loading}
                >
                  Cancel
                </Button>
                <Button type="submit" loading={loading}>
                  Create Smell
                </Button>
              </Group>
            </Stack>
          </Card>
        </form>
      </Stack>
    </Container>
  );
}
