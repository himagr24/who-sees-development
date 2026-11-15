"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { BookOpenCheck, HelpCircle, EyeOff, Users } from "lucide-react";
import type { ChainStep } from "@/types/observatory";

const facets = [
  { key: "known", label: "What is known", Icon: BookOpenCheck },
  { key: "assumed", label: "What is assumed", Icon: HelpCircle },
  { key: "lost", label: "What may be lost", Icon: EyeOff },
  { key: "whoCanQuestion", label: "Who can question this", Icon: Users },
] as const;

export default function InferenceChain({ steps }: { steps: ChainStep[] }) {
  const [active, setActive] = useState(0);
  const tabs = useRef<Array<HTMLButtonElement | null>>([]);
  const step = steps[active];
  const isLast = active === steps.length - 1;

  function onKey(e: React.KeyboardEvent, i: number) {
    let next = i;
    if (e.key === "ArrowDown" || e.key === "ArrowRight") next = (i + 1) % steps.length;
    else if (e.key === "ArrowUp" || e.key === "ArrowLeft") next = (i - 1 + steps.length) % steps.length;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = steps.length - 1;
    else return;
    e.preventDefault();
    setActive(next);
    tabs.current[next]?.focus();
  }

  return (
    <section
      id="inference-chain"
      aria-labelledby="chain-heading"
      className="relative overflow-hidden rounded-2xl border border-glow/30 bg-night-2 p-5 sm:p-8"
    >
      <div aria-hidden className="grid-lines absolute inset-0 opacity-60" />
      <div className="relative">
        <p className="text-sm uppercase tracking-[0.2em] text-glow">The heart of the observatory</p>
        <h2 id="chain-heading" className="mt-2 text-3xl text-ink sm:text-4xl">
          How a signal becomes a decision
        </h2>
        <p className="mt-2 max-w-2xl text-ink-soft">
          Every claim about a place travels through these steps. Select a step to see what is known, what is assumed,
          what may be lost, and who can question it.{" "}
          <Link href="/methodology" className="text-glow underline hover:text-ink">
            Read the full methodology
          </Link>
          .
        </p>

        <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,22rem)_1fr]">
          <div role="tablist" aria-orientation="vertical" aria-label="Steps from sensor to decision" className="flex flex-col">
            {steps.map((s, i) => {
              const selected = i === active;
              return (
                <div key={s.id} className="flex flex-col items-stretch">
                  <button
                    ref={(el) => {
                      tabs.current[i] = el;
                    }}
                    role="tab"
                    id={`chain-tab-${s.id}`}
                    aria-selected={selected}
                    aria-controls="chain-panel"
                    tabIndex={selected ? 0 : -1}
                    onClick={() => setActive(i)}
                    onKeyDown={(e) => onKey(e, i)}
                    className={`group flex items-center gap-3 rounded-lg border px-4 py-3 text-left transition-colors ${
                      selected
                        ? "border-glow bg-panel-2 text-ink shadow-[0_0_24px_-8px_rgba(243,196,107,0.6)]"
                        : "border-line bg-panel text-ink-soft hover:border-glow/50 hover:text-ink"
                    }`}
                  >
                    <span
                      className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border font-mono text-xs ${
                        selected ? "border-glow bg-glow text-night" : "border-line text-muted"
                      }`}
                    >
                      {i + 1}
                    </span>
                    <span>
                      <span className="block font-serif text-base">{s.label}</span>
                      <span className="block text-xs text-muted">{s.short}</span>
                    </span>
                  </button>
                  {i < steps.length - 1 && (
                    <span aria-hidden className="mx-auto h-4 w-px bg-line" />
                  )}
                </div>
              );
            })}
          </div>

          <div
            id="chain-panel"
            role="tabpanel"
            aria-labelledby={`chain-tab-${step.id}`}
            tabIndex={0}
            className="rounded-xl border border-line bg-panel p-5 sm:p-6"
          >
            <p className="font-mono text-xs text-muted">
              Step {active + 1} of {steps.length}
            </p>
            <h3 className="mt-1 text-2xl text-ink">{step.label}</h3>
            <dl className="mt-5 grid gap-4 sm:grid-cols-2">
              {facets.map(({ key, label, Icon }) => (
                <div key={key} className="rounded-lg border border-line/70 bg-night/60 p-4">
                  <dt className="flex items-center gap-2 text-sm font-semibold text-glow">
                    <Icon aria-hidden className="h-4 w-4" /> {label}
                  </dt>
                  <dd className="mt-1.5 text-sm text-ink-soft">{step[key]}</dd>
                </div>
              ))}
            </dl>
            {isLast && (
              <p className="mt-5 rounded-lg border-2 border-glow/60 bg-night p-4 font-serif text-lg text-ink">
                This observatory does not recommend an action. It makes the assumptions before an action visible.
              </p>
            )}
            {isLast && (
              <p className="mt-3 text-sm text-ink-soft">
                What could people do with this observation? That question belongs to the people the observation is
                about — not to this software.
              </p>
            )}
            <div className="mt-5 flex justify-between gap-2 text-sm">
              <button
                type="button"
                disabled={active === 0}
                onClick={() => setActive(active - 1)}
                className="rounded-full border border-line px-3 py-1.5 text-ink-soft hover:border-glow hover:text-ink disabled:opacity-40"
              >
                ← Previous step
              </button>
              <button
                type="button"
                disabled={isLast}
                onClick={() => setActive(active + 1)}
                className="rounded-full border border-line px-3 py-1.5 text-ink-soft hover:border-glow hover:text-ink disabled:opacity-40"
              >
                Next step →
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
