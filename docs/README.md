# Code Smell Playground

An open-source, developer-first playground to transform small code snippets from "why it’s problematic" to "how it should look", with side-by-side comparison, concise explanations, and mini test suggestions.

- Focus: learn-by-doing, explain-the-why, small repeatable practice.
- Stack: Next.js (React + TypeScript, App Router), Mantine UI, optional SQLite (via lightweight API routes).
- Funding: community donations only; fully open-source and build-in-public.

## Problem
Best practices are often abstract. Reading guidelines rarely sticks; developers learn better with concrete, contextual examples that show the smell signals, the impact, and a better alternative.

## Solution
A curated set of code smells with: (1) "what’s wrong" explained, (2) improved version side-by-side, (3) short test hints to validate the refactor, and (4) a paste area to try your own snippet with lightweight heuristic checks.

## Why this matters in the AI era
- AI accelerates code creation but also amplifies mistakes. This playground provides human-in-the-loop guardrails to catch AI-introduced smells early.
- Turns vague “best practices” into concrete, copy-ready refactors developers and AI agents can follow.
- Acts as a living catalog of anti-patterns that teams can standardize on and automate against in CI.

## How it complements AI tools
- Prompt companion: use smell definitions and refactor patterns as structured prompts for AI code assistants to generate better first drafts.
- Verification step: run quick heuristic checks on AI-generated snippets to surface likely issues (e.g., duplication, magic numbers, poor naming, long parameter lists).
- Teaching loop: pair a “bad” snippet from your codebase with our “good” template to guide AI towards safer, more maintainable changes.
- Model-agnostic: works whether you use local models or hosted APIs; no vendor lock‑in.

## When to use it
- Reviewing AI-suggested diffs to ensure they meet internal quality bars.
- Onboarding juniors or non-experts to recognize and fix common smells.
- Creating team-specific smell baselines that map to your standards and CI checks.
- Running workshops to practice refactors with measurable before/after outcomes.

## Smell Taxonomy
See [CODE_SMELLS.md](CODE_SMELLS.md) for the full definition and taxonomy.

## MVP Scope (6–8 smells)
- God Function
- Duplicate Logic
- Poor Naming
- Magic Numbers
- Long Parameter List
- Data Clump
- Comment-Driven Code
- Shotgun Surgery (sampled)

## Quickstart
Project uses Next.js with Mantine UI. Follow your standard Next.js workspace setup, add Mantine as the component library, and enable TypeScript. Configure linting and testing according to your team standards.

## Contributing
See [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines.

## Pages and content guidance (Next.js)
- Home (`/`): include a concise "Why this matters in the AI era" teaser above the fold and link to detailed docs. Provide a clear call-to-action to explore smells.
- About (`/about`): include an expanded rationale covering "Why this matters in the AI era", "How it complements AI tools", and concrete team use cases.
- Development logs: create a `/development-steps/` folder at the docs to track step-by-step progress via Markdown files (one file per step, numbered and dated). Link to these logs from the About page for transparency.
