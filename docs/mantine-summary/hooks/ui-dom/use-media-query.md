# use-media-query Hook

## Overview

The `use-media-query` hook provides a clean way to subscribe to CSS media queries using the `window.matchMedia()` API. It returns a boolean value indicating whether the specified media query matches the current viewport state, making it perfect for responsive design, conditional rendering, and adaptive UI behavior.

## Installation

```bash
npm install @mantine/hooks
```

## Import

```typescript
import { useMediaQuery } from '@mantine/hooks';
import type { UseMediaQueryOptions } from '@mantine/hooks';
```

## Basic Usage

```tsx
import { Badge } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';

function Demo() {
  const matches = useMediaQuery('(min-width: 56.25em)');

  return (
    <Badge color={matches ? 'teal' : 'red'} variant="filled">
      Breakpoint {matches ? 'matches' : 'does not match'}
    </Badge>
  );
}
```

## API Reference

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `query` | `string` | **Required.** CSS media query string to match against |
| `initialValue` | `boolean` | **Optional.** Initial value returned before the hook calculates the actual value |
| `options` | `UseMediaQueryOptions` | **Optional.** Configuration options for the hook behavior |

### UseMediaQueryOptions

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `getInitialValueInEffect` | `boolean` | `true` | Whether to calculate the initial value in useEffect instead of during render |

### Return Value

| Type | Description |
|------|-------------|
| `boolean` | `true` if the media query matches, `false` otherwise |

### Type Definitions

```typescript
interface UseMediaQueryOptions {
  getInitialValueInEffect: boolean;
}

function useMediaQuery(
  query: string,
  initialValue?: boolean,
  options?: UseMediaQueryOptions,
): boolean;
```

## Key Features

### 1. **Responsive Design Support**
- Subscribe to any CSS media query
- Real-time updates when viewport changes
- Perfect for responsive components

### 2. **Server-Side Rendering (SSR) Support**
- Handles SSR gracefully with initial values
- Prevents hydration mismatches
- Configurable initial value behavior

### 3. **Performance Optimized**
- Uses native `window.matchMedia()` API
- Automatic cleanup on unmount
- Efficient re-renders only when needed

## Advanced Usage

### Basic Responsive Design

```tsx
import { useMediaQuery } from '@mantine/hooks';
import { Text, Box, Group } from '@mantine/core';

function ResponsiveComponent() {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const isTablet = useMediaQuery('(min-width: 769px) and (max-width: 1024px)');
  const isDesktop = useMediaQuery('(min-width: 1025px)');

  return (
    <Box>
      <Text size="lg" weight="bold">
        Current Device: {isMobile ? 'Mobile' : isTablet ? 'Tablet' : 'Desktop'}
      </Text>
      
      <Group mt="md">
        <Text color={isMobile ? 'blue' : 'gray'}>Mobile: {isMobile ? '✓' : '✗'}</Text>
        <Text color={isTablet ? 'green' : 'gray'}>Tablet: {isTablet ? '✓' : '✗'}</Text>
        <Text color={isDesktop ? 'purple' : 'gray'}>Desktop: {isDesktop ? '✓' : '✗'}</Text>
      </Group>
    </Box>
  );
}
```

### With Initial Value for SSR

```tsx
import { useMediaQuery } from '@mantine/hooks';
import { Text, Box } from '@mantine/core';

function SSRFriendlyComponent() {
  // Set initial value to prevent hydration mismatch
  const isMobile = useMediaQuery('(max-width: 768px)', false, {
    getInitialValueInEffect: false
  });

  return (
    <Box>
      <Text>
        {isMobile ? 'Mobile view' : 'Desktop view'}
      </Text>
    </Box>
  );
}
```

### Custom Breakpoints

```tsx
import { useMediaQuery } from '@mantine/hooks';
import { Text, Box, Grid, Paper } from '@mantine/core';

function CustomBreakpoints() {
  const isSmall = useMediaQuery('(max-width: 480px)');
  const isMedium = useMediaQuery('(min-width: 481px) and (max-width: 768px)');
  const isLarge = useMediaQuery('(min-width: 769px) and (max-width: 1024px)');
  const isXLarge = useMediaQuery('(min-width: 1025px)');

  const getColumns = () => {
    if (isSmall) return 1;
    if (isMedium) return 2;
    if (isLarge) return 3;
    if (isXLarge) return 4;
    return 1;
  };

  return (
    <Box>
      <Text size="lg" mb="md">
        Responsive Grid ({getColumns()} columns)
      </Text>
      
      <Grid columns={getColumns()}>
        {Array.from({ length: 8 }).map((_, index) => (
          <Grid.Col key={index}>
            <Paper p="md" style={{ backgroundColor: '#f8f9fa' }}>
              Item {index + 1}
            </Paper>
          </Grid.Col>
        ))}
      </Grid>
    </Box>
  );
}
```

