# SSIP Resume AI

SSIP Resume AI is a small Next.js prototype that turns a messy, plain-language description of work into three polished, achievement-focused resume bullets.

The landing page explains the methodology. The generator at `/generator` collects the user’s experience, sends it to a server-side API route, and returns structured resume bullets generated with Gemini.

## What it does

- Landing page (`/`): introduces the SSIP framework, the workflow, a before/after example, and calls to action.
- Generator (`/generator`): accepts a raw work description plus optional targeting context.
- API (`POST /api/generate`): validates input, builds the model request, calls Gemini, validates structured JSON output, and returns it to the browser.
- Output: exactly three bullets — Story-Led, Skills-Led, and Impact-Led — plus detected skills, a coaching note, and missing-information prompts when useful.

The UI never talks to Gemini directly. The browser only calls the app’s own `/api/generate` endpoint.

## Project structure

```text
app/
  page.js                 Landing page at `/`
  page.module.css         Landing page styles
  generator/
    page.js               Generator UI at `/generator`
    page.module.css       Generator styles
  api/generate/route.js   Server-side generation endpoint
  globals.css             Global neo-brutalist theme variables
  layout.js               Root layout, metadata, and fonts
lib/
  prompt.js               System prompt derived from the methodology
  schema.js               Response JSON schema and runtime validator
resumewritingdata/
  summary.md              Resume-writing methodology source of truth
```

## How tailored responses are produced

There is no training dataset, fine-tuning, spreadsheet upload, or stored user profile in this prototype. Tailoring comes from two sources:

1. Methodology data in the repo:
   - `resumewritingdata/summary.md` is the source of truth for the resume-writing method.
   - `lib/prompt.js` operationalizes that methodology into a system prompt covering story/context, skills, impact, positioning, CAR/TAB reasoning, transferable skills, target-role alignment, ATS-relevant keywords, quantification only when supported, qualitative impact otherwise, and a strict no-fabrication rule.
   - `lib/schema.js` defines the expected JSON shape and validates the model response at runtime.

2. Runtime user input:
   - Required: raw work description.
   - Optional: current job title, industry, target role, and target job description.
   - The API route converts these fields into labeled model context.
   - When target role or job-description text is supplied, the model emphasizes the most relevant parts of the experience and aligns terminology naturally.
   - When metrics are absent, the model uses supported qualitative impact or asks for the missing information instead of inventing numbers.

Requests are stateless: inputs are used for one generation call and are not saved by the app.

## Environment variables

Create `.env.local` in the project root. Environment files are gitignored.

```bash
AI_API_KEY=your-gemini-api-key
AI_MODEL=your-model-name
```

- `AI_API_KEY` is required. The server returns a configuration error if it is missing.
- `AI_MODEL` is optional. If unset, the API route defaults to `gemini-2.5-flash`.
- Never expose `AI_API_KEY` to the browser or commit `.env.local`.

## Getting started

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) for the landing page and [http://localhost:3000/generator](http://localhost:3000/generator) for the generator.

## Production and quality checks

```bash
npm run lint
npm run build
npm run start
```

- `npm run lint` checks the codebase.
- `npm run build` creates the production build.
- `npm run start` serves the production build locally.

## API contract

### `POST /api/generate`

Request body:

```json
{
  "workDescription": "I ran standups after our PM left...",
  "currentJobTitle": "Designer",
  "industry": "Software",
  "targetRole": "Project Manager",
  "targetJobDescription": "Optional pasted posting text"
}
```

Only `workDescription` is required. The other fields may be empty or omitted.

Successful responses return validated JSON containing:

- `bullets`: three entries with `lead`, `text`, and `ssiP`
- `skills`
- `impactFraming`
- `positioningFraming`
- `coachingNote`
- `missingInformation`

Invalid requests return HTTP 400. Model or upstream failures return an error without leaking the API key.
