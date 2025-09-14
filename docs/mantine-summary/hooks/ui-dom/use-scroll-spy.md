# use-scroll-spy Hook

## Overview

The `use-scroll-spy` hook tracks scroll position and detects which heading is currently in the viewport. It's specifically designed for creating table of contents components, navigation menus, and similar features that need to track which section is currently visible during scrolling. The hook automatically detects headings based on CSS selectors and provides real-time updates as the user scrolls through content.

## Installation

```bash
npm install @mantine/hooks
```

## Import

```typescript
import { useScrollSpy } from '@mantine/hooks';
import type { UseScrollSpyOptions, UseScrollSpyReturnType, UseScrollSpyHeadingData } from '@mantine/hooks';
```

## Basic Usage

```tsx
import { Text, UnstyledButton } from '@mantine/core';
import { useScrollSpy } from '@mantine/hooks';

function Demo() {
  const spy = useScrollSpy({
    selector: '#mdx :is(h1, h2, h3, h4, h5, h6)',
  });

  const headings = spy.data.map((heading, index) => (
    <li
      key={heading.id}
      style={{
        listStylePosition: 'inside',
        paddingInlineStart: heading.depth * 20,
        background: index === spy.active ? 'var(--mantine-color-blue-light)' : undefined,
      }}
    >
      <UnstyledButton onClick={() => heading.getNode().scrollIntoView()}>
        {heading.value}
      </UnstyledButton>
    </li>
  ));

  return (
    <div>
      <Text>Scroll to heading:</Text>
      <ul style={{ margin: 0, padding: 0 }}>{headings}</ul>
    </div>
  );
}
```

## API Reference

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `options` | `UseScrollSpyOptions` | **Optional.** Configuration options for scroll spy behavior |

### UseScrollSpyOptions

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `selector` | `string` | `'h1, h2, h3, h4, h5, h6'` | CSS selector to get headings |
| `getDepth` | `(element: HTMLElement) => number` | Based on tag name | Function to retrieve heading depth |
| `getValue` | `(element: HTMLElement) => string` | `element.textContent` | Function to retrieve heading text content |
| `scrollHost` | `HTMLElement` | `window` | Host element to attach scroll event listener |
| `offset` | `number` | `0` | Offset from top of viewport for active heading detection |

### Return Value

| Property | Type | Description |
|----------|------|-------------|
| `active` | `number` | Index of the active heading in the `data` array |
| `data` | `UseScrollSpyHeadingData[]` | Array of heading data objects |
| `initialized` | `boolean` | Whether headings have been retrieved from DOM |
| `reinitialize` | `() => void` | Function to update headings after DOM changes |

### UseScrollSpyHeadingData

| Property | Type | Description |
|----------|------|-------------|
| `depth` | `number` | Heading depth (1-6) |
| `value` | `string` | Heading text content |
| `id` | `string` | Unique heading identifier |
| `getNode` | `() => HTMLElement` | Function to get the heading DOM node |

### Type Definitions

```typescript
interface UseScrollSpyHeadingData {
  depth: number;
  value: string;
  id: string;
  getNode: () => HTMLElement;
}

interface UseScrollSpyOptions {
  selector?: string;
  getDepth?: (element: HTMLElement) => number;
  getValue?: (element: HTMLElement) => string;
  scrollHost?: HTMLElement;
  offset?: number;
}

interface UseScrollSpyReturnType {
  active: number;
  data: UseScrollSpyHeadingData[];
  initialized: boolean;
  reinitialize: () => void;
}

function useScrollSpy(options?: UseScrollSpyOptions): UseScrollSpyReturnType
```

## Key Features

### 1. **Automatic Heading Detection**
- Detects headings based on CSS selectors
- Supports custom depth and value extraction
- Handles dynamic content updates

### 2. **Real-time Scroll Tracking**
- Tracks scroll position continuously
- Updates active heading in real-time
- Configurable viewport offset

### 3. **Flexible Configuration**
- Custom selectors for different heading structures
- Custom depth and value extraction functions
- Support for different scroll containers

### 4. **DOM Change Handling**
- Reinitialization function for dynamic content
- Handles content updates after mount
- Maintains scroll state during updates

## Advanced Usage

### Custom Selector and Extraction

