# Unstyled Components (Refactorium)

This guide covers Mantine's unstyled components system and how to use Mantine as a headless UI library in our Code Smell Playground project.

## Overview

Mantine can be used as a headless UI library by removing default styles and applying custom styling solutions. This provides maximum flexibility for custom design systems while maintaining Mantine's component functionality.

## Headless Mantine Setup

### HeadlessMantineProvider

Use `HeadlessMantineProvider` to remove all Mantine styles:

```tsx
// src/app/layout.tsx
import { HeadlessMantineProvider } from '@mantine/core';
import { ThemeProvider } from '@/providers';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* No ColorSchemeScript needed */}
      </head>
      <body>
        <HeadlessMantineProvider>
          <ThemeProvider>
            {children}
          </ThemeProvider>
        </HeadlessMantineProvider>
      </body>
    </html>
  );
}
```

### Refactorium-Specific Headless Setup

```tsx
// src/providers/headless-provider.tsx
"use client";
import React from "react";
import { HeadlessMantineProvider } from "@mantine/core";

interface HeadlessProviderProps {
  children: React.ReactNode;
}

export function HeadlessProvider({ children }: HeadlessProviderProps) {
  return (
    <HeadlessMantineProvider>
      {children}
    </HeadlessMantineProvider>
  );
}
```

```tsx
// src/providers/index.ts
export * from "./theme-provider";
export * from "./direction-provider";
export * from "./headless-provider";
```

## Headless Limitations

### Features That Don't Work

When using `HeadlessMantineProvider`, the following features are disabled:

- **Color scheme switching**: No dark/light mode support
- **Style-related props**: `color`, `radius`, `size` have no effect
- **Responsive props**: `visibleFrom`/`hiddenFrom` don't work
- **Style props**: Only work with explicit values (`mt={5}` not `mt="xs"`)
- **Some components**: Grid, SimpleGrid, Container become unusable

### Refactorium-Specific Considerations

```tsx
// ❌ These won't work with HeadlessMantineProvider
function ProblematicComponents() {
  return (
    <Box
      color="red"        // ❌ No effect
      radius="md"        // ❌ No effect
      size="lg"          // ❌ No effect
      visibleFrom="md"   // ❌ No effect
      mt="xs"            // ❌ No effect
    >
      Content
    </Box>
  );
}

// ✅ These will work
function WorkingComponents() {
  return (
    <Box
      mt={16}            // ✅ Works with explicit values
      p={24}             // ✅ Works with explicit values
      style={{           // ✅ Works with explicit styles
        backgroundColor: 'red',
        borderRadius: '8px',
        fontSize: '18px',
      }}
    >
      Content
    </Box>
  );
}
```

## Unstyled Prop

### Basic Usage

Use `unstyled` prop to remove styles from individual components:

```tsx
import { Tabs } from '@mantine/core';

function UnstyledTabs() {
  return (
    <Tabs defaultValue="problem" unstyled>
      <Tabs.List>
        <Tabs.Tab value="problem">Problem</Tabs.Tab>
        <Tabs.Tab value="solution">Solution</Tabs.Tab>
        <Tabs.Tab value="explain">Explain</Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel value="problem">
        <CodeExample variant="problem" />
      </Tabs.Panel>
      <Tabs.Panel value="solution">
        <CodeExample variant="solution" />
      </Tabs.Panel>
      <Tabs.Panel value="explain">
        <CodeExample variant="explain" />
      </Tabs.Panel>
    </Tabs>
  );
}
```

### Refactorium-Specific Unstyled Components

```tsx
// CodeExampleTabs.tsx
import { Tabs, Box, Text } from '@mantine/core';
import classes from './CodeExampleTabs.module.css';

interface CodeExampleTabsProps {
  problemCode: string;
  solutionCode: string;
  explanation: string;
  language: string;
}

function CodeExampleTabs({
  problemCode,
  solutionCode,
  explanation,
  language,
}: CodeExampleTabsProps) {
  return (
    <Tabs defaultValue="problem" unstyled className={classes.tabs}>
      <Tabs.List className={classes.tabList}>
        <Tabs.Tab value="problem" className={classes.tab}>
          Problem
        </Tabs.Tab>
        <Tabs.Tab value="solution" className={classes.tab}>
          Solution
        </Tabs.Tab>
        <Tabs.Tab value="explain" className={classes.tab}>
          Explain
        </Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel value="problem" className={classes.tabPanel}>
        <Box className={classes.codeExample} mod={{ variant: 'problem' }}>
          <Text className={classes.codeTitle}>Problem Code</Text>
          <Box className={classes.codeBlock}>
            <pre>{problemCode}</pre>
          </Box>
        </Box>
      </Tabs.Panel>

      <Tabs.Panel value="solution" className={classes.tabPanel}>
        <Box className={classes.codeExample} mod={{ variant: 'solution' }}>
          <Text className={classes.codeTitle}>Solution Code</Text>
          <Box className={classes.codeBlock}>
            <pre>{solutionCode}</pre>
          </Box>
        </Box>
      </Tabs.Panel>

      <Tabs.Panel value="explain" className={classes.tabPanel}>
        <Box className={classes.explanation}>
          <Text className={classes.explanationTitle}>Explanation</Text>
          <Text className={classes.explanationText}>{explanation}</Text>
        </Box>
      </Tabs.Panel>
    </Tabs>
  );
}
```

