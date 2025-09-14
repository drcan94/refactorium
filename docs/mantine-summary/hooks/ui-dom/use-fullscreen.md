# use-fullscreen Hook

## Overview

The `use-fullscreen` hook allows you to enter and exit fullscreen mode for a given element or the entire page using the Fullscreen API. This hook provides a clean, React-friendly way to manage fullscreen functionality, perfect for media players, presentations, image viewers, and immersive user experiences.

## Installation

```bash
npm install @mantine/hooks
```

## Import

```typescript
import { useFullscreen } from '@mantine/hooks';
import type { UseFullscreenReturnValue } from '@mantine/hooks';
```

## Basic Usage

```tsx
import { useFullscreen } from '@mantine/hooks';
import { Button } from '@mantine/core';

function Demo() {
  const { toggle, fullscreen } = useFullscreen();

  return (
    <Button onClick={toggle} color={fullscreen ? 'red' : 'blue'}>
      {fullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
    </Button>
  );
}
```

## API Reference

### Return Value

| Property | Type | Description |
|----------|------|-------------|
| `ref` | `React.RefCallback<T \| null>` | Ref callback for targeting a specific element |
| `toggle` | `() => Promise<void>` | Function to toggle fullscreen mode |
| `fullscreen` | `boolean` | Current fullscreen state |

### Type Definition

```typescript
interface UseFullscreenReturnValue<T extends HTMLElement = any> {
  ref: React.RefCallback<T | null>;
  toggle: () => Promise<void>;
  fullscreen: boolean;
}

function useFullscreen<T extends HTMLElement = any>(): UseFullscreenReturnValue<T>;
```

## Key Features

### 1. **Fullscreen API Integration**
- Uses the native Fullscreen API for optimal performance
- Handles browser compatibility automatically
- Provides proper error handling

### 2. **Flexible Target Elements**
- Can target any HTML element
- Defaults to `document.documentElement` if no ref provided
- Supports custom element targeting

### 3. **Promise-Based API**
- `toggle` function returns a Promise
- Enables proper async/await handling
- Provides error handling capabilities

## Advanced Usage

### Custom Target Element

```tsx
import { useFullscreen } from '@mantine/hooks';
import { Button, Stack, Image } from '@mantine/core';

function CustomTarget() {
  const { ref, toggle, fullscreen } = useFullscreen();

  return (
    <Stack align="center">
      <Image
        ref={ref}
        src="https://example.com/image.jpg"
        alt="Fullscreen image"
        width={200}
        height={150}
        style={{
          border: fullscreen ? '3px solid #ff6b6b' : '1px solid #ddd',
          borderRadius: '8px'
        }}
      />
      <Button onClick={toggle} color={fullscreen ? 'red' : 'blue'}>
        {fullscreen ? 'Exit Fullscreen' : 'View Image Fullscreen'}
      </Button>
    </Stack>
  );
}
```

### TypeScript with Specific Element Type

```tsx
import { useFullscreen } from '@mantine/hooks';
import { Button, Paper } from '@mantine/core';

function TypedFullscreen() {
  const { ref, toggle, fullscreen } = useFullscreen<HTMLDivElement>();

  return (
    <div>
      <Paper
        ref={ref}
        p="md"
        style={{
          backgroundColor: fullscreen ? '#000' : '#fff',
          color: fullscreen ? '#fff' : '#000',
          transition: 'all 0.3s ease'
        }}
      >
        <h3>Fullscreen Content</h3>
        <p>This content can be viewed in fullscreen mode.</p>
      </Paper>
      <Button onClick={toggle} mt="md">
        {fullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
      </Button>
    </div>
  );
}
```

## Use Cases

### 1. **Image Gallery with Fullscreen**

```tsx
import { useFullscreen } from '@mantine/hooks';
import { Button, Image, Stack, Text } from '@mantine/core';
import { useState } from 'react';

function ImageGallery() {
  const [currentImage, setCurrentImage] = useState(0);
  const { ref, toggle, fullscreen } = useFullscreen();

  const images = [
    'https://example.com/image1.jpg',
    'https://example.com/image2.jpg',
    'https://example.com/image3.jpg'
  ];

  return (
    <Stack align="center">
      <Image
        ref={ref}
        src={images[currentImage]}
        alt={`Image ${currentImage + 1}`}
        width={300}
        height={200}
        style={{
          cursor: 'pointer',
          border: fullscreen ? 'none' : '2px solid #ddd',
          borderRadius: fullscreen ? '0' : '8px'
        }}
        onClick={toggle}
      />
      
      <Text size="sm" color="dimmed">
        Click image to view fullscreen
      </Text>
      
      <Stack direction="row">
        <Button
          onClick={() => setCurrentImage(prev => 
            prev > 0 ? prev - 1 : images.length - 1
          )}
          disabled={fullscreen}
        >
          Previous
        </Button>
        <Button onClick={toggle} color={fullscreen ? 'red' : 'blue'}>
          {fullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
        </Button>
        <Button
          onClick={() => setCurrentImage(prev => 
            prev < images.length - 1 ? prev + 1 : 0
          )}
          disabled={fullscreen}
        >
          Next
        </Button>
      </Stack>
    </Stack>
  );
}
```

