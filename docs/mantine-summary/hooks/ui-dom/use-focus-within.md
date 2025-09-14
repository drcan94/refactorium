# use-focus-within Hook

## Overview

The `use-focus-within` hook detects if any element within a given element has focus. It works similarly to the `:focus-within` CSS selector, providing a React-friendly way to track focus state within a container element. This hook is perfect for creating interactive components that need to respond to focus changes within their boundaries.

## Installation

```bash
npm install @mantine/hooks
```

## Import

```typescript
import { useFocusWithin } from '@mantine/hooks';
import type { UseFocusWithinOptions, UseFocusWithinReturnValue } from '@mantine/hooks';
```

## Basic Usage

```tsx
import { useFocusWithin } from '@mantine/hooks';
import { TextInput, Button, Box, Text } from '@mantine/core';

function Demo() {
  const { ref, focused } = useFocusWithin();

  return (
    <div ref={ref}>
      <Box
        p="xl"
        style={{
          backgroundColor: focused ? 'var(--mantine-color-blue-light)' : 'transparent',
        }}
      >
        <Text size="sm">One of elements has focus: {focused.toString()}</Text>
        <TextInput label="Focus this input" placeholder="Styles will be added to parent" />
        <Button mt="md">Button</Button>
      </Box>
    </div>
  );
}
```

## API Reference

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `options` | `UseFocusWithinOptions` | **Optional.** Configuration options for focus detection |

### UseFocusWithinOptions

| Property | Type | Description |
|----------|------|-------------|
| `onFocus` | `(event: FocusEvent) => void` | **Optional.** Called when any child element receives focus |
| `onBlur` | `(event: FocusEvent) => void` | **Optional.** Called when focus leaves all child elements |

### Return Value

| Property | Type | Description |
|----------|------|-------------|
| `ref` | `React.RefCallback<T \| null>` | Ref callback that must be assigned to the container element |
| `focused` | `boolean` | Whether any child element currently has focus |

### Type Definitions

```typescript
interface UseFocusWithinOptions {
  onFocus?: (event: FocusEvent) => void;
  onBlur?: (event: FocusEvent) => void;
}

interface UseFocusWithinReturnValue<T extends HTMLElement = any> {
  ref: React.RefCallback<T | null>;
  focused: boolean;
}

function useFocusWithin<T extends HTMLElement = any>(
  options?: UseFocusWithinOptions,
): UseFocusWithinReturnValue<T>;
```

## Key Features

### 1. **CSS :focus-within Equivalent**
- Works exactly like the `:focus-within` CSS pseudo-class
- Detects focus on any descendant element
- Perfect for styling parent containers based on child focus

### 2. **Event Callbacks**
- Optional `onFocus` and `onBlur` callbacks
- Provides access to the original focus events
- Enables custom focus handling logic

### 3. **TypeScript Support**
- Full TypeScript support with generic type parameter
- Type-safe ref assignment
- Proper event typing

## Advanced Usage

### With Event Callbacks

```tsx
import { useFocusWithin } from '@mantine/hooks';
import { TextInput, Button, Box, Text } from '@mantine/core';

function FocusWithCallbacks() {
  const { ref, focused } = useFocusWithin({
    onFocus: (event) => {
      console.log('Focus within detected:', event.target);
    },
    onBlur: (event) => {
      console.log('Focus left container:', event.target);
    }
  });

  return (
    <div ref={ref}>
      <Box
        p="xl"
        style={{
          backgroundColor: focused ? 'var(--mantine-color-blue-light)' : 'transparent',
          border: focused ? '2px solid var(--mantine-color-blue-6)' : '2px solid transparent',
          transition: 'all 0.2s ease'
        }}
      >
        <Text size="sm">Focus state: {focused ? 'Focused' : 'Not focused'}</Text>
        <TextInput label="First input" placeholder="Focus me" />
        <TextInput label="Second input" placeholder="Or focus me" />
        <Button mt="md">Button</Button>
      </Box>
    </div>
  );
}
```

