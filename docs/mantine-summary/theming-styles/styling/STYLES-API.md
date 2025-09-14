# Styles API (Refactorium)

This guide covers Mantine's Styles API system and how to customize component styles effectively in our Code Smell Playground project.

## Overview

The Styles API is a powerful system that allows you to customize any element inside Mantine components using selectors, classNames, styles, and CSS variables. All Mantine components support this API for comprehensive styling control.

## Styles API Selectors

### Understanding Selectors

Every Mantine component has specific element names (selectors) that can be styled:

```tsx
// Example: Button component selectors
const buttonSelectors = {
  root: '.mantine-Button-root',      // Root element
  loader: '.mantine-Button-loader',  // Loader component
  inner: '.mantine-Button-inner',    // Contains all other elements
  section: '.mantine-Button-section', // Left and right sections
  label: '.mantine-Button-label',    // Button children
};
```

### Finding Selectors

Check the "Styles API" tab in component documentation to find available selectors for each component.

## classNames Prop

### Basic Usage

Apply CSS classes to inner elements using the `classNames` prop:

```tsx
import { Button } from '@mantine/core';

function CustomButton() {
  return (
    <Button
      classNames={{
        root: 'my-root-class',
        label: 'my-label-class',
        inner: 'my-inner-class',
      }}
    >
      Custom Button
    </Button>
  );
}
```

### Refactorium-Specific Patterns

```tsx
// CodeExampleActions.tsx
function CodeExampleActions() {
  return (
    <Group>
      <Button
        classNames={{
          root: 'code-action-button',
          label: 'code-action-label',
          inner: 'code-action-inner',
        }}
      >
        Explain
      </Button>
      <Button
        classNames={{
          root: 'code-action-button',
          label: 'code-action-label',
          inner: 'code-action-inner',
        }}
      >
        Refactor
      </Button>
    </Group>
  );
}
```

### CSS Module Integration

```tsx
// CodeExample.module.css
.codeActionButton {
  background-color: var(--mantine-color-blue-6);
  border: 1px solid var(--mantine-color-blue-7);
  transition: all 0.2s ease;
}

.codeActionButton:hover {
  background-color: var(--mantine-color-blue-7);
  transform: translateY(-1px);
}

.codeActionLabel {
  font-weight: 600;
  font-size: var(--mantine-font-size-sm);
}

.codeActionInner {
  padding: var(--mantine-spacing-sm) var(--mantine-spacing-md);
}
```

```tsx
// CodeExample.tsx
import classes from './CodeExample.module.css';

function CodeExample() {
  return (
    <Button
      classNames={{
        root: classes.codeActionButton,
        label: classes.codeActionLabel,
        inner: classes.codeActionInner,
      }}
    >
      Action
    </Button>
  );
}
```

## styles Prop

### Basic Usage

Apply inline styles to inner elements:

```tsx
import { Button } from '@mantine/core';

function GradientButton() {
  const gradient = 'linear-gradient(45deg, var(--mantine-color-pink-filled) 0%, var(--mantine-color-orange-filled) 50%, var(--mantine-color-yellow-filled) 100%)';

  return (
    <Button
      styles={{
        root: {
          padding: 2,
          border: 0,
          backgroundImage: gradient,
        },
        inner: {
          background: 'var(--mantine-color-body)',
          color: 'var(--mantine-color-text)',
          borderRadius: 'calc(var(--button-radius) - 2px)',
        },
        label: {
          backgroundImage: gradient,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        },
      }}
    >
      Gradient Button
    </Button>
  );
}
```

### Refactorium-Specific Patterns

```tsx
// CodeBlock.tsx
function CodeBlock({ code, language }: { code: string; language: string }) {
  return (
    <Box
      styles={{
        root: {
          backgroundColor: 'var(--mantine-color-gray-0)',
          border: '1px solid var(--mantine-color-gray-3)',
          borderRadius: 'var(--mantine-radius-md)',
          overflow: 'hidden',
        },
        inner: {
          padding: 'var(--mantine-spacing-lg)',
          fontFamily: 'var(--mantine-font-family-monospace)',
          fontSize: 'var(--mantine-font-size-sm)',
          lineHeight: 1.5,
        },
      }}
    >
      <pre>{code}</pre>
    </Box>
  );
}
```

## Theme Components

### Global Component Styling

