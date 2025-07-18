"use client";
import {
  CheckCircle,
  Clock,
  Coins,
  Shield,
  Star,
  Target,
  Users,
} from "lucide-react";
import React, { useState } from "react";
import { Button } from "./ui/button";

const Statistics = () => {
  const [activePillar, setActivePillar] = useState<number | null>(1);
  return (
    <section className="py-12 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row mb-8 lg:mb-16 text-center justify-between">
          <div className="px-2 lg:px-4 mb-6 lg:mb-0">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold mb-2 lg:mb-4">
              Tu <span className="text-[#1e9df1]">socio de confianza</span>
            </h2>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-400 mb-4 lg:mb-6">
              <span className="text-black dark:text-white">en</span> apuestas
              deportivas.
            </h2>
          </div>
          <div className="px-2 lg:px-4 flex">
            <div className="w-full lg:w-[300px]">
              <p className="text-sm lg:text-md max-w-2xl lg:text-start text-gray-400">
                Construimos una plataforma sólida basada en tres pilares
                fundamentales que garantizan tu éxito y tranquilidad en cada
                apuesta.
              </p>
            </div>
          </div>
        </div>

        <div className="relative max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-8">
            {/* Pilar 1 - Seguridad */}
            <div
              style={{
                filter: "drop-shadow(0 8px 32px rgba(31, 38, 135, 0.37))",
              }}
              className={`relative p-4 lg:p-8 rounded-xl lg:rounded-2xl border transition-all duration-300 cursor-pointer ${
                activePillar === 0
                  ? "bg-[#1e9df1] border-[#1e9df1] lg:scale-110"
                  : " border-gray-400 hover:border-gray-500 bg-white dark:bg-neutral-900"
              }`}
              onClick={() => setActivePillar(activePillar === 0 ? null : 0)}
            >
              <div className="text-3xl lg:text-6xl font-bold text-gray-600 mb-2 lg:mb-4">
                01.
              </div>
              <h3
                className={`text-lg lg:text-xl font-bold mb-2 lg:mb-3 ${
                  activePillar === 0 ? "text-white/90" : "text-gray-400"
                }`}
              >
                Seguridad en los Pagos
              </h3>
              <p
                className={`text-xs lg:text-sm mb-3 lg:mb-4 ${
                  activePillar === 0 ? "text-white/90" : "text-gray-400"
                }`}
              >
                Protección total de tus transacciones con encriptación de nivel
                bancario.
              </p>

              {activePillar === 0 && (
                <div className="mt-4 lg:mt-6 space-y-2 lg:space-y-3 animate-in slide-in-from-top-2 duration-300">
                  <div className="flex items-center gap-2 lg:gap-3 text-white/90 text-xs lg:text-sm">
                    <Shield className="h-3 w-3 lg:h-4 lg:w-4" />
                    <span>Encriptación SSL 256-bit</span>
                  </div>
                  <div className="flex items-center gap-2 lg:gap-3 text-white/90 text-xs lg:text-sm">
                    <CheckCircle className="h-3 w-3 lg:h-4 lg:w-4" />
                    <span>Pagos procesados por Stripe</span>
                  </div>
                  <div className="flex items-center gap-2 lg:gap-3 text-white/90 text-xs lg:text-sm">
                    <Shield className="h-3 w-3 lg:h-4 lg:w-4" />
                    <span>Cumplimiento PCI DSS</span>
                  </div>
                  <Button
                    size="sm"
                    className="mt-3 lg:mt-4 bg-white text-[#1e9df1] hover:bg-gray-100 font-medium text-xs lg:text-sm"
                  >
                    Saber más →
                  </Button>
                </div>
              )}
            </div>

            {/* Pilar 2 - Transparencia */}
            <div
              style={{
                filter: "drop-shadow(0 8px 32px rgba(31, 38, 135, 0.37))",
              }}
              className={`relative p-4 lg:p-8 rounded-xl lg:rounded-2xl border transition-all duration-300 cursor-pointer ${
                activePillar === 1
                  ? "bg-[#1e9df1] border-[#1e9df1] lg:scale-110"
                  : " border-gray-400 hover:border-gray-500 bg-white dark:bg-neutral-900"
              }`}
              onClick={() => setActivePillar(activePillar === 1 ? null : 1)}
            >
              <div className="text-3xl lg:text-6xl font-bold text-gray-600 mb-2 lg:mb-4">
                02.
              </div>
              <h3
                className={`text-lg lg:text-xl font-bold mb-2 lg:mb-3 ${
                  activePillar === 1 ? "text-white" : "text-gray-400"
                }`}
              >
                100% Transparencia
              </h3>
              <p
                className={`text-xs lg:text-sm mb-3 lg:mb-4 ${
                  activePillar === 1 ? "text-white/90" : "text-gray-400"
                }`}
              >
                Historial completo y verificable de todos los tipsters y sus
                resultados.
              </p>

              {activePillar === 1 && (
                <div className="mt-4 lg:mt-6 space-y-2 lg:space-y-3 animate-in slide-in-from-top-2 duration-300">
                  <div className="flex items-center gap-2 lg:gap-3 text-white/90 text-xs lg:text-sm">
                    <Star className="h-3 w-3 lg:h-4 lg:w-4" />
                    <span>Historial público de resultados</span>
                  </div>
                  <div className="flex items-center gap-2 lg:gap-3 text-white/90 text-xs lg:text-sm">
                    <CheckCircle className="h-3 w-3 lg:h-4 lg:w-4" />
                    <span>Verificación de identidad obligatoria</span>
                  </div>
                  <div className="flex items-center gap-2 lg:gap-3 text-white/90 text-xs lg:text-sm">
                    <Users className="h-3 w-3 lg:h-4 lg:w-4" />
                    <span>Sistema de reseñas y valoraciones</span>
                  </div>
                  <Button
                    size="sm"
                    className="mt-3 lg:mt-4 bg-white text-[#1e9df1] hover:bg-gray-100 font-medium text-xs lg:text-sm"
                  >
                    Saber más →
                  </Button>
                </div>
              )}
            </div>

            {/* Pilar 3 - Herramientas */}
            <div
              style={{
                filter: "drop-shadow(0 8px 32px rgba(31, 38, 135, 0.37))",
              }}
              className={`relative p-4 lg:p-8 rounded-xl lg:rounded-2xl border transition-all duration-300 cursor-pointer ${
                activePillar === 2
                  ? "bg-[#1e9df1] border-[#1e9df1] lg:scale-110"
                  : " border-gray-400 hover:border-gray-500 bg-white dark:bg-neutral-900"
              }`}
              onClick={() => setActivePillar(activePillar === 2 ? null : 2)}
            >
              <div className="text-3xl lg:text-6xl font-bold text-gray-600 mb-2 lg:mb-4">
                03.
              </div>
              <h3
                className={`text-lg lg:text-xl font-bold mb-2 lg:mb-3 ${
                  activePillar === 2 ? "text-white" : "text-gray-400"
                }`}
              >
                Mejores Herramientas
              </h3>
              <p
                className={`text-xs lg:text-sm mb-3 lg:mb-4 ${
                  activePillar === 2 ? "text-white/90" : "text-gray-400"
                }`}
              >
                Tecnología avanzada para maximizar tus posibilidades de éxito.
              </p>

              {activePillar === 2 && (
                <div className="mt-4 lg:mt-6 space-y-2 lg:space-y-3 animate-in slide-in-from-top-2 duration-300">
                  <div className="flex items-center gap-2 lg:gap-3 text-white/90 text-xs lg:text-sm">
                    <Target className="h-3 w-3 lg:h-4 lg:w-4" />
                    <span>Análisis estadístico avanzado</span>
                  </div>
                  <div className="flex items-center gap-2 lg:gap-3 text-white/90 text-xs lg:text-sm">
                    <Clock className="h-3 w-3 lg:h-4 lg:w-4" />
                    <span>Alertas en tiempo real</span>
                  </div>
                  <div className="flex items-center gap-2 lg:gap-3 text-white/90 text-xs lg:text-sm">
                    <Coins className="h-3 w-3 lg:h-4 lg:w-4" />
                    <span>Gestión inteligente de bankroll</span>
                  </div>
                  <Button
                    size="sm"
                    className="mt-3 lg:mt-4 bg-white text-[#1e9df1] hover:bg-gray-100 font-medium text-xs lg:text-sm"
                  >
                    Saber más →
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Statistics;
