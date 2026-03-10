import { useTranslation } from "@/shared/i18n";
import { useAvatarStore } from "@/entities/avatar";
import type { ToolMode } from "@/entities/avatar";

const TOOLS: { mode: ToolMode; icon: string; labelKey: string }[] = [
  { mode: "rotate", icon: "🔄", labelKey: "editor.toolRotate" },
  { mode: "pan", icon: "✋", labelKey: "editor.toolPan" },
  { mode: "zoom", icon: "🔍", labelKey: "editor.toolZoom" },
];

export function SceneToolbar() {
  const { t } = useTranslation();
  const toolMode = useAvatarStore((s) => s.toolMode);
  const setToolMode = useAvatarStore((s) => s.setToolMode);
  const triggerZoomIn = useAvatarStore((s) => s.triggerZoomIn);
  const triggerZoomOut = useAvatarStore((s) => s.triggerZoomOut);
  const triggerResetView = useAvatarStore((s) => s.triggerResetView);

  return (
    <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 items-center gap-1 rounded-xl border border-gray-200 bg-white/90 px-2 py-1.5 shadow-lg backdrop-blur-sm dark:border-gray-700 dark:bg-gray-900/90">
      {TOOLS.map(({ mode, icon, labelKey }) => (
        <button
          key={mode}
          type="button"
          title={t(labelKey)}
          onClick={() => setToolMode(mode)}
          className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
            toolMode === mode
              ? "bg-indigo-600 text-white shadow-sm"
              : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
          }`}
        >
          <span className="text-base">{icon}</span>
          <span className="hidden sm:inline">{t(labelKey)}</span>
        </button>
      ))}

      <div className="mx-1 h-6 w-px bg-gray-300 dark:bg-gray-600" />

      <button
        type="button"
        title={t("editor.zoomIn")}
        onClick={triggerZoomIn}
        className="rounded-lg px-2 py-1.5 text-lg text-gray-700 transition-colors hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
      >
        ➕
      </button>
      <button
        type="button"
        title={t("editor.zoomOut")}
        onClick={triggerZoomOut}
        className="rounded-lg px-2 py-1.5 text-lg text-gray-700 transition-colors hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
      >
        ➖
      </button>

      <div className="mx-1 h-6 w-px bg-gray-300 dark:bg-gray-600" />

      <button
        type="button"
        title={t("editor.resetView")}
        onClick={triggerResetView}
        className="rounded-lg px-2 py-1.5 text-lg text-gray-700 transition-colors hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
      >
        ↩
      </button>
    </div>
  );
}
