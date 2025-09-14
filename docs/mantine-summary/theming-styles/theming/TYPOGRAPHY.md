## Typography (Refactorium)

Styles provider for raw HTML content. Mantine does not ship global typography styles by default; wrap untrusted/inline HTML with `Typography` to apply consistent, theme‑aware typography.

### Usage

```tsx
import { Typography } from '@mantine/core';

function Demo({ html }: { html: string }) {
  return (
    <Typography>
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </Typography>
  );
}
```

### What it styles

- paragraphs, headings (h1–h6)
- ordered/unordered lists
- blockquotes
- tables
- links, images, hr
- `kbd`, `code`, `pre`

Applies opinionated, readable defaults aligned with the current Mantine theme (colors, spacing, fonts, radius).

### Notes & recommendations

- Do not wrap arbitrary React components — `Typography` is meant for HTML markup (docs, CMS content, Markdown output).
- Keep HTML sanitized before injection when coming from external sources.
- Prefer placing `Typography` at a reasonably coarse boundary (article/container), not per‑paragraph.
- Leverages theme tokens; ensure `MantineProvider` theme (fonts, headings, spacing) is set appropriately.

### Example

```tsx
import { Typography } from '@mantine/core';

const html = `
  <h1>Heading 1</h1>
  <p>Lorem ipsum dolor sit amet...</p>
  <pre><code>console.log('code');</code></pre>
`;

export function Article() {
  return (
    <Typography>
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </Typography>
  );
}
```

### Project guidance (Refactorium)

- Use for documentation/blog/CMS pages rendered as HTML.
- Keep a single `Typography` wrapper per article or content block.
- For Markdown pipelines, apply `Typography` at the root of the rendered output to unify spacing/typography.


