# use-scroll-into-view Hook

## Overview

The `use-scroll-into-view` hook provides a powerful way to scroll any element into view with smooth animations and customizable behavior. It handles scroll behavior for any scrollable element, automatically adjusts scrolling animation with respect to reduced-motion user preferences, and offers extensive customization options for duration, easing, alignment, and more.

## Installation

```bash
npm install @mantine/hooks
```

## Import

```typescript
import { useScrollIntoView } from '@mantine/hooks';
import type { UseScrollIntoViewOptions, UseScrollIntoViewReturnValue } from '@mantine/hooks';
```

## Basic Usage

```tsx
import { useScrollIntoView } from '@mantine/hooks';
import { Button, Text, Group, Box } from '@mantine/core';

function Demo() {
  const { scrollIntoView, targetRef } = useScrollIntoView<HTMLDivElement>({
    offset: 60,
  });

  return (
    <Group justify="center">
      <Button
        onClick={() =>
          scrollIntoView({
            alignment: 'center',
          })
        }
      >
        Scroll to target
      </Button>
      <Box
        style={{
          width: '100%',
          height: '50vh',
          backgroundColor: 'var(--mantine-color-blue-light)',
        }}
      />
      <Text ref={targetRef}>Hello there</Text>
    </Group>
  );
}
```

## API Reference

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `options` | `UseScrollIntoViewOptions` | **Optional.** Configuration options for scroll behavior |

### UseScrollIntoViewOptions

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `onScrollFinish` | `() => void` | `undefined` | Callback fired after scroll animation completes |
| `duration` | `number` | `1000` | Duration of scroll animation in milliseconds |
| `axis` | `'x' \| 'y'` | `'y'` | Axis of scroll (horizontal or vertical) |
| `easing` | `(t: number) => number` | `easeInOutQuad` | Custom mathematical easing function |
| `offset` | `number` | `0` | Additional distance between nearest edge and element |
| `cancelable` | `boolean` | `true` | Whether animation can be interrupted by user scrolling |
| `isList` | `boolean` | `false` | Prevents content jumping in scrolling lists with multiple targets |

### Return Value

| Property | Type | Description |
|----------|------|-------------|
| `scrollableRef` | `React.RefObject<Parent>` | Ref for the scrollable parent element |
| `targetRef` | `React.RefObject<Target>` | Ref for the target element to scroll to |
| `scrollIntoView` | `(params?: UseScrollIntoViewAnimation) => void` | Function to start scroll animation |
| `cancel` | `() => void` | Function to stop scroll animation |

### UseScrollIntoViewAnimation

| Property | Type | Description |
|----------|------|-------------|
| `alignment` | `'start' \| 'end' \| 'center'` | Target element alignment relative to parent |

### Type Definitions

```typescript
interface UseScrollIntoViewAnimation {
  alignment?: 'start' | 'end' | 'center';
}

interface UseScrollIntoViewOptions {
  onScrollFinish?: () => void;
  duration?: number;
  axis?: 'x' | 'y';
  easing?: (t: number) => number;
  offset?: number;
  cancelable?: boolean;
  isList?: boolean;
}

export interface UseScrollIntoViewReturnValue<
  Target extends HTMLElement = any,
  Parent extends HTMLElement | null = null,
> {
  scrollableRef: React.RefObject<Parent | null>;
  targetRef: React.RefObject<Target | null>;
  scrollIntoView: (params?: UseScrollIntoViewAnimation) => void;
  cancel: () => void;
}

function useScrollIntoView<
  Target extends HTMLElement = any,
  Parent extends HTMLElement | null = null
>(
  options?: UseScrollIntoViewOptions,
): UseScrollIntoViewReturnValue<Target, Parent>
```

## Key Features

### 1. **Smooth Animations**
- Customizable duration and easing
- Respects reduced-motion preferences
- Smooth scroll behavior

### 2. **Flexible Alignment**
- Start, center, or end alignment
- Configurable offset
- Axis-specific scrolling

### 3. **Accessibility Support**
- Respects user motion preferences
- Keyboard navigation friendly
- Screen reader compatible

