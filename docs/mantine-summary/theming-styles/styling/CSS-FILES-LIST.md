# CSS Files List (Refactorium)

This guide provides a complete list of CSS files available in `@mantine/core` for per-component imports, specifically tailored for our Code Smell Playground project.

## Global Styles (Required)

All Mantine components depend on these global styles. Import them first:

```tsx
// src/app/layout.tsx
// 1. Global styles first
import '@mantine/core/styles/baseline.css';
import '@mantine/core/styles/default-css-variables.css';
import '@mantine/core/styles/global.css';

// 2. Component styles
// ... (see component-specific imports below)
```

### Global Files Purpose

| File | Purpose | Description |
|------|---------|-------------|
| `baseline.css` | CSS Reset | Minimal reset, sets `box-sizing: border-box` |
| `default-css-variables.css` | Theme Variables | All CSS variables from default theme |
| `global.css` | Global Classes | Global classes used by Mantine components |

## Refactorium Component Dependencies

### Core Layout Components

```tsx
// Essential layout components for our app
import '@mantine/core/styles/Container.css';
import '@mantine/core/styles/Stack.css';
import '@mantine/core/styles/Group.css';
import '@mantine/core/styles/Flex.css';
import '@mantine/core/styles/Grid.css';
import '@mantine/core/styles/SimpleGrid.css';
import '@mantine/core/styles/Center.css';
```

### Typography Components

```tsx
// Text and heading components
import '@mantine/core/styles/Text.css';
import '@mantine/core/styles/Title.css';
import '@mantine/core/styles/Code.css';
import '@mantine/core/styles/Blockquote.css';
import '@mantine/core/styles/List.css';
import '@mantine/core/styles/Typography.css';
```

### Interactive Components

```tsx
// Buttons and interactive elements
import '@mantine/core/styles/UnstyledButton.css';
import '@mantine/core/styles/Button.css';
import '@mantine/core/styles/ActionIcon.css';
import '@mantine/core/styles/CloseButton.css';
import '@mantine/core/styles/Burger.css';
import '@mantine/core/styles/Switch.css';
import '@mantine/core/styles/Checkbox.css';
import '@mantine/core/styles/Radio.css';
import '@mantine/core/styles/SegmentedControl.css';
```

### Form Components

```tsx
// Input and form elements
import '@mantine/core/styles/Input.css';
import '@mantine/core/styles/InlineInput.css';
import '@mantine/core/styles/TextInput.css';
import '@mantine/core/styles/PasswordInput.css';
import '@mantine/core/styles/NumberInput.css';
import '@mantine/core/styles/ColorInput.css';
import '@mantine/core/styles/Fieldset.css';
```

### Data Display Components

```tsx
// Cards, tables, and data visualization
import '@mantine/core/styles/Paper.css';
import '@mantine/core/styles/Card.css';
import '@mantine/core/styles/Table.css';
import '@mantine/core/styles/Badge.css';
import '@mantine/core/styles/Indicator.css';
import '@mantine/core/styles/Progress.css';
import '@mantine/core/styles/RingProgress.css';
import '@mantine/core/styles/SemiCircleProgress.css';
```

### Overlay Components

```tsx
// Modals, popovers, and overlays
import '@mantine/core/styles/Overlay.css';
import '@mantine/core/styles/ModalBase.css';
import '@mantine/core/styles/Modal.css';
import '@mantine/core/styles/Drawer.css';
import '@mantine/core/styles/Popover.css';
import '@mantine/core/styles/Tooltip.css';
import '@mantine/core/styles/Notification.css';
```

### Navigation Components

```tsx
// Navigation and menu components
import '@mantine/core/styles/Menu.css';
import '@mantine/core/styles/NavLink.css';
import '@mantine/core/styles/Breadcrumbs.css';
import '@mantine/core/styles/Pagination.css';
import '@mantine/core/styles/Tabs.css';
import '@mantine/core/styles/Stepper.css';
```

### Utility Components

