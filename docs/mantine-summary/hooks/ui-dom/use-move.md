# use-move Hook

## Overview

The `use-move` hook provides a powerful way to handle move behavior over any element, making it perfect for building custom sliders, color pickers, range selectors, and other interactive components. It tracks mouse and touch movements and provides normalized x and y coordinates (0-1 range) along with active state tracking.

## Installation

```bash
npm install @mantine/hooks
```

## Import

```typescript
import { useMove, clampUseMovePosition } from '@mantine/hooks';
import type { UseMovePosition, UseMoveHandlers, UseMoveReturnValue } from '@mantine/hooks';
```

## Basic Usage

### 2D Move Tracking

```tsx
import { useState } from 'react';
import { Group, Text, Code } from '@mantine/core';
import { useMove } from '@mantine/hooks';

function Demo() {
  const [value, setValue] = useState({ x: 0.2, y: 0.6 });
  const { ref, active } = useMove(setValue);

  return (
    <>
      <Group justify="center">
        <div
          ref={ref}
          style={{
            width: 400,
            height: 120,
            backgroundColor: 'var(--mantine-color-blue-light)',
            position: 'relative',
          }}
        >
          <div
            style={{
              position: 'absolute',
              left: `calc(${value.x * 100}% - 8px)`,
              top: `calc(${value.y * 100}% - 8px)`,
              width: 16,
              height: 16,
              backgroundColor: active ? 'var(--mantine-color-teal-7)' : 'var(--mantine-color-blue-7)',
            }}
          />
        </div>
      </Group>
      <Text ta="center" mt="sm">
        Values <Code>{`{ x: ${Math.round(value.x * 100)}, y: ${Math.round(value.y * 100)} }`}</Code>
      </Text>
    </>
  );
}
```

### 1D Move Tracking (Horizontal Slider)

```tsx
import { useState } from 'react';
import { Group, Text } from '@mantine/core';
import { useMove } from '@mantine/hooks';

function HorizontalSlider() {
  const [value, setValue] = useState(0.2);
  const { ref } = useMove(({ x }) => setValue(x));

  return (
    <>
      <Group justify="center">
        <div
          ref={ref}
          style={{
            width: 400,
            height: 16,
            backgroundColor: 'var(--mantine-color-blue-light)',
            position: 'relative',
          }}
        >
          {/* Filled bar */}
          <div
            style={{
              width: `${value * 100}%`,
              height: 16,
              backgroundColor: 'var(--mantine-color-blue-filled)',
              opacity: 0.7,
            }}
          />

          {/* Thumb */}
          <div
            style={{
              position: 'absolute',
              left: `calc(${value * 100}% - 8px)`,
              top: 0,
              width: 16,
              height: 16,
              backgroundColor: 'var(--mantine-color-blue-7)',
            }}
          />
        </div>
      </Group>

      <Text ta="center" mt="sm">
        Value: {Math.round(value * 100)}
      </Text>
    </>
  );
}
```

## API Reference

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `onChange` | `(value: UseMovePosition) => void` | **Required.** Callback called when position changes |
| `handlers` | `UseMoveHandlers` | **Optional.** Event handlers for scrub start/end |
| `dir` | `"ltr" \| "rtl"` | **Optional.** Direction for RTL support |

### UseMoveHandlers

| Property | Type | Description |
|----------|------|-------------|
| `onScrubStart` | `() => void` | Called when user starts moving |
| `onScrubEnd` | `() => void` | Called when user stops moving |

### Return Value

| Property | Type | Description |
|----------|------|-------------|
| `ref` | `React.RefCallback<T>` | Ref to attach to the target element |
| `active` | `boolean` | Whether the user is currently moving |

### Type Definitions

```typescript
interface UseMovePosition {
  x: number;
  y: number;
}

interface UseMoveHandlers {
  onScrubStart?: () => void;
  onScrubEnd?: () => void;
}

interface UseMoveReturnValue<T extends HTMLElement = any> {
  ref: React.RefCallback<T | null>;
  active: boolean;
}

function useMove<T extends HTMLElement = any>(
  onChange: (value: UseMovePosition) => void,
  handlers?: UseMoveHandlers,
  dir?: "ltr" | "rtl",
): UseMoveReturnValue<T>
```

## Key Features

### 1. **Normalized Coordinates**
- x and y values are always between 0 and 1
- Easy to map to any range or percentage
- Consistent behavior across different element sizes

