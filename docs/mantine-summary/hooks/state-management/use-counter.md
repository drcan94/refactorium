# use-counter Hook

## Overview

The `use-counter` hook manages incremental/decremental state within specified boundaries. It provides a clean API for handling counters, pagination, steppers, and any numeric state that needs to be incremented or decremented with optional min/max constraints. This hook is particularly useful in the Refactorium project for managing step counters in code smell tutorials, pagination in documentation, and progress indicators.

## Installation

```bash
npm install @mantine/hooks
```

## Import

```typescript
import { useCounter } from '@mantine/hooks';
```

## Basic Usage

```tsx
import { Group, Button, Text } from '@mantine/core';
import { useCounter } from '@mantine/hooks';

function Demo() {
  const [count, handlers] = useCounter(0, { min: 0, max: 10 });

  return (
    <>
      <Text>Count: {count}</Text>
      <Group justify="center">
        <Button onClick={handlers.increment}>Increment</Button>
        <Button onClick={handlers.decrement}>Decrement</Button>
        <Button onClick={handlers.reset}>Reset</Button>
        <Button onClick={() => handlers.set(5)}>Set 5</Button>
      </Group>
    </>
  );
}
```

## API Reference

### Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `initialValue` | `number` | `0` | **Optional.** Initial counter value |
| `options` | `UseCounterOptions` | `{}` | **Optional.** Configuration options for the counter |

### UseCounterOptions

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `min` | `number` | `undefined` | **Optional.** Minimum allowed value |
| `max` | `number` | `undefined` | **Optional.** Maximum allowed value |

### Return Value

Returns a tuple `[number, UseCounterHandlers]`:

- **Value**: Current counter value
- **Handlers**: Object containing counter manipulation functions

### UseCounterHandlers

| Method | Type | Description |
|--------|------|-------------|
| `increment` | `() => void` | Increments the counter by 1 (respects max boundary) |
| `decrement` | `() => void` | Decrements the counter by 1 (respects min boundary) |
| `set` | `(value: number) => void` | Sets the counter to a specific value (respects boundaries) |
| `reset` | `() => void` | Resets the counter to its initial value |

### Type Definition

```typescript
interface UseCounterOptions {
  min?: number;
  max?: number;
}

interface UseCounterHandlers {
  increment: () => void;
  decrement: () => void;
  set: (value: number) => void;
  reset: () => void;
}

type UseCounterReturnValue = [number, UseCounterHandlers];

function useCounter(
  initialValue?: number,
  options?: UseCounterOptions,
): UseCounterReturnValue;
```

### Exported Types

```typescript
import type { 
  UseCounterOptions, 
  UseCounterHandlers, 
  UseCounterReturnValue 
} from '@mantine/hooks';
```

## Advanced Usage

### Custom Boundaries

```tsx
import { Group, Button, Text, Alert } from '@mantine/core';
import { useCounter } from '@mantine/hooks';

function BoundedCounter() {
  const [count, handlers] = useCounter(5, { min: 0, max: 20 });

  const isAtMin = count === 0;
  const isAtMax = count === 20;

  return (
    <Stack gap="md">
      <Text size="lg">Count: {count}</Text>
      
      {isAtMin && <Alert color="yellow">Minimum value reached</Alert>}
      {isAtMax && <Alert color="red">Maximum value reached</Alert>}
      
      <Group>
        <Button 
          onClick={handlers.decrement} 
          disabled={isAtMin}
        >
          Decrement
        </Button>
        <Button onClick={handlers.reset}>Reset</Button>
        <Button 
          onClick={handlers.increment} 
          disabled={isAtMax}
        >
          Increment
        </Button>
      </Group>
    </Stack>
  );
}
```

### Custom Increment/Decrement Steps

