# Units: rem, em and px (Refactorium)

This guide covers Mantine's unit system and how to use rem, em, and px units effectively in our Code Smell Playground project.

## Overview

Mantine uses a rem-based unit system that automatically scales with user preferences and browser settings, ensuring accessibility and responsive design.

## rem Units

### Default Behavior

All Mantine components use rem units for sizing. By default, `1rem = 16px` (browser default).

```tsx
// Mantine components automatically use rem units
<Button size="md" p="lg">Button</Button>
<Container size="sm" px="md">Container</Container>
<Text fz="lg" c="blue">Text</Text>
```

### Scaling with User Preferences

Mantine components automatically scale based on user's browser font-size settings:

```tsx
// Demo: Scale components with user preference
import { Slider } from '@mantine/core';

function FontSizeDemo() {
  return (
    <Slider
      defaultValue={100}
      min={70}
      max={130}
      onChange={(value) => {
        document.documentElement.style.fontSize = `${value}%`;
      }}
    />
  );
}
```

### Custom Scale Factor

If you change the root font-size, set the scale factor to maintain component proportions:

```tsx
// src/providers/theme-provider.tsx
const theme = createTheme({
  scale: 1.6, // For 10px root font-size: 1 / (10/16) = 1.6
  // ... other theme properties
});
```

```css
/* Custom root font-size */
:root {
  font-size: 10px; /* Instead of default 16px */
}
```

## em Units

### Media Queries

em units are used in media queries and are not affected by root font-size:

```css
/* CodeExample.module.css */
.container {
  padding: rem(16px);
  
  @media (min-width: em(768px)) {
    padding: rem(24px);
  }
  
  @media (min-width: em(1024px)) {
    padding: rem(32px);
  }
}
```

### Responsive Design

```css
/* Responsive breakpoints using em */
.codeBlock {
  font-size: rem(14px);
  
  @media (min-width: em(480px)) {
    font-size: rem(16px);
  }
  
  @media (min-width: em(768px)) {
    font-size: rem(18px);
  }
}
```

## px Conversions

### Automatic Conversion

Mantine automatically converts px values to rem in component props:

```tsx
// These are equivalent
<ColorSwatch color="#000" size={32} />      // 32px -> 2rem
<ColorSwatch color="#000" size="2rem" />    // 2rem

<Box w={32} h={16} />                       // 32px -> 2rem, 16px -> 1rem
<Box w="2rem" h="1rem" />                   // 2rem, 1rem
```

### Style Props

```tsx
// Style props with automatic conversion
<Box 
  w={32}           // 32px -> calc(2rem * var(--mantine-scale))
  h={16}           // 16px -> calc(1rem * var(--mantine-scale))
  p={24}           // 24px -> calc(1.5rem * var(--mantine-scale))
  m={8}            // 8px -> calc(0.5rem * var(--mantine-scale))
>
  Content
</Box>
```

## rem and em Functions

### JavaScript Usage

```tsx
import { rem, em } from '@mantine/core';

// Convert px to rem with scaling
rem(32);                    // -> calc(2rem * var(--mantine-scale))
rem('16px');                // -> calc(1rem * var(--mantine-scale))
rem('2rem');                // -> 2rem (unchanged)
rem('50%');                 // -> 50% (unchanged)
rem('5vh');                 // -> 5vh (unchanged)

// Convert px to em
em(32);                     // -> 2em
em('16px');                 // -> 1em
em('2rem');                 // -> 2rem (unchanged)

// Mixed values
rem('16px 2rem');           // -> calc(1rem * var(--mantine-scale)) 2rem
```

### CSS Usage (with PostCSS)

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

.codeBlock {
  font-size: rem(14px);
  line-height: 1.5;
  
  @media (min-width: em(480px)) {
    font-size: rem(16px);
  }
}
```

### px Function

```tsx
import { px } from '@mantine/core';

