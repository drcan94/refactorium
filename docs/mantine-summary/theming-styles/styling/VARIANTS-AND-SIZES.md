# Variants and Sizes (Refactorium)

This guide covers Mantine's variants and sizes system and how to create custom variants and sizes effectively in our Code Smell Playground project.

## Overview

Mantine components support custom variants and sizes through CSS variables, data attributes, and theme configuration. This allows for extensive customization while maintaining consistency across the application.

## Custom Variants

### Adding New Variants

Create custom variants using data attributes and CSS:

```tsx
// src/providers/theme-provider.tsx
const theme = createTheme({
  components: {
    Input: Input.extend({ 
      classNames: {
        root: 'refactorium-input',
        input: 'refactorium-input-field',
      }
    }),
  },
});
```

```css
/* Input.module.css */
.refactoriumInput {
  position: relative;
}

.refactoriumInputField {
  border: 1px solid var(--mantine-color-gray-3);
  border-radius: var(--mantine-radius-sm);
  padding: var(--mantine-spacing-sm);
  transition: all 0.2s ease;
}

/* Underline variant */
.refactoriumInputField[data-variant="underline"] {
  border: none;
  border-bottom: 2px solid var(--mantine-color-gray-3);
  border-radius: 0;
  background: transparent;
  padding-left: 0;
  padding-right: 0;
}

.refactoriumInputField[data-variant="underline"]:focus {
  border-bottom-color: var(--mantine-color-blue-5);
}

/* Code variant for code inputs */
.refactoriumInputField[data-variant="code"] {
  font-family: var(--mantine-font-family-monospace);
  font-size: var(--mantine-font-size-sm);
  line-height: 1.5;
  background-color: var(--mantine-color-gray-0);
  border: 1px solid var(--mantine-color-gray-3);
}

.refactoriumInputField[data-variant="code"]:focus {
  border-color: var(--mantine-color-blue-5);
  background-color: var(--mantine-color-white);
}
```

### Refactorium-Specific Variants

```tsx
// CodeExampleInput.tsx
function CodeExampleInput({ 
  value, 
  onChange, 
  language 
}: { 
  value: string; 
  onChange: (value: string) => void; 
  language: string; 
}) {
  return (
    <Textarea
      variant="code"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={`Enter ${language} code...`}
      minRows={8}
      maxRows={20}
    />
  );
}
```

### Overriding Existing Variants

```css
/* Override filled variant for code inputs */
.refactoriumInputField[data-variant="filled"] {
  background-color: var(--mantine-color-gray-0);
  border: 1px solid var(--mantine-color-gray-3);
  font-family: var(--mantine-font-family-monospace);
}

.refactoriumInputField[data-variant="filled"]:focus {
  background-color: var(--mantine-color-white);
  border-color: var(--mantine-color-blue-5);
}
```

### TypeScript Support

Create custom variant types:

```typescript
// src/types/mantine.d.ts
import { ButtonVariant, InputVariant } from '@mantine/core';

type ExtendedButtonVariant = ButtonVariant | 'code' | 'danger' | 'success';
type ExtendedInputVariant = InputVariant | 'code' | 'underline';

declare module '@mantine/core' {
  export interface ButtonProps {
    variant?: ExtendedButtonVariant;
  }
  
  export interface InputProps {
    variant?: ExtendedInputVariant;
  }
  
  export interface TextareaProps {
    variant?: ExtendedInputVariant;
  }
}
```

## variantColorResolver

### Basic Usage

Customize colors for variants using `variantColorResolver`:

```tsx
// src/providers/theme-provider.tsx
import { 
  defaultVariantColorsResolver, 
  VariantColorsResolver, 
  parseThemeColor, 
  rgba, 
  darken 
} from '@mantine/core';

const variantColorResolver: VariantColorsResolver = (input) => {
  const defaultResolvedColors = defaultVariantColorsResolver(input);
  const parsedColor = parseThemeColor({
    color: input.color || input.theme.primaryColor,
    theme: input.theme,
  });

  // Override filled variant for specific colors
  if (parsedColor.isThemeColor && parsedColor.color === 'lime' && input.variant === 'filled') {
    return {
      ...defaultResolvedColors,
      color: 'var(--mantine-color-black)',
      hoverColor: 'var(--mantine-color-black)',
    };
  }

  // Add new variants
  if (input.variant === 'code') {
    return {
      background: 'var(--mantine-color-gray-0)',
      hover: 'var(--mantine-color-gray-1)',
      border: '1px solid var(--mantine-color-gray-3)',
      color: 'var(--mantine-color-text)',
    };
  }

  if (input.variant === 'danger') {
    return {
      background: 'var(--mantine-color-red-6)',
      hover: 'var(--mantine-color-red-7)',
      color: 'var(--mantine-color-white)',
      border: 'none',
    };
  }

  if (input.variant === 'success') {
    return {
      background: 'var(--mantine-color-green-6)',
      hover: 'var(--mantine-color-green-7)',
      color: 'var(--mantine-color-white)',
      border: 'none',
    };
  }

  return defaultResolvedColors;
};

const theme = createTheme({
  variantColorResolver,
  // ... other theme properties
});
```

