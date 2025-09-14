# Code Smells  Definition, Etymology, and Taxonomy

Code smells are surface signals in code that often indicate deeper design issues. They are not bugs; the program may run correctly, but smells hint at maintainability, readability, or extensibility problems that tend to grow over time.

## Etymology
The term code smell was popularized by Kent Beck and Martin Fowler (late 1990s), notably in Fowlers Refactoring book. The metaphor frames certain patterns as odors: they suggest something may be off and worth inspecting, but they are not definitive diagnoses.

## Our Conceptual Space (Taxonomy)
We structure smells into practical categories to guide learning and refactoring:

1. Naming & Intent Clarity
- Poor Naming: ambiguous or misleading identifiers
- Inconsistent Vocabulary: same concept, different names

2. Size & Complexity
- God Function / God Object: does too much
- Long Parameter List: too many inputs indicate missing abstraction
- Deep Nesting: excessive indentation and branches

3. Duplication & Coupling
- Duplicate Logic: copy-paste blocks instead of reuse
- Shotgun Surgery: one change forces edits in many places
- Divergent Change: one module changes for many reasons

4. Magic & Hidden Knowledge
- Magic Numbers/Strings: unexplained literals
- Temporal Coupling: unseen ordering requirements
- Boolean Parameters: unclear mode switches

5. Data & Structure
- Data Clump: fields that always travel together
- Feature Envy: method that uses foreign data more than its own
- Primitive Obsession: using primitives where richer types fit

6. Comments & Signals
- Comment-Driven Code: comments to explain messy code
- Dead Code: unused/obsolete blocks left behind
- TODO Hoarding: TODOs instead of real backlog/issues

## How We Use Smells
- Smells are heuristics, not laws. Context matters.
- Each smell entry includes: signals, why it hurts, refactor strategies, before/after examples, and minimal test hints.
- We encourage paste-in experiments to learn by doing.

## Scope for the MVP
Initial set (subject to community input): God Function, Duplicate Logic, Poor Naming, Magic Numbers, Long Parameter List, Data Clump, Comment-Driven Code, Shotgun Surgery (sampled).
