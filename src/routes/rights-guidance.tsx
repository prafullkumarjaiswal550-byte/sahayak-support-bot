import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import {
  Users,
  ShieldAlert,
  Scale,
  Home,
  Clock,
  Mic,
  Square,
  HeartPulse,
  FileText,
  IndianRupee,
  ShieldCheck,
  Check,
} from "lucide-react";
import { AppFooter, AppHeader } from "@/components/sahayak/AppHeader";
import { DemoBadge, Disclaimer } from "@/components/sahayak/Brand";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import type { LanguageCode } from "@/lib/sahayak/types";

const TITLE = "Atrocity Incident Support & Rights Guidance — SAHAYAK";
const DESC =
  "Choose what happened in a few taps and see your next steps: immediate safety, psychological first aid, NHAA complaint registration, and legal relief and compensation guidance.";

export const Route = createFileRoute("/rights-guidance")({
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
  component: RightsGuidancePage,
});

type IncidentId =
  | "social_boycott"
  | "physical_violence"
  | "caste_discrimination"
  | "displacement"
  | "legal_delay";

const INCIDENTS: {
  id: IncidentId;
  label: string;
  hint: string;
  Icon: typeof Users;
}[] = [
  {
    id: "social_boycott",
    label: "Social boycott",
    hint: "People in the village or area are cutting you off",
    Icon: Users,
  },
  {
    id: "physical_violence",
    label: "Physical violence or threats",
    hint: "You were hurt, attacked or threatened",
    Icon: ShieldAlert,
  },
  {
    id: "caste_discrimination",
    label: "Caste discrimination",
    hint: "Insults, denial of entry, water, work or services",
    Icon: Scale,
  },
  {
    id: "displacement",
    label: "Forced to leave home",
    hint: "You had to move out or cannot return safely",
    Icon: Home,
  },
  {
    id: "legal_delay",
    label: "Long legal delay stress",
    hint: "Your case or complaint is stuck and it is wearing you down",
    Icon: Clock,
  },
];

const GUIDANCE: Record<IncidentId, string[]> = {
  social_boycott: [
    "Boycott and denial of services are recognised offences under the SC/ST (Prevention of Atrocities) Act.",
    "Write down dates and what was refused — shops, water, work, meetings.",
    "A counsellor can support you while the complaint is registered.",
  ],
  physical_violence: [
    "Your safety comes first. Move to a safe place or a trusted person if you can.",
    "A medical check-up also creates an official record of injuries.",
    "You may ask for police liaison review and, if needed, witness protection review.",
  ],
  caste_discrimination: [
    "Insults, humiliation and denial of access are covered by the Act.",
    "Note the place, time and who was present, in your own words.",
    "Legal aid support can be requested free of cost.",
  ],
  displacement: [
    "Shelter and rehabilitation support can be requested along with your complaint.",
    "Relief and rehabilitation entitlements exist for displacement caused by atrocity.",
    "You do not have to return to an unsafe place to file a complaint.",
  ],
  legal_delay: [
    "Delay stress is real and support is available while you wait.",
    "You may ask for a status update and for legal aid follow-up.",
    "Counselling callback can be requested at any stage.",
  ],
};

const STEPS = [
  {
    title: "Immediate safety",
    Icon: ShieldCheck,
    body: "Get to a safe place or a trusted person. If there is danger right now, call 112. Emergency help is never sent automatically — you decide.",
  },
  {
    title: "Psychological first aid",
    Icon: HeartPulse,
    body: "A trained counsellor can call you back and listen. No diagnosis is made, and nothing is shared without your permission.",
  },
  {
    title: "NHAA complaint registration",
    Icon: FileText,
    body: "Your account, in your own words, is prepared for registration with the National Helpline Against Atrocities. An officer reviews it.",
  },
  {
    title: "Legal relief & compensation info",
    Icon: IndianRupee,
    body: "Free legal aid, relief and rehabilitation entitlements are explained to you. A human officer confirms what applies to your case.",
  },
];

