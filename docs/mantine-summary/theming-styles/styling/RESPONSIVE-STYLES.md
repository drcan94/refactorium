# Responsive Styles (Refactorium)

This guide covers Mantine's responsive design system and how to implement responsive layouts effectively in our Code Smell Playground project.

## Overview

Mantine provides multiple approaches for responsive design: media queries, breakpoint props, responsive style props, and container queries. Each approach has specific use cases and performance considerations.

## Media Queries

### Basic Usage

Use CSS media queries with em units for responsive design:

```css
/* CodeExample.module.css */
.demo {
  background-color: var(--mantine-color-blue-filled);
  color: var(--mantine-color-white);
  padding: var(--mantine-spacing-md);
  text-align: center;

  @media (min-width: em(750px)) {
    background-color: var(--mantine-color-red-filled);
  }
}
```

### Refactorium-Specific Patterns

```css
/* CodeExampleContainer.module.css */
.container {
  padding: var(--mantine-spacing-md);
  margin: var(--mantine-spacing-sm) 0;
  border-radius: var(--mantine-radius-sm);
  
  @media (min-width: em(768px)) {
    padding: var(--mantine-spacing-lg);
    margin: var(--mantine-spacing-md) 0;
  }
  
  @media (min-width: em(1024px)) {
    padding: var(--mantine-spacing-xl);
    margin: var(--mantine-spacing-lg) 0;
  }
}

.codeBlock {
  font-size: var(--mantine-font-size-sm);
  line-height: 1.5;
  
  @media (min-width: em(480px)) {
    font-size: var(--mantine-font-size-md);
  }
  
  @media (min-width: em(768px)) {
    font-size: var(--mantine-font-size-lg);
  }
}

.actions {
  display: flex;
  flex-direction: column;
  gap: var(--mantine-spacing-sm);
  
  @media (min-width: em(768px)) {
    flex-direction: row;
    gap: var(--mantine-spacing-md);
  }
}
```

## Breakpoint Configuration

### Theme Configuration

Configure breakpoints in your theme provider:

```tsx
// src/providers/theme-provider.tsx
const theme = createTheme({
  breakpoints: {
    xs: '30em',   // 480px
    sm: '48em',   // 768px
    md: '64em',   // 1024px
    lg: '74em',   // 1184px
    xl: '90em',   // 1440px
  },
  // ... other theme properties
});
```

### Default Breakpoints

| Breakpoint | Viewport Width | Value in px |
|------------|----------------|-------------|
| xs         | 36em           | 576px       |
| sm         | 48em           | 768px       |
| md         | 62em           | 992px       |
| lg         | 75em           | 1200px      |
| xl         | 88em           | 1408px      |

### PostCSS Configuration

Configure breakpoints in `postcss.config.cjs` for CSS usage:

```js
// postcss.config.cjs
module.exports = {
  plugins: {
    'postcss-preset-mantine': {},
    'postcss-simple-vars': {
      variables: {
        'mantine-breakpoint-xs': '36em',
        'mantine-breakpoint-sm': '48em',
        'mantine-breakpoint-md': '62em',
        'mantine-breakpoint-lg': '75em',
        'mantine-breakpoint-xl': '88em',
      },
    },
  },
};
```

### CSS Usage with Variables

```css
/* CodeExample.module.css */
.demo {
  @media (max-width: $mantine-breakpoint-xs) {
    background-color: red;
  }
  
  @media (min-width: $mantine-breakpoint-sm) {
    background-color: blue;
  }
  
  @media (min-width: $mantine-breakpoint-md) {
    background-color: green;
  }
}
```

## HiddenFrom and VisibleFrom Props

### Basic Usage

Use `hiddenFrom` and `visibleFrom` props for responsive visibility:

```tsx
import { Button, Group } from '@mantine/core';

function ResponsiveButtons() {
  return (
    <Group justify="center">
      <Button hiddenFrom="sm" color="orange">
        Mobile Only
      </Button>
      <Button visibleFrom="sm" color="cyan">
        Desktop Only
      </Button>
      <Button visibleFrom="md" color="pink">
        Large Screens Only
      </Button>
    </Group>
  );
}
```

