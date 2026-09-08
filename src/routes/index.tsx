import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, DoorOpen, HeartHandshake, Phone, UserCheck, ShieldCheck } from "lucide-react";
import { AppFooter, AppHeader } from "@/components/sahayak/AppHeader";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/lib/sahayak/language";

const TITLE = "SAHAYAK — AI-Assisted Trauma & Vulnerability Assessment for NHAA";
const DESC =
  "An AI-assisted preliminary screening and support-prioritization prototype for victims and complainants. Demo data only; human review always required.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Landing,
});

function Landing() {
  const { t } = useLanguage();

  const steps = [
    { n: "1", title: t("step1T"), body: t("step1B") },
    { n: "2", title: t("step2T"), body: t("step2B") },
    { n: "3", title: t("step3T"), body: t("step3B") },
  ];

  return (
    <div className="min-h-screen bg-background">
      <AppHeader />
      <main>
        <section className="border-b border-border bg-card">
          <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6">
            <div className="flex flex-col gap-3 rounded-lg border border-teal/30 bg-teal-soft px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="flex items-center gap-2 text-base font-medium text-teal-foreground">
                <Phone className="h-5 w-5 shrink-0" aria-hidden="true" /> {t("emergencyHelp")}
              </p>
              <Button asChild variant="outline" size="sm" className="shrink-0 border-teal/40">
                <Link to="/support-directory">
                  <DoorOpen aria-hidden="true" /> {t("findSupport")}
                </Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="bg-background">
          <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 sm:py-16">
            <span className="inline-flex items-center gap-2 rounded-full border border-teal/35 bg-teal-soft px-3 py-1 text-xs font-semibold uppercase text-teal-foreground">
              <ShieldCheck className="h-4 w-4" aria-hidden="true" /> Smart India Hackathon · SIH26093
            </span>
            <h1 className="mt-6 text-4xl leading-tight font-bold text-primary sm:text-5xl">SAHAYAK</h1>
            <p className="mt-4 font-display text-2xl leading-relaxed text-foreground sm:text-3xl">
              {t("heroTagline")}
            </p>
            <p className="mt-4 max-w-2xl text-lg text-muted-foreground">{t("heroSub")}</p>

            <div className="mt-8 grid gap-4 md:grid-cols-2">
              <Link
                to="/victim"
                className="group rounded-lg bg-primary p-6 text-primary-foreground shadow-lift transition-transform hover:-translate-y-1 sm:p-8"
              >
                <HeartHandshake className="h-8 w-8" aria-hidden="true" />
                <span className="mt-6 flex items-center justify-between gap-4 font-display text-2xl font-bold">
                  {t("iNeedSupport")}
                  <ArrowRight className="h-6 w-6 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                </span>
                <span className="mt-2 block text-base leading-relaxed text-primary-foreground/80">
                  {t("iNeedSupportSub")}
                </span>
              </Link>
              <Link
                to="/officer"
                className="group rounded-lg border border-border bg-card p-6 text-foreground shadow-card transition-transform hover:-translate-y-1 hover:border-teal sm:p-8"
              >
                <UserCheck className="h-8 w-8 text-teal" aria-hidden="true" />
                <span className="mt-6 flex items-center justify-between gap-4 font-display text-xl font-bold text-primary">
                  {t("iAmOfficer")}
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                </span>
                <span className="mt-2 block text-base leading-relaxed text-muted-foreground">
                  {t("iAmOfficerSub")}
                </span>
              </Link>
            </div>

            <p className="mt-6 rounded-md border border-amber/40 bg-amber-soft px-4 py-3 text-sm text-amber-foreground">
              {t("demoNotice")}
            </p>
          </div>
        </section>

        <section className="border-y border-border bg-card" aria-labelledby="process-heading">
          <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 sm:py-16">
            <h2 id="process-heading" className="text-3xl font-bold text-primary">
              {t("stepsTitle")}
            </h2>
            <ol className="mt-8 grid gap-6 md:grid-cols-3">
              {steps.map((s) => (
                <li key={s.n} className="rounded-xl border border-border bg-background p-5">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-teal-soft font-bold text-teal-foreground">
                    {s.n}
                  </span>
                  <h3 className="mt-3 text-lg font-bold text-primary">{s.title}</h3>
                  <p className="mt-2 text-base text-muted-foreground">{s.body}</p>
                </li>
              ))}
            </ol>
            <p className="mt-8 border-l-4 border-teal bg-navy-soft px-5 py-4 text-sm">{t("disclaimer")}</p>
          </div>
        </section>
      </main>
      <AppFooter />
    </div>
  );
}
