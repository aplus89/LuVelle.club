"use client"

import { useEffect, useRef } from "react"
import { GlassCard } from "@/components/ui/glass-card"
import { Users, Calendar, TrendingUp, DollarSign } from "lucide-react"

const benefits = [
  {
    icon: Users,
    title: "Clientas garantizadas",
    description: "Acceso directo a nuestra comunidad de socias activas buscando tus servicios.",
  },
  {
    icon: Calendar,
    title: "Gestión simplificada",
    description: "Sistema automatizado de reservas, recordatorios y pagos integrados.",
  },
  {
    icon: DollarSign,
    title: "Ingresos predecibles",
    description: "Flujo constante de reservas mensuales con pago garantizado.",
  },
  {
    icon: TrendingUp,
    title: "Comunidad",
    description: "Red de apoyo con otras profesionales y crecimiento conjunto.",
  },
]

export function ProvidersBenefits() {
  const cardsRef = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in-up")
            entry.target.style.animationDelay = `${index * 0.15}s`
            entry.target.style.animationFillMode = "forwards"
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
    <section className="relative py-16 md:py-24 px-4 overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/images/42136967-f534-46ac-b5c3.jpeg')",
        }}
      />
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-[#141322]/95" />

      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="text-center mb-16">
          <h2 className="font-heading text-4xl md:text-5xl text-[#f4cc6e] mb-4">Beneficios para vos</h2>
          <p className="text-lg text-[#e8ded3]/70 max-w-2xl mx-auto">
            Todo lo que necesitás para hacer crecer tu negocio
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
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
                <GlassCard className="p-6 h-full border-l-2 border-[#1A5276]/50">
                  <div className="w-12 h-12 rounded-lg bg-[#1A5276]/20 flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-[#1A5276]" />
                  </div>
                  <h3 className="text-xl font-bold text-[#e8ded3] mb-2">{benefit.title}</h3>
                  <p className="text-[#e8ded3]/70 text-sm leading-relaxed">{benefit.description}</p>
                </GlassCard>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