### 2. **Video Player with Fullscreen**

```tsx
import { useFullscreen } from '@mantine/hooks';
import { Button, Stack, Text } from '@mantine/core';
import { useRef, useState } from 'react';

function VideoPlayer() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const { ref, toggle, fullscreen } = useFullscreen();
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <Stack align="center">
      <div
        ref={ref}
        style={{
          position: 'relative',
          backgroundColor: fullscreen ? '#000' : 'transparent'
        }}
      >
        <video
          ref={videoRef}
          width={fullscreen ? '100vw' : '600'}
          height={fullscreen ? '100vh' : '400'}
          style={{
            display: 'block',
            objectFit: 'contain'
          }}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
        >
          <source src="https://example.com/video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        
        {!fullscreen && (
          <div style={{ marginTop: '8px' }}>
            <Button onClick={handlePlayPause}>
              {isPlaying ? 'Pause' : 'Play'}
            </Button>
            <Button onClick={toggle} ml="sm">
              Fullscreen
            </Button>
          </div>
        )}
      </div>
      
      {fullscreen && (
        <div
          style={{
            position: 'fixed',
            top: '20px',
            right: '20px',
            zIndex: 1000
          }}
        >
          <Button onClick={toggle} color="red">
            Exit Fullscreen
          </Button>
        </div>
      )}
    </Stack>
  );
}
```

### 3. **Presentation Mode**

```tsx
import { useFullscreen } from '@mantine/hooks';
import { Button, Paper, Text, Stack, Group } from '@mantine/core';
import { useState } from 'react';

function PresentationMode() {
  const { ref, toggle, fullscreen } = useFullscreen();
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    { title: 'Welcome', content: 'This is slide 1' },
    { title: 'Features', content: 'This is slide 2' },
    { title: 'Conclusion', content: 'This is slide 3' }
  ];

  return (
    <div>
      <Paper
        ref={ref}
        p="xl"
        style={{
          minHeight: fullscreen ? '100vh' : '400px',
          backgroundColor: fullscreen ? '#1a1a1a' : '#ffffff',
          color: fullscreen ? '#ffffff' : '#000000',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center'
        }}
      >
        <Text size={fullscreen ? 'xl' : 'lg'} weight="bold" mb="md">
          {slides[currentSlide].title}
        </Text>
        <Text size={fullscreen ? 'lg' : 'md'}>
          {slides[currentSlide].content}
        </Text>
        
        {!fullscreen && (
          <Group mt="xl">
            <Button
              onClick={() => setCurrentSlide(prev => 
                prev > 0 ? prev - 1 : slides.length - 1
              )}
            >
              Previous
            </Button>
            <Button onClick={toggle}>
              Enter Presentation Mode
            </Button>
            <Button
              onClick={() => setCurrentSlide(prev => 
                prev < slides.length - 1 ? prev + 1 : 0
              )}
            >
              Next
            </Button>
          </Group>
        )}
      </Paper>
      
      {fullscreen && (
        <div
          style={{
            position: 'fixed',
            bottom: '20px',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 1000
          }}
        >
          <Group>
            <Button
              onClick={() => setCurrentSlide(prev => 
                prev > 0 ? prev - 1 : slides.length - 1
              )}
            >
              Previous
            </Button>
            <Button onClick={toggle} color="red">
              Exit Presentation
            </Button>
            <Button
              onClick={() => setCurrentSlide(prev => 
                prev < slides.length - 1 ? prev + 1 : 0
              )}
            >
              Next
            </Button>
          </Group>
        </div>
      )}
    </div>
  );
}
```

### 4. **Code Editor with Fullscreen**

