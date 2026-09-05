// Lightweight in-app case store with realtime-style subscriptions.
// Used when no backend is configured so the prototype works standalone.
// SAFETY: only paraphrased summaries are stored — never raw narratives,
// names, phone numbers or addresses.

import { useSyncExternalStore } from "react";
import type {
  AnalysisResult,
  AuditEvent,
  CaseRecord,
  CaseStatus,
  HumanReview,
  LanguageCode,
} from "./types";
import { SAMPLE_NARRATIVES } from "./demoData";
import { runRuleBasedAnalysis } from "./scoring";

interface State {
  cases: CaseRecord[];
  demoMode: boolean;
  presentationMode: boolean;
  lastAssessmentId: string | null;
}

let state: State = {
  cases: [],
  demoMode: true,
  presentationMode: false,
  lastAssessmentId: null,
};

const listeners = new Set<() => void>();

function emit(next: State) {
  state = next;
  listeners.forEach((l) => l());
}

function subscribe(l: () => void) {
  listeners.add(l);
  return () => listeners.delete(l);
}

export function useSahayakState(): State {
  return useSyncExternalStore(
    subscribe,
    () => state,
    () => state,
  );
}

function id(prefix: string) {
  return `${prefix}-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;
}

function audit(eventType: string, detail: string, actorRole: AuditEvent["actorRole"]): AuditEvent {
  return { id: id("EV"), eventType, detail, actorRole, createdAt: new Date().toISOString() };
}

/** Paraphrase helper — keeps the stored record free of raw personal detail. */
export function summarise(analysis: AnalysisResult): string {
  const inds = analysis.detectedIndicators
    .filter((i) => i.indicator !== "unknown")
    .map((i) => i.indicator.replace(/_/g, " "));
  if (inds.length === 0) return "General support request; no explicit risk content identified.";
  return `Narrative indicates: ${inds.join(", ")}.`;
}

export function createCase(params: {
  analysis: AnalysisResult;
  language: LanguageCode;
  consentGiven: boolean;
  demoData: boolean;
  summary?: string;
}): CaseRecord {
  const now = new Date().toISOString();
  const record: CaseRecord = {
    id: id("SAH"),
    createdAt: now,
    updatedAt: now,
    language: params.language,
    narrativeSummary: params.summary ?? summarise(params.analysis),
    analysis: params.analysis,
    consentGiven: params.consentGiven,
    demoData: params.demoData,
    status: params.analysis.humanReviewRequired ? "Human review pending" : "New",
    assignedOfficer: "Unassigned",
    officerNotes: "",
    reviews: [],
    audit: [
      audit("case_created", "Case created from a consented preliminary screening.", "victim"),
      audit(
        "ai_screening_completed",
        `Rule-based screening produced SVI ${params.analysis.sviScore} (${params.analysis.riskCategory}) with confidence ${Math.round(params.analysis.confidence * 100)}%.`,
        "system",
      ),
      audit(
        "human_review_flagged",
        "Human review flagged as required. No authority was contacted automatically.",
        "system",
      ),
    ],
  };
  emit({ ...state, cases: [record, ...state.cases], lastAssessmentId: record.id });
  return record;
}

export function getCase(caseId: string): CaseRecord | undefined {
  return state.cases.find((c) => c.id === caseId);
}

export function updateCase(caseId: string, patch: Partial<CaseRecord>, auditDetail?: string) {
  emit({
    ...state,
    cases: state.cases.map((c) =>
      c.id === caseId
        ? {
            ...c,
            ...patch,
            updatedAt: new Date().toISOString(),
            audit: auditDetail ? [...c.audit, audit("case_updated", auditDetail, "officer")] : c.audit,
          }
        : c,
    ),
  });
}

export function addHumanReview(caseId: string, review: Omit<HumanReview, "id" | "createdAt">) {
  const entry: HumanReview = { ...review, id: id("HR"), createdAt: new Date().toISOString() };
  emit({
    ...state,
    cases: state.cases.map((c) =>
      c.id === caseId
        ? {
            ...c,
            updatedAt: entry.createdAt,
            reviews: [...c.reviews, entry],
            audit: [
              ...c.audit,
              audit(
                "human_decision_recorded",
                `${review.reviewerRole} confirmed "${review.decision}". AI had suggested "${review.previousAiRecommendation}".${review.overrideReason ? ` Override reason: ${review.overrideReason}` : ""}`,
                "officer",
              ),
            ],
          }
        : c,
    ),
  });
}

export function setStatus(caseId: string, status: CaseStatus) {
  updateCase(caseId, { status }, `Status changed to "${status}" by a human officer.`);
}

export function setDemoMode(on: boolean) {
  emit({ ...state, demoMode: on });
}

export function setPresentationMode(on: boolean) {
  emit({ ...state, presentationMode: on });
}

/** Seeds five clearly-labelled synthetic cases across languages and risk levels. */
export function seedDemoCases() {
  const created: CaseRecord[] = SAMPLE_NARRATIVES.map((sample, i) => {
    const analysis = runRuleBasedAnalysis(sample.text);
    const created = new Date(Date.now() - (i + 1) * 7 * 60 * 1000).toISOString();
    return {
      id: id("SAH"),
      createdAt: created,
      updatedAt: created,
      language: sample.language,
      narrativeSummary: sample.summary,
      analysis,
      consentGiven: true,
      demoData: true,
      status: "Human review pending" as CaseStatus,
      assignedOfficer: "Unassigned",
      officerNotes: "",
      reviews: [],
      audit: [
        audit("case_created", "Synthetic demo case generated for demonstration.", "system"),
        audit(
          "ai_screening_completed",
          `Rule-based screening produced SVI ${analysis.sviScore} (${analysis.riskCategory}).`,
          "system",
        ),
      ],
    };
  });
  emit({ ...state, cases: [...created, ...state.cases] });
}

export function clearCases() {
  emit({ ...state, cases: [], lastAssessmentId: null });
}
