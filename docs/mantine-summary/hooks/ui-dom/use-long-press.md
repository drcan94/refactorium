# use-long-press Hook

## Overview

The `use-long-press` hook provides a clean way to detect long press gestures on both mouse and touch devices. It calls a function when a user presses and holds an element for a specified duration, making it perfect for implementing context menus, delete confirmations, drag operations, and other long-press interactions.

## Installation

```bash
npm install @mantine/hooks
```

## Import

```typescript
import { useLongPress } from '@mantine/hooks';
import type { UseLongPressOptions, UseLongPressReturnValue } from '@mantine/hooks';
```

## Basic Usage

```tsx
import { Button } from '@mantine/core';
import { useLongPress } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';

function Demo() {
  const handlers = useLongPress(() => 
    notifications.show({ message: 'Long press triggered' })
  );
  
  return <Button {...handlers}>Press and hold</Button>;
}
```

## API Reference

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `onLongPress` | `(event: React.MouseEvent \| React.TouchEvent) => void` | **Required.** Function called when long press is triggered |
| `options` | `UseLongPressOptions` | **Optional.** Configuration options for the long press behavior |

### UseLongPressOptions

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `threshold` | `number` | `400` | Time in milliseconds to trigger the long press |
| `onStart` | `(event: React.MouseEvent \| React.TouchEvent) => void` | `undefined` | Callback triggered when the long press starts |
| `onFinish` | `(event: React.MouseEvent \| React.TouchEvent) => void` | `undefined` | Callback triggered when the long press finishes |
| `onCancel` | `(event: React.MouseEvent \| React.TouchEvent) => void` | `undefined` | Callback triggered when the long press is canceled |

### Return Value

| Property | Type | Description |
|----------|------|-------------|
| `onMouseDown` | `(event: React.MouseEvent) => void` | Mouse down event handler |
| `onMouseUp` | `(event: React.MouseEvent) => void` | Mouse up event handler |
| `onMouseLeave` | `(event: React.MouseEvent) => void` | Mouse leave event handler |
| `onTouchStart` | `(event: React.TouchEvent) => void` | Touch start event handler |
| `onTouchEnd` | `(event: React.TouchEvent) => void` | Touch end event handler |

### Type Definitions

```typescript
interface UseLongPressOptions {
  threshold?: number;
  onStart?: (event: React.MouseEvent | React.TouchEvent) => void;
  onFinish?: (event: React.MouseEvent | React.TouchEvent) => void;
  onCancel?: (event: React.MouseEvent | React.TouchEvent) => void;
}

interface UseLongPressReturnValue {
  onMouseDown: (event: React.MouseEvent) => void;
  onMouseUp: (event: React.MouseEvent) => void;
  onMouseLeave: (event: React.MouseEvent) => void;
  onTouchStart: (event: React.TouchEvent) => void;
  onTouchEnd: (event: React.TouchEvent) => void;
}

function useLongPress(
  onLongPress: (event: React.MouseEvent | React.TouchEvent) => void,
  options?: UseLongPressOptions,
): UseLongPressReturnValue;
```

## Key Features

### 1. **Cross-Platform Support**
- Works on both mouse and touch devices
- Handles mouse and touch events automatically
- Consistent behavior across platforms

### 2. **Configurable Threshold**
- Customizable press duration
- Default 400ms threshold
- Fine-tuned control over sensitivity

### 3. **Event Callbacks**
- `onStart`: When long press begins
- `onFinish`: When long press completes
- `onCancel`: When long press is interrupted

## Advanced Usage

### Custom Threshold

```tsx
import { useLongPress } from '@mantine/hooks';
import { Button, Text } from '@mantine/core';
import { useState } from 'react';

function CustomThreshold() {
  const [message, setMessage] = useState('Press and hold for 1 second');
  
  const handlers = useLongPress(
    () => setMessage('Long press triggered!'),
    { threshold: 1000 } // 1 second
  );

  return (
    <Button {...handlers} size="lg">
      {message}
    </Button>
  );
}
```

