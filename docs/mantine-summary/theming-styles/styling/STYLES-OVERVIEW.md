# Styles Overview (Refactorium)

This guide covers how to apply styles to Mantine and custom components in our Code Smell Playground project.

## Component-Specific Props

Most Mantine components provide props for style customization. These are the **primary** way to style components.

### Example: Button Component

```tsx
import { Button } from '@mantine/core';

function CodeSmellButton() {
  return (
    <Button 
      variant="filled"    // Controls background, border, text color
      color="blue"        // Sets color palette
      size="md"           // Controls padding, font-size, height
      radius="sm"         // Controls border-radius
    >
      Refactor Code
    </Button>
  );
}
```

### Key Benefits for Refactorium

- **Semantic styling**: `color="blue"` automatically handles light/dark mode
- **Consistent spacing**: `size="md"` ensures uniform component sizing
- **Theme integration**: All props respect our custom theme configuration
- **Accessibility**: Built-in focus states and contrast handling

## Style Props

Style props control **single CSS properties** and work across all Mantine components.

### Common Style Props

| Prop | CSS Property | Example | Use Case |
|------|-------------|---------|----------|
| `c` | `color` | `c="blue.8"` | Text color |
| `fz` | `font-size` | `fz="lg"` | Text size |
| `fw` | `font-weight` | `fw={600}` | Text weight |
| `ta` | `text-align` | `ta="center"` | Text alignment |
| `bg` | `background-color` | `bg="gray.1"` | Background |
| `p` | `padding` | `p="xl"` | Padding |
| `m` | `margin` | `m="md"` | Margin |
| `mt` | `margin-top` | `mt="sm"` | Top margin |
| `mb` | `margin-bottom` | `mb="lg"` | Bottom margin |
| `ml` | `margin-left` | `ml="xs"` | Left margin |
| `mr` | `margin-right` | `mr="md"` | Right margin |

### Refactorium Examples

#### Code Example Headers

```tsx
import { Text, Title } from '@mantine/core';

function CodeExampleHeader({ title, description }) {
  return (
    <div>
      <Title order={3} c="blue.8" fz="lg">
        {title}
      </Title>
      <Text c="dimmed" fz="sm">
        {description}
      </Text>
    </div>
  );
}
```

#### Form Layout

```tsx
import { TextInput, Stack } from '@mantine/core';

function CodeSubmissionForm() {
  return (
    <Stack>
      <TextInput label="Code Title" />
      <TextInput label="Language" mt="md" />
      <TextInput label="Description" mt="md" />
    </Stack>
  );
}
```

#### Card Styling

```tsx
import { Paper, Text } from '@mantine/core';

function CodeSmellCard({ children }) {
  return (
    <Paper p="xl" radius="md" shadow="sm">
      {children}
    </Paper>
  );
}
```

### Style Props Guidelines

- **Limit to 3-4 props per component** - beyond that, use CSS modules
- **Use for quick adjustments** - not primary styling method
- **Prefer semantic props** - `color="blue"` over `c="blue.6"`
- **Consider maintainability** - complex styling belongs in CSS files

## Style Prop

The `style` prop works like React's style prop but with theme integration.

### Single CSS Properties

```tsx
import { Button, Flex } from '@mantine/core';

function ResponsiveButtons() {
  return (
    <Flex>
      <Button style={{ flex: 1 }}>Primary Action</Button>
      <Button>Secondary</Button>
    </Flex>
  );
}
```

### CSS Variables

```tsx
import { Box } from '@mantine/core';

function ThemedCodeBlock({ language, code }) {
  return (
    <Box 
      style={{ 
        '--code-language': language,
        '--code-bg': 'var(--mantine-color-gray-1)'
      }}
    >
      <pre>{code}</pre>
    </Box>
  );
}
```

### Theme Object Access

```tsx
import { Box } from '@mantine/core';

function DynamicStyling({ isActive }) {
  return (
    <Box
      style={(theme) => ({
        backgroundColor: isActive 
          ? theme.colors.blue[6] 
          : theme.colors.gray[2],
        padding: theme.spacing.md,
        borderRadius: theme.radius.sm,
      })}
    >
      Dynamic content
    </Box>
  );
}
```

## CSS Modules (Recommended)

CSS modules are the **most performant and flexible** way to style components in Refactorium.

### File Structure

```
src/
  components/
    code-example/
      CodeExample.module.css
      CodeExample.tsx
      index.ts
```

### CSS Module Example

```css
/* CodeExample.module.css */
.root {
  padding: var(--mantine-spacing-xl);
  border-radius: var(--mantine-radius-md);
  background: var(--mantine-color-body);
  border: 1px solid var(--mantine-color-gray-3);
  
  &[data-language="typescript"] {
    border-left: 4px solid var(--mantine-color-blue-6);
  }
  
  &[data-language="javascript"] {
    border-left: 4px solid var(--mantine-color-yellow-6);
  }
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--mantine-spacing-md);
}

.title {
  color: var(--mantine-color-blue-8);
  font-size: var(--mantine-font-size-lg);
  font-weight: 600;
}

.codeBlock {
  background: var(--mantine-color-gray-0);
  border-radius: var(--mantine-radius-sm);
  padding: var(--mantine-spacing-md);
  font-family: var(--mantine-font-family-monospace);
  
  @media (max-width: $mantine-breakpoint-sm) {
    padding: var(--mantine-spacing-sm);
    font-size: var(--mantine-font-size-sm);
  }
}

.actions {
  display: flex;
  gap: var(--mantine-spacing-sm);
  
  @mixin hover {
    transform: translateY(-1px);
  }
}
```