```tsx
import { Text, UnstyledButton } from '@mantine/core';
import { useScrollSpy } from '@mantine/hooks';

function CustomScrollSpy() {
  const spy = useScrollSpy({
    selector: '#mdx [data-heading]',
    getDepth: (element) => Number(element.getAttribute('data-order')),
    getValue: (element) => element.getAttribute('data-heading') || '',
  });

  const headings = spy.data.map((heading, index) => (
    <li
      key={heading.id}
      style={{
        listStylePosition: 'inside',
        paddingInlineStart: heading.depth * 20,
        background: index === spy.active ? 'var(--mantine-color-blue-light)' : undefined,
      }}
    >
      <UnstyledButton onClick={() => heading.getNode().scrollIntoView()}>
        {heading.value}
      </UnstyledButton>
    </li>
  ));

  return (
    <div>
      <Text>Scroll to heading:</Text>
      <ul style={{ margin: 0, padding: 0 }}>{headings}</ul>
    </div>
  );
}
```

### With Custom Scroll Container

```tsx
import { Text, UnstyledButton, Paper, Box } from '@mantine/core';
import { useScrollSpy } from '@mantine/hooks';
import { useRef } from 'react';

function ScrollSpyWithContainer() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  
  const spy = useScrollSpy({
    selector: 'h1, h2, h3',
    scrollHost: scrollContainerRef.current || undefined,
    offset: 50,
  });

  const headings = spy.data.map((heading, index) => (
    <li
      key={heading.id}
      style={{
        listStylePosition: 'inside',
        paddingInlineStart: heading.depth * 20,
        background: index === spy.active ? 'var(--mantine-color-blue-light)' : undefined,
      }}
    >
      <UnstyledButton onClick={() => heading.getNode().scrollIntoView()}>
        {heading.value}
      </UnstyledButton>
    </li>
  ));

  return (
    <Box style={{ display: 'flex', height: '400px' }}>
      <Paper
        ref={scrollContainerRef}
        style={{
          flex: 1,
          overflowY: 'auto',
          padding: '16px',
          marginRight: '16px'
        }}
      >
        <h1>Introduction</h1>
        <p>This is the introduction section...</p>
        
        <h2>Getting Started</h2>
        <p>This is the getting started section...</p>
        
        <h3>Installation</h3>
        <p>This is the installation section...</p>
        
        <h2>Advanced Usage</h2>
        <p>This is the advanced usage section...</p>
        
        <h3>Configuration</h3>
        <p>This is the configuration section...</p>
        
        <h1>Conclusion</h1>
        <p>This is the conclusion section...</p>
      </Paper>
      
      <Paper style={{ width: '200px', padding: '16px' }}>
        <Text weight="bold" mb="md">Table of Contents</Text>
        <ul style={{ margin: 0, padding: 0 }}>{headings}</ul>
      </Paper>
    </Box>
  );
}
```

### With Dynamic Content

```tsx
import { Text, UnstyledButton, Button, Box } from '@mantine/core';
import { useScrollSpy } from '@mantine/hooks';
import { useState, useEffect } from 'react';

function DynamicScrollSpy() {
  const [content, setContent] = useState('initial');
  
  const spy = useScrollSpy({
    selector: 'h1, h2, h3',
  });

  // Reinitialize when content changes
  useEffect(() => {
    spy.reinitialize();
  }, [content]);

  const headings = spy.data.map((heading, index) => (
    <li
      key={heading.id}
      style={{
        listStylePosition: 'inside',
        paddingInlineStart: heading.depth * 20,
        background: index === spy.active ? 'var(--mantine-color-blue-light)' : undefined,
      }}
    >
      <UnstyledButton onClick={() => heading.getNode().scrollIntoView()}>
        {heading.value}
      </UnstyledButton>
    </li>
  ));

  const loadNewContent = () => {
    setContent(content === 'initial' ? 'updated' : 'initial');
  };

  return (
    <Box>
      <Button onClick={loadNewContent} mb="md">
        Load {content === 'initial' ? 'Updated' : 'Initial'} Content
      </Button>
      
      <Box style={{ display: 'flex', height: '400px' }}>
        <Box style={{ flex: 1, overflowY: 'auto', padding: '16px', marginRight: '16px' }}>
          {content === 'initial' ? (
            <>
              <h1>Initial Content</h1>
              <p>This is the initial content...</p>
              <h2>Initial Section 1</h2>
              <p>This is initial section 1...</p>
              <h2>Initial Section 2</h2>
              <p>This is initial section 2...</p>
            </>
          ) : (
            <>
              <h1>Updated Content</h1>
              <p>This is the updated content...</p>
              <h2>Updated Section 1</h2>
              <p>This is updated section 1...</p>
              <h3>Updated Subsection</h3>
              <p>This is updated subsection...</p>
              <h2>Updated Section 2</h2>
              <p>This is updated section 2...</p>
            </>
          )}
        </Box>
        
        <Box style={{ width: '200px', padding: '16px' }}>
          <Text weight="bold" mb="md">Table of Contents</Text>
          <Text size="sm" color="dimmed" mb="md">
            Active: {spy.active >= 0 ? spy.data[spy.active]?.value : 'None'}
          </Text>
          <ul style={{ margin: 0, padding: 0 }}>{headings}</ul>
        </Box>
      </Box>
    </Box>
  );
}
```

