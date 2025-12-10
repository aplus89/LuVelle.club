"use client"

import { useEffect, useRef } from "react"
import { GlassCard } from "@/components/ui/glass-card"
import { Search, Sliders, Gift } from "lucide-react"

const steps = [
  {
    icon: Search,
    title: "Descubrí qué necesitás",
    description: "LuVelle Ai te ayuda a encontrar los productos y servicios perfectos para vos.",
    color: "ai-accent",
  },
  {
    icon: Sliders,
    title: "Personalizá tu experiencia",
    description: "Elegí tu Beauty Box o encontrá la proveedora ideal para tus servicios de belleza.",
    color: "box-gold",
  },
  {
    icon: Gift,
    title: "Recibí productos y beneficios",
    description: "Disfrutá de productos premium, reservas fáciles y descuentos exclusivos.",
    color: "pro-accent",
  },
]

export function HowItWorks() {
  const cardsRef = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in-up")
            entry.target.style.animationDelay = `${index * 0.2}s`
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
    <section id="como-funciona" className="py-16 md:py-24 px-4">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="font-heading text-4xl md:text-5xl text-brand-gold mb-4">Cómo funciona LuVelle</h2>
          <p className="text-xl text-brand-cream/70 max-w-2xl mx-auto">
            Tres simples pasos para transformar tu bienestar
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto relative">
          {/* Connection Lines (desktop only) */}
          <div className="hidden md:block absolute top-24 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-brand-gold/30 to-transparent" />

          {steps.map((step, index) => {
            const Icon = step.icon
            return (
              <div
                key={index}
                ref={(el) => {
                  cardsRef.current[index] = el
                }}
                className="opacity-0"
              >
                <GlassCard className="p-8 text-center relative z-10 h-full">
                  <div className="flex justify-center mb-6">
                    <div className="w-20 h-20 rounded-2xl bg-brand-gold/10 flex items-center justify-center border border-brand-gold/20">
                      <Icon className="w-10 h-10 text-brand-gold" />
                    </div>
                  </div>
                  <div className="mb-2 text-5xl font-heading text-brand-gold/30">{index + 1}</div>
                  <h3 className="text-xl font-bold text-brand-cream mb-3">{step.title}</h3>
                  <p className="text-brand-cream/70 leading-relaxed">{step.description}</p>
                </GlassCard>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
