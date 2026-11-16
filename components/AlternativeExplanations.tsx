import { ExternalLink, Search, Database, BookCheck, CircleDashed } from "lucide-react";
import type { EvidenceLabel, Explanation } from "@/types/observatory";
import { LayerTag } from "./KnowledgeLayers";

const evidence: Record<EvidenceLabel, { label: string; Icon: typeof Search; tone: string }> = {
  supported_by_source: { label: "Supported by a linked source", Icon: BookCheck, tone: "text-teal border-teal/50" },
  local_investigation: { label: "Question for local investigation", Icon: Search, tone: "text-lilac border-lilac/50" },
  data_consideration: { label: "Data consideration", Icon: Database, tone: "text-sky border-sky/50" },
  not_tested: { label: "Not tested in this prototype", Icon: CircleDashed, tone: "text-muted border-muted/50" },
};

export default function AlternativeExplanations({ items }: { items: Explanation[] }) {
  return (
    <section id="explanations" aria-labelledby="alt-heading" className="scroll-mt-24">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 id="alt-heading" className="text-3xl text-ink">
            More than one story can fit the same signal
          </h2>
          <p className="mt-2 max-w-2xl text-ink-soft">
            These are prompts for investigation, not conclusions about this place. None is ranked, and more than one
            may be true at once.
          </p>
        </div>
        <LayerTag layer="interpretation" />
      </div>
      <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((x) => {
          const ev = evidence[x.evidence];
          return (
            <li key={x.id} className="flex flex-col rounded-xl border border-dashed border-line bg-panel p-5">
              <span
                className={`inline-flex w-fit items-center gap-1.5 rounded-full border bg-night px-2.5 py-0.5 text-xs ${ev.tone}`}
              >
                <ev.Icon aria-hidden className="h-3.5 w-3.5" />
                {ev.label}
              </span>
              <h3 className="mt-3 text-lg text-ink">{x.title}</h3>
              <p className="mt-1.5 text-sm text-ink-soft">{x.description}</p>
              <p className="mt-auto pt-4 text-sm text-ink">
                <span className="text-muted">To investigate: </span>
                {x.investigate}
              </p>
              {x.evidenceNote && <p className="mt-3 text-xs text-muted">{x.evidenceNote}</p>}
              {x.citations && x.citations.length > 0 && (
                <ul className="mt-2 space-y-1">
                  {x.citations.map((c) => (
                    <li key={c.url}>
                      <a href={c.url} className="inline-flex items-start gap-1 text-xs text-glow underline hover:text-ink">
                        {c.label} <ExternalLink aria-hidden className="mt-0.5 h-3 w-3 shrink-0" />
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          );
        })}
      </ul>
    </section>
  );
}
