# use-debounced-callback Hook

## Overview

The `use-debounced-callback` hook creates a debounced version of a given function, delaying its execution until a specified time has elapsed since the last invocation. This is essential for optimizing performance by reducing the frequency of expensive operations like API calls, search queries, and input validation. In the Refactorium project, this hook is particularly valuable for search functionality, auto-save features, and real-time code analysis.

## Installation

```bash
npm install @mantine/hooks
```

## Import

```typescript
import { useDebouncedCallback } from '@mantine/hooks';
```

## Basic Usage

```tsx
import { useState } from 'react';
import { Loader, Text, TextInput } from '@mantine/core';
import { useDebouncedCallback } from '@mantine/hooks';

function getSearchResults(query: string): Promise<{ id: number; title: string }[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(
        query.trim() === ''
          ? []
          : Array(5)
              .fill(0)
              .map((_, index) => ({ id: index, title: `${query} ${index + 1}` }))
      );
    }, 1000);
  });
}

function Demo() {
  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState<{ id: number; title: string }[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = useDebouncedCallback(async (query: string) => {
    setLoading(true);
    setSearchResults(await getSearchResults(query));
    setLoading(false);
  }, 500);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.currentTarget.value);
    handleSearch(event.currentTarget.value);
  };

  return (
    <>
      <TextInput
        value={search}
        onChange={handleChange}
        placeholder="Search..."
        rightSection={loading && <Loader size={20} />}
      />
      {searchResults.map((result) => (
        <Text key={result.id} size="sm">
          {result.title}
        </Text>
      ))}
    </>
  );
}
```

## API Reference

### Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `callback` | `T extends (...args: any[]) => any` | - | **Required.** The function to debounce |
| `delayOrOptions` | `number \| UseDebouncedCallbackOptions` | - | **Required.** Delay in milliseconds or options object |

### UseDebouncedCallbackOptions

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `delay` | `number` | - | **Required.** Delay in milliseconds before executing the callback |
| `flushOnUnmount` | `boolean` | `false` | **Optional.** Whether to execute pending callback on component unmount |

### Return Value

Returns a debounced function with the same signature as the original callback, plus a `flush` method:

- **Debounced Function**: Delayed version of the original callback
- **flush()**: Method to immediately execute the pending callback

### Type Definition

```typescript
interface UseDebouncedCallbackOptions {
  delay: number;
  flushOnUnmount?: boolean;
}

type UseDebouncedCallbackReturnValue<T extends (...args: any[]) => any> = ((
  ...args: Parameters<T>
) => void) & { flush: () => void };

function useDebouncedCallback<T extends (...args: any[]) => any>(
  callback: T,
  delayOrOptions: number | UseDebouncedCallbackOptions
): UseDebouncedCallbackReturnValue<T>;
```

### Exported Types

```typescript
import type { 
  UseDebouncedCallbackOptions, 
  UseDebouncedCallbackReturnValue 
} from '@mantine/hooks';
```

## Advanced Usage

### Flush on Unmount

By default, the callback is not fired when the component unmounts. If you want to execute the pending callback before the component unmounts, set `flushOnUnmount: true`:

```tsx
import { useDebouncedCallback } from '@mantine/hooks';

const callback = useDebouncedCallback(
  () => console.log('Hello'),
  { delay: 1000, flushOnUnmount: true }
);
```

### Manual Flush

You can call the `flush` method to execute the debounced callback immediately:

```tsx
import { Button } from '@mantine/core';
import { useDebouncedCallback } from '@mantine/hooks';

function FlushExample() {
  const debouncedSave = useDebouncedCallback(
    (data: string) => {
      console.log('Saving:', data);
    },
    1000
  );

  const handleSaveNow = () => {
    debouncedSave.flush(); // Immediately executes the pending callback
  };

  return (
    <Button onClick={handleSaveNow}>
      Save Now
    </Button>
  );
}
```

### Multiple Debounced Functions

```tsx
import { TextInput, Textarea } from '@mantine/core';
import { useDebouncedCallback } from '@mantine/hooks';

function MultiDebounceExample() {
  const debouncedSearch = useDebouncedCallback(
    (query: string) => console.log('Searching:', query),
    300
  );

  const debouncedSave = useDebouncedCallback(
    (content: string) => console.log('Auto-saving:', content),
    2000
  );

  return (
    <>
      <TextInput
        placeholder="Search..."
        onChange={(e) => debouncedSearch(e.target.value)}
      />
      <Textarea
        placeholder="Type your content..."
        onChange={(e) => debouncedSave(e.target.value)}
      />
    </>
  );
}
```

