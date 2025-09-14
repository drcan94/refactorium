# use-viewport-size Hook

## Overview

The `use-viewport-size` hook returns the current viewport's width and height and automatically subscribes to resize and orientation change events. It provides a simple and efficient way to track viewport dimensions in React applications, making it perfect for responsive design, layout calculations, and viewport-dependent UI logic. The hook handles server-side rendering gracefully by returning `{ width: 0, height: 0 }` during SSR.

## Installation

```bash
npm install @mantine/hooks
```

## Import

```typescript
import { useViewportSize } from '@mantine/hooks';
```

## Basic Usage

```tsx
import { useViewportSize } from '@mantine/hooks';
import { Text, Code } from '@mantine/core';

function Demo() {
  const { height, width } = useViewportSize();
  
  return (
    <Text>
      Width: <Code>{width}</Code>, Height: <Code>{height}</Code>
    </Text>
  );
}
```

## API Reference

### Return Value

| Property | Type | Description |
|----------|------|-------------|
| `width` | `number` | Current viewport width in pixels |
| `height` | `number` | Current viewport height in pixels |

### Type Definition

```typescript
function useViewportSize(): {
  height: number;
  width: number;
};
```

## Key Features

### 1. **Automatic Event Subscription**
- Subscribes to `resize` events
- Subscribes to `orientationchange` events
- Automatically cleans up event listeners on unmount

### 2. **Server-Side Rendering Support**
- Returns `{ width: 0, height: 0 }` during SSR
- Safe to use in Next.js and other SSR frameworks
- No hydration mismatches

### 3. **Real-time Updates**
- Updates immediately on viewport changes
- Handles window resizing, orientation changes, and zoom
- Optimized for performance

### 4. **Simple API**
- No configuration required
- Returns only essential viewport dimensions
- Easy to integrate with existing code

## Advanced Usage

### Responsive Layout with Viewport Size

```tsx
import { useViewportSize } from '@mantine/hooks';
import { Text, Box, Grid, Paper, Badge } from '@mantine/core';

function ResponsiveLayout() {
  const { width, height } = useViewportSize();
  
  const isMobile = width < 768;
  const isTablet = width >= 768 && width < 1024;
  const isDesktop = width >= 1024;
  
  const getLayoutType = () => {
    if (isMobile) return 'Mobile';
    if (isTablet) return 'Tablet';
    if (isDesktop) return 'Desktop';
    return 'Unknown';
  };

  return (
    <Box>
      <Text size="lg" weight="bold" mb="md">
        Responsive Layout Demo
      </Text>
      
      <Grid>
        <Grid.Col span={isMobile ? 12 : isTablet ? 6 : 4}>
          <Paper p="md" style={{ backgroundColor: 'var(--mantine-color-blue-light)' }}>
            <Text weight="bold">Viewport Info</Text>
            <Text size="sm">Width: {width}px</Text>
            <Text size="sm">Height: {height}px</Text>
            <Badge color="blue" mt="xs">
              {getLayoutType()}
            </Badge>
          </Paper>
        </Grid.Col>
        
        <Grid.Col span={isMobile ? 12 : isTablet ? 6 : 4}>
          <Paper p="md" style={{ backgroundColor: 'var(--mantine-color-green-light)' }}>
            <Text weight="bold">Layout Type</Text>
            <Text size="sm">
              {isMobile && 'Single column layout'}
              {isTablet && 'Two column layout'}
              {isDesktop && 'Three column layout'}
            </Text>
          </Paper>
        </Grid.Col>
        
        <Grid.Col span={isMobile ? 12 : isTablet ? 12 : 4}>
          <Paper p="md" style={{ backgroundColor: 'var(--mantine-color-orange-light)' }}>
            <Text weight="bold">Aspect Ratio</Text>
            <Text size="sm">
              {(width / height).toFixed(2)}:1
            </Text>
          </Paper>
        </Grid.Col>
      </Grid>
    </Box>
  );
}
```

### Dynamic Component Sizing