```css
/* CodeExampleTabs.module.css */
.tabs {
  border: 1px solid var(--mantine-color-gray-3);
  border-radius: var(--mantine-radius-md);
  overflow: hidden;
}

.tabList {
  display: flex;
  background-color: var(--mantine-color-gray-0);
  border-bottom: 1px solid var(--mantine-color-gray-3);
  margin: 0;
  padding: 0;
  list-style: none;
}

.tab {
  flex: 1;
  padding: var(--mantine-spacing-md);
  background: none;
  border: none;
  cursor: pointer;
  font-weight: 500;
  color: var(--mantine-color-text);
  transition: all 0.2s ease;
  border-bottom: 2px solid transparent;
}

.tab:hover {
  background-color: var(--mantine-color-gray-1);
}

.tab[data-active] {
  background-color: var(--mantine-color-white);
  border-bottom-color: var(--mantine-color-blue-5);
  color: var(--mantine-color-blue-7);
}

.tabPanel {
  padding: var(--mantine-spacing-lg);
}

.codeExample {
  border-radius: var(--mantine-radius-sm);
  padding: var(--mantine-spacing-md);
  margin-bottom: var(--mantine-spacing-md);
}

.codeExample[data-variant="problem"] {
  background-color: var(--mantine-color-red-0);
  border-left: 4px solid var(--mantine-color-red-5);
}

.codeExample[data-variant="solution"] {
  background-color: var(--mantine-color-green-0);
  border-left: 4px solid var(--mantine-color-green-5);
}

.codeTitle {
  font-weight: 600;
  margin-bottom: var(--mantine-spacing-sm);
  color: var(--mantine-color-text);
}

.codeBlock {
  font-family: var(--mantine-font-family-monospace);
  font-size: var(--mantine-font-size-sm);
  line-height: 1.5;
  padding: var(--mantine-spacing-md);
  background-color: var(--mantine-color-gray-1);
  border-radius: var(--mantine-radius-sm);
  overflow-x: auto;
}

.explanation {
  background-color: var(--mantine-color-blue-0);
  border-left: 4px solid var(--mantine-color-blue-5);
  padding: var(--mantine-spacing-md);
  border-radius: var(--mantine-radius-sm);
}

.explanationTitle {
  font-weight: 600;
  margin-bottom: var(--mantine-spacing-sm);
  color: var(--mantine-color-blue-7);
}

.explanationText {
  line-height: 1.6;
  color: var(--mantine-color-text);
}
```

## Custom Styling Solutions

### CSS Modules with Unstyled Components

```tsx
// UnstyledButton.tsx
import { Button } from '@mantine/core';
import classes from './UnstyledButton.module.css';

interface UnstyledButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
}

function UnstyledButton({
  children,
  variant = 'primary',
  size = 'md',
  onClick,
}: UnstyledButtonProps) {
  return (
    <Button
      unstyled
      className={`${classes.button} ${classes[variant]} ${classes[size]}`}
      onClick={onClick}
    >
      {children}
    </Button>
  );
}
```

```css
/* UnstyledButton.module.css */
.button {
  border: none;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s ease;
  border-radius: var(--mantine-radius-sm);
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.button.primary {
  background-color: var(--mantine-color-blue-6);
  color: white;
}

.button.primary:hover {
  background-color: var(--mantine-color-blue-7);
}

.button.secondary {
  background-color: var(--mantine-color-gray-2);
  color: var(--mantine-color-text);
}

.button.secondary:hover {
  background-color: var(--mantine-color-gray-3);
}

.button.danger {
  background-color: var(--mantine-color-red-6);
  color: white;
}

.button.danger:hover {
  background-color: var(--mantine-color-red-7);
}

.button.sm {
  padding: var(--mantine-spacing-xs) var(--mantine-spacing-sm);
  font-size: var(--mantine-font-size-xs);
}

.button.md {
  padding: var(--mantine-spacing-sm) var(--mantine-spacing-md);
  font-size: var(--mantine-font-size-sm);
}

.button.lg {
  padding: var(--mantine-spacing-md) var(--mantine-spacing-lg);
  font-size: var(--mantine-font-size-md);
}
```