```tsx
// Utility and helper components
import '@mantine/core/styles/Divider.css';
import '@mantine/core/styles/Skeleton.css';
import '@mantine/core/styles/Loader.css';
import '@mantine/core/styles/LoadingOverlay.css';
import '@mantine/core/styles/ScrollArea.css';
import '@mantine/core/styles/VisuallyHidden.css';
```

## Refactorium-Specific Import Strategy

### Minimal Bundle (Recommended)

For our Code Smell Playground, use this optimized import set:

```tsx
// src/app/layout.tsx
// Global styles
import '@mantine/core/styles/baseline.css';
import '@mantine/core/styles/default-css-variables.css';
import '@mantine/core/styles/global.css';

// Core components for code examples
import '@mantine/core/styles/UnstyledButton.css';
import '@mantine/core/styles/Button.css';
import '@mantine/core/styles/ActionIcon.css';
import '@mantine/core/styles/Paper.css';
import '@mantine/core/styles/Card.css';
import '@mantine/core/styles/Stack.css';
import '@mantine/core/styles/Group.css';
import '@mantine/core/styles/Flex.css';
import '@mantine/core/styles/Container.css';
import '@mantine/core/styles/Text.css';
import '@mantine/core/styles/Title.css';
import '@mantine/core/styles/Code.css';
import '@mantine/core/styles/Divider.css';

// Form components for code submission
import '@mantine/core/styles/Input.css';
import '@mantine/core/styles/InlineInput.css';
import '@mantine/core/styles/TextInput.css';
import '@mantine/core/styles/Fieldset.css';

// Overlay components for modals and notifications
import '@mantine/core/styles/Overlay.css';
import '@mantine/core/styles/ModalBase.css';
import '@mantine/core/styles/Modal.css';
import '@mantine/core/styles/Popover.css';
import '@mantine/core/styles/Notification.css';

// Navigation components
import '@mantine/core/styles/Menu.css';
import '@mantine/core/styles/Tabs.css';
import '@mantine/core/styles/Pagination.css';

// Utility components
import '@mantine/core/styles/ScrollArea.css';
import '@mantine/core/styles/Loader.css';
import '@mantine/core/styles/Skeleton.css';
import '@mantine/core/styles/VisuallyHidden.css';
```

### Complete Bundle (Development)

For development with all components:

```tsx
// src/app/layout.tsx
// Use full bundle for development
import '@mantine/core/styles.css';
```

## Component Dependency Mapping

### Button Component Dependencies

```tsx
// Button requires UnstyledButton
import '@mantine/core/styles/UnstyledButton.css';
import '@mantine/core/styles/Button.css';
```

### Form Component Dependencies

```tsx
// TextInput requires Input and InlineInput
import '@mantine/core/styles/Input.css';
import '@mantine/core/styles/InlineInput.css';
import '@mantine/core/styles/TextInput.css';

// Select requires Input, InlineInput, and Popover
import '@mantine/core/styles/Input.css';
import '@mantine/core/styles/InlineInput.css';
import '@mantine/core/styles/Popover.css';
import '@mantine/core/styles/Select.css';
```

### Modal Component Dependencies

```tsx
// Modal requires ModalBase and Overlay
import '@mantine/core/styles/Overlay.css';
import '@mantine/core/styles/ModalBase.css';
import '@mantine/core/styles/Modal.css';
```

### Card Component Dependencies

```tsx
// Card requires Paper
import '@mantine/core/styles/Paper.css';
import '@mantine/core/styles/Card.css';
```

## Import Order Rules

### 1. Global Styles First

```tsx
// ✅ Correct order
import '@mantine/core/styles/baseline.css';
import '@mantine/core/styles/default-css-variables.css';
import '@mantine/core/styles/global.css';
```

### 2. Dependencies Before Components

```tsx
// ✅ Correct order - UnstyledButton before Button
import '@mantine/core/styles/UnstyledButton.css';
import '@mantine/core/styles/Button.css';

// ❌ Incorrect order - Button before UnstyledButton
import '@mantine/core/styles/Button.css';
import '@mantine/core/styles/UnstyledButton.css';
```

