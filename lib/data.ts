import type { CaseStudy, ChainStep, Contribution, Explanation } from "@/types/observatory";
import caseStudyJson from "@/data/case-study.json";
import explanationsJson from "@/data/explanations.json";
import chainJson from "@/data/inference-chain.json";
import contributionsJson from "@/data/example-contributions.json";

// JSON imports widen string unions to `string`; these casts restore the content model.
// Edit the JSON files in /data to change content — no component changes required.
export const caseStudy = caseStudyJson as unknown as CaseStudy;
export const explanations = explanationsJson as unknown as Explanation[];
export const chainSteps = chainJson as unknown as ChainStep[];
export const exampleContributions = contributionsJson as unknown as Contribution[];
