# use-radial-move Hook

## Overview

The `use-radial-move` hook provides a powerful way to handle radial move behavior over any element, making it perfect for building custom radial sliders, circular controls, angle selectors, and other circular input components. It works similarly to the `use-move` hook but is specifically designed for circular/radial interactions.

## Installation

```bash
npm install @mantine/hooks
```

## Import

```typescript
import { useRadialMove } from '@mantine/hooks';
import type { UseRadialMoveOptions, UseRadialMoveReturnValue } from '@mantine/hooks';
```

## Basic Usage

### Simple Radial Slider

```tsx
import { useState } from 'react';
import { Box } from '@mantine/core';
import { useRadialMove } from '@mantine/hooks';

function Demo() {
  const [value, setValue] = useState(115);
  const { ref } = useRadialMove(setValue);

  return (
    <Box 
      ref={ref} 
      style={{ 
        '--angle': `${value}deg`,
        width: '200px',
        height: '200px',
        borderRadius: '50%',
        backgroundColor: '#f0f0f0',
        position: 'relative',
        cursor: 'pointer'
      }}
    >
      <div style={{ 
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        fontSize: '18px',
        fontWeight: 'bold'
      }}>
        {value}°
      </div>
      <div style={{
        position: 'absolute',
        top: '10px',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '8px',
        height: '8px',
        backgroundColor: '#007bff',
        borderRadius: '50%'
      }} />
    </Box>
  );
}
```

## API Reference

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `onChange` | `(value: number) => void` | **Required.** Callback called when the radial value changes |
| `options` | `UseRadialMoveOptions` | **Optional.** Configuration options for the radial move behavior |

### UseRadialMoveOptions

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `step` | `number` | `0.01` | Number by which value is incremented/decremented with mouse and touch events |
| `onChangeEnd` | `(value: number) => void` | `undefined` | Called in `onMouseUp` and `onTouchEnd` events with the current value |
| `onScrubStart` | `() => void` | `undefined` | Called in `onMouseDown` and `onTouchStart` events |
| `onScrubEnd` | `() => void` | `undefined` | Called in `onMouseUp` and `onTouchEnd` events |

### Return Value

| Property | Type | Description |
|----------|------|-------------|
| `ref` | `React.RefCallback<T>` | Ref to be passed to the element that should be used for radial move |
| `active` | `boolean` | Indicates whether the radial move is active |

### Type Definitions

```typescript
interface UseRadialMoveOptions {
  step?: number;
  onChangeEnd?: (value: number) => void;
  onScrubStart?: () => void;
  onScrubEnd?: () => void;
}

interface UseRadialMoveReturnValue<T extends HTMLElement = any> {
  ref: React.RefCallback<T | null>;
  active: boolean;
}

function useRadialMove<T extends HTMLElement = HTMLDivElement>(
  onChange: (value: number) => void,
  options?: UseRadialMoveOptions,
): UseRadialMoveReturnValue<T>;
```

## Key Features

### 1. **Circular Input Handling**
- Converts mouse/touch coordinates to angular values
- Handles circular boundary conditions
- Smooth radial movement tracking

### 2. **Cross-Platform Support**
- Works with both mouse and touch events
- Handles touch scrolling properly
- Consistent behavior across devices

### 3. **Configurable Step Size**
- Precise control over value increments
- Smooth or stepped movement
- Customizable sensitivity

### 4. **Event Callbacks**
- `onScrubStart`: When interaction begins
- `onScrubEnd`: When interaction ends
- `onChangeEnd`: Final value on interaction end

## Advanced Usage

### With Event Handlers

```tsx
import { useState } from 'react';
import { useRadialMove } from '@mantine/hooks';
import { Text, Box, Paper } from '@mantine/core';

function WithHandlers() {
  const [value, setValue] = useState(0);
  const [isScrubbing, setIsScrubbing] = useState(false);

  const { ref, active } = useRadialMove(
    setValue,
    {
      step: 0.1,
      onScrubStart: () => {
        setIsScrubbing(true);
        console.log('Radial scrub started');
      },
      onScrubEnd: () => {
        setIsScrubbing(false);
        console.log('Radial scrub ended');
      },
      onChangeEnd: (finalValue) => {
        console.log('Final value:', finalValue);
      }
    }
  );

  return (
    <Box>
      <Paper
        ref={ref}
        w={200}
        h={200}
        style={{
          borderRadius: '50%',
          backgroundColor: isScrubbing ? '#e3f2fd' : '#f0f0f0',
          position: 'relative',
          cursor: 'pointer',
          transition: 'background-color 0.2s ease',
        }}
      >
        <Text
          ta="center"
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            fontSize: '18px',
            fontWeight: 'bold'
          }}
        >
          {Math.round(value)}°
        </Text>
      </Paper>
      
      <Text ta="center" mt="md">
        {isScrubbing ? 'Scrubbing...' : 'Ready'} - Value: {Math.round(value)}°
      </Text>
    </Box>
  );
}
```

