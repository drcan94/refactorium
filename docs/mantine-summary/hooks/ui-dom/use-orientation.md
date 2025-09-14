# use-orientation Hook

## Overview

The `use-orientation` hook provides a clean way to detect device orientation and subscribe to its changes. It returns the current orientation angle and type, making it perfect for responsive design, adaptive layouts, and orientation-specific functionality in mobile and tablet applications.

## Installation

```bash
npm install @mantine/hooks
```

## Import

```typescript
import { useOrientation } from '@mantine/hooks';
import type { UseOrientationOptions, UseOrientationReturnType } from '@mantine/hooks';
```

## Basic Usage

```tsx
import { Code, Text } from '@mantine/core';
import { useOrientation } from '@mantine/hooks';

function Demo() {
  const { angle, type } = useOrientation();
  return (
    <>
      <Text>
        Angle: <Code>{angle}</Code>
      </Text>
      <Text>
        Type: <Code>{type}</Code>
      </Text>
    </>
  );
}
```

## API Reference

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `options` | `UseOrientationOptions` | **Optional.** Configuration options for orientation detection |

### UseOrientationOptions

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `defaultAngle` | `number` | `0` | Default angle value for SSR and initial render |
| `defaultType` | `OrientationType` | `'landscape-primary'` | Default type value for SSR and initial render |
| `getInitialValueInEffect` | `boolean` | `true` | Whether to resolve initial value in useEffect (SSR safe) |

### Return Value

| Property | Type | Description |
|----------|------|-------------|
| `angle` | `number` | Current orientation angle in degrees (0, 90, 180, 270) |
| `type` | `OrientationType` | Current orientation type string |

### Type Definitions

```typescript
interface UseOrientationOptions {
  defaultAngle?: number;
  defaultType?: OrientationType;
  getInitialValueInEffect?: boolean;
}

interface UseOrientationReturnType {
  angle: number;
  type: OrientationType;
}

function useOrientation(options?: UseOrientationOptions): UseOrientationReturnType;
```

## Key Features

### 1. **Real-time Orientation Detection**
- Monitors device orientation changes
- Returns current angle and type
- Automatic updates on orientation change

### 2. **SSR Support**
- Safe server-side rendering
- Configurable default values
- Hydration-safe implementation

### 3. **TypeScript Support**
- Full type definitions
- OrientationType enum support
- Generic type safety

### 4. **Performance Optimized**
- Efficient event handling
- Automatic cleanup
- Minimal re-renders

## Advanced Usage

### With Custom Defaults

```tsx
import { useOrientation } from '@mantine/hooks';
import { Text, Code, Box } from '@mantine/core';

function CustomDefaults() {
  const { angle, type } = useOrientation({
    defaultAngle: 90,
    defaultType: 'portrait-primary',
    getInitialValueInEffect: true
  });

  return (
    <Box>
      <Text>Angle: <Code>{angle}°</Code></Text>
      <Text>Type: <Code>{type}</Code></Text>
    </Box>
  );
}
```

### SSR-Safe Implementation

```tsx
import { useOrientation } from '@mantine/hooks';
import { Text, Code, Box } from '@mantine/core';

function SSRSafeOrientation() {
  const { angle, type } = useOrientation({
    defaultAngle: 0,
    defaultType: 'landscape-primary',
    getInitialValueInEffect: true // SSR safe
  });

  return (
    <Box>
      <Text>Current orientation:</Text>
      <Text>Angle: <Code>{angle}°</Code></Text>
      <Text>Type: <Code>{type}</Code></Text>
    </Box>
  );
}
```

## Use Cases

### 1. **Responsive Layout Based on Orientation**

```tsx
import { useOrientation } from '@mantine/hooks';
import { Text, Box, Grid, Paper } from '@mantine/core';

function ResponsiveLayout() {
  const { angle, type } = useOrientation();
  
  const isPortrait = angle === 0 || angle === 180;
  const isLandscape = angle === 90 || angle === 270;

  return (
    <Box>
      <Text size="lg" mb="md">
        Orientation: {isPortrait ? 'Portrait' : 'Landscape'}
      </Text>
      
      <Grid>
        <Grid.Col span={isPortrait ? 12 : 6}>
          <Paper p="md" style={{ backgroundColor: '#e3f2fd' }}>
            <Text>Content 1</Text>
            <Text size="sm" color="dimmed">
              {isPortrait ? 'Full width in portrait' : 'Half width in landscape'}
            </Text>
          </Paper>
        </Grid.Col>
        
        <Grid.Col span={isPortrait ? 12 : 6}>
          <Paper p="md" style={{ backgroundColor: '#f3e5f5' }}>
            <Text>Content 2</Text>
            <Text size="sm" color="dimmed">
              {isPortrait ? 'Full width in portrait' : 'Half width in landscape'}
            </Text>
          </Paper>
        </Grid.Col>
      </Grid>
    </Box>
  );
}
```

