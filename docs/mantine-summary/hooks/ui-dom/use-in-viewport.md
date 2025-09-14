# use-in-viewport Hook

## Overview

The `use-in-viewport` hook detects if an element is visible in the viewport. This hook is a simpler alternative to `use-intersection` that focuses specifically on viewport visibility detection. It's perfect for implementing lazy loading, scroll animations, analytics tracking, and other viewport-based interactions.

## Installation

```bash
npm install @mantine/hooks
```

## Import

```typescript
import { useInViewport } from '@mantine/hooks';
import type { UseInViewportReturnValue } from '@mantine/hooks';
```

## Basic Usage

```tsx
import { Box, Text } from '@mantine/core';
import { useInViewport } from '@mantine/hooks';

function Demo() {
  const { ref, inViewport } = useInViewport();
  
  return (
    <>
      <Text ta="center">{inViewport ? 'Box is visible' : 'Scroll to see box'}</Text>
      <Box h={64} style={{ overflow: 'scroll' }}>
        <Box h={128}></Box>
        <Box ref={ref} bg="blue" h={32} p={8}>
          <Text ta="center" c="white">
            A box
          </Text>
        </Box>
      </Box>
    </>
  );
}
```

## API Reference

### Return Value

| Property | Type | Description |
|----------|------|-------------|
| `inViewport` | `boolean` | Whether the element is currently visible in the viewport |
| `ref` | `React.RefCallback<T \| null>` | Ref callback that must be assigned to the target element |

### Type Definition

```typescript
interface UseInViewportReturnValue<T extends HTMLElement = any> {
  inViewport: boolean;
  ref: React.RefCallback<T | null>;
}

function useInViewport<T extends HTMLElement = any>(): UseInViewportReturnValue<T>;
```

## Key Features

### 1. **Simple Viewport Detection**
- Clean, intuitive API for viewport visibility
- Automatic intersection observer management
- No manual cleanup required

### 2. **Performance Optimized**
- Uses Intersection Observer API for efficient detection
- Minimal re-renders
- Automatic cleanup on unmount

### 3. **TypeScript Support**
- Full TypeScript support with generic type parameter
- Type-safe ref assignment
- Proper type inference for element types

## Advanced Usage

### TypeScript with Specific Element Type

```tsx
import { useInViewport } from '@mantine/hooks';
import { Box, Text } from '@mantine/core';

function TypedInViewport() {
  const { ref, inViewport } = useInViewport<HTMLDivElement>();

  return (
    <Box
      ref={ref}
      p="md"
      style={{
        backgroundColor: inViewport ? '#e8f5e8' : '#f5f5f5',
        border: inViewport ? '2px solid #4caf50' : '1px solid #e0e0e0',
        transition: 'all 0.3s ease'
      }}
    >
      <Text>
        {inViewport ? 'I am visible in the viewport!' : 'Scroll to see me'}
      </Text>
    </Box>
  );
}
```

### Multiple Viewport Elements

```tsx
import { useInViewport } from '@mantine/hooks';
import { Box, Text, Stack } from '@mantine/core';

function MultipleInViewport() {
  const { ref: ref1, inViewport: inViewport1 } = useInViewport();
  const { ref: ref2, inViewport: inViewport2 } = useInViewport();
  const { ref: ref3, inViewport: inViewport3 } = useInViewport();

  return (
    <Stack spacing="xl">
      <Box
        ref={ref1}
        p="md"
        style={{
          backgroundColor: inViewport1 ? '#e3f2fd' : '#f5f5f5',
          transition: 'background-color 0.3s ease'
        }}
      >
        <Text>Element 1: {inViewport1 ? 'Visible' : 'Not visible'}</Text>
      </Box>

      <Box
        ref={ref2}
        p="md"
        style={{
          backgroundColor: inViewport2 ? '#e8f5e8' : '#f5f5f5',
          transition: 'background-color 0.3s ease'
        }}
      >
        <Text>Element 2: {inViewport2 ? 'Visible' : 'Not visible'}</Text>
      </Box>

      <Box
        ref={ref3}
        p="md"
        style={{
          backgroundColor: inViewport3 ? '#fff3e0' : '#f5f5f5',
          transition: 'background-color 0.3s ease'
        }}
      >
        <Text>Element 3: {inViewport3 ? 'Visible' : 'Not visible'}</Text>
      </Box>
    </Stack>
  );
}
```