### With Event Callbacks

```tsx
import { useLongPress } from '@mantine/hooks';
import { Button, Text, Box } from '@mantine/core';
import { useState } from 'react';

function WithCallbacks() {
  const [status, setStatus] = useState('Ready');
  const [progress, setProgress] = useState(0);

  const handlers = useLongPress(
    () => {
      setStatus('Long press completed!');
      setProgress(100);
    },
    {
      threshold: 2000, // 2 seconds
      onStart: () => {
        setStatus('Long press started...');
        setProgress(0);
      },
      onFinish: () => {
        setStatus('Long press finished');
      },
      onCancel: () => {
        setStatus('Long press canceled');
        setProgress(0);
      }
    }
  );

  return (
    <Box>
      <Button {...handlers} size="lg" mb="md">
        Press and hold for 2 seconds
      </Button>
      <Text>Status: {status}</Text>
      <Text>Progress: {progress}%</Text>
    </Box>
  );
}
```

## Use Cases

### 1. **Context Menu**

```tsx
import { useLongPress } from '@mantine/hooks';
import { Button, Menu, Text } from '@mantine/core';
import { useState } from 'react';

function ContextMenu() {
  const [opened, setOpened] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handlers = useLongPress(
    (event) => {
      setPosition({ x: event.clientX, y: event.clientY });
      setOpened(true);
    },
    { threshold: 500 }
  );

  return (
    <div>
      <Button {...handlers} size="lg">
        Right-click or long press for context menu
      </Button>

      <Menu
        opened={opened}
        onClose={() => setOpened(false)}
        position="bottom-start"
        style={{ position: 'fixed', left: position.x, top: position.y }}
      >
        <Menu.Item>Copy</Menu.Item>
        <Menu.Item>Cut</Menu.Item>
        <Menu.Item>Paste</Menu.Item>
        <Menu.Divider />
        <Menu.Item color="red">Delete</Menu.Item>
      </Menu>
    </div>
  );
}
```

### 2. **Delete Confirmation**

```tsx
import { useLongPress } from '@mantine/hooks';
import { Button, Text, Box, Group } from '@mantine/core';
import { useState } from 'react';

function DeleteConfirmation() {
  const [items, setItems] = useState(['Item 1', 'Item 2', 'Item 3']);
  const [deleting, setDeleting] = useState<string | null>(null);

  const handleDelete = (item: string) => {
    setItems(prev => prev.filter(i => i !== item));
    setDeleting(null);
  };

  const createHandlers = (item: string) => useLongPress(
    () => handleDelete(item),
    {
      threshold: 1000,
      onStart: () => setDeleting(item),
      onCancel: () => setDeleting(null)
    }
  );

  return (
    <Box>
      <Text size="lg" mb="md">Long press items to delete them</Text>
      {items.map((item) => (
        <Button
          key={item}
          {...createHandlers(item)}
          color={deleting === item ? 'red' : 'blue'}
          mb="sm"
          fullWidth
        >
          {deleting === item ? `Deleting ${item}...` : item}
        </Button>
      ))}
    </Box>
  );
}
```

### 3. **Drag and Drop Initiation**

```tsx
import { useLongPress } from '@mantine/hooks';
import { Button, Text, Box } from '@mantine/core';
import { useState } from 'react';

function DragInitiation() {
  const [dragging, setDragging] = useState(false);
  const [dragItem, setDragItem] = useState<string | null>(null);

  const handlers = useLongPress(
    () => {
      setDragging(true);
      setDragItem('Item');
    },
    {
      threshold: 800,
      onStart: () => console.log('Drag preparation started'),
      onCancel: () => {
        setDragging(false);
        setDragItem(null);
      }
    }
  );

  return (
    <Box>
      <Button
        {...handlers}
        size="lg"
        style={{
          transform: dragging ? 'scale(1.1)' : 'scale(1)',
          transition: 'transform 0.2s ease',
          cursor: dragging ? 'grabbing' : 'grab'
        }}
      >
        {dragging ? 'Dragging...' : 'Long press to drag'}
      </Button>
      
      {dragging && (
        <Text mt="md" color="blue">
          Drag mode activated! Move to drop zone.
        </Text>
      )}
    </Box>
  );
}
```