### Styled Components Integration

```tsx
// StyledCodeExample.tsx
import styled from 'styled-components';
import { Box, Text } from '@mantine/core';

const StyledCodeExample = styled(Box)`
  border: 1px solid ${props => props.theme.colors.gray[3]};
  border-radius: ${props => props.theme.radius.md};
  padding: ${props => props.theme.spacing.lg};
  margin: ${props => props.theme.spacing.md} 0;
  background-color: ${props => props.theme.colors.gray[0]};
  
  &[data-variant="problem"] {
    border-left: 4px solid ${props => props.theme.colors.red[5]};
    background-color: ${props => props.theme.colors.red[0]};
  }
  
  &[data-variant="solution"] {
    border-left: 4px solid ${props => props.theme.colors.green[5]};
    background-color: ${props => props.theme.colors.green[0]};
  }
`;

const CodeBlock = styled(Box)`
  font-family: ${props => props.theme.fontFamily.monospace};
  font-size: ${props => props.theme.fontSizes.sm};
  line-height: 1.5;
  padding: ${props => props.theme.spacing.md};
  background-color: ${props => props.theme.colors.gray[1]};
  border-radius: ${props => props.theme.radius.sm};
  overflow-x: auto;
`;

function StyledCodeExample({ 
  code, 
  variant 
}: { 
  code: string; 
  variant: 'problem' | 'solution'; 
}) {
  return (
    <StyledCodeExample mod={{ variant }}>
      <Text fw={600} mb="sm">
        {variant === 'problem' ? 'Problem' : 'Solution'}
      </Text>
      <CodeBlock component="pre">
        {code}
      </CodeBlock>
    </StyledCodeExample>
  );
}
```

### Tailwind CSS Integration

```tsx
// TailwindCodeExample.tsx
import { Box, Text } from '@mantine/core';

function TailwindCodeExample({ 
  code, 
  variant 
}: { 
  code: string; 
  variant: 'problem' | 'solution'; 
}) {
  const variantClasses = {
    problem: 'border-l-4 border-red-500 bg-red-50',
    solution: 'border-l-4 border-green-500 bg-green-50',
  };

  return (
    <Box
      unstyled
      className={`p-6 m-4 rounded-md border border-gray-300 ${variantClasses[variant]}`}
    >
      <Text 
        unstyled
        className="font-semibold mb-3 text-gray-800"
      >
        {variant === 'problem' ? 'Problem' : 'Solution'}
      </Text>
      <Box
        component="pre"
        unstyled
        className="font-mono text-sm leading-relaxed p-4 bg-gray-100 rounded overflow-x-auto"
      >
        {code}
      </Box>
    </Box>
  );
}
```

## Refactorium-Specific Unstyled Patterns

### Code Example Container

```tsx
// UnstyledCodeExample.tsx
import { Box, Text, Group, Button } from '@mantine/core';
import classes from './UnstyledCodeExample.module.css';

interface UnstyledCodeExampleProps {
  title: string;
  code: string;
  language: string;
  variant: 'problem' | 'solution' | 'explain';
  onExplain?: () => void;
  onRefactor?: () => void;
}

function UnstyledCodeExample({
  title,
  code,
  language,
  variant,
  onExplain,
  onRefactor,
}: UnstyledCodeExampleProps) {
  return (
    <Box
      unstyled
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
          unstyled
          className={classes.actionButton}
          onClick={onExplain}
        >
          Explain
        </Button>
        <Button
          unstyled
          className={classes.actionButton}
          onClick={onRefactor}
        >
          Refactor
        </Button>
      </Group>
    </Box>
  );
}
```

```css
/* UnstyledCodeExample.module.css */
.container {
  border: 1px solid var(--mantine-color-gray-3);
  border-radius: var(--mantine-radius-md);
  padding: var(--mantine-spacing-lg);
  margin: var(--mantine-spacing-md) 0;
  background-color: var(--mantine-color-gray-0);
  position: relative;
}

.container[data-variant="problem"] {
  border-left: 4px solid var(--mantine-color-red-5);
  background-color: var(--mantine-color-red-0);
}

.container[data-variant="solution"] {
  border-left: 4px solid var(--mantine-color-green-5);
  background-color: var(--mantine-color-green-0);
}

.container[data-variant="explain"] {
  border-left: 4px solid var(--mantine-color-blue-5);
  background-color: var(--mantine-color-blue-0);
}

.header {
  margin-bottom: var(--mantine-spacing-md);
}

.title {
  font-weight: 600;
  font-size: var(--mantine-font-size-lg);
  margin-bottom: var(--mantine-spacing-xs);
  color: var(--mantine-color-text);
}

.language {
  font-size: var(--mantine-font-size-sm);
  color: var(--mantine-color-dimmed);
  text-transform: uppercase;
  letter-spacing: 0.5px;
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
  white-space: pre-wrap;
}

.actions {
  display: flex;
  gap: var(--mantine-spacing-sm);
  justify-content: flex-end;
  margin-top: var(--mantine-spacing-md);
  padding-top: var(--mantine-spacing-sm);
  border-top: 1px solid var(--mantine-color-gray-2);
}

.actionButton {
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

.actionButton:hover {
  background-color: var(--mantine-color-gray-1);
  border-color: var(--mantine-color-gray-4);
}
```

