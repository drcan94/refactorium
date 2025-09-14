# use-event-listener Hook

## Overview

The `use-event-listener` hook subscribes to events of a given element with a ref. It provides a clean, React-friendly way to add event listeners to DOM elements while automatically handling cleanup when the component unmounts. This hook supports the same options as the native `addEventListener` method.

## Installation

```bash
npm install @mantine/hooks
```

## Import

```typescript
import { useEventListener } from '@mantine/hooks';
```

## Basic Usage

```tsx
import { useState, useCallback } from 'react';
import { Button } from '@mantine/core';
import { useEventListener } from '@mantine/hooks';

function Demo() {
  const [count, setCount] = useState(0);
  const increment = useCallback(() => setCount((c) => c + 1), []);
  const ref = useEventListener('click', increment);
  
  return <Button ref={ref}>Button clicks: {count}</Button>;
}
```

## API Reference

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `type` | `K extends keyof HTMLElementEventMap` | **Required.** The event type to listen for (e.g., 'click', 'keydown', 'scroll') |
| `listener` | `(this: HTMLDivElement, ev: HTMLElementEventMap[K]) => any` | **Required.** The event handler function |
| `options` | `boolean \| AddEventListenerOptions` | **Optional.** Event listener options (capture, once, passive, etc.) |

### Return Value

Returns a `React.RefCallback<T | null>` that should be assigned to the ref of the element you want to listen to.

### Type Definition

```typescript
function useEventListener<K extends keyof HTMLElementEventMap, T extends HTMLElement = any>(
  type: K,
  listener: (this: HTMLDivElement, ev: HTMLElementEventMap[K]) => any,
  options?: boolean | AddEventListenerOptions,
): React.RefCallback<T | null>
```

## Key Features

### 1. **Automatic Cleanup**
- Event listeners are automatically removed when the component unmounts
- No manual cleanup required
- Prevents memory leaks

### 2. **TypeScript Support**
- Full type safety with event types
- Generic support for different element types
- Proper event object typing

### 3. **Native addEventListener Options**
- Supports all standard `addEventListener` options
- Capture, once, passive, and signal options
- Same API as native event listeners

## Advanced Usage

### TypeScript with Specific Element Type

```tsx
import { useEventListener } from '@mantine/hooks';
import { useCallback } from 'react';

function TypedElement() {
  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    console.log('Key pressed:', event.key);
  }, []);

  const ref = useEventListener<HTMLInputElement>('keydown', handleKeyDown);

  return <input ref={ref} placeholder="Type something..." />;
}
```

### Event Listener Options

```tsx
import { useEventListener } from '@mantine/hooks';
import { useCallback } from 'react';

function OptionsExample() {
  const handleScroll = useCallback((event: Event) => {
    console.log('Scrolled!');
  }, []);

  // Using AddEventListenerOptions
  const ref = useEventListener('scroll', handleScroll, {
    passive: true,  // Better performance for scroll events
    once: false,    // Listen multiple times
    capture: false  // Bubble phase
  });

  return <div ref={ref} style={{ height: '200px', overflow: 'auto' }}>
    <div style={{ height: '1000px' }}>Scrollable content</div>
  </div>;
}
```

### Multiple Event Types

```tsx
import { useEventListener } from '@mantine/hooks';
import { useCallback } from 'react';

function MultipleEvents() {
  const handleMouseEnter = useCallback(() => {
    console.log('Mouse entered');
  }, []);

  const handleMouseLeave = useCallback(() => {
    console.log('Mouse left');
  }, []);

  const enterRef = useEventListener('mouseenter', handleMouseEnter);
  const leaveRef = useEventListener('mouseleave', handleMouseLeave);

  return (
    <div>
      <div ref={enterRef}>Hover me (enter)</div>
      <div ref={leaveRef}>Hover me (leave)</div>
    </div>
  );
}
```

## Use Cases

### 1. **Keyboard Navigation**

```tsx
import { useEventListener } from '@mantine/hooks';
import { useCallback, useState } from 'react';
import { Text, Paper } from '@mantine/core';

function KeyboardNavigation() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const items = ['Item 1', 'Item 2', 'Item 3', 'Item 4'];

  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        setSelectedIndex(prev => (prev + 1) % items.length);
        break;
      case 'ArrowUp':
        event.preventDefault();
        setSelectedIndex(prev => (prev - 1 + items.length) % items.length);
        break;
      case 'Enter':
        event.preventDefault();
        console.log('Selected:', items[selectedIndex]);
        break;
    }
  }, [items, selectedIndex]);

  const ref = useEventListener('keydown', handleKeyDown);

  return (
    <Paper ref={ref} p="md" tabIndex={0}>
      <Text weight="bold">Use arrow keys to navigate, Enter to select</Text>
      {items.map((item, index) => (
        <div
          key={index}
          style={{
            padding: '8px',
            backgroundColor: index === selectedIndex ? '#e3f2fd' : 'transparent',
            cursor: 'pointer'
          }}
        >
          {item}
        </div>
      ))}
    </Paper>
  );
}
```

