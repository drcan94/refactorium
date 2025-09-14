# use-hover Hook

## Overview

The `use-hover` hook detects if a given element is being hovered by the mouse cursor. This hook provides a clean, React-friendly way to track hover state, making it perfect for creating interactive components that respond to mouse hover events with visual feedback, animations, or conditional rendering.

## Installation

```bash
npm install @mantine/hooks
```

## Import

```typescript
import { useHover } from '@mantine/hooks';
import type { UseHoverReturnValue } from '@mantine/hooks';
```

## Basic Usage

```tsx
import { useHover } from '@mantine/hooks';

function Demo() {
  const { hovered, ref } = useHover();
  
  return (
    <div ref={ref}>
      {hovered ? 'I am hovered' : 'Put mouse over me please'}
    </div>
  );
}
```

## API Reference

### Return Value

| Property | Type | Description |
|----------|------|-------------|
| `hovered` | `boolean` | Whether the element is currently being hovered |
| `ref` | `React.RefCallback<T \| null>` | Ref callback that must be assigned to the target element |

### Type Definition

```typescript
interface UseHoverReturnValue<T extends HTMLElement = any> {
  hovered: boolean;
  ref: React.RefCallback<T | null>;
}

function useHover<T extends HTMLElement = any>(): UseHoverReturnValue<T>;
```

## Key Features

### 1. **Simple Hover Detection**
- Clean, intuitive API for hover state tracking
- Automatic event listener management
- No manual cleanup required

### 2. **TypeScript Support**
- Full TypeScript support with generic type parameter
- Type-safe ref assignment
- Proper type inference for element types

### 3. **Performance Optimized**
- Efficient event handling
- Minimal re-renders
- Automatic cleanup on unmount

## Advanced Usage

### TypeScript with Specific Element Type

```tsx
import { useHover } from '@mantine/hooks';
import { Button, Paper } from '@mantine/core';

function TypedHover() {
  const { hovered, ref } = useHover<HTMLButtonElement>();

  return (
    <Button
      ref={ref}
      style={{
        backgroundColor: hovered ? '#1976d2' : '#2196f3',
        transform: hovered ? 'scale(1.05)' : 'scale(1)',
        transition: 'all 0.2s ease'
      }}
    >
      {hovered ? 'Hovered!' : 'Hover me'}
    </Button>
  );
}
```

### Multiple Hover States

```tsx
import { useHover } from '@mantine/hooks';
import { Group, Paper, Text } from '@mantine/core';

function MultipleHover() {
  const { hovered: card1Hovered, ref: card1Ref } = useHover();
  const { hovered: card2Hovered, ref: card2Ref } = useHover();
  const { hovered: card3Hovered, ref: card3Ref } = useHover();

  return (
    <Group>
      <Paper
        ref={card1Ref}
        p="md"
        style={{
          backgroundColor: card1Hovered ? '#e3f2fd' : '#ffffff',
          border: card1Hovered ? '2px solid #1976d2' : '1px solid #e0e0e0',
          transition: 'all 0.2s ease'
        }}
      >
        <Text>Card 1: {card1Hovered ? 'Hovered' : 'Not hovered'}</Text>
      </Paper>

      <Paper
        ref={card2Ref}
        p="md"
        style={{
          backgroundColor: card2Hovered ? '#e8f5e8' : '#ffffff',
          border: card2Hovered ? '2px solid #4caf50' : '1px solid #e0e0e0',
          transition: 'all 0.2s ease'
        }}
      >
        <Text>Card 2: {card2Hovered ? 'Hovered' : 'Not hovered'}</Text>
      </Paper>

      <Paper
        ref={card3Ref}
        p="md"
        style={{
          backgroundColor: card3Hovered ? '#fff3e0' : '#ffffff',
          border: card3Hovered ? '2px solid #ff9800' : '1px solid #e0e0e0',
          transition: 'all 0.2s ease'
        }}
      >
        <Text>Card 3: {card3Hovered ? 'Hovered' : 'Not hovered'}</Text>
      </Paper>
    </Group>
  );
}
```

## Use Cases

### 1. **Interactive Cards**

