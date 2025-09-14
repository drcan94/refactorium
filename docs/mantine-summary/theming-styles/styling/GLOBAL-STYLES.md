# Global Styles (Refactorium)

This guide covers Mantine's global styles and how to customize them for our Code Smell Playground project.

## Overview

Mantine includes essential global styles that are required for components to work correctly. These styles are automatically imported with the main stylesheet.

## Automatic Import

```tsx
// src/app/layout.tsx
import '@mantine/core/styles.css';
```

This single import includes all global styles automatically.

## Manual Import (Per-Component)

If using per-component imports, import global styles manually:

```tsx
// src/app/layout.tsx
import '@mantine/core/styles/baseline.css';
import '@mantine/core/styles/default-css-variables.css';
import '@mantine/core/styles/global.css';
```

## CSS Reset

Mantine includes a minimal CSS reset for modern browsers:

```css
/* Included in baseline.css */
body {
  margin: 0;
}

*,
*::before,
*::after {
  box-sizing: border-box;
}

input,
button,
textarea,
select {
  font: inherit;
}

button,
select {
  text-transform: none;
}
```

### For Older Browser Support

Add additional reset if needed:

```bash
npm install normalize.css
```

```tsx
// src/app/layout.tsx
import 'normalize.css/normalize.css';
import '@mantine/core/styles.css';
```

## Body and :root Styles

### Default Mantine Styles

```css
/* Included in global.css */
:root {
  color-scheme: var(--mantine-color-scheme);
}

body {
  font-family: var(--mantine-font-family);
  font-size: var(--mantine-font-size-md);
  line-height: var(--mantine-line-height);
  background-color: var(--mantine-color-body);
  color: var(--mantine-color-text);

  -webkit-font-smoothing: var(--mantine-webkit-font-smoothing);
  -moz-osx-font-smoothing: var(--mantine-moz-font-smoothing);
}
```

### Our Current Global Styles

```css
/* src/app/globals.css */
html, body {
  max-width: 100vw;
  overflow-x: hidden;
}

html {
  color-scheme: light dark; /* Prevents white flash */
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
```

## Static Classes

Mantine provides utility classes for common styling needs:

### Focus Classes

```tsx
// Focus management
<button className="mantine-focus-auto">Focus auto</button>
<button className="mantine-focus-always">Focus always</button>
<button className="mantine-focus-never">Focus never</button>
<button className="mantine-active">Active state</button>
```

### Responsive Visibility Classes

```tsx
// Show/hide based on breakpoints
<div className="mantine-visible-from-sm">Visible from small screens</div>
<div className="mantine-hidden-from-md">Hidden from medium screens</div>
<div className="mantine-visible-from-lg">Visible from large screens</div>
```

### Available Breakpoint Classes

| Class | Description |
|-------|-------------|
| `mantine-visible-from-xs` | Visible from 36em+ |
| `mantine-visible-from-sm` | Visible from 48em+ |
| `mantine-visible-from-md` | Visible from 62em+ |
| `mantine-visible-from-lg` | Visible from 75em+ |
| `mantine-visible-from-xl` | Visible from 88em+ |
| `mantine-hidden-from-xs` | Hidden from 36em+ |
| `mantine-hidden-from-sm` | Hidden from 48em+ |
| `mantine-hidden-from-md` | Hidden from 62em+ |
| `mantine-hidden-from-lg` | Hidden from 75em+ |
| `mantine-hidden-from-xl` | Hidden from 88em+ |

## Refactorium-Specific Global Styles

### Code Example Styling

```css
/* src/app/globals.css */
/* Code example global styles */
.code-example {
  font-family: var(--mantine-font-family-monospace);
  font-size: var(--mantine-font-size-sm);
  line-height: 1.5;
}

.code-example pre {
  margin: 0;
  padding: var(--mantine-spacing-md);
  background: var(--mantine-color-gray-0);
  border-radius: var(--mantine-radius-sm);
  overflow-x: auto;
}

.code-example code {
  font-family: inherit;
  font-size: inherit;
}

/* Dark mode code styling */
[data-mantine-color-scheme='dark'] .code-example pre {
  background: var(--mantine-color-dark-8);
  color: var(--mantine-color-text);
}
```

### Form Styling

