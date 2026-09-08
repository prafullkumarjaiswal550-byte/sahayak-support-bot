import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { RTL_LANGUAGES, t as translate, type StringKey } from "./i18n";
import type { LanguageCode } from "./types";

const STORAGE_KEY = "sahayak.language";

type Ctx = {
  language: LanguageCode;
  setLanguage: (l: LanguageCode) => void;
  t: (key: StringKey) => string;
};

const LanguageContext = createContext<Ctx | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<LanguageCode>("en");

  // Read the saved choice after hydration so server and client markup match.
  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY) as LanguageCode | null;
    if (saved) setLanguageState(saved);
  }, []);

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = RTL_LANGUAGES.includes(language) ? "rtl" : "ltr";
  }, [language]);

  const setLanguage = useCallback((l: LanguageCode) => {
    setLanguageState(l);
    try {
      window.localStorage.setItem(STORAGE_KEY, l);
    } catch {
      /* storage may be unavailable in private mode */
    }
  }, []);

  const value = useMemo<Ctx>(
    () => ({ language, setLanguage, t: (key: StringKey) => translate(language, key) }),
    [language, setLanguage],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage(): Ctx {
  const ctx = useContext(LanguageContext);
  if (ctx) return ctx;
  // Safe fallback so components still render outside the provider.
  return { language: "en", setLanguage: () => {}, t: (key: StringKey) => translate("en", key) };
}