```tsx
import { useViewportSize } from '@mantine/hooks';
import { Text, Box, Paper, Button, Group } from '@mantine/core';
import { useState } from 'react';

function DynamicSizing() {
  const { width, height } = useViewportSize();
  const [showDetails, setShowDetails] = useState(false);
  
  // Calculate dynamic dimensions based on viewport
  const cardWidth = Math.min(width * 0.8, 400);
  const cardHeight = Math.min(height * 0.6, 300);
  const fontSize = Math.max(14, Math.min(18, width / 50));
  
  return (
    <Box>
      <Text size="lg" weight="bold" mb="md">
        Dynamic Component Sizing
      </Text>
      
      <Group justify="center">
        <Paper
          p="md"
          style={{
            width: cardWidth,
            height: cardHeight,
            backgroundColor: 'var(--mantine-color-blue-light)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
          }}
        >
          <Text 
            size="xl" 
            weight="bold"
            style={{ fontSize: `${fontSize}px` }}
          >
            Responsive Card
          </Text>
          
          <Text size="sm" color="dimmed" mt="md">
            Width: {cardWidth}px
          </Text>
          <Text size="sm" color="dimmed">
            Height: {cardHeight}px
          </Text>
          <Text size="sm" color="dimmed">
            Font Size: {fontSize}px
          </Text>
          
          <Button 
            mt="md" 
            onClick={() => setShowDetails(!showDetails)}
            size="sm"
          >
            {showDetails ? 'Hide' : 'Show'} Details
          </Button>
          
          {showDetails && (
            <Box mt="md">
              <Text size="xs" color="dimmed">
                Viewport: {width} × {height}
              </Text>
              <Text size="xs" color="dimmed">
                Aspect Ratio: {(width / height).toFixed(2)}
              </Text>
            </Box>
          )}
        </Paper>
      </Group>
    </Box>
  );
}
```

### Viewport-based Conditional Rendering

```tsx
import { useViewportSize } from '@mantine/hooks';
import { Text, Box, Paper, Button, Group, Stack } from '@mantine/core';
import { useState } from 'react';

function ConditionalRendering() {
  const { width, height } = useViewportSize();
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  
  const isMobile = width < 768;
  const isLandscape = width > height;
  const isSmallHeight = height < 600;
  
  return (
    <Box>
      <Text size="lg" weight="bold" mb="md">
        Conditional Rendering Based on Viewport
      </Text>
      
      <Paper p="md" mb="md" style={{ backgroundColor: 'var(--mantine-color-gray-light)' }}>
        <Text size="sm" weight="bold" mb="xs">Viewport Conditions:</Text>
        <Text size="xs">• Mobile: {isMobile ? 'Yes' : 'No'} (width < 768px)</Text>
        <Text size="xs">• Landscape: {isLandscape ? 'Yes' : 'No'} (width > height)</Text>
        <Text size="xs">• Small Height: {isSmallHeight ? 'Yes' : 'No'} (height < 600px)</Text>
      </Paper>
      
      {/* Mobile Navigation */}
      {isMobile ? (
        <Box>
          <Button 
            onClick={() => setShowMobileMenu(!showMobileMenu)}
            fullWidth
            mb="md"
          >
            {showMobileMenu ? 'Hide' : 'Show'} Mobile Menu
          </Button>
          
          {showMobileMenu && (
            <Paper p="md" style={{ backgroundColor: 'var(--mantine-color-blue-light)' }}>
              <Text weight="bold" mb="md">Mobile Menu</Text>
              <Stack gap="xs">
                <Button variant="subtle" fullWidth>Home</Button>
                <Button variant="subtle" fullWidth>About</Button>
                <Button variant="subtle" fullWidth>Contact</Button>
              </Stack>
            </Paper>
          )}
        </Box>
      ) : (
        <Paper p="md" style={{ backgroundColor: 'var(--mantine-color-green-light)' }}>
          <Text weight="bold" mb="md">Desktop Navigation</Text>
          <Group>
            <Button variant="subtle">Home</Button>
            <Button variant="subtle">About</Button>
            <Button variant="subtle">Contact</Button>
          </Group>
        </Paper>
      )}
      
      {/* Landscape-specific content */}
      {isLandscape && (
        <Paper p="md" mt="md" style={{ backgroundColor: 'var(--mantine-color-orange-light)' }}>
          <Text weight="bold">Landscape Mode Content</Text>
          <Text size="sm" color="dimmed">
            This content is only visible in landscape orientation
          </Text>
        </Paper>
      )}
      
      {/* Small height warning */}
      {isSmallHeight && (
        <Paper p="md" mt="md" style={{ backgroundColor: 'var(--mantine-color-red-light)' }}>
          <Text weight="bold" color="red">Warning</Text>
          <Text size="sm" color="red">
            Viewport height is very small ({height}px). Consider using a larger screen.
          </Text>
        </Paper>
      )}
    </Box>
  );
}
```

## Use Cases

### 1. **Responsive Dashboard Layout**

