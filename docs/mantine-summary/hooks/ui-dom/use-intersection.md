# use-intersection Hook

## Overview

The `use-intersection` hook detects if a given element is visible in the viewport or another element using the Intersection Observer API. This hook provides detailed intersection information including visibility ratios, bounding rectangles, and intersection states, making it perfect for advanced scroll-based interactions, lazy loading, and performance optimizations.

## Installation

```bash
npm install @mantine/hooks
```

## Import

```typescript
import { useIntersection } from '@mantine/hooks';
import type { UseIntersectionReturnValue } from '@mantine/hooks';
```

## Basic Usage

```tsx
import { useRef } from 'react';
import { useIntersection } from '@mantine/hooks';
import { Text, Paper, Box } from '@mantine/core';

function Demo() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { ref, entry } = useIntersection({
    root: containerRef.current,
    threshold: 1,
  });

  return (
    <Paper ref={containerRef} h={300} style={{ overflowY: 'scroll' }}>
      <Box pt={260} pb={280}>
        <Paper
          ref={ref}
          p="xl"
          style={{
            backgroundColor: entry?.isIntersecting
              ? 'var(--mantine-color-teal-7)'
              : 'var(--mantine-color-red-7)',
            minWidth: '50%',
          }}
        >
          <Text c="#fff" fw={700}>
            {entry?.isIntersecting ? 'Fully visible' : 'Obscured'}
          </Text>
        </Paper>
      </Box>
    </Paper>
  );
}
```

## API Reference

### Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `options` | `IntersectionObserverInit` | `{}` | **Optional.** Intersection Observer configuration options |

### IntersectionObserverInit Options

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `root` | `Element \| null` | `null` | Element used as viewport for checking visibility |
| `rootMargin` | `string` | `'0px'` | Margin around the root element |
| `threshold` | `number \| number[]` | `0` | Ratio of intersection area to trigger callback |

### Return Value

| Property | Type | Description |
|----------|------|-------------|
| `ref` | `React.RefCallback<T \| null>` | Ref callback that must be assigned to the target element |
| `entry` | `IntersectionObserverEntry \| null` | Latest intersection observer entry |

### Type Definition

```typescript
interface UseIntersectionReturnValue<T> {
  ref: React.RefCallback<T | null>;
  entry: IntersectionObserverEntry | null;
}

function useIntersection<T extends HTMLElement = any>(
  options?: IntersectionObserverInit,
): UseIntersectionReturnValue<T>;
```

## Key Features

### 1. **Advanced Intersection Detection**
- Detailed intersection information via `IntersectionObserverEntry`
- Visibility ratios and bounding rectangles
- Precise control over intersection thresholds

### 2. **Flexible Root Elements**
- Can observe against any element, not just viewport
- Custom scroll containers support
- Nested intersection detection

### 3. **Performance Optimized**
- Uses native Intersection Observer API
- Efficient event handling
- Automatic cleanup on unmount

## Advanced Usage

### Custom Root Element

```tsx
import { useRef } from 'react';
import { useIntersection } from '@mantine/hooks';
import { Paper, Box, Text } from '@mantine/core';

function CustomRootIntersection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { ref, entry } = useIntersection({
    root: containerRef.current,
    threshold: 0.5,
    rootMargin: '10px'
  });

  return (
    <Paper ref={containerRef} h={400} style={{ overflow: 'auto' }}>
      <Box p="xl">
        <Text mb="md">Scroll container</Text>
        <Box h={300} />
        <Paper
          ref={ref}
          p="md"
          style={{
            backgroundColor: entry?.isIntersecting ? '#4caf50' : '#f44336',
            color: 'white'
          }}
        >
          <Text>
            {entry?.isIntersecting ? 'Visible in container' : 'Not visible'}
          </Text>
          <Text size="sm">
            Intersection ratio: {entry?.intersectionRatio?.toFixed(2) || 0}
          </Text>
        </Paper>
      </Box>
    </Paper>
  );
}
```

### Multiple Thresholds

