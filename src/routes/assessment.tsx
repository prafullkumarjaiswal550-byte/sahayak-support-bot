import { createFileRoute, Link } from "@tanstack/react-router";
import { AlertTriangle, ArrowRight, Phone, ShieldCheck } from "lucide-react";
import { AppFooter, AppHeader } from "@/components/sahayak/AppHeader";
import { Disclaimer } from "@/components/sahayak/Brand";
import { Gauge } from "@/components/sahayak/Gauge";
import { RiskBadge } from "@/components/sahayak/RiskBadge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ACTION_LABELS, INDICATOR_LABELS, PRIORITY_STYLES } from "@/lib/sahayak/labels";
import { useSahayakState } from "@/lib/sahayak/store";

export const Route = createFileRoute("/assessment")({
  validateSearch: (search: Record<string, unknown>) => ({
    case: typeof search.case === "string" ? search.case : "",
  }),
  head: () => ({
    meta: [
      { title: "Support summary — SAHAYAK preliminary screening" },
      {
        name: "description",
        content:
          "A preliminary, AI-assisted support summary with recommended support actions. Not a clinical diagnosis; a trained human always reviews.",
      },
      { property: "og:title", content: "Support summary — SAHAYAK" },
      {
        property: "og:description",
        content: "Preliminary AI-assisted risk screening and support prioritization for NHAA.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AssessmentPage,
});

function AssessmentPage() {
  const { case: caseId } = Route.useSearch();
  const { cases } = useSahayakState();
  const record = cases.find((c) => c.id === caseId) ?? cases[0];

  if (!record) {
    return (
      <div className="min-h-screen bg-background">
        <AppHeader />
        <main className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
          <h1 className="text-2xl font-semibold">No summary to show yet</h1>
          <p className="mt-3 text-muted-foreground">
            Share what happened in your own words whenever you feel ready. You are in control of what
            you share.
          </p>
          <Button asChild className="mt-6">
            <Link to="/victim">Start a safe assessment</Link>
          </Button>
        </main>
        <AppFooter />
      </div>
    );
  }

  const a = record.analysis;

  return (
    <div className="min-h-screen bg-background">
      <AppHeader />
      <main className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
        <h1 className="text-2xl font-semibold sm:text-3xl">Your preliminary support summary</h1>
        <p className="mt-2 text-muted-foreground">{a.empatheticResponse}</p>

        {a.immediateSafetyConcern && (
          <Card className="mt-6 border-critical/50 bg-critical-soft">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-critical">
                <AlertTriangle className="h-5 w-5" aria-hidden="true" /> If you may be in danger right
                now
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <p>
                Your safety matters. If you can do so safely, reach a trusted person or an emergency
                service near you. Emergency services in India: 112. NHAA helpline: 14566.
              </p>
              <p className="text-muted-foreground">
                This system cannot independently verify your situation, and it will not contact the
                police, a hospital, or anyone else without your explicit consent and a human officer's
                approval.
              </p>
              <div className="flex flex-wrap gap-3">
                <Button variant="destructive">
                  <Phone className="h-4 w-4" aria-hidden="true" /> Request emergency human escalation
                </Button>
                <Button asChild variant="outline">
                  <Link to="/support-directory">See support services</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="mt-6 grid gap-6 md:grid-cols-[auto_1fr]">
          <Card>
            <CardContent className="flex flex-col items-center gap-3 p-6">
              <Gauge score={a.sviScore} category={a.riskCategory} />
              <RiskBadge category={a.riskCategory} score={a.sviScore} />
              <p className="text-xs text-muted-foreground">
                Screening confidence: {Math.round(a.confidence * 100)}%
              </p>
            </CardContent>
          </Card>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Why this summary was produced</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {a.detectedIndicators.length === 0 ? (
                  <p className="text-sm text-muted-foreground">
                    No explicit risk content was identified. A human reviewer will still read this
                    case.
                  </p>
                ) : (
                  <ul className="space-y-2">
                    {a.detectedIndicators.map((i, idx) => (
                      <li key={idx} className="rounded-lg border border-border bg-card p-3 text-sm">
                        <span className="font-medium">{INDICATOR_LABELS[i.indicator]}</span>
                        <span className="ml-2 text-xs uppercase text-muted-foreground">
                          {i.severity} signal
                        </span>
                        <p className="mt-1 text-muted-foreground">{i.evidence}</p>
                      </li>
                    ))}
                  </ul>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Suggested support (AI recommendation)</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-muted-foreground">
                  These are suggestions for a human officer or counsellor to consider. Nothing here is
                  an automatic action or a final decision.
                </p>
                <ul className="space-y-2">
                  {a.recommendedActions.map((r, idx) => (
                    <li
                      key={idx}
                      className={`rounded-lg border p-3 text-sm ${PRIORITY_STYLES[r.priority]}`}
                    >
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-medium">{ACTION_LABELS[r.action]}</span>
                        <span className="text-xs uppercase">{r.priority}</span>
                      </div>
                      <p className="mt-1">{r.reason}</p>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ShieldCheck className="h-5 w-5 text-teal" aria-hidden="true" /> Human decision
                  pending
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-muted-foreground">
                <p>
                  Case reference <span className="font-mono text-foreground">{record.id}</span> is
                  waiting for a trained counsellor or authorized officer to review it. The final
                  decision is always theirs.
                </p>
                <ul className="list-disc space-y-1 pl-5">
                  {a.limitations.map((l, i) => (
                    <li key={i}>{l}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Disclaimer />

            <div className="flex flex-wrap gap-3">
              <Button asChild variant="outline">
                <Link to="/support-directory">
                  Support directory <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </Button>
              <Button asChild variant="ghost">
                <Link to="/victim">Add something else</Link>
              </Button>
            </div>
          </div>
        </div>
      </main>
      <AppFooter />
    </div>
  );
}