### With Custom Step Size

```tsx
import { useState } from 'react';
import { useRadialMove } from '@mantine/hooks';
import { Text, Box, Paper, Slider } from '@mantine/core';

function CustomStepSize() {
  const [value, setValue] = useState(0);
  const [stepSize, setStepSize] = useState(0.1);

  const { ref, active } = useRadialMove(
    setValue,
    { step: stepSize }
  );

  return (
    <Box>
      <Text size="lg" mb="md">Custom Step Size</Text>
      
      <Text size="sm" mb="xs">Step Size: {stepSize}</Text>
      <Slider
        value={stepSize}
        onChange={setStepSize}
        min={0.01}
        max={1}
        step={0.01}
        mb="md"
      />

      <Paper
        ref={ref}
        w={200}
        h={200}
        style={{
          borderRadius: '50%',
          backgroundColor: active ? '#e8f5e8' : '#f0f0f0',
          position: 'relative',
          cursor: 'pointer',
        }}
      >
        <Text
          ta="center"
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            fontSize: '18px',
            fontWeight: 'bold'
          }}
        >
          {Math.round(value)}°
        </Text>
      </Paper>
    </Box>
  );
}
```

## Use Cases

### 1. **Angle Slider Component**

```tsx
import { useState } from 'react';
import { useRadialMove } from '@mantine/hooks';
import { Text, Box, Paper, Group, Button } from '@mantine/core';

function AngleSlider() {
  const [angle, setAngle] = useState(45);
  const { ref, active } = useRadialMove(setAngle, { step: 0.5 });

  const resetAngle = () => setAngle(0);
  const setTo90 = () => setAngle(90);
  const setTo180 = () => setAngle(180);

  return (
    <Box>
      <Text size="lg" mb="md">Angle Slider</Text>
      
      <Paper
        ref={ref}
        w={250}
        h={250}
        style={{
          borderRadius: '50%',
          backgroundColor: '#f8f9fa',
          position: 'relative',
          cursor: 'pointer',
          border: '3px solid #e9ecef',
        }}
      >
        {/* Center point */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '8px',
            height: '8px',
            backgroundColor: '#007bff',
            borderRadius: '50%',
          }}
        />
        
        {/* Angle line */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: '80px',
            height: '2px',
            backgroundColor: '#007bff',
            transformOrigin: 'left center',
            transform: `rotate(${angle}deg)`,
          }}
        />
        
        {/* Angle indicator */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: '80px',
            height: '80px',
            border: '2px solid #007bff',
            borderRadius: '50%',
            transform: 'translate(-50%, -50%)',
            clipPath: `polygon(50% 50%, 50% 0%, ${50 + 40 * Math.cos((angle - 90) * Math.PI / 180)}% ${50 + 40 * Math.sin((angle - 90) * Math.PI / 180)}%)`,
          }}
        />
        
        {/* Value display */}
        <Text
          ta="center"
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            fontSize: '16px',
            fontWeight: 'bold',
            color: '#007bff',
          }}
        >
          {Math.round(angle)}°
        </Text>
      </Paper>

      <Group justify="center" mt="md">
        <Button onClick={resetAngle} size="sm">Reset</Button>
        <Button onClick={setTo90} size="sm">90°</Button>
        <Button onClick={setTo180} size="sm">180°</Button>
      </Group>
    </Box>
  );
}
```

### 2. **Color Hue Picker**