```tsx
import { useIntersection } from '@mantine/hooks';
import { Paper, Text, Box } from '@mantine/core';

function MultipleThresholds() {
  const { ref, entry } = useIntersection({
    threshold: [0, 0.25, 0.5, 0.75, 1.0]
  });

  const getVisibilityLevel = () => {
    if (!entry) return 'Unknown';
    const ratio = entry.intersectionRatio;
    if (ratio >= 1) return 'Fully visible';
    if (ratio >= 0.75) return 'Mostly visible';
    if (ratio >= 0.5) return 'Half visible';
    if (ratio >= 0.25) return 'Partially visible';
    if (ratio > 0) return 'Barely visible';
    return 'Not visible';
  };

  return (
    <Box h={500} p="xl">
      <Box h={200} />
      <Paper
        ref={ref}
        p="xl"
        style={{
          backgroundColor: entry?.isIntersecting ? '#2196f3' : '#9e9e9e',
          color: 'white',
          transition: 'background-color 0.3s ease'
        }}
      >
        <Text size="lg" weight="bold">
          {getVisibilityLevel()}
        </Text>
        <Text size="sm">
          Ratio: {entry?.intersectionRatio?.toFixed(2) || 0}
        </Text>
      </Paper>
    </Box>
  );
}
```

### Root Margin Configuration

```tsx
import { useIntersection } from '@mantine/hooks';
import { Paper, Text, Box } from '@mantine/core';

function RootMarginIntersection() {
  const { ref, entry } = useIntersection({
    rootMargin: '50px 0px 50px 0px', // 50px top and bottom margin
    threshold: 0.1
  });

  return (
    <Box h={600} p="xl">
      <Box h={200} />
      <Paper
        ref={ref}
        p="xl"
        style={{
          backgroundColor: entry?.isIntersecting ? '#ff9800' : '#607d8b',
          color: 'white',
          transition: 'background-color 0.3s ease'
        }}
      >
        <Text size="lg" weight="bold">
          {entry?.isIntersecting ? 'Triggered with margin' : 'Not triggered'}
        </Text>
        <Text size="sm">
          Root margin: 50px top/bottom
        </Text>
      </Paper>
    </Box>
  );
}
```

## Use Cases

### 1. **Advanced Lazy Loading**

```tsx
import { useIntersection } from '@mantine/hooks';
import { Image, Box, Skeleton, Text } from '@mantine/core';
import { useState, useEffect } from 'react';

function AdvancedLazyImage({ src, alt }: { src: string; alt: string }) {
  const { ref, entry } = useIntersection({
    threshold: 0.1,
    rootMargin: '50px'
  });
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (entry?.isIntersecting && !loaded && !error) {
      const img = new Image();
      img.onload = () => setLoaded(true);
      img.onerror = () => setError(true);
      img.src = src;
    }
  }, [entry?.isIntersecting, src, loaded, error]);

  return (
    <Box ref={ref} style={{ minHeight: '200px' }}>
      {entry?.isIntersecting ? (
        loaded ? (
          <Image src={src} alt={alt} />
        ) : error ? (
          <Text color="red">Failed to load image</Text>
        ) : (
          <Skeleton height={200} />
        )
      ) : (
        <Skeleton height={200} />
      )}
    </Box>
  );
}
```

### 2. **Scroll Progress Indicator**

```tsx
import { useIntersection } from '@mantine/hooks';
import { Box, Text, Progress } from '@mantine/core';
import { useState, useEffect } from 'react';

function ScrollProgress() {
  const { ref, entry } = useIntersection({
    threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0]
  });
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (entry) {
      setProgress(entry.intersectionRatio * 100);
    }
  }, [entry]);

  return (
    <Box>
      <Box h={500} p="xl">
        <Text>Scroll down to see progress</Text>
      </Box>
      
      <Box ref={ref} p="xl" style={{ minHeight: '200px' }}>
        <Text size="lg" weight="bold" mb="md">
          Progress Indicator
        </Text>
        <Progress value={progress} size="lg" />
        <Text size="sm" mt="sm">
          Visibility: {progress.toFixed(1)}%
        </Text>
      </Box>
      
      <Box h={500} p="xl">
        <Text>More content below</Text>
      </Box>
    </Box>
  );
}
```

### 3. **Staggered Animations**

