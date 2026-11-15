import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-line/70 bg-night-2">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 text-sm text-muted sm:px-6 md:grid-cols-3">
        <div>
          <p className="font-serif text-base text-ink">Who Sees Development?</p>
          <p className="mt-1">A participatory satellite-data observatory — experimental prototype, version 1.</p>
          <p className="mt-3">
            Made for a Mozilla Foundation Embedded Fellowship application with LAS Art Foundation. Not a tool for scoring
            communities or recommending where to invest.
          </p>
        </div>
        <div>
          <p className="text-ink">What is real here</p>
          <p className="mt-1">
            The interface, data-care rules, and source documentation links are real. The case-study values and all
            example contributions are <strong className="text-demo">demo / illustrative content</strong>. No submission
            is stored.
          </p>
        </div>
        <div>
          <p className="text-ink">Data and attribution</p>
          <ul className="mt-1 space-y-1">
            <li>
              <a className="underline hover:text-ink" href="https://eogdata.mines.edu/products/vnl/">
                Earth Observation Group — VIIRS Nighttime Lights
              </a>
            </li>
            <li>
              <a
                className="underline hover:text-ink"
                href="https://viirsland.gsfc.nasa.gov/PDF/BlackMarbleUserGuide_v1.2_20210421.pdf"
              >
                NASA Black Marble User Guide
              </a>
            </li>
            <li>
              <Link className="underline hover:text-ink" href="/methodology#references">
                All references
              </Link>
            </li>
          </ul>
          <p className="mt-3 text-xs">No satellite imagery is reproduced; visuals are drawn from local demo data.</p>
        </div>
      </div>
    </footer>
  );
}
