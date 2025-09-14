# use-file-dialog Hook

## Overview

The `use-file-dialog` hook allows you to capture one or more files from the user without using a traditional file input element. It provides a programmatic way to open the native file dialog and handle file selection, making it perfect for custom file upload interfaces and drag-and-drop implementations.

## Installation

```bash
npm install @mantine/hooks
```

## Import

```typescript
import { useFileDialog } from '@mantine/hooks';
import type { UseFileDialogOptions, UseFileDialogReturnValue } from '@mantine/hooks';
```

## Basic Usage

```tsx
import { Button, Group, List } from '@mantine/core';
import { useFileDialog } from '@mantine/hooks';

function Demo() {
  const fileDialog = useFileDialog();

  const pickedFiles = Array.from(fileDialog.files || []).map((file) => (
    <List.Item key={file.name}>{file.name}</List.Item>
  ));

  return (
    <div>
      <Group>
        <Button onClick={fileDialog.open}>Pick files</Button>
        {pickedFiles.length > 0 && (
          <Button variant="default" onClick={fileDialog.reset}>
            Reset
          </Button>
        )}
      </Group>
      {pickedFiles.length > 0 && <List mt="lg">{pickedFiles}</List>}
    </div>
  );
}
```

## API Reference

### Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `options` | `UseFileDialogOptions` | `{}` | **Optional.** Configuration options for the file dialog |

### UseFileDialogOptions

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `multiple` | `boolean` | `true` | Whether multiple files are allowed |
| `accept` | `string` | `'*'` | File types to accept (e.g., 'image/*', '.pdf') |
| `capture` | `string` | `undefined` | Capture attribute for mobile devices |
| `directory` | `boolean` | `false` | Whether user can pick a directory instead of files |
| `resetOnOpen` | `boolean` | `false` | Reset file input state when dialog opens |
| `initialFiles` | `FileList \| File[]` | `undefined` | Initial selected files |
| `onChange` | `(files: FileList \| null) => void` | `undefined` | Called when files are selected |
| `onCancel` | `() => void` | `undefined` | Called when file dialog is canceled |

### Return Value

| Property | Type | Description |
|----------|------|-------------|
| `files` | `FileList \| null` | Currently selected files |
| `open` | `() => void` | Function to open the file dialog |
| `reset` | `() => void` | Function to reset selected files |

### Type Definitions

```typescript
interface UseFileDialogOptions {
  multiple?: boolean;
  accept?: string;
  capture?: string;
  directory?: boolean;
  resetOnOpen?: boolean;
  initialFiles?: FileList | File[];
  onChange?: (files: FileList | null) => void;
  onCancel?: () => void;
}

interface UseFileDialogReturnValue {
  files: FileList | null;
  open: () => void;
  reset: () => void;
}

function useFileDialog(options?: UseFileDialogOptions): UseFileDialogReturnValue;
```

## Advanced Usage

### Single File Selection

```tsx
import { useFileDialog } from '@mantine/hooks';
import { Button, Text, Paper } from '@mantine/core';

function SingleFileUpload() {
  const fileDialog = useFileDialog({
    multiple: false,
    accept: 'image/*',
    onChange: (files) => {
      if (files && files.length > 0) {
        console.log('Selected file:', files[0]);
      }
    }
  });

  return (
    <Paper p="md">
      <Button onClick={fileDialog.open}>Select Image</Button>
      {fileDialog.files && fileDialog.files.length > 0 && (
        <Text mt="sm">Selected: {fileDialog.files[0].name}</Text>
      )}
    </Paper>
  );
}
```

### Multiple File Selection with Validation

```tsx
import { useFileDialog } from '@mantine/hooks';
import { Button, Group, Text, Alert } from '@mantine/core';

function MultipleFileUpload() {
  const fileDialog = useFileDialog({
    multiple: true,
    accept: '.pdf,.doc,.docx',
    onChange: (files) => {
      if (files) {
        const fileArray = Array.from(files);
        const validFiles = fileArray.filter(file => 
          file.size <= 5 * 1024 * 1024 // 5MB limit
        );
        
        if (validFiles.length !== fileArray.length) {
          alert('Some files exceed 5MB limit');
        }
      }
    }
  });

  const fileCount = fileDialog.files ? fileDialog.files.length : 0;

  return (
    <div>
      <Group>
        <Button onClick={fileDialog.open}>
          Select Documents ({fileCount})
        </Button>
        {fileCount > 0 && (
          <Button variant="outline" onClick={fileDialog.reset}>
            Clear
          </Button>
        )}
      </Group>
      
      {fileCount > 0 && (
        <Alert mt="md" color="blue">
          {fileCount} file(s) selected
        </Alert>
      )}
    </div>
  );
}
```

