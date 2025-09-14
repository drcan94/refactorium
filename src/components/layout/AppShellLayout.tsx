"use client";

import { useState, useEffect } from "react";
import {
  AppShell,
  Burger,
  Group,
  Button,
  Menu,
  Avatar,
  Text,
  Box,
  Loader,
  Badge,
  Divider,
  ScrollArea,
  NavLink,
  rem,
  Center,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
  IconUser,
  IconLogout,
  IconSettings,
  IconHome,
  IconCode,
  IconBook,
  IconInfoCircle,
  IconHelp,
} from "@tabler/icons-react";
import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";
import type { Session } from "next-auth";

interface AppShellLayoutProps {
  children: React.ReactNode;
}

export function AppShellLayout({ children }: AppShellLayoutProps) {
  const [opened, { toggle }] = useDisclosure();
  const [mounted, setMounted] = useState(false);
  const [session, setSession] = useState<Session | null>(null);
  const [status, setStatus] = useState<
    "loading" | "authenticated" | "unauthenticated"
  >("loading");

  useEffect(() => {
    setMounted(true);

    const getSession = async () => {
      try {
        const response = await fetch("/api/auth/session");
        const data: Session = await response.json();
        if (data.user) {
          setSession(data);
          setStatus("authenticated");
        } else {
          setSession(null);
          setStatus("unauthenticated");
        }
      } catch (error) {
        console.error("Failed to fetch session:", error);
        setSession(null);
        setStatus("unauthenticated");
      }
    };

    getSession();
  }, []);

  const handleSignIn = () => {
    window.location.href = "/api/auth/signin";
  };

  const handleSignOut = () => {
    window.location.href = "/api/auth/signout";
  };

  if (!mounted) {
    return (
      <Center h="100vh">
        <Loader size="md" />
      </Center>
    );
  }

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 280,
        breakpoint: "lg",
        collapsed: { mobile: !opened, desktop: true },
      }}
      padding="md"
      withBorder={false}
      zIndex={200}
    >
      {/* Header */}
      <AppShell.Header>
        <Group h="100%" px="md" justify="space-between">
          <Group gap="lg">
            <Burger
              opened={opened}
              onClick={toggle}
              hiddenFrom="lg"
              size="sm"
              aria-label="Toggle navigation"
            />

            {/* Logo - always visible */}
            <Button
              component={Link}
              href="/"
              variant="subtle"
              leftSection={<IconHome size={18} />}
              size="sm"
            >
              Refactorium
            </Button>
          </Group>

          {/* Desktop Navigation - hidden on medium screens and below */}
          <Group gap="sm" visibleFrom="lg">
            <Button
              component={Link}
              href="/smells"
              variant="subtle"
              size="sm"
              leftSection={<IconCode size={16} />}
            >
              Explore Smells
            </Button>
            {status === "authenticated" && (
              <Button
                component={Link}
                href="/smells/new"
                variant="light"
                size="sm"
                leftSection={<IconCode size={16} />}
              >
                Create Smell
              </Button>
            )}
            <Button
              component={Link}
              href="/docs"
              variant="subtle"
              size="sm"
              leftSection={<IconBook size={16} />}
            >
              Docs
            </Button>
            <Button
              component={Link}
              href="/about"
              variant="subtle"
              size="sm"
              leftSection={<IconInfoCircle size={16} />}
            >
              About
            </Button>
            <Button
              component={Link}
              href="/support"
              variant="subtle"
              size="sm"
              leftSection={<IconHelp size={16} />}
            >
              Support
            </Button>
          </Group>

          {/* User Menu */}
          <Group gap="sm">
            {status === "loading" && <Loader size="sm" />}
            {status === "unauthenticated" && (
              <Button variant="light" onClick={handleSignIn}>
                Sign In
              </Button>
            )}
            {status === "authenticated" && session && (
              <Menu
                shadow="xl"
                width={280}
                position="bottom-end"
                withArrow
                offset={8}
              >
                <Menu.Target>
                  <Button
                    variant="light"
                    size="sm"
                    px="sm"
                    py="xs"
                    style={{
                      borderRadius: "var(--mantine-radius-lg)",
                      border: "1px solid var(--mantine-color-gray-3)",
                      height: "auto",
                      minHeight: 36,
                    }}
                  >
                    <Group gap="sm">
                      <Avatar
                        src={session.user?.image}
                        alt={session.user?.name || "User"}
                        size="sm"
                        radius="xl"
                        style={{
                          border: "2px solid var(--mantine-color-white)",
                        }}
                      />
                      <Box style={{ textAlign: "left" }}>
                        <Text size="xs" fw={600} lineClamp={1}>
                          {session.user?.githubProfile?.name ||
                            session.user?.name ||
                            session.user?.githubProfile?.login ||
                            "User"}
                        </Text>
                      </Box>
                    </Group>
                  </Button>
                </Menu.Target>

                <Menu.Dropdown style={{ padding: "var(--mantine-spacing-md)" }}>
                  <Menu.Label
                    style={{
                      padding: 0,
                      marginBottom: "var(--mantine-spacing-md)",
                    }}
                  >
                    <Group gap="md">
                      <Avatar
                        src={session.user?.image}
                        alt={session.user?.name || "User"}
                        size="lg"
                        radius="xl"
                        style={{
                          border: "2px solid var(--mantine-color-white)",
                        }}
                      />
                      <Box style={{ flex: 1, minWidth: 0 }}>
                        <Text size="sm" fw={700} lineClamp={1} mb="xs">
                          {session.user?.githubProfile?.name ||
                            session.user?.name ||
                            session.user?.githubProfile?.login ||
                            "User"}
                        </Text>
                        <Text size="xs" c="dimmed" lineClamp={1} mb="xs">
                          {session.user?.githubProfile?.email ||
                            session.user?.email}
                        </Text>
                        <Group gap="xs">
                          <Badge color="blue" variant="light" size="xs">
                            @{session.user?.githubProfile?.login || "github"}
                          </Badge>
                          {session.user?.githubProfile?.followers !==
                            undefined && (
                            <Badge color="gray" variant="light" size="xs">
                              {session.user.githubProfile.followers} followers
                            </Badge>
                          )}
                        </Group>
                      </Box>
                    </Group>
                  </Menu.Label>
                  <Divider mb="md" />
                  <Menu.Item
                    leftSection={<IconUser size={18} />}
                    component={Link}
                    href="/profile"
                    style={{
                      fontSize: "var(--mantine-font-size-md)",
                      padding:
                        "var(--mantine-spacing-sm) var(--mantine-spacing-md)",
                      borderRadius: "var(--mantine-radius-md)",
                    }}
                  >
                    Profile
                  </Menu.Item>
                  <Menu.Item
                    leftSection={<IconSettings size={18} />}
                    component={Link}
                    href="/settings"
                    style={{
                      fontSize: "var(--mantine-font-size-md)",
                      padding:
                        "var(--mantine-spacing-sm) var(--mantine-spacing-md)",
                      borderRadius: "var(--mantine-radius-md)",
                    }}
                  >
                    Settings
                  </Menu.Item>
                  <Divider my="md" />
                  <Menu.Item
                    leftSection={<IconLogout size={18} />}
                    onClick={handleSignOut}
                    color="red"
                    style={{
                      fontSize: "var(--mantine-font-size-md)",
                      padding:
                        "var(--mantine-spacing-sm) var(--mantine-spacing-md)",
                      borderRadius: "var(--mantine-radius-md)",
                    }}
                  >
                    Sign Out
                  </Menu.Item>
                </Menu.Dropdown>
              </Menu>
            )}
            <ThemeToggle />
          </Group>
        </Group>
      </AppShell.Header>

      {/* Mobile Navigation Sidebar */}
      <AppShell.Navbar>
        <AppShell.Section p="md" pb={0}>
          <Text size="lg" fw={700} mb="md">
            Navigation
          </Text>
        </AppShell.Section>

        <AppShell.Section grow p="md" pt={0} component={ScrollArea}>
          <NavLink
            href="/"
            label="Home"
            leftSection={<IconHome size={16} />}
            component={Link}
            onClick={() => opened && toggle()}
          />
          <NavLink
            href="/smells"
            label="Explore Smells"
            leftSection={<IconCode size={16} />}
            component={Link}
            onClick={() => opened && toggle()}
          />
          {status === "authenticated" && (
            <NavLink
              href="/smells/new"
              label="Create Smell"
              leftSection={<IconCode size={16} />}
              component={Link}
              onClick={() => opened && toggle()}
            />
          )}
          <NavLink
            href="/docs"
            label="Documentation"
            leftSection={<IconBook size={16} />}
            component={Link}
            onClick={() => opened && toggle()}
          />
          <NavLink
            href="/about"
            label="About"
            leftSection={<IconInfoCircle size={16} />}
            component={Link}
            onClick={() => opened && toggle()}
          />
          <NavLink
            href="/support"
            label="Support"
            leftSection={<IconHelp size={16} />}
            component={Link}
            onClick={() => opened && toggle()}
          />
        </AppShell.Section>

        {/* User Section in Mobile Sidebar */}
        <AppShell.Section p="md" pt={0}>
          {status === "authenticated" && session && (
            <>
              <Divider my="md" />
              <Group gap="md" mb="md">
                <Avatar
                  src={session.user?.image}
                  alt={session.user?.name || "User"}
                  size="md"
                  radius="xl"
                  style={{ border: "2px solid var(--mantine-color-white)" }}
                />
                <Box style={{ flex: 1, minWidth: 0 }}>
                  <Text size="sm" fw={600} lineClamp={1}>
                    {session.user?.githubProfile?.name ||
                      session.user?.name ||
                      session.user?.githubProfile?.login ||
                      "User"}
                  </Text>
                  <Text size="xs" c="dimmed" lineClamp={1}>
                    @{session.user?.githubProfile?.login || "github"}
                  </Text>
                </Box>
              </Group>

              <NavLink
                href="/profile"
                label="Profile"
                leftSection={<IconUser size={16} />}
                component={Link}
                onClick={() => opened && toggle()}
              />
              <NavLink
                href="/settings"
                label="Settings"
                leftSection={<IconSettings size={16} />}
                component={Link}
                onClick={() => opened && toggle()}
              />
              <NavLink
                label="Sign Out"
                leftSection={<IconLogout size={16} />}
                onClick={() => {
                  handleSignOut();
                  opened && toggle();
                }}
                c="red"
              />
            </>
          )}

          {status === "unauthenticated" && (
            <>
              <Divider my="md" />
              <Button variant="light" onClick={handleSignIn} fullWidth>
                Sign In
              </Button>
            </>
          )}
        </AppShell.Section>
      </AppShell.Navbar>

      {/* Main Content */}
      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
}
