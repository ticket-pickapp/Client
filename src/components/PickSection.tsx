"use client";
import { picks } from "@/mock/pick";
import { ChevronDown, ChevronUp, Clock, Star, Users } from "lucide-react";
import { Badge } from "./ui/badge";
import { useAuth } from "@/lib/auth-context";
import React, { useState } from "react";
import { Button } from "./ui/button";

const PickSection = () => {
  const [expandedPick, setExpandedPick] = useState<number | null>(null);
  const { user, updateCredits } = useAuth();

  const togglePick = (id: number) => {
    setExpandedPick(expandedPick === id ? null : id);
  };

  const getRankColor = (rank: string) => {
    switch (rank) {
      case "Platinum":
        return "bg-gray-100 text-gray-800";
      case "Gold":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-blue-100 text-blue-800";
    }
  };
  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Picks del Día
          </h2>
          <p className="text-muted-foreground text-lg">
            Los mejores pronósticos de nuestros tipsters verificados
          </p>
        </div>

        <div className="bg-card rounded-lg border border-border overflow-hidden">
          {/* Table Header */}
          <div className="bg-sidebar px-6 py-4 border-b border-border">
            <div className="grid grid-cols-12 gap-4 text-sm font-medium text-foreground">
              <div className="col-span-3">Tipster</div>
              <div className="col-span-2 hidden md:block">Deporte</div>
              <div className="col-span-3">Partido</div>
              <div className="col-span-1 hidden sm:block">Hora</div>
              <div className="col-span-1">Cuota</div>
              <div className="col-span-1 hidden lg:block">Rango</div>
              <div className="col-span-1">Acción</div>
            </div>
          </div>

          {/* Table Body */}
          <div className="divide-y divide-[#E3ECF6]">
            {picks.map((pick) => (
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
                          {pick.record.wins}/
                          {pick.record.wins + pick.record.losses}
                        </div>
                      </div>
                    </div>
                    <div className="col-span-2 hidden md:block">
                      <Badge
                        variant="secondary"
                        className="bg-secondary text-foreground"
                      >
                        {pick.sport}
                      </Badge>
                    </div>
                    <div className="col-span-3">
                      <div className="font-medium text-foreground text-sm">
                        {pick.match}
                      </div>
                    </div>
                    <div className="col-span-1 hidden sm:block">
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        {pick.time}
                      </div>
                    </div>
                    <div className="col-span-1">
                      <div className="font-bold text-success">
                        {pick.odds}
                      </div>
                    </div>
                    <div className="col-span-1 hidden lg:block">
                      <Badge className={getRankColor(pick.rank)}>
                        {pick.rank}
                      </Badge>
                    </div>
                    <div className="col-span-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => togglePick(pick.id)}
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
                  <div className="px-6 py-4 bg-sidebar border-t border-border">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold text-foreground mb-2">
                          Análisis
                        </h4>
                        <p className="text-muted-foreground text-sm mb-4">
                          {pick.analysis}
                        </p>
                        <div className="flex items-center gap-4 text-sm">
                          <div>
                            <span className="text-muted-foreground">
                              Tipo de apuesta:
                            </span>
                            <span className="ml-2 font-medium text-foreground">
                              {pick.betType}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground mb-2">
                          Estadísticas del Tipster
                        </h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Aciertos:</span>
                            <span className="font-medium text-success">
                              {pick.record.wins}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Fallos:</span>
                            <span className="font-medium text-destructive">
                              {pick.record.losses}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">
                              Compras del pick:
                            </span>
                            <span className="font-medium text-foreground flex items-center gap-1">
                              <Users className="h-3 w-3" />
                              {pick.purchases}
                            </span>
                          </div>
                        </div>
                        <Button 
                          className="w-full mt-4 bg-primary hover:bg-primary/90 text-primary-foreground"
                          onClick={() => {
                            if (user && user.credits >= 5) {
                              updateCredits(-5);
                              alert("¡Pick comprado exitosamente!");
                            } else {
                              alert("No tienes suficientes créditos. Necesitas 5 créditos.");
                            }
                          }}
                        >
                          Comprar Pick - 5 monedas
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PickSection;
