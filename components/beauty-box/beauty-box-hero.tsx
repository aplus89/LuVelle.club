"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"

export function BeautyBoxHero() {
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center px-4 py-20 overflow-hidden">
      {/* Background accent */}
      <div className="absolute inset-0 bg-gradient-to-br from-box-gold/5 via-transparent to-box-cream/5" />

      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left - Text Content */}
          <div className="text-center md:text-left space-y-8">
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
            <p className="text-lg md:text-xl text-brand-cream/70 max-w-xl leading-relaxed">
              Recibí productos premium de skincare, maquillaje y más, curados especialmente para vos cada mes. Tu
              belleza, tu estilo, tu caja.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start items-center pt-4">
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

          <div className="relative flex items-center justify-center">
            <div className="relative w-full max-w-md">
              {/* Glow effect behind */}
              <div
                className="absolute inset-0 rounded-full"
                style={{
                  background: "radial-gradient(ellipse at center, rgba(244, 204, 110, 0.3) 0%, transparent 70%)",
                  filter: "blur(40px)",
                  transform: "scale(1.2)",
                }}
              />
              {/* Products image */}
              <Image
                src="/images/the-beauty-box-products.svg"
                alt="Productos de The Beauty Box"
                width={500}
                height={500}
                className="w-full h-auto relative z-10 drop-shadow-2xl"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