### TypeScript with Specific Element Type

```tsx
import { useFocusWithin } from '@mantine/hooks';
import { TextInput, Button, Paper } from '@mantine/core';

function TypedFocusWithin() {
  const { ref, focused } = useFocusWithin<HTMLDivElement>();

  return (
    <div ref={ref}>
      <Paper
        p="md"
        style={{
          backgroundColor: focused ? '#f0f8ff' : '#ffffff',
          border: focused ? '2px solid #1976d2' : '1px solid #e0e0e0'
        }}
      >
        <TextInput placeholder="Type here" />
        <Button mt="sm">Click me</Button>
      </Paper>
    </div>
  );
}
```

## Use Cases

### 1. **Interactive Form Container**

```tsx
import { useFocusWithin } from '@mantine/hooks';
import { TextInput, Button, Paper, Text, Group } from '@mantine/core';

function InteractiveForm() {
  const { ref, focused } = useFocusWithin();

  return (
    <Paper
      ref={ref}
      p="xl"
      style={{
        backgroundColor: focused ? '#f8f9fa' : '#ffffff',
        border: focused ? '2px solid #1976d2' : '1px solid #e0e0e0',
        borderRadius: '8px',
        transition: 'all 0.2s ease',
        boxShadow: focused ? '0 4px 12px rgba(25, 118, 210, 0.15)' : '0 2px 4px rgba(0, 0, 0, 0.1)'
      }}
    >
      <Text size="lg" weight="bold" mb="md">
        Contact Form
      </Text>
      
      <TextInput
        label="Name"
        placeholder="Enter your name"
        mb="md"
      />
      
      <TextInput
        label="Email"
        placeholder="Enter your email"
        mb="md"
      />
      
      <TextInput
        label="Message"
        placeholder="Enter your message"
        multiline
        rows={4}
        mb="md"
      />
      
      <Group>
        <Button>Submit</Button>
        <Button variant="outline">Cancel</Button>
      </Group>
    </Paper>
  );
}
```

### 2. **Search Input with Suggestions**

```tsx
import { useFocusWithin } from '@mantine/hooks';
import { TextInput, Paper, Text, Box } from '@mantine/core';
import { useState } from 'react';

function SearchWithSuggestions() {
  const [query, setQuery] = useState('');
  const { ref, focused } = useFocusWithin();

  const suggestions = [
    'React',
    'TypeScript',
    'JavaScript',
    'Node.js',
    'Mantine'
  ].filter(item => 
    item.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <Box ref={ref} style={{ position: 'relative' }}>
      <TextInput
        label="Search"
        placeholder="Type to search..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{
          borderColor: focused ? '#1976d2' : '#e0e0e0',
          boxShadow: focused ? '0 0 0 2px rgba(25, 118, 210, 0.2)' : 'none'
        }}
      />
      
      {focused && suggestions.length > 0 && (
        <Paper
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            zIndex: 1000,
            maxHeight: '200px',
            overflowY: 'auto'
          }}
        >
          {suggestions.map((suggestion, index) => (
            <Box
              key={index}
              p="sm"
              style={{
                cursor: 'pointer',
                backgroundColor: 'transparent',
                transition: 'background-color 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#f5f5f5';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
              }}
              onClick={() => setQuery(suggestion)}
            >
              {suggestion}
            </Box>
          ))}
        </Paper>
      )}
    </Box>
  );
}
```

### 3. **Card with Interactive Elements**

