import type { Metadata } from "next";
import Link from "next/link";
import { Check, X } from "lucide-react";
import KnowledgeLayers from "@/components/KnowledgeLayers";
import SourceList from "@/components/SourceList";
import GovernanceNote from "@/components/GovernanceNote";
import { chainSteps } from "@/lib/data";
import { CANNOT_TELL } from "@/components/DataCard";

export const metadata: Metadata = {
  title: "How the observatory works — Who Sees Development?",
};

const references = [
  {
    label: "Mozilla Foundation Fellowship RFP and LAS host brief",
    url: "https://assets.mofoprod.net/network/documents/PUBLIC_2027_2028_Fellowship_RFP-2.pdf",
  },
  { label: "LAS Art Foundation — What we do", url: "https://www.las-art.foundation/what-we-do" },
  { label: "Earth Observation Group — VIIRS Nighttime Lights", url: "https://eogdata.mines.edu/products/vnl/" },
  {
    label: "NASA Black Marble User Guide (v1.2)",
    url: "https://viirsland.gsfc.nasa.gov/PDF/BlackMarbleUserGuide_v1.2_20210421.pdf",
  },
  {
    label: "Slough, Kopas & Urpelainen (2021) — Satellite-based deforestation alerts… community monitoring in the Peruvian Amazon. PNAS",
    url: "https://doi.org/10.1073/pnas.2015171118",
    note: "An alert alone is not enough: people need access, explanation, capacity, and authority to decide what happens next.",
  },
  {
    label: "Gill, Lantz & Gwich'in Social and Cultural Institute — A Community-Based Approach to Mapping Gwich'in Observations of Environmental Changes",
    url: "https://doi.org/10.2993/0278-0771-34.3.294",
    note: "Narratives, photos and place-based accounts are different from a satellite value.",
  },
  {
    label: "Reyes-García et al. (2022) — Data Sovereignty in Community-Based Environmental Monitoring. BioScience",
    url: "https://doi.org/10.1093/biosci/biac048",
    note: "Code can be open while local contributions remain controlled.",
  },
  {
    label: "Voisin, Doviaza & Quintero (2025) — Community-based monitoring in tropical environments. SESMO",
    url: "https://doi.org/10.18174/sesmo.18700",
    note: "Begin with what the map should help people understand, not “please validate our data.”",
  },
  {
    label: "Simmons et al. (2022) — Disaster, Infrastructure and Participatory Knowledge: The Planetary Response Network",
    url: "https://doi.org/10.5334/cstp.392",
    note: "Remote volunteers and local participants carry different authority.",
  },
  {
    label: "Remi et al. (2026) — From participation to data: collaborative mapping in the context of natural hazards and risks",
    url: "https://doi.org/10.1007/s11069-026-08485-z",
    note: "Access, connectivity and institutional support shape who can participate.",
  },
  {
    label: "Jhamb et al. (2025) — Shedding light on development: Leveraging the new nightlights data to measure economic progress",
    url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC11790135/",
    note: "Night lights predict some socioeconomic outcomes, imperfectly and unevenly across places.",
  },
  {
    label: "Gibson, Dykstra, Morten & Sandefur — Satellite Data for the Social Sciences: Measuring rural electrification and living standards in India",
    url: "https://eprints.lse.ac.uk/100823/1/Lights_DKU.pdf",
    note: "More useful for electrification and electricity use than for household living standards or poverty.",
  },
];

const isFor = [
  "Making an observation system inspectable: its source, scale, processing and uncertainty.",
  "Showing that one signal can support several explanations.",
  "Keeping measurement, interpretation, situated context and open questions apart.",
  "Producing an inspectable record of questions, limitations, and competing interpretations.",
];

const isNotFor = [
  "Classifying communities as poor, underdeveloped, wealthy, unsafe, or in need.",
  "Ranking places or recommending investments, services, or interventions.",
  "Making or automating decisions about a place.",
  "Collecting local knowledge to train a model.",
];

const commitments = [
  ["No forced exact location", "Contributors may give no location or a broad area. Map pins and coordinates are never requested."],
  ["No public-by-default contributions", "Each contributor chooses: public after review, facilitators only, or not published."],
  ["Clear status labels", "Demo data, illustrative examples, and unreviewed contributions are always marked as such."],
  ["Correction and withdrawal", "In a future deployed version, contributors would be able to review, correct, and withdraw their material."],
  ["No conflation of lived experience with measurement", "A local account and a radiance value are shown as different kinds of knowledge, never merged into a score."],
];

