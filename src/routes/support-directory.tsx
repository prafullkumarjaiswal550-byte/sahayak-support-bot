import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { AppFooter, AppHeader } from "@/components/sahayak/AppHeader";
import { DemoBadge } from "@/components/sahayak/Brand";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { SUPPORT_SERVICES } from "@/lib/sahayak/demoData";

export const Route = createFileRoute("/support-directory")({
  head: () => ({
    meta: [
      { title: "Support directory — counselling, legal and shelter help" },
      {
        name: "description",
        content:
          "Synthetic demo directory of counselling, legal aid, medical, shelter and emergency support services with languages and availability.",
      },
      { property: "og:title", content: "Support directory — SAHAYAK" },
      {
        property: "og:description",
        content: "Demo listing of support services by type, state and language.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: SupportDirectory,
});

const TYPES = ["all", "counselling", "legal", "medical", "shelter", "emergency"] as const;

function SupportDirectory() {
  const [type, setType] = useState<(typeof TYPES)[number]>("all");
  const [query, setQuery] = useState("");

  const results = SUPPORT_SERVICES.filter(
    (s) =>
      (type === "all" || s.serviceType === type) &&
      (query.trim() === "" ||
        `${s.name} ${s.state} ${s.district} ${s.languages.join(" ")}`
          .toLowerCase()
          .includes(query.toLowerCase())),
  );

  return (
    <div className="min-h-screen bg-background">
      <AppHeader />
      <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="flex flex-wrap items-center gap-3">
          <h1 className="text-2xl font-semibold sm:text-3xl">Support directory</h1>
          <DemoBadge />
        </div>
        <p className="mt-2 max-w-3xl text-muted-foreground">
          Counselling, legal aid, medical care, shelter and emergency liaison support. Every listing
          below is synthetic and included to show how the directory works. Contact details must be
          replaced with verified official contacts before any real use.
        </p>

        <div className="mt-6 flex flex-wrap gap-2">
          {TYPES.map((t) => (
            <Button
              key={t}
              size="sm"
              variant={type === t ? "default" : "outline"}
              onClick={() => setType(t)}
            >
              {t === "all" ? "All services" : t}
            </Button>
          ))}
          <label className="sr-only" htmlFor="dir-search">
            Search services
          </label>
          <input
            id="dir-search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name, state, district or language"
            className="h-9 min-w-[16rem] flex-1 rounded-lg border border-input bg-card px-3 text-sm"
          />
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {results.map((s) => (
            <Card key={s.id}>
              <CardContent className="space-y-2 p-5 text-sm">
                <h2 className="text-base font-semibold">{s.name}</h2>
                <p className="text-muted-foreground capitalize">
                  {s.serviceType} · {s.district}, {s.state}
                </p>
                <p>Languages: {s.languages.join(", ")}</p>
                <p>Availability: {s.availability}</p>
                <p>Referral: {s.referralType}</p>
                <p className="rounded-lg bg-muted p-2 text-xs text-muted-foreground">
                  {s.demoContact}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
        {results.length === 0 && (
          <p className="mt-6 text-sm text-muted-foreground">No services match this search.</p>
        )}

        <p className="mt-10 rounded-xl border border-border bg-card p-4 text-sm text-muted-foreground">
          If you may be in immediate danger, reach emergency services (112) or the NHAA helpline
          (14566) if it is safe to do so. This system cannot verify your situation and will not
          contact anyone on your behalf without your explicit consent and human approval.
        </p>
      </main>
      <AppFooter />
    </div>
  );
}