### 2. **Scroll-Based Animations**

```tsx
import { useEventListener } from '@mantine/hooks';
import { useCallback, useState } from 'react';
import { Paper, Text } from '@mantine/core';

function ScrollAnimation() {
  const [scrollY, setScrollY] = useState(0);

  const handleScroll = useCallback((event: Event) => {
    const target = event.target as HTMLElement;
    setScrollY(target.scrollTop);
  }, []);

  const ref = useEventListener('scroll', handleScroll, { passive: true });

  return (
    <div ref={ref} style={{ height: '300px', overflow: 'auto' }}>
      <div style={{ height: '1000px', padding: '20px' }}>
        <Paper
          p="md"
          style={{
            transform: `translateY(${scrollY * 0.5}px)`,
            transition: 'transform 0.1s ease-out'
          }}
        >
          <Text>Scroll to see parallax effect: {scrollY}px</Text>
        </Paper>
      </div>
    </div>
  );
}
```

### 3. **Drag and Drop**

```tsx
import { useEventListener } from '@mantine/hooks';
import { useCallback, useState } from 'react';
import { Paper, Text } from '@mantine/core';

function DragDrop() {
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseDown = useCallback((event: MouseEvent) => {
    setIsDragging(true);
    event.preventDefault();
  }, []);

  const handleMouseMove = useCallback((event: MouseEvent) => {
    if (isDragging) {
      setPosition({ x: event.clientX, y: event.clientY });
    }
  }, [isDragging]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  const mouseDownRef = useEventListener('mousedown', handleMouseDown);
  const mouseMoveRef = useEventListener('mousemove', handleMouseMove);
  const mouseUpRef = useEventListener('mouseup', handleMouseUp);

  return (
    <div>
      <Paper
        ref={mouseDownRef}
        p="md"
        style={{
          position: 'absolute',
          left: position.x,
          top: position.y,
          cursor: isDragging ? 'grabbing' : 'grab',
          userSelect: 'none'
        }}
      >
        <Text>Drag me! ({position.x}, {position.y})</Text>
      </Paper>
      <div ref={mouseMoveRef} style={{ height: '100vh' }} />
      <div ref={mouseUpRef} style={{ height: '100vh' }} />
    </div>
  );
}
```

### 4. **Window Resize Handling**

```tsx
import { useEventListener } from '@mantine/hooks';
import { useCallback, useState } from 'react';
import { Text, Paper } from '@mantine/core';

function WindowResize() {
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0
  });

  const handleResize = useCallback(() => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight
    });
  }, []);

  const ref = useEventListener('resize', handleResize);

  return (
    <Paper ref={ref} p="md">
      <Text>Window size: {windowSize.width} × {windowSize.height}</Text>
    </Paper>
  );
}
```

### 5. **Focus Management**

```tsx
import { useEventListener } from '@mantine/hooks';
import { useCallback, useState } from 'react';
import { TextInput, Paper } from '@mantine/core';

function FocusManagement() {
  const [focused, setFocused] = useState(false);

  const handleFocus = useCallback(() => {
    setFocused(true);
  }, []);

  const handleBlur = useCallback(() => {
    setFocused(false);
  }, []);

  const focusRef = useEventListener('focus', handleFocus);
  const blurRef = useEventListener('blur', handleBlur);

  return (
    <Paper p="md">
      <TextInput
        ref={(el) => {
          focusRef(el);
          blurRef(el);
        }}
        placeholder="Focus to see status change"
      />
      <Text size="sm" color={focused ? 'green' : 'red'}>
        Status: {focused ? 'Focused' : 'Not focused'}
      </Text>
    </Paper>
  );
}
```

## Performance Considerations

### Memoized Event Handlers

```tsx
import { useEventListener } from '@mantine/hooks';
import { useCallback } from 'react';

function OptimizedComponent() {
  const handleClick = useCallback((event: MouseEvent) => {
    // Expensive operation
    console.log('Clicked:', event.target);
  }, []);

  const ref = useEventListener('click', handleClick);

  return <div ref={ref}>Click me</div>;
}
```

### Conditional Event Listeners

