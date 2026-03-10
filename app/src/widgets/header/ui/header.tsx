import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "@/shared/i18n";
import { ThemeToggle } from "@/features/theme-toggle";
import { LangToggle } from "@/features/lang-toggle";

export function Header() {
  const { t } = useTranslation();
  const location = useLocation();
  const isEditor = location.pathname.startsWith("/editor");

  return (
    <header className="flex h-14 items-center justify-between border-b border-gray-200 bg-white/80 px-4 backdrop-blur-sm dark:border-gray-800 dark:bg-gray-900/80">
      <div className="flex items-center gap-3">
        {isEditor ? (
          <Link
            to="/"
            className="text-sm font-medium text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300"
          >
            {t("editor.back")}
          </Link>
        ) : (
          <h1 className="text-lg font-bold text-gray-900 dark:text-white">
            {t("header.title")}
          </h1>
        )}
      </div>

      <div className="flex items-center gap-1">
        <LangToggle />
        <ThemeToggle />
      </div>
    </header>
  );
}
