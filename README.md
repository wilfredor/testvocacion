# Testvocacion (RIASEC Orientation)

Interactive questionnaire engine using a config-driven RIASEC (Holland) item set. It renders 48 items (8 per dimension), paginated with inline Yes/No toggles, and produces a ranked profile with brief career hints. The flow is decoupled into domain (config + scoring), controller, and renderer layers to support future test types and UIs.

### Extensible to other tests
- Swap the config (items, areas, scoring strategy, page size) to support other interest/value/competency questionnaires.
- Add scoring strategies (e.g., Likert averages, weighted scores, branching) without touching UI.
- Plug another renderer (Preact/Svelte or server-rendered) while reusing domain + controller.

## Features
- Config-driven tests: `configs`/`src/config.ts` defines the test (items, areas, page size, scoring strategy).
- RIASEC item set (Realistic, Investigative, Artistic, Social, Enterprising, Conventional) inspired by the public O*NET Interest Profiler.
- Inline Yes/No segmented toggles; “Process results” only appears on the last page when all items are answered. Language switches preserve answers and relabel the UI.
- Results ranked by percentage and count per dimension, with a method note summarizing the model and top code.
- Multilingual: Español, English, Português plus extra options (fr, de, it, nl, zh, ja, ar, hi, ru) currently mapped to English content pending translation.
- Architecture: domain (config + scoring + answer store), controller (flow/orchestration), renderer (DOM implementation). Swap renderer for another UI (e.g., Preact/Svelte) without touching domain.
- Static build via webpack; no backend required.

## Quick start
```bash
npm install
npm run develop   # dev server on http://localhost:4000
```
For a static build:
```bash
npm run build
# serve dist/ with your preferred static server
```

Demo: https://wilfredor.github.io/testvocacion/

## Scoring model
- Model: Holland RIASEC.
- Items: 48 (8 per dimension) inspired by O*NET Interest Profiler (public domain).
- Scoring: sum of “Yes” per dimension; percentages = yes_count / answered_count * 100; ordered descending. Top code shown in the results note.
- No norms, weights, or psychometric validation are provided.

## Limitations
- Orientation-only; not a clinically validated assessment.
- No acquiescence control, no reliability metrics, no normative samples.
- Career texts are brief hints, not prescriptions.

## Roadmap ideas
- Likert scale (5-point) instead of binary toggles to capture intensity.
- Add acquiescence and consistency checks.
- Persist responses locally and allow exporting a PDF summary.
- Collect anonymized responses (opt-in) to compute reliability/validity metrics and derive basic norms.

## Tech stack
- TypeScript + webpack
- cash-dom for light DOM handling
- Vanilla CSS
