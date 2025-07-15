"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

interface User {
  id: string;
  name: string;
  email: string;
  credits: number;
  isPremium: boolean;
  role: "user" | "tipster";
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  updateCredits: (amount: number) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe ser usado dentro de AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  // Simular usuario logueado por defecto
  React.useEffect(() => {
    // Simular un usuario logueado
    const mockUser: User = {
      id: "1",
      name: "Usuario Demo",
      email: "usuario@demo.com",
      credits: 247,
      isPremium: true,
      role: "user",
    };
    setUser(mockUser);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simular login exitoso con diferentes tipos de usuario
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
        name: "Usuario Demo",
        email: email,
        credits: 247,
        isPremium: true,
        role: "user",
      };
    }
    
    setUser(mockUser);
    return true;
  };

  const logout = () => {
    setUser(null);
  };

  const updateCredits = (amount: number) => {
    if (user) {
      setUser({ ...user, credits: user.credits + amount });
    }
  };

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    login,
    logout,
    updateCredits,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}; 