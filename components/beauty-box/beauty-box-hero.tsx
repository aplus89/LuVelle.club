"use client"

import { Button } from "@/components/ui/button"
import { Box } from "lucide-react"
import Link from "next/link"

export function BeautyBoxHero() {
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center px-4 py-20 overflow-hidden">
      {/* Background accent */}
      <div className="absolute inset-0 bg-gradient-to-br from-box-gold/5 via-transparent to-box-cream/5" />

      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="text-center space-y-8">
          {/* Icon */}
          <div className="flex justify-center">
            <div className="w-20 h-20 rounded-2xl bg-box-gold/20 flex items-center justify-center border border-box-gold/30">
              <Box className="w-10 h-10 text-box-gold" />
            </div>
          </div>

          {/* Title */}
          <div className="space-y-4">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold">
              <span className="font-heading text-brand-gold">The Beauty Box</span>
            </h1>
            <p className="text-2xl md:text-3xl text-brand-cream font-light">
              Personalizá tu caja mensual de belleza y bienestar
            </p>
          </div>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-brand-cream/70 max-w-3xl mx-auto leading-relaxed">
            Recibí productos premium de skincare, maquillaje y más, curados especialmente para vos cada mes. Tu belleza,
            tu estilo, tu caja.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <Button asChild size="lg" className="bg-box-gold hover:bg-box-gold/90 text-brand-dark px-8">
              <Link href="/join">Crear mi Beauty Box</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-brand-gold text-brand-gold hover:bg-brand-gold/10 bg-transparent"
            >
              <a href="#planes">Ver planes</a>
            </Button>
          </div>

          {/* Trust badge */}
          <p className="text-sm text-brand-cream/50 pt-4">Cancelá cuando quieras • Envíos a toda Costa Rica</p>
        </div>
      </div>
    </section>
  )
}
