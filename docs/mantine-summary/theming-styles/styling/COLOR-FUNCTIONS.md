# Color Functions (Refactorium)

This guide covers Mantine's color manipulation functions and how to use them effectively for dynamic color handling in our Code Smell Playground project.

## Overview

Mantine provides several color utility functions for manipulating colors, extracting color information, and creating dynamic color schemes. These functions are essential for creating theme-aware and accessible color systems.

## Basic Color Functions

### darken and lighten

Manipulate color brightness with `darken` and `lighten` functions:

```tsx
import { darken, lighten } from '@mantine/core';

// Lighten colors
lighten('#228BE6', 0.1); // lighten by 10%
// -> rgba(56, 151, 233, 1)

lighten('rgb(245, 159, 0)', 0.2); // lighten by 20%
// -> rgba(255, 191, 51, 1)

// Darken colors
darken('rgb(245, 159, 0)', 0.5); // darken by 50%
// -> rgba(123, 80, 0, 1)

darken('rgba(245, 159, 0, .3)', 0.5); // darken by 50%
// -> rgba(123, 80, 0, .3)

// Works with CSS variables
lighten('var(--mantine-color-gray-4)', 0.74);
// -> color-mix(in srgb, var(--mantine-color-gray-4), white 74%)
```

### Refactorium-Specific Usage

```tsx
// CodeExample.tsx
import { darken, lighten } from '@mantine/core';

function CodeExample({ 
  variant, 
  isHovered 
}: { 
  variant: 'problem' | 'solution'; 
  isHovered?: boolean; 
}) {
  const baseColor = variant === 'problem' ? '#e03131' : '#2f9e44';
  const backgroundColor = isHovered 
    ? lighten(baseColor, 0.1) 
    : lighten(baseColor, 0.05);
  
  const borderColor = isHovered 
    ? darken(baseColor, 0.1) 
    : baseColor;

  return (
    <Box
      bg={backgroundColor}
      bd={`1px solid ${borderColor}`}
      p="lg"
      bdrs="md"
    >
      Code content
    </Box>
  );
}
```

### alpha

Convert colors to rgba format with alpha channel:

```tsx
import { alpha } from '@mantine/core';

// Convert to rgba with alpha
alpha('#4578FC', 0.45); // -> rgba(69, 120, 252, 0.45)
alpha('rgb(255, 0, 0)', 0.3); // -> rgba(255, 0, 0, 0.3)

// Works with CSS variables
alpha('var(--mantine-color-gray-4)', 0.74);
// -> color-mix(in srgb, var(--mantine-color-gray-4), transparent 26%)
```

### Refactorium-Specific Alpha Usage

```tsx
// OverlayComponent.tsx
import { alpha } from '@mantine/core';

function CodeOverlay({ 
  isVisible, 
  color 
}: { 
  isVisible: boolean; 
  color: string; 
}) {
  return (
    <Box
      pos="absolute"
      top={0}
      left={0}
      right={0}
      bottom={0}
      bg={alpha(color, 0.1)}
      display={isVisible ? 'block' : 'none'}
      style={{
        backdropFilter: 'blur(2px)',
      }}
    >
      <Text ta="center" c={color} fw={600}>
        Code Analysis
      </Text>
    </Box>
  );
}
```

## Color Information Functions

### parseThemeColor

Extract detailed information about colors:

```tsx
import { parseThemeColor, useMantineTheme } from '@mantine/core';

interface ColorInfoProps {
  color: string;
}

function ColorInfo({ color }: ColorInfoProps) {
  const theme = useMantineTheme();
  const parsedColor = parseThemeColor({ color, theme });

  return (
    <Box p="md" bg="gray.0" bdrs="sm">
      <Text fw={600} mb="sm">Color Information</Text>
      <Text size="sm">Original: {color}</Text>
      <Text size="sm">Is Theme Color: {parsedColor.isThemeColor ? 'Yes' : 'No'}</Text>
      <Text size="sm">Color Key: {parsedColor.color}</Text>
      <Text size="sm">Value: {parsedColor.value}</Text>
      <Text size="sm">Shade: {parsedColor.shade || 'N/A'}</Text>
      <Text size="sm">CSS Variable: {parsedColor.variable || 'N/A'}</Text>
    </Box>
  );
}
```

### getThemeColor

Simplified color resolution:

