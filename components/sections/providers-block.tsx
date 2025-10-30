import { GlassCard } from "@/components/ui/glass-card"
import { Button } from "@/components/ui/button"
import { TrendingUp, Users, Calendar, DollarSign } from "lucide-react"
import Link from "next/link"

const benefits = [
  {
    icon: Users,
    title: "Clientas garantizadas",
    description: "Acceso a nuestra comunidad de 500+ socias activas",
  },
  {
    icon: Calendar,
    title: "Gestión simplificada",
    description: "Sistema de reservas y pagos automatizado",
  },
  {
    icon: TrendingUp,
    title: "Crecimiento constante",
    description: "Marketing y promoción de tus servicios incluidos",
  },
  {
    icon: DollarSign,
    title: "Ingresos predecibles",
    description: "Flujo constante de reservas cada mes",
  },
]

export function ProvidersBlock() {
  return (
    <section
      id="proveedoras"
      className="py-20 bg-gradient-to-b from-transparent via-[hsl(var(--brand-blue))]/30 to-transparent"
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="heading-font text-4xl md:text-5xl font-bold mb-4">Para Proveedoras</h2>
          <p className="text-xl text-[hsl(var(--brand-cream))]/80 max-w-2xl mx-auto">
            Hacé crecer tu negocio de belleza con LuVelle
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon
            return (
              <GlassCard key={index} className="p-6">
                <Icon className="w-10 h-10 text-[hsl(var(--brand-gold))] mb-4" />
                <h3 className="text-lg font-bold text-[hsl(var(--brand-cream))] mb-2">{benefit.title}</h3>
                <p className="text-sm text-[hsl(var(--brand-cream))]/70 leading-relaxed">{benefit.description}</p>
              </GlassCard>
            )
          })}
        </div>

        <div className="text-center space-y-4">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="glass-button">
              <Link href="/providers">Aplicar como Proveedora</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="glass-button-outline bg-transparent">
              <a href="https://calendly.com/luvelle" target="_blank" rel="noopener noreferrer">
                Agendar llamada
              </a>
            </Button>
          </div>
          <p className="text-sm text-[hsl(var(--brand-cream))]/60">
            Descargá nuestra{" "}
            <a href="#" className="text-[hsl(var(--brand-gold))] hover:underline">
              Guía de Onboarding
            </a>
          </p>
        </div>
      </div>
    </section>
  )
}