```tsx
import { useFullscreen } from '@mantine/hooks';
import { Button, Paper, Text, Stack } from '@mantine/core';
import { useState } from 'react';

function CodeEditor() {
  const { ref, toggle, fullscreen } = useFullscreen();
  const [code, setCode] = useState(`function hello() {
  console.log("Hello, World!");
}`);

  return (
    <div>
      <Paper
        ref={ref}
        p="md"
        style={{
          backgroundColor: fullscreen ? '#1e1e1e' : '#f8f9fa',
          color: fullscreen ? '#d4d4d4' : '#000000',
          fontFamily: 'Monaco, Consolas, "Courier New", monospace',
          fontSize: fullscreen ? '16px' : '14px',
          lineHeight: '1.5',
          minHeight: fullscreen ? '100vh' : '300px',
          overflow: 'auto'
        }}
      >
        <Text size="sm" mb="md" color="dimmed">
          Code Editor {fullscreen && '(Fullscreen Mode)'}
        </Text>
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          style={{
            width: '100%',
            height: fullscreen ? 'calc(100vh - 100px)' : '200px',
            backgroundColor: 'transparent',
            color: 'inherit',
            border: 'none',
            outline: 'none',
            resize: 'none',
            fontFamily: 'inherit',
            fontSize: 'inherit',
            lineHeight: 'inherit'
          }}
        />
      </Paper>
      
      <Button onClick={toggle} mt="md">
        {fullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
      </Button>
    </div>
  );
}
```

### 5. **Dashboard with Fullscreen Widgets**

```tsx
import { useFullscreen } from '@mantine/hooks';
import { Button, Paper, Text, Grid, Stack } from '@mantine/core';
import { useState } from 'react';

function Dashboard() {
  const [fullscreenWidget, setFullscreenWidget] = useState<string | null>(null);
  const { ref: chartRef, toggle: toggleChart, fullscreen: chartFullscreen } = useFullscreen();
  const { ref: tableRef, toggle: toggleTable, fullscreen: tableFullscreen } = useFullscreen();

  return (
    <div>
      <Grid>
        <Grid.Col span={6}>
          <Paper
            ref={chartRef}
            p="md"
            style={{
              height: chartFullscreen ? '100vh' : '300px',
              backgroundColor: chartFullscreen ? '#000' : '#fff',
              color: chartFullscreen ? '#fff' : '#000',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <Text size="lg" mb="md">Chart Widget</Text>
            <div style={{ fontSize: '48px' }}>📊</div>
            <Button
              onClick={toggleChart}
              size="sm"
              style={{ marginTop: '16px' }}
            >
              {chartFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
            </Button>
          </Paper>
        </Grid.Col>
        
        <Grid.Col span={6}>
          <Paper
            ref={tableRef}
            p="md"
            style={{
              height: tableFullscreen ? '100vh' : '300px',
              backgroundColor: tableFullscreen ? '#000' : '#fff',
              color: tableFullscreen ? '#fff' : '#000',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <Text size="lg" mb="md">Table Widget</Text>
            <div style={{ fontSize: '48px' }}>📋</div>
            <Button
              onClick={toggleTable}
              size="sm"
              style={{ marginTop: '16px' }}
            >
              {tableFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
            </Button>
          </Paper>
        </Grid.Col>
      </Grid>
    </div>
  );
}
```

### 6. **Document Viewer with Fullscreen**

```tsx
import { useFullscreen } from '@mantine/hooks';
import { Button, Paper, Text, Stack, Group } from '@mantine/core';
import { useState } from 'react';

function DocumentViewer() {
  const { ref, toggle, fullscreen } = useFullscreen();
  const [zoom, setZoom] = useState(100);

  return (
    <div>
      <Paper
        ref={ref}
        p="md"
        style={{
          backgroundColor: fullscreen ? '#f5f5f5' : '#ffffff',
          minHeight: fullscreen ? '100vh' : '500px',
          overflow: 'auto'
        }}
      >
        <div
          style={{
            transform: `scale(${zoom / 100})`,
            transformOrigin: 'top left',
            width: fullscreen ? '100%' : '100%'
          }}
        >
          <Text size="xl" weight="bold" mb="md">
            Document Title
          </Text>
          <Text mb="md">
            This is a sample document that can be viewed in fullscreen mode.
            The content will be scaled and optimized for fullscreen viewing.
          </Text>
          <Text mb="md">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
            veniam, quis nostrud exercitation ullamco laboris.
          </Text>
        </div>
      </Paper>
      
      <Group mt="md">
        <Button onClick={toggle}>
          {fullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
        </Button>
        {!fullscreen && (
          <>
            <Button
              onClick={() => setZoom(prev => Math.max(50, prev - 25))}
              size="sm"
            >
              Zoom Out
            </Button>
            <Text size="sm">{zoom}%</Text>
            <Button
              onClick={() => setZoom(prev => Math.min(200, prev + 25))}
              size="sm"
            >
              Zoom In
            </Button>
          </>
        )}
      </Group>
    </div>
  );
}
```

## Performance Considerations

