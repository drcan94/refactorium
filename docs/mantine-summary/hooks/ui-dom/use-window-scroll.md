# use-window-scroll Hook

## Overview

The `use-window-scroll` hook provides a clean way to track window scroll position and programmatically scroll to specific positions. It returns the current scroll coordinates and a function to smoothly scroll to any position, making it perfect for scroll-based animations, navigation, and user interface enhancements.

## Installation

```bash
npm install @mantine/hooks
```

## Import

```typescript
import { useWindowScroll } from '@mantine/hooks';
import type { UseWindowScrollTo, UseWindowScrollPosition, UseWindowScrollReturnValue } from '@mantine/hooks';
```

## Basic Usage

```tsx
import { useWindowScroll } from '@mantine/hooks';
import { Button, Text, Group } from '@mantine/core';

function Demo() {
  const [scroll, scrollTo] = useWindowScroll();

  return (
    <Group justify="center">
      <Text>
        Scroll position x: {scroll.x}, y: {scroll.y}
      </Text>
      <Button onClick={() => scrollTo({ y: 0 })}>Scroll to top</Button>
    </Group>
  );
}
```

## API Reference

### Return Value

| Property | Type | Description |
|----------|------|-------------|
| `scroll` | `UseWindowScrollPosition` | Current scroll position object |
| `scrollTo` | `UseWindowScrollTo` | Function to scroll to specific position |

### UseWindowScrollPosition

| Property | Type | Description |
|----------|------|-------------|
| `x` | `number` | Current horizontal scroll position in pixels |
| `y` | `number` | Current vertical scroll position in pixels |

### UseWindowScrollTo

| Parameter | Type | Description |
|-----------|------|-------------|
| `position` | `Partial<UseWindowScrollPosition>` | Object with x and/or y coordinates to scroll to |

### Type Definitions

```typescript
interface UseWindowScrollPosition {
  x: number;
  y: number;
}

type UseWindowScrollTo = (position: Partial<UseWindowScrollPosition>) => void;
type UseWindowScrollReturnValue = [UseWindowScrollPosition, UseWindowScrollTo];

function useWindowScroll(): UseWindowScrollReturnValue;
```

## Key Features

### 1. **Real-time Scroll Tracking**
- Monitors window scroll position continuously
- Returns current x and y coordinates
- Automatic updates on scroll events

### 2. **Programmatic Scrolling**
- Smooth scrolling to any position
- Partial position updates (x or y only)
- Smooth animation support

### 3. **Performance Optimized**
- Efficient event handling
- Automatic cleanup on unmount
- Minimal re-renders

### 4. **TypeScript Support**
- Full type definitions
- Generic type safety
- IntelliSense support

## Advanced Usage

### Scroll to Specific Positions

```tsx
import { useWindowScroll } from '@mantine/hooks';
import { Button, Text, Group, Stack } from '@mantine/core';

function ScrollPositions() {
  const [scroll, scrollTo] = useWindowScroll();

  return (
    <Stack>
      <Text>Current position: x: {scroll.x}, y: {scroll.y}</Text>
      
      <Group>
        <Button onClick={() => scrollTo({ y: 0 })}>
          Scroll to Top
        </Button>
        <Button onClick={() => scrollTo({ y: 1000 })}>
          Scroll to 1000px
        </Button>
        <Button onClick={() => scrollTo({ x: 0, y: 0 })}>
          Scroll to Origin
        </Button>
        <Button onClick={() => scrollTo({ x: 500, y: 500 })}>
          Scroll to (500, 500)
        </Button>
      </Group>
    </Stack>
  );
}
```

### Scroll Progress Indicator

