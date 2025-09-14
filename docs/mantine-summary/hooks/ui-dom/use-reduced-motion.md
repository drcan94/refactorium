# use-reduced-motion Hook

## Overview

The `use-reduced-motion` hook detects if the user prefers to reduce motion by checking the `prefers-reduced-motion` CSS media query. This is essential for accessibility compliance and creating inclusive user experiences. It helps developers respect user preferences for reduced motion, which is important for users with vestibular disorders, motion sensitivity, or those who simply prefer less visual motion.

## Installation

```bash
npm install @mantine/hooks
```

## Import

```typescript
import { useReducedMotion } from '@mantine/hooks';
import type { UseMediaQueryOptions } from '@mantine/hooks';
```

## Basic Usage

```tsx
import { Badge } from '@mantine/core';
import { useReducedMotion } from '@mantine/hooks';

function Demo() {
  const reduceMotion = useReducedMotion();

  return (
    <Badge
      color={reduceMotion ? 'red' : 'teal'}
      style={{ transitionDuration: reduceMotion ? '0ms' : '200ms' }}
      variant="filled"
    >
      {reduceMotion ? 'You prefer to reduce motion' : 'You prefer not to reduce motion'}
    </Badge>
  );
}
```

## API Reference

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `initialValue` | `boolean` | **Optional.** Initial value for SSR and before detection |
| `options` | `UseMediaQueryOptions` | **Optional.** Configuration options for media query detection |

### UseMediaQueryOptions

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `getInitialValueInEffect` | `boolean` | `true` | Whether to resolve initial value in useEffect (SSR safe) |

### Return Value

| Type | Description |
|------|-------------|
| `boolean` | `true` if user prefers reduced motion, `false` otherwise |

### Type Definitions

```typescript
interface UseMediaQueryOptions {
  getInitialValueInEffect: boolean;
}

function useReducedMotion(initialValue?: boolean, options?: UseMediaQueryOptions): boolean;
```

## Key Features

### 1. **Accessibility Compliance**
- Respects user's motion preferences
- Essential for WCAG compliance
- Supports users with vestibular disorders

### 2. **SSR Support**
- Safe server-side rendering
- Configurable initial values
- Hydration-safe implementation

### 3. **Performance Optimized**
- Uses native `window.matchMedia()` API
- Efficient re-renders
- Automatic cleanup

### 4. **Cross-Platform Support**
- Works across all modern browsers
- Mobile and desktop support
- Consistent behavior

## Advanced Usage

### With Custom Initial Value

```tsx
import { useReducedMotion } from '@mantine/hooks';
import { Text, Box } from '@mantine/core';

function CustomInitialValue() {
  const reduceMotion = useReducedMotion(false, {
    getInitialValueInEffect: true
  });

  return (
    <Box>
      <Text>
        Motion preference: {reduceMotion ? 'Reduced' : 'Normal'}
      </Text>
    </Box>
  );
}
```

### SSR-Safe Implementation

```tsx
import { useReducedMotion } from '@mantine/hooks';
import { Text, Box } from '@mantine/core';

function SSRSafeMotion() {
  const reduceMotion = useReducedMotion(false, {
    getInitialValueInEffect: true // SSR safe
  });

  return (
    <Box>
      <Text>
        Reduced motion: {reduceMotion ? 'Enabled' : 'Disabled'}
      </Text>
    </Box>
  );
}
```

## Use Cases

### 1. **Conditional Animations**

