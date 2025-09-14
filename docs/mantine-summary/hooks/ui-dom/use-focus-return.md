# use-focus-return Hook

## Overview

The `use-focus-return` hook captures the last focused element on the page and automatically returns focus to it when a given condition is met. This hook is essential for creating accessible user interfaces, particularly for modals, dropdowns, and other overlay components where focus management is critical for screen reader users and keyboard navigation.

## Installation

```bash
npm install @mantine/hooks
```

## Import

```typescript
import { useFocusReturn } from '@mantine/hooks';
import type { UseFocusReturnOptions, UseFocusReturnReturnValue } from '@mantine/hooks';
```

## Basic Usage

```tsx
import { useDisclosure } from '@mantine/hooks';
import { Modal, Button } from '@mantine/core';

function Demo() {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Modal opened={opened} onClose={close} title="Authentication">
        {/* Modal content */}
      </Modal>

      <Button variant="default" onClick={open}>
        Open modal
      </Button>
    </>
  );
}
```

## API Reference

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `options` | `UseFocusReturnOptions` | **Required.** Configuration options for focus return behavior |

### UseFocusReturnOptions

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `opened` | `boolean` | - | **Required.** Whether the focus trap region is active |
| `shouldReturnFocus` | `boolean` | `true` | Whether focus should be returned automatically |

### Return Value

Returns a function that can be called to manually return focus to the last active element.

### Type Definitions

```typescript
interface UseFocusReturnOptions {
  opened: boolean;
  shouldReturnFocus?: boolean;
}

type UseFocusReturnReturnValue = () => void;

function useFocusReturn(options: UseFocusReturnOptions): UseFocusReturnReturnValue;
```

## Key Features

### 1. **Automatic Focus Management**
- Captures the last focused element when a focus trap is activated
- Automatically returns focus when the trap is deactivated
- Essential for accessibility compliance

### 2. **Manual Focus Control**
- Option to disable automatic focus return
- Manual control via returned function
- Perfect for complex focus management scenarios

### 3. **Integration with Focus Trap**
- Designed to work seamlessly with `use-focus-trap`
- Handles focus state transitions properly
- Maintains focus context across component lifecycle

## Advanced Usage

### Basic Focus Return

```tsx
import { useFocusReturn } from '@mantine/hooks';
import { useState } from 'react';

function BasicFocusReturn() {
  const [isOpen, setIsOpen] = useState(false);

  useFocusReturn({
    opened: isOpen,
    shouldReturnFocus: true
  });

  return (
    <div>
      <button onClick={() => setIsOpen(true)}>
        Open Focus Trap
      </button>
      {isOpen && (
        <div>
          <button onClick={() => setIsOpen(false)}>
            Close and Return Focus
          </button>
        </div>
      )}
    </div>
  );
}
```

### Manual Focus Control

```tsx
import { useFocusReturn } from '@mantine/hooks';
import { useState } from 'react';

function ManualFocusControl() {
  const [isOpen, setIsOpen] = useState(false);

  const returnFocus = useFocusReturn({
    opened: isOpen,
    shouldReturnFocus: false
  });

  const handleClose = () => {
    setIsOpen(false);
    // Manually return focus after a delay
    setTimeout(() => {
      returnFocus();
    }, 100);
  };

  return (
    <div>
      <button onClick={() => setIsOpen(true)}>
        Open Focus Trap
      </button>
      {isOpen && (
        <div>
          <button onClick={handleClose}>
            Close with Manual Focus Return
          </button>
        </div>
      )}
    </div>
  );
}
```

## Use Cases

### 1. **Modal Component**

```tsx
import { useFocusReturn } from '@mantine/hooks';
import { useState } from 'react';
import { Button, Modal, TextInput, Group } from '@mantine/core';

function ModalWithFocusReturn() {
  const [opened, setOpened] = useState(false);

  useFocusReturn({
    opened: opened,
    shouldReturnFocus: true
  });

  return (
    <>
      <Button onClick={() => setOpened(true)}>
        Open Modal
      </Button>

      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title="User Settings"
      >
        <TextInput label="Name" placeholder="Enter your name" />
        <TextInput label="Email" placeholder="Enter your email" />
        <Group mt="md">
          <Button onClick={() => setOpened(false)}>
            Save
          </Button>
          <Button variant="outline" onClick={() => setOpened(false)}>
            Cancel
          </Button>
        </Group>
      </Modal>
    </>
  );
}
```

