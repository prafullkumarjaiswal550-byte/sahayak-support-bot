import { useState } from "react";
import { CalendarClock, PhoneCall, ShieldCheck, Siren, Video } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

type Availability = "online" | "soon" | "slot";

interface Specialist {
  id: string;
  name: string;
  role: string;
  specializations: string[];
  languages: string[];
  gender: "female" | "male";
  modes: string[];
  empanelled: boolean;
  availability: Availability;
  availabilityText: string;
}

/** Synthetic demo listings. Replace with verified empanelment data before real use. */
const SPECIALISTS: Specialist[] = [
  {
    id: "sp-1",
    name: "Dr. A. Meera (Demo)",
    role: "Clinical Psychologist",
    specializations: ["Caste Atrocity Trauma", "PTSD Specialist"],
    languages: ["Hindi", "English", "Tamil"],
    gender: "female",
    modes: ["video", "voice", "chat"],
    empanelled: true,
    availability: "online",
    availabilityText: "Online — available now",
  },
  {
    id: "sp-2",
    name: "Dr. S. Kulkarni (Demo)",
    role: "Psychiatrist",
    specializations: ["Crisis Intervention", "Anxiety & Panic"],
    languages: ["Marathi", "Hindi", "English"],
    gender: "male",
    modes: ["video", "voice", "inperson"],
    empanelled: true,
    availability: "soon",
    availabilityText: "Available in 15 mins",
  },
  {
    id: "sp-3",
    name: "Dr. R. Banerjee (Demo)",
    role: "Trauma Counsellor",
    specializations: ["Caste Atrocity Trauma", "Grief Support"],
    languages: ["Bengali", "Hindi", "English"],
    gender: "female",
    modes: ["voice", "chat"],
    empanelled: true,
    availability: "slot",
    availabilityText: "Next available slot: today 4 PM",
  },
  {
    id: "sp-4",
    name: "Dr. K. Raju (Demo)",
    role: "Psychiatrist",
    specializations: ["PTSD Specialist", "Crisis Intervention"],
    languages: ["Telugu", "Kannada", "English"],
    gender: "male",
    modes: ["video", "inperson"],
    empanelled: false,
    availability: "slot",
    availabilityText: "Next available slot: tomorrow 11 AM",
  },
  {
    id: "sp-5",
    name: "Dr. N. Fatima (Demo)",
    role: "Clinical Psychologist",
    specializations: ["Anxiety & Panic", "Women's Safety Counselling"],
    languages: ["Urdu", "Hindi", "English"],
    gender: "female",
    modes: ["video", "voice", "chat"],
    empanelled: true,
    availability: "online",
    availabilityText: "Online — available now",
  },
  {
    id: "sp-6",
    name: "Dr. J. Patel (Demo)",
    role: "Trauma Counsellor",
    specializations: ["Caste Atrocity Trauma", "Crisis Intervention"],
    languages: ["Gujarati", "Hindi", "English"],
    gender: "male",
    modes: ["chat", "inperson"],
    empanelled: true,
    availability: "soon",
    availabilityText: "Available in 15 mins",
  },
];

const LANGUAGES = ["Any language", "Hindi", "English", "Regional languages"] as const;
const GENDERS = ["Any", "Female", "Male"] as const;
const MODES = [
  { key: "any", label: "Any type" },
  { key: "video", label: "Immediate video call" },
  { key: "voice", label: "Voice call" },
  { key: "chat", label: "Anonymous chat" },
  { key: "inperson", label: "In-person (district hospital)" },
] as const;

const MAIN_LANGS = ["Hindi", "English"];

const DOT: Record<Availability, string> = {
  online: "bg-emerald-500",
  soon: "bg-amber-500",
  slot: "bg-sky-500",
};