```tsx
import { useReducedMotion } from '@mantine/hooks';
import { Text, Box, Paper, Button } from '@mantine/core';
import { useState } from 'react';

function ConditionalAnimations() {
  const reduceMotion = useReducedMotion();
  const [isVisible, setIsVisible] = useState(false);

  return (
    <Box>
      <Text size="lg" mb="md">Conditional Animations</Text>
      
      <Button onClick={() => setIsVisible(!isVisible)} mb="md">
        Toggle Animation
      </Button>

      <Paper
        p="md"
        style={{
          backgroundColor: '#e3f2fd',
          transform: isVisible ? 'translateX(0)' : 'translateX(-100px)',
          transition: reduceMotion ? 'none' : 'transform 0.3s ease',
          opacity: isVisible ? 1 : 0,
        }}
      >
        <Text>
          This element {reduceMotion ? 'appears instantly' : 'slides in with animation'}
        </Text>
      </Paper>
    </Box>
  );
}
```

### 2. **Accessible Transitions**

```tsx
import { useReducedMotion } from '@mantine/hooks';
import { Text, Box, Paper, Group, Button } from '@mantine/core';
import { useState } from 'react';

function AccessibleTransitions() {
  const reduceMotion = useReducedMotion();
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    { id: 0, label: 'Tab 1', content: 'Content for tab 1' },
    { id: 1, label: 'Tab 2', content: 'Content for tab 2' },
    { id: 2, label: 'Tab 3', content: 'Content for tab 3' },
  ];

  return (
    <Box>
      <Text size="lg" mb="md">Accessible Tab Transitions</Text>
      
      <Group mb="md">
        {tabs.map((tab) => (
          <Button
            key={tab.id}
            variant={activeTab === tab.id ? 'filled' : 'outline'}
            onClick={() => setActiveTab(tab.id)}
            style={{
              transition: reduceMotion ? 'none' : 'all 0.2s ease',
            }}
          >
            {tab.label}
          </Button>
        ))}
      </Group>

      <Paper
        p="md"
        style={{
          backgroundColor: '#f8f9fa',
          minHeight: '100px',
          transition: reduceMotion ? 'none' : 'background-color 0.3s ease',
        }}
      >
        <Text>{tabs[activeTab].content}</Text>
        <Text size="sm" color="dimmed" mt="xs">
          Transition: {reduceMotion ? 'Disabled' : 'Enabled'}
        </Text>
      </Paper>
    </Box>
  );
}
```

### 3. **Motion-Aware Loading States**

```tsx
import { useReducedMotion } from '@mantine/hooks';
import { Text, Box, Paper, Loader, Button } from '@mantine/core';
import { useState } from 'react';

function MotionAwareLoading() {
  const reduceMotion = useReducedMotion();
  const [isLoading, setIsLoading] = useState(false);

  const startLoading = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 2000);
  };

  return (
    <Box>
      <Text size="lg" mb="md">Motion-Aware Loading States</Text>
      
      <Button onClick={startLoading} mb="md" loading={isLoading}>
        {isLoading ? 'Loading...' : 'Start Loading'}
      </Button>

      {isLoading && (
        <Paper
          p="md"
          style={{
            backgroundColor: '#e8f5e8',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
          }}
        >
          <Loader
            size="sm"
            style={{
              animation: reduceMotion ? 'none' : 'spin 1s linear infinite',
            }}
          />
          <Text>Loading content...</Text>
        </Paper>
      )}
      
      <Text size="sm" color="dimmed" mt="md">
        Animation: {reduceMotion ? 'Disabled' : 'Enabled'}
      </Text>
    </Box>
  );
}
```

### 4. **Responsive Motion Controls**

