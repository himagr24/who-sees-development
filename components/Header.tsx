"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/explore", label: "Case study" },
  { href: "/contribute", label: "Add context" },
  { href: "/methodology", label: "How it works" },
];

export default function Header() {
  const pathname = usePathname();
  return (
    <header className="border-b border-line/70 bg-night/90 backdrop-blur sticky top-0 z-40">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-x-6 gap-y-2 px-4 py-3 sm:px-6">
        <Link href="/" className="group flex items-center gap-2.5 no-underline">
          <span aria-hidden className="relative inline-flex h-6 w-6 items-center justify-center">
            <span className="absolute h-6 w-6 rounded-full border border-glow/40" />
            <span className="h-1.5 w-1.5 rounded-full bg-glow shadow-[0_0_10px_2px_rgba(243,196,107,0.6)]" />
          </span>
          <span className="font-serif text-lg text-ink group-hover:text-glow">Who Sees Development?</span>
        </Link>
        <nav aria-label="Main">
          <ul className="flex flex-wrap gap-1 text-sm">
            {links.map((l) => {
              const active = pathname === l.href;
              return (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    aria-current={active ? "page" : undefined}
                    className={`rounded-full px-3 py-1.5 no-underline transition-colors ${
                      active ? "bg-panel-2 text-glow" : "text-ink-soft hover:bg-panel hover:text-ink"
                    }`}
                  >
                    {l.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </header>
  );
}