## Use Cases

### 1. **Documentation Table of Contents**

```tsx
import { Text, UnstyledButton, Paper, Box, ScrollArea } from '@mantine/core';
import { useScrollSpy } from '@mantine/hooks';

function DocumentationTOC() {
  const spy = useScrollSpy({
    selector: 'h1, h2, h3, h4',
    offset: 100,
  });

  const headings = spy.data.map((heading, index) => (
    <Box
      key={heading.id}
      style={{
        paddingLeft: `${(heading.depth - 1) * 16}px`,
        paddingTop: '4px',
        paddingBottom: '4px',
        backgroundColor: index === spy.active ? 'var(--mantine-color-blue-light)' : 'transparent',
        borderRadius: '4px',
        cursor: 'pointer',
        transition: 'background-color 0.2s ease',
      }}
      onClick={() => heading.getNode().scrollIntoView({ behavior: 'smooth' })}
    >
      <Text
        size="sm"
        weight={index === spy.active ? 'bold' : 'normal'}
        color={index === spy.active ? 'blue' : 'dimmed'}
      >
        {heading.value}
      </Text>
    </Box>
  ));

  return (
    <Paper
      style={{
        position: 'sticky',
        top: '20px',
        width: '250px',
        height: 'fit-content',
        maxHeight: '80vh',
      }}
    >
      <Text weight="bold" mb="md" size="lg">
        Table of Contents
      </Text>
      <ScrollArea style={{ height: '60vh' }}>
        {headings}
      </ScrollArea>
    </Paper>
  );
}
```

### 2. **Navigation Menu with Active Section**

```tsx
import { Text, UnstyledButton, Box, Group, Badge } from '@mantine/core';
import { useScrollSpy } from '@mantine/hooks';

function NavigationMenu() {
  const spy = useScrollSpy({
    selector: 'section[id]',
    getDepth: (element) => 1,
    getValue: (element) => element.getAttribute('data-title') || element.id,
  });

  const sections = spy.data.map((section, index) => (
    <UnstyledButton
      key={section.id}
      onClick={() => section.getNode().scrollIntoView({ behavior: 'smooth' })}
      style={{
        display: 'block',
        width: '100%',
        padding: '12px 16px',
        textAlign: 'left',
        backgroundColor: index === spy.active ? 'var(--mantine-color-blue-light)' : 'transparent',
        borderRadius: '8px',
        marginBottom: '4px',
        transition: 'all 0.2s ease',
      }}
    >
      <Group justify="space-between">
        <Text
          weight={index === spy.active ? 'bold' : 'normal'}
          color={index === spy.active ? 'blue' : 'dark'}
        >
          {section.value}
        </Text>
        {index === spy.active && (
          <Badge size="xs" color="blue">
            Active
          </Badge>
        )}
      </Group>
    </UnstyledButton>
  ));

  return (
    <Box style={{ width: '280px' }}>
      <Text weight="bold" mb="md" size="lg">
        Navigation
      </Text>
      {sections}
    </Box>
  );
}
```

### 3. **Progress Indicator**

```tsx
import { Text, Box, Progress, Group, Badge } from '@mantine/core';
import { useScrollSpy } from '@mantine/hooks';

function ProgressIndicator() {
  const spy = useScrollSpy({
    selector: 'h1, h2, h3',
    offset: 50,
  });

  const progress = spy.data.length > 0 ? ((spy.active + 1) / spy.data.length) * 100 : 0;

  return (
    <Box>
      <Group justify="space-between" mb="md">
        <Text weight="bold">Reading Progress</Text>
        <Badge color="blue" variant="light">
          {spy.active + 1} / {spy.data.length}
        </Badge>
      </Group>
      
      <Progress
        value={progress}
        size="lg"
        radius="xl"
        color="blue"
        mb="md"
      />
      
      {spy.data.length > 0 && (
        <Text size="sm" color="dimmed">
          Currently reading: {spy.data[spy.active]?.value || 'Introduction'}
        </Text>
      )}
    </Box>
  );
}
```