```tsx
import { useFocusWithin } from '@mantine/hooks';
import { Card, Text, Button, TextInput, Group, Badge } from '@mantine/core';

function InteractiveCard() {
  const { ref, focused } = useFocusWithin();

  return (
    <Card
      ref={ref}
      shadow="sm"
      padding="lg"
      radius="md"
      withBorder
      style={{
        transform: focused ? 'translateY(-2px)' : 'translateY(0)',
        boxShadow: focused 
          ? '0 8px 25px rgba(0, 0, 0, 0.15)' 
          : '0 2px 8px rgba(0, 0, 0, 0.1)',
        transition: 'all 0.2s ease',
        borderColor: focused ? '#1976d2' : '#e0e0e0'
      }}
    >
      <Group position="apart" mb="xs">
        <Text weight={500}>Interactive Card</Text>
        <Badge color={focused ? 'blue' : 'gray'} variant="light">
          {focused ? 'Active' : 'Inactive'}
        </Badge>
      </Group>

      <Text size="sm" color="dimmed" mb="md">
        This card responds to focus within its boundaries
      </Text>

      <TextInput
        placeholder="Enter some text"
        mb="md"
      />

      <Group>
        <Button size="sm">Action 1</Button>
        <Button size="sm" variant="outline">Action 2</Button>
      </Group>
    </Card>
  );
}
```

### 4. **Navigation Menu with Focus States**

```tsx
import { useFocusWithin } from '@mantine/hooks';
import { Navbar, NavLink, TextInput, Button, Group } from '@mantine/core';

function NavigationWithFocus() {
  const { ref, focused } = useFocusWithin();

  return (
    <Navbar
      ref={ref}
      width={{ base: 300 }}
      p="md"
      style={{
        backgroundColor: focused ? '#f8f9fa' : '#ffffff',
        borderRight: focused ? '3px solid #1976d2' : '1px solid #e0e0e0',
        transition: 'all 0.2s ease'
      }}
    >
      <TextInput
        placeholder="Search navigation..."
        mb="md"
      />

      <NavLink label="Dashboard" />
      <NavLink label="Projects" />
      <NavLink label="Team" />
      <NavLink label="Settings" />

      <Group mt="md">
        <Button size="sm" fullWidth>
          New Item
        </Button>
      </Group>
    </Navbar>
  );
}
```

### 5. **Modal with Focus Detection**

```tsx
import { useFocusWithin } from '@mantine/hooks';
import { Modal, TextInput, Button, Group, Text } from '@mantine/core';
import { useState } from 'react';

function ModalWithFocusDetection() {
  const [opened, setOpened] = useState(false);
  const { ref, focused } = useFocusWithin();

  return (
    <>
      <Button onClick={() => setOpened(true)}>
        Open Modal
      </Button>

      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title="Modal with Focus Detection"
      >
        <div ref={ref}>
          <Text size="sm" color="dimmed" mb="md">
            Focus state: {focused ? 'Focused within modal' : 'Not focused'}
          </Text>

          <TextInput
            label="Name"
            placeholder="Enter your name"
            mb="md"
          />

          <TextInput
            label="Email"
            placeholder="Enter your email"
            mb="md"
          />

          <Group mt="md">
            <Button onClick={() => setOpened(false)}>
              Save
            </Button>
            <Button variant="outline" onClick={() => setOpened(false)}>
              Cancel
            </Button>
          </Group>
        </div>
      </Modal>
    </>
  );
}
```

### 6. **Data Table with Row Focus**

```tsx
import { useFocusWithin } from '@mantine/hooks';
import { Table, TextInput, Button, Paper, Text } from '@mantine/core';

function DataTableWithFocus() {
  const { ref, focused } = useFocusWithin();

  const data = [
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com' }
  ];

  return (
    <Paper ref={ref} p="md">
      <Text size="lg" weight="bold" mb="md">
        Users
        {focused && (
          <Text size="sm" color="blue" component="span" ml="sm">
            (Row selected)
          </Text>
        )}
      </Text>

      <Table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((user) => (
            <tr
              key={user.id}
              style={{
                backgroundColor: focused ? '#f0f8ff' : 'transparent',
                transition: 'background-color 0.2s ease'
              }}
            >
              <td>
                <TextInput
                  defaultValue={user.name}
                  variant="unstyled"
                  size="sm"
                />
              </td>
              <td>
                <TextInput
                  defaultValue={user.email}
                  variant="unstyled"
                  size="sm"
                />
              </td>
              <td>
                <Button size="xs" variant="outline">
                  Edit
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Paper>
  );
}
```