## Use Cases

### 1. **Lazy Loading Images**

```tsx
import { useInViewport } from '@mantine/hooks';
import { Image, Box, Text, Skeleton } from '@mantine/core';
import { useState } from 'react';

function LazyImage({ src, alt }: { src: string; alt: string }) {
  const { ref, inViewport } = useInViewport();
  const [loaded, setLoaded] = useState(false);

  return (
    <Box ref={ref} style={{ minHeight: '200px' }}>
      {inViewport ? (
        <Image
          src={src}
          alt={alt}
          onLoad={() => setLoaded(true)}
          style={{
            opacity: loaded ? 1 : 0,
            transition: 'opacity 0.3s ease'
          }}
        />
      ) : (
        <Skeleton height={200} />
      )}
    </Box>
  );
}

function LazyImageGallery() {
  const images = [
    { src: 'https://example.com/image1.jpg', alt: 'Image 1' },
    { src: 'https://example.com/image2.jpg', alt: 'Image 2' },
    { src: 'https://example.com/image3.jpg', alt: 'Image 3' },
  ];

  return (
    <div>
      {images.map((image, index) => (
        <LazyImage key={index} src={image.src} alt={image.alt} />
      ))}
    </div>
  );
}
```

### 2. **Scroll Animations**

```tsx
import { useInViewport } from '@mantine/hooks';
import { Box, Text, Stack } from '@mantine/core';

function ScrollAnimation() {
  const { ref, inViewport } = useInViewport();

  return (
    <Box
      ref={ref}
      p="xl"
      style={{
        transform: inViewport ? 'translateY(0)' : 'translateY(50px)',
        opacity: inViewport ? 1 : 0,
        transition: 'all 0.6s ease'
      }}
    >
      <Text size="xl" weight="bold" mb="md">
        Animated Content
      </Text>
      <Text>
        This content animates into view when it becomes visible in the viewport.
      </Text>
    </Box>
  );
}

function ScrollAnimationDemo() {
  return (
    <Stack spacing="xl">
      <Box h={500} p="md" bg="gray.1">
        <Text>Scroll down to see animations</Text>
      </Box>
      
      <ScrollAnimation />
      
      <Box h={500} p="md" bg="gray.1">
        <Text>More content</Text>
      </Box>
      
      <ScrollAnimation />
      
      <Box h={500} p="md" bg="gray.1">
        <Text>Even more content</Text>
      </Box>
    </Stack>
  );
}
```

### 3. **Analytics Tracking**

```tsx
import { useInViewport } from '@mantine/hooks';
import { Box, Text } from '@mantine/core';
import { useEffect, useState } from 'react';

function AnalyticsTracking() {
  const { ref, inViewport } = useInViewport();
  const [tracked, setTracked] = useState(false);

  useEffect(() => {
    if (inViewport && !tracked) {
      // Track view event
      console.log('Element viewed:', new Date().toISOString());
      setTracked(true);
    }
  }, [inViewport, tracked]);

  return (
    <Box
      ref={ref}
      p="md"
      style={{
        backgroundColor: tracked ? '#e8f5e8' : '#f5f5f5',
        border: tracked ? '2px solid #4caf50' : '1px solid #e0e0e0',
        transition: 'all 0.3s ease'
      }}
    >
      <Text>
        {tracked ? 'View tracked!' : 'Scroll to track view'}
      </Text>
    </Box>
  );
}
```

### 4. **Progressive Content Loading**

```tsx
import { useInViewport } from '@mantine/hooks';
import { Box, Text, Button, Stack } from '@mantine/core';
import { useState } from 'react';

function ProgressiveContent() {
  const { ref, inViewport } = useInViewport();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (inViewport && !loaded) {
      // Simulate loading delay
      setTimeout(() => {
        setLoaded(true);
      }, 1000);
    }
  }, [inViewport, loaded]);

  return (
    <Box ref={ref} p="md" style={{ minHeight: '200px' }}>
      {inViewport ? (
        loaded ? (
          <Stack>
            <Text>Content loaded!</Text>
            <Button>Action Button</Button>
            <Text size="sm" color="dimmed">
              This content was loaded when it became visible
            </Text>
          </Stack>
        ) : (
          <Text>Loading content...</Text>
        )
      ) : (
        <Text color="dimmed">Scroll to load content</Text>
      )}
    </Box>
  );
}
```

