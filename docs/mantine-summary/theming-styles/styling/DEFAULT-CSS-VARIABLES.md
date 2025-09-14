# Default CSS Variables List (Refactorium)

This guide provides a complete reference of all Mantine CSS variables generated from the default theme, organized for easy lookup in our Code Smell Playground project.

## Overview

Mantine generates CSS variables based on the theme configuration. These variables are automatically available throughout your application and adapt to light/dark color schemes.

## Variables Not Depending on Color Scheme

### Z-Index Variables

| Variable | Default Value | Usage |
|----------|---------------|-------|
| `--mantine-z-index-app` | `100` | Application-level content |
| `--mantine-z-index-modal` | `200` | Modal dialogs |
| `--mantine-z-index-popover` | `300` | Popovers and tooltips |
| `--mantine-z-index-overlay` | `400` | Overlay backgrounds |
| `--mantine-z-index-max` | `9999` | Maximum z-index |

### Scale and Cursor Variables

| Variable | Default Value | Usage |
|----------|---------------|-------|
| `--mantine-scale` | `1` | Global scale factor |
| `--mantine-cursor-type` | `default` | Default cursor type |

### Font Smoothing Variables

| Variable | Default Value | Usage |
|----------|---------------|-------|
| `--mantine-webkit-font-smoothing` | `antialiased` | WebKit font smoothing |
| `--mantine-moz-font-smoothing` | `grayscale` | Mozilla font smoothing |

### Basic Color Variables

| Variable | Default Value | Usage |
|----------|---------------|-------|
| `--mantine-color-white` | `#fff` | Pure white |
| `--mantine-color-black` | `#000` | Pure black |

### Typography Variables

| Variable | Default Value | Usage |
|----------|---------------|-------|
| `--mantine-line-height` | `1.55` | Default line height |
| `--mantine-font-family` | `-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji` | Main font family |
| `--mantine-font-family-monospace` | `ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, Liberation Mono, Courier New, monospace` | Monospace font family |
| `--mantine-font-family-headings` | `-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji` | Headings font family |
| `--mantine-heading-font-weight` | `700` | Default heading font weight |
| `--mantine-heading-text-wrap` | `wrap` | Default heading text wrap |

### Radius Variables

| Variable | Default Value | Usage |
|----------|---------------|-------|
| `--mantine-radius-default` | `0.25rem` | Default border radius |
| `--mantine-radius-xs` | `0.125rem` | Extra small radius |
| `--mantine-radius-sm` | `0.25rem` | Small radius |
| `--mantine-radius-md` | `0.5rem` | Medium radius |
| `--mantine-radius-lg` | `1rem` | Large radius |
| `--mantine-radius-xl` | `2rem` | Extra large radius |

### Primary Color Variables

| Variable | Default Value | Usage |
|----------|---------------|-------|
| `--mantine-primary-color-filled` | `var(--mantine-color-blue-filled)` | Primary filled color |
| `--mantine-primary-color-filled-hover` | `var(--mantine-color-blue-filled-hover)` | Primary filled hover |
| `--mantine-primary-color-light` | `var(--mantine-color-blue-light)` | Primary light color |
| `--mantine-primary-color-light-hover` | `var(--mantine-color-blue-light-hover)` | Primary light hover |
| `--mantine-primary-color-light-color` | `var(--mantine-color-blue-light-color)` | Primary light text color |

### Primary Color Shades

| Variable | Default Value | Usage |
|----------|---------------|-------|
| `--mantine-primary-color-0` | `var(--mantine-color-blue-0)` | Lightest primary shade |
| `--mantine-primary-color-1` | `var(--mantine-color-blue-1)` | Primary shade 1 |
| `--mantine-primary-color-2` | `var(--mantine-color-blue-2)` | Primary shade 2 |
| `--mantine-primary-color-3` | `var(--mantine-color-blue-3)` | Primary shade 3 |
| `--mantine-primary-color-4` | `var(--mantine-color-blue-4)` | Primary shade 4 |
| `--mantine-primary-color-5` | `var(--mantine-color-blue-5)` | Primary shade 5 |
| `--mantine-primary-color-6` | `var(--mantine-color-blue-6)` | Primary shade 6 (default) |
| `--mantine-primary-color-7` | `var(--mantine-color-blue-7)` | Primary shade 7 |
| `--mantine-primary-color-8` | `var(--mantine-color-blue-8)` | Primary shade 8 |
| `--mantine-primary-color-9` | `var(--mantine-color-blue-9)` | Darkest primary shade |