### Directory Selection

```tsx
import { useFileDialog } from '@mantine/hooks';
import { Button, Text, List } from '@mantine/core';

function DirectoryUpload() {
  const fileDialog = useFileDialog({
    directory: true,
    multiple: true,
    onChange: (files) => {
      if (files) {
        console.log('Selected directory files:', Array.from(files));
      }
    }
  });

  const files = fileDialog.files ? Array.from(fileDialog.files) : [];

  return (
    <div>
      <Button onClick={fileDialog.open}>Select Directory</Button>
      
      {files.length > 0 && (
        <div>
          <Text mt="md" weight="bold">Directory Contents:</Text>
          <List mt="sm">
            {files.map((file, index) => (
              <List.Item key={index}>
                {file.webkitRelativePath || file.name}
              </List.Item>
            ))}
          </List>
        </div>
      )}
    </div>
  );
}
```

## Use Cases

### 1. **Image Upload with Preview**

```tsx
import { useFileDialog } from '@mantine/hooks';
import { Button, Group, Image, Text } from '@mantine/core';
import { useState } from 'react';

function ImageUploadWithPreview() {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  
  const fileDialog = useFileDialog({
    multiple: false,
    accept: 'image/*',
    onChange: (files) => {
      if (files && files.length > 0) {
        const file = files[0];
        const url = URL.createObjectURL(file);
        setPreviewUrl(url);
      }
    }
  });

  const handleReset = () => {
    fileDialog.reset();
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
      setPreviewUrl(null);
    }
  };

  return (
    <div>
      <Group>
        <Button onClick={fileDialog.open}>Select Image</Button>
        {previewUrl && (
          <Button variant="outline" onClick={handleReset}>
            Remove
          </Button>
        )}
      </Group>
      
      {previewUrl && (
        <div style={{ marginTop: '16px' }}>
          <Image
            src={previewUrl}
            alt="Preview"
            width={200}
            height={200}
            fit="cover"
          />
        </div>
      )}
    </div>
  );
}
```

### 2. **File Upload with Progress**

```tsx
import { useFileDialog } from '@mantine/hooks';
import { Button, Progress, Text, Group } from '@mantine/core';
import { useState } from 'react';

function FileUploadWithProgress() {
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  
  const fileDialog = useFileDialog({
    multiple: true,
    accept: '*/*',
    onChange: async (files) => {
      if (files) {
        setIsUploading(true);
        setUploadProgress(0);
        
        // Simulate upload progress
        for (let i = 0; i <= 100; i += 10) {
          await new Promise(resolve => setTimeout(resolve, 100));
          setUploadProgress(i);
        }
        
        setIsUploading(false);
        console.log('Upload complete:', Array.from(files));
      }
    }
  });

  return (
    <div>
      <Group>
        <Button 
          onClick={fileDialog.open} 
          disabled={isUploading}
        >
          {isUploading ? 'Uploading...' : 'Upload Files'}
        </Button>
        <Button 
          variant="outline" 
          onClick={fileDialog.reset}
          disabled={isUploading}
        >
          Reset
        </Button>
      </Group>
      
      {isUploading && (
        <div style={{ marginTop: '16px' }}>
          <Text size="sm" mb="xs">Uploading files...</Text>
          <Progress value={uploadProgress} />
        </div>
      )}
    </div>
  );
}
```

### 3. **Drag and Drop with File Dialog**

```tsx
import { useFileDialog } from '@mantine/hooks';
import { Paper, Text, Group, Button } from '@mantine/core';
import { useState, useCallback } from 'react';

function DragAndDropUpload() {
  const [isDragOver, setIsDragOver] = useState(false);
  const [droppedFiles, setDroppedFiles] = useState<FileList | null>(null);
  
  const fileDialog = useFileDialog({
    multiple: true,
    onChange: (files) => {
      setDroppedFiles(files);
    }
  });

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      setDroppedFiles(files);
    }
  }, []);

  const files = droppedFiles || fileDialog.files;
  const fileCount = files ? files.length : 0;

  return (
    <div>
      <Paper
        p="xl"
        style={{
          border: '2px dashed',
          borderColor: isDragOver ? '#339af0' : '#dee2e6',
          backgroundColor: isDragOver ? '#f8f9fa' : 'transparent',
          cursor: 'pointer'
        }}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={fileDialog.open}
      >
        <Text align="center" size="lg">
          {isDragOver ? 'Drop files here' : 'Drag files here or click to select'}
        </Text>
      </Paper>
      
      {fileCount > 0 && (
        <Group mt="md">
          <Text>Selected {fileCount} file(s)</Text>
          <Button variant="outline" onClick={() => {
            fileDialog.reset();
            setDroppedFiles(null);
          }}>
            Clear
          </Button>
        </Group>
      )}
    </div>
  );
}
```