### Conditional Debouncing

```tsx
import { Switch, TextInput } from '@mantine/core';
import { useDebouncedCallback } from '@mantine/hooks';
import { useState } from 'react';

function ConditionalDebounce() {
  const [enableDebounce, setEnableDebounce] = useState(true);

  const debouncedCallback = useDebouncedCallback(
    (value: string) => console.log('Processed:', value),
    500
  );

  const handleInputChange = (value: string) => {
    if (enableDebounce) {
      debouncedCallback(value);
    } else {
      console.log('Immediate:', value);
    }
  };

  return (
    <>
      <Switch
        label="Enable debouncing"
        checked={enableDebounce}
        onChange={(e) => setEnableDebounce(e.currentTarget.checked)}
      />
      <TextInput
        placeholder="Type here..."
        onChange={(e) => handleInputChange(e.target.value)}
      />
    </>
  );
}
```

## Refactorium Project Integration

### Code Search with Debouncing

In the Refactorium project, debounced callbacks are essential for implementing efficient code search functionality:

```tsx
// components/search/CodeSearchInput.tsx
import { TextInput, Loader, Text, Stack } from '@mantine/core';
import { useDebouncedCallback } from '@mantine/hooks';
import { useState } from 'react';

interface CodeSearchResult {
  id: string;
  filePath: string;
  lineNumber: number;
  codeSnippet: string;
  smellType: string;
}

interface CodeSearchInputProps {
  onResults: (results: CodeSearchResult[]) => void;
}

export function CodeSearchInput({ onResults }: CodeSearchInputProps) {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);

  const debouncedSearch = useDebouncedCallback(
    async (searchQuery: string) => {
      if (!searchQuery.trim()) {
        onResults([]);
        return;
      }

      setLoading(true);
      try {
        // Simulate API call to search code smells
        const results = await searchCodeSmells(searchQuery);
        onResults(results);
      } catch (error) {
        console.error('Search failed:', error);
        onResults([]);
      } finally {
        setLoading(false);
      }
    },
    500
  );

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setQuery(value);
    debouncedSearch(value);
  };

  return (
    <Stack gap="sm">
      <TextInput
        value={query}
        onChange={handleInputChange}
        placeholder="Search for code smells..."
        rightSection={loading && <Loader size={16} />}
      />
      {loading && <Text size="sm" c="dimmed">Searching...</Text>}
    </Stack>
  );
}

// Mock search function
async function searchCodeSmells(query: string): Promise<CodeSearchResult[]> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  return [
    {
      id: '1',
      filePath: 'src/utils/helpers.ts',
      lineNumber: 15,
      codeSnippet: 'function longMethod() { /* ... */ }',
      smellType: 'Long Method'
    }
  ];
}
```

### Auto-Save for Code Editor

```tsx
// components/editor/AutoSaveEditor.tsx
import { Textarea, Alert, Text } from '@mantine/core';
import { useDebouncedCallback } from '@mantine/hooks';
import { useState } from 'react';

interface AutoSaveEditorProps {
  initialContent: string;
  onSave: (content: string) => Promise<void>;
}

export function AutoSaveEditor({ initialContent, onSave }: AutoSaveEditorProps) {
  const [content, setContent] = useState(initialContent);
  const [saving, setSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  const debouncedSave = useDebouncedCallback(
    async (newContent: string) => {
      setSaving(true);
      try {
        await onSave(newContent);
        setLastSaved(new Date());
        setHasUnsavedChanges(false);
      } catch (error) {
        console.error('Save failed:', error);
      } finally {
        setSaving(false);
      }
    },
    { delay: 2000, flushOnUnmount: true }
  );

  const handleContentChange = (value: string) => {
    setContent(value);
    setHasUnsavedChanges(true);
    debouncedSave(value);
  };

  const handleSaveNow = () => {
    debouncedSave.flush();
  };

  return (
    <Stack gap="md">
      <Textarea
        value={content}
        onChange={(e) => handleContentChange(e.target.value)}
        placeholder="Write your refactored code here..."
        minRows={10}
      />
      
      <Alert 
        color={saving ? "blue" : hasUnsavedChanges ? "yellow" : "green"}
        variant="light"
      >
        {saving ? (
          <Text size="sm">Saving...</Text>
        ) : hasUnsavedChanges ? (
          <Text size="sm">Unsaved changes</Text>
        ) : (
          <Text size="sm">
            Saved {lastSaved ? `at ${lastSaved.toLocaleTimeString()}` : ''}
          </Text>
        )}
      </Alert>
      
      {hasUnsavedChanges && (
        <Button 
          variant="light" 
          size="sm" 
          onClick={handleSaveNow}
          disabled={saving}
        >
          Save Now
        </Button>
      )}
    </Stack>
  );
}
```

