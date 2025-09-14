# Style Props (Refactorium)

This guide covers Mantine's style props system and how to use them effectively for inline styling in our Code Smell Playground project.

## Overview

Style props allow you to add inline styles to any Mantine component's root element. They provide a convenient way to apply common styles without writing CSS, and they integrate seamlessly with Mantine's theme system.

## Basic Usage

### Simple Style Props

```tsx
import { Box } from '@mantine/core';

function BasicExample() {
  return (
    <Box 
      mx="auto" 
      maw={400} 
      c="blue.6" 
      bg="#fff"
      p="md"
      ta="center"
    >
      Your component
    </Box>
  );
}
```

### Refactorium-Specific Examples

```tsx
// CodeExampleContainer.tsx
function CodeExampleContainer({ children }: { children: React.ReactNode }) {
  return (
    <Box
      p="lg"
      m="md"
      bg="gray.0"
      bd="1px solid gray.3"
      bdrs="md"
      c="text"
    >
      {children}
    </Box>
  );
}

// CodeBlock.tsx
function CodeBlock({ code }: { code: string }) {
  return (
    <Box
      p="md"
      bg="gray.0"
      bd="1px solid gray.3"
      bdrs="sm"
      ff="monospace"
      fz="sm"
      lh={1.5}
      c="text"
    >
      <pre>{code}</pre>
    </Box>
  );
}
```

## Supported Props

### Spacing Props

| Prop | CSS Property | Theme Key |
|------|-------------|-----------|
| `m` | margin | theme.spacing |
| `mt` | marginTop | theme.spacing |
| `mb` | marginBottom | theme.spacing |
| `ml` | marginLeft | theme.spacing |
| `mr` | marginRight | theme.spacing |
| `ms` | marginInlineStart | theme.spacing |
| `me` | marginInlineEnd | theme.spacing |
| `mx` | marginInline | theme.spacing |
| `my` | marginBlock | theme.spacing |
| `p` | padding | theme.spacing |
| `pt` | paddingTop | theme.spacing |
| `pb` | paddingBottom | theme.spacing |
| `pl` | paddingLeft | theme.spacing |
| `pr` | paddingRight | theme.spacing |
| `ps` | paddingInlineStart | theme.spacing |
| `pe` | paddingInlineEnd | theme.spacing |
| `px` | paddingInline | theme.spacing |
| `py` | paddingBlock | theme.spacing |

### Visual Props

| Prop | CSS Property | Theme Key |
|------|-------------|-----------|
| `bd` | border | – |
| `bdrs` | borderRadius | – |
| `bg` | background | theme.colors |
| `c` | color | – |
| `opacity` | opacity | – |

### Typography Props

| Prop | CSS Property | Theme Key |
|------|-------------|-----------|
| `ff` | fontFamily | – |
| `fz` | fontSize | theme.fontSizes |
| `fw` | fontWeight | – |
| `lts` | letterSpacing | – |
| `ta` | textAlign | – |
| `lh` | lineHeight | theme.lineHeights |
| `fs` | fontStyle | – |
| `tt` | textTransform | – |
| `td` | textDecoration | – |

### Layout Props

| Prop | CSS Property | Theme Key |
|------|-------------|-----------|
| `w` | width | theme.spacing |
| `miw` | minWidth | theme.spacing |
| `maw` | maxWidth | theme.spacing |
| `h` | height | theme.spacing |
| `mih` | minHeight | theme.spacing |
| `mah` | maxHeight | theme.spacing |

### Background Props

| Prop | CSS Property | Theme Key |
|------|-------------|-----------|
| `bgsz` | backgroundSize | – |
| `bgp` | backgroundPosition | – |
| `bgr` | backgroundRepeat | – |
| `bga` | backgroundAttachment | – |

### Position Props

| Prop | CSS Property | Theme Key |
|------|-------------|-----------|
| `pos` | position | – |
| `top` | top | – |
| `left` | left | – |
| `bottom` | bottom | – |
| `right` | right | – |
| `inset` | inset | – |
| `display` | display | – |
| `flex` | flex | – |

## Theme Values

### Spacing Values

