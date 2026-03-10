import { useTranslation } from "@/shared/i18n";
import { Section, Select } from "@/shared/ui";
import { useAvatarStore } from "@/entities/avatar";

export function AnimationSwitch() {
  const { t } = useTranslation();
  const names = useAvatarStore((s) => s.animationNames);
  const current = useAvatarStore((s) => s.currentAnimation);
  const setAnim = useAvatarStore((s) => s.setAnimation);

  if (names.length === 0) return null;

  const options = names.map((n) => ({ value: n, label: n }));

  return (
    <Section title={t("editor.animation")}>
      <Select value={current} onChange={setAnim} options={options} />
    </Section>
  );
}
