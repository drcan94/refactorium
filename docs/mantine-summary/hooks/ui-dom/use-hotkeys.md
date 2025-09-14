# use-hotkeys Hook

## Overview

The `use-hotkeys` hook listens for key combinations on the document element, providing a clean, React-friendly way to implement keyboard shortcuts in your application. This hook is essential for creating accessible, power-user-friendly interfaces with keyboard navigation and shortcuts.

## Installation

```bash
npm install @mantine/hooks
```

## Import

```typescript
import { useHotkeys, getHotkeyHandler } from '@mantine/hooks';
import type { HotkeyItemOptions, HotkeyItem } from '@mantine/hooks';
```

## Basic Usage

```tsx
import { useHotkeys } from '@mantine/hooks';
import { spotlight } from '@mantine/spotlight';
import { useMantineColorScheme } from '@mantine/core';

function Demo() {
  const { toggleColorScheme } = useMantineColorScheme();

  useHotkeys([
    ['mod + K', () => spotlight.open()],
    ['mod + J', () => toggleColorScheme()],
    ['mod + shift + alt + X', () => secret()],
  ]);

  return (
    <>
      <div>Ctrl + K – Open search</div>
      <div>Ctrl + J – Toggle color scheme</div>
    </>
  );
}
```

## API Reference

### Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `hotkeys` | `HotkeyItem[]` | - | **Required.** Array of hotkey and handler tuples |
| `tagsToIgnore` | `string[]` | `['INPUT', 'TEXTAREA', 'SELECT']` | **Optional.** HTML tags to ignore hotkeys on |
| `triggerOnContentEditable` | `boolean` | `false` | **Optional.** Whether to trigger on contentEditable elements |

### HotkeyItem

| Index | Type | Description |
|-------|------|-------------|
| `0` | `string` | Hotkey string (e.g., 'ctrl+E', 'mod+S') |
| `1` | `(event: KeyboardEvent) => void` | Event handler function |
| `2` | `HotkeyItemOptions?` | **Optional.** Configuration options |

### HotkeyItemOptions

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `preventDefault` | `boolean` | `true` | Whether to prevent default browser behavior |
| `usePhysicalKeys` | `boolean` | `false` | Use physical key assignments for non-QWERTY layouts |

### Type Definitions

```typescript
interface HotkeyItemOptions {
  preventDefault?: boolean;
  usePhysicalKeys?: boolean;
}

type HotkeyItem = [string, (event: KeyboardEvent) => void, HotkeyItemOptions?];

function useHotkeys(
  hotkeys: HotkeyItem[],
  tagsToIgnore?: string[],
  triggerOnContentEditable?: boolean
): void;
```

## Key Features

### 1. **Cross-Platform Modifier Keys**
- `mod` automatically maps to `⌘` on macOS and `Ctrl` on Windows/Linux
- Supports all standard modifier combinations
- Handles platform-specific key mappings

### 2. **Flexible Hotkey Formats**
- Multiple modifier support: `ctrl+shift+alt+X`
- Whitespace tolerance: `alt + shift + L`
- Special keys: `ArrowLeft`, `Enter`, `Escape`
- Physical key support: `Digit1`, `KeyA`

### 3. **Smart Element Filtering**
- Automatically ignores input elements by default
- Configurable tag filtering
- ContentEditable support

## Advanced Usage

### Custom Element Filtering

```tsx
import { useHotkeys } from '@mantine/hooks';
import { Button, TextInput, Textarea } from '@mantine/core';

function CustomFiltering() {
  useHotkeys(
    [
      ['ctrl+K', () => console.log('Search triggered')],
      ['ctrl+S', () => console.log('Save triggered')],
    ],
    ['INPUT', 'TEXTAREA'] // Only ignore these elements
  );

  return (
    <div>
      <TextInput placeholder="Type here - hotkeys ignored" />
      <Textarea placeholder="Type here - hotkeys ignored" />
      <Button>Click here - hotkeys work</Button>
    </div>
  );
}
```

### No Element Filtering

```tsx
import { useHotkeys } from '@mantine/hooks';

function NoFiltering() {
  // Empty array means hotkeys work everywhere
  useHotkeys(
    [['ctrl+K', () => console.log('Always works')]],
    []
  );

  return <div>Hotkeys work even in input fields</div>;
}
```

### ContentEditable Support