```tsx
import { Box } from '@mantine/core';

function SpacingExample() {
  return (
    <>
      {/* margin-top: theme.spacing.xs */}
      <Box mt="xs" />
      
      {/* margin-top: theme.spacing.md * -1 */}
      <Box mt="-md" />
      
      {/* margin-top: auto */}
      <Box mt="auto" />
      
      {/* margin-top: 1rem */}
      <Box mt={16} />
      
      {/* margin-top: 5rem */}
      <Box mt="5rem" />
    </>
  );
}
```

### Color Values

```tsx
import { Box } from '@mantine/core';

function ColorExample() {
  return (
    <>
      {/* color: theme.colors.blue[theme.primaryShade] */}
      <Box c="blue" />
      
      {/* background: theme.colors.orange[1] */}
      <Box bg="orange.1" />
      
      {/* border: 1px solid theme.colors.red[6] */}
      <Box bd="1px solid red.6" />
      
      {/* color: if colorScheme is dark `var(--mantine-color-dark-2)`,
      if color scheme is light `var(--mantine-color-gray-6)` */}
      <Box c="dimmed" />
      
      {/* color: if colorScheme is dark `var(--mantine-color-white)`,
      if color scheme is light `var(--mantine-color-black)` */}
      <Box c="bright" />
      
      {/* background: #EDFEFF */}
      <Box bg="#EDFEFF" />
      
      {/* background: rgba(0, 34, 45, 0.6) */}
      <Box bg="rgba(0, 34, 45, 0.6)" />
    </>
  );
}
```

### Refactorium-Specific Color Usage

```tsx
// CodeExample.tsx
function CodeExample({ variant }: { variant: 'problem' | 'solution' }) {
  return (
    <Box
      p="lg"
      m="md"
      bd="1px solid gray.3"
      bdrs="md"
      c={variant === 'problem' ? 'red.7' : 'green.7'}
      bg={variant === 'problem' ? 'red.0' : 'green.0'}
    >
      Code content
    </Box>
  );
}

// FormField.tsx
function FormField({ error }: { error?: string }) {
  return (
    <Box
      mb="md"
      c={error ? 'red.6' : 'text'}
    >
      <Text fw={500} mb="xs">
        Label
      </Text>
      <TextInput
        c={error ? 'red.6' : 'text'}
        bd={error ? '1px solid red.4' : '1px solid gray.3'}
      />
    </Box>
  );
}
```

## Responsive Styles

### Basic Responsive Usage

```tsx
import { Box } from '@mantine/core';

function ResponsiveExample() {
  return (
    <Box
      w={{ base: 200, sm: 400, lg: 500 }}
      py={{ base: 'xs', sm: 'md', lg: 'xl' }}
      bg={{ base: 'blue.7', sm: 'red.7', lg: 'green.7' }}
      c="#fff"
      ta="center"
      mx="auto"
    >
      Responsive box
    </Box>
  );
}
```

### Refactorium-Specific Responsive Patterns

```tsx
// CodeExampleContainer.tsx
function CodeExampleContainer({ children }: { children: React.ReactNode }) {
  return (
    <Box
      p={{ base: 'sm', sm: 'md', lg: 'lg' }}
      m={{ base: 'xs', sm: 'sm', lg: 'md' }}
      bg="gray.0"
      bd="1px solid gray.3"
      bdrs={{ base: 'sm', sm: 'md', lg: 'lg' }}
      c="text"
    >
      {children}
    </Box>
  );
}

// ResponsiveGrid.tsx
function ResponsiveGrid({ children }: { children: React.ReactNode }) {
  return (
    <Box
      display="grid"
      gap={{ base: 'sm', sm: 'md', lg: 'lg' }}
      style={{
        gridTemplateColumns: '1fr',
        '@media (min-width: 768px)': {
          gridTemplateColumns: 'repeat(2, 1fr)',
        },
        '@media (min-width: 1024px)': {
          gridTemplateColumns: 'repeat(3, 1fr)',
        },
      }}
    >
      {children}
    </Box>
  );
}
```

### Responsive Typography

```tsx
// ResponsiveTitle.tsx
function ResponsiveTitle({ children }: { children: React.ReactNode }) {
  return (
    <Box
      fz={{ base: 'lg', sm: 'xl', lg: '2xl' }}
      fw={600}
      lh={1.2}
      mb={{ base: 'sm', sm: 'md', lg: 'lg' }}
      c="text"
    >
      {children}
    </Box>
  );
}

// ResponsiveText.tsx
function ResponsiveText({ children }: { children: React.ReactNode }) {
  return (
    <Box
      fz={{ base: 'sm', sm: 'md', lg: 'lg' }}
      lh={1.6}
      c="dimmed"
      mb={{ base: 'sm', sm: 'md' }}
    >
      {children}
    </Box>
  );
}
```

