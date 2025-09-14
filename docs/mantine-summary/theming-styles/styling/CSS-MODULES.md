# CSS Modules (Refactorium)

This guide covers CSS modules usage with Mantine components in our Code Smell Playground project, including advanced patterns and best practices.

## Overview

CSS modules provide scoped styling with unique class names, preventing collisions and enabling maintainable component styles. Mantine components are built with CSS modules and work seamlessly with our custom CSS modules.

## Basic Usage

### Creating CSS Modules

```css
/* src/components/CodeExample.module.css */
.container {
  padding: var(--mantine-spacing-lg);
  border-radius: var(--mantine-radius-md);
  background: var(--mantine-color-body);
  border: 1px solid var(--mantine-color-gray-3);
}

.title {
  color: var(--mantine-color-blue-8);
  font-size: var(--mantine-font-size-lg);
  font-weight: 600;
  margin-bottom: var(--mantine-spacing-sm);
}

.codeBlock {
  background: var(--mantine-color-gray-0);
  border-radius: var(--mantine-radius-sm);
  padding: var(--mantine-spacing-md);
  font-family: var(--mantine-font-family-monospace);
  font-size: var(--mantine-font-size-sm);
  line-height: 1.5;
}
```

### Using in Components

```tsx
// src/components/CodeExample.tsx
import { Paper, Title, Text } from '@mantine/core';
import classes from './CodeExample.module.css';

interface CodeExampleProps {
  title: string;
  code: string;
  language: string;
}

export function CodeExample({ title, code, language }: CodeExampleProps) {
  return (
    <Paper className={classes.container}>
      <Title order={3} className={classes.title}>
        {title}
      </Title>
      <pre className={classes.codeBlock}>
        <code>{code}</code>
      </pre>
    </Paper>
  );
}
```

## How CSS Modules Work

### Class Name Generation

```css
/* Button.module.css */
.button {
  color: red;
}

.text {
  color: blue;
}
```

```tsx
import classes from './Button.module.css';

console.log(classes);
// Output: { button: 'button-Xh3s7ER', text: 'text-js65s3Se' }
```

### Scoped Styling

CSS modules automatically generate unique class names, preventing collisions:

```css
/* ComponentA.module.css */
.title { color: red; }

/* ComponentB.module.css */
.title { color: blue; }
```

Both components can use `.title` without conflicts - they'll have different generated class names.

## Global Class References

### Referencing Global Classes

```css
/* CodeExample.module.css */
.container {
  /* Reference global Mantine classes */
  & :global(.mantine-Button-root) {
    margin-top: var(--mantine-spacing-md);
  }
  
  & :global(.mantine-Text-root) {
    color: var(--mantine-color-dimmed);
  }
}
```

### Global Class Targeting

```css
/* ThemeToggle.module.css */
.toggle {
  /* Target specific Mantine component parts */
  & :global(.mantine-ActionIcon-root) {
    transition: all 0.2s ease;
  }
  
  & :global(.mantine-ActionIcon-root:hover) {
    transform: scale(1.05);
  }
}
```

## Styling Mantine Components

### Using className Prop

```tsx
// src/components/RefactorButton.tsx
import { Button } from '@mantine/core';
import classes from './RefactorButton.module.css';

export function RefactorButton({ children, ...props }) {
  return (
    <Button className={classes.button} {...props}>
      {children}
    </Button>
  );
}
```

```css
/* RefactorButton.module.css */
.button {
  background: linear-gradient(45deg, var(--mantine-color-blue-6), var(--mantine-color-cyan-6));
  border: none;
  box-shadow: var(--mantine-shadow-md);
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: var(--mantine-shadow-lg);
  }
}
```

### Using classNames Prop

```tsx
// src/components/CodeInput.tsx
import { TextInput } from '@mantine/core';
import classes from './CodeInput.module.css';

export function CodeInput({ ...props }) {
  return (
    <TextInput
      classNames={{
        root: classes.root,
        input: classes.input,
        label: classes.label,
        error: classes.error,
      }}
      {...props}
    />
  );
}
```

