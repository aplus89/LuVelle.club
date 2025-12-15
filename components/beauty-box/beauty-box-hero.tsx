"use client"

import Link from "next/link"
import Image from "next/image"
import { LuVelleButton } from "@/components/ui/luvelle-button"

export function BeautyBoxHero() {
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center px-4 py-12 md:py-16 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-box-gold/5 via-transparent to-box-cream/5" />

      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="text-left space-y-8">
            <div className="space-y-4">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold">
                <span className="heading-accent">The Beauty Box</span>
              </h1>
              <p className="text-2xl md:text-3xl text-brand-cream font-light">
                Una caja sorpresa creada solo para vos (o para alguien que querés)
              </p>
            </div>

            <p className="text-lg md:text-xl text-brand-cream/70 max-w-xl leading-relaxed">
              Personalización total, ahorro real y una experiencia aspiracional. Abrir tu Beauty Box es un ritual
              mensual que te mereces.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start items-center pt-4">
              <LuVelleButton asChild size="lg" variant="gold">
                <Link href="/join">Crear mi Beauty Box</Link>
              </LuVelleButton>
              <LuVelleButton asChild size="lg" variant="outline">
                <a href="#planes">Ver planes</a>
              </LuVelleButton>
            </div>

            <p className="text-sm text-brand-cream/50 pt-4">Cancelá cuando quieras • Envíos a toda Costa Rica</p>
          </div>

          <div className="relative flex items-center justify-center">
            <div className="relative w-full max-w-md">
              <div
                className="absolute inset-0 rounded-full"
                style={{
                  background: "radial-gradient(ellipse at center, rgba(244, 204, 110, 0.3) 0%, transparent 70%)",
                  filter: "blur(40px)",
                  transform: "scale(1.2)",
                }}
              />
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
