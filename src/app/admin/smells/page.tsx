"use client";

import {
  Container,
  Title,
  Text,
  Button,
  Group,
  Card,
  Table,
  Badge,
  ActionIcon,
  Menu,
  TextInput,
  Select,
  Grid,
  Stack,
  Modal,
  Textarea,
  Switch,
  Loader,
  Center,
  Pagination,
  Checkbox,
} from "@mantine/core";
import {
  IconPlus,
  IconSearch,
  IconFilter,
  IconEdit,
  IconTrash,
  IconEye,
  IconDots,
  IconEyeOff,
  IconEyeCheck,
  IconCode,
  IconCalendar,
  IconStar,
  IconHeart,
} from "@tabler/icons-react";
import { useAdminAuth } from "@/lib/hooks/use-admin-auth";
import { useEffect, useState } from "react";
import {
  AdminSmell,
  AdminSmellForm,
  SmellCategory,
  DifficultyLevel,
} from "@/lib/types";
import {
  getCategoryLabel,
  getDifficultyLabel,
  getDifficultyStars,
} from "@/lib/constants";

interface SmellsFilters {
  search: string;
  category: string;
  difficulty: string;
  status: string;
  sortBy: string;
  sortOrder: "asc" | "desc";
}

export default function AdminSmellsPage() {
  const { isAdmin, isModerator } = useAdminAuth();
  const [smells, setSmells] = useState<AdminSmell[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSmells, setSelectedSmells] = useState<string[]>([]);
  const [filters, setFilters] = useState<SmellsFilters>({
    search: "",
    category: "",
    difficulty: "",
    status: "",
    sortBy: "createdAt",
    sortOrder: "desc",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalSmells, setTotalSmells] = useState(0);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [smellToDelete, setSmellToDelete] = useState<string | null>(null);

  const itemsPerPage = 10;

  useEffect(() => {
    fetchSmells();
  }, [filters, currentPage]);

  const fetchSmells = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: itemsPerPage.toString(),
        ...filters,
      });

      const response = await fetch(`/api/admin/smells?${params}`);
      const data = await response.json();

      setSmells(data.smells);
      setTotalPages(data.totalPages);
      setTotalSmells(data.total);
    } catch (error) {
      console.error("Error fetching smells:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (smellId: string) => {
    try {
      const response = await fetch(`/api/admin/smells/${smellId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        fetchSmells();
        setDeleteModalOpen(false);
        setSmellToDelete(null);
      }
    } catch (error) {
      console.error("Error deleting smell:", error);
    }
  };

  const handleBulkAction = async (action: string) => {
    if (selectedSmells.length === 0) return;

    try {
      const response = await fetch("/api/admin/smells/bulk", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action,
          smellIds: selectedSmells,
        }),
      });

      if (response.ok) {
        fetchSmells();
        setSelectedSmells([]);
      }
    } catch (error) {
      console.error("Error performing bulk action:", error);
    }
  };

  const toggleSmellStatus = async (smellId: string, isPublished: boolean) => {
    try {
      const response = await fetch(`/api/admin/smells/${smellId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          isPublished: !isPublished,
        }),
      });

      if (response.ok) {
        fetchSmells();
      }
    } catch (error) {
      console.error("Error toggling smell status:", error);
    }
  };

  if (loading) {
    return (
      <Container size="lg" py="xl">
        <Center>
          <Stack align="center">
            <Loader size="lg" />
            <Text>Loading smells...</Text>
          </Stack>
        </Center>
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
              Code Smells Management
            </Title>
            <Text c="dimmed" size="sm">
              Manage and organize your code smells collection
            </Text>
          </div>
          <Button leftSection={<IconPlus size={16} />}>Add New Smell</Button>
        </Group>

        {/* Filters */}
        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <Grid>
            <Grid.Col span={{ base: 12, md: 4 }}>
              <TextInput
                placeholder="Search smells..."
                leftSection={<IconSearch size={16} />}
                value={filters.search}
                onChange={(e) =>
                  setFilters({ ...filters, search: e.target.value })
                }
              />
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 2 }}>
              <Select
                placeholder="Category"
                data={[
                  { value: "", label: "All Categories" },
                  ...Object.values(SmellCategory).map((cat) => ({
                    value: cat,
                    label: getCategoryLabel(cat),
                  })),
                ]}
                value={filters.category}
                onChange={(value) =>
                  setFilters({ ...filters, category: value || "" })
                }
              />
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 2 }}>
              <Select
                placeholder="Difficulty"
                data={[
                  { value: "", label: "All Difficulties" },
                  ...Object.values(DifficultyLevel).map((diff) => ({
                    value: diff,
                    label: getDifficultyLabel(diff),
                  })),
                ]}
                value={filters.difficulty}
                onChange={(value) =>
                  setFilters({ ...filters, difficulty: value || "" })
                }
              />
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 2 }}>
              <Select
                placeholder="Status"
                data={[
                  { value: "", label: "All Status" },
                  { value: "published", label: "Published" },
                  { value: "draft", label: "Draft" },
                ]}
                value={filters.status}
                onChange={(value) =>
                  setFilters({ ...filters, status: value || "" })
                }
              />
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 2 }}>
              <Select
                placeholder="Sort By"
                data={[
                  { value: "createdAt", label: "Created Date" },
                  { value: "title", label: "Title" },
                  { value: "category", label: "Category" },
                  { value: "difficulty", label: "Difficulty" },
                  { value: "favorites", label: "Favorites" },
                ]}
                value={filters.sortBy}
                onChange={(value) =>
                  setFilters({ ...filters, sortBy: value || "createdAt" })
                }
              />
            </Grid.Col>
          </Grid>
        </Card>

        {/* Bulk Actions */}
        {selectedSmells.length > 0 && (
          <Card shadow="sm" padding="md" radius="md" withBorder>
            <Group justify="space-between">
              <Text size="sm" c="dimmed">
                {selectedSmells.length} smell(s) selected
              </Text>
              <Group>
                <Button
                  variant="light"
                  color="green"
                  size="sm"
                  onClick={() => handleBulkAction("publish")}
                >
                  Publish
                </Button>
                <Button
                  variant="light"
                  color="orange"
                  size="sm"
                  onClick={() => handleBulkAction("unpublish")}
                >
                  Unpublish
                </Button>
                <Button
                  variant="light"
                  color="red"
                  size="sm"
                  onClick={() => handleBulkAction("delete")}
                >
                  Delete
                </Button>
              </Group>
            </Group>
          </Card>
        )}

        {/* Smells Table */}
        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <Table>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>
                  <Checkbox
                    checked={selectedSmells.length === smells.length}
                    onChange={(e) => {
                      if (e.currentTarget.checked) {
                        setSelectedSmells(smells.map((s) => s.id));
                      } else {
                        setSelectedSmells([]);
                      }
                    }}
                  />
                </Table.Th>
                <Table.Th>Title</Table.Th>
                <Table.Th>Category</Table.Th>
                <Table.Th>Difficulty</Table.Th>
                <Table.Th>Status</Table.Th>
                <Table.Th>Stats</Table.Th>
                <Table.Th>Created</Table.Th>
                <Table.Th>Actions</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {smells.map((smell) => (
                <Table.Tr key={smell.id}>
                  <Table.Td>
                    <Checkbox
                      checked={selectedSmells.includes(smell.id)}
                      onChange={(e) => {
                        if (e.currentTarget.checked) {
                          setSelectedSmells([...selectedSmells, smell.id]);
                        } else {
                          setSelectedSmells(
                            selectedSmells.filter((id) => id !== smell.id)
                          );
                        }
                      }}
                    />
                  </Table.Td>
                  <Table.Td>
                    <div>
                      <Text fw={500} size="sm">
                        {smell.title}
                      </Text>
                      <Text size="xs" c="dimmed" lineClamp={1}>
                        {smell.description}
                      </Text>
                    </div>
                  </Table.Td>
                  <Table.Td>
                    <Badge color="blue" size="sm">
                      {getCategoryLabel(smell.category)}
                    </Badge>
                  </Table.Td>
                  <Table.Td>
                    <Badge
                      color={
                        smell.difficulty === "EXPERT"
                          ? "red"
                          : smell.difficulty === "HARD"
                          ? "orange"
                          : smell.difficulty === "MEDIUM"
                          ? "yellow"
                          : "green"
                      }
                      size="sm"
                    >
                      {Array.from(
                        { length: getDifficultyStars(smell.difficulty) },
                        (_, i) => "⭐"
                      ).join("")}
                    </Badge>
                  </Table.Td>
                  <Table.Td>
                    <Badge
                      color={smell.isPublished ? "green" : "gray"}
                      size="sm"
                    >
                      {smell.isPublished ? "Published" : "Draft"}
                    </Badge>
                  </Table.Td>
                  <Table.Td>
                    <Group gap="xs">
                      <Group gap={4}>
                        <IconHeart size={12} color="red" />
                        <Text size="xs">{smell._count.favorites}</Text>
                      </Group>
                      <Group gap={4}>
                        <IconStar size={12} color="orange" />
                        <Text size="xs">{smell._count.progress}</Text>
                      </Group>
                    </Group>
                  </Table.Td>
                  <Table.Td>
                    <Text size="xs" c="dimmed">
                      {new Date(smell.createdAt).toLocaleDateString()}
                    </Text>
                  </Table.Td>
                  <Table.Td>
                    <Group gap="xs">
                      <ActionIcon
                        variant="light"
                        size="sm"
                        onClick={() =>
                          toggleSmellStatus(smell.id, smell.isPublished)
                        }
                      >
                        {smell.isPublished ? (
                          <IconEyeOff size={14} />
                        ) : (
                          <IconEyeCheck size={14} />
                        )}
                      </ActionIcon>
                      <ActionIcon variant="light" size="sm">
                        <IconEdit size={14} />
                      </ActionIcon>
                      <ActionIcon
                        variant="light"
                        color="red"
                        size="sm"
                        onClick={() => {
                          setSmellToDelete(smell.id);
                          setDeleteModalOpen(true);
                        }}
                      >
                        <IconTrash size={14} />
                      </ActionIcon>
                    </Group>
                  </Table.Td>
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>

          {smells.length === 0 && (
            <Center py="xl">
              <Stack align="center">
                <IconCode size={48} color="gray" />
                <Text c="dimmed">No smells found</Text>
              </Stack>
            </Center>
          )}
        </Card>

        {/* Pagination */}
        {totalPages > 1 && (
          <Center>
            <Pagination
              value={currentPage}
              onChange={setCurrentPage}
              total={totalPages}
            />
          </Center>
        )}

        {/* Delete Confirmation Modal */}
        <Modal
          opened={deleteModalOpen}
          onClose={() => {
            setDeleteModalOpen(false);
            setSmellToDelete(null);
          }}
          title="Delete Smell"
          centered
        >
          <Text>
            Are you sure you want to delete this smell? This action cannot be
            undone.
          </Text>
          <Group justify="flex-end" mt="md">
            <Button
              variant="light"
              onClick={() => {
                setDeleteModalOpen(false);
                setSmellToDelete(null);
              }}
            >
              Cancel
            </Button>
            <Button
              color="red"
              onClick={() => {
                if (smellToDelete) {
                  handleDelete(smellToDelete);
                }
              }}
            >
              Delete
            </Button>
          </Group>
        </Modal>
      </Stack>
    </Container>
  );
}
