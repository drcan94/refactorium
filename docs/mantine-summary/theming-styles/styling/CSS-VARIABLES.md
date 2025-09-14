# Mantine CSS Variables (Refactorium)

This guide covers all Mantine CSS variables and how to use them effectively in our Code Smell Playground project.

## Overview

Mantine exposes all theme values as CSS variables, making them available throughout your application. These variables are automatically generated based on your theme configuration.

## Typography Variables

### Font Family Variables

```css
/* Font family variables */
--mantine-font-family              /* Main font family */
--mantine-font-family-monospace    /* Monospace font family */
--mantine-font-family-headings     /* Headings font family */
```

### Our Theme Configuration

```tsx
// src/providers/theme-provider.tsx
const theme = createTheme({
  fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, Noto Sans, Helvetica, Arial, sans-serif",
  fontFamilyMonospace: "ui-monospace, SFMono-Regular, 'SF Mono', Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  headings: {
    fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, Noto Sans, Helvetica, Arial, sans-serif",
    fontWeight: "600",
    textWrap: "balance",
  },
});
```

### Using Font Family Variables

```css
/* CodeExample.module.css */
.container {
  font-family: var(--mantine-font-family);
}

.codeBlock {
  font-family: var(--mantine-font-family-monospace);
}

.title {
  font-family: var(--mantine-font-family-headings);
}
```

```tsx
// Style props usage
<Text ff="monospace">Code content</Text>
<Text ff="heading">Heading text</Text>
```

### Font Size Variables

```css
/* Font size variables */
--mantine-font-size-xs     /* 0.75rem (12px) */
--mantine-font-size-sm     /* 0.875rem (14px) */
--mantine-font-size-md     /* 1rem (16px) */
--mantine-font-size-lg     /* 1.125rem (18px) */
--mantine-font-size-xl     /* 1.25rem (20px) */
```

### Custom Font Sizes

```tsx
// src/providers/theme-provider.tsx
const theme = createTheme({
  fontSizes: {
    xxs: '0.625rem',  // 10px
    xs: '0.75rem',    // 12px
    sm: '0.875rem',   // 14px
    md: '1rem',       // 16px
    lg: '1.125rem',   // 18px
    xl: '1.25rem',    // 20px
    xxl: '1.5rem',    // 24px
  },
});
```

### Using Font Size Variables

```css
/* CodeExample.module.css */
.smallText {
  font-size: var(--mantine-font-size-xs);
}

.mediumText {
  font-size: var(--mantine-font-size-md);
}

.largeText {
  font-size: var(--mantine-font-size-xl);
}

.customText {
  font-size: var(--mantine-font-size-xxl);
}
```

```tsx
// Style props usage
<Text fz="xs">Small text</Text>
<Text fz="md">Medium text</Text>
<Text fz="xl">Large text</Text>
```

### Line Height Variables

```css
/* Line height variables */
--mantine-line-height        /* 1.55 (alias for md) */
--mantine-line-height-xs     /* 1.4 */
--mantine-line-height-sm     /* 1.45 */
--mantine-line-height-md     /* 1.55 */
--mantine-line-height-lg     /* 1.6 */
--mantine-line-height-xl     /* 1.65 */
```

### Custom Line Heights

```tsx
// src/providers/theme-provider.tsx
const theme = createTheme({
  lineHeights: {
    xs: '1.2',
    sm: '1.3',
    md: '1.4',
    lg: '1.5',
    xl: '1.6',
  },
});
```

### Using Line Height Variables

```css
/* CodeExample.module.css */
.tightText {
  line-height: var(--mantine-line-height-xs);
}

.normalText {
  line-height: var(--mantine-line-height-md);
}

.looseText {
  line-height: var(--mantine-line-height-xl);
}
```

```tsx
// Style props usage
<Text lh="xs">Tight line height</Text>
<Text lh="md">Normal line height</Text>
<Text lh="xl">Loose line height</Text>
```

## Heading Variables

### Default Heading Variables