### Error Handling

```tsx
import { useFullscreen } from '@mantine/hooks';
import { Button, Text, Alert } from '@mantine/core';
import { useState } from 'react';

function FullscreenWithErrorHandling() {
  const { ref, toggle, fullscreen } = useFullscreen();
  const [error, setError] = useState<string | null>(null);

  const handleToggle = async () => {
    try {
      setError(null);
      await toggle();
    } catch (err) {
      setError('Failed to toggle fullscreen mode');
      console.error('Fullscreen error:', err);
    }
  };

  return (
    <div>
      {error && (
        <Alert color="red" mb="md">
          {error}
        </Alert>
      )}
      
      <div
        ref={ref}
        style={{
          height: fullscreen ? '100vh' : '300px',
          backgroundColor: fullscreen ? '#000' : '#f0f0f0',
          color: fullscreen ? '#fff' : '#000',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <Text>Fullscreen Content</Text>
      </div>
      
      <Button onClick={handleToggle} mt="md">
        {fullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
      </Button>
    </div>
  );
}
```

### Conditional Fullscreen

```tsx
import { useFullscreen } from '@mantine/hooks';
import { Button, Paper, Text, Switch } from '@mantine/core';
import { useState } from 'react';

function ConditionalFullscreen() {
  const [allowFullscreen, setAllowFullscreen] = useState(true);
  const { ref, toggle, fullscreen } = useFullscreen();

  const handleToggle = async () => {
    if (!allowFullscreen) {
      alert('Fullscreen is disabled');
      return;
    }
    await toggle();
  };

  return (
    <div>
      <Switch
        label="Allow Fullscreen"
        checked={allowFullscreen}
        onChange={(event) => setAllowFullscreen(event.currentTarget.checked)}
        mb="md"
      />
      
      <Paper
        ref={ref}
        p="md"
        style={{
          height: fullscreen ? '100vh' : '300px',
          backgroundColor: fullscreen ? '#000' : '#f0f0f0',
          color: fullscreen ? '#fff' : '#000'
        }}
      >
        <Text>Content that can be fullscreened</Text>
      </Paper>
      
      <Button onClick={handleToggle} mt="md" disabled={!allowFullscreen}>
        {fullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
      </Button>
    </div>
  );
}
```

## Common Patterns

### Fullscreen with Keyboard Shortcuts

```tsx
import { useFullscreen } from '@mantine/hooks';
import { Button, Paper, Text } from '@mantine/core';
import { useEffect } from 'react';

function FullscreenWithShortcuts() {
  const { ref, toggle, fullscreen } = useFullscreen();

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === 'F11' || (event.key === 'f' && event.ctrlKey)) {
        event.preventDefault();
        toggle();
      }
      if (event.key === 'Escape' && fullscreen) {
        toggle();
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [toggle, fullscreen]);

  return (
    <div>
      <Paper
        ref={ref}
        p="md"
        style={{
          height: fullscreen ? '100vh' : '300px',
          backgroundColor: fullscreen ? '#000' : '#f0f0f0',
          color: fullscreen ? '#fff' : '#000'
        }}
      >
        <Text>Press F11 or Ctrl+F to toggle fullscreen</Text>
        <Text size="sm" color="dimmed">
          Press Escape to exit fullscreen
        </Text>
      </Paper>
      
      <Button onClick={toggle} mt="md">
        {fullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
      </Button>
    </div>
  );
}
```

### Fullscreen State Persistence

```tsx
import { useFullscreen } from '@mantine/hooks';
import { Button, Paper, Text } from '@mantine/core';
import { useEffect, useState } from 'react';

function PersistentFullscreen() {
  const { ref, toggle, fullscreen } = useFullscreen();
  const [lastFullscreenState, setLastFullscreenState] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('fullscreenState');
    if (saved === 'true' && !fullscreen) {
      toggle();
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('fullscreenState', fullscreen.toString());
    setLastFullscreenState(fullscreen);
  }, [fullscreen]);

  return (
    <div>
      <Paper
        ref={ref}
        p="md"
        style={{
          height: fullscreen ? '100vh' : '300px',
          backgroundColor: fullscreen ? '#000' : '#f0f0f0',
          color: fullscreen ? '#fff' : '#000'
        }}
      >
        <Text>Fullscreen state is persisted</Text>
        <Text size="sm" color="dimmed">
          Last state: {lastFullscreenState ? 'Fullscreen' : 'Normal'}
        </Text>
      </Paper>
      
      <Button onClick={toggle} mt="md">
        {fullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
      </Button>
    </div>
  );
}
```

## Integration with Other Hooks

### Combined with useDisclosure

