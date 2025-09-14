# use-element-size Hook

## Overview

The `use-element-size` hook returns an element's width and height and automatically observes changes using the ResizeObserver API. This hook is essential for creating responsive components that need to adapt to size changes, implement dynamic layouts, or perform calculations based on element dimensions.

## Installation

```bash
npm install @mantine/hooks
```

## Import

```typescript
import { useElementSize } from '@mantine/hooks';
```

## Basic Usage

```tsx
import { useElementSize } from '@mantine/hooks';

function Demo() {
  const { ref, width, height } = useElementSize();

  return (
    <>
      <textarea ref={ref} style={{ width: 400, height: 120 }} />
      <div>Width: {width}, height: {height}</div>
    </>
  );
}
```

## API Reference

### Return Value

The hook returns an object with the following properties:

| Property | Type | Description |
|----------|------|-------------|
| `ref` | `React.RefObject<T>` | Ref object that must be passed to the observed element |
| `width` | `number` | Current width of the element in pixels |
| `height` | `number` | Current height of the element in pixels |

### Type Definition

```typescript
type ObserverRect = Omit<DOMRectReadOnly, 'toJSON'>;

function useElementSize<T extends HTMLElement = any>(): {
  ref: React.RefObject<T>;
  width: number;
  height: number;
};
```

## Key Features

### 1. **Automatic Resize Detection**
- Uses ResizeObserver API for efficient size change detection
- Automatically updates when element dimensions change
- No manual event listeners required

### 2. **SSR Compatible**
- Returns `0` for width and height during server-side rendering
- Safe to use in Next.js and other SSR frameworks
- No hydration mismatches

### 3. **TypeScript Support**
- Full TypeScript support with generic type parameter
- Type-safe ref assignment
- Proper type inference for element types

## Advanced Usage

### TypeScript with Specific Element Type

```tsx
import { useElementSize } from '@mantine/hooks';

function TypedElement() {
  const { ref, width, height } = useElementSize<HTMLDivElement>();

  return (
    <div ref={ref} className="resizable-container">
      <p>Width: {width}px</p>
      <p>Height: {height}px</p>
    </div>
  );
}
```

### Conditional Rendering Based on Size

```tsx
import { useElementSize } from '@mantine/hooks';
import { Text, Button } from '@mantine/core';

function ResponsiveComponent() {
  const { ref, width, height } = useElementSize();

  const isWide = width > 600;
  const isTall = height > 400;

  return (
    <div ref={ref} style={{ padding: '20px', border: '1px solid #ccc' }}>
      <Text size="lg">
        Container size: {width} × {height}
      </Text>
      
      {isWide && (
        <Text color="blue">This text only shows on wide containers</Text>
      )}
      
      {isTall && (
        <Button variant="outline">This button only shows on tall containers</Button>
      )}
    </div>
  );
}
```

## Use Cases

### 1. **Dynamic Grid Layouts**

```tsx
import { useElementSize } from '@mantine/hooks';
import { Grid, Paper } from '@mantine/core';

function DynamicGrid() {
  const { ref, width } = useElementSize();
  
  // Calculate columns based on container width
  const columns = Math.max(1, Math.floor(width / 200));
  
  return (
    <div ref={ref}>
      <Grid columns={columns}>
        {Array.from({ length: 12 }).map((_, index) => (
          <Grid.Col key={index} span={1}>
            <Paper p="md" shadow="sm">
              Item {index + 1}
            </Paper>
          </Grid.Col>
        ))}
      </Grid>
    </div>
  );
}
```

### 2. **Responsive Charts**

```tsx
import { useElementSize } from '@mantine/hooks';
import { Paper } from '@mantine/core';

function ResponsiveChart() {
  const { ref, width, height } = useElementSize();
  
  // Calculate chart dimensions with padding
  const chartWidth = width - 40;
  const chartHeight = height - 40;
  
  return (
    <Paper ref={ref} p="md" style={{ height: '400px' }}>
      <svg width={chartWidth} height={chartHeight}>
        {/* Chart implementation based on dimensions */}
        <rect width={chartWidth} height={chartHeight} fill="#f0f0f0" />
        <text x={chartWidth / 2} y={chartHeight / 2} textAnchor="middle">
          Chart: {chartWidth} × {chartHeight}
        </text>
      </svg>
    </Paper>
  );
}
```

