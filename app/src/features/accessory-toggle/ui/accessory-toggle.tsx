import { useTranslation } from "@/shared/i18n";
import { Section, Toggle } from "@/shared/ui";
import { useAvatarStore } from "@/entities/avatar";

export function AccessoryToggle() {
  const { t } = useTranslation();
  const meshNames = useAvatarStore((s) => s.meshNames);
  const meshVisibility = useAvatarStore((s) => s.meshVisibility);
  const setVis = useAvatarStore((s) => s.setMeshVisibility);

  if (meshNames.length === 0) return null;

  return (
    <Section title={t("editor.accessories")}>
      <div className="space-y-1">
        {meshNames.map((name) => (
          <Toggle
            key={name}
            label={name}
            checked={meshVisibility[name] ?? true}
            onChange={(v) => setVis(name, v)}
          />
        ))}
      </div>
    </Section>
  );
}
