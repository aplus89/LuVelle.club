"use client"

import { useEffect, useRef } from "react"
import { GlassCard } from "@/components/ui/glass-card"

const steps = [
  {
    number: 1,
    title: "Postulación",
    description: "Enviá tu información, catálogo de productos y visión de marca.",
  },
  {
    number: 2,
    title: "Evaluación",
    description: "Revisamos tu marca, calidad de productos y alineación con LuVelle.",
  },
  {
    number: 3,
    title: "Negociación",
    description: "Definimos términos comerciales, volúmenes y condiciones de distribución.",
  },
  {
    number: 4,
    title: "Lanzamiento",
    description: "Activamos tu marca en LuVelle y comenzamos la distribución inmediata.",
  },
]

export function PartnersProcess() {
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
    <section className="py-16 md:py-24 px-4 bg-white/[0.02]">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="font-heading text-4xl md:text-5xl text-brand-gold mb-4">Proceso de alianza</h2>
          <p className="text-lg text-brand-cream/70">Cuatro pasos para comenzar a distribuir con LuVelle</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <div
              key={index}
              ref={(el) => {
                cardsRef.current[index] = el
              }}
              className="opacity-0"
            >
              <GlassCard className="p-6 text-center h-full">
                <div className="w-16 h-16 rounded-full bg-brand-gold/20 flex items-center justify-center mx-auto mb-4 border-2 border-brand-gold/30">
                  <span className="text-3xl font-bold text-brand-gold">{step.number}</span>
                </div>
                <h3 className="text-xl font-bold text-brand-cream mb-3">{step.title}</h3>
                <p className="text-brand-cream/70 text-sm leading-relaxed">{step.description}</p>
              </GlassCard>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