### 4. **Advanced Control**
- Interruptible animations
- Custom easing functions
- List-specific optimizations

## Advanced Usage

### With Custom Easing

```tsx
import { useScrollIntoView } from '@mantine/hooks';
import { Button, Text, Group, Box, Paper } from '@mantine/core';

function CustomEasing() {
  const { scrollIntoView, targetRef } = useScrollIntoView<HTMLDivElement>({
    duration: 2000,
    easing: (t) => t < 0.5 ? 16 * t ** 5 : 1 - (-2 * t + 2) ** 5 / 2, // easeInOutQuint
  });

  return (
    <Group justify="center">
      <Button onClick={() => scrollIntoView({ alignment: 'center' })}>
        Scroll with Custom Easing
      </Button>
      <Box
        style={{
          width: '100%',
          height: '50vh',
          backgroundColor: 'var(--mantine-color-green-light)',
        }}
      />
      <Text ref={targetRef}>Smooth scroll with custom easing!</Text>
    </Group>
  );
}
```

### With Parent Container

```tsx
import { useScrollIntoView } from '@mantine/hooks';
import { Button, Text, Group, Paper, Box } from '@mantine/core';

function WithParentContainer() {
  const { scrollIntoView, targetRef, scrollableRef } = useScrollIntoView<
    HTMLDivElement,
    HTMLDivElement
  >({
    duration: 1000,
    offset: 20,
  });

  return (
    <Group justify="center">
      <Paper 
        ref={scrollableRef} 
        h={300} 
        style={{ 
          overflowY: 'scroll', 
          flex: 1,
          border: '2px solid #dee2e6',
          borderRadius: '8px'
        }}
      >
        <Box pt={260} pb={450}>
          <Paper
            ref={targetRef}
            p="xl"
            style={{
              backgroundColor: 'var(--mantine-color-blue-light)',
              width: '100%',
            }}
          >
            <Text>Scroll me into view within the container!</Text>
          </Paper>
        </Box>
      </Paper>
      <Button onClick={() => scrollIntoView({ alignment: 'center' })}>
        Scroll to Target
      </Button>
    </Group>
  );
}
```

### Horizontal Scrolling

```tsx
import { useScrollIntoView } from '@mantine/hooks';
import { Button, Text, Group, Paper, Box } from '@mantine/core';

function HorizontalScroll() {
  const { scrollIntoView, targetRef, scrollableRef } = useScrollIntoView<
    HTMLDivElement,
    HTMLDivElement
  >({ 
    axis: 'x',
    duration: 800,
  });

  return (
    <Group justify="center">
      <Paper 
        ref={scrollableRef} 
        h={150} 
        w={300} 
        style={{ 
          overflowX: 'scroll',
          border: '2px solid #dee2e6',
          borderRadius: '8px'
        }}
      >
        <Box pl={260} pr={450}>
          <Paper
            ref={targetRef}
            p="md"
            style={{
              backgroundColor: 'var(--mantine-color-orange-light)',
              width: 'max-content',
            }}
          >
            <Text>Scroll me horizontally into view!</Text>
          </Paper>
        </Box>
      </Paper>
      <Button onClick={() => scrollIntoView({ alignment: 'center' })}>
        Scroll Horizontally
      </Button>
    </Group>
  );
}
```

## Use Cases

### 1. **Table of Contents Navigation**

```tsx
import { useScrollIntoView } from '@mantine/hooks';
import { Button, Text, Box, Paper, Group, Stack } from '@mantine/core';

function TableOfContents() {
  const sections = [
    { id: 'intro', title: 'Introduction' },
    { id: 'features', title: 'Features' },
    { id: 'installation', title: 'Installation' },
    { id: 'usage', title: 'Usage' },
    { id: 'api', title: 'API Reference' },
    { id: 'examples', title: 'Examples' },
  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <Box>
      <Text size="lg" mb="md">Table of Contents</Text>
      
      <Group align="flex-start">
        <Paper p="md" style={{ minWidth: '200px' }}>
          <Text weight="bold" mb="md">Contents</Text>
          <Stack gap="xs">
            {sections.map((section) => (
              <Button
                key={section.id}
                variant="subtle"
                size="sm"
                onClick={() => scrollToSection(section.id)}
                fullWidth
                justify="flex-start"
              >
                {section.title}
              </Button>
            ))}
          </Stack>
        </Paper>

        <Box style={{ flex: 1 }}>
          {sections.map((section) => (
            <Paper
              key={section.id}
              id={section.id}
              p="xl"
              mb="md"
              style={{
                minHeight: '300px',
                backgroundColor: 'var(--mantine-color-gray-light)',
              }}
            >
              <Text size="xl" weight="bold" mb="md">{section.title}</Text>
              <Text>
                This is the content for the {section.title.toLowerCase()} section.
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </Text>
            </Paper>
          ))}
        </Box>
      </Group>
    </Box>
  );
}
```

