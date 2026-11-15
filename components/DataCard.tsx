import { ExternalLink } from "lucide-react";
import type { CaseStudy } from "@/types/observatory";
import { LayerTag } from "./KnowledgeLayers";

export const CANNOT_TELL =
  "A night-light value does not directly measure income, access to public services, safety, dignity, local priorities, or a complete definition of development.";

export default function DataCard({ caseStudy }: { caseStudy: CaseStudy }) {
  const { dataset, period, coverage, limitations } = caseStudy;
  const rows: Array<[string, React.ReactNode]> = [
    ["Source / provider", dataset.provider],
    [
      "Dataset / product",
      <a key="p" href={dataset.productUrl} className="inline-flex items-start gap-1 text-glow underline hover:text-ink">
        {dataset.name}
        <ExternalLink aria-hidden className="mt-1 h-3.5 w-3.5 shrink-0" />
        <span className="sr-only">(external link)</span>
      </a>,
    ],
    ["Sensor", dataset.sensor],
    ["Spatial resolution", dataset.resolution],
    ["Date range", `${period.start}–${period.end}`],
    ["Unit", dataset.unit ?? "Not specified"],
    ["Temporal aggregation", dataset.temporalAggregation],
    ["Processing", dataset.processingSummary],
    ["Coverage / valid observations", coverage.validObservationNote ?? coverage.explanation],
    ["Licence", dataset.license ?? "Not specified"],
  ];

  return (
    <section aria-labelledby="datacard-heading" className="rounded-xl border border-line bg-panel p-5">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 id="datacard-heading" className="text-xl text-ink">
          How this observation was made
        </h2>
        <LayerTag layer="processing" />
      </div>
      <dl className="mt-4 divide-y divide-line/60 text-sm">
        {rows.map(([k, v]) => (
          <div key={k} className="grid gap-0.5 py-2.5">
            <dt className="text-xs uppercase tracking-wide text-muted">{k}</dt>
            <dd className="text-ink-soft">{v}</dd>
          </div>
        ))}
      </dl>

      <h3 className="mt-5 font-sans text-sm font-semibold uppercase tracking-wider text-muted">Known limits</h3>
      <ul className="mt-2 list-disc space-y-1.5 pl-5 text-sm text-ink-soft marker:text-glow-dim">
        {limitations.map((l) => (
          <li key={l} className={l.startsWith("Demo content") ? "font-semibold text-demo" : ""}>
            {l}
          </li>
        ))}
      </ul>

      <div className="mt-5 rounded-lg border border-glow/40 bg-night p-4">
        <h3 className="flex items-center gap-2 font-serif text-lg text-glow">What this cannot tell us</h3>
        <p className="mt-1 text-sm text-ink">{CANNOT_TELL}</p>
      </div>
    </section>
  );
}
