# use-window-event Hook

## Overview

The `use-window-event` hook provides a convenient way to add event listeners to the window object on component mount and automatically removes them when the component unmounts. It's a cleaner alternative to manually managing `addEventListener` and `removeEventListener` in `useEffect`, reducing boilerplate code and preventing memory leaks. The hook has the same API as `window.addEventListener` and supports all standard window events with proper TypeScript typing.

## Installation

```bash
npm install @mantine/hooks
```

## Import

```typescript
import { useWindowEvent } from '@mantine/hooks';
```

## Basic Usage

```tsx
import { useRef } from 'react';
import { useWindowEvent } from '@mantine/hooks';
import { TextInput, Text, Paper } from '@mantine/core';

function Demo() {
  const inputRef = useRef<HTMLInputElement>(null);

  useWindowEvent('keydown', (event) => {
    if (event.code === 'KeyK' && (event.ctrlKey || event.metaKey)) {
      event.preventDefault();
      inputRef.current?.focus();
    }
  });

  return (
    <Paper p="md">
      <Text size="sm" mb="md">
        Press ⌘ + K (Mac) or Ctrl + K (Windows/Linux) to focus the input
      </Text>
      <TextInput ref={inputRef} placeholder="Search..." />
    </Paper>
  );
}
```

## API Reference

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `type` | `K extends keyof WindowEventMap` | Event type (e.g., 'keydown', 'resize', 'scroll') |
| `listener` | `(this: Window, ev: WindowEventMap[K]) => any` | Event handler function |
| `options` | `boolean \| AddEventListenerOptions` | **Optional.** Event listener options |

### Type Definition

```typescript
function useWindowEvent<K extends keyof WindowEventMap>(
  type: K,
  listener: (this: Window, ev: WindowEventMap[K]) => any,
  options?: boolean | AddEventListenerOptions
): void;
```

## Key Features

### 1. **Automatic Cleanup**
- Adds event listener on component mount
- Removes event listener on component unmount
- Prevents memory leaks automatically

### 2. **TypeScript Support**
- Full type safety with `WindowEventMap`
- Proper event type inference
- IntelliSense support for all window events

### 3. **Same API as addEventListener**
- Familiar API for developers
- Supports all standard event listener options
- No learning curve for existing code

### 4. **Performance Optimized**
- Efficient event listener management
- No unnecessary re-renders
- Proper cleanup on unmount

## Advanced Usage

### Keyboard Shortcuts

```tsx
import { useWindowEvent } from '@mantine/hooks';
import { Text, Paper, Group, Button, TextInput } from '@mantine/core';
import { useRef, useState } from 'react';

function KeyboardShortcuts() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [shortcuts, setShortcuts] = useState<string[]>([]);
  
  const addShortcut = (description: string) => {
    setShortcuts(prev => [...prev, `${new Date().toLocaleTimeString()}: ${description}`]);
  };

  // Focus search with Ctrl/Cmd + K
  useWindowEvent('keydown', (event) => {
    if (event.code === 'KeyK' && (event.ctrlKey || event.metaKey)) {
      event.preventDefault();
      inputRef.current?.focus();
      addShortcut('Search focused (Ctrl/Cmd + K)');
    }
  });

  // Save with Ctrl/Cmd + S
  useWindowEvent('keydown', (event) => {
    if (event.code === 'KeyS' && (event.ctrlKey || event.metaKey)) {
      event.preventDefault();
      addShortcut('Save triggered (Ctrl/Cmd + S)');
    }
  });

  // Escape to clear
  useWindowEvent('keydown', (event) => {
    if (event.code === 'Escape') {
      setShortcuts([]);
      addShortcut('Shortcuts cleared (Escape)');
    }
  });

  return (
    <Paper p="md">
      <Text size="lg" weight="bold" mb="md">Keyboard Shortcuts Demo</Text>
      
      <TextInput
        ref={inputRef}
        placeholder="Search... (Ctrl/Cmd + K to focus)"
        mb="md"
      />
      
      <Group mb="md">
        <Button onClick={() => addShortcut('Manual save')}>
          Save (Ctrl/Cmd + S)
        </Button>
        <Button variant="outline" onClick={() => setShortcuts([])}>
          Clear (Escape)
        </Button>
      </Group>
      
      <Text size="sm" weight="bold" mb="xs">Recent Shortcuts:</Text>
      {shortcuts.length > 0 ? (
        shortcuts.slice(-5).map((shortcut, index) => (
          <Text key={index} size="xs" color="dimmed">
            {shortcut}
          </Text>
        ))
      ) : (
        <Text size="xs" color="dimmed">No shortcuts used yet</Text>
      )}
    </Paper>
  );
}
```

### Window Resize Handling

