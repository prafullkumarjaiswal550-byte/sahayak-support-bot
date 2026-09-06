import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, DoorOpen, HeartHandshake, Radar, UserCheck, ShieldCheck } from "lucide-react";
import { AppFooter, AppHeader } from "@/components/sahayak/AppHeader";
import { Button } from "@/components/ui/button";

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

const FEATURES = [
  {
    icon: HeartHandshake,
    title: "Trauma-informed interaction",
    body: "Calm, non-judgmental language, consent before any analysis, and the ability to pause or leave at any moment.",
  },
  {
    icon: Radar,
    title: "Real-time support prioritization",
    body: "A transparent Stress Vulnerability Index helps teams reach the people who may need urgent support first.",
  },
  {
    icon: UserCheck,
    title: "Human-in-the-loop escalation",
    body: "Every recommendation is a suggestion. A trained counsellor or authorized officer makes the final decision.",
  },
];

function Landing() {
  return (
    <div className="min-h-screen bg-background">
      <AppHeader />
      <main>
        <section className="border-b border-border bg-card">
          <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6">
            <div className="flex flex-col gap-3 rounded-lg border border-teal/30 bg-teal-soft px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-teal-foreground"><strong>Need immediate help?</strong> If you are in danger, call emergency services at 112 or NHAA at 14566.</p>
              <Button asChild variant="outline" size="sm" className="shrink-0 border-teal/40">
                <Link to="/support-directory"><DoorOpen aria-hidden="true" /> Find support</Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="bg-background">
          <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:py-24">
            <span className="inline-flex items-center gap-2 rounded-full border border-teal/35 bg-teal-soft px-3 py-1 text-xs font-semibold uppercase text-teal-foreground">
              <ShieldCheck className="h-4 w-4" aria-hidden="true" /> Smart India Hackathon · SIH26093
            </span>
            <div className="mt-6 max-w-4xl">
              <h1 className="text-4xl leading-tight font-bold text-primary sm:text-5xl lg:text-6xl">SAHAYAK</h1>
              <p className="mt-5 max-w-3xl font-display text-2xl leading-relaxed text-foreground sm:text-3xl">Dignified support, with every decision kept human.</p>
              <p className="mt-5 max-w-2xl text-lg text-muted-foreground">A calm, consent-first space for AI-assisted preliminary risk screening and support prioritization for victims and complainants of the National Helpline Against Atrocities.</p>
              <p className="mt-2 text-base text-muted-foreground" lang="hi">पीड़ितों और शिकायतकर्ताओं के लिए प्रारंभिक सहायता-प्राथमिकता प्रणाली।</p>
            </div>
            <div className="mt-9 grid max-w-4xl gap-4 md:grid-cols-2">
              <Link to="/victim" className="group rounded-lg bg-primary p-6 text-primary-foreground shadow-lift transition-transform hover:-translate-y-1 sm:p-8">
                <HeartHandshake className="h-7 w-7" aria-hidden="true" />
                <span className="mt-7 flex items-center justify-between gap-4 font-display text-xl font-bold">I need support <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" aria-hidden="true" /></span>
                <span className="mt-2 block text-sm leading-relaxed text-primary-foreground/75">Share only what you choose, in your own words. You can pause or leave at any time.</span>
              </Link>
              <Link to="/officer" className="group rounded-lg border border-border bg-card p-6 text-foreground shadow-card transition-transform hover:-translate-y-1 hover:border-teal sm:p-8">
                <UserCheck className="h-7 w-7 text-teal" aria-hidden="true" />
                <span className="mt-7 flex items-center justify-between gap-4 font-display text-xl font-bold text-primary">I am an officer or counsellor <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" aria-hidden="true" /></span>
                <span className="mt-2 block text-sm leading-relaxed text-muted-foreground">Review support priorities, document human decisions, and follow the audit trail.</span>
              </Link>
            </div>
            <p className="mt-6 max-w-4xl rounded-md border border-amber/40 bg-amber-soft px-4 py-3 text-sm text-amber-foreground">Demo prototype using synthetic data. This system does not replace trained professionals.</p>
          </div>
        </section>

        <section className="border-y border-border bg-card" aria-labelledby="process-heading">
          <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold uppercase text-teal-foreground">Clear by design</p>
              <h2 id="process-heading" className="mt-3 text-3xl font-bold text-primary">What happens after you share</h2>
              <p className="mt-4 text-muted-foreground">Nothing is automatic. The system organizes information so a trained person can decide how best to help.</p>
            </div>
            <ol className="mt-10 grid gap-8 border-t border-border pt-8 md:grid-cols-3">
              <li><span className="text-sm font-semibold text-teal">01</span><h3 className="mt-3 text-lg font-bold text-primary">You stay in control</h3><p className="mt-2 text-sm text-muted-foreground">Consent comes first. Share text or simulated voice input, and stop whenever you need.</p></li>
              <li><span className="text-sm font-semibold text-teal">02</span><h3 className="mt-3 text-lg font-bold text-primary">Support needs are summarized</h3><p className="mt-2 text-sm text-muted-foreground">A transparent 0–100 screening index and suggested support actions are prepared.</p></li>
              <li><span className="text-sm font-semibold text-teal">03</span><h3 className="mt-3 text-lg font-bold text-primary">A person reviews it</h3><p className="mt-2 text-sm text-muted-foreground">A trained counsellor or authorized officer makes every final decision.</p></li>
            </ol>
            <p className="mt-10 max-w-4xl border-l-4 border-teal bg-navy-soft px-5 py-4 text-sm">This is a preliminary screening result, not a clinical diagnosis. A trained counsellor or authorized officer must review the case.</p>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20" aria-labelledby="features-heading">
          <h2 id="features-heading" className="sr-only">
            Key capabilities
          </h2>
          <div className="grid gap-8 md:grid-cols-3">
            {FEATURES.map(({ icon: Icon, title, body }) => (
              <article key={title} className="border-t border-border pt-6">
                <span
                  aria-hidden="true"
                  className="flex h-11 w-11 items-center justify-center rounded-md bg-teal-soft text-teal-foreground"
                >
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="mt-4 text-lg font-semibold text-primary">{title}</h3>
                <p className="mt-2 text-muted-foreground">{body}</p>
              </article>
            ))}
          </div>
        </section>
      </main>
      <AppFooter />
    </div>
  );
}
