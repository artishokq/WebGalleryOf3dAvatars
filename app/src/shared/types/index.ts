export const ENVIRONMENTS = ["studio", "sunset", "night"] as const;
export type EnvironmentPreset = (typeof ENVIRONMENTS)[number];

export type Theme = "light" | "dark";
export type Language = "ru" | "en";

export interface BuiltInModelConfig {
  id: string;
  name: Record<Language, string>;
  url: string;
}

export interface UserModelMeta {
  id: string;
  name: string;
  createdAt: number;
}

export const SKIN_PRESETS = [
  { id: "default", label: { en: "Default", ru: "По умолчанию" }, color: "" },
  { id: "red", label: { en: "Red", ru: "Красный" }, color: "#e74c3c" },
  { id: "blue", label: { en: "Blue", ru: "Синий" }, color: "#3498db" },
  { id: "green", label: { en: "Green", ru: "Зелёный" }, color: "#2ecc71" },
  { id: "gold", label: { en: "Gold", ru: "Золотой" }, color: "#f1c40f" },
  { id: "purple", label: { en: "Purple", ru: "Фиолетовый" }, color: "#9b59b6" },
] as const;