```tsx
import { useWindowEvent } from '@mantine/hooks';
import { Text, Paper, Group, Badge, Box } from '@mantine/core';
import { useState, useEffect } from 'react';

function WindowResizeHandler() {
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  const [resizeCount, setResizeCount] = useState(0);
  const [lastResize, setLastResize] = useState<Date | null>(null);

  // Track window resize events
  useWindowEvent('resize', () => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
    setResizeCount(prev => prev + 1);
    setLastResize(new Date());
  });

  // Initialize window size
  useEffect(() => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  }, []);

  const getBreakpoint = () => {
    if (windowSize.width < 768) return 'Mobile';
    if (windowSize.width < 1024) return 'Tablet';
    if (windowSize.width < 1440) return 'Desktop';
    return 'Large Desktop';
  };

  return (
    <Paper p="md">
      <Text size="lg" weight="bold" mb="md">Window Resize Handler</Text>
      
      <Group mb="md">
        <Badge color="blue" variant="light">
          {windowSize.width} × {windowSize.height}
        </Badge>
        <Badge color="green" variant="light">
          {getBreakpoint()}
        </Badge>
        <Badge color="orange" variant="light">
          {resizeCount} resizes
        </Badge>
      </Group>
      
      <Box style={{ backgroundColor: 'var(--mantine-color-gray-light)', padding: '12px', borderRadius: '8px' }}>
        <Text size="sm" weight="bold" mb="xs">Resize Information:</Text>
        <Text size="xs">Width: {windowSize.width}px</Text>
        <Text size="xs">Height: {windowSize.height}px</Text>
        <Text size="xs">Aspect Ratio: {(windowSize.width / windowSize.height).toFixed(2)}</Text>
        <Text size="xs">Resize Count: {resizeCount}</Text>
        <Text size="xs">Last Resize: {lastResize?.toLocaleTimeString() || 'Never'}</Text>
      </Box>
    </Paper>
  );
}
```

### Scroll Event Handling

```tsx
import { useWindowEvent } from '@mantine/hooks';
import { Text, Paper, Group, Badge, Box, Button } from '@mantine/core';
import { useState, useEffect } from 'react';

function ScrollEventHandler() {
  const [scrollPosition, setScrollPosition] = useState({ x: 0, y: 0 });
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down' | null>(null);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [scrollCount, setScrollCount] = useState(0);

  // Track scroll events
  useWindowEvent('scroll', () => {
    const newScrollY = window.scrollY;
    const newScrollX = window.scrollX;
    
    setScrollPosition({ x: newScrollX, y: newScrollY });
    setScrollCount(prev => prev + 1);
    
    if (newScrollY > lastScrollY) {
      setScrollDirection('down');
    } else if (newScrollY < lastScrollY) {
      setScrollDirection('up');
    }
    
    setLastScrollY(newScrollY);
  });

  // Initialize scroll position
  useEffect(() => {
    setScrollPosition({ x: window.scrollX, y: window.scrollY });
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToBottom = () => {
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
  };

  return (
    <Paper p="md">
      <Text size="lg" weight="bold" mb="md">Scroll Event Handler</Text>
      
      <Group mb="md">
        <Badge color="blue" variant="light">
          Y: {scrollPosition.y}px
        </Badge>
        <Badge color="green" variant="light">
          X: {scrollPosition.x}px
        </Badge>
        <Badge color={scrollDirection === 'down' ? 'red' : 'orange'} variant="light">
          {scrollDirection || 'None'}
        </Badge>
        <Badge color="purple" variant="light">
          {scrollCount} scrolls
        </Badge>
      </Group>
      
      <Group mb="md">
        <Button onClick={scrollToTop} size="sm">
          Scroll to Top
        </Button>
        <Button onClick={scrollToBottom} size="sm">
          Scroll to Bottom
        </Button>
      </Group>
      
      <Box style={{ backgroundColor: 'var(--mantine-color-gray-light)', padding: '12px', borderRadius: '8px' }}>
        <Text size="sm" weight="bold" mb="xs">Scroll Information:</Text>
        <Text size="xs">Scroll Y: {scrollPosition.y}px</Text>
        <Text size="xs">Scroll X: {scrollPosition.x}px</Text>
        <Text size="xs">Direction: {scrollDirection || 'None'}</Text>
        <Text size="xs">Scroll Count: {scrollCount}</Text>
        <Text size="xs">Document Height: {document.body.scrollHeight}px</Text>
      </Box>
    </Paper>
  );
}
```

## Use Cases

### 1. **Global Keyboard Shortcuts**

