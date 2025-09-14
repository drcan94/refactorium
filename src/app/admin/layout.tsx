"use client";

import {
  AppShell,
  Group,
  Title,
  Button,
  Avatar,
  Menu,
  Text,
} from "@mantine/core";
import {
  IconLogout,
  IconSettings,
  IconUser,
  IconShield,
} from "@tabler/icons-react";
import { useSession, signOut } from "next-auth/react";
import { useAdminAuth } from "@/lib/hooks/use-admin-auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const { data: session } = useSession();
  const { isAdmin, isModerator, isLoading } = useAdminAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAdmin && !isModerator) {
      router.push("/");
    }
  }, [isAdmin, isModerator, isLoading, router]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
          <p className="mt-4 text-gray-600">Loading admin panel...</p>
        </div>
      </div>
    );
  }

  if (!isAdmin && !isModerator) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <IconShield size={64} className="mx-auto text-red-500 mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Access Denied
          </h1>
          <p className="text-gray-600 mb-4">
            You don't have permission to access the admin panel.
          </p>
          <Link href="/">
            <Button>Go Home</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{ width: 250, breakpoint: "sm" }}
      padding="md"
    >
      <AppShell.Header>
        <Group h="100%" px="md" justify="space-between">
          <Group>
            <IconShield size={24} className="text-blue-500" />
            <Title order={3} size="h4">
              Admin Panel
            </Title>
            {isModerator && !isAdmin && (
              <Text size="sm" c="dimmed">
                (Moderator)
              </Text>
            )}
          </Group>

          <Group>
            <Menu shadow="md" width={200}>
              <Menu.Target>
                <Button
                  variant="subtle"
                  leftSection={<Avatar size="sm" src={session?.user?.image} />}
                >
                  {session?.user?.name || "User"}
                </Button>
              </Menu.Target>

              <Menu.Dropdown>
                <Menu.Item leftSection={<IconUser size={14} />}>
                  Profile
                </Menu.Item>
                <Menu.Item leftSection={<IconSettings size={14} />}>
                  Settings
                </Menu.Item>
                <Menu.Divider />
                <Menu.Item
                  leftSection={<IconLogout size={14} />}
                  onClick={() => signOut()}
                  color="red"
                >
                  Sign Out
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </Group>
        </Group>
      </AppShell.Header>

      <AppShell.Navbar p="md">
        <div className="space-y-2">
          <Link href="/admin">
            <Button variant="subtle" fullWidth justify="flex-start">
              Dashboard
            </Button>
          </Link>

          <Link href="/admin/smells">
            <Button variant="subtle" fullWidth justify="flex-start">
              Code Smells
            </Button>
          </Link>

          <Link href="/admin/users">
            <Button variant="subtle" fullWidth justify="flex-start">
              Users
            </Button>
          </Link>

          <Link href="/admin/analytics">
            <Button variant="subtle" fullWidth justify="flex-start">
              Analytics
            </Button>
          </Link>

          <Link href="/admin/settings">
            <Button variant="subtle" fullWidth justify="flex-start">
              Settings
            </Button>
          </Link>
        </div>
      </AppShell.Navbar>

      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
}
