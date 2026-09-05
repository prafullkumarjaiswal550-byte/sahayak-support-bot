// Core domain types for SAHAYAK.
// SAFETY: nothing here models clinical diagnosis. Scores are screening signals only.

export type RiskCategory = "Low" | "Moderate" | "High" | "Critical";

export type IndicatorKey =
  | "fear"
  | "panic"
  | "threat"
  | "physical_harm"
  | "sexual_violence"
  | "bereavement"
  | "displacement"
  | "social_isolation"
  | "prolonged_legal_distress"
  | "self_harm_concern"
  | "immediate_danger"
  | "unknown";

export type Severity = "low" | "medium" | "high";

export interface DetectedIndicator {
  indicator: IndicatorKey;
  /** Short paraphrase only — never a long quotation of the narrative. */
  evidence: string;
  severity: Severity;
}

export type ActionKey =
  | "counselling_callback"
  | "legal_aid"
  | "medical_assistance"
  | "police_liaison_review"
  | "witness_protection_review"
  | "shelter_support"
  | "emergency_human_escalation";

export type Priority = "routine" | "urgent" | "immediate";

export interface RecommendedAction {
  action: ActionKey;
  priority: Priority;
  reason: string;
}

export interface AnalysisResult {
  sviScore: number;
  riskCategory: RiskCategory;
  confidence: number;
  detectedIndicators: DetectedIndicator[];
  recommendedActions: RecommendedAction[];
  empatheticResponse: string;
  humanReviewRequired: boolean;
  immediateSafetyConcern: boolean;
  limitations: string[];
}

export interface AnalyzeInput {
  narrative: string;
  language: LanguageCode;
  voiceMetadata?: { durationSeconds: number; simulated: boolean } | null;
  consentGiven: boolean;
  demoMode: boolean;
  quickFlags?: string[];
}

export type CaseStatus =
  | "New"
  | "Human review pending"
  | "Counsellor contacted"
  | "Legal aid referred"
  | "Medical support referred"
  | "Escalated"
  | "Resolved";

export interface AuditEvent {
  id: string;
  eventType: string;
  actorRole: "system" | "victim" | "officer" | "admin";
  detail: string;
  createdAt: string;
}

export interface HumanReview {
  id: string;
  reviewerId: string;
  reviewerRole: string;
  decision: string;
  previousAiRecommendation: string;
  overrideReason: string;
  notes: string;
  createdAt: string;
}

export interface CaseRecord {
  id: string;
  createdAt: string;
  updatedAt: string;
  language: LanguageCode;
  /** Short paraphrased summary. Raw narrative is never persisted in demo mode. */
  narrativeSummary: string;
  analysis: AnalysisResult;
  consentGiven: boolean;
  demoData: boolean;
  status: CaseStatus;
  assignedOfficer: string;
  officerNotes: string;
  audit: AuditEvent[];
  reviews: HumanReview[];
}

export type LanguageCode =
  | "en"
  | "hi"
  | "mr"
  | "bn"
  | "ta"
  | "te"
  | "kn"
  | "ml"
  | "gu"
  | "pa"
  | "ur";
