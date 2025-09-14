# use-mutation-observer Hook

## Overview

The `use-mutation-observer` hook provides a React wrapper for the native `MutationObserver` API, allowing you to subscribe to changes being made to the DOM tree. It's perfect for monitoring attribute changes, child node additions/removals, text content modifications, and other DOM mutations in a React-friendly way.

## Installation

```bash
npm install @mantine/hooks
```

## Import

```typescript
import { useMutationObserver } from '@mantine/hooks';
```

## Basic Usage

### Attribute Changes

```tsx
import { useState } from 'react';
import { Button, Text } from '@mantine/core';
import { useMutationObserver } from '@mantine/hooks';

function Demo() {
  const [lastMutation, setLastMutation] = useState('');

  const ref = useMutationObserver<HTMLButtonElement>(
    (mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'attributes' && mutation.attributeName === 'data-mutation') {
          mutation.target instanceof HTMLElement &&
            setLastMutation(mutation.target.dataset.mutation || '');
        }
      });
    },
    {
      attributes: true,
      attributeFilter: ['data-mutation'],
    }
  );

  return (
    <>
      <Button
        ref={ref}
        onClick={(event) => {
          event.currentTarget.dataset.mutation = Math.random().toFixed(3);
        }}
      >
        Click to change data-mutation attribute
      </Button>
      <Text mt={10} size="sm">
        Last detected mutation: {lastMutation || 'Not mutated yet'}
      </Text>
    </>
  );
}
```

### Document-Level Monitoring

```tsx
import { useState } from 'react';
import { Kbd, Text } from '@mantine/core';
import { useMutationObserver } from '@mantine/hooks';

function Demo() {
  const [lastMutation, setLastMutation] = useState('');

  useMutationObserver(
    (mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'attributes' && mutation.attributeName === 'dir') {
          mutation.target instanceof HTMLElement &&
            setLastMutation(mutation.target.getAttribute('dir') || '');
        }
      });
    },
    {
      attributes: true,
      attributeFilter: ['dir'],
    },
    () => document.documentElement
  );

  return (
    <>
      <Text>
        Press <Kbd>Ctrl</Kbd> + <Kbd>Shift</Kbd> + <Kbd>L</Kbd> to change direction
      </Text>

      <Text mt={10}>Direction was changed to: {lastMutation || 'Not changed yet'}</Text>
    </>
  );
}
```

## API Reference

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `callback` | `MutationCallback` | **Required.** Function called when mutations occur |
| `options` | `MutationObserverInit` | **Required.** Configuration options for the observer |
| `target` | `HTMLElement \| (() => HTMLElement) \| null` | **Optional.** Target element or function to resolve it |

### Return Value

| Type | Description |
|------|-------------|
| `RefObject<Element>` | Ref to attach to the target element (when not using custom target) |

### Type Definitions

```typescript
function useMutationObserver<Element extends HTMLElement>(
  callback: MutationCallback,
  options: MutationObserverInit,
  target?: HTMLElement | (() => HTMLElement) | null
): RefObject<Element>;
```

## Key Features

### 1. **DOM Mutation Monitoring**
- Attribute changes
- Child node additions/removals
- Text content modifications
- Character data changes

### 2. **Flexible Target Selection**
- Element ref for direct targeting
- Function-based target resolution
- Document-level monitoring

### 3. **React Integration**
- Automatic cleanup on unmount
- TypeScript support
- Performance optimized

### 4. **Native API Wrapper**
- Full MutationObserver API support
- All configuration options available
- Native performance characteristics

## Advanced Usage

### Child Node Monitoring

