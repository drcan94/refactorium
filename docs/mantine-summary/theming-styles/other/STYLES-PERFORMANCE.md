# Styles Performance (Refactorium)

This guide covers Mantine's styling performance considerations and best practices for optimizing styles in our Code Smell Playground project.

## Overview

Understanding styling performance is crucial for building fast, scalable applications. Mantine provides multiple styling approaches with different performance characteristics, and choosing the right approach can significantly impact your application's performance.

## CSS Modules (Most Performant)

### Why CSS Modules Are Most Performant

CSS modules generate static CSS that is never re-evaluated, making them the most performant styling approach:

- **Static generation**: Styles are generated at build time
- **No runtime evaluation**: No JavaScript execution for styling
- **Reusable classes**: Single class definition for multiple components
- **Optimized by bundlers**: Dead code elimination and minification

### Basic CSS Modules Usage

```tsx
// CodeExample.module.css
.codeExample {
  border: 1px solid var(--mantine-color-gray-3);
  border-radius: var(--mantine-radius-md);
  padding: var(--mantine-spacing-lg);
  margin: var(--mantine-spacing-md) 0;
  background-color: var(--mantine-color-gray-0);
}

.codeExample[data-variant="problem"] {
  border-left: 4px solid var(--mantine-color-red-5);
  background-color: var(--mantine-color-red-0);
}

.codeExample[data-variant="solution"] {
  border-left: 4px solid var(--mantine-color-green-5);
  background-color: var(--mantine-color-green-0);
}

.highlight {
  background-color: var(--mantine-color-yellow-2);
  padding: 2px 4px;
  border-radius: 2px;
  font-weight: 600;
}
```

```tsx
// CodeExample.tsx
import { Box, Text } from '@mantine/core';
import classes from './CodeExample.module.css';

function CodeExample({ 
  code, 
  variant 
}: { 
  code: string; 
  variant: 'problem' | 'solution'; 
}) {
  return (
    <Box 
      className={classes.codeExample}
      mod={{ variant }}
    >
      <Text>
        Code example with <span className={classes.highlight}>highlighted text</span>
      </Text>
    </Box>
  );
}
```

### Refactorium-Specific CSS Modules

```css
/* CodeBlock.module.css */
.codeBlock {
  font-family: var(--mantine-font-family-monospace);
  font-size: var(--mantine-font-size-sm);
  line-height: 1.5;
  padding: var(--mantine-spacing-md);
  background-color: var(--mantine-color-gray-0);
  border: 1px solid var(--mantine-color-gray-3);
  border-radius: var(--mantine-radius-sm);
  overflow-x: auto;
  white-space: pre-wrap;
}

.codeBlockContainer {
  position: relative;
  margin: var(--mantine-spacing-md) 0;
}

.codeBlockContainer::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 4px;
  height: 100%;
  background-color: var(--mantine-color-blue-5);
  border-radius: var(--mantine-radius-sm) 0 0 var(--mantine-radius-sm);
}

.codeActions {
  display: flex;
  gap: var(--mantine-spacing-sm);
  justify-content: flex-end;
  margin-top: var(--mantine-spacing-md);
  padding-top: var(--mantine-spacing-sm);
  border-top: 1px solid var(--mantine-color-gray-2);
}

.codeActionButton {
  padding: var(--mantine-spacing-xs) var(--mantine-spacing-sm);
  border: 1px solid var(--mantine-color-gray-3);
  border-radius: var(--mantine-radius-sm);
  background-color: transparent;
  color: var(--mantine-color-text);
  font-size: var(--mantine-font-size-xs);
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.codeActionButton:hover {
  background-color: var(--mantine-color-gray-1);
  border-color: var(--mantine-color-gray-4);
}
```

### Using classNames with CSS Modules

