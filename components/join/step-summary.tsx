"use client"

import { GlassCard } from "@/components/ui/glass-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import type { WizardState } from "./join-wizard"
import { Check } from "lucide-react"

interface StepSummaryProps {
  state: WizardState
  updateState: (updates: Partial<WizardState>) => void
  onPrev: () => void
}

export function StepSummary({ state, updateState, onPrev }: StepSummaryProps) {
  const handleReferralChange = (value: string) => {
    updateState({ referralCode: value })
    localStorage.setItem("luvelle-referral-code", value)
  }

  const handleCheckout = () => {
    // TODO: Integrate with Onvopay
    // For now, just show a message
    alert("Integración con Onvopay próximamente. Tu selección ha sido guardada.")
  }

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-[hsl(var(--brand-cream))] mb-2">Resumen de tu Beauty Box</h2>
        <p className="text-[hsl(var(--brand-cream))]/70">Revisá tu selección antes de continuar</p>
      </div>

      {/* Plan Summary */}
      <GlassCard className="p-6">
        <h3 className="text-lg font-semibold text-[hsl(var(--brand-gold))] mb-4">Plan seleccionado</h3>
        <div className="flex justify-between items-center">
          <div>
            <p className="font-semibold text-[hsl(var(--brand-cream))]">{state.selectedPlan?.name}</p>
            <p className="text-sm text-[hsl(var(--brand-cream))]/70">{state.selectedPlan?.price_range}</p>
          </div>
          <Check className="w-6 h-6 text-[hsl(var(--brand-gold))]" />
        </div>
      </GlassCard>

      {/* Categories Summary */}
      {state.selectedCategories.length > 0 && (
        <GlassCard className="p-6">
          <h3 className="text-lg font-semibold text-[hsl(var(--brand-gold))] mb-4">Categorías seleccionadas</h3>
          <p className="text-[hsl(var(--brand-cream))]/70">{state.selectedCategories.length} categorías</p>
        </GlassCard>
      )}

      {/* Products Summary */}
      {state.selectedProducts.length > 0 && (
        <GlassCard className="p-6">
          <h3 className="text-lg font-semibold text-[hsl(var(--brand-gold))] mb-4">Productos seleccionados</h3>
          <p className="text-[hsl(var(--brand-cream))]/70">{state.selectedProducts.length} productos</p>
        </GlassCard>
      )}

      {/* Services Summary */}
      {state.selectedServices.length > 0 && (
        <GlassCard className="p-6">
          <h3 className="text-lg font-semibold text-[hsl(var(--brand-gold))] mb-4">Servicios seleccionados</h3>
          <p className="text-[hsl(var(--brand-cream))]/70">{state.selectedServices.length} servicios</p>
        </GlassCard>
      )}

      {/* Referral Code */}
      <GlassCard className="p-6">
        <Label htmlFor="referral" className="text-[hsl(var(--brand-cream))] mb-2 block">
          Código de referido (opcional)
        </Label>
        <Input
          id="referral"
          type="text"
          placeholder="Ingresá tu código"
          value={state.referralCode}
          onChange={(e) => handleReferralChange(e.target.value)}
          className="bg-white/5 border-white/20 text-[hsl(var(--brand-cream))] placeholder:text-[hsl(var(--brand-cream))]/40"
        />
      </GlassCard>

      {/* Actions */}
      <div className="flex justify-between">
        <Button onClick={onPrev} variant="outline" className="glass-button-outline bg-transparent" size="lg">
          Atrás
        </Button>
        <Button onClick={handleCheckout} className="glass-button" size="lg">
          Proceder al pago
        </Button>
      </div>
    </div>
  )
}
