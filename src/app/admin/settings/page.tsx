"use client";

import {
  Container,
  Title,
  Text,
  Card,
  Stack,
  Group,
  Button,
  TextInput,
  Textarea,
  Switch,
  Select,
  NumberInput,
  Divider,
  Alert,
  Loader,
  Center,
  Tabs,
  Badge,
  ActionIcon,
  Modal,
  PasswordInput,
  Grid,
} from "@mantine/core";
import {
  IconSettings,
  IconDeviceFloppy,
  IconRefresh,
  IconAlertCircle,
  IconCheck,
  IconX,
  IconDatabase,
  IconMail,
  IconShield,
  IconPalette,
  IconBell,
  IconWorld,
  IconKey,
  IconTrash,
} from "@tabler/icons-react";
import { useAdminAuth } from "@/lib/hooks/use-admin-auth";
import { useEffect, useState } from "react";

interface SystemSettings {
  general: {
    siteName: string;
    siteDescription: string;
    siteUrl: string;
    maintenanceMode: boolean;
    maxUsers: number;
    maxSmells: number;
  };
  email: {
    smtpHost: string;
    smtpPort: number;
    smtpUser: string;
    smtpPassword: string;
    fromEmail: string;
    fromName: string;
    enabled: boolean;
  };
  security: {
    sessionTimeout: number;
    maxLoginAttempts: number;
    requireEmailVerification: boolean;
    allowRegistration: boolean;
    passwordMinLength: number;
  };
  features: {
    enableAnalytics: boolean;
    enableNotifications: boolean;
    enableComments: boolean;
    enableRatings: boolean;
    enableSharing: boolean;
  };
  appearance: {
    theme: "light" | "dark" | "auto";
    primaryColor: string;
    logoUrl: string;
    faviconUrl: string;
  };
}

const defaultSettings: SystemSettings = {
  general: {
    siteName: "Refactorium",
    siteDescription: "Learn and practice code refactoring",
    siteUrl: "http://localhost:3000",
    maintenanceMode: false,
    maxUsers: 1000,
    maxSmells: 500,
  },
  email: {
    smtpHost: "",
    smtpPort: 587,
    smtpUser: "",
    smtpPassword: "",
    fromEmail: "noreply@refactorium.com",
    fromName: "Refactorium",
    enabled: false,
  },
  security: {
    sessionTimeout: 24,
    maxLoginAttempts: 5,
    requireEmailVerification: true,
    allowRegistration: true,
    passwordMinLength: 8,
  },
  features: {
    enableAnalytics: true,
    enableNotifications: true,
    enableComments: false,
    enableRatings: true,
    enableSharing: true,
  },
  appearance: {
    theme: "auto",
    primaryColor: "blue",
    logoUrl: "",
    faviconUrl: "",
  },
};