### Component Usage

```tsx
// CodeExample.tsx
import classes from './CodeExample.module.css';

interface CodeExampleProps {
  title: string;
  language: 'typescript' | 'javascript';
  code: string;
  isActive?: boolean;
}

export function CodeExample({ title, language, code, isActive }: CodeExampleProps) {
  return (
    <div
      className={classes.root}
      data-language={language}
      data-active={isActive || undefined}
    >
      <div className={classes.header}>
        <h3 className={classes.title}>{title}</h3>
        <div className={classes.actions}>
          <Button size="xs">Copy</Button>
          <Button size="xs" variant="light">Refactor</Button>
        </div>
      </div>
      <pre className={classes.codeBlock}>
        <code>{code}</code>
      </pre>
    </div>
  );
}
```

## Theme Tokens

Access Mantine theme values through CSS variables in all styling methods.

### CSS Variables Reference

| Token Type | CSS Variable | Example | Description |
|------------|-------------|---------|-------------|
| Colors | `--mantine-color-{color}-{shade}` | `--mantine-color-blue-6` | Color palette |
| Spacing | `--mantine-spacing-{size}` | `--mantine-spacing-md` | Padding/margins |
| Font Sizes | `--mantine-font-size-{size}` | `--mantine-font-size-lg` | Text sizes |
| Font Families | `--mantine-font-family-{type}` | `--mantine-font-family-headings` | Typography |
| Radius | `--mantine-radius-{size}` | `--mantine-radius-sm` | Border radius |
| Shadows | `--mantine-shadow-{size}` | `--mantine-shadow-md` | Box shadows |
| Breakpoints | `$mantine-breakpoint-{size}` | `$mantine-breakpoint-sm` | Media queries |

### Usage Examples

#### In CSS Modules

```css
.codeContainer {
  /* Color tokens */
  background: var(--mantine-color-gray-0);
  border: 1px solid var(--mantine-color-gray-3);
  color: var(--mantine-color-text);
  
  /* Spacing tokens */
  padding: var(--mantine-spacing-lg);
  margin: var(--mantine-spacing-md) 0;
  
  /* Typography tokens */
  font-family: var(--mantine-font-family-monospace);
  font-size: var(--mantine-font-size-sm);
  
  /* Radius tokens */
  border-radius: var(--mantine-radius-md);
  
  /* Shadow tokens */
  box-shadow: var(--mantine-shadow-sm);
  
  /* Responsive design */
  @media (max-width: $mantine-breakpoint-sm) {
    padding: var(--mantine-spacing-sm);
    font-size: var(--mantine-font-size-xs);
  }
}
```

#### In Style Props

```tsx
import { Box, Text } from '@mantine/core';

function ThemedComponent() {
  return (
    <Box 
      bg="gray.0"           // Shorthand for var(--mantine-color-gray-0)
      p="lg"                // Shorthand for var(--mantine-spacing-lg)
      radius="md"           // Shorthand for var(--mantine-radius-md)
    >
      <Text 
        c="blue.8"          // Shorthand for var(--mantine-color-blue-8)
        fz="lg"             // Shorthand for var(--mantine-font-size-lg)
        fw={600}            // Font weight
      >
        Themed content
      </Text>
    </Box>
  );
}
```

#### In Style Prop

```tsx
import { Box } from '@mantine/core';

function DynamicTheming() {
  return (
    <>
      {/* Using CSS variables directly */}
      <Box
        style={{
          margin: 'var(--mantine-spacing-xl)',
          color: 'var(--mantine-color-orange-5)',
          backgroundColor: 'var(--mantine-color-blue-1)',
        }}
      >
        CSS Variables
      </Box>

      {/* Using theme object */}
      <Box
        style={(theme) => ({
          margin: theme.spacing.xl,
          color: theme.colors.orange[5],
          backgroundColor: theme.colors.blue[1],
        })}
      >
        Theme Object
      </Box>
    </>
  );
}
```

## Refactorium Best Practices

### 1. Styling Hierarchy

1. **Component props** (color, variant, size) - Primary styling
2. **Style props** (c, fz, p, m) - Quick adjustments
3. **CSS modules** - Complex layouts and custom styling
4. **Style prop** - Dynamic values and CSS variables

### 2. Performance Considerations

- Use CSS modules for complex styling
- Limit style props to 3-4 per component
- Leverage theme tokens for consistency
- Use CSS variables for dynamic theming

### 3. Maintainability

- Keep styles close to components
- Use semantic class names
- Document complex CSS patterns
- Follow atomic design principles

### 4. Accessibility

- Ensure proper contrast ratios
- Use focus-visible styles
- Test with keyboard navigation
- Provide meaningful ARIA labels

This styling approach ensures our Code Smell Playground is both performant and maintainable while providing a consistent user experience across all components.