### 2. **Cross-Platform Support**
- Works with both mouse and touch events
- Handles touch scrolling properly
- Consistent behavior across devices

### 3. **Active State Tracking**
- Real-time active state during movement
- Perfect for visual feedback and animations
- Automatic cleanup on interaction end

### 4. **RTL Support**
- Built-in right-to-left language support
- Automatic direction handling
- Consistent behavior in RTL layouts

## Advanced Usage

### With Event Handlers

```tsx
import { useState } from 'react';
import { useMove } from '@mantine/hooks';
import { Text, Box, Paper } from '@mantine/core';

function WithHandlers() {
  const [value, setValue] = useState({ x: 0.5, y: 0.5 });
  const [isScrubbing, setIsScrubbing] = useState(false);

  const { ref, active } = useMove(
    setValue,
    {
      onScrubStart: () => {
        setIsScrubbing(true);
        console.log('Started scrubbing');
      },
      onScrubEnd: () => {
        setIsScrubbing(false);
        console.log('Stopped scrubbing');
      }
    }
  );

  return (
    <Box>
      <Paper
        ref={ref}
        w={300}
        h={200}
        style={{
          backgroundColor: isScrubbing ? 'var(--mantine-color-blue-light)' : 'var(--mantine-color-gray-light)',
          position: 'relative',
          transition: 'background-color 0.2s ease',
        }}
      >
        <div
          style={{
            position: 'absolute',
            left: `calc(${value.x * 100}% - 8px)`,
            top: `calc(${value.y * 100}% - 8px)`,
            width: 16,
            height: 16,
            backgroundColor: active ? 'var(--mantine-color-red-7)' : 'var(--mantine-color-blue-7)',
            borderRadius: '50%',
          }}
        />
      </Paper>
      
      <Text ta="center" mt="md">
        {isScrubbing ? 'Scrubbing...' : 'Ready'} - Position: ({Math.round(value.x * 100)}, {Math.round(value.y * 100)})
      </Text>
    </Box>
  );
}
```

### With Clamping

```tsx
import { useState } from 'react';
import { useMove, clampUseMovePosition } from '@mantine/hooks';
import { Text, Box, Paper } from '@mantine/core';

function WithClamping() {
  const [value, setValue] = useState({ x: 0.3, y: 0.7 });

  const { ref, active } = useMove((position) => {
    // Clamp values to specific ranges
    const clamped = clampUseMovePosition(position);
    setValue(clamped);
  });

  return (
    <Box>
      <Paper
        ref={ref}
        w={300}
        h={200}
        style={{
          backgroundColor: 'var(--mantine-color-green-light)',
          position: 'relative',
        }}
      >
        <div
          style={{
            position: 'absolute',
            left: `calc(${value.x * 100}% - 8px)`,
            top: `calc(${value.y * 100}% - 8px)`,
            width: 16,
            height: 16,
            backgroundColor: active ? 'var(--mantine-color-orange-7)' : 'var(--mantine-color-green-7)',
            borderRadius: '50%',
          }}
        />
      </Paper>
      
      <Text ta="center" mt="md">
        Position: ({Math.round(value.x * 100)}, {Math.round(value.y * 100)})
      </Text>
    </Box>
  );
}
```

## Use Cases

### 1. **Custom Range Slider**

```tsx
import { useState } from 'react';
import { useMove } from '@mantine/hooks';
import { Text, Box, Paper, Group } from '@mantine/core';

function CustomRangeSlider() {
  const [value, setValue] = useState(0.3);
  const { ref, active } = useMove(({ x }) => setValue(x));

  return (
    <Box>
      <Text size="lg" mb="md">Custom Range Slider</Text>
      
      <Group justify="center">
        <Paper
          ref={ref}
          w={400}
          h={20}
          style={{
            backgroundColor: 'var(--mantine-color-gray-2)',
            position: 'relative',
            borderRadius: 10,
            cursor: 'pointer',
          }}
        >
          {/* Track */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundColor: 'var(--mantine-color-gray-3)',
              borderRadius: 10,
            }}
          />
          
          {/* Filled portion */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: `${value * 100}%`,
              height: '100%',
              backgroundColor: 'var(--mantine-color-blue-6)',
              borderRadius: 10,
            }}
          />
          
          {/* Thumb */}
          <div
            style={{
              position: 'absolute',
              left: `calc(${value * 100}% - 10px)`,
              top: '-5px',
              width: 20,
              height: 20,
              backgroundColor: active ? 'var(--mantine-color-blue-8)' : 'var(--mantine-color-blue-6)',
              borderRadius: '50%',
              border: '2px solid white',
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
              transition: 'all 0.2s ease',
            }}
          />
        </Paper>
      </Group>
      
      <Text ta="center" mt="md">
        Value: {Math.round(value * 100)}%
      </Text>
    </Box>
  );
}
```