```tsx
import { useState } from 'react';
import { useMutationObserver } from '@mantine/hooks';
import { Button, Text, Box, Group } from '@mantine/core';

function ChildNodeMonitor() {
  const [childCount, setChildCount] = useState(0);
  const [lastChange, setLastChange] = useState('');

  const ref = useMutationObserver<HTMLDivElement>(
    (mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'childList') {
          const target = mutation.target as HTMLElement;
          const newCount = target.children.length;
          setChildCount(newCount);
          
          if (mutation.addedNodes.length > 0) {
            setLastChange(`Added ${mutation.addedNodes.length} node(s)`);
          } else if (mutation.removedNodes.length > 0) {
            setLastChange(`Removed ${mutation.removedNodes.length} node(s)`);
          }
        }
      });
    },
    {
      childList: true,
      subtree: true,
    }
  );

  const addChild = () => {
    const newDiv = document.createElement('div');
    newDiv.textContent = `Child ${childCount + 1}`;
    newDiv.style.padding = '8px';
    newDiv.style.backgroundColor = '#f0f0f0';
    newDiv.style.margin = '4px';
    newDiv.style.borderRadius = '4px';
    ref.current?.appendChild(newDiv);
  };

  const removeChild = () => {
    const lastChild = ref.current?.lastChild;
    if (lastChild) {
      ref.current?.removeChild(lastChild);
    }
  };

  return (
    <Box>
      <Text size="lg" mb="md">Child Node Monitor</Text>
      
      <Group mb="md">
        <Button onClick={addChild}>Add Child</Button>
        <Button onClick={removeChild} disabled={childCount === 0}>
          Remove Last Child
        </Button>
      </Group>

      <Box
        ref={ref}
        style={{
          minHeight: '100px',
          border: '2px dashed #ccc',
          padding: '16px',
          backgroundColor: '#fafafa',
        }}
      >
        <Text size="sm" color="dimmed">
          Children will appear here
        </Text>
      </Box>

      <Text mt="md" size="sm">
        Child count: {childCount} | Last change: {lastChange || 'None'}
      </Text>
    </Box>
  );
}
```

### Text Content Monitoring

```tsx
import { useState } from 'react';
import { useMutationObserver } from '@mantine/hooks';
import { TextInput, Text, Box, Group } from '@mantine/core';

function TextContentMonitor() {
  const [textHistory, setTextHistory] = useState<string[]>([]);
  const [lastChange, setLastChange] = useState('');

  const ref = useMutationObserver<HTMLDivElement>(
    (mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'characterData') {
          const target = mutation.target as Text;
          const newText = target.textContent || '';
          setTextHistory(prev => [...prev, newText]);
          setLastChange(`Text changed to: "${newText}"`);
        }
      });
    },
    {
      characterData: true,
      subtree: true,
    }
  );

  const updateText = (newText: string) => {
    if (ref.current) {
      ref.current.textContent = newText;
    }
  };

  return (
    <Box>
      <Text size="lg" mb="md">Text Content Monitor</Text>
      
      <Group mb="md">
        <TextInput
          placeholder="Enter new text"
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              updateText(e.currentTarget.value);
              e.currentTarget.value = '';
            }
          }}
        />
        <Button onClick={() => updateText('')}>Clear</Button>
      </Group>

      <Box
        ref={ref}
        style={{
          minHeight: '60px',
          border: '2px dashed #ccc',
          padding: '16px',
          backgroundColor: '#fafafa',
        }}
      >
        Initial text content
      </Box>

      <Text mt="md" size="sm">
        Last change: {lastChange || 'None'}
      </Text>

      {textHistory.length > 0 && (
        <Box mt="md">
          <Text size="sm" weight="bold">Text History:</Text>
          {textHistory.slice(-5).map((text, index) => (
            <Text key={index} size="xs" color="dimmed">
              {index + 1}. "{text}"
            </Text>
          ))}
        </Box>
      )}
    </Box>
  );
}
```

### Style Attribute Monitoring

