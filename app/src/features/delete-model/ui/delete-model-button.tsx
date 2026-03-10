import { useCallback } from "react";
import { Button } from "@/shared/ui";
import { useTranslation } from "@/shared/i18n";
import { useUserModelsStore } from "@/entities/model-card";

interface Props {
  modelId: string;
}

export function DeleteModelButton({ modelId }: Props) {
  const { t } = useTranslation();
  const removeModel = useUserModelsStore((s) => s.removeModel);

  const handleDelete = useCallback(() => {
    if (window.confirm(t("gallery.confirmDelete"))) {
      removeModel(modelId);
    }
  }, [modelId, removeModel, t]);

  return (
    <Button variant="danger" className="text-xs" onClick={handleDelete}>
      {t("gallery.delete")}
    </Button>
  );
}
