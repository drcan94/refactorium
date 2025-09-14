# use-resize-observer Hook

## Overview

The `use-resize-observer` hook provides a React wrapper for the native `ResizeObserver` API, allowing you to track element size and position changes in real-time. It's perfect for responsive components, dynamic layouts, and any scenario where you need to react to element dimension changes.

## Installation

```bash
npm install @mantine/hooks
```

## Import

```typescript
import { useResizeObserver } from '@mantine/hooks';
```

## Basic Usage

```tsx
import { Group, Table } from '@mantine/core';
import { useResizeObserver } from '@mantine/hooks';

function Demo() {
  const [ref, rect] = useResizeObserver();

  return (
    <div>
      <Group justify="center">
        <div 
          ref={ref} 
          style={{
            width: '400px',
            height: '200px',
            backgroundColor: '#e3f2fd',
            border: '2px solid #2196f3',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            resize: 'both',
            overflow: 'auto'
          }}
        >
          Resize me!
        </div>
      </Group>

      <Table
        captionSide="top"
        data={{
          caption: 'Resize element by dragging its right bottom corner',
          head: ['Property', 'Value'],
          body: [
            ['width', rect.width],
            ['height', rect.height],
          ],
        }}
      />
    </div>
  );
}
```

## API Reference

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `options` | `ResizeObserverOptions` | **Optional.** Configuration options for the ResizeObserver |

### Return Value

| Property | Type | Description |
|----------|------|-------------|
| `ref` | `React.RefObject<T>` | Ref to attach to the target element |
| `rect` | `ObserverRect` | Current element content rect (width, height, x, y, top, right, bottom, left) |

### ObserverRect

| Property | Type | Description |
|----------|------|-------------|
| `width` | `number` | Element width |
| `height` | `number` | Element height |
| `x` | `number` | Element x position |
| `y` | `number` | Element y position |
| `top` | `number` | Element top position |
| `right` | `number` | Element right position |
| `bottom` | `number` | Element bottom position |
| `left` | `number` | Element left position |

### Type Definitions

```typescript
type ObserverRect = Omit<DOMRectReadOnly, 'toJSON'>;

function useResizeObserver<T extends HTMLElement = any>(
  options?: ResizeObserverOptions
): readonly [React.RefObject<T>, ObserverRect];
```

## Key Features

### 1. **Real-time Size Tracking**
- Monitors element dimensions continuously
- Updates on any size change
- Includes position information

### 2. **Native API Integration**
- Uses native ResizeObserver API
- Excellent performance characteristics
- Automatic cleanup on unmount

### 3. **Complete Rect Information**
- Width and height
- Position coordinates (x, y)
- All bounding box properties

### 4. **SSR Safe**
- Returns zero values during SSR
- No hydration mismatches
- Safe initial values

## Advanced Usage

### With Custom Options

```tsx
import { useResizeObserver } from '@mantine/hooks';
import { Text, Box, Paper } from '@mantine/core';

function CustomOptions() {
  const [ref, rect] = useResizeObserver({
    box: 'border-box' // Track border box instead of content box
  });

  return (
    <Box>
      <Paper
        ref={ref}
        p="md"
        style={{
          width: '300px',
          height: '200px',
          backgroundColor: '#f0f0f0',
          border: '5px solid #007bff',
          resize: 'both',
          overflow: 'auto'
        }}
      >
        <Text>Resize me!</Text>
        <Text size="sm" color="dimmed">
          Border box tracking enabled
        </Text>
      </Paper>
      
      <Text mt="md">
        Dimensions: {Math.round(rect.width)} × {Math.round(rect.height)}
      </Text>
    </Box>
  );
}
```

### TypeScript with Specific Element Type

