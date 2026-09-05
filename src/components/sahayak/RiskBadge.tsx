import { CheckCircle2, AlertCircle, AlertTriangle, Siren } from "lucide-react";
import type { RiskCategory } from "@/lib/sahayak/types";

/** Risk is never communicated by colour alone: an icon and a word are always present. */
const MAP: Record<RiskCategory, { cls: string; Icon: typeof CheckCircle2 }> = {
  Low: { cls: "border-teal/40 bg-teal-soft text-teal-foreground", Icon: CheckCircle2 },
  Moderate: { cls: "border-amber/50 bg-amber-soft text-amber-foreground", Icon: AlertCircle },
  High: { cls: "border-orange/50 bg-orange-soft text-orange-foreground", Icon: AlertTriangle },
  Critical: { cls: "border-critical/50 bg-critical-soft text-critical", Icon: Siren },
};

export function RiskBadge({ category, score }: { category: RiskCategory; score?: number }) {
  const { cls, Icon } = MAP[category];
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-sm font-semibold ${cls}`}
    >
      <Icon className="h-4 w-4" aria-hidden="true" />
      {category} risk{typeof score === "number" ? ` · ${score}` : ""}
    </span>
  );
}

export const RISK_COLORS: Record<RiskCategory, string> = {
  Low: "var(--teal)",
  Moderate: "var(--amber)",
  High: "var(--orange)",
  Critical: "var(--critical)",
};
