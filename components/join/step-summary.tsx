"use client"

import { useState } from "react"
import { GlassCard } from "@/components/ui/glass-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import type { WizardState } from "./join-wizard"
import { Check, Gift, Package, Tag, Sparkles, Crown } from "lucide-react"

interface StepSummaryProps {
  state: WizardState
  updateState: (updates: Partial<WizardState>) => void
  onPrev: () => void
}

export function StepSummary({ state, updateState, onPrev }: StepSummaryProps) {
  const [isProcessing, setIsProcessing] = useState(false)

  const handleReferralChange = (value: string) => {
    updateState({ referralCode: value })
    localStorage.setItem("luvelle-referral-code", value)
  }

  const handleCheckout = async () => {
    setIsProcessing(true)
    // TODO: Integrate with Onvopay
    // For now, just show a message
    setTimeout(() => {
      alert("Integración con Onvopay próximamente. Tu selección ha sido guardada.")
      setIsProcessing(false)
    }, 1500)
  }

  const getPlanIcon = (slug?: string) => {
    if (slug === "deluxe") return Crown
    if (slug === "premium") return Sparkles
    return Package
  }

  const getPlanColor = (slug?: string) => {
    if (slug === "deluxe") return "text-purple-400"
    if (slug === "premium") return "text-[hsl(var(--brand-gold))]"
    return "text-blue-400"
  }

  const PlanIcon = getPlanIcon(state.selectedPlan?.slug)
  const planColor = getPlanColor(state.selectedPlan?.slug)

  return (
    <div className="space-y-6">
      <div className="text-center pb-6 border-b border-white/10">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[hsl(var(--brand-gold))]/20 mb-4">
          <Check className="w-8 h-8 text-[hsl(var(--brand-gold))]" />
        </div>
        <h2 className="text-3xl font-bold text-[hsl(var(--brand-cream))] mb-2">¡Tu Beauty Box está lista!</h2>
        <p className="text-[hsl(var(--brand-cream))]/70">Revisá los detalles de tu suscripción personalizada</p>
      </div>

      <GlassCard className="p-6 relative overflow-hidden">
        {/* Decorative background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-[hsl(var(--brand-gold))]/5 via-transparent to-transparent pointer-events-none" />

        <div className="relative">
          <div className="flex items-center gap-2 mb-4">
            <PlanIcon className={`w-5 h-5 ${planColor}`} />
            <h3 className="text-lg font-semibold text-[hsl(var(--brand-gold))]">Plan seleccionado</h3>
          </div>

          <div className="flex items-center justify-between mb-4">
            <div className="space-y-1">
              <p className="text-2xl font-bold text-[hsl(var(--brand-cream))]">{state.selectedPlan?.name}</p>
              <p className="text-lg text-[hsl(var(--brand-gold))]">{state.selectedPlan?.price_range}</p>
              <p className="text-sm text-[hsl(var(--brand-cream))]/60">por mes + envío</p>
            </div>

            <div className={`flex items-center justify-center w-12 h-12 rounded-full bg-[hsl(var(--brand-gold))]/20`}>
              <Check className="w-6 h-6 text-[hsl(var(--brand-gold))]" />
            </div>
          </div>

          {state.selectedPlan && state.selectedPlan.features.length > 0 && (
            <div className="pt-4 border-t border-white/10">
              <p className="text-xs font-semibold text-[hsl(var(--brand-cream))]/60 uppercase mb-2">Incluye:</p>
              <ul className="space-y-2">
                {state.selectedPlan.features.slice(0, 3).map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-[hsl(var(--brand-gold))] flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-[hsl(var(--brand-cream))]/80">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </GlassCard>

      {state.selectedCategories.length > 0 && (
        <GlassCard className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-[hsl(var(--brand-gold))]/10">
                <Tag className="w-5 h-5 text-[hsl(var(--brand-gold))]" />
              </div>
              <div>
                <h3 className="text-base font-semibold text-[hsl(var(--brand-cream))]">Categorías seleccionadas</h3>
                <p className="text-sm text-[hsl(var(--brand-cream))]/60">Tus preferencias de productos</p>
              </div>
            </div>
            <div className="flex items-center justify-center min-w-[2.5rem] h-10 px-3 rounded-full bg-[hsl(var(--brand-gold))]/20 border border-[hsl(var(--brand-gold))]/30">
              <span className="text-lg font-bold text-[hsl(var(--brand-gold))]">{state.selectedCategories.length}</span>
            </div>
          </div>
        </GlassCard>
      )}

      {state.selectedProducts.length > 0 && (
        <GlassCard className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-[hsl(var(--brand-gold))]/10">
                <Package className="w-5 h-5 text-[hsl(var(--brand-gold))]" />
              </div>
              <div>
                <h3 className="text-base font-semibold text-[hsl(var(--brand-cream))]">Productos seleccionados</h3>
                <p className="text-sm text-[hsl(var(--brand-cream))]/60">Personalizados para vos</p>
              </div>
            </div>
            <div className="flex items-center justify-center min-w-[2.5rem] h-10 px-3 rounded-full bg-[hsl(var(--brand-gold))]/20 border border-[hsl(var(--brand-gold))]/30">
              <span className="text-lg font-bold text-[hsl(var(--brand-gold))]">{state.selectedProducts.length}</span>
            </div>
          </div>
        </GlassCard>
      )}

      {state.selectedServices.length > 0 && (
        <GlassCard className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-[hsl(var(--brand-gold))]/10">
                <Sparkles className="w-5 h-5 text-[hsl(var(--brand-gold))]" />
              </div>
              <div>
                <h3 className="text-base font-semibold text-[hsl(var(--brand-cream))]">Servicios seleccionados</h3>
                <p className="text-sm text-[hsl(var(--brand-cream))]/60">Experiencias exclusivas</p>
              </div>
            </div>
            <div className="flex items-center justify-center min-w-[2.5rem] h-10 px-3 rounded-full bg-[hsl(var(--brand-gold))]/20 border border-[hsl(var(--brand-gold))]/30">
              <span className="text-lg font-bold text-[hsl(var(--brand-gold))]">{state.selectedServices.length}</span>
            </div>
          </div>
        </GlassCard>
      )}

      <GlassCard className="p-6 bg-gradient-to-br from-[hsl(var(--brand-gold))]/10 via-transparent to-transparent">
        <div className="flex items-start gap-3 mb-4">
          <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-[hsl(var(--brand-gold))]/20">
            <Gift className="w-5 h-5 text-[hsl(var(--brand-gold))]" />
          </div>
          <div className="flex-1">
            <Label htmlFor="referral" className="text-base font-semibold text-[hsl(var(--brand-cream))] mb-1 block">
              ¿Tenés un código de referido?
            </Label>
            <p className="text-sm text-[hsl(var(--brand-cream))]/60 mb-3">Ingresalo y obtené beneficios exclusivos</p>
            <Input
              id="referral"
              type="text"
              placeholder="Ej: LV12345"
              value={state.referralCode}
              onChange={(e) => handleReferralChange(e.target.value.toUpperCase())}
              className="bg-white/5 border-white/20 text-[hsl(var(--brand-cream))] placeholder:text-[hsl(var(--brand-cream))]/40 focus:border-[hsl(var(--brand-gold))] focus:ring-[hsl(var(--brand-gold))]/20"
            />
          </div>
        </div>

        {/* Referral benefits */}
        <div className="pl-13 space-y-1">
          <p className="text-xs text-[hsl(var(--brand-cream))]/50 flex items-center gap-2">
            <Check className="w-3 h-3" />
            Premium: 3% cashback en compras +$120
          </p>
          <p className="text-xs text-[hsl(var(--brand-cream))]/50 flex items-center gap-2">
            <Check className="w-3 h-3" />
            Deluxe: 8% cashback en compras +$120
          </p>
        </div>
      </GlassCard>

      <div className="flex flex-col sm:flex-row gap-4 pt-4">
        <Button
          onClick={onPrev}
          variant="outline"
          className="glass-button-outline bg-transparent sm:flex-1"
          size="lg"
          disabled={isProcessing}
        >
          Atrás
        </Button>
        <Button onClick={handleCheckout} className="glass-button sm:flex-1 relative" size="lg" disabled={isProcessing}>
          {isProcessing ? (
            <>
              <span className="opacity-0">Proceder al pago</span>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-5 h-5 border-2 border-[hsl(var(--brand-dark))]/30 border-t-[hsl(var(--brand-dark))] rounded-full animate-spin" />
              </div>
            </>
          ) : (
            "Proceder al pago"
          )}
        </Button>
      </div>

      <div className="flex items-center justify-center gap-2 text-xs text-[hsl(var(--brand-cream))]/40 pt-2">
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
            clipRule="evenodd"
          />
        </svg>
        <span>Pago seguro • Cancela cuando quieras</span>
      </div>
    </div>
  )
}
