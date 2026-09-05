import type { RiskCategory } from "@/lib/sahayak/types";
import { RISK_COLORS } from "./RiskBadge";

/** Calm circular gauge for the Stress Vulnerability Index (0–100). No animation loops. */
export function Gauge({
  score,
  category,
  size = 180,
}: {
  score: number;
  category: RiskCategory;
  size?: number;
}) {
  const stroke = 14;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const offset = c - (Math.min(100, Math.max(0, score)) / 100) * c;

  return (
    <div
      className="inline-flex flex-col items-center"
      role="img"
      aria-label={`Stress Vulnerability Index ${score} out of 100, category ${category}`}
    >
      <svg width={size} height={size} aria-hidden="true">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="var(--border)" strokeWidth={stroke} />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={RISK_COLORS[category]}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={offset}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
        <text
          x="50%"
          y="47%"
          textAnchor="middle"
          fontSize={size * 0.26}
          fontWeight="700"
          fill="var(--foreground)"
        >
          {score}
        </text>
        <text x="50%" y="65%" textAnchor="middle" fontSize={size * 0.085} fill="var(--muted-foreground)">
          SVI / 100
        </text>
      </svg>
      <p className="mt-2 text-sm text-muted-foreground">
        Stress Vulnerability Index — a support-prioritization signal
      </p>
    </div>
  );
}
