"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

interface CategoryCardProps {
  category: {
    id: string
    name: string
    icon: string
    available: boolean
  }
  isSelected: boolean
  onSelect: () => void
  onNotify?: () => void
}

export function CategoryCard({ category, isSelected, onSelect, onNotify }: CategoryCardProps) {
  if (!category.available) {
    return (
      <Card className="border-beige/10 bg-beige/5 opacity-60">
        <CardContent className="p-4 text-center">
          <div className="text-3xl mb-2 grayscale">{category.icon}</div>
          <h3 className="font-medium text-beige/60 text-sm mb-2">{category.name}</h3>
          <div className="mb-3">
            <span className="text-xs bg-beige/10 text-beige/60 px-2 py-1 rounded-full">Próximamente</span>
          </div>
          <Button
            size="sm"
            variant="outline"
            className="text-xs border-beige/20 text-beige/60 hover:border-gold hover:text-gold"
            onClick={onNotify}
          >
            Notifícame
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card
      className={`cursor-pointer transition-all duration-300 hover-lift ${
        isSelected ? "ring-2 ring-gold bg-gold/10 border-gold" : "border-beige/20 hover:border-gold/50"
      }`}
      onClick={onSelect}
    >
      <CardContent className="p-4 text-center">
        <div className={`text-3xl mb-2 transition-transform duration-300 ${isSelected ? "scale-110" : ""}`}>
          {category.icon}
        </div>
        <h3 className={`font-medium text-sm transition-colors ${isSelected ? "text-gold" : "text-beige"}`}>
          {category.name}
        </h3>
        {isSelected && (
          <div className="mt-2">
            <div className="w-2 h-2 bg-gold rounded-full mx-auto animate-pulse"></div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
