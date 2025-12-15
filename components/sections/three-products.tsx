"use client"

import { useEffect, useRef } from "react"
import Link from "next/link"
import { Sparkles, Briefcase } from "lucide-react"
import { LuVelleButton } from "@/components/ui/luvelle-button"
import { GlassCard } from "@/components/ui/glass-card"

const whatsappUrl = "https://wa.me/15557792120?text=Hola!%20Quiero%20probar%20LuVelle%20Ai"

function CylinderBoxIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="12" cy="7" rx="7" ry="3" stroke="currentColor" strokeWidth="1.5" fill="none" />
      <path d="M5 7 L5 17 Q5 20 12 20 Q19 20 19 17 L19 7" stroke="currentColor" strokeWidth="1.5" fill="none" />
      <ellipse
        cx="12"
        cy="17"
        rx="7"
        ry="3"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="currentColor"
        fillOpacity="0.1"
      />
    </svg>
  )
}

const products = [
  {
    id: "ai",
    label: "Para vos",
    icon: Sparkles,
    title: "LuVelle Ai",
    subtitle: "El chat de WhatsApp que te ayuda a cuidar tu belleza como una amiga experta.",
    microcopy: "Sentí que chateás con una amiga experta, no con un bot.",
    features: ["Recomendaciones personalizadas", "Encuentra servicios y productos", "Tips de belleza y bienestar"],
    bgClass: "bg-[#141322]/80 backdrop-blur-md border-[#1A5276]",
    iconBg: "bg-[#1A5276]/20 border border-[#1A5276]/30",
    iconColor: "text-[#f4cc6e]",
    textColor: "text-[#f4cc6e]",
    secondaryText: "text-[#efedea]/70",
    ctaText: "Probar gratis en WhatsApp",
    ctaHref: whatsappUrl,
    ctaVariant: "blue" as const,
    external: true,
    popular: false,
  },
  {
    id: "pro",
    label: "Para profesionales",
    icon: Briefcase,
    title: "LuVelle Pro",
    subtitle: "Convertí tu talento en ingresos constantes, sin hacer malabares con WhatsApp, Excel y agendas de papel.",
    microcopy: "No estás sola: sumate a una red de profesionales que crecen juntas.",
    features: ["Más clientas", "Menos desorden", "Pagos claros y a tiempo"],
    bgClass: "bg-[#1A5276]/80 backdrop-blur-md border-[#f4cc6e]",
    iconBg: "bg-[#f4cc6e]/20 border border-[#f4cc6e]/30",
    iconColor: "text-[#f4cc6e]",
    textColor: "text-[#f4cc6e]",
    secondaryText: "text-[#efedea]/70",
    ctaText: "Descubrir LuVelle Pro",
    ctaHref: "/providers",
    ctaVariant: "gold" as const,
    external: false,
    popular: true,
  },
  {
    id: "box",
    label: "Para regalos y sorpresas",
    icon: CylinderBoxIcon,
    title: "The Beauty Box",
    subtitle: "Una caja sorpresa creada solo para vos (o para alguien que querés), todos los meses.",
    microcopy: "Elegí los mimos que te querés dar este mes.",
    features: ["Personalización total", "Ahorro percibido", "Experiencia aspiracional"],
    bgClass: "bg-[#f4cc6e]/10 backdrop-blur-md border-[#f4cc6e]",
    iconBg: "bg-[#f4cc6e]/20 border border-[#f4cc6e]/30",
    iconColor: "text-[#f4cc6e]",
    textColor: "text-white",
    secondaryText: "text-[#efedea]/80",
    ctaText: "Crear mi Beauty Box",
    ctaHref: "/beauty-box",
    ctaVariant: "gold" as const,
    external: false,
    popular: false,
  },
]

export function ThreeProducts() {
  const cardsRef = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -100px 0px",
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = cardsRef.current.indexOf(entry.target as HTMLDivElement)
          entry.target.classList.add("animate-fade-in-up")
          ;(entry.target as HTMLElement).style.animationDelay = `${index * 0.15}s`
        }
      })
    }, observerOptions)

    cardsRef.current.forEach((card) => {
      if (card) observer.observe(card)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <section className="py-12 md:py-16 px-4" id="productos">
      <div className="container mx-auto max-w-7xl">
        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          {products.map((product, index) => {
            const Icon = product.icon
            return (
              <div
                key={product.id}
                ref={(el) => {
                  cardsRef.current[index] = el
                }}
                className="opacity-0"
              >
                <GlassCard
                  className={`p-6 md:p-8 h-full ${product.bgClass} ${product.popular ? "ring-2 ring-[#f4cc6e] scale-105" : ""}`}
                >
                  <div className="space-y-6 relative z-10">
                    {product.popular && (
                      <div className="flex justify-between items-center">
                        <div className="bg-white/10 text-white text-xs font-bold uppercase px-3 py-1 rounded-full ring-1 ring-white/20">
                          Más popular
                        </div>
                      </div>
                    )}

                    <div className="flex items-center justify-between">
                      <span className={`text-xs uppercase tracking-wider font-semibold ${product.secondaryText}`}>
                        {product.label}
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      <div
                        className={`w-12 h-12 rounded-xl ${product.iconBg} flex items-center justify-center flex-shrink-0 transition-transform duration-300 hover:scale-110`}
                      >
                        <Icon className={`w-6 h-6 ${product.iconColor}`} />
                      </div>
                      <h3 className={`font-heading text-2xl ${product.textColor}`}>{product.title}</h3>
                    </div>

                    <p className={product.secondaryText}>{product.subtitle}</p>

                    {/* Microcopy */}
                    <p className={`text-sm italic ${product.secondaryText}`}>"{product.microcopy}"</p>

                    {/* Features */}
                    <ul className="space-y-3 flex-grow">
                      {product.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm">
                          <span className={`${product.textColor} mt-1`}>•</span>
                          <span className={product.secondaryText}>{feature}</span>
                        </li>
                      ))}
                    </ul>

                    {/* CTA */}
                    {product.external ? (
                      <LuVelleButton asChild variant={product.ctaVariant} className="w-full">
                        <a href={product.ctaHref} target="_blank" rel="noopener noreferrer">
                          {product.ctaText}
                        </a>
                      </LuVelleButton>
                    ) : (
                      <LuVelleButton asChild variant={product.ctaVariant} className="w-full">
                        <Link href={product.ctaHref}>{product.ctaText}</Link>
                      </LuVelleButton>
                    )}
                  </div>
                </GlassCard>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
