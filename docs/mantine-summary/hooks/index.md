# Mantine Hooks Documentation

## Overview

The `@mantine/hooks` package provides more than 70 powerful React hooks to build custom components and enhance your React applications. This package is used internally by most other `@mantine/*` packages and is required for using Mantine components.

## Installation

```bash
npm install @mantine/hooks
```

## Usage

The `@mantine/hooks` package can be used in any web React application. State management hooks (like `use-pagination` or `use-queue`) are also compatible with React Native. The package is standalone and does not have any dependencies except React, making it perfect for use even if you don't use other Mantine libraries.

## Key Features

- **70+ Custom Hooks**: Comprehensive collection of utility hooks
- **Standalone Package**: No external dependencies except React
- **React Native Compatible**: State management hooks work with React Native
- **TypeScript Support**: Full TypeScript support with proper type definitions
- **Performance Optimized**: Hooks are optimized for performance and re-renders
- **Modular Design**: Each hook serves a specific purpose and can be used independently

## Hook Categories

### 1. **State Management Hooks**
- `use-pagination` - Pagination state management
- `use-queue` - Queue data structure management
- `use-toggle` - Boolean state toggle
- `use-counter` - Counter state management
- `use-list-state` - List state management
- `use-set-state` - Set state management
- `use-map-state` - Map state management

### 2. **UI Interaction Hooks**
- `use-move` - Mouse/touch move tracking
- `use-click-outside` - Click outside detection
- `use-hover` - Hover state management
- `use-focus` - Focus state management
- `use-focus-trap` - Focus trap for modals
- `use-focus-visible` - Focus visible detection
- `use-scroll-into-view` - Scroll element into view

### 3. **Form and Input Hooks**
- `use-form` - Form state management
- `use-input-state` - Input state management
- `use-debounced-value` - Debounced value
- `use-throttled-value` - Throttled value
- `use-validated-state` - Validated state management

### 4. **Media and Device Hooks**
- `use-media-query` - Media query detection
- `use-resize-observer` - Element resize observation
- `use-viewport-size` - Viewport size tracking
- `use-element-size` - Element size tracking
- `use-reduced-motion` - Reduced motion preference

### 5. **Animation and Transition Hooks**
- `use-transition` - Transition state management
- `use-animation` - Animation state management
- `use-interval` - Interval management
- `use-timeout` - Timeout management
- `use-raf` - Request animation frame

### 6. **Data Fetching Hooks**
- `use-fetch` - Data fetching with loading states
- `use-async` - Async operation management
- `use-promise` - Promise state management

### 7. **Utility Hooks**
- `use-clipboard` - Clipboard operations
- `use-local-storage` - Local storage management
- `use-session-storage` - Session storage management
- `use-previous` - Previous value tracking
- `use-memoized-value` - Memoized value computation
- `use-shallow-effect` - Shallow effect comparison

### 8. **Event Hooks**
- `use-event-listener` - Event listener management
- `use-keyboard` - Keyboard event handling
- `use-window-scroll` - Window scroll tracking
- `use-window-resize` - Window resize tracking

## Example Usage

Here's a practical example using the `use-move` hook to create a custom slider:

```tsx
import { useState } from 'react';
import { IconGripVertical } from '@tabler/icons-react';
import { clamp, useMove } from '@mantine/hooks';

function CustomSlider() {
  const [value, setValue] = useState(0.3);
  const { ref } = useMove(({ x }) => setValue(clamp(x, 0.1, 0.9)));
  
  return (
    <div ref={ref} className="slider-track">
      {/* Slider implementation */}
    </div>
  );
}
```

## Best Practices

1. **Import Only What You Need**: Import specific hooks to keep bundle size small
2. **Use TypeScript**: Leverage TypeScript for better type safety
3. **Combine Hooks**: Combine multiple hooks for complex functionality
4. **Performance**: Use hooks like `use-memoized-value` for expensive computations
5. **Cleanup**: Hooks automatically handle cleanup, but be mindful of memory leaks

## Documentation Structure

This documentation is organized into the following sections:

- **State Management**: Hooks for managing application state
- **UI Interactions**: Hooks for user interface interactions
- **Forms**: Hooks for form handling and validation
- **Media**: Hooks for responsive design and media queries
- **Animations**: Hooks for animations and transitions
- **Data Fetching**: Hooks for API calls and data management
- **Utilities**: General-purpose utility hooks
- **Events**: Hooks for event handling

Each hook includes:
- Description and purpose
- API reference with parameters and return values
- Usage examples
- Best practices and tips
- Related hooks

## Getting Started

1. Install the package: `npm install @mantine/hooks`
2. Import the hook you need: `import { useToggle } from '@mantine/hooks'`
3. Use it in your component: `const [value, toggle] = useToggle()`
4. Check the specific hook documentation for detailed usage

## Compatibility

- **React**: 16.8.0 or higher
- **React Native**: Compatible with state management hooks
- **TypeScript**: Full support with type definitions
- **Browsers**: All modern browsers supported

---

*This documentation covers all 70+ hooks available in the @mantine/hooks package. Each hook is designed to solve specific problems in React development while maintaining excellent performance and developer experience.*