```tsx
import { useWindowScroll } from '@mantine/hooks';
import { Text, Box, Progress } from '@mantine/core';
import { useState, useEffect } from 'react';

function ScrollProgress() {
  const [scroll, scrollTo] = useWindowScroll();
  const [maxScroll, setMaxScroll] = useState(0);

  useEffect(() => {
    const updateMaxScroll = () => {
      setMaxScroll(
        Math.max(
          document.documentElement.scrollHeight - window.innerHeight,
          0
        )
      );
    };

    updateMaxScroll();
    window.addEventListener('resize', updateMaxScroll);
    return () => window.removeEventListener('resize', updateMaxScroll);
  }, []);

  const scrollProgress = maxScroll > 0 ? (scroll.y / maxScroll) * 100 : 0;

  return (
    <Box>
      <Text size="lg" mb="md">Scroll Progress</Text>
      
      <Progress 
        value={scrollProgress} 
        size="lg" 
        mb="md"
        label={`${Math.round(scrollProgress)}%`}
      />
      
      <Text size="sm" color="dimmed">
        Position: {scroll.y}px / {maxScroll}px
      </Text>
      
      <Button 
        onClick={() => scrollTo({ y: 0 })} 
        mt="md" 
        fullWidth
      >
        Back to Top
      </Button>
    </Box>
  );
}
```

## Use Cases

### 1. **Scroll-to-Top Button**

```tsx
import { useWindowScroll } from '@mantine/hooks';
import { Button, Text, Box, Group } from '@mantine/core';
import { useState, useEffect } from 'react';

function ScrollToTopButton() {
  const [scroll, scrollTo] = useWindowScroll();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(scroll.y > 300);
  }, [scroll.y]);

  return (
    <Box>
      <Text size="lg" mb="md">Scroll to Top Button</Text>
      
      <Box style={{ height: '200vh', padding: '20px' }}>
        <Text>Scroll down to see the button appear</Text>
      </Box>

      {isVisible && (
        <Button
          onClick={() => scrollTo({ y: 0 })}
          style={{
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            zIndex: 1000,
          }}
        >
          ↑ Back to Top
        </Button>
      )}
    </Box>
  );
}
```

### 2. **Scroll-Based Navigation**

```tsx
import { useWindowScroll } from '@mantine/hooks';
import { Text, Box, Group, Button, Paper } from '@mantine/core';
import { useState, useEffect } from 'react';

function ScrollNavigation() {
  const [scroll, scrollTo] = useWindowScroll();
  const [activeSection, setActiveSection] = useState(0);

  const sections = [
    { id: 'section1', title: 'Section 1', y: 0 },
    { id: 'section2', title: 'Section 2', y: 800 },
    { id: 'section3', title: 'Section 3', y: 1600 },
    { id: 'section4', title: 'Section 4', y: 2400 },
  ];

  useEffect(() => {
    const currentSection = sections.findIndex(
      (section, index) => 
        scroll.y >= section.y && 
        (index === sections.length - 1 || scroll.y < sections[index + 1].y)
    );
    
    if (currentSection !== -1) {
      setActiveSection(currentSection);
    }
  }, [scroll.y]);

  return (
    <Box>
      <Paper p="md" style={{ position: 'sticky', top: 0, zIndex: 100 }}>
        <Group>
          {sections.map((section, index) => (
            <Button
              key={section.id}
              variant={activeSection === index ? 'filled' : 'outline'}
              onClick={() => scrollTo({ y: section.y })}
            >
              {section.title}
            </Button>
          ))}
        </Group>
      </Paper>

      {sections.map((section) => (
        <Box
          key={section.id}
          style={{
            height: '800px',
            padding: '40px',
            backgroundColor: `hsl(${section.y / 10}, 70%, 90%)`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Text size="xl" weight="bold">
            {section.title}
          </Text>
        </Box>
      ))}
    </Box>
  );
}
```

### 3. **Scroll-Based Animations**

```tsx
import { useWindowScroll } from '@mantine/hooks';
import { Text, Box, Paper } from '@mantine/core';
import { useState, useEffect } from 'react';

function ScrollAnimations() {
  const [scroll, scrollTo] = useWindowScroll();
  const [opacity, setOpacity] = useState(1);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const scrollProgress = Math.min(scroll.y / maxScroll, 1);
    
    setOpacity(1 - scrollProgress * 0.5);
    setScale(1 - scrollProgress * 0.2);
  }, [scroll.y]);

  return (
    <Box>
      <Text size="lg" mb="md">Scroll-Based Animations</Text>
      
      <Box style={{ height: '200vh' }}>
        <Paper
          p="xl"
          style={{
            position: 'sticky',
            top: '50%',
            transform: `translateY(-50%) scale(${scale})`,
            opacity,
            backgroundColor: '#e3f2fd',
            transition: 'all 0.1s ease',
          }}
        >
          <Text size="xl" ta="center">
            Scroll to see me fade and shrink!
          </Text>
          <Text ta="center" color="dimmed">
            Current scroll: {scroll.y}px
          </Text>
        </Paper>
      </Box>
    </Box>
  );
}
```

