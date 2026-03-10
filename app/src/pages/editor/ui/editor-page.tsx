import { useEffect, useMemo, useReducer } from "react";
import { useParams, Link } from "react-router-dom";
import { useTranslation } from "@/shared/i18n";
import { BUILT_IN_MODELS } from "@/shared/config";
import { getModelBlob } from "@/shared/lib";
import type { Language } from "@/shared/types";
import { useAvatarStore } from "@/entities/avatar";
import { useUserModelsStore } from "@/entities/model-card";
import { SceneViewer } from "@/widgets/scene-viewer";
import { ControlPanel } from "@/widgets/control-panel";
import { SceneToolbar } from "@/widgets/scene-toolbar";

interface BlobState {
  url: string | null;
  loading: boolean;
  error: string | null;
}

type BlobAction =
  | { type: "start" }
  | { type: "success"; url: string }
  | { type: "error"; error: string };

function blobReducer(_state: BlobState, action: BlobAction): BlobState {
  switch (action.type) {
    case "start":
      return { url: null, loading: true, error: null };
    case "success":
      return { url: action.url, loading: false, error: null };
    case "error":
      return { url: null, loading: false, error: action.error };
  }
}

function useModelUrl(modelId: string) {
  const { language } = useTranslation();
  const userModels = useUserModelsStore((s) => s.models);

  const builtIn = useMemo(
    () => BUILT_IN_MODELS.find((m) => m.id === modelId),
    [modelId],
  );
  const userMeta = useMemo(
    () => userModels.find((m) => m.id === modelId),
    [modelId, userModels],
  );

  const [blob, dispatch] = useReducer(blobReducer, {
    url: null,
    loading: !builtIn && !!userMeta,
    error: null,
  });

  useEffect(() => {
    if (builtIn || !userMeta) return;

    let objectUrl: string | null = null;
    let cancelled = false;
    dispatch({ type: "start" });

    getModelBlob(modelId)
      .then((b) => {
        if (cancelled) return;
        if (b) {
          objectUrl = URL.createObjectURL(b);
          dispatch({ type: "success", url: objectUrl });
        } else {
          dispatch({ type: "error", error: "notFound" });
        }
      })
      .catch(() => {
        if (!cancelled) dispatch({ type: "error", error: "error" });
      });

    return () => {
      cancelled = true;
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  }, [modelId, builtIn, userMeta]);

  if (builtIn) {
    return {
      url: builtIn.url,
      loading: false,
      error: null,
      modelName: builtIn.name[language as Language],
    };
  }

  if (!userMeta) {
    return { url: null, loading: false, error: "notFound", modelName: "" };
  }

  return {
    url: blob.url,
    loading: blob.loading,
    error: blob.error,
    modelName: userMeta.name,
  };
}

export function EditorPage() {
  const { modelId } = useParams<{ modelId: string }>();
  const { t } = useTranslation();
  const reset = useAvatarStore((s) => s.reset);

  useEffect(() => {
    reset();
    return () => reset();
  }, [modelId, reset]);

  const { url, loading, error, modelName } = useModelUrl(modelId ?? "");

  if (loading) {
    return (
      <div className="flex h-[calc(100vh-3.5rem)] items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-indigo-500 border-t-transparent" />
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {t("editor.loading")}
          </span>
        </div>
      </div>
    );
  }

  if (error || !url) {
    return (
      <div className="flex h-[calc(100vh-3.5rem)] flex-col items-center justify-center gap-4">
        <p className="text-lg text-red-500">{t("editor.notFound")}</p>
        <Link
          to="/"
          className="text-indigo-600 hover:underline dark:text-indigo-400"
        >
          {t("editor.back")}
        </Link>
      </div>
    );
  }

  return (
    <div className="flex h-[calc(100vh-3.5rem)] flex-col md:flex-row">
      <div className="relative flex-1">
        {modelName && (
          <div className="pointer-events-none absolute left-4 top-4 z-10 rounded-lg bg-black/40 px-3 py-1 text-sm text-white backdrop-blur-sm">
            {modelName}
          </div>
        )}
        <SceneViewer url={url} modelId={modelId!} />
        <SceneToolbar />
      </div>

      <aside className="w-full shrink-0 overflow-y-auto border-t border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900 md:w-80 md:border-l md:border-t-0">
        <ControlPanel />
      </aside>
    </div>
  );
}