```tsx
import { useWindowEvent } from '@mantine/hooks';
import { Text, Paper, Group, Button, Modal, TextInput } from '@mantine/core';
import { useState, useRef } from 'react';

function GlobalKeyboardShortcuts() {
  const [searchModalOpened, setSearchModalOpened] = useState(false);
  const [helpModalOpened, setHelpModalOpened] = useState(false);
  const [notifications, setNotifications] = useState<string[]>([]);
  const searchInputRef = useRef<HTMLInputElement>(null);
  
  const addNotification = (message: string) => {
    setNotifications(prev => [...prev, `${new Date().toLocaleTimeString()}: ${message}`]);
  };

  // Search shortcut (Ctrl/Cmd + K)
  useWindowEvent('keydown', (event) => {
    if (event.code === 'KeyK' && (event.ctrlKey || event.metaKey)) {
      event.preventDefault();
      setSearchModalOpened(true);
      addNotification('Search opened (Ctrl/Cmd + K)');
    }
  });

  // Help shortcut (F1 or Ctrl/Cmd + ?)
  useWindowEvent('keydown', (event) => {
    if (event.key === 'F1' || (event.code === 'Slash' && (event.ctrlKey || event.metaKey))) {
      event.preventDefault();
      setHelpModalOpened(true);
      addNotification('Help opened (F1 or Ctrl/Cmd + ?)');
    }
  });

  // Escape to close modals
  useWindowEvent('keydown', (event) => {
    if (event.code === 'Escape') {
      setSearchModalOpened(false);
      setHelpModalOpened(false);
      addNotification('Modals closed (Escape)');
    }
  });

  // Save shortcut (Ctrl/Cmd + S)
  useWindowEvent('keydown', (event) => {
    if (event.code === 'KeyS' && (event.ctrlKey || event.metaKey)) {
      event.preventDefault();
      addNotification('Save triggered (Ctrl/Cmd + S)');
    }
  });

  return (
    <Paper p="md">
      <Text size="lg" weight="bold" mb="md">Global Keyboard Shortcuts</Text>
      
      <Group mb="md">
        <Button onClick={() => setSearchModalOpened(true)}>
          Search (Ctrl/Cmd + K)
        </Button>
        <Button onClick={() => setHelpModalOpened(true)}>
          Help (F1 or Ctrl/Cmd + ?)
        </Button>
        <Button variant="outline" onClick={() => setNotifications([])}>
          Clear Notifications
        </Button>
      </Group>
      
      <Text size="sm" weight="bold" mb="xs">Recent Actions:</Text>
      {notifications.length > 0 ? (
        notifications.slice(-5).map((notification, index) => (
          <Text key={index} size="xs" color="dimmed">
            {notification}
          </Text>
        ))
      ) : (
        <Text size="xs" color="dimmed">No actions yet</Text>
      )}
      
      <Modal
        opened={searchModalOpened}
        onClose={() => setSearchModalOpened(false)}
        title="Search"
      >
        <TextInput
          ref={searchInputRef}
          placeholder="Search..."
          autoFocus
        />
      </Modal>
      
      <Modal
        opened={helpModalOpened}
        onClose={() => setHelpModalOpened(false)}
        title="Help"
        size="lg"
      >
        <Text size="sm" weight="bold" mb="md">Keyboard Shortcuts:</Text>
        <Text size="xs" mb="xs">• Ctrl/Cmd + K: Open search</Text>
        <Text size="xs" mb="xs">• F1 or Ctrl/Cmd + ?: Open help</Text>
        <Text size="xs" mb="xs">• Escape: Close modals</Text>
        <Text size="xs" mb="xs">• Ctrl/Cmd + S: Save</Text>
      </Modal>
    </Paper>
  );
}
```

### 2. **Window Focus Management**

```tsx
import { useWindowEvent } from '@mantine/hooks';
import { Text, Paper, Group, Badge, Box } from '@mantine/core';
import { useState, useEffect } from 'react';

function WindowFocusManagement() {
  const [isFocused, setIsFocused] = useState(true);
  const [focusCount, setFocusCount] = useState(0);
  const [blurCount, setBlurCount] = useState(0);
  const [lastFocusTime, setLastFocusTime] = useState<Date | null>(null);
  const [lastBlurTime, setLastBlurTime] = useState<Date | null>(null);

  // Track window focus
  useWindowEvent('focus', () => {
    setIsFocused(true);
    setFocusCount(prev => prev + 1);
    setLastFocusTime(new Date());
  });

  // Track window blur
  useWindowEvent('blur', () => {
    setIsFocused(false);
    setBlurCount(prev => prev + 1);
    setLastBlurTime(new Date());
  });

  // Initialize focus state
  useEffect(() => {
    setIsFocused(document.hasFocus());
  }, []);

  return (
    <Paper p="md">
      <Text size="lg" weight="bold" mb="md">Window Focus Management</Text>
      
      <Group mb="md">
        <Badge color={isFocused ? 'green' : 'red'} variant="light">
          {isFocused ? 'Focused' : 'Blurred'}
        </Badge>
        <Badge color="blue" variant="light">
          Focus: {focusCount}
        </Badge>
        <Badge color="orange" variant="light">
          Blur: {blurCount}
        </Badge>
      </Group>
      
      <Box style={{ backgroundColor: 'var(--mantine-color-gray-light)', padding: '12px', borderRadius: '8px' }}>
        <Text size="sm" weight="bold" mb="xs">Focus Information:</Text>
        <Text size="xs">Status: {isFocused ? 'Window is focused' : 'Window is blurred'}</Text>
        <Text size="xs">Focus Count: {focusCount}</Text>
        <Text size="xs">Blur Count: {blurCount}</Text>
        <Text size="xs">Last Focus: {lastFocusTime?.toLocaleTimeString() || 'Never'}</Text>
        <Text size="xs">Last Blur: {lastBlurTime?.toLocaleTimeString() || 'Never'}</Text>
      </Box>
    </Paper>
  );
}
```