### 4. **Infinite Scroll Detection**

```tsx
import { useWindowScroll } from '@mantine/hooks';
import { Text, Box, Paper, Group } from '@mantine/core';
import { useState, useEffect } from 'react';

function InfiniteScroll() {
  const [scroll, scrollTo] = useWindowScroll();
  const [items, setItems] = useState(Array.from({ length: 10 }, (_, i) => i + 1));
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = scroll.y;
      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight = window.innerHeight;

      if (scrollTop + clientHeight >= scrollHeight - 100 && !loading) {
        setLoading(true);
        
        // Simulate API call
        setTimeout(() => {
          setItems(prev => [...prev, ...Array.from({ length: 10 }, (_, i) => prev.length + i + 1)]);
          setLoading(false);
        }, 1000);
      }
    };

    handleScroll();
  }, [scroll.y, loading]);

  return (
    <Box>
      <Text size="lg" mb="md">Infinite Scroll</Text>
      
      {items.map((item) => (
        <Paper key={item} p="md" mb="sm">
          <Text>Item {item}</Text>
        </Paper>
      ))}
      
      {loading && (
        <Paper p="md" style={{ backgroundColor: '#f0f0f0' }}>
          <Text ta="center">Loading more items...</Text>
        </Paper>
      )}
      
      <Text size="sm" color="dimmed" mt="md">
        Scroll position: {scroll.y}px
      </Text>
    </Box>
  );
}
```

### 5. **Scroll Position Memory**

```tsx
import { useWindowScroll } from '@mantine/hooks';
import { Text, Box, Button, Group, Paper } from '@mantine/core';
import { useState, useEffect } from 'react';

function ScrollMemory() {
  const [scroll, scrollTo] = useWindowScroll();
  const [savedPositions, setSavedPositions] = useState<Array<{ name: string; x: number; y: number }>>([]);

  const savePosition = (name: string) => {
    setSavedPositions(prev => [...prev, { name, x: scroll.x, y: scroll.y }]);
  };

  const restorePosition = (position: { x: number; y: number }) => {
    scrollTo(position);
  };

  return (
    <Box>
      <Text size="lg" mb="md">Scroll Position Memory</Text>
      
      <Group mb="md">
        <Button onClick={() => savePosition(`Position ${savedPositions.length + 1}`)}>
          Save Current Position
        </Button>
        <Button onClick={() => scrollTo({ x: 0, y: 0 })}>
          Reset to Top
        </Button>
      </Group>

      <Paper p="md" style={{ backgroundColor: '#f8f9fa' }}>
        <Text weight="bold" mb="xs">Current Position:</Text>
        <Text>x: {scroll.x}, y: {scroll.y}</Text>
      </Paper>

      {savedPositions.length > 0 && (
        <Box mt="md">
          <Text weight="bold" mb="xs">Saved Positions:</Text>
          {savedPositions.map((pos, index) => (
            <Group key={index} mb="xs">
              <Text size="sm">{pos.name}: ({pos.x}, {pos.y})</Text>
              <Button 
                size="xs" 
                onClick={() => restorePosition(pos)}
              >
                Go
              </Button>
            </Group>
          ))}
        </Box>
      )}
    </Box>
  );
}
```

### 6. **Scroll-Based Parallax**

```tsx
import { useWindowScroll } from '@mantine/hooks';
import { Text, Box, Paper } from '@mantine/core';
import { useState, useEffect } from 'react';

function ScrollParallax() {
  const [scroll, scrollTo] = useWindowScroll();
  const [parallaxOffset, setParallaxOffset] = useState(0);

  useEffect(() => {
    setParallaxOffset(scroll.y * 0.5);
  }, [scroll.y]);

  return (
    <Box>
      <Text size="lg" mb="md">Scroll Parallax Effect</Text>
      
      <Box style={{ height: '300vh', position: 'relative' }}>
        <Paper
          p="xl"
          style={{
            position: 'sticky',
            top: '50%',
            transform: `translateY(${parallaxOffset}px)`,
            backgroundColor: '#e3f2fd',
            transition: 'transform 0.1s ease',
          }}
        >
          <Text size="xl" ta="center">
            I move slower than the scroll!
          </Text>
          <Text ta="center" color="dimmed">
            Scroll offset: {Math.round(parallaxOffset)}px
          </Text>
        </Paper>
      </Box>
    </Box>
  );
}
```