### 2. **Image Gallery with Scroll-to-View**

```tsx
import { useScrollIntoView } from '@mantine/hooks';
import { Button, Text, Box, Paper, Group, Image, Grid } from '@mantine/core';
import { useState } from 'react';

function ImageGallery() {
  const [selectedImage, setSelectedImage] = useState(0);
  
  const { scrollIntoView, targetRef } = useScrollIntoView<HTMLDivElement>({
    duration: 500,
    offset: 20,
  });

  const images = [
    'https://picsum.photos/400/300?random=1',
    'https://picsum.photos/400/300?random=2',
    'https://picsum.photos/400/300?random=3',
    'https://picsum.photos/400/300?random=4',
    'https://picsum.photos/400/300?random=5',
    'https://picsum.photos/400/300?random=6',
  ];

  const scrollToImage = (index: number) => {
    setSelectedImage(index);
    setTimeout(() => {
      scrollIntoView({ alignment: 'center' });
    }, 100);
  };

  return (
    <Box>
      <Text size="lg" mb="md">Image Gallery</Text>
      
      <Group mb="md">
        {images.map((_, index) => (
          <Button
            key={index}
            variant={selectedImage === index ? 'filled' : 'outline'}
            size="sm"
            onClick={() => scrollToImage(index)}
          >
            {index + 1}
          </Button>
        ))}
      </Group>

      <Paper
        p="md"
        style={{
          height: '400px',
          overflowY: 'auto',
          border: '1px solid #dee2e6',
          borderRadius: '8px'
        }}
      >
        <Grid>
          {images.map((src, index) => (
            <Grid.Col key={index} span={6}>
              <Paper
                ref={selectedImage === index ? targetRef : null}
                p="sm"
                style={{
                  border: selectedImage === index ? '3px solid #007bff' : '1px solid #dee2e6',
                  borderRadius: '8px',
                  cursor: 'pointer'
                }}
                onClick={() => setSelectedImage(index)}
              >
                <Image
                  src={src}
                  alt={`Gallery image ${index + 1}`}
                  radius="md"
                />
                <Text ta="center" mt="xs" size="sm">
                  Image {index + 1}
                </Text>
              </Paper>
            </Grid.Col>
          ))}
        </Grid>
      </Paper>
    </Box>
  );
}
```

### 3. **Form Validation with Scroll to Error**

```tsx
import { useScrollIntoView } from '@mantine/hooks';
import { Button, Text, Box, Paper, TextInput, Stack, Alert } from '@mantine/core';
import { useState } from 'react';

function FormWithScrollToError() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { scrollIntoView, targetRef } = useScrollIntoView<HTMLDivElement>({
    duration: 300,
    offset: 50,
  });

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.phone.trim()) newErrors.phone = 'Phone is required';
    if (!formData.message.trim()) newErrors.message = 'Message is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    setIsSubmitting(true);
    
    if (!validateForm()) {
      // Scroll to first error
      setTimeout(() => {
        const firstErrorField = document.querySelector('[data-error="true"]');
        if (firstErrorField) {
          firstErrorField.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 100);
      setIsSubmitting(false);
      return;
    }

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setFormData({ name: '', email: '', phone: '', message: '' });
      setErrors({});
    }, 1000);
  };

  return (
    <Box>
      <Text size="lg" mb="md">Form with Scroll to Error</Text>
      
      <Paper p="md" style={{ maxWidth: '500px' }}>
        <Stack>
          <TextInput
            label="Name"
            value={formData.name}
            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
            error={errors.name}
            data-error={!!errors.name}
          />
          
          <TextInput
            label="Email"
            value={formData.email}
            onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
            error={errors.email}
            data-error={!!errors.email}
          />
          
          <TextInput
            label="Phone"
            value={formData.phone}
            onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
            error={errors.phone}
            data-error={!!errors.phone}
          />
          
          <TextInput
            label="Message"
            value={formData.message}
            onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
            error={errors.message}
            data-error={!!errors.message}
          />

          {Object.keys(errors).length > 0 && (
            <Alert color="red" ref={targetRef}>
              Please fix the errors above
            </Alert>
          )}

          <Button 
            onClick={handleSubmit} 
            loading={isSubmitting}
            fullWidth
          >
            Submit Form
          </Button>
        </Stack>
      </Paper>
    </Box>
  );
}
```

