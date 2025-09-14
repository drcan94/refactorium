"use client";

import {
  Card,
  Group,
  Title,
  Text,
  Badge,
  Stack,
  Button,
  ActionIcon,
  Box,
} from "@mantine/core";
import { IconHeart, IconStar, IconExternalLink } from "@tabler/icons-react";
import Link from "next/link";
import { SmellWithCounts } from "@/lib/types";
import {
  getDifficultyStars,
  getDifficultyColor,
  getCategoryLabel,
  getDifficultyLabel,
} from "@/lib/constants";

interface SmellCardProps {
  smell: SmellWithCounts;
  isFavorited?: boolean;
  isInProgress?: boolean;
  isFavoriteLoading?: boolean;
  isProgressLoading?: boolean;
  onFavoriteToggle?: (smellId: string) => void;
  onProgressToggle?: (smellId: string) => void;
  showAuthButtons?: boolean;
}

export function SmellCard({
  smell,
  isFavorited = false,
  isInProgress = false,
  isFavoriteLoading = false,
  isProgressLoading = false,
  onFavoriteToggle,
  onProgressToggle,
  showAuthButtons = true,
}: SmellCardProps) {
  const tags = smell.tags.split(",").map((tag) => tag.trim());

  return (
    <Card shadow="sm" padding="lg" radius="md" h="100%">
      <Stack gap="md" h="100%">
        {/* Header */}
        <Group justify="space-between" align="flex-start">
          <Box style={{ flex: 1 }}>
            <Title order={3} size="h5" mb="xs" lineClamp={2}>
              {smell.title}
            </Title>
            <Group gap="xs" mb="sm">
              <Badge color="blue" size="sm">
                {getCategoryLabel(smell.category)}
              </Badge>
              <Badge
                color={getDifficultyColor(smell.difficulty)}
                variant="light"
                size="sm"
                title={`Difficulty: ${getDifficultyLabel(smell.difficulty)}`}
              >
                {Array.from(
                  { length: getDifficultyStars(smell.difficulty) },
                  (_, i) => (
                    <IconStar key={i} size={12} fill="currentColor" />
                  )
                )}
              </Badge>
            </Group>
          </Box>
          {showAuthButtons && (
            <Group gap="xs">
              <ActionIcon
                variant={isInProgress ? "filled" : "light"}
                color={isInProgress ? "orange" : "gray"}
                onClick={() => onProgressToggle?.(smell.id)}
                loading={isProgressLoading}
                size="lg"
                title={
                  isInProgress ? "Remove from progress" : "Add to progress"
                }
              >
                <IconStar
                  size={18}
                  fill={isInProgress ? "white" : "none"}
                  stroke={isInProgress ? "white" : "currentColor"}
                  strokeWidth={isInProgress ? 0 : 1.5}
                />
              </ActionIcon>
              <ActionIcon
                variant={isFavorited ? "filled" : "light"}
                color={isFavorited ? "red" : "gray"}
                onClick={() => onFavoriteToggle?.(smell.id)}
                loading={isFavoriteLoading}
                size="lg"
                title={
                  isFavorited ? "Remove from favorites" : "Add to favorites"
                }
              >
                <IconHeart
                  size={18}
                  fill={isFavorited ? "white" : "none"}
                  stroke={isFavorited ? "white" : "currentColor"}
                  strokeWidth={isFavorited ? 0 : 1.5}
                />
              </ActionIcon>
            </Group>
          )}
        </Group>

        {/* Description */}
        <Text size="sm" c="dimmed" lineClamp={3} style={{ flex: 1 }}>
          {smell.description}
        </Text>

        {/* Tags */}
        {tags.length > 0 && (
          <Group gap="xs">
            {tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="outline" size="xs">
                {tag}
              </Badge>
            ))}
            {tags.length > 3 && (
              <Badge variant="outline" size="xs">
                +{tags.length - 3} more
              </Badge>
            )}
          </Group>
        )}

        {/* Stats */}
        <Group justify="space-between" mt="auto">
          <Group gap="lg">
            <Group gap="xs" title="Favorites">
              <IconHeart size={14} color="red" />
              <Text size="xs" c="dimmed">
                {smell._count.favorites}
              </Text>
            </Group>
            {showAuthButtons && (
              <Group gap="xs" title="In Progress">
                <IconStar size={14} color="orange" />
                <Text size="xs" c="dimmed">
                  {smell._count.progress}
                </Text>
              </Group>
            )}
          </Group>
          <Button
            component={Link}
            href={`/smells/${smell.id}`}
            variant="light"
            size="xs"
            rightSection={<IconExternalLink size={14} />}
          >
            View Details
          </Button>
        </Group>
      </Stack>
    </Card>
  );
}