### 2. **Orientation-Specific Navigation**

```tsx
import { useOrientation } from '@mantine/hooks';
import { Text, Box, Group, Button, Stack } from '@mantine/core';

function OrientationNavigation() {
  const { angle, type } = useOrientation();
  
  const isPortrait = angle === 0 || angle === 180;
  const isLandscape = angle === 90 || angle === 270;

  const navigationItems = [
    { label: 'Home', icon: '🏠' },
    { label: 'Search', icon: '🔍' },
    { label: 'Profile', icon: '👤' },
    { label: 'Settings', icon: '⚙️' },
  ];

  return (
    <Box>
      <Text size="lg" mb="md">
        Navigation - {isPortrait ? 'Portrait Mode' : 'Landscape Mode'}
      </Text>
      
      {isPortrait ? (
        // Vertical navigation for portrait
        <Stack gap="xs">
          {navigationItems.map((item) => (
            <Button
              key={item.label}
              variant="light"
              fullWidth
              leftSection={item.icon}
            >
              {item.label}
            </Button>
          ))}
        </Stack>
      ) : (
        // Horizontal navigation for landscape
        <Group gap="xs">
          {navigationItems.map((item) => (
            <Button
              key={item.label}
              variant="light"
              leftSection={item.icon}
            >
              {item.label}
            </Button>
          ))}
        </Group>
      )}
      
      <Text mt="md" size="sm" color="dimmed">
        Orientation: {type} ({angle}°)
      </Text>
    </Box>
  );
}
```

### 3. **Orientation-Aware Image Gallery**

```tsx
import { useOrientation } from '@mantine/hooks';
import { Text, Box, SimpleGrid, Image, Paper } from '@mantine/core';

function OrientationImageGallery() {
  const { angle, type } = useOrientation();
  
  const isPortrait = angle === 0 || angle === 180;
  const isLandscape = angle === 90 || angle === 270;

  const images = [
    'https://picsum.photos/400/300?random=1',
    'https://picsum.photos/400/300?random=2',
    'https://picsum.photos/400/300?random=3',
    'https://picsum.photos/400/300?random=4',
    'https://picsum.photos/400/300?random=5',
    'https://picsum.photos/400/300?random=6',
  ];

  const getColumns = () => {
    if (isPortrait) return 2;
    if (isLandscape) return 4;
    return 3;
  };

  return (
    <Box>
      <Text size="lg" mb="md">
        Image Gallery - {getColumns()} columns
      </Text>
      
      <SimpleGrid cols={getColumns()} spacing="md">
        {images.map((src, index) => (
          <Paper key={index} radius="md" overflow="hidden">
            <Image
              src={src}
              alt={`Gallery image ${index + 1}`}
              style={{
                height: isPortrait ? '200px' : '150px',
                objectFit: 'cover'
              }}
            />
          </Paper>
        ))}
      </SimpleGrid>
      
      <Text mt="md" size="sm" color="dimmed">
        Layout: {isPortrait ? 'Portrait' : 'Landscape'} ({angle}°)
      </Text>
    </Box>
  );
}
```

### 4. **Orientation-Based Form Layout**

```tsx
import { useOrientation } from '@mantine/hooks';
import { Text, Box, TextInput, Button, Group, Stack, Grid } from '@mantine/core';

function OrientationForm() {
  const { angle, type } = useOrientation();
  
  const isPortrait = angle === 0 || angle === 180;
  const isLandscape = angle === 90 || angle === 270;

  return (
    <Box>
      <Text size="lg" mb="md">
        Form - {isPortrait ? 'Portrait Layout' : 'Landscape Layout'}
      </Text>
      
      {isPortrait ? (
        // Vertical form for portrait
        <Stack gap="md">
          <TextInput label="First Name" placeholder="Enter first name" />
          <TextInput label="Last Name" placeholder="Enter last name" />
          <TextInput label="Email" placeholder="Enter email" />
          <TextInput label="Phone" placeholder="Enter phone" />
          <Button fullWidth>Submit</Button>
        </Stack>
      ) : (
        // Grid form for landscape
        <Grid>
          <Grid.Col span={6}>
            <TextInput label="First Name" placeholder="Enter first name" />
          </Grid.Col>
          <Grid.Col span={6}>
            <TextInput label="Last Name" placeholder="Enter last name" />
          </Grid.Col>
          <Grid.Col span={6}>
            <TextInput label="Email" placeholder="Enter email" />
          </Grid.Col>
          <Grid.Col span={6}>
            <TextInput label="Phone" placeholder="Enter phone" />
          </Grid.Col>
          <Grid.Col span={12}>
            <Group justify="center">
              <Button>Submit</Button>
              <Button variant="outline">Cancel</Button>
            </Group>
          </Grid.Col>
        </Grid>
      )}
      
      <Text mt="md" size="sm" color="dimmed">
        Orientation: {type} ({angle}°)
      </Text>
    </Box>
  );
}
```