### Breakpoint Variables

| Variable | Default Value | Usage |
|----------|---------------|-------|
| `--mantine-breakpoint-xs` | `36em` | Extra small breakpoint |
| `--mantine-breakpoint-sm` | `48em` | Small breakpoint |
| `--mantine-breakpoint-md` | `62em` | Medium breakpoint |
| `--mantine-breakpoint-lg` | `75em` | Large breakpoint |
| `--mantine-breakpoint-xl` | `88em` | Extra large breakpoint |

### Spacing Variables

| Variable | Default Value | Usage |
|----------|---------------|-------|
| `--mantine-spacing-xs` | `0.625rem` | Extra small spacing |
| `--mantine-spacing-sm` | `0.75rem` | Small spacing |
| `--mantine-spacing-md` | `1rem` | Medium spacing |
| `--mantine-spacing-lg` | `1.25rem` | Large spacing |
| `--mantine-spacing-xl` | `2rem` | Extra large spacing |

### Font Size Variables

| Variable | Default Value | Usage |
|----------|---------------|-------|
| `--mantine-font-size-xs` | `0.75rem` | Extra small font size |
| `--mantine-font-size-sm` | `0.875rem` | Small font size |
| `--mantine-font-size-md` | `1rem` | Medium font size |
| `--mantine-font-size-lg` | `1.125rem` | Large font size |
| `--mantine-font-size-xl` | `1.25rem` | Extra large font size |

### Line Height Variables

| Variable | Default Value | Usage |
|----------|---------------|-------|
| `--mantine-line-height-xs` | `1.4` | Extra small line height |
| `--mantine-line-height-sm` | `1.45` | Small line height |
| `--mantine-line-height-md` | `1.55` | Medium line height |
| `--mantine-line-height-lg` | `1.6` | Large line height |
| `--mantine-line-height-xl` | `1.65` | Extra large line height |

### Shadow Variables

| Variable | Default Value | Usage |
|----------|---------------|-------|
| `--mantine-shadow-xs` | `0 0.0625rem 0.1875rem rgba(0, 0, 0, 0.05), 0 0.0625rem 0.125rem rgba(0, 0, 0, 0.1)` | Extra small shadow |
| `--mantine-shadow-sm` | `0 0.0625rem 0.1875rem rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0.05) 0 0.625rem 0.9375rem -0.3125rem, rgba(0, 0, 0, 0.04) 0 0.4375rem 0.4375rem -0.3125rem` | Small shadow |
| `--mantine-shadow-md` | `0 0.0625rem 0.1875rem rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0.05) 0 1.25rem 1.5625rem -0.3125rem, rgba(0, 0, 0, 0.04) 0 0.625rem 0.625rem -0.3125rem` | Medium shadow |
| `--mantine-shadow-lg` | `0 0.0625rem 0.1875rem rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0.05) 0 1.75rem 1.4375rem -0.4375rem, rgba(0, 0, 0, 0.04) 0 0.75rem 0.75rem -0.4375rem` | Large shadow |
| `--mantine-shadow-xl` | `0 0.0625rem 0.1875rem rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0.05) 0 2.25rem 1.75rem -0.4375rem, rgba(0, 0, 0, 0.04) 0 1.0625rem 1.0625rem -0.4375rem` | Extra large shadow |

## Color Palette Variables

### Dark Color Palette

| Variable | Default Value | Usage |
|----------|---------------|-------|
| `--mantine-color-dark-0` | `#C9C9C9` | Lightest dark shade |
| `--mantine-color-dark-1` | `#b8b8b8` | Dark shade 1 |
| `--mantine-color-dark-2` | `#828282` | Dark shade 2 |
| `--mantine-color-dark-3` | `#696969` | Dark shade 3 |
| `--mantine-color-dark-4` | `#424242` | Dark shade 4 |
| `--mantine-color-dark-5` | `#3b3b3b` | Dark shade 5 |
| `--mantine-color-dark-6` | `#2e2e2e` | Dark shade 6 |
| `--mantine-color-dark-7` | `#242424` | Dark shade 7 |
| `--mantine-color-dark-8` | `#1f1f1f` | Dark shade 8 |
| `--mantine-color-dark-9` | `#141414` | Darkest dark shade |

### Gray Color Palette

