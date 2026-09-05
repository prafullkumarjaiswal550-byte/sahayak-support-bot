import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { AppFooter, AppHeader } from "@/components/sahayak/AppHeader";
import { Disclaimer } from "@/components/sahayak/Brand";
import { RiskBadge } from "@/components/sahayak/RiskBadge";
import { Gauge } from "@/components/sahayak/Gauge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ACTION_LABELS, CASE_STATUSES, INDICATOR_LABELS } from "@/lib/sahayak/labels";
import { OFFICERS } from "@/lib/sahayak/demoData";
import {
  addHumanReview,
  setStatus,
  updateCase,
  useSahayakState,
} from "@/lib/sahayak/store";
import type { CaseStatus } from "@/lib/sahayak/types";

export const Route = createFileRoute("/case/$id")({
  head: () => ({
    meta: [
      { title: "Case review — SAHAYAK human-in-the-loop" },
      {
        name: "description",
        content:
          "Human review workspace for a synthetic NHAA case: AI suggestions, officer decision, override reason and full audit trail.",
      },
      { property: "og:title", content: "Case review — SAHAYAK" },
      {
        property: "og:description",
        content: "Officers confirm or override AI suggestions. Every decision is logged.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CaseReview,
});

function CaseReview() {
  const { id } = Route.useParams();
  const { cases } = useSahayakState();
  const record = cases.find((c) => c.id === id);

  const [decision, setDecision] = useState("");
  const [overrideReason, setOverrideReason] = useState("");
  const [notes, setNotes] = useState("");
  const [saved, setSaved] = useState("");

  if (!record) {
    return (
      <div className="min-h-screen bg-background">
        <AppHeader />
        <main className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
          <h1 className="text-2xl font-semibold">Case not found</h1>
          <p className="mt-3 text-muted-foreground">
            Demo cases live only in this browser session. Return to the dashboard to reseed them.
          </p>
          <Button asChild className="mt-6">
            <Link to="/officer">Back to dashboard</Link>
          </Button>
        </main>
        <AppFooter />
      </div>
    );
  }

  const a = record.analysis;
  const topAi = a.recommendedActions[0] ? ACTION_LABELS[a.recommendedActions[0].action] : "No action";

  function recordDecision() {
    if (!record || !decision) return;
    addHumanReview(record.id, {
      reviewerId: record.assignedOfficer,
      reviewerRole: "Officer / counsellor",
      decision,
      previousAiRecommendation: topAi,
      overrideReason,
      notes,
    });
    setSaved("Human decision recorded in the audit trail.");
    setDecision("");
    setOverrideReason("");
  }

  return (
    <div className="min-h-screen bg-background">
      <AppHeader />
      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <div className="flex flex-wrap items-center gap-3">
          <h1 className="text-2xl font-semibold sm:text-3xl">
            Case <span className="font-mono">{record.id}</span>
          </h1>
          <RiskBadge category={a.riskCategory} score={a.sviScore} />
          <Button asChild variant="ghost" size="sm" className="ml-auto">
            <Link to="/officer">Back to queue</Link>
          </Button>
        </div>
        <p className="mt-2 text-sm text-muted-foreground">{record.narrativeSummary}</p>

        <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_1fr]">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>AI recommendation (not a decision)</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-wrap items-center gap-6">
                  <Gauge score={a.sviScore} category={a.riskCategory} size={140} />
                  <div className="text-sm text-muted-foreground">
                    <p>Confidence: {Math.round(a.confidence * 100)}%</p>
                    <p>Language of submission: {record.language}</p>
                    <p>Consent recorded: {record.consentGiven ? "Yes" : "No"}</p>
                  </div>
                </div>
                <ul className="space-y-2 text-sm">
                  {a.recommendedActions.map((r, i) => (
                    <li key={i} className="rounded-lg border border-border p-3">
                      <span className="font-medium">{ACTION_LABELS[r.action]}</span>{" "}
                      <span className="text-xs uppercase text-muted-foreground">{r.priority}</span>
                      <p className="mt-1 text-muted-foreground">{r.reason}</p>
                    </li>
                  ))}
                </ul>
                <div className="text-sm">
                  <p className="font-medium">Signals considered</p>
                  <ul className="mt-1 list-disc pl-5 text-muted-foreground">
                    {a.detectedIndicators.map((i, idx) => (
                      <li key={idx}>
                        {INDICATOR_LABELS[i.indicator]} — {i.evidence}
                      </li>
                    ))}
                  </ul>
                </div>
                <Disclaimer />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Audit trail</CardTitle>
              </CardHeader>
              <CardContent>
                <ol className="space-y-3 text-sm">
                  {record.audit.map((e) => (
                    <li key={e.id} className="border-l-2 border-border pl-3">
                      <p className="font-medium">{e.eventType.replace(/_/g, " ")}</p>
                      <p className="text-muted-foreground">{e.detail}</p>
                      <p className="text-xs text-muted-foreground">
                        {e.actorRole} · {new Date(e.createdAt).toLocaleString()}
                      </p>
                    </li>
                  ))}
                </ol>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Human decision</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm">
                <div>
                  <label htmlFor="officer" className="mb-1 block font-medium">
                    Assigned officer
                  </label>
                  <select
                    id="officer"
                    value={record.assignedOfficer}
                    onChange={(e) =>
                      updateCase(
                        record.id,
                        { assignedOfficer: e.target.value },
                        `Case assigned to ${e.target.value}.`,
                      )
                    }
                    className="h-10 w-full rounded-lg border border-input bg-card px-3"
                  >
                    {OFFICERS.map((o) => (
                      <option key={o}>{o}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="status" className="mb-1 block font-medium">
                    Case status
                  </label>
                  <select
                    id="status"
                    value={record.status}
                    onChange={(e) => setStatus(record.id, e.target.value as CaseStatus)}
                    className="h-10 w-full rounded-lg border border-input bg-card px-3"
                  >
                    {CASE_STATUSES.map((s) => (
                      <option key={s}>{s}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="decision" className="mb-1 block font-medium">
                    Final action confirmed by you
                  </label>
                  <select
                    id="decision"
                    value={decision}
                    onChange={(e) => setDecision(e.target.value)}
                    className="h-10 w-full rounded-lg border border-input bg-card px-3"
                  >
                    <option value="">Select an action…</option>
                    {Object.values(ACTION_LABELS).map((l) => (
                      <option key={l}>{l}</option>
                    ))}
                    <option>No further action at this time</option>
                  </select>
                  <p className="mt-1 text-xs text-muted-foreground">
                    AI had suggested: {topAi}. You may confirm or override it.
                  </p>
                </div>

                <div>
                  <label htmlFor="override" className="mb-1 block font-medium">
                    Reason, if you are overriding the suggestion
                  </label>
                  <textarea
                    id="override"
                    value={overrideReason}
                    onChange={(e) => setOverrideReason(e.target.value)}
                    rows={3}
                    className="w-full rounded-lg border border-input bg-card p-3"
                  />
                </div>

                <div>
                  <label htmlFor="notes" className="mb-1 block font-medium">
                    Officer notes
                  </label>
                  <textarea
                    id="notes"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    onBlur={() =>
                      updateCase(record.id, { officerNotes: notes }, "Officer notes updated.")
                    }
                    rows={4}
                    className="w-full rounded-lg border border-input bg-card p-3"
                  />
                </div>

                <Button onClick={recordDecision} disabled={!decision}>
                  Record human decision
                </Button>
                <p aria-live="polite" className="text-teal-foreground">
                  {saved}
                </p>
                <p className="text-xs text-muted-foreground">
                  No authority, hospital or family member is contacted automatically. Escalation
                  requires explicit consent and a human approval step.
                </p>
              </CardContent>
            </Card>

            {record.reviews.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Recorded human decisions</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 text-sm">
                    {record.reviews.map((r) => (
                      <li key={r.id} className="rounded-lg border border-border p-3">
                        <p className="font-medium">{r.decision}</p>
                        <p className="text-muted-foreground">
                          AI suggestion: {r.previousAiRecommendation}
                          {r.overrideReason ? ` · Override: ${r.overrideReason}` : ""}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(r.createdAt).toLocaleString()}
                        </p>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </main>
      <AppFooter />
    </div>
  );
}