```tsx
import { useHotkeys } from '@mantine/hooks';
import { Button } from '@mantine/core';

function ContentEditableSupport() {
  useHotkeys(
    [['ctrl+B', () => console.log('Bold triggered')]],
    ['INPUT', 'TEXTAREA'],
    true // Enable hotkeys on contentEditable elements
  );

  return (
    <div>
      <div contentEditable style={{ border: '1px solid #ccc', padding: '8px' }}>
        This is editable - hotkeys work here
      </div>
    </div>
  );
}
```

## Use Cases

### 1. **Application-Wide Shortcuts**

```tsx
import { useHotkeys } from '@mantine/hooks';
import { useDisclosure } from '@mantine/hooks';
import { Button, Modal, TextInput } from '@mantine/core';

function AppShortcuts() {
  const [searchOpened, { open: openSearch, close: closeSearch }] = useDisclosure(false);
  const [settingsOpened, { open: openSettings, close: closeSettings }] = useDisclosure(false);

  useHotkeys([
    ['mod + K', openSearch],
    ['mod + ,', openSettings],
    ['Escape', () => {
      closeSearch();
      closeSettings();
    }],
    ['mod + /', () => console.log('Help triggered')],
  ]);

  return (
    <div>
      <Button onClick={openSearch}>Search (Ctrl+K)</Button>
      <Button onClick={openSettings}>Settings (Ctrl+,)</Button>
      
      <Modal opened={searchOpened} onClose={closeSearch} title="Search">
        <TextInput placeholder="Search..." autoFocus />
      </Modal>
      
      <Modal opened={settingsOpened} onClose={closeSettings} title="Settings">
        <div>Settings content</div>
      </Modal>
    </div>
  );
}
```

### 2. **Text Editor with Hotkeys**

```tsx
import { useHotkeys } from '@mantine/hooks';
import { Textarea, Button, Group } from '@mantine/core';
import { useState } from 'react';

function TextEditor() {
  const [text, setText] = useState('');
  const [bold, setBold] = useState(false);
  const [italic, setItalic] = useState(false);

  useHotkeys([
    ['mod + B', () => setBold(prev => !prev)],
    ['mod + I', () => setItalic(prev => !prev)],
    ['mod + Z', () => console.log('Undo')],
    ['mod + Y', () => console.log('Redo')],
    ['mod + S', () => console.log('Save')],
  ]);

  return (
    <div>
      <Textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type here... Use Ctrl+B for bold, Ctrl+I for italic"
        style={{
          fontWeight: bold ? 'bold' : 'normal',
          fontStyle: italic ? 'italic' : 'normal'
        }}
      />
      
      <Group mt="md">
        <Button 
          onClick={() => setBold(prev => !prev)}
          variant={bold ? 'filled' : 'outline'}
        >
          Bold (Ctrl+B)
        </Button>
        <Button 
          onClick={() => setItalic(prev => !prev)}
          variant={italic ? 'filled' : 'outline'}
        >
          Italic (Ctrl+I)
        </Button>
      </Group>
    </div>
  );
}
```

### 3. **Navigation Shortcuts**

```tsx
import { useHotkeys } from '@mantine/hooks';
import { Button, Group, Text } from '@mantine/core';
import { useState } from 'react';

function NavigationShortcuts() {
  const [currentPage, setCurrentPage] = useState(0);
  const pages = ['Home', 'About', 'Contact', 'Settings'];

  useHotkeys([
    ['ArrowLeft', () => setCurrentPage(prev => 
      prev > 0 ? prev - 1 : pages.length - 1
    )],
    ['ArrowRight', () => setCurrentPage(prev => 
      prev < pages.length - 1 ? prev + 1 : 0
    )],
    ['Home', () => setCurrentPage(0)],
    ['End', () => setCurrentPage(pages.length - 1)],
  ]);

  return (
    <div>
      <Text size="lg" mb="md">
        Current Page: {pages[currentPage]}
      </Text>
      
      <Group>
        <Button onClick={() => setCurrentPage(prev => 
          prev > 0 ? prev - 1 : pages.length - 1
        )}>
          Previous (←)
        </Button>
        <Button onClick={() => setCurrentPage(prev => 
          prev < pages.length - 1 ? prev + 1 : 0
        )}>
          Next (→)
        </Button>
      </Group>
      
      <Text size="sm" color="dimmed" mt="md">
        Use arrow keys to navigate, Home/End for first/last page
      </Text>
    </div>
  );
}
```

