"use client"

import { LuVelleButton } from "@/components/ui/luvelle-button"

export function ProvidersHero() {
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center px-4 py-12 md:py-16 overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/images/gemini-generated-image-nsehmznsehmznseh.png')",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#141322]/90 via-[#141322]/80 to-[#141322]" />

      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="text-center space-y-8">
          <div className="space-y-4">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold">
              <span className="text-[#e8ded3]">Convertí tu talento en</span>
              <br />
              <span className="font-heading text-[#f4cc6e]">ingresos constantes</span>
            </h1>
            <p className="text-2xl md:text-3xl text-[#1A5276] font-semibold">
              Sin hacer malabares con WhatsApp, Excel y agendas de papel
            </p>
          </div>

          <p className="text-lg md:text-xl text-[#e8ded3]/80 max-w-3xl mx-auto leading-relaxed">
            Más clientas. Menos desorden. Pagos claros y a tiempo. LuVelle Pro te da las herramientas para crecer.
          </p>

          <LuVelleButton size="lg" asChild variant="gold">
            <a href="#planes">Conocer planes Pro</a>
          </LuVelleButton>
        </div>
      </div>
    </section>
  )
}