```tsx
import { useState } from 'react';
import { useRadialMove } from '@mantine/hooks';
import { Text, Box, Paper } from '@mantine/core';

function ColorHuePicker() {
  const [hue, setHue] = useState(180);
  const { ref, active } = useRadialMove(
    (value) => setHue(value * 360),
    { step: 0.01 }
  );

  const getColor = () => `hsl(${hue}, 100%, 50%)`;

  return (
    <Box>
      <Text size="lg" mb="md">Color Hue Picker</Text>
      
      <Paper
        ref={ref}
        w={200}
        h={200}
        style={{
          borderRadius: '50%',
          background: 'conic-gradient(from 0deg, #ff0000, #ffff00, #00ff00, #00ffff, #0000ff, #ff00ff, #ff0000)',
          position: 'relative',
          cursor: 'pointer',
        }}
      >
        {/* Center circle */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '60px',
            height: '60px',
            backgroundColor: getColor(),
            borderRadius: '50%',
            border: '3px solid white',
          }}
        />
        
        {/* Hue indicator */}
        <div
          style={{
            position: 'absolute',
            top: '20px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '8px',
            height: '8px',
            backgroundColor: 'white',
            borderRadius: '50%',
            boxShadow: '0 0 0 2px #333',
          }}
        />
      </Paper>
      
      <Text ta="center" mt="md">
        Hue: {Math.round(hue)}°
      </Text>
      <Text ta="center" size="sm" color="dimmed">
        Color: {getColor()}
      </Text>
    </Box>
  );
}
```

### 3. **Volume Control**

```tsx
import { useState } from 'react';
import { useRadialMove } from '@mantine/hooks';
import { Text, Box, Paper, Group, Button } from '@mantine/core';

function VolumeControl() {
  const [volume, setVolume] = useState(50);
  const [isMuted, setIsMuted] = useState(false);
  const { ref, active } = useRadialMove(
    (value) => setVolume(value * 100),
    { step: 0.01 }
  );

  const getVolumeIcon = () => {
    if (isMuted || volume === 0) return '🔇';
    if (volume < 30) return '🔈';
    if (volume < 70) return '🔉';
    return '🔊';
  };

  const toggleMute = () => setIsMuted(!isMuted);

  return (
    <Box>
      <Text size="lg" mb="md">Volume Control</Text>
      
      <Paper
        ref={ref}
        w={200}
        h={200}
        style={{
          borderRadius: '50%',
          backgroundColor: '#f8f9fa',
          position: 'relative',
          cursor: 'pointer',
          border: '3px solid #e9ecef',
        }}
      >
        {/* Volume arc */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: '160px',
            height: '160px',
            border: '8px solid transparent',
            borderTopColor: isMuted ? '#dc3545' : '#28a745',
            borderRadius: '50%',
            transform: 'translate(-50%, -50%) rotate(-90deg)',
            clipPath: `polygon(50% 50%, 50% 0%, ${50 + 40 * Math.cos((volume * 1.8 - 90) * Math.PI / 180)}% ${50 + 40 * Math.sin((volume * 1.8 - 90) * Math.PI / 180)}%)`,
          }}
        />
        
        {/* Volume icon */}
        <Text
          ta="center"
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            fontSize: '24px',
          }}
        >
          {getVolumeIcon()}
        </Text>
        
        {/* Volume percentage */}
        <Text
          ta="center"
          style={{
            position: 'absolute',
            top: '60%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            fontSize: '14px',
            fontWeight: 'bold',
            color: isMuted ? '#dc3545' : '#28a745',
          }}
        >
          {isMuted ? 'Muted' : `${Math.round(volume)}%`}
        </Text>
      </Paper>

      <Group justify="center" mt="md">
        <Button onClick={toggleMute} size="sm">
          {isMuted ? 'Unmute' : 'Mute'}
        </Button>
      </Group>
    </Box>
  );
}
```

### 4. **Timer/Stopwatch Control**

