import type { ActionKey, IndicatorKey, Priority } from "./types";

export const INDICATOR_LABELS: Record<IndicatorKey, string> = {
  fear: "Fear / distress",
  panic: "Panic or severe anxiety",
  threat: "Threats or intimidation",
  physical_harm: "Physical harm",
  sexual_violence: "Sexual violence disclosure",
  bereavement: "Bereavement",
  displacement: "Displacement",
  social_isolation: "Social boycott / isolation",
  prolonged_legal_distress: "Prolonged legal distress",
  self_harm_concern: "Self-harm concern",
  immediate_danger: "Possible immediate danger",
  unknown: "Unclear — needs human review",
};

export const ACTION_LABELS: Record<ActionKey, string> = {
  counselling_callback: "Counselling callback",
  legal_aid: "Legal aid",
  medical_assistance: "Medical assistance",
  police_liaison_review: "Police liaison review",
  witness_protection_review: "Witness protection review",
  shelter_support: "Shelter or rehabilitation support",
  emergency_human_escalation: "Emergency human escalation",
};

export const PRIORITY_STYLES: Record<Priority, string> = {
  immediate: "border-critical/50 bg-critical-soft text-critical",
  urgent: "border-orange/50 bg-orange-soft text-orange-foreground",
  routine: "border-teal/40 bg-teal-soft text-teal-foreground",
};

export const CASE_STATUSES = [
  "New",
  "Human review pending",
  "Counsellor contacted",
  "Legal aid referred",
  "Medical support referred",
  "Escalated",
  "Resolved",
] as const;
