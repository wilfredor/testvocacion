# Testvocacion (RIASEC Orientation)

Interactive vocational interest questionnaire using a simplified, public-domain RIASEC (Holland) item set. It presents 48 items (8 per dimension), paginated with inline Yes/No toggles, and generates a ranked RIASEC profile with brief career hints.

## Features
- RIASEC-based item set (Realistic, Investigative, Artistic, Social, Enterprising, Conventional); items inspired by the public O*NET Interest Profiler.
- Inline Yes/No segmented toggles, paginated flow; “Process results” only shows on the last page when all items are answered.
- Results ranked by percentage and count per dimension, with a method note summarizing the model and top code.
- Multilingual: Español, English, Português (aria-label on language selector).
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