```tsx
import { useState, useEffect } from 'react';
import { useRadialMove } from '@mantine/hooks';
import { Text, Box, Paper, Group, Button } from '@mantine/core';

function TimerControl() {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const { ref, active } = useRadialMove(
    (value) => setTime(value * 60), // 0-60 minutes
    { step: 0.1 }
  );

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning && time > 0) {
      interval = setInterval(() => {
        setTime(prev => Math.max(0, prev - 1));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning, time]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const startStop = () => setIsRunning(!isRunning);
  const reset = () => {
    setTime(0);
    setIsRunning(false);
  };

  const progress = (time / 60) * 100;

  return (
    <Box>
      <Text size="lg" mb="md">Timer Control</Text>
      
      <Paper
        ref={ref}
        w={200}
        h={200}
        style={{
          borderRadius: '50%',
          backgroundColor: '#f8f9fa',
          position: 'relative',
          cursor: 'pointer',
          border: '3px solid #e9ecef',
        }}
      >
        {/* Progress arc */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: '160px',
            height: '160px',
            border: '8px solid transparent',
            borderTopColor: isRunning ? '#28a745' : '#007bff',
            borderRadius: '50%',
            transform: 'translate(-50%, -50%) rotate(-90deg)',
            clipPath: `polygon(50% 50%, 50% 0%, ${50 + 40 * Math.cos((progress * 3.6 - 90) * Math.PI / 180)}% ${50 + 40 * Math.sin((progress * 3.6 - 90) * Math.PI / 180)}%)`,
          }}
        />
        
        {/* Time display */}
        <Text
          ta="center"
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            fontSize: '18px',
            fontWeight: 'bold',
            color: isRunning ? '#28a745' : '#007bff',
          }}
        >
          {formatTime(time)}
        </Text>
      </Paper>

      <Group justify="center" mt="md">
        <Button onClick={startStop} color={isRunning ? 'red' : 'green'}>
          {isRunning ? 'Stop' : 'Start'}
        </Button>
        <Button onClick={reset} variant="outline">
          Reset
        </Button>
      </Group>
    </Box>
  );
}
```

### 5. **Directional Control**

```tsx
import { useState } from 'react';
import { useRadialMove } from '@mantine/hooks';
import { Text, Box, Paper, Group, Button } from '@mantine/core';

function DirectionalControl() {
  const [direction, setDirection] = useState(0);
  const { ref, active } = useRadialMove(
    (value) => setDirection(value * 360),
    { step: 0.01 }
  );

  const getDirectionName = (angle: number) => {
    const directions = ['North', 'Northeast', 'East', 'Southeast', 'South', 'Southwest', 'West', 'Northwest'];
    const index = Math.round(angle / 45) % 8;
    return directions[index];
  };

  const resetDirection = () => setDirection(0);
  const setNorth = () => setDirection(0);
  const setEast = () => setDirection(90);
  const setSouth = () => setDirection(180);
  const setWest = () => setDirection(270);

  return (
    <Box>
      <Text size="lg" mb="md">Directional Control</Text>
      
      <Paper
        ref={ref}
        w={200}
        h={200}
        style={{
          borderRadius: '50%',
          backgroundColor: '#f8f9fa',
          position: 'relative',
          cursor: 'pointer',
          border: '3px solid #e9ecef',
        }}
      >
        {/* Direction line */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: '60px',
            height: '2px',
            backgroundColor: '#007bff',
            transformOrigin: 'left center',
            transform: `rotate(${direction}deg)`,
          }}
        />
        
        {/* Center point */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '8px',
            height: '8px',
            backgroundColor: '#007bff',
            borderRadius: '50%',
          }}
        />
        
        {/* Direction labels */}
        {['N', 'E', 'S', 'W'].map((label, index) => (
          <Text
            key={label}
            ta="center"
            style={{
              position: 'absolute',
              top: index === 0 ? '10px' : index === 2 ? '90%' : '50%',
              left: index === 1 ? '90%' : index === 3 ? '10px' : '50%',
              transform: 'translate(-50%, -50%)',
              fontSize: '14px',
              fontWeight: 'bold',
              color: '#666',
            }}
          >
            {label}
          </Text>
        ))}
        
        {/* Current direction */}
        <Text
          ta="center"
          style={{
            position: 'absolute',
            top: '60%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            fontSize: '14px',
            fontWeight: 'bold',
            color: '#007bff',
          }}
        >
          {getDirectionName(direction)}
        </Text>
      </Paper>

      <Group justify="center" mt="md">
        <Button onClick={setNorth} size="sm">N</Button>
        <Button onClick={setEast} size="sm">E</Button>
        <Button onClick={setSouth} size="sm">S</Button>
        <Button onClick={setWest} size="sm">W</Button>
        <Button onClick={resetDirection} size="sm" variant="outline">Reset</Button>
      </Group>
    </Box>
  );
}
```

## Performance Considerations

### Memoized Radial Move