Define styles for all components of a specific type:

```tsx
// src/providers/theme-provider.tsx
const theme = createTheme({
  components: {
    Button: Button.extend({
      classNames: {
        root: 'refactorium-button',
        label: 'refactorium-button-label',
        inner: 'refactorium-button-inner',
      },
      styles: {
        root: {
          borderRadius: 'var(--mantine-radius-sm)',
          fontWeight: 600,
          transition: 'all 0.2s ease',
        },
        inner: {
          padding: 'var(--mantine-spacing-sm) var(--mantine-spacing-md)',
        },
      },
    }),
    TextInput: TextInput.extend({
      classNames: {
        root: 'refactorium-input',
        input: 'refactorium-input-field',
        label: 'refactorium-input-label',
      },
      styles: {
        root: {
          marginBottom: 'var(--mantine-spacing-md)',
        },
        input: {
          borderRadius: 'var(--mantine-radius-sm)',
          border: '1px solid var(--mantine-color-gray-3)',
          '&:focus': {
            borderColor: 'var(--mantine-color-blue-5)',
            boxShadow: '0 0 0 1px var(--mantine-color-blue-5)',
          },
        },
      },
    }),
  },
});
```

### Refactorium-Specific Theme Components

```tsx
// src/providers/theme-provider.tsx
const theme = createTheme({
  components: {
    // Code example container styling
    Box: Box.extend({
      classNames: {
        root: 'refactorium-box',
      },
      styles: {
        root: {
          '&.code-example': {
            backgroundColor: 'var(--mantine-color-gray-0)',
            border: '1px solid var(--mantine-color-gray-3)',
            borderRadius: 'var(--mantine-radius-md)',
            padding: 'var(--mantine-spacing-lg)',
            margin: 'var(--mantine-spacing-md) 0',
          },
        },
      },
    }),
    
    // Form styling
    Textarea: Textarea.extend({
      classNames: {
        root: 'refactorium-textarea',
        input: 'refactorium-textarea-field',
        label: 'refactorium-textarea-label',
      },
      styles: {
        root: {
          marginBottom: 'var(--mantine-spacing-md)',
        },
        input: {
          fontFamily: 'var(--mantine-font-family-monospace)',
          fontSize: 'var(--mantine-font-size-sm)',
          lineHeight: 1.5,
          borderRadius: 'var(--mantine-radius-sm)',
          border: '1px solid var(--mantine-color-gray-3)',
          '&:focus': {
            borderColor: 'var(--mantine-color-blue-5)',
            boxShadow: '0 0 0 1px var(--mantine-color-blue-5)',
          },
        },
      },
    }),
  },
});
```

## CSS Variables

### Component CSS Variables

Override component-specific CSS variables:

```tsx
// Custom Button sizes
const theme = createTheme({
  components: {
    Button: Button.extend({
      vars: (theme, props) => {
        if (props.size === 'xxl') {
          return {
            root: {
              '--button-height': '60px',
              '--button-padding-x': '30px',
              '--button-fz': '24px',
            },
          };
        }
        if (props.size === 'xxs') {
          return {
            root: {
              '--button-height': '24px',
              '--button-padding-x': '10px',
              '--button-fz': '10px',
            },
          };
        }
        return { root: {} };
      },
    }),
  },
});
```

### Refactorium-Specific CSS Variables

```tsx
// Code example styling with CSS variables
const theme = createTheme({
  components: {
    Box: Box.extend({
      vars: (theme, props) => {
        if (props.className?.includes('code-example')) {
          return {
            root: {
              '--code-example-bg': 'var(--mantine-color-gray-0)',
              '--code-example-border': 'var(--mantine-color-gray-3)',
              '--code-example-radius': 'var(--mantine-radius-md)',
              '--code-example-padding': 'var(--mantine-spacing-lg)',
            },
          };
        }
        return { root: {} };
      },
    }),
  },
});
```

## Dynamic Styling

### Props-Based Styling

Use callback functions for conditional styling based on component props:

```tsx
// src/providers/theme-provider.tsx
const theme = createTheme({
  components: {
    TextInput: TextInput.extend({
      classNames: (theme, props) => ({
        label: props.required ? 'required-label' : 'normal-label',
        input: props.error ? 'error-input' : 'normal-input',
      }),
      styles: (theme, props) => ({
        label: {
          color: props.required ? 'var(--mantine-color-red-6)' : 'var(--mantine-color-text)',
          fontWeight: props.required ? 600 : 400,
        },
        input: {
          borderColor: props.error ? 'var(--mantine-color-red-4)' : 'var(--mantine-color-gray-3)',
          '&:focus': {
            borderColor: props.error ? 'var(--mantine-color-red-5)' : 'var(--mantine-color-blue-5)',
          },
        },
      }),
    }),
  },
});
```

### Refactorium-Specific Dynamic Styling

```tsx
// Code example with variant styling
const theme = createTheme({
  components: {
    Box: Box.extend({
      classNames: (theme, props) => ({
        root: props.variant === 'problem' ? 'problem-code' : 'solution-code',
      }),
      styles: (theme, props) => ({
        root: {
          borderLeft: `4px solid ${
            props.variant === 'problem' 
              ? 'var(--mantine-color-red-5)' 
              : 'var(--mantine-color-green-5)'
          }`,
          backgroundColor: props.variant === 'problem' 
            ? 'var(--mantine-color-red-0)' 
            : 'var(--mantine-color-green-0)',
        },
      }),
    }),
  },
});
```

## Static Classes

### Using Static Classes

Apply styles using static class names:

```css
/* globals.css or component CSS */
.mantine-Button-root {
  background-color: var(--mantine-color-blue-6);
  border-radius: var(--mantine-radius-sm);
  transition: all 0.2s ease;
}

.mantine-Button-root:hover {
  background-color: var(--mantine-color-blue-7);
  transform: translateY(-1px);
}

.mantine-Button-label {
  font-weight: 600;
  font-size: var(--mantine-font-size-sm);
}
```

### Refactorium-Specific Static Classes

```css
/* CodeExample.module.css */
.mantine-Button-root {
  background-color: var(--mantine-color-blue-6);
  border: 1px solid var(--mantine-color-blue-7);
  border-radius: var(--mantine-radius-sm);
  transition: all 0.2s ease;
}

.mantine-Button-root:hover {
  background-color: var(--mantine-color-blue-7);
  transform: translateY(-1px);
  box-shadow: var(--mantine-shadow-sm);
}

.mantine-Button-label {
  font-weight: 600;
  font-size: var(--mantine-font-size-sm);
  color: white;
}

.mantine-TextInput-root {
  margin-bottom: var(--mantine-spacing-md);
}

.mantine-TextInput-input {
  border-radius: var(--mantine-radius-sm);
  border: 1px solid var(--mantine-color-gray-3);
  font-family: var(--mantine-font-family-monospace);
}

.mantine-TextInput-input:focus {
  border-color: var(--mantine-color-blue-5);
  box-shadow: 0 0 0 1px var(--mantine-color-blue-5);
}
```

## Component Classes

### Using Component Classes

Access component classes programmatically:

```tsx
import { Button } from '@mantine/core';

function CustomButton() {
  return (
    <button 
      type="button" 
      className={Button.classes.root}
      style={{
        backgroundColor: 'var(--mantine-color-blue-6)',
        color: 'white',
        padding: 'var(--mantine-spacing-sm) var(--mantine-spacing-md)',
        border: 'none',
        borderRadius: 'var(--mantine-radius-sm)',
      }}
    >
      Custom Button
    </button>
  );
}
```

### Refactorium-Specific Component Classes

```tsx
// Custom code block component
import { Box } from '@mantine/core';

function CustomCodeBlock({ code }: { code: string }) {
  return (
    <div 
      className={Box.classes.root}
      style={{
        backgroundColor: 'var(--mantine-color-gray-0)',
        border: '1px solid var(--mantine-color-gray-3)',
        borderRadius: 'var(--mantine-radius-md)',
        padding: 'var(--mantine-spacing-lg)',
        fontFamily: 'var(--mantine-font-family-monospace)',
        fontSize: 'var(--mantine-font-size-sm)',
        lineHeight: 1.5,
        overflow: 'auto',
      }}
    >
      <pre>{code}</pre>
    </div>
  );
}
```

## Attributes Prop

### Adding Data Attributes

Use the `attributes` prop to add data attributes for testing:

