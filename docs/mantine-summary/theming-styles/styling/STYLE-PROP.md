# Style Prop (Refactorium)

This guide covers Mantine's style prop system and how to use it effectively in our Code Smell Playground project.

## Overview

Mantine components support a powerful `style` prop that extends React's native style prop with additional features like theme access, CSS variables, and style merging.

## Style Object

### Basic Usage

Pass a style object directly to the style prop - works like React's style prop:

```tsx
import { Box, rem } from '@mantine/core';

function CodeExample() {
  return (
    <Box
      style={{
        color: 'var(--mantine-color-red-5)',
        fontSize: rem(14),
        padding: rem(16),
        backgroundColor: 'var(--mantine-color-gray-0)',
        border: '1px solid var(--mantine-color-gray-3)',
        borderRadius: rem(8),
      }}
    >
      Code content
    </Box>
  );
}
```

### Using Mantine CSS Variables

Access theme values through CSS variables:

```tsx
function CodeBlock() {
  return (
    <Box
      style={{
        fontFamily: 'var(--mantine-font-family-monospace)',
        fontSize: 'var(--mantine-font-size-sm)',
        lineHeight: 'var(--mantine-line-height-md)',
        color: 'var(--mantine-color-text)',
        backgroundColor: 'var(--mantine-color-gray-0)',
        padding: 'var(--mantine-spacing-md)',
        borderRadius: 'var(--mantine-radius-sm)',
        border: '1px solid var(--mantine-color-gray-3)',
      }}
    >
      <pre>{code}</pre>
    </Box>
  );
}
```

### Responsive Styling

```tsx
function ResponsiveContainer() {
  return (
    <Box
      style={{
        padding: rem(16),
        fontSize: rem(14),
        '@media (min-width: 768px)': {
          padding: rem(24),
          fontSize: rem(16),
        },
        '@media (min-width: 1024px)': {
          padding: rem(32),
          fontSize: rem(18),
        },
      }}
    >
      Content
    </Box>
  );
}
```

## CSS Variables in Style Prop

### Define Custom Variables

You can define CSS variables directly in the style prop:

```tsx
function CustomRadiusBox() {
  return (
    <Box
      style={{ 
        '--custom-radius': '0.5rem', 
        borderRadius: 'var(--custom-radius)',
        padding: rem(16),
        backgroundColor: 'var(--mantine-color-blue-0)',
      }}
    >
      Custom radius box
    </Box>
  );
}
```

### Dynamic Variables

```tsx
function DynamicColorBox({ color }: { color: string }) {
  return (
    <Box
      style={{
        '--dynamic-color': color,
        backgroundColor: 'var(--dynamic-color)',
        color: 'white',
        padding: rem(16),
        borderRadius: rem(8),
      }}
    >
      Dynamic color box
    </Box>
  );
}
```

### Theme-Based Variables

```tsx
function ThemeBasedBox() {
  return (
    <Box
      style={{
        '--primary-color': 'var(--mantine-color-blue-6)',
        '--secondary-color': 'var(--mantine-color-gray-6)',
        border: '2px solid var(--primary-color)',
        backgroundColor: 'var(--secondary-color)',
        padding: rem(20),
      }}
    >
      Theme-based styling
    </Box>
  );
}
```

## Style Function

### Theme Access

Use a function to access theme properties not exposed as CSS variables:

```tsx
import { Box } from '@mantine/core';

function ThemeFunctionBox() {
  return (
    <Box
      style={(theme) => ({
        color: theme.colors.red[5],
        fontSize: theme.fontSizes.xs,
        fontFamily: theme.fontFamily,
        lineHeight: theme.lineHeights.md,
        padding: theme.spacing.md,
        borderRadius: theme.radius.sm,
        boxShadow: theme.shadows.sm,
      })}
    >
      Theme function styling
    </Box>
  );
}
```

### Custom Theme Properties

```tsx
// In theme provider
const theme = createTheme({
  other: {
    codeBlockPadding: '1.5rem',
    codeBlockRadius: '0.75rem',
    codeBlockFontSize: '0.875rem',
  },
});

// In component
function CodeBlock() {
  return (
    <Box
      style={(theme) => ({
        padding: theme.other.codeBlockPadding,
        borderRadius: theme.other.codeBlockRadius,
        fontSize: theme.other.codeBlockFontSize,
        fontFamily: theme.fontFamilyMonospace,
        backgroundColor: theme.colors.gray[0],
        border: `1px solid ${theme.colors.gray[3]}`,
      })}
    >
      Code block content
    </Box>
  );
}
```

### Conditional Styling

```tsx
function ConditionalBox({ isError, isSuccess }: { isError?: boolean; isSuccess?: boolean }) {
  return (
    <Box
      style={(theme) => ({
        padding: theme.spacing.md,
        borderRadius: theme.radius.sm,
        border: '1px solid',
        ...(isError && {
          borderColor: theme.colors.red[4],
          backgroundColor: theme.colors.red[0],
          color: theme.colors.red[7],
        }),
        ...(isSuccess && {
          borderColor: theme.colors.green[4],
          backgroundColor: theme.colors.green[0],
          color: theme.colors.green[7],
        }),
      })}
    >
      Status message
    </Box>
  );
}
```

