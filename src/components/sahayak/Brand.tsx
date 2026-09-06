import { Link } from "@tanstack/react-router";
import { ShieldCheck } from "lucide-react";

export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <Link to="/" className="flex items-center gap-3 rounded-md" aria-label="SAHAYAK home">
      <span
        aria-hidden="true"
        className="flex h-10 w-10 items-center justify-center rounded-md bg-primary text-primary-foreground shadow-sm"
      >
        <ShieldCheck className="h-5 w-5" />
      </span>
      <span className="leading-tight">
        <span className="block font-display text-lg font-bold text-primary">SAHAYAK</span>
        {!compact && (
          <span className="block text-xs text-muted-foreground">
            AI-assisted preliminary risk screening
          </span>
        )}
      </span>
    </Link>
  );
}

export function DemoBadge({ label = "DEMO DATA" }: { label?: string }) {
  return (
    <span className="inline-flex items-center rounded-full border border-amber/40 bg-amber-soft px-2.5 py-0.5 text-[11px] font-semibold tracking-wide text-amber-foreground uppercase">
      {label}
    </span>
  );
}

export function Disclaimer({ className = "" }: { className?: string }) {
  return (
    <p
      role="note"
      className={`rounded-md border-l-4 border-teal bg-navy-soft px-4 py-3 text-sm text-foreground ${className}`}
    >
      This is a preliminary screening result, not a clinical diagnosis. A trained counsellor or
      authorized officer must review the case.
    </p>
  );
}
