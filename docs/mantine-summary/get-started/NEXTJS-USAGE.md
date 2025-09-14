# Next.js Usage with Mantine (Refactorium)

This guide covers Mantine integration with Next.js App Router, specifically tailored for our Refactorium project setup.

## Project Overview

Refactorium is a **Code Smell Playground** that helps developers learn refactoring through interactive examples. We use Next.js 15.5.3 with App Router and Mantine 8.3.1 for UI components.

## Installed Mantine Packages

Our project includes these Mantine packages:

| Package | Purpose | Usage in Refactorium |
|---------|---------|---------------------|
| `@mantine/core` | Core components (inputs, buttons, overlays) | Main UI components for code examples |
| `@mantine/hooks` | State and UI management hooks | Theme toggling, form state, interactions |
| `@mantine/form` | Form management | Code input forms, user submissions |
| `@mantine/dates` | Date inputs, calendars | Timestamps for code examples |
| `@mantine/charts` | Recharts-based charts | Analytics for refactoring patterns |
| `@mantine/notifications` | Notifications system | User feedback, success/error messages |
| `@mantine/code-highlight` | Code highlighting | Syntax highlighting for code examples |
| `@mantine/tiptap` | Rich text editor | Code documentation, comments |
| `@mantine/dropzone` | File drag & drop | Code file uploads |
| `@mantine/carousel` | Embla-based carousel | Code example navigation |
| `@mantine/spotlight` | Overlay command center | Quick navigation between examples |
| `@mantine/modals` | Centralized modals | Code example details, confirmations |
| `@mantine/nprogress` | Navigation progress | Loading states during navigation |

## App Router Setup

### 1. Layout Configuration (`src/app/layout.tsx`)

```tsx
// Import styles of packages that you've installed
import "@mantine/core/styles.css";

import { ColorSchemeScript, mantineHtmlProps } from "@mantine/core";
import "./globals.css";
import { ThemeProvider } from "@/providers";

export const metadata = {
  title: "Refactorium - Code Smell Playground",
  description: "Learn refactoring through interactive code examples",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" {...mantineHtmlProps}>
      <head>
        <ColorSchemeScript defaultColorScheme="auto" />
      </head>
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
```

### 2. Theme Provider (`src/providers/theme-provider.tsx`)

```tsx
"use client";
import React from "react";
import {
  MantineProvider,
  localStorageColorSchemeManager,
  createTheme,
} from "@mantine/core";

const colorSchemeManager = localStorageColorSchemeManager({
  key: "refactorium-color-scheme",
});

const theme = createTheme({
  fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, Noto Sans, Helvetica, Arial, sans-serif",
  primaryColor: "blue",
  primaryShade: { light: 6, dark: 8 },
  defaultRadius: "sm",
  focusRing: "auto",
  autoContrast: true,
  headings: {
    fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, Noto Sans, Helvetica, Arial, sans-serif",
    fontWeight: "600",
    textWrap: "balance",
  },
  colors: {
    dark: [
      "#C1C2C5", "#A6A7AB", "#909296", "#5c5f66", "#373A40",
      "#2C2E33", "#25262b", "#1A1B23", "#141517", "#101113",
    ],
  },
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <MantineProvider
      theme={theme}
      defaultColorScheme="auto"
      colorSchemeManager={colorSchemeManager}
      withGlobalClasses
    >
      {children}
    </MantineProvider>
  );
}
```

### 3. PostCSS Configuration (`postcss.config.cjs`)

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

## Server vs Client Components

### Key Rules for Refactorium

1. **All Mantine components are client components** - they use `useContext` internally
2. **Entry points have 'use client' directive** - no need to add it manually
3. **Server components can import Mantine components** - they'll render on both server and client

### Compound Components Pattern

For server components, use `ComponentXXX` syntax instead of `Component.XXX`:

```tsx
// ❌ Won't work in server components
import { Popover } from '@mantine/core';

export default function CodeExample() {
  return (
    <Popover>
      <Popover.Target>Show Code</Popover.Target>
      <Popover.Dropdown>Code content</Popover.Dropdown>
    </Popover>
  );
}

// ✅ Works in server components
import { Popover, PopoverDropdown, PopoverTarget } from '@mantine/core';

export default function CodeExample() {
  return (
    <Popover>
      <PopoverTarget>Show Code</PopoverTarget>
      <PopoverDropdown>Code content</PopoverDropdown>
    </Popover>
  );
}
```

### Client Components for Interactivity

Use `"use client"` for components with:
- Theme toggling
- Form interactions
- State management
- Event handlers

```tsx
"use client";
import { useMantineColorScheme } from '@mantine/core';
import { ThemeToggle } from '@/components';

export function InteractiveHeader() {
  const { setColorScheme } = useMantineColorScheme();
  // ... component logic
}
```

## Next.js Link Integration

Use polymorphic components for navigation:

```tsx
import Link from 'next/link';
import { Button } from '@mantine/core';

export function NavigationButton() {
  return (
    <Button component={Link} href="/code-smells">
      Explore Code Smells
    </Button>
  );
}
```

## Tree Shaking Optimization

Enable package optimization in `next.config.ts`:

```ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    optimizePackageImports: [
      '@mantine/core',
      '@mantine/hooks',
      '@mantine/form',
      '@mantine/dates',
      '@mantine/charts',
      '@mantine/notifications',
      '@mantine/code-highlight',
      '@mantine/tiptap',
      '@mantine/dropzone',
      '@mantine/carousel',
      '@mantine/spotlight',
      '@mantine/modals',
      '@mantine/nprogress',
    ],
  },
};

export default nextConfig;
```

## Refactorium-Specific Patterns

### Code Example Components

```tsx
import { CodeHighlight } from '@mantine/code-highlight';
import { Card, Stack, Title, Text } from '@mantine/core';

export function CodeSmellExample({ 
  title, 
  problemCode, 
  solutionCode, 
  language = 'typescript' 
}) {
  return (
    <Card>
      <Stack>
        <Title order={3}>{title}</Title>
        <Text size="sm" c="dimmed">Problem:</Text>
        <CodeHighlight code={problemCode} language={language} />
        <Text size="sm" c="dimmed">Solution:</Text>
        <CodeHighlight code={solutionCode} language={language} />
      </Stack>
    </Card>
  );
}
```

### Theme-Aware Components

```tsx
"use client";
import { useMantineColorScheme, useComputedColorScheme } from '@mantine/core';

export function CodeBlock({ children }) {
  const computedColorScheme = useComputedColorScheme('light', { 
    getInitialValueInEffect: true 
  });
  
  return (
    <div 
      className={`code-block ${computedColorScheme === 'dark' ? 'dark' : 'light'}`}
    >
      {children}
    </div>
  );
}
```

## Troubleshooting

### Common Issues

1. **Hydration mismatches**: Ensure `ColorSchemeScript` is in `<head>` and `defaultColorScheme` matches
2. **White flash on dark mode**: Use `color-scheme: light dark` in CSS and proper theme setup
3. **Server/client boundaries**: Keep `localStorageColorSchemeManager` in client components only
4. **Import errors**: Use `@/` alias for internal imports, full package names for Mantine

### Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm run start

# Lint code
npm run lint
```

## Best Practices for Refactorium

1. **Modular components**: Keep components under 200 LOC, use atomic design
2. **Type safety**: No `any` types, use proper TypeScript interfaces
3. **Theme consistency**: Use design tokens from theme object
4. **Accessibility**: Include proper ARIA labels and keyboard navigation
5. **Performance**: Use tree shaking and optimize imports
6. **Code examples**: Use `@mantine/code-highlight` for syntax highlighting
7. **User feedback**: Implement `@mantine/notifications` for user interactions
8. **Navigation**: Use `@mantine/spotlight` for quick code smell discovery

This setup provides a solid foundation for building an interactive code refactoring learning platform with Mantine and Next.js.
