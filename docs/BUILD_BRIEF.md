# Who Sees Development?

## Build brief

Build a polished, public-facing web prototype for a Mozilla Foundation Embedded Fellowship application with LAS Art Foundation.

The prototype must feel like a thoughtful public-interest observatory, not a corporate dashboard, a poverty-scoring tool, or a generic AI demo.

**Working title:** Who Sees Development?  
**Subtitle:** A participatory satellite-data observatory  
**Core question:** What does a brighter place mean—and who gets to decide?

---

## 1. Product purpose

Satellite night-time-light imagery is often used as a proxy for economic activity, electrification, urban change, or “development.” The signal can be useful, but it is not development itself.

This prototype makes the gap visible. It lets a visitor:

1. inspect an observed change in public night-time-light data for one place;
2. understand the data source, scale, processing, and uncertainty;
3. follow the chain from sensor measurement to a possible real-world decision;
4. see multiple explanations for a change rather than one authoritative conclusion; and
5. suggest a question or context that the satellite image cannot supply.

### The central principle

> A satellite observation is not the phenomenon it is used to describe.

The interface must carefully distinguish:

| Knowledge type | Meaning |
|---|---|
| Measurement | What the satellite product records |
| Processing | How raw observation becomes a usable data product |
| Interpretation | A possible explanation of the observed pattern |
| Situated context | What people familiar with a place may know or experience |
| Question / absence | What cannot be established from available data |

Do not create a single confidence score that merges these categories.

---

## 2. Non-negotiable boundaries

The product **must not**:

- call a place “underdeveloped,” poor, wealthy, unsafe, or in need because it is brighter or darker;
- rank communities or recommend investments, branch locations, public services, or interventions;
- state or imply that night lights prove human well-being;
- use confidential information, data, locations, or logic from a previous project;
- fabricate resident testimony, community partnerships, workshop results, or field observations;
- treat anonymous online visitors as community representatives;
- collect real personally identifiable data, exact sensitive locations, or publish contributions by default;
- add an LLM/chatbot, autonomous agent, authentication, payment system, or full moderation backend.

The prototype may use **clearly marked illustrative content** while a real public case study is being prepared. Any placeholder data must be visually labelled `Demo content — replace with verified public data`.

---

## 3. Scope for version 1

Build a responsive frontend prototype for **one** case study.

The case-study content must be driven by a local JSON file so the owner can later insert verified satellite data without redesigning the app.

### Do build

- landing page;
- case-study explorer with a map or image comparison and time series;
- data card and quality/coverage disclosure;
- clickable inference chain;
- alternative-explanations panel;
- structured “add a question or context” contribution flow;
- governance / data-care note;
- an accessible, calm visual design;
- local mock data and no required API key.

### Do not build yet

- user accounts;
- public submission storage;
- live satellite-data download pipeline;
- automated claims about a location;
- AI-generated explanations;
- real-time maps requiring paid or secret APIs;
- a global multi-location platform.

---

## 4. Recommended technical stack

Use:

- **Next.js** with App Router;
- **TypeScript**;
- **Tailwind CSS**;
- **React Leaflet + Leaflet** for the map;
- **Recharts** for the time-series chart;
- **Lucide React** for icons;
- static local JSON files for case-study and example contributions.

Use OpenStreetMap tiles only if an attribution footer is included. If map tiles or external network access complicate preview, use a lightweight static illustrated map background plus coordinates and a simple locator marker; the page must still work without it.

Avoid heavyweight GIS packages, databases, serverless services, or API keys.

### Suggested project structure

```text
app/
  page.tsx
  explore/page.tsx
  methodology/page.tsx
  contribute/page.tsx
  layout.tsx
  globals.css
components/
  Header.tsx
  Footer.tsx
  Hero.tsx
  SignalExplorer.tsx
  TimeSeriesChart.tsx
  DataCard.tsx
  QualityIndicator.tsx
  InferenceChain.tsx
  AlternativeExplanations.tsx
  KnowledgeLayers.tsx
  ContributionForm.tsx
  GovernanceNote.tsx
  SourceList.tsx
data/
  case-study.json
  example-contributions.json
  explanations.json
types/
  observatory.ts
public/
  images/
README.md
```