### Real-time Code Analysis

```tsx
// components/analysis/CodeAnalyzer.tsx
import { Textarea, Alert, Badge, Group, Text } from '@mantine/core';
import { useDebouncedCallback } from '@mantine/hooks';
import { useState } from 'react';

interface CodeIssue {
  type: 'error' | 'warning' | 'info';
  message: string;
  line: number;
  column: number;
}

interface CodeAnalyzerProps {
  onIssuesFound: (issues: CodeIssue[]) => void;
}

export function CodeAnalyzer({ onIssuesFound }: CodeAnalyzerProps) {
  const [code, setCode] = useState('');
  const [analyzing, setAnalyzing] = useState(false);

  const debouncedAnalysis = useDebouncedCallback(
    async (codeContent: string) => {
      if (!codeContent.trim()) {
        onIssuesFound([]);
        return;
      }

      setAnalyzing(true);
      try {
        const issues = await analyzeCode(codeContent);
        onIssuesFound(issues);
      } catch (error) {
        console.error('Analysis failed:', error);
        onIssuesFound([]);
      } finally {
        setAnalyzing(false);
      }
    },
    1000
  );

  const handleCodeChange = (value: string) => {
    setCode(value);
    debouncedAnalysis(value);
  };

  return (
    <Stack gap="md">
      <Textarea
        value={code}
        onChange={(e) => handleCodeChange(e.target.value)}
        placeholder="Paste your code here for analysis..."
        minRows={15}
      />
      
      {analyzing && (
        <Alert color="blue" variant="light">
          <Group gap="xs">
            <Loader size="sm" />
            <Text size="sm">Analyzing code for smells...</Text>
          </Group>
        </Alert>
      )}
    </Stack>
  );
}

// Mock analysis function
async function analyzeCode(code: string): Promise<CodeIssue[]> {
  // Simulate analysis delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  const issues: CodeIssue[] = [];
  
  // Simple analysis logic
  const lines = code.split('\n');
  lines.forEach((line, index) => {
    if (line.length > 120) {
      issues.push({
        type: 'warning',
        message: 'Line too long (>120 characters)',
        line: index + 1,
        column: 1
      });
    }
    
    if (line.includes('TODO') || line.includes('FIXME')) {
      issues.push({
        type: 'info',
        message: 'Contains TODO/FIXME comment',
        line: index + 1,
        column: line.indexOf('TODO') + 1
      });
    }
  });
  
  return issues;
}
```

## Use Cases

### 1. Search Input with API Calls

```tsx
function SearchComponent() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const debouncedSearch = useDebouncedCallback(
    async (searchQuery: string) => {
      setLoading(true);
      const data = await fetchSearchResults(searchQuery);
      setResults(data);
      setLoading(false);
    },
    300
  );

  return (
    <TextInput
      value={query}
      onChange={(e) => {
        setQuery(e.target.value);
        debouncedSearch(e.target.value);
      }}
      placeholder="Search..."
      rightSection={loading && <Loader size={16} />}
    />
  );
}
```

### 2. Form Validation

```tsx
function FormWithValidation() {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');

  const debouncedValidate = useDebouncedCallback(
    (emailValue: string) => {
      if (!emailValue.includes('@')) {
        setEmailError('Invalid email format');
      } else {
        setEmailError('');
      }
    },
    500
  );

  return (
    <Stack>
      <TextInput
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
          debouncedValidate(e.target.value);
        }}
        placeholder="Enter email"
        error={emailError}
      />
    </Stack>
  );
}
```

### 3. Resize Handler

```tsx
function ResizableComponent() {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  const debouncedResize = useDebouncedCallback(
    () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      });
    },
    250
  );

  useEffect(() => {
    window.addEventListener('resize', debouncedResize);
    return () => window.removeEventListener('resize', debouncedResize);
  }, [debouncedResize]);

  return (
    <Text>
      Window size: {dimensions.width} x {dimensions.height}
    </Text>
  );
}
```

