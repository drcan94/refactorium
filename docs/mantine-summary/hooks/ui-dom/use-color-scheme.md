# use-color-scheme Hook

## Overview

The `use-color-scheme` hook returns the OS color scheme preference (dark or light) and automatically subscribes to changes. This hook is essential for implementing theme-aware applications that respond to the user's system preferences.

## Installation

```bash
npm install @mantine/hooks
```

## Import

```typescript
import { useColorScheme } from '@mantine/hooks';
import type { UseColorSchemeValue, UseMediaQueryOptions } from '@mantine/hooks';
```

## Basic Usage

```tsx
import { Badge } from '@mantine/core';
import { useColorScheme } from '@mantine/hooks';

function Demo() {
  const colorScheme = useColorScheme();

  return (
    <Badge color={colorScheme === 'dark' ? 'blue' : 'teal'} variant="filled">
      Your system color scheme is {colorScheme}
    </Badge>
  );
}
```

## API Reference

### Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `initialValue` | `UseColorSchemeValue` | `'light'` | **Optional.** Initial color scheme value to use before detection |
| `options` | `UseMediaQueryOptions` | `{}` | **Optional.** Configuration options for the hook |

### UseMediaQueryOptions

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `getInitialValueInEffect` | `boolean` | `false` | Whether to calculate initial value immediately or in useEffect |

### Return Value

Returns the current color scheme value: `'dark' | 'light'`

### Type Definitions

```typescript
interface UseMediaQueryOptions {
  getInitialValueInEffect: boolean;
}

type UseColorSchemeValue = 'dark' | 'light';

function useColorScheme(
  initialValue?: UseColorSchemeValue,
  options?: UseMediaQueryOptions,
): UseColorSchemeValue;
```

## Advanced Usage

### Custom Initial Value

```tsx
import { useColorScheme } from '@mantine/hooks';

function ThemeAwareComponent() {
  // Returns 'dark' on server side, computed value on client side
  const colorScheme = useColorScheme('dark');

  return (
    <div className={colorScheme === 'dark' ? 'dark-theme' : 'light-theme'}>
      Current theme: {colorScheme}
    </div>
  );
}
```

### Immediate Initial Value Calculation

For applications without server-side rendering, you can enable immediate calculation:

```tsx
import { useColorScheme } from '@mantine/hooks';

function ClientOnlyComponent() {
  const colorScheme = useColorScheme('light', { 
    getInitialValueInEffect: true 
  });

  return (
    <div>
      Theme detected immediately: {colorScheme}
    </div>
  );
}
```

## Use Cases

### 1. Theme-Aware Styling

```tsx
import { useColorScheme } from '@mantine/hooks';
import { Paper, Text } from '@mantine/core';

function ThemedCard() {
  const colorScheme = useColorScheme();

  return (
    <Paper
      shadow="sm"
      p="md"
      style={{
        backgroundColor: colorScheme === 'dark' ? '#1a1b23' : '#ffffff',
        color: colorScheme === 'dark' ? '#ffffff' : '#000000',
      }}
    >
      <Text>This card adapts to your system theme</Text>
    </Paper>
  );
}
```

### 2. Dynamic Icon Selection

```tsx
import { useColorScheme } from '@mantine/hooks';
import { IconSun, IconMoon } from '@tabler/icons-react';

function ThemeIcon() {
  const colorScheme = useColorScheme();

  return colorScheme === 'dark' ? <IconMoon /> : <IconSun />;
}
```

### 3. Conditional Component Rendering

```tsx
import { useColorScheme } from '@mantine/hooks';
import { Button, Group } from '@mantine/core';

function ThemeActions() {
  const colorScheme = useColorScheme();

  return (
    <Group>
      {colorScheme === 'dark' ? (
        <Button variant="outline">Switch to Light Mode</Button>
      ) : (
        <Button variant="filled">Switch to Dark Mode</Button>
      )}
    </Group>
  );
}
```

### 4. CSS Custom Properties

```tsx
import { useColorScheme } from '@mantine/hooks';
import { useEffect } from 'react';

function ThemeProvider({ children }) {
  const colorScheme = useColorScheme();

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', colorScheme);
  }, [colorScheme]);

  return <>{children}</>;
}
```

### 5. Analytics and Tracking

```tsx
import { useColorScheme } from '@mantine/hooks';
import { useEffect } from 'react';

function ThemeTracker() {
  const colorScheme = useColorScheme();

  useEffect(() => {
    // Track theme preference for analytics
    analytics.track('theme_preference', { 
      theme: colorScheme,
      timestamp: new Date().toISOString()
    });
  }, [colorScheme]);

  return null;
}
```

## Server-Side Rendering (SSR)

### Default Behavior

By default, the hook supports SSR by returning the initial value during server-side rendering:

```tsx
// Server-side: returns 'light' (or specified initial value)
// Client-side: returns computed value after mount
const colorScheme = useColorScheme('light');
```

### Hydration Considerations

```tsx
import { useColorScheme } from '@mantine/hooks';
import { useEffect, useState } from 'react';

function SSRCompatibleComponent() {
  const colorScheme = useColorScheme('light');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Prevent hydration mismatch
  if (!mounted) {
    return <div>Loading...</div>;
  }

  return (
    <div className={`theme-${colorScheme}`}>
      Current theme: {colorScheme}
    </div>
  );
}
```

