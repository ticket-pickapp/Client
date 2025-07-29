import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface PickStoreType {
  purchasedPicks: number[];
  buyPick: (pickId: number) => void;
  hasPurchasedPick: (pickId: number) => boolean;
  resetPicks: () => void;
}

export const usePickStore = create<PickStoreType>()(
  persist(
    (set, get) => ({
      purchasedPicks: [],
      buyPick: (pickId: number) => {
        if (!get().purchasedPicks.includes(pickId)) {
          set({ purchasedPicks: [...get().purchasedPicks, pickId] });
        }
      },
      hasPurchasedPick: (pickId: number) => get().purchasedPicks.includes(pickId),
      resetPicks: () => set({ purchasedPicks: [] }),
    }),
    {
      name: "pick-storage",
      partialize: (state) => ({
        purchasedPicks: state.purchasedPicks,
      }),
    }
  )
);