---

## 5. Content model

Create TypeScript types and use the following conceptual JSON schema. The values shown are examples only; do not present them as real data unless the project owner later verifies them.

```ts
type CaseStudy = {
  status: 'demo' | 'verified';
  title: string;
  placeName: string;
  country: string;
  coordinates: { lat: number; lng: number };
  bbox?: [number, number, number, number];
  period: { start: number; end: number };
  question: string;
  summary: string;
  dataset: {
    name: string;
    provider: string;
    productUrl: string;
    sensor: string;
    resolution: string;
    unit?: string;
    temporalAggregation: string;
    processingSummary: string;
    license?: string;
  };
  coverage: {
    level: 'high' | 'limited' | 'unknown';
    explanation: string;
    validObservationNote?: string;
  };
  series: Array<{ year: number; value: number | null; quality: 'high' | 'limited' | 'unknown' }>;
  observedChange: {
    statement: string;
    status: 'measurement';
    caveat: string;
  };
  limitations: string[];
  sourceLinks: Array<{ label: string; url: string }>;
};

type Contribution = {
  id: string;
  category: 'local_context' | 'question' | 'alternative_explanation' | 'data_concern';
  text: string;
  contributorRole?: 'resident' | 'researcher' | 'artist' | 'ecologist' | 'visitor' | 'other';
  locationPrecision: 'none' | 'area';
  visibility: 'public' | 'facilitators_only' | 'not_published';
  evidenceStatus: 'unreviewed' | 'community_reviewed' | 'evidence_linked';
  isIllustrative: boolean;
};
```

---

## 6. Required pages and behaviour

### A. Landing page (`/`)

#### Goal

Give a reviewer the project purpose in under 30 seconds, then invite them into the case study.

#### Required content

- project name: **Who Sees Development?**;
- subtitle: **A participatory satellite-data observatory**;
- large question: **What does a brighter place mean—and who gets to decide?**;
- short explanatory paragraph:

  > Satellites can reveal changing patterns of light at night. Those patterns are often used to infer change on the ground. This observatory makes the journey from measurement to interpretation visible—and leaves room for the context that data alone cannot provide.

- primary button: `Explore the case study` → `/explore`;
- secondary button: `How the observatory works` → `/methodology`;
- a five-step horizontal or vertical preview:
  `Observe → Inspect → Question → Add context → Decide what remains unknown`;
- a calm visual element: abstract night-light texture, dark map grid, or illustrated Earth-at-night motif. Do not use copyrighted satellite imagery unless it is licensed and credited.

#### Design

- dark midnight/navy background with warm, restrained light points;
- high-contrast off-white body text;
- avoid neon cyberpunk, flashy charts, stock photos, and “AI future” aesthetics;
- typography should feel editorial and scientific, not corporate.

---

### B. Explorer (`/explore`)

#### Layout

Desktop: two-column layout.

- left: case-study title, question, observed-signal statement, map/image comparison, time chart;
- right: data quality badge, data card, limitations, and prompts.

Mobile: stack sections in this order: title → observed signal → chart/map → quality → data card → explanation drawer.

#### Required elements

1. **Case-study status badge**
   - `Verified public case study` or `Demo content — replace with verified public data`.
   - The demo badge must be obvious, not hidden.

2. **Observed signal panel**
   - title: `What the data shows`;
   - only describe the measurement, for example: `Observed average radiance increased in the selected area between [year] and [year].`;
   - show the caveat directly below it: `This does not establish why it changed or what that change meant for people living there.`

3. **Map / comparison visual**
   - Provide a simple year selector or before/after toggle.
   - If real raster layers are unavailable, show an intentionally labelled conceptual comparison based on local demo JSON—not a falsely precise map.
   - Include a clear scale, source label, and attribution area.