```tsx
import { useIntersection } from '@mantine/hooks';
import { Box, Text, Stack } from '@mantine/core';

function StaggeredAnimation({ index }: { index: number }) {
  const { ref, entry } = useIntersection({
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  return (
    <Box
      ref={ref}
      p="xl"
      style={{
        transform: entry?.isIntersecting 
          ? 'translateY(0) scale(1)' 
          : 'translateY(50px) scale(0.95)',
        opacity: entry?.isIntersecting ? 1 : 0,
        transition: `all 0.6s ease ${index * 0.1}s`
      }}
    >
      <Text size="lg" weight="bold">
        Animated Item {index + 1}
      </Text>
      <Text>
        This item animates with a staggered delay
      </Text>
    </Box>
  );
}

function StaggeredAnimations() {
  return (
    <Stack spacing="xl">
      {Array.from({ length: 5 }, (_, i) => (
        <StaggeredAnimation key={i} index={i} />
      ))}
    </Stack>
  );
}
```

### 4. **Infinite Scroll with Intersection**

```tsx
import { useIntersection } from '@mantine/hooks';
import { Box, Text, Button, Stack } from '@mantine/core';
import { useState, useEffect } from 'react';

function InfiniteScrollWithIntersection() {
  const { ref, entry } = useIntersection({
    threshold: 0.1,
    rootMargin: '100px'
  });
  const [items, setItems] = useState(Array.from({ length: 10 }, (_, i) => i + 1));
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (entry?.isIntersecting && !loading) {
      setLoading(true);
      // Simulate API call
      setTimeout(() => {
        setItems(prev => [
          ...prev,
          ...Array.from({ length: 10 }, (_, i) => prev.length + i + 1)
        ]);
        setLoading(false);
      }, 1000);
    }
  }, [entry?.isIntersecting, loading]);

  return (
    <div>
      <Stack spacing="md">
        {items.map((item) => (
          <Box
            key={item}
            p="md"
            style={{
              backgroundColor: '#f8f9fa',
              border: '1px solid #e0e0e0',
              borderRadius: '4px'
            }}
          >
            <Text>Item {item}</Text>
          </Box>
        ))}
      </Stack>

      <Box ref={ref} p="md" ta="center">
        {loading ? (
          <Text>Loading more items...</Text>
        ) : (
          <Text color="dimmed">Scroll to load more</Text>
        )}
      </Box>
    </div>
  );
}
```

### 5. **Parallax Scrolling**

```tsx
import { useIntersection } from '@mantine/hooks';
import { Box, Text } from '@mantine/core';
import { useState, useEffect } from 'react';

function ParallaxSection() {
  const { ref, entry } = useIntersection({
    threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0]
  });
  const [parallaxOffset, setParallaxOffset] = useState(0);

  useEffect(() => {
    if (entry) {
      const ratio = entry.intersectionRatio;
      setParallaxOffset(ratio * 100);
    }
  }, [entry]);

  return (
    <Box
      ref={ref}
      h={600}
      style={{
        background: `linear-gradient(45deg, #ff6b6b, #4ecdc4)`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <Text
        size="xl"
        weight="bold"
        c="white"
        style={{
          transform: `translateY(${parallaxOffset}px)`,
          transition: 'transform 0.1s ease'
        }}
      >
        Parallax Text
      </Text>
    </Box>
  );
}
```

### 6. **Analytics with Detailed Tracking**

```tsx
import { useIntersection } from '@mantine/hooks';
import { Box, Text, Paper } from '@mantine/core';
import { useState, useEffect } from 'react';

function AnalyticsTracking() {
  const { ref, entry } = useIntersection({
    threshold: [0, 0.25, 0.5, 0.75, 1.0]
  });
  const [analytics, setAnalytics] = useState({
    viewCount: 0,
    maxVisibility: 0,
    timeVisible: 0
  });

  useEffect(() => {
    if (entry) {
      const newAnalytics = {
        viewCount: analytics.viewCount + (entry.isIntersecting ? 1 : 0),
        maxVisibility: Math.max(analytics.maxVisibility, entry.intersectionRatio),
        timeVisible: analytics.timeVisible + (entry.isIntersecting ? 0.1 : 0)
      };
      setAnalytics(newAnalytics);
    }
  }, [entry]);

  return (
    <Box ref={ref} p="xl">
      <Paper p="md" style={{ backgroundColor: '#f8f9fa' }}>
        <Text size="lg" weight="bold" mb="md">
          Analytics Tracking
        </Text>
        <Text size="sm">View count: {analytics.viewCount}</Text>
        <Text size="sm">Max visibility: {(analytics.maxVisibility * 100).toFixed(1)}%</Text>
        <Text size="sm">Time visible: {analytics.timeVisible.toFixed(1)}s</Text>
        <Text size="sm">Current ratio: {entry?.intersectionRatio?.toFixed(2) || 0}</Text>
      </Paper>
    </Box>
  );
}
```

## Performance Considerations

### Memoized Intersection Components

```tsx
import { useIntersection } from '@mantine/hooks';
import { memo } from 'react';
import { Box, Text } from '@mantine/core';

