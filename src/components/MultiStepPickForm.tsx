import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { tipsterPicks } from "@/mock/tipster";
import { ChevronDown, ChevronUp, ImagePlus, Mic } from "lucide-react";
import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";

const MERCADOS_PRINCIPALES = ["1X2", "Over/Under", "Doble Oportunidad"];
const MERCADOS_AVANZADOS = ["Corners", "Tarjetas", "Hándicaps", "BTTS"];
const MERCADOS_ESPECIALES = [
  "Goles en primeros 10'",
  "Primer jugador en marcar",
];
const PLANES = [
  { label: "Normal", value: "normal" },
  { label: "Gold", value: "gold" },
  { label: "Platinum", value: "platinum" },
];

const initialState = {
  partido: null as number | null,
  mercado: null as string | null,
  tipoMercado: null as "principal" | "avanzado" | "especial" | null,
  analisis: "",
  audio: null as File | null,
  imagen: null as File | null,
  plan: null as string | null,
  gratuito: false,
};

export default function MultiStepPickForm({
  onCancel,
  onSuccess,
}: {
  onCancel?: () => void;
  onSuccess?: () => void;
}) {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState(initialState);
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [search, setSearch] = useState("");
  // Estado para dropdowns
  const [openDropdown, setOpenDropdown] = useState<
    "principal" | "avanzado" | "especial" | null
  >("principal");

  // Paso 1: Selección del encuentro
  const partidosFiltrados = tipsterPicks.filter((p) =>
    p.event.toLowerCase().includes(search.toLowerCase())
  );

  const handleSelectPartido = (partidoId: number) => {
    setForm({ ...form, partido: partidoId });
  };

  // Paso 2: lógica de selección única
  const handleCheckbox = (tipo: string, valor: string) => {
    setForm({
      ...form,
      mercado: valor,
      tipoMercado: tipo as "principal" | "avanzado" | "especial",
    });
    // Ya no cerramos el dropdown automáticamente
  };

  // Paso 3: Análisis y monetización
  const handleFile = (
    e: React.ChangeEvent<HTMLInputElement>,
    tipo: "audio" | "imagen"
  ) => {
    const file = e.target.files?.[0] || null;
    if (tipo === "audio") setAudioFile(file);
    if (tipo === "imagen") setImageFile(file);
  };

  // Validaciones
  const paso1Valido = !!form.partido;
  const paso2Valido = !!form.mercado;
  const paso3Valido =
    // Al menos uno de estos debe existir
    (form.analisis.length > 0 || audioFile || imageFile) &&
    // Y uno solo entre `plan` o `gratuito`
    ((form.plan && !form.gratuito) || (!form.plan && form.gratuito));

  // Navegación
  const siguiente = () => {
    setStep((s) => Math.min(s + 1, 4));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const atras = () => {
    setStep((s) => Math.max(s - 1, 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Resumen
  const partido = tipsterPicks.find((p) => p.id === form.partido);

  // Confirmar
  const confirmar = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSuccess) onSuccess();
  };

  return (
    <form
      style={{
        filter: "drop-shadow(0 8px 32px rgba(31, 38, 135, 0.37))",
      }}
      className="max-w-2xl mx-auto border-gray-400 hover:border-gray-500 bg-white dark:bg-neutral-900 rounded-xl p-6 shadow-md"
      onSubmit={confirmar}
    >
      {/* Paso 1 */}
      {step === 1 && (
        <div>
          <h3 className="text-2xl font-bold text-foreground mb-4">
            1. Selección del encuentro
          </h3>
          <input
            type="text"
            placeholder="Buscar partido..."
            className="w-full mb-4 p-2 border rounded-md border-primary"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <div className="grid gap-3 mb-4">
            {partidosFiltrados.map((p) => (
              <Card
                key={p.id}
                style={{
                  filter:
                    form.partido === p.id
                      ? "drop-shadow(0 4px 8px rgba(30, 157, 241, 0.5))"
                      : "none",
                  transition: "filter 0.3s ease-in-out",
                }}
                className={`cursor-pointer border-2 border-gray-400 hover:border-gray-500 bg-white  dark:bg-neutral-900 ${
                  form.partido === p.id
                    ? "border-primary bg-stone-100 dark:bg-[#252525] hover:border-primary"
                    : "border-border"
                }`}
                onClick={() => handleSelectPartido(p.id)}
              >
                <CardContent className="flex flex-col md:flex-row md:items-center gap-2 p-4">
                  <div className="flex-1">
                    <div className="font-semibold text-foreground">
                      {p.event}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {p.sport}
                    </div>
                  </div>
                  <div className="flex flex-col md:flex-row gap-2 items-end md:items-center">
                    <Badge className="bg-primary/10 text-primary">
                      {p.date}
                    </Badge>
                    <Badge className="bg-success/10 text-success">
                      {p.odds} cuota
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="flex justify-center gap-4 mt-6">
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              className="text-foreground"
            >
              Atrás
            </Button>
            <Button
              type="button"
              className="bg-primary text-primary-foreground"
              onClick={siguiente}
              disabled={!paso1Valido}
            >
              Siguiente
            </Button>
          </div>
        </div>
      )}
      {/* Paso 2 */}
      {step === 2 && (
        <div>
          <h3 className="text-2xl font-bold text-foreground mb-4">
            2. Selección del tipo de apuesta
          </h3>
          <div className="grid grid-cols-1 gap-4 mb-6">
            {/* Mercado Principal */}
            <div className="border rounded-lg">
              <button
                type="button"
                className="w-full flex items-center justify-between px-4 py-3 text-left text-foreground font-semibold focus:outline-none"
                onClick={() =>
                  setOpenDropdown(
                    openDropdown === "principal" ? null : "principal"
                  )
                }
                disabled={!!form.mercado && form.tipoMercado !== "principal"}
              >
                Mercado principal
                {openDropdown === "principal" ? (
                  <ChevronUp className="w-5 h-5" />
                ) : (
                  <ChevronDown className="w-5 h-5" />
                )}
              </button>
              {openDropdown === "principal" && (
                <div className="px-4 pb-3 pt-1 space-y-2">
                  {MERCADOS_PRINCIPALES.map((m) => (
                    <button
                      key={m}
                      type="button"
                      className={`w-full text-left px-3 py-2 rounded-md font-medium transition-colors ${
                        form.mercado === m && form.tipoMercado === "principal"
                          ? "bg-primary text-primary-foreground"
                          : "bg-secondary text-foreground hover:bg-accent"
                      }`}
                      onClick={() => {
                        handleCheckbox("principal", m);
                      }}
                    >
                      {m}
                    </button>
                  ))}
                </div>
              )}
            </div>
            {/* Mercado Avanzado */}
            <div className="border rounded-lg">
              <button
                type="button"
                className="w-full flex items-center justify-between px-4 py-3 text-left text-foreground font-semibold focus:outline-none"
                onClick={() =>
                  setOpenDropdown(
                    openDropdown === "avanzado" ? null : "avanzado"
                  )
                }
                disabled={!!form.mercado && form.tipoMercado !== "avanzado"}
              >
                Mercado avanzado
                {openDropdown === "avanzado" ? (
                  <ChevronUp className="w-5 h-5" />
                ) : (
                  <ChevronDown className="w-5 h-5" />
                )}
              </button>
              {openDropdown === "avanzado" && (
                <div className="px-4 pb-3 pt-1 space-y-2">
                  {MERCADOS_AVANZADOS.map((m) => (
                    <button
                      key={m}
                      type="button"
                      className={`w-full text-left px-3 py-2 rounded-md font-medium transition-colors ${
                        form.mercado === m && form.tipoMercado === "avanzado"
                          ? "bg-[#1e9df1] text-white"
                          : "bg-[#E3ECF6] text-[#0f1419] hover:bg-[#d0eafd]"
                      }`}
                      onClick={() => {
                        handleCheckbox("avanzado", m);
                      }}
                    >
                      {m}
                    </button>
                  ))}
                </div>
              )}
            </div>
            {/* Especiales */}
            <div className="border rounded-lg">
              <button
                type="button"
                className="w-full flex items-center justify-between px-4 py-3 text-left text-foreground font-semibold focus:outline-none"
                onClick={() =>
                  setOpenDropdown(
                    openDropdown === "especial" ? null : "especial"
                  )
                }
                disabled={!!form.mercado && form.tipoMercado !== "especial"}
              >
                Especiales
                {openDropdown === "especial" ? (
                  <ChevronUp className="w-5 h-5" />
                ) : (
                  <ChevronDown className="w-5 h-5" />
                )}
              </button>
              {openDropdown === "especial" && (
                <div className="px-4 pb-3 pt-1 space-y-2">
                  {MERCADOS_ESPECIALES.map((m) => (
                    <button
                      key={m}
                      type="button"
                      className={`w-full text-left px-3 py-2 rounded-md font-medium transition-colors ${
                        form.mercado === m && form.tipoMercado === "especial"
                          ? "bg-[#1e9df1] text-white"
                          : "bg-[#E3ECF6] text-[#0f1419] hover:bg-[#d0eafd]"
                      }`}
                      onClick={() => {
                        handleCheckbox("especial", m);
                      }}
                    >
                      {m}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
          <div className="flex justify-center gap-4 mt-6">
            <Button
              type="button"
              variant="outline"
              onClick={atras}
              className="text-foreground"
            >
              Atrás
            </Button>
            <Button
              type="button"
              className="bg-primary text-primary-foreground"
              onClick={siguiente}
              disabled={!paso2Valido}
            >
              Siguiente
            </Button>
          </div>
        </div>
      )}
      {/* Paso 3 */}
      {step === 3 && (
        <div>
          <h3 className="text-2xl font-bold text-foreground mb-6">
            3. Análisis personalizado y monetización
          </h3>

          {/* Análisis */}
          <div className="mb-6">
            <label className="block font-medium text-foreground mb-2">
              Análisis del partido
            </label>
            <textarea
              className="w-full p-3 border rounded-md bg-background text-foreground border-primary focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Escribe tu análisis del partido..."
              rows={4}
              value={form.analisis}
              onChange={(e) => setForm({ ...form, analisis: e.target.value })}
            />
          </div>

          {/* Subida de archivos */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <Button
              asChild
              variant="secondary"
              className="w-full flex items-center justify-center gap-2"
            >
              <label className="cursor-pointer">
                <Mic className="w-5 h-5" />
                Subir audio
                <input
                  type="file"
                  accept="audio/*"
                  onChange={(e) => handleFile(e, "audio")}
                  className="hidden"
                />
              </label>
            </Button>

            <Button
              asChild
              variant="secondary"
              className="w-full flex items-center justify-center gap-2"
            >
              <label className="cursor-pointer">
                <ImagePlus className="w-5 h-5" />
                Subir imagen
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFile(e, "imagen")}
                  className="hidden"
                />
              </label>
            </Button>
          </div>

          {/* Planes */}
          <div className="mb-6 space-y-4">
            <div className="font-medium text-foreground">
              Selecciona el tipo de pick
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {PLANES.map((plan) => (
                <div key={plan.value} className="flex items-center space-x-2">
                  <Checkbox
                    id={`plan-${plan.value}`}
                    checked={form.plan === plan.value}
                    disabled={form.gratuito}
                    onCheckedChange={(checked) =>
                      setForm({
                        ...form,
                        plan: checked ? plan.value : null,
                        gratuito: false,
                      })
                    }
                  />
                  <Label
                    htmlFor={`plan-${plan.value}`}
                    className="text-foreground font-medium"
                  >
                    Plan {plan.label}
                  </Label>
                </div>
              ))}

              {/* Pick gratuito */}
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="pick-gratuito"
                  checked={form.gratuito}
                  onCheckedChange={(checked: boolean) =>
                    setForm({
                      ...form,
                      gratuito: checked,
                      plan: null,
                    })
                  }
                />
                <Label
                  htmlFor="pick-gratuito"
                  className="text-success font-medium"
                >
                  Pick Gratuito
                </Label>
              </div>
            </div>
          </div>

          {/* Navegación */}
          <div className="flex justify-center gap-4 mt-6">
            <Button
              type="button"
              variant="outline"
              onClick={atras}
              className="text-foreground"
            >
              Atrás
            </Button>
            <Button
              type="button"
              className="bg-primary text-primary-foreground"
              onClick={siguiente}
              disabled={!paso3Valido}
            >
              Siguiente
            </Button>
          </div>
        </div>
      )}

      {/* Paso 4 */}
      {step === 4 && (
        <div>
          <h3 className="text-2xl font-bold text-foreground mb-4">
            4. Resumen del pick
          </h3>
          <Card className="mb-6">
            <CardContent className="p-4">
              <div className="mb-2">
                <span className="font-semibold text-foreground">Partido:</span>{" "}
                {partido?.event}
              </div>
              <div className="mb-2">
                <span className="font-semibold text-foreground">Fecha:</span>{" "}
                {partido?.date}
              </div>
              <div className="mb-2">
                <span className="font-semibold text-foreground">
                  Apuesta seleccionada:
                </span>{" "}
                {form.mercado}
              </div>
              {form.analisis && (
                <div className="mb-2">
                  <span className="font-semibold text-foreground">
                    Análisis:
                  </span>{" "}
                  {form.analisis}
                </div>
              )}
              <div className="mb-2">
                <span className="font-semibold text-foreground">Plan:</span>{" "}
                {form.gratuito
                  ? "Gratuito"
                  : PLANES.find((p) => p.value === form.plan)?.label || "-"}
              </div>
              {audioFile && (
                <div className="mb-2 text-primary">
                  Audio subido: {audioFile.name}
                </div>
              )}
              {imageFile && (
                <div className="mb-2 text-primary">
                  Imagen subida: {imageFile.name}
                </div>
              )}
            </CardContent>
          </Card>
          <div className="flex justify-center gap-4 mt-6">
            <Button
              type="button"
              variant="outline"
              onClick={atras}
              className="text-foreground"
            >
              Atrás
            </Button>
            <Button type="submit" className="bg-success text-white">
              Confirmar y Crear Pick
            </Button>
          </div>
        </div>
      )}
    </form>
  );
}
