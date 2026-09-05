// SAFETY-CRITICAL: transparent, configurable rule-based screening layer.
// It produces a *support prioritization* signal, never a clinical diagnosis.
// Rules never use grammar, spelling, dialect, typing speed, accent or length
// as evidence, and never infer caste, religion, gender, guilt or credibility.

import type {
  ActionKey,
  AnalysisResult,
  DetectedIndicator,
  IndicatorKey,
  Priority,
  RecommendedAction,
  RiskCategory,
  Severity,
} from "./types";

export interface RuleConfig {
  indicator: IndicatorKey;
  points: number;
  severity: Severity;
  evidence: string;
  /** Multilingual keyword cues. Cues are content-based, never style-based. */
  cues: string[];
}

export const SCORING_RULES: RuleConfig[] = [
  {
    indicator: "fear",
    points: 10,
    severity: "low",
    evidence: "Narrative describes general distress or fear for safety.",
    cues: ["afraid", "scared", "fear", "frighten", "unsafe", "डर", "भय", "ভয়", "भीती", "பயம்", "భయం", "ਡਰ", "ڈر"],
  },
  {
    indicator: "panic",
    points: 10,
    severity: "medium",
    evidence: "Narrative describes panic or severe anxiety.",
    cues: ["panic", "cannot sleep", "can't sleep", "anxiety", "shaking", "घबरा", "बेचैन", "নিদ্রা", "आतंक", "पैनिक"],
  },
  {
    indicator: "threat",
    points: 15,
    severity: "medium",
    evidence: "Narrative reports threats or intimidation.",
    cues: ["threat", "threaten", "warned me", "intimidat", "धमकी", "धमकाया", "হুমকি", "மிரட்ட", "బెదిరింపు", "ਧਮਕੀ", "دھمکی"],
  },
  {
    indicator: "physical_harm",
    points: 20,
    severity: "high",
    evidence: "Narrative reports physical violence or injury.",
    cues: ["beat", "beaten", "hit me", "assault", "injur", "wound", "मारपीट", "पीटा", "मारा", "মারধর", "अत्याचार", "தாக்க", "కొట్ట", "ਕੁੱਟ", "مارا"],
  },
  {
    indicator: "sexual_violence",
    points: 25,
    severity: "high",
    evidence: "Narrative includes a disclosure of sexual violence.",
    cues: ["rape", "sexual", "molest", "बलात्कार", "यौन", "ধর্ষণ", "छेडछाड", "பாலியல்", "లైంగిక", "ਬਲਾਤਕਾਰ", "جنسی"],
  },
  {
    indicator: "bereavement",
    points: 20,
    severity: "high",
    evidence: "Narrative mentions death of a family member or severe bereavement.",
    cues: ["died", "death", "killed", "murder", "मृत्यु", "मौत", "हत्या", "মৃত্যু", "মারা", "இறந்த", "మరణ", "ਮੌਤ", "موت"],
  },
  {
    indicator: "displacement",
    points: 15,
    severity: "high",
    evidence: "Narrative indicates forced displacement or homelessness.",
    cues: ["left our home", "left home", "displaced", "homeless", "cannot return", "घर छोड़", "बेघर", "घरी परत", "ঘর ছাড়", "விட்டு", "ਘਰ ਛੱਡ", "گھر چھوڑ"],
  },
  {
    indicator: "social_isolation",
    points: 15,
    severity: "medium",
    evidence: "Narrative indicates social boycott or isolation.",
    cues: ["boycott", "no one speaks", "isolat", "excluded", "बहिष्कार", "अलग-थलग", "বয়কট", "தனிமை", "వెలివేత", "ਬਾਈਕਾਟ", "بائیکاٹ"],
  },
  {
    indicator: "prolonged_legal_distress",
    points: 10,
    severity: "low",
    evidence: "Narrative indicates prolonged legal process distress.",
    cues: ["court", "case pending", "fir", "police station", "अदालत", "मुकदमा", "एफआईआर", "আদালত", "நீதிமன்ற", "కోర్టు", "ਅਦਾਲਤ", "عدالت"],
  },
  {
    indicator: "immediate_danger",
    points: 30,
    severity: "high",
    evidence: "Narrative indicates possible immediate danger.",
    cues: ["right now", "outside my house", "immediate danger", "they are here", "coming to kill", "अभी", "तुरंत खतरा", "এখনই", "आत्ता", "இப்போது", "ఇప్పుడే", "ਹੁਣੇ", "ابھی"],
  },
  {
    indicator: "self_harm_concern",
    points: 35,
    severity: "high",
    evidence: "Narrative contains language suggesting self-harm concern.",
    cues: ["end my life", "kill myself", "suicide", "no reason to live", "self harm", "आत्महत्या", "जीना नहीं", "আত্মহত্যা", "தற்கொலை", "ఆత్మహత్య", "ਖੁਦਕੁਸ਼ੀ", "خودکشی"],
  },
];

