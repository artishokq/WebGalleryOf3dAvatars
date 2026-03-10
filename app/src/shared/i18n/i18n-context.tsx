import { useCallback, useEffect, useState } from "react";
import type { Language } from "@/shared/types";
import { en } from "./locales/en";
import { ru } from "./locales/ru";
import { I18nContext } from "./context";

type Dictionary = Record<string, Record<string, string>>;
const dictionaries: Record<Language, Dictionary> = {
  en: en as unknown as Dictionary,
  ru: ru as unknown as Dictionary,
};

export interface I18nContextValue {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    const stored = localStorage.getItem("language");
    if (stored === "ru" || stored === "en") return stored;
    return navigator.language.startsWith("ru") ? "ru" : "en";
  });

  useEffect(() => {
    localStorage.setItem("language", language);
    document.documentElement.lang = language;
  }, [language]);

  const dict = dictionaries[language];

  const t = useCallback(
    (key: string): string => {
      const parts = key.split(".");
      let result: unknown = dict;
      for (const part of parts) {
        if (result && typeof result === "object") {
          result = (result as Record<string, unknown>)[part];
        } else {
          return key;
        }
      }
      return typeof result === "string" ? result : key;
    },
    [dict],
  );

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang);
  }, []);

  return (
    <I18nContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </I18nContext.Provider>
  );
}