```tsx
import { useRadialMove } from '@mantine/hooks';
import { memo, useCallback } from 'react';
import { Text, Box, Paper } from '@mantine/core';

const RadialMoveComponent = memo(function RadialMoveComponent({ 
  onValueChange 
}: { 
  onValueChange: (value: number) => void; 
}) {
  const { ref, active } = useRadialMove(
    useCallback((value) => {
      onValueChange(value);
    }, [onValueChange]),
    { step: 0.01 }
  );

  return (
    <Paper
      ref={ref}
      w={200}
      h={200}
      style={{
        borderRadius: '50%',
        backgroundColor: active ? '#e3f2fd' : '#f0f0f0',
        position: 'relative',
        cursor: 'pointer',
      }}
    >
      <Text ta="center" mt="xl">
        {active ? 'Moving...' : 'Ready'}
      </Text>
    </Paper>
  );
});

function OptimizedRadialMove() {
  const handleValueChange = useCallback((value: number) => {
    console.log('Value changed:', value);
  }, []);

  return (
    <div>
      <RadialMoveComponent onValueChange={handleValueChange} />
    </div>
  );
}
```

### Conditional Radial Move

```tsx
import { useRadialMove } from '@mantine/hooks';
import { Text, Box, Paper, Switch } from '@mantine/core';
import { useState } from 'react';

function ConditionalRadialMove() {
  const [enabled, setEnabled] = useState(true);
  const [value, setValue] = useState(0);

  const { ref, active } = useRadialMove(
    enabled ? setValue : () => {},
    enabled ? { step: 0.01 } : undefined
  );

  return (
    <Box>
      <Switch
        label="Enable radial move"
        checked={enabled}
        onChange={(event) => setEnabled(event.currentTarget.checked)}
        mb="md"
      />
      
      <Paper
        ref={ref}
        w={200}
        h={200}
        style={{
          borderRadius: '50%',
          backgroundColor: enabled 
            ? (active ? '#e8f5e8' : '#f0f0f0')
            : '#f5f5f5',
          position: 'relative',
          cursor: enabled ? 'pointer' : 'default',
        }}
      >
        <Text ta="center" mt="xl">
          {enabled ? (active ? 'Moving...' : 'Ready') : 'Disabled'}
        </Text>
      </Paper>
      
      <Text ta="center" mt="md">
        Value: {Math.round(value * 360)}°
      </Text>
    </Box>
  );
}
```

## Common Patterns

### Radial Move with State

```tsx
import { useRadialMove } from '@mantine/hooks';
import { Text, Box, Paper, Button } from '@mantine/core';
import { useState, useEffect } from 'react';

function RadialMoveWithState() {
  const [value, setValue] = useState(0);
  const [valueHistory, setValueHistory] = useState<number[]>([]);
  const { ref, active } = useRadialMove(setValue, { step: 0.01 });

  useEffect(() => {
    if (active) {
      setValueHistory(prev => [...prev, value]);
    }
  }, [value, active]);

  const clearHistory = () => setValueHistory([]);

  return (
    <Box>
      <Paper
        ref={ref}
        w={200}
        h={200}
        style={{
          borderRadius: '50%',
          backgroundColor: active ? '#e3f2fd' : '#f0f0f0',
          position: 'relative',
          cursor: 'pointer',
        }}
      >
        <Text ta="center" mt="xl">
          {active ? 'Moving...' : 'Ready'}
        </Text>
      </Paper>
      
      <Text ta="center" mt="md">
        Current: {Math.round(value * 360)}°
      </Text>
      <Text ta="center" size="sm" color="dimmed">
        History: {valueHistory.length} values
      </Text>
      
      <Button onClick={clearHistory} mt="md" fullWidth>
        Clear History
      </Button>
    </Box>
  );
}
```

### Radial Move with Animation

```tsx
import { useRadialMove } from '@mantine/hooks';
import { Text, Box, Paper } from '@mantine/core';
import { useState } from 'react';

function AnimatedRadialMove() {
  const [value, setValue] = useState(0);
  const { ref, active } = useRadialMove(setValue, { step: 0.01 });

  return (
    <Box>
      <Paper
        ref={ref}
        w={200}
        h={200}
        style={{
          borderRadius: '50%',
          backgroundColor: active ? '#e3f2fd' : '#f0f0f0',
          position: 'relative',
          cursor: 'pointer',
          transition: 'all 0.3s ease',
          transform: active ? 'scale(1.05)' : 'scale(1)',
        }}
      >
        <Text ta="center" mt="xl">
          {active ? 'Moving...' : 'Ready'}
        </Text>
      </Paper>
    </Box>
  );
}
```