### 4. **Chat Interface with Auto-Scroll**

```tsx
import { useScrollIntoView } from '@mantine/hooks';
import { Button, Text, Box, Paper, TextInput, Group, Stack } from '@mantine/core';
import { useState, useEffect, useRef } from 'react';

function ChatInterface() {
  const [messages, setMessages] = useState([
    { id: 1, text: 'Hello! How can I help you?', sender: 'bot' },
    { id: 2, text: 'I have a question about the product', sender: 'user' },
  ]);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { scrollIntoView, targetRef } = useScrollIntoView<HTMLDivElement>({
    duration: 300,
    alignment: 'end',
  });

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = () => {
    if (newMessage.trim()) {
      const newMsg = {
        id: messages.length + 1,
        text: newMessage,
        sender: 'user' as const
      };
      setMessages(prev => [...prev, newMsg]);
      setNewMessage('');
    }
  };

  const addBotMessage = () => {
    const botMsg = {
      id: messages.length + 1,
      text: 'This is a bot response!',
      sender: 'bot' as const
    };
    setMessages(prev => [...prev, botMsg]);
  };

  return (
    <Box>
      <Text size="lg" mb="md">Chat Interface</Text>
      
      <Paper
        p="md"
        style={{
          height: '400px',
          display: 'flex',
          flexDirection: 'column',
          border: '1px solid #dee2e6',
          borderRadius: '8px'
        }}
      >
        <Box
          style={{
            flex: 1,
            overflowY: 'auto',
            marginBottom: '16px'
          }}
        >
          <Stack gap="sm">
            {messages.map((message) => (
              <Paper
                key={message.id}
                p="sm"
                style={{
                  backgroundColor: message.sender === 'user' 
                    ? '#e3f2fd' 
                    : '#f5f5f5',
                  alignSelf: message.sender === 'user' 
                    ? 'flex-end' 
                    : 'flex-start',
                  maxWidth: '80%'
                }}
              >
                <Text size="sm">{message.text}</Text>
              </Paper>
            ))}
            <div ref={messagesEndRef} />
          </Stack>
        </Box>

        <Group>
          <TextInput
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message..."
            style={{ flex: 1 }}
            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
          />
          <Button onClick={sendMessage}>Send</Button>
          <Button variant="outline" onClick={addBotMessage}>
            Add Bot Message
          </Button>
        </Group>
      </Paper>
    </Box>
  );
}
```

### 5. **Accordion with Scroll to Section**

