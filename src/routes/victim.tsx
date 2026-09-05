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
} from "lucide-react";
import { AppFooter, AppHeader } from "@/components/sahayak/AppHeader";
import { DemoBadge, Disclaimer } from "@/components/sahayak/Brand";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { SAMPLE_NARRATIVES } from "@/lib/sahayak/demoData";
import { t } from "@/lib/sahayak/i18n";
import { analyzeLocally, analyzeNarrativeForSupportNeeds } from "@/lib/sahayak/analysis.functions";
import { createCase, setDemoMode, useSahayakState } from "@/lib/sahayak/store";
import type { LanguageCode } from "@/lib/sahayak/types";

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

const QUICK = [
  { id: "immediate_danger", label: "I am in immediate danger", Icon: AlertTriangle },
  { id: "afraid_home", label: "I am afraid to return home", Icon: Home },
  { id: "medical", label: "I need medical help", Icon: Stethoscope },
  { id: "legal", label: "I need legal help", Icon: Gavel },
  { id: "counsellor", label: "I want to talk to a counsellor", Icon: HeartHandshake },
];

const MAX_CHARS = 5000;

function VictimPage() {
  const navigate = useNavigate();
  const { demoMode } = useSahayakState();
  const [language, setLanguage] = useState<LanguageCode>("en");
  const [consent, setConsent] = useState(false);
  const [narrative, setNarrative] = useState("");
  const [flags, setFlags] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState("");
  const [recording, setRecording] = useState<"idle" | "recording" | "recorded">("idle");
  const [seconds, setSeconds] = useState(0);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

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
    setStatus("Voice input stopped. You can retry or delete it.");
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
      setError("Please give consent before the preliminary screening can begin.");
      return;
    }
    if (!valid) {
      setError("Please describe a little more, or choose one of the support buttons above.");
      return;
    }
    setLoading(true);
    setStatus("Preparing a preliminary support summary…");
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
      const record = createCase({
        analysis,
        language,
        consentGiven: true,
        demoData: true,
      });
      setStatus("A preliminary support summary is ready.");
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
      <AppHeader
        language={language}
        onLanguageChange={setLanguage}
        showLeaveSafely
        onLeaveSafely={leaveSafely}
      />
      <main className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
        <p aria-live="polite" className="sr-only">
          {status}
        </p>

        <div className="flex flex-wrap items-center gap-3">
          <h1 className="text-2xl font-bold text-primary sm:text-3xl">You are in a safe space</h1>
          <DemoBadge label={demoMode ? "AI simulation" : "Live analysis"} />
        </div>
        <p className="mt-2 text-lg text-muted-foreground">
          {t(language, "thanks")} {t(language, "pause")} {t(language, "safety")}
        </p>

        <section className="surface-card mt-6 p-5 sm:p-6" aria-labelledby="consent-heading">
          <h2 id="consent-heading" className="text-lg font-semibold text-primary">
            {t(language, "consentTitle")}
          </h2>
          <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm text-muted-foreground">
            <li>Only the words you write here (and any support buttons you select) are analyzed.</li>
            <li>Your name, phone number and address are not asked for and not stored.</li>
            <li>The result is a preliminary support suggestion, not a diagnosis or a legal finding.</li>
            <li>Nobody is contacted automatically. You can stop at any time.</li>
          </ul>
          <label className="mt-4 flex items-start gap-3 rounded-lg border border-border bg-navy-soft p-4">
            <Checkbox
              checked={consent}
              onCheckedChange={(v) => setConsent(v === true)}
              aria-describedby="consent-heading"
              className="mt-1"
            />
            <span className="text-base font-medium">{t(language, "consentCheckbox")}</span>
          </label>
        </section>

        <section className="surface-card mt-5 p-5 sm:p-6" aria-labelledby="story-heading">
          <h2 id="story-heading" className="text-lg font-semibold text-primary">
            In your own words
          </h2>
          <label htmlFor="narrative" className="sr-only">
            Describe what happened
          </label>
          <Textarea
            id="narrative"
            value={narrative}
            disabled={!consent}
            maxLength={MAX_CHARS}
            onChange={(e) => setNarrative(e.target.value)}
            placeholder={t(language, "narrativePlaceholder")}
            className="mt-3 min-h-44 text-base"
          />
          <div className="mt-2 flex flex-wrap items-center justify-between gap-2 text-sm text-muted-foreground">
            <span>
              {narrative.length} / {MAX_CHARS} characters
            </span>
            <span>{t(language, "reviewNote")}</span>
          </div>

          <div className="mt-5 rounded-lg border border-border p-4">
            <div className="flex flex-wrap items-center gap-2">
              {recording !== "recording" ? (
                <Button type="button" variant="outline" disabled={!consent} onClick={startRecording}>
                  <Mic className="h-4 w-4" aria-hidden="true" />
                  {recording === "recorded" ? "Record again" : "Use voice instead"}
                </Button>
              ) : (
                <Button type="button" variant="secondary" onClick={stopRecording}>
                  <Square className="h-4 w-4" aria-hidden="true" /> Stop recording
                </Button>
              )}
              {recording === "recorded" && (
                <>
                  <Button type="button" variant="ghost" onClick={startRecording}>
                    <RotateCcw className="h-4 w-4" aria-hidden="true" /> Retry
                  </Button>
                  <Button type="button" variant="ghost" onClick={deleteRecording}>
                    <Trash2 className="h-4 w-4" aria-hidden="true" /> Delete
                  </Button>
                </>
              )}
              {recording !== "idle" && (
                <span className="text-sm text-muted-foreground">
                  {recording === "recording" ? "Recording" : "Saved locally"} · {seconds}s
                </span>
              )}
            </div>
            <p className="mt-3 text-sm text-muted-foreground">
              Voice analysis is simulated in this prototype. No audio is uploaded unless a speech API
              is configured by the deployment team.
            </p>
          </div>
        </section>

        <section className="surface-card mt-5 p-5 sm:p-6" aria-labelledby="quick-heading">
          <h2 id="quick-heading" className="text-lg font-semibold text-primary">
            Quick support
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Select anything that applies. You do not have to explain more than you want to.
          </p>
          <div className="mt-4 grid gap-2 sm:grid-cols-2">
            {QUICK.map(({ id: qid, label, Icon }) => {
              const active = flags.includes(qid);
              return (
                <button
                  key={qid}
                  type="button"
                  aria-pressed={active}
                  disabled={!consent}
                  onClick={() => toggleFlag(qid)}
                  className={`flex min-h-12 items-center gap-3 rounded-xl border px-4 py-3 text-left text-base transition-colors disabled:opacity-50 ${
                    active
                      ? "border-teal bg-teal-soft text-teal-foreground font-semibold"
                      : "border-border bg-card hover:bg-accent"
                  }`}
                >
                  <Icon className="h-5 w-5 shrink-0" aria-hidden="true" />
                  {label}
                  {active && <span className="ml-auto text-sm">Selected</span>}
                </button>
              );
            })}
          </div>
        </section>

        <section className="surface-card mt-5 p-5 sm:p-6" aria-labelledby="demo-heading">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 id="demo-heading" className="text-base font-semibold text-primary">
                Demo mode
              </h2>
              <p className="text-sm text-muted-foreground">
                On: deterministic simulated analysis, no external service. Off: secure server-side
                analysis when a key is configured, with automatic fallback.
              </p>
            </div>
            <label className="flex items-center gap-2 text-sm">
              <Switch checked={demoMode} onCheckedChange={setDemoMode} aria-label="Demo mode" />
              {demoMode ? "ON" : "OFF"}
            </label>
          </div>
          <div className="mt-4">
            <p className="text-sm font-medium">Try a synthetic sample narrative:</p>
            <div className="mt-2 flex flex-wrap gap-2">
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
          </div>
        </section>

        {error && (
          <p role="alert" className="mt-5 rounded-lg border border-critical/40 bg-critical-soft px-4 py-3 text-critical">
            {error}
          </p>
        )}

        <div className="mt-6">
          <Button
            size="lg"
            className="h-14 w-full text-base"
            disabled={!consent || loading}
            onClick={submit}
          >
            {loading ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" /> Preparing a preliminary
                support summary…
              </>
            ) : (
              t(language, "submit")
            )}
          </Button>
          {!consent && (
            <p className="mt-2 text-center text-sm text-muted-foreground">
              Analysis stays disabled until you give consent above.
            </p>
          )}
        </div>

        <Disclaimer className="mt-6" />
      </main>
      <AppFooter />
    </div>
  );
}
