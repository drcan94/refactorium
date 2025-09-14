## Theme object (Refactorium)

Mantine theme is the single source of truth for colors, typography, spacing, radius, breakpoints, shadows and more. We customize it via `createTheme` and pass to `MantineProvider`.

### Interface reference

```ts
interface MantineTheme {
  focusRing: 'auto' | 'always' | 'never';
  scale: number;
  fontSmoothing: boolean;
  white: string;
  black: string;
  colors: MantineThemeColors;
  primaryShade: MantineColorShade | MantinePrimaryShade;
  primaryColor: string;
  variantColorResolver: VariantColorsResolver;
  autoContrast: boolean;
  luminanceThreshold: number;
  fontFamily: string;
  fontFamilyMonospace: string;
  headings: {
    fontFamily: string;
    fontWeight: string;
    textWrap: 'wrap' | 'nowrap' | 'balance' | 'pretty' | 'stable';
    sizes: {
      h1: HeadingStyle; h2: HeadingStyle; h3: HeadingStyle;
      h4: HeadingStyle; h5: HeadingStyle; h6: HeadingStyle;
    };
  };
  radius: MantineRadiusValues;
  defaultRadius: MantineRadius;
  spacing: MantineSpacingValues;
  fontSizes: MantineFontSizesValues;
  lineHeights: MantineLineHeightValues;
  breakpoints: MantineBreakpointsValues; // em units
  shadows: MantineShadowsValues;
  respectReducedMotion: boolean;
  cursorType: 'default' | 'pointer';
  defaultGradient: MantineGradient;
  activeClassName: string;
  focusClassName: string; // overrides focusRing
  components: MantineThemeComponents;
  other: MantineThemeOther;
}
```

### Usage

```tsx
import { createTheme, MantineProvider } from '@mantine/core';

const theme = createTheme({
  // colors, radius, spacing, headings, etc.
});

export default function Providers({ children }: { children: React.ReactNode }) {
  return <MantineProvider theme={theme}>{children}</MantineProvider>;
}
```

### Common customizations (high‑value)

- colors: add new palettes or override defaults (10 shades per color recommended)
- headings: set `fontFamily` and sizes for `h1–h6`
- shadows: override tokens like `md`, `xl`
- defaultRadius: choose semantic key (e.g., `'sm'`) or explicit value
- cursorType: `'pointer'` for checkbox/select if desired globally
- defaultGradient: set project‑wide gradient defaults

### Contrast and focus controls

- autoContrast: if `true`, filled variants flip text color to `white/black` based on `luminanceThreshold` (default 0.3).
- focusRing: `'auto' | 'always' | 'never'` — prefer `'auto'`.
- focusClassName: CSS class for focus styles; when set, it overrides `focusRing`.
- activeClassName: CSS class for active styles.

Applies to components such as Button, ActionIcon, Badge, Chip, etc. Spotlight and @mantine/dates accept only global `autoContrast`.

### Breakpoints and spacing

- breakpoints are defined in em; align with PostCSS variables we already configured.
- use semantic `spacing`, `radius`, `fontSizes`, `lineHeights` instead of hard‑coded values in components.

### Accessing and merging themes

- `useMantineTheme()` — read theme inside components.
- `DEFAULT_THEME` — base tokens; overrides are deep‑merged.
- `mergeMantineTheme(DEFAULT_THEME, override)` — get a full theme object for use outside React.
- `mergeThemeOverrides(a, b, ...)` — combine multiple overrides safely.

```ts
// theme.ts
import { createTheme, DEFAULT_THEME, mergeMantineTheme } from '@mantine/core';

const override = createTheme({ primaryColor: 'orange', defaultRadius: 0 });
export const theme = mergeMantineTheme(DEFAULT_THEME, override);
```

### Example override snippets

```ts
// Colors
const theme = createTheme({
  colors: {
    deepBlue: ['#eef3ff','#dce4f5','#b9c7e2','#94a8d0','#748dc1','#5f7cb8','#5474b4','#44639f','#39588f','#2d4b81'],
    blue: ['#eef3ff','#dee2f2','#bdc2de','#98a0ca','#7a84ba','#6672b0','#5c68ac','#4c5897','#424e88','#364379'],
  },
});

// Shadows & headings
const theme2 = createTheme({
  shadows: { md: '1px 1px 3px rgba(0,0,0,.25)', xl: '5px 5px 3px rgba(0,0,0,.25)' },
  headings: { fontFamily: 'Roboto, sans-serif', sizes: { h1: { fontSize: '36px' } } },
});

// Merge
import { mergeThemeOverrides } from '@mantine/core';
const merged = mergeThemeOverrides(theme, theme2);
```

### Project guidance (Refactorium)

- Define brand palette(s) and set `primaryColor`; keep `primaryShade` `{ light: 6, dark: 8 }` unless design requires otherwise.
- Enable `autoContrast` if we expect frequent use of light tints (e.g., `blue.1`) with filled variants.
- Keep `focusRing='auto'`; use `focusClassName` only for bespoke focus visuals.
- Maintain tokens in theme (not component‑level hard‑codes). Favor semantic spacing/radius.
- For strict CSP, pair with `getStyleNonce` on provider (see MantineProvider notes).