### 4. **Modal and Overlay Management**

```tsx
import { useHotkeys } from '@mantine/hooks';
import { useDisclosure } from '@mantine/hooks';
import { Button, Modal, Drawer, Text } from '@mantine/core';

function ModalManagement() {
  const [modalOpened, { open: openModal, close: closeModal }] = useDisclosure(false);
  const [drawerOpened, { open: openDrawer, close: closeDrawer }] = useDisclosure(false);

  useHotkeys([
    ['mod + M', openModal],
    ['mod + D', openDrawer],
    ['Escape', () => {
      closeModal();
      closeDrawer();
    }],
  ]);

  return (
    <div>
      <Button onClick={openModal}>Open Modal (Ctrl+M)</Button>
      <Button onClick={openDrawer}>Open Drawer (Ctrl+D)</Button>
      
      <Modal opened={modalOpened} onClose={closeModal} title="Modal">
        <Text>Press Escape to close</Text>
      </Modal>
      
      <Drawer opened={drawerOpened} onClose={closeDrawer} title="Drawer">
        <Text>Press Escape to close</Text>
      </Drawer>
    </div>
  );
}
```

### 5. **Data Table with Hotkeys**

```tsx
import { useHotkeys } from '@mantine/hooks';
import { Table, Button, Group, Text } from '@mantine/core';
import { useState } from 'react';

function DataTableWithHotkeys() {
  const [selectedRow, setSelectedRow] = useState(0);
  const [data, setData] = useState([
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com' },
  ]);

  useHotkeys([
    ['ArrowUp', () => setSelectedRow(prev => 
      prev > 0 ? prev - 1 : data.length - 1
    )],
    ['ArrowDown', () => setSelectedRow(prev => 
      prev < data.length - 1 ? prev + 1 : 0
    )],
    ['Enter', () => console.log('Edit row:', data[selectedRow])],
    ['Delete', () => {
      setData(prev => prev.filter((_, index) => index !== selectedRow));
      setSelectedRow(prev => Math.min(prev, data.length - 2));
    }],
  ]);

  return (
    <div>
      <Table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr
              key={item.id}
              style={{
                backgroundColor: index === selectedRow ? '#e3f2fd' : 'transparent'
              }}
            >
              <td>{item.name}</td>
              <td>{item.email}</td>
              <td>
                <Button size="xs">Edit</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      
      <Text size="sm" color="dimmed" mt="md">
        Use arrow keys to navigate, Enter to edit, Delete to remove
      </Text>
    </div>
  );
}
```

## getHotkeyHandler Function

### Basic Usage

```tsx
import { getHotkeyHandler } from '@mantine/hooks';
import { TextInput, Button } from '@mantine/core';
import { useState } from 'react';

function InputWithHotkeys() {
  const [value, setValue] = useState('');
  
  const handleSubmit = () => console.log('Submit:', value);
  const handleSave = () => console.log('Save:', value);

  return (
    <TextInput
      placeholder="Type here..."
      value={value}
      onChange={(e) => setValue(e.target.value)}
      onKeyDown={getHotkeyHandler([
        ['mod+Enter', handleSubmit],
        ['mod+S', handleSave],
      ])}
    />
  );
}
```

### Advanced getHotkeyHandler Usage

```tsx
import { getHotkeyHandler } from '@mantine/hooks';
import { Textarea, Button } from '@mantine/core';
import { useState } from 'react';

function AdvancedInputHotkeys() {
  const [text, setText] = useState('');
  const [bold, setBold] = useState(false);

  const hotkeys = [
    ['mod+Enter', () => console.log('Submit')],
    ['mod+S', () => console.log('Save')],
    ['mod+B', () => setBold(prev => !prev)],
    ['Escape', () => setText('')],
  ];

  return (
    <div>
      <Textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={getHotkeyHandler(hotkeys)}
        placeholder="Type here... Use Ctrl+Enter to submit, Ctrl+S to save"
        style={{
          fontWeight: bold ? 'bold' : 'normal'
        }}
      />
      
      <Button onClick={() => setBold(prev => !prev)} mt="md">
        Toggle Bold (Ctrl+B)
      </Button>
    </div>
  );
}
```

## Hotkey Formats

### Supported Formats

