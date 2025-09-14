# Data Attributes (Refactorium)

This guide covers Mantine's data attributes system and how to use them effectively for styling component states in our Code Smell Playground project.

## Overview

Mantine components use data-* attributes to apply styles based on component state. The general rule is: one class with shared styles and any number of data-* attributes as modifiers.

## Understanding Data Attributes

### Basic Concept

Data attributes are used as CSS selectors to apply styles based on component state:

```css
/* Base styles */
.root {
  border-radius: var(--mantine-radius-md);
  padding: var(--mantine-spacing-md);
  transition: all 0.2s ease;
}

/* State-based styles using data attributes */
.root[data-disabled] {
  opacity: 0.6;
  cursor: not-allowed;
}

.root[data-loading] {
  pointer-events: none;
}

.root[data-error] {
  border-color: var(--mantine-color-red-4);
  background-color: var(--mantine-color-red-0);
}
```

### Refactorium-Specific Patterns

```css
/* CodeExample.module.css */
.codeExample {
  border: 1px solid var(--mantine-color-gray-3);
  border-radius: var(--mantine-radius-md);
  padding: var(--mantine-spacing-lg);
  margin: var(--mantine-spacing-md) 0;
  transition: all 0.2s ease;
}

/* Problem variant */
.codeExample[data-variant="problem"] {
  border-left: 4px solid var(--mantine-color-red-5);
  background-color: var(--mantine-color-red-0);
}

/* Solution variant */
.codeExample[data-variant="solution"] {
  border-left: 4px solid var(--mantine-color-green-5);
  background-color: var(--mantine-color-green-0);
}

/* Active state */
.codeExample[data-active] {
  transform: scale(1.02);
  box-shadow: var(--mantine-shadow-md);
}

/* Disabled state */
.codeExample[data-disabled] {
  opacity: 0.5;
  cursor: not-allowed;
  pointer-events: none;
}
```

## Boolean Data Attributes

### Basic Usage

Boolean data attributes represent component state without values:

```tsx
import { Button } from '@mantine/core';

function DisabledButton() {
  return (
    <Button disabled className="my-button">
      Disabled button
    </Button>
  );
}
```

**Output HTML:**
```html
<button class="my-button" data-disabled>Disabled button</button>
```

### Refactorium-Specific Boolean Attributes

```tsx
// CodeExample.tsx
function CodeExample({ 
  isActive, 
  isDisabled, 
  variant 
}: { 
  isActive?: boolean; 
  isDisabled?: boolean; 
  variant: 'problem' | 'solution'; 
}) {
  return (
    <Box
      className="code-example"
      mod={{
        active: isActive,
        disabled: isDisabled,
        variant: variant,
      }}
    >
      Code content
    </Box>
  );
}
```

**CSS:**
```css
/* CodeExample.module.css */
.codeExample {
  padding: var(--mantine-spacing-lg);
  border-radius: var(--mantine-radius-md);
  transition: all 0.2s ease;
}

.codeExample[data-active] {
  transform: scale(1.02);
  box-shadow: var(--mantine-shadow-md);
}

.codeExample[data-disabled] {
  opacity: 0.5;
  cursor: not-allowed;
  pointer-events: none;
}

.codeExample[data-variant="problem"] {
  border-left: 4px solid var(--mantine-color-red-5);
  background-color: var(--mantine-color-red-0);
}

.codeExample[data-variant="solution"] {
  border-left: 4px solid var(--mantine-color-green-5);
  background-color: var(--mantine-color-green-0);
}
```

## Data Attributes with Values

### Basic Usage

Some data attributes have associated values:

```tsx
import { Button } from '@mantine/core';

function ButtonWithSections() {
  return (
    <Button leftSection="L" rightSection="R">
      Label
    </Button>
  );
}
```

**Output HTML:**
```html
<button>
  <span class="section" data-position="left">L</span>
  Label
  <span class="section" data-position="right">R</span>
</button>
```

### Refactorium-Specific Value Attributes

