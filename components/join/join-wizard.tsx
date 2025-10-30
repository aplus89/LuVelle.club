"use client"

import { useState, useEffect } from "react"
import { StepIndicator } from "./step-indicator"
import { StepPlan } from "./step-plan"
import { StepCategories } from "./step-categories"
import { StepProducts } from "./step-products"
import { StepSummary } from "./step-summary"
import type { Plan, Category } from "@/lib/supabase/types"

interface JoinWizardProps {
  plans: Plan[]
  categories: Category[]
}

export interface WizardState {
  selectedPlan: Plan | null
  selectedCategories: string[]
  selectedProducts: string[]
  selectedServices: string[]
  referralCode: string
}

export function JoinWizard({ plans, categories }: JoinWizardProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [state, setState] = useState<WizardState>({
    selectedPlan: null,
    selectedCategories: [],
    selectedProducts: [],
    selectedServices: [],
    referralCode: "",
  })

  // Load state from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("luvelle-wizard-state")
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        setState(parsed)
      } catch (e) {
        console.error("[v0] Failed to parse saved wizard state:", e)
      }
    }
  }, [])

  // Save state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("luvelle-wizard-state", JSON.stringify(state))
  }, [state])

  const updateState = (updates: Partial<WizardState>) => {
    setState((prev) => ({ ...prev, ...updates }))
  }

  const nextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1)
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }

  const steps = [
    { title: "Plan", component: <StepPlan plans={plans} state={state} updateState={updateState} onNext={nextStep} /> },
    {
      title: "Categorías",
      component: (
        <StepCategories
          categories={categories}
          state={state}
          updateState={updateState}
          onNext={nextStep}
          onPrev={prevStep}
        />
      ),
    },
    {
      title: "Productos",
      component: <StepProducts state={state} updateState={updateState} onNext={nextStep} onPrev={prevStep} />,
    },
    {
      title: "Resumen",
      component: <StepSummary state={state} updateState={updateState} onPrev={prevStep} />,
    },
  ]

  return (
    <div className="space-y-8">
      <StepIndicator currentStep={currentStep} steps={steps.map((s) => s.title)} />
      {steps[currentStep].component}
    </div>
  )
}