### 2. **Vertical Slider**

```tsx
import { useState } from 'react';
import { useMove } from '@mantine/hooks';
import { Text, Box, Paper, Group } from '@mantine/core';

function VerticalSlider() {
  const [value, setValue] = useState(0.2);
  const { ref, active } = useMove(({ y }) => setValue(1 - y)); // Reverse Y for vertical

  return (
    <Box>
      <Text size="lg" mb="md">Vertical Slider</Text>
      
      <Group justify="center">
        <Paper
          ref={ref}
          w={20}
          h={200}
          style={{
            backgroundColor: 'var(--mantine-color-gray-2)',
            position: 'relative',
            borderRadius: 10,
            cursor: 'pointer',
          }}
        >
          {/* Track */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundColor: 'var(--mantine-color-gray-3)',
              borderRadius: 10,
            }}
          />
          
          {/* Filled portion */}
          <div
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              width: '100%',
              height: `${value * 100}%`,
              backgroundColor: 'var(--mantine-color-green-6)',
              borderRadius: 10,
            }}
          />
          
          {/* Thumb */}
          <div
            style={{
              position: 'absolute',
              bottom: `calc(${value * 100}% - 10px)`,
              left: '-5px',
              width: 20,
              height: 20,
              backgroundColor: active ? 'var(--mantine-color-green-8)' : 'var(--mantine-color-green-6)',
              borderRadius: '50%',
              border: '2px solid white',
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
              transition: 'all 0.2s ease',
            }}
          />
        </Paper>
      </Group>
      
      <Text ta="center" mt="md">
        Value: {Math.round(value * 100)}%
      </Text>
    </Box>
  );
}
```

### 3. **Color Picker**

```tsx
import { useState } from 'react';
import { useMove } from '@mantine/hooks';
import { Text, Box, Paper, Group } from '@mantine/core';

function ColorPicker() {
  const [value, setValue] = useState({ x: 0.2, y: 0.6 });
  const { ref, active } = useMove(setValue);

  // Calculate color based on position
  const getColor = () => {
    const hue = value.x * 360;
    const saturation = 100;
    const lightness = (1 - value.y) * 100;
    return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
  };

  return (
    <Box>
      <Text size="lg" mb="md">Color Picker</Text>
      
      <Group justify="center">
        <Paper
          ref={ref}
          w={300}
          h={200}
          style={{
            background: 'linear-gradient(45deg, #ff0000, #ffff00, #00ff00, #00ffff, #0000ff, #ff00ff, #ff0000)',
            position: 'relative',
            borderRadius: 8,
            cursor: 'pointer',
          }}
        >
          {/* Saturation overlay */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'linear-gradient(0deg, #000, transparent)',
              borderRadius: 8,
            }}
          />
          
          {/* Thumb */}
          <div
            style={{
              position: 'absolute',
              left: `calc(${value.x * 100}% - 8px)`,
              top: `calc(${value.y * 100}% - 8px)`,
              width: 16,
              height: 16,
              border: '2px solid white',
              borderRadius: '50%',
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
            }}
          />
        </Paper>
      </Group>
      
      <Group justify="center" mt="md">
        <div
          style={{
            width: 50,
            height: 50,
            backgroundColor: getColor(),
            borderRadius: 8,
            border: '2px solid #ccc',
          }}
        />
        <Text>
          Color: {getColor()}
        </Text>
      </Group>
    </Box>
  );
}
```

### 4. **2D Range Selector**

