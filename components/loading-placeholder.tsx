"use client"

import { Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { GlassCard } from "@/components/ui/glass-card"

interface LoadingPlaceholderProps {
  message?: string
  onRetry?: () => void
}

export function LoadingPlaceholder({
  message = "Estamos alistando tu experiencia...",
  onRetry,
}: LoadingPlaceholderProps) {
  return (
    <GlassCard className="p-12 text-center max-w-md mx-auto">
      <div className="flex justify-center mb-6">
        <Sparkles className="w-16 h-16 text-[hsl(var(--brand-gold))] animate-pulse" />
      </div>
      <p className="text-lg text-[hsl(var(--brand-cream))] mb-6">{message}</p>
      {onRetry && (
        <Button onClick={onRetry} className="glass-button">
          Reintentar
        </Button>
      )}
    </GlassCard>
  )
}
