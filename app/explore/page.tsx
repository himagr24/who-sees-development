import type { Metadata } from "next";
import Link from "next/link";
import { MapPin } from "lucide-react";
import { caseStudy, chainSteps, explanations } from "@/lib/data";
import StatusBadge from "@/components/StatusBadge";
import SignalExplorer from "@/components/SignalExplorer";
import TimeSeriesChart from "@/components/TimeSeriesChart";
import QualityIndicator from "@/components/QualityIndicator";
import DataCard from "@/components/DataCard";
import InferenceChain from "@/components/InferenceChain";
import AlternativeExplanations from "@/components/AlternativeExplanations";
import { LayerTag } from "@/components/KnowledgeLayers";
import SourceList from "@/components/SourceList";

export const metadata: Metadata = {
  title: "Case study — Who Sees Development?",
};

const nextQuestions = [
  "Observed signal",
  "What could explain it?",
  "What information is missing?",
  "Who should interpret or investigate it?",
  "What should happen next?",
];

export default function ExplorePage() {
  const cs = caseStudy;
  const isDemo = cs.status === "demo";

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
      <StatusBadge status={cs.status} />

      <div className="mt-6 grid gap-8 lg:grid-cols-[minmax(0,1.55fr)_minmax(0,1fr)]">
        {/* Left column */}
        <div className="space-y-6">
          <header>
            <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted">
              <span className="inline-flex items-center gap-1.5">
                <MapPin aria-hidden className="h-4 w-4" />
                {cs.placeName} · {cs.country}
              </span>
              <span>
                {cs.period.start}–{cs.period.end}
              </span>
              {!isDemo && (
                <span className="font-mono text-xs">
                  approx. {cs.coordinates.lat.toFixed(1)}°, {cs.coordinates.lng.toFixed(1)}°
                </span>
              )}
            </p>
            <h1 className="mt-2 text-3xl text-ink sm:text-5xl">{cs.title}</h1>
            <p className="mt-4 font-serif text-xl text-ink-soft">{cs.question}</p>
            <p className="mt-3 text-ink-soft">{cs.summary}</p>
          </header>

          <section aria-labelledby="shows-heading" className="rounded-xl border border-glow/40 bg-panel p-5 sm:p-6">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h2 id="shows-heading" className="text-2xl text-ink">
                What the data shows
              </h2>
              <LayerTag layer="measurement" />
            </div>
            <p className="mt-3 text-lg text-ink">{cs.observedChange.statement}</p>
            <p className="mt-3 border-l-2 border-muted pl-3 text-ink-soft">{cs.observedChange.caveat}</p>
          </section>

          <TimeSeriesChart caseStudy={cs} />
          <SignalExplorer caseStudy={cs} />
        </div>

        {/* Right column */}
        <aside className="space-y-6" aria-label="Data quality and provenance">
          <QualityIndicator coverage={cs.coverage} />
          <DataCard caseStudy={cs} />
          <section aria-labelledby="prompt-heading" className="rounded-xl border border-line bg-night-2 p-5">
            <h2 id="prompt-heading" className="font-serif text-xl text-ink">
              What might this change mean? What might it hide?
            </h2>
            <div className="mt-4 flex flex-wrap gap-2">
              <a
                href="#explanations"
                className="rounded-full border border-line px-4 py-2 text-sm text-ink no-underline hover:border-glow hover:text-glow"
              >
                Alternative explanations
              </a>
              <Link
                href="/contribute"
                className="rounded-full bg-glow px-4 py-2 text-sm font-semibold text-night no-underline hover:bg-ink"
              >
                Add a question or context
              </Link>
            </div>
          </section>
        </aside>
      </div>

      <div className="mt-16">
        <InferenceChain steps={chainSteps} />
      </div>

      <div className="mt-16">
        <AlternativeExplanations items={explanations} />
      </div>

      <section aria-labelledby="next-heading" className="mt-16 rounded-2xl border border-line bg-panel p-6 sm:p-8">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h2 id="next-heading" className="text-2xl text-ink sm:text-3xl">
            Let people set the questions first
          </h2>
          <LayerTag layer="question" />
        </div>
        <p className="mt-2 max-w-2xl text-ink-soft">
          A useful community version would not ask people to validate a map. It would let them decide what the
          observation should help them understand.
        </p>
        <ol className="mt-6 flex flex-col gap-2 md:flex-row md:items-stretch">
          {nextQuestions.map((q, i) => (
            <li key={q} className="flex items-center gap-2 md:flex-1">
              <span className="flex-1 rounded-lg border border-line bg-night px-3 py-3 text-sm text-ink">
                <span className="mr-1.5 font-mono text-xs text-muted">{i + 1}</span>
                {q}
              </span>
              {i < nextQuestions.length - 1 && (
                <span aria-hidden className="text-muted">
                  <span className="md:hidden">↓</span>
                  <span className="hidden md:inline">→</span>
                </span>
              )}
            </li>
          ))}
        </ol>
        <div className="mt-6">
          <Link
            href="/contribute"
            className="inline-flex rounded-full bg-glow px-5 py-2.5 font-semibold text-night no-underline hover:bg-ink"
          >
            Add a question or context
          </Link>
        </div>
      </section>

      <div className="mt-16">
        <SourceList links={cs.sourceLinks} />
      </div>
    </div>
  );
}
