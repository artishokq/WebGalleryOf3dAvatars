import { useTranslation } from "@/shared/i18n";
import { Section, Button } from "@/shared/ui";
import { ENVIRONMENTS } from "@/shared/types";
import type { EnvironmentPreset } from "@/shared/types";
import { useAvatarStore } from "@/entities/avatar";

const LABEL_KEY: Record<EnvironmentPreset, string> = {
  studio: "editor.studio",
  sunset: "editor.sunset",
  night: "editor.night",
};

export function EnvironmentSwitch() {
  const { t } = useTranslation();
  const current = useAvatarStore((s) => s.environment);
  const setEnv = useAvatarStore((s) => s.setEnvironment);

  return (
    <Section title={t("editor.environment")}>
      <div className="flex gap-2">
        {ENVIRONMENTS.map((env) => (
          <Button
            key={env}
            variant={current === env ? "primary" : "secondary"}
            className="flex-1 text-xs"
            onClick={() => setEnv(env)}
          >
            {t(LABEL_KEY[env])}
          </Button>
        ))}
      </div>
    </Section>
  );
}