### 3. Application Styles Last

```tsx
// ✅ Correct order
import '@mantine/core/styles/Button.css';
import './globals.css';
import './components/CodeExample.module.css';
```

## Refactorium Bundle Optimization

### Code Example Components

```tsx
// For code example display components
import '@mantine/core/styles/Paper.css';
import '@mantine/core/styles/Card.css';
import '@mantine/core/styles/Stack.css';
import '@mantine/core/styles/Text.css';
import '@mantine/core/styles/Title.css';
import '@mantine/core/styles/Code.css';
import '@mantine/core/styles/Button.css';
import '@mantine/core/styles/ActionIcon.css';
import '@mantine/core/styles/Group.css';
import '@mantine/core/styles/Flex.css';
```

### Form Components

```tsx
// For code submission forms
import '@mantine/core/styles/Input.css';
import '@mantine/core/styles/InlineInput.css';
import '@mantine/core/styles/TextInput.css';
import '@mantine/core/styles/Fieldset.css';
import '@mantine/core/styles/Button.css';
import '@mantine/core/styles/Stack.css';
import '@mantine/core/styles/Group.css';
```

### Navigation Components

```tsx
// For app navigation
import '@mantine/core/styles/Menu.css';
import '@mantine/core/styles/Tabs.css';
import '@mantine/core/styles/Pagination.css';
import '@mantine/core/styles/Breadcrumbs.css';
import '@mantine/core/styles/NavLink.css';
```

## Complete CSS Files Reference

### All Available Components

