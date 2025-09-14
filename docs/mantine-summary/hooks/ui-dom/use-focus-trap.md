# use-focus-trap Hook

## Overview

The `use-focus-trap` hook traps focus inside a given element, preventing users from tabbing outside of it. This is essential for creating accessible modals, drawers, menus, and other overlay components where focus should be contained within a specific region. The hook automatically releases the focus trap when the element unmounts.

## Installation

```bash
npm install @mantine/hooks
```

## Import

```typescript
import { useFocusTrap } from '@mantine/hooks';
```

## Basic Usage

```tsx
import { useFocusTrap } from '@mantine/hooks';

function Demo() {
  const focusTrapRef = useFocusTrap();

  return (
    <div ref={focusTrapRef}>
      <input />
    </div>
  );
}
```

## API Reference

### Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `active` | `boolean` | `true` | Whether the focus trap is active |

### Return Value

Returns a `React.RefCallback<HTMLElement | null>` that should be passed to the element you want to trap focus within.

### Type Definition

```typescript
function useFocusTrap(active?: boolean): React.RefCallback<HTMLElement | null>
```

## Key Features

### 1. **Automatic Focus Management**
- Traps focus within the specified element
- Prevents tabbing outside the trapped region
- Automatically releases trap when element unmounts

### 2. **Conditional Activation**
- Can be activated or deactivated based on state
- Perfect for modals that can be opened/closed
- Dynamic focus trap control

### 3. **Initial Focus Control**
- Automatically focuses first interactive element
- Supports `data-autofocus` attribute for custom initial focus
- Handles focus restoration properly

## Advanced Usage

### Conditional Focus Trap

```tsx
import { useFocusTrap } from '@mantine/hooks';
import { useState } from 'react';
import { Button, Paper, TextInput, Group } from '@mantine/core';

function ConditionalFocusTrap() {
  const [isOpen, setIsOpen] = useState(false);
  const focusTrapRef = useFocusTrap(isOpen);

  return (
    <div>
      <Button onClick={() => setIsOpen(true)}>
        Open Modal
      </Button>

      {isOpen && (
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
        >
          <Paper ref={focusTrapRef} p="md">
            <TextInput placeholder="First input" />
            <TextInput placeholder="Second input" />
            <Group mt="md">
              <Button onClick={() => setIsOpen(false)}>
                Close
              </Button>
            </Group>
          </Paper>
        </div>
      )}
    </div>
  );
}
```

### Custom Initial Focus

```tsx
import { useFocusTrap } from '@mantine/hooks';
import { useState } from 'react';
import { Button, Paper, TextInput, Group } from '@mantine/core';

function CustomInitialFocus() {
  const [isOpen, setIsOpen] = useState(false);
  const focusTrapRef = useFocusTrap(isOpen);

  return (
    <div>
      <Button onClick={() => setIsOpen(true)}>
        Open Modal
      </Button>

      {isOpen && (
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
        >
          <Paper ref={focusTrapRef} p="md">
            <TextInput placeholder="First input" />
            {/* This input will receive initial focus */}
            <TextInput 
              placeholder="This will be focused first" 
              data-autofocus 
            />
            <TextInput placeholder="Third input" />
            <Group mt="md">
              <Button onClick={() => setIsOpen(false)}>
                Close
              </Button>
            </Group>
          </Paper>
        </div>
      )}
    </div>
  );
}
```

### Combined with Other Hooks

```tsx
import { useRef } from 'react';
import {
  useClickOutside,
  useFocusTrap,
  useMergedRef,
} from '@mantine/hooks';
import { useState } from 'react';
import { Button, Paper, TextInput, Group } from '@mantine/core';

function CombinedHooks() {
  const [isOpen, setIsOpen] = useState(false);
  const myRef = useRef<HTMLDivElement>(null);
  const clickOutsideRef = useClickOutside(() => setIsOpen(false));
  const focusTrapRef = useFocusTrap(isOpen);
  
  const mergedRef = useMergedRef(
    myRef,
    clickOutsideRef,
    focusTrapRef
  );

  return (
    <div>
      <Button onClick={() => setIsOpen(true)}>
        Open Modal
      </Button>

      {isOpen && (
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
        >
          <Paper ref={mergedRef} p="md">
            <TextInput placeholder="First input" />
            <TextInput placeholder="Second input" />
            <Group mt="md">
              <Button onClick={() => setIsOpen(false)}>
                Close
              </Button>
            </Group>
          </Paper>
        </div>
      )}
    </div>
  );
}
```