```tsx
import { useState } from 'react';
import { useMove } from '@mantine/hooks';
import { Text, Box, Paper, Group } from '@mantine/core';

function RangeSelector() {
  const [startValue, setStartValue] = useState({ x: 0.2, y: 0.3 });
  const [endValue, setEndValue] = useState({ x: 0.8, y: 0.7 });
  const [isSelecting, setIsSelecting] = useState(false);

  const { ref: startRef, active: startActive } = useMove(
    (position) => {
      setStartValue(position);
      setIsSelecting(true);
    },
    {
      onScrubEnd: () => setIsSelecting(false)
    }
  );

  const { ref: endRef, active: endActive } = useMove(
    (position) => {
      setEndValue(position);
      setIsSelecting(true);
    },
    {
      onScrubEnd: () => setIsSelecting(false)
    }
  );

  return (
    <Box>
      <Text size="lg" mb="md">2D Range Selector</Text>
      
      <Group justify="center">
        <Paper
          w={400}
          h={300}
          style={{
            backgroundColor: 'var(--mantine-color-gray-1)',
            position: 'relative',
            borderRadius: 8,
            border: '2px solid #ccc',
          }}
        >
          {/* Selection area */}
          <div
            style={{
              position: 'absolute',
              left: `${Math.min(startValue.x, endValue.x) * 100}%`,
              top: `${Math.min(startValue.y, endValue.y) * 100}%`,
              width: `${Math.abs(endValue.x - startValue.x) * 100}%`,
              height: `${Math.abs(endValue.y - startValue.y) * 100}%`,
              backgroundColor: 'rgba(74, 144, 226, 0.3)',
              border: '2px solid var(--mantine-color-blue-6)',
              borderRadius: 4,
            }}
          />
          
          {/* Start handle */}
          <div
            ref={startRef}
            style={{
              position: 'absolute',
              left: `calc(${startValue.x * 100}% - 8px)`,
              top: `calc(${startValue.y * 100}% - 8px)`,
              width: 16,
              height: 16,
              backgroundColor: startActive ? 'var(--mantine-color-red-7)' : 'var(--mantine-color-blue-7)',
              borderRadius: '50%',
              cursor: 'move',
            }}
          />
          
          {/* End handle */}
          <div
            ref={endRef}
            style={{
              position: 'absolute',
              left: `calc(${endValue.x * 100}% - 8px)`,
              top: `calc(${endValue.y * 100}% - 8px)`,
              width: 16,
              height: 16,
              backgroundColor: endActive ? 'var(--mantine-color-green-7)' : 'var(--mantine-color-blue-7)',
              borderRadius: '50%',
              cursor: 'move',
            }}
          />
        </Paper>
      </Group>
      
      <Text ta="center" mt="md">
        Start: ({Math.round(startValue.x * 100)}, {Math.round(startValue.y * 100)}) | 
        End: ({Math.round(endValue.x * 100)}, {Math.round(endValue.y * 100)})
      </Text>
    </Box>
  );
}
```

### 5. **Volume Control**

```tsx
import { useState } from 'react';
import { useMove } from '@mantine/hooks';
import { Text, Box, Paper, Group, Stack } from '@mantine/core';

function VolumeControl() {
  const [volume, setVolume] = useState(0.7);
  const [isMuted, setIsMuted] = useState(false);
  const { ref, active } = useMove(({ x }) => {
    const newVolume = Math.max(0, Math.min(1, x));
    setVolume(newVolume);
    setIsMuted(newVolume === 0);
  });

  const getVolumeIcon = () => {
    if (isMuted) return '🔇';
    if (volume < 0.3) return '🔈';
    if (volume < 0.7) return '🔉';
    return '🔊';
  };

  return (
    <Box>
      <Text size="lg" mb="md">Volume Control</Text>
      
      <Group justify="center">
        <Stack align="center" gap="xs">
          <Text size="xl">{getVolumeIcon()}</Text>
          
          <Paper
            ref={ref}
            w={20}
            h={150}
            style={{
              backgroundColor: 'var(--mantine-color-gray-2)',
              position: 'relative',
              borderRadius: 10,
              cursor: 'pointer',
            }}
          >
            {/* Track */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundColor: 'var(--mantine-color-gray-3)',
                borderRadius: 10,
              }}
            />
            
            {/* Filled portion */}
            <div
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                width: '100%',
                height: `${volume * 100}%`,
                backgroundColor: isMuted ? 'var(--mantine-color-red-6)' : 'var(--mantine-color-green-6)',
                borderRadius: 10,
              }}
            />
            
            {/* Thumb */}
            <div
              style={{
                position: 'absolute',
                bottom: `calc(${volume * 100}% - 8px)`,
                left: '-4px',
                width: 16,
                height: 16,
                backgroundColor: active ? 'var(--mantine-color-blue-8)' : 'var(--mantine-color-blue-6)',
                borderRadius: '50%',
                border: '2px solid white',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
                transition: 'all 0.2s ease',
              }}
            />
          </Paper>
          
          <Text size="sm" ta="center">
            {Math.round(volume * 100)}%
          </Text>
        </Stack>
      </Group>
    </Box>
  );
}
```

