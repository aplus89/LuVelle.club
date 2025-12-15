"use client"

import { useEffect, useRef, useState } from "react"
import { Check, Sparkles } from "lucide-react"
import { GlassCard } from "@/components/ui/glass-card"
import { LuVelleButton } from "@/components/ui/luvelle-button"
import Link from "next/link"
import { createClient } from "@/lib/supabase/client"
import { toCrc, toUsd } from "@/lib/utils/currency"

const FALLBACK_PLANS = [
  {
    name: "Esencial",
    slug: "beauty-box-esencial",
    price_local: 29900,
    features: [
      "3-4 productos seleccionados mensualmente",
      "Categorías: Skincare y Makeup básico",
      "Marcas reconocidas y confiables",
      "Descuentos exclusivos en compras",
    ],
    referralPercent: 0,
    popular: false,
  },
  {
    name: "Premium",
    slug: "beauty-box-premium",
    price_local: 39900,
    features: [
      "5-6 productos premium cada mes",
      "Categorías: Skincare, Makeup, Haircare",
      "Personalización según tu perfil de belleza",
      "3% cashback (Girls Math: ganás por cada caja que referís)",
      "Acceso anticipado a lanzamientos",
    ],
    referralPercent: 3,
    popular: true,
  },
  {
    name: "Deluxe",
    slug: "beauty-box-deluxe",
    price_local: 49900,
    features: [
      "7-8 productos de lujo mensuales",
      "Todas las categorías: Skincare, Makeup, Haircare, Nails y más",
      "Caja 100% personalizada para vos",
      "8% cashback (Girls Math: ¡tu caja se paga sola con referidos!)",
      "Consulta virtual mensual con experto en belleza",
      "Envío prioritario y exclusivo",
    ],
    referralPercent: 8,
    popular: false,
  },
]

export function BeautyBoxPlans() {
  const [plans, setPlans] = useState<any[]>(FALLBACK_PLANS)
  const cardsRef = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    async function fetchPlans() {
      const supabase = createClient()
      const { data, error } = await supabase
        .from("plans")
        .select("*")
        .in("slug", ["beauty-box-esencial", "beauty-box-premium", "beauty-box-deluxe"])
        .eq("is_available", true)

      if (error) {
        console.error("[v0] Error fetching Beauty Box plans:", error)
        return
      }

      if (data && data.length > 0) {
        const formattedPlans = data.map((plan) => ({
          name: plan.name,
          slug: plan.slug,
          price_local: plan.price_local || 29900,
          features: plan.features || [],
          referralPercent: plan.referral_percent || 0,
          popular: plan.slug === "beauty-box-premium",
        }))

        setPlans(formattedPlans)
      }
    }

    fetchPlans()
  }, [])

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
  }, [plans])

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
                <div className="flex items-center justify-between mb-4">
                  {plan.popular && (
                    <div className="bg-brand-gold text-brand-dark text-xs font-bold uppercase px-3 py-1 rounded-full">
                      Más elegido
                    </div>
                  )}
                  {plan.referralPercent > 0 && (
                    <div className="bg-[#f4cc6e]/20 border border-[#f4cc6e]/30 text-[#f4cc6e] text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1 ml-auto">
                      <Sparkles className="w-3 h-3" />
                      {plan.referralPercent}% cashback
                    </div>
                  )}
                </div>

                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-brand-cream mb-2">{plan.name}</h3>
                  <div className="mb-4">
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl font-bold text-brand-gold">{toCrc(plan.price_local)}</span>
                      <span className="text-brand-cream/60">/mes</span>
                    </div>
                    <div className="text-sm text-brand-cream/50 mt-1">≈ {toUsd(plan.price_local)} USD</div>
                  </div>
                  {plan.referralPercent > 0 && (
                    <p className="text-xs text-brand-gold/80 italic mb-2">
                      Girls Math: {plan.referralPercent}% de tus compras vuelve a vos en créditos LuVelle
                    </p>
                  )}
                </div>

                <ul className="space-y-3 mb-8 flex-grow">
                  {plan.features.map((feature: string, idx: number) => (
                    <li key={idx} className="flex items-start gap-3 text-sm text-brand-cream/80">
                      <Check className="w-5 h-5 text-box-gold flex-shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <LuVelleButton variant={plan.popular ? "gold" : "outline"} className="w-full" asChild>
                  <Link href={`/join?plan=${plan.slug}`}>Crear mi {plan.name}</Link>
                </LuVelleButton>
              </GlassCard>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
