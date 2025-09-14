## Colors (Refactorium)

Mantine uses 10‑shade color tuples (based on Open Color with additions). Colors are available via theme and as CSS variables.

### Access colors

```tsx
import { useMantineTheme } from '@mantine/core';

function Demo() {
  const theme = useMantineTheme();
  return (
    <div style={{ background: theme.colors.blue[1], color: theme.colors.blue[9] }} />
  );
}
```

CSS variables example:

```css
.demo {
  color: var(--mantine-color-red-5);
  background: var(--mantine-color-grape-9);
  border: 1px solid var(--mantine-color-blue-1);
}
``;

### Add custom colors

Each color must define at least 10 shades.

```ts
import { MantineProvider, createTheme, Button, Group } from '@mantine/core';

const theme = createTheme({
  colors: {
    'ocean-blue': ['#7AD1DD','#5FCCDB','#44CADC','#2AC9DE','#1AC2D9','#11B7CD','#09ADC3','#0E99AC','#128797','#147885'],
    'bright-pink': ['#F0BBDD','#ED9BCF','#EC7CC3','#ED5DB8','#F13EAF','#F71FA7','#FF00A1','#E00890','#C50E82','#AD1374'],
  },
});

export function Demo() {
  return (
    <MantineProvider theme={theme}>
      <Group>
        <Button color="ocean-blue">Ocean blue</Button>
        <Button color="bright-pink">Bright pink</Button>
      </Group>
    </MantineProvider>
  );
}
```

Notes:
- 10 shades required for full variant support; you may define >10 and reference by index (e.g., `blue.11`).
- Use the colors generator for deriving tuples from a single base.

### Virtual colors (light/dark aware)

```ts
import { createTheme, MantineProvider, virtualColor } from '@mantine/core';

const theme = createTheme({
  colors: {
    primary: virtualColor({ name: 'primary', light: 'cyan', dark: 'pink' }),
  },
});
```

### colorsTuple helper

```ts
import { colorsTuple, createTheme } from '@mantine/core';

const theme = createTheme({
  colors: {
    custom: colorsTuple('#FFC0CB'),
    dynamic: colorsTuple(Array.from({ length: 10 }, () => '#FFC0CB')),
  },
});
```

### Supported color formats

- HEX: `#fff`, `#ffffff`
- RGB(A): `rgb(255,255,255)`, `rgba(255,255,255,0.5)`
- HSL(A): `hsl(0 0% 100%)`, `hsla(0 0% 100% / 0.5)`
- OKLCH: `oklch(96.27% 0.0217 238.66)` (10 values per tuple)

### primaryColor and primaryShade

```ts
import { MantineProvider, createTheme } from '@mantine/core';

const theme = createTheme({
  primaryColor: 'bright-pink',
  colors: { 'bright-pink': ['#F0BBDD','#ED9BCF','#EC7CC3','#ED5DB8','#F13EAF','#F71FA7','#FF00A1','#E00890','#C50E82','#AD1374'] },
  primaryShade: { light: 6, dark: 8 },
});
```

Rules:
- `primaryColor` must be a key of `theme.colors` (not a raw CSS color).
- `primaryShade` selects the default shade (0–9), can differ for light/dark.

### color vs c props

- `color` controls multiple CSS properties (background, color, border) depending on component and variant.
- `c` is a style prop that sets only `color` (text color). Combine for custom contrast.

```tsx
<Button color="#C3FF36" c="black">High‑contrast text</Button>
```

### Variant color resolver (advanced)

Customize how variants resolve colors for components like Alert, Avatar, Button, Badge, ActionIcon.

```ts
interface VariantColorsResolverInput {
  color: MantineColor | undefined;
  variant: string;
  gradient?: MantineGradient;
  theme: MantineTheme;
}

interface VariantColorResolverResult {
  background: string;
  hover: string;
  color: string;
  border: string;
}
```

Example:

```ts
import {
  MantineProvider,
  defaultVariantColorsResolver,
  parseThemeColor,
  rgba,
  darken,
  type VariantColorsResolver,
} from '@mantine/core';

const variantColorResolver: VariantColorsResolver = (input) => {
  const defaults = defaultVariantColorsResolver(input);
  const parsed = parseThemeColor({ color: input.color || input.theme.primaryColor, theme: input.theme });

  if (parsed.isThemeColor && parsed.color === 'lime' && input.variant === 'filled') {
    return { ...defaults, color: 'var(--mantine-color-black)', hoverColor: 'var(--mantine-color-black)' } as any;
  }

  if (input.variant === 'light') {
    return {
      background: rgba(parsed.value, 0.1),
      hover: rgba(parsed.value, 0.15),
      border: `1px solid ${parsed.value}`,
      color: darken(parsed.value, 0.1),
    };
  }

  if (input.variant === 'danger') {
    return {
      background: 'var(--mantine-color-red-9)',
      hover: 'var(--mantine-color-red-8)',
      color: 'var(--mantine-color-white)',
      border: 'none',
    };
  }

  return defaults;
};

<MantineProvider theme={{ variantColorResolver }} />;
```

### Colors generation (optional)

```bash
npm install chroma-js @mantine/colors-generator
```

```ts
import { generateColors } from '@mantine/colors-generator';

const theme = { colors: { 'pale-blue': generateColors('#375EAC') } };
```

### TypeScript: extend color names

```ts
import { DefaultMantineColor, MantineColorsTuple } from '@mantine/core';

type ExtendedCustomColors = 'primaryColorName' | 'secondaryColorName' | DefaultMantineColor;

declare module '@mantine/core' {
  export interface MantineThemeColorsOverride {
    colors: Record<ExtendedCustomColors, MantineColorsTuple>;
  }
}
```

### Project guidance (Refactorium)

- Define a brand palette and set `primaryColor`; keep `primaryShade` `{ light: 6, dark: 8 }` initially.
- Use `virtualColor` for scheme‑aware tokens (e.g., `primary`).
- Prefer tuple helpers (`colorsTuple`) or pre‑generated palettes to maintain contrast.
- Use `color` for component theming and `c` for text overrides when needed.