### Refactorium-Specific Patterns

```tsx
// CodeExampleActions.tsx
function CodeExampleActions() {
  return (
    <Group>
      {/* Mobile: Stack vertically */}
      <Stack gap="sm" hiddenFrom="md">
        <Button size="sm" variant="light">
          Explain
        </Button>
        <Button size="sm" variant="light">
          Refactor
        </Button>
      </Stack>
      
      {/* Desktop: Horizontal layout */}
      <Group gap="md" visibleFrom="md">
        <Button size="md" variant="light">
          Explain Code
        </Button>
        <Button size="md" variant="light">
          Show Refactor
        </Button>
        <Button size="md" variant="light">
          Compare
        </Button>
      </Group>
    </Group>
  );
}
```

### Custom Components with Classes

```tsx
function CustomResponsiveComponent() {
  return (
    <>
      <div className="mantine-hidden-from-md">
        Mobile navigation
      </div>
      <div className="mantine-visible-from-xl">
        Desktop sidebar
      </div>
    </>
  );
}
```

## Component Size Responsiveness

### Multiple Component Instances

Render different component sizes for different screen sizes:

```tsx
import { TextInput } from '@mantine/core';

function ResponsiveInput() {
  return (
    <>
      <TextInput 
        size="xs" 
        hiddenFrom="sm" 
        label="Code Input" 
        placeholder="Enter code..." 
      />
      <TextInput 
        size="md" 
        visibleFrom="sm" 
        hiddenFrom="lg"
        label="Code Input" 
        placeholder="Enter code..." 
      />
      <TextInput 
        size="xl" 
        visibleFrom="lg" 
        label="Code Input" 
        placeholder="Enter code..." 
      />
    </>
  );
}
```

### Refactorium Code Input

```tsx
function CodeInput({ value, onChange }: { value: string; onChange: (value: string) => void }) {
  return (
    <>
      {/* Mobile: Compact input */}
      <Textarea
        size="sm"
        hiddenFrom="md"
        label="Code"
        placeholder="Paste your code here..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        minRows={8}
        maxRows={12}
      />
      
      {/* Desktop: Full-featured input */}
      <Textarea
        size="md"
        visibleFrom="md"
        label="Code"
        placeholder="Paste your code here..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        minRows={12}
        maxRows={20}
        autosize
      />
    </>
  );
}
```

## useMediaQuery Hook

### Basic Usage

Use `useMediaQuery` for conditional rendering (SSR-safe for client-only components):

```tsx
import { Tooltip, Button, em } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';

function ResponsiveTooltip() {
  const isMobile = useMediaQuery(`(max-width: ${em(750)})`);

  return (
    <Tooltip label={isMobile ? 'Mobile' : 'Desktop'}>
      <Button>Hover me</Button>
    </Tooltip>
  );
}
```

### Refactorium-Specific Usage

```tsx
function CodeExampleHeader() {
  const isMobile = useMediaQuery(`(max-width: ${em(768)})`);
  const isTablet = useMediaQuery(`(max-width: ${em(1024)})`);

  return (
    <Group justify="space-between" align="center">
      <Title order={isMobile ? 3 : isTablet ? 2 : 1}>
        Code Smell Example
      </Title>
      
      {!isMobile && (
        <Group gap="sm">
          <Button size="sm" variant="light">
            Explain
          </Button>
          <Button size="sm" variant="light">
            Refactor
          </Button>
        </Group>
      )}
    </Group>
  );
}
```

## useMatches Hook

### Basic Usage

Use `useMatches` for multiple breakpoint values:

```tsx
import { Box, useMatches } from '@mantine/core';

function ResponsiveBox() {
  const color = useMatches({
    base: 'blue.9',
    sm: 'orange.9',
    lg: 'red.9',
  });

  return (
    <Box bg={color} c="white" p="xl">
      Responsive color box
    </Box>
  );
}
```

### Refactorium-Specific Usage