## Performance Considerations

### Memoized Scroll Handling

```tsx
import { useWindowScroll } from '@mantine/hooks';
import { memo, useCallback } from 'react';
import { Text, Box } from '@mantine/core';

const ScrollDisplay = memo(function ScrollDisplay({ 
  onScrollChange 
}: { 
  onScrollChange: (x: number, y: number) => void; 
}) {
  const [scroll, scrollTo] = useWindowScroll();

  useCallback(() => {
    onScrollChange(scroll.x, scroll.y);
  }, [scroll.x, scroll.y, onScrollChange]);

  return (
    <Box>
      <Text>Position: ({scroll.x}, {scroll.y})</Text>
    </Box>
  );
});

function OptimizedScroll() {
  const handleScrollChange = useCallback((x: number, y: number) => {
    console.log('Scroll changed:', x, y);
  }, []);

  return (
    <div>
      <ScrollDisplay onScrollChange={handleScrollChange} />
    </div>
  );
}
```

### Conditional Scroll Tracking

```tsx
import { useWindowScroll } from '@mantine/hooks';
import { Text, Box, Switch } from '@mantine/core';
import { useState } from 'react';

function ConditionalScroll() {
  const [enabled, setEnabled] = useState(true);
  const [scroll, scrollTo] = useWindowScroll();

  return (
    <Box>
      <Switch
        label="Enable scroll tracking"
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
          {enabled ? `Position: (${scroll.x}, ${scroll.y})` : 'Scroll tracking disabled'}
        </Text>
      </Box>
    </Box>
  );
}
```

## Common Patterns

### Scroll with State Management

```tsx
import { useWindowScroll } from '@mantine/hooks';
import { Text, Box, Button } from '@mantine/core';
import { useState, useEffect } from 'react';

function ScrollWithState() {
  const [scroll, scrollTo] = useWindowScroll();
  const [scrollHistory, setScrollHistory] = useState<Array<{ x: number; y: number; timestamp: number }>>([]);

  useEffect(() => {
    setScrollHistory(prev => [...prev, {
      x: scroll.x,
      y: scroll.y,
      timestamp: Date.now()
    }]);
  }, [scroll.x, scroll.y]);

  const clearHistory = () => setScrollHistory([]);

  return (
    <Box>
      <Text>Current: ({scroll.x}, {scroll.y})</Text>
      <Text>History: {scrollHistory.length} positions</Text>
      
      <Button onClick={clearHistory} mt="md" fullWidth>
        Clear History
      </Button>
    </Box>
  );
}
```

### Scroll with Animation

```tsx
import { useWindowScroll } from '@mantine/hooks';
import { Text, Box, Paper } from '@mantine/core';
import { useState } from 'react';

function AnimatedScroll() {
  const [scroll, scrollTo] = useWindowScroll();
  const [isScrolling, setIsScrolling] = useState(false);

  const handleScrollTo = (position: { x: number; y: number }) => {
    setIsScrolling(true);
    scrollTo(position);
    setTimeout(() => setIsScrolling(false), 1000);
  };

  return (
    <Box>
      <Paper
        p="md"
        style={{
          backgroundColor: isScrolling ? '#ffeb3b' : '#e3f2fd',
          transition: 'all 0.3s ease',
          transform: isScrolling ? 'scale(1.05)' : 'scale(1)',
        }}
      >
        <Text>Scroll position: ({scroll.x}, {scroll.y})</Text>
        <Text>Scrolling: {isScrolling ? 'Yes' : 'No'}</Text>
      </Paper>
      
      <Button onClick={() => handleScrollTo({ x: 0, y: 0 })} mt="md">
        Scroll to Top
      </Button>
    </Box>
  );
}
```

## Integration with Other Hooks

### Combined with useDisclosure