```tsx
import { Group, Button, Text, NumberInput } from '@mantine/core';
import { useCounter } from '@mantine/hooks';
import { useState } from 'react';

function SteppedCounter() {
  const [count, handlers] = useCounter(0, { min: 0, max: 100 });
  const [step, setStep] = useState(1);

  const customIncrement = () => {
    handlers.set(Math.min(count + step, 100));
  };

  const customDecrement = () => {
    handlers.set(Math.max(count - step, 0));
  };

  return (
    <Stack gap="md">
      <Text size="lg">Count: {count}</Text>
      
      <NumberInput
        label="Step size"
        value={step}
        onChange={(value) => setStep(Number(value) || 1)}
        min={1}
        max={10}
      />
      
      <Group>
        <Button onClick={customDecrement}>-{step}</Button>
        <Button onClick={handlers.reset}>Reset</Button>
        <Button onClick={customIncrement}>+{step}</Button>
      </Group>
    </Stack>
  );
}
```

### With Validation

```tsx
import { Group, Button, Text, Alert } from '@mantine/core';
import { useCounter } from '@mantine/hooks';
import { useState } from 'react';

function ValidatedCounter() {
  const [count, handlers] = useCounter(0, { min: 0, max: 100 });
  const [error, setError] = useState<string | null>(null);

  const safeSet = (value: number) => {
    setError(null);
    
    if (value < 0 || value > 100) {
      setError('Value must be between 0 and 100');
      return;
    }
    
    handlers.set(value);
  };

  return (
    <Stack gap="md">
      <Text size="lg">Count: {count}</Text>
      
      {error && <Alert color="red">{error}</Alert>}
      
      <Group>
        <Button onClick={() => safeSet(count - 10)}>-10</Button>
        <Button onClick={() => safeSet(count - 1)}>-1</Button>
        <Button onClick={handlers.reset}>Reset</Button>
        <Button onClick={() => safeSet(count + 1)}>+1</Button>
        <Button onClick={() => safeSet(count + 10)}>+10</Button>
      </Group>
    </Stack>
  );
}
```

## Refactorium Project Integration

### Code Smell Tutorial Stepper

In the Refactorium project, `use-counter` can be used to manage step progression through code smell tutorials:

```tsx
// components/tutorial/CodeSmellStepper.tsx
import { Group, Button, Text, Progress } from '@mantine/core';
import { useCounter } from '@mantine/hooks';

interface CodeSmellStepperProps {
  totalSteps: number;
  onStepChange: (step: number) => void;
}

export function CodeSmellStepper({ totalSteps, onStepChange }: CodeSmellStepperProps) {
  const [currentStep, handlers] = useCounter(1, { 
    min: 1, 
    max: totalSteps 
  });

  const handleStepChange = (newStep: number) => {
    handlers.set(newStep);
    onStepChange(newStep);
  };

  const progress = (currentStep / totalSteps) * 100;

  return (
    <Stack gap="md">
      <Progress value={progress} />
      
      <Group justify="space-between">
        <Text size="sm" c="dimmed">
          Step {currentStep} of {totalSteps}
        </Text>
        
        <Group>
          <Button 
            variant="light" 
            onClick={() => handleStepChange(currentStep - 1)}
            disabled={currentStep === 1}
          >
            Previous
          </Button>
          <Button 
            onClick={() => handleStepChange(currentStep + 1)}
            disabled={currentStep === totalSteps}
          >
            Next
          </Button>
        </Group>
      </Group>
    </Stack>
  );
}
```

### Documentation Pagination

For navigating through documentation sections:

```tsx
// components/docs/DocumentationPager.tsx
import { Group, Button, Text } from '@mantine/core';
import { useCounter } from '@mantine/hooks';

interface DocumentationPagerProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export function DocumentationPager({ 
  totalPages, 
  currentPage, 
  onPageChange 
}: DocumentationPagerProps) {
  const [page, handlers] = useCounter(currentPage, { 
    min: 1, 
    max: totalPages 
  });

  const handlePageChange = (newPage: number) => {
    handlers.set(newPage);
    onPageChange(newPage);
  };

  return (
    <Group justify="center">
      <Button 
        variant="light" 
        onClick={() => handlePageChange(page - 1)}
        disabled={page === 1}
      >
        Previous
      </Button>
      
      <Text>
        Page {page} of {totalPages}
      </Text>
      
      <Button 
        variant="light" 
        onClick={() => handlePageChange(page + 1)}
        disabled={page === totalPages}
      >
        Next
      </Button>
    </Group>
  );
}
```