```tsx
import { useResizeObserver } from '@mantine/hooks';
import { Text, Box, Paper } from '@mantine/core';

function TypedResizeObserver() {
  const [ref, rect] = useResizeObserver<HTMLDivElement>();

  return (
    <Box>
      <Paper
        ref={ref}
        p="md"
        style={{
          width: '250px',
          height: '150px',
          backgroundColor: '#e8f5e8',
          resize: 'both',
          overflow: 'auto'
        }}
      >
        <Text>Typed resize observer</Text>
      </Paper>
      
      <Text mt="md">
        Size: {Math.round(rect.width)} × {Math.round(rect.height)}
      </Text>
    </Box>
  );
}
```

## Use Cases

### 1. **Responsive Chart Component**

```tsx
import { useResizeObserver } from '@mantine/hooks';
import { Text, Box, Paper, Group } from '@mantine/core';
import { useState, useEffect } from 'react';

function ResponsiveChart() {
  const [ref, rect] = useResizeObserver();
  const [data, setData] = useState<number[]>([]);

  useEffect(() => {
    // Generate data based on container size
    const newData = Array.from({ length: Math.floor(rect.width / 20) }, () => 
      Math.random() * 100
    );
    setData(newData);
  }, [rect.width]);

  return (
    <Box>
      <Text size="lg" mb="md">Responsive Chart</Text>
      
      <Paper
        ref={ref}
        p="md"
        style={{
          width: '100%',
          height: '300px',
          backgroundColor: '#f8f9fa',
          border: '1px solid #dee2e6',
          resize: 'both',
          overflow: 'auto'
        }}
      >
        <Text size="sm" color="dimmed" mb="md">
          Container: {Math.round(rect.width)} × {Math.round(rect.height)}
        </Text>
        
        {/* Simple bar chart */}
        <div style={{ display: 'flex', alignItems: 'end', height: '200px', gap: '2px' }}>
          {data.map((value, index) => (
            <div
              key={index}
              style={{
                width: '100%',
                height: `${value}%`,
                backgroundColor: '#007bff',
                minHeight: '2px'
              }}
            />
          ))}
        </div>
      </Paper>
    </Box>
  );
}
```

### 2. **Dynamic Grid Layout**

```tsx
import { useResizeObserver } from '@mantine/hooks';
import { Text, Box, Paper, Group } from '@mantine/core';
import { useMemo } from 'react';

function DynamicGrid() {
  const [ref, rect] = useResizeObserver();

  const gridConfig = useMemo(() => {
    const width = rect.width;
    const height = rect.height;
    
    // Calculate optimal grid based on container size
    const itemSize = 100;
    const cols = Math.max(1, Math.floor(width / itemSize));
    const rows = Math.max(1, Math.floor(height / itemSize));
    
    return { cols, rows, itemSize };
  }, [rect.width, rect.height]);

  const items = Array.from({ length: gridConfig.cols * gridConfig.rows }, (_, i) => i);

  return (
    <Box>
      <Text size="lg" mb="md">Dynamic Grid Layout</Text>
      
      <Paper
        ref={ref}
        p="md"
        style={{
          width: '100%',
          height: '400px',
          backgroundColor: '#f8f9fa',
          border: '1px solid #dee2e6',
          resize: 'both',
          overflow: 'auto'
        }}
      >
        <Text size="sm" color="dimmed" mb="md">
          Grid: {gridConfig.cols} × {gridConfig.rows} (Container: {Math.round(rect.width)} × {Math.round(rect.height)})
        </Text>
        
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${gridConfig.cols}, 1fr)`,
            gridTemplateRows: `repeat(${gridConfig.rows}, 1fr)`,
            gap: '8px',
            height: '100%'
          }}
        >
          {items.map((item) => (
            <div
              key={item}
              style={{
                backgroundColor: '#e3f2fd',
                border: '1px solid #2196f3',
                borderRadius: '4px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '12px',
                fontWeight: 'bold'
              }}
            >
              {item + 1}
            </div>
          ))}
        </div>
      </Paper>
    </Box>
  );
}
```

### 3. **Responsive Text Sizing**

```tsx
import { useResizeObserver } from '@mantine/hooks';
import { Text, Box, Paper } from '@mantine/core';
import { useMemo } from 'react';

