import { Check } from "lucide-react"
import { cn } from "@/lib/utils"

interface StepIndicatorProps {
  currentStep: number
  steps: string[]
}

export function StepIndicator({ currentStep, steps }: StepIndicatorProps) {
  return (
    <div className="flex items-center justify-between max-w-2xl mx-auto">
      {steps.map((step, index) => (
        <div key={index} className="flex items-center flex-1">
          <div className="flex flex-col items-center flex-1">
            <div
              className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all",
                index < currentStep
                  ? "bg-[hsl(var(--brand-gold))] text-[hsl(var(--brand-dark))]"
                  : index === currentStep
                    ? "bg-[hsl(var(--brand-gold))] text-[hsl(var(--brand-dark))] ring-4 ring-[hsl(var(--brand-gold))]/30"
                    : "bg-white/10 text-[hsl(var(--brand-cream))]/50",
              )}
            >
              {index < currentStep ? <Check className="w-5 h-5" /> : index + 1}
            </div>
            <span
              className={cn(
                "text-xs mt-2 text-center",
                index <= currentStep ? "text-[hsl(var(--brand-cream))]" : "text-[hsl(var(--brand-cream))]/50",
              )}
            >
              {step}
            </span>
          </div>
          {index < steps.length - 1 && (
            <div
              className={cn(
                "h-0.5 flex-1 mx-2 transition-all",
                index < currentStep ? "bg-[hsl(var(--brand-gold))]" : "bg-white/10",
              )}
            />
          )}
        </div>
      ))}
    </div>
  )
}