### 4. **Progress Indicator**

```tsx
import { useLongPress } from '@mantine/hooks';
import { Button, Progress, Text, Box } from '@mantine/core';
import { useState, useEffect } from 'react';

function ProgressIndicator() {
  const [progress, setProgress] = useState(0);
  const [isPressing, setIsPressing] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isPressing) {
      interval = setInterval(() => {
        setProgress(prev => Math.min(prev + 2, 100));
      }, 40); // Update every 40ms
    } else {
      setProgress(0);
    }

    return () => clearInterval(interval);
  }, [isPressing]);

  const handlers = useLongPress(
    () => {
      console.log('Action completed!');
      setProgress(100);
    },
    {
      threshold: 2000,
      onStart: () => setIsPressing(true),
      onFinish: () => setIsPressing(false),
      onCancel: () => {
        setIsPressing(false);
        setProgress(0);
      }
    }
  );

  return (
    <Box>
      <Button {...handlers} size="lg" mb="md">
        Hold to complete action
      </Button>
      
      {isPressing && (
        <Box>
          <Progress value={progress} size="lg" mb="sm" />
          <Text size="sm" ta="center">
            {progress.toFixed(0)}% - Keep holding...
          </Text>
        </Box>
      )}
    </Box>
  );
}
```

### 5. **Multi-Select with Long Press**

```tsx
import { useLongPress } from '@mantine/hooks';
import { Button, Text, Box, Group } from '@mantine/core';
import { useState } from 'react';

function MultiSelect() {
  const [items] = useState(['Apple', 'Banana', 'Orange', 'Grape']);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [multiSelectMode, setMultiSelectMode] = useState(false);

  const createHandlers = (item: string) => useLongPress(
    () => {
      setMultiSelectMode(true);
      setSelectedItems(prev => 
        prev.includes(item) 
          ? prev.filter(i => i !== item)
          : [...prev, item]
      );
    },
    { threshold: 600 }
  );

  const handleClick = (item: string) => {
    if (multiSelectMode) {
      setSelectedItems(prev => 
        prev.includes(item) 
          ? prev.filter(i => i !== item)
          : [...prev, item]
      );
    } else {
      console.log('Single select:', item);
    }
  };

  return (
    <Box>
      <Text size="lg" mb="md">
        {multiSelectMode ? 'Multi-select mode' : 'Long press to enter multi-select'}
      </Text>
      
      <Group>
        {items.map((item) => (
          <Button
            key={item}
            {...createHandlers(item)}
            onClick={() => handleClick(item)}
            color={selectedItems.includes(item) ? 'blue' : 'gray'}
            variant={selectedItems.includes(item) ? 'filled' : 'outline'}
          >
            {item}
          </Button>
        ))}
      </Group>
      
      {multiSelectMode && (
        <Button
          mt="md"
          onClick={() => {
            setMultiSelectMode(false);
            setSelectedItems([]);
          }}
        >
          Exit Multi-select
        </Button>
      )}
    </Box>
  );
}
```

### 6. **Haptic Feedback**

```tsx
import { useLongPress } from '@mantine/hooks';
import { Button, Text, Box } from '@mantine/core';
import { useState } from 'react';

function HapticFeedback() {
  const [feedback, setFeedback] = useState('');

  const triggerHaptic = () => {
    if ('vibrate' in navigator) {
      navigator.vibrate(200); // Vibrate for 200ms
    }
  };

  const handlers = useLongPress(
    () => {
      setFeedback('Long press completed with haptic feedback!');
      triggerHaptic();
    },
    {
      threshold: 1000,
      onStart: () => {
        setFeedback('Long press started...');
        triggerHaptic();
      },
      onCancel: () => {
        setFeedback('Long press canceled');
      }
    }
  );

  return (
    <Box>
      <Button {...handlers} size="lg" mb="md">
        Long press for haptic feedback
      </Button>
      <Text>{feedback}</Text>
    </Box>
  );
}
```