```tsx
import { useState } from 'react';
import { useMutationObserver } from '@mantine/hooks';
import { Button, Text, Box, Group, ColorSwatch } from '@mantine/core';

function StyleMonitor() {
  const [currentStyle, setCurrentStyle] = useState('background-color: #f0f0f0');
  const [styleHistory, setStyleHistory] = useState<string[]>([]);

  const ref = useMutationObserver<HTMLDivElement>(
    (mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'attributes' && mutation.attributeName === 'style') {
          const target = mutation.target as HTMLElement;
          const newStyle = target.getAttribute('style') || '';
          setCurrentStyle(newStyle);
          setStyleHistory(prev => [...prev, newStyle]);
        }
      });
    },
    {
      attributes: true,
      attributeFilter: ['style'],
    }
  );

  const colors = [
    '#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57',
    '#ff9ff3', '#54a0ff', '#5f27cd', '#00d2d3', '#ff9f43'
  ];

  const changeColor = (color: string) => {
    if (ref.current) {
      ref.current.style.backgroundColor = color;
    }
  };

  return (
    <Box>
      <Text size="lg" mb="md">Style Attribute Monitor</Text>
      
      <Group mb="md">
        {colors.map((color) => (
          <ColorSwatch
            key={color}
            color={color}
            size={30}
            style={{ cursor: 'pointer' }}
            onClick={() => changeColor(color)}
          />
        ))}
      </Group>

      <Box
        ref={ref}
        style={{
          height: '100px',
          border: '2px solid #ccc',
          padding: '16px',
          backgroundColor: '#f0f0f0',
        }}
      >
        <Text>Click colors above to change my background</Text>
      </Box>

      <Text mt="md" size="sm">
        Current style: {currentStyle}
      </Text>

      {styleHistory.length > 0 && (
        <Box mt="md">
          <Text size="sm" weight="bold">Style History:</Text>
          {styleHistory.slice(-3).map((style, index) => (
            <Text key={index} size="xs" color="dimmed">
              {index + 1}. {style}
            </Text>
          ))}
        </Box>
      )}
    </Box>
  );
}
```

## Use Cases

### 1. **Form Validation Monitoring**

```tsx
import { useState } from 'react';
import { useMutationObserver } from '@mantine/hooks';
import { TextInput, Text, Box, Group, Button } from '@mantine/core';

function FormValidationMonitor() {
  const [validationState, setValidationState] = useState<'valid' | 'invalid' | 'pending'>('pending');
  const [errorMessage, setErrorMessage] = useState('');

  const ref = useMutationObserver<HTMLInputElement>(
    (mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'attributes') {
          const target = mutation.target as HTMLInputElement;
          
          if (mutation.attributeName === 'data-valid') {
            const isValid = target.dataset.valid === 'true';
            setValidationState(isValid ? 'valid' : 'invalid');
          }
          
          if (mutation.attributeName === 'data-error') {
            setErrorMessage(target.dataset.error || '');
          }
        }
      });
    },
    {
      attributes: true,
      attributeFilter: ['data-valid', 'data-error'],
    }
  );

  const validateEmail = (email: string) => {
    const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (ref.current) {
      ref.current.dataset.valid = isValid.toString();
      ref.current.dataset.error = isValid ? '' : 'Invalid email format';
    }
  };

  return (
    <Box>
      <Text size="lg" mb="md">Form Validation Monitor</Text>
      
      <TextInput
        ref={ref}
        placeholder="Enter email address"
        onChange={(e) => validateEmail(e.target.value)}
        style={{
          borderColor: validationState === 'valid' ? 'green' : 
                      validationState === 'invalid' ? 'red' : 'gray'
        }}
      />

      <Text mt="md" size="sm" color={validationState === 'valid' ? 'green' : 'red'}>
        Status: {validationState} {errorMessage && `- ${errorMessage}`}
      </Text>
    </Box>
  );
}
```

### 2. **Dynamic Content Loader**