## Use Cases

### 1. **Modal Component**

```tsx
import { useFocusTrap } from '@mantine/hooks';
import { useState } from 'react';
import { Button, Modal, TextInput, Group } from '@mantine/core';

function ModalWithFocusTrap() {
  const [opened, setOpened] = useState(false);

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

### 2. **Drawer Component**

```tsx
import { useFocusTrap } from '@mantine/hooks';
import { useState } from 'react';
import { Button, Drawer, TextInput, Group } from '@mantine/core';

function DrawerWithFocusTrap() {
  const [opened, setOpened] = useState(false);

  return (
    <>
      <Button onClick={() => setOpened(true)}>
        Open Drawer
      </Button>

      <Drawer
        opened={opened}
        onClose={() => setOpened(false)}
        title="Navigation"
      >
        <TextInput placeholder="Search..." />
        <Button variant="subtle" fullWidth mt="md">
          Home
        </Button>
        <Button variant="subtle" fullWidth>
          Profile
        </Button>
        <Button variant="subtle" fullWidth>
          Settings
        </Button>
      </Drawer>
    </>
  );
}
```

### 3. **Dropdown Menu**

```tsx
import { useFocusTrap } from '@mantine/hooks';
import { useState } from 'react';
import { Button, Menu, Text } from '@mantine/core';