```tsx
// CodeExampleInput.tsx
import { TextInput } from '@mantine/core';
import classes from './CodeExampleInput.module.css';

function CodeExampleInput({ 
  value, 
  onChange, 
  error 
}: { 
  value: string; 
  onChange: (value: string) => void; 
  error?: string; 
}) {
  return (
    <TextInput
      label="Code Input"
      placeholder="Paste your code here..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
      error={error}
      classNames={{
        root: classes.root,
        input: classes.input,
        label: classes.label,
        error: classes.error,
      }}
    />
  );
}
```

```css
/* CodeExampleInput.module.css */
.root {
  margin-bottom: var(--mantine-spacing-md);
}

.input {
  font-family: var(--mantine-font-family-monospace);
  font-size: var(--mantine-font-size-sm);
  line-height: 1.5;
  border-radius: var(--mantine-radius-sm);
  border: 1px solid var(--mantine-color-gray-3);
  padding: var(--mantine-spacing-sm);
}

.input:focus {
  border-color: var(--mantine-color-blue-5);
  box-shadow: 0 0 0 1px var(--mantine-color-blue-5);
}

.label {
  font-weight: 500;
  margin-bottom: var(--mantine-spacing-xs);
  color: var(--mantine-color-text);
}

.error {
  color: var(--mantine-color-red-6);
  font-size: var(--mantine-font-size-xs);
  margin-top: var(--mantine-spacing-xs);
}
```

## Inline Styles (Moderate Performance)

### When to Use Inline Styles

Inline styles are less performant than CSS modules but still acceptable for:

- **Dynamic styling**: Values that change based on props or state
- **One-off styling**: Unique styles that won't be reused
- **Simple styling**: 1-3 style properties per component
- **Prototyping**: Quick styling during development

### Inline Styles Example

```tsx
// DynamicCodeExample.tsx
import { Box, Text } from '@mantine/core';

function DynamicCodeExample({ 
  code, 
  variant, 
  intensity 
}: { 
  code: string; 
  variant: 'problem' | 'solution'; 
  intensity: number; 
}) {
  const variantColors = {
    problem: '#e03131',
    solution: '#2f9e44',
  };

  const baseColor = variantColors[variant];
  const backgroundColor = `rgba(${parseInt(baseColor.slice(1, 3), 16)}, ${parseInt(baseColor.slice(3, 5), 16)}, ${parseInt(baseColor.slice(5, 7), 16)}, ${intensity * 0.1})`;
  const borderColor = `rgba(${parseInt(baseColor.slice(1, 3), 16)}, ${parseInt(baseColor.slice(3, 5), 16)}, ${parseInt(baseColor.slice(5, 7), 16)}, ${intensity * 0.3})`;

  return (
    <Box
      p="lg"
      bg={backgroundColor}
      bd={`2px solid ${borderColor}`}
      bdrs="md"
      style={{
        transform: `scale(${1 + intensity * 0.02})`,
        boxShadow: `0 4px 12px ${borderColor}`,
      }}
    >
      <Text fw={600} c={baseColor} mb="sm">
        {variant === 'problem' ? 'Problem' : 'Solution'}
      </Text>
      <Box
        component="pre"
        ff="monospace"
        fz="sm"
        p="md"
        bg="rgba(0, 0, 0, 0.05)"
        bdrs="sm"
      >
        {code}
      </Box>
    </Box>
  );
}
```

### Refactorium-Specific Inline Styles

```tsx
// CodeExampleWithGradient.tsx
import { Box, Text, Button } from '@mantine/core';

function CodeExampleWithGradient({ 
  code, 
  language 
}: { 
  code: string; 
  language: string; 
}) {
  const gradient = `linear-gradient(135deg, var(--mantine-color-blue-6) 0%, var(--mantine-color-purple-6) 100%)`;

  return (
    <Box
      p="lg"
      bdrs="md"
      style={{
        background: gradient,
        color: 'white',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <Box
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(1px)',
        }}
      />
      
      <Text fw={600} mb="sm" style={{ position: 'relative', zIndex: 1 }}>
        {language} Code Example
      </Text>
      
      <Box
        component="pre"
        ff="monospace"
        fz="sm"
        p="md"
        bg="rgba(0, 0, 0, 0.2)"
        bdrs="sm"
        style={{ position: 'relative', zIndex: 1 }}
      >
        {code}
      </Box>
    </Box>
  );
}
```

