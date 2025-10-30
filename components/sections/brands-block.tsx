import { GlassCard } from "@/components/ui/glass-card"
import { Button } from "@/components/ui/button"
import { Target, BarChart, MessageSquare, Zap } from "lucide-react"
import Link from "next/link"

const benefits = [
  {
    icon: Target,
    title: "Audiencia calificada",
    description: "Llegá a mujeres apasionadas por la belleza",
  },
  {
    icon: BarChart,
    title: "Distribución garantizada",
    description: "Exposición mensual a cientos de clientas",
  },
  {
    icon: MessageSquare,
    title: "Feedback directo",
    description: "Conocé la opinión real de tus usuarias",
  },
  {
    icon: Zap,
    title: "Lanzamientos rápidos",
    description: "Probá nuevos productos con nuestra comunidad",
  },
]

export function BrandsBlock() {
  return (
    <section id="marcas" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="heading-font text-4xl md:text-5xl font-bold mb-4">Para Marcas & Distribuidores</h2>
          <p className="text-xl text-[hsl(var(--brand-cream))]/80 max-w-2xl mx-auto">
            Conectá tu marca con una comunidad premium
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

        {/* Brand Logos Carousel Placeholder */}
        <div className="mb-12">
          <GlassCard className="p-8">
            <div className="flex flex-wrap items-center justify-center gap-8">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="w-24 h-24 rounded-lg bg-white/5 flex items-center justify-center">
                  <span className="text-[hsl(var(--brand-cream))]/40 text-xs">Marca {i}</span>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>

        <div className="text-center">
          <Button asChild size="lg" className="glass-button">
            <Link href="/partners">Postular mi marca</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