const PRIORITY_POINTS = 10; // bonus when multiple severe indicators co-occur

export function categorize(score: number): RiskCategory {
  if (score >= 75) return "Critical";
  if (score >= 50) return "High";
  if (score >= 25) return "Moderate";
  return "Low";
}

export function clamp(score: number): number {
  return Math.max(0, Math.min(100, Math.round(score)));
}

export function detectIndicators(narrative: string, quickFlags: string[] = []): DetectedIndicator[] {
  const text = narrative.toLowerCase();
  const found: DetectedIndicator[] = [];
  for (const rule of SCORING_RULES) {
    const hit = rule.cues.some((c) => text.includes(c.toLowerCase()));
    if (hit) {
      found.push({ indicator: rule.indicator, evidence: rule.evidence, severity: rule.severity });
    }
  }
  // Quick support buttons are explicit user statements, treated as content.
  const flagMap: Record<string, IndicatorKey> = {
    immediate_danger: "immediate_danger",
    afraid_home: "displacement",
    medical: "physical_harm",
    legal: "prolonged_legal_distress",
    counsellor: "fear",
  };
  for (const flag of quickFlags) {
    const key = flagMap[flag];
    if (key && !found.some((f) => f.indicator === key)) {
      const rule = SCORING_RULES.find((r) => r.indicator === key);
      found.push({
        indicator: key,
        evidence: `The person explicitly selected a support request related to ${key.replace(/_/g, " ")}.`,
        severity: rule?.severity ?? "medium",
      });
    }
  }
  if (found.length === 0) {
    found.push({
      indicator: "unknown",
      evidence: "No explicit risk content was identified. The result is uncertain and needs human review.",
      severity: "low",
    });
  }
  return found;
}

export function scoreIndicators(indicators: DetectedIndicator[]): number {
  let score = 0;
  for (const ind of indicators) {
    const rule = SCORING_RULES.find((r) => r.indicator === ind.indicator);
    if (rule) score += rule.points;
  }
  const severeCount = indicators.filter((i) => i.severity === "high").length;
  if (severeCount >= 2) score += PRIORITY_POINTS;
  return clamp(score);
}

function pushAction(
  list: RecommendedAction[],
  action: ActionKey,
  priority: Priority,
  reason: string,
) {
  if (!list.some((a) => a.action === action)) list.push({ action, priority, reason });
}