```tsx
import { useHover } from '@mantine/hooks';
import { Card, Text, Button, Group, Badge } from '@mantine/core';

function InteractiveCard() {
  const { hovered, ref } = useHover();

  return (
    <Card
      ref={ref}
      shadow="sm"
      padding="lg"
      radius="md"
      withBorder
      style={{
        transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
        boxShadow: hovered 
          ? '0 8px 25px rgba(0, 0, 0, 0.15)' 
          : '0 2px 8px rgba(0, 0, 0, 0.1)',
        transition: 'all 0.3s ease',
        cursor: 'pointer'
      }}
    >
      <Group position="apart" mb="xs">
        <Text weight={500}>Interactive Card</Text>
        <Badge color={hovered ? 'blue' : 'gray'} variant="light">
          {hovered ? 'Active' : 'Inactive'}
        </Badge>
      </Group>

      <Text size="sm" color="dimmed" mb="md">
        This card responds to hover with smooth animations
      </Text>

      <Button 
        variant={hovered ? 'filled' : 'outline'}
        style={{ transition: 'all 0.2s ease' }}
      >
        {hovered ? 'Click me!' : 'Hover me'}
      </Button>
    </Card>
  );
}
```

### 2. **Image Gallery with Hover Effects**

```tsx
import { useHover } from '@mantine/hooks';
import { Image, Text, Box, Group } from '@mantine/core';
import { useState } from 'react';

function ImageGallery() {
  const [selectedImage, setSelectedImage] = useState(0);
  const { hovered, ref } = useHover();

  const images = [
    { src: 'https://example.com/image1.jpg', title: 'Image 1' },
    { src: 'https://example.com/image2.jpg', title: 'Image 2' },
    { src: 'https://example.com/image3.jpg', title: 'Image 3' },
  ];

  return (
    <Box ref={ref} style={{ position: 'relative' }}>
      <Image
        src={images[selectedImage].src}
        alt={images[selectedImage].title}
        height={300}
        style={{
          filter: hovered ? 'brightness(1.1)' : 'brightness(1)',
          transform: hovered ? 'scale(1.02)' : 'scale(1)',
          transition: 'all 0.3s ease'
        }}
      />
      
      <Box
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          color: 'white',
          padding: '16px',
          transform: hovered ? 'translateY(0)' : 'translateY(100%)',
          transition: 'transform 0.3s ease'
        }}
      >
        <Text weight="bold">{images[selectedImage].title}</Text>
        <Text size="sm">Hover for details</Text>
      </Box>

      {hovered && (
        <Group
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            opacity: hovered ? 1 : 0,
            transition: 'opacity 0.3s ease'
          }}
        >
          <Button
            onClick={() => setSelectedImage(prev => 
              prev > 0 ? prev - 1 : images.length - 1
            )}
          >
            Previous
          </Button>
          <Button
            onClick={() => setSelectedImage(prev => 
              prev < images.length - 1 ? prev + 1 : 0
            )}
          >
            Next
          </Button>
        </Group>
      )}
    </Box>
  );
}
```

### 3. **Navigation Menu with Hover States**

```tsx
import { useHover } from '@mantine/hooks';
import { Navbar, NavLink, Text, Group } from '@mantine/core';

function NavigationWithHover() {
  const { hovered: homeHovered, ref: homeRef } = useHover();
  const { hovered: aboutHovered, ref: aboutRef } = useHover();
  const { hovered: contactHovered, ref: contactRef } = useHover();

  return (
    <Navbar width={{ base: 300 }} p="md">
      <Text size="lg" weight="bold" mb="md">Navigation</Text>
      
      <NavLink
        ref={homeRef}
        label="Home"
        style={{
          backgroundColor: homeHovered ? '#e3f2fd' : 'transparent',
          borderRadius: '4px',
          transition: 'background-color 0.2s ease'
        }}
      />
      
      <NavLink
        ref={aboutRef}
        label="About"
        style={{
          backgroundColor: aboutHovered ? '#e8f5e8' : 'transparent',
          borderRadius: '4px',
          transition: 'background-color 0.2s ease'
        }}
      />
      
      <NavLink
        ref={contactRef}
        label="Contact"
        style={{
          backgroundColor: contactHovered ? '#fff3e0' : 'transparent',
          borderRadius: '4px',
          transition: 'background-color 0.2s ease'
        }}
      />
    </Navbar>
  );
}
```

### 4. **Tooltip with Hover Detection**

```tsx
import { useHover } from '@mantine/hooks';
import { Button, Paper, Text, Box } from '@mantine/core';

function TooltipWithHover() {
  const { hovered, ref } = useHover();

  return (
    <Box ref={ref} style={{ position: 'relative', display: 'inline-block' }}>
      <Button>Hover for tooltip</Button>
      
      {hovered && (
        <Paper
          p="sm"
          style={{
            position: 'absolute',
            top: '100%',
            left: '50%',
            transform: 'translateX(-50%)',
            marginTop: '8px',
            backgroundColor: '#333',
            color: 'white',
            borderRadius: '4px',
            zIndex: 1000,
            animation: 'fadeIn 0.2s ease'
          }}
        >
          <Text size="sm">This is a tooltip!</Text>
        </Paper>
      )}
    </Box>
  );
}
```

### 5. **Data Table with Row Hover**