### 3. **Online/Offline Status Tracking**

```tsx
import { useWindowEvent } from '@mantine/hooks';
import { Text, Paper, Group, Badge, Box, Button } from '@mantine/core';
import { useState, useEffect } from 'react';

function OnlineOfflineTracking() {
  const [isOnline, setIsOnline] = useState(true);
  const [onlineCount, setOnlineCount] = useState(0);
  const [offlineCount, setOfflineCount] = useState(0);
  const [lastOnlineTime, setLastOnlineTime] = useState<Date | null>(null);
  const [lastOfflineTime, setLastOfflineTime] = useState<Date | null>(null);

  // Track online status
  useWindowEvent('online', () => {
    setIsOnline(true);
    setOnlineCount(prev => prev + 1);
    setLastOnlineTime(new Date());
  });

  // Track offline status
  useWindowEvent('offline', () => {
    setIsOnline(false);
    setOfflineCount(prev => prev + 1);
    setLastOfflineTime(new Date());
  });

  // Initialize online status
  useEffect(() => {
    setIsOnline(navigator.onLine);
  }, []);

  const simulateOffline = () => {
    // This is just for demo purposes
    setIsOnline(false);
    setOfflineCount(prev => prev + 1);
    setLastOfflineTime(new Date());
  };

  const simulateOnline = () => {
    // This is just for demo purposes
    setIsOnline(true);
    setOnlineCount(prev => prev + 1);
    setLastOnlineTime(new Date());
  };

  return (
    <Paper p="md">
      <Text size="lg" weight="bold" mb="md">Online/Offline Status Tracking</Text>
      
      <Group mb="md">
        <Badge color={isOnline ? 'green' : 'red'} variant="light">
          {isOnline ? 'Online' : 'Offline'}
        </Badge>
        <Badge color="blue" variant="light">
          Online: {onlineCount}
        </Badge>
        <Badge color="orange" variant="light">
          Offline: {offlineCount}
        </Badge>
      </Group>
      
      <Group mb="md">
        <Button onClick={simulateOffline} size="sm" color="red">
          Simulate Offline
        </Button>
        <Button onClick={simulateOnline} size="sm" color="green">
          Simulate Online
        </Button>
      </Group>
      
      <Box style={{ backgroundColor: 'var(--mantine-color-gray-light)', padding: '12px', borderRadius: '8px' }}>
        <Text size="sm" weight="bold" mb="xs">Connection Information:</Text>
        <Text size="xs">Status: {isOnline ? 'Connected to internet' : 'Disconnected from internet'}</Text>
        <Text size="xs">Online Count: {onlineCount}</Text>
        <Text size="xs">Offline Count: {offlineCount}</Text>
        <Text size="xs">Last Online: {lastOnlineTime?.toLocaleTimeString() || 'Never'}</Text>
        <Text size="xs">Last Offline: {lastOfflineTime?.toLocaleTimeString() || 'Never'}</Text>
      </Box>
    </Paper>
  );
}
```

### 4. **Before Unload Warning**

