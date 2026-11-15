import { ExternalLink } from "lucide-react";

export default function SourceList({
  links,
  title = "Sources for this case study",
  id,
}: {
  links: Array<{ label: string; url: string; note?: string }>;
  title?: string;
  id?: string;
}) {
  return (
    <section id={id} aria-labelledby={`${id ?? "sources"}-heading`} className="scroll-mt-24">
      <h2 id={`${id ?? "sources"}-heading`} className="text-2xl text-ink">
        {title}
      </h2>
      <ul className="mt-4 space-y-2 text-sm">
        {links.map((l) => (
          <li key={l.url} className="flex flex-col gap-0.5">
            <a href={l.url} className="inline-flex items-start gap-1.5 text-glow underline hover:text-ink">
              {l.label}
              <ExternalLink aria-hidden className="mt-1 h-3.5 w-3.5 shrink-0" />
            </a>
            {l.note && <span className="text-muted">{l.note}</span>}
          </li>
        ))}
      </ul>
    </section>
  );
}