```tsx
import { getThemeColor, useMantineTheme } from '@mantine/core';

function ThemeColorDemo() {
  const theme = useMantineTheme();

  const colors = {
    blue: getThemeColor('blue', theme), // -> var(--mantine-color-blue-filled)
    blue7: getThemeColor('blue.7', theme), // -> var(--mantine-color-blue-7)
    white: getThemeColor('white', theme), // -> var(--mantine-color-white)
    custom: getThemeColor('#DF78E4', theme), // -> #DF78E4
  };

  return (
    <Box>
      {Object.entries(colors).map(([name, value]) => (
        <Box key={name} p="sm" bg={value} c="white" mb="xs">
          {name}: {value}
        </Box>
      ))}
    </Box>
  );
}
```

### Refactorium-Specific Color Resolution

```tsx
// CodeExampleHeader.tsx
import { getThemeColor, useMantineTheme } from '@mantine/core';

function CodeExampleHeader({ 
  variant, 
  title 
}: { 
  variant: 'problem' | 'solution' | 'explain'; 
  title: string; 
}) {
  const theme = useMantineTheme();
  
  const variantColors = {
    problem: getThemeColor('red.6', theme),
    solution: getThemeColor('green.6', theme),
    explain: getThemeColor('blue.6', theme),
  };

  const variantBackgrounds = {
    problem: getThemeColor('red.0', theme),
    solution: getThemeColor('green.0', theme),
    explain: getThemeColor('blue.0', theme),
  };

  return (
    <Box
      p="md"
      bg={variantBackgrounds[variant]}
      c={variantColors[variant]}
      fw={600}
      bdrs="sm"
    >
      {title}
    </Box>
  );
}
```

## Gradient Functions

### getGradient

Create CSS gradient strings:

```tsx
import { getGradient, useMantineTheme } from '@mantine/core';

function GradientDemo() {
  const theme = useMantineTheme();

  const gradients = {
    blueToCyan: getGradient({ deg: 180, from: 'blue', to: 'cyan.7' }, theme),
    redToOrange: getGradient({ deg: 45, from: 'red.6', to: 'orange.6' }, theme),
    rainbow: getGradient({ deg: 90, from: 'red', to: 'blue' }, theme),
  };

  return (
    <Box>
      {Object.entries(gradients).map(([name, gradient]) => (
        <Box
          key={name}
          p="xl"
          bg={gradient}
          c="white"
          ta="center"
          fw={600}
          mb="md"
        >
          {name}
        </Box>
      ))}
    </Box>
  );
}
```

### Refactorium-Specific Gradients

```tsx
// CodeExampleCard.tsx
import { getGradient, useMantineTheme } from '@mantine/core';

function CodeExampleCard({ 
  variant, 
  children 
}: { 
  variant: 'problem' | 'solution' | 'explain'; 
  children: React.ReactNode; 
}) {
  const theme = useMantineTheme();
  
  const variantGradients = {
    problem: getGradient({ deg: 135, from: 'red.6', to: 'red.8' }, theme),
    solution: getGradient({ deg: 135, from: 'green.6', to: 'green.8' }, theme),
    explain: getGradient({ deg: 135, from: 'blue.6', to: 'blue.8' }, theme),
  };

  return (
    <Box
      p="lg"
      bg={variantGradients[variant]}
      c="white"
      bdrs="md"
      style={{
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
      }}
    >
      {children}
    </Box>
  );
}
```

## Contrast Functions

### isLightColor

Determine if a color is light for better contrast:

```tsx
import { Box, isLightColor } from '@mantine/core';

interface ContrastDemoProps {
  color: string;
}

function ContrastDemo({ color }: ContrastDemoProps) {
  return (
    <Box 
      bg={color} 
      c={isLightColor(color) ? 'black' : 'white'}
      p="md"
      ta="center"
      fw={600}
    >
      Box with contrast text
    </Box>
  );
}
```

### Refactorium-Specific Contrast Usage

```tsx
// CodeExampleBadge.tsx
import { isLightColor } from '@mantine/core';

function CodeExampleBadge({ 
  variant, 
  text 
}: { 
  variant: 'problem' | 'solution' | 'explain'; 
  text: string; 
}) {
  const variantColors = {
    problem: '#e03131',
    solution: '#2f9e44',
    explain: '#1971c2',
  };

  const color = variantColors[variant];
  const textColor = isLightColor(color) ? 'black' : 'white';

  return (
    <Box
      bg={color}
      c={textColor}
      px="sm"
      py="xs"
      bdrs="sm"
      fz="xs"
      fw={600}
      tt="uppercase"
    >
      {text}
    </Box>
  );
}
```

### luminance

Get color luminance for contrast calculations:

```tsx
import { luminance } from '@mantine/core';

function LuminanceDemo() {
  const colors = ['#fff', '#000', '#4578FC', '#e03131', '#2f9e44'];
  
  return (
    <Box>
      {colors.map((color) => (
        <Box key={color} p="sm" bg={color} mb="xs">
          <Text c={luminance(color) > 0.5 ? 'black' : 'white'}>
            {color}: {luminance(color).toFixed(3)}
          </Text>
        </Box>
      ))}
    </Box>
  );
}
```

## Advanced Color Patterns

### Dynamic Color Schemes

```tsx
// DynamicCodeExample.tsx
import { 
  parseThemeColor, 
  lighten, 
  darken, 
  alpha, 
  useMantineTheme 
} from '@mantine/core';

function DynamicCodeExample({ 
  baseColor, 
  intensity 
}: { 
  baseColor: string; 
  intensity: number; 
}) {
  const theme = useMantineTheme();
  const parsedColor = parseThemeColor({ color: baseColor, theme });
  
  const colorValue = parsedColor.isThemeColor 
    ? `var(${parsedColor.variable})` 
    : parsedColor.value;

  const backgroundColor = lighten(colorValue, intensity * 0.1);
  const borderColor = darken(colorValue, intensity * 0.2);
  const textColor = parsedColor.value;
  const overlayColor = alpha(colorValue, 0.1);

  return (
    <Box
      p="lg"
      bg={backgroundColor}
      bd={`2px solid ${borderColor}`}
      c={textColor}
      bdrs="md"
      pos="relative"
    >
      <Box
        pos="absolute"
        top={0}
        left={0}
        right={0}
        bottom={0}
        bg={overlayColor}
        bdrs="md"
        style={{
          pointerEvents: 'none',
        }}
      />
      <Text fw={600} pos="relative" zIndex={1}>
        Dynamic Color Example
      </Text>
    </Box>
  );
}
```

### Theme-Aware Color Mixing

```tsx
// ThemeAwareColorBox.tsx
import { 
  getThemeColor, 
  lighten, 
  darken, 
  alpha, 
  useMantineTheme 
} from '@mantine/core';

function ThemeAwareColorBox({ 
  color, 
  variant 
}: { 
  color: string; 
  variant: 'light' | 'dark' | 'mixed'; 
}) {
  const theme = useMantineTheme();
  const baseColor = getThemeColor(color, theme);
  
  const variantStyles = {
    light: {
      bg: lighten(baseColor, 0.2),
      c: darken(baseColor, 0.4),
      bd: `1px solid ${lighten(baseColor, 0.1)}`,
    },
    dark: {
      bg: darken(baseColor, 0.2),
      c: lighten(baseColor, 0.4),
      bd: `1px solid ${darken(baseColor, 0.1)}`,
    },
    mixed: {
      bg: alpha(baseColor, 0.1),
      c: baseColor,
      bd: `1px solid ${alpha(baseColor, 0.3)}`,
    },
  };

  return (
    <Box
      p="lg"
      bdrs="md"
      {...variantStyles[variant]}
    >
      <Text fw={600}>Theme-Aware Color Box</Text>
      <Text size="sm" c="dimmed">
        Variant: {variant}
      </Text>
    </Box>
  );
}
```

### Color Palette Generator

```tsx
// ColorPaletteGenerator.tsx
import { 
  lighten, 
  darken, 
  alpha, 
  isLightColor, 
  luminance 
} from '@mantine/core';

function ColorPaletteGenerator({ 
  baseColor 
}: { 
  baseColor: string; 
}) {
  const shades = [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9];
  
  return (
    <Box>
      <Text fw={600} mb="md">Color Palette: {baseColor}</Text>
      
      <Box display="flex" gap="xs" mb="md">
        {shades.map((shade) => (
          <Box
            key={shade}
            w={60}
            h={60}
            bg={lighten(baseColor, shade)}
            bdrs="sm"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Text
              size="xs"
              c={isLightColor(lighten(baseColor, shade)) ? 'black' : 'white'}
              fw={600}
            >
              {Math.round(shade * 100)}%
            </Text>
          </Box>
        ))}
      </Box>
      
      <Box display="flex" gap="xs">
        {shades.map((shade) => (
          <Box
            key={`dark-${shade}`}
            w={60}
            h={60}
            bg={darken(baseColor, shade)}
            bdrs="sm"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Text
              size="xs"
              c={isLightColor(darken(baseColor, shade)) ? 'black' : 'white'}
              fw={600}
            >
              -{Math.round(shade * 100)}%
            </Text>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
```

## Refactorium-Specific Components

### CodeExample with Dynamic Colors