## Use Cases

### 1. **Responsive Navigation**

```tsx
import { useMediaQuery } from '@mantine/hooks';
import { AppShell, Burger, Group, Text } from '@mantine/core';
import { useState } from 'react';

function ResponsiveNavigation() {
  const [opened, setOpened] = useState(false);
  const isMobile = useMediaQuery('(max-width: 768px)');

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: 'sm',
        collapsed: { mobile: !opened },
      }}
    >
      <AppShell.Header>
        <Group h="100%" px="md">
          <Burger
            opened={opened}
            onClick={() => setOpened(!opened)}
            hiddenFrom="sm"
            size="sm"
          />
          <Text size="lg" weight="bold">
            {isMobile ? 'Mobile App' : 'Desktop Application'}
          </Text>
        </Group>
      </AppShell.Header>

      <AppShell.Navbar p="md">
        <Text>Navigation content</Text>
      </AppShell.Navbar>

      <AppShell.Main>
        <Text>
          Main content - {isMobile ? 'Mobile optimized' : 'Desktop optimized'}
        </Text>
      </AppShell.Main>
    </AppShell>
  );
}
```

### 2. **Conditional Component Rendering**

```tsx
import { useMediaQuery } from '@mantine/hooks';
import { Box, Text, Button, Group } from '@mantine/core';

function ConditionalRendering() {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const isTablet = useMediaQuery('(min-width: 769px) and (max-width: 1024px)');

  return (
    <Box>
      {isMobile && (
        <Text size="sm" color="blue" mb="md">
          Mobile-specific content
        </Text>
      )}

      {isTablet && (
        <Text size="md" color="green" mb="md">
          Tablet-specific content
        </Text>
      )}

      {!isMobile && !isTablet && (
        <Text size="lg" color="purple" mb="md">
          Desktop-specific content
        </Text>
      )}

      <Group>
        <Button size={isMobile ? 'sm' : 'md'}>
          {isMobile ? 'Small Button' : 'Regular Button'}
        </Button>
        
        {!isMobile && (
          <Button variant="outline">
            Desktop Only Button
          </Button>
        )}
      </Group>
    </Box>
  );
}
```

### 3. **Responsive Data Display**

```tsx
import { useMediaQuery } from '@mantine/hooks';
import { Table, Card, Text, Group, Badge } from '@mantine/core';

function ResponsiveDataDisplay() {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const isTablet = useMediaQuery('(min-width: 769px) and (max-width: 1024px)');

  const data = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'Moderator' },
  ];

  if (isMobile) {
    return (
      <div>
        {data.map((item) => (
          <Card key={item.id} mb="md" p="md">
            <Text weight="bold">{item.name}</Text>
            <Text size="sm" color="dimmed">{item.email}</Text>
            <Badge mt="xs" size="sm">{item.role}</Badge>
          </Card>
        ))}
      </div>
    );
  }

  if (isTablet) {
    return (
      <div>
        {data.map((item) => (
          <Card key={item.id} mb="md" p="md">
            <Group>
              <Text weight="bold">{item.name}</Text>
              <Badge size="sm">{item.role}</Badge>
            </Group>
            <Text size="sm" color="dimmed">{item.email}</Text>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <Table>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>Name</Table.Th>
          <Table.Th>Email</Table.Th>
          <Table.Th>Role</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>
        {data.map((item) => (
          <Table.Tr key={item.id}>
            <Table.Td>{item.name}</Table.Td>
            <Table.Td>{item.email}</Table.Td>
            <Table.Td>
              <Badge size="sm">{item.role}</Badge>
            </Table.Td>
          </Table.Tr>
        ))}
      </Table.Tbody>
    </Table>
  );
}
```

### 4. **Responsive Image Gallery**

