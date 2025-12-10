"use client"

import { useEffect, useRef } from "react"
import { GlassCard } from "@/components/ui/glass-card"
import { Target, BarChart, MessageSquare, Zap, Globe, TrendingUp } from "lucide-react"

const benefits = [
  {
    icon: Target,
    title: "Audiencia calificada",
    description: "Llegá a mujeres apasionadas por la belleza premium y productos de calidad.",
  },
  {
    icon: BarChart,
    title: "Distribución garantizada",
    description: "Exposición mensual a cientos de clientas potenciales en nuestras Beauty Boxes.",
  },
  {
    icon: MessageSquare,
    title: "Feedback directo",
    description: "Conocé la opinión real de tus usuarias y mejorá tus productos.",
  },
  {
    icon: Zap,
    title: "Lanzamientos rápidos",
    description: "Probá nuevos productos y obtené validación con nuestra comunidad activa.",
  },
  {
    icon: Globe,
    title: "Alcance en LATAM",
    description: "Presencia garantizada en Costa Rica con expansión a toda Latinoamérica.",
  },
  {
    icon: TrendingUp,
    title: "Crecimiento medible",
    description: "Métricas detalladas y reportes de desempeño de tus productos.",
  },
]

export function PartnersBenefits() {
  const cardsRef = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in-up")
            entry.target.style.animationDelay = `${index * 0.1}s`
          }
        })
      },
      { threshold: 0.1 },
    )

    cardsRef.current.forEach((card) => {
      if (card) observer.observe(card)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <section className="py-16 md:py-24 px-4">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="font-heading text-4xl md:text-5xl text-brand-gold mb-4">Por qué aliarte con LuVelle</h2>
          <p className="text-lg text-brand-cream/70 max-w-2xl mx-auto">
            Beneficios diseñados para hacer crecer tu marca
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon
            return (
              <div
                key={index}
                ref={(el) => {
                  cardsRef.current[index] = el
                }}
                className="opacity-0"
              >
                <GlassCard className="p-6 h-full border-l-2 border-brand-gold/50">
                  <div className="w-12 h-12 rounded-lg bg-brand-gold/10 flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-brand-gold" />
                  </div>
                  <h3 className="text-xl font-bold text-brand-cream mb-2">{benefit.title}</h3>
                  <p className="text-brand-cream/70 text-sm leading-relaxed">{benefit.description}</p>
                </GlassCard>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
