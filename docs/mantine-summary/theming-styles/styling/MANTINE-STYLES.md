# Mantine Styles (Refactorium)

This guide explains how to import and manage Mantine styles in our Code Smell Playground project, including CSS layers for proper style ordering.

## Mantine Components Styles

All Mantine components use CSS modules internally, with styles bundled before npm publishing. Import styles using the package-specific CSS files.

### Core Styles Import

```tsx
// src/app/layout.tsx
import '@mantine/core/styles.css';
```

This single import provides all `@mantine/core` component styles for our application.

## Per-Component Style Imports

For bundle size optimization, import individual component styles. Note that some components have dependencies.

### Component Dependencies

| Component | Required Dependencies | Example |
|-----------|----------------------|---------|
| `Button` | `UnstyledButton` | Both required |
| `TextInput` | `Input`, `UnstyledInput` | All three required |
| `Select` | `Input`, `UnstyledInput`, `Popover` | All four required |
| `Modal` | `Overlay`, `Portal` | All three required |

### Refactorium Component Imports

```tsx
// For code example components
import '@mantine/core/styles/UnstyledButton.css';
import '@mantine/core/styles/Button.css';
import '@mantine/core/styles/Paper.css';
import '@mantine/core/styles/Stack.css';
import '@mantine/core/styles/Title.css';
import '@mantine/core/styles/Text.css';

// For form components
import '@mantine/core/styles/UnstyledInput.css';
import '@mantine/core/styles/Input.css';
import '@mantine/core/styles/TextInput.css';
import '@mantine/core/styles/Select.css';

// For code highlighting
import '@mantine/code-highlight/styles.css';
```

### Available Component Styles

Only `@mantine/core` supports per-component imports. Other packages require full imports:

```tsx
// ✅ @mantine/core - per-component available
import '@mantine/core/styles/Button.css';

// ✅ Other packages - full import only
import '@mantine/dates/styles.css';
import '@mantine/charts/styles.css';
import '@mantine/notifications/styles.css';
```

## Styles Import Order

**Critical**: Import order determines style precedence. Incorrect order can break component styling.

### Correct Import Order

```tsx
// src/app/layout.tsx
// 1. Mantine core styles first
import '@mantine/core/styles.css';

// 2. Other Mantine packages
import '@mantine/dates/styles.css';
import '@mantine/charts/styles.css';
import '@mantine/notifications/styles.css';
import '@mantine/code-highlight/styles.css';
import '@mantine/tiptap/styles.css';
import '@mantine/dropzone/styles.css';
import '@mantine/carousel/styles.css';
import '@mantine/spotlight/styles.css';
import '@mantine/modals/styles.css';
import '@mantine/nprogress/styles.css';

// 3. Application styles last
import './globals.css';
```

### Incorrect Import Order

```tsx
// ❌ Wrong - other packages before core
import '@mantine/dates/styles.css';
import '@mantine/core/styles.css';

// ❌ Wrong - app styles before Mantine
import './globals.css';
import '@mantine/core/styles.css';
```

## CSS Layers (Recommended for Refactorium)

CSS layers solve style ordering issues in Next.js and other frameworks where import order isn't guaranteed.

### Layer-Based Imports

```tsx
// src/app/layout.tsx
// Use .layer.css files instead of .css files
import '@mantine/core/styles.layer.css';
import '@mantine/dates/styles.layer.css';
import '@mantine/charts/styles.layer.css';
import '@mantine/notifications/styles.layer.css';
import '@mantine/code-highlight/styles.layer.css';
import '@mantine/tiptap/styles.layer.css';
import '@mantine/dropzone/styles.layer.css';
import '@mantine/carousel/styles.layer.css';
import '@mantine/spotlight/styles.layer.css';
import '@mantine/modals/styles.layer.css';
import '@mantine/nprogress/styles.layer.css';

import './globals.css';
```

### Per-Component Layer Imports

```tsx
// For specific components only
import '@mantine/core/styles/UnstyledButton.layer.css';
import '@mantine/core/styles/Button.layer.css';
import '@mantine/core/styles/Paper.layer.css';
import '@mantine/core/styles/Stack.layer.css';
```

### Layer Declaration

```css
/* src/app/globals.css */
@layer base, mantine, components, utilities;

/* Base styles */
@layer base {
  html {
    color-scheme: light dark;
  }
  
  body {
    font-family: var(--mantine-font-family);
    line-height: var(--mantine-line-height);
  }
}

/* Component styles */
@layer components {
  .code-example {
    border-radius: var(--mantine-radius-md);
    padding: var(--mantine-spacing-lg);
  }
  
  .refactor-button {
    background: var(--mantine-color-blue-6);
    color: white;
  }
}

/* Utility classes */
@layer utilities {
  .text-balance {
    text-wrap: balance;
  }
}
```

## Refactorium Style Architecture

### Current Project Setup

```tsx
// src/app/layout.tsx
import '@mantine/core/styles.css';
import { ColorSchemeScript, mantineHtmlProps } from '@mantine/core';
import './globals.css';
import { ThemeProvider } from '@/providers';
```

