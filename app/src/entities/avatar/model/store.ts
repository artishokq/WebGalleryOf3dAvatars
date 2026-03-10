import { create } from "zustand";
import type { EnvironmentPreset } from "@/shared/types";

export type ToolMode = "rotate" | "pan" | "zoom";

interface AvatarState {
  animationNames: string[];
  meshNames: string[];

  environment: EnvironmentPreset;

  skinColor: string;
  meshVisibility: Record<string, boolean>;

  currentAnimation: string;

  bloomEnabled: boolean;
  autoRotate: boolean;
  shadowsEnabled: boolean;

  toolMode: ToolMode;

  modelBounds: {
    center: [number, number, number];
    size: [number, number, number];
  } | null;

  resetViewTrigger: number;
  screenshotTrigger: number;
  zoomInTrigger: number;
  zoomOutTrigger: number;

  initModel: (animations: string[], meshes: string[]) => void;
  setEnvironment: (env: EnvironmentPreset) => void;
  setSkinColor: (color: string) => void;
  setMeshVisibility: (name: string, visible: boolean) => void;
  setAnimation: (name: string) => void;
  toggleBloom: () => void;
  toggleAutoRotate: () => void;
  toggleShadows: () => void;
  setToolMode: (mode: ToolMode) => void;
  triggerResetView: () => void;
  triggerScreenshot: () => void;
  triggerZoomIn: () => void;
  triggerZoomOut: () => void;
  setModelBounds: (
    center: [number, number, number],
    size: [number, number, number],
  ) => void;
  reset: () => void;
}

const INITIAL: Pick<
  AvatarState,
  | "animationNames"
  | "meshNames"
  | "environment"
  | "skinColor"
  | "meshVisibility"
  | "currentAnimation"
  | "bloomEnabled"
  | "autoRotate"
  | "shadowsEnabled"
  | "resetViewTrigger"
  | "screenshotTrigger"
  | "toolMode"
  | "zoomInTrigger"
  | "zoomOutTrigger"
  | "modelBounds"
> = {
  animationNames: [],
  meshNames: [],
  environment: "studio",
  skinColor: "default",
  meshVisibility: {},
  currentAnimation: "",
  bloomEnabled: false,
  autoRotate: false,
  shadowsEnabled: true,
  toolMode: "rotate",
  resetViewTrigger: 0,
  screenshotTrigger: 0,
  zoomInTrigger: 0,
  zoomOutTrigger: 0,
  modelBounds: null,
};

export const useAvatarStore = create<AvatarState>()((set) => ({
  ...INITIAL,

  initModel: (animations, meshes) =>
    set({
      animationNames: animations,
      meshNames: meshes,
      currentAnimation: animations[0] ?? "",
      meshVisibility: Object.fromEntries(meshes.map((n) => [n, true])),
      skinColor: "default",
    }),

  setEnvironment: (environment) => set({ environment }),
  setSkinColor: (skinColor) => set({ skinColor }),

  setMeshVisibility: (name, visible) =>
    set((s) => ({
      meshVisibility: { ...s.meshVisibility, [name]: visible },
    })),

  setAnimation: (currentAnimation) => set({ currentAnimation }),

  toggleBloom: () => set((s) => ({ bloomEnabled: !s.bloomEnabled })),
  toggleAutoRotate: () => set((s) => ({ autoRotate: !s.autoRotate })),
  toggleShadows: () => set((s) => ({ shadowsEnabled: !s.shadowsEnabled })),

  setToolMode: (toolMode) => set({ toolMode }),

  triggerResetView: () =>
    set((s) => ({ resetViewTrigger: s.resetViewTrigger + 1 })),
  triggerScreenshot: () =>
    set((s) => ({ screenshotTrigger: s.screenshotTrigger + 1 })),
  triggerZoomIn: () => set((s) => ({ zoomInTrigger: s.zoomInTrigger + 1 })),
  triggerZoomOut: () => set((s) => ({ zoomOutTrigger: s.zoomOutTrigger + 1 })),
  setModelBounds: (center, size) => set({ modelBounds: { center, size } }),

  reset: () => set(INITIAL),
}));
