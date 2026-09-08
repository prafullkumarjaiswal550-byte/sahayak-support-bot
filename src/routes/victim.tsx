import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import {
  AlertTriangle,
  Gavel,
  HeartHandshake,
  Home,
  Mic,
  Square,
  RotateCcw,
  Trash2,
  Stethoscope,
  Loader2,
  Check,
} from "lucide-react";
import { AppFooter, AppHeader } from "@/components/sahayak/AppHeader";
import { DemoBadge, Disclaimer } from "@/components/sahayak/Brand";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { SAMPLE_NARRATIVES } from "@/lib/sahayak/demoData";
import { useLanguage } from "@/lib/sahayak/language";
import { analyzeLocally, analyzeNarrativeForSupportNeeds } from "@/lib/sahayak/analysis.functions";
import { createCase, setDemoMode, useSahayakState } from "@/lib/sahayak/store";

const TITLE = "Safe Assessment — SAHAYAK Victim Support";
const DESC =
  "A calm, consent-first space to describe what happened in your own words and receive preliminary support suggestions reviewed by a trained person.";

export const Route = createFileRoute("/victim")({
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
  component: VictimPage,
});

const MAX_CHARS = 5000;

function VictimPage() {
  const navigate = useNavigate();
  const { demoMode } = useSahayakState();
  const { language, setLanguage, t } = useLanguage();
  const [consent, setConsent] = useState(false);
  const [narrative, setNarrative] = useState("");
  const [flags, setFlags] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState("");
  const [recording, setRecording] = useState<"idle" | "recording" | "recorded">("idle");
  const [seconds, setSeconds] = useState(0);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  const QUICK = [
    { id: "immediate_danger", label: t("qDanger"), Icon: AlertTriangle },
    { id: "afraid_home", label: t("qHome"), Icon: Home },
    { id: "medical", label: t("qMedical"), Icon: Stethoscope },
    { id: "legal", label: t("qLegal"), Icon: Gavel },
    { id: "counsellor", label: t("qCounsellor"), Icon: HeartHandshake },
  ];

  useEffect(() => () => { if (timer.current) clearInterval(timer.current); }, []);

  function startRecording() {
    setRecording("recording");
    setSeconds(0);
    setStatus("Voice input started. This is a simulated recording; no audio leaves your device.");
    timer.current = setInterval(() => setSeconds((s) => s + 1), 1000);
  }
  function stopRecording() {
    if (timer.current) clearInterval(timer.current);
    setRecording("recorded");
    setStatus("Voice input stopped.");
  }
  function deleteRecording() {
    if (timer.current) clearInterval(timer.current);
    setRecording("idle");
    setSeconds(0);
    setStatus("Voice input deleted.");
  }

  function toggleFlag(idFlag: string) {
    setFlags((f) => (f.includes(idFlag) ? f.filter((x) => x !== idFlag) : [...f, idFlag]));
  }

  function leaveSafely() {
    setNarrative("");
    setFlags([]);
    setConsent(false);
    deleteRecording();
  }

  const valid = consent && (narrative.trim().length >= 10 || flags.length > 0);

  async function submit() {
    setError(null);
    if (!consent) {
      setError(t("consentNeeded"));
      return;
    }
    if (!valid) {
      setError(t("quickSub"));
      return;
    }
    setLoading(true);
    setStatus(t("preparing"));
    const payload = {
      narrative: narrative.trim() || "Support request submitted using quick support options.",
      language,
      consentGiven: consent,
      demoMode,
      quickFlags: flags,
      voiceMetadata: recording === "recorded" ? { durationSeconds: seconds, simulated: true } : null,
    };
    try {
      let analysis;
      try {
        analysis = await analyzeNarrativeForSupportNeeds({ data: payload });
      } catch {
        // Graceful fallback: never surface a raw provider or network error.
        analysis = analyzeLocally(payload);
      }
      const record = createCase({ analysis, language, consentGiven: true, demoData: true });
      navigate({ to: "/assessment", search: { case: record.id } });
    } catch {
      setError(
        "We could not prepare a summary just now. You can try again, or ask for a human support callback.",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <AppHeader showLeaveSafely onLeaveSafely={leaveSafely} />
      <main className="mx-auto max-w-2xl px-4 py-8 sm:px-6">
        <p aria-live="polite" className="sr-only">
          {status}
        </p>

        <div className="flex flex-wrap items-center gap-3">
          <h1 className="text-2xl font-bold text-primary sm:text-3xl">{t("safeSpace")}</h1>
          <DemoBadge label={demoMode ? "DEMO" : "LIVE"} />
        </div>
        <p className="mt-2 text-lg text-muted-foreground">
          {t("thanks")} {t("pause")} {t("safety")}
        </p>

        {/* Step 1 — consent */}
        <section className="surface-card mt-6 p-5 sm:p-6" aria-labelledby="consent-heading">
          <StepLabel n={1} text={t("stepOf")} />
          <h2 id="consent-heading" className="mt-2 text-xl font-semibold text-primary">
            {t("consentTitle")}
          </h2>
          <ul className="mt-3 space-y-1.5 text-base text-muted-foreground">
            <li className="flex gap-2"><Check className="mt-1 h-4 w-4 shrink-0 text-teal" aria-hidden="true" />{t("consentPoint1")}</li>
            <li className="flex gap-2"><Check className="mt-1 h-4 w-4 shrink-0 text-teal" aria-hidden="true" />{t("consentPoint2")}</li>
            <li className="flex gap-2"><Check className="mt-1 h-4 w-4 shrink-0 text-teal" aria-hidden="true" />{t("consentPoint3")}</li>
          </ul>
          <label className="mt-4 flex items-start gap-3 rounded-lg border-2 border-teal/40 bg-navy-soft p-4">
            <Checkbox
              checked={consent}
              onCheckedChange={(v) => setConsent(v === true)}
              aria-describedby="consent-heading"
              className="mt-1 h-5 w-5"
            />
            <span className="text-lg font-medium">{t("consentCheckbox")}</span>
          </label>
        </section>

        {/* Step 2 — quick choices first, minimal typing */}
        <section className="surface-card mt-5 p-5 sm:p-6" aria-labelledby="quick-heading">
          <StepLabel n={2} text={t("stepOf")} />
          <h2 id="quick-heading" className="mt-2 text-xl font-semibold text-primary">
            {t("quickTitle")}
          </h2>
          <p className="mt-1 text-base text-muted-foreground">{t("quickSub")}</p>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {QUICK.map(({ id: qid, label, Icon }) => {
              const active = flags.includes(qid);
              return (
                <button
                  key={qid}
                  type="button"
                  aria-pressed={active}
                  disabled={!consent}
                  onClick={() => toggleFlag(qid)}
                  className={`flex min-h-16 items-center gap-3 rounded-xl border-2 px-4 py-3 text-left text-base transition-colors disabled:opacity-50 ${
                    active
                      ? "border-teal bg-teal-soft font-semibold text-teal-foreground"
                      : "border-border bg-card hover:bg-accent"
                  }`}
                >
                  <Icon className="h-6 w-6 shrink-0" aria-hidden="true" />
                  {label}
                  {active && <Check className="ml-auto h-5 w-5" aria-label={t("selected")} />}
                </button>
              );
            })}
          </div>
        </section>

        {/* Step 3 — optional words / voice */}
        <section className="surface-card mt-5 p-5 sm:p-6" aria-labelledby="story-heading">
          <StepLabel n={3} text={t("stepOf")} />
          <h2 id="story-heading" className="mt-2 text-xl font-semibold text-primary">
            {t("yourWords")}
          </h2>
          <label htmlFor="narrative" className="sr-only">
            {t("yourWords")}
          </label>
          <Textarea
            id="narrative"
            value={narrative}
            disabled={!consent}
            maxLength={MAX_CHARS}
            onChange={(e) => setNarrative(e.target.value)}
            placeholder={t("narrativePlaceholder")}
            className="mt-3 min-h-40 text-base"
          />
          <div className="mt-3 flex flex-wrap items-center gap-2">
            {recording !== "recording" ? (
              <Button type="button" variant="outline" size="lg" disabled={!consent} onClick={startRecording}>
                <Mic className="h-5 w-5" aria-hidden="true" /> {t("useVoice")}
              </Button>
            ) : (
              <Button type="button" variant="secondary" size="lg" onClick={stopRecording}>
                <Square className="h-5 w-5" aria-hidden="true" /> {t("stopVoice")}
              </Button>
            )}
            {recording === "recorded" && (
              <>
                <Button type="button" variant="ghost" onClick={startRecording}>
                  <RotateCcw className="h-4 w-4" aria-hidden="true" />
                </Button>
                <Button type="button" variant="ghost" onClick={deleteRecording}>
                  <Trash2 className="h-4 w-4" aria-hidden="true" />
                </Button>
              </>
            )}
            {recording !== "idle" && (
              <span className="text-sm text-muted-foreground">{seconds}s</span>
            )}
          </div>
          <p className="mt-2 text-sm text-muted-foreground">{t("reviewNote")}</p>
        </section>

        {error && (
          <p role="alert" className="mt-5 rounded-lg border border-critical/40 bg-critical-soft px-4 py-3 text-critical">
            {error}
          </p>
        )}

        <div className="mt-6">
          <Button size="lg" className="h-16 w-full text-lg" disabled={!consent || loading} onClick={submit}>
            {loading ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" /> {t("preparing")}
              </>
            ) : (
              t("submit")
            )}
          </Button>
          {!consent && (
            <p className="mt-2 text-center text-base text-muted-foreground">{t("consentNeeded")}</p>
          )}
        </div>

        {/* Demo controls tucked away so victims see a simple page */}
        <details className="mt-6 rounded-lg border border-border bg-card p-4 text-sm">
          <summary className="cursor-pointer font-medium text-muted-foreground">
            Demo controls (for judges / presenters)
          </summary>
          <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
            <p className="text-muted-foreground">
              Demo mode on: simulated analysis. Off: secure server-side analysis when configured.
            </p>
            <label className="flex items-center gap-2">
              <Switch checked={demoMode} onCheckedChange={setDemoMode} aria-label="Demo mode" />
              {demoMode ? "ON" : "OFF"}
            </label>
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {SAMPLE_NARRATIVES.map((s) => (
              <button
                key={s.id}
                type="button"
                disabled={!consent}
                onClick={() => {
                  setNarrative(s.text);
                  setLanguage(s.language);
                }}
                className="rounded-full border border-border bg-card px-3 py-1.5 text-sm hover:bg-accent disabled:opacity-50"
              >
                {s.label}
              </button>
            ))}
          </div>
        </details>

        <Disclaimer className="mt-6" />
      </main>
      <AppFooter />
    </div>
  );
}

function StepLabel({ n, text }: { n: number; text: string }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full bg-teal-soft px-3 py-1 text-xs font-semibold uppercase text-teal-foreground">
      {text} {n} / 3
    </span>
  );
}
