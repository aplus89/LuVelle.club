"use client"

import { useEffect, useRef } from "react"
import Link from "next/link"
import { Sparkles, Briefcase } from "lucide-react"
import { Button } from "@/components/ui/button"

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
    features: ["Recomendaciones personalizadas", "Encuentra servicios y productos", "Tips de belleza y bienestar"],
    bgColor: "bg-[#141322]",
    iconBg: "bg-[#1A5276]",
    textColor: "text-[#f4cc6e]",
    borderColor: "border-[#1A5276]",
    ctaText: "Probar gratis en WhatsApp",
    ctaHref: whatsappUrl,
    ctaButtonBg: "bg-[#1A5276] hover:bg-[#1A5276]/90",
    ctaButtonText: "text-[#f4cc6e]",
    external: true,
  },
  {
    id: "pro",
    label: "Para profesionales",
    icon: Briefcase,
    title: "LuVelle Pro",
    subtitle: "Convertí tu talento en ingresos constantes, sin hacer malabares con WhatsApp, Excel y agendas de papel.",
    features: ["Más clientas", "Menos desorden", "Pagos claros y a tiempo"],
    bgColor: "bg-[#1b5276]",
    iconBg: "bg-[#f4cc6e]",
    textColor: "text-[#f4cc6e]",
    borderColor: "border-[#f4cc6e]",
    secondaryText: "text-[#efedea]",
    ctaText: "Descubrir LuVelle Pro",
    ctaHref: "/providers",
    ctaButtonBg: "bg-[#f4cc6e] hover:bg-[#f4cc6e]/90",
    ctaButtonText: "text-[#1b5276]",
    external: false,
  },
  {
    id: "box",
    label: "Para regalos y sorpresas",
    icon: CylinderBoxIcon,
    title: "The Beauty Box",
    subtitle: "Una caja sorpresa creada solo para vos (o para alguien que querés), todos los meses.",
    features: ["Personalización total", "Ahorro percibido", "Experiencia aspiracional"],
    bgColor: "bg-[#f4cc6e]",
    iconBg: "bg-[#141321]",
    textColor: "text-[#141321]",
    borderColor: "border-[#141321]",
    secondaryText: "text-[#141321]/80",
    ctaText: "Crear mi Beauty Box",
    ctaHref: "/beauty-box",
    ctaButtonBg: "bg-[#141321] hover:bg-[#141321]/90",
    ctaButtonText: "text-[#e8ded3]",
    external: false,
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
    <section className="py-16 md:py-24 px-4" id="productos">
      <div className="container mx-auto max-w-7xl">
        <div className="grid md:grid-cols-3 gap-8">
          {products.map((product, index) => {
            const Icon = product.icon
            return (
              <div
                key={product.id}
                ref={(el) => {
                  cardsRef.current[index] = el
                }}
                className={`${product.bgColor} p-8 border-l-4 ${product.borderColor} opacity-0 hover:scale-105 hover:shadow-2xl transition-all duration-300 rounded-2xl shadow-xl relative overflow-hidden group`}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(244,204,110,0.15),transparent_50%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="space-y-6 relative z-10">
                  <div className="flex items-center justify-between">
                    <span
                      className={`text-xs uppercase tracking-wider font-semibold ${product.secondaryText || "text-white/60"}`}
                    >
                      {product.label}
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <div
                      className={`w-12 h-12 rounded-xl ${product.iconBg} flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-110`}
                    >
                      <Icon
                        className={`w-6 h-6 ${product.id === "box" ? "text-[#f4cc6e]" : product.id === "pro" ? "text-[#1b5276]" : "text-[#f4cc6e]"}`}
                      />
                    </div>
                    <h3 className={`font-heading text-2xl ${product.textColor}`}>{product.title}</h3>
                  </div>

                  <p className={product.secondaryText || "text-white/70"}>{product.subtitle}</p>

                  {/* Features */}
                  <ul className="space-y-3">
                    {product.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm">
                        <span className={`${product.textColor} mt-1`}>•</span>
                        <span className={product.secondaryText || "text-white/80"}>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  {product.external ? (
                    <Button
                      asChild
                      className={`w-full ${product.ctaButtonBg} ${product.ctaButtonText} font-semibold transition-all duration-300`}
                    >
                      <a href={product.ctaHref} target="_blank" rel="noopener noreferrer">
                        {product.ctaText}
                      </a>
                    </Button>
                  ) : (
                    <Button
                      asChild
                      className={`w-full ${product.ctaButtonBg} ${product.ctaButtonText} font-semibold transition-all duration-300`}
                    >
                      <Link href={product.ctaHref}>{product.ctaText}</Link>
                    </Button>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