### 4. **File Type Validation**

```tsx
import { useFileDialog } from '@mantine/hooks';
import { Button, Alert, Text, Group } from '@mantine/core';
import { useState } from 'react';

function FileValidation() {
  const [error, setError] = useState<string | null>(null);
  
  const fileDialog = useFileDialog({
    multiple: true,
    accept: '.pdf,.doc,.docx,.txt',
    onChange: (files) => {
      if (files) {
        const fileArray = Array.from(files);
        const invalidFiles = fileArray.filter(file => {
          const extension = file.name.split('.').pop()?.toLowerCase();
          return !['pdf', 'doc', 'docx', 'txt'].includes(extension || '');
        });
        
        if (invalidFiles.length > 0) {
          setError(`Invalid file types: ${invalidFiles.map(f => f.name).join(', ')}`);
        } else {
          setError(null);
          console.log('Valid files:', fileArray);
        }
      }
    }
  });

  return (
    <div>
      <Group>
        <Button onClick={fileDialog.open}>Select Documents</Button>
        <Button variant="outline" onClick={fileDialog.reset}>Reset</Button>
      </Group>
      
      {error && (
        <Alert mt="md" color="red">
          {error}
        </Alert>
      )}
      
      {fileDialog.files && !error && (
        <Text mt="md" color="green">
          {fileDialog.files.length} valid file(s) selected
        </Text>
      )}
    </div>
  );
}
```

### 5. **File Size Validation**

```tsx
import { useFileDialog } from '@mantine/hooks';
import { Button, Text, Group, Alert } from '@mantine/core';
import { useState } from 'react';

function FileSizeValidation() {
  const [validationResult, setValidationResult] = useState<string | null>(null);
  
  const fileDialog = useFileDialog({
    multiple: true,
    onChange: (files) => {
      if (files) {
        const fileArray = Array.from(files);
        const maxSize = 10 * 1024 * 1024; // 10MB
        const oversizedFiles = fileArray.filter(file => file.size > maxSize);
        
        if (oversizedFiles.length > 0) {
          setValidationResult(
            `Files too large: ${oversizedFiles.map(f => f.name).join(', ')}`
          );
        } else {
          setValidationResult(`All files are within size limit (${fileArray.length} files)`);
        }
      }
    }
  });

  return (
    <div>
      <Group>
        <Button onClick={fileDialog.open}>Select Files (Max 10MB each)</Button>
        <Button variant="outline" onClick={fileDialog.reset}>Reset</Button>
      </Group>
      
      {validationResult && (
        <Alert 
          mt="md" 
          color={validationResult.includes('too large') ? 'red' : 'green'}
        >
          {validationResult}
        </Alert>
      )}
    </div>
  );
}
```

## Performance Considerations

### File Processing

```tsx
import { useFileDialog } from '@mantine/hooks';
import { useCallback } from 'react';

function OptimizedFileProcessing() {
  const processFiles = useCallback(async (files: FileList) => {
    const fileArray = Array.from(files);
    
    // Process files in batches to avoid blocking
    const batchSize = 5;
    for (let i = 0; i < fileArray.length; i += batchSize) {
      const batch = fileArray.slice(i, i + batchSize);
      await Promise.all(batch.map(file => processFile(file)));
    }
  }, []);

  const fileDialog = useFileDialog({
    multiple: true,
    onChange: (files) => {
      if (files) {
        processFiles(files);
      }
    }
  });

  return <Button onClick={fileDialog.open}>Process Files</Button>;
}
```

### Memory Management