```tsx
import { useScrollIntoView } from '@mantine/hooks';
import { Button, Text, Box, Paper, Accordion, Group } from '@mantine/core';
import { useState } from 'react';

function AccordionWithScroll() {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  
  const { scrollIntoView, targetRef } = useScrollIntoView<HTMLDivElement>({
    duration: 400,
    offset: 20,
  });

  const sections = [
    { id: 'section1', title: 'Getting Started', content: 'Learn the basics of our platform...' },
    { id: 'section2', title: 'Advanced Features', content: 'Explore advanced functionality...' },
    { id: 'section3', title: 'API Reference', content: 'Complete API documentation...' },
    { id: 'section4', title: 'Examples', content: 'Real-world examples and tutorials...' },
  ];

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    setTimeout(() => {
      scrollIntoView({ alignment: 'start' });
    }, 100);
  };

  return (
    <Box>
      <Text size="lg" mb="md">Accordion with Scroll to Section</Text>
      
      <Group mb="md">
        {sections.map((section) => (
          <Button
            key={section.id}
            variant={activeSection === section.id ? 'filled' : 'outline'}
            size="sm"
            onClick={() => scrollToSection(section.id)}
          >
            {section.title}
          </Button>
        ))}
      </Group>

      <Paper p="md" style={{ border: '1px solid #dee2e6', borderRadius: '8px' }}>
        <Accordion
          value={activeSection}
          onChange={setActiveSection}
        >
          {sections.map((section) => (
            <Accordion.Item key={section.id} value={section.id}>
              <Accordion.Control>
                <Text weight="bold">{section.title}</Text>
              </Accordion.Control>
              <Accordion.Panel>
                <div ref={activeSection === section.id ? targetRef : null}>
                  <Text>{section.content}</Text>
                  <Text size="sm" color="dimmed" mt="md">
                    This is detailed content for the {section.title.toLowerCase()} section.
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  </Text>
                </div>
              </Accordion.Panel>
            </Accordion.Item>
          ))}
        </Accordion>
      </Paper>
    </Box>
  );
}
```

### 6. **Progress Indicator with Scroll to Step**

```tsx
import { useScrollIntoView } from '@mantine/hooks';
import { Button, Text, Box, Paper, Stepper, Group, Stack } from '@mantine/core';
import { useState } from 'react';

function ProgressIndicator() {
  const [activeStep, setActiveStep] = useState(0);
  
  const { scrollIntoView, targetRef } = useScrollIntoView<HTMLDivElement>({
    duration: 500,
    offset: 30,
  });

  const steps = [
    { title: 'Step 1', description: 'Initial Setup', content: 'Configure your project settings...' },
    { title: 'Step 2', description: 'Installation', content: 'Install required dependencies...' },
    { title: 'Step 3', description: 'Configuration', content: 'Configure your application...' },
    { title: 'Step 4', description: 'Testing', content: 'Test your implementation...' },
  ];

  const scrollToStep = (stepIndex: number) => {
    setActiveStep(stepIndex);
    setTimeout(() => {
      scrollIntoView({ alignment: 'center' });
    }, 100);
  };

  const nextStep = () => {
    if (activeStep < steps.length - 1) {
      scrollToStep(activeStep + 1);
    }
  };

  const prevStep = () => {
    if (activeStep > 0) {
      scrollToStep(activeStep - 1);
    }
  };

  return (
    <Box>
      <Text size="lg" mb="md">Progress Indicator with Scroll to Step</Text>
      
      <Paper p="md" style={{ border: '1px solid #dee2e6', borderRadius: '8px' }}>
        <Stepper active={activeStep} onStepClick={scrollToStep} mb="md">
          {steps.map((step, index) => (
            <Stepper.Step
              key={index}
              label={step.title}
              description={step.description}
            />
          ))}
        </Stepper>

        <Box
          ref={activeStep === 0 ? targetRef : null}
          style={{ minHeight: '200px' }}
        >
          <Text size="xl" weight="bold" mb="md">
            {steps[activeStep].title}
          </Text>
          <Text mb="md">{steps[activeStep].content}</Text>
          <Text size="sm" color="dimmed">
            This is detailed content for step {activeStep + 1}. 
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </Text>
        </Box>

        <Group justify="space-between" mt="md">
          <Button
            variant="outline"
            onClick={prevStep}
            disabled={activeStep === 0}
          >
            Previous
          </Button>
          <Button
            onClick={nextStep}
            disabled={activeStep === steps.length - 1}
          >
            Next
          </Button>
        </Group>
      </Paper>
    </Box>
  );
}
```

## Performance Considerations

### Memoized Scroll Handler