```css
/* CodeInput.module.css */
.root {
  margin-bottom: var(--mantine-spacing-md);
}

.input {
  font-family: var(--mantine-font-family-monospace);
  font-size: var(--mantine-font-size-sm);
  background: var(--mantine-color-gray-0);
  border: 2px solid var(--mantine-color-gray-3);
  
  &:focus {
    border-color: var(--mantine-color-blue-6);
    box-shadow: 0 0 0 2px var(--mantine-color-blue-1);
  }
}

.label {
  font-weight: 600;
  color: var(--mantine-color-blue-8);
  margin-bottom: var(--mantine-spacing-xs);
}

.error {
  color: var(--mantine-color-red-6);
  font-size: var(--mantine-font-size-xs);
}
```

## Advanced Patterns

### Conditional Styling

```tsx
// src/components/CodeSmellCard.tsx
import { Card, Badge } from '@mantine/core';
import classes from './CodeSmellCard.module.css';

interface CodeSmellCardProps {
  title: string;
  severity: 'low' | 'medium' | 'high';
  isActive: boolean;
}

export function CodeSmellCard({ title, severity, isActive }: CodeSmellCardProps) {
  return (
    <Card
      className={`${classes.card} ${isActive ? classes.active : ''}`}
      data-severity={severity}
    >
      <Badge className={classes.badge}>{severity}</Badge>
      <h3 className={classes.title}>{title}</h3>
    </Card>
  );
}
```

```css
/* CodeSmellCard.module.css */
.card {
  padding: var(--mantine-spacing-lg);
  border-radius: var(--mantine-radius-md);
  border: 1px solid var(--mantine-color-gray-3);
  transition: all 0.2s ease;
  cursor: pointer;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: var(--mantine-shadow-md);
  }
  
  &.active {
    border-color: var(--mantine-color-blue-6);
    background: var(--mantine-color-blue-0);
  }
  
  &[data-severity="high"] {
    border-left: 4px solid var(--mantine-color-red-6);
  }
  
  &[data-severity="medium"] {
    border-left: 4px solid var(--mantine-color-yellow-6);
  }
  
  &[data-severity="low"] {
    border-left: 4px solid var(--mantine-color-green-6);
  }
}

.badge {
  margin-bottom: var(--mantine-spacing-sm);
}

.title {
  color: var(--mantine-color-text);
  font-size: var(--mantine-font-size-md);
  font-weight: 600;
}
```

### Responsive Design

```css
/* CodeExample.module.css */
.container {
  padding: var(--mantine-spacing-md);
  
  @media (max-width: $mantine-breakpoint-sm) {
    padding: var(--mantine-spacing-sm);
  }
}

.codeBlock {
  font-size: var(--mantine-font-size-sm);
  
  @media (max-width: $mantine-breakpoint-sm) {
    font-size: var(--mantine-font-size-xs);
    padding: var(--mantine-spacing-sm);
  }
}

.actions {
  display: flex;
  gap: var(--mantine-spacing-sm);
  
  @media (max-width: $mantine-breakpoint-sm) {
    flex-direction: column;
    gap: var(--mantine-spacing-xs);
  }
}
```

### Dark Mode Support

```css
/* ThemeAwareComponent.module.css */
.container {
  background: var(--mantine-color-body);
  color: var(--mantine-color-text);
  border: 1px solid var(--mantine-color-gray-3);
  
  /* Use light-dark() function for complex dark mode styles */
  background: light-dark(
    var(--mantine-color-gray-0),
    var(--mantine-color-dark-7)
  );
  
  border-color: light-dark(
    var(--mantine-color-gray-3),
    var(--mantine-color-dark-4)
  );
}

.highlight {
  background: light-dark(
    var(--mantine-color-blue-1),
    var(--mantine-color-blue-9)
  );
  color: light-dark(
    var(--mantine-color-blue-9),
    var(--mantine-color-blue-1)
  );
}
```

## Refactorium-Specific Patterns

### Code Example Container