## Style Props (Moderate Performance)

### When to Use Style Props

Style props are good for:

- **Simple styling**: 1-3 style properties
- **Quick styling**: Rapid development and prototyping
- **Dynamic values**: Values that change based on props
- **Responsive design**: Simple responsive adjustments

### Style Props Example

```tsx
// CodeExampleCard.tsx
import { Box, Text, Group, Button } from '@mantine/core';

function CodeExampleCard({ 
  title, 
  code, 
  variant 
}: { 
  title: string; 
  code: string; 
  variant: 'problem' | 'solution'; 
}) {
  const variantProps = {
    problem: {
      bg: 'red.0',
      c: 'red.7',
      bd: '1px solid red.3',
    },
    solution: {
      bg: 'green.0',
      c: 'green.7',
      bd: '1px solid green.3',
    },
  };

  return (
    <Box
      p="lg"
      m="md"
      bdrs="md"
      {...variantProps[variant]}
    >
      <Text fw={600} mb="sm">
        {title}
      </Text>
      
      <Box
        component="pre"
        ff="monospace"
        fz="sm"
        p="md"
        bg="gray.1"
        bdrs="sm"
        mb="md"
      >
        {code}
      </Box>
      
      <Group gap="sm" justify="flex-end">
        <Button size="sm" variant="light">
          Explain
        </Button>
        <Button size="sm" variant="light">
          Refactor
        </Button>
      </Group>
    </Box>
  );
}
```

### Refactorium-Specific Style Props

```tsx
// CodeExampleGrid.tsx
import { Box, Text, Group } from '@mantine/core';

function CodeExampleGrid({ 
  examples 
}: { 
  examples: Array<{ title: string; code: string; variant: 'problem' | 'solution' }> 
}) {
  return (
    <Box
      display="grid"
      gap="md"
      style={{
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      }}
    >
      {examples.map((example, index) => (
        <Box
          key={index}
          p="lg"
          bg="gray.0"
          bd="1px solid gray.3"
          bdrs="md"
          style={{
            borderLeft: `4px solid ${example.variant === 'problem' ? 'var(--mantine-color-red-5)' : 'var(--mantine-color-green-5)'}`,
          }}
        >
          <Text fw={600} mb="sm">
            {example.title}
          </Text>
          
          <Box
            component="pre"
            ff="monospace"
            fz="sm"
            p="md"
            bg="gray.1"
            bdrs="sm"
          >
            {example.code}
          </Box>
        </Box>
      ))}
    </Box>
  );
}
```

## Responsive Style Props (Lower Performance)

### When to Avoid Responsive Style Props

Responsive style props have worse performance because they:

- **Generate style tags**: Each component creates a `<style />` tag
- **Increase bundle size**: More CSS in the output
- **Impact large lists**: Performance degrades with many components

### Good Usage (Few Components)

```tsx
// CodeExampleLayout.tsx
import { Box, Text, Group } from '@mantine/core';

function CodeExampleLayout({ 
  children 
}: { 
  children: React.ReactNode; 
}) {
  return (
    <Box
      p={{ base: 'sm', sm: 'md', lg: 'lg' }}
      m={{ base: 'xs', sm: 'sm', lg: 'md' }}
      bg="gray.0"
      bd="1px solid gray.3"
      bdrs={{ base: 'sm', sm: 'md', lg: 'lg' }}
    >
      <Text
        fz={{ base: 'sm', sm: 'md', lg: 'lg' }}
        fw={600}
        mb={{ base: 'sm', sm: 'md' }}
      >
        Code Example
      </Text>
      
      {children}
    </Box>
  );
}
```

### Bad Usage (Many Components)