function ResponsiveText() {
  const [ref, rect] = useResizeObserver();

  const fontSize = useMemo(() => {
    // Scale font size based on container width
    const baseSize = 16;
    const scale = Math.min(rect.width / 300, 2); // Max 2x scale
    return Math.max(12, baseSize * scale);
  }, [rect.width]);

  return (
    <Box>
      <Text size="lg" mb="md">Responsive Text Sizing</Text>
      
      <Paper
        ref={ref}
        p="md"
        style={{
          width: '100%',
          height: '200px',
          backgroundColor: '#f8f9fa',
          border: '1px solid #dee2e6',
          resize: 'both',
          overflow: 'auto'
        }}
      >
        <Text
          style={{
            fontSize: `${fontSize}px`,
            lineHeight: 1.5,
            textAlign: 'center'
          }}
        >
          This text scales with the container size!
          <br />
          <Text size="sm" color="dimmed">
            Font size: {Math.round(fontSize)}px | Container: {Math.round(rect.width)} × {Math.round(rect.height)}
          </Text>
        </Text>
      </Paper>
    </Box>
  );
}
```

### 4. **Aspect Ratio Maintainer**

```tsx
import { useResizeObserver } from '@mantine/hooks';
import { Text, Box, Paper, Group, Button } from '@mantine/core';
import { useState } from 'react';

function AspectRatioMaintainer() {
  const [ref, rect] = useResizeObserver();
  const [aspectRatio, setAspectRatio] = useState(16 / 9);

  const adjustedHeight = rect.width / aspectRatio;

  return (
    <Box>
      <Text size="lg" mb="md">Aspect Ratio Maintainer</Text>
      
      <Group mb="md">
        <Button onClick={() => setAspectRatio(16 / 9)} size="sm">16:9</Button>
        <Button onClick={() => setAspectRatio(4 / 3)} size="sm">4:3</Button>
        <Button onClick={() => setAspectRatio(1 / 1)} size="sm">1:1</Button>
        <Button onClick={() => setAspectRatio(3 / 2)} size="sm">3:2</Button>
      </Group>
      
      <Paper
        ref={ref}
        p="md"
        style={{
          width: '100%',
          height: `${adjustedHeight}px`,
          backgroundColor: '#e3f2fd',
          border: '2px solid #2196f3',
          borderRadius: '8px',
          resize: 'both',
          overflow: 'auto',
          minHeight: '100px'
        }}
      >
        <Text ta="center">
          Aspect Ratio: {aspectRatio.toFixed(2)}
        </Text>
        <Text ta="center" size="sm" color="dimmed">
          Dimensions: {Math.round(rect.width)} × {Math.round(rect.height)}
        </Text>
        <Text ta="center" size="sm" color="dimmed">
          Adjusted Height: {Math.round(adjustedHeight)}px
        </Text>
      </Paper>
    </Box>
  );
}
```

### 5. **Virtual Scrolling Container**

```tsx
import { useResizeObserver } from '@mantine/hooks';
import { Text, Box, Paper, ScrollArea } from '@mantine/core';
import { useMemo, useState } from 'react';

