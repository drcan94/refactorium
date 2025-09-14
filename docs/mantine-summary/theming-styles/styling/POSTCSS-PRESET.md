# Mantine PostCSS Preset (Refactorium)

This guide covers the `postcss-preset-mantine` plugin and its features for our Code Smell Playground project, including advanced patterns and best practices.

## Overview

`postcss-preset-mantine` provides CSS functions and mixins to enhance styling capabilities. It's already installed in our project and configured in `postcss.config.cjs`.

## Current Configuration

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

## Included Plugins

The preset includes:
- **postcss-nested**: Nested CSS support
- **postcss-mixins**: Mantine-specific mixins
- **Custom plugin**: `rem`/`em` functions and other utilities

## Core Functions

### rem/em Functions

Convert pixels to rem/em units with automatic scaling:

```css
/* CodeExample.module.css */
.container {
  font-size: rem(16px);
  padding: rem(24px);
  margin: rem(16px);
  
  @media (min-width: em(768px)) {
    font-size: rem(20px);
    padding: rem(32px);
  }
}
```

**Transforms to:**
```css
.container {
  font-size: calc(1rem * var(--mantine-scale));
  padding: calc(1.5rem * var(--mantine-scale));
  margin: calc(1rem * var(--mantine-scale));
  
  @media (min-width: 48em) {
    font-size: calc(1.25rem * var(--mantine-scale));
    padding: calc(2rem * var(--mantine-scale));
  }
}
```

### Auto Convert px to rem

Enable automatic conversion in `postcss.config.cjs`:

```js
module.exports = {
  plugins: {
    'postcss-preset-mantine': {
      autoRem: true,
    },
  },
};
```

**Input:**
```css
.codeBlock {
  font-size: 16px;
  padding: 24px;
  margin: 16px;
}
```

**Output:**
```css
.codeBlock {
  font-size: calc(1rem * var(--mantine-scale));
  padding: calc(1.5rem * var(--mantine-scale));
  margin: calc(1rem * var(--mantine-scale));
}
```

**Note:** `autoRem` doesn't convert values in:
- `calc()`, `var()`, `clamp()`, `url()` functions
- `content` property
- `rgb()`, `rgba()`, `hsl()`, `hsla()` colors

## Color Scheme Mixins

### light/dark Mixins

```css
/* CodeExample.module.css */
.container {
  background: var(--mantine-color-gray-0);
  color: var(--mantine-color-text);
  border: 1px solid var(--mantine-color-gray-3);
  
  @mixin dark {
    background: var(--mantine-color-dark-7);
    color: var(--mantine-color-text);
    border-color: var(--mantine-color-dark-4);
  }
}

.title {
  color: var(--mantine-color-blue-8);
  
  @mixin dark {
    color: var(--mantine-color-blue-2);
  }
}
```

**Transforms to:**
```css
.container {
  background: var(--mantine-color-gray-0);
  color: var(--mantine-color-text);
  border: 1px solid var(--mantine-color-gray-3);
}

[data-mantine-color-scheme='dark'] .container {
  background: var(--mantine-color-dark-7);
  color: var(--mantine-color-text);
  border-color: var(--mantine-color-dark-4);
}

.title {
  color: var(--mantine-color-blue-8);
}

[data-mantine-color-scheme='dark'] .title {
  color: var(--mantine-color-blue-2);
}
```

### light-root/dark-root Mixins

For CSS variables on `:root`:

```css
/* globals.css */
:root {
  @mixin light-root {
    --code-bg: var(--mantine-color-gray-0);
    --code-border: var(--mantine-color-gray-3);
  }
  
  @mixin dark-root {
    --code-bg: var(--mantine-color-dark-8);
    --code-border: var(--mantine-color-dark-4);
  }
}
```

### light-dark Function

Alternative to mixins for simple cases:

