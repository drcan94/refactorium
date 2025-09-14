"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import {
  Container,
  Title,
  Text,
  Stack,
  Button,
  Box,
  Alert,
  Card,
  Loader,
  Center,
} from "@mantine/core";
import { IconBrandGithub, IconAlertCircle } from "@tabler/icons-react";
import { signIn, getProviders } from "next-auth/react";

function SignInContent() {
  const searchParams = useSearchParams();
  const [providers, setProviders] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const callbackUrl = searchParams.get("callbackUrl") || "/";
  const errorParam = searchParams.get("error");

  useEffect(() => {
    const fetchProviders = async () => {
      try {
        const response = await getProviders();
        setProviders(response);
      } catch (err) {
        console.error("Failed to fetch providers:", err);
      }
    };

    fetchProviders();
  }, []);

  useEffect(() => {
    if (errorParam) {
      switch (errorParam) {
        case "Configuration":
          setError("There is a problem with the server configuration.");
          break;
        case "AccessDenied":
          setError("Access denied. You do not have permission to sign in.");
          break;
        case "Verification":
          setError(
            "The verification token has expired or has already been used."
          );
          break;
        default:
          setError("An error occurred during sign in. Please try again.");
      }
    }
  }, [errorParam]);

  const handleSignIn = async (providerId: string) => {
    setLoading(true);
    setError(null);

    try {
      await signIn(providerId, { callbackUrl });
    } catch (err) {
      setError("Failed to sign in. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container size="sm" py="xl" style={{ maxWidth: 400, margin: "0 auto" }}>
      <Stack gap="xl" align="center">
        <Box ta="center">
          <Title order={1} size="h1" mb="sm">
            Welcome to Refactorium
          </Title>
          <Text size="lg" c="dimmed" maw={400}>
            Sign in to save your favorite code smells, track your learning
            progress, and get personalized recommendations.
          </Text>
        </Box>

        <Card shadow="sm" padding="xl" radius="md" w="100%" maw={400}>
          <Stack gap="lg">
            <Title order={2} size="h3" ta="center">
              Sign In
            </Title>

            {error && (
              <Alert
                icon={<IconAlertCircle size={16} />}
                color="red"
                title="Sign In Error"
              >
                {error}
              </Alert>
            )}

            <Stack gap="md">
              {providers ? (
                providers?.github ? (
                  <Button
                    variant="default"
                    size="md"
                    fullWidth
                    leftSection={<IconBrandGithub size={18} />}
                    onClick={() => handleSignIn("github")}
                    loading={loading}
                    disabled={loading}
                  >
                    Continue with GitHub
                  </Button>
                ) : (
                  <Alert
                    color="blue"
                    title="GitHub Authentication Not Configured"
                  >
                    <Text size="sm">
                      GitHub authentication is not configured. Please contact
                      the administrator.
                    </Text>
                  </Alert>
                )
              ) : (
                <Center py="md">
                  <Loader size="sm" />
                </Center>
              )}
            </Stack>

            <Box ta="center">
              <Text size="sm" c="dimmed">
                By signing in, you agree to our{" "}
                <Text component="span" c="blue" style={{ cursor: "pointer" }}>
                  Terms of Service
                </Text>{" "}
                and{" "}
                <Text component="span" c="blue" style={{ cursor: "pointer" }}>
                  Privacy Policy
                </Text>
              </Text>
            </Box>
          </Stack>
        </Card>

        <Box ta="center">
          <Text size="sm" c="dimmed">
            Don't have an account? Sign in with Google or GitHub to get started
            instantly.
          </Text>
        </Box>
      </Stack>
    </Container>
  );
}

export default function SignInPage() {
  return (
    <Suspense
      fallback={
        <Container size="sm" py="xl">
          <Center h={400}>
            <Loader size="md" />
          </Center>
        </Container>
      }
    >
      <SignInContent />
    </Suspense>
  );
}