```tsx
import { useViewportSize } from '@mantine/hooks';
import { Text, Box, Grid, Paper, Stack, Group, Badge } from '@mantine/core';

function ResponsiveDashboard() {
  const { width, height } = useViewportSize();
  
  const getGridCols = () => {
    if (width < 768) return 1; // Mobile: 1 column
    if (width < 1024) return 2; // Tablet: 2 columns
    if (width < 1440) return 3; // Desktop: 3 columns
    return 4; // Large desktop: 4 columns
  };
  
  const getCardHeight = () => {
    if (height < 600) return 120; // Small height
    if (height < 800) return 150; // Medium height
    return 200; // Large height
  };
  
  const dashboardItems = [
    { title: 'Total Users', value: '12,345', color: 'blue' },
    { title: 'Revenue', value: '$45,678', color: 'green' },
    { title: 'Orders', value: '1,234', color: 'orange' },
    { title: 'Conversion', value: '3.2%', color: 'purple' },
    { title: 'Bounce Rate', value: '42%', color: 'red' },
    { title: 'Page Views', value: '89,012', color: 'teal' },
  ];
  
  return (
    <Box>
      <Group justify="space-between" mb="md">
        <Text size="lg" weight="bold">Dashboard</Text>
        <Badge color="blue" variant="light">
          {width} × {height}
        </Badge>
      </Group>
      
      <Grid>
        {dashboardItems.map((item, index) => (
          <Grid.Col key={index} span={12 / getGridCols()}>
            <Paper
              p="md"
              style={{
                height: getCardHeight(),
                backgroundColor: `var(--mantine-color-${item.color}-light)`,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Text size="xl" weight="bold" color={item.color}>
                {item.value}
              </Text>
              <Text size="sm" color="dimmed" mt="xs">
                {item.title}
              </Text>
            </Paper>
          </Grid.Col>
        ))}
      </Grid>
    </Box>
  );
}
```

### 2. **Image Gallery with Responsive Grid**

```tsx
import { useViewportSize } from '@mantine/hooks';
import { Text, Box, Grid, Image, Paper, Group, Badge } from '@mantine/core';
import { useState } from 'react';

function ResponsiveImageGallery() {
  const { width, height } = useViewportSize();
  const [selectedImage, setSelectedImage] = useState(0);
  
  const getImageSize = () => {
    if (width < 768) return 150; // Mobile
    if (width < 1024) return 200; // Tablet
    return 250; // Desktop
  };
  
  const getGridCols = () => {
    if (width < 768) return 2; // Mobile: 2 columns
    if (width < 1024) return 3; // Tablet: 3 columns
    if (width < 1440) return 4; // Desktop: 4 columns
    return 5; // Large desktop: 5 columns
  };
  
  const images = [
    'https://picsum.photos/400/300?random=1',
    'https://picsum.photos/400/300?random=2',
    'https://picsum.photos/400/300?random=3',
    'https://picsum.photos/400/300?random=4',
    'https://picsum.photos/400/300?random=5',
    'https://picsum.photos/400/300?random=6',
    'https://picsum.photos/400/300?random=7',
    'https://picsum.photos/400/300?random=8',
  ];
  
  return (
    <Box>
      <Group justify="space-between" mb="md">
        <Text size="lg" weight="bold">Responsive Image Gallery</Text>
        <Group>
          <Badge color="blue" variant="light">
            {getGridCols()} columns
          </Badge>
          <Badge color="green" variant="light">
            {getImageSize()}px images
          </Badge>
        </Group>
      </Group>
      
      <Grid>
        {images.map((src, index) => (
          <Grid.Col key={index} span={12 / getGridCols()}>
            <Paper
              style={{
                cursor: 'pointer',
                border: selectedImage === index ? '3px solid #007bff' : '1px solid #dee2e6',
                borderRadius: '8px',
                overflow: 'hidden',
              }}
              onClick={() => setSelectedImage(index)}
            >
              <Image
                src={src}
                alt={`Gallery image ${index + 1}`}
                height={getImageSize()}
                fit="cover"
              />
            </Paper>
          </Grid.Col>
        ))}
      </Grid>
      
      <Paper p="md" mt="md" style={{ backgroundColor: 'var(--mantine-color-gray-light)' }}>
        <Text size="sm" weight="bold" mb="xs">Gallery Info:</Text>
        <Text size="xs">Selected: Image {selectedImage + 1}</Text>
        <Text size="xs">Viewport: {width} × {height}</Text>
        <Text size="xs">Grid: {getGridCols()} columns</Text>
        <Text size="xs">Image Size: {getImageSize()}px</Text>
      </Paper>
    </Box>
  );
}
```

### 3. **Responsive Data Table**

