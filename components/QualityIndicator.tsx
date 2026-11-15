import type { CaseStudy, QualityLevel } from "@/types/observatory";

export const qualityText: Record<QualityLevel, { label: string; meaning: string }> = {
  high: {
    label: "High",
    meaning: "Enough valid night-time observations support this value to compare it with other years.",
  },
  limited: {
    label: "Limited",
    meaning:
      "Fewer valid observations (for example, many cloudy nights) support this value. Compare with care.",
  },
  unknown: {
    label: "Unknown",
    meaning: "There is no usable value, or coverage information is not available.",
  },
};

/** Shape + text, never colour alone: filled = high, half = limited, hollow = unknown. */
export function QualityGlyph({ level, size = 12 }: { level: QualityLevel; size?: number }) {
  const r = size / 2 - 1;
  const c = size / 2;
  return (
    <svg aria-hidden width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="shrink-0">
      {level === "high" && <circle cx={c} cy={c} r={r} fill="var(--color-glow)" />}
      {level === "limited" && (
        <>
          <circle cx={c} cy={c} r={r} fill="none" stroke="var(--color-sky)" strokeWidth="1.5" />
          <path d={`M ${c} ${c - r} A ${r} ${r} 0 0 0 ${c} ${c + r} Z`} fill="var(--color-sky)" />
        </>
      )}
      {level === "unknown" && (
        <circle cx={c} cy={c} r={r} fill="none" stroke="var(--color-muted)" strokeWidth="1.5" strokeDasharray="2 2" />
      )}
    </svg>
  );
}

export function QualityBadge({ level }: { level: QualityLevel }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-line bg-night px-2.5 py-0.5 text-sm">
      <QualityGlyph level={level} />
      {qualityText[level].label}
    </span>
  );
}

export default function QualityIndicator({ coverage }: { coverage: CaseStudy["coverage"] }) {
  return (
    <section aria-labelledby="quality-heading" className="rounded-xl border border-line bg-panel p-5">
      <h2 id="quality-heading" className="text-sm font-sans font-semibold uppercase tracking-wider text-muted">
        Data quality for this view
      </h2>
      <div className="mt-3 flex items-center gap-3">
        <span className="inline-flex items-center gap-2 font-serif text-2xl text-ink">
          <QualityGlyph level={coverage.level} size={18} />
          {qualityText[coverage.level].label}
        </span>
      </div>
      <p className="mt-2 text-sm text-ink-soft">{qualityText[coverage.level].meaning}</p>
      <p className="mt-2 text-sm text-ink-soft">{coverage.explanation}</p>
      <p className="mt-3 rounded-md border-l-2 border-glow bg-night/60 px-3 py-2 text-sm text-ink">
        An annual composite can conceal short-term changes — outages, festivals, seasonal work, or a single bad month.
      </p>
      <dl className="mt-4 space-y-1.5 text-xs text-muted">
        {(Object.keys(qualityText) as QualityLevel[]).map((k) => (
          <div key={k} className="flex items-start gap-2">
            <dt className="flex w-20 shrink-0 items-center gap-1.5 text-ink-soft">
              <QualityGlyph level={k} /> {qualityText[k].label}
            </dt>
            <dd>{qualityText[k].meaning}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