| Component | Import Path | Refactorium Usage |
|-----------|-------------|-------------------|
| **Global** | | |
| baseline | `@mantine/core/styles/baseline.css` | ✅ Required |
| default-css-variables | `@mantine/core/styles/default-css-variables.css` | ✅ Required |
| global | `@mantine/core/styles/global.css` | ✅ Required |
| **Layout** | | |
| Container | `@mantine/core/styles/Container.css` | ✅ Main layout |
| Stack | `@mantine/core/styles/Stack.css` | ✅ Component layout |
| Group | `@mantine/core/styles/Group.css` | ✅ Button groups |
| Flex | `@mantine/core/styles/Flex.css` | ✅ Flexible layouts |
| Grid | `@mantine/core/styles/Grid.css` | ✅ Grid layouts |
| SimpleGrid | `@mantine/core/styles/SimpleGrid.css` | ✅ Simple grids |
| Center | `@mantine/core/styles/Center.css` | ✅ Centering content |
| **Typography** | | |
| Text | `@mantine/core/styles/Text.css` | ✅ All text content |
| Title | `@mantine/core/styles/Title.css` | ✅ Headings |
| Code | `@mantine/core/styles/Code.css` | ✅ Inline code |
| Blockquote | `@mantine/core/styles/Blockquote.css` | ✅ Code comments |
| List | `@mantine/core/styles/List.css` | ✅ Code lists |
| Typography | `@mantine/core/styles/Typography.css` | ✅ Rich text |
| **Interactive** | | |
| UnstyledButton | `@mantine/core/styles/UnstyledButton.css` | ✅ Button base |
| Button | `@mantine/core/styles/Button.css` | ✅ Primary actions |
| ActionIcon | `@mantine/core/styles/ActionIcon.css` | ✅ Icon buttons |
| CloseButton | `@mantine/core/styles/CloseButton.css` | ✅ Close actions |
| Burger | `@mantine/core/styles/Burger.css` | ✅ Mobile menu |
| Switch | `@mantine/core/styles/Switch.css` | ✅ Toggle options |
| Checkbox | `@mantine/core/styles/Checkbox.css` | ✅ Form inputs |
| Radio | `@mantine/core/styles/Radio.css` | ✅ Form inputs |
| SegmentedControl | `@mantine/core/styles/SegmentedControl.css` | ✅ View toggles |
| **Forms** | | |
| Input | `@mantine/core/styles/Input.css` | ✅ Input base |
| InlineInput | `@mantine/core/styles/InlineInput.css` | ✅ Input wrapper |
| TextInput | `@mantine/core/styles/TextInput.css` | ✅ Text inputs |
| PasswordInput | `@mantine/core/styles/PasswordInput.css` | ✅ Password fields |
| NumberInput | `@mantine/core/styles/NumberInput.css` | ✅ Number inputs |
| ColorInput | `@mantine/core/styles/ColorInput.css` | ✅ Color picker |
| Fieldset | `@mantine/core/styles/Fieldset.css` | ✅ Form sections |
| **Data Display** | | |
| Paper | `@mantine/core/styles/Paper.css` | ✅ Card base |
| Card | `@mantine/core/styles/Card.css` | ✅ Code examples |
| Table | `@mantine/core/styles/Table.css` | ✅ Data tables |
| Badge | `@mantine/core/styles/Badge.css` | ✅ Status indicators |
| Indicator | `@mantine/core/styles/Indicator.css` | ✅ Notifications |
| Progress | `@mantine/core/styles/Progress.css` | ✅ Loading states |
| RingProgress | `@mantine/core/styles/RingProgress.css` | ✅ Circular progress |
| SemiCircleProgress | `@mantine/core/styles/SemiCircleProgress.css` | ✅ Semi-circle progress |
| **Overlays** | | |
| Overlay | `@mantine/core/styles/Overlay.css` | ✅ Modal backdrop |
| ModalBase | `@mantine/core/styles/ModalBase.css` | ✅ Modal base |
| Modal | `@mantine/core/styles/Modal.css` | ✅ Code details |
| Drawer | `@mantine/core/styles/Drawer.css` | ✅ Mobile panels |
| Popover | `@mantine/core/styles/Popover.css` | ✅ Tooltips |
| Tooltip | `@mantine/core/styles/Tooltip.css` | ✅ Help text |
| Notification | `@mantine/core/styles/Notification.css` | ✅ User feedback |
| **Navigation** | | |
| Menu | `@mantine/core/styles/Menu.css` | ✅ Dropdown menus |
| NavLink | `@mantine/core/styles/NavLink.css` | ✅ Navigation links |
| Breadcrumbs | `@mantine/core/styles/Breadcrumbs.css` | ✅ Navigation path |
| Pagination | `@mantine/core/styles/Pagination.css` | ✅ Page navigation |
| Tabs | `@mantine/core/styles/Tabs.css` | ✅ Tab navigation |
| Stepper | `@mantine/core/styles/Stepper.css` | ✅ Step navigation |
| **Utilities** | | |
| Divider | `@mantine/core/styles/Divider.css` | ✅ Section separators |
| Skeleton | `@mantine/core/styles/Skeleton.css` | ✅ Loading placeholders |
| Loader | `@mantine/core/styles/Loader.css` | ✅ Loading spinners |
| LoadingOverlay | `@mantine/core/styles/LoadingOverlay.css` | ✅ Loading overlays |
| ScrollArea | `@mantine/core/styles/ScrollArea.css` | ✅ Custom scrollbars |
| VisuallyHidden | `@mantine/core/styles/VisuallyHidden.css` | ✅ Screen reader content |

## Best Practices for Refactorium

### 1. Bundle Size Optimization

- Use per-component imports for production
- Import only components you actually use
- Group related components together
- Consider lazy loading for heavy components

### 2. Development vs Production

```tsx
// Development - full bundle for flexibility
import '@mantine/core/styles.css';

// Production - optimized per-component imports
import '@mantine/core/styles/baseline.css';
import '@mantine/core/styles/default-css-variables.css';
import '@mantine/core/styles/global.css';
// ... specific component imports
```

### 3. Maintenance

- Document which components are used where
- Keep import order consistent
- Use barrel exports for common component groups
- Regular audit of unused imports

This approach ensures our Code Smell Playground has optimal bundle size while maintaining all necessary styling functionality.
