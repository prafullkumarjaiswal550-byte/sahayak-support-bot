import { Link, useNavigate } from "@tanstack/react-router";
import { DoorOpen, Lock, Menu } from "lucide-react";
import { Logo } from "./Brand";
import { Button } from "@/components/ui/button";
import { LANGUAGES } from "@/lib/sahayak/i18n";
import type { LanguageCode } from "@/lib/sahayak/types";

export function AppHeader({
  language,
  onLanguageChange,
  showLeaveSafely = false,
  onLeaveSafely,
}: {
  language?: LanguageCode;
  onLanguageChange?: (l: LanguageCode) => void;
  showLeaveSafely?: boolean;
  onLeaveSafely?: () => void;
}) {
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-card/95 backdrop-blur-lg">
      <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-4 sm:px-6">
        <Logo />
        <nav aria-label="Main" className="ml-auto hidden items-center gap-1 lg:flex">
          <HeaderLink to="/victim">Get support</HeaderLink>
          <HeaderLink to="/officer">Officer dashboard</HeaderLink>
          <HeaderLink to="/support-directory">Support directory</HeaderLink>
          <HeaderLink to="/about">Privacy &amp; ethics</HeaderLink>
        </nav>
        <div className="ml-auto flex items-center gap-2 lg:ml-0">
          {onLanguageChange && (
            <>
              <label htmlFor="lang-select" className="sr-only">
                Choose language
              </label>
              <select
                id="lang-select"
                value={language}
                onChange={(e) => onLanguageChange(e.target.value as LanguageCode)}
                className="h-10 max-w-36 rounded-md border border-input bg-card px-3 text-sm"
              >
                {LANGUAGES.map((l) => (
                  <option key={l.code} value={l.code}>
                    {l.native} ({l.label})
                  </option>
                ))}
              </select>
            </>
          )}
          <Button asChild variant="outline" size="sm" className="h-10">
            <Link to="/about">
              <Lock className="h-4 w-4" aria-hidden="true" /> Privacy
            </Link>
          </Button>
          {showLeaveSafely && (
            <Button
              variant="secondary"
              size="sm"
              className="h-10"
              onClick={() => {
                onLeaveSafely?.();
                navigate({ to: "/support-directory" });
              }}
            >
              <DoorOpen className="h-4 w-4" aria-hidden="true" /> Leave safely
            </Button>
          )}
          <details className="relative lg:hidden">
            <summary className="flex h-10 w-10 cursor-pointer list-none items-center justify-center rounded-md border border-input bg-card text-foreground [&::-webkit-details-marker]:hidden">
              <Menu className="h-5 w-5" aria-hidden="true" />
              <span className="sr-only">Open navigation</span>
            </summary>
            <nav aria-label="Mobile" className="absolute right-0 top-12 w-64 rounded-lg border border-border bg-card p-2 shadow-lift">
              <HeaderLink to="/victim">Get support</HeaderLink>
              <HeaderLink to="/officer">Officer dashboard</HeaderLink>
              <HeaderLink to="/support-directory">Support directory</HeaderLink>
              <HeaderLink to="/about">Privacy &amp; ethics</HeaderLink>
            </nav>
          </details>
        </div>
      </div>
    </header>
  );
}

function HeaderLink({ to, children }: { to: string; children: React.ReactNode }) {
  return (
    <Link
      to={to}
      className="block rounded-md px-3 py-2 text-sm font-medium text-foreground/80 transition-colors hover:bg-accent hover:text-accent-foreground"
      activeProps={{ className: "bg-accent text-accent-foreground" }}
    >
      {children}
    </Link>
  );
}

export function AppFooter() {
  return (
    <footer className="mt-16 border-t border-primary/30 bg-primary text-primary-foreground">
      <div className="mx-auto max-w-7xl px-4 py-10 text-sm text-primary-foreground/75 sm:px-6">
        <p className="font-display text-base font-bold text-primary-foreground">
          SAHAYAK — Early support. Safer response. Human-centred justice.
        </p>
        <p className="mt-2 max-w-3xl">
          Demonstration prototype for Smart India Hackathon problem statement SIH26093. All data shown
          is synthetic. This system performs AI-assisted preliminary risk screening and support
          prioritization only — it does not provide medical diagnosis and does not replace trained
          professionals or authorized officers.
        </p>
        <div className="mt-4 flex flex-wrap gap-4">
          <Link to="/about" className="text-primary-foreground underline underline-offset-4">
            Privacy, ethics and limitations
          </Link>
          <Link to="/support-directory" className="text-primary-foreground underline underline-offset-4">
            Support directory
          </Link>
        </div>
      </div>
    </footer>
  );
}