### 4. **Sidebar Navigation with Nested Items**

```tsx
import { Text, UnstyledButton, Box, Collapse, Group } from '@mantine/core';
import { useScrollSpy } from '@mantine/hooks';
import { useState } from 'react';
import { IconChevronDown, IconChevronRight } from '@tabler/icons-react';

function NestedSidebarNavigation() {
  const [expandedSections, setExpandedSections] = useState<Set<number>>(new Set());
  
  const spy = useScrollSpy({
    selector: 'h1, h2, h3',
    offset: 100,
  });

  const toggleSection = (index: number) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(index)) {
      newExpanded.delete(index);
    } else {
      newExpanded.add(index);
    }
    setExpandedSections(newExpanded);
  };

  const renderHeading = (heading: any, index: number) => {
    const isActive = index === spy.active;
    const isExpanded = expandedSections.has(index);
    const hasChildren = index < spy.data.length - 1 && 
      spy.data[index + 1].depth > heading.depth;

    return (
      <Box key={heading.id}>
        <Group
          justify="space-between"
          onClick={() => {
            if (hasChildren) {
              toggleSection(index);
            } else {
              heading.getNode().scrollIntoView({ behavior: 'smooth' });
            }
          }}
          style={{
            padding: '8px 12px',
            cursor: 'pointer',
            backgroundColor: isActive ? 'var(--mantine-color-blue-light)' : 'transparent',
            borderRadius: '6px',
            marginBottom: '2px',
            transition: 'all 0.2s ease',
          }}
        >
          <Text
            size="sm"
            weight={isActive ? 'bold' : 'normal'}
            color={isActive ? 'blue' : 'dark'}
            style={{ paddingLeft: `${(heading.depth - 1) * 16}px` }}
          >
            {heading.value}
          </Text>
          {hasChildren && (
            isExpanded ? <IconChevronDown size={16} /> : <IconChevronRight size={16} />
          )}
        </Group>
        
        {hasChildren && (
          <Collapse in={isExpanded}>
            <Box style={{ paddingLeft: `${heading.depth * 16}px` }}>
              {/* Render nested items here */}
            </Box>
          </Collapse>
        )}
      </Box>
    );
  };

  return (
    <Box style={{ width: '300px' }}>
      <Text weight="bold" mb="md" size="lg">
        Navigation
      </Text>
      {spy.data.map(renderHeading)}
    </Box>
  );
}
```

### 5. **Breadcrumb Navigation**

```tsx
import { Text, Breadcrumbs, Anchor, Box } from '@mantine/core';
import { useScrollSpy } from '@mantine/hooks';

function BreadcrumbNavigation() {
  const spy = useScrollSpy({
    selector: 'h1, h2, h3',
    offset: 50,
  });

  const getBreadcrumbItems = () => {
    if (spy.active < 0) return [];
    
    const activeHeading = spy.data[spy.active];
    const breadcrumbs = [];
    
    // Add all parent headings
    for (let i = 0; i <= spy.active; i++) {
      const heading = spy.data[i];
      if (heading.depth <= activeHeading.depth) {
        breadcrumbs.push({
          title: heading.value,
          onClick: () => heading.getNode().scrollIntoView({ behavior: 'smooth' }),
        });
      }
    }
    
    return breadcrumbs;
  };

  const breadcrumbItems = getBreadcrumbItems().map((item, index) => (
    <Anchor
      key={index}
      onClick={item.onClick}
      size="sm"
      style={{ cursor: 'pointer' }}
    >
      {item.title}
    </Anchor>
  ));

  return (
    <Box>
      <Breadcrumbs separator="→" mb="md">
        {breadcrumbItems}
      </Breadcrumbs>
      
      <Text size="sm" color="dimmed">
        Current section: {spy.data[spy.active]?.value || 'None'}
      </Text>
    </Box>
  );
}
```

### 6. **Reading Time Estimator**