```tsx
import { useScrollIntoView } from '@mantine/hooks';
import { memo, useCallback } from 'react';
import { Button, Text, Box, Paper } from '@mantine/core';

const ScrollableComponent = memo(function ScrollableComponent({ 
  onScrollFinish 
}: { 
  onScrollFinish: () => void; 
}) {
  const { scrollIntoView, targetRef } = useScrollIntoView({
    duration: 500,
    onScrollFinish,
  });

  return (
    <Box>
      <Button onClick={() => scrollIntoView({ alignment: 'center' })}>
        Scroll to Target
      </Button>
      <Paper
        ref={targetRef}
        p="md"
        style={{
          height: '200px',
          backgroundColor: '#f0f0f0',
          marginTop: '50vh'
        }}
      >
        <Text>Target element</Text>
      </Paper>
    </Box>
  );
});

function OptimizedScrollIntoView() {
  const handleScrollFinish = useCallback(() => {
    console.log('Scroll animation finished');
  }, []);

  return (
    <div>
      <ScrollableComponent onScrollFinish={handleScrollFinish} />
    </div>
  );
}
```

### Conditional Scroll Behavior

```tsx
import { useScrollIntoView } from '@mantine/hooks';
import { Button, Text, Box, Paper, Switch } from '@mantine/core';
import { useState } from 'react';

function ConditionalScroll() {
  const [enabled, setEnabled] = useState(true);
  
  const { scrollIntoView, targetRef } = useScrollIntoView({
    duration: enabled ? 1000 : 0,
    easing: enabled ? undefined : (t) => t, // Linear for instant scroll
  });

  return (
    <Box>
      <Switch
        label="Enable smooth scrolling"
        checked={enabled}
        onChange={(event) => setEnabled(event.currentTarget.checked)}
        mb="md"
      />
      
      <Button onClick={() => scrollIntoView({ alignment: 'center' })}>
        {enabled ? 'Smooth Scroll' : 'Instant Scroll'}
      </Button>
      
      <Paper
        ref={targetRef}
        p="md"
        style={{
          height: '200px',
          backgroundColor: enabled ? '#e8f5e8' : '#f5f5f5',
          marginTop: '50vh'
        }}
      >
        <Text>Target element</Text>
      </Paper>
    </Box>
  );
}
```

## Common Patterns

### Scroll with State Management

```tsx
import { useScrollIntoView } from '@mantine/hooks';
import { Button, Text, Box, Paper } from '@mantine/core';
import { useState, useEffect } from 'react';

function ScrollWithState() {
  const [scrollCount, setScrollCount] = useState(0);
  
  const { scrollIntoView, targetRef } = useScrollIntoView({
    duration: 500,
    onScrollFinish: () => setScrollCount(prev => prev + 1),
  });

  return (
    <Box>
      <Button onClick={() => scrollIntoView({ alignment: 'center' })}>
        Scroll to Target
      </Button>
      
      <Text mt="md">Scroll count: {scrollCount}</Text>
      
      <Paper
        ref={targetRef}
        p="md"
        style={{
          height: '200px',
          backgroundColor: '#f0f0f0',
          marginTop: '50vh'
        }}
      >
        <Text>Target element</Text>
      </Paper>
    </Box>
  );
}
```

### Scroll with Animation

```tsx
import { useScrollIntoView } from '@mantine/hooks';
import { Button, Text, Box, Paper } from '@mantine/core';
import { useState } from 'react';

function ScrollWithAnimation() {
  const [isScrolling, setIsScrolling] = useState(false);
  
  const { scrollIntoView, targetRef } = useScrollIntoView({
    duration: 1000,
    onScrollFinish: () => setIsScrolling(false),
  });

  const handleScroll = () => {
    setIsScrolling(true);
    scrollIntoView({ alignment: 'center' });
  };

  return (
    <Box>
      <Button onClick={handleScroll} loading={isScrolling}>
        {isScrolling ? 'Scrolling...' : 'Scroll to Target'}
      </Button>
      
      <Paper
        ref={targetRef}
        p="md"
        style={{
          height: '200px',
          backgroundColor: isScrolling ? '#e3f2fd' : '#f0f0f0',
          marginTop: '50vh',
          transition: 'background-color 0.3s ease'
        }}
      >
        <Text>Target element</Text>
      </Paper>
    </Box>
  );
}
```

