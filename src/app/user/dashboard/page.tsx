"use client";

import { ProtectedRoute } from "@/components/ProtectedRoute";
import { useUserStore } from "@/lib/store/userStore";
import { userBets } from "@/mock/userBet";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
} from "recharts";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import React from "react";
import type { UserBet } from "@/types/types";

const chartColors = ["#1e9df1", "#f4212e", "#00b87a", "#f7b928", "#ff7849"];

type Metrics = {
  total: number;
  won: number;
  lost: number;
  pending: number;
  winrate: number;
  credits: number;
};

type BetsByDate = { date: string; Ganadas: number; Perdidas: number };
type PieData = { name: string; value: number };
type BestSport = { name: string; acierto: number };

function getUserMetrics(bets: UserBet[], credits: number): Metrics {
  const total = bets.length;
  const won = bets.filter((b) => b.status === "won").length;
  const lost = bets.filter((b) => b.status === "lost").length;
  const pending = bets.filter((b) => b.status === "pending").length;
  const winrate = total > 0 ? Math.round((won / (won + lost)) * 100) : 0;
  return { total, won, lost, pending, winrate, credits };
}

function getBetsByDate(bets: UserBet[]): BetsByDate[] {
  const map: Record<string, BetsByDate> = {};
  bets.forEach((b) => {
    if (!map[b.date]) map[b.date] = { date: b.date, Ganadas: 0, Perdidas: 0 };
    if (b.status === "won") map[b.date].Ganadas++;
    if (b.status === "lost") map[b.date].Perdidas++;
  });
  return Object.values(map).sort((a, b) => a.date.localeCompare(b.date));
}

function getSportsPie(bets: UserBet[]): PieData[] {
  const map: Record<string, number> = {};
  bets.forEach((b) => {
    map[b.sport] = (map[b.sport] || 0) + 1;
  });
  return Object.entries(map).map(([name, value]) => ({ name, value }));
}

function getBestSports(bets: UserBet[]): BestSport[] {
  const map: Record<string, { name: string; ganadas: number; total: number }> = {};
  bets.forEach((b) => {
    if (!map[b.sport]) map[b.sport] = { name: b.sport, ganadas: 0, total: 0 };
    if (b.status === "won") map[b.sport].ganadas++;
    if (b.status !== "pending") map[b.sport].total++;
  });
  return Object.values(map)
    .filter((s) => s.total > 0)
    .map((s) => ({
      name: s.name,
      acierto: Math.round((s.ganadas / s.total) * 100),
    }))
    .sort((a, b) => b.acierto - a.acierto);
}