```tsx
import { Text, Box, Group, Badge, Progress } from '@mantine/core';
import { useScrollSpy } from '@mantine/hooks';
import { useMemo } from 'react';

function ReadingTimeEstimator() {
  const spy = useScrollSpy({
    selector: 'h1, h2, h3, h4, h5, h6',
    offset: 50,
  });

  const readingStats = useMemo(() => {
    if (spy.data.length === 0) return { progress: 0, timeRemaining: 0 };
    
    const progress = ((spy.active + 1) / spy.data.length) * 100;
    const timeRemaining = Math.max(0, spy.data.length - spy.active - 1) * 2; // 2 minutes per section
    
    return { progress, timeRemaining };
  }, [spy.active, spy.data.length]);

  return (
    <Box>
      <Group justify="space-between" mb="md">
        <Text weight="bold">Reading Progress</Text>
        <Badge color="blue" variant="light">
          {spy.active + 1} / {spy.data.length} sections
        </Badge>
      </Group>
      
      <Progress
        value={readingStats.progress}
        size="lg"
        radius="xl"
        color="blue"
        mb="md"
      />
      
      <Group justify="space-between">
        <Text size="sm" color="dimmed">
          Current: {spy.data[spy.active]?.value || 'Introduction'}
        </Text>
        <Text size="sm" color="dimmed">
          ~{readingStats.timeRemaining} min remaining
        </Text>
      </Group>
    </Box>
  );
}
```

## Performance Considerations

### Memoized Scroll Spy

```tsx
import { useScrollSpy } from '@mantine/hooks';
import { memo, useCallback } from 'react';
import { Text, UnstyledButton, Box } from '@mantine/core';

const ScrollSpyItem = memo(function ScrollSpyItem({ 
  heading, 
  isActive, 
  onClick 
}: { 
  heading: any; 
  isActive: boolean; 
  onClick: () => void; 
}) {
  return (
    <Box
      style={{
        paddingLeft: `${(heading.depth - 1) * 16}px`,
        paddingTop: '4px',
        paddingBottom: '4px',
        backgroundColor: isActive ? 'var(--mantine-color-blue-light)' : 'transparent',
        borderRadius: '4px',
        cursor: 'pointer',
        transition: 'background-color 0.2s ease',
      }}
      onClick={onClick}
    >
      <Text
        size="sm"
        weight={isActive ? 'bold' : 'normal'}
        color={isActive ? 'blue' : 'dimmed'}
      >
        {heading.value}
      </Text>
    </Box>
  );
});

function OptimizedScrollSpy() {
  const spy = useScrollSpy({
    selector: 'h1, h2, h3',
  });

  const handleHeadingClick = useCallback((heading: any) => {
    heading.getNode().scrollIntoView({ behavior: 'smooth' });
  }, []);

  return (
    <Box>
      {spy.data.map((heading, index) => (
        <ScrollSpyItem
          key={heading.id}
          heading={heading}
          isActive={index === spy.active}
          onClick={() => handleHeadingClick(heading)}
        />
      ))}
    </Box>
  );
}
```

### Debounced Scroll Spy

```tsx
import { useScrollSpy } from '@mantine/hooks';
import { useMemo } from 'react';
import { Text, Box } from '@mantine/core';

function DebouncedScrollSpy() {
  const spy = useScrollSpy({
    selector: 'h1, h2, h3',
    offset: 100,
  });

  // Memoize the active heading to prevent unnecessary re-renders
  const activeHeading = useMemo(() => {
    return spy.data[spy.active] || null;
  }, [spy.active, spy.data]);

  return (
    <Box>
      <Text weight="bold" mb="md">Current Section</Text>
      {activeHeading ? (
        <Text color="blue" weight="bold">
          {activeHeading.value}
        </Text>
      ) : (
        <Text color="dimmed">No section active</Text>
      )}
    </Box>
  );
}
```

## Common Patterns

### Scroll Spy with State Management