```tsx
import { useState } from 'react';
import { useMutationObserver } from '@mantine/hooks';
import { Button, Text, Box, Group, Loader } from '@mantine/core';

function DynamicContentLoader() {
  const [isLoading, setIsLoading] = useState(false);
  const [loadedContent, setLoadedContent] = useState<string[]>([]);

  const ref = useMutationObserver<HTMLDivElement>(
    (mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'childList') {
          const target = mutation.target as HTMLElement;
          const newContent = Array.from(target.children).map(child => 
            child.textContent || ''
          );
          setLoadedContent(newContent);
          setIsLoading(false);
        }
      });
    },
    {
      childList: true,
      subtree: true,
    }
  );

  const loadContent = () => {
    setIsLoading(true);
    setTimeout(() => {
      if (ref.current) {
        const newDiv = document.createElement('div');
        newDiv.textContent = `Content ${loadedContent.length + 1} loaded at ${new Date().toLocaleTimeString()}`;
        newDiv.style.padding = '8px';
        newDiv.style.backgroundColor = '#e3f2fd';
        newDiv.style.margin = '4px';
        newDiv.style.borderRadius = '4px';
        ref.current.appendChild(newDiv);
      }
    }, 1000);
  };

  return (
    <Box>
      <Text size="lg" mb="md">Dynamic Content Loader</Text>
      
      <Group mb="md">
        <Button onClick={loadContent} loading={isLoading}>
          {isLoading ? 'Loading...' : 'Load Content'}
        </Button>
        <Button 
          variant="outline" 
          onClick={() => {
            if (ref.current) {
              ref.current.innerHTML = '';
              setLoadedContent([]);
            }
          }}
        >
          Clear All
        </Button>
      </Group>

      <Box
        ref={ref}
        style={{
          minHeight: '100px',
          border: '2px dashed #ccc',
          padding: '16px',
          backgroundColor: '#fafafa',
        }}
      >
        {isLoading && <Loader size="sm" />}
        {!isLoading && loadedContent.length === 0 && (
          <Text size="sm" color="dimmed">
            No content loaded yet
          </Text>
        )}
      </Box>

      <Text mt="md" size="sm">
        Loaded items: {loadedContent.length}
      </Text>
    </Box>
  );
}
```

### 3. **Accessibility Monitor**

```tsx
import { useState } from 'react';
import { useMutationObserver } from '@mantine/hooks';
import { Button, Text, Box, Group, Badge } from '@mantine/core';

function AccessibilityMonitor() {
  const [accessibilityIssues, setAccessibilityIssues] = useState<string[]>([]);

  const ref = useMutationObserver<HTMLDivElement>(
    (mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'attributes') {
          const target = mutation.target as HTMLElement;
          
          // Check for missing alt text on images
          if (target.tagName === 'IMG' && !target.getAttribute('alt')) {
            setAccessibilityIssues(prev => [
              ...prev.filter(issue => !issue.includes('Missing alt text')),
              'Missing alt text on image'
            ]);
          }
          
          // Check for missing aria-label on buttons
          if (target.tagName === 'BUTTON' && !target.getAttribute('aria-label') && !target.textContent?.trim()) {
            setAccessibilityIssues(prev => [
              ...prev.filter(issue => !issue.includes('Missing aria-label')),
              'Missing aria-label on button'
            ]);
          }
        }
      });
    },
    {
      attributes: true,
      subtree: true,
    }
  );

  const addImage = () => {
    if (ref.current) {
      const img = document.createElement('img');
      img.src = 'https://via.placeholder.com/100x100';
      img.style.margin = '8px';
      img.style.border = '1px solid #ccc';
      ref.current.appendChild(img);
    }
  };

  const addButton = () => {
    if (ref.current) {
      const button = document.createElement('button');
      button.textContent = '';
      button.style.margin = '8px';
      button.style.padding = '8px';
      button.style.border = '1px solid #ccc';
      ref.current.appendChild(button);
    }
  };

  return (
    <Box>
      <Text size="lg" mb="md">Accessibility Monitor</Text>
      
      <Group mb="md">
        <Button onClick={addImage}>Add Image (No Alt)</Button>
        <Button onClick={addButton}>Add Button (No Label)</Button>
        <Button 
          variant="outline" 
          onClick={() => setAccessibilityIssues([])}
        >
          Clear Issues
        </Button>
      </Group>

      <Box
        ref={ref}
        style={{
          minHeight: '100px',
          border: '2px dashed #ccc',
          padding: '16px',
          backgroundColor: '#fafafa',
        }}
      >
        <Text size="sm" color="dimmed">
          Add elements above to test accessibility monitoring
        </Text>
      </Box>

      {accessibilityIssues.length > 0 && (
        <Box mt="md">
          <Text size="sm" weight="bold" mb="xs">Accessibility Issues:</Text>
          {accessibilityIssues.map((issue, index) => (
            <Badge key={index} color="red" size="sm" mr="xs" mb="xs">
              {issue}
            </Badge>
          ))}
        </Box>
      )}
    </Box>
  );
}
```

### 4. **Performance Monitor**

