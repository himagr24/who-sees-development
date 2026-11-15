"use client";

import { useEffect, useRef, useState } from "react";
import { ShieldAlert, CheckCircle2 } from "lucide-react";
import type { ContributionCategory, ContributorRole, Visibility } from "@/types/observatory";

const MAX = 800;

const categories: Array<{ value: ContributionCategory; label: string; hint: string }> = [
  { value: "local_context", label: "Local context", hint: "Something you know or have experienced about the area." },
  { value: "question", label: "A question the map should help explore", hint: "What would you want this observation to help answer?" },
  { value: "alternative_explanation", label: "An alternative explanation", hint: "Another story that could fit the same signal." },
  { value: "data_concern", label: "A concern about the data", hint: "Something about the source, method, or framing that worries you." },
];

const roles: Array<{ value: ContributorRole; label: string }> = [
  { value: "resident", label: "Someone who lives in or near the area" },
  { value: "researcher", label: "Researcher" },
  { value: "artist", label: "Artist" },
  { value: "ecologist", label: "Ecologist" },
  { value: "visitor", label: "Visitor to this site" },
  { value: "other", label: "Other" },
];

const visibilities: Array<{ value: Visibility; label: string; hint: string }> = [
  { value: "public", label: "Public after review", hint: "Visible to others only after a person has reviewed it." },
  { value: "facilitators_only", label: "Share only with facilitators", hint: "Seen by the people running a session, never published." },
  { value: "not_published", label: "Do not publish; use only to inform design", hint: "Helps shape the observatory, but is never shown." },
];

