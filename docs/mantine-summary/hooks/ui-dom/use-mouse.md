# use-mouse Hook

## Overview

The `use-mouse` hook provides a clean way to track mouse position over the viewport or a specific element. It returns real-time x and y coordinates relative to either the document or a target element, making it perfect for interactive features like custom cursors, drag operations, hover effects, and mouse-based animations.

## Installation

```bash
npm install @mantine/hooks
```

## Import

```typescript
import { useMouse } from '@mantine/hooks';
```

## Basic Usage

### Document-Level Mouse Tracking

```tsx
import { Text, Code } from '@mantine/core';
import { useMouse } from '@mantine/hooks';

function Demo() {
  const { x, y } = useMouse();

  return (
    <Text ta="center">
      Mouse coordinates <Code>{`{ x: ${x}, y: ${y} }`}</Code>
    </Text>
  );
}
```

### Element-Level Mouse Tracking

```tsx
import { Text, Code, Group, Box } from '@mantine/core';
import { useMouse } from '@mantine/hooks';

function Demo() {
  const { ref, x, y } = useMouse();

  return (
    <>
      <Group justify="center">
        <Box ref={ref} w={300} h={180} bg="var(--mantine-color-blue-light)" />
      </Group>
      <Text ta="center">
        Mouse coordinates <Code>{`{ x: ${x}, y: ${y} }`}</Code>
      </Text>
    </>
  );
}
```

## API Reference

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `options` | `UseMouseOptions` | **Optional.** Configuration options for mouse tracking |

### UseMouseOptions

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `resetOnExit` | `boolean` | `false` | Whether to reset mouse position to (0, 0) when mouse leaves the element |

### Return Value

| Property | Type | Description |
|----------|------|-------------|
| `ref` | `React.RefObject<T>` | Ref to attach to the target element (optional) |
| `x` | `number` | Mouse x position relative to target element or document |
| `y` | `number` | Mouse y position relative to target element or document |

### Type Definitions

```typescript
interface UseMouseOptions {
  resetOnExit?: boolean;
}

function useMouse<T extends HTMLElement = any>(options?: UseMouseOptions): {
  x: number;
  y: number;
  ref: React.RefObject<T>;
};
```

## Key Features

### 1. **Dual Tracking Modes**
- **Document-level**: Track mouse position across the entire viewport
- **Element-level**: Track mouse position relative to a specific element

### 2. **Real-time Updates**
- Continuous position updates as mouse moves
- Optimized performance with native event listeners
- Automatic cleanup on component unmount

### 3. **Flexible Configuration**
- Optional reset behavior when mouse leaves element
- TypeScript support with generic element types
- SSR-safe with initial values

## Advanced Usage

### With Reset on Exit

```tsx
import { useMouse } from '@mantine/hooks';
import { Text, Code, Group, Box } from '@mantine/core';

function ResetOnExit() {
  const { ref, x, y } = useMouse({ resetOnExit: true });

  return (
    <>
      <Group justify="center">
        <Box 
          ref={ref} 
          w={300} 
          h={180} 
          bg="var(--mantine-color-blue-light)"
          style={{ border: '2px dashed #ccc' }}
        />
      </Group>
      <Text ta="center">
        Mouse coordinates <Code>{`{ x: ${x}, y: ${y} }`}</Code>
        <br />
        <Text size="sm" color="dimmed">
          Position resets to (0, 0) when mouse leaves the box
        </Text>
      </Text>
    </>
  );
}
```

### TypeScript with Specific Element Type

```tsx
import { useMouse } from '@mantine/hooks';
import { Text, Code, Group, Box } from '@mantine/core';

function TypedMouse() {
  const { ref, x, y } = useMouse<HTMLDivElement>({ resetOnExit: true });

  return (
    <>
      <Group justify="center">
        <Box 
          ref={ref} 
          w={300} 
          h={180} 
          bg="var(--mantine-color-green-light)"
        />
      </Group>
      <Text ta="center">
        Mouse coordinates <Code>{`{ x: ${x}, y: ${y} }`}</Code>
      </Text>
    </>
  );
}
```

