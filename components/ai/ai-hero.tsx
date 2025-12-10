"use client"

import { Button } from "@/components/ui/button"
import { Sparkles } from "lucide-react"

const whatsappUrl = "https://wa.me/15557792120?text=Hola!%20Quiero%20probar%20LuVelle%20Ai"

export function AiHero() {
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center px-4 py-20 overflow-hidden">
      {/* Background accent */}
      <div className="absolute inset-0 bg-gradient-to-br from-ai-accent/10 via-transparent to-transparent" />

      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="text-center space-y-8">
          {/* Icon */}
          <div className="flex justify-center">
            <div className="w-20 h-20 rounded-2xl bg-ai-accent/20 flex items-center justify-center border border-ai-accent/30">
              <Sparkles className="w-10 h-10 text-ai-accent" />
            </div>
          </div>

          {/* Title */}
          <div className="space-y-4">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold">
              <span className="font-heading text-brand-gold">LuVelle Ai</span>
            </h1>
            <p className="text-2xl md:text-3xl text-brand-cream font-light">Tu asistente de bienestar en WhatsApp</p>
          </div>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-brand-cream/70 max-w-3xl mx-auto leading-relaxed">
            Preguntá por productos, servicios y rutinas personalizadas. Recibí recomendaciones inteligentes 24/7,
            directamente en tu WhatsApp.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <Button asChild size="lg" className="bg-ai-accent hover:bg-ai-accent/90 text-white px-8">
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                Probar gratis en WhatsApp
              </a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-brand-gold text-brand-gold hover:bg-brand-gold/10 bg-transparent"
            >
              <a href="#planes">Unirme al Club LuVelle</a>
            </Button>
          </div>

          {/* Trust badge */}
          <p className="text-sm text-brand-cream/50 pt-4">Sin tarjeta de crédito requerida • Cancelá cuando quieras</p>
        </div>
      </div>
    </section>
  )
}