## Styles Array

### Multiple Style Objects

Merge multiple style objects and functions:

```tsx
import { Box, MantineStyleProp } from '@mantine/core';

interface CodeExampleProps {
  style?: MantineStyleProp;
  variant?: 'default' | 'error' | 'success';
}

function CodeExample({ style, variant = 'default' }: CodeExampleProps) {
  const baseStyles = {
    fontFamily: 'var(--mantine-font-family-monospace)',
    fontSize: 'var(--mantine-font-size-sm)',
    padding: 'var(--mantine-spacing-md)',
    borderRadius: 'var(--mantine-radius-sm)',
    border: '1px solid var(--mantine-color-gray-3)',
  };

  const variantStyles = {
    default: {
      backgroundColor: 'var(--mantine-color-gray-0)',
      color: 'var(--mantine-color-text)',
    },
    error: {
      backgroundColor: 'var(--mantine-color-red-0)',
      color: 'var(--mantine-color-red-7)',
      borderColor: 'var(--mantine-color-red-4)',
    },
    success: {
      backgroundColor: 'var(--mantine-color-green-0)',
      color: 'var(--mantine-color-green-7)',
      borderColor: 'var(--mantine-color-green-4)',
    },
  };

  return (
    <Box
      style={[
        baseStyles,
        variantStyles[variant],
        style, // Allow external style override
      ]}
    >
      Code content
    </Box>
  );
}
```

### Style Functions in Array

```tsx
function ComplexBox({ style }: { style?: MantineStyleProp }) {
  return (
    <Box
      style={[
        // Base styles
        {
          padding: rem(16),
          borderRadius: rem(8),
        },
        // Theme-based styles
        (theme) => ({
          backgroundColor: theme.colors.gray[0],
          border: `1px solid ${theme.colors.gray[3]}`,
          color: theme.colors.text,
        }),
        // Conditional styles
        (theme) => ({
          '&:hover': {
            backgroundColor: theme.colors.gray[1],
            borderColor: theme.colors.gray[4],
          },
        }),
        // External styles (highest priority)
        style,
      ]}
    >
      Complex styled box
    </Box>
  );
}
```

## Refactorium-Specific Patterns

### Code Example Container

```tsx
interface CodeExampleProps {
  code: string;
  language: string;
  style?: MantineStyleProp;
  variant?: 'problem' | 'solution';
}

function CodeExample({ code, language, style, variant = 'problem' }: CodeExampleProps) {
  const variantStyles = {
    problem: {
      borderLeft: '4px solid var(--mantine-color-red-5)',
      backgroundColor: 'var(--mantine-color-red-0)',
    },
    solution: {
      borderLeft: '4px solid var(--mantine-color-green-5)',
      backgroundColor: 'var(--mantine-color-green-0)',
    },
  };

  return (
    <Box
      style={[
        {
          fontFamily: 'var(--mantine-font-family-monospace)',
          fontSize: 'var(--mantine-font-size-sm)',
          lineHeight: 'var(--mantine-line-height-md)',
          padding: 'var(--mantine-spacing-lg)',
          borderRadius: 'var(--mantine-radius-md)',
          margin: 'var(--mantine-spacing-md) 0',
          overflow: 'auto',
          whiteSpace: 'pre-wrap',
        },
        variantStyles[variant],
        style,
      ]}
    >
      <pre>{code}</pre>
    </Box>
  );
}
```

### Form Field Styling

```tsx
interface FormFieldProps {
  label: string;
  error?: string;
  style?: MantineStyleProp;
  children: React.ReactNode;
}

function FormField({ label, error, style, children }: FormFieldProps) {
  return (
    <Box
      style={[
        {
          marginBottom: 'var(--mantine-spacing-md)',
        },
        (theme) => ({
          '& .mantine-Input-input': {
            borderColor: error ? theme.colors.red[4] : theme.colors.gray[3],
            '&:focus': {
              borderColor: error ? theme.colors.red[5] : theme.colors.blue[5],
            },
          },
        }),
        style,
      ]}
    >
      <Text size="sm" fw={500} mb="xs">
        {label}
      </Text>
      {children}
      {error && (
        <Text size="xs" c="red" mt="xs">
          {error}
        </Text>
      )}
    </Box>
  );
}
```

### Responsive Grid

```tsx
interface ResponsiveGridProps {
  children: React.ReactNode;
  style?: MantineStyleProp;
}

function ResponsiveGrid({ children, style }: ResponsiveGridProps) {
  return (
    <Box
      style={[
        {
          display: 'grid',
          gap: 'var(--mantine-spacing-md)',
          gridTemplateColumns: '1fr',
        },
        {
          '@media (min-width: 768px)': {
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: 'var(--mantine-spacing-lg)',
          },
        },
        {
          '@media (min-width: 1024px)': {
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 'var(--mantine-spacing-xl)',
          },
        },
        style,
      ]}
    >
      {children}
    </Box>
  );
}
```

### Interactive Button