```tsx
import { useWindowEvent } from '@mantine/hooks';
import { Text, Paper, Group, Button, TextInput, Textarea } from '@mantine/core';
import { useState, useRef } from 'react';

function BeforeUnloadWarning() {
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [formData, setFormData] = useState({ title: '', content: '' });
  const [notifications, setNotifications] = useState<string[]>([]);
  
  const addNotification = (message: string) => {
    setNotifications(prev => [...prev, `${new Date().toLocaleTimeString()}: ${message}`]);
  };

  // Warn before leaving if there are unsaved changes
  useWindowEvent('beforeunload', (event) => {
    if (hasUnsavedChanges) {
      event.preventDefault();
      event.returnValue = 'You have unsaved changes. Are you sure you want to leave?';
      addNotification('Before unload warning triggered');
      return 'You have unsaved changes. Are you sure you want to leave?';
    }
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setHasUnsavedChanges(true);
  };

  const handleSave = () => {
    setHasUnsavedChanges(false);
    addNotification('Form saved successfully');
  };

  const handleReset = () => {
    setFormData({ title: '', content: '' });
    setHasUnsavedChanges(false);
    addNotification('Form reset');
  };

  return (
    <Paper p="md">
      <Text size="lg" weight="bold" mb="md">Before Unload Warning</Text>
      
      <Group mb="md">
        <Badge color={hasUnsavedChanges ? 'red' : 'green'} variant="light">
          {hasUnsavedChanges ? 'Unsaved Changes' : 'All Saved'}
        </Badge>
        <Button onClick={handleSave} disabled={!hasUnsavedChanges}>
          Save
        </Button>
        <Button onClick={handleReset} variant="outline">
          Reset
        </Button>
      </Group>
      
      <TextInput
        label="Title"
        value={formData.title}
        onChange={(e) => handleInputChange('title', e.target.value)}
        mb="md"
      />
      
      <Textarea
        label="Content"
        value={formData.content}
        onChange={(e) => handleInputChange('content', e.target.value)}
        minRows={4}
        mb="md"
      />
      
      <Text size="sm" color="dimmed" mb="md">
        Try to leave the page or close the tab to see the warning (if there are unsaved changes)
      </Text>
      
      <Box style={{ backgroundColor: 'var(--mantine-color-gray-light)', padding: '12px', borderRadius: '8px' }}>
        <Text size="sm" weight="bold" mb="xs">Recent Actions:</Text>
        {notifications.length > 0 ? (
          notifications.slice(-5).map((notification, index) => (
            <Text key={index} size="xs" color="dimmed">
              {notification}
            </Text>
          ))
        ) : (
          <Text size="xs" color="dimmed">No actions yet</Text>
        )}
      </Box>
    </Paper>
  );
}
```

### 5. **Window Visibility API**

```tsx
import { useWindowEvent } from '@mantine/hooks';
import { Text, Paper, Group, Badge, Box, Button } from '@mantine/core';
import { useState, useEffect } from 'react';

function WindowVisibilityTracking() {
  const [isVisible, setIsVisible] = useState(true);
  const [visibilityCount, setVisibilityCount] = useState(0);
  const [hiddenCount, setHiddenCount] = useState(0);
  const [lastVisibleTime, setLastVisibleTime] = useState<Date | null>(null);
  const [lastHiddenTime, setLastHiddenTime] = useState<Date | null>(null);

  // Track visibility change
  useWindowEvent('visibilitychange', () => {
    if (document.hidden) {
      setIsVisible(false);
      setHiddenCount(prev => prev + 1);
      setLastHiddenTime(new Date());
    } else {
      setIsVisible(true);
      setVisibilityCount(prev => prev + 1);
      setLastVisibleTime(new Date());
    }
  });

  // Initialize visibility state
  useEffect(() => {
    setIsVisible(!document.hidden);
  }, []);

  const simulateHidden = () => {
    // This is just for demo purposes
    setIsVisible(false);
    setHiddenCount(prev => prev + 1);
    setLastHiddenTime(new Date());
  };

  const simulateVisible = () => {
    // This is just for demo purposes
    setIsVisible(true);
    setVisibilityCount(prev => prev + 1);
    setLastVisibleTime(new Date());
  };

  return (
    <Paper p="md">
      <Text size="lg" weight="bold" mb="md">Window Visibility Tracking</Text>
      
      <Group mb="md">
        <Badge color={isVisible ? 'green' : 'red'} variant="light">
          {isVisible ? 'Visible' : 'Hidden'}
        </Badge>
        <Badge color="blue" variant="light">
          Visible: {visibilityCount}
        </Badge>
        <Badge color="orange" variant="light">
          Hidden: {hiddenCount}
        </Badge>
      </Group>
      
      <Group mb="md">
        <Button onClick={simulateHidden} size="sm" color="red">
          Simulate Hidden
        </Button>
        <Button onClick={simulateVisible} size="sm" color="green">
          Simulate Visible
        </Button>
      </Group>
      
      <Box style={{ backgroundColor: 'var(--mantine-color-gray-light)', padding: '12px', borderRadius: '8px' }}>
        <Text size="sm" weight="bold" mb="xs">Visibility Information:</Text>
        <Text size="xs">Status: {isVisible ? 'Page is visible' : 'Page is hidden'}</Text>
        <Text size="xs">Visibility Count: {visibilityCount}</Text>
        <Text size="xs">Hidden Count: {hiddenCount}</Text>
        <Text size="xs">Last Visible: {lastVisibleTime?.toLocaleTimeString() || 'Never'}</Text>
        <Text size="xs">Last Hidden: {lastHiddenTime?.toLocaleTimeString() || 'Never'}</Text>
      </Box>
    </Paper>
  );
}
```