```css
/* src/app/globals.css */
/* Form global styles */
.form-container {
  max-width: 800px;
  margin: 0 auto;
  padding: var(--mantine-spacing-xl);
}

.form-field {
  margin-bottom: var(--mantine-spacing-md);
}

.form-label {
  color: var(--mantine-color-blue-8);
  font-weight: 600;
  margin-bottom: var(--mantine-spacing-xs);
  display: block;
}

.form-input {
  width: 100%;
  padding: var(--mantine-spacing-sm);
  border: 2px solid var(--mantine-color-gray-3);
  border-radius: var(--mantine-radius-sm);
  font-size: var(--mantine-font-size-sm);
  transition: border-color 0.2s ease;
}

.form-input:focus {
  outline: none;
  border-color: var(--mantine-color-blue-6);
  box-shadow: 0 0 0 2px var(--mantine-color-blue-1);
}

/* Dark mode form styling */
[data-mantine-color-scheme='dark'] .form-label {
  color: var(--mantine-color-blue-2);
}

[data-mantine-color-scheme='dark'] .form-input {
  background: var(--mantine-color-dark-7);
  border-color: var(--mantine-color-dark-4);
  color: var(--mantine-color-text);
}
```

### Button Styling

```css
/* src/app/globals.css */
/* Button global styles */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: var(--mantine-spacing-sm) var(--mantine-spacing-md);
  border: none;
  border-radius: var(--mantine-radius-sm);
  font-size: var(--mantine-font-size-sm);
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  text-decoration: none;
}

.btn-primary {
  background: var(--mantine-color-blue-6);
  color: white;
}

.btn-primary:hover {
  background: var(--mantine-color-blue-7);
  transform: translateY(-1px);
}

.btn-secondary {
  background: transparent;
  color: var(--mantine-color-gray-6);
  border: 1px solid var(--mantine-color-gray-3);
}

.btn-secondary:hover {
  background: var(--mantine-color-gray-0);
  border-color: var(--mantine-color-gray-4);
}

/* Dark mode button styling */
[data-mantine-color-scheme='dark'] .btn-secondary {
  color: var(--mantine-color-gray-4);
  border-color: var(--mantine-color-dark-4);
}

[data-mantine-color-scheme='dark'] .btn-secondary:hover {
  background: var(--mantine-color-dark-6);
  border-color: var(--mantine-color-dark-3);
}
```

### Layout Styling

```css
/* src/app/globals.css */
/* Layout global styles */
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 var(--mantine-spacing-md);
}

.section {
  padding: var(--mantine-spacing-xl) 0;
}

.section-title {
  color: var(--mantine-color-blue-8);
  font-size: var(--mantine-font-size-xl);
  font-weight: 700;
  margin-bottom: var(--mantine-spacing-lg);
  text-align: center;
}

.section-subtitle {
  color: var(--mantine-color-gray-6);
  font-size: var(--mantine-font-size-lg);
  margin-bottom: var(--mantine-spacing-xl);
  text-align: center;
}

/* Dark mode layout styling */
[data-mantine-color-scheme='dark'] .section-title {
  color: var(--mantine-color-blue-2);
}

[data-mantine-color-scheme='dark'] .section-subtitle {
  color: var(--mantine-color-gray-4);
}
```

### Utility Classes

```css
/* src/app/globals.css */
/* Utility classes */
.text-center { text-align: center; }
.text-left { text-align: left; }
.text-right { text-align: right; }

.font-mono { font-family: var(--mantine-font-family-monospace); }
.font-sans { font-family: var(--mantine-font-family); }

.text-sm { font-size: var(--mantine-font-size-sm); }
.text-md { font-size: var(--mantine-font-size-md); }
.text-lg { font-size: var(--mantine-font-size-lg); }
.text-xl { font-size: var(--mantine-font-size-xl); }

.font-normal { font-weight: 400; }
.font-medium { font-weight: 500; }
.font-semibold { font-weight: 600; }
.font-bold { font-weight: 700; }

.mb-sm { margin-bottom: var(--mantine-spacing-sm); }
.mb-md { margin-bottom: var(--mantine-spacing-md); }
.mb-lg { margin-bottom: var(--mantine-spacing-lg); }
.mb-xl { margin-bottom: var(--mantine-spacing-xl); }

.mt-sm { margin-top: var(--mantine-spacing-sm); }
.mt-md { margin-top: var(--mantine-spacing-md); }
.mt-lg { margin-top: var(--mantine-spacing-lg); }
.mt-xl { margin-top: var(--mantine-spacing-xl); }

.p-sm { padding: var(--mantine-spacing-sm); }
.p-md { padding: var(--mantine-spacing-md); }
.p-lg { padding: var(--mantine-spacing-lg); }
.p-xl { padding: var(--mantine-spacing-xl); }

.rounded-sm { border-radius: var(--mantine-radius-sm); }
.rounded-md { border-radius: var(--mantine-radius-md); }
.rounded-lg { border-radius: var(--mantine-radius-lg); }

.shadow-sm { box-shadow: var(--mantine-shadow-sm); }
.shadow-md { box-shadow: var(--mantine-shadow-md); }
.shadow-lg { box-shadow: var(--mantine-shadow-lg); }
```

