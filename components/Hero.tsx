import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-line/60">
      <div aria-hidden className="grid-lines absolute inset-0" />
      <div aria-hidden className="night-field twinkle absolute inset-0" />
      {/* Horizon curve — an Earth-at-night motif, drawn rather than imaged */}
      <svg
        aria-hidden
        className="absolute -bottom-40 left-1/2 w-[160%] max-w-none -translate-x-1/2 opacity-70 sm:w-[120%]"
        viewBox="0 0 1200 400"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="limb" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0" stopColor="#9dbbe0" stopOpacity="0.35" />
            <stop offset="0.15" stopColor="#141c31" stopOpacity="0.9" />
            <stop offset="1" stopColor="#0a0f1d" />
          </linearGradient>
        </defs>
        <ellipse cx="600" cy="420" rx="780" ry="300" fill="url(#limb)" />
        {[
          [430, 190, 2.2],
          [470, 205, 1.4],
          [520, 175, 2.8],
          [555, 198, 1.2],
          [610, 182, 3.2],
          [640, 210, 1.6],
          [700, 190, 2.0],
          [760, 214, 1.3],
          [820, 200, 2.4],
          [360, 220, 1.4],
          [300, 240, 1.1],
          [880, 232, 1.2],
        ].map(([x, y, r], i) => (
          <circle key={i} cx={x} cy={y} r={r} fill="#f3c46b" opacity={0.85} />
        ))}
      </svg>

      <div className="relative mx-auto max-w-6xl px-4 pb-28 pt-16 sm:px-6 sm:pt-24 md:pb-40">
        <p className="text-sm uppercase tracking-[0.2em] text-glow">A participatory satellite-data observatory</p>
        <h1 className="mt-4 max-w-4xl text-4xl text-ink sm:text-6xl md:text-7xl">
          What does a brighter place mean—<span className="text-glow">and who gets to decide?</span>
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-ink-soft sm:text-xl">
          Satellites can reveal changing patterns of light at night. Those patterns are often used to infer change on
          the ground. This observatory makes the journey from measurement to interpretation visible—and leaves room for
          the context that data alone cannot provide.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/explore"
            className="inline-flex items-center gap-2 rounded-full bg-glow px-5 py-3 font-semibold text-night no-underline hover:bg-ink"
          >
            Explore the case study <ArrowRight aria-hidden className="h-4 w-4" />
          </Link>
          <Link
            href="/methodology"
            className="inline-flex items-center gap-2 rounded-full border border-line bg-night/60 px-5 py-3 text-ink no-underline hover:border-glow hover:text-glow"
          >
            How the observatory works
          </Link>
        </div>
      </div>
    </section>
  );
}
