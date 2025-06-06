"use client"

import { Check, X, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface PlanCardProps {
  plan: {
    id: string
    name: string
    price: number
    description: string
    features: string[]
    restrictions?: string[]
  }
  isSelected: boolean
  onSelect: () => void
  isPopular?: boolean
  hideButton?: boolean
}

export function PlanCard({ plan, isSelected, onSelect, isPopular, hideButton = false }: PlanCardProps) {
  return (
    <Card
      className={`relative cursor-pointer transition-all duration-300 hover-lift ${
        isSelected ? "ring-2 ring-gold bg-gold/5 border-gold" : "border-gold bg-dark hover:border-gold/80"
      }`}
      onClick={onSelect}
    >
      {isPopular && (
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
          <span className="gradient-gold text-dark text-xs font-semibold px-3 py-1 rounded-full">Más Popular</span>
        </div>
      )}

      <CardHeader className="text-center pb-4">
        <CardTitle className="font-dancing text-2xl text-gold mb-2">{plan.name}</CardTitle>
        <div className="mb-2">
          <span className="text-3xl font-bold text-cream">${plan.price}</span>
          <span className="text-cream/60 text-sm">/mes</span>
        </div>
        <p className="text-cream/80 text-sm">{plan.description}</p>
      </CardHeader>

      <CardContent className="pt-0">
        <div className="mb-6">
          <h4 className="text-gold text-sm font-semibold mb-2">Incluye:</h4>
          <ul className="space-y-3">
            {plan.features.map((feature, index) => (
              <li key={index} className="flex items-start space-x-2">
                <Check className="h-4 w-4 text-gold mt-0.5 flex-shrink-0" />
                <span className="text-cream/80 text-sm">{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        {plan.restrictions && plan.restrictions.length > 0 && (
          <div className="mb-6">
            <h4 className="text-cream/80 text-sm font-semibold mb-2 flex items-center">
              <AlertCircle className="h-3 w-3 mr-1" />
              Restricciones:
            </h4>
            <ul className="space-y-2">
              {plan.restrictions.map((restriction, index) => (
                <li key={index} className="flex items-start space-x-2">
                  {restriction.startsWith("No") ? (
                    <X className="h-3 w-3 text-cream/60 mt-0.5 flex-shrink-0" />
                  ) : (
                    <Check className="h-3 w-3 text-gold mt-0.5 flex-shrink-0" />
                  )}
                  <span className="text-cream/70 text-xs">{restriction}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {!hideButton && (
          <Button
            className={`w-full transition-all duration-300 ${
              isSelected
                ? "gradient-gold text-dark font-semibold"
                : "border border-gold text-gold hover:gradient-gold hover:text-dark"
            }`}
            variant={isSelected ? "default" : "outline"}
          >
            {isSelected ? "Seleccionado" : "Seleccionar"}
          </Button>
        )}
      </CardContent>
    </Card>
  )
}