### 6. **Progress Scrubber**

```tsx
import { useState } from 'react';
import { useMove } from '@mantine/hooks';
import { Text, Box, Paper, Group } from '@mantine/core';

function ProgressScrubber() {
  const [progress, setProgress] = useState(0.3);
  const [isScrubbing, setIsScrubbing] = useState(false);
  const { ref, active } = useMove(
    ({ x }) => setProgress(x),
    {
      onScrubStart: () => setIsScrubbing(true),
      onScrubEnd: () => setIsScrubbing(false)
    }
  );

  const formatTime = (value: number) => {
    const totalSeconds = Math.floor(value * 300); // 5 minutes total
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <Box>
      <Text size="lg" mb="md">Progress Scrubber</Text>
      
      <Group justify="center">
        <Paper
          ref={ref}
          w={400}
          h={8}
          style={{
            backgroundColor: 'var(--mantine-color-gray-2)',
            position: 'relative',
            borderRadius: 4,
            cursor: 'pointer',
          }}
        >
          {/* Track */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundColor: 'var(--mantine-color-gray-3)',
              borderRadius: 4,
            }}
          />
          
          {/* Progress */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: `${progress * 100}%`,
              height: '100%',
              backgroundColor: isScrubbing ? 'var(--mantine-color-orange-6)' : 'var(--mantine-color-blue-6)',
              borderRadius: 4,
            }}
          />
          
          {/* Thumb */}
          <div
            style={{
              position: 'absolute',
              left: `calc(${progress * 100}% - 6px)`,
              top: '-4px',
              width: 12,
              height: 12,
              backgroundColor: active ? 'var(--mantine-color-blue-8)' : 'var(--mantine-color-blue-6)',
              borderRadius: '50%',
              border: '2px solid white',
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
              transition: 'all 0.2s ease',
            }}
          />
        </Paper>
      </Group>
      
      <Group justify="center" mt="md">
        <Text size="sm">{formatTime(progress)}</Text>
        <Text size="sm" color="dimmed">/ {formatTime(1)}</Text>
        {isScrubbing && <Text size="sm" color="orange">Scrubbing...</Text>}
      </Group>
    </Box>
  );
}
```

## Performance Considerations

### Memoized Move Handler

```tsx
import { useMove } from '@mantine/hooks';
import { memo, useCallback } from 'react';
import { Text, Box, Paper } from '@mantine/core';

const MoveTracker = memo(function MoveTracker({ 
  onMove 
}: { 
  onMove: (x: number, y: number) => void; 
}) {
  const { ref, active } = useMove(
    useCallback(({ x, y }) => {
      onMove(x, y);
    }, [onMove])
  );

  return (
    <Paper
      ref={ref}
      w={200}
      h={200}
      style={{
        backgroundColor: active ? 'var(--mantine-color-blue-light)' : 'var(--mantine-color-gray-light)',
        position: 'relative',
      }}
    >
      <Text ta="center" mt="xl">
        {active ? 'Moving...' : 'Ready'}
      </Text>
    </Paper>
  );
});

function OptimizedMove() {
  const handleMove = useCallback((x: number, y: number) => {
    console.log('Move to:', x, y);
  }, []);

  return (
    <div>
      <MoveTracker onMove={handleMove} />
    </div>
  );
}
```

### Conditional Move Tracking

```tsx
import { useMove } from '@mantine/hooks';
import { Text, Box, Paper, Switch } from '@mantine/core';
import { useState } from 'react';

function ConditionalMove() {
  const [enabled, setEnabled] = useState(true);
  const [value, setValue] = useState({ x: 0.5, y: 0.5 });

  const { ref, active } = useMove(
    enabled ? setValue : () => {},
    enabled ? undefined : undefined
  );

  return (
    <Box>
      <Switch
        label="Enable move tracking"
        checked={enabled}
        onChange={(event) => setEnabled(event.currentTarget.checked)}
        mb="md"
      />
      
      <Paper
        ref={ref}
        w={200}
        h={200}
        style={{
          backgroundColor: enabled 
            ? (active ? 'var(--mantine-color-green-light)' : 'var(--mantine-color-blue-light)')
            : 'var(--mantine-color-gray-light)',
          position: 'relative',
        }}
      >
        <Text ta="center" mt="xl">
          {enabled ? (active ? 'Moving...' : 'Ready') : 'Disabled'}
        </Text>
      </Paper>
      
      <Text ta="center" mt="md">
        Position: ({Math.round(value.x * 100)}, {Math.round(value.y * 100)})
      </Text>
    </Box>
  );
}
```

