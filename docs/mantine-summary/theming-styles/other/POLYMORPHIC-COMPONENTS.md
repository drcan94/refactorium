# Polymorphic Components (Refactorium)

This guide covers Mantine's polymorphic components system and how to use them effectively for flexible component composition in our Code Smell Playground project.

## Overview

Polymorphic components allow you to change the root element of a component using the `component` prop or `renderRoot` function. This provides flexibility in component composition while maintaining consistent styling and behavior.

## Basic Usage

### component Prop

Change the root element using the `component` prop:

```tsx
import { Button } from '@mantine/core';

function BasicExample() {
  return (
    <Button component="a" href="https://mantine.dev/" target="_blank">
      Mantine website
    </Button>
  );
}
```

### Refactorium-Specific Examples

```tsx
// CodeExampleLink.tsx
import { Button } from '@mantine/core';

function CodeExampleLink({ 
  href, 
  children 
}: { 
  href: string; 
  children: React.ReactNode; 
}) {
  return (
    <Button 
      component="a" 
      href={href} 
      target="_blank"
      variant="light"
      size="sm"
    >
      {children}
    </Button>
  );
}

// Usage
function CodeExampleActions() {
  return (
    <Group gap="sm">
      <CodeExampleLink href="/explain">
        Explain Code
      </CodeExampleLink>
      <CodeExampleLink href="/refactor">
        Show Refactor
      </CodeExampleLink>
    </Group>
  );
}
```

## renderRoot Prop

### Basic Usage

Use `renderRoot` for more complex component composition:

```tsx
import { Button } from '@mantine/core';

function RenderRootExample() {
  return (
    <Button
      renderRoot={(props) => (
        <a href="https://mantine.dev/" target="_blank" {...props} />
      )}
    >
      Mantine website
    </Button>
  );
}
```

### Refactorium-Specific renderRoot Usage

```tsx
// CodeExampleCard.tsx
import { Box, Text, Group } from '@mantine/core';

function CodeExampleCard({ 
  code, 
  language, 
  variant 
}: { 
  code: string; 
  language: string; 
  variant: 'problem' | 'solution'; 
}) {
  return (
    <Box
      renderRoot={(props) => (
        <article 
          {...props}
          data-variant={variant}
          data-language={language}
        />
      )}
      p="lg"
      bg="gray.0"
      bd="1px solid gray.3"
      bdrs="md"
    >
      <Text fw={600} mb="sm">
        {variant === 'problem' ? 'Problem' : 'Solution'}
      </Text>
      <Text size="sm" c="dimmed" mb="md">
        {language}
      </Text>
      <Box
        component="pre"
        ff="monospace"
        fz="sm"
        p="md"
        bg="gray.1"
        bdrs="sm"
      >
        {code}
      </Box>
    </Box>
  );
}
```

## React Router Integration

### Basic Router Link

```tsx
import { Link } from 'react-router-dom';
import { Button } from '@mantine/core';

function RouterLinkExample() {
  return (
    <Button component={Link} to="/code-examples">
      View Code Examples
    </Button>
  );
}
```

### Refactorium-Specific Router Integration

```tsx
// NavigationButton.tsx
import { Link } from 'react-router-dom';
import { Button } from '@mantine/core';

interface NavigationButtonProps {
  to: string;
  children: React.ReactNode;
  variant?: 'problem' | 'solution' | 'explain';
}

function NavigationButton({ 
  to, 
  children, 
  variant = 'problem' 
}: NavigationButtonProps) {
  const variantProps = {
    problem: { color: 'red', variant: 'light' as const },
    solution: { color: 'green', variant: 'light' as const },
    explain: { color: 'blue', variant: 'light' as const },
  };

  return (
    <Button
      component={Link}
      to={to}
      size="sm"
      {...variantProps[variant]}
    >
      {children}
    </Button>
  );
}
```

## Next.js Integration

### Next.js 13+ Link

```tsx
import Link from 'next/link';
import { Button } from '@mantine/core';

function NextLinkExample() {
  return (
    <Button component={Link} href="/code-examples">
      View Code Examples
    </Button>
  );
}
```

### Refactorium-Specific Next.js Integration

