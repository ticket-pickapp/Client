"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { useAuth } from "@/lib/auth-context";
import { CheckCircle, Clock, LogOut, TrendingUp, Users, Star } from "lucide-react";
import React from "react";
import MultiStepPickForm from "@/components/MultiStepPickForm";
import { useRouter } from "next/navigation";

const TipsterDashboardPage = () => {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [showForm, setShowForm] = React.useState(false);

  // Datos simulados del tipster
  const tipsterStats = {
    totalPicks: 156,
    winRate: 78.5,
    totalEarnings: 2847,
    activeSubscribers: 89,
    monthlyPicks: 23,
    averageOdds: 2.1
  };

  return (
    <ProtectedRoute>
      <section className="py-20 bg-[#f7f9fa]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header con información del tipster */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-3xl font-bold text-[#0f1419] mb-2">
                Dashboard del Tipster
              </h2>
              <p className="text-gray-600 text-lg">
                Bienvenido, {user?.name}
              </p>
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

          {showForm ? (
            <MultiStepPickForm onCancel={() => setShowForm(false)} onSuccess={() => setShowForm(false)} />
          ) : (
            <>
              {/* Tipster Summary Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                <Card className="bg-white border-[#E3ECF6] shadow-sm">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600 mb-1">
                          Ganancias Totales
                        </p>
                        <p className="text-2xl font-bold text-[#00b87a]">€{tipsterStats.totalEarnings}</p>
                      </div>
                      <div className="w-12 h-12 bg-[#00b87a]/10 rounded-full flex items-center justify-center">
                        <TrendingUp className="h-6 w-6 text-[#00b87a]" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white border-[#E3ECF6] shadow-sm">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600 mb-1">Picks Activos</p>
                        <p className="text-2xl font-bold text-[#f7b928]">{tipsterStats.monthlyPicks}</p>
                      </div>
                      <div className="w-12 h-12 bg-[#f7b928]/10 rounded-full flex items-center justify-center">
                        <Clock className="h-6 w-6 text-[#f7b928]" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white border-[#E3ECF6] shadow-sm">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600 mb-1">Suscriptores</p>
                        <p className="text-2xl font-bold text-[#1e9df1]">{tipsterStats.activeSubscribers}</p>
                      </div>
                      <div className="w-12 h-12 bg-[#1e9df1]/10 rounded-full flex items-center justify-center">
                        <Users className="h-6 w-6 text-[#1e9df1]" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              {/* Performance Stats */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
                <Card className="bg-white border-[#E3ECF6] shadow-sm">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold text-[#0f1419] mb-4">
                      Estadísticas de Rendimiento
                    </h3>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Total de Picks:</span>
                        <span className="font-medium">{tipsterStats.totalPicks}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Porcentaje de Acierto:</span>
                        <span className="font-medium text-[#00b87a]">{tipsterStats.winRate}%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Cuota Promedio:</span>
                        <span className="font-medium">{tipsterStats.averageOdds}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white border-[#E3ECF6] shadow-sm">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold text-[#0f1419] mb-4">
                      Acciones Rápidas
                    </h3>
                    <div className="space-y-3">
                      <Button className="w-full bg-[#1e9df1] hover:bg-[#1e9df1]/90 text-white" onClick={() => router.push("/tipster/create-pick")}>Crear Nuevo Pick</Button>
                      <Button variant="outline" className="w-full">
                        Ver Mis Picks
                      </Button>
                      <Button variant="outline" className="w-full">
                        Gestionar Suscripciones
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
              {/* Recent Activity */}
              <Card className="bg-white border-[#E3ECF6] shadow-sm">
                <CardContent className="p-0">
                  <div className="px-6 py-4 border-b border-[#E3ECF6]">
                    <h3 className="text-lg font-semibold text-[#0f1419]">
                      Actividad Reciente
                    </h3>
                  </div>
                  <div className="divide-y divide-[#E3ECF6]">
                    <div className="px-6 py-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-[#00b87a]/10 rounded-full flex items-center justify-center">
                            <CheckCircle className="h-4 w-4 text-[#00b87a]" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-[#0f1419]">
                              Pick ganado: Barcelona vs Real Madrid
                            </p>
                            <p className="text-xs text-gray-500">Hace 2 horas</p>
                          </div>
                        </div>
                        <Badge className="bg-[#00b87a]/10 text-[#00b87a]">
                          +€45
                        </Badge>
                      </div>
                    </div>

                    <div className="px-6 py-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-[#1e9df1]/10 rounded-full flex items-center justify-center">
                            <Users className="h-4 w-4 text-[#1e9df1]" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-[#0f1419]">
                              Nuevo suscriptor: Carlos M.
                            </p>
                            <p className="text-xs text-gray-500">Hace 4 horas</p>
                          </div>
                        </div>
                        <Badge className="bg-[#1e9df1]/10 text-[#1e9df1]">
                          +1
                        </Badge>
                      </div>
                    </div>

                    <div className="px-6 py-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-[#f7b928]/10 rounded-full flex items-center justify-center">
                            <Star className="h-4 w-4 text-[#f7b928]" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-[#0f1419]">
                              Pick publicado: Manchester City vs Liverpool
                            </p>
                            <p className="text-xs text-gray-500">Hace 6 horas</p>
                          </div>
                        </div>
                        <Badge className="bg-[#f7b928]/10 text-[#f7b928]">
                          Pending
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </>
          )}
        </div>
      </section>
    </ProtectedRoute>
  );
};

export default TipsterDashboardPage;