```tsx
import { useMediaQuery } from '@mantine/hooks';
import { SimpleGrid, Image, Text, Box } from '@mantine/core';

function ResponsiveImageGallery() {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const isTablet = useMediaQuery('(min-width: 769px) and (max-width: 1024px)');
  const isDesktop = useMediaQuery('(min-width: 1025px)');

  const getColumns = () => {
    if (isMobile) return 1;
    if (isTablet) return 2;
    if (isDesktop) return 3;
    return 1;
  };

  const images = [
    { src: 'https://picsum.photos/400/300?random=1', alt: 'Image 1' },
    { src: 'https://picsum.photos/400/300?random=2', alt: 'Image 2' },
    { src: 'https://picsum.photos/400/300?random=3', alt: 'Image 3' },
    { src: 'https://picsum.photos/400/300?random=4', alt: 'Image 4' },
    { src: 'https://picsum.photos/400/300?random=5', alt: 'Image 5' },
    { src: 'https://picsum.photos/400/300?random=6', alt: 'Image 6' },
  ];

  return (
    <Box>
      <Text size="lg" mb="md">
        Responsive Gallery ({getColumns()} columns)
      </Text>
      
      <SimpleGrid cols={getColumns()} spacing="md">
        {images.map((image, index) => (
          <Image
            key={index}
            src={image.src}
            alt={image.alt}
            radius="md"
            style={{ cursor: 'pointer' }}
          />
        ))}
      </SimpleGrid>
    </Box>
  );
}
```

### 5. **Responsive Form Layout**

```tsx
import { useMediaQuery } from '@mantine/hooks';
import { TextInput, Textarea, Button, Stack, Group, Grid } from '@mantine/core';

function ResponsiveForm() {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const isTablet = useMediaQuery('(min-width: 769px) and (max-width: 1024px)');

  const getFormLayout = () => {
    if (isMobile) {
      return (
        <Stack>
          <TextInput label="First Name" placeholder="Enter first name" />
          <TextInput label="Last Name" placeholder="Enter last name" />
          <TextInput label="Email" placeholder="Enter email" />
          <Textarea label="Message" placeholder="Enter your message" />
          <Button fullWidth>Submit</Button>
        </Stack>
      );
    }

    if (isTablet) {
      return (
        <Stack>
          <Group grow>
            <TextInput label="First Name" placeholder="Enter first name" />
            <TextInput label="Last Name" placeholder="Enter last name" />
          </Group>
          <TextInput label="Email" placeholder="Enter email" />
          <Textarea label="Message" placeholder="Enter your message" />
          <Group>
            <Button>Submit</Button>
            <Button variant="outline">Cancel</Button>
          </Group>
        </Stack>
      );
    }

    return (
      <Grid>
        <Grid.Col span={6}>
          <TextInput label="First Name" placeholder="Enter first name" />
        </Grid.Col>
        <Grid.Col span={6}>
          <TextInput label="Last Name" placeholder="Enter last name" />
        </Grid.Col>
        <Grid.Col span={12}>
          <TextInput label="Email" placeholder="Enter email" />
        </Grid.Col>
        <Grid.Col span={12}>
          <Textarea label="Message" placeholder="Enter your message" />
        </Grid.Col>
        <Grid.Col span={12}>
          <Group>
            <Button>Submit</Button>
            <Button variant="outline">Cancel</Button>
          </Group>
        </Grid.Col>
      </Grid>
    );
  };

  return (
    <div>
      <Text size="lg" mb="md">
        Responsive Form ({isMobile ? 'Mobile' : isTablet ? 'Tablet' : 'Desktop'})
      </Text>
      {getFormLayout()}
    </div>
  );
}
```

### 6. **Responsive Sidebar**