| Variable | Default Value | Usage |
|----------|---------------|-------|
| `--mantine-color-gray-0` | `#f8f9fa` | Lightest gray shade |
| `--mantine-color-gray-1` | `#f1f3f5` | Gray shade 1 |
| `--mantine-color-gray-2` | `#e9ecef` | Gray shade 2 |
| `--mantine-color-gray-3` | `#dee2e6` | Gray shade 3 |
| `--mantine-color-gray-4` | `#ced4da` | Gray shade 4 |
| `--mantine-color-gray-5` | `#adb5bd` | Gray shade 5 |
| `--mantine-color-gray-6` | `#868e96` | Gray shade 6 |
| `--mantine-color-gray-7` | `#495057` | Gray shade 7 |
| `--mantine-color-gray-8` | `#343a40` | Gray shade 8 |
| `--mantine-color-gray-9` | `#212529` | Darkest gray shade |

### Red Color Palette

| Variable | Default Value | Usage |
|----------|---------------|-------|
| `--mantine-color-red-0` | `#fff5f5` | Lightest red shade |
| `--mantine-color-red-1` | `#ffe3e3` | Red shade 1 |
| `--mantine-color-red-2` | `#ffc9c9` | Red shade 2 |
| `--mantine-color-red-3` | `#ffa8a8` | Red shade 3 |
| `--mantine-color-red-4` | `#ff8787` | Red shade 4 |
| `--mantine-color-red-5` | `#ff6b6b` | Red shade 5 |
| `--mantine-color-red-6` | `#fa5252` | Red shade 6 |
| `--mantine-color-red-7` | `#f03e3e` | Red shade 7 |
| `--mantine-color-red-8` | `#e03131` | Red shade 8 |
| `--mantine-color-red-9` | `#c92a2a` | Darkest red shade |

### Blue Color Palette

| Variable | Default Value | Usage |
|----------|---------------|-------|
| `--mantine-color-blue-0` | `#e7f5ff` | Lightest blue shade |
| `--mantine-color-blue-1` | `#d0ebff` | Blue shade 1 |
| `--mantine-color-blue-2` | `#a5d8ff` | Blue shade 2 |
| `--mantine-color-blue-3` | `#74c0fc` | Blue shade 3 |
| `--mantine-color-blue-4` | `#4dabf7` | Blue shade 4 |
| `--mantine-color-blue-5` | `#339af0` | Blue shade 5 |
| `--mantine-color-blue-6` | `#228be6` | Blue shade 6 |
| `--mantine-color-blue-7` | `#1c7ed6` | Blue shade 7 |
| `--mantine-color-blue-8` | `#1971c2` | Blue shade 8 |
| `--mantine-color-blue-9` | `#1864ab` | Darkest blue shade |

### Green Color Palette

| Variable | Default Value | Usage |
|----------|---------------|-------|
| `--mantine-color-green-0` | `#ebfbee` | Lightest green shade |
| `--mantine-color-green-1` | `#d3f9d8` | Green shade 1 |
| `--mantine-color-green-2` | `#b2f2bb` | Green shade 2 |
| `--mantine-color-green-3` | `#8ce99a` | Green shade 3 |
| `--mantine-color-green-4` | `#69db7c` | Green shade 4 |
| `--mantine-color-green-5` | `#51cf66` | Green shade 5 |
| `--mantine-color-green-6` | `#40c057` | Green shade 6 |
| `--mantine-color-green-7` | `#37b24d` | Green shade 7 |
| `--mantine-color-green-8` | `#2f9e44` | Green shade 8 |
| `--mantine-color-green-9` | `#2b8a3e` | Darkest green shade |

### Additional Color Palettes

| Color | Variables | Usage |
|-------|-----------|-------|
| Pink | `--mantine-color-pink-0` to `--mantine-color-pink-9` | Pink color variations |
| Grape | `--mantine-color-grape-0` to `--mantine-color-grape-9` | Grape color variations |
| Violet | `--mantine-color-violet-0` to `--mantine-color-violet-9` | Violet color variations |
| Indigo | `--mantine-color-indigo-0` to `--mantine-color-indigo-9` | Indigo color variations |
| Cyan | `--mantine-color-cyan-0` to `--mantine-color-cyan-9` | Cyan color variations |
| Teal | `--mantine-color-teal-0` to `--mantine-color-teal-9` | Teal color variations |
| Lime | `--mantine-color-lime-0` to `--mantine-color-lime-9` | Lime color variations |
| Yellow | `--mantine-color-yellow-0` to `--mantine-color-yellow-9` | Yellow color variations |
| Orange | `--mantine-color-orange-0` to `--mantine-color-orange-9` | Orange color variations |