function VirtualScrollingContainer() {
  const [ref, rect] = useResizeObserver();
  const [scrollTop, setScrollTop] = useState(0);

  const itemHeight = 50;
  const totalItems = 1000;
  const visibleItems = Math.ceil(rect.height / itemHeight);
  const startIndex = Math.floor(scrollTop / itemHeight);
  const endIndex = Math.min(startIndex + visibleItems + 1, totalItems);

  const visibleItemsData = useMemo(() => {
    return Array.from({ length: endIndex - startIndex }, (_, i) => ({
      id: startIndex + i,
      content: `Item ${startIndex + i + 1}`
    }));
  }, [startIndex, endIndex]);

  return (
    <Box>
      <Text size="lg" mb="md">Virtual Scrolling Container</Text>
      
      <Paper
        ref={ref}
        style={{
          width: '100%',
          height: '400px',
          backgroundColor: '#f8f9fa',
          border: '1px solid #dee2e6',
          resize: 'both',
          overflow: 'auto'
        }}
      >
        <ScrollArea
          h="100%"
          onScrollPositionChange={({ y }) => setScrollTop(y)}
        >
          <div style={{ height: totalItems * itemHeight, position: 'relative' }}>
            {visibleItemsData.map((item, index) => (
              <div
                key={item.id}
                style={{
                  position: 'absolute',
                  top: (startIndex + index) * itemHeight,
                  left: 0,
                  right: 0,
                  height: itemHeight,
                  padding: '12px',
                  borderBottom: '1px solid #dee2e6',
                  display: 'flex',
                  alignItems: 'center',
                  backgroundColor: index % 2 === 0 ? '#ffffff' : '#f8f9fa'
                }}
              >
                <Text>{item.content}</Text>
              </div>
            ))}
          </div>
        </ScrollArea>
        
        <Text size="sm" color="dimmed" p="xs">
          Showing {visibleItems} of {totalItems} items | Container: {Math.round(rect.width)} × {Math.round(rect.height)}
        </Text>
      </Paper>
    </Box>
  );
}
```

### 6. **Responsive Image Gallery**

```tsx
import { useResizeObserver } from '@mantine/hooks';
import { Text, Box, Paper, SimpleGrid, Image } from '@mantine/core';
import { useMemo } from 'react';

function ResponsiveImageGallery() {
  const [ref, rect] = useResizeObserver();

  const gridConfig = useMemo(() => {
    const width = rect.width;
    
    if (width < 400) return { cols: 1, gap: 'sm' };
    if (width < 600) return { cols: 2, gap: 'md' };
    if (width < 800) return { cols: 3, gap: 'md' };
    return { cols: 4, gap: 'lg' };
  }, [rect.width]);

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
      <Text size="lg" mb="md">Responsive Image Gallery</Text>
      
      <Paper
        ref={ref}
        p="md"
        style={{
          width: '100%',
          height: '500px',
          backgroundColor: '#f8f9fa',
          border: '1px solid #dee2e6',
          resize: 'both',
          overflow: 'auto'
        }}
      >
        <Text size="sm" color="dimmed" mb="md">
          Grid: {gridConfig.cols} columns | Container: {Math.round(rect.width)} × {Math.round(rect.height)}
        </Text>
        
        <SimpleGrid cols={gridConfig.cols} spacing={gridConfig.gap}>
          {images.map((src, index) => (
            <Image
              key={index}
              src={src}
              alt={`Gallery image ${index + 1}`}
              radius="md"
              style={{ cursor: 'pointer' }}
            />
          ))}
        </SimpleGrid>
      </Paper>
    </Box>
  );
}
```

## Performance Considerations

### Memoized Resize Observer

```tsx
import { useResizeObserver } from '@mantine/hooks';
import { memo, useCallback, useMemo } from 'react';
import { Text, Box, Paper } from '@mantine/core';

const ResizeObserverComponent = memo(function ResizeObserverComponent({ 
  onResize 
}: { 
  onResize: (rect: ObserverRect) => void; 
}) {
  const [ref, rect] = useResizeObserver();

  const memoizedRect = useMemo(() => rect, [rect.width, rect.height]);

  useCallback(() => {
    onResize(memoizedRect);
  }, [memoizedRect, onResize]);

  return (
    <Paper
      ref={ref}
      p="md"
      style={{
        width: '200px',
        height: '200px',
        backgroundColor: '#f0f0f0',
        resize: 'both',
        overflow: 'auto'
      }}
    >
      <Text>Resize me!</Text>
    </Paper>
  );
});

function OptimizedResizeObserver() {
  const handleResize = useCallback((rect: ObserverRect) => {
    console.log('Element resized:', rect);
  }, []);

  return (
    <div>
      <ResizeObserverComponent onResize={handleResize} />
    </div>
  );
}
```

### Conditional Resize Observation

```tsx
import { useResizeObserver } from '@mantine/hooks';
import { Text, Box, Paper, Switch } from '@mantine/core';
import { useState } from 'react';

