import { useTranslation } from "@/shared/i18n";
import { Section, ColorSwatch } from "@/shared/ui";
import { SKIN_PRESETS } from "@/shared/types";
import type { Language } from "@/shared/types";
import { useAvatarStore } from "@/entities/avatar";

export function SkinSwitch() {
  const { t, language } = useTranslation();
  const skinColor = useAvatarStore((s) => s.skinColor);
  const setSkinColor = useAvatarStore((s) => s.setSkinColor);

  const colors = SKIN_PRESETS.map((p) => ({
    id: p.id,
    color: p.color,
    label: p.label[language as Language],
  }));

  return (
    <Section title={t("editor.skin")}>
      <ColorSwatch
        colors={colors}
        activeId={skinColor === "default" ? "default" : skinColor}
        onSelect={(id) => {
          const preset = SKIN_PRESETS.find((p) => p.id === id);
          setSkinColor(preset?.color || "default");
        }}
      />
    </Section>
  );
}