```tsx
import { useMediaQuery } from '@mantine/hooks';
import { AppShell, Text, Button, Group, Burger } from '@mantine/core';
import { useState } from 'react';

function ResponsiveSidebar() {
  const [opened, setOpened] = useState(false);
  const isMobile = useMediaQuery('(max-width: 768px)');
  const isTablet = useMediaQuery('(min-width: 769px) and (max-width: 1024px)');

  const getSidebarWidth = () => {
    if (isMobile) return 250;
    if (isTablet) return 300;
    return 350;
  };

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: getSidebarWidth(),
        breakpoint: 'sm',
        collapsed: { mobile: !opened },
      }}
    >
      <AppShell.Header>
        <Group h="100%" px="md">
          <Burger
            opened={opened}
            onClick={() => setOpened(!opened)}
            hiddenFrom="sm"
            size="sm"
          />
          <Text size="lg" weight="bold">
            Responsive App
          </Text>
        </Group>
      </AppShell.Header>

      <AppShell.Navbar p="md">
        <Text size="lg" weight="bold" mb="md">
          Navigation
        </Text>
        
        <Stack gap="sm">
          <Button variant="light" fullWidth>
            Dashboard
          </Button>
          <Button variant="light" fullWidth>
            Analytics
          </Button>
          <Button variant="light" fullWidth>
            Settings
          </Button>
          <Button variant="light" fullWidth>
            Profile
          </Button>
        </Stack>

        <Text size="sm" color="dimmed" mt="auto">
          Sidebar width: {getSidebarWidth()}px
        </Text>
      </AppShell.Navbar>

      <AppShell.Main>
        <Text>
          Main content area - {isMobile ? 'Mobile' : isTablet ? 'Tablet' : 'Desktop'} layout
        </Text>
      </AppShell.Main>
    </AppShell>
  );
}
```

## Performance Considerations

### Memoized Media Queries

```tsx
import { useMediaQuery } from '@mantine/hooks';
import { useMemo } from 'react';
import { Text, Box } from '@mantine/core';

function OptimizedMediaQuery() {
  // Memoize media query strings to prevent unnecessary re-renders
  const mediaQueries = useMemo(() => ({
    mobile: '(max-width: 768px)',
    tablet: '(min-width: 769px) and (max-width: 1024px)',
    desktop: '(min-width: 1025px)',
  }), []);

  const isMobile = useMediaQuery(mediaQueries.mobile);
  const isTablet = useMediaQuery(mediaQueries.tablet);
  const isDesktop = useMediaQuery(mediaQueries.desktop);

  return (
    <Box>
      <Text>
        {isMobile ? 'Mobile' : isTablet ? 'Tablet' : 'Desktop'} view
      </Text>
    </Box>
  );
}
```

### Custom Hook for Common Breakpoints

```tsx
import { useMediaQuery } from '@mantine/hooks';
import { useMemo } from 'react';

function useBreakpoints() {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const isTablet = useMediaQuery('(min-width: 769px) and (max-width: 1024px)');
  const isDesktop = useMediaQuery('(min-width: 1025px)');
  const isLarge = useMediaQuery('(min-width: 1440px)');

  return useMemo(() => ({
    isMobile,
    isTablet,
    isDesktop,
    isLarge,
    isMobileOrTablet: isMobile || isTablet,
    isDesktopOrLarge: isDesktop || isLarge,
  }), [isMobile, isTablet, isDesktop, isLarge]);
}

function BreakpointComponent() {
  const breakpoints = useBreakpoints();

  return (
    <div>
      <Text>Mobile: {breakpoints.isMobile ? 'Yes' : 'No'}</Text>
      <Text>Tablet: {breakpoints.isTablet ? 'Yes' : 'No'}</Text>
      <Text>Desktop: {breakpoints.isDesktop ? 'Yes' : 'No'}</Text>
      <Text>Large: {breakpoints.isLarge ? 'Yes' : 'No'}</Text>
    </div>
  );
}
```

## Common Patterns

### Responsive Hook

```tsx
import { useMediaQuery } from '@mantine/hooks';
import { useMemo } from 'react';

function useResponsive() {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const isTablet = useMediaQuery('(min-width: 769px) and (max-width: 1024px)');
  const isDesktop = useMediaQuery('(min-width: 1025px)');

  return useMemo(() => ({
    isMobile,
    isTablet,
    isDesktop,
    columns: isMobile ? 1 : isTablet ? 2 : 3,
    spacing: isMobile ? 'sm' : isTablet ? 'md' : 'lg',
    size: isMobile ? 'sm' : isTablet ? 'md' : 'lg',
  }), [isMobile, isTablet, isDesktop]);
}

function ResponsiveComponent() {
  const { columns, spacing, size } = useResponsive();

  return (
    <div>
      <Text size={size}>
        Responsive component with {columns} columns
      </Text>
    </div>
  );
}
```

### Media Query with State

```tsx
import { useMediaQuery } from '@mantine/hooks';
import { Text, Button, Box } from '@mantine/core';
import { useState, useEffect } from 'react';

function MediaQueryWithState() {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const [lastBreakpoint, setLastBreakpoint] = useState<string>('');

  useEffect(() => {
    setLastBreakpoint(isMobile ? 'Mobile' : 'Desktop');
  }, [isMobile]);

  return (
    <Box>
      <Text>Current: {isMobile ? 'Mobile' : 'Desktop'}</Text>
      <Text>Last: {lastBreakpoint}</Text>
      <Button onClick={() => setLastBreakpoint('')}>
        Reset
      </Button>
    </Box>
  );
}
```