### 3. **Resizable Textarea**

```tsx
import { useElementSize } from '@mantine/hooks';
import { Textarea, Text } from '@mantine/core';

function ResizableTextarea() {
  const { ref, width, height } = useElementSize();
  
  return (
    <div>
      <Textarea
        ref={ref}
        placeholder="Resize this textarea..."
        style={{ 
          width: '100%', 
          minHeight: '100px',
          resize: 'both'
        }}
      />
      <Text size="sm" color="dimmed">
        Current size: {width} × {height} pixels
      </Text>
    </div>
  );
}
```

### 4. **Image Aspect Ratio Maintenance**

```tsx
import { useElementSize } from '@mantine/hooks';
import { Image, Box } from '@mantine/core';

function AspectRatioImage() {
  const { ref, width } = useElementSize();
  
  // Calculate height to maintain 16:9 aspect ratio
  const aspectRatio = 16 / 9;
  const calculatedHeight = width / aspectRatio;
  
  return (
    <Box ref={ref} style={{ width: '100%' }}>
      <Image
        src="/example-image.jpg"
        alt="Responsive image"
        style={{
          width: '100%',
          height: calculatedHeight,
          objectFit: 'cover'
        }}
      />
    </Box>
  );
}
```

### 5. **Virtual Scrolling Container**

```tsx
import { useElementSize } from '@mantine/hooks';
import { ScrollArea, Paper } from '@mantine/core';

function VirtualScrollContainer({ items }) {
  const { ref, height } = useElementSize();
  
  // Calculate visible items based on container height
  const itemHeight = 50;
  const visibleItems = Math.ceil(height / itemHeight);
  const startIndex = 0; // This would be calculated based on scroll position
  
  return (
    <ScrollArea ref={ref} style={{ height: '400px' }}>
      <div style={{ height: items.length * itemHeight, position: 'relative' }}>
        {items.slice(startIndex, startIndex + visibleItems).map((item, index) => (
          <Paper
            key={startIndex + index}
            p="sm"
            style={{
              position: 'absolute',
              top: (startIndex + index) * itemHeight,
              width: '100%',
              height: itemHeight
            }}
          >
            {item}
          </Paper>
        ))}
      </div>
    </ScrollArea>
  );
}
```

## Performance Considerations

### Memoization for Expensive Calculations

```tsx
import { useElementSize } from '@mantine/hooks';
import { useMemo } from 'react';

function OptimizedComponent() {
  const { ref, width, height } = useElementSize();
  
  const expensiveCalculation = useMemo(() => {
    // Expensive calculation based on dimensions
    return width * height * Math.PI;
  }, [width, height]);
  
  return (
    <div ref={ref}>
      <p>Calculated value: {expensiveCalculation}</p>
    </div>
  );
}
```

### Conditional Updates

```tsx
import { useElementSize } from '@mantine/hooks';
import { useEffect, useState } from 'react';

function ConditionalUpdate() {
  const { ref, width, height } = useElementSize();
  const [lastUpdate, setLastUpdate] = useState(0);
  
  useEffect(() => {
    // Only update if size change is significant
    const sizeChange = Math.abs(width - lastUpdate);
    if (sizeChange > 50) {
      setLastUpdate(width);
      // Perform expensive operation
    }
  }, [width, height, lastUpdate]);
  
  return <div ref={ref}>Content</div>;
}
```

## Common Patterns

### Size-Based Conditional Rendering

