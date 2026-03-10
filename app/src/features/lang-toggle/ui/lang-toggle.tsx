import { useTranslation } from "@/shared/i18n";
import type { Language } from "@/shared/types";

export function LangToggle() {
  const { language, setLanguage } = useTranslation();

  const next: Language = language === "ru" ? "en" : "ru";

  return (
    <button
      type="button"
      onClick={() => setLanguage(next)}
      className="rounded-lg px-2 py-1 text-sm font-semibold transition-colors hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
    >
      {language.toUpperCase()}
    </button>
  );
}
