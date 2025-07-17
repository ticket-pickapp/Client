import { Button } from "@/components/ui/button";

import Image from "next/image";

const Hero = () => {
  return (
    <section className="bg-background min-h-[70vh] flex items-center justify-center py-16 lg:py-24">
      <div className="max-w-7xl w-full min-h-[70vh] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col-reverse lg:flex-row items-center gap-12">
        {/* Columna de texto */}
        <div className="flex-1 text-center lg:text-left flex flex-col items-center lg:items-start gap-8">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-2">
            Conectamos Tipsters con{" "}
            <span className="text-primary">Apostadores</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-xl leading-relaxed mb-4">
            La primera plataforma que permite a los tipsters monetizar sus
            pronósticos y a los usuarios acceder a las mejores predicciones
            deportivas con total seguridad.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto justify-center lg:justify-start">
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 text-lg shadow-lg"
            >
              Empezar ahora
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-primary text-primary hover:bg-primary hover:text-white px-8 py-3 text-lg bg-transparent"
            >
              Ver demo
            </Button>
          </div>
        </div>
        {/* Columna de imagen */}
        <div className="flex-1 flex items-center justify-center">
          <div className="relative max-w-full flex items-center justify-center">
            <Image
              src="/images/image_cel.png"
              alt="App móvil"
              className="h-auto rounded-3xl object-cover"
              style={{
                filter: "drop-shadow(0 8px 32px rgba(31, 38, 135, 0.37))",
              }}
              width={800}
              height={800}
            />

            {/* Puedes agregar detalles decorativos aquí si lo deseas */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