### Refactorium-Specific Color Resolver

```tsx
// src/providers/theme-provider.tsx
const variantColorResolver: VariantColorsResolver = (input) => {
  const defaultResolvedColors = defaultVariantColorsResolver(input);
  const parsedColor = parseThemeColor({
    color: input.color || input.theme.primaryColor,
    theme: input.theme,
  });

  // Code variant for code-related components
  if (input.variant === 'code') {
    return {
      background: 'var(--mantine-color-gray-0)',
      hover: 'var(--mantine-color-gray-1)',
      border: '1px solid var(--mantine-color-gray-3)',
      color: 'var(--mantine-color-text)',
    };
  }

  // Problem variant for highlighting issues
  if (input.variant === 'problem') {
    return {
      background: 'var(--mantine-color-red-0)',
      hover: 'var(--mantine-color-red-1)',
      border: '1px solid var(--mantine-color-red-3)',
      color: 'var(--mantine-color-red-7)',
    };
  }

  // Solution variant for highlighting fixes
  if (input.variant === 'solution') {
    return {
      background: 'var(--mantine-color-green-0)',
      hover: 'var(--mantine-color-green-1)',
      border: '1px solid var(--mantine-color-green-3)',
      color: 'var(--mantine-color-green-7)',
    };
  }

  // Explain variant for educational content
  if (input.variant === 'explain') {
    return {
      background: 'var(--mantine-color-blue-0)',
      hover: 'var(--mantine-color-blue-1)',
      border: '1px solid var(--mantine-color-blue-3)',
      color: 'var(--mantine-color-blue-7)',
    };
  }

  return defaultResolvedColors;
};
```

## Custom Sizes

### CSS Variables Approach

Add custom sizes using CSS variables:

```tsx
// src/providers/theme-provider.tsx
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

### Data Size Attribute Approach

Use data attributes for custom sizes:

```css
/* Button.module.css */
.button {
  border-radius: var(--mantine-radius-sm);
  transition: all 0.2s ease;
}

/* Extra extra small */
.button[data-size="xxs"] {
  height: 24px;
  padding: 0 8px;
  font-size: 10px;
  border-radius: 4px;
}

/* Extra small */
.button[data-size="xs"] {
  height: 30px;
  padding: 0 12px;
  font-size: 12px;
}

/* Small */
.button[data-size="sm"] {
  height: 36px;
  padding: 0 16px;
  font-size: 14px;
}

/* Medium (default) */
.button[data-size="md"] {
  height: 42px;
  padding: 0 20px;
  font-size: 16px;
}

/* Large */
.button[data-size="lg"] {
  height: 50px;
  padding: 0 24px;
  font-size: 18px;
}

/* Extra large */
.button[data-size="xl"] {
  height: 60px;
  padding: 0 32px;
  font-size: 20px;
}

/* Extra extra large */
.button[data-size="xxl"] {
  height: 72px;
  padding: 0 40px;
  font-size: 24px;
  border-radius: var(--mantine-radius-md);
}
```

### Refactorium-Specific Sizes

```tsx
// CodeExampleActions.tsx
function CodeExampleActions() {
  return (
    <Group gap="sm">
      <Button size="xs" variant="code">
        Explain
      </Button>
      <Button size="xs" variant="code">
        Refactor
      </Button>
      <Button size="xs" variant="problem">
        Show Problem
      </Button>
      <Button size="xs" variant="solution">
        Show Solution
      </Button>
    </Group>
  );
}
```

### Static CSS Variables

Override static CSS variables for components:

```css
/* ActionIcon.module.css */
.actionIcon {
  border-radius: var(--mantine-radius-sm);
  transition: all 0.2s ease;
}

/* Override default sizes */
.actionIcon {
  --ai-size-xs: 18px;
  --ai-size-sm: 22px;
  --ai-size-md: 28px;
  --ai-size-lg: 34px;
  --ai-size-xl: 44px;
}

/* Add custom sizes */
.actionIcon[data-size="xxs"] {
  --ai-size: 16px;
  width: var(--ai-size);
  height: var(--ai-size);
}

.actionIcon[data-size="xxl"] {
  --ai-size: 48px;
  width: var(--ai-size);
  height: var(--ai-size);
}
```

## Refactorium-Specific Components

### CodeExample Component

```tsx
// CodeExample.tsx
interface CodeExampleProps {
  code: string;
  language: string;
  variant: 'problem' | 'solution' | 'explain';
  size?: 'sm' | 'md' | 'lg';
}

