import { Gauge, Lightbulb, MessageSquareQuote, CircleHelp, Cog } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type LayerKey = "measurement" | "processing" | "interpretation" | "context" | "question";

export const layers: Record<
  LayerKey,
  { label: string; meaning: string; example: string; Icon: LucideIcon; tone: string }
> = {
  measurement: {
    label: "Measurement",
    meaning: "What the satellite product records.",
    example: "“Average radiance increased over the selected period.”",
    Icon: Gauge,
    tone: "text-glow border-glow/50",
  },
  processing: {
    label: "Processing",
    meaning: "How raw observation becomes a usable data product.",
    example: "“Nightly passes were screened for cloud and combined into one value per year.”",
    Icon: Cog,
    tone: "text-sky border-sky/50",
  },
  interpretation: {
    label: "Interpretation",
    meaning: "A possible explanation of the observed pattern.",
    example: "“This may reflect changed electrification or construction.”",
    Icon: Lightbulb,
    tone: "text-lilac border-lilac/50 border-dashed",
  },
  context: {
    label: "Situated context",
    meaning: "What people familiar with a place may know or experience.",
    example: "“A contributor reports repeated power cuts.”",
    Icon: MessageSquareQuote,
    tone: "text-teal border-teal/50",
  },
  question: {
    label: "Question / absence",
    meaning: "What cannot be established from available data.",
    example: "“Does this map capture access to essential services?”",
    Icon: CircleHelp,
    tone: "text-ink-soft border-muted/60 border-dotted",
  },
};

export function LayerTag({ layer }: { layer: LayerKey }) {
  const { label, Icon, tone } = layers[layer];
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border bg-night px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wide ${tone}`}
    >
      <Icon aria-hidden className="h-3.5 w-3.5" />
      {label}
    </span>
  );
}

export default function KnowledgeLayers() {
  const keys = Object.keys(layers) as LayerKey[];
  return (
    <section aria-labelledby="layers-heading">
      <h2 id="layers-heading" className="text-2xl sm:text-3xl">
        Five kinds of knowledge, kept apart
      </h2>
      <p className="mt-2 max-w-2xl text-ink-soft">
        Each statement in this observatory carries one of these labels. They are never merged into a single truth or
        confidence score.
      </p>
      <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        {keys.map((k) => {
          const { meaning, example } = layers[k];
          return (
            <li key={k} className="rounded-xl border border-line bg-panel p-4">
              <LayerTag layer={k} />
              <p className="mt-3 text-sm text-ink">{meaning}</p>
              <p className="mt-2 font-serif text-sm italic text-muted">{example}</p>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