```tsx
import { useEventListener } from '@mantine/hooks';
import { useCallback } from 'react';

function ConditionalListener({ enabled }) {
  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (enabled) {
      console.log('Key pressed:', event.key);
    }
  }, [enabled]);

  const ref = useEventListener('keydown', handleKeyDown);

  return <div ref={ref}>Conditional listener</div>;
}
```

## Common Patterns

### Event Delegation

```tsx
import { useEventListener } from '@mantine/hooks';
import { useCallback } from 'react';

function EventDelegation() {
  const handleClick = useCallback((event: MouseEvent) => {
    const target = event.target as HTMLElement;
    if (target.matches('.clickable-item')) {
      console.log('Clicked item:', target.textContent);
    }
  }, []);

  const ref = useEventListener('click', handleClick);

  return (
    <div ref={ref}>
      <div className="clickable-item">Item 1</div>
      <div className="clickable-item">Item 2</div>
      <div className="clickable-item">Item 3</div>
    </div>
  );
}
```

### Throttled Event Handlers

```tsx
import { useEventListener } from '@mantine/hooks';
import { useCallback, useRef } from 'react';

function ThrottledScroll() {
  const throttleRef = useRef<NodeJS.Timeout>();

  const handleScroll = useCallback((event: Event) => {
    if (throttleRef.current) return;

    throttleRef.current = setTimeout(() => {
      console.log('Scrolled!');
      throttleRef.current = undefined;
    }, 100);
  }, []);

  const ref = useEventListener('scroll', handleScroll, { passive: true });

  return <div ref={ref} style={{ height: '200px', overflow: 'auto' }}>Scroll me</div>;
}
```

## Integration with Other Hooks

### Combined with useCallback

```tsx
import { useEventListener } from '@mantine/hooks';
import { useCallback, useState } from 'react';

function CallbackIntegration() {
  const [count, setCount] = useState(0);

  const handleClick = useCallback(() => {
    setCount(prev => prev + 1);
  }, []);

  const ref = useEventListener('click', handleClick);

  return <div ref={ref}>Count: {count}</div>;
}
```

### Combined with useRef

```tsx
import { useEventListener } from '@mantine/hooks';
import { useRef, useCallback } from 'react';

function RefIntegration() {
  const elementRef = useRef<HTMLDivElement>(null);

  const handleClick = useCallback((event: MouseEvent) => {
    console.log('Element ref:', elementRef.current);
  }, []);

  const eventRef = useEventListener('click', handleClick);

  const combinedRef = useCallback((el: HTMLDivElement | null) => {
    elementRef.current = el;
    eventRef(el);
  }, [eventRef]);

  return <div ref={combinedRef}>Combined refs</div>;
}
```

## Troubleshooting

### Common Issues

1. **Event Not Firing**
   - Ensure the ref is properly assigned to the target element
   - Check if the element is focusable for keyboard events
   - Verify the event type is correct

2. **Memory Leaks**
   - The hook automatically cleans up listeners
   - Avoid creating new event handlers on every render
   - Use `useCallback` for stable references

3. **TypeScript Errors**
   - Specify the correct element type
   - Use proper event type annotations
   - Check event handler signatures

### Debug Information

```tsx
import { useEventListener } from '@mantine/hooks';
import { useCallback } from 'react';

function DebugEventListener() {
  const handleClick = useCallback((event: MouseEvent) => {
    console.log('Event details:', {
      type: event.type,
      target: event.target,
      currentTarget: event.currentTarget,
      timestamp: event.timeStamp
    });
  }, []);

  const ref = useEventListener('click', handleClick);

  return <div ref={ref}>Click to see debug info</div>;
}
```

## Browser Support

- **Modern Browsers**: Full support
- **Legacy Browsers**: Requires polyfills for some event types
- **Server-Side**: Safe to use (no-op during SSR)

## Related Hooks

- `use-click-outside` - For click outside detection
- `use-keyboard` - For keyboard event handling
- `use-hover` - For hover state management
- `use-focus` - For focus state management

## Best Practices

1. **Use useCallback**: Always wrap event handlers in `useCallback` to prevent unnecessary re-renders
2. **Choose Appropriate Events**: Select the right event type for your use case
3. **Handle Cleanup**: The hook handles cleanup automatically, but be mindful of dependencies
4. **TypeScript**: Use proper typing for better development experience
5. **Performance**: Consider using `passive: true` for scroll and touch events

---

*The `use-event-listener` hook provides a clean, React-friendly way to add event listeners to DOM elements. It automatically handles cleanup and provides excellent TypeScript support, making it perfect for interactive components and user interface enhancements.*