```tsx
import { useFileDialog } from '@mantine/hooks';
import { useEffect, useState } from 'react';

function MemoryManagedUpload() {
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  
  const fileDialog = useFileDialog({
    multiple: true,
    accept: 'image/*',
    onChange: (files) => {
      if (files) {
        // Clean up previous URLs
        previewUrls.forEach(url => URL.revokeObjectURL(url));
        
        // Create new URLs
        const newUrls = Array.from(files).map(file => URL.createObjectURL(file));
        setPreviewUrls(newUrls);
      }
    }
  });

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      previewUrls.forEach(url => URL.revokeObjectURL(url));
    };
  }, [previewUrls]);

  return <Button onClick={fileDialog.open}>Select Images</Button>;
}
```

## Common Patterns

### File Upload State Management

```tsx
import { useFileDialog } from '@mantine/hooks';
import { useState } from 'react';

function FileUploadState() {
  const [uploadState, setUploadState] = useState<'idle' | 'uploading' | 'success' | 'error'>('idle');
  
  const fileDialog = useFileDialog({
    onChange: async (files) => {
      if (files) {
        setUploadState('uploading');
        try {
          // Simulate upload
          await new Promise(resolve => setTimeout(resolve, 2000));
          setUploadState('success');
        } catch (error) {
          setUploadState('error');
        }
      }
    }
  });

  return (
    <div>
      <Button 
        onClick={fileDialog.open}
        loading={uploadState === 'uploading'}
        color={uploadState === 'success' ? 'green' : undefined}
      >
        {uploadState === 'success' ? 'Upload Complete' : 'Upload Files'}
      </Button>
    </div>
  );
}
```

### File Metadata Display

```tsx
import { useFileDialog } from '@mantine/hooks';
import { Table, Text } from '@mantine/core';

function FileMetadata() {
  const fileDialog = useFileDialog({
    multiple: true,
    onChange: (files) => {
      console.log('Files selected:', files);
    }
  });

  const files = fileDialog.files ? Array.from(fileDialog.files) : [];

  return (
    <div>
      <Button onClick={fileDialog.open}>Select Files</Button>
      
      {files.length > 0 && (
        <Table mt="md">
          <thead>
            <tr>
              <th>Name</th>
              <th>Size</th>
              <th>Type</th>
              <th>Last Modified</th>
            </tr>
          </thead>
          <tbody>
            {files.map((file, index) => (
              <tr key={index}>
                <td>{file.name}</td>
                <td>{(file.size / 1024).toFixed(2)} KB</td>
                <td>{file.type}</td>
                <td>{new Date(file.lastModified).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
}
```

## Troubleshooting

### Common Issues

1. **File Dialog Not Opening**
   - Ensure the hook is called within a user interaction (click, touch)
   - Check browser security policies
   - Verify the hook is not called during SSR

2. **File Selection Not Working**
   - Check the `accept` attribute format
   - Verify file types are supported
   - Ensure proper event handling

3. **Memory Issues with Large Files**
   - Use `URL.createObjectURL()` for previews
   - Clean up object URLs with `URL.revokeObjectURL()`
   - Consider file size limits

### Debug Information

```tsx
import { useFileDialog } from '@mantine/hooks';

function DebugFileDialog() {
  const fileDialog = useFileDialog({
    onChange: (files) => {
      if (files) {
        console.log('Selected files:', Array.from(files));
        console.log('File count:', files.length);
        Array.from(files).forEach((file, index) => {
          console.log(`File ${index}:`, {
            name: file.name,
            size: file.size,
            type: file.type,
            lastModified: file.lastModified
          });
        });
      }
    }
  });

  return <Button onClick={fileDialog.open}>Debug File Selection</Button>;
}
```

## Browser Support

- **Modern Browsers**: Full support
- **Mobile Browsers**: Full support with `capture` attribute
- **Legacy Browsers**: Limited support for some file types
- **Server-Side**: Safe to use (no-op during SSR)

## Related Hooks

- `use-clipboard` - For clipboard operations
- `use-local-storage` - For persisting file references
- `use-debounced-value` - For debounced file processing

## Best Practices

1. **File Validation**: Always validate file types and sizes
2. **Memory Management**: Clean up object URLs to prevent memory leaks
3. **User Experience**: Provide clear feedback for file selection
4. **Error Handling**: Handle file selection errors gracefully
5. **Accessibility**: Ensure keyboard navigation works properly

---

*The `use-file-dialog` hook provides a clean, programmatic way to handle file selection without traditional file input elements. It's perfect for custom upload interfaces, drag-and-drop implementations, and modern file handling patterns.*