export function recommendActions(indicators: DetectedIndicator[], category: RiskCategory): RecommendedAction[] {
  const keys = new Set(indicators.map((i) => i.indicator));
  const actions: RecommendedAction[] = [];

  if (keys.has("self_harm_concern")) {
    pushAction(actions, "emergency_human_escalation", "immediate", "Self-harm concern language requires an immediate trained human response.");
    pushAction(actions, "counselling_callback", "immediate", "Priority counselling contact is recommended.");
  }
  if (keys.has("immediate_danger")) {
    pushAction(actions, "emergency_human_escalation", "immediate", "Possible immediate danger was described; the system cannot verify this independently.");
    pushAction(actions, "police_liaison_review", "immediate", "A human officer should review whether protective action is needed, with consent.");
  }
  if (keys.has("sexual_violence")) {
    pushAction(actions, "medical_assistance", "urgent", "Disclosure of sexual violence may need sensitive medical support.");
    pushAction(actions, "counselling_callback", "urgent", "Specialised trauma-informed counselling is recommended.");
    pushAction(actions, "legal_aid", "urgent", "Legal support may be needed for further proceedings.");
  }
  if (keys.has("physical_harm")) {
    pushAction(actions, "medical_assistance", "urgent", "Reported physical harm may require medical attention.");
    pushAction(actions, "police_liaison_review", "urgent", "Human review of protection needs is recommended.");
  }
  if (keys.has("bereavement")) {
    pushAction(actions, "counselling_callback", "urgent", "Bereavement support is recommended.");
    pushAction(actions, "witness_protection_review", "urgent", "A human officer should assess protection needs for the family.");
  }
  if (keys.has("displacement")) {
    pushAction(actions, "shelter_support", "urgent", "Safe accommodation may be needed.");
  }
  if (keys.has("threat")) {
    pushAction(actions, "witness_protection_review", "urgent", "Reported intimidation should be reviewed by an authorised officer.");
  }
  if (keys.has("social_isolation")) {
    pushAction(actions, "counselling_callback", "routine", "Community isolation support and counselling may help.");
  }
  if (keys.has("prolonged_legal_distress")) {
    pushAction(actions, "legal_aid", "routine", "Guidance on legal process may reduce ongoing distress.");
  }
  if (actions.length === 0) {
    pushAction(actions, "counselling_callback", "routine", "A supportive human callback is suggested to understand the need better.");
  }
  if (category === "Critical" || category === "High") {
    pushAction(actions, "emergency_human_escalation", category === "Critical" ? "immediate" : "urgent", "High preliminary score requires prompt human review.");
  }
  const order: Record<Priority, number> = { immediate: 0, urgent: 1, routine: 2 };
  return actions.sort((a, b) => order[a.priority] - order[b.priority]);
}

export function estimateConfidence(narrative: string, indicators: DetectedIndicator[]): number {
  // Confidence reflects how explicit the *content* is, not writing style.
  const explicit = indicators.filter((i) => i.indicator !== "unknown").length;
  if (explicit === 0) return 0.25;
  const base = 0.5 + Math.min(explicit, 4) * 0.08;
  const hasContent = narrative.trim().split(/\s+/).length >= 8 ? 0.06 : 0;
  return Math.min(0.92, Number((base + hasContent).toFixed(2)));
}

const EMPATHY: Record<RiskCategory, string> = {
  Low: "Thank you for reaching out. What you shared matters, and a support person can help you with the next steps.",
  Moderate: "Thank you for trusting us with this. What you are feeling is understandable, and support is available to you.",
  High: "Thank you for sharing something difficult. You should not have to face this alone — a trained person will review this soon.",
  Critical: "Thank you for telling us. Your safety matters. Urgent human support is being recommended for your case right now.",
};

export function runRuleBasedAnalysis(narrative: string, quickFlags: string[] = []): AnalysisResult {
  const indicators = detectIndicators(narrative, quickFlags);
  const sviScore = scoreIndicators(indicators);
  const riskCategory = categorize(sviScore);
  const keys = new Set(indicators.map((i) => i.indicator));
  const immediateSafetyConcern = keys.has("immediate_danger") || keys.has("self_harm_concern");

  return {
    sviScore,
    riskCategory,
    confidence: estimateConfidence(narrative, indicators),
    detectedIndicators: indicators,
    recommendedActions: recommendActions(indicators, riskCategory),
    empatheticResponse: EMPATHY[riskCategory],
    // SAFETY: human review is always required, in every category.
    humanReviewRequired: true,
    immediateSafetyConcern,
    limitations: [
      "This is not a clinical diagnosis",
      "Human review is required",
      "Language, culture, disability and communication style can affect these signals",
      "The system cannot independently verify the situation described",
    ],
  };
}
