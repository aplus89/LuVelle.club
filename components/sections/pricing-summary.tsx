"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { LuVelleButton } from "@/components/ui/luvelle-button"
import { ChevronDown, Sparkles, Box, Briefcase } from "lucide-react"

const pricingData = [
  {
    id: "ai",
    title: "LuVelle Ai",
    icon: Sparkles,
    description: "Tu asistente personal de belleza con inteligencia artificial",
    bgColor: "bg-[#141322]",
    textColor: "text-[#eae0d5]",
    accentColor: "text-[#1A5276]",
    borderColor: "border-[#1A5276]/30",
    plans: [
      {
        name: "Free",
        price: "₡0",
        period: "",
        features: ["IA básica en WhatsApp", "Recomendaciones limitadas", "Sin cashback"],
        referralPercent: 0,
      },
      {
        name: "Club LuVelle",
        price: "$3.99",
        period: "/mes",
        features: ["Recomendaciones ilimitadas", "Cashback en compras", "Contenido exclusivo"],
        popular: false,
        referralPercent: 3,
      },
      {
        name: "LuVelle Plus",
        price: "$6.99",
        period: "/mes",
        features: ["Todo lo anterior", "Mayor % de cashback", "Prioridad en respuestas", "Eventos exclusivos"],
        popular: true,
        referralPercent: 5,
      },
    ],
    ctaText: "Ver planes Ai",
    ctaHref: "/ai",
  },
  {
    id: "pro",
    title: "LuVelle Pro",
    icon: Briefcase,
    description: "Para profesionales de belleza y marcas aliadas",
    bgColor: "bg-[#1b5276]",
    textColor: "text-[#efedea]",
    accentColor: "text-[#f4cc6e]",
    borderColor: "border-[#f4cc6e]/30",
    plans: [
      {
        name: "Prueba Gratis",
        price: "$0",
        period: "/1er mes",
        features: ["Acceso completo Pro Plus", "Todas las funciones IA", "Sin compromiso", "Decidí después del mes"],
      },
      {
        name: "Pro",
        price: "$9.99",
        period: "/mes",
        features: ["Perfil público profesional", "Agenda básica", "Soporte básico", "Comisión reducida"],
      },
      {
        name: "Pro Plus",
        price: "$14.99",
        period: "/mes",
        features: [
          "Agenda inteligente con IA",
          "IA para recomendaciones",
          "Soporte VIP prioritario",
          "Comisión mínima",
        ],
        popular: true,
      },
    ],
    note: "Primer mes gratis para nuevos profesionales",
    ctaText: "Ver beneficios Pro",
    ctaHref: "/providers",
  },
  {
    id: "box",
    title: "The Beauty Box",
    icon: Box,
    description: "Caja de productos personalizados para vos",
    bgColor: "bg-[#141321]",
    textColor: "text-[#e8ded3]",
    accentColor: "text-[#f4cc6e]",
    borderColor: "border-[#f4cc6e]/30",
    plans: [
      {
        name: "Esencial",
        price: "$59.99",
        period: "/mes",
        features: ["3 productos seleccionados", "Personalización básica", "Envío incluido"],
      },
      {
        name: "Premium",
        price: "$79.99",
        period: "/mes",
        features: [
          "5 productos premium",
          "Mayor personalización",
          "Productos exclusivos",
          "3% cashback en referidos",
          "Envío prioritario",
        ],
        popular: true,
      },
      {
        name: "Deluxe",
        price: "$99.99+",
        period: "/mes",
        features: [
          "7+ productos de lujo",
          "Personalización completa",
          "Marcas premium exclusivas",
          "8% cashback en referidos",
          "Envío express",
        ],
      },
    ],
    note: "Precios de lanzamiento. Sujetos a cambios.",
    ctaText: "Crear mi Beauty Box",
    ctaHref: "/beauty-box",
  },
]