```tsx
import { useReducedMotion } from '@mantine/hooks';
import { Text, Box, Paper, Switch, Group } from '@mantine/core';
import { useState } from 'react';

function ResponsiveMotionControls() {
  const reduceMotion = useReducedMotion();
  const [customMotion, setCustomMotion] = useState(false);

  const shouldAnimate = !reduceMotion && customMotion;

  return (
    <Box>
      <Text size="lg" mb="md">Responsive Motion Controls</Text>
      
      <Paper p="md" style={{ backgroundColor: '#f8f9fa' }}>
        <Group justify="space-between" mb="md">
          <Text>System Motion Preference</Text>
          <Text weight="bold" color={reduceMotion ? 'red' : 'green'}>
            {reduceMotion ? 'Reduced' : 'Normal'}
          </Text>
        </Group>
        
        <Group justify="space-between" mb="md">
          <Text>Custom Motion Setting</Text>
          <Switch
            checked={customMotion}
            onChange={(event) => setCustomMotion(event.currentTarget.checked)}
            disabled={reduceMotion}
          />
        </Group>
        
        <Text size="sm" color="dimmed">
          {reduceMotion 
            ? 'Motion is disabled by system preference'
            : `Motion is ${customMotion ? 'enabled' : 'disabled'} by custom setting`
          }
        </Text>
      </Paper>

      <Paper
        p="md"
        mt="md"
        style={{
          backgroundColor: shouldAnimate ? '#e3f2fd' : '#f5f5f5',
          transform: shouldAnimate ? 'scale(1.02)' : 'scale(1)',
          transition: shouldAnimate ? 'all 0.3s ease' : 'none',
        }}
      >
        <Text>This element responds to motion settings</Text>
      </Paper>
    </Box>
  );
}
```

### 5. **Accessible Hover Effects**

```tsx
import { useReducedMotion } from '@mantine/hooks';
import { Text, Box, Paper, Group } from '@mantine/core';
import { useState } from 'react';

function AccessibleHoverEffects() {
  const reduceMotion = useReducedMotion();
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const cards = [
    { id: 1, title: 'Card 1', content: 'Content for card 1' },
    { id: 2, title: 'Card 2', content: 'Content for card 2' },
    { id: 3, title: 'Card 3', content: 'Content for card 3' },
  ];

  return (
    <Box>
      <Text size="lg" mb="md">Accessible Hover Effects</Text>
      
      <Group>
        {cards.map((card) => (
          <Paper
            key={card.id}
            p="md"
            style={{
              backgroundColor: hoveredCard === card.id ? '#e3f2fd' : '#f8f9fa',
              transform: hoveredCard === card.id && !reduceMotion 
                ? 'translateY(-4px) scale(1.02)' 
                : 'translateY(0) scale(1)',
              transition: reduceMotion ? 'none' : 'all 0.2s ease',
              cursor: 'pointer',
            }}
            onMouseEnter={() => setHoveredCard(card.id)}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <Text weight="bold" mb="xs">{card.title}</Text>
            <Text size="sm">{card.content}</Text>
          </Paper>
        ))}
      </Group>
      
      <Text size="sm" color="dimmed" mt="md">
        Hover effects: {reduceMotion ? 'Disabled' : 'Enabled'}
      </Text>
    </Box>
  );
}
```

### 6. **Motion-Aware Carousel**

```tsx
import { useReducedMotion } from '@mantine/hooks';
import { Text, Box, Paper, Group, Button } from '@mantine/core';
import { useState } from 'react';

function MotionAwareCarousel() {
  const reduceMotion = useReducedMotion();
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    { id: 1, content: 'Slide 1', color: '#e3f2fd' },
    { id: 2, content: 'Slide 2', color: '#e8f5e8' },
    { id: 3, content: 'Slide 3', color: '#fff3e0' },
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <Box>
      <Text size="lg" mb="md">Motion-Aware Carousel</Text>
      
      <Paper
        p="md"
        style={{
          backgroundColor: slides[currentSlide].color,
          minHeight: '150px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: reduceMotion ? 'none' : 'background-color 0.3s ease',
        }}
      >
        <Text size="xl" weight="bold">
          {slides[currentSlide].content}
        </Text>
      </Paper>

      <Group justify="center" mt="md">
        <Button onClick={prevSlide}>Previous</Button>
        <Button onClick={nextSlide}>Next</Button>
      </Group>
      
      <Text size="sm" color="dimmed" mt="md" ta="center">
        Transitions: {reduceMotion ? 'Disabled' : 'Enabled'}
      </Text>
    </Box>
  );
}
```

## Performance Considerations

### Memoized Motion Detection