```tsx
import { useState } from 'react';
import { useMutationObserver } from '@mantine/hooks';
import { Button, Text, Box, Group, Progress } from '@mantine/core';

function PerformanceMonitor() {
  const [mutationCount, setMutationCount] = useState(0);
  const [performanceMetrics, setPerformanceMetrics] = useState<{
    totalMutations: number;
    averageTime: number;
    maxTime: number;
  }>({
    totalMutations: 0,
    averageTime: 0,
    maxTime: 0
  });

  const ref = useMutationObserver<HTMLDivElement>(
    (mutations) => {
      const startTime = performance.now();
      
      mutations.forEach((mutation) => {
        setMutationCount(prev => prev + 1);
      });
      
      const endTime = performance.now();
      const duration = endTime - startTime;
      
      setPerformanceMetrics(prev => {
        const newTotal = prev.totalMutations + mutations.length;
        const newAverage = (prev.averageTime * prev.totalMutations + duration) / newTotal;
        const newMax = Math.max(prev.maxTime, duration);
        
        return {
          totalMutations: newTotal,
          averageTime: newAverage,
          maxTime: newMax
        };
      });
    },
    {
      childList: true,
      attributes: true,
      subtree: true,
    }
  );

  const addManyElements = () => {
    if (ref.current) {
      for (let i = 0; i < 100; i++) {
        const div = document.createElement('div');
        div.textContent = `Element ${i + 1}`;
        div.style.padding = '4px';
        div.style.margin = '2px';
        div.style.backgroundColor = '#e3f2fd';
        ref.current.appendChild(div);
      }
    }
  };

  const clearElements = () => {
    if (ref.current) {
      ref.current.innerHTML = '';
      setMutationCount(0);
      setPerformanceMetrics({
        totalMutations: 0,
        averageTime: 0,
        maxTime: 0
      });
    }
  };

  return (
    <Box>
      <Text size="lg" mb="md">Performance Monitor</Text>
      
      <Group mb="md">
        <Button onClick={addManyElements}>Add 100 Elements</Button>
        <Button onClick={clearElements} variant="outline">Clear All</Button>
      </Group>

      <Box
        ref={ref}
        style={{
          minHeight: '100px',
          maxHeight: '200px',
          overflow: 'auto',
          border: '2px dashed #ccc',
          padding: '16px',
          backgroundColor: '#fafafa',
        }}
      >
        <Text size="sm" color="dimmed">
          Elements will appear here
        </Text>
      </Box>

      <Box mt="md">
        <Text size="sm" weight="bold" mb="xs">Performance Metrics:</Text>
        <Text size="sm">Total Mutations: {performanceMetrics.totalMutations}</Text>
        <Text size="sm">Average Processing Time: {performanceMetrics.averageTime.toFixed(2)}ms</Text>
        <Text size="sm">Max Processing Time: {performanceMetrics.maxTime.toFixed(2)}ms</Text>
        <Text size="sm">Current Mutation Count: {mutationCount}</Text>
      </Box>
    </Box>
  );
}
```

## Performance Considerations

### Debounced Mutation Handling

```tsx
import { useMutationObserver } from '@mantine/hooks';
import { useCallback, useRef } from 'react';
import { Text, Box, Paper } from '@mantine/core';

function DebouncedMutationHandler() {
  const debounceRef = useRef<NodeJS.Timeout>();
  const [mutationCount, setMutationCount] = useState(0);

  const debouncedHandler = useCallback((mutations: MutationRecord[]) => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }
    
    debounceRef.current = setTimeout(() => {
      setMutationCount(prev => prev + mutations.length);
    }, 100); // Debounce for 100ms
  }, []);

  const ref = useMutationObserver<HTMLDivElement>(
    debouncedHandler,
    {
      childList: true,
      attributes: true,
      subtree: true,
    }
  );

  return (
    <Box>
      <Paper
        ref={ref}
        w={200}
        h={200}
        style={{
          backgroundColor: '#f0f0f0',
          padding: '16px',
        }}
      >
        <Text>Debounced mutations: {mutationCount}</Text>
      </Paper>
    </Box>
  );
}
```

### Conditional Mutation Observation

