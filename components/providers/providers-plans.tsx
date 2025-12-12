"use client"

import { useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Check, Briefcase } from "lucide-react"
import Link from "next/link"

const plans = [
  {
    name: "Prueba Gratis",
    price: "$0",
    period: "/1er mes",
    features: ["Acceso completo Pro Plus", "Todas las funciones IA", "Sin compromiso", "Decidí después del mes"],
    popular: false,
  },
  {
    name: "Pro",
    price: "$9.99",
    period: "/mes",
    features: [
      "Perfil público profesional",
      "Agenda básica",
      "IA básica",
      "Generador de contenido",
      "Soporte básico",
      "Comisión reducida",
    ],
    popular: false,
  },
  {
    name: "Pro Plus",
    price: "$14.99",
    period: "/mes",
    features: [
      "Agenda inteligente con IA",
      "IA avanzada para recomendaciones",
      "Catálogo ilimitado",
      "Panel Pro completo",
      "Soporte VIP prioritario",
      "Prioridad en búsquedas",
      "Comisión mínima",
    ],
    popular: true,
  },
]

export function ProvidersPlans() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in-up")
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
    <section id="planes" className="relative py-16 md:py-24 px-4 overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/images/gemini-generated-image-pa4txapa4txapa4t.png')",
        }}
      />
      {/* Blue overlay matching Pro theme */}
      <div className="absolute inset-0 bg-[#1A5276]/95" />

      <div className="container mx-auto max-w-6xl relative z-10" ref={sectionRef}>
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 rounded-2xl bg-[#f4cc6e]/20 flex items-center justify-center border border-[#f4cc6e]/30">
              <Briefcase className="w-8 h-8 text-[#f4cc6e]" />
            </div>
          </div>
          <h2 className="font-heading text-4xl md:text-5xl text-[#f4cc6e] mb-4">Planes LuVelle Pro</h2>
          <p className="text-lg text-[#efedea]/80 max-w-2xl mx-auto mb-4">
            Elegí el plan que mejor se adapte a tu negocio
          </p>
          <p className="text-sm text-[#f4cc6e] font-semibold">Probá Pro Plus gratis por un mes, luego decidí tu plan</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {plans.map((plan, index) => (
            <div
              key={index}
              ref={(el) => {
                cardsRef.current[index] = el
              }}
              className="opacity-0"
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              <div
                className={`relative h-full p-6 md:p-8 rounded-2xl border backdrop-blur-sm transition-all duration-300 hover:scale-[1.02] ${
                  plan.popular
                    ? "bg-white/15 border-[#f4cc6e]/50 ring-2 ring-[#f4cc6e]/30"
                    : "bg-white/5 border-[#f4cc6e]/20"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-bold bg-[#f4cc6e] text-[#141322]">
                    Popular
                  </div>
                )}

                <div className="mb-6">
                  <h3 className="font-bold text-xl text-[#efedea] mb-2">{plan.name}</h3>
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-bold text-[#f4cc6e]">{plan.price}</span>
                    <span className="text-[#efedea]/60">{plan.period}</span>
                  </div>
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, fidx) => (
                    <li key={fidx} className="text-sm text-[#efedea]/80 flex items-start gap-2">
                      <Check className="w-4 h-4 text-[#f4cc6e] mt-0.5 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <Button
                  asChild
                  className={`w-full font-semibold ${
                    plan.popular
                      ? "bg-[#f4cc6e] hover:bg-[#f4cc6e]/90 text-[#141322]"
                      : "bg-[#141322] hover:bg-[#141322]/80 text-[#f4cc6e] border-2 border-[#f4cc6e]"
                  }`}
                >
                  <Link href="/join?product=pro">
                    {plan.name === "Prueba Gratis" ? "Empezar prueba" : `Elegir ${plan.name}`}
                  </Link>
                </Button>
              </div>
            </div>
          ))}
        </div>

        <p className="text-xs text-[#efedea]/50 text-center italic">
          Primer mes gratis para nuevos profesionales. Sin compromiso.
        </p>
      </div>
    </section>
  )
}
