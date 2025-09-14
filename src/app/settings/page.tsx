"use client";

import { useState, useEffect } from "react";
import { signOut } from "next-auth/react";
import { useAnalytics } from "@/lib/hooks/use-analytics";
import { useCookieConsent } from "@/lib/hooks/use-cookie-consent";
import { clearAllStorage } from "@/lib/utils/clear-storage";
import {
  Container,
  Title,
  Text,
  Stack,
  Card,
  Group,
  Button,
  Switch,
  Divider,
  Alert,
  Box,
  LoadingOverlay,
  Modal,
} from "@mantine/core";
import { notifications as mantineNotifications } from "@mantine/notifications";
import {
  IconBell,
  IconShield,
  IconDatabase,
  IconDownload,
  IconTrash,
  IconSettings,
} from "@tabler/icons-react";
import Link from "next/link";

export default function SettingsPage() {
  const analytics = useAnalytics();
  const cookieConsent = useCookieConsent();
  const [mounted, setMounted] = useState(false);
  const [session, setSession] = useState<{
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      bio?: string | null;
      location?: string | null;
      website?: string | null;
      githubUrl?: string | null;
      linkedinUrl?: string | null;
      twitterUrl?: string | null;
    };
  } | null>(null);
  const [status, setStatus] = useState<string>("loading");

  // Settings state
  const [notifications, setNotifications] = useState({
    emailUpdates: true,
    progressReminders: false,
    newSmells: true,
    weeklyDigest: true,
  });

  const [privacy, setPrivacy] = useState({
    profileVisibility: "public",
    showProgress: true,
    allowAnalytics: false,
  });

  useEffect(() => {
    setMounted(true);

    const getSession = async () => {
      try {
        const response = await fetch("/api/auth/session");
        const data = await response.json();
        if (data.user) {
          setSession(data.user);
          setStatus("authenticated");
          loadUserPreferences();
        } else {
          setSession(null);
          setStatus("unauthenticated");
        }
      } catch (error) {
        setSession(null);
        setStatus("unauthenticated");
      }
    };

    getSession();
  }, []);

  const loadUserPreferences = async () => {
    try {
      const response = await fetch("/api/user/preferences");
      if (response.ok) {
        const data = await response.json();
        const prefs = data.preferences;
        if (prefs) {
          setNotifications({
            emailUpdates: prefs.emailUpdates || false,
            progressReminders: prefs.progressReminders || false,
            newSmells: prefs.newSmells || false,
            weeklyDigest: prefs.weeklyDigest || false,
          });
          setPrivacy({
            profileVisibility: prefs.profileVisibility || "public",
            showProgress: prefs.showProgress || true,
            allowAnalytics: prefs.allowAnalytics || false,
          });
        }
      }
    } catch (error) {
      console.error("Failed to load user preferences:", error);
    }
  };

  const updateSettings = async (newSettings: any) => {
    try {
      const response = await fetch("/api/user/preferences", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newSettings),
      });

      if (!response.ok) {
        const error = await response.json();
        console.error("Failed to save settings:", error);
        mantineNotifications.show({
          title: "Error",
          message: error.error || "Failed to save settings",
          color: "red",
        });
      }
    } catch (error) {
      console.error("Failed to save settings:", error);
      mantineNotifications.show({
        title: "Error",
        message: "Failed to save settings",
        color: "red",
      });
    }
  };

  const handleExportData = async () => {
    try {
      // Export user data
      const userData = {
        profile: session,
        settings: { notifications, privacy },
        exportDate: new Date().toISOString(),
      };

      const blob = new Blob([JSON.stringify(userData, null, 2)], {
        type: "application/json",
      });

      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "refactorium-data.json";
      a.click();
      URL.revokeObjectURL(url);

      mantineNotifications.show({
        title: "Success",
        message: "Data exported successfully!",
        color: "green",
      });
    } catch (error) {
      console.error("Failed to export data:", error);
      mantineNotifications.show({
        title: "Error",
        message: "Failed to export data",
        color: "red",
      });
    }
  };

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const handleDeleteAccount = () => {
    setDeleteModalOpen(true);
  };

  const confirmDeleteAccount = async () => {
    setDeleteLoading(true);
    try {
      const response = await fetch("/api/user/delete-account", {
        method: "DELETE",
      });

      if (response.ok) {
        const data = await response.json();

        // Clear all localStorage and sessionStorage
        clearAllStorage();

        mantineNotifications.show({
          title: "Account Deleted",
          message: "Your account has been permanently deleted",
          color: "green",
        });

        // Sign out the user to clear the session
        await signOut({
          callbackUrl: "/",
          redirect: true,
        });
      } else {
        const error = await response.json();
        mantineNotifications.show({
          title: "Error",
          message: error.error || "Failed to delete account",
          color: "red",
        });
      }
    } catch (error) {
      console.error("Failed to delete account:", error);
      mantineNotifications.show({
        title: "Error",
        message: "Failed to delete account",
        color: "red",
      });
    } finally {
      setDeleteLoading(false);
      setDeleteModalOpen(false);
    }
  };

  if (!mounted || status === "loading") {
    return (
      <Container size="lg" py="xl">
        <LoadingOverlay visible />
      </Container>
    );
  }

  // Middleware handles authentication, so this should never be reached
  if (status === "unauthenticated") {
    return (
      <Container size="lg" py="xl">
        <Alert color="red" title="Authentication Error">
          <Text mb="md">
            Something went wrong with authentication. Please try again.
          </Text>
          <Button component={Link} href="/auth/signin">
            Sign In
          </Button>
        </Alert>
      </Container>
    );
  }

  return (
    <>
      <Title order={1} size="h1" mb="xl">
        Settings
      </Title>

      {/* Notifications */}
      <Card shadow="sm" padding="xl" radius="md" mb="xl">
        <Group gap="lg" mb="lg">
          <IconBell size={24} />
          <Title order={2} size="h3">
            Notifications
          </Title>
        </Group>

        <Stack gap="md">
          <Group justify="space-between">
            <Box>
              <Text fw={500}>Email Updates</Text>
              <Text size="sm" c="dimmed">
                Receive updates about new features and improvements
              </Text>
            </Box>
            <Switch
              checked={notifications.emailUpdates}
              onChange={(event) => {
                const newNotifications = {
                  ...notifications,
                  emailUpdates: event.currentTarget.checked,
                };
                setNotifications(newNotifications);
                updateSettings({ ...newNotifications, ...privacy });
                analytics.trackSettingsChange(
                  "emailUpdates",
                  event.currentTarget.checked
                );
              }}
            />
          </Group>

          <Divider />

          <Group justify="space-between">
            <Box>
              <Text fw={500}>Progress Reminders</Text>
              <Text size="sm" c="dimmed">
                Get reminded to continue your learning journey
              </Text>
            </Box>
            <Switch
              checked={notifications.progressReminders}
              onChange={(event) => {
                const newNotifications = {
                  ...notifications,
                  progressReminders: event.currentTarget.checked,
                };
                setNotifications(newNotifications);
                updateSettings({ ...newNotifications, ...privacy });
                analytics.trackSettingsChange(
                  "progressReminders",
                  event.currentTarget.checked
                );
              }}
            />
          </Group>

          <Divider />

          <Group justify="space-between">
            <Box>
              <Text fw={500}>New Code Smells</Text>
              <Text size="sm" c="dimmed">
                Notify when new code smells are added
              </Text>
            </Box>
            <Switch
              checked={notifications.newSmells}
              onChange={(event) => {
                const newNotifications = {
                  ...notifications,
                  newSmells: event.currentTarget.checked,
                };
                setNotifications(newNotifications);
                updateSettings({ ...newNotifications, ...privacy });
                analytics.trackSettingsChange(
                  "newSmells",
                  event.currentTarget.checked
                );
              }}
            />
          </Group>

          <Divider />

          <Group justify="space-between">
            <Box>
              <Text fw={500}>Weekly Digest</Text>
              <Text size="sm" c="dimmed">
                Receive a weekly summary of your progress
              </Text>
            </Box>
            <Switch
              checked={notifications.weeklyDigest}
              onChange={(event) => {
                const newNotifications = {
                  ...notifications,
                  weeklyDigest: event.currentTarget.checked,
                };
                setNotifications(newNotifications);
                updateSettings({ ...newNotifications, ...privacy });
                analytics.trackSettingsChange(
                  "weeklyDigest",
                  event.currentTarget.checked
                );
              }}
            />
          </Group>
        </Stack>
      </Card>

      {/* Privacy */}
      <Card shadow="sm" padding="xl" radius="md" mb="xl">
        <Group gap="lg" mb="lg">
          <IconShield size={24} />
          <Title order={2} size="h3">
            Privacy & Data
          </Title>
        </Group>

        <Stack gap="md">
          <Group justify="space-between">
            <Box>
              <Text fw={500}>Profile Visibility</Text>
              <Text size="sm" c="dimmed">
                Make your profile visible to other users
              </Text>
            </Box>
            <Switch
              checked={privacy.profileVisibility === "public"}
              onChange={(event) => {
                const newPrivacy = {
                  ...privacy,
                  profileVisibility: event.currentTarget.checked
                    ? "public"
                    : "private",
                };
                setPrivacy(newPrivacy);
                updateSettings({ ...notifications, ...newPrivacy });
                analytics.trackSettingsChange(
                  "profileVisibility",
                  event.currentTarget.checked ? "public" : "private"
                );
              }}
            />
          </Group>

          <Divider />

          <Group justify="space-between">
            <Box>
              <Text fw={500}>Show Learning Progress</Text>
              <Text size="sm" c="dimmed">
                Allow others to see your learning progress
              </Text>
            </Box>
            <Switch
              checked={privacy.showProgress}
              onChange={(event) => {
                const newPrivacy = {
                  ...privacy,
                  showProgress: event.currentTarget.checked,
                };
                setPrivacy(newPrivacy);
                updateSettings({ ...notifications, ...newPrivacy });
                analytics.trackSettingsChange(
                  "showProgress",
                  event.currentTarget.checked
                );
              }}
            />
          </Group>

          <Divider />

          <Group justify="space-between">
            <Box>
              <Text fw={500}>Usage Analytics</Text>
              <Text size="sm" c="dimmed">
                Help improve Refactorium by sharing anonymous usage data
              </Text>
            </Box>
            <Switch
              checked={privacy.allowAnalytics}
              onChange={(event) => {
                const newPrivacy = {
                  ...privacy,
                  allowAnalytics: event.currentTarget.checked,
                };
                setPrivacy(newPrivacy);
                updateSettings({ ...notifications, ...newPrivacy });
                analytics.trackSettingsChange(
                  "allowAnalytics",
                  event.currentTarget.checked
                );
              }}
            />
          </Group>
        </Stack>
      </Card>

      {/* Cookie Settings */}
      <Card shadow="sm" padding="xl" radius="md" mb="xl">
        <Group gap="lg" mb="lg">
          <IconSettings size={24} />
          <Title order={2} size="h3">
            Cookie Preferences
          </Title>
        </Group>

        <Stack gap="md">
          <Box>
            <Group justify="space-between" mb="xs">
              <Box>
                <Text fw={500}>Necessary Cookies</Text>
                <Text size="sm" c="dimmed">
                  Essential for the website to function properly
                </Text>
              </Box>
              <Switch checked={true} disabled size="sm" />
            </Group>
          </Box>

          <Divider />

          <Box>
            <Group justify="space-between" mb="xs">
              <Box>
                <Text fw={500}>Analytics Cookies</Text>
                <Text size="sm" c="dimmed">
                  Help us understand how visitors interact with our website
                </Text>
              </Box>
              <Switch
                checked={cookieConsent.consent?.analytics || false}
                onChange={(event) =>
                  cookieConsent.updateConsent({
                    analytics: event.currentTarget.checked,
                  })
                }
                size="sm"
              />
            </Group>
          </Box>

          <Divider />

          <Box>
            <Group justify="space-between" mb="xs">
              <Box>
                <Text fw={500}>Marketing Cookies</Text>
                <Text size="sm" c="dimmed">
                  Used to deliver relevant advertisements and track campaign
                  performance
                </Text>
              </Box>
              <Switch
                checked={cookieConsent.consent?.marketing || false}
                onChange={(event) =>
                  cookieConsent.updateConsent({
                    marketing: event.currentTarget.checked,
                  })
                }
                size="sm"
              />
            </Group>
          </Box>

          <Divider />

          <Box>
            <Group justify="space-between" mb="xs">
              <Box>
                <Text fw={500}>Preference Cookies</Text>
                <Text size="sm" c="dimmed">
                  Remember your settings and preferences for a personalized
                  experience
                </Text>
              </Box>
              <Switch
                checked={cookieConsent.consent?.preferences || false}
                onChange={(event) =>
                  cookieConsent.updateConsent({
                    preferences: event.currentTarget.checked,
                  })
                }
                size="sm"
              />
            </Group>
          </Box>

          <Divider />

          <Group gap="sm" mt="md">
            <Button
              size="sm"
              onClick={cookieConsent.acceptAll}
              variant="outline"
            >
              Accept All Cookies
            </Button>
            <Button
              size="sm"
              onClick={cookieConsent.rejectAll}
              variant="outline"
              color="red"
            >
              Reject All
            </Button>
          </Group>
        </Stack>
      </Card>

      {/* Data Management */}
      <Card shadow="sm" padding="xl" radius="md" mb="xl">
        <Group gap="lg" mb="lg">
          <IconDatabase size={24} />
          <Title order={2} size="h3">
            Data Management
          </Title>
        </Group>

        <Stack gap="md">
          <Group justify="space-between">
            <Box>
              <Text fw={500}>Export Data</Text>
              <Text size="sm" c="dimmed">
                Download a copy of your data
              </Text>
            </Box>
            <Button
              variant="light"
              leftSection={<IconDownload size={16} />}
              onClick={handleExportData}
            >
              Export
            </Button>
          </Group>

          <Divider />

          <Group justify="space-between">
            <Box>
              <Text fw={500}>Delete Account</Text>
              <Text size="sm" c="dimmed">
                Permanently delete your account and all data
              </Text>
            </Box>
            <Button
              variant="light"
              color="red"
              leftSection={<IconTrash size={16} />}
              onClick={handleDeleteAccount}
            >
              Delete Account
            </Button>
          </Group>
        </Stack>
      </Card>

      {/* Delete Account Modal */}
      <Modal
        opened={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        title="Delete Account"
        centered
        size="md"
      >
        <Stack gap="md">
          <Alert color="red" title="Warning">
            This action cannot be undone. This will permanently delete your
            account and remove all your data from our servers.
          </Alert>

          <Text size="sm" c="dimmed">
            Are you sure you want to delete your account? This will:
          </Text>

          <Stack gap="xs" pl="md">
            <Text size="sm">• Delete your profile and all personal data</Text>
            <Text size="sm">• Remove all your progress and favorites</Text>
            <Text size="sm">• Cancel any active subscriptions</Text>
            <Text size="sm">• Permanently remove your account</Text>
          </Stack>

          <Group justify="flex-end" gap="sm" mt="md">
            <Button
              variant="outline"
              onClick={() => setDeleteModalOpen(false)}
              disabled={deleteLoading}
            >
              Cancel
            </Button>
            <Button
              color="red"
              onClick={confirmDeleteAccount}
              loading={deleteLoading}
            >
              Delete Account
            </Button>
          </Group>
        </Stack>
      </Modal>
    </>
  );
}