```tsx
import { useMutationObserver } from '@mantine/hooks';
import { Text, Box, Paper, Switch } from '@mantine/core';
import { useState } from 'react';

function ConditionalMutationObserver() {
  const [enabled, setEnabled] = useState(true);
  const [mutationCount, setMutationCount] = useState(0);

  const ref = useMutationObserver<HTMLDivElement>(
    enabled ? (mutations) => {
      setMutationCount(prev => prev + mutations.length);
    } : () => {},
    enabled ? {
      childList: true,
      attributes: true,
    } : {
      childList: false,
      attributes: false,
    }
  );

  return (
    <Box>
      <Switch
        label="Enable mutation observation"
        checked={enabled}
        onChange={(event) => setEnabled(event.currentTarget.checked)}
        mb="md"
      />
      
      <Paper
        ref={ref}
        w={200}
        h={200}
        style={{
          backgroundColor: enabled ? '#e3f2fd' : '#f5f5f5',
          padding: '16px',
        }}
      >
        <Text>Mutations: {mutationCount}</Text>
      </Paper>
    </Box>
  );
}
```

## Common Patterns

### Mutation with State Management

```tsx
import { useMutationObserver } from '@mantine/hooks';
import { Text, Box, Paper, Button } from '@mantine/core';
import { useState, useEffect } from 'react';

function MutationWithState() {
  const [mutations, setMutations] = useState<MutationRecord[]>([]);
  const [isObserving, setIsObserving] = useState(false);

  const ref = useMutationObserver<HTMLDivElement>(
    (newMutations) => {
      setMutations(prev => [...prev, ...newMutations]);
    },
    {
      childList: true,
      attributes: true,
      subtree: true,
    }
  );

  useEffect(() => {
    setIsObserving(true);
    return () => setIsObserving(false);
  }, []);

  const clearMutations = () => setMutations([]);

  return (
    <Box>
      <Paper
        ref={ref}
        w={200}
        h={200}
        style={{
          backgroundColor: isObserving ? '#e8f5e8' : '#f5f5f5',
          padding: '16px',
        }}
      >
        <Text>Observing: {isObserving ? 'Yes' : 'No'}</Text>
        <Text>Mutations: {mutations.length}</Text>
      </Paper>
      
      <Button onClick={clearMutations} mt="md" fullWidth>
        Clear Mutations
      </Button>
    </Box>
  );
}
```

### Mutation with Animation

```tsx
import { useMutationObserver } from '@mantine/hooks';
import { Text, Box, Paper } from '@mantine/core';
import { useState } from 'react';

function MutationWithAnimation() {
  const [isAnimating, setIsAnimating] = useState(false);

  const ref = useMutationObserver<HTMLDivElement>(
    (mutations) => {
      if (mutations.length > 0) {
        setIsAnimating(true);
        setTimeout(() => setIsAnimating(false), 500);
      }
    },
    {
      childList: true,
      attributes: true,
    }
  );

  return (
    <Box>
      <Paper
        ref={ref}
        w={200}
        h={200}
        style={{
          backgroundColor: isAnimating ? '#ffeb3b' : '#e3f2fd',
          padding: '16px',
          transition: 'all 0.3s ease',
          transform: isAnimating ? 'scale(1.05)' : 'scale(1)',
        }}
      >
        <Text>Mutation detected: {isAnimating ? 'Yes' : 'No'}</Text>
      </Paper>
    </Box>
  );
}
```

## Integration with Other Hooks

### Combined with useDisclosure

```tsx
import { useMutationObserver, useDisclosure } from '@mantine/hooks';
import { Modal, Button, Text, Box, Paper } from '@mantine/core';

function MutationWithModal() {
  const [mutationCount, setMutationCount] = useState(0);
  const { ref, active } = useMutationObserver<HTMLDivElement>(
    (mutations) => setMutationCount(prev => prev + mutations.length),
    { childList: true, attributes: true }
  );
  const [opened, { open, close }] = useDisclosure();

  return (
    <Box>
      <Paper
        ref={ref}
        w={200}
        h={200}
        style={{
          backgroundColor: '#f0f0f0',
          padding: '16px',
        }}
      >
        <Text>Mutations: {mutationCount}</Text>
      </Paper>
      
      <Button onClick={open} mt="md" fullWidth>
        Open Modal
      </Button>

      <Modal
        opened={opened}
        onClose={close}
        title="Mutation Details"
      >
        <Text>Total mutations detected: {mutationCount}</Text>
        <Text>Observer active: {active ? 'Yes' : 'No'}</Text>
      </Modal>
    </Box>
  );
}
```

