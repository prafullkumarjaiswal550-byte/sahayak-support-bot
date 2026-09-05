import { useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Activity, AlertTriangle, RefreshCw, Trash2 } from "lucide-react";
import { AppFooter, AppHeader } from "@/components/sahayak/AppHeader";
import { DemoBadge, Disclaimer } from "@/components/sahayak/Brand";
import { RiskBadge } from "@/components/sahayak/RiskBadge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ACTION_LABELS } from "@/lib/sahayak/labels";
import { SAMPLE_NARRATIVES } from "@/lib/sahayak/demoData";
import { runRuleBasedAnalysis } from "@/lib/sahayak/scoring";
import {
  clearCases,
  createCase,
  seedDemoCases,
  setPresentationMode,
  useSahayakState,
} from "@/lib/sahayak/store";
import type { RiskCategory } from "@/lib/sahayak/types";

export const Route = createFileRoute("/officer")({
  head: () => ({
    meta: [
      { title: "Officer dashboard — SAHAYAK case prioritization" },
      {
        name: "description",
        content:
          "Live queue of synthetic NHAA cases with preliminary screening scores, suggested support actions and human-in-the-loop review.",
      },
      { property: "og:title", content: "Officer dashboard — SAHAYAK" },
      {
        property: "og:description",
        content: "Support prioritization queue for NHAA officers and counsellors. Demo data only.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: OfficerDashboard,
});

const CATEGORIES: RiskCategory[] = ["Critical", "High", "Moderate", "Low"];

function OfficerDashboard() {
  const { cases, presentationMode } = useSahayakState();
  const [filter, setFilter] = useState<"All" | RiskCategory>("All");
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (cases.length === 0) seedDemoCases();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const visible = cases.filter(
    (c) =>
      (filter === "All" || c.analysis.riskCategory === filter) &&
      (query.trim() === "" ||
        c.id.toLowerCase().includes(query.toLowerCase()) ||
        c.narrativeSummary.toLowerCase().includes(query.toLowerCase())),
  );

  const counts = CATEGORIES.map((cat) => ({
    cat,
    n: cases.filter((c) => c.analysis.riskCategory === cat).length,
  }));
  const max = Math.max(1, ...counts.map((c) => c.n));
  const pendingReview = cases.filter((c) => c.status === "Human review pending").length;
  const safety = cases.filter((c) => c.analysis.immediateSafetyConcern);

  function simulateIncoming() {
    const sample = SAMPLE_NARRATIVES[Math.floor(Math.random() * SAMPLE_NARRATIVES.length)];
    if (!sample) return;
    createCase({
      analysis: runRuleBasedAnalysis(sample.text),
      language: sample.language,
      consentGiven: true,
      demoData: true,
      summary: sample.summary,
    });
  }

  return (
    <div className="min-h-screen bg-background">
      <AppHeader />
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <div className="flex flex-wrap items-center gap-3">
          <h1 className="text-2xl font-semibold sm:text-3xl">Officer &amp; counsellor dashboard</h1>
          <DemoBadge />
          <div className="ml-auto flex flex-wrap gap-2">
            <Button variant="outline" size="sm" onClick={simulateIncoming}>
              <Activity className="h-4 w-4" aria-hidden="true" /> Simulate incoming case
            </Button>
            <Button variant="outline" size="sm" onClick={() => seedDemoCases()}>
              <RefreshCw className="h-4 w-4" aria-hidden="true" /> Reseed demo cases
            </Button>
            <Button variant="ghost" size="sm" onClick={() => clearCases()}>
              <Trash2 className="h-4 w-4" aria-hidden="true" /> Clear queue
            </Button>
            <label className="flex items-center gap-2 rounded-lg border border-border px-3 text-sm">
              <input
                type="checkbox"
                checked={presentationMode}
                onChange={(e) => setPresentationMode(e.target.checked)}
              />
              Presentation mode
            </label>
          </div>
        </div>

        <p className="mt-2 text-sm text-muted-foreground">
          Every score below is a preliminary support-prioritization signal produced from consented,
          synthetic narratives. Officers make all final decisions.
        </p>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Stat label="Cases in queue" value={cases.length} />
          <Stat label="Awaiting human review" value={pendingReview} />
          <Stat
            label="Critical screening signals"
            value={cases.filter((c) => c.analysis.riskCategory === "Critical").length}
          />
          <Stat label="Possible immediate safety concern" value={safety.length} />
        </div>

        {safety.length > 0 && (
          <Card className="mt-6 border-critical/50 bg-critical-soft">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-critical">
                <AlertTriangle className="h-5 w-5" aria-hidden="true" /> Cases flagged for urgent human
                attention
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <p className="text-muted-foreground">
                The system cannot verify these situations and has not contacted any authority. A human
                must review and approve any escalation.
              </p>
              <div className="flex flex-wrap gap-2">
                {safety.map((c) => (
                  <Button key={c.id} asChild size="sm" variant="destructive">
                    <Link to="/case/$id" params={{ id: c.id }}>
                      Review {c.id}
                    </Link>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        <div className="mt-6 grid gap-6 lg:grid-cols-[2fr_1fr]">
          <Card>
            <CardHeader>
              <CardTitle>Live case queue</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-4 flex flex-wrap gap-2">
                {(["All", ...CATEGORIES] as const).map((c) => (
                  <Button
                    key={c}
                    size="sm"
                    variant={filter === c ? "default" : "outline"}
                    onClick={() => setFilter(c)}
                  >
                    {c}
                  </Button>
                ))}
                <label className="sr-only" htmlFor="case-search">
                  Search cases
                </label>
                <input
                  id="case-search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search case reference or summary"
                  className="h-9 min-w-[14rem] flex-1 rounded-lg border border-input bg-card px-3 text-sm"
                />
              </div>

              {visible.length === 0 ? (
                <p className="text-sm text-muted-foreground">No cases match this view.</p>
              ) : (
                <ul className="space-y-3">
                  {visible.map((c) => (
                    <li key={c.id} className="rounded-xl border border-border bg-card p-4">
                      <div className="flex flex-wrap items-center gap-3">
                        <span className="font-mono text-sm">{c.id}</span>
                        <RiskBadge category={c.analysis.riskCategory} score={c.analysis.sviScore} />
                        <span className="rounded-full border border-border px-2 py-0.5 text-xs">
                          {c.status}
                        </span>
                        <span className="text-xs uppercase text-muted-foreground">{c.language}</span>
                        <span className="ml-auto text-xs text-muted-foreground">
                          {new Date(c.createdAt).toLocaleTimeString()}
                        </span>
                      </div>
                      <p className="mt-2 text-sm text-muted-foreground">{c.narrativeSummary}</p>
                      <div className="mt-2 flex flex-wrap items-center gap-2 text-xs">
                        {c.analysis.recommendedActions.slice(0, 3).map((r, i) => (
                          <span key={i} className="rounded-full bg-muted px-2 py-0.5">
                            AI suggests: {ACTION_LABELS[r.action]}
                          </span>
                        ))}
                        <Button asChild size="sm" variant="outline" className="ml-auto">
                          <Link to="/case/$id" params={{ id: c.id }}>
                            Open human review
                          </Link>
                        </Button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </CardContent>
          </Card>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Distribution of screening categories</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {counts.map(({ cat, n }) => (
                  <div key={cat}>
                    <div className="flex justify-between text-sm">
                      <span>{cat}</span>
                      <span className="text-muted-foreground">{n}</span>
                    </div>
                    <div className="mt-1 h-2 rounded-full bg-muted">
                      <div
                        className="h-2 rounded-full bg-primary"
                        style={{ width: `${(n / max) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
            <Disclaimer />
          </div>
        </div>
      </main>
      <AppFooter />
    </div>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <Card>
      <CardContent className="p-5">
        <p className="text-sm text-muted-foreground">{label}</p>
        <p className="mt-1 text-3xl font-semibold">{value}</p>
      </CardContent>
    </Card>
  );
}