```tsx
import { useHotkeys } from '@mantine/hooks';

function HotkeyFormats() {
  useHotkeys([
    // Modifier combinations
    ['mod+S', () => console.log('Save')],
    ['ctrl+shift+alt+X', () => console.log('Complex combo')],
    
    // Special keys
    ['ArrowLeft', () => console.log('Left arrow')],
    ['ArrowRight', () => console.log('Right arrow')],
    ['Enter', () => console.log('Enter')],
    ['Escape', () => console.log('Escape')],
    ['Space', () => console.log('Space')],
    
    // Whitespace tolerance
    ['alt + shift + L', () => console.log('Alt Shift L')],
    
    // Plus key
    ['shift + [plus]', () => console.log('Plus key')],
    
    // Physical keys (for non-QWERTY layouts)
    ['D', () => console.log('D key'), { usePhysicalKeys: true }],
    ['Digit1', () => console.log('1 key')],
  ]);

  return <div>Check console for hotkey triggers</div>;
}
```

### Physical Key Support

```tsx
import { useHotkeys } from '@mantine/hooks';

function PhysicalKeys() {
  useHotkeys([
    // This will trigger when pressing "E" on a Dvorak keyboard
    // because it uses physical key assignment
    [
      'D',
      () => console.log('Triggers when pressing "E" on Dvorak keyboards!'),
      { usePhysicalKeys: true }
    ],
    // This will trigger when pressing "D" on any keyboard layout
    ['D', () => console.log('Triggers when pressing "D" key')],
  ]);

  return <div>Test with different keyboard layouts</div>;
}
```

## Performance Considerations

### Memoized Hotkeys

```tsx
import { useHotkeys } from '@mantine/hooks';
import { useCallback, useMemo } from 'react';

function OptimizedHotkeys() {
  const handleSave = useCallback(() => {
    console.log('Save triggered');
  }, []);

  const handleSearch = useCallback(() => {
    console.log('Search triggered');
  }, []);

  const hotkeys = useMemo(() => [
    ['mod+S', handleSave],
    ['mod+K', handleSearch],
  ], [handleSave, handleSearch]);

  useHotkeys(hotkeys);

  return <div>Optimized hotkeys</div>;
}
```

### Conditional Hotkeys

```tsx
import { useHotkeys } from '@mantine/hooks';
import { useState } from 'react';

function ConditionalHotkeys() {
  const [editing, setEditing] = useState(false);

  useHotkeys([
    ['mod+S', () => console.log('Save')],
    // Only enable edit hotkeys when not editing
    ...(editing ? [] : [
      ['mod+E', () => setEditing(true)],
      ['mod+D', () => console.log('Delete')],
    ]),
  ]);

  return (
    <div>
      <button onClick={() => setEditing(!editing)}>
        {editing ? 'Stop Editing' : 'Start Editing'}
      </button>
      {editing && <input placeholder="Edit mode - some hotkeys disabled" />}
    </div>
  );
}
```

## Common Patterns

### Hotkey Help System

```tsx
import { useHotkeys } from '@mantine/hooks';
import { useDisclosure } from '@mantine/hooks';
import { Button, Modal, Text, Stack } from '@mantine/core';

function HotkeyHelp() {
  const [helpOpened, { open: openHelp, close: closeHelp }] = useDisclosure(false);

  useHotkeys([
    ['mod+?', openHelp],
    ['Escape', closeHelp],
  ]);

  return (
    <div>
      <Button onClick={openHelp}>Help (Ctrl+?)</Button>
      
      <Modal opened={helpOpened} onClose={closeHelp} title="Keyboard Shortcuts">
        <Stack>
          <Text><strong>Ctrl+K:</strong> Open search</Text>
          <Text><strong>Ctrl+S:</strong> Save</Text>
          <Text><strong>Ctrl+E:</strong> Edit</Text>
          <Text><strong>Ctrl+?:</strong> Show this help</Text>
          <Text><strong>Escape:</strong> Close dialogs</Text>
        </Stack>
      </Modal>
    </div>
  );
}
```

### Hotkey Registration System

