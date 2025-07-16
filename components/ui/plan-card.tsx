"use client"

import { Check, Crown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface PlanCardProps {
  plan: {
    id: string
    name: string
    priceRange: string
    description: string
    features: string[]
    note: string
    cashback?: number
  }
  isSelected?: boolean
  isAchieved?: boolean
  onSelect?: () => void
  isPopular?: boolean
  hideButton?: boolean
  currentPrice?: number
}

export function PlanCard({
  plan,
  isSelected = false,
  isAchieved = false,
  onSelect,
  isPopular,
  hideButton = false,
  currentPrice,
}: PlanCardProps) {
  const cardStyle = isAchieved
    ? "ring-2 ring-gold bg-gold/10 border-gold shadow-lg shadow-gold/25"
    : isSelected
      ? "ring-2 ring-gold bg-gold/5 border-gold"
      : "border-gold bg-dark hover:border-gold/80"

  return (
    <Card className={`relative cursor-pointer transition-all duration-300 hover-lift ${cardStyle}`} onClick={onSelect}>
      {isPopular && (
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
          <span className="gradient-gold text-dark text-xs font-semibold px-3 py-1 rounded-full">Más Popular</span>
        </div>
      )}

      {isAchieved && (
        <div className="absolute -top-3 right-4">
          <div className="bg-gold text-dark rounded-full p-2 shadow-lg">
            <Crown className="h-4 w-4" />
          </div>
        </div>
      )}

      <CardHeader className="text-center pb-4">
        <CardTitle className="font-dancing text-2xl text-gold mb-2">{plan.name}</CardTitle>
        <div className="mb-2">
          <span className="text-2xl font-bold text-cream">{plan.priceRange}</span>
        </div>
        {currentPrice && (
          <div className="text-sm text-gold/80 mt-1">Precio actual: ₡{currentPrice.toLocaleString()}</div>
        )}
        <p className="text-cream/80 text-sm italic">{plan.note}</p>
      </CardHeader>

      <CardContent className="pt-0">
        <div className="mb-6">
          <ul className="space-y-3">
            {plan.features.map((feature, index) => (
              <li key={index} className="flex items-start space-x-2">
                <Check className="h-4 w-4 text-gold mt-0.5 flex-shrink-0" />
                <span className="text-cream/80 text-sm">{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        {plan.cashback && (
          <div className="mb-4 p-3 bg-gold/10 rounded-lg border border-gold/20">
            <p className="text-gold text-sm font-medium">
              {plan.cashback}% cashback por referidas
              {plan.id === "deluxe" && " (si compra Deluxe > ₡60.000)"}
            </p>
          </div>
        )}

        {!hideButton && (
          <Button
            className={`w-full transition-all duration-300 ${
              isAchieved
                ? "gradient-gold text-dark font-semibold"
                : isSelected
                  ? "gradient-gold text-dark font-semibold"
                  : "border border-gold text-gold hover:gradient-gold hover:text-dark"
            }`}
            variant={isAchieved || isSelected ? "default" : "outline"}
          >
            {isAchieved ? "Plan Alcanzado" : isSelected ? "Seleccionado" : "Seleccionar"}
          </Button>
        )}
      </CardContent>
    </Card>
  )
}