### 6. **Multiple Event Listeners**

```tsx
import { useWindowEvent } from '@mantine/hooks';
import { Text, Paper, Group, Badge, Box, Button } from '@mantine/core';
import { useState, useEffect } from 'react';

function MultipleEventListeners() {
  const [events, setEvents] = useState<Array<{type: string, timestamp: Date, data?: any}>>([]);
  const [eventCounts, setEventCounts] = useState<Record<string, number>>({});

  const addEvent = (type: string, data?: any) => {
    const timestamp = new Date();
    setEvents(prev => [...prev, { type, timestamp, data }].slice(-10)); // Keep last 10 events
    setEventCounts(prev => ({ ...prev, [type]: (prev[type] || 0) + 1 }));
  };

  // Resize events
  useWindowEvent('resize', () => {
    addEvent('resize', { width: window.innerWidth, height: window.innerHeight });
  });

  // Scroll events
  useWindowEvent('scroll', () => {
    addEvent('scroll', { x: window.scrollX, y: window.scrollY });
  });

  // Focus events
  useWindowEvent('focus', () => {
    addEvent('focus');
  });

  // Blur events
  useWindowEvent('blur', () => {
    addEvent('blur');
  });

  // Online events
  useWindowEvent('online', () => {
    addEvent('online');
  });

  // Offline events
  useWindowEvent('offline', () => {
    addEvent('offline');
  });

  // Keyboard events
  useWindowEvent('keydown', (event) => {
    if (event.ctrlKey || event.metaKey) {
      addEvent('keydown', { key: event.key, code: event.code, modifiers: 'ctrl/meta' });
    }
  });

  const clearEvents = () => {
    setEvents([]);
    setEventCounts({});
  };

  return (
    <Paper p="md">
      <Text size="lg" weight="bold" mb="md">Multiple Event Listeners</Text>
      
      <Group mb="md">
        <Button onClick={clearEvents} size="sm">
          Clear Events
        </Button>
      </Group>
      
      <Group mb="md">
        {Object.entries(eventCounts).map(([type, count]) => (
          <Badge key={type} color="blue" variant="light">
            {type}: {count}
          </Badge>
        ))}
      </Group>
      
      <Box style={{ backgroundColor: 'var(--mantine-color-gray-light)', padding: '12px', borderRadius: '8px' }}>
        <Text size="sm" weight="bold" mb="xs">Recent Events:</Text>
        {events.length > 0 ? (
          events.map((event, index) => (
            <Text key={index} size="xs" color="dimmed">
              {event.timestamp.toLocaleTimeString()}: {event.type}
              {event.data && ` (${JSON.stringify(event.data)})`}
            </Text>
          ))
        ) : (
          <Text size="xs" color="dimmed">No events yet</Text>
        )}
      </Box>
    </Paper>
  );
}
```

## Performance Considerations

### Memoized Event Handlers

```tsx
import { useWindowEvent } from '@mantine/hooks';
import { memo, useCallback } from 'react';
import { Text, Paper, Button } from '@mantine/core';

const EventHandler = memo(function EventHandler({ 
  onEvent 
}: { 
  onEvent: (event: KeyboardEvent) => void; 
}) {
  useWindowEvent('keydown', onEvent);
  
  return (
    <Paper p="md">
      <Text>Event handler component</Text>
    </Paper>
  );
});

function OptimizedWindowEvent() {
  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    console.log('Key pressed:', event.key);
  }, []);
  
  return (
    <div>
      <Text size="lg" weight="bold" mb="md">
        Optimized Window Event
      </Text>
      <EventHandler onEvent={handleKeyDown} />
    </div>
  );
}
```

### Debounced Event Handlers

```tsx
import { useWindowEvent } from '@mantine/hooks';
import { Text, Paper, Box } from '@mantine/core';
import { useState, useEffect, useCallback } from 'react';

function DebouncedWindowEvent() {
  const [scrollPosition, setScrollPosition] = useState({ x: 0, y: 0 });
  const [debouncedPosition, setDebouncedPosition] = useState({ x: 0, y: 0 });
  
  const handleScroll = useCallback(() => {
    setScrollPosition({ x: window.scrollX, y: window.scrollY });
  }, []);
  
  // Debounce scroll position updates
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedPosition(scrollPosition);
    }, 100);
    
    return () => clearTimeout(timer);
  }, [scrollPosition]);
  
  useWindowEvent('scroll', handleScroll);
  
  return (
    <Box>
      <Text size="lg" weight="bold" mb="md">
        Debounced Window Event
      </Text>
      
      <Paper p="md" mb="md" style={{ backgroundColor: 'var(--mantine-color-blue-light)' }}>
        <Text weight="bold" mb="xs">Immediate Updates:</Text>
        <Text size="sm">X: {scrollPosition.x}px</Text>
        <Text size="sm">Y: {scrollPosition.y}px</Text>
      </Paper>
      
      <Paper p="md" style={{ backgroundColor: 'var(--mantine-color-green-light)' }}>
        <Text weight="bold" mb="xs">Debounced Updates:</Text>
        <Text size="sm">X: {debouncedPosition.x}px</Text>
        <Text size="sm">Y: {debouncedPosition.y}px</Text>
      </Paper>
    </Box>
  );
}
```