```css
/* General heading variables */
--mantine-heading-font-weight    /* 700 */
--mantine-heading-text-wrap      /* wrap */

/* H1 variables */
--mantine-h1-font-size          /* 2.125rem (34px) */
--mantine-h1-line-height        /* 1.3 */
--mantine-h1-font-weight        /* 700 */

/* H2 variables */
--mantine-h2-font-size          /* 1.625rem (26px) */
--mantine-h2-line-height        /* 1.35 */
--mantine-h2-font-weight        /* 700 */

/* H3 variables */
--mantine-h3-font-size          /* 1.375rem (22px) */
--mantine-h3-line-height        /* 1.4 */
--mantine-h3-font-weight        /* 700 */

/* H4 variables */
--mantine-h4-font-size          /* 1.125rem (18px) */
--mantine-h4-line-height        /* 1.45 */
--mantine-h4-font-weight        /* 700 */

/* H5 variables */
--mantine-h5-font-size          /* 1rem (16px) */
--mantine-h5-line-height        /* 1.5 */
--mantine-h5-font-weight        /* 700 */

/* H6 variables */
--mantine-h6-font-size          /* 0.875rem (14px) */
--mantine-h6-line-height        /* 1.5 */
--mantine-h6-font-weight        /* 700 */
```

### Custom Heading Styles

```tsx
// src/providers/theme-provider.tsx
const theme = createTheme({
  headings: {
    fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, Noto Sans, Helvetica, Arial, sans-serif",
    fontWeight: "600",
    textWrap: "balance",
    sizes: {
      h1: {
        fontSize: '2.5rem',    // 40px
        lineHeight: '1.2',
        fontWeight: '700',
      },
      h2: {
        fontSize: '2rem',      // 32px
        lineHeight: '1.25',
        fontWeight: '600',
      },
      h3: {
        fontSize: '1.5rem',    // 24px
        lineHeight: '1.3',
        fontWeight: '600',
      },
      h4: {
        fontSize: '1.25rem',   // 20px
        lineHeight: '1.4',
        fontWeight: '600',
      },
      h5: {
        fontSize: '1.125rem',  // 18px
        lineHeight: '1.5',
        fontWeight: '600',
      },
      h6: {
        fontSize: '1rem',      // 16px
        lineHeight: '1.5',
        fontWeight: '600',
      },
    },
  },
});
```

### Using Heading Variables

```css
/* CodeExample.module.css */
.pageTitle {
  font-size: var(--mantine-h1-font-size);
  line-height: var(--mantine-h1-line-height);
  font-weight: var(--mantine-h1-font-weight);
}

.sectionTitle {
  font-size: var(--mantine-h2-font-size);
  line-height: var(--mantine-h2-line-height);
  font-weight: var(--mantine-h2-font-weight);
}

.subsectionTitle {
  font-size: var(--mantine-h3-font-size);
  line-height: var(--mantine-h3-line-height);
  font-weight: var(--mantine-h3-font-weight);
}
```

```tsx
// Style props usage
<Box fz="h1" lh="h1">Page Title</Box>
<Box fz="h2" lh="h2">Section Title</Box>
<Box fz="h3" lh="h3">Subsection Title</Box>
```

## Color Variables

### Basic Color Variables

```css
/* Basic color variables */
--mantine-color-white           /* #fff */
--mantine-color-black           /* #000 */
--mantine-color-text            /* var(--mantine-color-black) */
--mantine-color-body            /* var(--mantine-color-white) */
--mantine-color-error           /* var(--mantine-color-red-6) */
--mantine-color-placeholder     /* var(--mantine-color-gray-5) */
--mantine-color-dimmed          /* var(--mantine-color-gray-6) */
--mantine-color-bright          /* var(--mantine-color-black) */
--mantine-color-anchor          /* var(--mantine-primary-color-6) */
```

### Color Palette Variables

```css
/* Color palette variables (example with blue) */
--mantine-color-blue-0          /* Lightest shade */
--mantine-color-blue-1
--mantine-color-blue-2
--mantine-color-blue-3
--mantine-color-blue-4
--mantine-color-blue-5
--mantine-color-blue-6          /* Default shade */
--mantine-color-blue-7
--mantine-color-blue-8
--mantine-color-blue-9          /* Darkest shade */
```