### Combined with useLocalStorage

```tsx
import { useMutationObserver, useLocalStorage } from '@mantine/hooks';
import { Text, Box, Paper, Button } from '@mantine/core';

function MutationWithStorage() {
  const [mutationCount, setMutationCount] = useState(0);
  const { ref } = useMutationObserver<HTMLDivElement>(
    (mutations) => setMutationCount(prev => prev + mutations.length),
    { childList: true, attributes: true }
  );
  const [savedMutations, setSavedMutations] = useLocalStorage({
    key: 'mutation-count',
    defaultValue: 0
  });

  const saveMutationCount = () => {
    setSavedMutations(mutationCount);
  };

  return (
    <Box>
      <Paper
        ref={ref}
        w={200}
        h={200}
        style={{
          backgroundColor: '#f0f0f0',
          padding: '16px',
        }}
      >
        <Text>Current: {mutationCount}</Text>
        <Text>Saved: {savedMutations}</Text>
      </Paper>
      
      <Button onClick={saveMutationCount} mt="md" fullWidth>
        Save Count
      </Button>
    </Box>
  );
}
```

## Troubleshooting

### Common Issues

1. **Mutations Not Detected**
   - Check if the target element is properly set
   - Verify the observer options are correct
   - Ensure the element is in the DOM

2. **Performance Issues**
   - Use debouncing for frequent mutations
   - Consider filtering specific mutation types
   - Avoid expensive operations in the callback

3. **Memory Leaks**
   - The hook handles cleanup automatically
   - Avoid storing references to mutation targets

### Debug Information

```tsx
import { useMutationObserver } from '@mantine/hooks';
import { Text, Box, Paper } from '@mantine/core';

function DebugMutationObserver() {
  const [debugInfo, setDebugInfo] = useState<{
    totalMutations: number;
    lastMutationType: string;
    lastTarget: string;
  }>({
    totalMutations: 0,
    lastMutationType: 'None',
    lastTarget: 'None'
  });

  const ref = useMutationObserver<HTMLDivElement>(
    (mutations) => {
      mutations.forEach((mutation) => {
        setDebugInfo(prev => ({
          totalMutations: prev.totalMutations + 1,
          lastMutationType: mutation.type,
          lastTarget: mutation.target.nodeName
        }));
      });
    },
    {
      childList: true,
      attributes: true,
      subtree: true,
    }
  );

  return (
    <Box>
      <Paper
        ref={ref}
        w={200}
        h={200}
        style={{
          backgroundColor: '#f0f0f0',
          padding: '16px',
        }}
      >
        <Text>Debug Info</Text>
      </Paper>
      
      <Paper p="md" mt="md" style={{ backgroundColor: '#f8f9fa' }}>
        <Text size="lg" weight="bold" mb="md">Mutation Debug Info</Text>
        
        <Box>
          <Text>Total Mutations: {debugInfo.totalMutations}</Text>
          <Text>Last Type: {debugInfo.lastMutationType}</Text>
          <Text>Last Target: {debugInfo.lastTarget}</Text>
        </Box>
      </Paper>
    </Box>
  );
}
```

## Browser Support

- **Modern Browsers**: Full support
- **Legacy Browsers**: Full support (MutationObserver is well-supported)
- **Mobile Browsers**: Full support
- **Server-Side**: Safe to use (no-op during SSR)

## Related Hooks

- `use-intersection` - For intersection observation
- `use-resize-observer` - For resize observation
- `use-event-listener` - For event listening
- `use-click-outside` - For click outside detection

## Best Practices

1. **Performance**: Use debouncing for frequent mutations
2. **Specificity**: Use attribute filters to limit observations
3. **Cleanup**: The hook handles cleanup automatically
4. **Testing**: Test with actual DOM changes
5. **Accessibility**: Consider accessibility implications of mutations

---

*The `use-mutation-observer` hook provides a powerful way to monitor DOM changes in React applications. It's perfect for form validation, dynamic content loading, accessibility monitoring, and performance tracking with excellent browser support and automatic cleanup.*