function DropdownWithFocusTrap() {
  const [opened, setOpened] = useState(false);

  return (
    <Menu
      opened={opened}
      onClose={() => setOpened(false)}
      trigger="click"
    >
      <Menu.Target>
        <Button onClick={() => setOpened(!opened)}>
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

### 4. **Custom Modal Implementation**

```tsx
import { useFocusTrap } from '@mantine/hooks';
import { useState } from 'react';
import { Button, Paper, TextInput, Group, Text } from '@mantine/core';

function CustomModal() {
  const [isOpen, setIsOpen] = useState(false);
  const focusTrapRef = useFocusTrap(isOpen);

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>
        Open Custom Modal
      </Button>

      {isOpen && (
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
            zIndex: 1000
          }}
        >
          <Paper
            ref={focusTrapRef}
            p="xl"
            style={{ minWidth: '400px' }}
          >
            <Text size="lg" weight="bold" mb="md">
              Custom Modal
            </Text>
            
            <TextInput
              label="First Name"
              placeholder="Enter first name"
              mb="md"
            />
            
            <TextInput
              label="Last Name"
              placeholder="Enter last name"
              mb="md"
            />
            
            <TextInput
              label="Email"
              placeholder="Enter email"
              mb="md"
            />
            
            <Group mt="lg">
              <Button onClick={() => setIsOpen(false)}>
                Save
              </Button>
              <Button 
                variant="outline" 
                onClick={() => setIsOpen(false)}
              >
                Cancel
              </Button>
            </Group>
          </Paper>
        </div>
      )}
    </>
  );
}
```

### 5. **Multi-Step Form**

```tsx
import { useFocusTrap } from '@mantine/hooks';
import { useState } from 'react';
import { Button, Paper, TextInput, Group, Text, Stepper } from '@mantine/core';

function MultiStepForm() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const focusTrapRef = useFocusTrap(isOpen);

  const nextStep = () => setActiveStep(prev => prev + 1);
  const prevStep = () => setActiveStep(prev => prev - 1);

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>
        Open Multi-Step Form
      </Button>

      {isOpen && (
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
            zIndex: 1000
          }}
        >
          <Paper ref={focusTrapRef} p="xl" style={{ minWidth: '500px' }}>
            <Stepper active={activeStep} onStepClick={setActiveStep}>
              <Stepper.Step label="Personal Info">
                <TextInput
                  label="First Name"
                  placeholder="Enter first name"
                  mb="md"
                />
                <TextInput
                  label="Last Name"
                  placeholder="Enter last name"
                  mb="md"
                />
              </Stepper.Step>
              
              <Stepper.Step label="Contact Info">
                <TextInput
                  label="Email"
                  placeholder="Enter email"
                  mb="md"
                />
                <TextInput
                  label="Phone"
                  placeholder="Enter phone number"
                  mb="md"
                />
              </Stepper.Step>
              
              <Stepper.Step label="Review">
                <Text>Review your information</Text>
              </Stepper.Step>
            </Stepper>

            <Group mt="xl">
              {activeStep > 0 && (
                <Button variant="outline" onClick={prevStep}>
                  Previous
                </Button>
              )}
              
              {activeStep < 2 ? (
                <Button onClick={nextStep}>
                  Next
                </Button>
              ) : (
                <Button onClick={() => setIsOpen(false)}>
                  Complete
                </Button>
              )}
              
              <Button variant="outline" onClick={() => setIsOpen(false)}>
                Cancel
              </Button>
            </Group>
          </Paper>
        </div>
      )}
    </>
  );
}
```

### 6. **Tooltip with Focus Trap**

```tsx
import { useFocusTrap } from '@mantine/hooks';
import { useState } from 'react';
import { Button, Paper, Text } from '@mantine/core';

function TooltipWithFocusTrap() {
  const [isOpen, setIsOpen] = useState(false);
  const focusTrapRef = useFocusTrap(isOpen);

  return (
    <div>
      <Button
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
        onFocus={() => setIsOpen(true)}
        onBlur={() => setIsOpen(false)}
      >
        Hover for Tooltip
      </Button>

      {isOpen && (
        <Paper
          ref={focusTrapRef}
          p="md"
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            marginTop: '8px',
            zIndex: 1000
          }}
        >
          <Text>This tooltip has focus trap</Text>
          <Button size="xs" mt="sm">
            Action Button
          </Button>
        </Paper>
      )}
    </div>
  );
}
```

## Performance Considerations

### Conditional Rendering

```tsx
import { useFocusTrap } from '@mantine/hooks';
import { useState } from 'react';

function OptimizedFocusTrap() {
  const [isOpen, setIsOpen] = useState(false);
  
  // Only create focus trap when modal is open
  const focusTrapRef = useFocusTrap(isOpen);

  return (
    <div>
      <button onClick={() => setIsOpen(true)}>
        Open Modal
      </button>
      
      {isOpen && (
        <div ref={focusTrapRef}>
          <input placeholder="First input" />
          <input placeholder="Second input" />
          <button onClick={() => setIsOpen(false)}>
            Close
          </button>
        </div>
      )}
    </div>
  );
}
```

### Memory Management

```tsx
import { useFocusTrap } from '@mantine/hooks';
import { useState, useEffect } from 'react';

function MemoryManagedFocusTrap() {
  const [isOpen, setIsOpen] = useState(false);
  const focusTrapRef = useFocusTrap(isOpen);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      // Focus trap automatically cleans up
    };
  }, []);

  return (
    <div>
      <button onClick={() => setIsOpen(true)}>
        Open Modal
      </button>
      
      {isOpen && (
        <div ref={focusTrapRef}>
          <input placeholder="Input" />
          <button onClick={() => setIsOpen(false)}>
            Close
          </button>
        </div>
      )}
    </div>
  );
}
```

## Common Patterns

### Focus Trap with Animation

```tsx
import { useFocusTrap } from '@mantine/hooks';
import { useState } from 'react';
import { Button, Paper, TextInput } from '@mantine/core';

function AnimatedFocusTrap() {
  const [isOpen, setIsOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const focusTrapRef = useFocusTrap(isOpen);

  const handleClose = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setIsOpen(false);
      setIsAnimating(false);
    }, 300);
  };

  return (
    <div>
      <Button onClick={() => setIsOpen(true)}>
        Open Animated Modal
      </Button>

      {isOpen && (
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
            ref={focusTrapRef}
            p="md"
            style={{
              transform: isAnimating ? 'scale(0.9)' : 'scale(1)',
              transition: 'transform 0.3s ease'
            }}
          >
            <TextInput placeholder="Input" />
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

### Focus Trap with State Persistence

```tsx
import { useFocusTrap } from '@mantine/hooks';
import { useState, useEffect } from 'react';
import { Button, Paper, TextInput } from '@mantine/core';

function PersistentFocusTrap() {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '' });
  const focusTrapRef = useFocusTrap(isOpen);

  // Persist form data
  useEffect(() => {
    const saved = localStorage.getItem('formData');
    if (saved) {
      setFormData(JSON.parse(saved));
    }
  }, []);

  const handleSave = () => {
    localStorage.setItem('formData', JSON.stringify(formData));
    setIsOpen(false);
  };

  return (
    <div>
      <Button onClick={() => setIsOpen(true)}>
        Open Form
      </Button>

      {isOpen && (
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
        >
          <Paper ref={focusTrapRef} p="md">
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
            <Button onClick={handleSave}>
              Save
            </Button>
          </Paper>
        </div>
      )}
    </div>
  );
}
```

## Integration with Other Hooks

### Combined with useFocusReturn

```tsx
import { useFocusTrap, useFocusReturn } from '@mantine/hooks';
import { useState } from 'react';
import { Button, Paper, TextInput } from '@mantine/core';

