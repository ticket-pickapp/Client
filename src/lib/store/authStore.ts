import { User } from "@/types/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { useUserStore } from "./userStore";

export interface AuthStoreType {
  isLoggedIn: boolean;
  login: (email: string, password: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthStoreType>()(
  persist(
    (set) => ({
      isLoggedIn: false,
      login: (email: string, password: string) => {
        let mockUser: User;
        if (email === "tipster@prueba.com") {
          mockUser = {
            id: "2",
            name: "Tipster Profesional",
            email: email,
            credits: 0,
            isPremium: true,
            role: "tipster",
          };
        } else {
          mockUser = {
            id: "1",
            name: "Juan Perez",
            email: email,
            credits: 16,
            isPremium: true,
            role: "user",
          };
        }
        set({ isLoggedIn: true });
        // Inicializa la userStore
        useUserStore.setState({ user: mockUser, purchasedPicks: [] });
      },
      logout: () => {
        set({ isLoggedIn: false });
        useUserStore.getState().resetUser();
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        isLoggedIn: state.isLoggedIn,
      }),
    }
  )
);