## Performance Considerations

### Memoization

```tsx
import { useColorScheme } from '@mantine/hooks';
import { useMemo } from 'react';

function OptimizedComponent() {
  const colorScheme = useColorScheme();

  const themeConfig = useMemo(() => ({
    primaryColor: colorScheme === 'dark' ? '#4dabf7' : '#339af0',
    backgroundColor: colorScheme === 'dark' ? '#1a1b23' : '#ffffff',
  }), [colorScheme]);

  return <div style={themeConfig}>Content</div>;
}
```

### Conditional Effects

```tsx
import { useColorScheme } from '@mantine/hooks';
import { useEffect } from 'react';

function ConditionalEffect() {
  const colorScheme = useColorScheme();

  useEffect(() => {
    // Only run effect when theme changes
    if (colorScheme === 'dark') {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [colorScheme]);

  return null;
}
```

## Integration with Mantine Theme

### MantineProvider Integration

```tsx
import { useColorScheme } from '@mantine/hooks';
import { MantineProvider, ColorScheme } from '@mantine/core';

function App() {
  const systemColorScheme = useColorScheme();
  const colorScheme: ColorScheme = systemColorScheme;

  return (
    <MantineProvider theme={{ colorScheme }}>
      {/* Your app content */}
    </MantineProvider>
  );
}
```

### Custom Theme Switching

```tsx
import { useColorScheme } from '@mantine/hooks';
import { useState, useEffect } from 'react';

function ThemeManager() {
  const systemColorScheme = useColorScheme();
  const [userPreference, setUserPreference] = useState<string | null>(null);
  const [currentTheme, setCurrentTheme] = useState(systemColorScheme);

  useEffect(() => {
    // Use user preference if available, otherwise use system preference
    setCurrentTheme(userPreference || systemColorScheme);
  }, [systemColorScheme, userPreference]);

  const toggleTheme = () => {
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    setUserPreference(newTheme);
    setCurrentTheme(newTheme);
  };

  return (
    <div>
      <button onClick={toggleTheme}>
        Switch to {currentTheme === 'dark' ? 'light' : 'dark'} mode
      </button>
    </div>
  );
}
```

## Common Patterns

### Theme-Aware Components

```tsx
import { useColorScheme } from '@mantine/hooks';
import { createStyles } from '@mantine/core';

const useStyles = createStyles((theme, { colorScheme }) => ({
  container: {
    backgroundColor: colorScheme === 'dark' 
      ? theme.colors.dark[8] 
      : theme.colors.gray[0],
    color: colorScheme === 'dark' 
      ? theme.colors.dark[0] 
      : theme.colors.dark[8],
  },
}));

function ThemedContainer({ children }) {
  const colorScheme = useColorScheme();
  const { classes } = useStyles({ colorScheme });

  return <div className={classes.container}>{children}</div>;
}
```

### Responsive Theme Detection

```tsx
import { useColorScheme } from '@mantine/hooks';
import { useMediaQuery } from '@mantine/hooks';

function ResponsiveTheme() {
  const colorScheme = useColorScheme();
  const isMobile = useMediaQuery('(max-width: 768px)');

  const getThemeVariant = () => {
    if (isMobile) {
      return colorScheme === 'dark' ? 'mobile-dark' : 'mobile-light';
    }
    return colorScheme === 'dark' ? 'desktop-dark' : 'desktop-light';
  };

  return (
    <div className={`theme-${getThemeVariant()}`}>
      Responsive theme: {getThemeVariant()}
    </div>
  );
}
```

## Troubleshooting

### Common Issues

1. **Hydration Mismatch**
   - Use the `getInitialValueInEffect: true` option for client-only apps
   - Implement proper loading states for SSR

2. **Theme Not Updating**
   - Ensure the hook is used in a component that re-renders
   - Check if the component is properly mounted

3. **Server-Side Rendering Issues**
   - Always provide an initial value for SSR compatibility
   - Use the default behavior for SSR support

### Debug Information

```tsx
import { useColorScheme } from '@mantine/hooks';

function DebugTheme() {
  const colorScheme = useColorScheme();

  console.log('Current color scheme:', colorScheme);
  console.log('Media query support:', typeof window !== 'undefined' && window.matchMedia);

  return (
    <div>
      <p>Color scheme: {colorScheme}</p>
      <p>Media query available: {typeof window !== 'undefined' && window.matchMedia ? 'Yes' : 'No'}</p>
    </div>
  );
}
```

## Browser Support

- **Modern Browsers**: Full support with `prefers-color-scheme` media query
- **Legacy Browsers**: Falls back to initial value
- **Server-Side**: Returns initial value during SSR

## Related Hooks

- `use-media-query` - For custom media query detection
- `use-local-storage` - For persisting theme preferences
- `use-previous` - For tracking theme changes

## Limitations

1. **Server-Side Rendering**: Always returns initial value during SSR
2. **Media Query Support**: Requires `window.matchMedia` API
3. **Initial Render**: Value is calculated in `useEffect` by default
4. **Browser Compatibility**: Limited support in very old browsers

---

*The `use-color-scheme` hook is essential for creating theme-aware applications that automatically adapt to the user's system preferences. It provides a clean, performant solution for detecting and responding to color scheme changes.*
