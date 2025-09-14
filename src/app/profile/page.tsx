"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Container,
  Title,
  Text,
  Stack,
  Card,
  Group,
  Avatar,
  Button,
  Grid,
  Badge,
  Box,
  ActionIcon,
  LoadingOverlay,
  Alert,
  Modal,
  TextInput,
  Textarea,
} from "@mantine/core";
import { notifications } from "@mantine/notifications";
import {
  IconMail,
  IconCalendar,
  IconHeart,
  IconStar,
  IconCode,
  IconExternalLink,
  IconEdit,
  IconCheck,
  IconMapPin,
  IconWorld,
  IconBrandGithub,
  IconBrandLinkedin,
  IconBrandTwitter,
} from "@tabler/icons-react";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import Link from "next/link";
import {
  UpdateUserProfileData,
  UserWithProfile,
  SmellWithCounts,
  AppSession,
} from "@/lib/types";
import {
  getDifficultyStars,
  getDifficultyColor,
  getCategoryLabel,
} from "@/lib/constants";

export default function ProfilePage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [session, setSession] = useState<AppSession | null>(null);
  const [userProfile, setUserProfile] = useState<UserWithProfile | null>(null);
  const [status, setStatus] = useState<string>("loading");
  const [userStats, setUserStats] = useState<{
    favoritesCount: number;
    completedSmells: number;
    startedSmells: number;
    totalProgress: number;
  } | null>(null);
  const [favoriteSmells, setFavoriteSmells] = useState<SmellWithCounts[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [opened, { open, close }] = useDisclosure(false);

  const form = useForm<UpdateUserProfileData>({
    initialValues: {
      name: "",
      bio: "",
      location: "",
      website: "",
      linkedinUrl: "",
      twitterUrl: "",
    },
    validate: {
      name: (value) => (!value ? "Name is required" : null),
      bio: (value) => (value && value.length > 500 ? "Bio too long" : null),
      website: (value) => {
        if (!value) return null;
        try {
          new URL(value);
          return null;
        } catch {
          return "Invalid URL";
        }
      },
      linkedinUrl: (value) => {
        if (!value) return null;
        try {
          new URL(value);
          return null;
        } catch {
          return "Invalid URL";
        }
      },
      twitterUrl: (value) => {
        if (!value) return null;
        try {
          new URL(value);
          return null;
        } catch {
          return "Invalid URL";
        }
      },
    },
  });

  useEffect(() => {
    setMounted(true);

    const getSession = async () => {
      try {
        const response = await fetch("/api/auth/session");
        const data = await response.json();
        console.log("🔍 Session data from API:", data);
        if (data.user) {
          setSession(data);
          setStatus("authenticated");
          fetchUserData();
        } else {
          setSession(null);
          setStatus("unauthenticated");
        }
      } catch (error) {
        console.error("❌ Error fetching session:", error);
        setSession(null);
        setStatus("unauthenticated");
      }
    };

    getSession();
  }, []);

  const fetchUserData = async () => {
    try {
      setLoading(true);

      // Fetch user stats, favorites, and profile
      const [favoritesResponse, progressResponse, profileResponse] =
        await Promise.all([
          fetch("/api/user/favorites"),
          fetch("/api/user/progress"),
          fetch("/api/user/profile"),
        ]);

      const favoritesData = await favoritesResponse.json();
      const progressData = await progressResponse.json();
      const profileData = await profileResponse.json();

      console.log("📊 Profile data from API:", profileData);
      console.log("📊 Current session:", session);

      if (favoritesResponse.ok && progressResponse.ok && profileResponse.ok) {
        setFavoriteSmells(favoritesData.favorites || []);

        // Update session with fresh profile data
        if (profileData.user && session) {
          const updatedSession = {
            ...session,
            user: {
              ...session.user,
              ...profileData.user,
            },
          };
          console.log("🔄 Updated session:", updatedSession);
          setSession(updatedSession);
        }

        // Set user profile for display
        if (profileData.user) {
          setUserProfile(profileData.user);
        }

        // Update form with current profile data
        if (profileData.user) {
          form.setValues({
            name: profileData.user.name || "",
            bio: profileData.user.bio || "",
            location: profileData.user.location || "",
            website: profileData.user.website || "",
            linkedinUrl: profileData.user.linkedinUrl || "",
            twitterUrl: profileData.user.twitterUrl || "",
          });
        }

        // Calculate stats
        const stats = {
          favoritesCount: favoritesData.favorites?.length || 0,
          completedSmells:
            progressData.progress?.filter((p: any) => p.status === "completed")
              .length || 0,
          startedSmells:
            progressData.progress?.filter((p: any) => p.status === "started")
              .length || 0,
          totalProgress: progressData.progress?.length || 0,
        };
        setUserStats(stats);
      }
    } catch (error) {
      console.error("Failed to fetch user data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEditProfile = () => {
    // Form'u güncel verilerle doldur
    const currentData = userProfile || session?.user;
    if (currentData) {
      form.setValues({
        name: currentData.name || "",
        bio: currentData.bio || "",
        location: currentData.location || "",
        website: currentData.website || "",
        linkedinUrl: currentData.linkedinUrl || "",
        twitterUrl: currentData.twitterUrl || "",
      });
      console.log("🔄 Form filled with current data:", currentData);
    }
    open();
  };

  const handleSaveProfile = async (values: UpdateUserProfileData) => {
    try {
      setSaving(true);

      // Sadece kullanıcının değiştirebileceği alanları gönder
      const updateData = {
        name: values.name,
        bio: values.bio,
        location: values.location,
        website: values.website,
        linkedinUrl: values.linkedinUrl,
        twitterUrl: values.twitterUrl,
      };

      const response = await fetch("/api/user/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updateData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("✅ Profile updated successfully:", data);

        // Update session
        if (session) {
          const updatedSession = {
            ...session,
            user: { ...session.user, ...data.user },
          };
          setSession(updatedSession);
          console.log("🔄 Updated session:", updatedSession);
        }

        // Update userProfile state
        if (data.user) {
          setUserProfile(data.user);
          console.log("🔄 Updated userProfile:", data.user);
        }

        // Update form with new data
        form.setValues({
          name: data.user.name || "",
          bio: data.user.bio || "",
          location: data.user.location || "",
          website: data.user.website || "",
          linkedinUrl: data.user.linkedinUrl || "",
          twitterUrl: data.user.twitterUrl || "",
        });

        close();
        notifications.show({
          title: "Success",
          message: "Profile updated successfully!",
          color: "green",
        });
      } else {
        const error = await response.json();
        notifications.show({
          title: "Error",
          message: error.error || "Failed to update profile",
          color: "red",
        });
      }
    } catch (error) {
      console.error("Failed to update profile:", error);
      notifications.show({
        title: "Error",
        message: "Failed to update profile",
        color: "red",
      });
    } finally {
      setSaving(false);
    }
  };

  const handleCancelEdit = () => {
    close();
    form.reset();
  };

  const handleSyncGitHub = async () => {
    try {
      setSaving(true);
      const response = await fetch("/api/user/sync-github", {
        method: "POST",
      });

      if (response.ok) {
        const data = await response.json();
        if (session) {
          setSession({ ...session, user: { ...session.user, ...data.user } });
        }

        // Session'ı yenile
        await refreshSession();

        notifications.show({
          title: "Success",
          message: "GitHub profile synced successfully!",
          color: "green",
        });
      } else {
        const error = await response.json();
        notifications.show({
          title: "Error",
          message: error.error || "Failed to sync GitHub profile",
          color: "red",
        });
      }
    } catch (error) {
      console.error("Failed to sync GitHub profile:", error);
      notifications.show({
        title: "Error",
        message: "Failed to sync GitHub profile",
        color: "red",
      });
    } finally {
      setSaving(false);
    }
  };

  const refreshSession = async () => {
    try {
      const response = await fetch("/api/auth/session");
      const data = await response.json();
      if (data.user) {
        setSession(data);
        setStatus("authenticated");
      }
    } catch (error) {
      console.error("Failed to refresh session:", error);
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
      {/* Header */}
      <Group justify="flex-end" mb="xl">
        <Button
          variant="outline"
          leftSection={<IconBrandGithub size={16} />}
          onClick={handleSyncGitHub}
          loading={saving}
        >
          Sync GitHub
        </Button>
        <Button
          variant="light"
          leftSection={<IconEdit size={16} />}
          onClick={handleEditProfile}
        >
          Edit Profile
        </Button>
      </Group>

      {/* Profile Header */}
      <Card shadow="sm" padding="xl" radius="md" mb="xl">
        <Group gap="xl" align="flex-start">
          <Avatar
            src={userProfile?.image || session?.user?.image}
            alt={userProfile?.name || session?.user?.name || "User"}
            size={120}
            radius="xl"
            style={{ border: "4px solid var(--mantine-color-white)" }}
          />
          <Box style={{ flex: 1 }}>
            <Title order={1} size="h1" mb="sm">
              {userProfile?.name || session?.user?.name || "User"}
            </Title>
            <Group gap="lg" mb="md">
              {(userProfile?.email || session?.user?.email) && (
                <Group gap="xs">
                  <IconMail size={16} />
                  <Text size="sm" c="dimmed">
                    {userProfile?.email || session?.user?.email}
                  </Text>
                </Group>
              )}
              {(userProfile?.location || session?.user?.location) && (
                <Group gap="xs">
                  <IconMapPin size={16} />
                  <Text size="sm" c="dimmed">
                    {userProfile?.location || session?.user?.location}
                  </Text>
                </Group>
              )}
              {(userProfile?.githubUrl || session?.user?.githubUrl) && (
                <Group gap="xs">
                  <IconBrandGithub size={16} />
                  <Text size="sm" c="dimmed">
                    GitHub
                  </Text>
                </Group>
              )}
            </Group>
            {userProfile?.bio || session?.user?.bio ? (
              <Text size="sm" c="dimmed" mb="lg">
                {userProfile?.bio || session?.user?.bio}
              </Text>
            ) : (
              <Text size="sm" c="dimmed" mb="lg">
                Joined Refactorium to improve code quality and learn refactoring
                patterns.
              </Text>
            )}
            {/* Social Links */}
            {(userProfile?.website ||
              session?.user?.website ||
              userProfile?.githubUrl ||
              session?.user?.githubUrl ||
              userProfile?.linkedinUrl ||
              session?.user?.linkedinUrl ||
              userProfile?.twitterUrl ||
              session?.user?.twitterUrl) && (
              <Group gap="md" mt="md">
                {(userProfile?.website || session?.user?.website) && (
                  <Button
                    variant="light"
                    size="xs"
                    leftSection={<IconWorld size={14} />}
                    component="a"
                    href={userProfile?.website || session?.user?.website || ""}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Website
                  </Button>
                )}
                {(userProfile?.githubUrl || session?.user?.githubUrl) && (
                  <Button
                    variant="light"
                    size="xs"
                    leftSection={<IconBrandGithub size={14} />}
                    component="a"
                    href={
                      userProfile?.githubUrl || session?.user?.githubUrl || ""
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    GitHub
                  </Button>
                )}
                {(userProfile?.linkedinUrl || session?.user?.linkedinUrl) && (
                  <Button
                    variant="light"
                    size="xs"
                    leftSection={<IconBrandLinkedin size={14} />}
                    component="a"
                    href={
                      userProfile?.linkedinUrl ||
                      session?.user?.linkedinUrl ||
                      ""
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    LinkedIn
                  </Button>
                )}
                {(userProfile?.twitterUrl || session?.user?.twitterUrl) && (
                  <Button
                    variant="light"
                    size="xs"
                    leftSection={<IconBrandTwitter size={14} />}
                    component="a"
                    href={
                      userProfile?.twitterUrl || session?.user?.twitterUrl || ""
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Twitter
                  </Button>
                )}
              </Group>
            )}
          </Box>
        </Group>
      </Card>

      {/* Stats Grid */}
      <Grid mb="xl">
        <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
          <Card shadow="sm" padding="lg" radius="md" ta="center">
            <Stack gap="xs">
              <Box
                style={{
                  width: 60,
                  height: 60,
                  borderRadius: "50%",
                  background: "var(--mantine-color-blue-light)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto",
                }}
              >
                <IconHeart size={30} color="var(--mantine-color-blue-6)" />
              </Box>
              <Title order={3}>{userStats?.favoritesCount || 0}</Title>
              <Text size="sm" c="dimmed">
                Favorite Smells
              </Text>
            </Stack>
          </Card>
        </Grid.Col>
        <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
          <Card shadow="sm" padding="lg" radius="md" ta="center">
            <Stack gap="xs">
              <Box
                style={{
                  width: 60,
                  height: 60,
                  borderRadius: "50%",
                  background: "var(--mantine-color-green-light)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto",
                }}
              >
                <IconStar size={30} color="var(--mantine-color-green-6)" />
              </Box>
              <Title order={3}>{userStats?.completedSmells || 0}</Title>
              <Text size="sm" c="dimmed">
                Completed
              </Text>
            </Stack>
          </Card>
        </Grid.Col>
        <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
          <Card shadow="sm" padding="lg" radius="md" ta="center">
            <Stack gap="xs">
              <Box
                style={{
                  width: 60,
                  height: 60,
                  borderRadius: "50%",
                  background: "var(--mantine-color-orange-light)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto",
                }}
              >
                <IconCode size={30} color="var(--mantine-color-orange-6)" />
              </Box>
              <Title order={3}>{userStats?.startedSmells || 0}</Title>
              <Text size="sm" c="dimmed">
                In Progress
              </Text>
            </Stack>
          </Card>
        </Grid.Col>
        <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
          <Card shadow="sm" padding="lg" radius="md" ta="center">
            <Stack gap="xs">
              <Box
                style={{
                  width: 60,
                  height: 60,
                  borderRadius: "50%",
                  background: "var(--mantine-color-purple-light)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto",
                }}
              >
                <IconCalendar size={30} color="var(--mantine-color-purple-6)" />
              </Box>
              <Title order={3}>{userStats?.totalProgress || 0}</Title>
              <Text size="sm" c="dimmed">
                Total Progress
              </Text>
            </Stack>
          </Card>
        </Grid.Col>
      </Grid>

      {/* Favorite Smells */}
      <Card shadow="sm" padding="xl" radius="md">
        <Title order={2} size="h3" mb="lg">
          Favorite Code Smells
        </Title>

        {loading ? (
          <LoadingOverlay visible />
        ) : favoriteSmells.length > 0 ? (
          <Stack gap="md">
            {favoriteSmells.map((smell) => (
              <Card
                key={smell.id}
                shadow="xs"
                padding="md"
                radius="md"
                withBorder
              >
                <Group justify="space-between" align="flex-start">
                  <Box style={{ flex: 1 }}>
                    <Group gap="sm" mb="xs">
                      <Title order={4} size="h5">
                        {smell.title}
                      </Title>
                      <Badge color="blue" variant="light" size="sm">
                        {getCategoryLabel(smell.category)}
                      </Badge>
                      <Badge
                        color={getDifficultyColor(smell.difficulty)}
                        variant="light"
                        size="sm"
                      >
                        {getDifficultyStars(smell.difficulty)}⭐
                      </Badge>
                    </Group>
                    <Text size="xs" c="dimmed">
                      Added on {new Date(smell.createdAt).toLocaleDateString()}
                    </Text>
                  </Box>
                  <ActionIcon
                    variant="light"
                    component={Link}
                    href={`/smells/${smell.id}`}
                  >
                    <IconExternalLink size={16} />
                  </ActionIcon>
                </Group>
              </Card>
            ))}
          </Stack>
        ) : (
          <Box ta="center" py="xl">
            <Text size="lg" c="dimmed" mb="md">
              No favorite smells yet
            </Text>
            <Text size="sm" c="dimmed" mb="lg">
              Start exploring code smells and add them to your favorites!
            </Text>
            <Button component={Link} href="/">
              Explore Smells
            </Button>
          </Box>
        )}
      </Card>

      {/* Edit Profile Modal */}
      <Modal
        opened={opened}
        onClose={close}
        title="Edit Profile"
        size="lg"
        centered
        lockScroll={false}
      >
        <form onSubmit={form.onSubmit(handleSaveProfile)}>
          <Stack gap="md">
            <TextInput
              label="Name"
              placeholder="Your name"
              required
              {...form.getInputProps("name")}
            />

            <Textarea
              label="Bio"
              placeholder="Tell us about yourself..."
              minRows={3}
              maxRows={6}
              {...form.getInputProps("bio")}
            />

            <TextInput
              label="Location"
              placeholder="City, Country"
              leftSection={<IconMapPin size={16} />}
              {...form.getInputProps("location")}
            />

            <TextInput
              label="Website"
              placeholder="https://yourwebsite.com"
              leftSection={<IconWorld size={16} />}
              {...form.getInputProps("website")}
            />

            <TextInput
              label="GitHub"
              placeholder="https://github.com/username"
              leftSection={<IconBrandGithub size={16} />}
              value={session?.user?.githubUrl || ""}
              disabled
              description="GitHub URL is automatically synced from your GitHub profile"
            />

            <TextInput
              label="LinkedIn"
              placeholder="https://linkedin.com/in/username"
              leftSection={<IconBrandLinkedin size={16} />}
              {...form.getInputProps("linkedinUrl")}
            />

            <TextInput
              label="Twitter"
              placeholder="https://twitter.com/username"
              leftSection={<IconBrandTwitter size={16} />}
              {...form.getInputProps("twitterUrl")}
            />

            <Group justify="flex-end" mt="md">
              <Button
                variant="light"
                onClick={handleCancelEdit}
                disabled={saving}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                loading={saving}
                leftSection={<IconCheck size={16} />}
              >
                Save Changes
              </Button>
            </Group>
          </Stack>
        </form>
      </Modal>
    </>
  );
}