function RightsGuidancePage() {
  const [language, setLanguage] = useState<LanguageCode>("en");
  const [selected, setSelected] = useState<IncidentId[]>([]);
  const [text, setText] = useState("");
  const [step, setStep] = useState(0);
  const [listening, setListening] = useState(false);
  const [voiceNote, setVoiceNote] = useState<string | null>(null);
  const recRef = useRef<any>(null);

  useEffect(() => () => { try { recRef.current?.stop(); } catch { /* ignore */ } }, []);

  function toggle(id: IncidentId) {
    setSelected((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]));
  }

  function startVoice() {
    const SR =
      typeof window !== "undefined" &&
      ((window as any).SpeechRecognition || (window as any).webkitSpeechRecognition);
    if (!SR) {
      setVoiceNote("Speaking is not supported in this browser. You can type instead — a few words is enough.");
      return;
    }
    const rec = new SR();
    rec.lang = language === "en" ? "en-IN" : `${language}-IN`;
    rec.interimResults = false;
    rec.continuous = false;
    rec.onresult = (e: any) => {
      const said = Array.from(e.results).map((r: any) => r[0].transcript).join(" ");
      setText((t) => (t ? `${t} ${said}` : said));
    };
    rec.onerror = () =>
      setVoiceNote("We could not hear clearly. Please try again, or type a few words.");
    rec.onend = () => setListening(false);
    recRef.current = rec;
    setVoiceNote("Listening… speak in your own language, then press stop.");
    setListening(true);
    rec.start();
  }

  function stopVoice() {
    try { recRef.current?.stop(); } catch { /* ignore */ }
    setListening(false);
    setVoiceNote("Stopped. Your words stay on this page until you choose to continue.");
  }

  return (
    <div className="min-h-screen bg-background">
      <AppHeader language={language} onLanguageChange={setLanguage} showLeaveSafely />
      <main className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
        <div className="flex flex-wrap items-center gap-3">
          <h1 className="font-display text-2xl font-bold text-primary sm:text-3xl">
            Atrocity incident support &amp; rights guidance
          </h1>
          <DemoBadge />
        </div>
        <p className="mt-2 max-w-2xl text-lg text-muted-foreground">
          Tap what happened. You do not need to write much. Everything here is guidance only — a
          trained counsellor or authorized officer decides the next step with you.
        </p>

        <section className="surface-card mt-6 p-5 sm:p-6" aria-labelledby="incident-heading">
          <h2 id="incident-heading" className="font-display text-lg font-semibold text-primary">
            1. What happened?
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">Choose one or more. You can skip this.</p>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {INCIDENTS.map(({ id, label, hint, Icon }) => {
              const active = selected.includes(id);
              return (
                <button
                  key={id}
                  type="button"
                  aria-pressed={active}
                  onClick={() => toggle(id)}
                  className={`flex min-h-20 items-start gap-3 rounded-xl border p-4 text-left transition-colors ${
                    active
                      ? "border-teal bg-teal-soft text-teal-foreground"
                      : "border-border bg-card hover:bg-accent"
                  }`}
                >
                  <Icon className="mt-0.5 h-6 w-6 shrink-0" aria-hidden="true" />
                  <span>
                    <span className="block text-base font-semibold">{label}</span>
                    <span className="mt-0.5 block text-sm text-muted-foreground">{hint}</span>
                  </span>
                  {active && <Check className="ml-auto h-5 w-5 shrink-0" aria-hidden="true" />}
                </button>
              );
            })}
          </div>

          {selected.length > 0 && (
            <div className="mt-5 rounded-xl border border-border bg-navy-soft p-4">
              <h3 className="text-base font-semibold text-primary">What this usually means for you</h3>
              <ul className="mt-2 list-disc space-y-1.5 pl-5 text-sm text-muted-foreground">
                {selected.flatMap((id) =>
                  GUIDANCE[id].map((line) => <li key={`${id}-${line}`}>{line}</li>),
                )}
              </ul>
            </div>
          )}
        </section>

        <section className="surface-card mt-5 p-5 sm:p-6" aria-labelledby="say-heading">
          <h2 id="say-heading" className="font-display text-lg font-semibold text-primary">
            2. Say it or write it — a few words is enough
          </h2>
          <div className="mt-3 flex flex-wrap items-center gap-2">
            {!listening ? (
              <Button type="button" size="lg" className="h-14 text-base" onClick={startVoice}>
                <Mic className="h-5 w-5" aria-hidden="true" /> Speak instead of typing
              </Button>
            ) : (
              <Button type="button" size="lg" variant="secondary" className="h-14 text-base" onClick={stopVoice}>
                <Square className="h-5 w-5" aria-hidden="true" /> Stop
              </Button>
            )}
            {listening && (
              <span className="text-sm text-muted-foreground" aria-hidden="true">
                Listening…
              </span>
            )}
          </div>
          <p aria-live="polite" className="mt-2 text-sm text-muted-foreground">
            {voiceNote ?? "Your words are not sent anywhere from this page."}
          </p>
          <label htmlFor="rg-text" className="sr-only">
            Describe what happened
          </label>
          <Textarea
            id="rg-text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="For example: they stopped us from using the water tap."
            className="mt-3 min-h-32 text-base"
          />
        </section>

        <section className="surface-card mt-5 p-5 sm:p-6" aria-labelledby="steps-heading">
          <h2 id="steps-heading" className="font-display text-lg font-semibold text-primary">
            3. Your four steps
          </h2>
          <ol className="mt-4 space-y-3">
            {STEPS.map((s, i) => {
              const done = i < step;
              const current = i === step;
              return (
                <li key={s.title}>
                  <button
                    type="button"
                    onClick={() => setStep(i)}
                    aria-current={current ? "step" : undefined}
                    className={`flex w-full items-start gap-4 rounded-xl border p-4 text-left transition-colors ${
                      current
                        ? "border-primary bg-navy-soft"
                        : done
                          ? "border-teal/50 bg-teal-soft/60"
                          : "border-border bg-card hover:bg-accent"
                    }`}
                  >
                    <span
                      className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full border ${
                        done ? "border-teal bg-teal-soft text-teal-foreground" : "border-border"
                      }`}
                    >
                      {done ? (
                        <Check className="h-5 w-5" aria-hidden="true" />
                      ) : (
                        <s.Icon className="h-5 w-5" aria-hidden="true" />
                      )}
                    </span>
                    <span>
                      <span className="block text-base font-semibold text-primary">
                        Step {i + 1} · {s.title}
                      </span>
                      <span className="mt-1 block text-sm text-muted-foreground">{s.body}</span>
                    </span>
                  </button>
                </li>
              );
            })}
          </ol>
          <div className="mt-4 flex flex-wrap gap-2">
            <Button
              type="button"
              variant="outline"
              disabled={step === 0}
              onClick={() => setStep((s) => Math.max(0, s - 1))}
            >
              Back a step
            </Button>
            <Button
              type="button"
              variant="outline"
              disabled={step >= STEPS.length - 1}
              onClick={() => setStep((s) => Math.min(STEPS.length - 1, s + 1))}
            >
              Mark done, next step
            </Button>
          </div>
        </section>

        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          <Button asChild size="lg" className="h-14 text-base">
            <Link to="/victim">Continue to a safe assessment</Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="h-14 text-base">
            <Link to="/support-directory">See counselling, legal and shelter help</Link>
          </Button>
        </div>

        <Disclaimer className="mt-6" />
      </main>
      <AppFooter />
    </div>
  );
}
