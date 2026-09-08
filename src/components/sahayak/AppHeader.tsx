import { Link, useNavigate } from "@tanstack/react-router";
import { DoorOpen, Languages, Menu } from "lucide-react";
import { Logo } from "./Brand";
import { Button } from "@/components/ui/button";
import { LANGUAGES } from "@/lib/sahayak/i18n";
import { useLanguage } from "@/lib/sahayak/language";

export function AppHeader({
  showLeaveSafely = false,
  onLeaveSafely,
}: {
  showLeaveSafely?: boolean;
  onLeaveSafely?: () => void;
}) {
  const navigate = useNavigate();
  const { language, setLanguage, t } = useLanguage();

  const links = (
    <>
      <HeaderLink to="/victim">{t("navSupport")}</HeaderLink>
      <HeaderLink to="/rights-guidance">{t("navRights")}</HeaderLink>
      <HeaderLink to="/officer">{t("navOfficer")}</HeaderLink>
      <HeaderLink to="/support-directory">{t("navDirectory")}</HeaderLink>
      <HeaderLink to="/about">{t("navPrivacy")}</HeaderLink>
    </>
  );

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-card/95 backdrop-blur-lg">
      <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-4 sm:px-6">
        <Logo />
        <nav aria-label="Main" className="ml-auto hidden items-center gap-1 lg:flex">
          {links}
        </nav>
        <div className="ml-auto flex items-center gap-2 lg:ml-0">
          <label
            htmlFor="lang-select"
            className="flex items-center gap-1.5 rounded-md border border-input bg-card pl-2.5 text-sm"
          >
            <Languages className="h-4 w-4 text-teal" aria-hidden="true" />
            <span className="sr-only">{t("chooseLanguage")}</span>
            <select
              id="lang-select"
              value={language}
              onChange={(e) => setLanguage(e.target.value as typeof language)}
              className="h-10 max-w-32 rounded-md bg-transparent pr-2 text-sm font-medium"
            >
              {LANGUAGES.map((l) => (
                <option key={l.code} value={l.code}>
                  {l.native}
                </option>
              ))}
            </select>
          </label>
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
              <DoorOpen className="h-4 w-4" aria-hidden="true" /> {t("leaveSafely")}
            </Button>
          )}
          <details className="relative lg:hidden">
            <summary className="flex h-10 w-10 cursor-pointer list-none items-center justify-center rounded-md border border-input bg-card text-foreground [&::-webkit-details-marker]:hidden">
              <Menu className="h-5 w-5" aria-hidden="true" />
              <span className="sr-only">{t("menu")}</span>
            </summary>
            <nav
              aria-label="Mobile"
              className="absolute right-0 top-12 w-64 rounded-lg border border-border bg-card p-2 shadow-lift"
            >
              {links}
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
  const { t } = useLanguage();
  return (
    <footer className="mt-16 border-t border-primary/30 bg-primary text-primary-foreground">
      <div className="mx-auto max-w-7xl px-4 py-10 text-sm text-primary-foreground/75 sm:px-6">
        <p className="font-display text-base font-bold text-primary-foreground">
          SAHAYAK — Early support. Safer response. Human-centred justice.
        </p>
        <p className="mt-2 max-w-3xl">{t("demoNotice")}</p>
        <div className="mt-4 flex flex-wrap gap-4">
          <Link to="/about" className="text-primary-foreground underline underline-offset-4">
            {t("navPrivacy")}
          </Link>
          <Link to="/support-directory" className="text-primary-foreground underline underline-offset-4">
            {t("navDirectory")}
          </Link>
        </div>
      </div>
    </footer>
  );
}