function CodeExample({ 
  code, 
  language, 
  variant, 
  size = 'md' 
}: CodeExampleProps) {
  return (
    <Box
      className="code-example"
      mod={{
        variant: variant,
        size: size,
      }}
    >
      <Box className="code-header">
        <Title order={4}>
          {variant === 'problem' && 'Problem'}
          {variant === 'solution' && 'Solution'}
          {variant === 'explain' && 'Explanation'}
        </Title>
      </Box>
      
      <Box className="code-content">
        <CodeBlock code={code} language={language} />
      </Box>
      
      <Box className="code-actions">
        <Button size="xs" variant="code">Explain</Button>
        <Button size="xs" variant="code">Refactor</Button>
      </Box>
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

/* Variants */
.codeExample[data-variant="problem"] {
  border-left: 4px solid var(--mantine-color-red-5);
  background-color: var(--mantine-color-red-0);
}

.codeExample[data-variant="solution"] {
  border-left: 4px solid var(--mantine-color-green-5);
  background-color: var(--mantine-color-green-0);
}

.codeExample[data-variant="explain"] {
  border-left: 4px solid var(--mantine-color-blue-5);
  background-color: var(--mantine-color-blue-0);
}

/* Sizes */
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

.codeHeader {
  margin-bottom: var(--mantine-spacing-sm);
}

.codeContent {
  margin-bottom: var(--mantine-spacing-md);
}

.codeActions {
  display: flex;
  gap: var(--mantine-spacing-xs);
  justify-content: flex-end;
}
```

### FormField Component

```tsx
// FormField.tsx
interface FormFieldProps {
  label: string;
  required?: boolean;
  error?: string;
  variant?: 'default' | 'code' | 'underline';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

function FormField({ 
  label, 
  required, 
  error, 
  variant = 'default',
  size = 'md',
  children 
}: FormFieldProps) {
  return (
    <Box
      className="form-field"
      mod={{
        variant: variant,
        size: size,
        required: required,
        error: !!error,
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

.formField[data-size="sm"] .formLabel {
  font-size: var(--mantine-font-size-xs);
}

.formField[data-size="md"] .formLabel {
  font-size: var(--mantine-font-size-sm);
}

.formField[data-size="lg"] .formLabel {
  font-size: var(--mantine-font-size-md);
}

.formError {
  margin-top: var(--mantine-spacing-xs);
  color: var(--mantine-color-red-6);
}
```

## Advanced Patterns

### Responsive Variants

```css
/* Responsive variants */
.codeExample {
  padding: var(--mantine-spacing-md);
  font-size: var(--mantine-font-size-sm);
}

.codeExample[data-size="sm"] {
  padding: var(--mantine-spacing-sm);
  font-size: var(--mantine-font-size-xs);
}

.codeExample[data-size="lg"] {
  padding: var(--mantine-spacing-lg);
  font-size: var(--mantine-font-size-md);
}

@media (min-width: 768px) {
  .codeExample[data-size="sm"] {
    padding: var(--mantine-spacing-md);
    font-size: var(--mantine-font-size-sm);
  }
  
  .codeExample[data-size="lg"] {
    padding: var(--mantine-spacing-xl);
    font-size: var(--mantine-font-size-lg);
  }
}
```

### Theme-Aware Variants

```css
/* Theme-aware variants */
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

.codeExample[data-variant="solution"] {
  @mixin light {
    border-left-color: var(--mantine-color-green-5);
    background-color: var(--mantine-color-green-0);
  }

  @mixin dark {
    border-left-color: var(--mantine-color-green-6);
    background-color: var(--mantine-color-green-9);
  }
}
```

### Interactive Variants

```css
/* Interactive variants */
.codeExample {
  cursor: pointer;
  transition: all 0.2s ease;
}

.codeExample:hover {
  transform: translateY(-2px);
  box-shadow: var(--mantine-shadow-md);
}

.codeExample[data-variant="problem"]:hover {
  border-left-color: var(--mantine-color-red-6);
  background-color: var(--mantine-color-red-1);
}

.codeExample[data-variant="solution"]:hover {
  border-left-color: var(--mantine-color-green-6);
  background-color: var(--mantine-color-green-1);
}
```

## Best Practices for Refactorium

### 1. Use Semantic Variant Names

- Choose names that describe the purpose (problem, solution, explain)
- Use consistent naming conventions across components
- Document custom variants for team members

### 2. Leverage CSS Variables

- Use CSS variables for consistent sizing
- Override static variables when needed
- Create custom variables for complex components

### 3. TypeScript Support

- Define custom variant types
- Extend component interfaces
- Ensure type safety across the application

### 4. Performance Considerations

- Use data attributes for conditional styling
- Avoid complex CSS selectors
- Test performance with large numbers of elements

### 5. Accessibility

- Ensure variants work with screen readers
- Test keyboard navigation
- Validate color contrast for all variants

### 6. Responsive Design

- Consider different screen sizes
- Use responsive variants when appropriate
- Test on various devices

### 7. Documentation

- Document custom variants and sizes
- Provide examples for complex patterns
- Keep documentation up to date

This approach ensures our Code Smell Playground has a robust, maintainable, and performant variant and size system that adapts to our project's specific needs and design requirements.
