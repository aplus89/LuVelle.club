"use client"

import { useEffect, useRef } from "react"
import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { GlassCard } from "@/components/ui/glass-card"

const whatsappUrl = "https://wa.me/15557792120?text=Hola!%20Quiero%20unirme%20al%20Club%20LuVelle"

const plans = [
  {
    name: "Free",
    price: "₡0",
    period: "",
    description: "Probá LuVelle Ai sin compromiso",
    features: ["Acceso a IA básica", "Recomendaciones limitadas por mes", "Sin cashback", "Soporte por comunidad"],
    cta: "Comenzar gratis",
    popular: false,
  },
  {
    name: "Club LuVelle",
    price: "$3.99",
    period: "/mes",
    description: "Para quienes quieren más de LuVelle",
    features: [
      "Recomendaciones ilimitadas",
      "Cashback en compras seleccionadas",
      "Acceso a contenido exclusivo",
      "Podcast y newsletter",
      "Descuentos en Beauty Box",
    ],
    cta: "Unirme al Club",
    popular: true,
  },
  {
    name: "LuVelle Plus",
    price: "$6.99",
    period: "/mes",
    description: "La experiencia completa de LuVelle",
    features: [
      "Todo lo de Club LuVelle",
      "Mayor % de cashback",
      "Prioridad en respuestas de IA",
      "Acceso temprano a promos",
      "Beauty Box especiales prioritarios",
      "Eventos exclusivos",
    ],
    cta: "Quiero Plus",
    popular: false,
  },
]

export function AiPricing() {
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
    <section id="planes" className="py-16 md:py-24 px-4 bg-white/[0.02]">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="font-heading text-4xl md:text-5xl text-[#f4cc6e] mb-4">Planes Club LuVelle Ai</h2>
          <p className="text-lg text-[#e8ded3]/70 max-w-2xl mx-auto mb-4">
            Elegí el plan que mejor se adapte a tus necesidades
          </p>
          <p className="text-sm text-[#e8ded3]/50 italic">Precios de lanzamiento. Sujeto a iteración según feedback.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={index}
              ref={(el) => {
                cardsRef.current[index] = el
              }}
              className="opacity-0"
            >
              <GlassCard
                className={`p-8 h-full flex flex-col ${plan.popular ? "ring-2 ring-[#f4cc6e] scale-105" : ""}`}
              >
                {plan.popular && (
                  <div className="bg-[#f4cc6e] text-[#141322] text-xs font-bold uppercase px-3 py-1 rounded-full w-fit mb-4">
                    Más popular
                  </div>
                )}

                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-[#e8ded3] mb-2">{plan.name}</h3>
                  <p className="text-sm text-[#e8ded3]/60 mb-4">{plan.description}</p>
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-bold text-[#f4cc6e]">{plan.price}</span>
                    <span className="text-[#e8ded3]/60">{plan.period}</span>
                  </div>
                </div>

                <ul className="space-y-3 mb-8 flex-grow">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-sm text-[#e8ded3]/80">
                      <Check className="w-5 h-5 text-[#1A5276] flex-shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* Enforce button color rules:
                    - Popular (gold bg #f4cc6e): text #141322
                    - Non-popular (blue bg #1A5276): text #f4cc6e */}
                <Button
                  asChild
                  className={`w-full font-semibold ${
                    plan.popular
                      ? "bg-[#f4cc6e] hover:bg-[#f4cc6e]/90 text-[#141322]"
                      : "bg-[#1A5276] hover:bg-[#1A5276]/90 text-[#f4cc6e]"
                  }`}
                >
                  <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                    {plan.cta}
                  </a>
                </Button>
              </GlassCard>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