## Integration with Other Hooks

### Combined with useDisclosure

```tsx
import { useRadialMove, useDisclosure } from '@mantine/hooks';
import { Modal, Button, Text, Box, Paper } from '@mantine/core';

function RadialMoveWithModal() {
  const [value, setValue] = useState(0);
  const { ref, active } = useRadialMove(setValue, { step: 0.01 });
  const [opened, { open, close }] = useDisclosure();

  return (
    <Box>
      <Paper
        ref={ref}
        w={200}
        h={200}
        style={{
          borderRadius: '50%',
          backgroundColor: active ? '#e3f2fd' : '#f0f0f0',
          position: 'relative',
          cursor: 'pointer',
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
        title="Radial Move Details"
      >
        <Text>Current value: {Math.round(value * 360)}°</Text>
        <Text>Active: {active ? 'Yes' : 'No'}</Text>
      </Modal>
    </Box>
  );
}
```

### Combined with useLocalStorage

```tsx
import { useRadialMove, useLocalStorage } from '@mantine/hooks';
import { Text, Box, Paper, Button } from '@mantine/core';

function RadialMoveWithStorage() {
  const [value, setValue] = useState(0);
  const { ref, active } = useRadialMove(setValue, { step: 0.01 });
  const [savedValues, setSavedValues] = useLocalStorage({
    key: 'radial-values',
    defaultValue: [] as number[]
  });

  const saveValue = () => {
    setSavedValues(prev => [...prev, value]);
  };

  return (
    <Box>
      <Paper
        ref={ref}
        w={200}
        h={200}
        style={{
          borderRadius: '50%',
          backgroundColor: active ? '#e3f2fd' : '#f0f0f0',
          position: 'relative',
          cursor: 'pointer',
        }}
      >
        <Text ta="center" mt="xl">
          {active ? 'Moving...' : 'Ready'}
        </Text>
      </Paper>
      
      <Text ta="center" mt="md">
        Current: {Math.round(value * 360)}°
      </Text>
      <Text ta="center" size="sm" color="dimmed">
        Saved: {savedValues.length} values
      </Text>
      
      <Button onClick={saveValue} mt="md" fullWidth>
        Save Value
      </Button>
    </Box>
  );
}
```

## Troubleshooting

### Common Issues

1. **Radial Move Not Working**
   - Check if the ref is properly attached
   - Ensure the element is interactive
   - Verify the step size is appropriate

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
import { useRadialMove } from '@mantine/hooks';
import { Text, Box, Paper } from '@mantine/core';

function DebugRadialMove() {
  const [value, setValue] = useState(0);
  const { ref, active } = useRadialMove(setValue, { step: 0.01 });

  return (
    <Box>
      <Paper
        ref={ref}
        w={200}
        h={200}
        style={{
          borderRadius: '50%',
          backgroundColor: active ? '#e3f2fd' : '#f0f0f0',
          position: 'relative',
          cursor: 'pointer',
        }}
      >
        <Text ta="center" mt="xl">
          {active ? 'Moving...' : 'Ready'}
        </Text>
      </Paper>
      
      <Paper p="md" mt="md" style={{ backgroundColor: '#f8f9fa' }}>
        <Text size="lg" weight="bold" mb="md">Radial Move Debug Info</Text>
        
        <Box>
          <Text>Value: {value.toFixed(3)}</Text>
          <Text>Degrees: {Math.round(value * 360)}°</Text>
          <Text>Active: {active ? 'Yes' : 'No'}</Text>
          <Text>Step: 0.01</Text>
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
- **Server-Side**: Safe to use (no-op during SSR)

## Related Hooks

- `use-move` - For linear move interactions
- `use-mouse` - For mouse position tracking
- `use-long-press` - For long press detection
- `use-event-listener` - For custom event handling

## Best Practices

1. **Performance**: Use memoization for expensive calculations
2. **Accessibility**: Ensure radial controls are keyboard accessible
3. **Mobile**: Test on actual mobile devices
4. **Visual Feedback**: Provide clear visual feedback during interaction
5. **Step Size**: Choose appropriate step sizes for your use case

---

*The `use-radial-move` hook provides a powerful, flexible way to handle radial interactions in React applications. It's perfect for building custom radial sliders, circular controls, angle selectors, and other circular input components with excellent performance and full cross-platform support.*