### 4. API Polling with Debounce

```tsx
function PollingComponent() {
  const [data, setData] = useState(null);

  const debouncedFetch = useDebouncedCallback(
    async () => {
      const response = await fetch('/api/data');
      const result = await response.json();
      setData(result);
    },
    1000
  );

  useEffect(() => {
    const interval = setInterval(debouncedFetch, 5000);
    return () => clearInterval(interval);
  }, [debouncedFetch]);

  return <div>{data ? JSON.stringify(data) : 'Loading...'}</div>;
}
```

## Best Practices

### 1. Appropriate Delay Values

Choose delay values based on your use case:

```tsx
// Search input: Fast response for good UX
const debouncedSearch = useDebouncedCallback(searchFunction, 300);

// Auto-save: Longer delay to avoid excessive saves
const debouncedSave = useDebouncedCallback(saveFunction, 2000);

// Validation: Medium delay for real-time feedback
const debouncedValidate = useDebouncedCallback(validateFunction, 500);
```

### 2. Cleanup and Flush

Always consider cleanup scenarios:

```tsx
const debouncedCallback = useDebouncedCallback(
  saveFunction,
  { delay: 1000, flushOnUnmount: true } // Save before unmounting
);
```

### 3. Error Handling

Wrap debounced callbacks with proper error handling:

```tsx
const debouncedApiCall = useDebouncedCallback(
  async (data: any) => {
    try {
      await apiCall(data);
    } catch (error) {
      console.error('API call failed:', error);
      // Handle error appropriately
    }
  },
  500
);
```

### 4. Performance Considerations

Avoid creating new debounced functions on every render:

```tsx
// Good: Stable reference
const debouncedCallback = useDebouncedCallback(
  useCallback((value: string) => {
    // callback logic
  }, [dependency]),
  500
);

// Avoid: New function on every render
const debouncedCallback = useDebouncedCallback(
  (value: string) => {
    // callback logic
  },
  500
);
```

## Common Patterns

### Debounced State Updates

```tsx
const [value, setValue] = useState('');
const [debouncedValue, setDebouncedValue] = useState('');

const debouncedUpdate = useDebouncedCallback(
  (newValue: string) => setDebouncedValue(newValue),
  500
);

const handleChange = (newValue: string) => {
  setValue(newValue);
  debouncedUpdate(newValue);
};
```

### Conditional Debouncing

```tsx
const debouncedCallback = useDebouncedCallback(
  (data: any) => {
    if (shouldProcess(data)) {
      processData(data);
    }
  },
  300
);
```

### Chained Debounced Operations

```tsx
const debouncedStep1 = useDebouncedCallback(
  (input: string) => {
    const result1 = processStep1(input);
    debouncedStep2(result1);
  },
  300
);

const debouncedStep2 = useDebouncedCallback(
  (input: any) => {
    processStep2(input);
  },
  200
);
```

## Troubleshooting

### Callback Not Executing

1. **Check delay value**: Ensure the delay is appropriate for your use case
2. **Verify dependencies**: Make sure the callback dependencies are stable
3. **Check component lifecycle**: Ensure the component isn't unmounting before execution

### Performance Issues

1. **Optimize delay values**: Use shorter delays for better responsiveness when appropriate
2. **Minimize callback complexity**: Keep debounced functions lightweight
3. **Use flush sparingly**: Only call flush when necessary

### Memory Leaks

1. **Cleanup on unmount**: Use `flushOnUnmount: true` when needed
2. **Remove event listeners**: Ensure proper cleanup of event listeners
3. **Cancel pending operations**: Cancel any pending async operations

## Related Hooks

- `use-debounced-value` - For debouncing state values
- `use-throttled-callback` - For throttled function execution
- `use-interval` - For periodic function execution
- `use-timeout` - For delayed function execution

## Browser Support

- **Modern Browsers**: Full support
- **React 16.8+**: Requires React Hooks support
- **TypeScript**: Full type definitions included

---

*The `use-debounced-callback` hook is essential for optimizing performance in applications with frequent user interactions. In the Refactorium project, it's particularly valuable for implementing efficient search functionality, auto-save features, and real-time code analysis that enhance the user experience without overwhelming the system with excessive API calls.*