```tsx
// ❌ Don't do this with many components
function CodeExampleList({ examples }: { examples: any[] }) {
  return (
    <Box>
      {examples.map((example, index) => (
        <Box
          key={index}
          p={{ base: 'sm', sm: 'md', lg: 'lg' }} // ❌ Creates style tag for each
          m={{ base: 'xs', sm: 'sm', lg: 'md' }} // ❌ Creates style tag for each
          bg="gray.0"
          bd="1px solid gray.3"
          bdrs={{ base: 'sm', sm: 'md', lg: 'lg' }} // ❌ Creates style tag for each
        >
          {example.content}
        </Box>
      ))}
    </Box>
  );
}
```

### Better Approach (CSS Modules)

```tsx
// ✅ Better approach with CSS modules
import classes from './CodeExampleList.module.css';

function CodeExampleList({ examples }: { examples: any[] }) {
  return (
    <Box className={classes.container}>
      {examples.map((example, index) => (
        <Box
          key={index}
          className={classes.exampleItem}
        >
          {example.content}
        </Box>
      ))}
    </Box>
  );
}
```

```css
/* CodeExampleList.module.css */
.container {
  display: flex;
  flex-direction: column;
  gap: var(--mantine-spacing-md);
}

.exampleItem {
  padding: var(--mantine-spacing-sm);
  margin: var(--mantine-spacing-xs);
  background-color: var(--mantine-color-gray-0);
  border: 1px solid var(--mantine-color-gray-3);
  border-radius: var(--mantine-radius-sm);
}

@media (min-width: 768px) {
  .exampleItem {
    padding: var(--mantine-spacing-md);
    margin: var(--mantine-spacing-sm);
    border-radius: var(--mantine-radius-md);
  }
}

@media (min-width: 1024px) {
  .exampleItem {
    padding: var(--mantine-spacing-lg);
    margin: var(--mantine-spacing-md);
    border-radius: var(--mantine-radius-lg);
  }
}
```

## Performance Optimization Strategies

### 1. Use CSS Modules for Reusable Styles

```tsx
// ✅ Good: CSS modules for reusable styles
import classes from './CodeExample.module.css';

function CodeExample({ code }: { code: string }) {
  return (
    <Box className={classes.codeExample}>
      <pre className={classes.codeBlock}>{code}</pre>
    </Box>
  );
}
```

### 2. Use Style Props for Simple, Dynamic Styles

```tsx
// ✅ Good: Style props for simple dynamic styles
function CodeExample({ variant }: { variant: 'problem' | 'solution' }) {
  return (
    <Box
      bg={variant === 'problem' ? 'red.0' : 'green.0'}
      c={variant === 'problem' ? 'red.7' : 'green.7'}
      p="md"
    >
      Content
    </Box>
  );
}
```

### 3. Avoid Responsive Style Props in Large Lists

```tsx
// ❌ Bad: Responsive style props in large lists
function CodeExampleGrid({ examples }: { examples: any[] }) {
  return (
    <Box>
      {examples.map((example, index) => (
        <Box
          key={index}
          p={{ base: 'sm', md: 'lg' }} // ❌ Creates many style tags
        >
          {example.content}
        </Box>
      ))}
    </Box>
  );
}

// ✅ Good: CSS modules for large lists
function CodeExampleGrid({ examples }: { examples: any[] }) {
  return (
    <Box className={classes.grid}>
      {examples.map((example, index) => (
        <Box key={index} className={classes.gridItem}>
          {example.content}
        </Box>
      ))}
    </Box>
  );
}
```

### 4. Optimize Bundle Size

```tsx
// ✅ Good: Import only needed components
import { Box, Text, Button } from '@mantine/core';

// ❌ Bad: Import entire library
import * as Mantine from '@mantine/core';
```

### 5. Use CSS Variables for Theme Values

```css
/* ✅ Good: Use CSS variables */
.codeExample {
  background-color: var(--mantine-color-gray-0);
  color: var(--mantine-color-text);
  padding: var(--mantine-spacing-md);
}

/* ❌ Bad: Hardcoded values */
.codeExample {
  background-color: #f8f9fa;
  color: #212529;
  padding: 16px;
}
```