```tsx
function CodeExampleContainer({ children }: { children: React.ReactNode }) {
  const padding = useMatches({
    base: 'sm',
    sm: 'md',
    lg: 'xl',
  });

  const fontSize = useMatches({
    base: 'sm',
    sm: 'md',
    lg: 'lg',
  });

  return (
    <Box
      p={padding}
      fz={fontSize}
      style={{
        backgroundColor: 'var(--mantine-color-gray-0)',
        borderRadius: 'var(--mantine-radius-md)',
        border: '1px solid var(--mantine-color-gray-3)',
      }}
    >
      {children}
    </Box>
  );
}
```

## Container Queries

### Basic Usage

Use container queries for element-based responsive design:

```css
/* CodeExample.module.css */
.root {
  min-width: 200px;
  max-width: 100%;
  min-height: 120px;
  container-type: inline-size;
  overflow: auto;
  resize: horizontal;
}

.child {
  background-color: var(--mantine-color-dimmed);
  color: var(--mantine-color-white);
  padding: var(--mantine-spacing-md);

  @container (max-width: 500px) {
    background-color: var(--mantine-color-blue-filled);
  }

  @container (max-width: 300px) {
    background-color: var(--mantine-color-red-filled);
  }
}
```

### Refactorium-Specific Container Queries

```css
/* CodeExample.module.css */
.codeContainer {
  container-type: inline-size;
  min-width: 300px;
  max-width: 100%;
  border: 1px solid var(--mantine-color-gray-3);
  border-radius: var(--mantine-radius-md);
  overflow: hidden;
}

.codeHeader {
  padding: var(--mantine-spacing-sm);
  background-color: var(--mantine-color-gray-1);
  border-bottom: 1px solid var(--mantine-color-gray-3);
  
  @container (max-width: 400px) {
    padding: var(--mantine-spacing-xs);
    font-size: var(--mantine-font-size-xs);
  }
}

.codeContent {
  padding: var(--mantine-spacing-md);
  font-family: var(--mantine-font-family-monospace);
  font-size: var(--mantine-font-size-sm);
  line-height: 1.5;
  
  @container (max-width: 400px) {
    padding: var(--mantine-spacing-sm);
    font-size: var(--mantine-font-size-xs);
  }
  
  @container (max-width: 300px) {
    padding: var(--mantine-spacing-xs);
    font-size: var(--mantine-font-size-xs);
    line-height: 1.4;
  }
}

.actions {
  padding: var(--mantine-spacing-sm);
  background-color: var(--mantine-color-gray-0);
  border-top: 1px solid var(--mantine-color-gray-3);
  
  @container (max-width: 400px) {
    padding: var(--mantine-spacing-xs);
  }
}
```

## Responsive Style Props

### Basic Usage

Use object syntax for responsive style props:

```tsx
import { Box } from '@mantine/core';

function ResponsiveBox() {
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

### Refactorium-Specific Patterns

```tsx
function CodeExampleCard({ children }: { children: React.ReactNode }) {
  return (
    <Box
      p={{ base: 'sm', sm: 'md', lg: 'xl' }}
      m={{ base: 'xs', sm: 'sm', lg: 'md' }}
      radius={{ base: 'sm', sm: 'md', lg: 'lg' }}
      style={{
        backgroundColor: 'var(--mantine-color-gray-0)',
        border: '1px solid var(--mantine-color-gray-3)',
      }}
    >
      {children}
    </Box>
  );
}