## Use Cases

### 1. **Custom Cursor**

```tsx
import { useMouse } from '@mantine/hooks';
import { Text, Box, Paper } from '@mantine/core';
import { useState } from 'react';

function CustomCursor() {
  const { x, y } = useMouse();
  const [isVisible, setIsVisible] = useState(false);

  return (
    <Box
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
      style={{ height: '400px', position: 'relative' }}
    >
      <Text ta="center" mt="xl">
        Move your mouse around to see the custom cursor
      </Text>
      
      {isVisible && (
        <Paper
          radius="xl"
          p="xs"
          style={{
            position: 'fixed',
            left: x - 10,
            top: y - 10,
            pointerEvents: 'none',
            zIndex: 9999,
            backgroundColor: 'var(--mantine-color-blue-6)',
            color: 'white',
            fontSize: '12px',
            fontWeight: 'bold',
          }}
        >
          {x}, {y}
        </Paper>
      )}
    </Box>
  );
}
```

### 2. **Interactive Hover Effects**

```tsx
import { useMouse } from '@mantine/hooks';
import { Text, Box, Paper, Group } from '@mantine/core';
import { useState } from 'react';

function HoverEffects() {
  const { ref, x, y } = useMouse();
  const [isHovered, setIsHovered] = useState(false);

  const getGradient = () => {
    if (!isHovered) return 'linear-gradient(45deg, #f0f0f0, #e0e0e0)';
    
    const centerX = 150; // Half of box width
    const centerY = 100; // Half of box height
    const distance = Math.sqrt((x - centerX) ** 2 + (y - centerY) ** 2);
    const intensity = Math.min(distance / 100, 1);
    
    return `radial-gradient(circle at ${x}px ${y}px, 
      rgba(74, 144, 226, ${1 - intensity}), 
      rgba(74, 144, 226, ${0.3 - intensity * 0.2}))`;
  };

  return (
    <Box>
      <Text ta="center" mb="md">
        Interactive Hover Effects
      </Text>
      
      <Group justify="center">
        <Paper
          ref={ref}
          w={300}
          h={200}
          style={{
            background: getGradient(),
            transition: 'background 0.1s ease',
            cursor: 'pointer',
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <Text ta="center" mt="xl" size="lg" weight="bold">
            Hover me!
          </Text>
          <Text ta="center" size="sm" color="dimmed">
            Position: ({x}, {y})
          </Text>
        </Paper>
      </Group>
    </Box>
  );
}
```

### 3. **Drag and Drop Preview**

```tsx
import { useMouse } from '@mantine/hooks';
import { Text, Box, Paper, Group } from '@mantine/core';
import { useState } from 'react';

function DragPreview() {
  const { x, y } = useMouse();
  const [isDragging, setIsDragging] = useState(false);
  const [dragItem, setDragItem] = useState<string | null>(null);

  const items = ['Item 1', 'Item 2', 'Item 3', 'Item 4'];

  const handleMouseDown = (item: string) => {
    setIsDragging(true);
    setDragItem(item);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setDragItem(null);
  };

  return (
    <Box
      onMouseUp={handleMouseUp}
      style={{ height: '400px', position: 'relative' }}
    >
      <Text ta="center" mb="md">
        Drag and Drop Preview
      </Text>
      
      <Group justify="center" mb="xl">
        {items.map((item) => (
          <Paper
            key={item}
            p="md"
            style={{
              cursor: 'grab',
              userSelect: 'none',
              backgroundColor: isDragging && dragItem === item ? '#e3f2fd' : '#f5f5f5',
            }}
            onMouseDown={() => handleMouseDown(item)}
          >
            {item}
          </Paper>
        ))}
      </Group>

      {isDragging && dragItem && (
        <Paper
          p="md"
          style={{
            position: 'fixed',
            left: x - 50,
            top: y - 25,
            pointerEvents: 'none',
            zIndex: 9999,
            backgroundColor: 'var(--mantine-color-blue-6)',
            color: 'white',
            transform: 'rotate(5deg)',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
          }}
        >
          {dragItem}
        </Paper>
      )}

      <Text ta="center" size="sm" color="dimmed">
        Mouse position: ({x}, {y})
      </Text>
    </Box>
  );
}
```

