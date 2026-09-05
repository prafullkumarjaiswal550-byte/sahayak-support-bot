import { createFileRoute, Link } from "@tanstack/react-router";
import { HeartHandshake, Radar, UserCheck, ShieldCheck } from "lucide-react";
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
        <section className="mx-auto max-w-7xl px-4 pt-12 pb-10 sm:px-6 sm:pt-20">
          <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-teal/40 bg-teal-soft px-3 py-1 text-sm font-medium text-teal-foreground">
                <ShieldCheck className="h-4 w-4" aria-hidden="true" /> Smart India Hackathon · SIH26093
              </span>
              <h1 className="mt-5 text-4xl leading-tight font-bold text-primary sm:text-5xl">
                SAHAYAK
              </h1>
              <p className="mt-3 text-xl text-foreground/85">
                Early support. Safer response. Human-centred justice.
              </p>
              <p className="mt-5 max-w-2xl text-lg text-muted-foreground">
                An AI-assisted preliminary screening and support-prioritization prototype for victims
                and complainants of the National Helpline Against Atrocities.
              </p>
              <p className="mt-2 text-base text-muted-foreground" lang="hi">
                पीड़ितों और शिकायतकर्ताओं के लिए प्रारंभिक सहायता-प्राथमिकता प्रणाली।
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button asChild size="lg" className="h-12 px-6 text-base">
                  <Link to="/victim">Start Safe Assessment</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="h-12 px-6 text-base">
                  <Link to="/officer">View Officer Dashboard</Link>
                </Button>
              </div>
              <p className="mt-6 rounded-lg border border-amber/40 bg-amber-soft px-4 py-3 text-sm text-amber-foreground">
                Demo prototype using synthetic data. This system does not replace trained professionals.
              </p>
            </div>

            <div className="surface-card p-6 sm:p-8">
              <h2 className="text-lg font-semibold text-primary">What this prototype does</h2>
              <ul className="mt-4 space-y-3 text-base text-muted-foreground">
                <li>Listens to a narrative in the person's own words and language.</li>
                <li>Produces a transparent Stress Vulnerability Index from 0 to 100.</li>
                <li>Suggests support actions such as counselling, legal aid or shelter.</li>
                <li>Routes the case to a human reviewer — never to automatic action.</li>
              </ul>
              <p className="mt-5 rounded-lg border border-border bg-navy-soft px-4 py-3 text-sm">
                This is a preliminary screening result, not a clinical diagnosis. A trained counsellor
                or authorized officer must review the case.
              </p>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 pb-6 sm:px-6" aria-labelledby="features-heading">
          <h2 id="features-heading" className="sr-only">
            Key capabilities
          </h2>
          <div className="grid gap-5 md:grid-cols-3">
            {FEATURES.map(({ icon: Icon, title, body }) => (
              <article key={title} className="surface-card p-6">
                <span
                  aria-hidden="true"
                  className="flex h-11 w-11 items-center justify-center rounded-xl bg-teal-soft text-teal-foreground"
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
