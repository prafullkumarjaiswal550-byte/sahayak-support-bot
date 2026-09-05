import { createFileRoute } from "@tanstack/react-router";
import { AppFooter, AppHeader } from "@/components/sahayak/AppHeader";
import { SCORING_RULES } from "@/lib/sahayak/scoring";
import { INDICATOR_LABELS } from "@/lib/sahayak/labels";

const TITLE = "Privacy, Ethics & Limitations — SAHAYAK";
const DESC =
  "How SAHAYAK handles consent, data minimization, human-in-the-loop review, bias monitoring and the limits of language and voice signals.";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: About,
});

const PRINCIPLES: { title: string; body: string }[] = [
  { title: "Consent before analysis", body: "No text or voice input is screened until the person explicitly consents. Consent can be withdrawn at any point, and the person can stop or leave the screen at any time." },
  { title: "Data minimization", body: "Only a paraphrased summary, screening signals and consent status are stored. Raw narratives, names, phone numbers, addresses and recordings are not retained in this prototype." },
  { title: "No clinical diagnosis", body: "SAHAYAK performs AI-assisted preliminary risk screening and support prioritization. It does not diagnose depression, PTSD, suicide risk or any other clinical condition." },
  { title: "Human-in-the-loop review", body: "Every case is flagged for review by a trained counsellor or authorized officer. Officers can override any AI recommendation, and the override is recorded with a reason." },
  { title: "No automated punitive action", body: "The system never contacts police, hospitals, family members or any authority automatically. Every outbound action requires explicit consent and configurable human approval." },
  { title: "No inference of identity or credibility", body: "The system never infers caste, religion, gender, guilt, criminality, credibility or truthfulness from language, accent, voice or writing style." },
  { title: "Secure access control", body: "Role-based permissions separate victim, counsellor, officer and admin views. Officer notes are never shown to complainants, and aggregate analytics never expose raw narratives." },
  { title: "Audit logs", body: "Each case carries a timeline explaining why a recommendation was made, who reviewed it and what changed — without exposing sensitive detail unnecessarily." },
  { title: "Synthetic demo data", body: "Every case, service and contact number in this prototype is fictional and clearly labelled as demo data." },
  { title: "Data retention configuration", body: "Retention windows are configurable per deployment; the demo keeps records only in the current browser session." },
  { title: "Accessibility and multilingual support", body: "Keyboard navigation, ARIA labelling, screen-reader status messages, large touch targets, reduced-motion support and eleven UI languages." },
  { title: "Bias monitoring", body: "Scoring rules are content-based and published below. Short, informal, dialect-rich or grammatically irregular narratives are never scored lower for that reason." },
];

function About() {
  return (
    <div className="min-h-screen bg-background">
      <AppHeader />
      <main className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
        <h1 className="text-3xl font-bold text-primary">Privacy, ethics, limitations and methodology</h1>
        <p className="mt-3 text-lg text-muted-foreground">
          SAHAYAK is a demonstration prototype. It supports human decision-making; it does not make
          decisions.
        </p>

        <div className="mt-8 rounded-xl border border-critical/40 bg-critical-soft p-5">
          <h2 className="text-lg font-semibold text-critical">Important disclaimer</h2>
          <p className="mt-2 text-foreground">
            Emotion and stress signals from language or voice are uncertain and can be affected by
            language, culture, disability, health, environment, and communication style. The system
            must not be used as the sole basis for any legal, police, medical, or welfare decision.
          </p>
        </div>

        <section className="mt-10" aria-labelledby="principles">
          <h2 id="principles" className="text-2xl font-semibold text-primary">
            Principles
          </h2>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            {PRINCIPLES.map((p) => (
              <article key={p.title} className="surface-card p-5">
                <h3 className="text-base font-semibold text-primary">{p.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{p.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-10" aria-labelledby="method">
          <h2 id="method" className="text-2xl font-semibold text-primary">
            Methodology — how the Stress Vulnerability Index is built
          </h2>
          <p className="mt-2 text-muted-foreground">
            A transparent rule-based layer adds points only for explicit or strongly indicated content.
            An optional language-model extraction layer may refine the indicators, but never replaces
            these published rules. The final score is clamped between 0 and 100.
          </p>
          <div className="surface-card mt-4 overflow-x-auto">
            <table className="w-full text-left text-sm">
              <caption className="sr-only">Scoring rules by indicator</caption>
              <thead className="bg-navy-soft">
                <tr>
                  <th scope="col" className="px-4 py-3 font-semibold">Indicator</th>
                  <th scope="col" className="px-4 py-3 font-semibold">Points</th>
                  <th scope="col" className="px-4 py-3 font-semibold">Severity</th>
                </tr>
              </thead>
              <tbody>
                {SCORING_RULES.map((r) => (
                  <tr key={r.indicator} className="border-t border-border">
                    <td className="px-4 py-3">{INDICATOR_LABELS[r.indicator]}</td>
                    <td className="px-4 py-3">+{r.points}</td>
                    <td className="px-4 py-3 capitalize">{r.severity}</td>
                  </tr>
                ))}
                <tr className="border-t border-border">
                  <td className="px-4 py-3">Multiple severe indicators together</td>
                  <td className="px-4 py-3">+10 (maximum)</td>
                  <td className="px-4 py-3">—</td>
                </tr>
              </tbody>
            </table>
          </div>
          <ul className="mt-4 list-disc space-y-2 pl-6 text-muted-foreground">
            <li>Thresholds: 0–24 Low, 25–49 Moderate, 50–74 High, 75–100 Critical.</li>
            <li>Any explicit immediate-danger statement marks an immediate safety concern.</li>
            <li>Any explicit self-harm statement triggers emergency human escalation.</li>
            <li>Ambiguity is reported as uncertainty and routed to a human — never invented as fact.</li>
            <li>Typing speed, grammar, spelling, accent, pitch and dialect are never used as evidence.</li>
          </ul>
        </section>

        <section className="mt-10" aria-labelledby="limits">
          <h2 id="limits" className="text-2xl font-semibold text-primary">
            Known limitations
          </h2>
          <ul className="mt-3 list-disc space-y-2 pl-6 text-muted-foreground">
            <li>Keyword-based screening can miss indirect disclosures and can misread metaphor or irony.</li>
            <li>Voice analysis in this prototype is simulated; no audio is uploaded by default.</li>
            <li>The system cannot verify whether the situation described is happening or accurate.</li>
            <li>Machine translation and static demo translations may not carry cultural nuance.</li>
          </ul>
        </section>
      </main>
      <AppFooter />
    </div>
  );
}