```css
/* CodeExample.module.css */
.container {
  background: light-dark(
    var(--mantine-color-gray-0),
    var(--mantine-color-dark-7)
  );
  color: light-dark(
    var(--mantine-color-blue-8),
    var(--mantine-color-blue-2)
  );
  border: 1px solid light-dark(
    var(--mantine-color-gray-3),
    var(--mantine-color-dark-4)
  );
}
```

**Note:** `light-dark()` doesn't work on `:root` - use `light-root`/`dark-root` mixins instead.

## Responsive Mixins

### smaller-than/larger-than Mixins

```css
/* CodeExample.module.css */
.container {
  padding: rem(16px);
  
  @mixin smaller-than $mantine-breakpoint-sm {
    padding: rem(8px);
    font-size: rem(14px);
  }
  
  @mixin larger-than $mantine-breakpoint-md {
    padding: rem(24px);
    font-size: rem(18px);
  }
}

.codeBlock {
  font-size: rem(14px);
  
  @mixin smaller-than 768px {
    font-size: rem(12px);
    padding: rem(12px);
  }
}
```

**Transforms to:**
```css
.container {
  padding: calc(1rem * var(--mantine-scale));
}

@media (max-width: 47.99375em) {
  .container {
    padding: calc(0.5rem * var(--mantine-scale));
    font-size: calc(0.875rem * var(--mantine-scale));
  }
}

@media (min-width: 48em) {
  .container {
    padding: calc(1.5rem * var(--mantine-scale));
    font-size: calc(1.125rem * var(--mantine-scale));
  }
}

.codeBlock {
  font-size: calc(0.875rem * var(--mantine-scale));
}

@media (max-width: 47.99375em) {
  .codeBlock {
    font-size: calc(0.75rem * var(--mantine-scale));
    padding: calc(0.75rem * var(--mantine-scale));
  }
}
```

## Color Functions

### alpha Function

Add transparency to colors:

```css
/* CodeExample.module.css */
.highlight {
  background: alpha(var(--mantine-color-blue-6), 0.1);
  border: 1px solid alpha(var(--mantine-color-blue-6), 0.3);
}

.overlay {
  background: alpha(#000000, 0.5);
}
```

**Transforms to:**
```css
.highlight {
  background: color-mix(
    in srgb,
    var(--mantine-color-blue-6),
    transparent 90%
  );
  border: 1px solid color-mix(
    in srgb,
    var(--mantine-color-blue-6),
    transparent 70%
  );
}

.overlay {
  background: color-mix(in srgb, #000000, transparent 50%);
}
```

### lighten/darken Functions

```css
/* CodeExample.module.css */
.button {
  background: lighten(var(--mantine-color-blue-6), 0.1);
  border: 1px solid darken(var(--mantine-color-blue-6), 0.2);
}

.hover {
  background: lighten(var(--mantine-color-gray-6), 0.05);
}
```

**Transforms to:**
```css
.button {
  background: color-mix(
    in srgb,
    var(--mantine-color-blue-6),
    white 10%
  );
  border: 1px solid color-mix(
    in srgb,
    var(--mantine-color-blue-6),
    black 20%
  );
}

.hover {
  background: color-mix(
    in srgb,
    var(--mantine-color-gray-6),
    white 5%
  );
}
```

## Interactive Mixins

### hover Mixin

```css
/* CodeExample.module.css */
.button {
  background: var(--mantine-color-blue-6);
  color: white;
  transition: all 0.2s ease;
  
  @mixin hover {
    background: var(--mantine-color-blue-7);
    transform: translateY(-2px);
    box-shadow: var(--mantine-shadow-md);
  }
}

.card {
  border: 1px solid var(--mantine-color-gray-3);
  
  @mixin hover {
    border-color: var(--mantine-color-blue-6);
    box-shadow: var(--mantine-shadow-sm);
  }
}
```

**Transforms to:**
```css
.button {
  background: var(--mantine-color-blue-6);
  color: white;
  transition: all 0.2s ease;
}

@media (hover: hover) {
  .button:hover {
    background: var(--mantine-color-blue-7);
    transform: translateY(-2px);
    box-shadow: var(--mantine-shadow-md);
  }
}

@media (hover: none) {
  .button:active {
    background: var(--mantine-color-blue-7);
    transform: translateY(-2px);
    box-shadow: var(--mantine-shadow-md);
  }
}
```

