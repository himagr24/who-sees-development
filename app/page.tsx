import Link from "next/link";
import { Eye, SearchCode, CircleHelp, MessageSquarePlus, Scale } from "lucide-react";
import Hero from "@/components/Hero";
import KnowledgeLayers from "@/components/KnowledgeLayers";

const steps = [
  { label: "Observe", text: "See how recorded night-time light changed in one area.", Icon: Eye },
  { label: "Inspect", text: "Find the sensor, resolution, processing, coverage and limits.", Icon: SearchCode },
  { label: "Question", text: "Follow each step from sensor to decision, and what it assumes.", Icon: CircleHelp },
  { label: "Add context", text: "Offer a question or context the image cannot supply.", Icon: MessageSquarePlus },
  { label: "Decide what remains unknown", text: "Leave with an honest record of what is still open.", Icon: Scale },
];

export default function Home() {
  return (
    <>
      <Hero />

      <section aria-labelledby="journey-heading" className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <h2 id="journey-heading" className="text-2xl sm:text-3xl">
          A journey in five steps
        </h2>
        <ol className="mt-8 grid gap-4 md:grid-cols-5">
          {steps.map(({ label, text, Icon }, i) => (
            <li key={label} className="relative rounded-xl border border-line bg-panel p-5">
              <span className="font-mono text-xs text-muted">0{i + 1}</span>
              <Icon aria-hidden className="mt-2 h-5 w-5 text-glow" />
              <p className="mt-3 font-serif text-lg text-ink">{label}</p>
              <p className="mt-1 text-sm text-ink-soft">{text}</p>
              {i < steps.length - 1 && (
                <span aria-hidden className="absolute -right-3 top-1/2 hidden -translate-y-1/2 text-muted md:block">
                  →
                </span>
              )}
            </li>
          ))}
        </ol>
      </section>

      <section className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid gap-8 rounded-2xl border border-line bg-night-2 p-6 sm:p-10 md:grid-cols-[1.2fr_1fr]">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-glow">The central principle</p>
            <p className="mt-3 font-serif text-3xl text-ink sm:text-4xl">
              A satellite observation is not the phenomenon it is used to describe.
            </p>
          </div>
          <div className="space-y-4 text-ink-soft">
            <p>
              Night-time light is often treated as a stand-in for economic activity, electrification, or “development.”
              It can reveal broad patterns. But a brighter pixel does not explain why a place changed, or what that
              change means for the people who live there.
            </p>
            <p>
              This prototype works through one case study. It does not score communities, predict poverty, or
              recommend where anyone should invest.
            </p>
            <Link href="/explore" className="inline-block text-glow underline hover:text-ink">
              Start with what the data shows →
            </Link>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <KnowledgeLayers />
      </div>
    </>
  );
}
