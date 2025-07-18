import { AuthContextType, User } from "@/types/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useAuthStore = create<AuthContextType>()(
  persist(
    (set, get) => ({
      user: null,
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
            credits: 247,
            isPremium: true,
            role: "user",
          };
        }
        set({ user: mockUser, isLoggedIn: true });
      },
      logout: () => set({ user: null, isLoggedIn: false }),
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
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        user: state.user,
        isLoggedIn: state.isLoggedIn,
      }),
    }
  )
);
