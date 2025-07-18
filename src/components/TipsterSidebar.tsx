import React from "react";
import { useRouter } from "next/navigation";
import {
  LogOut,
  BarChart2,
  Settings,
  User,
  LayoutDashboard,
  ListPlus,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const navItems = [
  {
    label: "Dashboard",
    icon: <LayoutDashboard size={20} />,
    href: "/tipster/dashboard",
  },
  {
    label: "Analytics",
    icon: <BarChart2 size={20} />,
    href: "/tipster/dashboard",
  },
  {
    label: "Configuración",
    icon: <Settings size={20} />,
    href: "/tipster/dashboard",
  },
  { label: "Perfil", icon: <User size={20} />, href: "/tipster/dashboard" },
  {
    label: "Crear Pick",
    icon: <ListPlus size={20} />,
    href: "/tipster/create-pick",
  },
];

const TipsterSidebar: React.FC = () => {
  const router = useRouter();
  // Aquí podrías usar el store de auth para el logout real
  const handleLogout = () => {
    // logout();
    router.push("/login");
  };

  return (
    <aside className="hidden md:flex flex-col w-64 border-r border-gray-700 min-h-screen p-6 gap-4">
      <div className="mb-8">
        <span className="text-2xl font-bold tracking-tight">TipsterPro</span>
      </div>
      <nav className="flex-1 flex flex-col gap-2">
        {navItems.map((item) => (
          <Button
            key={item.label}
            variant="ghost"
            className="justify-start w-full hover:bg-[#23272f] hover:text-white gap-3 px-4 py-2"
            onClick={() => router.push(item.href)}
          >
            {item.icon}
            {item.label}
          </Button>
        ))}
      </nav>
      <Button
        variant="outline"
        className="mt-auto w-full flex gap-3 justify-start text-red-400 border-red-400 hover:bg-red-400/10 hover:text-red-500"
        onClick={handleLogout}
      >
        <LogOut size={20} />
        Cerrar sesión
      </Button>
    </aside>
  );
};

export default TipsterSidebar;
