"use client"

import { usePersona } from "@/components/persona-provider"
import { Button } from "@/components/ui/button"
import { GlassCard } from "@/components/ui/glass-card"
import Link from "next/link"

const ctaContent = {
  user: {
    title: "Comenzá tu viaje de belleza hoy",
    description: "Uníte a cientos de mujeres que ya transformaron su rutina de belleza con LuVelle.",
    buttonText: "Crear mi Beauty Box",
    href: "/join",
  },
  provider: {
    title: "Hacé crecer tu negocio con nosotras",
    description: "Uníte a nuestra red de proveedoras y llevá tus servicios al siguiente nivel.",
    buttonText: "Aplicar ahora",
    href: "/providers",
  },
  brand: {
    title: "Conectá tu marca con nuestra comunidad",
    description: "Distribuí tus productos con una audiencia premium y comprometida.",
    buttonText: "Postular mi marca",
    href: "/partners",
  },
}

export function FinalCTA() {
  const { persona } = usePersona()
  const content = ctaContent[persona]

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <GlassCard className="p-12 md:p-16 text-center max-w-4xl mx-auto">
          <h2 className="heading-font text-4xl md:text-5xl font-bold mb-6">{content.title}</h2>
          <p className="text-xl text-[hsl(var(--brand-cream))]/80 mb-8 max-w-2xl mx-auto">{content.description}</p>
          <Button asChild size="lg" className="glass-button text-lg px-12">
            <Link href={content.href}>{content.buttonText}</Link>
          </Button>
        </GlassCard>
      </div>
    </section>
  )
}