```tsx
import { useViewportSize } from '@mantine/hooks';
import { Text, Box, Table, Paper, Badge, Group, Button, Stack } from '@mantine/core';
import { useState } from 'react';

function ResponsiveDataTable() {
  const { width, height } = useViewportSize();
  const [showAllColumns, setShowAllColumns] = useState(false);
  
  const isMobile = width < 768;
  const isTablet = width >= 768 && width < 1024;
  
  const data = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active', lastLogin: '2024-01-15' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User', status: 'Active', lastLogin: '2024-01-14' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'Moderator', status: 'Inactive', lastLogin: '2024-01-10' },
    { id: 4, name: 'Alice Brown', email: 'alice@example.com', role: 'User', status: 'Active', lastLogin: '2024-01-13' },
  ];
  
  const getVisibleColumns = () => {
    if (isMobile) return ['name', 'status']; // Mobile: only essential columns
    if (isTablet) return ['name', 'email', 'status']; // Tablet: add email
    if (showAllColumns) return ['name', 'email', 'role', 'status', 'lastLogin']; // Desktop: all columns
    return ['name', 'email', 'role', 'status']; // Desktop: most columns
  };
  
  const visibleColumns = getVisibleColumns();
  
  return (
    <Box>
      <Group justify="space-between" mb="md">
        <Text size="lg" weight="bold">Responsive Data Table</Text>
        <Group>
          <Badge color="blue" variant="light">
            {isMobile ? 'Mobile' : isTablet ? 'Tablet' : 'Desktop'}
          </Badge>
          <Button
            size="xs"
            variant="outline"
            onClick={() => setShowAllColumns(!showAllColumns)}
            disabled={isMobile || isTablet}
          >
            {showAllColumns ? 'Hide' : 'Show'} All Columns
          </Button>
        </Group>
      </Group>
      
      <Paper>
        <Table>
          <Table.Thead>
            <Table.Tr>
              {visibleColumns.map((column) => (
                <Table.Th key={column}>
                  {column.charAt(0).toUpperCase() + column.slice(1).replace(/([A-Z])/g, ' $1')}
                </Table.Th>
              ))}
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {data.map((row) => (
              <Table.Tr key={row.id}>
                {visibleColumns.map((column) => (
                  <Table.Td key={column}>
                    {column === 'status' ? (
                      <Badge color={row[column] === 'Active' ? 'green' : 'red'} size="sm">
                        {row[column]}
                      </Badge>
                    ) : (
                      row[column]
                    )}
                  </Table.Td>
                ))}
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>
      </Paper>
      
      <Paper p="md" mt="md" style={{ backgroundColor: 'var(--mantine-color-gray-light)' }}>
        <Text size="sm" weight="bold" mb="xs">Table Configuration:</Text>
        <Text size="xs">Viewport: {width} × {height}</Text>
        <Text size="xs">Device: {isMobile ? 'Mobile' : isTablet ? 'Tablet' : 'Desktop'}</Text>
        <Text size="xs">Visible Columns: {visibleColumns.length}</Text>
        <Text size="xs">Columns: {visibleColumns.join(', ')}</Text>
      </Paper>
    </Box>
  );
}
```

### 4. **Responsive Modal and Drawer**

```tsx
import { useViewportSize } from '@mantine/hooks';
import { Text, Box, Button, Modal, Drawer, Paper, Stack, Group } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

function ResponsiveModalDrawer() {
  const { width, height } = useViewportSize();
  const [opened, { open, close }] = useDisclosure(false);
  
  const isMobile = width < 768;
  const isSmallHeight = height < 600;
  
  const getModalSize = () => {
    if (isMobile) return '95%';
    if (width < 1024) return '80%';
    return '60%';
  };
  
  const getDrawerSize = () => {
    if (isMobile) return '100%';
    if (width < 1024) return '70%';
    return '50%';
  };
  
  return (
    <Box>
      <Text size="lg" weight="bold" mb="md">
        Responsive Modal and Drawer
      </Text>
      
      <Group>
        <Button onClick={open}>
          Open {isMobile ? 'Drawer' : 'Modal'}
        </Button>
      </Group>
      
      {isMobile ? (
        <Drawer
          opened={opened}
          onClose={close}
          title="Mobile Drawer"
          size={getDrawerSize()}
          position="bottom"
        >
          <Stack>
            <Text>This is a drawer on mobile devices</Text>
            <Text size="sm" color="dimmed">
              Viewport: {width} × {height}
            </Text>
            <Text size="sm" color="dimmed">
              Drawer Size: {getDrawerSize()}
            </Text>
            <Button onClick={close}>Close</Button>
          </Stack>
        </Drawer>
      ) : (
        <Modal
          opened={opened}
          onClose={close}
          title="Desktop Modal"
          size={getModalSize()}
          centered={!isSmallHeight}
        >
          <Stack>
            <Text>This is a modal on desktop devices</Text>
            <Text size="sm" color="dimmed">
              Viewport: {width} × {height}
            </Text>
            <Text size="sm" color="dimmed">
              Modal Size: {getModalSize()}
            </Text>
            <Text size="sm" color="dimmed">
              Centered: {!isSmallHeight ? 'Yes' : 'No'}
            </Text>
            <Button onClick={close}>Close</Button>
          </Stack>
        </Modal>
      )}
    </Box>
  );
}
```

