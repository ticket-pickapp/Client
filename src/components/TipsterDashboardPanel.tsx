"use client";
import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
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
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { countriesData, earningsData, leaguesColors, leaguesData, picksTable, teamsData } from "@/mock/dashboard";

// Hook para detectar el tema actual
function useIsDarkTheme() {
  const [isDark, setIsDark] = useState(false);
  useEffect(() => {
    const check = () =>
      setIsDark(document.documentElement.classList.contains("dark"));
    check();
    const observer = new MutationObserver(check);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => observer.disconnect();
  }, []);
  return isDark;
}

const countriesColors = ["#1e9df1", "#00b87a", "#f7b928", "#ff7849"];

const TipsterDashboardPanel: React.FC = () => {
  const router = useRouter();
  const isDark = useIsDarkTheme();
  // Colores dependientes del tema
  const chartStroke = isDark ? "#d3d3d5" : "#18181b";
  const chartBg = isDark ? "#23272f" : "#e1eaef";
  const axisText = isDark ? "#b3c2d1" : "#18181b";

  return (
    <div className="w-full min-h-screen bg-background p-2 sm:p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4 sm:mb-8">
            Hola, Samir 👋
          </h2>
          <Button
            className="p-1 lg:p-2  dark:hover:bg-white/10 text-black dark:text-white hover:bg-black/10"
            onClick={() => router.push("/tipster/create-pick")}
          >
            Crear Pick
          </Button>
        </div>
        {/* Resumen superior */}
        <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-2 sm:gap-4 mb-4 sm:mb-6">
          <Card
            className={
              `border-gray-400 hover:border-gray-500 bg-white dark:bg-neutral-900` +
              " p-2 sm:p-4"
            }
          >
            <CardHeader>
              <CardTitle className="text-xs sm:text-sm text-gray-400">
                Ganancias este mes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <span className="text-xl sm:text-2xl font-bold text-black dark:text-white">
                $3,050.47
              </span>
            </CardContent>
          </Card>
          <Card
            className={
              `border-gray-400 hover:border-gray-500 bg-white dark:bg-neutral-900` +
              " p-2 sm:p-4"
            }
          >
            <CardHeader>
              <CardTitle className="text-xs sm:text-sm text-gray-400">
                Suscriptores activos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <span className="text-xl sm:text-2xl font-bold text-[#1e9df1]">
                89
              </span>
            </CardContent>
          </Card>
          <Card
            className={
              `border-gray-400 hover:border-gray-500 bg-white dark:bg-neutral-900` +
              " p-2 sm:p-4"
            }
          >
            <CardHeader>
              <CardTitle className="text-xs sm:text-sm text-gray-400">
                Picks generados
              </CardTitle>
            </CardHeader>
            <CardContent>
              <span className="text-xl sm:text-2xl font-bold text-black dark:text-white">
                156
              </span>
            </CardContent>
          </Card>
          <Card
            className={
              `border-gray-400 hover:border-gray-500 bg-white dark:bg-neutral-900` +
              " p-2 sm:p-4"
            }
          >
            <CardHeader>
              <CardTitle className="text-xs sm:text-sm text-gray-400">
                Winrate
              </CardTitle>
            </CardHeader>
            <CardContent>
              <span className="text-xl sm:text-2xl font-bold text-green-400">
                78.5%
              </span>
            </CardContent>
          </Card>
        </div>
        {/* Tabs para métricas y gráficas */}
        <Tabs defaultValue="ganancias" className="mb-4 sm:mb-6">
          <TabsList className="overflow-x-auto max-w-full">
            <TabsTrigger value="ganancias" className="text-xs">
              Evolución de Ganancias
            </TabsTrigger>
            <TabsTrigger value="picks" className="text-xs">
              Picks por Mes
            </TabsTrigger>
            <TabsTrigger value="acierto" className="text-xs">
              Tasa de Acierto
            </TabsTrigger>
          </TabsList>
          <TabsContent value="ganancias">
            <Card
              className={`mt-2 sm:mt-4 border-gray-400 hover:border-gray-500 bg-white dark:bg-neutral-900 p-2 sm:p-4`}
            >
              <CardHeader>
                <CardTitle className="text-base sm:text-lg">
                  Evolución de Ganancias
                </CardTitle>
              </CardHeader>
              <CardContent className="h-56 sm:h-64">
                <div className="w-full h-full min-w-[200px] sm:min-w-0">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={earningsData}
                      margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke={chartBg} />
                      <XAxis dataKey="month" stroke={axisText} fontSize={12} />
                      <YAxis stroke={axisText} fontSize={12} />
                      <Tooltip />
                      <Line
                        type="monotone"
                        dataKey="value"
                        stroke={chartStroke}
                        strokeWidth={3}
                        dot={{ r: 4, fill: chartStroke }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="picks">
            <Card
              className={`mt-2 sm:mt-4 border-gray-400 hover:border-gray-500 bg-white dark:bg-neutral-900 p-2 sm:p-4`}
            >
              <CardHeader>
                <CardTitle className="text-base sm:text-lg">
                  Picks por Mes
                </CardTitle>
              </CardHeader>
              <CardContent className="h-56 sm:h-64 flex items-center justify-center text-gray-400">
                (Gráfica próximamente)
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="acierto">
            <Card
              className={`mt-2 sm:mt-4 border-gray-400 hover:border-gray-500 bg-white dark:bg-neutral-900 p-2 sm:p-4`}
            >
              <CardHeader>
                <CardTitle className="text-base sm:text-lg">
                  Tasa de Acierto
                </CardTitle>
              </CardHeader>
              <CardContent className="h-56 sm:h-64 flex items-center justify-center text-gray-400">
                (Gráfica próximamente)
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        {/* Métricas y rankings con gráficas */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 sm:gap-4 mb-4 sm:mb-6">
          {/* Ligas más participadas con PieChart */}
          <Card
            className={`border-gray-400 hover:border-gray-500 bg-white dark:bg-neutral-900 p-2 sm:p-4`}
          >
            <CardHeader>
              <CardTitle className="text-base sm:text-lg">
                Ligas más participadas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center">
                <PieChart width={160} height={160}>
                  <Pie
                    data={leaguesData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={50}
                    innerRadius={28}
                    label
                  >
                    {leaguesData.map((entry, idx) => (
                      <Cell
                        key={`cell-league-${idx}`}
                        fill={leaguesColors[idx % leaguesColors.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
                <ul className="text-gray-300 text-xs mt-2 space-y-1">
                  {leaguesData.map((l, idx) => (
                    <li key={l.name} className="flex items-center gap-2">
                      <span
                        className="inline-block w-3 h-3 rounded-full"
                        style={{
                          background: leaguesColors[idx % leaguesColors.length],
                        }}
                      ></span>
                      {l.name} - {l.value} picks
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
          {/* Equipos con mejores resultados con BarChart */}
          <Card
            className={`border-gray-400 hover:border-gray-500 bg-white dark:bg-neutral-900 p-2 sm:p-4`}
          >
            <CardHeader>
              <CardTitle className="text-base sm:text-lg">
                Equipos con mejores resultados
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center">
                <div className="w-full overflow-x-auto">
                  <BarChart
                    width={200}
                    height={160}
                    data={teamsData}
                    layout="vertical"
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke={chartBg} />
                    <XAxis
                      type="number"
                      domain={[0, 100]}
                      stroke={chartStroke}
                      fontSize={12}
                    />
                    <YAxis
                      dataKey="name"
                      type="category"
                      stroke={chartStroke}
                      width={70}
                      fontSize={12}
                    />
                    <Tooltip />
                    <Bar
                      dataKey="acierto"
                      fill="#00b87a"
                      barSize={14}
                      radius={[8, 8, 8, 8]}
                    />
                  </BarChart>
                </div>
                <ul className="text-gray-300 text-xs mt-2 space-y-1">
                  {teamsData.map((t) => (
                    <li key={t.name}>
                      {t.name} - {t.acierto}% acierto
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
          {/* Países de los suscriptores con PieChart */}
          <Card
            className={`border-gray-400 hover:border-gray-500 bg-white dark:bg-neutral-900 p-2 sm:p-4`}
          >
            <CardHeader>
              <CardTitle className="text-base sm:text-lg">
                Países de los suscriptores
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center">
                <PieChart width={160} height={160}>
                  <Pie
                    data={countriesData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={50}
                    innerRadius={28}
                    label
                  >
                    {countriesData.map((entry, idx) => (
                      <Cell
                        key={`cell-country-${idx}`}
                        fill={countriesColors[idx % countriesColors.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
                <ul className="text-gray-300 text-xs mt-2 space-y-1">
                  {countriesData.map((c, idx) => (
                    <li key={c.name} className="flex items-center gap-2">
                      <span
                        className="inline-block w-3 h-3 rounded-full"
                        style={{
                          background:
                            countriesColors[idx % countriesColors.length],
                        }}
                      ></span>
                      {c.name} - {c.value}
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
        {/* Tabla de picks recientes */}
        <Card
          className={`border-gray-400 hover:border-gray-500 bg-white dark:bg-neutral-900 p-2 sm:p-4`}
        >
          <CardHeader>
            <CardTitle className="text-base sm:text-lg">
              Picks recientes
            </CardTitle>
          </CardHeader>
          <CardContent className="overflow-x-auto">
            <table className="min-w-[200px] sm:min-w-full text-xs sm:text-sm text-left text-gray-400">
              <thead>
                <tr className="border-b border-[#1e9df1]/20">
                  <th className="py-2 px-3 hidden lg:block">Fecha</th>
                  <th className="py-2 px-3 hidden lg:block">Liga</th>
                  <th className="py-2 px-3">Partido</th>
                  <th className="py-2 px-3">Cuota</th>
                  <th className="py-2 px-3">Resultado</th>
                </tr>
              </thead>
              <tbody>
                {picksTable.map((pick, i) => (
                  <tr key={i} className="border-b border-[#1e9df1]/10">
                    <td className="py-2 px-3 hidden lg:block">{pick.date}</td>
                    <td className="py-2 px-3 hidden lg:block">{pick.league}</td>
                    <td className="py-2 px-3">{pick.match}</td>
                    <td className="py-2 px-3">{pick.odds}</td>
                    <td
                      className={`py-2 px-3 ${
                        pick.result === "Ganado"
                          ? "text-green-400"
                          : "text-red-400"
                      }`}
                    >
                      {pick.result}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TipsterDashboardPanel;