```tsx
import { useFullscreen, useDisclosure } from '@mantine/hooks';
import { Button, Modal, Paper, Text } from '@mantine/core';

function FullscreenWithModal() {
  const [opened, { open, close }] = useDisclosure(false);
  const { ref, toggle, fullscreen } = useFullscreen();

  return (
    <div>
      <Button onClick={open}>
        Open Modal
      </Button>

      <Modal opened={opened} onClose={close} title="Fullscreen Modal">
        <div ref={ref}>
          <Text mb="md">This modal content can be fullscreened</Text>
          <Button onClick={toggle}>
            {fullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
          </Button>
        </div>
      </Modal>
    </div>
  );
}
```

### Combined with useElementSize

```tsx
import { useFullscreen, useElementSize } from '@mantine/hooks';
import { Button, Paper, Text } from '@mantine/core';

function FullscreenWithSize() {
  const { ref: fullscreenRef, toggle, fullscreen } = useFullscreen();
  const { ref: sizeRef, width, height } = useElementSize();

  const mergedRef = (el: HTMLDivElement | null) => {
    fullscreenRef(el);
    sizeRef(el);
  };

  return (
    <div>
      <Paper
        ref={mergedRef}
        p="md"
        style={{
          height: fullscreen ? '100vh' : '300px',
          backgroundColor: fullscreen ? '#000' : '#f0f0f0',
          color: fullscreen ? '#fff' : '#000'
        }}
      >
        <Text>Fullscreen: {fullscreen ? 'Yes' : 'No'}</Text>
        <Text size="sm">Size: {width} × {height}</Text>
      </Paper>
      
      <Button onClick={toggle} mt="md">
        {fullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
      </Button>
    </div>
  );
}
```

## Troubleshooting

### Common Issues

1. **Fullscreen Not Working**
   - Check if the Fullscreen API is supported
   - Ensure the action is triggered by user interaction
   - Verify browser permissions

2. **Element Not Fullscreening**
   - Make sure the ref is properly assigned
   - Check if the element is visible and mounted
   - Verify the element is not already in fullscreen

3. **Styling Issues**
   - Use proper CSS for fullscreen styling
   - Consider using `:fullscreen` CSS pseudo-class
   - Test with different screen sizes

### Debug Information

```tsx
import { useFullscreen } from '@mantine/hooks';
import { Button, Paper, Text, Stack } from '@mantine/core';

function DebugFullscreen() {
  const { ref, toggle, fullscreen } = useFullscreen();

  const debugInfo = {
    fullscreen,
    fullscreenElement: document.fullscreenElement,
    fullscreenEnabled: document.fullscreenEnabled,
    webkitFullscreenElement: (document as any).webkitFullscreenElement,
    mozFullScreenElement: (document as any).mozFullScreenElement,
    msFullscreenElement: (document as any).msFullscreenElement
  };

  return (
    <div>
      <Paper
        ref={ref}
        p="md"
        style={{
          height: fullscreen ? '100vh' : '300px',
          backgroundColor: fullscreen ? '#000' : '#f0f0f0',
          color: fullscreen ? '#fff' : '#000'
        }}
      >
        <Text>Debug Fullscreen</Text>
      </Paper>
      
      <Stack mt="md">
        <Button onClick={toggle}>
          {fullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
        </Button>
        
        <Paper p="sm" style={{ backgroundColor: '#f8f9fa' }}>
          <Text size="sm" weight="bold">Debug Info:</Text>
          <pre style={{ fontSize: '12px', margin: 0 }}>
            {JSON.stringify(debugInfo, null, 2)}
          </pre>
        </Paper>
      </Stack>
    </div>
  );
}
```

## Browser Support

- **Modern Browsers**: Full support with Fullscreen API
- **Legacy Browsers**: Limited support, requires vendor prefixes
- **Mobile Browsers**: Good support on modern mobile browsers
- **Server-Side**: Safe to use (no-op during SSR)

## Related Hooks

- `use-element-size` - For tracking element dimensions
- `use-viewport-size` - For viewport size tracking
- `use-media-query` - For responsive design
- `use-disclosure` - For modal/overlay state management

## Best Practices

1. **User Interaction**: Always trigger fullscreen from user interaction
2. **Error Handling**: Handle fullscreen API errors gracefully
3. **Accessibility**: Provide clear exit mechanisms
4. **Responsive Design**: Consider different screen sizes
5. **Performance**: Optimize content for fullscreen viewing

---

*The `use-fullscreen` hook provides a clean, React-friendly way to manage fullscreen functionality using the native Fullscreen API. It's perfect for creating immersive user experiences in media players, presentations, and interactive applications.*