function ConditionalResizeObserver() {
  const [enabled, setEnabled] = useState(true);
  const [ref, rect] = useResizeObserver(enabled ? {} : undefined);

  return (
    <Box>
      <Switch
        label="Enable resize observation"
        checked={enabled}
        onChange={(event) => setEnabled(event.currentTarget.checked)}
        mb="md"
      />
      
      <Paper
        ref={ref}
        p="md"
        style={{
          width: '200px',
          height: '200px',
          backgroundColor: enabled ? '#e8f5e8' : '#f5f5f5',
          resize: 'both',
          overflow: 'auto'
        }}
      >
        <Text>
          {enabled ? 'Resize observation enabled' : 'Resize observation disabled'}
        </Text>
      </Paper>
      
      <Text mt="md">
        Dimensions: {Math.round(rect.width)} × {Math.round(rect.height)}
      </Text>
    </Box>
  );
}
```

## Common Patterns

### Resize Observer with State

```tsx
import { useResizeObserver } from '@mantine/hooks';
import { Text, Box, Paper, Button } from '@mantine/core';
import { useState, useEffect } from 'react';

function ResizeObserverWithState() {
  const [ref, rect] = useResizeObserver();
  const [resizeHistory, setResizeHistory] = useState<Array<{
    width: number;
    height: number;
    timestamp: number;
  }>>([]);

  useEffect(() => {
    if (rect.width > 0 && rect.height > 0) {
      setResizeHistory(prev => [...prev, {
        width: rect.width,
        height: rect.height,
        timestamp: Date.now()
      }]);
    }
  }, [rect.width, rect.height]);

  const clearHistory = () => setResizeHistory([]);

  return (
    <Box>
      <Paper
        ref={ref}
        p="md"
        style={{
          width: '200px',
          height: '200px',
          backgroundColor: '#f0f0f0',
          resize: 'both',
          overflow: 'auto'
        }}
      >
        <Text>Resize me!</Text>
      </Paper>
      
      <Text mt="md">
        Current: {Math.round(rect.width)} × {Math.round(rect.height)}
      </Text>
      <Text size="sm" color="dimmed">
        History: {resizeHistory.length} resizes
      </Text>
      
      <Button onClick={clearHistory} mt="md" fullWidth>
        Clear History
      </Button>
    </Box>
  );
}
```

### Resize Observer with Animation

```tsx
import { useResizeObserver } from '@mantine/hooks';
import { Text, Box, Paper } from '@mantine/core';
import { useState } from 'react';

function AnimatedResizeObserver() {
  const [ref, rect] = useResizeObserver();
  const [isResizing, setIsResizing] = useState(false);

  return (
    <Box>
      <Paper
        ref={ref}
        p="md"
        style={{
          width: '200px',
          height: '200px',
          backgroundColor: isResizing ? '#e3f2fd' : '#f0f0f0',
          resize: 'both',
          overflow: 'auto',
          transition: 'background-color 0.3s ease',
        }}
        onMouseDown={() => setIsResizing(true)}
        onMouseUp={() => setIsResizing(false)}
      >
        <Text>Resize me!</Text>
      </Paper>
    </Box>
  );
}
```

## Integration with Other Hooks

### Combined with useDisclosure

```tsx
import { useResizeObserver, useDisclosure } from '@mantine/hooks';
import { Modal, Button, Text, Box, Paper } from '@mantine/core';

function ResizeObserverWithModal() {
  const [ref, rect] = useResizeObserver();
  const [opened, { open, close }] = useDisclosure();

  return (
    <Box>
      <Paper
        ref={ref}
        p="md"
        style={{
          width: '200px',
          height: '200px',
          backgroundColor: '#f0f0f0',
          resize: 'both',
          overflow: 'auto'
        }}
      >
        <Text>Resize me!</Text>
      </Paper>
      
      <Button onClick={open} mt="md" fullWidth>
        Open Modal
      </Button>

      <Modal
        opened={opened}
        onClose={close}
        title="Resize Observer Details"
      >
        <Text>Current dimensions: {Math.round(rect.width)} × {Math.round(rect.height)}</Text>
        <Text>Position: ({Math.round(rect.x)}, {Math.round(rect.y)})</Text>
      </Modal>
    </Box>
  );
}
```

### Combined with useLocalStorage

```tsx
import { useResizeObserver, useLocalStorage } from '@mantine/hooks';
import { Text, Box, Paper, Button } from '@mantine/core';