## Common Patterns

### Window Event with State Management

```tsx
import { useWindowEvent } from '@mantine/hooks';
import { Text, Paper, Button, Group } from '@mantine/core';
import { useState, useEffect } from 'react';

function WindowEventWithState() {
  const [windowEvents, setWindowEvents] = useState<Array<{type: string, timestamp: number}>>([]);
  
  useWindowEvent('resize', () => {
    setWindowEvents(prev => [...prev, { type: 'resize', timestamp: Date.now() }]);
  });
  
  useWindowEvent('scroll', () => {
    setWindowEvents(prev => [...prev, { type: 'scroll', timestamp: Date.now() }]);
  });
  
  const clearEvents = () => {
    setWindowEvents([]);
  };
  
  return (
    <Paper p="md">
      <Text size="lg" weight="bold" mb="md">
        Window Event with State
      </Text>
      
      <Group mb="md">
        <Button onClick={clearEvents} size="sm">
          Clear Events
        </Button>
      </Group>
      
      <Text size="sm" weight="bold" mb="xs">Recent Events:</Text>
      {windowEvents.slice(-5).map((event, index) => (
        <Text key={index} size="xs" color="dimmed">
          {event.type} at {new Date(event.timestamp).toLocaleTimeString()}
        </Text>
      ))}
    </Paper>
  );
}
```

### Window Event with Analytics

```tsx
import { useWindowEvent } from '@mantine/hooks';
import { Text, Paper, Box, Group, Badge } from '@mantine/core';
import { useEffect, useRef } from 'react';

function WindowEventWithAnalytics() {
  const analyticsRef = useRef({
    totalEvents: 0,
    eventTypes: {} as Record<string, number>,
    startTime: Date.now(),
  });
  
  useWindowEvent('resize', () => {
    analyticsRef.current.totalEvents++;
    analyticsRef.current.eventTypes.resize = (analyticsRef.current.eventTypes.resize || 0) + 1;
  });
  
  useWindowEvent('scroll', () => {
    analyticsRef.current.totalEvents++;
    analyticsRef.current.eventTypes.scroll = (analyticsRef.current.eventTypes.scroll || 0) + 1;
  });
  
  useWindowEvent('keydown', () => {
    analyticsRef.current.totalEvents++;
    analyticsRef.current.eventTypes.keydown = (analyticsRef.current.eventTypes.keydown || 0) + 1;
  });
  
  const getSessionDuration = () => {
    return Math.round((Date.now() - analyticsRef.current.startTime) / 1000);
  };
  
  return (
    <Box>
      <Text size="lg" weight="bold" mb="md">
        Window Event Analytics
      </Text>
      
      <Paper p="md" style={{ backgroundColor: 'var(--mantine-color-blue-light)' }}>
        <Text weight="bold" mb="xs">Session Analytics:</Text>
        <Group>
          <Badge color="blue">Total Events: {analyticsRef.current.totalEvents}</Badge>
          <Badge color="green">Duration: {getSessionDuration()}s</Badge>
        </Group>
        <Text size="sm" mt="xs">Event Types:</Text>
        {Object.entries(analyticsRef.current.eventTypes).map(([type, count]) => (
          <Text key={type} size="xs">
            {type}: {count}
          </Text>
        ))}
      </Paper>
    </Box>
  );
}
```

## Integration with Other Hooks

### Combined with useLocalStorage

```tsx
import { useWindowEvent, useLocalStorage } from '@mantine/hooks';
import { Text, Paper, Button, Group } from '@mantine/core';
import { useEffect } from 'react';

function WindowEventWithStorage() {
  const [windowEvents, setWindowEvents] = useLocalStorage({
    key: 'window-events',
    defaultValue: [] as Array<{type: string, timestamp: number}>,
  });
  
  useWindowEvent('resize', () => {
    const newEvent = { type: 'resize', timestamp: Date.now() };
    setWindowEvents(prev => [...prev, newEvent].slice(-50)); // Keep last 50 events
  });
  
  useWindowEvent('scroll', () => {
    const newEvent = { type: 'scroll', timestamp: Date.now() };
    setWindowEvents(prev => [...prev, newEvent].slice(-50));
  });
  
  const clearEvents = () => {
    setWindowEvents([]);
  };
  
  return (
    <Paper p="md">
      <Text size="lg" weight="bold" mb="md">
        Window Event with Storage
      </Text>
      
      <Group mb="md">
        <Button onClick={clearEvents} size="sm">
          Clear Events
        </Button>
      </Group>
      
      <Text size="sm" weight="bold" mb="xs">Stored Events:</Text>
      {windowEvents.slice(-5).map((event, index) => (
        <Text key={index} size="xs" color="dimmed">
          {event.type} at {new Date(event.timestamp).toLocaleTimeString()}
        </Text>
      ))}
    </Paper>
  );
}
```