### 5. **Sticky Navigation**

```tsx
import { useInViewport } from '@mantine/hooks';
import { Box, Text, Button, Group } from '@mantine/core';
import { useState } from 'react';

function StickyNavigation() {
  const { ref, inViewport } = useInViewport();
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    setIsSticky(!inViewport);
  }, [inViewport]);

  return (
    <div>
      <Box
        ref={ref}
        p="md"
        style={{
          backgroundColor: '#f8f9fa',
          borderBottom: '1px solid #e0e0e0'
        }}
      >
        <Text>This is the trigger element</Text>
      </Box>

      <Box
        style={{
          position: isSticky ? 'fixed' : 'static',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          backgroundColor: '#ffffff',
          borderBottom: '1px solid #e0e0e0',
          padding: '16px',
          transition: 'all 0.3s ease'
        }}
      >
        <Group>
          <Text weight="bold">Sticky Navigation</Text>
          <Button size="sm">Home</Button>
          <Button size="sm" variant="outline">About</Button>
          <Button size="sm" variant="outline">Contact</Button>
        </Group>
      </Box>

      <Box p="md">
        <Text>Main content goes here...</Text>
      </Box>
    </div>
  );
}
```

### 6. **Infinite Scroll**

```tsx
import { useInViewport } from '@mantine/hooks';
import { Box, Text, Button, Stack } from '@mantine/core';
import { useState, useEffect } from 'react';

function InfiniteScroll() {
  const { ref, inViewport } = useInViewport();
  const [items, setItems] = useState(Array.from({ length: 10 }, (_, i) => i + 1));
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (inViewport && !loading) {
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
  }, [inViewport, loading]);

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

## Performance Considerations

### Memoized Components

```tsx
import { useInViewport } from '@mantine/hooks';
import { memo } from 'react';
import { Box, Text } from '@mantine/core';

const ViewportItem = memo(function ViewportItem({ 
  index, 
  inViewport 
}: { 
  index: number; 
  inViewport: boolean; 
}) {
  return (
    <Box
      p="md"
      style={{
        backgroundColor: inViewport ? '#e8f5e8' : '#f5f5f5',
        transition: 'background-color 0.3s ease'
      }}
    >
      <Text>Item {index}: {inViewport ? 'Visible' : 'Not visible'}</Text>
    </Box>
  );
});

function OptimizedViewport() {
  const { ref, inViewport } = useInViewport();

  return (
    <Box ref={ref}>
      <ViewportItem index={1} inViewport={inViewport} />
    </Box>
  );
}
```

### Conditional Rendering

```tsx
import { useInViewport } from '@mantine/hooks';
import { Box, Text } from '@mantine/core';

function ConditionalViewport() {
  const { ref, inViewport } = useInViewport();

  return (
    <Box ref={ref} p="md">
      {inViewport ? (
        <div>
          <Text weight="bold">Content is visible!</Text>
          <Text>This content only renders when in viewport</Text>
        </div>
      ) : (
        <Text color="dimmed">Scroll to see content</Text>
      )}
    </Box>
  );
}
```

## Common Patterns

### Viewport with State Management

```tsx
import { useInViewport } from '@mantine/hooks';
import { Box, Text, Button } from '@mantine/core';
import { useState, useEffect } from 'react';

function ViewportWithState() {
  const { ref, inViewport } = useInViewport();
  const [viewCount, setViewCount] = useState(0);

  useEffect(() => {
    if (inViewport) {
      setViewCount(prev => prev + 1);
    }
  }, [inViewport]);

  return (
    <Box
      ref={ref}
      p="md"
      style={{
        backgroundColor: inViewport ? '#e3f2fd' : '#f5f5f5',
        transition: 'background-color 0.3s ease'
      }}
    >
      <Text>View count: {viewCount}</Text>
      <Text>{inViewport ? 'Currently visible' : 'Not visible'}</Text>
    </Box>
  );
}
```

### Viewport with Animation

```tsx
import { useInViewport } from '@mantine/hooks';
import { Box, Text } from '@mantine/core';