### Our Custom Color Palette

```tsx
// src/providers/theme-provider.tsx
const theme = createTheme({
  colors: {
    // Custom dark color palette
    dark: [
      "#C1C2C5", "#A6A7AB", "#909296", "#5c5f66", "#373A40",
      "#2C2E33", "#25262b", "#1A1B23", "#141517", "#101113",
    ],
    // Custom code colors
    code: [
      "#f8f9fa", "#e9ecef", "#dee2e6", "#ced4da", "#adb5bd",
      "#6c757d", "#495057", "#343a40", "#212529", "#000000",
    ],
  },
  primaryColor: "blue",
  primaryShade: { light: 6, dark: 8 },
});
```

### Variant Color Variables

```css
/* Filled variant variables */
--mantine-color-blue-filled         /* var(--mantine-color-blue-6) */
--mantine-color-blue-filled-hover   /* var(--mantine-color-blue-7) */

/* Light variant variables */
--mantine-color-blue-light          /* rgba(34, 139, 230, 0.1) */
--mantine-color-blue-light-hover    /* rgba(34, 139, 230, 0.12) */
--mantine-color-blue-light-color    /* var(--mantine-color-blue-6) */

/* Outline variant variables */
--mantine-color-blue-outline        /* var(--mantine-color-blue-6) */
--mantine-color-blue-outline-hover  /* rgba(34, 139, 230, 0.05) */
```

### Primary Color Variables

```css
/* Primary color variables */
--mantine-primary-color-0           /* var(--mantine-color-blue-0) */
--mantine-primary-color-1           /* var(--mantine-color-blue-1) */
--mantine-primary-color-2           /* var(--mantine-color-blue-2) */
--mantine-primary-color-3           /* var(--mantine-color-blue-3) */
--mantine-primary-color-4           /* var(--mantine-color-blue-4) */
--mantine-primary-color-5           /* var(--mantine-color-blue-5) */
--mantine-primary-color-6           /* var(--mantine-color-blue-6) */
--mantine-primary-color-7           /* var(--mantine-color-blue-7) */
--mantine-primary-color-8           /* var(--mantine-color-blue-8) */
--mantine-primary-color-9           /* var(--mantine-color-blue-9) */

/* Primary variant variables */
--mantine-primary-color-filled      /* var(--mantine-color-blue-filled) */
--mantine-primary-color-filled-hover /* var(--mantine-color-blue-filled-hover) */
--mantine-primary-color-light       /* var(--mantine-color-blue-light) */
--mantine-primary-color-light-hover /* var(--mantine-color-blue-light-hover) */
--mantine-primary-color-light-color /* var(--mantine-color-blue-light-color) */
```

### Using Color Variables

```css
/* CodeExample.module.css */
.container {
  background: var(--mantine-color-body);
  color: var(--mantine-color-text);
  border: 1px solid var(--mantine-color-gray-3);
}

.title {
  color: var(--mantine-color-blue-8);
}

.codeBlock {
  background: var(--mantine-color-gray-0);
  color: var(--mantine-color-text);
  border: 1px solid var(--mantine-color-gray-2);
}

.button {
  background: var(--mantine-primary-color-filled);
  color: var(--mantine-color-white);
}

.button:hover {
  background: var(--mantine-primary-color-filled-hover);
}

.dimmedText {
  color: var(--mantine-color-dimmed);
}

.errorText {
  color: var(--mantine-color-error);
}
```

## Spacing Variables

### Default Spacing Variables

```css
/* Spacing variables */
--mantine-spacing-xs     /* 0.625rem (10px) */
--mantine-spacing-sm     /* 0.75rem (12px) */
--mantine-spacing-md     /* 1rem (16px) */
--mantine-spacing-lg     /* 1.25rem (20px) */
--mantine-spacing-xl     /* 2rem (32px) */
```

### Custom Spacing Values

```tsx
// src/providers/theme-provider.tsx
const theme = createTheme({
  spacing: {
    xxs: '0.25rem',   // 4px
    xs: '0.5rem',     // 8px
    sm: '0.75rem',    // 12px
    md: '1rem',       // 16px
    lg: '1.5rem',     // 24px
    xl: '2rem',       // 32px
    xxl: '3rem',      // 48px
  },
});
```