```tsx
// CodeExampleNavigation.tsx
import Link from 'next/link';
import { Button, Group } from '@mantine/core';

function CodeExampleNavigation({ 
  exampleId 
}: { 
  exampleId: string; 
}) {
  return (
    <Group gap="sm">
      <Button
        component={Link}
        href={`/examples/${exampleId}/problem`}
        variant="light"
        color="red"
        size="sm"
      >
        Problem
      </Button>
      <Button
        component={Link}
        href={`/examples/${exampleId}/solution`}
        variant="light"
        color="green"
        size="sm"
      >
        Solution
      </Button>
      <Button
        component={Link}
        href={`/examples/${exampleId}/explain`}
        variant="light"
        color="blue"
        size="sm"
      >
        Explain
      </Button>
    </Group>
  );
}
```

## Generic Components

### Using renderRoot with Generic Components

```tsx
import Link from 'next/link';
import { Button } from '@mantine/core';

function GenericComponentExample() {
  return (
    <Button 
      renderRoot={(props) => <Link href="/hello" {...props} />}
    >
      Typed Next link button
    </Button>
  );
}
```

### Refactorium-Specific Generic Usage

```tsx
// CodeExampleLink.tsx
import Link from 'next/link';
import { Button } from '@mantine/core';

interface CodeExampleLinkProps {
  href: string;
  children: React.ReactNode;
  variant?: 'problem' | 'solution' | 'explain';
}

function CodeExampleLink({ 
  href, 
  children, 
  variant = 'problem' 
}: CodeExampleLinkProps) {
  const variantProps = {
    problem: { color: 'red', variant: 'light' as const },
    solution: { color: 'green', variant: 'light' as const },
    explain: { color: 'blue', variant: 'light' as const },
  };

  return (
    <Button
      renderRoot={(props) => <Link href={href} {...props} />}
      size="sm"
      {...variantProps[variant]}
    >
      {children}
    </Button>
  );
}
```

## NavLink Integration

### React Router NavLink

```tsx
import cx from 'clsx';
import { NavLink } from 'react-router-dom';
import { Button } from '@mantine/core';

function NavLinkExample() {
  return (
    <Button
      renderRoot={({ className, ...others }) => (
        <NavLink
          className={({ isActive }) =>
            cx(className, { 'active-class': isActive })
          }
          {...others}
        />
      )}
    >
      React router NavLink
    </Button>
  );
}
```

### Refactorium-Specific NavLink

```tsx
// CodeExampleNavLink.tsx
import cx from 'clsx';
import { NavLink } from 'react-router-dom';
import { Button } from '@mantine/core';

interface CodeExampleNavLinkProps {
  to: string;
  children: React.ReactNode;
  variant?: 'problem' | 'solution' | 'explain';
}

function CodeExampleNavLink({ 
  to, 
  children, 
  variant = 'problem' 
}: CodeExampleNavLinkProps) {
  const variantProps = {
    problem: { color: 'red', variant: 'light' as const },
    solution: { color: 'green', variant: 'light' as const },
    explain: { color: 'blue', variant: 'light' as const },
  };

  return (
    <Button
      renderRoot={({ className, ...others }) => (
        <NavLink
          to={to}
          className={({ isActive }) =>
            cx(className, { 'active-code-link': isActive })
          }
          {...others}
        />
      )}
      size="sm"
      {...variantProps[variant]}
    >
      {children}
    </Button>
  );
}
```

## Wrapping Polymorphic Components

### Non-Polymorphic Wrapper

```tsx
import { forwardRef } from 'react';
import { Button, ButtonProps } from '@mantine/core';

interface LinkButtonProps
  extends ButtonProps,
    Omit<React.ComponentPropsWithoutRef<'a'>, keyof ButtonProps> {}

const LinkButton = forwardRef<HTMLAnchorElement, LinkButtonProps>(
  (props, ref) => (
    <Button {...props} ref={ref} component="a" />
  )
);

// Usage
function RefactoriumLinkButton({ 
  href, 
  children 
}: { 
  href: string; 
  children: React.ReactNode; 
}) {
  return (
    <LinkButton 
      href={href} 
      target="_blank"
      variant="light"
      color="blue"
    >
      {children}
    </LinkButton>
  );
}
```

### Polymorphic Wrapper

