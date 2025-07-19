import { User } from "@/types/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface UserStoreType {
  user: User | null;
  purchasedPicks: number[];
  updateCredits: (amount: number) => void;
  updateUser: (updatedUser: Partial<User>) => void;
  buyPick: (pickId: number, cost: number) => boolean;
  hasPurchasedPick: (pickId: number) => boolean;
  resetUser: () => void;
}

export const useUserStore = create<UserStoreType>()(
  persist(
    (set, get) => ({
      user: null,
      purchasedPicks: [],
      updateCredits: (amount: number) => {
        const user = get().user;
        if (user) {
          set({ user: { ...user, credits: user.credits + amount } });
        }
      },
      updateUser: (updatedUser: Partial<User>) => {
        const user = get().user;
        if (user) {
          set({ user: { ...user, ...updatedUser } });
        }
      },
      buyPick: (pickId: number, cost: number) => {
        const user = get().user;
        const purchasedPicks = get().purchasedPicks;
        if (!user || user.credits < cost) return false;
        if (purchasedPicks.includes(pickId)) return true;
        set({
          user: { ...user, credits: user.credits - cost },
          purchasedPicks: [...purchasedPicks, pickId],
        });
        return true;
      },
      hasPurchasedPick: (pickId: number) => {
        return get().purchasedPicks.includes(pickId);
      },
      resetUser: () => set({ user: null, purchasedPicks: [] }),
    }),
    {
      name: "user-storage",
      partialize: (state) => ({
        user: state.user,
        purchasedPicks: state.purchasedPicks,
      }),
    }
  )
);