### Combined with useDisclosure

```tsx
import { useWindowEvent, useDisclosure } from '@mantine/hooks';
import { Text, Paper, Button, Modal, Group } from '@mantine/core';

function WindowEventWithDisclosure() {
  const [opened, { open, close }] = useDisclosure(false);
  
  useWindowEvent('keydown', (event) => {
    if (event.code === 'KeyM' && (event.ctrlKey || event.metaKey)) {
      event.preventDefault();
      open();
    }
  });
  
  useWindowEvent('keydown', (event) => {
    if (event.code === 'Escape' && opened) {
      close();
    }
  });
  
  return (
    <Paper p="md">
      <Text size="lg" weight="bold" mb="md">
        Window Event with Disclosure
      </Text>
      
      <Group mb="md">
        <Button onClick={open}>
          Open Modal (Ctrl/Cmd + M)
        </Button>
      </Group>
      
      <Text size="sm" color="dimmed">
        Press Ctrl/Cmd + M to open modal, Escape to close
      </Text>
      
      <Modal
        opened={opened}
        onClose={close}
        title="Window Event Modal"
      >
        <Text>This modal was opened with a keyboard shortcut!</Text>
        <Text size="sm" color="dimmed" mt="md">
          Press Escape to close
        </Text>
      </Modal>
    </Paper>
  );
}
```

## Troubleshooting

### Common Issues

1. **Event Not Firing**
   - Check if the event type is correct
   - Ensure the component is mounted
   - Verify the event listener is not being removed prematurely

2. **Memory Leaks**
   - The hook automatically cleans up event listeners
   - Avoid creating new event handlers on every render
   - Use `useCallback` for stable event handlers

3. **Performance Issues**
   - Debounce expensive event handlers
   - Use `useMemo` for expensive calculations
   - Consider using `useRef` for values that don't need to trigger re-renders

### Debug Information

```tsx
import { useWindowEvent } from '@mantine/hooks';
import { Text, Paper, Button, Group, Code } from '@mantine/core';
import { useState, useEffect } from 'react';

function DebugWindowEvent() {
  const [debugInfo, setDebugInfo] = useState<any>({});
  const [eventCount, setEventCount] = useState(0);
  
  useWindowEvent('keydown', (event) => {
    setEventCount(prev => prev + 1);
    setDebugInfo({
      key: event.key,
      code: event.code,
      ctrlKey: event.ctrlKey,
      metaKey: event.metaKey,
      shiftKey: event.shiftKey,
      altKey: event.altKey,
      timestamp: new Date().toISOString(),
    });
  });
  
  return (
    <Paper p="md">
      <Text size="lg" weight="bold" mb="md">
        Debug Window Event
      </Text>
      
      <Group mb="md">
        <Button onClick={() => setEventCount(0)} size="sm">
          Reset Count
        </Button>
      </Group>
      
      <Text size="sm" mb="md">
        Event Count: {eventCount}
      </Text>
      
      <Paper p="md" style={{ backgroundColor: 'var(--mantine-color-gray-light)' }}>
        <Text size="sm" weight="bold" mb="xs">Last Event:</Text>
        <Code block>
          {JSON.stringify(debugInfo, null, 2)}
        </Code>
      </Paper>
    </Paper>
  );
}
```

## Browser Support

- **Modern Browsers**: Full support
- **Legacy Browsers**: Full support with polyfills
- **Mobile Browsers**: Full support
- **Server-Side**: Safe to use (no-op during SSR)

## Related Hooks

- `use-event-listener` - For element-specific event listeners
- `use-hotkeys` - For keyboard shortcut management
- `use-focus-return` - For focus management
- `use-focus-trap` - For focus trapping

## Best Practices

1. **Performance**: Use `useCallback` for event handlers
2. **Cleanup**: The hook handles cleanup automatically
3. **Type Safety**: Use proper TypeScript types for event handlers
4. **Testing**: Test event handlers with proper event simulation
5. **Accessibility**: Ensure keyboard shortcuts are accessible

---

*The `use-window-event` hook provides a clean and efficient way to manage window event listeners in React applications. It's perfect for global keyboard shortcuts, window state tracking, and any feature that needs to listen to window-level events with automatic cleanup and excellent performance.*


