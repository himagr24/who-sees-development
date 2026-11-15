# Prototype brief — Who Sees Development?

## The project in one paragraph

**Who Sees Development?** is a small public prototype for the Mozilla Foundation Embedded Fellowship with LAS Art Foundation. It uses one public night-time-light case study to show that a satellite measurement is not the same thing as “development.” Visitors can inspect the signal, its processing and limits, follow the inference chain from sensor to possible decision, consider multiple explanations, and contribute questions or context that the image cannot supply.

This is an experimental planetary-observatory prototype, not a product for scoring communities, predicting poverty, or recommending where institutions should invest.

## Why this fits LAS Art Foundation

LAS is interested in an interface built on open satellite and environmental data that makes visible the scales, resolutions, assumptions, and uncertainties of sensing systems. It also wants artists, ecologists, scientists, and citizens to identify blind spots, raise alternative questions, and consider how contributions should be governed.

This project addresses that brief by making the journey from an observation to a claim about a place explicit.

## Origin story to use in the application

In a previous project we worked on, night-time satellite imagery was used as one signal for changing patterns of development and service demand. The experience showed that such data can be useful for revealing broad patterns, but a brighter pixel does not explain why a place changed or what that change means for people who live there.

Use this wording in public materials. Do not reveal confidential details, names, locations, models, or decisions from that previous project.

## The main question

> What does a brighter place mean—and who gets to decide?

## What version 1 must demonstrate

1. A visitor can observe a real or clearly marked demo night-light change in one selected area.
2. A visitor can find the source, sensor, resolution, time range, processing, coverage, and limitations.
3. A visitor can see that the signal has multiple plausible explanations.
4. A visitor can distinguish measurement, interpretation, situated context, and unanswered question.
5. A visitor can see a responsible contribution model that does not extract sensitive local knowledge.

## One narrow case study

Use only one public location and a focused period (for example, 2014–2024). The public case study must use open data and include a source link. It should never reuse confidential imagery or proprietary analysis.

Before presenting any location as verified, record:

- the selected place and reason for selection;
- exact dataset and provider;
- sensor/product name;
- spatial resolution and period;
- processing/aggregation used;
- valid-observation or coverage information, where available;
- what is observed; and
- what cannot be inferred.

If those facts are not ready, use demo content and visibly label it: **Demo content — replace with verified public data.**

## Information architecture

### 1. Landing page

The landing page should state the core question, explain the project in plain language, and link to the case study.

Required copy:

> Satellites can reveal changing patterns of light at night. Those patterns are often used to infer change on the ground. This observatory makes the journey from measurement to interpretation visible—and leaves room for the context that data alone cannot provide.

### 2. Observe the signal

Show a before/after map or visual comparison and a time-series chart. Use only measurement language:

- Good: “Observed average radiance increased in the selected area between 2016 and 2024.”
- Not allowed: “The area developed.”

Show a quality/coverage badge (`High`, `Limited`, or `Unknown`) and state that annual composites can hide temporary events and short outages.

### 3. Data card

Title it **How this observation was made** and include:

- provider and dataset link;
- sensor/product;
- spatial resolution in plain language;
- period and temporal aggregation;
- unit, when known;
- processing summary;
- coverage/quality statement;
- known limitations; and
- fixed text: “A night-light value does not directly measure income, public services, safety, dignity, local priorities, or a complete definition of development.”

### 4. Inference chain

This is the central feature:

```text
Satellite sensor
      ↓
Recorded night-time radiance
      ↓
Processed composite / pixel value
      ↓
Observed change over time
      ↓
Possible interpretation
      ↓
Potential action or decision
```

Every step must disclose:

- what is known;
- what is assumed;
- what may be lost; and
- who can question it.

At the final step, state: **This observatory does not recommend an action. It makes the assumptions before an action visible.**

### 5. Alternative explanations

Show several non-exclusive prompts:

