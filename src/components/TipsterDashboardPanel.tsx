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

// Hook para detectar el tema actual
function useIsDarkTheme() {
  const [isDark, setIsDark] = useState(false);
  useEffect(() => {
    const check = () => setIsDark(document.documentElement.classList.contains("dark"));
    check();
    const observer = new MutationObserver(check);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);
  return isDark;
}

const earningsData = [
  { month: "Ene", value: 1200 },
  { month: "Feb", value: 1800 },
  { month: "Mar", value: 1500 },
  { month: "Abr", value: 2100 },
  { month: "May", value: 3050 },
  { month: "Jun", value: 2500 },
];

const picksTable = [
  {
    date: "10/06/2024",
    league: "LaLiga",
    match: "Real Madrid vs Barcelona",
    odds: "2.10",
    result: "Ganado",
  },
  {
    date: "09/06/2024",
    league: "Premier League",
    match: "Man City vs Liverpool",
    odds: "1.95",
    result: "Perdido",
  },
  {
    date: "08/06/2024",
    league: "Serie A",
    match: "Juventus vs Inter",
    odds: "2.30",
    result: "Ganado",
  },
];

const leaguesData = [
  { name: "LaLiga", value: 45 },
  { name: "Premier League", value: 38 },
  { name: "Serie A", value: 22 },
  { name: "Bundesliga", value: 18 },
];
const leaguesColors = ["#1e9df1", "#f7b928", "#00b87a", "#ff7849"];

const teamsData = [
  { name: "Real Madrid", acierto: 80 },
  { name: "Manchester City", acierto: 75 },
  { name: "Juventus", acierto: 70 },
];

const countriesData = [
  { name: "España", value: 40 },
  { name: "México", value: 25 },
  { name: "Argentina", value: 15 },
  { name: "Colombia", value: 9 },
];
const countriesColors = ["#1e9df1", "#00b87a", "#f7b928", "#ff7849"];

const TipsterDashboardPanel: React.FC = () => {
  const isDark = useIsDarkTheme();
  // Colores dependientes del tema
  const chartStroke = isDark ? "#d3d3d5" : "#18181b";
  const chartBg = isDark ? "#23272f" : "#e1eaef";
  const axisText = isDark ? "#b3c2d1" : "#18181b";

  return (
    <div className="w-full min-h-screen bg-background p-6">
      <h2 className="text-3xl font-bold text-foreground mb-8">Hola, Samir 👋</h2>
      {/* Resumen superior */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card className={`border-gray-400 hover:border-gray-500 bg-white dark:bg-neutral-900`}>
          <CardHeader>
            <CardTitle className="text-xs text-gray-400">
              Ganancias este mes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <span className="text-2xl font-bold text-black dark:text-white">
              $3,050.47
            </span>
          </CardContent>
        </Card>
        <Card className={`border-gray-400 hover:border-gray-500 bg-white dark:bg-neutral-900`}>
          <CardHeader>
            <CardTitle className="text-xs text-gray-400">
              Suscriptores activos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <span className="text-2xl font-bold text-[#1e9df1]">89</span>
          </CardContent>
        </Card>
        <Card className={`border-gray-400 hover:border-gray-500 bg-white dark:bg-neutral-900`}>
          <CardHeader>
            <CardTitle className="text-xs text-gray-400">
              Picks generados
            </CardTitle>
          </CardHeader>
          <CardContent>
            <span className="text-2xl font-bold text-black dark:text-white">
              156
            </span>
          </CardContent>
        </Card>
        <Card className={`border-gray-400 hover:border-gray-500 bg-white dark:bg-neutral-900`}>
          <CardHeader>
            <CardTitle className="text-xs text-gray-400">Winrate</CardTitle>
          </CardHeader>
          <CardContent>
            <span className="text-2xl font-bold text-green-400">78.5%</span>
          </CardContent>
        </Card>
      </div>

      {/* Tabs para métricas y gráficas */}
      <Tabs defaultValue="ganancias" className="mb-6">
        <TabsList>
          <TabsTrigger value="ganancias">Evolución de Ganancias</TabsTrigger>
          <TabsTrigger value="picks">Picks por Mes</TabsTrigger>
          <TabsTrigger value="acierto">Tasa de Acierto</TabsTrigger>
        </TabsList>
        <TabsContent value="ganancias">
          <Card className={`mt-4 border-gray-400 hover:border-gray-500 bg-white dark:bg-neutral-900`}>
            <CardHeader>
              <CardTitle>Evolución de Ganancias</CardTitle>
            </CardHeader>
            <CardContent className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={earningsData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke={chartBg} />
                  <XAxis dataKey="month" stroke={axisText} />
                  <YAxis stroke={axisText} />
                  <Tooltip />
                  <Line type="monotone" dataKey="value" stroke={chartStroke} strokeWidth={3} dot={{ r: 5, fill: chartStroke }} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="picks">
          <Card className={`mt-4 border-gray-400 hover:border-gray-500 bg-white dark:bg-neutral-900`}>
            <CardHeader>
              <CardTitle>Picks por Mes</CardTitle>
            </CardHeader>
            <CardContent className="h-64 flex items-center justify-center text-gray-400">
              (Gráfica próximamente)
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="acierto">
          <Card className={`mt-4 border-gray-400 hover:border-gray-500 bg-white dark:bg-neutral-900`}>
            <CardHeader>
              <CardTitle>Tasa de Acierto</CardTitle>
            </CardHeader>
            <CardContent className="h-64 flex items-center justify-center text-gray-400">
              (Gráfica próximamente)
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Métricas y rankings con gráficas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {/* Ligas más participadas con PieChart */}
        <Card className={`border-gray-400 hover:border-gray-500 bg-white dark:bg-neutral-900`}>
          <CardHeader>
            <CardTitle>Ligas más participadas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center">
              <PieChart width={180} height={180}>
                <Pie
                  data={leaguesData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={60}
                  innerRadius={35}
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
        <Card className={`border-gray-400 hover:border-gray-500 bg-white dark:bg-neutral-900`}>
          <CardHeader>
            <CardTitle>Equipos con mejores resultados</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center">
              <BarChart
                width={220}
                height={180}
                data={teamsData}
                layout="vertical"
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#23272f" />
                <XAxis type="number" domain={[0, 100]} stroke={chartStroke} />
                <YAxis
                  dataKey="name"
                  type="category"
                  stroke={chartStroke}
                  width={90}
                />
                <Tooltip />
                <Bar
                  dataKey="acierto"
                  fill="#00b87a"
                  barSize={18}
                  radius={[8, 8, 8, 8]}
                />
              </BarChart>
              <ul className="text-xs mt-2 space-y-1">
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
        <Card className={`border-gray-400 hover:border-gray-500 bg-white dark:bg-neutral-900`}>
          <CardHeader>
            <CardTitle>Países de los suscriptores</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center">
              <PieChart width={180} height={180}>
                <Pie
                  data={countriesData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={60}
                  innerRadius={35}
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
      <Card className={`border-gray-400 hover:border-gray-500 bg-white dark:bg-neutral-900`}>
        <CardHeader>
          <CardTitle>Picks recientes</CardTitle>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <table className="min-w-full text-sm text-left text-gray-400">
            <thead>
              <tr className="border-b border-[#1e9df1]/20">
                <th className="py-2 px-3">Fecha</th>
                <th className="py-2 px-3">Liga</th>
                <th className="py-2 px-3">Partido</th>
                <th className="py-2 px-3">Cuota</th>
                <th className="py-2 px-3">Resultado</th>
              </tr>
            </thead>
            <tbody>
              {picksTable.map((pick, i) => (
                <tr key={i} className="border-b border-[#1e9df1]/10">
                  <td className="py-2 px-3">{pick.date}</td>
                  <td className="py-2 px-3">{pick.league}</td>
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
  );
};

export default TipsterDashboardPanel;