## Heading Variables

### H1 Variables

| Variable | Default Value | Usage |
|----------|---------------|-------|
| `--mantine-h1-font-size` | `2.125rem` | H1 font size |
| `--mantine-h1-line-height` | `1.3` | H1 line height |
| `--mantine-h1-font-weight` | `700` | H1 font weight |

### H2 Variables

| Variable | Default Value | Usage |
|----------|---------------|-------|
| `--mantine-h2-font-size` | `1.625rem` | H2 font size |
| `--mantine-h2-line-height` | `1.35` | H2 line height |
| `--mantine-h2-font-weight` | `700` | H2 font weight |

### H3 Variables

| Variable | Default Value | Usage |
|----------|---------------|-------|
| `--mantine-h3-font-size` | `1.375rem` | H3 font size |
| `--mantine-h3-line-height` | `1.4` | H3 line height |
| `--mantine-h3-font-weight` | `700` | H3 font weight |

### H4 Variables

| Variable | Default Value | Usage |
|----------|---------------|-------|
| `--mantine-h4-font-size` | `1.125rem` | H4 font size |
| `--mantine-h4-line-height` | `1.45` | H4 line height |
| `--mantine-h4-font-weight` | `700` | H4 font weight |

### H5 Variables

| Variable | Default Value | Usage |
|----------|---------------|-------|
| `--mantine-h5-font-size` | `1rem` | H5 font size |
| `--mantine-h5-line-height` | `1.5` | H5 line height |
| `--mantine-h5-font-weight` | `700` | H5 font weight |

### H6 Variables

| Variable | Default Value | Usage |
|----------|---------------|-------|
| `--mantine-h6-font-size` | `0.875rem` | H6 font size |
| `--mantine-h6-line-height` | `1.5` | H6 line height |
| `--mantine-h6-font-weight` | `700` | H6 font weight |

## Light Color Scheme Variables

### Basic Light Variables

| Variable | Default Value | Usage |
|----------|---------------|-------|
| `--mantine-color-scheme` | `light` | Color scheme identifier |
| `--mantine-primary-color-contrast` | `var(--mantine-color-white)` | Primary contrast color |
| `--mantine-color-bright` | `var(--mantine-color-black)` | Bright text color |
| `--mantine-color-text` | `#000` | Main text color |
| `--mantine-color-body` | `#fff` | Body background color |
| `--mantine-color-error` | `var(--mantine-color-red-6)` | Error color |
| `--mantine-color-placeholder` | `var(--mantine-color-gray-5)` | Placeholder color |
| `--mantine-color-anchor` | `var(--mantine-color-blue-6)` | Link color |
| `--mantine-color-dimmed` | `var(--mantine-color-gray-6)` | Dimmed text color |

### Light Default Variant Variables

| Variable | Default Value | Usage |
|----------|---------------|-------|
| `--mantine-color-default` | `var(--mantine-color-white)` | Default background |
| `--mantine-color-default-hover` | `var(--mantine-color-gray-0)` | Default hover background |
| `--mantine-color-default-color` | `var(--mantine-color-black)` | Default text color |
| `--mantine-color-default-border` | `var(--mantine-color-gray-4)` | Default border color |

### Light Disabled Variables

| Variable | Default Value | Usage |
|----------|---------------|-------|
| `--mantine-color-disabled` | `var(--mantine-color-gray-2)` | Disabled background |
| `--mantine-color-disabled-color` | `var(--mantine-color-gray-5)` | Disabled text color |
| `--mantine-color-disabled-border` | `var(--mantine-color-gray-3)` | Disabled border color |

## Dark Color Scheme Variables

### Basic Dark Variables

| Variable | Default Value | Usage |
|----------|---------------|-------|
| `--mantine-color-scheme` | `dark` | Color scheme identifier |
| `--mantine-primary-color-contrast` | `var(--mantine-color-white)` | Primary contrast color |
| `--mantine-color-bright` | `var(--mantine-color-white)` | Bright text color |
| `--mantine-color-text` | `var(--mantine-color-dark-0)` | Main text color |
| `--mantine-color-body` | `var(--mantine-color-dark-7)` | Body background color |
| `--mantine-color-error` | `var(--mantine-color-red-8)` | Error color |
| `--mantine-color-placeholder` | `var(--mantine-color-dark-3)` | Placeholder color |
| `--mantine-color-anchor` | `var(--mantine-color-blue-4)` | Link color |
| `--mantine-color-dimmed` | `var(--mantine-color-dark-2)` | Dimmed text color |

