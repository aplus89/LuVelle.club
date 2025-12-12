"use client"

import { useEffect, useRef } from "react"
import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { GlassCard } from "@/components/ui/glass-card"
import Link from "next/link"

const plans = [
  {
    name: "Esencial",
    price: "$59.99",
    period: "/mes",
    description: "Perfecto para empezar",
    features: [
      "3 productos curados",
      "Personalización básica",
      "Envío incluido",
      "Acceso a programa de referidos",
      "Descuentos en productos adicionales",
    ],
    popular: false,
  },
  {
    name: "Premium",
    price: "$79.99",
    period: "/mes",
    description: "La experiencia completa",
    features: [
      "5 productos premium",
      "Mayor personalización",
      "Envío prioritario",
      "Acceso anticipado a nuevos productos",
      "3% cashback en programa de referidos",
      "Sorpresas exclusivas",
    ],
    popular: true,
  },
  {
    name: "Deluxe",
    price: "$99.99+",
    period: "/mes",
    description: "Lujo y exclusividad",
    features: [
      "7+ productos de lujo",
      "Personalización completa",
      "Envío express",
      "Productos exclusivos y ediciones limitadas",
      "8% cashback en referidos",
      "Atención VIP",
      "Acceso a servicios premium",
    ],
    popular: false,
  },
]

export function BeautyBoxPlans() {
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
          <h2 className="font-heading text-4xl md:text-5xl text-brand-gold mb-4">Planes The Beauty Box</h2>
          <p className="text-lg text-brand-cream/70 max-w-2xl mx-auto mb-4">
            Elegí el nivel de personalización que mejor se adapte a vos
          </p>
          <p className="text-sm text-brand-cream/50 italic">Precios de lanzamiento. Sujetos a cambios.</p>
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
                className={`p-8 h-full flex flex-col ${plan.popular ? "ring-2 ring-brand-gold scale-105" : ""}`}
              >
                {plan.popular && (
                  <div className="bg-brand-gold text-brand-dark text-xs font-bold uppercase px-3 py-1 rounded-full w-fit mb-4">
                    Más elegido
                  </div>
                )}

                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-brand-cream mb-2">{plan.name}</h3>
                  <p className="text-sm text-brand-cream/60 mb-4">{plan.description}</p>
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-bold text-brand-gold">{plan.price}</span>
                    <span className="text-brand-cream/60">{plan.period}</span>
                  </div>
                </div>

                <ul className="space-y-3 mb-8 flex-grow">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-sm text-brand-cream/80">
                      <Check className="w-5 h-5 text-box-gold flex-shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  asChild
                  className={`w-full font-semibold ${
                    plan.popular
                      ? "bg-[#f4cc6e] hover:bg-[#f4cc6e]/90 text-[#141321]"
                      : "bg-[#141321] hover:bg-[#141321]/90 text-[#f4cc6e] border-2 border-[#f4cc6e]"
                  }`}
                >
                  <Link href="/join">Crear mi {plan.name}</Link>
                </Button>
              </GlassCard>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