```tsx
import { useWindowScroll, useDisclosure } from '@mantine/hooks';
import { Modal, Button, Text, Box, Paper } from '@mantine/core';

function ScrollWithModal() {
  const [scroll, scrollTo] = useWindowScroll();
  const [opened, { open, close }] = useDisclosure();

  return (
    <Box>
      <Paper p="md" style={{ backgroundColor: '#f0f0f0' }}>
        <Text>Position: ({scroll.x}, {scroll.y})</Text>
      </Paper>
      
      <Button onClick={open} mt="md" fullWidth>
        Open Modal
      </Button>

      <Modal
        opened={opened}
        onClose={close}
        title="Scroll Position"
      >
        <Text>Current scroll position: ({scroll.x}, {scroll.y})</Text>
        <Button onClick={() => scrollTo({ x: 0, y: 0 })} mt="md">
          Scroll to Top
        </Button>
      </Modal>
    </Box>
  );
}
```

### Combined with useLocalStorage

```tsx
import { useWindowScroll, useLocalStorage } from '@mantine/hooks';
import { Text, Box, Paper, Button } from '@mantine/core';

function ScrollWithStorage() {
  const [scroll, scrollTo] = useWindowScroll();
  const [savedPositions, setSavedPositions] = useLocalStorage({
    key: 'scroll-positions',
    defaultValue: [] as Array<{ x: number; y: number; name: string }>
  });

  const savePosition = () => {
    setSavedPositions(prev => [...prev, {
      x: scroll.x,
      y: scroll.y,
      name: `Position ${prev.length + 1}`
    }]);
  };

  return (
    <Box>
      <Paper p="md" style={{ backgroundColor: '#f0f0f0' }}>
        <Text>Current: ({scroll.x}, {scroll.y})</Text>
        <Text>Saved: {savedPositions.length} positions</Text>
      </Paper>
      
      <Button onClick={savePosition} mt="md" fullWidth>
        Save Position
      </Button>
    </Box>
  );
}
```

## Troubleshooting

### Common Issues

1. **Scroll Not Updating**
   - Check if the component is mounted
   - Ensure scroll events are properly attached
   - Verify the scroll container

2. **Performance Issues**
   - Use memoization for expensive calculations
   - Consider debouncing if needed
   - Avoid unnecessary re-renders

3. **Smooth Scrolling Issues**
   - Check browser support for smooth scrolling
   - Consider using CSS scroll-behavior
   - Test on different devices

### Debug Information

```tsx
import { useWindowScroll } from '@mantine/hooks';
import { Text, Box, Paper } from '@mantine/core';

function DebugScroll() {
  const [scroll, scrollTo] = useWindowScroll();

  return (
    <Paper p="md" style={{ backgroundColor: '#f8f9fa' }}>
      <Text size="lg" weight="bold" mb="md">Scroll Debug Info</Text>
      
      <Box>
        <Text>X Position: {scroll.x}px</Text>
        <Text>Y Position: {scroll.y}px</Text>
        <Text>Document Height: {typeof document !== 'undefined' ? document.documentElement.scrollHeight : 'N/A'}px</Text>
        <Text>Window Height: {typeof window !== 'undefined' ? window.innerHeight : 'N/A'}px</Text>
        <Text>Max Scroll: {typeof document !== 'undefined' ? document.documentElement.scrollHeight - window.innerHeight : 'N/A'}px</Text>
      </Box>
    </Paper>
  );
}
```

## Browser Support

- **Modern Browsers**: Full support
- **Legacy Browsers**: Full support
- **Mobile Browsers**: Full support
- **Server-Side**: Safe to use (returns 0, 0 during SSR)

## Related Hooks

- `use-scroll-into-view` - For scrolling specific elements into view
- `use-scroll-spy` - For tracking scroll position relative to elements
- `use-viewport-size` - For viewport dimensions
- `use-media-query` - For responsive design

## Best Practices

1. **Performance**: Use memoization for expensive calculations
2. **Smooth Scrolling**: Consider user preferences for reduced motion
3. **Accessibility**: Ensure scroll actions don't break keyboard navigation
4. **Testing**: Test on different devices and screen sizes
5. **Cleanup**: The hook handles cleanup automatically

---

*The `use-window-scroll` hook provides a clean, efficient way to track and control window scroll position in React applications. It's perfect for scroll-based animations, navigation, progress indicators, and user interface enhancements with excellent performance and full browser support.*