```tsx
// src/components/CodeExampleContainer.tsx
import { Paper, Stack, Group, Button } from '@mantine/core';
import classes from './CodeExampleContainer.module.css';

export function CodeExampleContainer({ 
  problemCode, 
  solutionCode, 
  language 
}) {
  return (
    <Paper className={classes.container}>
      <div className={classes.header}>
        <h3 className={classes.title}>Code Refactoring Example</h3>
        <Group className={classes.actions}>
          <Button size="xs" variant="light">Copy</Button>
          <Button size="xs" variant="light">Share</Button>
        </Group>
      </div>
      
      <div className={classes.codeSection}>
        <div className={classes.problemSection}>
          <h4 className={classes.sectionTitle}>Problem</h4>
          <pre className={classes.codeBlock}>
            <code>{problemCode}</code>
          </pre>
        </div>
        
        <div className={classes.solutionSection}>
          <h4 className={classes.sectionTitle}>Solution</h4>
          <pre className={classes.codeBlock}>
            <code>{solutionCode}</code>
          </pre>
        </div>
      </div>
    </Paper>
  );
}
```

```css
/* CodeExampleContainer.module.css */
.container {
  border: 1px solid var(--mantine-color-gray-3);
  border-radius: var(--mantine-radius-md);
  overflow: hidden;
  background: var(--mantine-color-body);
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--mantine-spacing-md);
  background: var(--mantine-color-gray-0);
  border-bottom: 1px solid var(--mantine-color-gray-2);
}

.title {
  color: var(--mantine-color-blue-8);
  font-size: var(--mantine-font-size-lg);
  font-weight: 600;
  margin: 0;
}

.actions {
  gap: var(--mantine-spacing-xs);
}

.codeSection {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--mantine-spacing-md);
  padding: var(--mantine-spacing-md);
  
  @media (max-width: $mantine-breakpoint-md) {
    grid-template-columns: 1fr;
  }
}

.problemSection,
.solutionSection {
  display: flex;
  flex-direction: column;
  gap: var(--mantine-spacing-xs);
}

.sectionTitle {
  color: var(--mantine-color-text);
  font-size: var(--mantine-font-size-sm);
  font-weight: 600;
  margin: 0;
}

.codeBlock {
  background: var(--mantine-color-gray-0);
  border: 1px solid var(--mantine-color-gray-2);
  border-radius: var(--mantine-radius-sm);
  padding: var(--mantine-spacing-md);
  font-family: var(--mantine-font-family-monospace);
  font-size: var(--mantine-font-size-sm);
  line-height: 1.5;
  overflow-x: auto;
  margin: 0;
}
```

### Form Styling

```tsx
// src/components/CodeSubmissionForm.tsx
import { TextInput, Textarea, Button, Stack } from '@mantine/core';
import classes from './CodeSubmissionForm.module.css';

export function CodeSubmissionForm() {
  return (
    <div className={classes.formContainer}>
      <h2 className={classes.formTitle}>Submit Code Example</h2>
      
      <Stack className={classes.formFields}>
        <TextInput
          label="Title"
          placeholder="Enter code example title"
          classNames={{
            root: classes.fieldRoot,
            input: classes.input,
            label: classes.label,
          }}
        />
        
        <Textarea
          label="Description"
          placeholder="Describe the code smell and refactoring"
          rows={3}
          classNames={{
            root: classes.fieldRoot,
            input: classes.textarea,
            label: classes.label,
          }}
        />
        
        <Textarea
          label="Problem Code"
          placeholder="Paste the problematic code here"
          rows={6}
          classNames={{
            root: classes.fieldRoot,
            input: classes.codeInput,
            label: classes.label,
          }}
        />
        
        <Textarea
          label="Solution Code"
          placeholder="Paste the refactored code here"
          rows={6}
          classNames={{
            root: classes.fieldRoot,
            input: classes.codeInput,
            label: classes.label,
          }}
        />
      </Stack>
      
      <div className={classes.formActions}>
        <Button className={classes.submitButton}>Submit Example</Button>
        <Button variant="light" className={classes.cancelButton}>Cancel</Button>
      </div>
    </div>
  );
}
```