## RTL/LTR Support

### rtl/ltr Mixins

```css
/* CodeExample.module.css */
.container {
  margin-left: rem(16px);
  padding-left: rem(24px);
  
  @mixin rtl {
    margin-left: 0;
    margin-right: rem(16px);
    padding-left: 0;
    padding-right: rem(24px);
  }
}

.icon {
  margin-right: rem(8px);
  
  @mixin rtl {
    margin-right: 0;
    margin-left: rem(8px);
  }
}
```

### not-rtl/not-ltr Mixins

```css
/* CodeExample.module.css */
.container {
  @mixin not-rtl {
    margin-right: rem(16px);
  }
  
  @mixin not-ltr {
    margin-left: rem(16px);
  }
}
```

## Refactorium-Specific Patterns

### Code Example Container

```css
/* CodeExampleContainer.module.css */
.container {
  background: light-dark(
    var(--mantine-color-gray-0),
    var(--mantine-color-dark-7)
  );
  border: 1px solid light-dark(
    var(--mantine-color-gray-3),
    var(--mantine-color-dark-4)
  );
  border-radius: rem(8px);
  padding: rem(24px);
  margin: rem(16px) 0;
  
  @mixin smaller-than $mantine-breakpoint-sm {
    padding: rem(16px);
    margin: rem(8px) 0;
  }
  
  @mixin hover {
    border-color: light-dark(
      var(--mantine-color-blue-4),
      var(--mantine-color-blue-6)
    );
    box-shadow: var(--mantine-shadow-sm);
  }
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: rem(16px);
  
  @mixin smaller-than $mantine-breakpoint-sm {
    flex-direction: column;
    align-items: flex-start;
    gap: rem(8px);
  }
}

.title {
  color: light-dark(
    var(--mantine-color-blue-8),
    var(--mantine-color-blue-2)
  );
  font-size: rem(18px);
  font-weight: 600;
  margin: 0;
  
  @mixin smaller-than $mantine-breakpoint-sm {
    font-size: rem(16px);
  }
}

.codeBlock {
  background: light-dark(
    var(--mantine-color-gray-1),
    var(--mantine-color-dark-8)
  );
  border: 1px solid light-dark(
    var(--mantine-color-gray-2),
    var(--mantine-color-dark-5)
  );
  border-radius: rem(6px);
  padding: rem(16px);
  font-family: var(--mantine-font-family-monospace);
  font-size: rem(14px);
  line-height: 1.5;
  overflow-x: auto;
  
  @mixin smaller-than $mantine-breakpoint-sm {
    padding: rem(12px);
    font-size: rem(12px);
  }
}

.actions {
  display: flex;
  gap: rem(8px);
  
  @mixin smaller-than $mantine-breakpoint-sm {
    width: 100%;
    justify-content: flex-end;
  }
}

.button {
  background: var(--mantine-color-blue-6);
  color: white;
  border: none;
  border-radius: rem(4px);
  padding: rem(8px) rem(16px);
  font-size: rem(12px);
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  
  @mixin hover {
    background: var(--mantine-color-blue-7);
    transform: translateY(-1px);
  }
  
  @mixin smaller-than $mantine-breakpoint-sm {
    padding: rem(6px) rem(12px);
    font-size: rem(11px);
  }
}
```

### Form Styling

