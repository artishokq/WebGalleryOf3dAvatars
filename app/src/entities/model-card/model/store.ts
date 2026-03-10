import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { UserModelMeta } from "@/shared/types";
import { deleteModelData } from "@/shared/lib";

interface UserModelsState {
  models: UserModelMeta[];
  addModel: (meta: UserModelMeta) => void;
  removeModel: (id: string) => Promise<void>;
}

export const useUserModelsStore = create<UserModelsState>()(
  persist(
    (set, get) => ({
      models: [],

      addModel: (meta) => set({ models: [...get().models, meta] }),

      removeModel: async (id) => {
        set({ models: get().models.filter((m) => m.id !== id) });
        await deleteModelData(id);
      },
    }),
    { name: "user-models" },
  ),
);