function AnimatedViewport() {
  const { ref, inViewport } = useInViewport();

  return (
    <Box
      ref={ref}
      p="xl"
      style={{
        transform: inViewport 
          ? 'translateX(0) scale(1)' 
          : 'translateX(-100px) scale(0.9)',
        opacity: inViewport ? 1 : 0,
        transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)'
      }}
    >
      <Text size="xl" weight="bold">
        Animated Content
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
import { useInViewport, useDisclosure } from '@mantine/hooks';
import { Box, Text, Modal, Button } from '@mantine/core';

function ViewportWithModal() {
  const { ref, inViewport } = useInViewport();
  const [opened, { open, close }] = useDisclosure();

  useEffect(() => {
    if (inViewport) {
      open();
    }
  }, [inViewport, open]);

  return (
    <div>
      <Box ref={ref} p="md" style={{ minHeight: '200px' }}>
        <Text>Scroll to see this element</Text>
      </Box>

      <Modal opened={opened} onClose={close} title="Element in Viewport">
        <Text>This modal opened when the element became visible!</Text>
      </Modal>
    </div>
  );
}
```

### Combined with useLocalStorage

```tsx
import { useInViewport, useLocalStorage } from '@mantine/hooks';
import { Box, Text } from '@mantine/core';

function ViewportWithStorage() {
  const { ref, inViewport } = useInViewport();
  const [viewHistory, setViewHistory] = useLocalStorage({
    key: 'view-history',
    defaultValue: [] as string[]
  });

  useEffect(() => {
    if (inViewport) {
      const timestamp = new Date().toISOString();
      setViewHistory(prev => [...prev, timestamp]);
    }
  }, [inViewport, setViewHistory]);

  return (
    <Box ref={ref} p="md">
      <Text>View history: {viewHistory.length} times</Text>
      <Text>{inViewport ? 'Currently visible' : 'Not visible'}</Text>
    </Box>
  );
}
```

## Troubleshooting

### Common Issues

1. **Viewport Not Detecting**
   - Ensure the ref is properly assigned to the target element
   - Check if the element is visible and has dimensions
   - Verify the element is not hidden or positioned off-screen

2. **Performance Issues**
   - Use `memo` for components with viewport detection
   - Avoid expensive calculations in viewport effects
   - Consider using `useCallback` for event handlers

3. **Mobile Issues**
   - Test on actual mobile devices
   - Consider touch scrolling behavior
   - Check viewport meta tag settings

### Debug Information

```tsx
import { useInViewport } from '@mantine/hooks';
import { Box, Text, Paper } from '@mantine/core';

function DebugViewport() {
  const { ref, inViewport } = useInViewport();

  return (
    <div>
      <Box
        ref={ref}
        p="md"
        style={{
          backgroundColor: inViewport ? '#e8f5e8' : '#f5f5f5',
          transition: 'background-color 0.3s ease'
        }}
      >
        <Text>Viewport Debug</Text>
      </Box>

      <Paper p="md" mt="md" style={{ backgroundColor: '#f8f9fa' }}>
        <Text size="sm" weight="bold">Debug Info:</Text>
        <Text size="sm">In Viewport: {inViewport ? 'Yes' : 'No'}</Text>
        <Text size="sm">Element: {ref ? 'Ref assigned' : 'No ref'}</Text>
      </Paper>
    </div>
  );
}
```

## Browser Support

- **Modern Browsers**: Full support with Intersection Observer API
- **Legacy Browsers**: Graceful degradation
- **Mobile Browsers**: Full support
- **Server-Side**: Safe to use (no-op during SSR)

## Related Hooks

- `use-intersection` - More advanced intersection observer functionality
- `use-element-size` - For tracking element dimensions
- `use-scroll-into-view` - For scrolling elements into view
- `use-disclosure` - For modal/overlay state management

## Best Practices

1. **Use for Performance**: Perfect for lazy loading and performance optimization
2. **Consider Mobile**: Test on mobile devices for touch scrolling
3. **Debounce Effects**: Use debouncing for expensive viewport effects
4. **Accessibility**: Ensure viewport effects don't interfere with screen readers
5. **Testing**: Test viewport detection across different screen sizes

---

*The `use-in-viewport` hook provides a simple, efficient way to detect when elements become visible in the viewport. It's perfect for implementing lazy loading, scroll animations, analytics tracking, and other viewport-based interactions.*