```tsx
// CodeExampleActions.tsx
function CodeExampleActions({ 
  position, 
  size 
}: { 
  position: 'left' | 'right' | 'center'; 
  size: 'sm' | 'md' | 'lg'; 
}) {
  return (
    <Group
      className="code-actions"
      mod={{
        position: position,
        size: size,
      }}
    >
      <Button size="sm">Explain</Button>
      <Button size="sm">Refactor</Button>
    </Group>
  );
}
```

**CSS:**
```css
/* CodeExampleActions.module.css */
.codeActions {
  display: flex;
  gap: var(--mantine-spacing-sm);
  padding: var(--mantine-spacing-md);
}

.codeActions[data-position="left"] {
  justify-content: flex-start;
}

.codeActions[data-position="center"] {
  justify-content: center;
}

.codeActions[data-position="right"] {
  justify-content: flex-end;
}

.codeActions[data-size="sm"] {
  gap: var(--mantine-spacing-xs);
  padding: var(--mantine-spacing-sm);
}

.codeActions[data-size="md"] {
  gap: var(--mantine-spacing-sm);
  padding: var(--mantine-spacing-md);
}

.codeActions[data-size="lg"] {
  gap: var(--mantine-spacing-md);
  padding: var(--mantine-spacing-lg);
}
```

## Component Data Attributes

### Button Component

```css
/* Button.module.css */
.button {
  border-radius: var(--mantine-radius-sm);
  padding: var(--mantine-spacing-sm) var(--mantine-spacing-md);
  transition: all 0.2s ease;
}

.button[data-disabled] {
  opacity: 0.6;
  cursor: not-allowed;
  pointer-events: none;
}

.button[data-loading] {
  pointer-events: none;
}

.button[data-block] {
  width: 100%;
}

.button[data-with-left-section] {
  padding-left: var(--mantine-spacing-sm);
}

.button[data-with-right-section] {
  padding-right: var(--mantine-spacing-sm);
}

.section {
  display: flex;
  align-items: center;
  justify-content: center;
}

.section[data-position="left"] {
  margin-right: var(--mantine-spacing-xs);
}

.section[data-position="right"] {
  margin-left: var(--mantine-spacing-xs);
}
```

### TextInput Component

```css
/* TextInput.module.css */
.input {
  border: 1px solid var(--mantine-color-gray-3);
  border-radius: var(--mantine-radius-sm);
  padding: var(--mantine-spacing-sm);
  transition: all 0.2s ease;
}

.input[data-error] {
  border-color: var(--mantine-color-red-4);
  background-color: var(--mantine-color-red-0);
}

.input[data-disabled] {
  opacity: 0.6;
  cursor: not-allowed;
  background-color: var(--mantine-color-gray-1);
}

.input[data-invalid] {
  border-color: var(--mantine-color-red-5);
  box-shadow: 0 0 0 1px var(--mantine-color-red-5);
}

.label {
  font-weight: 500;
  margin-bottom: var(--mantine-spacing-xs);
}

.label[data-required] {
  color: var(--mantine-color-red-6);
}

.label[data-error] {
  color: var(--mantine-color-red-6);
}
```

## mod Prop

### Basic Usage

Use the `mod` prop to add custom data attributes:

```tsx
import { Box } from '@mantine/core';

function CustomBox() {
  return (
    <Box mod="data-button">
      Content
    </Box>
  );
}
```

**Output HTML:**
```html
<div data-button>Content</div>
```

### Advanced mod Usage

```tsx
// Multiple data attributes
<Box mod={['button', { opened: true }]} />
// -> <div data-button data-opened />

// Boolean attributes
<Box mod={{ opened: true }} />
// -> <div data-opened />

<Box mod={{ opened: false }} />
// -> <div />

// Value attributes
<Box mod={{ orientation: 'horizontal' }} />
// -> <div data-orientation="horizontal" />
```

### Refactorium-Specific mod Usage

