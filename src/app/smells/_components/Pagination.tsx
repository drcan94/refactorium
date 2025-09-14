"use client";

import {
  Group,
  Text,
  Select,
  Pagination as MantinePagination,
} from "@mantine/core";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
  onItemsPerPageChange: (value: number) => void;
}

export function Pagination({
  currentPage,
  totalPages,
  totalItems,
  itemsPerPage,
  onPageChange,
  onItemsPerPageChange,
}: PaginationProps) {
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  return (
    <Group justify="space-between" align="center" mt="xl">
      <Group gap="md">
        <Text size="sm" c="dimmed">
          Showing {startItem} to {endItem} of {totalItems} smells
        </Text>
        <Text size="sm" c="dimmed">
          Page {currentPage} of {totalPages}
        </Text>
      </Group>

      <Group gap="xs" align="center">
        <Text size="sm" fw={500}>
          Items per page:
        </Text>
        <Select
          data={[
            { value: "4", label: "4" },
            { value: "8", label: "8" },
            { value: "12", label: "12" },
            { value: "16", label: "16" },
          ]}
          value={itemsPerPage.toString()}
          onChange={(value) => onItemsPerPageChange(parseInt(value || "4"))}
          size="sm"
          w={80}
          allowDeselect={false}
        />
      </Group>

      {totalPages > 1 && (
        <MantinePagination
          value={currentPage}
          onChange={onPageChange}
          total={totalPages}
          size="sm"
        />
      )}
    </Group>
  );
}