### 5. **Orientation-Specific Content Display**

```tsx
import { useOrientation } from '@mantine/hooks';
import { Text, Box, Paper, Group, Stack, Badge } from '@mantine/core';

function OrientationContent() {
  const { angle, type } = useOrientation();
  
  const isPortrait = angle === 0 || angle === 180;
  const isLandscape = angle === 90 || angle === 270;

  const getOrientationInfo = () => {
    switch (angle) {
      case 0:
        return { label: 'Portrait Primary', color: 'blue', description: 'Normal portrait orientation' };
      case 90:
        return { label: 'Landscape Primary', color: 'green', description: 'Rotated 90° clockwise' };
      case 180:
        return { label: 'Portrait Secondary', color: 'orange', description: 'Upside down portrait' };
      case 270:
        return { label: 'Landscape Secondary', color: 'purple', description: 'Rotated 90° counter-clockwise' };
      default:
        return { label: 'Unknown', color: 'gray', description: 'Unknown orientation' };
    }
  };

  const orientationInfo = getOrientationInfo();

  return (
    <Box>
      <Text size="lg" mb="md">Orientation Information</Text>
      
      <Paper p="md" style={{ backgroundColor: '#f8f9fa' }}>
        <Group justify="space-between" mb="md">
          <Text weight="bold">Current Orientation</Text>
          <Badge color={orientationInfo.color} size="lg">
            {orientationInfo.label}
          </Badge>
        </Group>
        
        <Stack gap="xs">
          <Text>Angle: <Text span weight="bold">{angle}°</Text></Text>
          <Text>Type: <Text span weight="bold">{type}</Text></Text>
          <Text>Description: {orientationInfo.description}</Text>
        </Stack>
      </Paper>
      
      <Paper p="md" mt="md" style={{ backgroundColor: isPortrait ? '#e3f2fd' : '#e8f5e8' }}>
        <Text weight="bold" mb="xs">
          {isPortrait ? 'Portrait Mode' : 'Landscape Mode'}
        </Text>
        <Text size="sm" color="dimmed">
          {isPortrait 
            ? 'Content is optimized for vertical viewing. Use vertical navigation and full-width layouts.'
            : 'Content is optimized for horizontal viewing. Use horizontal navigation and multi-column layouts.'
          }
        </Text>
      </Paper>
    </Box>
  );
}
```

### 6. **Orientation-Based Game Interface**

```tsx
import { useOrientation } from '@mantine/hooks';
import { Text, Box, Button, Group, Stack, Paper } from '@mantine/core';
import { useState } from 'react';

function OrientationGame() {
  const { angle, type } = useOrientation();
  const [score, setScore] = useState(0);
  
  const isPortrait = angle === 0 || angle === 180;
  const isLandscape = angle === 90 || angle === 270;

  const gameControls = [
    { label: 'Move Up', key: '↑', action: () => setScore(prev => prev + 1) },
    { label: 'Move Down', key: '↓', action: () => setScore(prev => prev + 1) },
    { label: 'Move Left', key: '←', action: () => setScore(prev => prev + 1) },
    { label: 'Move Right', key: '→', action: () => setScore(prev => prev + 1) },
  ];

  return (
    <Box>
      <Text size="lg" mb="md">
        Game Interface - {isPortrait ? 'Portrait' : 'Landscape'}
      </Text>
      
      <Paper p="md" style={{ backgroundColor: '#f0f0f0' }}>
        <Text ta="center" size="xl" weight="bold" mb="md">
          Score: {score}
        </Text>
        
        <Text ta="center" size="sm" color="dimmed" mb="md">
          {isPortrait ? 'Use vertical controls below' : 'Use horizontal controls below'}
        </Text>
      </Paper>
      
      {isPortrait ? (
        // Vertical controls for portrait
        <Stack gap="xs" mt="md">
          {gameControls.map((control, index) => (
            <Button
              key={control.label}
              variant="light"
              fullWidth
              onClick={control.action}
            >
              {control.label} ({control.key})
            </Button>
          ))}
        </Stack>
      ) : (
        // Horizontal controls for landscape
        <Group gap="xs" mt="md">
          {gameControls.map((control, index) => (
            <Button
              key={control.label}
              variant="light"
              onClick={control.action}
            >
              {control.key}
            </Button>
          ))}
        </Group>
      )}
      
      <Text mt="md" size="sm" color="dimmed" ta="center">
        Orientation: {type} ({angle}°)
      </Text>
    </Box>
  );
}
```

