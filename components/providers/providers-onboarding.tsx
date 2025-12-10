"use client"

import { useEffect, useRef } from "react"
import { GlassCard } from "@/components/ui/glass-card"

const steps = [
  {
    number: 1,
    title: "Postulación",
    description: "Completá el formulario con tu información y experiencia profesional.",
  },
  {
    number: 2,
    title: "Evaluación",
    description: "Revisamos tu aplicación y validamos tus credenciales en 24-48 horas.",
  },
  {
    number: 3,
    title: "Activación",
    description: "Configuramos tu perfil, agenda y sistema de reservas. ¡Listo para empezar!",
  },
]

export function ProvidersOnboarding() {
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
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="font-heading text-4xl md:text-5xl text-brand-gold mb-4">Proceso de onboarding</h2>
          <p className="text-lg text-brand-cream/70">Tres simples pasos para comenzar</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div
              key={index}
              ref={(el) => {
                cardsRef.current[index] = el
              }}
              className="opacity-0"
            >
              <GlassCard className="p-8 text-center h-full">
                <div className="w-16 h-16 rounded-full bg-pro-accent/20 flex items-center justify-center mx-auto mb-4 border-2 border-pro-accent/30">
                  <span className="text-3xl font-bold text-pro-accent">{step.number}</span>
                </div>
                <h3 className="text-xl font-bold text-brand-cream mb-3">{step.title}</h3>
                <p className="text-brand-cream/70 leading-relaxed">{step.description}</p>
              </GlassCard>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