const IntersectionItem = memo(function IntersectionItem({ 
  index, 
  entry 
}: { 
  index: number; 
  entry: IntersectionObserverEntry | null; 
}) {
  return (
    <Box
      p="md"
      style={{
        backgroundColor: entry?.isIntersecting ? '#e8f5e8' : '#f5f5f5',
        transform: entry?.isIntersecting ? 'scale(1.02)' : 'scale(1)',
        transition: 'all 0.3s ease'
      }}
    >
      <Text>Item {index}: {entry?.isIntersecting ? 'Visible' : 'Hidden'}</Text>
    </Box>
  );
});

function OptimizedIntersection() {
  const { ref, entry } = useIntersection();

  return (
    <Box ref={ref}>
      <IntersectionItem index={1} entry={entry} />
    </Box>
  );
}
```

### Conditional Intersection

```tsx
import { useIntersection } from '@mantine/hooks';
import { Box, Text, Switch } from '@mantine/core';
import { useState } from 'react';

function ConditionalIntersection() {
  const [enabled, setEnabled] = useState(true);
  const { ref, entry } = useIntersection({
    threshold: enabled ? 0.5 : 0
  });

  return (
    <div>
      <Switch
        label="Enable intersection detection"
        checked={enabled}
        onChange={(event) => setEnabled(event.currentTarget.checked)}
        mb="md"
      />
      
      <Box
        ref={ref}
        p="xl"
        style={{
          backgroundColor: entry?.isIntersecting ? '#4caf50' : '#f44336',
          color: 'white',
          transition: 'background-color 0.3s ease'
        }}
      >
        <Text>
          {enabled 
            ? (entry?.isIntersecting ? 'Visible' : 'Not visible')
            : 'Detection disabled'
          }
        </Text>
      </Box>
    </div>
  );
}
```

## Common Patterns

### Intersection with State Management

```tsx
import { useIntersection } from '@mantine/hooks';
import { Box, Text } from '@mantine/core';
import { useState, useEffect } from 'react';

function IntersectionWithState() {
  const { ref, entry } = useIntersection({
    threshold: 0.5
  });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (entry) {
      setIsVisible(entry.isIntersecting);
    }
  }, [entry]);

  return (
    <Box
      ref={ref}
      p="xl"
      style={{
        backgroundColor: isVisible ? '#e3f2fd' : '#f5f5f5',
        transition: 'background-color 0.3s ease'
      }}
    >
      <Text>Visibility state: {isVisible ? 'Visible' : 'Hidden'}</Text>
      <Text size="sm">Intersection ratio: {entry?.intersectionRatio?.toFixed(2) || 0}</Text>
    </Box>
  );
}
```

### Intersection with Animation

```tsx
import { useIntersection } from '@mantine/hooks';
import { Box, Text } from '@mantine/core';

function AnimatedIntersection() {
  const { ref, entry } = useIntersection({
    threshold: 0.1
  });

  return (
    <Box
      ref={ref}
      p="xl"
      style={{
        transform: entry?.isIntersecting 
          ? 'translateX(0) rotate(0deg)' 
          : 'translateX(-100px) rotate(-5deg)',
        opacity: entry?.isIntersecting ? 1 : 0,
        transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)'
      }}
    >
      <Text size="xl" weight="bold">
        Animated on Intersection
      </Text>
      <Text>
        This content slides in from the left when it becomes visible
      </Text>
    </Box>
  );
}
```

## Integration with Other Hooks

### Combined with useDisclosure

```tsx
import { useIntersection, useDisclosure } from '@mantine/hooks';
import { Box, Text, Modal } from '@mantine/core';

