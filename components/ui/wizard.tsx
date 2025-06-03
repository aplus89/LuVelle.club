"use client"

import type { ReactNode } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

interface WizardProps {
  currentStep: number
  totalSteps: number
  onNext: () => void
  onPrev: () => void
  onStepClick: (step: number) => void
  canProceed: boolean
  children: ReactNode
  title?: string
  subtitle?: string
}

export function Wizard({
  currentStep,
  totalSteps,
  onNext,
  onPrev,
  onStepClick,
  canProceed,
  children,
  title,
  subtitle,
}: WizardProps) {
  const progress = ((currentStep + 1) / totalSteps) * 100

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        {title && <h1 className="font-dancing text-4xl md:text-5xl text-gold mb-4">{title}</h1>}
        {subtitle && <p className="text-beige/80 text-lg max-w-2xl mx-auto">{subtitle}</p>}
      </div>

      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-beige/60">
            Paso {currentStep + 1} de {totalSteps}
          </span>
          <span className="text-sm text-beige/60">{Math.round(progress)}% completado</span>
        </div>
        <div className="w-full bg-beige/10 rounded-full h-2">
          <div
            className="gradient-gold h-2 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Step Indicators */}
      <div className="flex justify-center mb-8">
        <div className="flex space-x-2">
          {Array.from({ length: totalSteps }, (_, i) => (
            <button
              key={i}
              onClick={() => onStepClick(i)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                i <= currentStep ? "bg-gold" : "bg-beige/20 hover:bg-beige/40"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="min-h-[400px] mb-8">{children}</div>

      {/* Navigation */}
      <div className="flex justify-between items-center">
        <Button
          variant="outline"
          onClick={onPrev}
          disabled={currentStep === 0}
          className="border-beige/20 text-beige hover:border-gold hover:text-gold"
        >
          <ChevronLeft className="h-4 w-4 mr-2" />
          Anterior
        </Button>

        <Button
          onClick={onNext}
          disabled={!canProceed}
          className="gradient-gold text-dark font-semibold hover:opacity-90 transition-opacity"
        >
          {currentStep === totalSteps - 1 ? "Finalizar" : "Continuar"}
          <ChevronRight className="h-4 w-4 ml-2" />
        </Button>
      </div>
    </div>
  )
}