### Progress Tracking for Refactoring Steps

```tsx
// components/refactor/RefactorProgress.tsx
import { Group, Button, Text, Progress, Badge } from '@mantine/core';
import { useCounter } from '@mantine/hooks';

interface RefactorProgressProps {
  totalRefactors: number;
  completedRefactors: number;
  onRefactorComplete: () => void;
}

export function RefactorProgress({ 
  totalRefactors, 
  completedRefactors, 
  onRefactorComplete 
}: RefactorProgressProps) {
  const [currentRefactor, handlers] = useCounter(1, { 
    min: 1, 
    max: totalRefactors 
  });

  const progress = (completedRefactors / totalRefactors) * 100;

  const handleNext = () => {
    if (currentRefactor < totalRefactors) {
      handlers.increment();
    }
  };

  const handlePrevious = () => {
    if (currentRefactor > 1) {
      handlers.decrement();
    }
  };

  return (
    <Stack gap="md">
      <Group justify="space-between">
        <Text size="lg" fw={500}>
          Refactoring Progress
        </Text>
        <Badge color="blue">
          {completedRefactors}/{totalRefactors} Complete
        </Badge>
      </Group>
      
      <Progress value={progress} />
      
      <Group justify="space-between">
        <Group>
          <Button 
            variant="light" 
            onClick={handlePrevious}
            disabled={currentRefactor === 1}
          >
            Previous
          </Button>
          <Button 
            onClick={handleNext}
            disabled={currentRefactor === totalRefactors}
          >
            Next
          </Button>
        </Group>
        
        <Text size="sm" c="dimmed">
          Current: Refactor {currentRefactor}
        </Text>
      </Group>
    </Stack>
  );
}
```

## Use Cases

### 1. Shopping Cart Quantity

```tsx
function CartItem({ initialQuantity = 1 }) {
  const [quantity, handlers] = useCounter(initialQuantity, { min: 1, max: 99 });

  return (
    <Group>
      <Button 
        size="xs" 
        onClick={handlers.decrement}
        disabled={quantity === 1}
      >
        -
      </Button>
      <Text>{quantity}</Text>
      <Button 
        size="xs" 
        onClick={handlers.increment}
        disabled={quantity === 99}
      >
        +
      </Button>
    </Group>
  );
}
```

### 2. Rating System

```tsx
function RatingInput({ maxRating = 5 }) {
  const [rating, handlers] = useCounter(0, { min: 0, max: maxRating });

  return (
    <Group>
      {Array.from({ length: maxRating }, (_, i) => (
        <Button
          key={i}
          variant={i < rating ? "filled" : "light"}
          onClick={() => handlers.set(i + 1)}
          size="xs"
        >
          ★
        </Button>
      ))}
      <Button variant="light" onClick={handlers.reset}>
        Clear
      </Button>
    </Group>
  );
}
```

### 3. Timer Controls

```tsx
function TimerControls() {
  const [minutes, handlers] = useCounter(5, { min: 1, max: 60 });

  return (
    <Stack gap="md">
      <Text size="xl">{minutes}:00</Text>
      <Group>
        <Button onClick={handlers.decrement}>-1 min</Button>
        <Button onClick={() => handlers.set(15)}>15 min</Button>
        <Button onClick={() => handlers.set(30)}>30 min</Button>
        <Button onClick={handlers.increment}>+1 min</Button>
      </Group>
    </Stack>
  );
}
```

### 4. Multi-step Form Navigation