```tsx
// CodeExample.tsx
function CodeExample({ 
  variant, 
  isActive, 
  isDisabled, 
  size 
}: { 
  variant: 'problem' | 'solution'; 
  isActive?: boolean; 
  isDisabled?: boolean; 
  size: 'sm' | 'md' | 'lg'; 
}) {
  return (
    <Box
      className="code-example"
      mod={{
        variant: variant,
        active: isActive,
        disabled: isDisabled,
        size: size,
      }}
    >
      <CodeBlock code={code} language={language} />
      <CodeExampleActions />
    </Box>
  );
}
```

**CSS:**
```css
/* CodeExample.module.css */
.codeExample {
  border: 1px solid var(--mantine-color-gray-3);
  border-radius: var(--mantine-radius-md);
  padding: var(--mantine-spacing-lg);
  margin: var(--mantine-spacing-md) 0;
  transition: all 0.2s ease;
}

.codeExample[data-variant="problem"] {
  border-left: 4px solid var(--mantine-color-red-5);
  background-color: var(--mantine-color-red-0);
}

.codeExample[data-variant="solution"] {
  border-left: 4px solid var(--mantine-color-green-5);
  background-color: var(--mantine-color-green-0);
}

.codeExample[data-active] {
  transform: scale(1.02);
  box-shadow: var(--mantine-shadow-md);
}

.codeExample[data-disabled] {
  opacity: 0.5;
  cursor: not-allowed;
  pointer-events: none;
}

.codeExample[data-size="sm"] {
  padding: var(--mantine-spacing-sm);
  font-size: var(--mantine-font-size-xs);
}

.codeExample[data-size="md"] {
  padding: var(--mantine-spacing-md);
  font-size: var(--mantine-font-size-sm);
}

.codeExample[data-size="lg"] {
  padding: var(--mantine-spacing-lg);
  font-size: var(--mantine-font-size-md);
}
```

## Advanced Patterns

### Nested Data Attributes

```css
/* CodeExample.module.css */
.codeExample {
  border: 1px solid var(--mantine-color-gray-3);
  border-radius: var(--mantine-radius-md);
  padding: var(--mantine-spacing-lg);
}

.codeExample[data-variant="problem"] {
  border-left: 4px solid var(--mantine-color-red-5);
  background-color: var(--mantine-color-red-0);
}

.codeExample[data-variant="problem"][data-active] {
  border-left-color: var(--mantine-color-red-6);
  background-color: var(--mantine-color-red-1);
}

.codeExample[data-variant="solution"] {
  border-left: 4px solid var(--mantine-color-green-5);
  background-color: var(--mantine-color-green-0);
}

.codeExample[data-variant="solution"][data-active] {
  border-left-color: var(--mantine-color-green-6);
  background-color: var(--mantine-color-green-1);
}

.codeExample[data-disabled] {
  opacity: 0.5;
  cursor: not-allowed;
  pointer-events: none;
}

.codeExample[data-disabled] .codeActions {
  opacity: 0.3;
}
```

### Child Element Targeting

```css
/* CodeExample.module.css */
.codeExample {
  border: 1px solid var(--mantine-color-gray-3);
  border-radius: var(--mantine-radius-md);
  padding: var(--mantine-spacing-lg);
}

.codeExample[data-variant="problem"] {
  border-left: 4px solid var(--mantine-color-red-5);
  background-color: var(--mantine-color-red-0);
}

.codeExample[data-variant="problem"] .codeHeader {
  color: var(--mantine-color-red-7);
  font-weight: 600;
}

.codeExample[data-variant="problem"] .codeActions {
  border-top: 1px solid var(--mantine-color-red-2);
}

.codeExample[data-variant="solution"] {
  border-left: 4px solid var(--mantine-color-green-5);
  background-color: var(--mantine-color-green-0);
}

.codeExample[data-variant="solution"] .codeHeader {
  color: var(--mantine-color-green-7);
  font-weight: 600;
}

.codeExample[data-variant="solution"] .codeActions {
  border-top: 1px solid var(--mantine-color-green-2);
}
```