```tsx
import { useHover } from '@mantine/hooks';
import { Table, Text, Button, Group } from '@mantine/core';

function DataTableWithHover() {
  const data = [
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com' },
  ];

  return (
    <Table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <TableRow key={item.id} item={item} />
        ))}
      </tbody>
    </Table>
  );
}

function TableRow({ item }: { item: any }) {
  const { hovered, ref } = useHover();

  return (
    <tr
      ref={ref}
      style={{
        backgroundColor: hovered ? '#f5f5f5' : 'transparent',
        transition: 'background-color 0.2s ease'
      }}
    >
      <td>{item.name}</td>
      <td>{item.email}</td>
      <td>
        <Group spacing="xs">
          <Button size="xs" variant="outline">
            Edit
          </Button>
          {hovered && (
            <Button size="xs" color="red" variant="outline">
              Delete
            </Button>
          )}
        </Group>
      </td>
    </tr>
  );
}
```

### 6. **Progress Indicator with Hover**

```tsx
import { useHover } from '@mantine/hooks';
import { Progress, Text, Box } from '@mantine/core';

function ProgressWithHover() {
  const { hovered, ref } = useHover();
  const progress = 65;

  return (
    <Box ref={ref} style={{ position: 'relative' }}>
      <Progress
        value={progress}
        size="lg"
        style={{
          filter: hovered ? 'brightness(1.1)' : 'brightness(1)',
          transition: 'filter 0.2s ease'
        }}
      />
      
      {hovered && (
        <Text
          size="sm"
          color="dimmed"
          style={{
            position: 'absolute',
            top: '-25px',
            left: '50%',
            transform: 'translateX(-50%)',
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            color: 'white',
            padding: '4px 8px',
            borderRadius: '4px',
            whiteSpace: 'nowrap'
          }}
        >
          {progress}% Complete
        </Text>
      )}
    </Box>
  );
}
```

## Performance Considerations

### Memoized Hover Components

```tsx
import { useHover } from '@mantine/hooks';
import { memo } from 'react';
import { Button } from '@mantine/core';

const HoverButton = memo(function HoverButton({ children }: { children: React.ReactNode }) {
  const { hovered, ref } = useHover();

  return (
    <Button
      ref={ref}
      style={{
        backgroundColor: hovered ? '#1976d2' : '#2196f3',
        transform: hovered ? 'scale(1.05)' : 'scale(1)',
        transition: 'all 0.2s ease'
      }}
    >
      {children}
    </Button>
  );
});

function OptimizedHover() {
  return (
    <div>
      <HoverButton>Button 1</HoverButton>
      <HoverButton>Button 2</HoverButton>
      <HoverButton>Button 3</HoverButton>
    </div>
  );
}
```

### Conditional Hover Effects

```tsx
import { useHover } from '@mantine/hooks';
import { Button, Switch } from '@mantine/core';
import { useState } from 'react';

function ConditionalHover() {
  const [enableHover, setEnableHover] = useState(true);
  const { hovered, ref } = useHover();

  return (
    <div>
      <Switch
        label="Enable hover effects"
        checked={enableHover}
        onChange={(event) => setEnableHover(event.currentTarget.checked)}
        mb="md"
      />
      
      <Button
        ref={ref}
        style={{
          backgroundColor: enableHover && hovered ? '#1976d2' : '#2196f3',
          transform: enableHover && hovered ? 'scale(1.05)' : 'scale(1)',
          transition: 'all 0.2s ease'
        }}
      >
        {enableHover && hovered ? 'Hovered!' : 'Hover me'}
      </Button>
    </div>
  );
}
```

## Common Patterns

### Hover with State Management

```tsx
import { useHover } from '@mantine/hooks';
import { useState, useEffect } from 'react';
import { Button, Text } from '@mantine/core';

function HoverWithState() {
  const { hovered, ref } = useHover();
  const [hoverCount, setHoverCount] = useState(0);

  useEffect(() => {
    if (hovered) {
      setHoverCount(prev => prev + 1);
    }
  }, [hovered]);

  return (
    <div>
      <Button
        ref={ref}
        style={{
          backgroundColor: hovered ? '#4caf50' : '#2196f3',
          transition: 'background-color 0.2s ease'
        }}
      >
        Hover me
      </Button>
      
      <Text size="sm" mt="md">
        Hover count: {hoverCount}
      </Text>
    </div>
  );
}
```

### Hover with Animation

