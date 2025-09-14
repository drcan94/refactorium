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
  TextInput,
  Select,
  Grid,
  Stack,
  Modal,
  Avatar,
  Loader,
  Center,
  Pagination,
  Checkbox,
  Menu,
  Alert,
} from "@mantine/core";
import {
  IconPlus,
  IconSearch,
  IconEdit,
  IconTrash,
  IconUser,
  IconDots,
  IconShield,
  IconShieldCheck,
  IconMail,
  IconCalendar,
  IconHeart,
  IconStar,
  IconAlertCircle,
} from "@tabler/icons-react";
import { useAdminAuth } from "@/lib/hooks/use-admin-auth";
import { useEffect, useState } from "react";
import { AdminUser, UserRole } from "@/lib/types";

interface UsersFilters {
  search: string;
  role: string;
  status: string;
  sortBy: string;
  sortOrder: "asc" | "desc";
}

export default function AdminUsersPage() {
  const { isAdmin, isModerator } = useAdminAuth();
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [filters, setFilters] = useState<UsersFilters>({
    search: "",
    role: "",
    status: "",
    sortBy: "createdAt",
    sortOrder: "desc",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalUsers, setTotalUsers] = useState(0);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<string | null>(null);
  const [roleModalOpen, setRoleModalOpen] = useState(false);
  const [userToUpdate, setUserToUpdate] = useState<AdminUser | null>(null);
  const [newRole, setNewRole] = useState<UserRole>(UserRole.USER);

  const itemsPerPage = 10;

  useEffect(() => {
    fetchUsers();
  }, [filters, currentPage]);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: itemsPerPage.toString(),
        ...filters,
      });

      const response = await fetch(`/api/admin/users?${params}`);
      const data = await response.json();

      setUsers(data.users);
      setTotalPages(data.totalPages);
      setTotalUsers(data.total);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (userId: string) => {
    try {
      const response = await fetch(`/api/admin/users/${userId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        fetchUsers();
        setDeleteModalOpen(false);
        setUserToDelete(null);
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const handleRoleUpdate = async () => {
    if (!userToUpdate) return;

    try {
      const response = await fetch(`/api/admin/users/${userToUpdate.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          role: newRole,
        }),
      });

      if (response.ok) {
        fetchUsers();
        setRoleModalOpen(false);
        setUserToUpdate(null);
      }
    } catch (error) {
      console.error("Error updating user role:", error);
    }
  };

  const handleBulkAction = async (action: string) => {
    if (selectedUsers.length === 0) return;

    try {
      const response = await fetch("/api/admin/users/bulk", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action,
          userIds: selectedUsers,
        }),
      });

      if (response.ok) {
        fetchUsers();
        setSelectedUsers([]);
      }
    } catch (error) {
      console.error("Error performing bulk action:", error);
    }
  };

  const getRoleColor = (role: UserRole) => {
    switch (role) {
      case UserRole.ADMIN:
        return "red";
      case UserRole.MODERATOR:
        return "blue";
      case UserRole.USER:
      default:
        return "gray";
    }
  };

  const getRoleIcon = (role: UserRole) => {
    switch (role) {
      case UserRole.ADMIN:
        return <IconShield size={14} />;
      case UserRole.MODERATOR:
        return <IconShieldCheck size={14} />;
      case UserRole.USER:
      default:
        return <IconUser size={14} />;
    }
  };

  if (loading) {
    return (
      <Container size="lg" py="xl">
        <Center>
          <Stack align="center">
            <Loader size="lg" />
            <Text>Loading users...</Text>
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
              User Management
            </Title>
            <Text c="dimmed" size="sm">
              Manage user accounts, roles, and permissions
            </Text>
          </div>
          <Group>
            <Text size="sm" c="dimmed">
              {totalUsers} total users
            </Text>
          </Group>
        </Group>

        {/* Filters */}
        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <Grid>
            <Grid.Col span={{ base: 12, md: 4 }}>
              <TextInput
                placeholder="Search users..."
                leftSection={<IconSearch size={16} />}
                value={filters.search}
                onChange={(e) =>
                  setFilters({ ...filters, search: e.target.value })
                }
              />
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 3 }}>
              <Select
                placeholder="Role"
                data={[
                  { value: "", label: "All Roles" },
                  { value: UserRole.USER, label: "User" },
                  { value: UserRole.MODERATOR, label: "Moderator" },
                  { value: UserRole.ADMIN, label: "Admin" },
                ]}
                value={filters.role}
                onChange={(value) =>
                  setFilters({ ...filters, role: value || "" })
                }
              />
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 3 }}>
              <Select
                placeholder="Status"
                data={[
                  { value: "", label: "All Status" },
                  { value: "active", label: "Active" },
                  { value: "inactive", label: "Inactive" },
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
                  { value: "name", label: "Name" },
                  { value: "email", label: "Email" },
                  { value: "role", label: "Role" },
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
        {selectedUsers.length > 0 && (
          <Card shadow="sm" padding="md" radius="md" withBorder>
            <Group justify="space-between">
              <Text size="sm" c="dimmed">
                {selectedUsers.length} user(s) selected
              </Text>
              <Group>
                <Button
                  variant="light"
                  color="blue"
                  size="sm"
                  onClick={() => handleBulkAction("makeModerator")}
                >
                  Make Moderator
                </Button>
                <Button
                  variant="light"
                  color="red"
                  size="sm"
                  onClick={() => handleBulkAction("makeAdmin")}
                >
                  Make Admin
                </Button>
                <Button
                  variant="light"
                  color="gray"
                  size="sm"
                  onClick={() => handleBulkAction("makeUser")}
                >
                  Make User
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

        {/* Users Table */}
        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <Table>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>
                  <Checkbox
                    checked={selectedUsers.length === users.length}
                    onChange={(e) => {
                      if (e.currentTarget.checked) {
                        setSelectedUsers(users.map((u) => u.id));
                      } else {
                        setSelectedUsers([]);
                      }
                    }}
                  />
                </Table.Th>
                <Table.Th>User</Table.Th>
                <Table.Th>Role</Table.Th>
                <Table.Th>Activity</Table.Th>
                <Table.Th>Stats</Table.Th>
                <Table.Th>Joined</Table.Th>
                <Table.Th>Actions</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {users.map((user) => (
                <Table.Tr key={user.id}>
                  <Table.Td>
                    <Checkbox
                      checked={selectedUsers.includes(user.id)}
                      onChange={(e) => {
                        if (e.currentTarget.checked) {
                          setSelectedUsers([...selectedUsers, user.id]);
                        } else {
                          setSelectedUsers(
                            selectedUsers.filter((id) => id !== user.id)
                          );
                        }
                      }}
                    />
                  </Table.Td>
                  <Table.Td>
                    <Group gap="sm">
                      <Avatar
                        src={user.image}
                        size="sm"
                        radius="xl"
                        color="blue"
                      >
                        {user.name?.charAt(0) || user.email.charAt(0)}
                      </Avatar>
                      <div>
                        <Text fw={500} size="sm">
                          {user.name || "No Name"}
                        </Text>
                        <Text size="xs" c="dimmed">
                          {user.email}
                        </Text>
                      </div>
                    </Group>
                  </Table.Td>
                  <Table.Td>
                    <Badge
                      color={getRoleColor(user.role)}
                      size="sm"
                      leftSection={getRoleIcon(user.role)}
                    >
                      {user.role}
                    </Badge>
                  </Table.Td>
                  <Table.Td>
                    <Text size="xs" c="dimmed">
                      {user.lastActivity
                        ? new Date(user.lastActivity).toLocaleDateString()
                        : "Never"}
                    </Text>
                  </Table.Td>
                  <Table.Td>
                    <Group gap="xs">
                      <Group gap={4}>
                        <IconHeart size={12} color="red" />
                        <Text size="xs">{user._count.favorites}</Text>
                      </Group>
                      <Group gap={4}>
                        <IconStar size={12} color="orange" />
                        <Text size="xs">{user._count.progress}</Text>
                      </Group>
                    </Group>
                  </Table.Td>
                  <Table.Td>
                    <Text size="xs" c="dimmed">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </Text>
                  </Table.Td>
                  <Table.Td>
                    <Group gap="xs">
                      <Menu shadow="md" width={200}>
                        <Menu.Target>
                          <ActionIcon variant="light" size="sm">
                            <IconDots size={14} />
                          </ActionIcon>
                        </Menu.Target>
                        <Menu.Dropdown>
                          <Menu.Item
                            leftSection={<IconShield size={14} />}
                            onClick={() => {
                              setUserToUpdate(user);
                              setNewRole(UserRole.ADMIN);
                              setRoleModalOpen(true);
                            }}
                          >
                            Make Admin
                          </Menu.Item>
                          <Menu.Item
                            leftSection={<IconShieldCheck size={14} />}
                            onClick={() => {
                              setUserToUpdate(user);
                              setNewRole(UserRole.MODERATOR);
                              setRoleModalOpen(true);
                            }}
                          >
                            Make Moderator
                          </Menu.Item>
                          <Menu.Item
                            leftSection={<IconUser size={14} />}
                            onClick={() => {
                              setUserToUpdate(user);
                              setNewRole(UserRole.USER);
                              setRoleModalOpen(true);
                            }}
                          >
                            Make User
                          </Menu.Item>
                          <Menu.Divider />
                          <Menu.Item
                            leftSection={<IconTrash size={14} />}
                            color="red"
                            onClick={() => {
                              setUserToDelete(user.id);
                              setDeleteModalOpen(true);
                            }}
                          >
                            Delete User
                          </Menu.Item>
                        </Menu.Dropdown>
                      </Menu>
                    </Group>
                  </Table.Td>
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>

          {users.length === 0 && (
            <Center py="xl">
              <Stack align="center">
                <IconUser size={48} color="gray" />
                <Text c="dimmed">No users found</Text>
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

        {/* Role Update Modal */}
        <Modal
          opened={roleModalOpen}
          onClose={() => {
            setRoleModalOpen(false);
            setUserToUpdate(null);
          }}
          title="Update User Role"
          centered
        >
          {userToUpdate && (
            <Stack gap="md">
              <Alert
                icon={<IconAlertCircle size={16} />}
                title="Role Change"
                color="blue"
              >
                Changing user roles affects their access permissions. Make sure
                this is what you intend to do.
              </Alert>
              <div>
                <Text size="sm" c="dimmed">
                  User: {userToUpdate.name || userToUpdate.email}
                </Text>
                <Text size="sm" c="dimmed">
                  Current Role: {userToUpdate.role}
                </Text>
              </div>
              <Select
                label="New Role"
                data={[
                  { value: UserRole.USER, label: "User" },
                  { value: UserRole.MODERATOR, label: "Moderator" },
                  { value: UserRole.ADMIN, label: "Admin" },
                ]}
                value={newRole}
                onChange={(value) => setNewRole(value as UserRole)}
              />
              <Group justify="flex-end" mt="md">
                <Button
                  variant="light"
                  onClick={() => {
                    setRoleModalOpen(false);
                    setUserToUpdate(null);
                  }}
                >
                  Cancel
                </Button>
                <Button onClick={handleRoleUpdate}>Update Role</Button>
              </Group>
            </Stack>
          )}
        </Modal>

        {/* Delete Confirmation Modal */}
        <Modal
          opened={deleteModalOpen}
          onClose={() => {
            setDeleteModalOpen(false);
            setUserToDelete(null);
          }}
          title="Delete User"
          centered
        >
          <Alert
            icon={<IconAlertCircle size={16} />}
            title="Warning"
            color="red"
            mb="md"
          >
            This action cannot be undone. The user will be permanently deleted
            along with all their data.
          </Alert>
          <Group justify="flex-end" mt="md">
            <Button
              variant="light"
              onClick={() => {
                setDeleteModalOpen(false);
                setUserToDelete(null);
              }}
            >
              Cancel
            </Button>
            <Button
              color="red"
              onClick={() => {
                if (userToDelete) {
                  handleDelete(userToDelete);
                }
              }}
            >
              Delete User
            </Button>
          </Group>
        </Modal>
      </Stack>
    </Container>
  );
}