```css
/* CodeSubmissionForm.module.css */
.formContainer {
  max-width: 800px;
  margin: 0 auto;
  padding: var(--mantine-spacing-xl);
  background: var(--mantine-color-body);
  border-radius: var(--mantine-radius-lg);
  border: 1px solid var(--mantine-color-gray-3);
}

.formTitle {
  color: var(--mantine-color-blue-8);
  font-size: var(--mantine-font-size-xl);
  font-weight: 700;
  margin-bottom: var(--mantine-spacing-lg);
  text-align: center;
}

.formFields {
  gap: var(--mantine-spacing-md);
}

.fieldRoot {
  margin-bottom: var(--mantine-spacing-sm);
}

.input,
.textarea,
.codeInput {
  border: 2px solid var(--mantine-color-gray-3);
  border-radius: var(--mantine-radius-sm);
  transition: border-color 0.2s ease;
  
  &:focus {
    border-color: var(--mantine-color-blue-6);
    box-shadow: 0 0 0 2px var(--mantine-color-blue-1);
  }
}

.codeInput {
  font-family: var(--mantine-font-family-monospace);
  font-size: var(--mantine-font-size-sm);
  line-height: 1.5;
}

.label {
  color: var(--mantine-color-blue-8);
  font-weight: 600;
  margin-bottom: var(--mantine-spacing-xs);
}

.formActions {
  display: flex;
  gap: var(--mantine-spacing-md);
  justify-content: center;
  margin-top: var(--mantine-spacing-xl);
}

.submitButton {
  background: var(--mantine-color-blue-6);
  border: none;
  padding: var(--mantine-spacing-md) var(--mantine-spacing-xl);
  font-weight: 600;
  
  &:hover {
    background: var(--mantine-color-blue-7);
    transform: translateY(-1px);
  }
}

.cancelButton {
  color: var(--mantine-color-gray-6);
  border: 1px solid var(--mantine-color-gray-3);
  
  &:hover {
    background: var(--mantine-color-gray-0);
  }
}
```

## Alternative Styling Methods

### Utility CSS Libraries

```tsx
// Using Tailwind CSS classes
import { TextInput } from '@mantine/core';

export function UtilityStyledInput() {
  return (
    <TextInput
      classNames={{
        root: 'mt-4',
        input: 'bg-red-500 text-white font-mono',
        label: 'text-blue-800 font-semibold',
      }}
    />
  );
}
```

### Global CSS

```css
/* styles.css */
.mantine-TextInput-root {
  margin-top: var(--mantine-spacing-md);
}

.mantine-TextInput-input {
  background-color: var(--mantine-color-red-filled);
  color: var(--mantine-color-white);
  font-family: var(--mantine-font-family-monospace);
}
```

### Styled Components

```tsx
import styled from '@emotion/styled';
import { Slider } from '@mantine/core';

const StyledSlider = styled(Slider)`
  & .mantine-Slider-bar {
    background-color: var(--mantine-color-pink-5);
  }

  & .mantine-Slider-thumb {
    border-color: var(--mantine-color-pink-5);
    background-color: white;
    width: 1.5rem;
    height: 1.5rem;
  }
`;
```

## Best Practices for Refactorium

### 1. File Organization

```
src/
  components/
    CodeExample/
      CodeExample.module.css
      CodeExample.tsx
      index.ts
    ThemeToggle/
      ThemeToggle.module.css
      index.tsx
```

### 2. Naming Conventions

```css
/* Use descriptive, component-specific names */
.codeExampleContainer { }
.codeExampleHeader { }
.codeExampleActions { }
.refactorButton { }
.submitForm { }
```

### 3. Theme Integration

```css
/* Always use Mantine CSS variables */
.container {
  padding: var(--mantine-spacing-lg);
  color: var(--mantine-color-text);
  background: var(--mantine-color-body);
  border-radius: var(--mantine-radius-md);
}
```

### 4. Responsive Design

```css
/* Use Mantine breakpoints */
.container {
  padding: var(--mantine-spacing-md);
  
  @media (max-width: $mantine-breakpoint-sm) {
    padding: var(--mantine-spacing-sm);
  }
}
```

### 5. Performance

- Keep CSS modules focused and small
- Use CSS variables for dynamic values
- Avoid deep nesting (max 3-4 levels)
- Use `:global()` sparingly

### 6. Maintenance

- Document complex CSS patterns
- Use consistent naming conventions
- Group related styles together
- Regular cleanup of unused styles

This approach ensures our Code Smell Playground has maintainable, performant, and theme-aware styling using CSS modules.
