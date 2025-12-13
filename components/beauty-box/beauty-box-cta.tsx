"use client"

import { LuVelleButton } from "@/components/ui/luvelle-button"
import Link from "next/link"

export function BeautyBoxCTA() {
  return (
    <section className="py-20 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="glass-card p-12 text-center space-y-6">
          <h2 className="font-heading text-4xl md:text-5xl text-brand-gold">Empezá tu viaje de belleza hoy</h2>
          <p className="text-xl text-brand-cream/70 max-w-2xl mx-auto">
            Creá tu Beauty Box personalizada en minutos y recibí productos premium cada mes.
          </p>
          <LuVelleButton size="lg" asChild variant="gold" className="px-12">
            <Link href="/join">Crear mi Beauty Box ahora</Link>
          </LuVelleButton>
          <p className="text-sm text-brand-cream/50">Cancelá cuando quieras • Sin compromisos</p>
        </div>
      </div>
    </section>
  )
}
