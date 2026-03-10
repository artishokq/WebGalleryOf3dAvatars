import { useTranslation } from "@/shared/i18n";
import { Button, Section } from "@/shared/ui";
import { useAvatarStore } from "@/entities/avatar";
import { EnvironmentSwitch } from "@/features/environment-switch";
import { SkinSwitch } from "@/features/skin-switch";
import { AccessoryToggle } from "@/features/accessory-toggle";
import { AnimationSwitch } from "@/features/animation-switch";
import { QualityToggle } from "@/features/quality-toggle";
import { ScreenshotButton } from "@/features/screenshot";

export function ControlPanel() {
  const { t } = useTranslation();
  const animationNames = useAvatarStore((s) => s.animationNames);
  const meshNames = useAvatarStore((s) => s.meshNames);
  const triggerReset = useAvatarStore((s) => s.triggerResetView);

  return (
    <div className="space-y-6 p-4">
      <EnvironmentSwitch />
      <SkinSwitch />
      {meshNames.length > 0 && <AccessoryToggle />}
      {animationNames.length > 0 && <AnimationSwitch />}
      <QualityToggle />

      <Section title={t("editor.actions")}>
        <div className="space-y-2">
          <ScreenshotButton />
          <Button variant="secondary" full onClick={triggerReset}>
            {t("editor.resetView")}
          </Button>
        </div>
      </Section>
    </div>
  );
}
