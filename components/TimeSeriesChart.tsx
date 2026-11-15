"use client";

import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  type TooltipContentProps,
} from "recharts";
import type { CaseStudy, QualityLevel } from "@/types/observatory";
import { QualityGlyph, qualityText } from "./QualityIndicator";

type Point = CaseStudy["series"][number];

function Dot(props: { cx?: number; cy?: number; payload?: Point }) {
  const { cx, cy, payload } = props;
  if (cx == null || cy == null || !payload || payload.value == null) return null;
  const q = payload.quality;
  if (q === "high") return <circle cx={cx} cy={cy} r={5} fill="var(--color-glow)" stroke="var(--color-night)" strokeWidth={2} />;
  if (q === "limited")
    return (
      <g>
        <circle cx={cx} cy={cy} r={5.5} fill="var(--color-night)" stroke="var(--color-sky)" strokeWidth={2} />
        <path d={`M ${cx} ${cy - 5.5} A 5.5 5.5 0 0 0 ${cx} ${cy + 5.5} Z`} fill="var(--color-sky)" />
      </g>
    );
  return <circle cx={cx} cy={cy} r={5} fill="none" stroke="var(--color-muted)" strokeDasharray="2 2" strokeWidth={1.5} />;
}

function ChartTooltip({ active, payload }: Partial<TooltipContentProps<number, string>>) {
  if (!active || !payload?.length) return null;
  const p = payload[0].payload as Point;
  return (
    <div className="rounded-md border border-line bg-night px-3 py-2 text-sm shadow-lg">
      <p className="font-mono text-ink">{p.year}</p>
      <p className="text-ink-soft">Value: {p.value == null ? "no usable value" : p.value.toFixed(1)}</p>
      <p className="flex items-center gap-1.5 text-ink-soft">
        <QualityGlyph level={p.quality} /> Coverage: {qualityText[p.quality].label}
      </p>
    </div>
  );
}

export default function TimeSeriesChart({ caseStudy }: { caseStudy: CaseStudy }) {
  const { series, dataset, status } = caseStudy;
  const missing = series.filter((s) => s.value == null);

  return (
    <figure className="rounded-xl border border-line bg-panel p-4 sm:p-5">
      <figcaption className="flex flex-wrap items-baseline justify-between gap-2">
        <span className="font-serif text-lg text-ink">Average radiance by year</span>
        <span className="text-xs text-muted">{dataset.unit ?? "Unit not specified"}</span>
      </figcaption>
      {status === "demo" && (
        <p className="mt-2 text-xs font-semibold text-demo">Demo values — not drawn from the source product.</p>
      )}

      <div className="mt-4 h-64 w-full" aria-hidden>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={series} margin={{ top: 10, right: 12, bottom: 0, left: -12 }}>
            <CartesianGrid stroke="var(--color-line)" strokeDasharray="3 4" vertical={false} />
            <XAxis
              dataKey="year"
              tick={{ fill: "var(--color-muted)", fontSize: 12 }}
              tickLine={false}
              axisLine={{ stroke: "var(--color-line)" }}
            />
            <YAxis
              tick={{ fill: "var(--color-muted)", fontSize: 12 }}
              tickLine={false}
              axisLine={false}
              domain={[0, "auto"]}
            />
            <Tooltip content={<ChartTooltip />} cursor={{ stroke: "var(--color-glow-dim)" }} />
            <Line
              type="linear"
              dataKey="value"
              stroke="var(--color-glow-soft)"
              strokeWidth={2}
              connectNulls={false}
              dot={<Dot />}
              activeDot={{ r: 7, fill: "var(--color-ink)" }}
              isAnimationActive={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted">
        {(["high", "limited", "unknown"] as QualityLevel[]).map((q) => (
          <span key={q} className="inline-flex items-center gap-1.5">
            <QualityGlyph level={q} /> {qualityText[q].label} coverage
          </span>
        ))}
      </div>
      {missing.length > 0 && (
        <p className="mt-2 text-xs text-muted">
          Gap in the line: {missing.map((m) => m.year).join(", ")} — no usable value.
        </p>
      )}

      <details className="mt-4 rounded-md border border-line bg-night/50 text-sm">
        <summary className="cursor-pointer px-3 py-2 text-ink-soft hover:text-ink">Show as a table</summary>
        <div className="overflow-x-auto px-3 pb-3">
          <table className="w-full text-left">
            <caption className="sr-only">Average radiance by year, with coverage label</caption>
            <thead className="text-xs uppercase tracking-wide text-muted">
              <tr>
                <th scope="col" className="py-1.5 pr-4 font-normal">Year</th>
                <th scope="col" className="py-1.5 pr-4 font-normal">Value</th>
                <th scope="col" className="py-1.5 font-normal">Coverage</th>
              </tr>
            </thead>
            <tbody className="font-mono">
              {series.map((s) => (
                <tr key={s.year} className="border-t border-line/60">
                  <td className="py-1.5 pr-4">{s.year}</td>
                  <td className="py-1.5 pr-4">{s.value == null ? "—" : s.value.toFixed(1)}</td>
                  <td className="py-1.5 font-sans">
                    <span className="inline-flex items-center gap-1.5">
                      <QualityGlyph level={s.quality} /> {qualityText[s.quality].label}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </details>
    </figure>
  );
}