```tsx
import { useScrollSpy } from '@mantine/hooks';
import { Text, Box, Button, Group } from '@mantine/core';
import { useState, useEffect } from 'react';

function ScrollSpyWithState() {
  const [visitedSections, setVisitedSections] = useState<Set<number>>(new Set());
  
  const spy = useScrollSpy({
    selector: 'h1, h2, h3',
  });

  // Track visited sections
  useEffect(() => {
    if (spy.active >= 0) {
      setVisitedSections(prev => new Set([...prev, spy.active]));
    }
  }, [spy.active]);

  const clearVisited = () => {
    setVisitedSections(new Set());
  };

  return (
    <Box>
      <Group justify="space-between" mb="md">
        <Text weight="bold">Navigation</Text>
        <Button size="xs" onClick={clearVisited}>
          Clear Visited
        </Button>
      </Group>
      
      {spy.data.map((heading, index) => (
        <Box
          key={heading.id}
          style={{
            padding: '8px 12px',
            backgroundColor: index === spy.active 
              ? 'var(--mantine-color-blue-light)' 
              : visitedSections.has(index)
                ? 'var(--mantine-color-green-light)'
                : 'transparent',
            borderRadius: '4px',
            marginBottom: '2px',
            cursor: 'pointer',
          }}
          onClick={() => heading.getNode().scrollIntoView({ behavior: 'smooth' })}
        >
          <Text size="sm">
            {heading.value}
            {visitedSections.has(index) && ' ✓'}
          </Text>
        </Box>
      ))}
    </Box>
  );
}
```

### Scroll Spy with Analytics

```tsx
import { useScrollSpy } from '@mantine/hooks';
import { Text, Box } from '@mantine/core';
import { useEffect, useRef } from 'react';

function ScrollSpyWithAnalytics() {
  const spy = useScrollSpy({
    selector: 'h1, h2, h3',
  });
  
  const sectionTimes = useRef<Map<number, number>>(new Map());
  const startTime = useRef<number>(Date.now());

  useEffect(() => {
    const now = Date.now();
    const timeSpent = now - startTime.current;
    
    if (spy.active >= 0) {
      const currentTime = sectionTimes.current.get(spy.active) || 0;
      sectionTimes.current.set(spy.active, currentTime + timeSpent);
    }
    
    startTime.current = now;
  }, [spy.active]);

  const getTimeSpent = (index: number) => {
    const time = sectionTimes.current.get(index) || 0;
    return Math.round(time / 1000);
  };

  return (
    <Box>
      <Text weight="bold" mb="md">Reading Analytics</Text>
      
      {spy.data.map((heading, index) => (
        <Box
          key={heading.id}
          style={{
            padding: '8px 12px',
            backgroundColor: index === spy.active ? 'var(--mantine-color-blue-light)' : 'transparent',
            borderRadius: '4px',
            marginBottom: '2px',
            cursor: 'pointer',
          }}
          onClick={() => heading.getNode().scrollIntoView({ behavior: 'smooth' })}
        >
          <Group justify="space-between">
            <Text size="sm">{heading.value}</Text>
            <Text size="xs" color="dimmed">
              {getTimeSpent(index)}s
            </Text>
          </Group>
        </Box>
      ))}
    </Box>
  );
}
```

## Integration with Other Hooks

### Combined with useScrollIntoView

```tsx
import { useScrollSpy, useScrollIntoView } from '@mantine/hooks';
import { Text, Box, Button, Group } from '@mantine/core';

function ScrollSpyWithScrollIntoView() {
  const spy = useScrollSpy({
    selector: 'h1, h2, h3',
  });
  
  const { scrollIntoView, targetRef } = useScrollIntoView({
    duration: 500,
  });

  const scrollToSection = (index: number) => {
    const heading = spy.data[index];
    if (heading) {
      heading.getNode().scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <Box>
      <Group mb="md">
        <Button onClick={() => scrollIntoView({ alignment: 'center' })}>
          Scroll to Target
        </Button>
      </Group>
      
      <Text weight="bold" mb="md">Sections</Text>
      {spy.data.map((heading, index) => (
        <Box
          key={heading.id}
          style={{
            padding: '8px 12px',
            backgroundColor: index === spy.active ? 'var(--mantine-color-blue-light)' : 'transparent',
            borderRadius: '4px',
            marginBottom: '2px',
            cursor: 'pointer',
          }}
          onClick={() => scrollToSection(index)}
        >
          <Text size="sm">{heading.value}</Text>
        </Box>
      ))}
      
      <div ref={targetRef} style={{ height: '200px', marginTop: '50vh' }}>
        <Text>Target element</Text>
      </div>
    </Box>
  );
}
```

### Combined with useLocalStorage