## Performance Considerations

### Memoized Callbacks

```tsx
import { useFocusWithin } from '@mantine/hooks';
import { useCallback } from 'react';
import { TextInput, Button, Box } from '@mantine/core';

function OptimizedFocusWithin() {
  const handleFocus = useCallback((event: FocusEvent) => {
    console.log('Focus within:', event.target);
  }, []);

  const handleBlur = useCallback((event: FocusEvent) => {
    console.log('Blur within:', event.target);
  }, []);

  const { ref, focused } = useFocusWithin({
    onFocus: handleFocus,
    onBlur: handleBlur
  });

  return (
    <Box ref={ref}>
      <TextInput placeholder="Input" />
      <Button>Button</Button>
    </Box>
  );
}
```

### Conditional Styling

```tsx
import { useFocusWithin } from '@mantine/hooks';
import { useMemo } from 'react';
import { TextInput, Button, Box } from '@mantine/core';

function ConditionalStyling() {
  const { ref, focused } = useFocusWithin();

  const containerStyle = useMemo(() => ({
    backgroundColor: focused ? '#f0f8ff' : '#ffffff',
    border: focused ? '2px solid #1976d2' : '1px solid #e0e0e0',
    transition: 'all 0.2s ease'
  }), [focused]);

  return (
    <Box ref={ref} style={containerStyle} p="md">
      <TextInput placeholder="Input" />
      <Button>Button</Button>
    </Box>
  );
}
```

## Common Patterns

### Focus Within with State Management

```tsx
import { useFocusWithin } from '@mantine/hooks';
import { useState, useEffect } from 'react';
import { TextInput, Button, Box, Text } from '@mantine/core';

function FocusWithState() {
  const [focusCount, setFocusCount] = useState(0);
  const { ref, focused } = useFocusWithin({
    onFocus: () => setFocusCount(prev => prev + 1)
  });

  useEffect(() => {
    if (focused) {
      console.log('Focus within detected');
    } else {
      console.log('Focus left container');
    }
  }, [focused]);

  return (
    <Box ref={ref} p="md" border="1px solid #e0e0e0">
      <Text size="sm" mb="md">
        Focus count: {focusCount}
      </Text>
      <TextInput placeholder="Input 1" />
      <TextInput placeholder="Input 2" />
      <Button>Button</Button>
    </Box>
  );
}
```

### Focus Within with Animation

```tsx
import { useFocusWithin } from '@mantine/hooks';
import { TextInput, Button, Box } from '@mantine/core';

function AnimatedFocusWithin() {
  const { ref, focused } = useFocusWithin();

  return (
    <Box
      ref={ref}
      p="md"
      style={{
        backgroundColor: focused ? '#f0f8ff' : '#ffffff',
        border: focused ? '2px solid #1976d2' : '1px solid #e0e0e0',
        borderRadius: '8px',
        transform: focused ? 'scale(1.02)' : 'scale(1)',
        boxShadow: focused 
          ? '0 8px 25px rgba(25, 118, 210, 0.15)' 
          : '0 2px 8px rgba(0, 0, 0, 0.1)',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
      }}
    >
      <TextInput placeholder="Focus me for animation" />
      <Button mt="sm">Click me</Button>
    </Box>
  );
}
```

## Integration with Other Hooks

### Combined with useClickOutside

