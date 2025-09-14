# use-click-outside Hook

## Overview

The `use-click-outside` hook detects click and touch events outside of a given element or elements group. This is particularly useful for implementing dropdowns, modals, tooltips, and other UI components that need to close when the user clicks outside of them.

## Installation

```bash
npm install @mantine/hooks
```

## Import

```typescript
import { useClickOutside } from '@mantine/hooks';
```

## Basic Usage

```tsx
import { useState } from 'react';
import { Paper, Button } from '@mantine/core';
import { useClickOutside } from '@mantine/hooks';

function Demo() {
  const [opened, setOpened] = useState(false);
  const ref = useClickOutside(() => setOpened(false));

  return (
    <>
      <Button onClick={() => setOpened(true)}>Open dropdown</Button>

      {opened && (
        <Paper ref={ref} shadow="sm">
          <span>Click outside to close</span>
        </Paper>
      )}
    </>
  );
}
```

## API Reference

### Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `handler` | `() => void` | - | **Required.** Function that is called when an outside click is detected |
| `events` | `string[] \| null` | `['mousedown', 'touchstart']` | **Optional.** Array of events that trigger the outside click detection |
| `nodes` | `HTMLElement[]` | `undefined` | **Optional.** Array of nodes that should not trigger the outside click event |

### Return Value

Returns a `React.RefObject<T>` that must be passed to the element based on which outside clicks should be captured.

### Type Definition

```typescript
function useClickOutside<T extends HTMLElement = any>(
  handler: () => void,
  events?: string[] | null,
  nodes?: HTMLElement[]
): React.RefObject<T>;
```

## Advanced Usage

### Custom Events

By default, `use-click-outside` listens to `mousedown` and `touchstart` events. You can customize these events by passing an array of events as the second argument:

```tsx
import { useState } from 'react';
import { Paper, Button } from '@mantine/core';
import { useClickOutside } from '@mantine/hooks';

function Demo() {
  const [opened, setOpened] = useState(false);
  const ref = useClickOutside(() => setOpened(false), ['mouseup', 'touchend']);

  return (
    <>
      <Button onClick={() => setOpened(true)}>Open dropdown</Button>

      {opened && (
        <Paper ref={ref} shadow="sm">
          <span>Click outside to close</span>
        </Paper>
      )}
    </>
  );
}
```

### Multiple Nodes

When working with multiple elements (like a dropdown with a trigger button), you can specify multiple nodes that should not trigger the outside click:

```tsx
import { useState } from 'react';
import { Portal } from '@mantine/core';
import { useClickOutside } from '@mantine/hooks';

function Demo() {
  const [dropdown, setDropdown] = useState<HTMLDivElement | null>(null);
  const [control, setControl] = useState<HTMLDivElement | null>(null);

  useClickOutside(() => console.log('outside'), null, [
    control,
    dropdown,
  ]);

  return (
    <div>
      <div ref={setControl}>Control</div>
      <Portal>
        <div ref={setDropdown}>Dropdown</div>
      </Portal>
    </div>
  );
}
```

### TypeScript Support

You can specify the ref type for better TypeScript support:

```tsx
import { useClickOutside } from '@mantine/hooks';

const ref = useClickOutside<HTMLDivElement>(() =>
  console.log('Click outside')
);
```

## Use Cases

### 1. Dropdown Menus

```tsx
function DropdownMenu() {
  const [opened, setOpened] = useState(false);
  const ref = useClickOutside(() => setOpened(false));

  return (
    <div>
      <button onClick={() => setOpened(!opened)}>
        Toggle Menu
      </button>
      {opened && (
        <div ref={ref} className="dropdown-menu">
          <div>Menu Item 1</div>
          <div>Menu Item 2</div>
          <div>Menu Item 3</div>
        </div>
      )}
    </div>
  );
}
```

### 2. Modal Dialogs

```tsx
function Modal({ isOpen, onClose, children }) {
  const ref = useClickOutside(onClose);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div ref={ref} className="modal-content">
        {children}
      </div>
    </div>
  );
}
```

### 3. Tooltips

```tsx
function Tooltip({ children, content }) {
  const [visible, setVisible] = useState(false);
  const ref = useClickOutside(() => setVisible(false));

  return (
    <div
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      {children}
      {visible && (
        <div ref={ref} className="tooltip">
          {content}
        </div>
      )}
    </div>
  );
}
```

### 4. Search Suggestions

```tsx
function SearchInput() {
  const [query, setQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const ref = useClickOutside(() => setShowSuggestions(false));

  return (
    <div>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => setShowSuggestions(true)}
      />
      {showSuggestions && (
        <div ref={ref} className="suggestions">
          {/* Suggestions content */}
        </div>
      )}
    </div>
  );
}
```

## Best Practices

### 1. Event Selection

Choose appropriate events based on your use case:
- `mousedown` + `touchstart`: Immediate response (default)
- `mouseup` + `touchend`: After click/touch is complete
- `click`: Standard click events only

### 2. Performance Considerations

```tsx
// Good: Memoize the handler to prevent unnecessary re-renders
const handleClickOutside = useCallback(() => {
  setOpened(false);
}, []);

const ref = useClickOutside(handleClickOutside);
```

### 3. Multiple Elements

When dealing with complex UI structures, use the `nodes` parameter to exclude multiple elements:

```tsx
const ref = useClickOutside(
  () => setOpened(false),
  ['mousedown', 'touchstart'],
  [triggerRef.current, dropdownRef.current]
);
```

### 4. Portal Components

For elements rendered in portals, use the `nodes` parameter instead of relying on the ref:

```tsx
const [portalElement, setPortalElement] = useState<HTMLDivElement | null>(null);

useClickOutside(
  () => setOpened(false),
  null,
  [triggerElement, portalElement]
);
```

## Common Patterns

### Conditional Outside Click

```tsx
const ref = useClickOutside(() => {
  if (isOpen && !isLoading) {
    onClose();
  }
});
```

### Debounced Outside Click

```tsx
import { useDebouncedValue } from '@mantine/hooks';

const [debouncedOpened] = useDebouncedValue(opened, 100);
const ref = useClickOutside(() => {
  if (debouncedOpened) {
    setOpened(false);
  }
});
```

### Custom Event Handling

```tsx
const ref = useClickOutside(
  (event) => {
    // Custom logic based on event
    if (event.target.closest('.special-element')) {
      return; // Don't close
    }
    onClose();
  },
  ['mousedown', 'touchstart']
);
```

## Troubleshooting

### Hook Not Working

1. **Check ref assignment**: Ensure the ref is properly assigned to the target element
2. **Verify event types**: Make sure the events you're listening to are appropriate
3. **Check node exclusions**: Ensure excluded nodes are properly referenced

### Performance Issues

1. **Memoize handlers**: Use `useCallback` for handler functions
2. **Limit event types**: Only listen to necessary events
3. **Clean up properly**: The hook handles cleanup automatically

### TypeScript Errors

1. **Specify ref type**: Use generic type parameter for better type safety
2. **Check node types**: Ensure excluded nodes are properly typed as `HTMLElement`

## Related Hooks

- `use-hover` - For hover state management
- `use-focus` - For focus state management
- `use-focus-trap` - For focus trapping in modals
- `use-keyboard` - For keyboard event handling

## Browser Support

- **Modern Browsers**: Full support
- **Touch Devices**: Full support with touch events
- **Legacy Browsers**: Requires polyfills for modern event handling

---

*The `use-click-outside` hook is essential for creating intuitive user interfaces where elements need to close when users interact outside of them. It provides a clean, performant solution for this common UI pattern.*
