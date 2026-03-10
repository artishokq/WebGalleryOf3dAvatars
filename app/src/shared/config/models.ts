import type { BuiltInModelConfig } from "@/shared/types";

export const BUILT_IN_MODELS: BuiltInModelConfig[] = [
  {
    id: "robot",
    name: { en: "Robot", ru: "Робот" },
    url: "https://threejs.org/examples/models/gltf/RobotExpressive/RobotExpressive.glb",
  },
  {
    id: "soldier",
    name: { en: "Soldier", ru: "Солдат" },
    url: "https://threejs.org/examples/models/gltf/Soldier.glb",
  },
  {
    id: "horse",
    name: { en: "Horse", ru: "Лошадь" },
    url: "https://threejs.org/examples/models/gltf/Horse.glb",
  },
];