## Performance Considerations

### Memoized Orientation Handling

```tsx
import { useOrientation } from '@mantine/hooks';
import { memo, useCallback, useMemo } from 'react';
import { Text, Box } from '@mantine/core';

const OrientationDisplay = memo(function OrientationDisplay({ 
  onOrientationChange 
}: { 
  onOrientationChange: (angle: number, type: string) => void; 
}) {
  const { angle, type } = useOrientation();

  const orientationInfo = useMemo(() => ({
    isPortrait: angle === 0 || angle === 180,
    isLandscape: angle === 90 || angle === 270,
    angle,
    type
  }), [angle, type]);

  useCallback(() => {
    onOrientationChange(angle, type);
  }, [angle, type, onOrientationChange]);

  return (
    <Box>
      <Text>Angle: {orientationInfo.angle}°</Text>
      <Text>Type: {orientationInfo.type}</Text>
      <Text>Mode: {orientationInfo.isPortrait ? 'Portrait' : 'Landscape'}</Text>
    </Box>
  );
});

function OptimizedOrientation() {
  const handleOrientationChange = useCallback((angle: number, type: string) => {
    console.log('Orientation changed:', angle, type);
  }, []);

  return (
    <div>
      <OrientationDisplay onOrientationChange={handleOrientationChange} />
    </div>
  );
}
```

### Conditional Orientation Handling

```tsx
import { useOrientation } from '@mantine/hooks';
import { Text, Box, Switch } from '@mantine/core';
import { useState } from 'react';

function ConditionalOrientation() {
  const [enabled, setEnabled] = useState(true);
  const { angle, type } = useOrientation();

  return (
    <Box>
      <Switch
        label="Enable orientation monitoring"
        checked={enabled}
        onChange={(event) => setEnabled(event.currentTarget.checked)}
        mb="md"
      />
      
      <Box
        style={{
          padding: '16px',
          backgroundColor: enabled ? '#e8f5e8' : '#f5f5f5',
          border: '1px solid #ccc',
        }}
      >
        <Text>
          {enabled ? `Orientation: ${type} (${angle}°)` : 'Orientation monitoring disabled'}
        </Text>
      </Box>
    </Box>
  );
}
```

## Common Patterns

### Orientation with State Management

```tsx
import { useOrientation } from '@mantine/hooks';
import { Text, Box, Button } from '@mantine/core';
import { useState, useEffect } from 'react';

function OrientationWithState() {
  const { angle, type } = useOrientation();
  const [orientationHistory, setOrientationHistory] = useState<Array<{
    angle: number;
    type: string;
    timestamp: number;
  }>>([]);

  useEffect(() => {
    setOrientationHistory(prev => [...prev, {
      angle,
      type,
      timestamp: Date.now()
    }]);
  }, [angle, type]);

  const clearHistory = () => setOrientationHistory([]);

  return (
    <Box>
      <Text>Current: {type} ({angle}°)</Text>
      <Text>History: {orientationHistory.length} changes</Text>
      
      <Button onClick={clearHistory} mt="md" fullWidth>
        Clear History
      </Button>
    </Box>
  );
}
```

### Orientation with Animation

```tsx
import { useOrientation } from '@mantine/hooks';
import { Text, Box, Paper } from '@mantine/core';
import { useState } from 'react';

function AnimatedOrientation() {
  const { angle, type } = useOrientation();
  const [isTransitioning, setIsTransitioning] = useState(false);

  const isPortrait = angle === 0 || angle === 180;
  const isLandscape = angle === 90 || angle === 270;

  return (
    <Box>
      <Paper
        p="md"
        style={{
          backgroundColor: isPortrait ? '#e3f2fd' : '#e8f5e8',
          transition: 'all 0.3s ease',
          transform: isTransitioning ? 'scale(1.05)' : 'scale(1)',
        }}
      >
        <Text weight="bold">
          {isPortrait ? 'Portrait Mode' : 'Landscape Mode'}
        </Text>
        <Text size="sm" color="dimmed">
          Angle: {angle}° | Type: {type}
        </Text>
      </Paper>
    </Box>
  );
}
```