function IntersectionWithModal() {
  const { ref, entry } = useIntersection({
    threshold: 0.5
  });
  const [opened, { open, close }] = useDisclosure();

  useEffect(() => {
    if (entry?.isIntersecting) {
      open();
    }
  }, [entry?.isIntersecting, open]);

  return (
    <div>
      <Box ref={ref} p="xl" style={{ minHeight: '200px' }}>
        <Text>This element triggers a modal when 50% visible</Text>
      </Box>

      <Modal opened={opened} onClose={close} title="Intersection Modal">
        <Text>This modal opened when the element became visible!</Text>
      </Modal>
    </div>
  );
}
```

### Combined with useLocalStorage

```tsx
import { useIntersection, useLocalStorage } from '@mantine/hooks';
import { Box, Text } from '@mantine/core';

function IntersectionWithStorage() {
  const { ref, entry } = useIntersection();
  const [intersectionHistory, setIntersectionHistory] = useLocalStorage({
    key: 'intersection-history',
    defaultValue: [] as Array<{ timestamp: string; ratio: number }>
  });

  useEffect(() => {
    if (entry) {
      const record = {
        timestamp: new Date().toISOString(),
        ratio: entry.intersectionRatio
      };
      setIntersectionHistory(prev => [...prev, record]);
    }
  }, [entry, setIntersectionHistory]);

  return (
    <Box ref={ref} p="xl">
      <Text>Intersection history: {intersectionHistory.length} records</Text>
      <Text>Current ratio: {entry?.intersectionRatio?.toFixed(2) || 0}</Text>
    </Box>
  );
}
```

## Troubleshooting

### Common Issues

1. **Intersection Not Detecting**
   - Ensure the ref is properly assigned to the target element
   - Check if the element has dimensions and is visible
   - Verify the root element is correct

2. **Performance Issues**
   - Use appropriate threshold values
   - Consider using `memo` for expensive components
   - Avoid too many intersection observers

3. **Threshold Issues**
   - Use array of thresholds for multiple triggers
   - Consider rootMargin for earlier triggering
   - Test with different threshold values

### Debug Information

```tsx
import { useIntersection } from '@mantine/hooks';
import { Box, Text, Paper } from '@mantine/core';

function DebugIntersection() {
  const { ref, entry } = useIntersection({
    threshold: [0, 0.25, 0.5, 0.75, 1.0]
  });

  return (
    <div>
      <Box
        ref={ref}
        p="xl"
        style={{
          backgroundColor: entry?.isIntersecting ? '#4caf50' : '#f44336',
          color: 'white',
          transition: 'background-color 0.3s ease'
        }}
      >
        <Text size="lg" weight="bold">
          Debug Intersection
        </Text>
      </Box>

      <Paper p="md" mt="md" style={{ backgroundColor: '#f8f9fa' }}>
        <Text size="sm" weight="bold">Debug Info:</Text>
        <Text size="sm">Is Intersecting: {entry?.isIntersecting ? 'Yes' : 'No'}</Text>
        <Text size="sm">Ratio: {entry?.intersectionRatio?.toFixed(3) || 'N/A'}</Text>
        <Text size="sm">Bounding Rect: {entry?.boundingClientRect ? 'Available' : 'N/A'}</Text>
        <Text size="sm">Root Bounds: {entry?.rootBounds ? 'Available' : 'N/A'}</Text>
        <Text size="sm">Intersection Rect: {entry?.intersectionRect ? 'Available' : 'N/A'}</Text>
      </Paper>
    </div>
  );
}
```

## Browser Support

- **Modern Browsers**: Full support with Intersection Observer API
- **Legacy Browsers**: Requires polyfill for older browsers
- **Mobile Browsers**: Full support
- **Server-Side**: Safe to use (no-op during SSR)

## Related Hooks

- `use-in-viewport` - Simpler viewport visibility detection
- `use-element-size` - For tracking element dimensions
- `use-scroll-into-view` - For scrolling elements into view
- `use-disclosure` - For modal/overlay state management

## Best Practices

1. **Use Appropriate Thresholds**: Choose thresholds that match your use case
2. **Consider Root Margin**: Use rootMargin for earlier triggering
3. **Performance**: Use memoization for expensive intersection effects
4. **Accessibility**: Ensure intersection effects don't interfere with screen readers
5. **Testing**: Test intersection behavior across different screen sizes

---

*The `use-intersection` hook provides advanced intersection detection capabilities using the Intersection Observer API. It's perfect for implementing complex scroll-based interactions, lazy loading, animations, and performance optimizations with detailed visibility information.*
