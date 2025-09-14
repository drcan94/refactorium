## Mantine — Getting Started (Refactorium)

This document summarizes only what we need for our project: Next.js (App Router) with Mantine, using server-side rendering and PostCSS. We already use many Mantine packages and have the core setup in place.

### What we already have

- Next.js App Router (SSR-ready) with React 19
- Mantine core stack installed (`@mantine/core`, `@mantine/hooks`, plus optional packages we chose)
- PostCSS configured with `postcss-preset-mantine` and `postcss-simple-vars`
- Global Mantine styles imported in `src/app/layout.tsx`
- `ColorSchemeScript` added to `<head />`
- `MantineProvider` wrapping the app with a basic `createTheme(...)`

### Minimal required setup (Next.js App Router)

1) Install core packages (already done):

```bash
npm install @mantine/core @mantine/hooks
```

Install optional Mantine packages as needed (we already installed many, e.g., `@mantine/modals`, `@mantine/notifications`, `@mantine/charts`, `@mantine/tiptap`, etc.).

2) Configure PostCSS (already done):

`postcss.config.cjs` should include:

```js
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

3) Import Mantine styles once at the root (already done):

```ts
// src/app/layout.tsx
import '@mantine/core/styles.css';
```

Add other package-specific CSS imports only if you use those components (for example `@mantine/dates/styles.css`, `@mantine/dropzone/styles.css`, etc.).

4) Wrap the application with `MantineProvider` and theme (already done, can expand as needed):

```tsx
import { MantineProvider, createTheme } from '@mantine/core';

const theme = createTheme({
  // Put project theme overrides here
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>{/* <ColorSchemeScript /> goes here */}</head>
      <body>
        <MantineProvider theme={theme} defaultColorScheme="dark">
          {children}
        </MantineProvider>
      </body>
    </html>
  );
}
```

5) SSR color scheme support (already done):

Place `ColorSchemeScript` in `<head />` of `layout.tsx`:

```tsx
import { ColorSchemeScript } from '@mantine/core';

<head>
  <ColorSchemeScript />
</head>
```

### Optional Mantine packages we may use

Only import styles and APIs for packages we actually use:

- `@mantine/modals`, `@mantine/notifications`, `@mantine/nprogress`, `@mantine/spotlight`
- `@mantine/form`, `@mantine/dates`, `@mantine/dropzone`
- `@mantine/code-highlight`, `@mantine/tiptap`
- `@mantine/charts` (Recharts-based), `@mantine/carousel` (Embla-based)

Refer to each package docs for usage and any additional CSS imports.

### VS Code setup (useful for PostCSS)

- Install “PostCSS Intellisense and Highlighting” to recognize PostCSS syntax.
- For CSS variables autocomplete, install “CSS Variable Autocomplete” and add `.vscode/settings.json`:

```json
{
  "cssVariables.lookupFiles": [
    "**/*.css",
    "**/*.scss",
    "**/*.sass",
    "**/*.less",
    "node_modules/@mantine/core/styles.css"
  ]
}
```

### What to do next for our project

- Evolve `createTheme` with brand colors, fonts, radius, and spacing tokens.
- Import styles for any new Mantine package only when used.
- Build shared layout structure (Header/Navigation/Footer) inside `layout.tsx` using Mantine components.
- Keep PostCSS variables as single source of truth for responsive breakpoints.