## Integration with Other Hooks

### Combined with useDisclosure

```tsx
import { useScrollIntoView, useDisclosure } from '@mantine/hooks';
import { Modal, Button, Text, Box, Paper } from '@mantine/core';

function ScrollWithModal() {
  const { scrollIntoView, targetRef } = useScrollIntoView({
    duration: 500,
  });
  const [opened, { open, close }] = useDisclosure();

  return (
    <Box>
      <Button onClick={open}>Open Modal</Button>
      
      <Paper
        ref={targetRef}
        p="md"
        style={{
          height: '200px',
          backgroundColor: '#f0f0f0',
          marginTop: '50vh'
        }}
      >
        <Text>Target element</Text>
      </Paper>

      <Modal
        opened={opened}
        onClose={close}
        title="Scroll to Target"
      >
        <Button onClick={() => scrollIntoView({ alignment: 'center' })}>
          Scroll to Target
        </Button>
      </Modal>
    </Box>
  );
}
```

### Combined with useLocalStorage

```tsx
import { useScrollIntoView, useLocalStorage } from '@mantine/hooks';
import { Button, Text, Box, Paper } from '@mantine/core';

function ScrollWithStorage() {
  const { scrollIntoView, targetRef } = useScrollIntoView({
    duration: 500,
  });
  const [scrollHistory, setScrollHistory] = useLocalStorage({
    key: 'scroll-history',
    defaultValue: [] as number[]
  });

  const handleScroll = () => {
    scrollIntoView({ alignment: 'center' });
    setScrollHistory(prev => [...prev, Date.now()]);
  };

  return (
    <Box>
      <Button onClick={handleScroll}>Scroll to Target</Button>
      
      <Text mt="md">Scroll history: {scrollHistory.length} scrolls</Text>
      
      <Paper
        ref={targetRef}
        p="md"
        style={{
          height: '200px',
          backgroundColor: '#f0f0f0',
          marginTop: '50vh'
        }}
      >
        <Text>Target element</Text>
      </Paper>
    </Box>
  );
}
```

## Troubleshooting

### Common Issues

1. **Scroll Not Working**
   - Check if the target ref is properly attached
   - Ensure the scrollable container is set up correctly
   - Verify the element is visible

2. **Performance Issues**
   - Use appropriate duration values
   - Consider debouncing if needed
   - Avoid unnecessary re-renders

3. **Accessibility Issues**
   - Ensure scroll doesn't break keyboard navigation
   - Test with screen readers
   - Respect reduced motion preferences

### Debug Information

```tsx
import { useScrollIntoView } from '@mantine/hooks';
import { Button, Text, Box, Paper } from '@mantine/core';

function DebugScrollIntoView() {
  const { scrollIntoView, targetRef, cancel } = useScrollIntoView({
    duration: 1000,
    onScrollFinish: () => console.log('Scroll finished'),
  });

  return (
    <Box>
      <Button onClick={() => scrollIntoView({ alignment: 'center' })}>
        Scroll to Target
      </Button>
      <Button onClick={cancel} variant="outline" ml="md">
        Cancel Scroll
      </Button>
      
      <Paper
        ref={targetRef}
        p="md"
        style={{
          height: '200px',
          backgroundColor: '#f0f0f0',
          marginTop: '50vh'
        }}
      >
        <Text>Target element</Text>
      </Paper>
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

- `use-intersection` - For viewport intersection detection
- `use-in-viewport` - For viewport visibility
- `use-reduced-motion` - For motion preference detection
- `use-media-query` - For responsive behavior

## Best Practices

1. **Accessibility**: Respect reduced motion preferences
2. **Performance**: Use appropriate duration and easing
3. **User Experience**: Provide visual feedback during scroll
4. **Testing**: Test with different scroll containers
5. **Fallbacks**: Provide fallbacks for unsupported browsers

---

*The `use-scroll-into-view` hook provides a powerful, accessible way to scroll elements into view with smooth animations in React applications. It's perfect for navigation, form validation, chat interfaces, and any scenario where you need to programmatically scroll to specific elements with excellent performance and full accessibility support.*