### Dark Default Variant Variables

| Variable | Default Value | Usage |
|----------|---------------|-------|
| `--mantine-color-default` | `var(--mantine-color-dark-6)` | Default background |
| `--mantine-color-default-hover` | `var(--mantine-color-dark-5)` | Default hover background |
| `--mantine-color-default-color` | `var(--mantine-color-white)` | Default text color |
| `--mantine-color-default-border` | `var(--mantine-color-dark-4)` | Default border color |

### Dark Disabled Variables

| Variable | Default Value | Usage |
|----------|---------------|-------|
| `--mantine-color-disabled` | `var(--mantine-color-dark-6)` | Disabled background |
| `--mantine-color-disabled-color` | `var(--mantine-color-dark-3)` | Disabled text color |
| `--mantine-color-disabled-border` | `var(--mantine-color-dark-4)` | Disabled border color |

## Color Variant Variables

### Blue Variant Variables (Light)

| Variable | Default Value | Usage |
|----------|---------------|-------|
| `--mantine-color-blue-text` | `var(--mantine-color-blue-filled)` | Blue text color |
| `--mantine-color-blue-filled` | `var(--mantine-color-blue-6)` | Blue filled background |
| `--mantine-color-blue-filled-hover` | `var(--mantine-color-blue-7)` | Blue filled hover |
| `--mantine-color-blue-light` | `rgba(34, 139, 230, 0.1)` | Blue light background |
| `--mantine-color-blue-light-hover` | `rgba(34, 139, 230, 0.12)` | Blue light hover |
| `--mantine-color-blue-light-color` | `var(--mantine-color-blue-6)` | Blue light text |
| `--mantine-color-blue-outline` | `var(--mantine-color-blue-6)` | Blue outline border |
| `--mantine-color-blue-outline-hover` | `rgba(34, 139, 230, 0.05)` | Blue outline hover |

### Blue Variant Variables (Dark)

| Variable | Default Value | Usage |
|----------|---------------|-------|
| `--mantine-color-blue-text` | `var(--mantine-color-blue-filled)` | Blue text color |
| `--mantine-color-blue-filled` | `var(--mantine-color-blue-8)` | Blue filled background |
| `--mantine-color-blue-filled-hover` | `var(--mantine-color-blue-9)` | Blue filled hover |
| `--mantine-color-blue-light` | `rgba(34, 139, 230, 0.15)` | Blue light background |
| `--mantine-color-blue-light-hover` | `rgba(34, 139, 230, 0.2)` | Blue light hover |
| `--mantine-color-blue-light-color` | `var(--mantine-color-blue-3)` | Blue light text |
| `--mantine-color-blue-outline` | `var(--mantine-color-blue-4)` | Blue outline border |
| `--mantine-color-blue-outline-hover` | `rgba(77, 171, 247, 0.05)` | Blue outline hover |

## Refactorium-Specific Usage

### Code Example Styling

```css
/* CodeExampleContainer.module.css */
.container {
  background: var(--mantine-color-body);
  color: var(--mantine-color-text);
  border: 1px solid var(--mantine-color-gray-3);
  border-radius: var(--mantine-radius-md);
  padding: var(--mantine-spacing-lg);
  margin: var(--mantine-spacing-md) 0;
  box-shadow: var(--mantine-shadow-sm);
}

.title {
  color: var(--mantine-color-blue-8);
  font-size: var(--mantine-h3-font-size);
  font-weight: var(--mantine-h3-font-weight);
  line-height: var(--mantine-h3-line-height);
}

.codeBlock {
  background: var(--mantine-color-gray-0);
  color: var(--mantine-color-text);
  border: 1px solid var(--mantine-color-gray-2);
  border-radius: var(--mantine-radius-sm);
  padding: var(--mantine-spacing-md);
  font-family: var(--mantine-font-family-monospace);
  font-size: var(--mantine-font-size-sm);
  line-height: var(--mantine-line-height-md);
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
  background: var(--mantine-color-default-hover);
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
- Variables automatically adapt to light/dark color schemes
- Use primary color variables for brand consistency

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

This comprehensive reference ensures our Code Smell Playground has consistent, maintainable, and theme-aware styling using Mantine's CSS variables system.
