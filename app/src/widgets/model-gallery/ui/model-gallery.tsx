import { useNavigate } from "react-router-dom";
import { useTranslation } from "@/shared/i18n";
import { BUILT_IN_MODELS } from "@/shared/config";
import type { Language } from "@/shared/types";
import { ModelCard, useUserModelsStore } from "@/entities/model-card";
import { UploadModel } from "@/features/upload-model";

export function ModelGallery() {
  const { t, language } = useTranslation();
  const navigate = useNavigate();
  const userModels = useUserModelsStore((s) => s.models);
  const removeModel = useUserModelsStore((s) => s.removeModel);

  return (
    <div className="space-y-8">
      <section>
        <h2 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
          {t("gallery.builtIn")}
        </h2>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {BUILT_IN_MODELS.map((m) => (
            <ModelCard
              key={m.id}
              id={m.id}
              name={m.name[language as Language]}
              isBuiltIn
              openLabel={t("gallery.open")}
              onOpen={() => navigate(`/editor/${m.id}`)}
            />
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
          {t("gallery.custom")}
        </h2>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {userModels.map((m) => (
            <ModelCard
              key={m.id}
              id={m.id}
              name={m.name}
              openLabel={t("gallery.open")}
              deleteLabel={t("gallery.delete")}
              onOpen={() => navigate(`/editor/${m.id}`)}
              onDelete={() => {
                if (window.confirm(t("gallery.confirmDelete"))) {
                  removeModel(m.id);
                }
              }}
            />
          ))}
          <UploadModel />
        </div>
      </section>
    </div>
  );
}
