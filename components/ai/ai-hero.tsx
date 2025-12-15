"use client"

import { LuVelleButton } from "@/components/ui/luvelle-button"
import { Sparkles } from "lucide-react"

const whatsappUrl = "https://wa.me/15557792120?text=Hola!%20Quiero%20probar%20LuVelle%20Ai"

export function AiHero() {
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center px-4 py-12 md:py-16 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-ai-accent/10 via-transparent to-transparent" />

      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="text-center space-y-8">
          <div className="flex justify-center">
            <div className="w-20 h-20 rounded-2xl bg-ai-accent/20 flex items-center justify-center border border-ai-accent/30">
              <Sparkles className="w-10 h-10 text-ai-accent" />
            </div>
          </div>

          <div className="space-y-4">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold">
              <span className="font-heading text-brand-gold">LuVelle Ai</span>
            </h1>
            <p className="text-2xl md:text-3xl text-brand-cream font-light">
              El chat de WhatsApp que te ayuda a cuidar tu belleza como una amiga experta
            </p>
          </div>

          <p className="text-lg md:text-xl text-brand-cream/70 max-w-3xl mx-auto leading-relaxed">
            Recomendaciones personalizadas, acceso a proveedores y productos de confianza, y una compañera 24/7 que
            siempre está disponible para ayudarte con tu bienestar.
          </p>

          <div className="max-w-md mx-auto mt-12">
            <div className="bg-white/5 backdrop-blur-sm border border-brand-gold/20 rounded-2xl p-4">
              <p className="text-sm text-brand-cream/80 mb-4 text-center font-semibold">
                Así se ve una conversación típica:
              </p>
              <div className="space-y-3">
                <div className="bg-white/10 rounded-lg p-3 text-left">
                  <p className="text-xs text-brand-cream/90">
                    💅 "¿Qué tratamiento me recomendás para uñas quebradizas?"
                  </p>
                </div>
                <div className="bg-brand-gold/20 rounded-lg p-3 text-right ml-8">
                  <p className="text-xs text-brand-cream">
                    Te recomiendo un fortalecedor con biotina. Acá cerca tenés a Ana, especialista en manicure...
                  </p>
                </div>
                <div className="bg-white/10 rounded-lg p-3 text-left">
                  <p className="text-xs text-brand-cream/90">💅 "Necesito un labial para piel morena"</p>
                </div>
              </div>
              <p className="text-xs text-brand-gold text-center mt-4 font-semibold">
                Más de 10,000+ consultas resueltas para mujeres como vos
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <LuVelleButton asChild size="lg" variant="gold">
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                Probar gratis en WhatsApp
              </a>
            </LuVelleButton>
            <LuVelleButton asChild size="lg" variant="outline">
              <a href="#planes">Unirme al Club LuVelle</a>
            </LuVelleButton>
          </div>

          <p className="text-sm text-brand-cream/50 pt-4">Sin tarjeta de crédito requerida • Cancelá cuando quieras</p>
        </div>
      </div>
    </section>
  )
}