## Common Patterns

### Move with State Management

```tsx
import { useMove } from '@mantine/hooks';
import { Text, Box, Paper, Button } from '@mantine/core';
import { useState, useEffect } from 'react';

function MoveWithState() {
  const [value, setValue] = useState({ x: 0.5, y: 0.5 });
  const [history, setHistory] = useState<Array<{ x: number; y: number; timestamp: number }>>([]);

  const { ref, active } = useMove(setValue);

  useEffect(() => {
    if (active) {
      setHistory(prev => [...prev, { x: value.x, y: value.y, timestamp: Date.now() }]);
    }
  }, [value, active]);

  const clearHistory = () => setHistory([]);

  return (
    <Box>
      <Paper
        ref={ref}
        w={200}
        h={200}
        style={{
          backgroundColor: active ? 'var(--mantine-color-orange-light)' : 'var(--mantine-color-blue-light)',
          position: 'relative',
        }}
      >
        <Text ta="center" mt="xl">
          {active ? 'Moving...' : 'Ready'}
        </Text>
      </Paper>
      
      <Text ta="center" mt="md">
        Current: ({Math.round(value.x * 100)}, {Math.round(value.y * 100)})
      </Text>
      <Text ta="center" size="sm" color="dimmed">
        History: {history.length} moves
      </Text>
      
      <Button onClick={clearHistory} mt="md" fullWidth>
        Clear History
      </Button>
    </Box>
  );
}
```

### Move with Animation

```tsx
import { useMove } from '@mantine/hooks';
import { Text, Box, Paper } from '@mantine/core';
import { useState } from 'react';

function AnimatedMove() {
  const [value, setValue] = useState({ x: 0.5, y: 0.5 });
  const { ref, active } = useMove(setValue);

  return (
    <Box>
      <Paper
        ref={ref}
        w={300}
        h={200}
        style={{
          backgroundColor: 'var(--mantine-color-gray-light)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Animated background */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: `radial-gradient(circle at ${value.x * 100}% ${value.y * 100}%, 
              rgba(74, 144, 226, 0.3), 
              rgba(74, 144, 226, 0.1))`,
            transition: 'background 0.1s ease',
          }}
        />
        
        {/* Moving element */}
        <div
          style={{
            position: 'absolute',
            left: `calc(${value.x * 100}% - 20px)`,
            top: `calc(${value.y * 100}% - 20px)`,
            width: '40px',
            height: '40px',
            backgroundColor: active ? 'var(--mantine-color-red-6)' : 'var(--mantine-color-blue-6)',
            borderRadius: '50%',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            transform: active ? 'scale(1.2)' : 'scale(1)',
            boxShadow: active 
              ? '0 8px 25px rgba(74, 144, 226, 0.4)' 
              : '0 4px 12px rgba(74, 144, 226, 0.2)',
          }}
        />
        
        <Text ta="center" mt="xl" style={{ position: 'relative', zIndex: 10 }}>
          {active ? 'Moving...' : 'Move me around'}
        </Text>
      </Paper>
    </Box>
  );
}
```

## Integration with Other Hooks

### Combined with useDisclosure

```tsx
import { useMove, useDisclosure } from '@mantine/hooks';
import { Modal, Button, Text, Box, Paper } from '@mantine/core';

function MoveWithModal() {
  const [value, setValue] = useState({ x: 0.5, y: 0.5 });
  const { ref, active } = useMove(setValue);
  const [opened, { open, close }] = useDisclosure();

  return (
    <Box>
      <Paper
        ref={ref}
        w={200}
        h={200}
        style={{
          backgroundColor: active ? 'var(--mantine-color-green-light)' : 'var(--mantine-color-blue-light)',
          position: 'relative',
        }}
      >
        <Text ta="center" mt="xl">
          {active ? 'Moving...' : 'Ready'}
        </Text>
      </Paper>
      
      <Button onClick={open} mt="md" fullWidth>
        Open Modal
      </Button>

      <Modal
        opened={opened}
        onClose={close}
        title="Move Position"
      >
        <Text>Current position: ({Math.round(value.x * 100)}, {Math.round(value.y * 100)})</Text>
        <Text>Active: {active ? 'Yes' : 'No'}</Text>
      </Modal>
    </Box>
  );
}
```

