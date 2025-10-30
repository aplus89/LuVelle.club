"use client"

import { GlassCard } from "@/components/ui/glass-card"
import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"
import type { Plan } from "@/lib/supabase/types"
import type { WizardState } from "./join-wizard"
import { cn } from "@/lib/utils"

interface StepPlanProps {
  plans: Plan[]
  state: WizardState
  updateState: (updates: Partial<WizardState>) => void
  onNext: () => void
}

export function StepPlan({ plans, state, updateState, onNext }: StepPlanProps) {
  const handleSelectPlan = (plan: Plan) => {
    updateState({ selectedPlan: plan })
  }

  const handleContinue = () => {
    if (state.selectedPlan) {
      onNext()
    }
  }

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-[hsl(var(--brand-cream))] mb-2">Elegí tu plan</h2>
        <p className="text-[hsl(var(--brand-cream))]/70">Seleccioná el plan que mejor se adapte a vos</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {plans.map((plan) => {
          const isSelected = state.selectedPlan?.id === plan.id
          const isPopular = plan.slug === "premium"

          return (
            <GlassCard
              key={plan.id}
              highlight={isSelected}
              className={cn(
                "p-6 cursor-pointer transition-all relative",
                isSelected && "ring-2 ring-[hsl(var(--brand-gold))]",
              )}
              onClick={() => handleSelectPlan(plan)}
            >
              {isPopular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[hsl(var(--brand-gold))] text-[hsl(var(--brand-dark))] px-3 py-1 rounded-full text-xs font-semibold">
                  Más Elegido
                </div>
              )}

              {isSelected && (
                <div className="absolute top-4 right-4">
                  <div className="w-6 h-6 rounded-full bg-[hsl(var(--brand-gold))] flex items-center justify-center">
                    <Check className="w-4 h-4 text-[hsl(var(--brand-dark))]" />
                  </div>
                </div>
              )}

              <div className="mb-4">
                <h3 className="heading-font text-2xl font-bold text-[hsl(var(--brand-gold))] mb-1">{plan.name}</h3>
                <p className="text-xl text-[hsl(var(--brand-cream))]">{plan.price_range}</p>
                <p className="text-xs text-[hsl(var(--brand-cream))]/60">por mes</p>
              </div>

              {plan.slug === "essential" && (
                <div className="mb-4 p-2 rounded-lg bg-[hsl(var(--brand-gold))]/10 border border-[hsl(var(--brand-gold))]/30">
                  <p className="text-xs text-[hsl(var(--brand-cream))]/90">Sin personalización de productos</p>
                </div>
              )}

              <ul className="space-y-2">
                {plan.features.slice(0, 4).map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-[hsl(var(--brand-gold))] flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-[hsl(var(--brand-cream))]/80">{feature}</span>
                  </li>
                ))}
              </ul>
            </GlassCard>
          )
        })}
      </div>

      <div className="flex justify-end">
        <Button onClick={handleContinue} disabled={!state.selectedPlan} className="glass-button" size="lg">
          Continuar
        </Button>
      </div>
    </div>
  )
}
