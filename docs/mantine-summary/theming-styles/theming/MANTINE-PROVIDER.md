## MantineProvider (Refactorium)

MantineProvider supplies theme context, manages color scheme, and injects CSS variables. Use it once at the app root (App Router: `src/app/layout.tsx`).

### Usage in our project

We already have a basic setup in `src/app/layout.tsx`:

```tsx
import { ColorSchemeScript, MantineProvider, createTheme } from '@mantine/core';

const theme = createTheme({
  // Add project overrides here (colors, fonts, radius, spacing, etc.)
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
      </head>
      <body>
        <MantineProvider theme={theme} defaultColorScheme="dark">
          {children}
        </MantineProvider>
      </body>
    </html>
  );
}
```

### Props reference

```ts
interface MantineProviderProps {
  /** Theme override object */
  theme?: MantineThemeOverride;

  /** Used to retrieve/set color scheme value in external storage, by default uses `window.localStorage` */
  colorSchemeManager?: MantineColorSchemeManager;

  /** Default color scheme value used when `colorSchemeManager` cannot retrieve value from external storage, `light` by default */
  defaultColorScheme?: MantineColorScheme;

  /** Forces color scheme value, if set, MantineProvider ignores `colorSchemeManager` and `defaultColorScheme` */
  forceColorScheme?: 'light' | 'dark';

  /** CSS selector to which CSS variables should be added, `:root` by default */
  cssVariablesSelector?: string;

  /** Determines whether theme CSS variables should be added to given `cssVariablesSelector`, `true` by default */
  withCssVariables?: boolean;

  /** Deduplicate CSS variables against defaults, `true` by default */
  deduplicateCssVariables?: boolean;

  /** Resolve root element to set `data-mantine-color-scheme` attribute; must return undefined on server */
  getRootElement?: () => HTMLElement | undefined;

  /** Prefix for components static classes, `mantine` by default */
  classNamesPrefix?: string;

  /** Generate nonce attribute for generated <style /> tags */
  getStyleNonce?: () => string;

  /** Generate CSS variables based on theme */
  cssVariablesResolver?: CSSVariablesResolver;

  /** Enable static classes like `mantine-Button-root`, `true` by default */
  withStaticClasses?: boolean;

  /** Add global classes with <style /> tag; required for visibility utilities, `true` by default */
  withGlobalClasses?: boolean;

  /** Environment flag; 'test' disables transitions and portals */
  env?: 'default' | 'test';

  /** Your application */
  children?: React.ReactNode;
}
```

### Key concepts and when to use them

- theme: Centralize tokens (colors, fonts, radius, spacing). Use `createTheme` and pass to `theme`.
- Color scheme:
  - `defaultColorScheme`: `'light' | 'dark' | 'auto'`; used when storage is unavailable (SSR) or unset.
  - `colorSchemeManager`: customize persistence (e.g., `localStorageColorSchemeManager({ key: 'refactorium-color-scheme' })`).
  - `forceColorScheme`: hard‑lock to `'light'` or `'dark'` (ignores manager/default).
  - Add `<ColorSchemeScript />` in `<head />` to avoid flash and support SSR.
- CSS variables:
  - `withCssVariables` usually stays `true`. If you manage tokens via CSS files, you can set `false` (advanced).
  - `cssVariablesSelector` defaults to `:root`; change to `html` or a container only for special scoping needs.
  - `deduplicateCssVariables` should remain `true` for smaller style payloads.
  - `cssVariablesResolver` lets you compute custom variables from the theme.
- Root element: `getRootElement` controls where `data-mantine-color-scheme` goes; keep default (`document.documentElement`) unless you need body‑scoped theming.
- Classes:
  - `classNamesPrefix` changes static classes prefix (e.g., `app-Text-root`).
  - `withStaticClasses` toggles static classes entirely.
  - `withGlobalClasses` must remain `true` if using `hiddenFrom/visibleFrom` or `lightHidden/darkHidden` props.
- env: Set `env="test"` only in unit tests to disable transitions/portals; do not use in dev/prod or E2E.

### Practical guidance for Refactorium

- Keep `withGlobalClasses` enabled; we rely on responsive/visibility utilities.
- Store color scheme with `localStorageColorSchemeManager` (stable across app restarts) and default to `auto` if we want OS preference.
- Expand `createTheme` gradually: brand colors, font stack, radius/spacing scale; avoid hard‑coded values in components.
- Only change `cssVariablesSelector` for advanced scoping or micro‑frontends.
- Consider `getStyleNonce` if we enforce strict CSP with style nonces.

### Color scheme manager example

```tsx
import { MantineProvider, localStorageColorSchemeManager } from '@mantine/core';

const colorSchemeManager = localStorageColorSchemeManager({ key: 'refactorium-color-scheme' });

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <MantineProvider colorSchemeManager={colorSchemeManager} defaultColorScheme="auto">
      {children}
    </MantineProvider>
  );
}
```