## Refactorium-Specific Performance Patterns

### Code Example Performance

```tsx
// CodeExampleContainer.tsx
import { Box, Text, Group, Button } from '@mantine/core';
import classes from './CodeExampleContainer.module.css';

interface CodeExampleContainerProps {
  title: string;
  code: string;
  language: string;
  variant: 'problem' | 'solution';
  onExplain?: () => void;
  onRefactor?: () => void;
}

function CodeExampleContainer({
  title,
  code,
  language,
  variant,
  onExplain,
  onRefactor,
}: CodeExampleContainerProps) {
  return (
    <Box
      className={classes.container}
      mod={{ variant }}
    >
      <Box className={classes.header}>
        <Text className={classes.title}>{title}</Text>
        <Text className={classes.language}>{language}</Text>
      </Box>
      
      <Box className={classes.codeBlock}>
        <pre>{code}</pre>
      </Box>
      
      <Group className={classes.actions}>
        <Button
          size="sm"
          variant="light"
          onClick={onExplain}
          className={classes.actionButton}
        >
          Explain
        </Button>
        <Button
          size="sm"
          variant="light"
          onClick={onRefactor}
          className={classes.actionButton}
        >
          Refactor
        </Button>
      </Group>
    </Box>
  );
}
```

```css
/* CodeExampleContainer.module.css */
.container {
  border: 1px solid var(--mantine-color-gray-3);
  border-radius: var(--mantine-radius-md);
  padding: var(--mantine-spacing-lg);
  margin: var(--mantine-spacing-md) 0;
  background-color: var(--mantine-color-gray-0);
}

.container[data-variant="problem"] {
  border-left: 4px solid var(--mantine-color-red-5);
  background-color: var(--mantine-color-red-0);
}

.container[data-variant="solution"] {
  border-left: 4px solid var(--mantine-color-green-5);
  background-color: var(--mantine-color-green-0);
}

.header {
  margin-bottom: var(--mantine-spacing-md);
}

.title {
  font-weight: 600;
  font-size: var(--mantine-font-size-lg);
  margin-bottom: var(--mantine-spacing-xs);
}

.language {
  font-size: var(--mantine-font-size-sm);
  color: var(--mantine-color-dimmed);
}

.codeBlock {
  font-family: var(--mantine-font-family-monospace);
  font-size: var(--mantine-font-size-sm);
  line-height: 1.5;
  padding: var(--mantine-spacing-md);
  background-color: var(--mantine-color-gray-1);
  border-radius: var(--mantine-radius-sm);
  margin-bottom: var(--mantine-spacing-md);
  overflow-x: auto;
}

.actions {
  justify-content: flex-end;
  gap: var(--mantine-spacing-sm);
}

.actionButton {
  font-size: var(--mantine-font-size-xs);
  padding: var(--mantine-spacing-xs) var(--mantine-spacing-sm);
}
```

## Best Practices for Refactorium

### 1. Performance Hierarchy

1. **CSS Modules** - For reusable, static styles
2. **Style Props** - For simple, dynamic styles (1-3 properties)
3. **Inline Styles** - For complex, one-off dynamic styles
4. **Responsive Style Props** - Only for few components, avoid in large lists

### 2. Bundle Optimization

- Import only needed Mantine components
- Use CSS variables for theme values
- Minimize responsive style props usage
- Leverage tree shaking

### 3. Development vs Production

- Use style props for rapid prototyping
- Refactor to CSS modules for production
- Test performance with large datasets
- Monitor bundle size impact

### 4. Code Organization

- Group related styles in CSS modules
- Use consistent naming conventions
- Document performance considerations
- Regular performance audits

### 5. Testing Performance

- Test with large lists of components
- Measure bundle size impact
- Profile runtime performance
- Use performance monitoring tools

This approach ensures our Code Smell Playground has optimal styling performance while maintaining flexibility and maintainability.
