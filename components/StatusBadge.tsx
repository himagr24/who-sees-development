import { BadgeCheck, TriangleAlert } from "lucide-react";
import type { CaseStudy } from "@/types/observatory";

export default function StatusBadge({ status, className = "" }: { status: CaseStudy["status"]; className?: string }) {
  if (status === "verified") {
    return (
      <span
        className={`inline-flex items-center gap-2 rounded-full border border-teal/50 bg-teal/10 px-3 py-1 text-sm text-teal ${className}`}
      >
        <BadgeCheck aria-hidden className="h-4 w-4" />
        Verified public case study
      </span>
    );
  }
  return (
    <span
      role="note"
      className={`inline-flex items-center gap-2 rounded-md border-2 border-dashed border-demo/80 bg-demo/10 px-3 py-1.5 text-sm font-semibold text-demo ${className}`}
    >
      <TriangleAlert aria-hidden className="h-4 w-4 shrink-0" />
      Demo content — replace with verified public data
    </span>
  );
}

export function IllustrativeBadge() {
  return (
    <span className="inline-flex items-center gap-1.5 rounded border border-dashed border-demo/70 px-2 py-0.5 text-xs font-semibold uppercase tracking-wide text-demo">
      Illustrative example
    </span>
  );
}
