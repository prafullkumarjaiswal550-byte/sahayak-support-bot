import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { runRuleBasedAnalysis } from "./scoring";
import type { AnalysisResult, AnalyzeInput } from "./types";

const inputSchema = z.object({
  narrative: z.string().min(1).max(5000),
  language: z.string().min(2).max(5),
  consentGiven: z.boolean(),
  demoMode: z.boolean(),
  quickFlags: z.array(z.string()).optional(),
  voiceMetadata: z
    .object({ durationSeconds: z.number(), simulated: z.boolean() })
    .nullable()
    .optional(),
});

/**
 * Server-side analysis entry point.
 * SAFETY: consent is enforced here as well as in the UI. Any AI provider key is
 * read from the server environment only and never reaches the browser.
 */
export const analyzeNarrativeForSupportNeeds = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => inputSchema.parse(data))
  .handler(async ({ data }): Promise<AnalysisResult> => {
    if (!data.consentGiven) {
      throw new Error("Consent is required before any screening can run.");
    }

    // The rule-based layer is always the baseline result — it is transparent
    // and auditable. An LLM extraction layer may only refine it later.
    const baseline = runRuleBasedAnalysis(data.narrative, data.quickFlags ?? []);

    const apiKey = process.env["LOVABLE_API_KEY"];
    if (data.demoMode || !apiKey) {
      return baseline;
    }

    try {
      // Placeholder for the secure provider call. Any failure falls back to the
      // deterministic baseline so the victim never sees a raw provider error.
      return baseline;
    } catch {
      return baseline;
    }
  });

/** Client-safe local fallback used when the network or server is unavailable. */
export function analyzeLocally(input: AnalyzeInput): AnalysisResult {
  return runRuleBasedAnalysis(input.narrative, input.quickFlags ?? []);
}
