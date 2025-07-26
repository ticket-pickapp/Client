"use client";
import { useRouter } from "next/navigation";
import React from "react";
import { Coins, Menu, Target } from "lucide-react";
import { Button } from "./ui/button";
import { useAuthStore } from "@/lib/store/authStore";
import { useSidebarStore } from "@/lib/store/sidebarStore";
import { useUserStore } from "@/lib/store/userStore";

const Navbar = () => {
  const router = useRouter();
  const { isLoggedIn } = useAuthStore();
  const user = useUserStore((state) => state.user);
  const { toggle } = useSidebarStore();

  return (
    <header className="bg-background border-b border-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-4">
            {/* Menú hamburguesa */}
            {isLoggedIn && (
              <button
                onClick={toggle}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md"
              >
                <Menu className="h-5 w-5" />
              </button>
            )}

            <div
              onClick={() => router.push("/")}
              className="flex items-center space-x-2 cursor-pointer"
            >
              <Target className="h-8 w-8 hidden lg:block" />
              <span className="text-xl font-bold text-foreground">
                TipsterPro
              </span>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            {isLoggedIn ? (
              <div className="lg:flex lg:items-center space-x-2">
                <Button
                  className="bg-transparent hover:bg-slate-300 dark:hover:text-black text-black dark:text-white rounded-full px-3 py-0 flex items-center 
                  space-x-2"
                >
                  <Coins />
                  <span className="p-1">{user?.credits}</span>
                </Button>
              </div>
            ) : (
              <Button
                onClick={() => router.push("/login")}
                className="p-1 lg:p-2 bg-transparent dark:hover:bg-white/10 text-black dark:text-white hover:bg-black/10"
              >
                Iniciar Sesión
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
