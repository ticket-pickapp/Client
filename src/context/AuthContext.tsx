"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { User } from "@/types/types";
import { getUserById } from "@/mock/user";

interface AuthContextType {
  user: User | null;
  isLoggedIn: boolean;
  login: (email: string, password: string) => void;
  logout: () => void;
  loading: boolean;
  updateCredits: (newCredits: number) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  // Simulación de login (igual que tu mock)
  const login = (email: string, password: string) => {
    const mockUser = getUserById(email === "tipster@prueba.com" ? "2" : "1");
    if (!mockUser) return;
    setUser(mockUser as User);
    setIsLoggedIn(true);
    localStorage.setItem("user", JSON.stringify(mockUser));
    localStorage.setItem("isLoggedIn", "true");
  };

  const logout = () => {
    setUser(null);
    setIsLoggedIn(false);
    localStorage.removeItem("user");
    localStorage.removeItem("isLoggedIn");
  };

  // Función para actualizar créditos
  const updateCredits = (newCredits: number) => {
    if (user) {
      const updatedUser = { ...user, credits: newCredits };
      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));
    }
  };

  // Hidratar desde localStorage al montar
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedLoggedIn = localStorage.getItem("isLoggedIn");
    if (storedUser && storedLoggedIn === "true") {
      setUser(JSON.parse(storedUser));
      setIsLoggedIn(true);
    }
    setLoading(false);
  }, []);

  if (loading) {
    // Evita renderizar cualquier cosa hasta que termine la hidratación
    return null;
  }

  return (
    <AuthContext.Provider value={{ user, isLoggedIn, login, logout, loading, updateCredits }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth debe usarse dentro de AuthProvider");
  return ctx;
};