## Customizing Global Styles

### Override Mantine Variables

```css
/* src/app/globals.css */
:root {
  /* Override Mantine color scheme */
  --mantine-color-scheme: light;
  
  /* Custom color variables */
  --refactorium-primary: var(--mantine-color-blue-6);
  --refactorium-secondary: var(--mantine-color-gray-6);
  --refactorium-success: var(--mantine-color-green-6);
  --refactorium-warning: var(--mantine-color-yellow-6);
  --refactorium-error: var(--mantine-color-red-6);
  
  /* Custom spacing */
  --refactorium-spacing-xs: var(--mantine-spacing-xs);
  --refactorium-spacing-sm: var(--mantine-spacing-sm);
  --refactorium-spacing-md: var(--mantine-spacing-md);
  --refactorium-spacing-lg: var(--mantine-spacing-lg);
  --refactorium-spacing-xl: var(--mantine-spacing-xl);
  
  /* Custom typography */
  --refactorium-font-family: var(--mantine-font-family);
  --refactorium-font-family-mono: var(--mantine-font-family-monospace);
  --refactorium-font-size-sm: var(--mantine-font-size-sm);
  --refactorium-font-size-md: var(--mantine-font-size-md);
  --refactorium-font-size-lg: var(--mantine-font-size-lg);
}

/* Dark mode overrides */
[data-mantine-color-scheme='dark'] {
  --refactorium-primary: var(--mantine-color-blue-4);
  --refactorium-secondary: var(--mantine-color-gray-4);
}
```

### Custom Component Styles

```css
/* src/app/globals.css */
/* Custom component styles */
.code-smell-card {
  background: var(--mantine-color-body);
  border: 1px solid var(--mantine-color-gray-3);
  border-radius: var(--mantine-radius-md);
  padding: var(--mantine-spacing-lg);
  margin: var(--mantine-spacing-md) 0;
  transition: all 0.2s ease;
}

.code-smell-card:hover {
  border-color: var(--mantine-color-blue-4);
  box-shadow: var(--mantine-shadow-sm);
  transform: translateY(-2px);
}

.code-smell-card.severity-high {
  border-left: 4px solid var(--mantine-color-red-6);
}

.code-smell-card.severity-medium {
  border-left: 4px solid var(--mantine-color-yellow-6);
}

.code-smell-card.severity-low {
  border-left: 4px solid var(--mantine-color-green-6);
}

.refactor-button {
  background: var(--refactorium-primary);
  color: white;
  border: none;
  border-radius: var(--mantine-radius-sm);
  padding: var(--mantine-spacing-sm) var(--mantine-spacing-md);
  font-size: var(--mantine-font-size-sm);
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.refactor-button:hover {
  background: var(--mantine-color-blue-7);
  transform: translateY(-1px);
  box-shadow: var(--mantine-shadow-sm);
}

.refactor-button:active {
  transform: translateY(0);
}

/* Dark mode custom component styles */
[data-mantine-color-scheme='dark'] .code-smell-card {
  background: var(--mantine-color-dark-7);
  border-color: var(--mantine-color-dark-4);
}

[data-mantine-color-scheme='dark'] .code-smell-card:hover {
  border-color: var(--mantine-color-blue-6);
}
```

## Best Practices for Refactorium

### 1. Use CSS Variables

- Always use Mantine CSS variables for consistency
- Create custom variables for project-specific values
- Use `light-dark()` function for theme-aware values

### 2. Organize Global Styles

```css
/* src/app/globals.css */
/* 1. Reset and base styles */
/* 2. Mantine overrides */
/* 3. Custom variables */
/* 4. Utility classes */
/* 5. Component styles */
/* 6. Dark mode overrides */
```

### 3. Responsive Design

```css
/* Use Mantine breakpoints */
@media (max-width: $mantine-breakpoint-sm) {
  .container {
    padding: 0 var(--mantine-spacing-sm);
  }
}
```

### 4. Performance

- Keep global styles minimal
- Use CSS variables for dynamic values
- Avoid deep nesting in global styles
- Use utility classes for common patterns

### 5. Maintenance

- Document custom global styles
- Use consistent naming conventions
- Group related styles together
- Regular cleanup of unused styles

### 6. Accessibility

```css
/* Focus management */
.focus-visible {
  outline: 2px solid var(--mantine-color-blue-6);
  outline-offset: 2px;
}

/* Screen reader only content */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
```

This approach ensures our Code Smell Playground has consistent, maintainable, and theme-aware global styling that integrates seamlessly with Mantine's design system.