```css
/* CodeSubmissionForm.module.css */
.formContainer {
  max-width: rem(800px);
  margin: 0 auto;
  padding: rem(32px);
  background: light-dark(
    var(--mantine-color-white),
    var(--mantine-color-dark-7)
  );
  border-radius: rem(12px);
  border: 1px solid light-dark(
    var(--mantine-color-gray-3),
    var(--mantine-color-dark-4)
  );
  
  @mixin smaller-than $mantine-breakpoint-sm {
    padding: rem(16px);
    margin: rem(8px);
  }
}

.formTitle {
  color: light-dark(
    var(--mantine-color-blue-8),
    var(--mantine-color-blue-2)
  );
  font-size: rem(24px);
  font-weight: 700;
  margin-bottom: rem(24px);
  text-align: center;
  
  @mixin smaller-than $mantine-breakpoint-sm {
    font-size: rem(20px);
    margin-bottom: rem(16px);
  }
}

.fieldRoot {
  margin-bottom: rem(16px);
}

.input {
  border: 2px solid light-dark(
    var(--mantine-color-gray-3),
    var(--mantine-color-dark-4)
  );
  border-radius: rem(6px);
  padding: rem(12px);
  font-size: rem(14px);
  transition: border-color 0.2s ease;
  
  &:focus {
    border-color: var(--mantine-color-blue-6);
    box-shadow: 0 0 0 2px alpha(var(--mantine-color-blue-6), 0.2);
  }
  
  @mixin smaller-than $mantine-breakpoint-sm {
    padding: rem(10px);
    font-size: rem(13px);
  }
}

.codeInput {
  font-family: var(--mantine-font-family-monospace);
  font-size: rem(13px);
  line-height: 1.5;
  
  @mixin smaller-than $mantine-breakpoint-sm {
    font-size: rem(12px);
  }
}

.label {
  color: light-dark(
    var(--mantine-color-blue-8),
    var(--mantine-color-blue-2)
  );
  font-weight: 600;
  margin-bottom: rem(8px);
  font-size: rem(14px);
  
  @mixin smaller-than $mantine-breakpoint-sm {
    font-size: rem(13px);
  }
}

.formActions {
  display: flex;
  gap: rem(16px);
  justify-content: center;
  margin-top: rem(32px);
  
  @mixin smaller-than $mantine-breakpoint-sm {
    flex-direction: column;
    gap: rem(12px);
    margin-top: rem(24px);
  }
}

.submitButton {
  background: var(--mantine-color-blue-6);
  color: white;
  border: none;
  border-radius: rem(6px);
  padding: rem(12px) rem(24px);
  font-size: rem(14px);
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  
  @mixin hover {
    background: var(--mantine-color-blue-7);
    transform: translateY(-1px);
    box-shadow: var(--mantine-shadow-sm);
  }
  
  @mixin smaller-than $mantine-breakpoint-sm {
    padding: rem(10px) rem(20px);
    font-size: rem(13px);
  }
}

.cancelButton {
  background: transparent;
  color: light-dark(
    var(--mantine-color-gray-6),
    var(--mantine-color-gray-4)
  );
  border: 1px solid light-dark(
    var(--mantine-color-gray-3),
    var(--mantine-color-dark-4)
  );
  border-radius: rem(6px);
  padding: rem(12px) rem(24px);
  font-size: rem(14px);
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  
  @mixin hover {
    background: light-dark(
      var(--mantine-color-gray-0),
      var(--mantine-color-dark-6)
    );
    border-color: light-dark(
      var(--mantine-color-gray-4),
      var(--mantine-color-dark-3)
    );
  }
  
  @mixin smaller-than $mantine-breakpoint-sm {
    padding: rem(10px) rem(20px);
    font-size: rem(13px);
  }
}
```

## Custom Mixins

### Adding Custom Mixins

```js
// postcss.config.cjs
module.exports = {
  plugins: {
    'postcss-preset-mantine': {
      autoRem: true,
      mixins: {
        // Clearfix mixin
        clearfix: {
          '&::after': {
            content: '""',
            display: 'table',
            clear: 'both',
          },
        },
        
        // Circle mixin
        circle: (_mixin, size) => ({
          borderRadius: '50%',
          width: size,
          height: size,
        }),
        
        // Code block mixin
        codeBlock: {
          fontFamily: 'var(--mantine-font-family-monospace)',
          fontSize: 'rem(14px)',
          lineHeight: '1.5',
          backgroundColor: 'light-dark(var(--mantine-color-gray-0), var(--mantine-color-dark-8))',
          border: '1px solid light-dark(var(--mantine-color-gray-2), var(--mantine-color-dark-5))',
          borderRadius: 'rem(6px)',
          padding: 'rem(16px)',
          overflowX: 'auto',
        },
        
        // Button mixin
        button: {
          border: 'none',
          borderRadius: 'rem(6px)',
          padding: 'rem(8px) rem(16px)',
          fontSize: 'rem(14px)',
          fontWeight: '500',
          cursor: 'pointer',
          transition: 'all 0.2s ease',
          
          '@mixin hover': {
            transform: 'translateY(-1px)',
          },
        },
      },
    },
  },
};
```

