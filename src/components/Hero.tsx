import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Coins, Shield } from "lucide-react";

const Hero = () => {
  return (
    <section className="bg-gradient-to-br from-background to-secondary py-20 lg:py-32">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6">
          Conectamos Tipsters con <span className="text-primary">Apostadores</span>
        </h1>
        <p className="text-xl text-muted-foreground mb-12 max-w-4xl mx-auto leading-relaxed">
          La primera plataforma que permite a los tipsters monetizar sus pronósticos y a los usuarios acceder a las
          mejores predicciones deportivas con total seguridad.
        </p>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <Card className="bg-card border-border shadow-sm">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-primary mb-2">+500</div>
              <div className="text-foreground font-medium">Tipsters Verificados</div>
            </CardContent>
          </Card>
          <Card className="bg-card border-border shadow-sm">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-success mb-2">89%</div>
              <div className="text-foreground font-medium">Tasa de Éxito</div>
            </CardContent>
          </Card>
          <Card className="bg-card border-border shadow-sm">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-accent mb-2">€2.5M</div>
              <div className="text-foreground font-medium">Ganancias Generadas</div>
            </CardContent>
          </Card>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 text-lg">
            Empezar ahora
          </Button>
          <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground px-8 py-3 text-lg bg-transparent">
            Ver demo
          </Button>
        </div>

        {/* Benefits */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-8 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-success" />
            <span>Pagos Seguros</span>
          </div>
          <div className="flex items-center gap-2">
            <Coins className="h-5 w-5 text-accent" />
            <span>Sistema de Monedas</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-primary" />
            <span>Tipsters Verificados</span>
          </div>
        </div>
      </div>
    </div>
  </section>
  )
}

export default Hero