"use client";
import { use } from "react";
import { getUserById } from "@/mock/user";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
import { TrendingUp, Users, Target, Award } from "lucide-react";

const chartColors = ["#1e9df1", "#f4212e", "#00b87a", "#f7b928", "#ff7849"];

export default function TipsterPublicProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const user = getUserById(id);
  if (!user) return <div className="text-center py-10">Tipster no encontrado</div>;

  // Datos mock para gráficos
  const performanceData = [
    { date: "Ene", Ganadas: 12, Perdidas: 3 },
    { date: "Feb", Ganadas: 15, Perdidas: 5 },
    { date: "Mar", Ganadas: 18, Perdidas: 4 },
    { date: "Abr", Ganadas: 14, Perdidas: 6 },
    { date: "May", Ganadas: 21, Perdidas: 2 },
  ];

  const sportsData = [
    { name: "Fútbol", value: 45 },
    { name: "Tenis", value: 25 },
    { name: "Basketball", value: 20 },
    { name: "Otros", value: 10 },
  ];

  return (
    <div className="max-w-6xl mx-auto py-8 px-4">
      {/* Header del perfil */}
      <Card className="mb-8">
        <CardContent className="p-8">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            <div className="w-24 h-24 bg-[#1e9df1] rounded-full flex items-center justify-center text-4xl font-bold text-white">
              {user.name?.charAt(0) || "T"}
            </div>
            <div className="flex-1 text-center md:text-left">
              <div className="flex flex-col md:flex-row md:items-center gap-2 mb-4">
                <h1 className="text-3xl font-bold text-foreground">{user.name}</h1>
                <div className="flex gap-2 justify-center md:justify-start">
                  <Badge className="bg-primary/10 text-primary capitalize">{user.role}</Badge>
                  {user.isPremium && <Badge className="bg-yellow-200 text-yellow-800">Premium</Badge>}
                  <Badge className="bg-success/10 text-success">Verificado</Badge>
                </div>
              </div>
              <p className="text-muted-foreground mb-4 max-w-2xl">{user.bio || "Sin biografía."}</p>
              <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                <Button variant="default" className="bg-primary hover:bg-primary/90">
                  <Users className="w-4 h-4 mr-2" />
                  Seguir
                </Button>
                <Button variant="outline">Contactar</Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Métricas principales */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <Target className="w-5 h-5 text-primary" />
            </div>
            <div className="text-2xl font-bold text-foreground">{user.stats?.picks ?? 0}</div>
            <div className="text-sm text-muted-foreground">Picks Totales</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <TrendingUp className="w-5 h-5 text-success" />
            </div>
            <div className="text-2xl font-bold text-success">{user.stats?.winrate ?? 0}%</div>
            <div className="text-sm text-muted-foreground">Winrate</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <Award className="w-5 h-5 text-yellow-500" />
            </div>
            <div className="text-2xl font-bold text-foreground">{user.stats?.won ?? 0}</div>
            <div className="text-sm text-muted-foreground">Ganados</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <Users className="w-5 h-5 text-primary" />
            </div>
            <div className="text-2xl font-bold text-foreground">1.2k</div>
            <div className="text-sm text-muted-foreground">Seguidores</div>
          </CardContent>
        </Card>
      </div>

      {/* Gráficos y estadísticas */}
      <Tabs defaultValue="rendimiento" className="mb-8">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="rendimiento">Rendimiento</TabsTrigger>
          <TabsTrigger value="deportes">Deportes</TabsTrigger>
          <TabsTrigger value="picks">Picks Recientes</TabsTrigger>
        </TabsList>
        
        <TabsContent value="rendimiento">
          <Card>
            <CardHeader>
              <CardTitle>Evolución del rendimiento</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={performanceData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e1eaef" />
                  <XAxis dataKey="date" stroke="#888" />
                  <YAxis stroke="#888" />
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
          <Card>
            <CardHeader>
              <CardTitle>Distribución por deportes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center">
                <PieChart width={300} height={300}>
                  <Pie
                    data={sportsData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    innerRadius={60}
                    label
                  >
                    {sportsData.map((entry, idx) => (
                      <Cell
                        key={`cell-${idx}`}
                        fill={chartColors[idx % chartColors.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="picks">
          <Card>
            <CardHeader>
              <CardTitle>Picks recientes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {user.picks?.map((pick) => (
                  <div key={pick.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <div className="font-medium text-foreground">{pick.match}</div>
                      <div className="text-sm text-muted-foreground">Hace 2 horas</div>
                    </div>
                    <div className="flex items-center gap-4">
                      <Badge className="bg-primary/10 text-primary">2.15</Badge>
                      <Badge
                        className={
                          pick.result === "won"
                            ? "bg-success/10 text-success"
                            : pick.result === "lost"
                            ? "bg-destructive/10 text-destructive"
                            : "bg-yellow-100 text-yellow-800"
                        }
                      >
                        {pick.result === "won"
                          ? "Ganado"
                          : pick.result === "lost"
                          ? "Perdido"
                          : "Pendiente"}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}