### Using Custom Mixins

```css
/* CodeExample.module.css */
.container {
  @mixin clearfix;
}

.avatar {
  @mixin circle rem(40px);
}

.codeBlock {
  @mixin codeBlock;
}

.button {
  @mixin button;
  background: var(--mantine-color-blue-6);
  color: white;
}
```

## Advanced Configuration

### Disable Specific Features

```js
// postcss.config.cjs
module.exports = {
  plugins: {
    'postcss-preset-mantine': {
      autoRem: true,
      features: {
        // Turn off specific features
        lightDarkFunction: false,
        nested: false,
        colorMixAlpha: false,
        remEmFunctions: false,
        mixins: false,
      },
    },
  },
};
```

### Recommended Configuration for Refactorium

```js
// postcss.config.cjs
module.exports = {
  plugins: {
    'postcss-preset-mantine': {
      autoRem: true,
      mixins: {
        // Custom mixins for our project
        codeExample: {
          backgroundColor: 'light-dark(var(--mantine-color-gray-0), var(--mantine-color-dark-7))',
          border: '1px solid light-dark(var(--mantine-color-gray-3), var(--mantine-color-dark-4))',
          borderRadius: 'rem(8px)',
          padding: 'rem(24px)',
          margin: 'rem(16px) 0',
        },
        
        codeBlock: {
          fontFamily: 'var(--mantine-font-family-monospace)',
          fontSize: 'rem(14px)',
          lineHeight: '1.5',
          backgroundColor: 'light-dark(var(--mantine-color-gray-1), var(--mantine-color-dark-8))',
          border: '1px solid light-dark(var(--mantine-color-gray-2), var(--mantine-color-dark-5))',
          borderRadius: 'rem(6px)',
          padding: 'rem(16px)',
          overflowX: 'auto',
        },
        
        refactorButton: {
          backgroundColor: 'var(--mantine-color-blue-6)',
          color: 'white',
          border: 'none',
          borderRadius: 'rem(6px)',
          padding: 'rem(8px) rem(16px)',
          fontSize: 'rem(14px)',
          fontWeight: '500',
          cursor: 'pointer',
          transition: 'all 0.2s ease',
          
          '@mixin hover': {
            backgroundColor: 'var(--mantine-color-blue-7)',
            transform: 'translateY(-1px)',
          },
        },
      },
    },
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

## Best Practices for Refactorium

### 1. Use rem/em Functions

- Use `rem()` for most measurements
- Use `em()` for media queries
- Enable `autoRem` for automatic conversion

### 2. Leverage Color Scheme Mixins

- Use `light-dark()` for simple cases
- Use `@mixin light`/`@mixin dark` for complex styling
- Use `light-root`/`dark-root` for CSS variables

### 3. Responsive Design

- Use `@mixin smaller-than`/`@mixin larger-than` with Mantine breakpoints
- Test on different screen sizes
- Consider mobile-first approach

### 4. Performance

- Use `@mixin hover` for interactive elements
- Leverage `alpha()`, `lighten()`, `darken()` for color variations
- Keep mixins focused and reusable

### 5. Maintenance

- Create custom mixins for repeated patterns
- Document complex mixins
- Use consistent naming conventions

This approach ensures our Code Smell Playground has maintainable, responsive, and theme-aware styling using Mantine's PostCSS preset.