### 5. **Responsive Chart Container**

```tsx
import { useViewportSize } from '@mantine/hooks';
import { Text, Box, Paper, Group, Badge, Stack } from '@mantine/core';
import { useState, useEffect } from 'react';

function ResponsiveChartContainer() {
  const { width, height } = useViewportSize();
  const [chartData, setChartData] = useState<number[]>([]);
  
  const getChartDimensions = () => {
    const maxWidth = Math.min(width * 0.9, 800);
    const maxHeight = Math.min(height * 0.6, 400);
    
    return {
      width: maxWidth,
      height: maxHeight,
      responsive: width < 768
    };
  };
  
  const generateChartData = () => {
    const dataPoints = width < 768 ? 10 : width < 1024 ? 15 : 20;
    return Array.from({ length: dataPoints }, () => Math.floor(Math.random() * 100));
  };
  
  useEffect(() => {
    setChartData(generateChartData());
  }, [width]);
  
  const dimensions = getChartDimensions();
  
  return (
    <Box>
      <Group justify="space-between" mb="md">
        <Text size="lg" weight="bold">Responsive Chart</Text>
        <Group>
          <Badge color="blue" variant="light">
            {dimensions.width} × {dimensions.height}
          </Badge>
          <Badge color="green" variant="light">
            {chartData.length} data points
          </Badge>
        </Group>
      </Group>
      
      <Paper p="md" style={{ backgroundColor: 'var(--mantine-color-gray-light)' }}>
        <Text size="sm" weight="bold" mb="md">Chart Container</Text>
        
        <Box
          style={{
            width: dimensions.width,
            height: dimensions.height,
            backgroundColor: 'white',
            border: '1px solid #dee2e6',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Simple bar chart visualization */}
          <Box style={{ display: 'flex', alignItems: 'end', gap: '2px', height: '80%' }}>
            {chartData.map((value, index) => (
              <Box
                key={index}
                style={{
                  width: `${100 / chartData.length}%`,
                  height: `${value}%`,
                  backgroundColor: `hsl(${(index * 360) / chartData.length}, 70%, 50%)`,
                  borderRadius: '2px 2px 0 0',
                  minHeight: '4px',
                }}
                title={`Value: ${value}`}
              />
            ))}
          </Box>
        </Box>
        
        <Stack gap="xs" mt="md">
          <Text size="sm" weight="bold">Chart Configuration:</Text>
          <Text size="xs">Viewport: {width} × {height}</Text>
          <Text size="xs">Chart Size: {dimensions.width} × {dimensions.height}</Text>
          <Text size="xs">Data Points: {chartData.length}</Text>
          <Text size="xs">Responsive: {dimensions.responsive ? 'Yes' : 'No'}</Text>
        </Stack>
      </Paper>
    </Box>
  );
}
```

### 6. **Responsive Navigation Menu**

```tsx
import { useViewportSize } from '@mantine/hooks';
import { Text, Box, Group, Button, Stack, Paper, Burger } from '@mantine/core';
import { useState } from 'react';

function ResponsiveNavigation() {
  const { width, height } = useViewportSize();
  const [mobileMenuOpened, setMobileMenuOpened] = useState(false);
  
  const isMobile = width < 768;
  const isTablet = width >= 768 && width < 1024;
  
  const menuItems = [
    { label: 'Home', href: '#' },
    { label: 'About', href: '#' },
    { label: 'Services', href: '#' },
    { label: 'Portfolio', href: '#' },
    { label: 'Contact', href: '#' },
  ];
  
  return (
    <Box>
      <Text size="lg" weight="bold" mb="md">
        Responsive Navigation Menu
      </Text>
      
      <Paper p="md" style={{ backgroundColor: 'var(--mantine-color-blue-light)' }}>
        <Group justify="space-between">
          <Text weight="bold">Logo</Text>
          
          {isMobile ? (
            <Burger
              opened={mobileMenuOpened}
              onClick={() => setMobileMenuOpened(!mobileMenuOpened)}
              size="sm"
            />
          ) : (
            <Group gap="xs">
              {menuItems.map((item) => (
                <Button
                  key={item.label}
                  variant="subtle"
                  size={isTablet ? 'sm' : 'md'}
                >
                  {item.label}
                </Button>
              ))}
            </Group>
          )}
        </Group>
        
        {isMobile && mobileMenuOpened && (
          <Stack gap="xs" mt="md">
            {menuItems.map((item) => (
              <Button
                key={item.label}
                variant="subtle"
                fullWidth
                size="sm"
                onClick={() => setMobileMenuOpened(false)}
              >
                {item.label}
              </Button>
            ))}
          </Stack>
        )}
      </Paper>
      
      <Paper p="md" mt="md" style={{ backgroundColor: 'var(--mantine-color-gray-light)' }}>
        <Text size="sm" weight="bold" mb="xs">Navigation Info:</Text>
        <Text size="xs">Viewport: {width} × {height}</Text>
        <Text size="xs">Device: {isMobile ? 'Mobile' : isTablet ? 'Tablet' : 'Desktop'}</Text>
        <Text size="xs">Menu Type: {isMobile ? 'Burger Menu' : 'Horizontal Menu'}</Text>
        <Text size="xs">Menu Opened: {mobileMenuOpened ? 'Yes' : 'No'}</Text>
      </Paper>
    </Box>
  );
}
```