```tsx
function MultiStepForm() {
  const [currentStep, handlers] = useCounter(1, { min: 1, max: 4 });

  const steps = [
    'Personal Information',
    'Contact Details', 
    'Preferences',
    'Confirmation'
  ];

  return (
    <Stack gap="lg">
      <Progress value={(currentStep / 4) * 100} />
      
      <Text size="lg">{steps[currentStep - 1]}</Text>
      
      <Group justify="space-between">
        <Button 
          variant="light" 
          onClick={handlers.decrement}
          disabled={currentStep === 1}
        >
          Back
        </Button>
        <Text>Step {currentStep} of 4</Text>
        <Button 
          onClick={handlers.increment}
          disabled={currentStep === 4}
        >
          Next
        </Button>
      </Group>
    </Stack>
  );
}
```

## Best Practices

### 1. Boundary Validation

Always provide appropriate min/max values to prevent invalid states:

```tsx
// Good: Clear boundaries
const [count, handlers] = useCounter(0, { min: 0, max: 100 });

// Avoid: No boundaries when they're needed
const [count, handlers] = useCounter(0); // Could go negative
```

### 2. Handler Memoization

For performance optimization, memoize handlers when passing them to child components:

```tsx
import { useCallback } from 'react';

function ParentComponent() {
  const [count, handlers] = useCounter(0);
  
  const handleIncrement = useCallback(() => {
    handlers.increment();
  }, [handlers]);
  
  return <ChildComponent onIncrement={handleIncrement} />;
}
```

### 3. Custom Step Values

For non-unit increments, create custom handlers:

```tsx
function CustomStepper() {
  const [count, handlers] = useCounter(0, { min: 0, max: 100 });
  const step = 5;

  const incrementByStep = () => {
    handlers.set(Math.min(count + step, 100));
  };

  const decrementByStep = () => {
    handlers.set(Math.max(count - step, 0));
  };

  return (
    <Group>
      <Button onClick={decrementByStep}>-{step}</Button>
      <Text>{count}</Text>
      <Button onClick={incrementByStep}>+{step}</Button>
    </Group>
  );
}
```

### 4. Type Safety

Leverage TypeScript for better type safety:

```tsx
interface CounterProps {
  initialValue: number;
  min: number;
  max: number;
}

function TypedCounter({ initialValue, min, max }: CounterProps) {
  const [count, handlers] = useCounter(initialValue, { min, max });
  
  // TypeScript ensures count is within bounds
  return <Text>{count}</Text>;
}
```

## Common Patterns

### Conditional Increment

```tsx
const [count, handlers] = useCounter(0);

const conditionalIncrement = () => {
  if (someCondition) {
    handlers.increment();
  }
};
```

### Async Operations

```tsx
const [count, handlers] = useCounter(0);

const asyncIncrement = async () => {
  await someAsyncOperation();
  handlers.increment();
};
```

### Reset with Confirmation

```tsx
const [count, handlers] = useCounter(0);

const confirmReset = () => {
  if (window.confirm('Are you sure you want to reset?')) {
    handlers.reset();
  }
};
```

## Troubleshooting

### Counter Not Updating

1. **Check boundaries**: Ensure min/max values aren't preventing updates
2. **Verify handlers**: Make sure you're calling the correct handler functions
3. **State dependencies**: Ensure the component is re-rendering when state changes

### Performance Issues

1. **Memoize handlers**: Use `useCallback` for handlers passed to child components
2. **Avoid unnecessary re-renders**: Don't create new objects in render functions
3. **Batch updates**: Group multiple counter operations when possible

### TypeScript Errors

1. **Type assertions**: Use proper type assertions for boundary values
2. **Generic types**: Specify generic types when needed for complex scenarios
3. **Interface compliance**: Ensure your counter options match the expected interface

## Related Hooks

- `use-disclosure` - For boolean state management
- `use-local-storage` - For persistent counter state
- `use-previous` - For tracking previous counter values
- `use-debounced-value` - For debouncing counter changes

## Browser Support

- **Modern Browsers**: Full support
- **React 16.8+**: Requires React Hooks support
- **TypeScript**: Full type definitions included

---

*The `use-counter` hook provides a robust foundation for managing numeric state with boundaries. In the Refactorium project, it's particularly valuable for creating intuitive step-by-step tutorials and progress tracking interfaces that guide users through code refactoring processes.*
