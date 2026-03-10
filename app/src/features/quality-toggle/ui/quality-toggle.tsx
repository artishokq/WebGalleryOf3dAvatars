import { useTranslation } from "@/shared/i18n";
import { Section, Toggle } from "@/shared/ui";
import { useAvatarStore } from "@/entities/avatar";

export function QualityToggle() {
  const { t } = useTranslation();

  const bloom = useAvatarStore((s) => s.bloomEnabled);
  const autoRot = useAvatarStore((s) => s.autoRotate);
  const shadows = useAvatarStore((s) => s.shadowsEnabled);
  const toggleBloom = useAvatarStore((s) => s.toggleBloom);
  const toggleAutoRot = useAvatarStore((s) => s.toggleAutoRotate);
  const toggleShadows = useAvatarStore((s) => s.toggleShadows);

  return (
    <Section title={t("editor.effects")}>
      <div className="space-y-1">
        <Toggle
          label={t("editor.bloom")}
          checked={bloom}
          onChange={toggleBloom}
        />
        <Toggle
          label={t("editor.autoRotate")}
          checked={autoRot}
          onChange={toggleAutoRot}
        />
        <Toggle
          label={t("editor.shadows")}
          checked={shadows}
          onChange={toggleShadows}
        />
      </div>
    </Section>
  );
}
