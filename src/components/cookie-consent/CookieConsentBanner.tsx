"use client";

import { useState } from "react";
import {
  Card,
  Text,
  Button,
  Group,
  Stack,
  Switch,
  Divider,
  Title,
  Box,
} from "@mantine/core";
import { IconCookie, IconSettings } from "@tabler/icons-react";
import { useCookieConsent } from "@/lib/hooks/use-cookie-consent";

export function CookieConsentBanner() {
  const {
    consent,
    updateConsent,
    acceptAll,
    rejectAll,
    hasConsent,
    isLoading,
  } = useCookieConsent();
  const [showDetails, setShowDetails] = useState(false);

  // Don't show banner while loading or if consent already given
  if (isLoading || hasConsent()) {
    return null;
  }

  const handleSavePreferences = () => {
    setShowDetails(false);
  };

  return (
    <Card
      shadow="lg"
      radius="md"
      p="md"
      withBorder
      style={{
        position: "fixed",
        bottom: 16,
        left: 16,
        right: 16,
        maxWidth: 500,
        zIndex: 1000,
        border: "2px solid var(--mantine-color-blue-3)",
        backgroundColor: "var(--mantine-color-body)",
      }}
    >
      <Stack gap="md">
        <Group gap="sm">
          <IconCookie size={20} />
          <Title order={4}>Cookie Preferences</Title>
        </Group>

        <Text size="sm" c="dimmed">
          We use cookies to enhance your experience, analyze site usage, and
          assist in our marketing efforts. You can customize your preferences
          below.
        </Text>

        {!showDetails ? (
          <Group gap="sm">
            <Button size="sm" onClick={acceptAll}>
              Accept All
            </Button>
            <Button size="sm" variant="outline" onClick={rejectAll}>
              Reject All
            </Button>
            <Button
              size="sm"
              variant="subtle"
              leftSection={<IconSettings size={14} />}
              onClick={() => setShowDetails(true)}
            >
              Customize
            </Button>
          </Group>
        ) : (
          <Stack gap="md">
            <Divider />

            <Box>
              <Group justify="space-between" mb="xs">
                <Text fw={500} size="sm">
                  Necessary Cookies
                </Text>
                <Switch checked={true} disabled size="sm" />
              </Group>
              <Text size="xs" c="dimmed">
                Essential for the website to function properly. Cannot be
                disabled.
              </Text>
            </Box>

            <Box>
              <Group justify="space-between" mb="xs">
                <Text fw={500} size="sm">
                  Analytics Cookies
                </Text>
                <Switch
                  checked={consent?.analytics || false}
                  onChange={(event) =>
                    updateConsent({ analytics: event.currentTarget.checked })
                  }
                  size="sm"
                />
              </Group>
              <Text size="xs" c="dimmed">
                Help us understand how visitors interact with our website.
              </Text>
            </Box>

            <Box>
              <Group justify="space-between" mb="xs">
                <Text fw={500} size="sm">
                  Marketing Cookies
                </Text>
                <Switch
                  checked={consent?.marketing || false}
                  onChange={(event) =>
                    updateConsent({ marketing: event.currentTarget.checked })
                  }
                  size="sm"
                />
              </Group>
              <Text size="xs" c="dimmed">
                Used to deliver relevant advertisements and track campaign
                performance.
              </Text>
            </Box>

            <Box>
              <Group justify="space-between" mb="xs">
                <Text fw={500} size="sm">
                  Preference Cookies
                </Text>
                <Switch
                  checked={consent?.preferences || false}
                  onChange={(event) =>
                    updateConsent({ preferences: event.currentTarget.checked })
                  }
                  size="sm"
                />
              </Group>
              <Text size="xs" c="dimmed">
                Remember your settings and preferences for a personalized
                experience.
              </Text>
            </Box>

            <Divider />

            <Group gap="sm">
              <Button size="sm" onClick={handleSavePreferences}>
                Save Preferences
              </Button>
              <Button size="sm" variant="outline" onClick={acceptAll}>
                Accept All
              </Button>
            </Group>
          </Stack>
        )}
      </Stack>
    </Card>
  );
}
