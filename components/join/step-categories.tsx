"use client"

import { GlassCard } from "@/components/ui/glass-card"
import { Button } from "@/components/ui/button"
import { Check, Bell } from "lucide-react"
import type { Category } from "@/lib/supabase/types"
import type { WizardState } from "./join-wizard"
import { cn } from "@/lib/utils"
import { useState } from "react"
import { createLead } from "@/lib/supabase/queries"
import { useToast } from "@/hooks/use-toast"

interface StepCategoriesProps {
  categories: Category[]
  state: WizardState
  updateState: (updates: Partial<WizardState>) => void
  onNext: () => void
  onPrev: () => void
}

export function StepCategories({ categories, state, updateState, onNext, onPrev }: StepCategoriesProps) {
  const [notifyingCategory, setNotifyingCategory] = useState<string | null>(null)
  const { toast } = useToast()

  const handleToggleCategory = (categoryId: string, status: string) => {
    if (status === "proximamente") return

    const isSelected = state.selectedCategories.includes(categoryId)
    const newCategories = isSelected
      ? state.selectedCategories.filter((id) => id !== categoryId)
      : [...state.selectedCategories, categoryId]

    updateState({ selectedCategories: newCategories })
  }

  const handleNotifyMe = async (category: Category) => {
    setNotifyingCategory(category.id)

    const success = await createLead({
      persona: "user",
      notes: `Interesado en categoría próximamente: ${category.name}`,
      source: "join-wizard-notify",
    })

    if (success) {
      toast({
        title: "Te notificaremos",
        description: `Te avisaremos cuando ${category.name} esté disponible.`,
      })
    } else {
      toast({
        title: "Error",
        description: "No pudimos registrar tu interés. Intentá de nuevo.",
        variant: "destructive",
      })
    }

    setNotifyingCategory(null)
  }

  const handleContinue = () => {
    if (state.selectedCategories.length > 0) {
      onNext()
    }
  }

  // Skip this step if Essential plan (no customization)
  if (state.selectedPlan?.slug === "essential") {
    onNext()
    return null
  }

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-[hsl(var(--brand-cream))] mb-2">Elegí tus categorías favoritas</h2>
        <p className="text-[hsl(var(--brand-cream))]/70">Seleccioná las categorías que más te interesan</p>
      </div>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
        {categories.map((category) => {
          const isSelected = state.selectedCategories.includes(category.id)
          const isComingSoon = category.status === "proximamente"

          return (
            <GlassCard
              key={category.id}
              className={cn(
                "p-6 transition-all relative",
                !isComingSoon && "cursor-pointer",
                isSelected && "ring-2 ring-[hsl(var(--brand-gold))]",
                isComingSoon && "opacity-60",
              )}
              onClick={() => handleToggleCategory(category.id, category.status)}
            >
              {isComingSoon && (
                <div className="absolute top-3 right-3 bg-[hsl(var(--brand-gold))]/20 text-[hsl(var(--brand-gold))] px-2 py-1 rounded text-xs font-semibold">
                  Próximamente
                </div>
              )}

              {isSelected && !isComingSoon && (
                <div className="absolute top-3 right-3">
                  <div className="w-6 h-6 rounded-full bg-[hsl(var(--brand-gold))] flex items-center justify-center">
                    <Check className="w-4 h-4 text-[hsl(var(--brand-dark))]" />
                  </div>
                </div>
              )}

              <div className="text-center">
                <div className="text-4xl mb-3">{category.icon}</div>
                <h3 className="font-semibold text-[hsl(var(--brand-cream))] mb-2">{category.name}</h3>

                {isComingSoon && (
                  <Button
                    size="sm"
                    variant="outline"
                    className="glass-button-outline bg-transparent text-xs mt-2"
                    onClick={(e) => {
                      e.stopPropagation()
                      handleNotifyMe(category)
                    }}
                    disabled={notifyingCategory === category.id}
                  >
                    <Bell className="w-3 h-3 mr-1" />
                    {notifyingCategory === category.id ? "Guardando..." : "Notificarme"}
                  </Button>
                )}
              </div>
            </GlassCard>
          )
        })}
      </div>

      <div className="flex justify-between">
        <Button onClick={onPrev} variant="outline" className="glass-button-outline bg-transparent" size="lg">
          Atrás
        </Button>
        <Button
          onClick={handleContinue}
          disabled={state.selectedCategories.length === 0}
          className="glass-button"
          size="lg"
        >
          Continuar
        </Button>
      </div>
    </div>
  )
}
