"use client"

import { useEffect, useRef } from "react"
import { GlassCard } from "@/components/ui/glass-card"
import { MessageCircle, ShoppingBag, Sparkles, Calendar } from "lucide-react"

const features = [
  {
    icon: MessageCircle,
    title: "Consultas ilimitadas",
    description: "Preguntale a LuVelle Ai lo que necesites, cuando lo necesites. Disponible 24/7 en WhatsApp.",
  },
  {
    icon: ShoppingBag,
    title: "Descubrí productos",
    description: "Recibí recomendaciones personalizadas de productos según tu tipo de piel y necesidades.",
  },
  {
    icon: Calendar,
    title: "Encontrá servicios",
    description: "Descubrí proveedoras de belleza y bienestar cerca tuyo y reservá con un mensaje.",
  },
  {
    icon: Sparkles,
    title: "Rutinas personalizadas",
    description: "Obtené rutinas de skincare y tips de belleza adaptados específicamente para vos.",
  },
]

export function AiFeatures() {
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
          <h2 className="font-heading text-4xl md:text-5xl text-brand-gold mb-4">Qué podés hacer con LuVelle Ai</h2>
          <p className="text-lg text-brand-cream/70 max-w-2xl mx-auto">
            Tu asistente personal de belleza y bienestar, siempre disponible
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
                <GlassCard className="p-6 h-full border-l-2 border-ai-accent/50">
                  <div className="w-12 h-12 rounded-lg bg-ai-accent/10 flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-ai-accent" />
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
