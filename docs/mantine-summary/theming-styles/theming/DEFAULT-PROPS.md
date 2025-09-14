## Default props (Refactorium)

Define default props centrally with `theme.components`, scope them with `MantineThemeProvider`, or attach defaults per‑component with `useProps`/`withProps`.

### Global defaults via theme.components

```ts
import { MantineProvider, Button, Group, createTheme } from '@mantine/core';

const theme = createTheme({
  components: {
    Button: Button.extend({
      defaultProps: { color: 'cyan', variant: 'outline' },
    }),
  },
});

export function Demo() {
  return (
    <MantineProvider theme={theme}>
      <Group>
        <Button>Default button</Button>
        <Button color="red" variant="filled">Overrides</Button>
      </Group>
    </MantineProvider>
  );
}
```

### Scoped defaults with MantineThemeProvider

```tsx
import { MantineThemeProvider, createTheme } from '@mantine/core';

const scoped = createTheme({
  components: {
    Button: { defaultProps: { color: 'cyan', variant: 'outline' } },
  },
});

<MantineThemeProvider theme={scoped}>{/* subtree with defaults */}</MantineThemeProvider>
```

### Compound components

For parts like `Menu.Item`, `Tabs.List`, omit the dot in keys:

```ts
import { createTheme, Menu, Tabs } from '@mantine/core';

const theme = createTheme({
  components: {
    MenuItem: Menu.Item.extend({ defaultProps: { color: 'red' } }),
    TabsList: Tabs.List.extend({ defaultProps: { justify: 'center' } }),
  },
});
```

### useProps hook for custom components

```ts
import { useProps, MantineThemeProvider, createTheme } from '@mantine/core';

interface CustomComponentProps { color?: string; children?: React.ReactNode }
const localDefaults = { color: 'red' } satisfies Partial<CustomComponentProps>;

function CustomComponent(props: CustomComponentProps) {
  const { color, children } = useProps('CustomComponent', localDefaults, props);
  return <div style={{ color }}>{children}</div>;
}

const theme = createTheme({
  components: { CustomComponent: { defaultProps: { color: 'green' } } },
});

<>
  <CustomComponent>Default color</CustomComponent>
  <MantineThemeProvider theme={theme}>
    <CustomComponent>Provider color</CustomComponent>
    <CustomComponent color="blue">Prop color</CustomComponent>
  </MantineThemeProvider>
</>
```

### withProps for convenient presets

```ts
import { Button, InputBase } from '@mantine/core';
import { IMaskInput } from 'react-imask';

const LinkButton = Button.withProps({ component: 'a', target: '_blank', rel: 'noreferrer', variant: 'subtle' });

const PhoneInput = InputBase.withProps({
  component: IMaskInput,
  mask: '+7 (000) 000-0000',
  label: 'Your phone number',
  placeholder: 'Your phone number',
});

// Props passed at usage override withProps defaults
```

### Guidance (Refactorium)

- Prefer `theme.components` for app‑wide consistency; use `MantineThemeProvider` to scope defaults per page/section.
- For design‑system wrappers, export `withProps` presets (e.g., `PrimaryButton`, `ExternalLinkButton`).
- For custom components, wire to theme with `useProps('ComponentName', ...)` to enable default props.


