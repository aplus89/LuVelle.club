"use client"

import { useEffect, useRef } from "react"
import Link from "next/link"
import { Sparkles, Box, Briefcase } from "lucide-react"
import { Button } from "@/components/ui/button"

const whatsappUrl = "https://wa.me/15557792120?text=Hola!%20Quiero%20probar%20LuVelle%20Ai"

const products = [
  {
    id: "ai",
    icon: Sparkles,
    title: "LuVelle Ai",
    subtitle: "Tu asistente de bienestar 24/7 en WhatsApp.",
    features: ["Recomendaciones personalizadas", "Encuentra servicios y productos", "Tips de belleza y bienestar"],
    bgColor: "bg-[#141322]",
    accentColor: "bg-[#1A5276]",
    iconBg: "bg-[#1A5276]", // Color distintivo para icono
    textColor: "text-[#f4cc6e]",
    borderColor: "border-[#1A5276]",
    ctaText: "Probar gratis en WhatsApp",
    ctaHref: whatsappUrl,
    ctaButtonBg: "bg-[#1A5276]",
    ctaButtonText: "text-[#f4cc6e]", // Texto claro en botón con fondo oscuro
    external: true,
  },
  {
    id: "pro",
    icon: Briefcase,
    title: "LuVelle Pro",
    subtitle: "Herramientas para proveedoras de servicios y marcas.",
    features: ["Conectá con clientas", "Gestión simplificada", "Crece tu negocio"],
    bgColor: "bg-[#1b5276]",
    accentColor: "bg-[#f4cc6e]",
    iconBg: "bg-[#f4cc6e]", // Color distintivo para icono
    textColor: "text-[#f4cc6e]",
    borderColor: "border-[#f4cc6e]",
    secondaryText: "text-[#efedea]",
    ctaText: "Descubrir LuVelle Pro",
    ctaHref: "/providers",
    ctaButtonBg: "bg-[#f4cc6e]",
    ctaButtonText: "text-[#1b5276]", // Texto oscuro en botón con fondo claro
    external: false,
  },
  {
    id: "box",
    icon: Box,
    title: "The Beauty Box",
    subtitle: "Personalizá tu caja mensual de belleza y bienestar.",
    features: ["Productos curados mensualmente", "Personalización total", "Descuentos exclusivos"],
    bgColor: "bg-[#f4cc6e]",
    accentColor: "bg-[#141321]",
    iconBg: "bg-[#141321]", // Color distintivo para icono
    textColor: "text-[#141321]",
    borderColor: "border-[#141321]",
    secondaryText: "text-[#141321]",
    ctaText: "Crear mi Beauty Box",
    ctaHref: "/beauty-box",
    ctaButtonBg: "bg-[#141321]",
    ctaButtonText: "text-[#e8ded3]", // Texto claro en botón con fondo oscuro
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
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-fade-in-up")
          entry.target.style.animationDelay = `${index * 0.15}s`
          entry.target.style.animationFillMode = "forwards"
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
                className={`${product.bgColor} p-8 border-l-4 ${product.borderColor} opacity-0 hover:scale-105 transition-all duration-300 rounded-2xl shadow-2xl`}
              >
                <div className="space-y-6">
                  {/* Icon */}
                  <div className={`w-14 h-14 rounded-xl ${product.iconBg} flex items-center justify-center`}>
                    <Icon
                      className={`w-7 h-7 ${product.id === "box" ? "text-[#f4cc6e]" : product.id === "pro" ? "text-[#1b5276]" : "text-[#f4cc6e]"}`}
                    />
                  </div>

                  {/* Title */}
                  <div>
                    <h3 className={`font-heading text-3xl ${product.textColor} mb-2`}>{product.title}</h3>
                    <p className={product.secondaryText || "text-white/70"}>{product.subtitle}</p>
                  </div>

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
                      className={`w-full ${product.ctaButtonBg} hover:opacity-90 ${product.ctaButtonText} font-semibold`}
                    >
                      <a href={product.ctaHref} target="_blank" rel="noopener noreferrer">
                        {product.ctaText}
                      </a>
                    </Button>
                  ) : (
                    <Button
                      asChild
                      className={`w-full ${product.ctaButtonBg} hover:opacity-90 ${product.ctaButtonText} font-semibold`}
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