```tsx
import { useFocusWithin, useClickOutside } from '@mantine/hooks';
import { useState } from 'react';
import { TextInput, Button, Box } from '@mantine/core';

function FocusWithClickOutside() {
  const [isOpen, setIsOpen] = useState(false);
  const { ref: focusRef, focused } = useFocusWithin();
  const clickOutsideRef = useClickOutside(() => setIsOpen(false));

  const mergedRef = (el: HTMLDivElement | null) => {
    focusRef(el);
    clickOutsideRef(el);
  };

  return (
    <div>
      <Button onClick={() => setIsOpen(true)}>
        Open Dropdown
      </Button>

      {isOpen && (
        <Box
          ref={mergedRef}
          p="md"
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            backgroundColor: '#ffffff',
            border: '1px solid #e0e0e0',
            borderRadius: '4px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
            zIndex: 1000
          }}
        >
          <Text size="sm" mb="md">
            Focused: {focused.toString()}
          </Text>
          <TextInput placeholder="Input" />
          <Button size="sm" mt="sm">Action</Button>
        </Box>
      )}
    </div>
  );
}
```

### Combined with useDisclosure

```tsx
import { useFocusWithin, useDisclosure } from '@mantine/hooks';
import { TextInput, Button, Box } from '@mantine/core';

function FocusWithDisclosure() {
  const [opened, { open, close }] = useDisclosure(false);
  const { ref, focused } = useFocusWithin();

  return (
    <div>
      <Button onClick={open}>
        Open Form
      </Button>

      {opened && (
        <Box
          ref={ref}
          p="md"
          style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: '#ffffff',
            border: '1px solid #e0e0e0',
            borderRadius: '8px',
            boxShadow: '0 8px 25px rgba(0, 0, 0, 0.15)',
            zIndex: 1000
          }}
        >
          <Text size="sm" mb="md">
            Form focused: {focused.toString()}
          </Text>
          <TextInput placeholder="Name" />
          <TextInput placeholder="Email" />
          <Button onClick={close} mt="md">
            Close
          </Button>
        </Box>
      )}
    </div>
  );
}
```

## Troubleshooting

### Common Issues

1. **Focus Not Detected**
   - Ensure the ref is properly assigned to the container element
   - Check if child elements are focusable
   - Verify the element is mounted and visible

2. **Event Callbacks Not Firing**
   - Check if the callbacks are properly defined
   - Ensure the element has focusable children
   - Verify event propagation is not prevented

3. **Styling Issues**
   - Use proper CSS transitions for smooth animations
   - Consider using `useMemo` for expensive style calculations
   - Test with different focus scenarios

### Debug Information

```tsx
import { useFocusWithin } from '@mantine/hooks';
import { TextInput, Button, Box, Text } from '@mantine/core';

function DebugFocusWithin() {
  const { ref, focused } = useFocusWithin({
    onFocus: (event) => {
      console.log('Focus event:', event);
      console.log('Focused element:', event.target);
    },
    onBlur: (event) => {
      console.log('Blur event:', event);
      console.log('Blurred element:', event.target);
    }
  });

  return (
    <Box ref={ref} p="md" border="1px solid #e0e0e0">
      <Text size="sm" mb="md">
        Focus state: {focused ? 'Focused' : 'Not focused'}
      </Text>
      <TextInput placeholder="Input 1" />
      <TextInput placeholder="Input 2" />
      <Button>Button</Button>
    </Box>
  );
}
```

## Browser Support

- **Modern Browsers**: Full support
- **Legacy Browsers**: Full support
- **Screen Readers**: Excellent accessibility support
- **Server-Side**: Safe to use (no-op during SSR)

## Related Hooks

- `use-focus` - For individual element focus state
- `use-focus-trap` - For trapping focus within a region
- `use-focus-return` - For returning focus after trap release
- `use-click-outside` - For click outside detection

## Best Practices

1. **Use for Container Styling**: Perfect for styling parent elements based on child focus
2. **Combine with CSS**: Use alongside `:focus-within` CSS selector for comprehensive styling
3. **Performance**: Memoize expensive style calculations
4. **Accessibility**: Ensure focus indicators are visible and meaningful
5. **Event Handling**: Use callbacks for custom focus behavior

---

*The `use-focus-within` hook provides a React-friendly way to detect focus within container elements, enabling rich interactive experiences and accessible user interfaces. It's perfect for creating components that respond to focus changes within their boundaries.*
