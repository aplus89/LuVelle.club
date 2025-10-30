"use client"

import { GlassCard } from "@/components/ui/glass-card"
import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"
import Link from "next/link"
import type { Plan } from "@/lib/supabase/types"

interface PlansProps {
  plans: Plan[]
}

export function Plans({ plans }: PlansProps) {
  const getPlanCTA = (slug: string) => {
    if (slug === "essential") {
      return { text: "Comenzar", href: "/checkout/essential" }
    }
    return { text: "Personalizar", href: "/join" }
  }

  return (
    <section id="planes" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="heading-font text-4xl md:text-5xl font-bold mb-4">Elegí tu plan</h2>
          <p className="text-xl text-[hsl(var(--brand-cream))]/80 max-w-2xl mx-auto">
            Tres opciones diseñadas para cada estilo y presupuesto
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => {
            const cta = getPlanCTA(plan.slug)
            const isPopular = plan.slug === "premium"

            return (
              <GlassCard key={plan.id} highlight={isPopular} className="p-8 flex flex-col relative">
                {isPopular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[hsl(var(--brand-gold))] text-[hsl(var(--brand-dark))] px-4 py-1 rounded-full text-sm font-semibold">
                    Más Elegido
                  </div>
                )}

                <div className="mb-6">
                  <h3 className="heading-font text-3xl font-bold text-[hsl(var(--brand-gold))] mb-2">{plan.name}</h3>
                  <p className="text-2xl text-[hsl(var(--brand-cream))]">{plan.price_range}</p>
                  <p className="text-sm text-[hsl(var(--brand-cream))]/60 mt-1">por mes</p>
                </div>

                {plan.slug === "essential" && (
                  <div className="mb-6 p-3 rounded-lg bg-[hsl(var(--brand-gold))]/10 border border-[hsl(var(--brand-gold))]/30">
                    <p className="text-sm text-[hsl(var(--brand-cream))]/90">
                      Sin personalización. Solo contenido digital.
                    </p>
                  </div>
                )}

                <ul className="space-y-3 mb-8 flex-grow">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-[hsl(var(--brand-gold))] flex-shrink-0 mt-0.5" />
                      <span className="text-[hsl(var(--brand-cream))]/80 text-sm leading-relaxed">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button asChild className="glass-button w-full">
                  <Link href={cta.href}>{cta.text}</Link>
                </Button>
              </GlassCard>
            )
          })}
        </div>
      </div>
    </section>
  )
}