export function TelePsychiatryNetwork() {
  const [language, setLanguage] = useState<(typeof LANGUAGES)[number]>("Any language");
  const [gender, setGender] = useState<(typeof GENDERS)[number]>("Any");
  const [mode, setMode] = useState<string>("any");
  const [freeOnly, setFreeOnly] = useState(false);

  const results = SPECIALISTS.filter((s) => {
    if (language === "Hindi" || language === "English") {
      if (!s.languages.includes(language)) return false;
    } else if (language === "Regional languages") {
      if (!s.languages.some((l) => !MAIN_LANGS.includes(l))) return false;
    }
    if (gender !== "Any" && s.gender !== gender.toLowerCase()) return false;
    if (mode !== "any" && !s.modes.includes(mode)) return false;
    if (freeOnly && !s.empanelled) return false;
    return true;
  });

  return (
    <section aria-labelledby="tele-network" className="mt-10">
      <h2 id="tele-network" className="text-xl font-semibold sm:text-2xl">
        Emergency tele-psychiatry &amp; trauma counselling network
      </h2>
      <p className="mt-2 max-w-3xl text-sm text-muted-foreground">
        You can choose who you speak to, in the language you are most comfortable with. All listings
        here are demo entries for this prototype. No one will be contacted without your consent.
      </p>

      <Card className="mt-4">
        <CardContent className="grid gap-4 p-5 sm:grid-cols-2 lg:grid-cols-4">
          <Field label="Language preference" id="tp-lang">
            <select
              id="tp-lang"
              value={language}
              onChange={(e) => setLanguage(e.target.value as (typeof LANGUAGES)[number])}
              className="h-10 w-full rounded-lg border border-input bg-card px-3 text-sm"
            >
              {LANGUAGES.map((l) => (
                <option key={l}>{l}</option>
              ))}
            </select>
          </Field>
          <Field label="Doctor gender" id="tp-gender">
            <select
              id="tp-gender"
              value={gender}
              onChange={(e) => setGender(e.target.value as (typeof GENDERS)[number])}
              className="h-10 w-full rounded-lg border border-input bg-card px-3 text-sm"
            >
              {GENDERS.map((g) => (
                <option key={g}>{g}</option>
              ))}
            </select>
          </Field>
          <Field label="Consultation type" id="tp-mode">
            <select
              id="tp-mode"
              value={mode}
              onChange={(e) => setMode(e.target.value)}
              className="h-10 w-full rounded-lg border border-input bg-card px-3 text-sm"
            >
              {MODES.map((m) => (
                <option key={m.key} value={m.key}>
                  {m.label}
                </option>
              ))}
            </select>
          </Field>
          <label className="flex items-end gap-2 text-sm sm:pb-2">
            <input
              type="checkbox"
              checked={freeOnly}
              onChange={(e) => setFreeOnly(e.target.checked)}
              className="h-5 w-5 rounded border-input"
            />
            <span>Government empanelled (Tele-MANAS / MoSJE verified) — free of cost</span>
          </label>
        </CardContent>
      </Card>

      {results.length === 0 ? (
        <p className="mt-4 text-sm text-muted-foreground">
          No specialists match these choices right now. Try widening one of the filters.
        </p>
      ) : (
        <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {results.map((s) => (
            <Card key={s.id} className="flex flex-col">
              <CardContent className="flex flex-1 flex-col gap-3 p-5">
                <div>
                  <h3 className="text-base font-semibold">{s.name}</h3>
                  <p className="text-sm text-muted-foreground">{s.role}</p>
                </div>

                {s.empanelled && (
                  <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-teal-soft px-2.5 py-1 text-xs font-medium text-teal-foreground">
                    <ShieldCheck className="h-3.5 w-3.5" aria-hidden="true" />
                    Tele-MANAS / MoSJE empanelled specialist
                  </span>
                )}

                <div className="flex flex-wrap gap-1.5">
                  {s.specializations.map((t) => (
                    <span key={t} className="rounded-full bg-muted px-2.5 py-1 text-xs">
                      {t}
                    </span>
                  ))}
                </div>

                <p className="text-sm">
                  <span className="text-muted-foreground">Speaks:</span> {s.languages.join(", ")}
                </p>

                <p className="flex items-center gap-2 text-sm">
                  <span
                    className={`h-2.5 w-2.5 rounded-full ${DOT[s.availability]}`}
                    aria-hidden="true"
                  />
                  {s.availabilityText}
                </p>

                {s.empanelled && (
                  <p className="w-fit rounded-lg bg-muted px-2.5 py-1 text-xs font-medium">
                    100% free government support / sponsored
                  </p>
                )}

                <div className="mt-auto grid gap-2 pt-2">
                  <Button variant="destructive" className="w-full">
                    <Siren className="h-4 w-4" aria-hidden="true" /> Instant SOS call
                  </Button>
                  <Button className="w-full">
                    <Video className="h-4 w-4" aria-hidden="true" /> Book video consultation
                  </Button>
                  <Button variant="outline" className="w-full">
                    <PhoneCall className="h-4 w-4" aria-hidden="true" /> Request instant call-back
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <p className="mt-4 flex items-start gap-2 rounded-xl border border-border bg-card p-4 text-sm text-muted-foreground">
        <CalendarClock className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
        Booking here only sends a request for a human coordinator to confirm. Nothing is shared with
        any authority without your explicit consent.
      </p>
    </section>
  );
}

function Field({
  label,
  id,
  children,
}: {
  label: string;
  id: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <label htmlFor={id} className="text-sm font-medium">
        {label}
      </label>
      {children}
    </div>
  );
}