export function PricingSummary() {
  const [openSection, setOpenSection] = useState<string | null>(null)
  const sectionRefs = useRef<{ [key: string]: HTMLDivElement | null }>({})
  const titleRefs = useRef<(HTMLDivElement | null)[]>([])
  const toggleRefs = useRef<{ [key: string]: HTMLDivElement | null }>({})

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in-up")
            entry.target.style.animationDelay = `${index * 0.15}s`
            entry.target.style.animationFillMode = "forwards"
          }
        })
      },
      { threshold: 0.1 },
    )

    titleRefs.current.forEach((title) => {
      if (title) observer.observe(title)
    })

    return () => observer.disconnect()
  }, [])

  const toggleSection = (id: string) => {
    const isOpening = openSection !== id
    setOpenSection(openSection === id ? null : id)

    if (isOpening) {
      requestAnimationFrame(() => {
        toggleRefs.current[id]?.scrollIntoView({ behavior: "smooth", block: "start" })
      })
    }
  }

  return (
    <section className="py-16 md:py-24 px-4 bg-white/[0.02]" id="planes">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-12 opacity-0 animate-fade-in-up" style={{ animationFillMode: "forwards" }}>
          <h2 className="font-heading text-4xl md:text-5xl text-[#f4cc6e] mb-4">Planes y precios</h2>
          <p className="text-lg text-[#eae0d5]/70 max-w-2xl mx-auto">
            Elegí la línea de LuVelle que mejor se adapte a vos
          </p>
        </div>

        <div className="space-y-4 max-w-5xl mx-auto">
          {pricingData.map((product, index) => {
            const Icon = product.icon
            const isOpen = openSection === product.id

            return (
              <div
                key={product.id}
                ref={(el) => {
                  titleRefs.current[index] = el
                  toggleRefs.current[product.id] = el
                }}
                className={`opacity-0 overflow-hidden rounded-2xl border border-white/10 transition-all duration-500 ${product.bgColor}`}
              >
                <button
                  onClick={() => toggleSection(product.id)}
                  className={`w-full p-6 md:p-8 flex items-center justify-between transition-all duration-300 ${product.textColor}`}
                >
                  <div className="flex items-center gap-4 text-left">
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${product.accentColor} bg-white/10`}
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-heading text-2xl md:text-3xl mb-1">{product.title}</h3>
                      <p className="text-sm opacity-70">{product.description}</p>
                    </div>
                  </div>
                  <ChevronDown className={`w-6 h-6 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
                </button>

                <div
                  ref={(el) => {
                    sectionRefs.current[product.id] = el
                  }}
                  className={`transition-all duration-500 ease-in-out ${
                    isOpen ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0"
                  }`}
                  style={{
                    transitionProperty: "max-height, opacity",
                  }}
                >
                  <div className="px-6 md:px-8 pb-8">
                    <div className={`grid ${product.id === "pro" ? "md:grid-cols-3" : "md:grid-cols-3"} gap-6 mb-6`}>
                      {product.plans.map((plan, idx) => (
                        <div
                          key={idx}
                          className={`relative p-6 rounded-xl border ${product.borderColor} backdrop-blur-sm ${
                            plan.popular ? "bg-white/10 ring-2 ring-white/20" : "bg-white/5"
                          }`}
                        >
                          {plan.popular && (
                            <div
                              className={`absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-xs font-bold bg-white/20 ${product.accentColor} border ${product.borderColor}`}
                            >
                              Popular
                            </div>
                          )}
                          {plan.referralPercent > 0 && (
                            <div className="absolute -top-3 right-4 px-2 py-1 rounded-full text-xs font-semibold bg-white/20 text-[#f4cc6e] border border-[#f4cc6e]/30 flex items-center gap-1">
                              <Sparkles className="w-3 h-3" />
                              {plan.referralPercent}%
                            </div>
                          )}
                          <div className="mb-4">
                            <h4 className={`font-bold text-xl mb-2 ${product.textColor}`}>{plan.name}</h4>
                            <div className="flex items-baseline gap-1">
                              <span className={`text-3xl font-bold ${product.accentColor}`}>{plan.price}</span>
                              {plan.period && <span className={`${product.textColor} opacity-60`}>{plan.period}</span>}
                            </div>
                          </div>
                          <ul className="space-y-2">
                            {plan.features.map((feature, fidx) => (
                              <li key={fidx} className={`text-sm ${product.textColor} opacity-80 flex items-start`}>
                                <span className={`mr-2 ${product.accentColor}`}>✓</span>
                                {feature}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>

                    {product.note && (
                      <p className={`text-xs ${product.textColor} opacity-50 mb-4 italic text-center`}>
                        {product.note}
                      </p>
                    )}

                    <div className="text-center">
                      <LuVelleButton variant={product.id === "ai" ? "blue" : "gold"} className="px-8" asChild>
                        <Link href={product.ctaHref}>{product.ctaText}</Link>
                      </LuVelleButton>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