### 2. **Dropdown Menu**

```tsx
import { useFocusReturn } from '@mantine/hooks';
import { useState, useRef } from 'react';
import { Button, Menu, Text } from '@mantine/core';

function DropdownWithFocusReturn() {
  const [opened, setOpened] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useFocusReturn({
    opened: opened,
    shouldReturnFocus: true
  });

  return (
    <Menu
      opened={opened}
      onClose={() => setOpened(false)}
      trigger="click"
    >
      <Menu.Target>
        <Button ref={triggerRef} onClick={() => setOpened(!opened)}>
          Open Menu
        </Button>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Item>Profile</Menu.Item>
        <Menu.Item>Settings</Menu.Item>
        <Menu.Item>Logout</Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}
```

### 3. **Tooltip with Focus Return**

```tsx
import { useFocusReturn } from '@mantine/hooks';
import { useState } from 'react';
import { Button, Tooltip, Text } from '@mantine/core';

function TooltipWithFocusReturn() {
  const [opened, setOpened] = useState(false);

  useFocusReturn({
    opened: opened,
    shouldReturnFocus: true
  });

  return (
    <Tooltip
      opened={opened}
      onClose={() => setOpened(false)}
      label="This is a tooltip with focus return"
    >
      <Button
        onMouseEnter={() => setOpened(true)}
        onMouseLeave={() => setOpened(false)}
        onFocus={() => setOpened(true)}
        onBlur={() => setOpened(false)}
      >
        Hover or Focus for Tooltip
      </Button>
    </Tooltip>
  );
}
```

### 4. **Combined with Focus Trap**

```tsx
import { useFocusReturn, useFocusTrap } from '@mantine/hooks';
import { useState } from 'react';
import { Button, Paper, TextInput, Group } from '@mantine/core';

function FocusTrapWithReturn() {
  const [opened, setOpened] = useState(false);

  // Focus trap for the modal content
  const focusTrapRef = useFocusTrap(opened);

  // Focus return when modal closes
  useFocusReturn({
    opened: opened,
    shouldReturnFocus: true
  });

  return (
    <>
      <Button onClick={() => setOpened(true)}>
        Open Focus Trap
      </Button>

      {opened && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
          onClick={() => setOpened(false)}
        >
          <Paper
            ref={focusTrapRef}
            p="md"
            onClick={(e) => e.stopPropagation()}
          >
            <Text mb="md">Focus is trapped in this modal</Text>
            <TextInput placeholder="First input" />
            <TextInput placeholder="Second input" />
            <Group mt="md">
              <Button onClick={() => setOpened(false)}>
                Close
              </Button>
            </Group>
          </Paper>
        </div>
      )}
    </>
  );
}
```

### 5. **Conditional Focus Return**

```tsx
import { useFocusReturn } from '@mantine/hooks';
import { useState } from 'react';
import { Button, Switch, Text } from '@mantine/core';

function ConditionalFocusReturn() {
  const [opened, setOpened] = useState(false);
  const [shouldReturn, setShouldReturn] = useState(true);

  useFocusReturn({
    opened: opened,
    shouldReturnFocus: shouldReturn
  });

  return (
    <div>
      <Switch
        label="Return focus automatically"
        checked={shouldReturn}
        onChange={(event) => setShouldReturn(event.currentTarget.checked)}
        mb="md"
      />
      
      <Button onClick={() => setOpened(true)}>
        Open Modal
      </Button>

      {opened && (
        <div style={{ marginTop: '16px', padding: '16px', border: '1px solid #ccc' }}>
          <Text>Modal content</Text>
          <Button onClick={() => setOpened(false)}>
            Close Modal
          </Button>
        </div>
      )}
    </div>
  );
}
```

### 6. **Custom Focus Management**

