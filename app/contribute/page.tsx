import type { Metadata } from "next";
import ContributionForm from "@/components/ContributionForm";
import GovernanceNote from "@/components/GovernanceNote";
import { IllustrativeBadge } from "@/components/StatusBadge";
import { LayerTag, type LayerKey } from "@/components/KnowledgeLayers";
import { exampleContributions } from "@/lib/data";
import type { Contribution } from "@/types/observatory";

export const metadata: Metadata = {
  title: "Add a question or context — Who Sees Development?",
};

const categoryLayer: Record<Contribution["category"], LayerKey> = {
  local_context: "context",
  question: "question",
  alternative_explanation: "interpretation",
  data_concern: "question",
};

const categoryLabel: Record<Contribution["category"], string> = {
  local_context: "Local context",
  question: "Question",
  alternative_explanation: "Alternative explanation",
  data_concern: "Data concern",
};

const visibilityLabel: Record<Contribution["visibility"], string> = {
  public: "Public after review",
  facilitators_only: "Facilitators only",
  not_published: "Not published",
};

const statusLabel: Record<Contribution["evidenceStatus"], string> = {
  unreviewed: "Unreviewed — not a fact",
  community_reviewed: "Community reviewed",
  evidence_linked: "Evidence linked",
};

export default function ContributePage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
      <header className="max-w-3xl">
        <p className="text-sm uppercase tracking-[0.2em] text-glow">Add a question or context</p>
        <h1 className="mt-2 text-3xl text-ink sm:text-5xl">What can the image not tell us?</h1>
        <p className="mt-4 text-lg text-ink-soft">
          A satellite image cannot speak for a place. This space is for questions, context, and concerns that the image
          alone cannot provide. Contributions are not automatically treated as facts or published by default.
        </p>
      </header>

      <div className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]">
        <ContributionForm />
        <div className="space-y-6">
          <GovernanceNote />
          <div className="rounded-xl border border-line bg-panel p-5 text-sm text-ink-soft">
            <h2 className="font-serif text-lg text-ink">Why these choices?</h2>
            <ul className="mt-2 list-disc space-y-1.5 pl-5 marker:text-glow-dim">
              <li>Approximate area only, because exact locations can expose people.</li>
              <li>Nothing public by default, because local knowledge should stay governed by the people it comes from.</li>
              <li>Your role is shown, because a visitor&rsquo;s reading and a resident&rsquo;s account carry different authority.</li>
              <li>Unreviewed contributions are never presented as fact.</li>
              <li>Contributions are not used to train a model.</li>
            </ul>
          </div>
        </div>
      </div>

      <section aria-labelledby="examples-heading" className="mt-16">
        <h2 id="examples-heading" className="text-3xl text-ink">
          See example contributions
        </h2>
        <p className="mt-2 max-w-2xl text-ink-soft">
          These examples were written for this prototype to show how different kinds of contribution would be labelled.
          They are not real accounts from any person or place. In a real deployment, contributions marked
          &ldquo;Facilitators only&rdquo; or &ldquo;Not published&rdquo; would never appear on a public page.
        </p>
        <ul className="mt-6 grid gap-4 md:grid-cols-2">
          {exampleContributions.map((c) => (
            <li key={c.id} className="rounded-xl border border-dashed border-demo/50 bg-panel p-5">
              <div className="flex flex-wrap items-center gap-2">
                {c.isIllustrative && <IllustrativeBadge />}
                <LayerTag layer={categoryLayer[c.category]} />
              </div>
              <p className="mt-3 font-serif text-lg text-ink">“{c.text}”</p>
              <dl className="mt-4 grid grid-cols-2 gap-x-4 gap-y-1 text-xs">
                <dt className="text-muted">Type</dt>
                <dd className="text-ink-soft">{categoryLabel[c.category]}</dd>
                <dt className="text-muted">Contributor role</dt>
                <dd className="text-ink-soft capitalize">{c.contributorRole ?? "Not given"}</dd>
                <dt className="text-muted">Location</dt>
                <dd className="text-ink-soft">{c.locationPrecision === "none" ? "None" : "Approximate area"}</dd>
                <dt className="text-muted">Visibility</dt>
                <dd className="text-ink-soft">{visibilityLabel[c.visibility]}</dd>
                <dt className="text-muted">Status</dt>
                <dd className="text-ink-soft">{statusLabel[c.evidenceStatus]}</dd>
              </dl>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
