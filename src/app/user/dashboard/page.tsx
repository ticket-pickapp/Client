"use client";

import { ProtectedRoute } from "@/components/ProtectedRoute";
import { useUserStore } from "@/lib/store/userStore";

const UserDashboardPage = () => {
  const user = useUserStore((state) => state.user);

  return (
    <ProtectedRoute>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Dashboard del Usuario</h1>
        <p>Bienvenido, {user?.name}</p>
        <p>Contenido del dashboard del usuario...</p>
      </div>
    </ProtectedRoute>
  );
};

export default UserDashboardPage;
