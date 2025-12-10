"use client"

import { Button } from "@/components/ui/button"
import { Briefcase } from "lucide-react"

export function ProvidersHero() {
  return (
    <section className="relative min-h-[70vh] flex items-center justify-center px-4 py-20 overflow-hidden">
      {/* Background accent */}
      <div className="absolute inset-0 bg-gradient-to-br from-pro-accent/10 via-transparent to-transparent" />

      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="text-center space-y-8">
          {/* Icon */}
          <div className="flex justify-center">
            <div className="w-20 h-20 rounded-2xl bg-pro-accent/20 flex items-center justify-center border border-pro-accent/30">
              <Briefcase className="w-10 h-10 text-pro-accent" />
            </div>
          </div>

          {/* Title */}
          <div className="space-y-4">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold">
              <span className="text-brand-cream">Crecé tu negocio con</span>
              <br />
              <span className="font-heading text-brand-gold">LuVelle Pro</span>
            </h1>
            <p className="text-2xl md:text-3xl text-pro-accent font-semibold">Profesionales de belleza y bienestar</p>
          </div>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-brand-cream/70 max-w-3xl mx-auto leading-relaxed">
            Conseguí clientas, reservas y pagos en un solo lugar. Simplificá tu negocio y enfocáte en lo que mejor
            hacés.
          </p>

          {/* CTA */}
          <Button size="lg" asChild className="bg-pro-accent hover:bg-pro-accent/90 text-white px-8">
            <a href="#planes">Conocer planes Pro</a>
          </Button>
        </div>
      </div>
    </section>
  )
}
