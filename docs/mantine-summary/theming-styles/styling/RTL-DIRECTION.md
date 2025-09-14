# RTL Direction (Refactorium)

This guide covers Mantine's RTL (Right-to-Left) direction support and how to implement it effectively in our Code Smell Playground project.

## Overview

Mantine provides comprehensive RTL support out of the box for all components. This includes proper text direction, layout mirroring, and RTL-specific styling using PostCSS mixins.

## Basic Setup

### DirectionProvider

Wrap your application with `DirectionProvider` to enable RTL support:

```tsx
// src/app/layout.tsx
import { DirectionProvider, MantineProvider } from '@mantine/core';
import { ThemeProvider } from '@/providers';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" dir="ltr">
      <head>
        <ColorSchemeScript defaultColorScheme="auto" />
      </head>
      <body>
        <DirectionProvider>
          <ThemeProvider>
            {children}
          </ThemeProvider>
        </DirectionProvider>
      </body>
    </html>
  );
}
```

### Refactorium-Specific Setup

```tsx
// src/providers/direction-provider.tsx
"use client";
import React from "react";
import { DirectionProvider } from "@mantine/core";

interface DirectionProviderWrapperProps {
  children: React.ReactNode;
}

export function DirectionProviderWrapper({ children }: DirectionProviderWrapperProps) {
  return (
    <DirectionProvider
      initialDirection="ltr"
      detectDirection={true}
    >
      {children}
    </DirectionProvider>
  );
}
```

```tsx
// src/providers/index.ts
export * from "./theme-provider";
export * from "./direction-provider";
```

```tsx
// src/app/layout.tsx
import { DirectionProviderWrapper } from "@/providers";
import { ThemeProvider } from "@/providers";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" dir="ltr">
      <head>
        <ColorSchemeScript defaultColorScheme="auto" />
      </head>
      <body>
        <DirectionProviderWrapper>
          <ThemeProvider>
            {children}
          </ThemeProvider>
        </DirectionProviderWrapper>
      </body>
    </html>
  );
}
```

## Direction Control

### useDirection Hook

Create a direction toggle component:

```tsx
// src/components/direction-toggle/index.tsx
"use client";
import { ActionIcon, useDirection } from "@mantine/core";
import { IconTextDirectionLtr, IconTextDirectionRtl } from "@tabler/icons-react";

export function DirectionToggle() {
  const { toggleDirection, dir } = useDirection();

  return (
    <ActionIcon
      onClick={toggleDirection}
      variant="default"
      radius="md"
      size="lg"
      aria-label={`Switch to ${dir === 'rtl' ? 'LTR' : 'RTL'} direction`}
    >
      {dir === 'rtl' ? (
        <IconTextDirectionLtr stroke={1.5} />
      ) : (
        <IconTextDirectionRtl stroke={1.5} />
      )}
    </ActionIcon>
  );
}
```

### Refactorium-Specific Direction Control

```tsx
// src/components/header/index.tsx
import { Group, Title, Button } from "@mantine/core";
import { DirectionToggle } from "@/components/direction-toggle";
import { ThemeToggle } from "@/components/theme-toggle";

export function Header() {
  return (
    <Group justify="space-between" align="center" p="md">
      <Title order={2}>Refactorium</Title>
      
      <Group gap="sm">
        <DirectionToggle />
        <ThemeToggle />
      </Group>
    </Group>
  );
}
```

## RTL Styling

### PostCSS RTL Mixin

Use the `@mixin rtl` for RTL-specific styles:

```css
/* CodeExample.module.css */
.codeExample {
  text-align: center;
  color: var(--mantine-color-white);
  padding: var(--mantine-spacing-md);
  border-radius: var(--mantine-radius-md);
  
  /* LTR styles */
  background-color: var(--mantine-color-blue-filled);
  border-left: 4px solid var(--mantine-color-blue-6);
  padding-left: var(--mantine-spacing-lg);
}

@mixin rtl {
  /* RTL styles override LTR styles */
  background-color: var(--mantine-color-red-filled);
  border-left: none;
  border-right: 4px solid var(--mantine-color-red-6);
  padding-left: var(--mantine-spacing-md);
  padding-right: var(--mantine-spacing-lg);
}
```

### Refactorium-Specific RTL Styles

```css
/* CodeExample.module.css */
.codeExample {
  border: 1px solid var(--mantine-color-gray-3);
  border-radius: var(--mantine-radius-md);
  padding: var(--mantine-spacing-lg);
  margin: var(--mantine-spacing-md) 0;
  position: relative;
}

.codeExample[data-variant="problem"] {
  border-left: 4px solid var(--mantine-color-red-5);
  background-color: var(--mantine-color-red-0);
}

.codeExample[data-variant="solution"] {
  border-left: 4px solid var(--mantine-color-green-5);
  background-color: var(--mantine-color-green-0);
}

@mixin rtl {
  .codeExample[data-variant="problem"] {
    border-left: none;
    border-right: 4px solid var(--mantine-color-red-5);
  }
  
  .codeExample[data-variant="solution"] {
    border-left: none;
    border-right: 4px solid var(--mantine-color-green-5);
  }
}
```