### Recommended Layer Setup

```tsx
// src/app/layout.tsx
import '@mantine/core/styles.layer.css';
import '@mantine/dates/styles.layer.css';
import '@mantine/charts/styles.layer.css';
import '@mantine/notifications/styles.layer.css';
import '@mantine/code-highlight/styles.layer.css';
import '@mantine/tiptap/styles.layer.css';
import '@mantine/dropzone/styles.layer.css';
import '@mantine/carousel/styles.layer.css';
import '@mantine/spotlight/styles.layer.css';
import '@mantine/modals/styles.layer.css';
import '@mantine/nprogress/styles.layer.css';

import { ColorSchemeScript, mantineHtmlProps } from '@mantine/core';
import './globals.css';
import { ThemeProvider } from '@/providers';
```

### Global Styles with Layers

```css
/* src/app/globals.css */
@layer base, mantine, components, utilities;

@layer base {
  html, body {
    max-width: 100vw;
    overflow-x: hidden;
  }
  
  html {
    color-scheme: light dark;
  }
  
  body {
    font-family: system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell,
      Noto Sans, Helvetica, Arial, "Apple Color Emoji", "Segoe UI Emoji";
    line-height: 1.6;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background-color: var(--mantine-color-body);
    color: var(--mantine-color-text);
  }
  
  * { 
    box-sizing: border-box; 
    padding: 0; 
    margin: 0; 
  }
  
  a { 
    color: inherit; 
    text-decoration: none; 
  }
}

@layer components {
  .code-example-container {
    border: 1px solid var(--mantine-color-gray-3);
    border-radius: var(--mantine-radius-md);
    background: var(--mantine-color-body);
  }
  
  .code-example-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: var(--mantine-spacing-md);
    border-bottom: 1px solid var(--mantine-color-gray-2);
  }
  
  .refactor-actions {
    display: flex;
    gap: var(--mantine-spacing-sm);
  }
}
```

## CDN Loading (Alternative)

For CDN-based loading, specify exact versions:

```html
<!-- Regular styles -->
<link
  rel="stylesheet"
  href="https://unpkg.com/@mantine/core@8.3.1/styles.css"
/>

<!-- Layer-based styles -->
<link
  rel="stylesheet"
  href="https://unpkg.com/@mantine/core@8.3.1/styles.layer.css"
/>
```

### CDN Package URLs

```html
<!-- All Mantine packages available on CDN -->
<link href="https://unpkg.com/@mantine/core@8.3.1/styles.layer.css" rel="stylesheet">
<link href="https://unpkg.com/@mantine/dates@8.3.1/styles.layer.css" rel="stylesheet">
<link href="https://unpkg.com/@mantine/charts@8.3.1/styles.layer.css" rel="stylesheet">
<link href="https://unpkg.com/@mantine/notifications@8.3.1/styles.layer.css" rel="stylesheet">
<link href="https://unpkg.com/@mantine/code-highlight@8.3.1/styles.layer.css" rel="stylesheet">
<link href="https://unpkg.com/@mantine/tiptap@8.3.1/styles.layer.css" rel="stylesheet">
<link href="https://unpkg.com/@mantine/dropzone@8.3.1/styles.layer.css" rel="stylesheet">
<link href="https://unpkg.com/@mantine/carousel@8.3.1/styles.layer.css" rel="stylesheet">
<link href="https://unpkg.com/@mantine/spotlight@8.3.1/styles.layer.css" rel="stylesheet">
<link href="https://unpkg.com/@mantine/modals@8.3.1/styles.layer.css" rel="stylesheet">
<link href="https://unpkg.com/@mantine/nprogress@8.3.1/styles.layer.css" rel="stylesheet">
```

## Browser Support

CSS layers have **94% browser support** as of July 2025, supporting all modern browsers:

- Chrome 99+
- Firefox 97+
- Safari 15.4+
- Edge 99+

## Refactorium Best Practices

### 1. Style Import Strategy

- **Development**: Use `.layer.css` files for predictable style ordering
- **Production**: Consider per-component imports for bundle optimization
- **CDN**: Use for quick prototyping or external integrations

### 2. Layer Organization

```css
@layer base, mantine, components, utilities;

/* base: Reset, typography, global styles */
/* mantine: All Mantine component styles */
/* components: Custom component styles */
/* utilities: Utility classes, overrides */
```

### 3. Performance Considerations

- Use per-component imports only when bundle size is critical
- Layer-based imports provide better maintainability
- CDN loading useful for external integrations

### 4. Troubleshooting

- **Styles not applying**: Check import order
- **Overrides not working**: Ensure app styles are in higher layer
- **Bundle size**: Use per-component imports for specific components
- **CDN issues**: Verify version numbers match package.json

### 5. Migration Strategy

To migrate from regular imports to layer-based:

1. Replace `.css` with `.layer.css` in imports
2. Add `@layer` declaration to global CSS
3. Organize custom styles into appropriate layers
4. Test style precedence across components

This approach ensures our Code Smell Playground has predictable, maintainable styling with proper precedence control.