```tsx
import { forwardRef } from 'react';
import { 
  createPolymorphicComponent, 
  Button, 
  ButtonProps 
} from '@mantine/core';

interface CodeActionButtonProps extends ButtonProps {
  action: 'explain' | 'refactor' | 'compare';
  codeId: string;
}

const CodeActionButton = createPolymorphicComponent<
  'button', 
  CodeActionButtonProps
>(
  forwardRef<HTMLButtonElement, CodeActionButtonProps>(
    ({ action, codeId, ...others }, ref) => (
      <Button 
        {...others} 
        ref={ref}
        data-action={action}
        data-code-id={codeId}
      >
        {action === 'explain' && 'Explain'}
        {action === 'refactor' && 'Refactor'}
        {action === 'compare' && 'Compare'}
      </Button>
    )
  )
);

// Usage
function CodeExampleActions({ codeId }: { codeId: string }) {
  return (
    <Group gap="sm">
      <CodeActionButton 
        action="explain" 
        codeId={codeId}
        variant="light"
        color="blue"
      />
      <CodeActionButton 
        action="refactor" 
        codeId={codeId}
        variant="light"
        color="green"
      />
      <CodeActionButton 
        action="compare" 
        codeId={codeId}
        variant="light"
        color="orange"
      />
    </Group>
  );
}
```

## Dynamic Component Prop

### Dynamic Component Selection

```tsx
import { Box } from '@mantine/core';

function DynamicComponentExample({ 
  isLink 
}: { 
  isLink: boolean; 
}) {
  return (
    <Box<'input'>
      component={(isLink ? 'a' : 'div') as any}
      href={isLink ? '/code-examples' : undefined}
      p="md"
      bg="gray.0"
      bdrs="sm"
    >
      {isLink ? 'Click me' : 'Static content'}
    </Box>
  );
}
```

### Refactorium-Specific Dynamic Components

```tsx
// CodeExampleCard.tsx
import { Box } from '@mantine/core';

interface CodeExampleCardProps {
  code: string;
  language: string;
  variant: 'problem' | 'solution';
  isClickable?: boolean;
  onClick?: () => void;
}

function CodeExampleCard({ 
  code, 
  language, 
  variant, 
  isClickable = false,
  onClick 
}: CodeExampleCardProps) {
  const Component = isClickable ? 'button' : 'div';
  
  return (
    <Box
      component={Component as any}
      onClick={isClickable ? onClick : undefined}
      p="lg"
      bg="gray.0"
      bd="1px solid gray.3"
      bdrs="md"
      style={{
        cursor: isClickable ? 'pointer' : 'default',
        transition: 'all 0.2s ease',
      }}
      mod={{ variant, clickable: isClickable }}
    >
      <Text fw={600} mb="sm">
        {variant === 'problem' ? 'Problem' : 'Solution'}
      </Text>
      <Text size="sm" c="dimmed" mb="md">
        {language}
      </Text>
      <Box
        component="pre"
        ff="monospace"
        fz="sm"
        p="md"
        bg="gray.1"
        bdrs="sm"
      >
        {code}
      </Box>
    </Box>
  );
}
```

## Creating Custom Polymorphic Components

### Basic Custom Polymorphic Component

```tsx
import { forwardRef } from 'react';
import { 
  Box, 
  BoxProps, 
  createPolymorphicComponent 
} from '@mantine/core';

interface CodeBlockProps extends BoxProps {
  language: string;
  variant?: 'problem' | 'solution' | 'explain';
}

const CodeBlock = createPolymorphicComponent<'pre', CodeBlockProps>(
  forwardRef<HTMLPreElement, CodeBlockProps>(
    ({ language, variant = 'problem', ...others }, ref) => (
      <Box
        component="pre"
        {...others}
        ref={ref}
        ff="monospace"
        fz="sm"
        p="md"
        bdrs="sm"
        data-language={language}
        data-variant={variant}
        style={{
          backgroundColor: variant === 'problem' ? '#fef2f2' : '#f0fdf4',
          borderLeft: `4px solid ${variant === 'problem' ? '#ef4444' : '#22c55e'}`,
        }}
      />
    )
  )
);

// Usage
function CodeExample({ code, language }: { code: string; language: string }) {
  return (
    <CodeBlock language={language} variant="problem">
      {code}
    </CodeBlock>
  );
}
```

### Refactorium-Specific Custom Components

