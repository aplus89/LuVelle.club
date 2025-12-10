"use client"

import { Button } from "@/components/ui/button"
import { Package } from "lucide-react"

export function PartnersHero() {
  return (
    <section className="relative min-h-[70vh] flex items-center justify-center px-4 py-20 overflow-hidden">
      {/* Background accent with more gold */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-gold/10 via-transparent to-pro-accent/5" />

      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="text-center space-y-8">
          {/* Icon */}
          <div className="flex justify-center">
            <div className="w-20 h-20 rounded-2xl bg-brand-gold/20 flex items-center justify-center border border-brand-gold/30">
              <Package className="w-10 h-10 text-brand-gold" />
            </div>
          </div>

          {/* Title */}
          <div className="space-y-4">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold">
              <span className="text-brand-cream">Conectá tu marca con</span>
              <br />
              <span className="font-heading text-brand-gold">nuestra comunidad</span>
            </h1>
            <p className="text-2xl md:text-3xl text-brand-gold/80 font-semibold">Marcas & Productos</p>
          </div>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-brand-cream/70 max-w-3xl mx-auto leading-relaxed">
            Distribuí tus productos de belleza con una audiencia premium en Costa Rica y LATAM. Llegá a miles de mujeres
            apasionadas por la belleza.
          </p>

          {/* CTA */}
          <Button size="lg" asChild className="bg-brand-gold hover:bg-brand-gold/90 text-brand-dark px-8">
            <a href="#postular">Postular mi marca</a>
          </Button>
        </div>
      </div>
    </section>
  )
}