### Using Spacing Variables

```css
/* CodeExample.module.css */
.container {
  padding: var(--mantine-spacing-lg);
  margin: var(--mantine-spacing-md) 0;
}

.header {
  padding: var(--mantine-spacing-md);
  margin-bottom: var(--mantine-spacing-sm);
}

.codeBlock {
  padding: var(--mantine-spacing-md);
  margin: var(--mantine-spacing-sm) 0;
}

.actions {
  gap: var(--mantine-spacing-sm);
}
```

```tsx
// Style props usage
<Box p="lg" m="md">Container</Box>
<Box pt="sm" pb="sm">Header</Box>
<Box gap="sm">Actions</Box>
```

## Border Radius Variables

### Default Radius Variables

```css
/* Border radius variables */
--mantine-radius-xs        /* 0.125rem (2px) */
--mantine-radius-sm        /* 0.25rem (4px) */
--mantine-radius-md        /* 0.5rem (8px) */
--mantine-radius-lg        /* 1rem (16px) */
--mantine-radius-xl        /* 2rem (32px) */
--mantine-radius-default   /* var(--mantine-radius-sm) */
```

### Custom Radius Values

```tsx
// src/providers/theme-provider.tsx
const theme = createTheme({
  defaultRadius: "sm",
  radius: {
    xs: '0.125rem',   // 2px
    sm: '0.25rem',    // 4px
    md: '0.5rem',     // 8px
    lg: '1rem',       // 16px
    xl: '2rem',       // 32px
  },
});
```

### Using Radius Variables

```css
/* CodeExample.module.css */
.container {
  border-radius: var(--mantine-radius-md);
}

.codeBlock {
  border-radius: var(--mantine-radius-sm);
}

.button {
  border-radius: var(--mantine-radius-default);
}

.card {
  border-radius: var(--mantine-radius-lg);
}
```

```tsx
// Style props usage
<Box radius="md">Container</Box>
<Box radius="sm">Code Block</Box>
<Button radius="default">Button</Button>
```

## Shadow Variables

### Default Shadow Variables

```css
/* Shadow variables */
--mantine-shadow-xs    /* 0 1px 3px rgba(0, 0, 0, 0.05), 0 1px 2px rgba(0, 0, 0, 0.1) */
--mantine-shadow-sm    /* 0 1px 3px rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0.05) 0 10px 15px -5px, rgba(0, 0, 0, 0.04) 0 7px 7px -5px */
--mantine-shadow-md    /* 0 1px 3px rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0.05) 0 20px 25px -5px, rgba(0, 0, 0, 0.04) 0 10px 10px -5px */
--mantine-shadow-lg    /* 0 1px 3px rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0.05) 0 28px 23px -7px, rgba(0, 0, 0, 0.04) 0 12px 12px -7px */
--mantine-shadow-xl    /* 0 1px 3px rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0.05) 0 36px 28px -7px, rgba(0, 0, 0, 0.04) 0 17px 17px -7px */
```

### Custom Shadow Values

```tsx
// src/providers/theme-provider.tsx
const theme = createTheme({
  shadows: {
    xs: '0 1px 2px rgba(0, 0, 0, 0.1)',
    sm: '0 1px 3px rgba(0, 0, 0, 0.1)',
    md: '0 2px 4px rgba(0, 0, 0, 0.1)',
    lg: '0 4px 8px rgba(0, 0, 0, 0.1)',
    xl: '0 8px 16px rgba(0, 0, 0, 0.1)',
  },
});
```

### Using Shadow Variables

```css
/* CodeExample.module.css */
.container {
  box-shadow: var(--mantine-shadow-sm);
}

.card {
  box-shadow: var(--mantine-shadow-md);
}

.modal {
  box-shadow: var(--mantine-shadow-lg);
}

.tooltip {
  box-shadow: var(--mantine-shadow-xl);
}
```

```tsx
// Style props usage
<Box shadow="sm">Container</Box>
<Box shadow="md">Card</Box>
<Box shadow="lg">Modal</Box>
```