```tsx
import { useElementSize } from '@mantine/hooks';
import { Group, Stack } from '@mantine/core';

function AdaptiveLayout() {
  const { ref, width } = useElementSize();
  
  const isMobile = width < 768;
  const isTablet = width >= 768 && width < 1024;
  const isDesktop = width >= 1024;
  
  return (
    <div ref={ref}>
      {isMobile && <Stack>Mobile Layout</Stack>}
      {isTablet && <Group>Tablet Layout</Group>}
      {isDesktop && <Group>Desktop Layout</Group>}
    </div>
  );
}
```

### Size Tracking with History

```tsx
import { useElementSize } from '@mantine/hooks';
import { useEffect, useState } from 'react';

function SizeTracker() {
  const { ref, width, height } = useElementSize();
  const [sizeHistory, setSizeHistory] = useState([]);
  
  useEffect(() => {
    setSizeHistory(prev => [...prev, { width, height, timestamp: Date.now() }]);
  }, [width, height]);
  
  return (
    <div ref={ref}>
      <p>Current: {width} × {height}</p>
      <p>History entries: {sizeHistory.length}</p>
    </div>
  );
}
```

## Integration with Other Hooks

### Combined with useMediaQuery

```tsx
import { useElementSize } from '@mantine/hooks';
import { useMediaQuery } from '@mantine/hooks';

function ResponsiveComponent() {
  const { ref, width, height } = useElementSize();
  const isLargeScreen = useMediaQuery('(min-width: 1024px)');
  
  const effectiveWidth = isLargeScreen ? width : Math.min(width, 400);
  
  return (
    <div ref={ref} style={{ width: effectiveWidth }}>
      Responsive content
    </div>
  );
}
```

### Combined with useDebouncedValue

```tsx
import { useElementSize } from '@mantine/hooks';
import { useDebouncedValue } from '@mantine/hooks';

function DebouncedResize() {
  const { ref, width, height } = useElementSize();
  const [debouncedWidth] = useDebouncedValue(width, 100);
  
  return (
    <div ref={ref}>
      <p>Current width: {width}</p>
      <p>Debounced width: {debouncedWidth}</p>
    </div>
  );
}
```

## Troubleshooting

### Common Issues

1. **Zero Dimensions on First Render**
   - This is expected behavior during SSR
   - Dimensions will update after component mounts
   - Use conditional rendering if needed

2. **ResizeObserver Not Supported**
   - The hook gracefully handles unsupported browsers
   - Consider polyfills for older browsers
   - Fallback to manual event listeners if needed

3. **Performance Issues**
   - Use `useMemo` for expensive calculations
   - Implement debouncing for frequent updates
   - Consider using `useDebouncedValue` hook

### Debug Information

```tsx
import { useElementSize } from '@mantine/hooks';

function DebugElementSize() {
  const { ref, width, height } = useElementSize();
  
  console.log('Element size:', { width, height });
  console.log('ResizeObserver supported:', typeof ResizeObserver !== 'undefined');
  
  return (
    <div ref={ref} style={{ padding: '20px', border: '1px solid #ccc' }}>
      <p>Width: {width}px</p>
      <p>Height: {height}px</p>
    </div>
  );
}
```

## Browser Support

- **Modern Browsers**: Full support with ResizeObserver API
- **Legacy Browsers**: Graceful degradation
- **Server-Side**: Safe SSR support

## Related Hooks

- `use-resize-observer` - More advanced resize observation
- `use-viewport-size` - Viewport size tracking
- `use-media-query` - Media query detection
- `use-debounced-value` - Debounced value updates

## Best Practices

1. **Use for Layout Calculations**: Perfect for responsive layouts and dynamic sizing
2. **Combine with Debouncing**: Use `useDebouncedValue` for performance optimization
3. **TypeScript Support**: Always specify element types for better type safety
4. **SSR Considerations**: Handle zero dimensions during server-side rendering
5. **Performance**: Memoize expensive calculations based on dimensions

---

*The `use-element-size` hook is essential for creating responsive, dynamic components that need to adapt to size changes. It provides a clean, performant solution for element dimension tracking using the modern ResizeObserver API.*
