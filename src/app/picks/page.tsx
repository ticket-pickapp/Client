"use client";
import React, { useState, useMemo } from "react";
import { picks as picksMock } from "@/mock/pick";
import { ChevronDown, ChevronUp, Clock, Star, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useUserStore } from "@/lib/store/userStore";

const PICKS_PER_PAGE = 10;

const getRankColor = (rank: string) => {
  switch (rank) {
    case "Platinum":
      return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200";
    case "Gold":
      return "bg-amber-200 text-white dark:bg-amber-400";
    default:
      return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
  }
};

const getPickCost = (rank: string) => {
  switch (rank) {
    case "Platinum":
      return 1;
    case "Gold":
      return 3;
    case "Silver":
      return 2;
    default:
      return 3;
  }
};

const PicksPage = () => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [expandedPick, setExpandedPick] = useState<number | null>(null);
  const [mobileExpandedPick, setMobileExpandedPick] = useState<number | null>(null);
  const buyPick = useUserStore((state) => state.buyPick);
  const hasPurchasedPick = useUserStore((state) => state.hasPurchasedPick);

  // Filtrado
  const filteredPicks = useMemo(() => {
    return picksMock.filter((pick) => {
      const searchLower = search.toLowerCase();
      return (
        pick.tipster.toLowerCase().includes(searchLower) ||
        pick.sport.toLowerCase().includes(searchLower) ||
        pick.match.toLowerCase().includes(searchLower)
      );
    });
  }, [search]);

  // Paginación
  const totalPages = Math.ceil(filteredPicks.length / PICKS_PER_PAGE);
  const paginatedPicks = filteredPicks.slice(
    (page - 1) * PICKS_PER_PAGE,
    page * PICKS_PER_PAGE
  );

  // Handlers
  const handleExpand = (id: number) => {
    setExpandedPick(expandedPick === id ? null : id);
  };
  const handleMobileExpand = (id: number) => {
    setMobileExpandedPick(mobileExpandedPick === id ? null : id);
  };

  // Reset page si cambia el filtro
  React.useEffect(() => {
    setPage(1);
  }, [search]);

  return (
    <section className="py-20 bg-background min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h2 className="text-3xl font-bold text-foreground">Encuentros</h2>
          <input
            type="text"
            placeholder="Buscar por tipster, deporte o partido..."
            className="w-full sm:w-80 px-4 py-2 border border-primary rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Desktop Table */}
        <div
          style={{ filter: "drop-shadow(0 8px 32px rgba(31, 38, 135, 0.37))" }}
          className="hidden md:block bg-card rounded-lg border border-border overflow-hidden"
        >
          {/* Table Header */}
          <div className="bg-sidebar px-6 py-4 border-b border-border">
            <div className="grid grid-cols-12 gap-4 text-sm font-medium text-foreground">
              <div className="col-span-3">Tipster</div>
              <div className="col-span-2">Deporte</div>
              <div className="col-span-3">Partido</div>
              <div className="col-span-1">Hora</div>
              <div className="col-span-1">Cuota</div>
              <div className="col-span-1">Rango</div>
              <div className="col-span-1">Acción</div>
            </div>
          </div>
          {/* Table Body */}
          <div>
            {paginatedPicks.length === 0 ? (
              <div className="px-6 py-8 text-center text-muted-foreground">
                No se encontraron picks.
              </div>
            ) : (
              paginatedPicks.map((pick) => (
                <div key={pick.id}>
                  {/* Main Row */}
                  <div className="px-6 py-4 hover:bg-secondary transition-colors">
                    <div className="grid grid-cols-12 gap-4 items-center">
                      <div className="col-span-3 flex items-center gap-3">
                        <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-xs font-bold">
                          {pick.avatar}
                        </div>
                        <div>
                          <div className="font-medium text-foreground text-sm">
                            {pick.tipster}
                          </div>
                          <div className="text-xs text-gray-500 flex items-center gap-1">
                            <Star className="h-3 w-3 fill-accent text-accent" />
                            {pick.record.wins}/{pick.record.wins + pick.record.losses}
                          </div>
                        </div>
                      </div>
                      <div className="col-span-2">
                        <Badge variant="secondary" className="bg-secondary text-foreground">
                          {pick.sport}
                        </Badge>
                      </div>
                      <div className="col-span-3">
                        <div className="font-medium text-foreground text-sm">
                          {pick.match}
                        </div>
                      </div>
                      <div className="col-span-1">
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          {pick.time}
                        </div>
                      </div>
                      <div className="col-span-1">
                        <div className="font-bold text-success">{pick.odds}</div>
                      </div>
                      <div className="col-span-1">
                        <Badge className={getRankColor(pick.rank)}>{pick.rank}</Badge>
                      </div>
                      <div className="col-span-1">
                        <Button
                          variant="default"
                          size="sm"
                          onClick={() => handleExpand(pick.id)}
                          className="p-1"
                        >
                          {expandedPick === pick.id ? (
                            <ChevronUp className="h-4 w-4" />
                          ) : (
                            <ChevronDown className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </div>
                  </div>
                  {/* Expanded Content */}
                  {expandedPick === pick.id && (
                    <div className="px-6 py-4 bg-sidebar border-t border-border relative">
                      {!hasPurchasedPick(pick.id) ? (
                        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-black/40 rounded-lg backdrop-blur-sm">
                          <div className="text-white font-bold text-lg mb-4">Compra este pick para ver los detalles</div>
                          <Button
                            className="bg-primary hover:bg-primary/90 text-primary-foreground"
                            onClick={() => {
                              const cost = getPickCost(pick.rank);
                              const ok = buyPick(pick.id, cost);
                              if (ok) {
                                alert("¡Pick comprado exitosamente!");
                              } else {
                                alert(`No tienes suficientes créditos. Necesitas ${cost} créditos.`);
                              }
                            }}
                          >
                            Comprar Pick - {getPickCost(pick.rank)} monedas
                          </Button>
                        </div>
                      ) : null}
                      <div className={hasPurchasedPick(pick.id) ? "" : "blur-sm select-none pointer-events-none"}>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                          <div>
                            <h4 className="font-semibold text-foreground mb-2">Análisis</h4>
                            <p className="text-muted-foreground text-sm mb-4">{pick.analysis}</p>
                            <div className="flex items-center gap-4 text-sm">
                              <div>
                                <span className="text-muted-foreground">Tipo de apuesta:</span>
                                <span className="ml-2 font-medium text-foreground">{pick.betType}</span>
                              </div>
                            </div>
                          </div>
                          <div>
                            <h4 className="font-semibold text-foreground mb-2">Estadísticas del Tipster</h4>
                            <div className="space-y-2 text-sm">
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">Aciertos:</span>
                                <span className="font-medium text-success">{pick.record.wins}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">Fallos:</span>
                                <span className="font-medium text-destructive">{pick.record.losses}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">Compras del pick:</span>
                                <span className="font-medium text-foreground flex items-center gap-1">
                                  <Users className="h-3 w-3" />
                                  {pick.purchases}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>

        {/* Mobile Cards */}
        <div className="md:hidden space-y-4">
          {paginatedPicks.length === 0 ? (
            <div className="text-center text-muted-foreground py-8">No se encontraron picks.</div>
          ) : (
            paginatedPicks.map((pick) => (
              <div
                key={pick.id}
                style={{ filter: "drop-shadow(0 8px 32px rgba(31, 38, 135, 0.37))" }}
                className="bg-card rounded-lg border border-border p-4 cursor-pointer"
                onClick={() => handleMobileExpand(pick.id)}
              >
                {/* Main Card Content */}
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3 flex-1">
                    <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-sm font-bold">
                      {pick.avatar}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-foreground text-sm truncate">{pick.tipster}</div>
                      <div className="text-xs text-muted-foreground flex items-center gap-1">
                        <Star className="h-3 w-3 fill-accent text-accent" />
                        {pick.record.wins}/{pick.record.wins + pick.record.losses}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className={getRankColor(pick.rank)}>{pick.rank}</Badge>
                    {mobileExpandedPick === pick.id ? (
                      <ChevronUp className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <ChevronDown className="h-4 w-4 text-muted-foreground" />
                    )}
                  </div>
                </div>
                {/* Match Info */}
                <div className="mb-3">
                  <div className="font-medium text-foreground text-sm mb-1">{pick.match}</div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Badge variant="secondary" className="bg-secondary text-foreground text-xs">
                      {pick.sport}
                    </Badge>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {pick.time}
                    </div>
                  </div>
                </div>
                {/* Expanded Mobile Content */}
                {mobileExpandedPick === pick.id && (
                  <div className="mt-4 pt-4 border-t border-border space-y-4 relative">
                    {!hasPurchasedPick(pick.id) ? (
                      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-black/40 rounded-lg backdrop-blur-sm">
                        <div className="text-white font-bold text-lg mb-4">Compra este pick para ver los detalles</div>
                        <Button
                          className="bg-primary hover:bg-primary/90 text-primary-foreground"
                          onClick={(e) => {
                            e.stopPropagation();
                            const cost = getPickCost(pick.rank);
                            const ok = buyPick(pick.id, cost);
                            if (ok) {
                              alert("¡Pick comprado exitosamente!");
                            } else {
                              alert(`No tienes suficientes créditos. Necesitas ${cost} créditos.`);
                            }
                          }}
                        >
                          Comprar Pick - {getPickCost(pick.rank)} monedas
                        </Button>
                      </div>
                    ) : null}
                    <div className={hasPurchasedPick(pick.id) ? "" : "blur-sm select-none pointer-events-none"}>
                      {/* Cuota y estadísticas */}
                      <div className="flex justify-between items-center">
                        <div className="text-center">
                          <div className="text-xs text-muted-foreground">Cuota</div>
                          <div className="font-bold text-success text-lg">{pick.odds}</div>
                        </div>
                        <div className="text-center">
                          <div className="text-xs text-muted-foreground">Compras</div>
                          <div className="font-medium text-foreground flex items-center gap-1">
                            <Users className="h-3 w-3" />
                            {pick.purchases}
                          </div>
                        </div>
                      </div>
                      {/* Análisis */}
                      <div>
                        <h5 className="font-semibold text-foreground text-sm mb-2">Análisis</h5>
                        <p className="text-muted-foreground text-xs leading-relaxed">{pick.analysis}</p>
                      </div>
                      {/* Estadísticas */}
                      <div className="grid grid-cols-2 gap-4 text-xs">
                        <div>
                          <span className="text-muted-foreground">Aciertos:</span>
                          <span className="ml-2 font-medium text-success">{pick.record.wins}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Fallos:</span>
                          <span className="ml-2 font-medium text-destructive">{pick.record.losses}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>

        {/* Paginación */}
        {totalPages > 1 && (
          <div className="flex justify-center gap-2 mt-10">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
            >
              Anterior
            </Button>
            {Array.from({ length: totalPages }, (_, i) => (
              <Button
                key={i + 1}
                variant={page === i + 1 ? "default" : "outline"}
                size="sm"
                onClick={() => setPage(i + 1)}
              >
                {i + 1}
              </Button>
            ))}
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
            >
              Siguiente
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default PicksPage;