## Refactorium-Specific Components

### CodeExample Component

```tsx
// CodeExample.tsx
interface CodeExampleProps {
  code: string;
  language: string;
  variant: 'problem' | 'solution';
  size?: 'sm' | 'md' | 'lg';
}

function CodeExample({ 
  code, 
  language, 
  variant, 
  size = 'md' 
}: CodeExampleProps) {
  const sizeProps = {
    sm: { p: 'sm', fz: 'xs' },
    md: { p: 'md', fz: 'sm' },
    lg: { p: 'lg', fz: 'md' },
  };

  const variantProps = {
    problem: {
      c: 'red.7',
      bg: 'red.0',
      bd: '1px solid red.3',
    },
    solution: {
      c: 'green.7',
      bg: 'green.0',
      bd: '1px solid green.3',
    },
  };

  return (
    <Box
      {...sizeProps[size]}
      {...variantProps[variant]}
      bdrs="md"
      m="md"
      pos="relative"
    >
      <Box
        pos="absolute"
        top={0}
        left={0}
        w={4}
        h="100%"
        bg={variant === 'problem' ? 'red.5' : 'green.5'}
        bdrs="md 0 0 md"
      />
      
      <Box
        pl="md"
        ff="monospace"
        lh={1.5}
      >
        <pre>{code}</pre>
      </Box>
    </Box>
  );
}
```

### FormField Component

```tsx
// FormField.tsx
interface FormFieldProps {
  label: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
}

function FormField({ 
  label, 
  required, 
  error, 
  children 
}: FormFieldProps) {
  return (
    <Box
      mb="md"
      c={error ? 'red.6' : 'text'}
    >
      <Text
        fw={500}
        mb="xs"
        c={required ? 'red.6' : 'text'}
        fz="sm"
      >
        {label}
        {required && ' *'}
      </Text>
      {children}
      {error && (
        <Text
          fz="xs"
          c="red.6"
          mt="xs"
        >
          {error}
        </Text>
      )}
    </Box>
  );
}
```

### Button Variants

```tsx
// ActionButton.tsx
interface ActionButtonProps {
  children: React.ReactNode;
  variant: 'primary' | 'secondary' | 'danger' | 'success';
  size?: 'sm' | 'md' | 'lg';
  onClick: () => void;
}

function ActionButton({ 
  children, 
  variant, 
  size = 'md', 
  onClick 
}: ActionButtonProps) {
  const variantProps = {
    primary: {
      bg: 'blue.6',
      c: 'white',
      bd: 'none',
    },
    secondary: {
      bg: 'gray.2',
      c: 'text',
      bd: '1px solid gray.3',
    },
    danger: {
      bg: 'red.6',
      c: 'white',
      bd: 'none',
    },
    success: {
      bg: 'green.6',
      c: 'white',
      bd: 'none',
    },
  };

  const sizeProps = {
    sm: { px: 'sm', py: 'xs', fz: 'xs' },
    md: { px: 'md', py: 'sm', fz: 'sm' },
    lg: { px: 'lg', py: 'md', fz: 'md' },
  };

  return (
    <Box
      component="button"
      onClick={onClick}
      {...variantProps[variant]}
      {...sizeProps[size]}
      bdrs="sm"
      fw={600}
      ta="center"
      cursor="pointer"
      transition="all 0.2s ease"
      style={{
        '&:hover': {
          opacity: 0.9,
          transform: 'translateY(-1px)',
        },
      }}
    >
      {children}
    </Box>
  );
}
```

### Layout Components