## Integration with Other Hooks

### Combined with useMediaQuery

```tsx
import { useOrientation } from '@mantine/hooks';
import { Text, Box, Paper } from '@mantine/core';

function OrientationWithMediaQuery() {
  const { angle, type } = useOrientation();
  const isMobile = useMediaQuery('(max-width: 768px)');
  const isTablet = useMediaQuery('(min-width: 769px) and (max-width: 1024px)');

  const getDeviceInfo = () => {
    if (isMobile) return 'Mobile';
    if (isTablet) return 'Tablet';
    return 'Desktop';
  };

  return (
    <Box>
      <Paper p="md" style={{ backgroundColor: '#f8f9fa' }}>
        <Text weight="bold" mb="xs">Device Information</Text>
        <Text>Device: {getDeviceInfo()}</Text>
        <Text>Orientation: {type} ({angle}°)</Text>
        <Text>Screen Size: {isMobile ? 'Small' : isTablet ? 'Medium' : 'Large'}</Text>
      </Paper>
    </Box>
  );
}
```

### Combined with useLocalStorage

```tsx
import { useOrientation, useLocalStorage } from '@mantine/hooks';
import { Text, Box, Paper, Button } from '@mantine/core';

function OrientationWithStorage() {
  const { angle, type } = useOrientation();
  const [savedOrientations, setSavedOrientations] = useLocalStorage({
    key: 'orientation-history',
    defaultValue: [] as Array<{ angle: number; type: string; timestamp: number }>
  });

  const saveOrientation = () => {
    setSavedOrientations(prev => [...prev, {
      angle,
      type,
      timestamp: Date.now()
    }]);
  };

  return (
    <Box>
      <Paper p="md" style={{ backgroundColor: '#f0f0f0' }}>
        <Text>Current: {type} ({angle}°)</Text>
        <Text>Saved: {savedOrientations.length} orientations</Text>
      </Paper>
      
      <Button onClick={saveOrientation} mt="md" fullWidth>
        Save Current Orientation
      </Button>
    </Box>
  );
}
```

## Troubleshooting

### Common Issues

1. **Orientation Not Detecting**
   - Check if the device supports orientation API
   - Ensure the page is served over HTTPS
   - Test on actual mobile devices

2. **SSR Issues**
   - Use `getInitialValueInEffect: true` for SSR safety
   - Provide appropriate default values
   - Handle hydration mismatches

3. **Performance Issues**
   - Use memoization for expensive calculations
   - Consider debouncing if needed
   - Avoid unnecessary re-renders

### Debug Information

```tsx
import { useOrientation } from '@mantine/hooks';
import { Text, Box, Paper } from '@mantine/core';

function DebugOrientation() {
  const { angle, type } = useOrientation();

  return (
    <Paper p="md" style={{ backgroundColor: '#f8f9fa' }}>
      <Text size="lg" weight="bold" mb="md">Orientation Debug Info</Text>
      
      <Box>
        <Text>Angle: {angle}°</Text>
        <Text>Type: {type}</Text>
        <Text>Is Portrait: {angle === 0 || angle === 180 ? 'Yes' : 'No'}</Text>
        <Text>Is Landscape: {angle === 90 || angle === 270 ? 'Yes' : 'No'}</Text>
        <Text>Screen Width: {typeof window !== 'undefined' ? window.innerWidth : 'N/A'}px</Text>
        <Text>Screen Height: {typeof window !== 'undefined' ? window.innerHeight : 'N/A'}px</Text>
      </Box>
    </Paper>
  );
}
```

## Browser Support

- **Modern Browsers**: Full support
- **Mobile Browsers**: Full support
- **Legacy Browsers**: Limited support (fallback to default values)
- **Server-Side**: Safe to use with default values

## Related Hooks

- `use-media-query` - For responsive design
- `use-element-size` - For element size detection
- `use-intersection` - For viewport intersection
- `use-in-viewport` - For viewport visibility

## Best Practices

1. **SSR Safety**: Always use `getInitialValueInEffect: true` for SSR
2. **Default Values**: Provide meaningful default values
3. **Performance**: Use memoization for expensive calculations
4. **Testing**: Test on actual mobile devices
5. **Accessibility**: Ensure orientation changes don't break accessibility

---

*The `use-orientation` hook provides a clean, efficient way to detect device orientation in React applications. It's perfect for responsive design, adaptive layouts, and orientation-specific functionality with excellent mobile support and SSR compatibility.*
