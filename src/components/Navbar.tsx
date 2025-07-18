"use client";
import { useRouter } from "next/navigation";
import React from "react";
import { Target } from "lucide-react";
import { Button } from "./ui/button";
import ThemeMode from "./ThemeMode";

const Navbar = () => {
  const router = useRouter();
  return (
    <header className="bg-background border-b border-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div
            onClick={() => router.push("/")}
            className="flex items-center space-x-2 cursor-pointer"
          >
            <Target className="h-8 w-8 hidden lg:block" />
            <span className="text-xl font-bold text-foreground">
              TipsterPro
            </span>
          </div>
          <nav className="hidden md:flex space-x-8">
            <a
              href="#"
              className="text-foreground hover:text-primary font-medium"
            >
              Tipsters
            </a>
            <a
              href="#"
              className="text-foreground hover:text-primary font-medium"
            >
              Picks
            </a>
            <a
              href="#"
              className="text-foreground hover:text-primary font-medium"
            >
              Estadísticas
            </a>
          </nav>
          <div className="flex items-center space-x-4 ">
            <ThemeMode />
            <Button
              onClick={() => router.push("/login")}
              variant="ghost"
              className="text-foreground  p-1 lg:p-2"
            >
              Iniciar Sesión
            </Button>
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground p-1 lg:p-2">
              Registrarse
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