```tsx
// Container.tsx
function Container({ children }: { children: React.ReactNode }) {
  return (
    <Box
      maw={1200}
      mx="auto"
      px={{ base: 'sm', sm: 'md', lg: 'lg' }}
      py={{ base: 'md', sm: 'lg', lg: 'xl' }}
    >
      {children}
    </Box>
  );
}

// Section.tsx
function Section({ 
  children, 
  bg = 'transparent' 
}: { 
  children: React.ReactNode; 
  bg?: string; 
}) {
  return (
    <Box
      bg={bg}
      py={{ base: 'xl', sm: '2xl', lg: '3xl' }}
      px={{ base: 'md', sm: 'lg', lg: 'xl' }}
    >
      {children}
    </Box>
  );
}

// Flex.tsx
function Flex({ 
  children, 
  direction = 'row',
  align = 'center',
  justify = 'flex-start',
  gap = 'md'
}: {
  children: React.ReactNode;
  direction?: 'row' | 'column';
  align?: 'flex-start' | 'center' | 'flex-end';
  justify?: 'flex-start' | 'center' | 'flex-end' | 'space-between';
  gap?: string;
}) {
  return (
    <Box
      display="flex"
      flexDirection={direction}
      alignItems={align}
      justifyContent={justify}
      gap={gap}
    >
      {children}
    </Box>
  );
}
```

## Advanced Patterns

### Conditional Styling

```tsx
// ConditionalCodeExample.tsx
function ConditionalCodeExample({ 
  code, 
  isActive, 
  isDisabled 
}: { 
  code: string; 
  isActive?: boolean; 
  isDisabled?: boolean; 
}) {
  return (
    <Box
      p="lg"
      m="md"
      bg="gray.0"
      bd="1px solid gray.3"
      bdrs="md"
      c="text"
      opacity={isDisabled ? 0.5 : 1}
      cursor={isDisabled ? 'not-allowed' : 'pointer'}
      transform={isActive ? 'scale(1.02)' : 'scale(1)'}
      transition="all 0.2s ease"
      style={{
        '&:hover': {
          transform: isDisabled ? 'scale(1)' : 'scale(1.02)',
          boxShadow: isDisabled ? 'none' : 'var(--mantine-shadow-md)',
        },
      }}
    >
      <pre>{code}</pre>
    </Box>
  );
}
```

### Dynamic Sizing

```tsx
// DynamicCodeBlock.tsx
function DynamicCodeBlock({ 
  code, 
  lines 
}: { 
  code: string; 
  lines: number; 
}) {
  const height = Math.min(lines * 1.5, 20); // Max 20rem
  
  return (
    <Box
      p="md"
      bg="gray.0"
      bd="1px solid gray.3"
      bdrs="sm"
      ff="monospace"
      fz="sm"
      lh={1.5}
      c="text"
      h={`${height}rem`}
      mah="20rem"
      overflow="auto"
    >
      <pre>{code}</pre>
    </Box>
  );
}
```

### Theme-Aware Styling

```tsx
// ThemeAwareBox.tsx
function ThemeAwareBox({ children }: { children: React.ReactNode }) {
  return (
    <Box
      p="lg"
      m="md"
      bg="gray.0"
      bd="1px solid gray.3"
      bdrs="md"
      c="text"
      style={{
        '@media (prefers-color-scheme: dark)': {
          backgroundColor: 'var(--mantine-color-dark-6)',
          borderColor: 'var(--mantine-color-dark-4)',
          color: 'var(--mantine-color-dark-0)',
        },
      }}
    >
      {children}
    </Box>
  );
}
```

## Best Practices for Refactorium

### 1. Use Style Props for Simple Styling

- Prefer style props for common, simple styling needs
- Use CSS modules or Styles API for complex styling
- Keep style props readable and maintainable

### 2. Leverage Theme Values

- Use theme spacing, colors, and typography values
- Ensure consistency across the application
- Take advantage of theme-aware color values

### 3. Responsive Design

- Use responsive style props for different screen sizes
- Test on various devices and screen sizes
- Consider performance implications of responsive props

### 4. Component Composition

- Create reusable components with style props
- Use consistent prop patterns across components
- Document style prop usage for team members

### 5. Performance Considerations

- Avoid responsive style props in large lists
- Use CSS modules for complex styling patterns
- Consider the performance impact of inline styles

### 6. Accessibility

- Ensure sufficient color contrast
- Use appropriate font sizes and spacing
- Test with screen readers and keyboard navigation

### 7. Type Safety

- Define proper TypeScript interfaces
- Use consistent prop naming conventions
- Leverage TypeScript for better development experience

This approach ensures our Code Smell Playground has a flexible, maintainable, and performant styling system using Mantine's style props effectively.
