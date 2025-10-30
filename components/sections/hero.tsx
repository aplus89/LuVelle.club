"use client"

import { usePersona } from "@/components/persona-provider"
import { PersonaSwitch } from "@/components/ui/persona-switch"
import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"
import Link from "next/link"

const heroContent = {
  user: {
    title: "Tu belleza, curada con amor.",
    subtitle: "Recibe cada mes una caja personalizada con los mejores productos de belleza seleccionados para ti.",
    bullets: [
      "Productos premium de marcas reconocidas",
      "Personalización según tu tipo de piel y preferencias",
      "Envío gratis en toda Costa Rica",
    ],
    cta1: { text: "Crear mi Beauty Box", href: "/join" },
    cta2: { text: "Ver planes", href: "#planes" },
  },
  provider: {
    title: "Crece tu negocio con LuVelle.",
    subtitle: "Únete a nuestra red de proveedoras y lleva tus servicios de belleza a miles de mujeres en Costa Rica.",
    bullets: [
      "Acceso a una comunidad premium de clientas",
      "Gestión simplificada de reservas y pagos",
      "Marketing y promoción incluidos",
    ],
    cta1: { text: "Aplicar como Proveedora", href: "/providers" },
    cta2: { text: "Agendar llamada", href: "https://calendly.com/luvelle", external: true },
  },
  brand: {
    title: "Distribuí tus productos con una comunidad premium.",
    subtitle: "Conecta tu marca con miles de mujeres apasionadas por la belleza en Costa Rica.",
    bullets: [
      "Exposición a una audiencia calificada y comprometida",
      "Distribución mensual garantizada",
      "Feedback directo de usuarias reales",
    ],
    cta1: { text: "Postular mi marca", href: "/partners" },
    cta2: { text: "Hablar por WhatsApp", href: "https://wa.me/15557792120", external: true },
  },
}

export function Hero() {
  const { persona } = usePersona()
  const content = heroContent[persona]

  return (
    <section id="inicio" className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="/elegant-woman-holding-luxury-beauty-box-with-soft-.jpg"
          alt="LuVelle Beauty Box"
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[hsl(var(--brand-dark))]/60 via-[hsl(var(--brand-dark))]/80 to-[hsl(var(--brand-dark))]" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          {/* Persona Switch */}
          <PersonaSwitch />

          {/* Title */}
          <h1 className="heading-font text-5xl md:text-7xl font-bold text-balance leading-tight">{content.title}</h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-[hsl(var(--brand-cream))]/90 text-balance max-w-2xl mx-auto">
            {content.subtitle}
          </p>

          {/* Bullets */}
          <div className="flex flex-col md:flex-row gap-4 justify-center items-start md:items-center text-left md:text-center max-w-3xl mx-auto">
            {content.bullets.map((bullet, index) => (
              <div key={index} className="flex items-center gap-2">
                <Check className="w-5 h-5 text-[hsl(var(--brand-gold))] flex-shrink-0" />
                <span className="text-[hsl(var(--brand-cream))]">{bullet}</span>
              </div>
            ))}
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Button asChild size="lg" className="glass-button text-lg px-8">
              {content.cta1.external ? (
                <a href={content.cta1.href} target="_blank" rel="noopener noreferrer">
                  {content.cta1.text}
                </a>
              ) : (
                <Link href={content.cta1.href}>{content.cta1.text}</Link>
              )}
            </Button>
            <Button asChild size="lg" variant="outline" className="glass-button-outline text-lg px-8 bg-transparent">
              {content.cta2.external ? (
                <a href={content.cta2.href} target="_blank" rel="noopener noreferrer">
                  {content.cta2.text}
                </a>
              ) : (
                <a href={content.cta2.href}>{content.cta2.text}</a>
              )}
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