4. **Time-series chart**
   - Show values by year from `case-study.json`.
   - Dots and tooltips must disclose year, value, and quality/coverage label.
   - Do not use red/green as the only distinction.

5. **Quality indicator**
   - headings: `Data quality for this view`, then `High`, `Limited`, or `Unknown`;
   - describe what the quality label means in plain language;
   - warn that an annual composite can conceal short-term changes.

6. **Prompt card**
   - ask: `What might this change mean? What might it hide?`
   - buttons link or scroll to `Alternative explanations` and `Add a question or context`.

---

### C. Data card component

Title: **How this observation was made**

Show these fields clearly:

- source/provider;
- dataset/product and external source link;
- sensor;
- spatial resolution in plain language;
- date range;
- unit, if applicable;
- temporal aggregation;
- high-level processing description;
- coverage/valid-observation information;
- known limits.

Include a fixed section titled **What this cannot tell us**. Example text:

> A night-light value does not directly measure income, access to public services, safety, dignity, local priorities, or a complete definition of development.

Use the local `limitations` list. Do not invent scientific limitations—only show values supplied by the case-study JSON or generic UI boilerplate clearly marked as a template.

---

### D. Inference chain component

Route: part of `/explore`, with a link to `/methodology` for expanded explanation.

Title: **How a signal becomes a decision**

Build a clickable, keyboard-accessible sequence:

```text
Satellite sensor
      ↓
Recorded night-time radiance
      ↓
Processed annual composite / pixel value
      ↓
Observed change over time
      ↓
Possible interpretation
      ↓
Potential action or decision
```

When a visitor selects a step, open a side panel or expandable card with:

- `What is known`;
- `What is assumed`;
- `What may be lost`;
- `Who can question this`.

The last step must say:

> This observatory does not recommend an action. It makes the assumptions before an action visible.

This component is the intellectual heart of the prototype. Give it visual prominence.

---

### E. Alternative explanations component

Title: **More than one story can fit the same signal**

Show 5–6 cards, each with an evidence label:

- `Electrification or construction` — Question for local investigation
- `Lighting technology or public-lighting policy changed` — Question for local investigation
- `Power outage, disaster, or recovery` — Question for local investigation
- `Seasonal or temporary activity` — Question for local investigation
- `Vehicle lights, fires, or other non-settlement light sources` — Data consideration
- `Limited data coverage or processing difference` — Data consideration

These cards must not imply that any one explanation is true. Add this sentence:

> These are prompts for investigation, not conclusions about this place.

If a case-study source later supports an explanation, data can mark it `Supported by a linked source` and include a citation.

---

### F. Contribution page (`/contribute`)

#### Goal

Demonstrate a responsible contribution model without collecting or storing real sensitive community data.

#### Required introductory text

> A satellite image cannot speak for a place. This space is for questions, context, and concerns that the image alone cannot provide. Contributions are not automatically treated as facts or published by default.

#### Form fields

- `What would you like to add?` — radio cards:
  - Local context
  - A question the map should help explore
  - An alternative explanation
  - A concern about the data
- free-text field with character count;
- optional contributor role;
- optional broad location selector (`No location` or `Approximate area` only; no exact coordinates);
- visibility choice:
  - Public after review
  - Share only with facilitators
  - Do not publish; use only to inform design
- optional source/evidence URL;
- confirmation checkbox:
  - `I understand that this prototype should not be used to report emergencies or share sensitive personal information.`

#### Submission behaviour for v1

- Do not send data to a backend.
- On submit, display an acknowledgement:

  > Thank you. In this prototype, submissions are not stored or published. In a future co-designed version, contributors would be able to review, correct, and withdraw their material.

- Include a `See example contributions` section below the form. All examples must carry a visible `Illustrative example` badge.

---

### G. Methodology / governance page (`/methodology`)

Include these sections:

1. **What this project is for** — making observation systems inspectable.
2. **What it is not for** — classifying communities or making automated decisions.
3. **Data care commitments**
   - no forced exact location;
   - no public-by-default contributions;
   - clear status labels;
   - correction and withdrawal in a future deployed version;
   - no conflation of lived experience with satellite measurement.
4. **Open work**
   - code, design notes, data-card template, and methodology intended to be public;
   - sensitive contributions would not automatically be open.
5. **References** — include the linked Mozilla/LAS brief, VIIRS/Black Marble documentation, and research URLs from `PROTOTYPE_BRIEF.md`.

---

## 7. UI copy and tone

Use plain, careful language. Avoid phrases such as:

- “AI-powered insights”;
- “unlock hidden potential”;
- “objective truth”;
- “underdeveloped zones”;
- “ground truth”;
- “data-driven decision engine.”

Prefer:

- “observed signal”;
- “possible interpretation”;
- “what the data does not show”;
- “question for local investigation”;
- “context contribution”;
- “measurement is not meaning.”

---

## 8. Accessibility and quality requirements

- Meet keyboard navigation requirements for all controls, especially the inference chain and form.
- Use semantic HTML and visible focus states.
- Ensure text/background contrast is strong.
- Do not rely on colour alone to show quality or knowledge type.
- Make chart tooltips readable by keyboard where practical; provide a short table/text alternative below the chart.
- Make the site responsive from 320px to wide desktop.
- Respect `prefers-reduced-motion`.
- Keep initial load fast; no large raster imagery is necessary in v1.

---

## 9. Acceptance criteria

The implementation is complete when all of the following are true:

- [ ] A visitor understands the purpose of the project from the landing page.
- [ ] The explorer shows one case study from a local JSON file.
- [ ] The interface distinguishes a measurement from an interpretation and a context contribution.
- [ ] Data source, resolution, time range, processing summary, limitations, and coverage are visible.
- [ ] Annual/aggregated-data limitations are clearly stated.
- [ ] The inference chain is interactive and explains assumptions and missing information at each step.
- [ ] Alternative explanations are presented as prompts, not conclusions.
- [ ] Contribution flow includes visibility, approximate-location, and safety choices.
- [ ] Submissions are not persisted.
- [ ] Illustrative examples are clearly labelled.
- [ ] The project works without API keys.
- [ ] There is no LLM, user authentication, scoring system, or recommendation engine.
- [ ] The app passes `npm run build` and has no obvious TypeScript errors.

---

## 10. Development sequence

1. Scaffold the Next.js/TypeScript/Tailwind app.
2. Add the static JSON types and demo case-study data.
3. Build the landing and explore layout.
4. Build the chart/map placeholders and data card.
5. Build the inference chain and alternative-explanations components.
6. Build the mock contribution flow and governance page.
7. Review every sentence for unsupported factual claims.
8. Test responsive and keyboard behaviour.
9. Run the production build.

---

## 11. Related documents

Read these before making implementation or copy decisions:

- [`PROTOTYPE_BRIEF.md`](./PROTOTYPE_BRIEF.md) — purpose, ethics, data rules, fellowship framing, and the full plan.
- [`COMMUNITY_SATELLITE_RESEARCH.md`](./COMMUNITY_SATELLITE_RESEARCH.md) — community-centred satellite-imagery research and product lessons.

The build should follow those documents if a design choice is unclear.

---

## 12. Delivery checklist

Before writing code, read `PROTOTYPE_BRIEF.md` and `COMMUNITY_SATELLITE_RESEARCH.md` in this folder. Treat them as product and ethics requirements, not as optional background.

When the first implementation is ready:

1. Run the production build and fix TypeScript/build errors.
2. Do a short manual review at mobile and desktop widths.
3. Check all copy for unsupported claims about the selected place or data.
4. Confirm that mock contributions are not persisted and are visibly illustrative.
5. Summarise the files created, commands run, known gaps, and the exact data fields that must be replaced to turn demo content into a verified public case study.

Do not expand the scope into a live data platform or add AI features without explicit approval.