```tsx
import { useScrollSpy, useLocalStorage } from '@mantine/hooks';
import { Text, Box, Button, Group } from '@mantine/core';
import { useEffect } from 'react';

function ScrollSpyWithStorage() {
  const spy = useScrollSpy({
    selector: 'h1, h2, h3',
  });
  
  const [lastReadSection, setLastReadSection] = useLocalStorage({
    key: 'last-read-section',
    defaultValue: 0,
  });

  useEffect(() => {
    if (spy.active >= 0) {
      setLastReadSection(spy.active);
    }
  }, [spy.active, setLastReadSection]);

  const goToLastRead = () => {
    const heading = spy.data[lastReadSection];
    if (heading) {
      heading.getNode().scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <Box>
      <Group mb="md">
        <Button onClick={goToLastRead}>
          Go to Last Read Section
        </Button>
        <Text size="sm" color="dimmed">
          Last read: {spy.data[lastReadSection]?.value || 'None'}
        </Text>
      </Group>
      
      <Text weight="bold" mb="md">Sections</Text>
      {spy.data.map((heading, index) => (
        <Box
          key={heading.id}
          style={{
            padding: '8px 12px',
            backgroundColor: index === spy.active ? 'var(--mantine-color-blue-light)' : 'transparent',
            borderRadius: '4px',
            marginBottom: '2px',
            cursor: 'pointer',
          }}
          onClick={() => heading.getNode().scrollIntoView({ behavior: 'smooth' })}
        >
          <Text size="sm">
            {heading.value}
            {index === lastReadSection && ' (Last Read)'}
          </Text>
        </Box>
      ))}
    </Box>
  );
}
```

## Troubleshooting

### Common Issues

1. **Headings Not Detected**
   - Check if the selector matches your HTML structure
   - Ensure headings are present in the DOM when the hook initializes
   - Use `reinitialize()` after dynamic content changes

2. **Active Section Not Updating**
   - Verify the scroll container is correct
   - Check if the offset value is appropriate
   - Ensure scroll events are firing

3. **Performance Issues**
   - Use memoization for expensive calculations
   - Consider debouncing scroll events
   - Limit the number of headings being tracked

### Debug Information

```tsx
import { useScrollSpy } from '@mantine/hooks';
import { Text, Box, Button, Group, Code } from '@mantine/core';

function DebugScrollSpy() {
  const spy = useScrollSpy({
    selector: 'h1, h2, h3',
  });

  return (
    <Box>
      <Text weight="bold" mb="md">Debug Information</Text>
      
      <Group mb="md">
        <Button onClick={() => spy.reinitialize()}>
          Reinitialize
        </Button>
      </Group>
      
      <Box mb="md">
        <Text size="sm" weight="bold">Status:</Text>
        <Code block>
          {JSON.stringify({
            active: spy.active,
            initialized: spy.initialized,
            dataLength: spy.data.length,
            headings: spy.data.map(h => ({ value: h.value, depth: h.depth }))
          }, null, 2)}
        </Code>
      </Box>
      
      <Text weight="bold" mb="md">Headings:</Text>
      {spy.data.map((heading, index) => (
        <Box
          key={heading.id}
          style={{
            padding: '8px 12px',
            backgroundColor: index === spy.active ? 'var(--mantine-color-blue-light)' : 'transparent',
            borderRadius: '4px',
            marginBottom: '2px',
            cursor: 'pointer',
          }}
          onClick={() => heading.getNode().scrollIntoView({ behavior: 'smooth' })}
        >
          <Text size="sm">
            {heading.value} (Depth: {heading.depth})
          </Text>
        </Box>
      ))}
    </Box>
  );
}
```

## Browser Support

- **Modern Browsers**: Full support
- **Legacy Browsers**: Full support with polyfills
- **Mobile Browsers**: Full support
- **Server-Side**: Safe to use (no-op during SSR)

## Related Hooks

- `use-scroll-into-view` - For programmatic scrolling
- `use-intersection` - For viewport intersection detection
- `use-in-viewport` - For viewport visibility
- `use-media-query` - For responsive behavior

## Best Practices

1. **Performance**: Use memoization for expensive calculations
2. **Accessibility**: Ensure proper heading hierarchy
3. **User Experience**: Provide smooth scrolling and visual feedback
4. **Testing**: Test with different content structures
5. **Fallbacks**: Handle cases where no headings are found

---

*The `use-scroll-spy` hook provides a powerful way to track scroll position and detect which heading is currently in the viewport. It's perfect for creating table of contents, navigation menus, progress indicators, and any feature that needs to track the current section during scrolling with excellent performance and full accessibility support.*