```tsx
import { useHover } from '@mantine/hooks';
import { Paper, Text } from '@mantine/core';

function AnimatedHover() {
  const { hovered, ref } = useHover();

  return (
    <Paper
      ref={ref}
      p="xl"
      style={{
        backgroundColor: hovered ? '#e3f2fd' : '#ffffff',
        border: hovered ? '2px solid #1976d2' : '1px solid #e0e0e0',
        borderRadius: '8px',
        transform: hovered ? 'rotate(2deg) scale(1.02)' : 'rotate(0deg) scale(1)',
        boxShadow: hovered 
          ? '0 8px 25px rgba(25, 118, 210, 0.15)' 
          : '0 2px 8px rgba(0, 0, 0, 0.1)',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        cursor: 'pointer'
      }}
    >
      <Text size="lg" weight="bold">
        Animated Card
      </Text>
      <Text size="sm" color="dimmed">
        Hover for animation effects
      </Text>
    </Paper>
  );
}
```

## Integration with Other Hooks

### Combined with useDisclosure

```tsx
import { useHover, useDisclosure } from '@mantine/hooks';
import { Button, Modal, Text } from '@mantine/core';

function HoverWithModal() {
  const { hovered, ref } = useHover();
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <div>
      <Button
        ref={ref}
        onClick={open}
        style={{
          backgroundColor: hovered ? '#1976d2' : '#2196f3',
          transition: 'background-color 0.2s ease'
        }}
      >
        {hovered ? 'Click to open modal' : 'Hover me'}
      </Button>

      <Modal opened={opened} onClose={close} title="Modal">
        <Text>This modal was opened from a hovered button</Text>
      </Modal>
    </div>
  );
}
```

### Combined with useLocalStorage

```tsx
import { useHover, useLocalStorage } from '@mantine/hooks';
import { Button, Text } from '@mantine/core';

function HoverWithStorage() {
  const { hovered, ref } = useHover();
  const [hoverHistory, setHoverHistory] = useLocalStorage({
    key: 'hover-history',
    defaultValue: [] as string[]
  });

  const handleHover = () => {
    if (hovered) {
      const timestamp = new Date().toLocaleTimeString();
      setHoverHistory(prev => [...prev, timestamp]);
    }
  };

  return (
    <div>
      <Button
        ref={ref}
        onMouseEnter={handleHover}
        style={{
          backgroundColor: hovered ? '#4caf50' : '#2196f3',
          transition: 'background-color 0.2s ease'
        }}
      >
        Track my hovers
      </Button>
      
      <Text size="sm" mt="md">
        Hover history: {hoverHistory.length} times
      </Text>
    </div>
  );
}
```

## Troubleshooting

### Common Issues

1. **Hover Not Detecting**
   - Ensure the ref is properly assigned to the target element
   - Check if the element is visible and interactive
   - Verify the element is not covered by other elements

2. **Performance Issues**
   - Use `memo` for components with hover effects
   - Avoid expensive calculations in hover handlers
   - Consider using CSS transitions instead of JavaScript animations

3. **Mobile Touch Issues**
   - Hover doesn't work on touch devices
   - Consider using `onTouchStart` for mobile alternatives
   - Test on actual mobile devices

### Debug Information

```tsx
import { useHover } from '@mantine/hooks';
import { Button, Text, Paper } from '@mantine/core';

function DebugHover() {
  const { hovered, ref } = useHover();

  return (
    <div>
      <Button
        ref={ref}
        style={{
          backgroundColor: hovered ? '#4caf50' : '#2196f3',
          transition: 'background-color 0.2s ease'
        }}
      >
        Debug Hover
      </Button>
      
      <Paper p="md" mt="md" style={{ backgroundColor: '#f8f9fa' }}>
        <Text size="sm" weight="bold">Debug Info:</Text>
        <Text size="sm">Hovered: {hovered ? 'Yes' : 'No'}</Text>
        <Text size="sm">Element: {ref ? 'Ref assigned' : 'No ref'}</Text>
      </Paper>
    </div>
  );
}
```

## Browser Support

- **Modern Browsers**: Full support
- **Legacy Browsers**: Full support
- **Mobile Browsers**: Limited support (hover doesn't work on touch)
- **Server-Side**: Safe to use (no-op during SSR)

## Related Hooks

- `use-focus` - For focus state management
- `use-focus-within` - For focus detection within containers
- `use-click-outside` - For click outside detection
- `use-disclosure` - For modal/overlay state management

## Best Practices

1. **Use for Visual Feedback**: Perfect for hover effects and animations
2. **Consider Mobile**: Provide alternative interactions for touch devices
3. **Performance**: Use CSS transitions when possible
4. **Accessibility**: Ensure hover effects don't interfere with keyboard navigation
5. **Testing**: Test hover effects across different devices and browsers

---

*The `use-hover` hook provides a simple, efficient way to detect hover state in React components. It's perfect for creating interactive user interfaces with smooth hover effects and visual feedback.*
