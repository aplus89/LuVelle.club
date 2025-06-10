"use client"

import { useState } from "react"
import { Check, Clock, Heart, Sparkles } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"

interface ProductCardProps {
  product: {
    id: string
    name: string
    brand: string
    description: string
    image: string
    available: boolean
  }
  isSelected: boolean
  onSelect: () => void
  disabled?: boolean
}

export function ProductCard({ product, isSelected, onSelect, disabled }: ProductCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false)

  if (!product.available) {
    return (
      <Card className="relative overflow-hidden border-beige/20 bg-gradient-to-br from-dark/60 to-blue/20 backdrop-blur-sm opacity-70">
        <div className="absolute inset-0 bg-gradient-to-br from-gold/5 to-transparent" />
        <CardContent className="relative p-4">
          <div className="relative mb-3">
            <div className="w-full h-32 bg-gradient-to-br from-beige/10 to-gold/5 rounded-xl flex items-center justify-center border border-beige/20">
              <img
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                className="w-full h-full object-cover rounded-xl grayscale opacity-50"
                onLoad={() => setImageLoaded(true)}
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-dark/60 via-transparent to-transparent rounded-xl flex items-center justify-center">
              <div className="bg-gradient-to-r from-cream/90 to-beige/90 text-dark text-xs px-3 py-1.5 rounded-full flex items-center gap-2 border border-gold/20">
                <Clock className="h-3 w-3" />
                <span className="font-medium">Próximamente</span>
              </div>
            </div>
          </div>

          <div className="space-y-1">
            <h3 className="font-playfair text-sm font-medium text-beige/60">{product.name}</h3>
            <p className="text-xs text-gold/60 font-medium">{product.brand}</p>
            <p className="text-xs text-beige/50 line-clamp-2">{product.description}</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card
      className={`relative overflow-hidden cursor-pointer transition-all duration-300 hover-lift group ${
        isSelected
          ? "ring-2 ring-gold bg-gradient-to-br from-gold/10 to-gold/5 border-gold shadow-lg shadow-gold/20"
          : disabled
            ? "border-beige/10 opacity-50 cursor-not-allowed bg-gradient-to-br from-dark/40 to-blue/10"
            : "border-beige/20 bg-gradient-to-br from-dark/60 to-blue/10 hover:border-gold/50 hover:shadow-lg hover:shadow-gold/10"
      }`}
      onClick={disabled ? undefined : onSelect}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <CardContent className="relative p-4">
        <div className="relative mb-3">
          <div className="w-full h-32 bg-gradient-to-br from-beige/10 to-gold/5 rounded-xl overflow-hidden border border-beige/20">
            <img
              src={product.image || "/placeholder.svg"}
              alt={product.name}
              className={`w-full h-full object-cover transition-all duration-300 ${
                imageLoaded ? "opacity-100" : "opacity-0"
              } ${isSelected ? "scale-105" : "group-hover:scale-102"}`}
              onLoad={() => setImageLoaded(true)}
            />
            {!imageLoaded && (
              <div className="absolute inset-0 bg-gradient-to-br from-beige/10 to-gold/5 animate-pulse" />
            )}
          </div>

          {/* Selection indicator */}
          <div className="absolute -top-2 -right-2">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg ${
                isSelected
                  ? "bg-gradient-to-br from-gold to-gold/80 border-2 border-cream scale-110"
                  : "bg-gradient-to-br from-cream/90 to-beige/90 border border-beige/40 group-hover:scale-105"
              }`}
            >
              {isSelected ? (
                <Check className="h-4 w-4 text-dark font-bold" />
              ) : (
                <Heart className="h-3 w-3 text-gold/60" />
              )}
            </div>
          </div>
        </div>

        <div className="space-y-1">
          <h3
            className={`font-playfair text-sm font-medium transition-colors duration-300 ${
              isSelected ? "text-gold" : "text-beige group-hover:text-gold/80"
            }`}
          >
            {product.name}
          </h3>
          <p className="text-xs text-gold/80 font-medium">{product.brand}</p>
          <p className="text-xs text-beige/70 line-clamp-2">{product.description}</p>
        </div>

        {isSelected && (
          <div className="mt-3 flex items-center justify-center gap-1 text-gold/80">
            <Sparkles className="h-3 w-3 animate-pulse" />
            <span className="text-xs font-medium">En tu Box</span>
            <Sparkles className="h-3 w-3 animate-pulse" />
          </div>
        )}

        {/* Hidden checkbox for accessibility */}
        <Checkbox checked={isSelected} onChange={onSelect} className="sr-only" disabled={disabled} />
      </CardContent>
    </Card>
  )
}
