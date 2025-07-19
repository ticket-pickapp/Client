"use client";
import React from "react";
import { useRouter } from "next/navigation";
import {
  LogOut,
  BarChart2,
  Settings,
  User,
  LayoutDashboard,
  ListPlus,
  Heart,
  Bookmark,
  X,
  Volleyball,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/lib/store/authStore";
import { useSidebarStore } from "@/lib/store/sidebarStore";

const Sidebar: React.FC = () => {
  const router = useRouter();
  const { isOpen, close } = useSidebarStore();
  const { user, logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    router.push("/login");
    close();
  };

  const handleNavigation = (href: string) => {
    router.push(href);
    close();
  };

  // Navegación según el tipo de usuario
  const getNavItems = () => {
    if (!user) return [];

    if (user.role === "tipster") {
      return [
        {
          label: "Dashboard",
          icon: <LayoutDashboard size={20} />,
          href: "/tipster/dashboard",
        },
        {
          label: "Analytics",
          icon: <BarChart2 size={20} />,
          href: "/tipster/analytics",
        },
        {
          label: "Crear Pick",
          icon: <ListPlus size={20} />,
          href: "/tipster/create-pick",
        },
        {
          label: "Configuración",
          icon: <Settings size={20} />,
          href: "/tipster/settings",
        },
        { label: "Perfil", icon: <User size={20} />, href: "/tipster/profile" },
        { label: "Encuentros", icon: <Volleyball size={20} />, href: "/picks" },
      ];
    } else {
      return [
        {
          label: "Dashboard",
          icon: <LayoutDashboard size={20} />,
          href: "/user/dashboard",
        },
        {
          label: "Mis Picks",
          icon: <Bookmark size={20} />,
          href: "/user/picks",
        },
        {
          label: "Favoritos",
          icon: <Heart size={20} />,
          href: "/user/favorites",
        },
        {
          label: "Configuración",
          icon: <Settings size={20} />,
          href: "/user/settings",
        },
        { label: "Perfil", icon: <User size={20} />, href: "/user/profile" },
        { label: "Encuentros", icon: <Volleyball size={20} />, href: "/picks" },
      ];
    }
  };

  const navItems = getNavItems();

  return (
    <>
      {/* Overlay para cerrar el sidebar */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={close}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:hidden z-50 flex flex-col w-80 h-[95%] border-r border-gray-700 bg-background transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Header del sidebar */}
        <div className="flex items-center justify-between p-6 border-b border-gray-700">
          <span className="text-2xl font-bold tracking-tight">TipsterPro</span>
          <button
            onClick={close}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md"
          >
            <X size={20} />
          </button>
        </div>

        {/* Información del usuario */}
        <div className="p-6 border-b border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-[#1e9df1] rounded-full flex items-center justify-center">
              <span className="text-white font-semibold">
                {user?.name?.charAt(0) || "U"}
              </span>
            </div>
            <div>
              <p className="font-semibold">{user?.name}</p>
              <p className="text-sm text-gray-500">{user?.email}</p>
            </div>
          </div>
        </div>

        {/* Navegación */}
        <nav className="flex-1 p-6">
          <div className="space-y-2">
            {navItems.map((item) => (
              <Button
                key={item.label}
                variant="ghost"
                className="justify-start w-full hover:bg-[#23272f] hover:text-white gap-3 px-4 py-3"
                onClick={() => handleNavigation(item.href)}
              >
                {item.icon}
                {item.label}
              </Button>
            ))}
          </div>
        </nav>

        {/* Botón de logout */}
        <div className="p-6 border-t border-gray-700">
          <Button
            variant="outline"
            className="w-full flex gap-3 justify-start text-red-400 border-red-400 hover:bg-red-400/10 hover:text-red-500"
            onClick={handleLogout}
          >
            <LogOut size={20} />
            Cerrar sesión
          </Button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