```tsx
import { useFocusReturn } from '@mantine/hooks';
import { useState, useRef } from 'react';
import { Button, TextInput, Group } from '@mantine/core';

function CustomFocusManagement() {
  const [opened, setOpened] = useState(false);
  const customElementRef = useRef<HTMLDivElement>(null);

  const returnFocus = useFocusReturn({
    opened: opened,
    shouldReturnFocus: false
  });

  const handleClose = () => {
    setOpened(false);
    
    // Custom focus logic
    if (customElementRef.current) {
      customElementRef.current.focus();
    } else {
      returnFocus(); // Fallback to default behavior
    }
  };

  return (
    <div>
      <TextInput
        ref={customElementRef}
        placeholder="This will receive focus"
        mb="md"
      />
      
      <Button onClick={() => setOpened(true)}>
        Open Modal
      </Button>

      {opened && (
        <div style={{ marginTop: '16px', padding: '16px', border: '1px solid #ccc' }}>
          <Text>Modal content</Text>
          <Group mt="md">
            <Button onClick={handleClose}>
              Close with Custom Focus
            </Button>
            <Button onClick={() => setOpened(false)}>
              Close with Default Focus
            </Button>
          </Group>
        </div>
      )}
    </div>
  );
}
```

## Performance Considerations

### Memory Management

```tsx
import { useFocusReturn } from '@mantine/hooks';
import { useState, useEffect } from 'react';

function OptimizedFocusReturn() {
  const [opened, setOpened] = useState(false);

  useFocusReturn({
    opened: opened,
    shouldReturnFocus: true
  });

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      // Focus return hook handles cleanup automatically
    };
  }, []);

  return (
    <div>
      <button onClick={() => setOpened(true)}>
        Open Modal
      </button>
      {opened && (
        <div>
          <button onClick={() => setOpened(false)}>
            Close Modal
          </button>
        </div>
      )}
    </div>
  );
}
```

### Conditional Rendering

```tsx
import { useFocusReturn } from '@mantine/hooks';
import { useState } from 'react';

function ConditionalRendering() {
  const [opened, setOpened] = useState(false);
  const [shouldRender, setShouldRender] = useState(true);

  useFocusReturn({
    opened: opened && shouldRender,
    shouldReturnFocus: true
  });

  if (!shouldRender) {
    return <div>Component not rendered</div>;
  }

  return (
    <div>
      <button onClick={() => setOpened(true)}>
        Open Modal
      </button>
      {opened && (
        <div>
          <button onClick={() => setOpened(false)}>
            Close Modal
          </button>
        </div>
      )}
    </div>
  );
}
```

## Common Patterns

### Focus Return with Animation

```tsx
import { useFocusReturn } from '@mantine/hooks';
import { useState } from 'react';
import { Button, Paper, Text } from '@mantine/core';

function AnimatedFocusReturn() {
  const [opened, setOpened] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useFocusReturn({
    opened: opened,
    shouldReturnFocus: true
  });

  const handleClose = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setOpened(false);
      setIsAnimating(false);
    }, 300);
  };

  return (
    <div>
      <Button onClick={() => setOpened(true)}>
        Open Animated Modal
      </Button>

      {opened && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            opacity: isAnimating ? 0 : 1,
            transition: 'opacity 0.3s ease'
          }}
        >
          <Paper
            p="md"
            style={{
              transform: isAnimating ? 'scale(0.9)' : 'scale(1)',
              transition: 'transform 0.3s ease'
            }}
          >
            <Text>Animated modal content</Text>
            <Button onClick={handleClose} mt="md">
              Close with Animation
            </Button>
          </Paper>
        </div>
      )}
    </div>
  );
}
```

### Focus Return with State Persistence

