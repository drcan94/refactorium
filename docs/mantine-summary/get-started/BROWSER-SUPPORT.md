## Mantine — Browser Support (Refactorium)

This note summarizes only what we need for our Next.js + Mantine project.

### Tested/supported browsers for Mantine

- Chromium 108+ (Chrome, Edge, Chrome for Android)
- Firefox 101+
- Safari 15.4+ (including iOS Safari)
- Internet Explorer: not supported

Mantine styles rely on CSS features that require at least:

- Chromium 99+
- Firefox 97+
- Safari 15.4+

### CSS features Mantine uses

- `:where` selector (all components)
- `@layer` directive (all styles)
- `:has` pseudo-class (some components; non‑critical styles)
- Flexbox `gap` (most components)
- `dvh` units (several components)
- `aspect-ratio` (several components)
- Container queries (only when explicitly enabled via component prop)

Note: `color-mix` is not used by Mantine by default, but you can use it on your side (e.g., via PostCSS alpha/color utilities) if your targets support it.

### Our project targets

- We target modern evergreen browsers meeting the requirements above: Chromium ≥ 108, Firefox ≥ 101, Safari ≥ 15.4.
- iOS Safari 15.4+ is required for full, styled experience.
- IE or significantly older browsers are not in scope.

### Polyfills

- Mantine ships no polyfills. If we later need to support older browsers/OSes, we must:
  - Review each component’s browser support notes before adopting it.
  - Install required polyfills (framework tooling may inject based on `browserslist`).
  - Manually verify behavior in those browsers (Mantine does not test below the versions listed above).

### Action items for us

- Keep `browserslist` aligned with the targets above (tooling like Next.js/autoprefixer uses it to decide polyfills/transforms).
- If enabling container queries or using `:has`-dependent styles in critical paths, confirm target browser support for affected audiences.