### 4. **Mouse Trail Effect**

```tsx
import { useMouse } from '@mantine/hooks';
import { Text, Box } from '@mantine/core';
import { useState, useEffect } from 'react';

function MouseTrail() {
  const { x, y } = useMouse();
  const [trail, setTrail] = useState<Array<{ x: number; y: number; id: number }>>([]);

  useEffect(() => {
    if (x !== 0 || y !== 0) {
      const newPoint = { x, y, id: Date.now() };
      setTrail(prev => [...prev.slice(-10), newPoint]); // Keep last 10 points
    }
  }, [x, y]);

  return (
    <Box style={{ height: '400px', position: 'relative', overflow: 'hidden' }}>
      <Text ta="center" mb="md">
        Mouse Trail Effect
      </Text>
      
      {trail.map((point, index) => (
        <div
          key={point.id}
          style={{
            position: 'fixed',
            left: point.x - 5,
            top: point.y - 5,
            width: '10px',
            height: '10px',
            borderRadius: '50%',
            backgroundColor: `rgba(74, 144, 226, ${1 - index / 10})`,
            pointerEvents: 'none',
            zIndex: 9999,
            transition: 'opacity 0.3s ease',
          }}
        />
      ))}
      
      <Text ta="center" mt="xl" size="sm" color="dimmed">
        Move your mouse to see the trail effect
      </Text>
    </Box>
  );
}
```

### 5. **Interactive Tooltip**

```tsx
import { useMouse } from '@mantine/hooks';
import { Text, Box, Paper, Group } from '@mantine/core';
import { useState } from 'react';

function InteractiveTooltip() {
  const { ref, x, y } = useMouse();
  const [isHovered, setIsHovered] = useState(false);

  const tooltipData = [
    { label: 'X Position', value: x },
    { label: 'Y Position', value: y },
    { label: 'Distance from Center', value: Math.sqrt((x - 150) ** 2 + (y - 100) ** 2).toFixed(1) },
  ];

  return (
    <Box>
      <Text ta="center" mb="md">
        Interactive Tooltip
      </Text>
      
      <Group justify="center">
        <Paper
          ref={ref}
          w={300}
          h={200}
          style={{
            backgroundColor: '#f8f9fa',
            border: '2px dashed #ccc',
            position: 'relative',
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <Text ta="center" mt="xl">
            Hover for tooltip
          </Text>
        </Paper>
      </Group>

      {isHovered && (
        <Paper
          p="md"
          style={{
            position: 'fixed',
            left: x + 20,
            top: y - 50,
            pointerEvents: 'none',
            zIndex: 9999,
            backgroundColor: 'var(--mantine-color-dark-8)',
            color: 'white',
            minWidth: '200px',
          }}
        >
          <Text size="sm" weight="bold" mb="xs">Mouse Info</Text>
          {tooltipData.map((item) => (
            <Text key={item.label} size="xs">
              {item.label}: {item.value}
            </Text>
          ))}
        </Paper>
      )}
    </Box>
  );
}
```

### 6. **Parallax Effect**

