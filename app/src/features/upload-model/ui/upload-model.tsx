import { useCallback, useRef, useState } from "react";
import { useTranslation } from "@/shared/i18n";
import { saveModelBlob } from "@/shared/lib";
import { Card } from "@/shared/ui";
import { useUserModelsStore } from "@/entities/model-card";

export function UploadModel() {
  const { t } = useTranslation();
  const addModel = useUserModelsStore((s) => s.addModel);
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);

  const handleFile = useCallback(
    async (file: File) => {
      const ext = file.name.split(".").pop()?.toLowerCase();
      if (ext !== "glb" && ext !== "gltf") {
        alert(t("gallery.invalidFile"));
        return;
      }

      const id = crypto.randomUUID();
      const blob = new Blob([await file.arrayBuffer()], { type: file.type });
      await saveModelBlob(id, blob);
      addModel({
        id,
        name: file.name.replace(/\.(glb|gltf)$/i, ""),
        createdAt: Date.now(),
      });
    },
    [addModel, t],
  );

  const onDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragging(false);
      const file = e.dataTransfer.files[0];
      if (file) handleFile(file);
    },
    [handleFile],
  );

  return (
    <Card>
      <label
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={onDrop}
        className={`flex aspect-square cursor-pointer flex-col items-center justify-center gap-2 p-4 text-center transition-colors ${
          dragging
            ? "bg-indigo-50 dark:bg-indigo-900/30"
            : "bg-gray-50 hover:bg-gray-100 dark:bg-gray-800/50 dark:hover:bg-gray-700/50"
        }`}
      >
        <span className="text-4xl">➕</span>
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
          {t("gallery.upload")}
        </span>
        <span className="text-xs text-gray-500 dark:text-gray-400">
          {t("gallery.uploadHint")}
        </span>
        <input
          ref={inputRef}
          type="file"
          accept=".glb,.gltf"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) handleFile(file);
            e.target.value = "";
          }}
        />
      </label>
    </Card>
  );
}