### Code Block RTL Styling

```css
/* CodeBlock.module.css */
.codeBlock {
  font-family: var(--mantine-font-family-monospace);
  font-size: var(--mantine-font-size-sm);
  line-height: 1.5;
  padding: var(--mantine-spacing-md);
  background-color: var(--mantine-color-gray-0);
  border-radius: var(--mantine-radius-sm);
  direction: ltr; /* Code should always be LTR */
  text-align: left;
  overflow-x: auto;
}

.codeBlockContainer {
  position: relative;
  margin: var(--mantine-spacing-md) 0;
}

.codeBlockContainer::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 4px;
  height: 100%;
  background-color: var(--mantine-color-blue-5);
  border-radius: var(--mantine-radius-sm) 0 0 var(--mantine-radius-sm);
}

@mixin rtl {
  .codeBlockContainer::before {
    left: auto;
    right: 0;
    border-radius: 0 var(--mantine-radius-sm) var(--mantine-radius-sm) 0;
  }
}
```

## RTL Components

### CodeExample Component

```tsx
// CodeExample.tsx
interface CodeExampleProps {
  code: string;
  language: string;
  variant: 'problem' | 'solution';
  title: string;
}

function CodeExample({ 
  code, 
  language, 
  variant, 
  title 
}: CodeExampleProps) {
  return (
    <Box
      className="code-example"
      mod={{ variant }}
      p="lg"
      m="md"
      bd="1px solid gray.3"
      bdrs="md"
    >
      <Box className="code-header" mb="md">
        <Title order={4}>{title}</Title>
        <Text size="sm" c="dimmed">
          {language}
        </Text>
      </Box>
      
      <Box className="code-block-container">
        <Box className="code-block">
          <pre>{code}</pre>
        </Box>
      </Box>
      
      <Box className="code-actions" mt="md">
        <Group gap="sm" justify="flex-end">
          <Button size="sm" variant="light">
            Explain
          </Button>
          <Button size="sm" variant="light">
            Refactor
          </Button>
        </Group>
      </Box>
    </Box>
  );
}
```

### Form Field RTL Support

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

.formInput {
  border: 1px solid var(--mantine-color-gray-3);
  border-radius: var(--mantine-radius-sm);
  padding: var(--mantine-spacing-sm);
  font-family: var(--mantine-font-family-monospace);
  direction: ltr; /* Code inputs should be LTR */
  text-align: left;
}

.formError {
  margin-top: var(--mantine-spacing-xs);
  color: var(--mantine-color-red-6);
  font-size: var(--mantine-font-size-xs);
}

@mixin rtl {
  .formField {
    text-align: right;
  }
  
  .formLabel {
    text-align: right;
  }
  
  .formError {
    text-align: right;
  }
}
```

### Navigation RTL Support

```css
/* Navigation.module.css */
.navigation {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--mantine-spacing-md);
  border-bottom: 1px solid var(--mantine-color-gray-3);
}

.navTitle {
  font-size: var(--mantine-font-size-lg);
  font-weight: 600;
  color: var(--mantine-color-text);
}

.navActions {
  display: flex;
  gap: var(--mantine-spacing-sm);
  align-items: center;
}

.navMenu {
  display: flex;
  gap: var(--mantine-spacing-md);
  list-style: none;
  margin: 0;
  padding: 0;
}

.navMenuItem {
  padding: var(--mantine-spacing-sm) var(--mantine-spacing-md);
  border-radius: var(--mantine-radius-sm);
  transition: background-color 0.2s ease;
}

.navMenuItem:hover {
  background-color: var(--mantine-color-gray-1);
}

@mixin rtl {
  .navigation {
    flex-direction: row-reverse;
  }
  
  .navMenu {
    flex-direction: row-reverse;
  }
}
```

## RTL Layout Patterns

### Grid Layout RTL

```css
/* ResponsiveGrid.module.css */
.grid {
  display: grid;
  gap: var(--mantine-spacing-md);
  grid-template-columns: 1fr;
}