### Unstyled Form Components

```tsx
// UnstyledForm.tsx
import { TextInput, Textarea, Button, Stack } from '@mantine/core';
import classes from './UnstyledForm.module.css';

function UnstyledForm() {
  return (
    <Stack className={classes.form}>
      <TextInput
        unstyled
        className={classes.input}
        label="Code Title"
        placeholder="Enter code title..."
      />
      
      <Textarea
        unstyled
        className={classes.textarea}
        label="Description"
        placeholder="Describe the code smell..."
        minRows={3}
      />
      
      <Textarea
        unstyled
        className={classes.codeTextarea}
        label="Code"
        placeholder="Paste your code here..."
        minRows={8}
      />
      
      <Button
        unstyled
        className={classes.submitButton}
      >
        Submit Code Example
      </Button>
    </Stack>
  );
}
```

```css
/* UnstyledForm.module.css */
.form {
  display: flex;
  flex-direction: column;
  gap: var(--mantine-spacing-md);
  padding: var(--mantine-spacing-lg);
  background-color: var(--mantine-color-gray-0);
  border: 1px solid var(--mantine-color-gray-3);
  border-radius: var(--mantine-radius-md);
}

.input,
.textarea,
.codeTextarea {
  display: flex;
  flex-direction: column;
  gap: var(--mantine-spacing-xs);
}

.input input,
.textarea textarea,
.codeTextarea textarea {
  padding: var(--mantine-spacing-sm);
  border: 1px solid var(--mantine-color-gray-3);
  border-radius: var(--mantine-radius-sm);
  font-size: var(--mantine-font-size-sm);
  transition: border-color 0.2s ease;
}

.input input:focus,
.textarea textarea:focus,
.codeTextarea textarea:focus {
  outline: none;
  border-color: var(--mantine-color-blue-5);
  box-shadow: 0 0 0 1px var(--mantine-color-blue-5);
}

.codeTextarea textarea {
  font-family: var(--mantine-font-family-monospace);
  line-height: 1.5;
}

.submitButton {
  padding: var(--mantine-spacing-sm) var(--mantine-spacing-lg);
  background-color: var(--mantine-color-blue-6);
  color: white;
  border: none;
  border-radius: var(--mantine-radius-sm);
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s ease;
  align-self: flex-start;
}

.submitButton:hover {
  background-color: var(--mantine-color-blue-7);
}
```

## Choosing Between Approaches

### When to Use HeadlessMantineProvider

- **Complete custom design system**: When you want full control over styling
- **Existing design system**: When integrating with existing CSS frameworks
- **Performance optimization**: When you want to minimize CSS bundle size
- **Brand consistency**: When Mantine's design doesn't match your brand

### When to Use Unstyled Prop

- **Selective customization**: When only specific components need custom styling
- **Hybrid approach**: When mixing Mantine styles with custom styles
- **Component-specific needs**: When individual components need unique styling
- **Gradual migration**: When slowly transitioning to custom styling

### Refactorium-Specific Recommendations

For our Code Smell Playground:

1. **Use regular MantineProvider** for most components
2. **Use unstyled prop** for code example containers that need custom styling
3. **Use HeadlessMantineProvider** only if building a completely custom design system
4. **Leverage CSS modules** for custom styling with unstyled components

## Best Practices for Refactorium

### 1. Start with Regular Mantine

- Use standard Mantine components for most UI elements
- Only use unstyled when necessary for specific design requirements
- Leverage Mantine's built-in accessibility and functionality

### 2. Use CSS Modules for Custom Styling

- Create consistent styling patterns with CSS modules
- Use CSS variables for theme integration
- Maintain performance with static CSS generation

### 3. Preserve Functionality

- Ensure unstyled components maintain accessibility
- Test keyboard navigation and screen reader compatibility
- Maintain proper ARIA attributes and semantic HTML

### 4. Document Custom Styling

- Document custom styling decisions
- Provide examples for team members
- Maintain consistency across custom components

### 5. Performance Considerations

- Use CSS modules for better performance
- Avoid inline styles in large lists
- Consider bundle size impact of custom styling

This approach ensures our Code Smell Playground has flexible styling options while maintaining the benefits of Mantine's component functionality and accessibility features.