## Performance Considerations

### Memoized Viewport Calculations

```tsx
import { useViewportSize } from '@mantine/hooks';
import { memo, useMemo } from 'react';
import { Text, Box, Paper } from '@mantine/core';

const ResponsiveComponent = memo(function ResponsiveComponent({ 
  width, 
  height 
}: { 
  width: number; 
  height: number; 
}) {
  const breakpoints = useMemo(() => ({
    isMobile: width < 768,
    isTablet: width >= 768 && width < 1024,
    isDesktop: width >= 1024,
    isLandscape: width > height,
  }), [width, height]);
  
  return (
    <Paper p="md">
      <Text weight="bold" mb="md">Responsive Component</Text>
      <Text size="sm">Mobile: {breakpoints.isMobile ? 'Yes' : 'No'}</Text>
      <Text size="sm">Tablet: {breakpoints.isTablet ? 'Yes' : 'No'}</Text>
      <Text size="sm">Desktop: {breakpoints.isDesktop ? 'Yes' : 'No'}</Text>
      <Text size="sm">Landscape: {breakpoints.isLandscape ? 'Yes' : 'No'}</Text>
    </Paper>
  );
});

function OptimizedViewportSize() {
  const { width, height } = useViewportSize();
  
  return (
    <Box>
      <Text size="lg" weight="bold" mb="md">
        Optimized Viewport Size
      </Text>
      <ResponsiveComponent width={width} height={height} />
    </Box>
  );
}
```

### Debounced Viewport Updates

```tsx
import { useViewportSize } from '@mantine/hooks';
import { Text, Box, Paper } from '@mantine/core';
import { useState, useEffect } from 'react';

function DebouncedViewportSize() {
  const { width, height } = useViewportSize();
  const [debouncedSize, setDebouncedSize] = useState({ width, height });
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSize({ width, height });
    }, 100); // 100ms debounce
    
    return () => clearTimeout(timer);
  }, [width, height]);
  
  return (
    <Box>
      <Text size="lg" weight="bold" mb="md">
        Debounced Viewport Size
      </Text>
      
      <Paper p="md" mb="md" style={{ backgroundColor: 'var(--mantine-color-blue-light)' }}>
        <Text weight="bold" mb="xs">Immediate Updates:</Text>
        <Text size="sm">Width: {width}px</Text>
        <Text size="sm">Height: {height}px</Text>
      </Paper>
      
      <Paper p="md" style={{ backgroundColor: 'var(--mantine-color-green-light)' }}>
        <Text weight="bold" mb="xs">Debounced Updates:</Text>
        <Text size="sm">Width: {debouncedSize.width}px</Text>
        <Text size="sm">Height: {debouncedSize.height}px</Text>
      </Paper>
    </Box>
  );
}
```

## Common Patterns

### Viewport Size with State Management

```tsx
import { useViewportSize } from '@mantine/hooks';
import { Text, Box, Paper, Button, Group } from '@mantine/core';
import { useState, useEffect } from 'react';

function ViewportSizeWithState() {
  const { width, height } = useViewportSize();
  const [viewportHistory, setViewportHistory] = useState<Array<{width: number, height: number, timestamp: number}>>([]);
  
  useEffect(() => {
    setViewportHistory(prev => [
      ...prev.slice(-9), // Keep only last 10 entries
      { width, height, timestamp: Date.now() }
    ]);
  }, [width, height]);
  
  const clearHistory = () => {
    setViewportHistory([]);
  };
  
  return (
    <Box>
      <Text size="lg" weight="bold" mb="md">
        Viewport Size with State Management
      </Text>
      
      <Group mb="md">
        <Button onClick={clearHistory} size="sm">
          Clear History
        </Button>
      </Group>
      
      <Paper p="md" style={{ backgroundColor: 'var(--mantine-color-blue-light)' }}>
        <Text weight="bold" mb="xs">Current Viewport:</Text>
        <Text size="sm">Width: {width}px</Text>
        <Text size="sm">Height: {height}px</Text>
        <Text size="sm">Aspect Ratio: {(width / height).toFixed(2)}</Text>
      </Paper>
      
      <Paper p="md" mt="md" style={{ backgroundColor: 'var(--mantine-color-gray-light)' }}>
        <Text weight="bold" mb="xs">Viewport History:</Text>
        {viewportHistory.length > 0 ? (
          viewportHistory.slice(-5).map((entry, index) => (
            <Text key={index} size="xs">
              {entry.width} × {entry.height} ({new Date(entry.timestamp).toLocaleTimeString()})
            </Text>
          ))
        ) : (
          <Text size="xs" color="dimmed">No history yet</Text>
        )}
      </Paper>
    </Box>
  );
}
```

