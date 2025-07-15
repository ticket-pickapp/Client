"use client";
import { useRouter } from "next/navigation";
import React from "react";
import { Target } from "lucide-react";
import { Button } from "./ui/button";

const Navbar = () => {
  const router = useRouter();
  return (
    <header className="bg-white border-b border-[#E5E5E6] sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <Target className="h-8 w-8 text-[#1e9df1]" />
            <span className="text-xl font-bold text-[#0f1419]">TipsterPro</span>
          </div>
          <nav className="hidden md:flex space-x-8">
            <a
              href="#"
              className="text-[#0f1419] hover:text-[#1e9df1] font-medium"
            >
              Tipsters
            </a>
            <a
              href="#"
              className="text-[#0f1419] hover:text-[#1e9df1] font-medium"
            >
              Picks
            </a>
            <a
              href="#"
              className="text-[#0f1419] hover:text-[#1e9df1] font-medium"
            >
              Estadísticas
            </a>
          </nav>
          <div className="flex items-center space-x-4">
            <Button
              onClick={() => router.push("/login")}
              variant="ghost"
              className="text-[#0f1419]"
            >
              Iniciar Sesión
            </Button>
            <Button className="bg-[#1e9df1] hover:bg-[#1e9df1]/90 text-white">
              Registrarse
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
