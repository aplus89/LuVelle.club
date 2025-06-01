"use client"

import { useState } from "react"
import { Check, Clock } from "lucide-react"
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
      <Card className="border-cream/10 bg-cream/5 opacity-60">
        <CardContent className="p-4">
          <div className="relative mb-3">
            <img
              src={product.image || "/placeholder.svg"}
              alt={product.name}
              className="w-full h-32 object-cover rounded-lg grayscale"
              onLoad={() => setImageLoaded(true)}
            />
            <div className="absolute inset-0 bg-black/20 rounded-lg flex items-center justify-center">
              <div className="bg-cream/90 text-dark text-xs px-2 py-1 rounded-full flex items-center gap-1">
                <Clock className="h-3 w-3" />
                Próximamente
              </div>
            </div>
          </div>
          <div className="space-y-1">
            <h3 className="font-medium text-cream/60 text-sm">{product.name}</h3>
            <p className="text-xs text-gold/60">{product.brand}</p>
            <p className="text-xs text-cream/50 line-clamp-2">{product.description}</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card
      className={`cursor-pointer transition-all duration-300 hover-lift ${
        isSelected
          ? "ring-2 ring-gold bg-gold/10 border-gold"
          : disabled
            ? "border-cream/10 opacity-50 cursor-not-allowed"
            : "border-cream/20 hover:border-gold/50"
      }`}
      onClick={disabled ? undefined : onSelect}
    >
      <CardContent className="p-4">
        <div className="relative mb-3">
          <img
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            className={`w-full h-32 object-cover rounded-lg transition-opacity duration-300 ${
              imageLoaded ? "opacity-100" : "opacity-0"
            }`}
            onLoad={() => setImageLoaded(true)}
          />
          {!imageLoaded && <div className="absolute inset-0 bg-cream/10 rounded-lg animate-pulse" />}

          {/* Selection indicator */}
          <div className="absolute top-2 right-2">
            <div
              className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                isSelected ? "bg-gold border-gold" : "bg-white/80 border-cream/40"
              }`}
            >
              {isSelected && <Check className="h-3 w-3 text-dark" />}
            </div>
          </div>
        </div>

        <div className="space-y-1">
          <h3 className={`font-medium text-sm transition-colors ${isSelected ? "text-gold" : "text-cream"}`}>
            {product.name}
          </h3>
          <p className="text-xs text-gold/80">{product.brand}</p>
          <p className="text-xs text-cream/70 line-clamp-2">{product.description}</p>
        </div>

        {/* Hidden checkbox for accessibility */}
        <Checkbox checked={isSelected} onChange={onSelect} className="sr-only" disabled={disabled} />
      </CardContent>
    </Card>
  )
}