```tsx
// CodeExampleContainer.tsx
import { forwardRef } from 'react';
import { 
  Box, 
  BoxProps, 
  createPolymorphicComponent,
  Text,
  Group
} from '@mantine/core';

interface CodeExampleContainerProps extends BoxProps {
  title: string;
  language: string;
  variant: 'problem' | 'solution' | 'explain';
  actions?: React.ReactNode;
}

const CodeExampleContainer = createPolymorphicComponent<
  'article', 
  CodeExampleContainerProps
>(
  forwardRef<HTMLElement, CodeExampleContainerProps>(
    ({ title, language, variant, actions, children, ...others }, ref) => (
      <Box
        component="article"
        {...others}
        ref={ref}
        p="lg"
        bg="gray.0"
        bd="1px solid gray.3"
        bdrs="md"
        mod={{ variant }}
      >
        <Group justify="space-between" align="flex-start" mb="md">
          <Box>
            <Text fw={600} mb="xs">
              {title}
            </Text>
            <Text size="sm" c="dimmed">
              {language}
            </Text>
          </Box>
          {actions && (
            <Group gap="sm">
              {actions}
            </Group>
          )}
        </Group>
        
        <Box
          component="section"
          ff="monospace"
          fz="sm"
          p="md"
          bg="gray.1"
          bdrs="sm"
        >
          {children}
        </Box>
      </Box>
    )
  )
);

// Usage
function CodeExample({ 
  title, 
  language, 
  variant, 
  code 
}: { 
  title: string; 
  language: string; 
  variant: 'problem' | 'solution' | 'explain'; 
  code: string; 
}) {
  return (
    <CodeExampleContainer
      title={title}
      language={language}
      variant={variant}
      actions={
        <Group gap="sm">
          <Button size="sm" variant="light">Explain</Button>
          <Button size="sm" variant="light">Refactor</Button>
        </Group>
      }
    >
      <pre>{code}</pre>
    </CodeExampleContainer>
  );
}
```

## Making Mantine Components Polymorphic

### Converting Non-Polymorphic Components

```tsx
import {
  createPolymorphicComponent,
  Group,
  GroupProps,
} from '@mantine/core';

const PolymorphicGroup = createPolymorphicComponent<
  'button',
  GroupProps
>(Group);

// Usage
function RefactoriumPolymorphicGroup() {
  return (
    <PolymorphicGroup 
      component="a" 
      href="/code-examples"
      p="md"
      bg="blue.0"
      bdrs="md"
    >
      <Text>Click to view examples</Text>
    </PolymorphicGroup>
  );
}
```

### Refactorium-Specific Polymorphic Conversions

```tsx
// PolymorphicCodeExample.tsx
import {
  createPolymorphicComponent,
  Box,
  BoxProps,
} from '@mantine/core';

interface PolymorphicCodeExampleProps extends BoxProps {
  code: string;
  language: string;
  variant: 'problem' | 'solution' | 'explain';
}

const PolymorphicCodeExample = createPolymorphicComponent<
  'div',
  PolymorphicCodeExampleProps
>(Box);

// Usage
function CodeExampleGrid({ examples }: { examples: any[] }) {
  return (
    <Box display="grid" gap="md" gridTemplateColumns="repeat(auto-fit, minmax(300px, 1fr))">
      {examples.map((example, index) => (
        <PolymorphicCodeExample
          key={index}
          component="article"
          code={example.code}
          language={example.language}
          variant={example.variant}
          p="lg"
          bg="gray.0"
          bd="1px solid gray.3"
          bdrs="md"
        />
      ))}
    </Box>
  );
}
```

## Best Practices for Refactorium

### 1. Use component Prop for Simple Cases

- Use `component` prop for straightforward element changes
- Prefer `component` over `renderRoot` when possible
- Keep component prop usage simple and readable

### 2. Use renderRoot for Complex Cases

- Use `renderRoot` for generic components
- Use `renderRoot` for components with complex prop handling
- Always spread props in `renderRoot` functions

### 3. Create Wrapper Components

- Create wrapper components for commonly used patterns
- Use `createPolymorphicComponent` for custom polymorphic components
- Document polymorphic behavior clearly

### 4. Type Safety

- Use proper TypeScript types for polymorphic components
- Leverage `createPolymorphicComponent` for type safety
- Avoid `any` types when possible

### 5. Performance Considerations

- Polymorphic components have minimal runtime overhead
- TypeScript compilation may be slower with polymorphic components
- Use polymorphic components judiciously

### 6. Accessibility

- Ensure proper ARIA attributes for different element types
- Test keyboard navigation with different component types
- Maintain semantic meaning when changing elements

### 7. Testing

- Test polymorphic components with different element types
- Verify proper prop forwarding
- Test accessibility with different component types

This approach ensures our Code Smell Playground has flexible, maintainable, and type-safe polymorphic components that adapt to different use cases and integration patterns.
