## Architecture (MVP)
- Frontend: Next.js (App Router), Mantine UI components, TypeScript-first.
- Backend: Next.js API routes (edge or node runtime). Optional SQLite/Prisma for persistence, otherwise JSON for seed data.
- Data model (minimal):
  - smell: id, title, category, description, badCode, goodCode, testHint

## Flow
1) User selects a smell (via `/smells/[id]`).
2) Page renders side-by-side bad/good code + explanations + test hints.
3) User can paste their own code; a lightweight heuristic check runs client-side and/or via an API route.

## AI integration points (optional, non-invasive)
- Prompt templates: expose smell definitions and refactor patterns as JSON (served from an API route) so AI agents can consume them.
- Verification hooks: provide a small API route that accepts code and returns likely smells with confidence scores.
- CI usage: a CLI (or Node script) can analyze diffs for new smells and comment on pull requests.
- Privacy-first: all checks can run locally; optional remote model calls are behind explicit flags (environment-based feature toggle).

## Project Structure (proposed)
- `app/` (Next.js App Router pages)
- `components/` (Mantine-based components)
- `app/api/` (Next.js API routes)
- `data/` (smell JSON)
- `development-steps/` (Markdown logs of each development step)