function FocusTrapWithReturn() {
  const [isOpen, setIsOpen] = useState(false);
  const focusTrapRef = useFocusTrap(isOpen);

  useFocusReturn({
    opened: isOpen,
    shouldReturnFocus: true
  });

  return (
    <div>
      <Button onClick={() => setIsOpen(true)}>
        Open Modal
      </Button>

      {isOpen && (
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
        >
          <Paper ref={focusTrapRef} p="md">
            <TextInput placeholder="Input" />
            <Button onClick={() => setIsOpen(false)} mt="md">
              Close
            </Button>
          </Paper>
        </div>
      )}
    </div>
  );
}
```

### Combined with useClickOutside

```tsx
import { useFocusTrap, useClickOutside } from '@mantine/hooks';
import { useState } from 'react';
import { Button, Paper, TextInput } from '@mantine/core';

function FocusTrapWithClickOutside() {
  const [isOpen, setIsOpen] = useState(false);
  const focusTrapRef = useFocusTrap(isOpen);
  const clickOutsideRef = useClickOutside(() => setIsOpen(false));

  const mergedRef = (el: HTMLDivElement | null) => {
    focusTrapRef(el);
    clickOutsideRef(el);
  };

  return (
    <div>
      <Button onClick={() => setIsOpen(true)}>
        Open Modal
      </Button>

      {isOpen && (
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
        >
          <Paper ref={mergedRef} p="md">
            <TextInput placeholder="Input" />
            <Button onClick={() => setIsOpen(false)} mt="md">
              Close
            </Button>
          </Paper>
        </div>
      )}
    </div>
  );
}
```

## Troubleshooting

### Common Issues

1. **Focus Not Trapped**
   - Ensure the element contains at least one focusable element
   - Check if the `active` parameter is set to `true`
   - Verify the ref is properly assigned

2. **Focus Trap Not Working**
   - Make sure the element is mounted when focus trap is active
   - Check for conflicting focus management code
   - Verify keyboard navigation is working

3. **Initial Focus Issues**
   - Use `data-autofocus` attribute for custom initial focus
   - Ensure the target element is focusable
   - Check for CSS that might prevent focusing

### Debug Information

```tsx
import { useFocusTrap } from '@mantine/hooks';
import { useState, useEffect } from 'react';

function DebugFocusTrap() {
  const [isOpen, setIsOpen] = useState(false);
  const focusTrapRef = useFocusTrap(isOpen);

  useEffect(() => {
    console.log('Focus trap state:', { isOpen });
    console.log('Active element:', document.activeElement);
  }, [isOpen]);

  return (
    <div>
      <button onClick={() => setIsOpen(true)}>
        Open Modal
      </button>
      
      {isOpen && (
        <div ref={focusTrapRef}>
          <input placeholder="Input" />
          <button onClick={() => setIsOpen(false)}>
            Close
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

- `use-focus-return` - For returning focus after trap is released
- `use-focus` - For focus state management
- `use-click-outside` - For click outside detection
- `use-merged-ref` - For combining multiple refs

## Best Practices

1. **Always Use with Focus Return**: Combine with `use-focus-return` for complete focus management
2. **Test with Screen Readers**: Ensure accessibility compliance
3. **Handle Edge Cases**: Consider what happens when no focusable elements exist
4. **Use data-autofocus**: For custom initial focus control
5. **Combine with Other Hooks**: Use `use-merged-ref` for multiple ref combinations

---

*The `use-focus-trap` hook is essential for creating accessible user interfaces. It ensures that focus is properly contained within modals, dropdowns, and other overlay components, providing a seamless experience for all users, including those using assistive technologies.*