## Z-Index Variables

### Default Z-Index Variables

```css
/* Z-index variables */
--mantine-z-index-app      /* 100 */
--mantine-z-index-modal    /* 200 */
--mantine-z-index-popover  /* 300 */
--mantine-z-index-overlay  /* 400 */
--mantine-z-index-max      /* 9999 */
```

### Using Z-Index Variables

```css
/* CodeExample.module.css */
.overlay {
  z-index: var(--mantine-z-index-overlay);
}

.modal {
  z-index: var(--mantine-z-index-modal);
}

.tooltip {
  z-index: var(--mantine-z-index-popover);
}

.aboveModal {
  z-index: calc(var(--mantine-z-index-modal) + 1);
}
```

```tsx
// Component usage
<Modal zIndex="var(--mantine-z-index-max)">
  Modal content
</Modal>
```

## Custom CSS Variables

### CSS Variables Resolver

```tsx
// src/providers/theme-provider.tsx
import { CSSVariablesResolver } from '@mantine/core';

const resolver: CSSVariablesResolver = (theme) => ({
  variables: {
    '--refactorium-hero-height': '400px',
    '--refactorium-code-font-size': '14px',
    '--refactorium-border-width': '1px',
  },
  light: {
    '--refactorium-primary': theme.colors.blue[6],
    '--refactorium-secondary': theme.colors.gray[6],
    '--refactorium-success': theme.colors.green[6],
    '--refactorium-warning': theme.colors.yellow[6],
    '--refactorium-error': theme.colors.red[6],
  },
  dark: {
    '--refactorium-primary': theme.colors.blue[4],
    '--refactorium-secondary': theme.colors.gray[4],
    '--refactorium-success': theme.colors.green[4],
    '--refactorium-warning': theme.colors.yellow[4],
    '--refactorium-error': theme.colors.red[4],
  },
});

const theme = createTheme({
  // ... theme configuration
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <MantineProvider
      theme={theme}
      cssVariablesResolver={resolver}
      defaultColorScheme="auto"
      colorSchemeManager={colorSchemeManager}
      withGlobalClasses
    >
      {children}
    </MantineProvider>
  );
}
```

### Using Custom Variables

```css
/* CodeExample.module.css */
.hero {
  height: var(--refactorium-hero-height);
  background: var(--refactorium-primary);
}

.codeBlock {
  font-size: var(--refactorium-code-font-size);
  border: var(--refactorium-border-width) solid var(--refactorium-secondary);
}

.successMessage {
  color: var(--refactorium-success);
}

.warningMessage {
  color: var(--refactorium-warning);
}

.errorMessage {
  color: var(--refactorium-error);
}
```

## Refactorium-Specific Patterns

### Code Example Styling

```css
/* CodeExampleContainer.module.css */
.container {
  background: var(--mantine-color-body);
  border: 1px solid var(--mantine-color-gray-3);
  border-radius: var(--mantine-radius-md);
  padding: var(--mantine-spacing-lg);
  margin: var(--mantine-spacing-md) 0;
  box-shadow: var(--mantine-shadow-sm);
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--mantine-spacing-md);
  padding-bottom: var(--mantine-spacing-sm);
  border-bottom: 1px solid var(--mantine-color-gray-2);
}

.title {
  color: var(--mantine-color-blue-8);
  font-size: var(--mantine-h3-font-size);
  font-weight: var(--mantine-h3-font-weight);
  line-height: var(--mantine-h3-line-height);
  margin: 0;
}

.codeBlock {
  background: var(--mantine-color-gray-0);
  border: 1px solid var(--mantine-color-gray-2);
  border-radius: var(--mantine-radius-sm);
  padding: var(--mantine-spacing-md);
  font-family: var(--mantine-font-family-monospace);
  font-size: var(--mantine-font-size-sm);
  line-height: var(--mantine-line-height-md);
  overflow-x: auto;
}

.actions {
  display: flex;
  gap: var(--mantine-spacing-sm);
}

.button {
  background: var(--mantine-primary-color-filled);
  color: var(--mantine-color-white);
  border: none;
  border-radius: var(--mantine-radius-sm);
  padding: var(--mantine-spacing-sm) var(--mantine-spacing-md);
  font-size: var(--mantine-font-size-sm);
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.button:hover {
  background: var(--mantine-primary-color-filled-hover);
  transform: translateY(-1px);
  box-shadow: var(--mantine-shadow-sm);
}
```