export default function ContributionForm() {
  const [category, setCategory] = useState<ContributionCategory | "">("");
  const [text, setText] = useState("");
  const [role, setRole] = useState<ContributorRole | "">("");
  const [location, setLocation] = useState<"none" | "area">("none");
  const [area, setArea] = useState("");
  const [visibility, setVisibility] = useState<Visibility | "">("");
  const [evidence, setEvidence] = useState("");
  const [understood, setUnderstood] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const ackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (submitted) {
      ackRef.current?.focus();
      ackRef.current?.scrollIntoView({ block: "center" });
    }
  }, [submitted]);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs: string[] = [];
    if (!category) errs.push("Choose what you would like to add.");
    if (!text.trim()) errs.push("Write your contribution.");
    if (!visibility) errs.push("Choose who may see it.");
    if (!understood) errs.push("Confirm the safety statement.");
    if (evidence && !/^https?:\/\//i.test(evidence.trim())) errs.push("A source link should start with http:// or https://.");
    setErrors(errs);
    if (errs.length) return;
    // Intentionally no network request and no storage of any kind in v1.
    // Clear every field so nothing typed lingers in memory after acknowledgement.
    reset();
    setSubmitted(true);
  }

  function reset() {
    setCategory("");
    setText("");
    setRole("");
    setLocation("none");
    setArea("");
    setVisibility("");
    setEvidence("");
    setUnderstood(false);
    setErrors([]);
    setSubmitted(false);
  }

  if (submitted) {
    return (
      <div ref={ackRef} tabIndex={-1} role="status" aria-live="polite" className="rounded-xl border border-teal/50 bg-panel p-6 sm:p-8">
        <CheckCircle2 aria-hidden className="h-7 w-7 text-teal" />
        <p className="mt-3 font-serif text-2xl text-ink">Thank you.</p>
        <p className="mt-2 text-ink-soft">
          In this prototype, submissions are not stored or published. In a future co-designed version, contributors
          would be able to review, correct, and withdraw their material.
        </p>
        <p className="mt-2 text-sm text-muted">
          What you wrote has already been discarded from this page. Nothing was sent anywhere.
        </p>
        <button
          type="button"
          onClick={reset}
          className="mt-5 rounded-full border border-line px-4 py-2 text-sm text-ink hover:border-glow hover:text-glow"
        >
          Start again
        </button>
      </div>
    );
  }

  const fieldset = "rounded-xl border border-line bg-panel p-5 sm:p-6";
  const legend = "px-1 font-serif text-lg text-ink";

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-5" aria-describedby="sensitivity-warning">
      <div
        id="sensitivity-warning"
        className="flex gap-3 rounded-xl border border-demo/60 bg-demo/10 p-4 text-sm text-ink"
      >
        <ShieldAlert aria-hidden className="mt-0.5 h-5 w-5 shrink-0 text-demo" />
        <p>
          <strong>Please do not share</strong> names, addresses, exact locations of homes or people, health, legal, or
          political details about anyone, or anything that could put you or others at risk. This is not a place to
          report emergencies.
        </p>
      </div>

      {errors.length > 0 && (
        <div role="alert" className="rounded-xl border border-demo bg-night p-4 text-sm">
          <p className="font-semibold text-demo">Please check the form:</p>
          <ul className="mt-1 list-disc pl-5 text-ink">
            {errors.map((e) => (
              <li key={e}>{e}</li>
            ))}
          </ul>
        </div>
      )}

      <fieldset className={fieldset}>
        <legend className={legend}>What would you like to add?</legend>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          {categories.map((c) => (
            <label
              key={c.value}
              className={`flex cursor-pointer gap-3 rounded-lg border p-4 transition-colors has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-glow ${
                category === c.value ? "border-glow bg-panel-2" : "border-line bg-night hover:border-glow/50"
              }`}
            >
              <input
                type="radio"
                name="category"
                value={c.value}
                checked={category === c.value}
                onChange={() => setCategory(c.value)}
                className="mt-1 accent-[#f3c46b]"
              />
              <span>
                <span className="block text-ink">{c.label}</span>
                <span className="block text-sm text-muted">{c.hint}</span>
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      <div className={fieldset}>
        <label htmlFor="text" className={legend}>
          Your contribution
        </label>
        <textarea
          id="text"
          value={text}
          maxLength={MAX}
          onChange={(e) => setText(e.target.value)}
          rows={5}
          aria-describedby="text-count"
          className="mt-3 w-full rounded-lg border border-line bg-night p-3 text-ink placeholder:text-muted focus:border-glow focus:outline-none"
          placeholder="For example: a question you would want this map to help answer."
        />
        <p id="text-count" className="mt-1 text-right text-xs text-muted" aria-live="polite">
          {text.length} / {MAX} characters
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <div className={fieldset}>
          <label htmlFor="role" className={legend}>
            Your role <span className="font-sans text-sm text-muted">(optional)</span>
          </label>
          <select
            id="role"
            value={role}
            onChange={(e) => setRole(e.target.value as ContributorRole | "")}
            className="mt-3 w-full rounded-lg border border-line bg-night p-2.5 text-ink focus:border-glow focus:outline-none"
          >
            <option value="">Prefer not to say</option>
            {roles.map((r) => (
              <option key={r.value} value={r.value}>
                {r.label}
              </option>
            ))}
          </select>
          <p className="mt-2 text-xs text-muted">
            Shown alongside a contribution so a local account, a researcher&rsquo;s note, and a visitor&rsquo;s
            question are never treated as the same kind of evidence.
          </p>
        </div>

        <fieldset className={fieldset}>
          <legend className={legend}>
            Location <span className="font-sans text-sm text-muted">(optional)</span>
          </legend>
          <div className="mt-3 space-y-2">
            {(["none", "area"] as const).map((v) => (
              <label key={v} className="flex cursor-pointer items-center gap-2 text-ink">
                <input
                  type="radio"
                  name="location"
                  value={v}
                  checked={location === v}
                  onChange={() => setLocation(v)}
                  className="accent-[#f3c46b]"
                />
                {v === "none" ? "No location" : "Approximate area"}
              </label>
            ))}
          </div>
          {location === "area" && (
            <div className="mt-3">
              <label htmlFor="area" className="text-sm text-ink-soft">
                Broad area (for example, “north of the case-study area”)
              </label>
              <input
                id="area"
                value={area}
                maxLength={80}
                onChange={(e) => setArea(e.target.value)}
                className="mt-1 w-full rounded-lg border border-line bg-night p-2.5 text-ink focus:border-glow focus:outline-none"
              />
            </div>
          )}
          <p className="mt-2 text-xs text-muted">Exact coordinates and map pins are never requested.</p>
        </fieldset>
      </div>

      <fieldset className={fieldset}>
        <legend className={legend}>Who may see this?</legend>
        <div className="mt-3 space-y-2">
          {visibilities.map((v) => (
            <label
              key={v.value}
              className={`flex cursor-pointer gap-3 rounded-lg border p-3 ${
                visibility === v.value ? "border-glow bg-panel-2" : "border-line bg-night hover:border-glow/50"
              }`}
            >
              <input
                type="radio"
                name="visibility"
                value={v.value}
                checked={visibility === v.value}
                onChange={() => setVisibility(v.value)}
                className="mt-1 accent-[#f3c46b]"
              />
              <span>
                <span className="block text-ink">{v.label}</span>
                <span className="block text-sm text-muted">{v.hint}</span>
              </span>
            </label>
          ))}
        </div>
        <p className="mt-2 text-xs text-muted">Nothing is public by default.</p>
      </fieldset>

      <div className={fieldset}>
        <label htmlFor="evidence" className={legend}>
          Source or evidence link <span className="font-sans text-sm text-muted">(optional)</span>
        </label>
        <input
          id="evidence"
          type="url"
          inputMode="url"
          value={evidence}
          onChange={(e) => setEvidence(e.target.value)}
          placeholder="https://"
          className="mt-3 w-full rounded-lg border border-line bg-night p-2.5 text-ink placeholder:text-muted focus:border-glow focus:outline-none"
        />
        <p className="mt-2 text-xs text-muted">
          A link helps reviewers, but a contribution without one is still welcome. Linked material is not treated as
          verified until reviewed.
        </p>
      </div>

      <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-line bg-panel p-5 text-ink">
        <input
          type="checkbox"
          checked={understood}
          onChange={(e) => setUnderstood(e.target.checked)}
          className="mt-1 h-4 w-4 accent-[#f3c46b]"
        />
        <span>
          I understand that this prototype should not be used to report emergencies or share sensitive personal
          information.
        </span>
      </label>

      <div className="flex flex-wrap items-center gap-4">
        <button
          type="submit"
          className="rounded-full bg-glow px-6 py-3 font-semibold text-night hover:bg-ink"
        >
          Submit (not stored)
        </button>
        <p className="text-sm text-muted">This prototype has no backend. Nothing you type leaves this page.</p>
      </div>
    </form>
  );
}
