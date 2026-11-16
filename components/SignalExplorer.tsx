"use client";

import { useState } from "react";
import type { CaseStudy } from "@/types/observatory";

/** Sequential warm ramp: dark → amber → near-white. Lightness carries the value, not hue alone. */
function cellColor(v: number, max: number) {
  const t = Math.max(0, Math.min(1, v / max));
  const stops = [
    [14, 20, 36],
    [70, 52, 34],
    [160, 108, 48],
    [243, 196, 107],
    [255, 244, 220],
  ];
  const p = t * (stops.length - 1);
  const i = Math.min(stops.length - 2, Math.floor(p));
  const f = p - i;
  const c = stops[i].map((a, k) => Math.round(a + (stops[i + 1][k] - a) * f));
  return `rgb(${c[0]}, ${c[1]}, ${c[2]})`;
}

export default function SignalExplorer({ caseStudy }: { caseStudy: CaseStudy }) {
  const comparison = caseStudy.comparison;
  const years = comparison ? Object.keys(comparison.grids).sort() : [];
  const [year, setYear] = useState(years[years.length - 1] ?? "");

  if (!comparison || years.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-line p-6 text-sm text-muted">
        No comparison layer is available for this case study.
      </div>
    );
  }

  const all = years.flatMap((y) => comparison.grids[y].flat());
  const max = Math.max(...all);
  const grid = comparison.grids[year];
  const mean = grid.flat().reduce((a, b) => a + b, 0) / grid.flat().length;
  const isDemo = caseStudy.status === "demo";

  return (
    <figure className="rounded-xl border border-line bg-panel p-4 sm:p-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <figcaption className="font-serif text-lg text-ink">Before / after comparison</figcaption>
        <div role="radiogroup" aria-label="Choose year" className="inline-flex rounded-full border border-line bg-night p-1">
          {years.map((y) => (
            <button
              key={y}
              type="button"
              role="radio"
              aria-checked={year === y}
              onClick={() => setYear(y)}
              className={`rounded-full px-4 py-1 text-sm transition-colors ${
                year === y ? "bg-glow font-semibold text-night" : "text-ink-soft hover:text-ink"
              }`}
            >
              {y}
            </button>
          ))}
        </div>
      </div>

      {isDemo && (
        <p className="mt-3 rounded-md border border-dashed border-demo/70 bg-demo/10 px-3 py-2 text-xs font-semibold text-demo">
          {comparison.note}
        </p>
      )}

      <div
        className={`mt-4 grid gap-4 ${
          grid[0].length > grid.length ? "" : "sm:grid-cols-[minmax(0,1fr)_auto]"
        }`}
      >
        <div
          className={`relative mx-auto w-full overflow-hidden rounded-md border border-line ${
            grid[0].length > grid.length ? "" : "max-w-sm"
          }`}
          style={{ aspectRatio: `${grid[0].length} / ${grid.length}` }}
          role="img"
          aria-label={`Grid of ${grid.length} by ${grid[0].length} cells for ${year}. Mean cell value ${mean.toFixed(
            1,
          )}. ${isDemo ? "Illustrative values only." : ""}`}
        >
          <div
            className="grid h-full w-full"
            style={{ gridTemplateColumns: `repeat(${grid[0].length}, minmax(0, 1fr))` }}
          >
            {grid.flat().map((v, i) => (
              <div
                key={i}
                title={`${v.toFixed(1)}`}
                className="border-[0.5px] border-night/60 transition-colors duration-500"
                style={{ backgroundColor: cellColor(v, max) }}
              />
            ))}
          </div>
          <span className="absolute bottom-1.5 left-1.5 rounded bg-night/80 px-1.5 py-0.5 font-mono text-[10px] text-ink-soft">
            {year}
          </span>
        </div>

        <div
          className={`gap-4 text-xs text-muted ${
            grid[0].length > grid.length ? "grid grid-cols-2 sm:grid-cols-4" : "flex flex-col sm:w-40"
          }`}
        >
          <div>
            <p className="text-ink-soft">Value scale</p>
            <div
              aria-hidden
              className="mt-1.5 h-2.5 w-full rounded-sm"
              style={{
                background: `linear-gradient(to right, ${[0, 0.25, 0.5, 0.75, 1].map((t) => cellColor(t * max, max)).join(",")})`,
              }}
            />
            <div className="mt-1 flex justify-between font-mono">
              <span>0</span>
              <span>{max.toFixed(1)}</span>
            </div>
            <p className="mt-1">{caseStudy.dataset.unit ?? "Unit not specified"}</p>
          </div>
          <div>
            <p className="text-ink-soft">Spatial scale</p>
            <div className="mt-1.5 flex items-center gap-2">
              <span aria-hidden className="inline-block h-3 w-3 border border-ink-soft" />
              <span>{comparison.cellSizeLabel}</span>
            </div>
          </div>
          <div>
            <p className="text-ink-soft">Area mean ({year})</p>
            <p className="font-mono text-base text-ink">{mean.toFixed(2)}</p>
          </div>
          <div>
            <p className="text-ink-soft">Source</p>
            <p>{isDemo ? "Demo values in data/case-study.json — not from the provider" : caseStudy.dataset.provider}</p>
          </div>
        </div>
      </div>
    </figure>
  );
}