- electrification or construction;
- altered lighting technology or policy;
- temporary or seasonal activity;
- outage, disaster, conflict, or recovery;
- vehicle lights, fires, or non-settlement sources; and
- limited coverage or processing differences.

Mark every one as `Supported by a linked source`, `Question for local investigation`, or `Not tested in this prototype`.

### 6. Questions and context

The prototype may include a non-persistent form. It should let a visitor add:

- local context;
- a question the map should help explore;
- an alternative explanation; or
- a concern about the data.

It must provide:

- no location or approximate area only, never mandatory exact pins;
- visibility options: public after review, facilitators only, or do not publish;
- a sensitivity warning;
- an optional source/evidence field;
- no backend storage; and
- a clear acknowledgement that no submission is stored in v1.

Example contributions must carry an **Illustrative example** label.

## Knowledge layers that must remain separate

| Layer | Example |
|---|---|
| Measurement | “Average radiance increased over the selected period.” |
| Interpretation | “This may reflect changed electrification or construction.” |
| Situated context | “A contributor reports repeated power cuts.” |
| Question / absence | “Does this map capture access to essential services?” |

Do not combine these into a single truth or confidence score.

## Data and ethics requirements

- Never label a community as poor, underdeveloped, wealthy, unsafe, or in need based on light intensity.
- Never represent an unreviewed contribution as ground truth.
- Never imply that an image speaks for a community.
- Open-source code and methodology may be public; sensitive context contributions should not be public by default.
- Contributors should be able to correct or withdraw material in a future real deployment.
- No real community partnership, feedback, or local observation may be claimed unless it happened and consent exists.
- Include a future governance note: contributions would be co-designed with LAS and participants, including decisions about review, access, correction, and removal.

## Community value

The contribution is not “a map people can annotate.” A useful community version would let people set the questions first:

```text
Observed signal
      ↓
What could explain it?
      ↓
What information is missing?
      ↓
Who should interpret or investigate it?
      ↓
What should happen next?
```

The prototype should return value to contributors by producing an inspectable record of questions, limitations, and competing interpretations—not by harvesting their knowledge to train a model.

## 12-month Fellowship direction

### Quarter 1 — Co-design and research

Select datasets with LAS collaborators; develop data-card, contribution, and governance formats; hold early conversations/workshops around what should be visible and what should remain protected.

### Quarter 2 — Observatory alpha

Build a public open-source prototype with transparent provenance, uncertainty, and contribution pathways.

### Quarter 3 — Participatory pilots

Test the observatory with LAS-linked public programmes and revise the interface, data-care rules, and review process based on what participants find useful or harmful.

### Quarter 4 — Open release

Release code, data-card templates, a participatory-method guide, documentation, and a public-facing workshop/exhibition resource.

## Evidence to show Mozilla

Before applying, aim to have:

- a deployed demo;
- a public GitHub repository;
- a clear README and source documentation;
- one reproducible data-preparation notebook or script;
- screenshots or a 60–90 second walkthrough video;
- a note explaining what is real data and what remains a demo;
- evidence that you can build reliable data/AI systems; and
- a focused explanation of why LAS is necessary: it brings artistic, scientific, and public perspectives that a technical prototype alone cannot provide.

## Core sources

- Mozilla Fellowship RFP and LAS host brief: https://assets.mofoprod.net/network/documents/PUBLIC_2027_2028_Fellowship_RFP-2.pdf
- LAS Art Foundation: https://www.las-art.foundation/what-we-do
- Earth Observation Group, VIIRS Nighttime Lights: https://eogdata.mines.edu/products/vnl/
- NASA Black Marble User Guide: https://viirsland.gsfc.nasa.gov/PDF/BlackMarbleUserGuide_v1.2_20210421.pdf

For implementation details, use `README.md`. For research evidence and community-centred design lessons, use `COMMUNITY_SATELLITE_RESEARCH.md`.
