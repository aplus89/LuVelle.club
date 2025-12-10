"use client"

import { Button } from "@/components/ui/button"

const whatsappUrl = "https://wa.me/15557792120?text=Hola!%20Quiero%20empezar%20con%20LuVelle%20Ai"

export function AiFinalCTA() {
  return (
    <section className="py-20 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="glass-card p-12 text-center space-y-6">
          <h2 className="font-heading text-4xl md:text-5xl text-brand-gold">Empezá tu viaje de bienestar hoy</h2>
          <p className="text-xl text-brand-cream/70 max-w-2xl mx-auto">
            Probá LuVelle Ai gratis y descubrí cómo la inteligencia artificial puede transformar tu rutina de belleza.
          </p>
          <Button size="lg" asChild className="bg-ai-accent hover:bg-ai-accent/90 text-white px-12">
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
              Empezar ahora por WhatsApp
            </a>
          </Button>
          <p className="text-sm text-brand-cream/50">Sin compromiso • Cancelá cuando quieras</p>
        </div>
      </div>
    </section>
  )
}
