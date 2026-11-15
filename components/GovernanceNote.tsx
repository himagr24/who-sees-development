import { Landmark } from "lucide-react";

export default function GovernanceNote() {
  return (
    <aside aria-labelledby="gov-heading" className="rounded-xl border border-line bg-night-2 p-5 sm:p-6">
      <h2 id="gov-heading" className="flex items-center gap-2 text-xl text-ink">
        <Landmark aria-hidden className="h-5 w-5 text-glow" /> A note on governance
      </h2>
      <p className="mt-2 text-sm text-ink-soft">
        Version 1 stores nothing. In a future deployment, rules for review, access, correction, and removal would be
        co-designed with LAS Art Foundation and participants — not decided in advance by the software. No community
        partnership or co-design has taken place yet; this prototype is a starting point for that conversation.
      </p>
    </aside>
  );
}
