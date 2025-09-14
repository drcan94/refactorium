## Color schemes (Refactorium)

MantineProvider manages color scheme context and injects `data-mantine-color-scheme` on the root element. Use it once at app root (`src/app/layout.tsx`).

### Basics

- `defaultColorScheme`: `'light' | 'dark' | 'auto'` (default: `'light'`).
- Attribute: `data-mantine-color-scheme` is set on `<html />` and used by component styles.

```tsx
import { MantineProvider } from '@mantine/core';

<MantineProvider defaultColorScheme="dark">{/* ... */}</MantineProvider>
```

### Hooks

`useMantineColorScheme()` — read and update the stored color scheme value:

```ts
function useMantineColorScheme(): {
  colorScheme: 'dark' | 'light' | 'auto';
  setColorScheme: (value: 'dark' | 'light' | 'auto') => void;
  toggleColorScheme: () => void;
  clearColorScheme: () => void;
};
```

`useComputedColorScheme(defaultValue?: 'light' | 'dark', options?)` — always returns `'light' | 'dark'` (resolves `'auto'` against OS settings). Prefer this for toggles.

Transitions option:

```ts
const { colorScheme, setColorScheme } = useMantineColorScheme({ keepTransitions: true });
```

### SSR caveat (Next.js)

- The stored color scheme lives in localStorage; on the server it is unavailable. Client may differ from server default — avoid reading `colorScheme` during SSR to prevent hydration issues.
- Use `useComputedColorScheme('light', { getInitialValueInEffect: true })` for client‑only toggles.
- For showing/hiding content by scheme in SSR, prefer PostCSS mixins (`postcss-preset-mantine`) instead of reading scheme at render time.

### ColorSchemeScript

Add to `<head />` to set `data-mantine-color-scheme` before hydration and avoid a flash:

```tsx
import { ColorSchemeScript, MantineProvider } from '@mantine/core';

<html lang="en">
  <head>
    <ColorSchemeScript defaultColorScheme="auto" />
  </head>
  <body>
    <MantineProvider defaultColorScheme="auto">{/* ... */}</MantineProvider>
  </body>
</html>
```

You can pass additional `<script>` attributes (e.g., `nonce`).

### Force color scheme

Lock scheme to `'light'` or `'dark'`. Set on both `ColorSchemeScript` and `MantineProvider`. Disables user changes and ignores `defaultColorScheme`/manager.

```tsx
<ColorSchemeScript forceColorScheme="light" />
<MantineProvider forceColorScheme="light">{/* ... */}</MantineProvider>
```

### Color scheme manager

Customize persistence layer (defaults to localStorage). Interface:

```ts
interface MantineColorSchemeManager {
  get: (defaultValue: MantineColorScheme) => MantineColorScheme;
  set: (value: MantineColorScheme) => void;
  subscribe: (onUpdate: (scheme: MantineColorScheme) => void) => void;
  unsubscribe: () => void;
  clear: () => void;
}
```

Local storage manager (built‑in creator):

```ts
import { localStorageColorSchemeManager } from '@mantine/core';

const colorSchemeManager = localStorageColorSchemeManager({ key: 'refactorium-color-scheme' });
<MantineProvider colorSchemeManager={colorSchemeManager} />;
```

### Component helpers

- All components accept `lightHidden` and `darkHidden` to conditionally render by scheme (requires global classes enabled on provider).

```tsx
<Button lightHidden>Visible in dark scheme only</Button>
<Button darkHidden>Visible in light scheme only</Button>
```

### No‑JavaScript fallback (Next.js App Router)

If you must support users with JS disabled, set the attribute manually and still include `ColorSchemeScript`:

```tsx
import '@mantine/core/styles.css';
import { ColorSchemeScript, MantineProvider } from '@mantine/core';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-mantine-color-scheme="light">
      <head>
        <ColorSchemeScript />
      </head>
      <body>
        <MantineProvider>{children}</MantineProvider>
      </body>
    </html>
  );
}
```

### Project guidance (Refactorium)

- Use `defaultColorScheme="auto"` to follow OS preference; add `ColorSchemeScript` with the same default.
- Persist with `localStorageColorSchemeManager({ key: 'refactorium-color-scheme' })`.
- Build toggles with `useComputedColorScheme('light', { getInitialValueInEffect: true })` to avoid SSR mismatch.
- Keep `withGlobalClasses` enabled on provider to use `lightHidden`/`darkHidden`.