```tsx
interface InteractiveButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  variant?: 'primary' | 'secondary' | 'danger';
  style?: MantineStyleProp;
}

function InteractiveButton({ 
  children, 
  onClick, 
  variant = 'primary', 
  style 
}: InteractiveButtonProps) {
  const variantStyles = {
    primary: {
      backgroundColor: 'var(--mantine-color-blue-6)',
      color: 'white',
      '&:hover': {
        backgroundColor: 'var(--mantine-color-blue-7)',
      },
    },
    secondary: {
      backgroundColor: 'var(--mantine-color-gray-2)',
      color: 'var(--mantine-color-text)',
      '&:hover': {
        backgroundColor: 'var(--mantine-color-gray-3)',
      },
    },
    danger: {
      backgroundColor: 'var(--mantine-color-red-6)',
      color: 'white',
      '&:hover': {
        backgroundColor: 'var(--mantine-color-red-7)',
      },
    },
  };

  return (
    <Box
      component="button"
      onClick={onClick}
      style={[
        {
          padding: 'var(--mantine-spacing-sm) var(--mantine-spacing-md)',
          borderRadius: 'var(--mantine-radius-sm)',
          border: 'none',
          cursor: 'pointer',
          fontSize: 'var(--mantine-font-size-sm)',
          fontWeight: 'var(--mantine-font-weight-md)',
          transition: 'all 0.2s ease',
        },
        variantStyles[variant],
        style,
      ]}
    >
      {children}
    </Box>
  );
}
```

## Advanced Patterns

### Style Factory

```tsx
// Create reusable style factories
const createCodeBlockStyles = (variant: 'problem' | 'solution') => [
  {
    fontFamily: 'var(--mantine-font-family-monospace)',
    fontSize: 'var(--mantine-font-size-sm)',
    padding: 'var(--mantine-spacing-lg)',
    borderRadius: 'var(--mantine-radius-md)',
    margin: 'var(--mantine-spacing-md) 0',
  },
  (theme) => ({
    borderLeft: `4px solid ${
      variant === 'problem' ? theme.colors.red[5] : theme.colors.green[5]
    }`,
    backgroundColor: variant === 'problem' 
      ? theme.colors.red[0] 
      : theme.colors.green[0],
  }),
];

// Usage
function CodeBlock({ variant }: { variant: 'problem' | 'solution' }) {
  return (
    <Box style={createCodeBlockStyles(variant)}>
      Code content
    </Box>
  );
}
```

### Conditional Style Merging

```tsx
function ConditionalBox({ 
  isActive, 
  isDisabled, 
  style 
}: { 
  isActive?: boolean; 
  isDisabled?: boolean; 
  style?: MantineStyleProp; 
}) {
  return (
    <Box
      style={[
        {
          padding: 'var(--mantine-spacing-md)',
          borderRadius: 'var(--mantine-radius-sm)',
          border: '1px solid var(--mantine-color-gray-3)',
        },
        isActive && {
          borderColor: 'var(--mantine-color-blue-5)',
          backgroundColor: 'var(--mantine-color-blue-0)',
        },
        isDisabled && {
          opacity: 0.5,
          cursor: 'not-allowed',
        },
        style,
      ]}
    >
      Content
    </Box>
  );
}
```

### Theme-Aware Animations

```tsx
function AnimatedBox({ style }: { style?: MantineStyleProp }) {
  return (
    <Box
      style={[
        {
          padding: 'var(--mantine-spacing-lg)',
          borderRadius: 'var(--mantine-radius-md)',
          transition: 'all 0.3s ease',
        },
        (theme) => ({
          backgroundColor: theme.colors.gray[0],
          border: `1px solid ${theme.colors.gray[3]}`,
          '&:hover': {
            backgroundColor: theme.colors.gray[1],
            borderColor: theme.colors.gray[4],
            transform: 'translateY(-2px)',
            boxShadow: theme.shadows.md,
          },
        }),
        style,
      ]}
    >
      Hover me
    </Box>
  );
}
```

## Best Practices for Refactorium

### 1. Use CSS Variables for Theme Values

- Prefer CSS variables over theme functions when possible
- Better performance and consistency
- Easier to maintain and debug

### 2. Combine Style Objects and Functions

- Use style objects for static styles
- Use style functions for theme-dependent styles
- Use arrays to merge multiple style sources

### 3. Create Reusable Style Factories

- Extract common style patterns into functions
- Make components more maintainable
- Ensure consistency across the project

### 4. Handle Responsive Design

- Use CSS media queries in style objects
- Consider mobile-first approach
- Test on different screen sizes

### 5. Performance Considerations

- Avoid creating style objects in render
- Use useMemo for complex style calculations
- Prefer CSS variables over theme functions when possible

### 6. Type Safety

- Use MantineStyleProp type for style props
- Define proper interfaces for component props
- Leverage TypeScript for better development experience

### 7. Accessibility

- Ensure sufficient color contrast
- Use focus-visible styles for keyboard navigation
- Test with screen readers

This approach ensures our Code Smell Playground has flexible, maintainable, and performant styling using Mantine's style prop system effectively.
