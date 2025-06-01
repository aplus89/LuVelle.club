"use client"

import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface PlanCardProps {
  plan: {
    id: string
    name: string
    price: number
    description: string
    features: string[]
  }
  isSelected: boolean
  onSelect: () => void
  isPopular?: boolean
}

export function PlanCard({ plan, isSelected, onSelect, isPopular }: PlanCardProps) {
  return (
    <Card
      className={`relative cursor-pointer transition-all duration-300 hover-lift ${
        isSelected ? "ring-2 ring-gold bg-gold/5 border-gold" : "border-cream/20 hover:border-gold/50"
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
        <ul className="space-y-3 mb-6">
          {plan.features.map((feature, index) => (
            <li key={index} className="flex items-start space-x-2">
              <Check className="h-4 w-4 text-gold mt-0.5 flex-shrink-0" />
              <span className="text-cream/80 text-sm">{feature}</span>
            </li>
          ))}
        </ul>

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
      </CardContent>
    </Card>
  )
}