```tsx
import { useMouse } from '@mantine/hooks';
import { Text, Box, Paper, Group } from '@mantine/core';
import { useState } from 'react';

function ParallaxEffect() {
  const { x, y } = useMouse();
  const [isHovered, setIsHovered] = useState(false);

  const getTransform = (layer: number) => {
    if (!isHovered) return 'translate(0, 0)';
    
    const centerX = 150;
    const centerY = 100;
    const offsetX = (x - centerX) * (layer * 0.1);
    const offsetY = (y - centerY) * (layer * 0.1);
    
    return `translate(${offsetX}px, ${offsetY}px)`;
  };

  return (
    <Box>
      <Text ta="center" mb="md">
        Parallax Effect
      </Text>
      
      <Group justify="center">
        <Box
          w={300}
          h={200}
          style={{ position: 'relative', overflow: 'hidden' }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Background layer */}
          <Paper
            w="100%"
            h="100%"
            style={{
              position: 'absolute',
              background: 'linear-gradient(45deg, #ff6b6b, #4ecdc4)',
              transform: getTransform(1),
              transition: 'transform 0.1s ease',
            }}
          />
          
          {/* Middle layer */}
          <Paper
            w="80%"
            h="80%"
            style={{
              position: 'absolute',
              top: '10%',
              left: '10%',
              background: 'linear-gradient(45deg, #45b7d1, #96ceb4)',
              transform: getTransform(2),
              transition: 'transform 0.1s ease',
            }}
          />
          
          {/* Foreground layer */}
          <Paper
            w="60%"
            h="60%"
            style={{
              position: 'absolute',
              top: '20%',
              left: '20%',
              background: 'linear-gradient(45deg, #feca57, #ff9ff3)',
              transform: getTransform(3),
              transition: 'transform 0.1s ease',
            }}
          />
          
          <Text
            ta="center"
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              color: 'white',
              fontWeight: 'bold',
              zIndex: 10,
            }}
          >
            Parallax
          </Text>
        </Box>
      </Group>
    </Box>
  );
}
```

## Performance Considerations

### Memoized Mouse Tracking

```tsx
import { useMouse } from '@mantine/hooks';
import { memo, useCallback } from 'react';
import { Text, Box } from '@mantine/core';

const MouseTracker = memo(function MouseTracker({ 
  onMouseMove 
}: { 
  onMouseMove: (x: number, y: number) => void; 
}) {
  const { x, y } = useMouse();
  
  useCallback(() => {
    onMouseMove(x, y);
  }, [x, y, onMouseMove]);

  return (
    <Box>
      <Text>Mouse: ({x}, {y})</Text>
    </Box>
  );
});

function OptimizedMouse() {
  const handleMouseMove = useCallback((x: number, y: number) => {
    console.log('Mouse moved to:', x, y);
  }, []);

  return (
    <div>
      <MouseTracker onMouseMove={handleMouseMove} />
    </div>
  );
}
```

### Conditional Mouse Tracking

```tsx
import { useMouse } from '@mantine/hooks';
import { Text, Box, Switch } from '@mantine/core';
import { useState } from 'react';

function ConditionalMouse() {
  const [enabled, setEnabled] = useState(true);
  const { x, y } = useMouse();

  return (
    <Box>
      <Switch
        label="Enable mouse tracking"
        checked={enabled}
        onChange={(event) => setEnabled(event.currentTarget.checked)}
        mb="md"
      />
      
      <Text>
        Mouse position: {enabled ? `(${x}, ${y})` : 'Tracking disabled'}
      </Text>
    </Box>
  );
}
```

## Common Patterns

### Mouse Position with State

```tsx
import { useMouse } from '@mantine/hooks';
import { Text, Box, Button } from '@mantine/core';
import { useState, useEffect } from 'react';

function MouseWithState() {
  const { x, y } = useMouse();
  const [positions, setPositions] = useState<Array<{ x: number; y: number; id: number }>>([]);

  useEffect(() => {
    if (x !== 0 || y !== 0) {
      setPositions(prev => [...prev, { x, y, id: Date.now() }]);
    }
  }, [x, y]);

  const clearPositions = () => setPositions([]);

  return (
    <Box>
      <Text>Current: ({x}, {y})</Text>
      <Text>Total positions: {positions.length}</Text>
      
      <Button onClick={clearPositions} mt="md">
        Clear History
      </Button>
    </Box>
  );
}
```

### Mouse with Animation

```tsx
import { useMouse } from '@mantine/hooks';
import { Text, Box, Paper } from '@mantine/core';
import { useState } from 'react';

function AnimatedMouse() {
  const { x, y } = useMouse();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Box>
      <Paper
        w={300}
        h={200}
        style={{
          backgroundColor: '#f8f9fa',
          border: '2px dashed #ccc',
          position: 'relative',
          overflow: 'hidden',
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div
          style={{
            position: 'absolute',
            left: x - 25,
            top: y - 25,
            width: '50px',
            height: '50px',
            borderRadius: '50%',
            backgroundColor: isHovered ? 'var(--mantine-color-blue-6)' : 'var(--mantine-color-gray-4)',
            transition: 'all 0.3s ease',
            transform: isHovered ? 'scale(1.2)' : 'scale(1)',
          }}
        />
        
        <Text
          ta="center"
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 10,
          }}
        >
          Follow the circle
        </Text>
      </Paper>
    </Box>
  );
}
```