export default function AdminSettingsPage() {
  const { isAdmin, isModerator } = useAdminAuth();
  const [settings, setSettings] = useState<SystemSettings>(defaultSettings);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState("general");
  const [testEmailModal, setTestEmailModal] = useState(false);
  const [testEmail, setTestEmail] = useState("");
  const [testEmailLoading, setTestEmailLoading] = useState(false);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/admin/settings");
      if (response.ok) {
        const data = await response.json();
        setSettings(data);
      }
    } catch (error) {
      console.error("Error fetching settings:", error);
    } finally {
      setLoading(false);
    }
  };

  const saveSettings = async () => {
    setSaving(true);
    try {
      const response = await fetch("/api/admin/settings", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(settings),
      });

      if (response.ok) {
        // Show success message
        console.log("Settings saved successfully");
      }
    } catch (error) {
      console.error("Error saving settings:", error);
    } finally {
      setSaving(false);
    }
  };

  const testEmailConnection = async () => {
    if (!testEmail) return;

    setTestEmailLoading(true);
    try {
      const response = await fetch("/api/admin/settings/test-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: testEmail }),
      });

      if (response.ok) {
        console.log("Test email sent successfully");
      }
    } catch (error) {
      console.error("Error sending test email:", error);
    } finally {
      setTestEmailLoading(false);
    }
  };

  const resetSettings = () => {
    setSettings(defaultSettings);
  };

  const updateSetting = (
    section: keyof SystemSettings,
    key: string,
    value: any
  ) => {
    setSettings((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: value,
      },
    }));
  };

  if (loading) {
    return (
      <Container size="lg" py="xl">
        <Center>
          <Stack align="center">
            <Loader size="lg" />
            <Text>Loading settings...</Text>
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
              System Settings
            </Title>
            <Text c="dimmed" size="sm">
              Configure your platform settings and preferences
            </Text>
          </div>
          <Group>
            <Button
              variant="light"
              leftSection={<IconRefresh size={16} />}
              onClick={fetchSettings}
            >
              Refresh
            </Button>
            <Button
              leftSection={<IconDeviceFloppy size={16} />}
              onClick={saveSettings}
              loading={saving}
            >
              Save Settings
            </Button>
          </Group>
        </Group>

        {/* Settings Tabs */}
        <Tabs
          value={activeTab}
          onChange={(value) => setActiveTab(value || "general")}
        >
          <Tabs.List>
            <Tabs.Tab value="general" leftSection={<IconSettings size={16} />}>
              General
            </Tabs.Tab>
            <Tabs.Tab value="email" leftSection={<IconMail size={16} />}>
              Email
            </Tabs.Tab>
            <Tabs.Tab value="security" leftSection={<IconShield size={16} />}>
              Security
            </Tabs.Tab>
            <Tabs.Tab value="features" leftSection={<IconBell size={16} />}>
              Features
            </Tabs.Tab>
            <Tabs.Tab
              value="appearance"
              leftSection={<IconPalette size={16} />}
            >
              Appearance
            </Tabs.Tab>
          </Tabs.List>

          {/* General Settings */}
          <Tabs.Panel value="general" pt="md">
            <Card shadow="sm" padding="lg" radius="md" withBorder>
              <Stack gap="md">
                <Title order={3} size="h4">
                  General Settings
                </Title>

                <Grid>
                  <Grid.Col span={{ base: 12, md: 6 }}>
                    <TextInput
                      label="Site Name"
                      value={settings.general.siteName}
                      onChange={(e) =>
                        updateSetting("general", "siteName", e.target.value)
                      }
                      required
                    />
                  </Grid.Col>
                  <Grid.Col span={{ base: 12, md: 6 }}>
                    <TextInput
                      label="Site URL"
                      value={settings.general.siteUrl}
                      onChange={(e) =>
                        updateSetting("general", "siteUrl", e.target.value)
                      }
                      required
                    />
                  </Grid.Col>
                </Grid>

                <Textarea
                  label="Site Description"
                  value={settings.general.siteDescription}
                  onChange={(e) =>
                    updateSetting("general", "siteDescription", e.target.value)
                  }
                  minRows={3}
                />

                <Grid>
                  <Grid.Col span={{ base: 12, md: 4 }}>
                    <NumberInput
                      label="Max Users"
                      value={settings.general.maxUsers}
                      onChange={(value) =>
                        updateSetting("general", "maxUsers", value || 1000)
                      }
                      min={1}
                    />
                  </Grid.Col>
                  <Grid.Col span={{ base: 12, md: 4 }}>
                    <NumberInput
                      label="Max Smells"
                      value={settings.general.maxSmells}
                      onChange={(value) =>
                        updateSetting("general", "maxSmells", value || 500)
                      }
                      min={1}
                    />
                  </Grid.Col>
                  <Grid.Col span={{ base: 12, md: 4 }}>
                    <Switch
                      label="Maintenance Mode"
                      description="Put the site in maintenance mode"
                      checked={settings.general.maintenanceMode}
                      onChange={(e) =>
                        updateSetting(
                          "general",
                          "maintenanceMode",
                          e.currentTarget.checked
                        )
                      }
                    />
                  </Grid.Col>
                </Grid>
              </Stack>
            </Card>
          </Tabs.Panel>

          {/* Email Settings */}
          <Tabs.Panel value="email" pt="md">
            <Card shadow="sm" padding="lg" radius="md" withBorder>
              <Stack gap="md">
                <Group justify="space-between">
                  <Title order={3} size="h4">
                    Email Configuration
                  </Title>
                  <Badge color={settings.email.enabled ? "green" : "red"}>
                    {settings.email.enabled ? "Enabled" : "Disabled"}
                  </Badge>
                </Group>

                <Switch
                  label="Enable Email Notifications"
                  description="Send email notifications to users"
                  checked={settings.email.enabled}
                  onChange={(e) =>
                    updateSetting("email", "enabled", e.currentTarget.checked)
                  }
                />

                {settings.email.enabled && (
                  <>
                    <Grid>
                      <Grid.Col span={{ base: 12, md: 6 }}>
                        <TextInput
                          label="SMTP Host"
                          value={settings.email.smtpHost}
                          onChange={(e) =>
                            updateSetting("email", "smtpHost", e.target.value)
                          }
                          placeholder="smtp.gmail.com"
                        />
                      </Grid.Col>
                      <Grid.Col span={{ base: 12, md: 6 }}>
                        <NumberInput
                          label="SMTP Port"
                          value={settings.email.smtpPort}
                          onChange={(value) =>
                            updateSetting("email", "smtpPort", value || 587)
                          }
                          min={1}
                          max={65535}
                        />
                      </Grid.Col>
                    </Grid>

                    <Grid>
                      <Grid.Col span={{ base: 12, md: 6 }}>
                        <TextInput
                          label="SMTP Username"
                          value={settings.email.smtpUser}
                          onChange={(e) =>
                            updateSetting("email", "smtpUser", e.target.value)
                          }
                        />
                      </Grid.Col>
                      <Grid.Col span={{ base: 12, md: 6 }}>
                        <PasswordInput
                          label="SMTP Password"
                          value={settings.email.smtpPassword}
                          onChange={(e) =>
                            updateSetting(
                              "email",
                              "smtpPassword",
                              e.target.value
                            )
                          }
                        />
                      </Grid.Col>
                    </Grid>

                    <Grid>
                      <Grid.Col span={{ base: 12, md: 6 }}>
                        <TextInput
                          label="From Email"
                          value={settings.email.fromEmail}
                          onChange={(e) =>
                            updateSetting("email", "fromEmail", e.target.value)
                          }
                        />
                      </Grid.Col>
                      <Grid.Col span={{ base: 12, md: 6 }}>
                        <TextInput
                          label="From Name"
                          value={settings.email.fromName}
                          onChange={(e) =>
                            updateSetting("email", "fromName", e.target.value)
                          }
                        />
                      </Grid.Col>
                    </Grid>

                    <Group>
                      <Button
                        variant="light"
                        leftSection={<IconMail size={16} />}
                        onClick={() => setTestEmailModal(true)}
                      >
                        Test Email
                      </Button>
                    </Group>
                  </>
                )}
              </Stack>
            </Card>
          </Tabs.Panel>

          {/* Security Settings */}
          <Tabs.Panel value="security" pt="md">
            <Card shadow="sm" padding="lg" radius="md" withBorder>
              <Stack gap="md">
                <Title order={3} size="h4">
                  Security Settings
                </Title>

                <Grid>
                  <Grid.Col span={{ base: 12, md: 6 }}>
                    <NumberInput
                      label="Session Timeout (hours)"
                      value={settings.security.sessionTimeout}
                      onChange={(value) =>
                        updateSetting("security", "sessionTimeout", value || 24)
                      }
                      min={1}
                      max={168}
                    />
                  </Grid.Col>
                  <Grid.Col span={{ base: 12, md: 6 }}>
                    <NumberInput
                      label="Max Login Attempts"
                      value={settings.security.maxLoginAttempts}
                      onChange={(value) =>
                        updateSetting(
                          "security",
                          "maxLoginAttempts",
                          value || 5
                        )
                      }
                      min={1}
                      max={10}
                    />
                  </Grid.Col>
                </Grid>

                <Grid>
                  <Grid.Col span={{ base: 12, md: 6 }}>
                    <NumberInput
                      label="Password Min Length"
                      value={settings.security.passwordMinLength}
                      onChange={(value) =>
                        updateSetting(
                          "security",
                          "passwordMinLength",
                          value || 8
                        )
                      }
                      min={6}
                      max={32}
                    />
                  </Grid.Col>
                </Grid>

                <Stack gap="sm">
                  <Switch
                    label="Require Email Verification"
                    description="Users must verify their email before accessing the platform"
                    checked={settings.security.requireEmailVerification}
                    onChange={(e) =>
                      updateSetting(
                        "security",
                        "requireEmailVerification",
                        e.currentTarget.checked
                      )
                    }
                  />
                  <Switch
                    label="Allow User Registration"
                    description="Allow new users to register accounts"
                    checked={settings.security.allowRegistration}
                    onChange={(e) =>
                      updateSetting(
                        "security",
                        "allowRegistration",
                        e.currentTarget.checked
                      )
                    }
                  />
                </Stack>
              </Stack>
            </Card>
          </Tabs.Panel>

          {/* Features Settings */}
          <Tabs.Panel value="features" pt="md">
            <Card shadow="sm" padding="lg" radius="md" withBorder>
              <Stack gap="md">
                <Title order={3} size="h4">
                  Feature Toggles
                </Title>

                <Stack gap="sm">
                  <Switch
                    label="Enable Analytics"
                    description="Collect and display user analytics"
                    checked={settings.features.enableAnalytics}
                    onChange={(e) =>
                      updateSetting(
                        "features",
                        "enableAnalytics",
                        e.currentTarget.checked
                      )
                    }
                  />
                  <Switch
                    label="Enable Notifications"
                    description="Send push notifications to users"
                    checked={settings.features.enableNotifications}
                    onChange={(e) =>
                      updateSetting(
                        "features",
                        "enableNotifications",
                        e.currentTarget.checked
                      )
                    }
                  />
                  <Switch
                    label="Enable Comments"
                    description="Allow users to comment on smells"
                    checked={settings.features.enableComments}
                    onChange={(e) =>
                      updateSetting(
                        "features",
                        "enableComments",
                        e.currentTarget.checked
                      )
                    }
                  />
                  <Switch
                    label="Enable Ratings"
                    description="Allow users to rate smells"
                    checked={settings.features.enableRatings}
                    onChange={(e) =>
                      updateSetting(
                        "features",
                        "enableRatings",
                        e.currentTarget.checked
                      )
                    }
                  />
                  <Switch
                    label="Enable Sharing"
                    description="Allow users to share smells"
                    checked={settings.features.enableSharing}
                    onChange={(e) =>
                      updateSetting(
                        "features",
                        "enableSharing",
                        e.currentTarget.checked
                      )
                    }
                  />
                </Stack>
              </Stack>
            </Card>
          </Tabs.Panel>

          {/* Appearance Settings */}
          <Tabs.Panel value="appearance" pt="md">
            <Card shadow="sm" padding="lg" radius="md" withBorder>
              <Stack gap="md">
                <Title order={3} size="h4">
                  Appearance Settings
                </Title>

                <Grid>
                  <Grid.Col span={{ base: 12, md: 6 }}>
                    <Select
                      label="Theme"
                      value={settings.appearance.theme}
                      onChange={(value) =>
                        updateSetting("appearance", "theme", value)
                      }
                      data={[
                        { value: "light", label: "Light" },
                        { value: "dark", label: "Dark" },
                        { value: "auto", label: "Auto" },
                      ]}
                    />
                  </Grid.Col>
                  <Grid.Col span={{ base: 12, md: 6 }}>
                    <Select
                      label="Primary Color"
                      value={settings.appearance.primaryColor}
                      onChange={(value) =>
                        updateSetting("appearance", "primaryColor", value)
                      }
                      data={[
                        { value: "blue", label: "Blue" },
                        { value: "green", label: "Green" },
                        { value: "red", label: "Red" },
                        { value: "purple", label: "Purple" },
                        { value: "orange", label: "Orange" },
                      ]}
                    />
                  </Grid.Col>
                </Grid>

                <Grid>
                  <Grid.Col span={{ base: 12, md: 6 }}>
                    <TextInput
                      label="Logo URL"
                      value={settings.appearance.logoUrl}
                      onChange={(e) =>
                        updateSetting("appearance", "logoUrl", e.target.value)
                      }
                      placeholder="https://example.com/logo.png"
                    />
                  </Grid.Col>
                  <Grid.Col span={{ base: 12, md: 6 }}>
                    <TextInput
                      label="Favicon URL"
                      value={settings.appearance.faviconUrl}
                      onChange={(e) =>
                        updateSetting(
                          "appearance",
                          "faviconUrl",
                          e.target.value
                        )
                      }
                      placeholder="https://example.com/favicon.ico"
                    />
                  </Grid.Col>
                </Grid>
              </Stack>
            </Card>
          </Tabs.Panel>
        </Tabs>

        {/* Danger Zone */}
        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <Stack gap="md">
            <Title order={3} size="h4" c="red">
              Danger Zone
            </Title>
            <Alert
              icon={<IconAlertCircle size={16} />}
              title="Warning"
              color="red"
            >
              These actions are irreversible. Please be careful.
            </Alert>
            <Group>
              <Button
                variant="light"
                color="red"
                leftSection={<IconRefresh size={16} />}
                onClick={resetSettings}
              >
                Reset to Defaults
              </Button>
              <Button
                variant="light"
                color="red"
                leftSection={<IconTrash size={16} />}
                onClick={() => console.log("Clear cache")}
              >
                Clear Cache
              </Button>
            </Group>
          </Stack>
        </Card>

        {/* Test Email Modal */}
        <Modal
          opened={testEmailModal}
          onClose={() => setTestEmailModal(false)}
          title="Test Email Configuration"
          centered
        >
          <Stack gap="md">
            <Text size="sm" c="dimmed">
              Send a test email to verify your email configuration.
            </Text>
            <TextInput
              label="Test Email Address"
              placeholder="test@example.com"
              value={testEmail}
              onChange={(e) => setTestEmail(e.target.value)}
              required
            />
            <Group justify="flex-end">
              <Button variant="light" onClick={() => setTestEmailModal(false)}>
                Cancel
              </Button>
              <Button onClick={testEmailConnection} loading={testEmailLoading}>
                Send Test Email
              </Button>
            </Group>
          </Stack>
        </Modal>
      </Stack>
    </Container>
  );
}