```tsx
// DynamicCodeExample.tsx
import { 
  parseThemeColor, 
  lighten, 
  darken, 
  alpha, 
  isLightColor,
  useMantineTheme 
} from '@mantine/core';

interface DynamicCodeExampleProps {
  code: string;
  language: string;
  variant: 'problem' | 'solution' | 'explain';
  intensity?: number;
}

function DynamicCodeExample({ 
  code, 
  language, 
  variant, 
  intensity = 0.5 
}: DynamicCodeExampleProps) {
  const theme = useMantineTheme();
  
  const variantColors = {
    problem: 'red.6',
    solution: 'green.6',
    explain: 'blue.6',
  };

  const baseColor = variantColors[variant];
  const parsedColor = parseThemeColor({ color: baseColor, theme });
  const colorValue = parsedColor.isThemeColor 
    ? `var(${parsedColor.variable})` 
    : parsedColor.value;

  const backgroundColor = lighten(colorValue, intensity * 0.2);
  const borderColor = darken(colorValue, intensity * 0.3);
  const textColor = isLightColor(backgroundColor) ? 'black' : 'white';
  const accentColor = alpha(colorValue, 0.1);

  return (
    <Box
      p="lg"
      bg={backgroundColor}
      bd={`2px solid ${borderColor}`}
      c={textColor}
      bdrs="md"
      pos="relative"
      style={{
        boxShadow: `0 4px 12px ${alpha(colorValue, 0.2)}`,
      }}
    >
      <Box
        pos="absolute"
        top={0}
        left={0}
        w={4}
        h="100%"
        bg={colorValue}
        bdrs="md 0 0 md"
      />
      
      <Box pl="md">
        <Text fw={600} mb="sm" c={colorValue}>
          {variant === 'problem' && 'Problem'}
          {variant === 'solution' && 'Solution'}
          {variant === 'explain' && 'Explanation'}
        </Text>
        
        <Box
          bg={accentColor}
          p="md"
          bdrs="sm"
          ff="monospace"
          fz="sm"
          lh={1.5}
        >
          <pre>{code}</pre>
        </Box>
      </Box>
    </Box>
  );
}
```

### Color-Coded Form Fields

```tsx
// ColorCodedFormField.tsx
import { 
  getThemeColor, 
  lighten, 
  darken, 
  alpha, 
  isLightColor,
  useMantineTheme 
} from '@mantine/core';

interface ColorCodedFormFieldProps {
  label: string;
  error?: string;
  warning?: string;
  success?: boolean;
  children: React.ReactNode;
}

function ColorCodedFormField({ 
  label, 
  error, 
  warning, 
  success, 
  children 
}: ColorCodedFormFieldProps) {
  const theme = useMantineTheme();
  
  let statusColor = 'gray.6';
  if (error) statusColor = 'red.6';
  else if (warning) statusColor = 'orange.6';
  else if (success) statusColor = 'green.6';

  const colorValue = getThemeColor(statusColor, theme);
  const backgroundColor = lighten(colorValue, 0.1);
  const borderColor = darken(colorValue, 0.2);
  const textColor = isLightColor(backgroundColor) ? 'black' : 'white';

  return (
    <Box
      p="md"
      bg={backgroundColor}
      bd={`1px solid ${borderColor}`}
      bdrs="sm"
      mb="md"
    >
      <Text
        fw={500}
        mb="xs"
        c={colorValue}
        fz="sm"
      >
        {label}
        {error && ' (Error)'}
        {warning && ' (Warning)'}
        {success && ' (Success)'}
      </Text>
      
      {children}
      
      {(error || warning) && (
        <Text
          fz="xs"
          c={colorValue}
          mt="xs"
        >
          {error || warning}
        </Text>
      )}
    </Box>
  );
}
```

## Best Practices for Refactorium

### 1. Use Theme Colors When Possible

- Prefer theme colors over hardcoded values
- Use `parseThemeColor` for complex color operations
- Leverage CSS variables for better performance

### 2. Ensure Accessibility

- Use `isLightColor` for proper contrast
- Test color combinations with screen readers
- Provide alternative text for color-coded information

### 3. Performance Considerations

- Cache color calculations when possible
- Use CSS variables for frequently used colors
- Avoid complex color calculations in render loops

### 4. Consistent Color Patterns

- Use consistent color functions across components
- Create reusable color utility functions
- Document color usage patterns

### 5. Error Handling

- Handle invalid color values gracefully
- Provide fallbacks for unsupported color formats
- Test with various color input types

### 6. Browser Compatibility

- Consider `color-mix` support for older browsers
- Provide fallbacks for CSS functions
- Test across different browsers

### 7. Documentation

- Document custom color functions
- Provide examples for complex color patterns
- Keep color documentation up to date

This approach ensures our Code Smell Playground has a robust, accessible, and performant color system using Mantine's color functions effectively.