```tsx
import { useFocusReturn } from '@mantine/hooks';
import { useState, useEffect } from 'react';
import { Button, TextInput, Group } from '@mantine/core';

function PersistentFocusReturn() {
  const [opened, setOpened] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '' });

  useFocusReturn({
    opened: opened,
    shouldReturnFocus: true
  });

  // Persist form data
  useEffect(() => {
    const saved = localStorage.getItem('formData');
    if (saved) {
      setFormData(JSON.parse(saved));
    }
  }, []);

  const handleSave = () => {
    localStorage.setItem('formData', JSON.stringify(formData));
    setOpened(false);
  };

  return (
    <div>
      <Button onClick={() => setOpened(true)}>
        Open Form
      </Button>

      {opened && (
        <div style={{ marginTop: '16px', padding: '16px', border: '1px solid #ccc' }}>
          <TextInput
            label="Name"
            value={formData.name}
            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
            mb="md"
          />
          <TextInput
            label="Email"
            value={formData.email}
            onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
            mb="md"
          />
          <Group>
            <Button onClick={handleSave}>
              Save
            </Button>
            <Button variant="outline" onClick={() => setOpened(false)}>
              Cancel
            </Button>
          </Group>
        </div>
      )}
    </div>
  );
}
```

## Integration with Other Hooks

### Combined with useDisclosure

```tsx
import { useFocusReturn, useDisclosure } from '@mantine/hooks';
import { Button, Modal } from '@mantine/core';

function DisclosureIntegration() {
  const [opened, { open, close }] = useDisclosure(false);

  useFocusReturn({
    opened: opened,
    shouldReturnFocus: true
  });

  return (
    <>
      <Button onClick={open}>
        Open Modal
      </Button>

      <Modal opened={opened} onClose={close} title="Modal Title">
        <p>Modal content</p>
      </Modal>
    </>
  );
}
```

### Combined with useClickOutside

```tsx
import { useFocusReturn, useClickOutside } from '@mantine/hooks';
import { useState } from 'react';
import { Button, Paper } from '@mantine/core';

function ClickOutsideIntegration() {
  const [opened, setOpened] = useState(false);

  useFocusReturn({
    opened: opened,
    shouldReturnFocus: true
  });

  const ref = useClickOutside(() => setOpened(false));

  return (
    <div>
      <Button onClick={() => setOpened(true)}>
        Open Dropdown
      </Button>

      {opened && (
        <Paper ref={ref} p="md" style={{ marginTop: '8px' }}>
          <p>Click outside to close</p>
        </Paper>
      )}
    </div>
  );
}
```

## Troubleshooting

### Common Issues

1. **Focus Not Returning**
   - Ensure the `opened` state is properly managed
   - Check if `shouldReturnFocus` is set to `true`
   - Verify the element was focused before the trap was activated

2. **Focus Return Timing**
   - Use manual focus return for complex timing scenarios
   - Consider using `setTimeout` for delayed focus return
   - Ensure focus return happens after animations complete

3. **Accessibility Issues**
   - Test with screen readers
   - Ensure focus is visible to users
   - Verify keyboard navigation works properly

### Debug Information

```tsx
import { useFocusReturn } from '@mantine/hooks';
import { useState, useEffect } from 'react';

function DebugFocusReturn() {
  const [opened, setOpened] = useState(false);

  useFocusReturn({
    opened: opened,
    shouldReturnFocus: true
  });

  useEffect(() => {
    console.log('Focus return state:', { opened });
    console.log('Active element:', document.activeElement);
  }, [opened]);

  return (
    <div>
      <button onClick={() => setOpened(true)}>
        Open Modal
      </button>
      {opened && (
        <div>
          <button onClick={() => setOpened(false)}>
            Close Modal
          </button>
        </div>
      )}
    </div>
  );
}
```

## Browser Support

- **Modern Browsers**: Full support
- **Legacy Browsers**: Full support
- **Screen Readers**: Excellent accessibility support
- **Server-Side**: Safe to use (no-op during SSR)

## Related Hooks

- `use-focus-trap` - For trapping focus within a region
- `use-focus` - For focus state management
- `use-click-outside` - For click outside detection
- `use-disclosure` - For open/close state management

## Best Practices

1. **Always Use with Focus Trap**: Combine with `use-focus-trap` for complete focus management
2. **Test with Screen Readers**: Ensure accessibility compliance
3. **Handle Edge Cases**: Consider what happens when the focused element is removed
4. **Timing Considerations**: Account for animations and transitions
5. **Manual Control**: Use manual focus return for complex scenarios

---

*The `use-focus-return` hook is essential for creating accessible user interfaces. It ensures that focus is properly managed when users interact with modals, dropdowns, and other overlay components, providing a seamless experience for all users, including those using assistive technologies.*