```tsx
import { Button } from '@mantine/core';

function TestableButton() {
  return (
    <Button
      attributes={{
        root: { 'data-test-id': 'submit-button' },
        label: { 'data-test-id': 'submit-button-label' },
        inner: { 'data-test-id': 'submit-button-inner' },
      }}
    >
      Submit
    </Button>
  );
}
```

### Refactorium-Specific Attributes

```tsx
// Code example with testing attributes
function CodeExample({ code, language }: { code: string; language: string }) {
  return (
    <Box
      attributes={{
        root: { 
          'data-test-id': 'code-example',
          'data-language': language,
        },
      }}
      classNames={{
        root: 'code-example',
      }}
    >
      <pre>{code}</pre>
    </Box>
  );
}
```

## Advanced Patterns

### Style Factory Functions

Create reusable style factories:

```tsx
// src/lib/style-factories.ts
export const createCodeExampleStyles = (variant: 'problem' | 'solution') => ({
  root: {
    borderLeft: `4px solid ${
      variant === 'problem' 
        ? 'var(--mantine-color-red-5)' 
        : 'var(--mantine-color-green-5)'
    }`,
    backgroundColor: variant === 'problem' 
      ? 'var(--mantine-color-red-0)' 
      : 'var(--mantine-color-green-0)',
    padding: 'var(--mantine-spacing-lg)',
    borderRadius: 'var(--mantine-radius-md)',
    margin: 'var(--mantine-spacing-md) 0',
  },
  inner: {
    fontFamily: 'var(--mantine-font-family-monospace)',
    fontSize: 'var(--mantine-font-size-sm)',
    lineHeight: 1.5,
  },
});

// Usage
function CodeExample({ variant }: { variant: 'problem' | 'solution' }) {
  return (
    <Box styles={createCodeExampleStyles(variant)}>
      Code content
    </Box>
  );
}
```

### Conditional Styling

```tsx
// Conditional styling based on props
function CodeExample({ 
  variant, 
  isActive, 
  isDisabled 
}: { 
  variant: 'problem' | 'solution';
  isActive?: boolean;
  isDisabled?: boolean;
}) {
  return (
    <Box
      classNames={{
        root: `code-example ${variant} ${isActive ? 'active' : ''} ${isDisabled ? 'disabled' : ''}`,
      }}
      styles={{
        root: {
          opacity: isDisabled ? 0.5 : 1,
          cursor: isDisabled ? 'not-allowed' : 'pointer',
          transform: isActive ? 'scale(1.02)' : 'scale(1)',
          transition: 'all 0.2s ease',
        },
      }}
    >
      Code content
    </Box>
  );
}
```

### Theme-Aware Styling

```tsx
// Theme-aware styling with callback functions
const theme = createTheme({
  components: {
    Box: Box.extend({
      styles: (theme, props) => ({
        root: {
          backgroundColor: theme.colorScheme === 'dark' 
            ? 'var(--mantine-color-dark-6)' 
            : 'var(--mantine-color-gray-0)',
          border: `1px solid ${
            theme.colorScheme === 'dark' 
              ? 'var(--mantine-color-dark-4)' 
              : 'var(--mantine-color-gray-3)'
          }`,
          color: theme.colorScheme === 'dark' 
            ? 'var(--mantine-color-dark-0)' 
            : 'var(--mantine-color-text)',
        },
      }),
    }),
  },
});
```

## Best Practices for Refactorium

### 1. Use classNames for Complex Styling

- Prefer `classNames` over `styles` for complex styling
- Better performance and maintainability
- Easier to debug and modify

### 2. Use styles for Dynamic Values

- Use `styles` for values that change based on props
- Good for simple, one-off styling
- Avoid for complex styling patterns

### 3. Leverage Theme Components

- Define global component styles in theme
- Ensure consistency across the application
- Override specific instances when needed

### 4. Use CSS Variables

- Leverage Mantine's CSS variables for theming
- Create custom CSS variables for component-specific values
- Ensure proper fallbacks and defaults

### 5. Organize Styles

- Group related styles together
- Use meaningful class names
- Document complex styling patterns

### 6. Performance Considerations

- Avoid creating style objects in render
- Use `useMemo` for complex style calculations
- Prefer CSS classes over inline styles

### 7. Testing

- Use `attributes` prop for test selectors
- Ensure styles work across different themes
- Test responsive behavior

This approach ensures our Code Smell Playground has flexible, maintainable, and performant styling using Mantine's Styles API effectively.