```tsx
import { useHotkeys } from '@mantine/hooks';
import { useState, useMemo } from 'react';

function HotkeyRegistration() {
  const [hotkeys, setHotkeys] = useState([
    { key: 'mod+S', action: 'Save', handler: () => console.log('Save') },
    { key: 'mod+K', action: 'Search', handler: () => console.log('Search') },
  ]);

  const hotkeyItems = useMemo(() => 
    hotkeys.map(h => [h.key, h.handler] as const),
    [hotkeys]
  );

  useHotkeys(hotkeyItems);

  const addHotkey = (key: string, action: string, handler: () => void) => {
    setHotkeys(prev => [...prev, { key, action, handler }]);
  };

  return (
    <div>
      <button onClick={() => addHotkey('mod+N', 'New', () => console.log('New'))}>
        Add New Hotkey
      </button>
      
      <div>
        {hotkeys.map((h, index) => (
          <div key={index}>
            <strong>{h.key}:</strong> {h.action}
          </div>
        ))}
      </div>
    </div>
  );
}
```

## Integration with Other Hooks

### Combined with useDisclosure

```tsx
import { useHotkeys, useDisclosure } from '@mantine/hooks';
import { Button, Modal, Text } from '@mantine/core';

function HotkeysWithDisclosure() {
  const [opened, { open, close }] = useDisclosure(false);

  useHotkeys([
    ['mod+M', open],
    ['Escape', close],
  ]);

  return (
    <div>
      <Button onClick={open}>Open Modal (Ctrl+M)</Button>
      
      <Modal opened={opened} onClose={close} title="Modal">
        <Text>Press Escape to close</Text>
      </Modal>
    </div>
  );
}
```

### Combined with useLocalStorage

```tsx
import { useHotkeys, useLocalStorage } from '@mantine/hooks';
import { Button, Text } from '@mantine/core';

function HotkeysWithStorage() {
  const [count, setCount] = useLocalStorage({ key: 'hotkey-count', defaultValue: 0 });

  useHotkeys([
    ['mod+Plus', () => setCount(prev => prev + 1)],
    ['mod+Minus', () => setCount(prev => Math.max(0, prev - 1))],
    ['mod+R', () => setCount(0)],
  ]);

  return (
    <div>
      <Text>Count: {count}</Text>
      <Text size="sm" color="dimmed">
        Ctrl+Plus to increment, Ctrl+Minus to decrement, Ctrl+R to reset
      </Text>
    </div>
  );
}
```

## Troubleshooting

### Common Issues

1. **Hotkeys Not Working**
   - Check if the element is in the ignore list
   - Ensure the hotkey format is correct
   - Verify the handler function is properly defined

2. **Modifier Keys Not Working**
   - Use `mod` instead of `ctrl` for cross-platform compatibility
   - Check browser-specific key mappings
   - Test with different keyboard layouts

3. **Conflicting Hotkeys**
   - Check for duplicate hotkey definitions
   - Ensure proper event handling order
   - Use `preventDefault: false` if needed

### Debug Information

```tsx
import { useHotkeys } from '@mantine/hooks';
import { useState } from 'react';

function DebugHotkeys() {
  const [lastHotkey, setLastHotkey] = useState<string>('');

  useHotkeys([
    ['mod+K', (event) => {
      console.log('Hotkey triggered:', event);
      setLastHotkey('Ctrl+K');
    }],
    ['mod+S', (event) => {
      console.log('Hotkey triggered:', event);
      setLastHotkey('Ctrl+S');
    }],
  ]);

  return (
    <div>
      <Text>Last triggered hotkey: {lastHotkey}</Text>
      <Text size="sm" color="dimmed">
        Check console for detailed event information
      </Text>
    </div>
  );
}
```

## Browser Support

- **Modern Browsers**: Full support
- **Legacy Browsers**: Good support with fallbacks
- **Mobile Browsers**: Limited support (keyboard required)
- **Server-Side**: Safe to use (no-op during SSR)

## Related Hooks

- `use-keyboard` - For individual key event handling
- `use-event-listener` - For custom event listeners
- `use-disclosure` - For modal/overlay state management
- `use-local-storage` - For persisting hotkey preferences

## Best Practices

1. **Use Descriptive Hotkeys**: Choose intuitive key combinations
2. **Provide Visual Feedback**: Show hotkeys in UI when possible
3. **Test Cross-Platform**: Verify hotkeys work on different platforms
4. **Handle Conflicts**: Check for conflicting hotkeys
5. **Accessibility**: Ensure hotkeys don't interfere with screen readers

---

*The `use-hotkeys` hook provides a powerful, flexible way to implement keyboard shortcuts in React applications. It's essential for creating accessible, power-user-friendly interfaces with comprehensive keyboard navigation support.*