// Convert rem/em to px
px('2rem');                 // -> 32
px('10rem');                // -> 160
px('1.5em');                // -> 24
```

## PostCSS Configuration

### Auto Conversion

Enable automatic px to rem conversion in `postcss.config.cjs`:

```js
// postcss.config.cjs
module.exports = {
  plugins: {
    'postcss-preset-mantine': {
      autoRem: true, // Automatically convert px to rem
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

### Manual Conversion

```css
/* Input CSS */
.demo {
  font-size: 16px;
  padding: 24px;
  margin: 16px;
}

/* Output CSS (with autoRem: true) */
.demo {
  font-size: calc(1rem * var(--mantine-scale));
  padding: calc(1.5rem * var(--mantine-scale));
  margin: calc(1rem * var(--mantine-scale));
}
```

## Refactorium-Specific Patterns

### Code Example Container

```css
/* CodeExampleContainer.module.css */
.container {
  /* Use rem for scalable sizing */
  padding: rem(24px);
  margin: rem(16px) 0;
  border-radius: rem(8px);
  
  /* Responsive design with em breakpoints */
  @media (min-width: em(768px)) {
    padding: rem(32px);
    margin: rem(24px) 0;
  }
  
  @media (min-width: em(1024px)) {
    padding: rem(40px);
    margin: rem(32px) 0;
  }
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: rem(16px);
  
  @media (min-width: em(768px)) {
    margin-bottom: rem(24px);
  }
}

.title {
  font-size: rem(18px);
  font-weight: 600;
  
  @media (min-width: em(768px)) {
    font-size: rem(20px);
  }
}

.codeBlock {
  font-size: rem(14px);
  line-height: 1.5;
  padding: rem(16px);
  
  @media (min-width: em(480px)) {
    font-size: rem(16px);
    padding: rem(20px);
  }
  
  @media (min-width: em(768px)) {
    font-size: rem(18px);
    padding: rem(24px);
  }
}

.actions {
  display: flex;
  gap: rem(8px);
  
  @media (min-width: em(768px)) {
    gap: rem(12px);
  }
}

.button {
  padding: rem(8px) rem(16px);
  font-size: rem(12px);
  border-radius: rem(4px);
  
  @media (min-width: em(768px)) {
    padding: rem(10px) rem(20px);
    font-size: rem(14px);
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
  border-radius: rem(12px);
  
  @media (min-width: em(768px)) {
    padding: rem(40px);
  }
}

.formTitle {
  font-size: rem(24px);
  margin-bottom: rem(24px);
  
  @media (min-width: em(768px)) {
    font-size: rem(28px);
    margin-bottom: rem(32px);
  }
}

.fieldRoot {
  margin-bottom: rem(16px);
  
  @media (min-width: em(768px)) {
    margin-bottom: rem(20px);
  }
}

.input {
  padding: rem(12px);
  font-size: rem(14px);
  border-radius: rem(6px);
  
  @media (min-width: em(768px)) {
    padding: rem(16px);
    font-size: rem(16px);
  }
}

.codeInput {
  font-family: var(--mantine-font-family-monospace);
  font-size: rem(13px);
  line-height: 1.5;
  
  @media (min-width: em(768px)) {
    font-size: rem(15px);
  }
}

.label {
  font-size: rem(14px);
  margin-bottom: rem(8px);
  
  @media (min-width: em(768px)) {
    font-size: rem(16px);
    margin-bottom: rem(10px);
  }
}

.formActions {
  gap: rem(16px);
  margin-top: rem(32px);
  
  @media (min-width: em(768px)) {
    gap: rem(20px);
    margin-top: rem(40px);
  }
}

.submitButton {
  padding: rem(12px) rem(24px);
  font-size: rem(14px);
  border-radius: rem(6px);
  
  @media (min-width: em(768px)) {
    padding: rem(14px) rem(28px);
    font-size: rem(16px);
  }
}

.cancelButton {
  padding: rem(12px) rem(24px);
  font-size: rem(14px);
  border-radius: rem(6px);
  
  @media (min-width: em(768px)) {
    padding: rem(14px) rem(28px);
    font-size: rem(16px);
  }
}
```

### Responsive Typography

```css
/* Typography.module.css */
.heading1 {
  font-size: rem(32px);
  line-height: 1.2;
  margin-bottom: rem(24px);
  
  @media (min-width: em(768px)) {
    font-size: rem(40px);
    margin-bottom: rem(32px);
  }
  
  @media (min-width: em(1024px)) {
    font-size: rem(48px);
    margin-bottom: rem(40px);
  }
}

.heading2 {
  font-size: rem(24px);
  line-height: 1.3;
  margin-bottom: rem(16px);
  
  @media (min-width: em(768px)) {
    font-size: rem(28px);
    margin-bottom: rem(20px);
  }
  
  @media (min-width: em(1024px)) {
    font-size: rem(32px);
    margin-bottom: rem(24px);
  }
}

.bodyText {
  font-size: rem(16px);
  line-height: 1.6;
  margin-bottom: rem(16px);
  
  @media (min-width: em(768px)) {
    font-size: rem(18px);
    margin-bottom: rem(20px);
  }
}

.smallText {
  font-size: rem(14px);
  line-height: 1.5;
  
  @media (min-width: em(768px)) {
    font-size: rem(16px);
  }
}
```

## Best Practices for Refactorium

### 1. Use rem for Scalable Sizing

- Use rem for all sizing (padding, margin, font-size, etc.)
- Components automatically scale with user preferences
- Better accessibility and responsive design

### 2. Use em for Media Queries

- Use em for breakpoints in media queries
- Not affected by root font-size changes
- More consistent across different devices

### 3. Leverage Automatic Conversion

- Use px values in component props for convenience
- Mantine automatically converts to rem
- Use rem/em functions in CSS for explicit control

### 4. Responsive Design

- Use em breakpoints for consistent responsive behavior
- Scale typography and spacing appropriately
- Test on different screen sizes and zoom levels

### 5. Performance

- Use rem/em functions sparingly in JavaScript
- Prefer CSS-based responsive design
- Use PostCSS autoRem for automatic conversion

### 6. Accessibility

- Respect user's font-size preferences
- Test with different browser zoom levels
- Ensure content remains readable at all sizes

### 7. Maintenance

- Use consistent unit patterns throughout the project
- Document custom scale factors
- Regular testing of responsive behavior

## Common Patterns

### Scalable Component

```tsx
// Component that scales with user preferences
function ScalableCard({ children }) {
  return (
    <Box
      p="md"           // rem units
      m="sm"           // rem units
      radius="md"      // rem units
      style={{
        fontSize: rem(16), // Explicit rem conversion
      }}
    >
      {children}
    </Box>
  );
}
```

### Responsive Layout

```css
/* Responsive layout using em breakpoints */
.layout {
  display: grid;
  grid-template-columns: 1fr;
  gap: rem(16px);
  
  @media (min-width: em(768px)) {
    grid-template-columns: 1fr 1fr;
    gap: rem(24px);
  }
  
  @media (min-width: em(1024px)) {
    grid-template-columns: 1fr 1fr 1fr;
    gap: rem(32px);
  }
}
```

### Typography Scale

```css
/* Typography scale using rem */
.text-xs { font-size: rem(12px); }
.text-sm { font-size: rem(14px); }
.text-md { font-size: rem(16px); }
.text-lg { font-size: rem(18px); }
.text-xl { font-size: rem(20px); }
.text-2xl { font-size: rem(24px); }
.text-3xl { font-size: rem(30px); }
.text-4xl { font-size: rem(36px); }
```

This approach ensures our Code Smell Playground has scalable, accessible, and responsive design using Mantine's unit system effectively.