export default function MethodologyPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 sm:py-14">
      <p className="text-sm uppercase tracking-[0.2em] text-glow">How the observatory works</p>
      <h1 className="mt-2 text-3xl text-ink sm:text-5xl">Measurement is not meaning</h1>
      <p className="mt-4 text-lg text-ink-soft">
        In a previous project we worked on, night-time satellite imagery was used as one signal for changing patterns of
        development and service demand. The experience showed that such data can be useful for revealing broad
        patterns, but a brighter pixel does not explain why a place changed or what that change means for people who
        live there. This prototype grew from that gap.
      </p>

      <section aria-labelledby="for-heading" className="mt-12 grid gap-6 md:grid-cols-2">
        <div className="rounded-xl border border-line bg-panel p-5">
          <h2 id="for-heading" className="text-2xl text-ink">
            What this project is for
          </h2>
          <ul className="mt-3 space-y-2 text-sm text-ink-soft">
            {isFor.map((t) => (
              <li key={t} className="flex gap-2">
                <Check aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-teal" /> {t}
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-xl border border-line bg-panel p-5">
          <h2 className="text-2xl text-ink">What it is not for</h2>
          <ul className="mt-3 space-y-2 text-sm text-ink-soft">
            {isNotFor.map((t) => (
              <li key={t} className="flex gap-2">
                <X aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-demo" /> {t}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <p className="mt-6 rounded-lg border border-glow/40 bg-night-2 p-4 text-ink">{CANNOT_TELL}</p>

      <section aria-labelledby="chain-full-heading" className="mt-14">
        <h2 id="chain-full-heading" className="text-3xl text-ink">
          The inference chain, in full
        </h2>
        <p className="mt-2 text-ink-soft">
          The same six steps shown interactively in the{" "}
          <Link href="/explore#inference-chain" className="text-glow underline hover:text-ink">
            case study
          </Link>
          , laid out for reading or printing.
        </p>
        <ol className="mt-6 space-y-4">
          {chainSteps.map((s, i) => (
            <li key={s.id} className="rounded-xl border border-line bg-panel p-5">
              <h3 className="flex items-center gap-3 text-xl text-ink">
                <span className="flex h-7 w-7 items-center justify-center rounded-full border border-glow font-mono text-xs text-glow">
                  {i + 1}
                </span>
                {s.label}
              </h3>
              <dl className="mt-3 grid gap-3 text-sm sm:grid-cols-2">
                {(
                  [
                    ["What is known", s.known],
                    ["What is assumed", s.assumed],
                    ["What may be lost", s.lost],
                    ["Who can question this", s.whoCanQuestion],
                  ] as const
                ).map(([k, v]) => (
                  <div key={k}>
                    <dt className="font-semibold text-glow">{k}</dt>
                    <dd className="mt-0.5 text-ink-soft">{v}</dd>
                  </div>
                ))}
              </dl>
            </li>
          ))}
        </ol>
        <p className="mt-4 rounded-lg border-2 border-glow/60 bg-night p-4 font-serif text-lg text-ink">
          This observatory does not recommend an action. It makes the assumptions before an action visible.
        </p>
      </section>

      <div className="mt-14">
        <KnowledgeLayers />
      </div>

      <section aria-labelledby="care-heading" className="mt-14">
        <h2 id="care-heading" className="text-3xl text-ink">
          Data care commitments
        </h2>
        <dl className="mt-6 divide-y divide-line/60 rounded-xl border border-line bg-panel">
          {commitments.map(([k, v]) => (
            <div key={k} className="grid gap-1 p-4 sm:grid-cols-[14rem_1fr] sm:gap-4">
              <dt className="font-serif text-lg text-ink">{k}</dt>
              <dd className="text-sm text-ink-soft">{v}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section aria-labelledby="open-heading" className="mt-14">
        <h2 id="open-heading" className="text-3xl text-ink">
          Open work
        </h2>
        <p className="mt-3 text-ink-soft">
          The code, design notes, data-card template, and methodology are intended to be public. Sensitive context
          contributions would not automatically be open: openness of method and protection of local knowledge can
          coexist.
        </p>
        <div className="mt-6">
          <GovernanceNote />
        </div>
      </section>

      <section aria-labelledby="fellowship-heading" className="mt-14">
        <h2 id="fellowship-heading" className="text-3xl text-ink">
          Where this could go over twelve months
        </h2>
        <ol className="mt-6 grid gap-4 sm:grid-cols-2">
          {[
            ["Quarter 1 — Co-design and research", "Select datasets with LAS collaborators; develop data-card, contribution, and governance formats; hold early conversations about what should be visible and what should stay protected."],
            ["Quarter 2 — Observatory alpha", "A public open-source prototype with transparent provenance, uncertainty, and contribution pathways."],
            ["Quarter 3 — Participatory pilots", "Test with LAS-linked public programmes; revise the interface, data-care rules, and review process based on what participants find useful or harmful."],
            ["Quarter 4 — Open release", "Code, data-card templates, a participatory-method guide, documentation, and a workshop/exhibition resource."],
          ].map(([t, d]) => (
            <li key={t} className="rounded-xl border border-line bg-panel p-5">
              <h3 className="text-lg text-ink">{t}</h3>
              <p className="mt-1 text-sm text-ink-soft">{d}</p>
            </li>
          ))}
        </ol>
      </section>

      <div className="mt-14">
        <SourceList id="references" title="References" links={references} />
      </div>
    </div>
  );
}