### Viewport Size with Analytics

```tsx
import { useViewportSize } from '@mantine/hooks';
import { Text, Box, Paper, Group, Badge } from '@mantine/core';
import { useEffect, useRef } from 'react';

function ViewportSizeWithAnalytics() {
  const { width, height } = useViewportSize();
  const analyticsRef = useRef({
    totalResizes: 0,
    minWidth: width,
    maxWidth: width,
    minHeight: height,
    maxHeight: height,
    startTime: Date.now(),
  });
  
  useEffect(() => {
    const analytics = analyticsRef.current;
    analytics.totalResizes++;
    analytics.minWidth = Math.min(analytics.minWidth, width);
    analytics.maxWidth = Math.max(analytics.maxWidth, width);
    analytics.minHeight = Math.min(analytics.minHeight, height);
    analytics.maxHeight = Math.max(analytics.maxHeight, height);
  }, [width, height]);
  
  const getSessionDuration = () => {
    return Math.round((Date.now() - analyticsRef.current.startTime) / 1000);
  };
  
  return (
    <Box>
      <Text size="lg" weight="bold" mb="md">
        Viewport Size Analytics
      </Text>
      
      <Paper p="md" style={{ backgroundColor: 'var(--mantine-color-blue-light)' }}>
        <Text weight="bold" mb="xs">Current Viewport:</Text>
        <Text size="sm">Width: {width}px</Text>
        <Text size="sm">Height: {height}px</Text>
      </Paper>
      
      <Paper p="md" mt="md" style={{ backgroundColor: 'var(--mantine-color-green-light)' }}>
        <Text weight="bold" mb="xs">Session Analytics:</Text>
        <Group>
          <Badge color="blue">Resizes: {analyticsRef.current.totalResizes}</Badge>
          <Badge color="green">Duration: {getSessionDuration()}s</Badge>
        </Group>
        <Text size="sm" mt="xs">Min Width: {analyticsRef.current.minWidth}px</Text>
        <Text size="sm">Max Width: {analyticsRef.current.maxWidth}px</Text>
        <Text size="sm">Min Height: {analyticsRef.current.minHeight}px</Text>
        <Text size="sm">Max Height: {analyticsRef.current.maxHeight}px</Text>
      </Paper>
    </Box>
  );
}
```

## Integration with Other Hooks

### Combined with useMediaQuery

```tsx
import { useViewportSize, useMediaQuery } from '@mantine/hooks';
import { Text, Box, Paper, Group, Badge } from '@mantine/core';

function ViewportSizeWithMediaQuery() {
  const { width, height } = useViewportSize();
  const isMobile = useMediaQuery('(max-width: 767px)');
  const isTablet = useMediaQuery('(min-width: 768px) and (max-width: 1023px)');
  const isDesktop = useMediaQuery('(min-width: 1024px)';
  
  return (
    <Box>
      <Text size="lg" weight="bold" mb="md">
        Viewport Size with Media Queries
      </Text>
      
      <Paper p="md" style={{ backgroundColor: 'var(--mantine-color-blue-light)' }}>
        <Text weight="bold" mb="xs">Viewport Size:</Text>
        <Text size="sm">Width: {width}px</Text>
        <Text size="sm">Height: {height}px</Text>
      </Paper>
      
      <Paper p="md" mt="md" style={{ backgroundColor: 'var(--mantine-color-green-light)' }}>
        <Text weight="bold" mb="xs">Media Query Results:</Text>
        <Group>
          <Badge color={isMobile ? 'blue' : 'gray'}>Mobile</Badge>
          <Badge color={isTablet ? 'green' : 'gray'}>Tablet</Badge>
          <Badge color={isDesktop ? 'orange' : 'gray'}>Desktop</Badge>
        </Group>
      </Paper>
    </Box>
  );
}
```

### Combined with useLocalStorage