## Integration with Other Hooks

### Combined with useDisclosure

```tsx
import { useMouse, useDisclosure } from '@mantine/hooks';
import { Modal, Button, Text, Box } from '@mantine/core';

function MouseWithModal() {
  const { x, y } = useMouse();
  const [opened, { open, close }] = useDisclosure();

  return (
    <Box>
      <Button onClick={open}>
        Open Modal at Mouse Position
      </Button>

      <Modal
        opened={opened}
        onClose={close}
        title="Mouse Position Modal"
        style={{
          position: 'fixed',
          left: x - 150,
          top: y - 100,
        }}
      >
        <Text>Mouse position: ({x}, {y})</Text>
      </Modal>
    </Box>
  );
}
```

### Combined with useLocalStorage

```tsx
import { useMouse, useLocalStorage } from '@mantine/hooks';
import { Text, Box, Button } from '@mantine/core';

function MouseWithStorage() {
  const { x, y } = useMouse();
  const [savedPositions, setSavedPositions] = useLocalStorage({
    key: 'mouse-positions',
    defaultValue: [] as Array<{ x: number; y: number; timestamp: number }>
  });

  const savePosition = () => {
    setSavedPositions(prev => [...prev, { x, y, timestamp: Date.now() }]);
  };

  return (
    <Box>
      <Text>Current: ({x}, {y})</Text>
      <Text>Saved positions: {savedPositions.length}</Text>
      
      <Button onClick={savePosition} mt="md">
        Save Position
      </Button>
    </Box>
  );
}
```

## Troubleshooting

### Common Issues

1. **Mouse Position Not Updating**
   - Check if the component is mounted
   - Ensure event listeners are properly attached
   - Verify the target element is interactive

2. **Performance Issues**
   - Use memoization for expensive calculations
   - Consider debouncing if needed
   - Avoid unnecessary re-renders

3. **SSR Issues**
   - Initial values are 0, 0 during SSR
   - Use client-side only features when needed

### Debug Information

```tsx
import { useMouse } from '@mantine/hooks';
import { Text, Box, Paper } from '@mantine/core';

function DebugMouse() {
  const { x, y } = useMouse();

  return (
    <Paper p="md" style={{ backgroundColor: '#f8f9fa' }}>
      <Text size="lg" weight="bold" mb="md">Mouse Debug Info</Text>
      
      <Box>
        <Text>X Position: {x}</Text>
        <Text>Y Position: {y}</Text>
        <Text>Distance from origin: {Math.sqrt(x ** 2 + y ** 2).toFixed(2)}</Text>
        <Text>Angle: {Math.atan2(y, x) * 180 / Math.PI.toFixed(2)}°</Text>
      </Box>
    </Paper>
  );
}
```

## Browser Support

- **Modern Browsers**: Full support
- **Legacy Browsers**: Full support
- **Mobile Browsers**: Full support (touch events)
- **Server-Side**: Safe to use (returns 0, 0 during SSR)

## Related Hooks

- `use-hover` - For hover state management
- `use-click-outside` - For click outside detection
- `use-long-press` - For long press detection
- `use-event-listener` - For custom event handling

## Best Practices

1. **Performance**: Use memoization for expensive calculations
2. **Accessibility**: Ensure mouse interactions don't break keyboard navigation
3. **Mobile**: Consider touch events for mobile devices
4. **SSR**: Handle initial values appropriately
5. **Cleanup**: The hook handles cleanup automatically

---

*The `use-mouse` hook provides a clean, efficient way to track mouse position in React applications. It's perfect for interactive features, custom cursors, drag operations, hover effects, and mouse-based animations with excellent performance and full SSR support.*
