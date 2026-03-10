import { useTranslation } from "@/shared/i18n";
import { Button } from "@/shared/ui";
import { useAvatarStore } from "@/entities/avatar";

export function ScreenshotButton() {
  const { t } = useTranslation();
  const trigger = useAvatarStore((s) => s.triggerScreenshot);

  return (
    <Button variant="secondary" full onClick={trigger}>
      {t("editor.screenshot")}
    </Button>
  );
}