```tsx
import { useViewportSize, useLocalStorage } from '@mantine/hooks';
import { Text, Box, Paper, Button, Group } from '@mantine/core';
import { useEffect } from 'react';

function ViewportSizeWithStorage() {
  const { width, height } = useViewportSize();
  const [viewportHistory, setViewportHistory] = useLocalStorage({
    key: 'viewport-history',
    defaultValue: [] as Array<{width: number, height: number, timestamp: number}>,
  });
  
  useEffect(() => {
    const newEntry = { width, height, timestamp: Date.now() };
    setViewportHistory(prev => [...prev.slice(-9), newEntry]);
  }, [width, height, setViewportHistory]);
  
  const clearHistory = () => {
    setViewportHistory([]);
  };
  
  return (
    <Box>
      <Text size="lg" weight="bold" mb="md">
        Viewport Size with Local Storage
      </Text>
      
      <Group mb="md">
        <Button onClick={clearHistory} size="sm">
          Clear History
        </Button>
      </Group>
      
      <Paper p="md" style={{ backgroundColor: 'var(--mantine-color-blue-light)' }}>
        <Text weight="bold" mb="xs">Current Viewport:</Text>
        <Text size="sm">Width: {width}px</Text>
        <Text size="sm">Height: {height}px</Text>
      </Paper>
      
      <Paper p="md" mt="md" style={{ backgroundColor: 'var(--mantine-color-gray-light)' }}>
        <Text weight="bold" mb="xs">Stored History:</Text>
        {viewportHistory.length > 0 ? (
          viewportHistory.slice(-5).map((entry, index) => (
            <Text key={index} size="xs">
              {entry.width} × {entry.height} ({new Date(entry.timestamp).toLocaleTimeString()})
            </Text>
          ))
        ) : (
          <Text size="xs" color="dimmed">No history stored</Text>
        )}
      </Paper>
    </Box>
  );
}
```

## Troubleshooting

### Common Issues

1. **SSR Hydration Mismatch**
   - The hook returns `{ width: 0, height: 0 }` during SSR
   - This is expected behavior and prevents hydration mismatches
   - Use `useEffect` for client-side only logic

2. **Performance Issues**
   - The hook updates on every resize event
   - Use debouncing for expensive calculations
   - Memoize derived values

3. **Mobile Orientation Changes**
   - The hook handles `orientationchange` events
   - Test on actual mobile devices for best results
   - Consider using `useOrientation` for more detailed orientation info

### Debug Information

```tsx
import { useViewportSize } from '@mantine/hooks';
import { Text, Box, Paper, Button, Group, Code } from '@mantine/core';
import { useState, useEffect } from 'react';

function DebugViewportSize() {
  const { width, height } = useViewportSize();
  const [debugInfo, setDebugInfo] = useState<any>({});
  
  useEffect(() => {
    setDebugInfo({
      width,
      height,
      aspectRatio: (width / height).toFixed(2),
      isLandscape: width > height,
      isPortrait: height > width,
      isSquare: Math.abs(width - height) < 10,
      timestamp: new Date().toISOString(),
    });
  }, [width, height]);
  
  return (
    <Box>
      <Text size="lg" weight="bold" mb="md">
        Debug Viewport Size
      </Text>
      
      <Paper p="md" style={{ backgroundColor: 'var(--mantine-color-blue-light)' }}>
        <Text weight="bold" mb="xs">Current Viewport:</Text>
        <Text size="sm">Width: {width}px</Text>
        <Text size="sm">Height: {height}px</Text>
      </Paper>
      
      <Paper p="md" mt="md" style={{ backgroundColor: 'var(--mantine-color-gray-light)' }}>
        <Text weight="bold" mb="xs">Debug Information:</Text>
        <Code block>
          {JSON.stringify(debugInfo, null, 2)}
        </Code>
      </Paper>
    </Box>
  );
}
```

## Browser Support

- **Modern Browsers**: Full support
- **Legacy Browsers**: Full support with polyfills
- **Mobile Browsers**: Full support including orientation changes
- **Server-Side**: Safe to use (returns `{ width: 0, height: 0 }` during SSR)

## Related Hooks

- `use-media-query` - For responsive breakpoint detection
- `use-orientation` - For detailed orientation information
- `use-element-size` - For element-specific sizing
- `use-resize-observer` - For element resize observation

## Best Practices

1. **Performance**: Use memoization for expensive calculations
2. **Responsive Design**: Combine with CSS media queries
3. **User Experience**: Provide smooth transitions on resize
4. **Testing**: Test on various devices and orientations
5. **Fallbacks**: Handle SSR and edge cases gracefully

---

*The `use-viewport-size` hook provides a simple and efficient way to track viewport dimensions in React applications. It's perfect for responsive design, layout calculations, conditional rendering, and any feature that needs to adapt to different screen sizes with excellent performance and full SSR support.*
