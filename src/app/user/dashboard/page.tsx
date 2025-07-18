"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { useAuthStore } from "@/lib/store/authStore";
import { userBets } from "@/mock/userBet";
import { CheckCircle, Clock, Coins, LogOut } from "lucide-react";
import React from "react";

const UserDashboardPage = () => {
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "won":
        return { icon: "✅", color: "text-[#00b87a]", bg: "bg-[#00b87a]/10" };
      case "lost":
        return { icon: "❌", color: "text-[#f4212e]", bg: "bg-[#f4212e]/10" };
      case "pending":
        return { icon: "⏳", color: "text-[#f7b928]", bg: "bg-[#f7b928]/10" };
      default:
        return { icon: "❓", color: "text-gray-500", bg: "bg-gray-100" };
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "won":
        return "Ganada";
      case "lost":
        return "Perdida";
      case "pending":
        return "Pendiente";
      default:
        return "Desconocido";
    }
  };

  return (
    <ProtectedRoute>
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header con información del usuario */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-3xl font-bold mb-2">
                Panel de control
              </h2>
              <p className="text-lg">Bienvenido, {user?.name}</p>
            </div>
            <Button
              variant="outline"
              onClick={logout}
              className="flex items-center gap-2"
            >
              <LogOut className="h-4 w-4" />
              Cerrar Sesión
            </Button>
          </div>

          {/* User Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <Card className=" border-[#2d4057] shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm mb-1">Créditos Disponibles</p>
                    <p className="text-2xl font-bold text-[#1e9df1]">
                      {user?.credits || 0}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-[#1e9df1]/10 rounded-full flex items-center justify-center">
                    <Coins className="h-6 w-6 text-[#1e9df1]" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-[#2d4057] shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm  mb-1">
                      Apuestas Activas
                    </p>
                    <p className="text-2xl font-bold text-[#f7b928]">3</p>
                  </div>
                  <div className="w-12 h-12 bg-[#f7b928]/10 rounded-full flex items-center justify-center">
                    <Clock className="h-6 w-6 text-[#f7b928]" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className=" border-[#2d4057] shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm mb-1">
                      Apuestas Ganadas
                    </p>
                    <p className="text-2xl font-bold text-[#00b87a]">12</p>
                  </div>
                  <div className="w-12 h-12 bg-[#00b87a]/10 rounded-full flex items-center justify-center">
                    <CheckCircle className="h-6 w-6 text-[#00b87a]" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* User Bets Table */}
          <Card className="border-[#2d4057] shadow-sm">
            <CardContent className="p-0">
              <div className="px-6 py-4 border-b border-[#2d4057]">
                <h3 className="text-lg font-semibold">
                  Mis Apuestas Recientes
                </h3>
              </div>

              {/* Table Header */}
              <div className=" px-6 py-3 border-b border-[#2d4057]">
                <div className="grid grid-cols-12 gap-4 text-sm font-medium ">
                  <div className="col-span-2">Fecha</div>
                  <div className="col-span-2 hidden sm:block">Deporte</div>
                  <div className="col-span-3">Partido</div>
                  <div className="col-span-2">Estado</div>
                  <div className="col-span-2 hidden md:block">Resultado</div>
                  <div className="col-span-1">Cuota</div>
                </div>
              </div>

              {/* Table Body */}
              <div className="divide-y divide-[#2d4057]">
                {userBets.map((bet) => {
                  const statusInfo = getStatusIcon(bet.status);
                  return (
                    <div
                      key={bet.id}
                      className="px-6 py-4 hover:bg-[#f7f9fa] transition-colors"
                    >
                      <div className="grid grid-cols-12 gap-4 items-center">
                        <div className="col-span-2">
                          <div className="text-sm">
                            {new Date(bet.date).toLocaleDateString("es-ES", {
                              day: "2-digit",
                              month: "2-digit",
                            })}
                          </div>
                        </div>
                        <div className="col-span-2 hidden sm:block">
                          <Badge
                            variant="secondary"
                            className="bg-[#E3ECF6] text-[#0f1419] text-xs"
                          >
                            {bet.sport}
                          </Badge>
                        </div>
                        <div className="col-span-3">
                          <div className="text-sm font-medium">
                            {bet.match}
                          </div>
                        </div>
                        <div className="col-span-2">
                          <div
                            className={`inline-flex items-center gap-2 px-2 py-1 rounded-full text-xs font-medium ${statusInfo.bg} ${statusInfo.color}`}
                          >
                            <span>{statusInfo.icon}</span>
                            <span>{getStatusText(bet.status)}</span>
                          </div>
                        </div>
                        <div className="col-span-2 hidden md:block">
                          <div className="text-sm ">
                            {bet.result}
                          </div>
                        </div>
                        <div className="col-span-1">
                          <div className="text-sm font-medium ">
                            {bet.odds}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* View All Button */}
              <div className="px-6 py-4 border-t border-[#2d4057] ">
                <Button
                  variant="ghost"
                  className="w-full text-[#1e9df1] hover:bg-[#1e9df1]/10"
                >
                  Ver todas mis apuestas
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </ProtectedRoute>
  );
};

export default UserDashboardPage;