### Combined with useLocalStorage

```tsx
import { useMove, useLocalStorage } from '@mantine/hooks';
import { Text, Box, Paper, Button } from '@mantine/core';

function MoveWithStorage() {
  const [value, setValue] = useState({ x: 0.5, y: 0.5 });
  const { ref, active } = useMove(setValue);
  const [savedPositions, setSavedPositions] = useLocalStorage({
    key: 'move-positions',
    defaultValue: [] as Array<{ x: number; y: number; timestamp: number }>
  });

  const savePosition = () => {
    setSavedPositions(prev => [...prev, { x: value.x, y: value.y, timestamp: Date.now() }]);
  };

  return (
    <Box>
      <Paper
        ref={ref}
        w={200}
        h={200}
        style={{
          backgroundColor: active ? 'var(--mantine-color-orange-light)' : 'var(--mantine-color-blue-light)',
          position: 'relative',
        }}
      >
        <Text ta="center" mt="xl">
          {active ? 'Moving...' : 'Ready'}
        </Text>
      </Paper>
      
      <Text ta="center" mt="md">
        Current: ({Math.round(value.x * 100)}, {Math.round(value.y * 100)})
      </Text>
      <Text ta="center" size="sm" color="dimmed">
        Saved: {savedPositions.length} positions
      </Text>
      
      <Button onClick={savePosition} mt="md" fullWidth>
        Save Position
      </Button>
    </Box>
  );
}
```

## Troubleshooting

### Common Issues

1. **Move Not Working**
   - Check if the ref is properly attached
   - Ensure the element is interactive
   - Verify event handlers are not preventing default

2. **Performance Issues**
   - Use memoization for expensive calculations
   - Consider debouncing if needed
   - Avoid unnecessary re-renders

3. **Touch Issues**
   - Test on actual mobile devices
   - Check for CSS that might prevent touch events
   - Ensure proper touch event handling

### Debug Information

```tsx
import { useMove } from '@mantine/hooks';
import { Text, Box, Paper } from '@mantine/core';

function DebugMove() {
  const [value, setValue] = useState({ x: 0.5, y: 0.5 });
  const { ref, active } = useMove(setValue);

  return (
    <Box>
      <Paper
        ref={ref}
        w={200}
        h={200}
        style={{
          backgroundColor: active ? 'var(--mantine-color-red-light)' : 'var(--mantine-color-blue-light)',
          position: 'relative',
        }}
      >
        <Text ta="center" mt="xl">
          {active ? 'Moving...' : 'Ready'}
        </Text>
      </Paper>
      
      <Paper p="md" mt="md" style={{ backgroundColor: '#f8f9fa' }}>
        <Text size="lg" weight="bold" mb="md">Move Debug Info</Text>
        
        <Box>
          <Text>X Position: {value.x.toFixed(3)}</Text>
          <Text>Y Position: {value.y.toFixed(3)}</Text>
          <Text>Active: {active ? 'Yes' : 'No'}</Text>
          <Text>Distance from center: {Math.sqrt((value.x - 0.5) ** 2 + (value.y - 0.5) ** 2).toFixed(3)}</Text>
        </Box>
      </Paper>
    </Box>
  );
}
```

## Browser Support

- **Modern Browsers**: Full support
- **Legacy Browsers**: Full support
- **Mobile Browsers**: Full support with touch events
- **Server-Side**: Safe to use (returns initial values during SSR)

## Related Hooks

- `use-mouse` - For mouse position tracking
- `use-hover` - For hover state management
- `use-long-press` - For long press detection
- `use-event-listener` - For custom event handling

## Best Practices

1. **Performance**: Use memoization for expensive calculations
2. **Accessibility**: Ensure move interactions don't break keyboard navigation
3. **Mobile**: Test on actual mobile devices
4. **Visual Feedback**: Provide clear visual feedback during interaction
5. **Cleanup**: The hook handles cleanup automatically

---

*The `use-move` hook provides a powerful, flexible way to handle move interactions in React applications. It's perfect for building custom sliders, color pickers, range selectors, and other interactive components with excellent performance and full cross-platform support.*