@media (min-width: 768px) {
  .grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@mixin rtl {
  .grid {
    direction: rtl;
  }
}
```

### Flexbox RTL

```css
/* FlexLayout.module.css */
.flexContainer {
  display: flex;
  align-items: center;
  gap: var(--mantine-spacing-md);
  padding: var(--mantine-spacing-lg);
}

.flexItem {
  flex: 1;
  padding: var(--mantine-spacing-md);
  border-radius: var(--mantine-radius-sm);
  background-color: var(--mantine-color-gray-0);
}

@mixin rtl {
  .flexContainer {
    flex-direction: row-reverse;
  }
}
```

## RTL-Specific Components

### CodeExampleActions

```tsx
// CodeExampleActions.tsx
import { Group, Button, useDirection } from "@mantine/core";

function CodeExampleActions() {
  const { dir } = useDirection();
  
  return (
    <Group 
      gap="sm" 
      justify={dir === 'rtl' ? 'flex-start' : 'flex-end'}
      className="code-actions"
    >
      <Button size="sm" variant="light">
        Explain
      </Button>
      <Button size="sm" variant="light">
        Refactor
      </Button>
    </Group>
  );
}
```

### RTL-Aware Form

```tsx
// RTLForm.tsx
import { TextInput, Textarea, Button, Stack, useDirection } from "@mantine/core";

function RTLForm() {
  const { dir } = useDirection();
  
  return (
    <Stack gap="md" className="rtl-form">
      <TextInput
        label="Code Title"
        placeholder="Enter code title..."
        className="form-input"
      />
      
      <Textarea
        label="Code Description"
        placeholder="Describe the code smell..."
        minRows={3}
        className="form-textarea"
      />
      
      <Textarea
        label="Code"
        placeholder="Paste your code here..."
        minRows={8}
        className="form-code-input"
        style={{ direction: 'ltr' }} // Code should always be LTR
      />
      
      <Group justify={dir === 'rtl' ? 'flex-start' : 'flex-end'} gap="sm">
        <Button variant="light">Cancel</Button>
        <Button>Submit</Button>
      </Group>
    </Stack>
  );
}
```

## Advanced RTL Patterns

### RTL-Aware Icons

```tsx
// RTLIcon.tsx
import { IconChevronLeft, IconChevronRight, useDirection } from "@mantine/core";

interface RTLIconProps {
  onClick: () => void;
}

function RTLIcon({ onClick }: RTLIconProps) {
  const { dir } = useDirection();
  
  return (
    <ActionIcon onClick={onClick} variant="subtle">
      {dir === 'rtl' ? (
        <IconChevronRight size={16} />
      ) : (
        <IconChevronLeft size={16} />
      )}
    </ActionIcon>
  );
}
```

### RTL-Aware Spacing

```css
/* RTLSpacing.module.css */
.container {
  padding: var(--mantine-spacing-md);
  margin: var(--mantine-spacing-sm) 0;
}

.content {
  padding-left: var(--mantine-spacing-lg);
  border-left: 2px solid var(--mantine-color-blue-5);
}

@mixin rtl {
  .content {
    padding-left: var(--mantine-spacing-md);
    padding-right: var(--mantine-spacing-lg);
    border-left: none;
    border-right: 2px solid var(--mantine-color-blue-5);
  }
}
```

### RTL-Aware Animations

```css
/* RTLAnimations.module.css */
.slideIn {
  animation: slideInLeft 0.3s ease-out;
}

@keyframes slideInLeft {
  from {
    transform: translateX(-100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

@mixin rtl {
  .slideIn {
    animation: slideInRight 0.3s ease-out;
  }
  
  @keyframes slideInRight {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
}
```

## Testing RTL Support

### RTL Test Component

```tsx
// RTLTest.tsx
import { 
  Box, 
  Text, 
  Button, 
  Group, 
  useDirection 
} from "@mantine/core";

function RTLTest() {
  const { dir, setDirection, toggleDirection } = useDirection();
  
  return (
    <Box p="lg" bg="gray.0" bdrs="md">
      <Text fw={600} mb="md">
        RTL Test Component
      </Text>
      
      <Text mb="sm">
        Current direction: <strong>{dir}</strong>
      </Text>
      
      <Group gap="sm" mb="md">
        <Button onClick={() => setDirection('ltr')}>
          Set LTR
        </Button>
        <Button onClick={() => setDirection('rtl')}>
          Set RTL
        </Button>
        <Button onClick={toggleDirection}>
          Toggle Direction
        </Button>
      </Group>
      
      <Box
        p="md"
        bg="blue.0"
        bd="1px solid blue.3"
        bdrs="sm"
        style={{
          textAlign: dir === 'rtl' ? 'right' : 'left',
        }}
      >
        <Text>
          This text should align {dir === 'rtl' ? 'right' : 'left'} in {dir} mode.
        </Text>
      </Box>
    </Box>
  );
}
```

## Best Practices for Refactorium

### 1. Always Use DirectionProvider

- Wrap your app with DirectionProvider
- Set detectDirection to true for automatic detection
- Provide fallback direction for better UX

### 2. Code Content Should Remain LTR

- Use `direction: ltr` for code blocks
- Use `text-align: left` for code content
- Keep code inputs in LTR direction

### 3. Use RTL Mixins Consistently

- Use `@mixin rtl` for RTL-specific styles
- Test both LTR and RTL modes
- Ensure proper layout mirroring

### 4. Test RTL Functionality

- Test with different languages
- Verify icon and layout mirroring
- Check form and input behavior

### 5. Consider Cultural Differences

- Research RTL language conventions
- Test with native RTL speakers
- Consider cultural color preferences

### 6. Performance Considerations

- RTL styles add minimal overhead
- Use CSS variables for consistent theming
- Test performance in both directions

### 7. Accessibility

- Ensure proper text direction
- Test with screen readers
- Verify keyboard navigation works in both directions

This approach ensures our Code Smell Playground has comprehensive RTL support that works seamlessly across different languages and cultural contexts.