## Performance Considerations

### Memoized Handlers

```tsx
import { useLongPress } from '@mantine/hooks';
import { memo, useCallback } from 'react';
import { Button } from '@mantine/core';

const LongPressButton = memo(function LongPressButton({ 
  onLongPress, 
  threshold = 400 
}: { 
  onLongPress: () => void; 
  threshold?: number; 
}) {
  const handlers = useLongPress(onLongPress, { threshold });
  return <Button {...handlers}>Long Press</Button>;
});

function OptimizedLongPress() {
  const handleLongPress = useCallback(() => {
    console.log('Long press triggered');
  }, []);

  return (
    <div>
      <LongPressButton onLongPress={handleLongPress} threshold={500} />
    </div>
  );
}
```

### Conditional Long Press

```tsx
import { useLongPress } from '@mantine/hooks';
import { Button, Switch } from '@mantine/core';
import { useState } from 'react';

function ConditionalLongPress() {
  const [enabled, setEnabled] = useState(true);

  const handlers = useLongPress(
    () => console.log('Long press triggered'),
    { 
      threshold: 600,
      onStart: enabled ? () => console.log('Started') : undefined,
      onCancel: enabled ? () => console.log('Canceled') : undefined
    }
  );

  return (
    <div>
      <Switch
        label="Enable long press"
        checked={enabled}
        onChange={(event) => setEnabled(event.currentTarget.checked)}
        mb="md"
      />
      
      <Button {...handlers} disabled={!enabled}>
        {enabled ? 'Long press enabled' : 'Long press disabled'}
      </Button>
    </div>
  );
}
```

## Common Patterns

### Long Press with State Management

```tsx
import { useLongPress } from '@mantine/hooks';
import { Button, Text, Box } from '@mantine/core';
import { useState, useEffect } from 'react';

function LongPressWithState() {
  const [pressing, setPressing] = useState(false);
  const [pressCount, setPressCount] = useState(0);

  const handlers = useLongPress(
    () => {
      setPressCount(prev => prev + 1);
      setPressing(false);
    },
    {
      threshold: 800,
      onStart: () => setPressing(true),
      onCancel: () => setPressing(false)
    }
  );

  return (
    <Box>
      <Button
        {...handlers}
        color={pressing ? 'orange' : 'blue'}
        style={{
          transform: pressing ? 'scale(1.05)' : 'scale(1)',
          transition: 'all 0.2s ease'
        }}
      >
        {pressing ? 'Pressing...' : 'Long press me'}
      </Button>
      
      <Text mt="md">Long press count: {pressCount}</Text>
    </Box>
  );
}
```

### Long Press with Animation

```tsx
import { useLongPress } from '@mantine/hooks';
import { Button, Text, Box } from '@mantine/core';
import { useState } from 'react';

function AnimatedLongPress() {
  const [pressing, setPressing] = useState(false);
  const [completed, setCompleted] = useState(false);

  const handlers = useLongPress(
    () => {
      setCompleted(true);
      setPressing(false);
      setTimeout(() => setCompleted(false), 1000);
    },
    {
      threshold: 1500,
      onStart: () => setPressing(true),
      onCancel: () => setPressing(false)
    }
  );

  return (
    <Box>
      <Button
        {...handlers}
        size="lg"
        style={{
          backgroundColor: completed ? '#4caf50' : pressing ? '#ff9800' : '#2196f3',
          transform: pressing ? 'scale(1.1) rotate(5deg)' : 'scale(1) rotate(0deg)',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          boxShadow: pressing 
            ? '0 8px 25px rgba(0, 0, 0, 0.3)' 
            : '0 2px 8px rgba(0, 0, 0, 0.1)'
        }}
      >
        {completed ? 'Completed!' : pressing ? 'Keep holding...' : 'Long press me'}
      </Button>
    </Box>
  );
}
```

