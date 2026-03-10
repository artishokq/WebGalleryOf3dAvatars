import { useTranslation } from "@/shared/i18n";
import { ModelGallery } from "@/widgets/model-gallery";

export function GalleryPage() {
  const { t } = useTranslation();

  return (
    <div className="mx-auto max-w-7xl px-4 py-6">
      <h1 className="mb-6 text-2xl font-bold text-gray-900 dark:text-white">
        {t("gallery.title")}
      </h1>
      <ModelGallery />
    </div>
  );
}