```tsx
import { useReducedMotion } from '@mantine/hooks';
import { memo, useCallback, useMemo } from 'react';
import { Text, Box } from '@mantine/core';

const MotionAwareComponent = memo(function MotionAwareComponent({ 
  onMotionChange 
}: { 
  onMotionChange: (reduced: boolean) => void; 
}) {
  const reduceMotion = useReducedMotion();

  const motionConfig = useMemo(() => ({
    reduced: reduceMotion,
    transitionDuration: reduceMotion ? '0ms' : '200ms',
    animationDuration: reduceMotion ? '0ms' : '300ms',
  }), [reduceMotion]);

  useCallback(() => {
    onMotionChange(reduceMotion);
  }, [reduceMotion, onMotionChange]);

  return (
    <Box>
      <Text>Motion: {motionConfig.reduced ? 'Reduced' : 'Normal'}</Text>
    </Box>
  );
});

function OptimizedMotion() {
  const handleMotionChange = useCallback((reduced: boolean) => {
    console.log('Motion preference changed:', reduced);
  }, []);

  return (
    <div>
      <MotionAwareComponent onMotionChange={handleMotionChange} />
    </div>
  );
}
```

### Conditional Motion Handling

```tsx
import { useReducedMotion } from '@mantine/hooks';
import { Text, Box, Switch } from '@mantine/core';
import { useState } from 'react';

function ConditionalMotion() {
  const reduceMotion = useReducedMotion();
  const [enableCustomMotion, setEnableCustomMotion] = useState(true);

  const shouldUseMotion = !reduceMotion && enableCustomMotion;

  return (
    <Box>
      <Switch
        label="Enable custom motion"
        checked={enableCustomMotion}
        onChange={(event) => setEnableCustomMotion(event.currentTarget.checked)}
        disabled={reduceMotion}
        mb="md"
      />
      
      <Box
        style={{
          padding: '16px',
          backgroundColor: shouldUseMotion ? '#e8f5e8' : '#f5f5f5',
          transition: shouldUseMotion ? 'all 0.3s ease' : 'none',
        }}
      >
        <Text>
          Motion: {shouldUseMotion ? 'Enabled' : 'Disabled'}
        </Text>
      </Box>
    </Box>
  );
}
```

## Common Patterns

### Motion with State Management

```tsx
import { useReducedMotion } from '@mantine/hooks';
import { Text, Box, Button } from '@mantine/core';
import { useState, useEffect } from 'react';

function MotionWithState() {
  const reduceMotion = useReducedMotion();
  const [motionHistory, setMotionHistory] = useState<boolean[]>([]);

  useEffect(() => {
    setMotionHistory(prev => [...prev, reduceMotion]);
  }, [reduceMotion]);

  return (
    <Box>
      <Text>Current: {reduceMotion ? 'Reduced' : 'Normal'}</Text>
      <Text>History: {motionHistory.length} changes</Text>
    </Box>
  );
}
```

### Motion with Animation

```tsx
import { useReducedMotion } from '@mantine/hooks';
import { Text, Box, Paper } from '@mantine/core';
import { useState } from 'react';

function MotionWithAnimation() {
  const reduceMotion = useReducedMotion();
  const [isAnimated, setIsAnimated] = useState(false);

  return (
    <Box>
      <Paper
        p="md"
        style={{
          backgroundColor: isAnimated ? '#e3f2fd' : '#f8f9fa',
          transform: isAnimated && !reduceMotion ? 'scale(1.1)' : 'scale(1)',
          transition: reduceMotion ? 'none' : 'all 0.3s ease',
        }}
        onClick={() => setIsAnimated(!isAnimated)}
      >
        <Text>Click to animate</Text>
      </Paper>
    </Box>
  );
}
```

## Integration with Other Hooks

### Combined with useMediaQuery

