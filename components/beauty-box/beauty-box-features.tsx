"use client"

import { useEffect, useRef } from "react"
import { GlassCard } from "@/components/ui/glass-card"
import { Sparkles, Truck, Gift, Heart } from "lucide-react"

const features = [
  {
    icon: Sparkles,
    title: "100% Personalizable",
    description: "Elegí las categorías que te interesan y curamos productos perfectos para vos cada mes.",
  },
  {
    icon: Gift,
    title: "Productos Premium",
    description: "Marcas de alta calidad, tanto locales como internacionales, con descuentos exclusivos.",
  },
  {
    icon: Truck,
    title: "Entrega Mensual",
    description: "Recibí tu caja cada mes en la comodidad de tu casa, sin preocupaciones.",
  },
  {
    icon: Heart,
    title: "Programa de Referidos",
    description: "Compartí LuVelle con tus amigas y ganádesemás productos y descuentos.",
  },
]

export function BeautyBoxFeatures() {
  const cardsRef = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in-up")
            entry.target.style.animationDelay = `${index * 0.15}s`
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
          <h2 className="font-heading text-4xl md:text-5xl text-brand-gold mb-4">Por qué The Beauty Box</h2>
          <p className="text-lg text-brand-cream/70 max-w-2xl mx-auto">
            Una experiencia de belleza diseñada especialmente para vos
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <div
                key={index}
                ref={(el) => {
                  cardsRef.current[index] = el
                }}
                className="opacity-0"
              >
                <GlassCard className="p-6 h-full border-l-2 border-box-gold/50">
                  <div className="w-12 h-12 rounded-lg bg-box-gold/10 flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-box-gold" />
                  </div>
                  <h3 className="text-xl font-bold text-brand-cream mb-2">{feature.title}</h3>
                  <p className="text-brand-cream/70 text-sm leading-relaxed">{feature.description}</p>
                </GlassCard>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