## Integration with Other Hooks

### Combined with useDisclosure

```tsx
import { useMediaQuery, useDisclosure } from '@mantine/hooks';
import { Modal, Button, Text } from '@mantine/core';

function MediaQueryWithModal() {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const [opened, { open, close }] = useDisclosure();

  return (
    <div>
      <Button onClick={open}>
        Open {isMobile ? 'Mobile' : 'Desktop'} Modal
      </Button>

      <Modal
        opened={opened}
        onClose={close}
        title={isMobile ? 'Mobile Modal' : 'Desktop Modal'}
        size={isMobile ? 'sm' : 'md'}
      >
        <Text>
          This modal is optimized for {isMobile ? 'mobile' : 'desktop'} devices.
        </Text>
      </Modal>
    </div>
  );
}
```

### Combined with useLocalStorage

```tsx
import { useMediaQuery, useLocalStorage } from '@mantine/hooks';
import { Text, Button, Box } from '@mantine/core';

function MediaQueryWithStorage() {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const [preferredView, setPreferredView] = useLocalStorage({
    key: 'preferred-view',
    defaultValue: 'auto'
  });

  const getViewMode = () => {
    if (preferredView === 'auto') {
      return isMobile ? 'mobile' : 'desktop';
    }
    return preferredView;
  };

  return (
    <Box>
      <Text>Current view: {getViewMode()}</Text>
      <Text>Device: {isMobile ? 'Mobile' : 'Desktop'}</Text>
      
      <Button onClick={() => setPreferredView('mobile')}>
        Force Mobile
      </Button>
      <Button onClick={() => setPreferredView('desktop')}>
        Force Desktop
      </Button>
      <Button onClick={() => setPreferredView('auto')}>
        Auto
      </Button>
    </Box>
  );
}
```

## Troubleshooting

### Common Issues

1. **Hydration Mismatch**
   - Use initial values for SSR
   - Set `getInitialValueInEffect: false`

2. **Media Query Not Updating**
   - Check if the query string is valid
   - Ensure the component is mounted

3. **Performance Issues**
   - Memoize media query strings
   - Use custom hooks for common breakpoints

### Debug Information

```tsx
import { useMediaQuery } from '@mantine/hooks';
import { Text, Box, Paper } from '@mantine/core';

function DebugMediaQuery() {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const isTablet = useMediaQuery('(min-width: 769px) and (max-width: 1024px)');
  const isDesktop = useMediaQuery('(min-width: 1025px)');

  return (
    <Paper p="md" style={{ backgroundColor: '#f8f9fa' }}>
      <Text size="lg" weight="bold" mb="md">Media Query Debug</Text>
      
      <Box>
        <Text>Mobile (max-width: 768px): {isMobile ? '✓' : '✗'}</Text>
        <Text>Tablet (769px - 1024px): {isTablet ? '✓' : '✗'}</Text>
        <Text>Desktop (min-width: 1025px): {isDesktop ? '✓' : '✗'}</Text>
      </Box>
      
      <Text size="sm" color="dimmed" mt="md">
        Window width: {typeof window !== 'undefined' ? window.innerWidth : 'N/A'}px
      </Text>
    </Paper>
  );
}
```

## Browser Support

- **Modern Browsers**: Full support
- **Legacy Browsers**: Full support
- **Mobile Browsers**: Full support
- **Server-Side**: Safe to use with initial values

## Related Hooks

- `use-color-scheme` - For dark/light mode detection
- `use-element-size` - For element size detection
- `use-intersection` - For viewport intersection detection
- `use-in-viewport` - For viewport visibility detection

## Best Practices

1. **Use Semantic Breakpoints**: Define meaningful breakpoints
2. **SSR Considerations**: Always provide initial values for SSR
3. **Performance**: Memoize media query strings
4. **Accessibility**: Ensure responsive design doesn't break accessibility
5. **Testing**: Test on actual devices, not just browser dev tools

---

*The `use-media-query` hook provides a clean, efficient way to handle responsive design in React applications. It's perfect for conditional rendering, responsive layouts, and adaptive UI behavior with full SSR support and excellent performance.*