function ResponsiveGrid({ children }: { children: React.ReactNode }) {
  return (
    <Box
      style={{
        display: 'grid',
        gap: 'var(--mantine-spacing-md)',
        gridTemplateColumns: '1fr',
      }}
      style={{
        '@media (min-width: 768px)': {
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: 'var(--mantine-spacing-lg)',
        },
        '@media (min-width: 1024px)': {
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 'var(--mantine-spacing-xl)',
        },
      }}
    >
      {children}
    </Box>
  );
}
```

## Advanced Responsive Patterns

### Responsive Navigation

```tsx
function ResponsiveNavigation() {
  return (
    <Group justify="space-between" align="center" p="md">
      {/* Logo - always visible */}
      <Title order={3}>Refactorium</Title>
      
      {/* Desktop navigation */}
      <Group gap="md" visibleFrom="md">
        <Button variant="subtle">Examples</Button>
        <Button variant="subtle">Tutorials</Button>
        <Button variant="subtle">About</Button>
      </Group>
      
      {/* Mobile menu button */}
      <Button variant="subtle" hiddenFrom="md">
        Menu
      </Button>
    </Group>
  );
}
```

### Responsive Code Layout

```tsx
function ResponsiveCodeLayout({ 
  problemCode, 
  solutionCode 
}: { 
  problemCode: string; 
  solutionCode: string; 
}) {
  return (
    <Box>
      {/* Mobile: Stack vertically */}
      <Stack gap="md" hiddenFrom="md">
        <Box>
          <Title order={4} mb="sm">Problem</Title>
          <CodeBlock code={problemCode} language="javascript" />
        </Box>
        <Box>
          <Title order={4} mb="sm">Solution</Title>
          <CodeBlock code={solutionCode} language="javascript" />
        </Box>
      </Stack>
      
      {/* Desktop: Side by side */}
      <Group gap="lg" visibleFrom="md" align="flex-start">
        <Box style={{ flex: 1 }}>
          <Title order={4} mb="sm">Problem</Title>
          <CodeBlock code={problemCode} language="javascript" />
        </Box>
        <Box style={{ flex: 1 }}>
          <Title order={4} mb="sm">Solution</Title>
          <CodeBlock code={solutionCode} language="javascript" />
        </Box>
      </Group>
    </Box>
  );
}
```

### Responsive Form Layout

```tsx
function ResponsiveForm() {
  return (
    <Box
      p={{ base: 'sm', sm: 'md', lg: 'xl' }}
      style={{
        backgroundColor: 'var(--mantine-color-gray-0)',
        borderRadius: 'var(--mantine-radius-md)',
        border: '1px solid var(--mantine-color-gray-3)',
      }}
    >
      <Title order={3} mb="md">Submit Code Example</Title>
      
      <Stack gap="md">
        <TextInput
          label="Title"
          placeholder="Enter example title..."
          size={{ base: 'sm', sm: 'md' }}
        />
        
        <Textarea
          label="Description"
          placeholder="Describe the code smell..."
          minRows={{ base: 3, sm: 4, lg: 5 }}
          size={{ base: 'sm', sm: 'md' }}
        />
        
        <Textarea
          label="Code"
          placeholder="Paste your code here..."
          minRows={{ base: 8, sm: 10, lg: 12 }}
          size={{ base: 'sm', sm: 'md' }}
        />
        
        <Group justify="flex-end" gap="sm">
          <Button variant="light" size={{ base: 'sm', sm: 'md' }}>
            Cancel
          </Button>
          <Button size={{ base: 'sm', sm: 'md' }}>
            Submit
          </Button>
        </Group>
      </Stack>
    </Box>
  );
}
```

## Best Practices for Refactorium

### 1. Choose the Right Approach

- **Media queries**: For complex responsive layouts and CSS-only solutions
- **hiddenFrom/visibleFrom**: For simple show/hide based on breakpoints
- **Responsive style props**: For simple property changes across breakpoints
- **Container queries**: For element-based responsive design
- **useMediaQuery**: For client-only components (modals, tooltips)

### 2. Mobile-First Design

- Start with mobile layout and enhance for larger screens
- Use `base` values for mobile, then override for larger screens
- Test on actual devices, not just browser dev tools

### 3. Performance Considerations

- Avoid `useMediaQuery` in large lists or frequently re-rendering components
- Use CSS media queries for static responsive styles
- Minimize the number of responsive style props

### 4. Accessibility

- Ensure content is accessible at all screen sizes
- Test with different zoom levels
- Use appropriate touch targets for mobile

### 5. Testing

- Test on actual devices, not just browser dev tools
- Use different screen sizes and orientations
- Test with different browser zoom levels

### 6. Consistency

- Use consistent breakpoints across the project
- Follow the same responsive patterns throughout
- Document responsive behavior for complex components

### 7. Code Organization

- Group responsive styles logically
- Use meaningful class names for responsive variants
- Keep responsive logic close to the component it affects

This approach ensures our Code Smell Playground has a robust, accessible, and performant responsive design system that works across all devices and screen sizes.