## Integration with Other Hooks

### Combined with useDisclosure

```tsx
import { useLongPress, useDisclosure } from '@mantine/hooks';
import { Button, Modal, Text } from '@mantine/core';

function LongPressWithModal() {
  const [opened, { open, close }] = useDisclosure();

  const handlers = useLongPress(
    () => open(),
    { threshold: 1000 }
  );

  return (
    <div>
      <Button {...handlers}>
        Long press to open modal
      </Button>

      <Modal opened={opened} onClose={close} title="Long Press Modal">
        <Text>This modal opened after a long press!</Text>
      </Modal>
    </div>
  );
}
```

### Combined with useLocalStorage

```tsx
import { useLongPress, useLocalStorage } from '@mantine/hooks';
import { Button, Text, Box } from '@mantine/core';

function LongPressWithStorage() {
  const [longPressCount, setLongPressCount] = useLocalStorage({
    key: 'long-press-count',
    defaultValue: 0
  });

  const handlers = useLongPress(
    () => setLongPressCount(prev => prev + 1),
    { threshold: 800 }
  );

  return (
    <Box>
      <Button {...handlers} size="lg">
        Long press to increment
      </Button>
      
      <Text mt="md">
        Total long presses: {longPressCount}
      </Text>
    </Box>
  );
}
```

## Troubleshooting

### Common Issues

1. **Long Press Not Triggering**
   - Check if the threshold is appropriate
   - Ensure event handlers are properly spread
   - Verify the element is interactive

2. **Touch Events Not Working**
   - Test on actual mobile devices
   - Check for CSS that might prevent touch events
   - Ensure proper touch event handling

3. **Performance Issues**
   - Use `useCallback` for long press handlers
   - Consider debouncing if needed
   - Avoid expensive operations in callbacks

### Debug Information

```tsx
import { useLongPress } from '@mantine/hooks';
import { Button, Text, Paper } from '@mantine/core';
import { useState } from 'react';

function DebugLongPress() {
  const [events, setEvents] = useState<string[]>([]);

  const handlers = useLongPress(
    (event) => {
      setEvents(prev => [...prev, `Long press: ${event.type}`]);
    },
    {
      threshold: 1000,
      onStart: (event) => {
        setEvents(prev => [...prev, `Start: ${event.type}`]);
      },
      onFinish: (event) => {
        setEvents(prev => [...prev, `Finish: ${event.type}`]);
      },
      onCancel: (event) => {
        setEvents(prev => [...prev, `Cancel: ${event.type}`]);
      }
    }
  );

  return (
    <div>
      <Button {...handlers} size="lg" mb="md">
        Debug Long Press
      </Button>

      <Paper p="md" style={{ backgroundColor: '#f8f9fa' }}>
        <Text size="sm" weight="bold">Event Log:</Text>
        {events.slice(-5).map((event, index) => (
          <Text key={index} size="sm">
            {event}
          </Text>
        ))}
      </Paper>
    </div>
  );
}
```

## Browser Support

- **Modern Browsers**: Full support
- **Mobile Browsers**: Full support with touch events
- **Legacy Browsers**: Full support
- **Server-Side**: Safe to use (no-op during SSR)

## Related Hooks

- `use-click-outside` - For click outside detection
- `use-hover` - For hover state management
- `use-focus` - For focus state management
- `use-disclosure` - For modal/overlay state management

## Best Practices

1. **Appropriate Thresholds**: Use 400-800ms for most use cases
2. **Visual Feedback**: Provide clear visual feedback during long press
3. **Accessibility**: Ensure long press doesn't interfere with other interactions
4. **Mobile Testing**: Test on actual mobile devices
5. **Performance**: Use memoization for expensive handlers

---

*The `use-long-press` hook provides a clean, cross-platform way to detect long press gestures. It's perfect for implementing context menus, delete confirmations, drag operations, and other long-press interactions with full mouse and touch support.*
