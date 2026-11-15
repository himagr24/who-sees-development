/**
 * Content model for the observatory.
 *
 * Every piece of content shown in the explorer is driven by the JSON files in
 * /data so the project owner can replace demo content with a verified public
 * case study without redesigning the interface.
 */

export type QualityLevel = "high" | "limited" | "unknown";

export type CaseStudy = {
  status: "demo" | "verified";
  title: string;
  placeName: string;
  country: string;
  /** Approximate centre only. Displayed rounded; never used to pin people or households. */
  coordinates: { lat: number; lng: number };
  /** [west, south, east, north] in decimal degrees. */
  bbox?: [number, number, number, number];
  /** Why this place was selected. Required before marking status "verified". */
  selectionReason: string;
  period: { start: number; end: number };
  question: string;
  summary: string;
  dataset: {
    name: string;
    provider: string;
    productUrl: string;
    sensor: string;
    resolution: string;
    unit?: string;
    temporalAggregation: string;
    processingSummary: string;
    license?: string;
  };
  coverage: {
    level: QualityLevel;
    explanation: string;
    validObservationNote?: string;
  };
  series: Array<{ year: number; value: number | null; quality: QualityLevel }>;
  /**
   * Optional small grids (rows of values) for the before/after comparison.
   * In demo mode these are illustrative; in a verified case study they should be
   * an aggregated, coarse summary of the real raster, never more precise than the source.
   */
  comparison?: {
    note: string;
    cellSizeLabel: string;
    grids: Record<string, number[][]>;
  };
  observedChange: {
    statement: string;
    status: "measurement";
    caveat: string;
  };
  limitations: string[];
  sourceLinks: Array<{ label: string; url: string }>;
};

export type EvidenceLabel =
  | "supported_by_source"
  | "local_investigation"
  | "data_consideration"
  | "not_tested";

export type Explanation = {
  id: string;
  title: string;
  description: string;
  investigate: string;
  evidence: EvidenceLabel;
  citation?: { label: string; url: string };
};

export type ChainStep = {
  id: string;
  label: string;
  short: string;
  known: string;
  assumed: string;
  lost: string;
  whoCanQuestion: string;
};

export type ContributionCategory =
  | "local_context"
  | "question"
  | "alternative_explanation"
  | "data_concern";

export type ContributorRole =
  | "resident"
  | "researcher"
  | "artist"
  | "ecologist"
  | "visitor"
  | "other";

export type Visibility = "public" | "facilitators_only" | "not_published";

export type EvidenceStatus = "unreviewed" | "community_reviewed" | "evidence_linked";

export type Contribution = {
  id: string;
  category: ContributionCategory;
  text: string;
  contributorRole?: ContributorRole;
  locationPrecision: "none" | "area";
  visibility: Visibility;
  evidenceStatus: EvidenceStatus;
  isIllustrative: boolean;
};
