"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Clock, Sparkles } from "lucide-react"

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
      <Card className="relative overflow-hidden border-beige/20 bg-gradient-to-br from-dark/60 to-blue/20 backdrop-blur-sm opacity-80 hover:opacity-100 transition-all duration-300 hover-lift">
        <div className="absolute inset-0 bg-gradient-to-br from-gold/5 to-transparent" />
        <CardContent className="relative p-6 text-center">
          <div className="mb-4">
            <div className="w-16 h-16 mx-auto bg-gradient-to-br from-beige/10 to-gold/10 rounded-full flex items-center justify-center mb-3 border border-beige/20">
              <span className="text-2xl grayscale opacity-60">{category.icon}</span>
            </div>
            <h3 className="font-playfair text-lg font-medium text-beige/70 mb-2">{category.name}</h3>
          </div>

          <div className="mb-4">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-gold/20 to-beige/20 text-gold/80 px-3 py-1.5 rounded-full text-sm border border-gold/20">
              <Clock className="h-3 w-3" />
              <span className="font-medium">Próximamente</span>
            </div>
          </div>

          <Button
            size="sm"
            variant="outline"
            className="bg-transparent border-gold/30 text-gold/80 hover:bg-gold/10 hover:border-gold hover:text-gold transition-all duration-300 font-medium px-4 py-2"
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
      className={`relative overflow-hidden cursor-pointer transition-all duration-300 hover-lift group ${
        isSelected
          ? "ring-2 ring-gold bg-gradient-to-br from-gold/10 to-gold/5 border-gold shadow-lg shadow-gold/20"
          : "border-beige/20 bg-gradient-to-br from-dark/60 to-blue/10 hover:border-gold/50 hover:shadow-lg hover:shadow-gold/10"
      }`}
      onClick={onSelect}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <CardContent className="relative p-6 text-center">
        <div className="mb-4">
          <div
            className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-3 transition-all duration-300 ${
              isSelected
                ? "bg-gradient-to-br from-gold/20 to-gold/10 border-2 border-gold/30 shadow-lg"
                : "bg-gradient-to-br from-beige/10 to-gold/5 border border-beige/20 group-hover:border-gold/30"
            }`}
          >
            <span
              className={`text-2xl transition-all duration-300 ${
                isSelected ? "scale-110 filter drop-shadow-sm" : "group-hover:scale-105"
              }`}
            >
              {category.icon}
            </span>
          </div>

          <h3
            className={`font-playfair text-lg font-medium transition-colors duration-300 ${
              isSelected ? "text-gold" : "text-beige group-hover:text-gold/80"
            }`}
          >
            {category.name}
          </h3>
        </div>

        {isSelected && (
          <div className="flex items-center justify-center gap-2 text-gold/80 animate-pulse">
            <Sparkles className="h-4 w-4" />
            <span className="text-sm font-medium">Seleccionada</span>
            <Sparkles className="h-4 w-4" />
          </div>
        )}
      </CardContent>
    </Card>
  )
}
