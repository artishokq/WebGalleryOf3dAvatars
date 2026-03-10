import { useTheme } from "@/shared/theme";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="rounded-lg p-2 text-lg transition-colors hover:bg-gray-200 dark:hover:bg-gray-700"
      title={theme === "light" ? "Dark mode" : "Light mode"}
    >
      {theme === "light" ? "🌙" : "☀️"}
    </button>
  );
}
