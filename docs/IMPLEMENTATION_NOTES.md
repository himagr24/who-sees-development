# Implementation notes — v1 prototype

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build (static pages)
```

No API keys, backend, database, or network calls at runtime.

## What is real and what is demo

| Item | Status |
|---|---|
| Interface, inference chain, knowledge layers, data-care rules | Real (prototype) |
| Dataset/provider/sensor/resolution/unit description | Describes the *intended* source (EOG VIIRS VNL). Confirm against provider docs before publishing. |
| Place, coordinates, series values, comparison grids, coverage labels | **Demo** — illustrative placeholders |
| Example contributions | **Illustrative** — written for the prototype, not from real people |
| References | Real links, copied from `PROTOTYPE_BRIEF.md` / `COMMUNITY_SATELLITE_RESEARCH.md` |

## Turning the demo into a verified public case study

Edit only `data/case-study.json`. Fields to replace:

1. `status` → `"verified"` (only once every item below is filled from a real source). This switches the demo badge to "Verified public case study", reveals the rounded coordinates, and removes demo warnings on the chart and comparison.
2. `title`, `placeName`, `country`, `question`, `summary`.
3. `coordinates` (approximate centre) and `bbox` ([west, south, east, north]).
4. `selectionReason` — why this place, who chose it, whether people connected to it were consulted.
5. `period.start` / `period.end`.
6. `dataset.*` — exact product name **and version**, `productUrl`, `processingSummary` (your actual area-aggregation method), `license`.
7. `coverage.level`, `coverage.explanation`, `coverage.validObservationNote` — from the product's cloud-free / valid-observation counts.
8. `series[]` — real per-year values and per-year `quality`.
9. `comparison.grids` — a coarse aggregate of the real raster for two years (no finer than the source resolution), plus `comparison.note` and `cellSizeLabel`.
10. `observedChange.statement` — measurement language only.
11. `limitations[]` — remove the "Demo content…" line and add limitations documented for this dataset/area.
12. `sourceLinks[]` — add the exact download/DOI for the data used.

Other content files:

- `data/explanations.json` — set `evidence` to `"supported_by_source"` and add a `citation` only when a linked source supports that explanation for this place.
- `data/inference-chain.json` — the six steps of the chain.
- `data/example-contributions.json` — keep `isIllustrative: true` unless a contribution is real, consented, and approved for use.

## Design decisions / deviations from the README

- **No Leaflet map.** The README allows a static fallback. A tiled basemap would imply precision the demo data does not have and adds an external tile dependency, so the comparison is a labelled conceptual grid driven by JSON. Leaflet can be added once a verified area exists.
- **No web fonts** — system serif/sans stacks, so builds work offline.
- Contribution form clears its state on submit and makes no network request.
- `npm audit` reports a PostCSS advisory inside Next 15's build tooling; it affects build-time CSS processing, not the static output. Upgrading to Next 16 resolves it.

## Not yet built

Data-preparation notebook/script, walkthrough video, deployment, and a printable data card.
