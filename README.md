# Who Sees Development?

**A participatory satellite-data observatory — experimental prototype**

> What does a brighter place mean—and who gets to decide?

Satellites can reveal changing patterns of light at night. Those patterns are often used to infer change on the ground. This observatory makes the journey from measurement to interpretation visible—and leaves room for the context that data alone cannot provide.

This prototype is being developed as part of an application to the Mozilla Foundation Embedded Fellowship with LAS Art Foundation.

> [!IMPORTANT]
> **The case-study values in this version are demo content.** The case study is Puerto Rico, 2014–2024. The place, sources and documented events are real; the chart values, comparison grid and example contributions are still illustrative placeholders, and are labelled as such throughout the site. See [What is real and what is demo](#what-is-real-and-what-is-demo).

---

## Why this exists

In a previous project we worked on, night-time satellite imagery was used as one signal for changing patterns of development and service demand. The experience showed that such data can be useful for revealing broad patterns, but a brighter pixel does not explain why a place changed or what that change means for people who live there.

This project starts from one principle:

> **A satellite observation is not the phenomenon it is used to describe.**

It is **not** a tool for scoring communities, predicting poverty, or recommending where institutions should invest.

## What a visitor can do

1. **Observe** a night-light change in one selected area — a time series and a before/after comparison, described in measurement language only.
2. **Inspect** how the observation was made — provider, sensor, resolution, time range, processing, coverage and known limits.
3. **Follow the inference chain** from satellite sensor to a possible decision, seeing at each step what is known, what is assumed, what may be lost, and who can question it.
4. **Consider alternative explanations** — several stories that fit the same signal, presented as prompts for investigation rather than conclusions.
5. **Add a question or context** through a contribution flow designed not to extract sensitive local knowledge.

## Five kinds of knowledge, kept apart

| Layer | Example |
|---|---|
| Measurement | "Average radiance increased over the selected period." |
| Processing | "Nightly passes were screened for cloud and combined into one value per year." |
| Interpretation | "This may reflect changed electrification or construction." |
| Situated context | "A contributor reports repeated power cuts." |
| Question / absence | "Does this map capture access to essential services?" |

These are never merged into a single truth or confidence score.

## Pages

| Route | Contents |
|---|---|
| `/` | The core question, the project in plain language, and a five-step journey |
| `/explore` | The case study: observed signal, chart, comparison, data-quality badge, data card, inference chain, alternative explanations |
| `/contribute` | A non-persistent contribution form and illustrative examples |
| `/methodology` | Purpose, limits, data-care commitments, open-work note, 12-month direction and references |

## Data care

- No exact locations — contributors choose no location or a broad area only.
- Nothing is public by default — each contributor chooses *public after review*, *facilitators only*, or *do not publish*.
- Contributor role and review status are shown, so a visitor's reading, a researcher's note and a local account are not treated as the same kind of evidence.
- **Version 1 stores nothing.** The form makes no network request and keeps no data.
- In a future deployment, review, access, correction and withdrawal would be co-designed with LAS Art Foundation and participants. No community partnership or co-design has taken place yet.

## What is real and what is demo

| Item | Status |
|---|---|
| Interface, inference chain, knowledge layers, data-care rules | Real |
| Dataset description (VIIRS Nighttime Lights, Earth Observation Group) | Describes the *intended* source; to be confirmed before publication |
| Place: Puerto Rico, 2014–2024, with documented island-wide blackouts in 2016, 2017, 2020 and 2022 | Real, with linked sources |
| Series values, comparison grid, coverage labels | **Demo** — until the data-preparation script is run on downloaded data |
| Example contributions | **Illustrative** — written for the prototype, not from real people |
| References | Real, linked sources |

## Run it locally

Requires Node.js 18.18 or later.

```bash
npm install
npm run dev
```

Then open <http://localhost:3000>. No API keys, database or external services are needed.

```bash
npm run build   # production build (all pages are static)
npm run typecheck
```

## Project structure

```text
app/            Pages (Next.js App Router)
components/     UI components — chart, data card, inference chain, form, …
data/           Case study, explanations, inference chain, example contributions (JSON)
types/          Content model (TypeScript)
lib/            Typed loaders for the JSON content
scripts/        Data-preparation script (Python)
docs/           Project brief, build brief, research notes, implementation notes
```

Built with Next.js, TypeScript, Tailwind CSS, Recharts and Lucide icons.

## Replacing the demo with a verified case study

All case-study content comes from [`data/case-study.json`](data/case-study.json), so real data can be added without changing the interface. [`scripts/prepare_case_study.py`](scripts/prepare_case_study.py) computes the yearly values from Earth Observation Group VIIRS data; [`docs/DATA_PREPARATION.md`](docs/DATA_PREPARATION.md) explains how to download the data and run it. Setting `"status": "verified"` removes the demo labels — do this only once every field has been filled from a public, citable source. The full list of fields to replace is in [`docs/IMPLEMENTATION_NOTES.md`](docs/IMPLEMENTATION_NOTES.md).

## Accessibility

Keyboard-operable inference chain and form, visible focus states, quality and knowledge types shown by shape and text rather than colour alone, a table alternative for the chart, responsive layout from 320px, and support for `prefers-reduced-motion`.

## Roadmap (12-month fellowship direction)

1. **Co-design and research** — select datasets with LAS collaborators; develop data-card, contribution and governance formats.
2. **Observatory alpha** — open-source prototype with transparent provenance, uncertainty and contribution pathways.
3. **Participatory pilots** — test with LAS-linked public programmes and revise based on what participants find useful or harmful.
4. **Open release** — code, data-card templates, a participatory-method guide and a workshop/exhibition resource.

## Documentation

- [`docs/PROTOTYPE_BRIEF.md`](docs/PROTOTYPE_BRIEF.md) — purpose, ethics, data rules and fellowship framing
- [`docs/COMMUNITY_SATELLITE_RESEARCH.md`](docs/COMMUNITY_SATELLITE_RESEARCH.md) — research on community-centred satellite imagery
- [`docs/BUILD_BRIEF.md`](docs/BUILD_BRIEF.md) — the full product and build specification
- [`docs/IMPLEMENTATION_NOTES.md`](docs/IMPLEMENTATION_NOTES.md) — design decisions, known gaps and data-replacement guide
- [`docs/DATA_PREPARATION.md`](docs/DATA_PREPARATION.md) — downloading the satellite data and running the preparation script

## Key sources

- [Earth Observation Group — VIIRS Nighttime Lights](https://eogdata.mines.edu/products/vnl/)
- [NASA Black Marble User Guide](https://viirsland.gsfc.nasa.gov/PDF/BlackMarbleUserGuide_v1.2_20210421.pdf)
- [LAS Art Foundation](https://www.las-art.foundation/what-we-do)
- [Mozilla Foundation Fellowship RFP and LAS host brief](https://assets.mofoprod.net/network/documents/PUBLIC_2027_2028_Fellowship_RFP-2.pdf)

The full reference list, including the community-monitoring and night-lights research behind the design, is on the `/methodology` page.