### PostCSS Mixins with Data Attributes

```css
/* CodeExample.module.css */
.codeExample {
  border: 1px solid var(--mantine-color-gray-3);
  border-radius: var(--mantine-radius-md);
  padding: var(--mantine-spacing-lg);
}

.codeExample[data-disabled] {
  @mixin light {
    border-color: var(--mantine-color-gray-2);
    background-color: var(--mantine-color-gray-1);
  }

  @mixin dark {
    border-color: var(--mantine-color-dark-4);
    background-color: var(--mantine-color-dark-6);
  }
}

.codeExample[data-variant="problem"] {
  @mixin light {
    border-left-color: var(--mantine-color-red-5);
    background-color: var(--mantine-color-red-0);
  }

  @mixin dark {
    border-left-color: var(--mantine-color-red-6);
    background-color: var(--mantine-color-red-9);
  }
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
  isActive?: boolean;
  isDisabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

function CodeExample({ 
  code, 
  language, 
  variant, 
  isActive, 
  isDisabled, 
  size = 'md' 
}: CodeExampleProps) {
  return (
    <Box
      className="code-example"
      mod={{
        variant: variant,
        active: isActive,
        disabled: isDisabled,
        size: size,
      }}
    >
      <Box className="code-header">
        <Title order={4}>
          {variant === 'problem' ? 'Problem' : 'Solution'}
        </Title>
      </Box>
      
      <Box className="code-content">
        <CodeBlock code={code} language={language} />
      </Box>
      
      <Box className="code-actions">
        <Button size="sm">Explain</Button>
        <Button size="sm">Refactor</Button>
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
  disabled?: boolean;
  children: React.ReactNode;
}

function FormField({ 
  label, 
  required, 
  error, 
  disabled, 
  children 
}: FormFieldProps) {
  return (
    <Box
      className="form-field"
      mod={{
        required: required,
        error: !!error,
        disabled: disabled,
      }}
    >
      <Text className="form-label">
        {label}
        {required && ' *'}
      </Text>
      {children}
      {error && (
        <Text className="form-error" size="xs" c="red">
          {error}
        </Text>
      )}
    </Box>
  );
}
```

**CSS:**
```css
/* FormField.module.css */
.formField {
  margin-bottom: var(--mantine-spacing-md);
}

.formLabel {
  font-weight: 500;
  margin-bottom: var(--mantine-spacing-xs);
  color: var(--mantine-color-text);
}

.formLabel[data-required] {
  color: var(--mantine-color-red-6);
}

.formLabel[data-error] {
  color: var(--mantine-color-red-6);
}

.formField[data-disabled] .formLabel {
  opacity: 0.6;
  cursor: not-allowed;
}

.formError {
  margin-top: var(--mantine-spacing-xs);
  color: var(--mantine-color-red-6);
}
```

## Best Practices for Refactorium

### 1. Use Semantic Data Attributes

- Choose meaningful attribute names that describe the state
- Use consistent naming conventions across components
- Document data attributes for team members

### 2. Organize CSS by Component

- Group data attribute styles with their base styles
- Use consistent indentation and formatting
- Comment complex data attribute combinations

### 3. Leverage PostCSS Mixins

- Use `@mixin light` and `@mixin dark` for theme-aware styles
- Use `@mixin hover` for interactive states
- Use `@mixin rtl` for RTL support

### 4. Performance Considerations

- Avoid overly specific selectors
- Use data attributes instead of complex class combinations
- Test performance with large numbers of elements

### 5. Accessibility

- Ensure data attributes don't interfere with screen readers
- Test with keyboard navigation
- Validate color contrast for all states

### 6. Testing

- Test all data attribute combinations
- Use data attributes for test selectors
- Ensure consistent behavior across browsers

### 7. Documentation

- Document custom data attributes
- Provide examples for complex patterns
- Keep documentation up to date

This approach ensures our Code Smell Playground has a robust, maintainable, and performant styling system using Mantine's data attributes effectively.