const UserDashboardPage: React.FC = () => {
  const user = useUserStore((state) => state.user);
  const metrics = getUserMetrics(userBets, user?.credits ?? 0);
  const betsByDate = getBetsByDate(userBets);
  const sportsPie = getSportsPie(userBets);
  const bestSports = getBestSports(userBets);

  return (
    <ProtectedRoute>
      <div className="w-full min-h-screen bg-background p-2 sm:p-4 md:p-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4 sm:mb-8">
            Hola, {user?.name} 👋
          </h2>
          {/* Métricas principales */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
            <Card className="p-2 sm:p-4">
              <CardHeader>
                <CardTitle className="text-xs sm:text-sm text-gray-400">
                  Apuestas totales
                </CardTitle>
              </CardHeader>
              <CardContent>
                <span className="text-xl sm:text-2xl font-bold text-black dark:text-white">
                  {metrics.total}
                </span>
              </CardContent>
            </Card>
            <Card className="p-2 sm:p-4">
              <CardHeader>
                <CardTitle className="text-xs sm:text-sm text-gray-400">
                  Ganadas
                </CardTitle>
              </CardHeader>
              <CardContent>
                <span className="text-xl sm:text-2xl font-bold text-green-500">
                  {metrics.won}
                </span>
              </CardContent>
            </Card>
            <Card className="p-2 sm:p-4">
              <CardHeader>
                <CardTitle className="text-xs sm:text-sm text-gray-400">
                  Perdidas
                </CardTitle>
              </CardHeader>
              <CardContent>
                <span className="text-xl sm:text-2xl font-bold text-red-500">
                  {metrics.lost}
                </span>
              </CardContent>
            </Card>
            <Card className="p-2 sm:p-4">
              <CardHeader>
                <CardTitle className="text-xs sm:text-sm text-gray-400">
                  Pendientes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <span className="text-xl sm:text-2xl font-bold text-yellow-500">
                  {metrics.pending}
                </span>
              </CardContent>
            </Card>
            <Card className="p-2 sm:p-4">
              <CardHeader>
                <CardTitle className="text-xs sm:text-sm text-gray-400">
                  Winrate
                </CardTitle>
              </CardHeader>
              <CardContent>
                <span className="text-xl sm:text-2xl font-bold text-blue-500">
                  {metrics.winrate}%
                </span>
              </CardContent>
            </Card>
            <Card className="p-2 sm:p-4">
              <CardHeader>
                <CardTitle className="text-xs sm:text-sm text-gray-400">
                  Créditos
                </CardTitle>
              </CardHeader>
              <CardContent>
                <span className="text-xl sm:text-2xl font-bold text-[#1e9df1]">
                  {metrics.credits}
                </span>
              </CardContent>
            </Card>
          </div>

          {/* Tabs para gráficas */}
          <Tabs defaultValue="evolucion" className="mb-4 sm:mb-6">
            <TabsList className="overflow-x-auto max-w-full">
              <TabsTrigger value="evolucion" className="text-xs">
                Evolución
              </TabsTrigger>
              <TabsTrigger value="deportes" className="text-xs">
                Deportes más apostados
              </TabsTrigger>
              <TabsTrigger value="acierto" className="text-xs">
                Mejor acierto por deporte
              </TabsTrigger>
            </TabsList>
            <TabsContent value="evolucion">
              <Card className="mt-2 sm:mt-4 p-2 sm:p-4">
                <CardHeader>
                  <CardTitle className="text-base sm:text-lg">
                    Evolución de apuestas
                  </CardTitle>
                </CardHeader>
                <CardContent className="h-56 sm:h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={betsByDate}
                      margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#e1eaef" />
                      <XAxis dataKey="date" stroke="#888" fontSize={12} />
                      <YAxis stroke="#888" fontSize={12} />
                      <Tooltip />
                      <Line
                        type="monotone"
                        dataKey="Ganadas"
                        stroke="#00b87a"
                        strokeWidth={3}
                        dot={{ r: 4, fill: "#00b87a" }}
                      />
                      <Line
                        type="monotone"
                        dataKey="Perdidas"
                        stroke="#f4212e"
                        strokeWidth={3}
                        dot={{ r: 4, fill: "#f4212e" }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="deportes">
              <Card className="mt-2 sm:mt-4 p-2 sm:p-4">
                <CardHeader>
                  <CardTitle className="text-base sm:text-lg">
                    Deportes más apostados
                  </CardTitle>
                </CardHeader>
                <CardContent className="h-56 sm:h-64 flex items-center justify-center">
                  <PieChart width={180} height={180}>
                    <Pie
                      data={sportsPie}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={60}
                      innerRadius={32}
                      label
                    >
                      {sportsPie.map((entry, idx) => (
                        <Cell
                          key={`cell-sport-${idx}`}
                          fill={chartColors[idx % chartColors.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                  <ul className="text-gray-400 text-xs mt-2 space-y-1 ml-6">
                    {sportsPie.map((s, idx) => (
                      <li key={s.name} className="flex items-center gap-2">
                        <span
                          className="inline-block w-3 h-3 rounded-full"
                          style={{ background: chartColors[idx % chartColors.length] }}
                        ></span>
                        {s.name} - {s.value} apuestas
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="acierto">
              <Card className="mt-2 sm:mt-4 p-2 sm:p-4">
                <CardHeader>
                  <CardTitle className="text-base sm:text-lg">
                    Mejor acierto por deporte
                  </CardTitle>
                </CardHeader>
                <CardContent className="h-56 sm:h-64 flex items-center justify-center">
                  <BarChart
                    width={220}
                    height={180}
                    data={bestSports}
                    layout="vertical"
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#e1eaef" />
                    <XAxis
                      type="number"
                      domain={[0, 100]}
                      stroke="#888"
                      fontSize={12}
                    />
                    <YAxis
                      dataKey="name"
                      type="category"
                      stroke="#888"
                      width={70}
                      fontSize={12}
                    />
                    <Tooltip />
                    <Bar
                      dataKey="acierto"
                      fill="#1e9df1"
                      barSize={18}
                      radius={[8, 8, 8, 8]}
                    />
                  </BarChart>
                  <ul className="text-gray-400 text-xs mt-2 space-y-1 ml-6">
                    {bestSports.map((s) => (
                      <li key={s.name}>
                        {s.name} - {s.acierto}% acierto
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Tabla de apuestas recientes */}
          <Card className="border-gray-400 hover:border-gray-500 bg-white dark:bg-neutral-900 p-2 sm:p-4 mt-8">
            <CardHeader>
              <CardTitle className="text-base sm:text-lg">
                Apuestas recientes
              </CardTitle>
            </CardHeader>
            <CardContent className="overflow-x-auto">
              <table className="min-w-[200px] sm:min-w-full text-xs sm:text-sm text-left text-gray-400">
                <thead>
                  <tr className="border-b border-[#1e9df1]/20">
                    <th className="py-2 px-3">Fecha</th>
                    <th className="py-2 px-3">Deporte</th>
                    <th className="py-2 px-3">Partido</th>
                    <th className="py-2 px-3">Cuota</th>
                    <th className="py-2 px-3">Resultado</th>
                  </tr>
                </thead>
                <tbody>
                  {userBets.map((bet) => (
                    <tr key={bet.id} className="border-b border-[#1e9df1]/10">
                      <td className="py-2 px-3">{bet.date}</td>
                      <td className="py-2 px-3">{bet.sport}</td>
                      <td className="py-2 px-3">{bet.match}</td>
                      <td className="py-2 px-3">{bet.odds}</td>
                      <td
                        className={`py-2 px-3 ${
                          bet.status === "won"
                            ? "text-green-400"
                            : bet.status === "lost"
                            ? "text-red-400"
                            : "text-yellow-400"
                        }`}
                      >
                        {bet.status === "won"
                          ? "Ganada"
                          : bet.status === "lost"
                          ? "Perdida"
                          : "Pendiente"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default UserDashboardPage;