```tsx
import { useReducedMotion } from '@mantine/hooks';
import { Text, Box, Paper } from '@mantine/core';

function MotionWithMediaQuery() {
  const reduceMotion = useReducedMotion();
  const isMobile = useMediaQuery('(max-width: 768px)');

  const getMotionConfig = () => {
    if (reduceMotion) return { duration: '0ms', enabled: false };
    if (isMobile) return { duration: '150ms', enabled: true };
    return { duration: '300ms', enabled: true };
  };

  const config = getMotionConfig();

  return (
    <Box>
      <Paper p="md" style={{ backgroundColor: '#f8f9fa' }}>
        <Text>Motion: {config.enabled ? 'Enabled' : 'Disabled'}</Text>
        <Text>Duration: {config.duration}</Text>
        <Text>Device: {isMobile ? 'Mobile' : 'Desktop'}</Text>
      </Paper>
    </Box>
  );
}
```

### Combined with useLocalStorage

```tsx
import { useReducedMotion, useLocalStorage } from '@mantine/hooks';
import { Text, Box, Paper, Button } from '@mantine/core';

function MotionWithStorage() {
  const reduceMotion = useReducedMotion();
  const [motionPreference, setMotionPreference] = useLocalStorage({
    key: 'motion-preference',
    defaultValue: 'auto'
  });

  const savePreference = () => {
    setMotionPreference(reduceMotion ? 'reduced' : 'normal');
  };

  return (
    <Box>
      <Paper p="md" style={{ backgroundColor: '#f0f0f0' }}>
        <Text>Current: {reduceMotion ? 'Reduced' : 'Normal'}</Text>
        <Text>Saved: {motionPreference}</Text>
      </Paper>
      
      <Button onClick={savePreference} mt="md" fullWidth>
        Save Preference
      </Button>
    </Box>
  );
}
```

## Troubleshooting

### Common Issues

1. **Motion Not Detecting**
   - Check if the browser supports the media query
   - Ensure the page is served over HTTPS
   - Test with actual user preferences

2. **SSR Issues**
   - Use appropriate initial values
   - Set `getInitialValueInEffect: true`
   - Handle hydration mismatches

3. **Performance Issues**
   - Use memoization for expensive calculations
   - Avoid unnecessary re-renders
   - Consider debouncing if needed

### Debug Information

```tsx
import { useReducedMotion } from '@mantine/hooks';
import { Text, Box, Paper } from '@mantine/core';

function DebugMotion() {
  const reduceMotion = useReducedMotion();

  return (
    <Paper p="md" style={{ backgroundColor: '#f8f9fa' }}>
      <Text size="lg" weight="bold" mb="md">Motion Debug Info</Text>
      
      <Box>
        <Text>Reduced Motion: {reduceMotion ? 'Yes' : 'No'}</Text>
        <Text>Media Query Support: {typeof window !== 'undefined' && 'matchMedia' in window ? 'Yes' : 'No'}</Text>
        <Text>User Agent: {typeof navigator !== 'undefined' ? navigator.userAgent : 'N/A'}</Text>
      </Box>
    </Paper>
  );
}
```

## Browser Support

- **Modern Browsers**: Full support
- **Legacy Browsers**: Limited support (fallback to false)
- **Mobile Browsers**: Full support
- **Server-Side**: Safe to use with initial values

## Related Hooks

- `use-media-query` - For other media queries
- `use-color-scheme` - For dark/light mode detection
- `use-orientation` - For device orientation
- `use-intersection` - For viewport intersection

## Best Practices

1. **Accessibility First**: Always respect user preferences
2. **SSR Safety**: Use appropriate initial values
3. **Performance**: Use memoization for expensive calculations
4. **Testing**: Test with actual user preferences
5. **Fallbacks**: Provide fallbacks for unsupported browsers

---

*The `use-reduced-motion` hook provides a clean, accessible way to respect user motion preferences in React applications. It's essential for creating inclusive user experiences and ensuring WCAG compliance while maintaining excellent performance and cross-platform support.*