function ResizeObserverWithStorage() {
  const [ref, rect] = useResizeObserver();
  const [savedDimensions, setSavedDimensions] = useLocalStorage({
    key: 'resize-dimensions',
    defaultValue: { width: 0, height: 0 }
  });

  const saveDimensions = () => {
    setSavedDimensions({ width: rect.width, height: rect.height });
  };

  return (
    <Box>
      <Paper
        ref={ref}
        p="md"
        style={{
          width: '200px',
          height: '200px',
          backgroundColor: '#f0f0f0',
          resize: 'both',
          overflow: 'auto'
        }}
      >
        <Text>Resize me!</Text>
      </Paper>
      
      <Text mt="md">
        Current: {Math.round(rect.width)} × {Math.round(rect.height)}
      </Text>
      <Text size="sm" color="dimmed">
        Saved: {Math.round(savedDimensions.width)} × {Math.round(savedDimensions.height)}
      </Text>
      
      <Button onClick={saveDimensions} mt="md" fullWidth>
        Save Dimensions
      </Button>
    </Box>
  );
}
```

## Troubleshooting

### Common Issues

1. **Resize Observer Not Working**
   - Check if the ref is properly attached
   - Ensure the element is visible
   - Verify browser support for ResizeObserver

2. **Performance Issues**
   - Use memoization for expensive calculations
   - Consider debouncing if needed
   - Avoid unnecessary re-renders

3. **SSR Issues**
   - Initial values are 0 during SSR
   - Handle hydration properly
   - Use appropriate fallbacks

### Debug Information

```tsx
import { useResizeObserver } from '@mantine/hooks';
import { Text, Box, Paper } from '@mantine/core';

function DebugResizeObserver() {
  const [ref, rect] = useResizeObserver();

  return (
    <Box>
      <Paper
        ref={ref}
        p="md"
        style={{
          width: '200px',
          height: '200px',
          backgroundColor: '#f0f0f0',
          resize: 'both',
          overflow: 'auto'
        }}
      >
        <Text>Resize me!</Text>
      </Paper>
      
      <Paper p="md" mt="md" style={{ backgroundColor: '#f8f9fa' }}>
        <Text size="lg" weight="bold" mb="md">Resize Observer Debug Info</Text>
        
        <Box>
          <Text>Width: {rect.width}</Text>
          <Text>Height: {rect.height}</Text>
          <Text>X: {rect.x}</Text>
          <Text>Y: {rect.y}</Text>
          <Text>Top: {rect.top}</Text>
          <Text>Right: {rect.right}</Text>
          <Text>Bottom: {rect.bottom}</Text>
          <Text>Left: {rect.left}</Text>
        </Box>
      </Paper>
    </Box>
  );
}
```

## Browser Support

- **Modern Browsers**: Full support
- **Legacy Browsers**: Limited support (polyfill available)
- **Mobile Browsers**: Full support
- **Server-Side**: Safe to use (returns zero values during SSR)

## Related Hooks

- `use-element-size` - For width and height only
- `use-intersection` - For viewport intersection
- `use-in-viewport` - For viewport visibility
- `use-mutation-observer` - For DOM changes

## Best Practices

1. **Performance**: Use memoization for expensive calculations
2. **Accessibility**: Ensure resize doesn't break accessibility
3. **Testing**: Test with actual resize scenarios
4. **Fallbacks**: Provide fallbacks for unsupported browsers
5. **Cleanup**: The hook handles cleanup automatically

---

*The `use-resize-observer` hook provides a powerful, efficient way to track element size and position changes in React applications. It's perfect for responsive components, dynamic layouts, and any scenario where you need to react to element dimension changes with excellent performance and full cross-platform support.*