### Form Styling

```css
/* CodeSubmissionForm.module.css */
.formContainer {
  max-width: 800px;
  margin: 0 auto;
  padding: var(--mantine-spacing-xl);
  background: var(--mantine-color-body);
  border-radius: var(--mantine-radius-lg);
  border: 1px solid var(--mantine-color-gray-3);
  box-shadow: var(--mantine-shadow-md);
}

.formTitle {
  color: var(--mantine-color-blue-8);
  font-size: var(--mantine-h2-font-size);
  font-weight: var(--mantine-h2-font-weight);
  line-height: var(--mantine-h2-line-height);
  margin-bottom: var(--mantine-spacing-lg);
  text-align: center;
}

.fieldRoot {
  margin-bottom: var(--mantine-spacing-md);
}

.input {
  width: 100%;
  padding: var(--mantine-spacing-sm);
  border: 2px solid var(--mantine-color-gray-3);
  border-radius: var(--mantine-radius-sm);
  font-size: var(--mantine-font-size-sm);
  font-family: var(--mantine-font-family);
  background: var(--mantine-color-body);
  color: var(--mantine-color-text);
  transition: border-color 0.2s ease;
}

.input:focus {
  outline: none;
  border-color: var(--mantine-primary-color-filled);
  box-shadow: 0 0 0 2px var(--mantine-color-blue-1);
}

.codeInput {
  font-family: var(--mantine-font-family-monospace);
  font-size: var(--mantine-font-size-sm);
  line-height: var(--mantine-line-height-md);
}

.label {
  color: var(--mantine-color-blue-8);
  font-weight: 600;
  margin-bottom: var(--mantine-spacing-xs);
  font-size: var(--mantine-font-size-sm);
}

.formActions {
  display: flex;
  gap: var(--mantine-spacing-md);
  justify-content: center;
  margin-top: var(--mantine-spacing-xl);
}

.submitButton {
  background: var(--mantine-primary-color-filled);
  color: var(--mantine-color-white);
  border: none;
  border-radius: var(--mantine-radius-sm);
  padding: var(--mantine-spacing-sm) var(--mantine-spacing-lg);
  font-size: var(--mantine-font-size-sm);
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

.submitButton:hover {
  background: var(--mantine-primary-color-filled-hover);
  transform: translateY(-1px);
  box-shadow: var(--mantine-shadow-sm);
}

.cancelButton {
  background: transparent;
  color: var(--mantine-color-dimmed);
  border: 1px solid var(--mantine-color-gray-3);
  border-radius: var(--mantine-radius-sm);
  padding: var(--mantine-spacing-sm) var(--mantine-spacing-lg);
  font-size: var(--mantine-font-size-sm);
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.cancelButton:hover {
  background: var(--mantine-color-gray-0);
  border-color: var(--mantine-color-gray-4);
}
```

## Best Practices for Refactorium

### 1. Use Semantic Variables

- Use `--mantine-color-text` instead of hardcoded colors
- Use `--mantine-spacing-md` instead of hardcoded spacing
- Use `--mantine-radius-sm` instead of hardcoded border radius

### 2. Theme Consistency

- Always use Mantine CSS variables for consistency
- Create custom variables for project-specific values
- Use the CSS variables resolver for complex customizations

### 3. Performance

- CSS variables are computed at runtime, use them efficiently
- Avoid deep nesting of CSS variable references
- Use custom variables for frequently used values

### 4. Maintenance

- Document custom CSS variables
- Use consistent naming conventions
- Group related variables together
- Regular cleanup of unused variables

### 5. Dark Mode Support

- Use theme-aware variables that automatically adapt
- Test both light and dark color schemes
- Use `light-dark()` function for complex cases

This approach ensures our Code Smell Playground has consistent, maintainable, and theme-aware styling using Mantine's CSS variables system.
