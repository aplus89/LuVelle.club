"use client"

import { useEffect, useRef } from "react"
import { Check, X } from "lucide-react"
import { GlassCard } from "@/components/ui/glass-card"

const comparisonRows = [
  { feature: "Prueba gratis (1 mes)", pro: false, proPlus: true },
  { feature: "Perfil público", pro: true, proPlus: true },
  { feature: "Agenda básica", pro: true, proPlus: false },
  { feature: "Agenda inteligente", pro: false, proPlus: true },
  { feature: "IA básica", pro: true, proPlus: false },
  { feature: "IA avanzada", pro: false, proPlus: true },
  { feature: "Generador de contenido", pro: true, proPlus: true },
  { feature: "Catálogo limitado", pro: true, proPlus: false },
  { feature: "Catálogo ilimitado", pro: false, proPlus: true },
  { feature: "Panel Lite", pro: true, proPlus: false },
  { feature: "Panel Pro", pro: false, proPlus: true },
  { feature: "Soporte básico", pro: true, proPlus: false },
  { feature: "Soporte VIP", pro: false, proPlus: true },
  { feature: "Prioridad en búsquedas", pro: false, proPlus: true },
]

export function ProvidersPlans() {
  const tableRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in-up")
            entry.target.style.animationFillMode = "forwards"
          }
        })
      },
      { threshold: 0.1 },
    )

    if (tableRef.current) observer.observe(tableRef.current)

    return () => observer.disconnect()
  }, [])

  return (
    <section id="planes" className="py-16 md:py-24 px-4 bg-white/[0.02]">
      <div className="container mx-auto max-w-5xl">
        <div className="text-center mb-16">
          <h2 className="font-heading text-4xl md:text-5xl text-brand-gold mb-4">Planes LuVelle Pro</h2>
          <p className="text-lg text-brand-cream/70 max-w-2xl mx-auto mb-4">
            Elegí el plan que mejor se adapte a tu negocio
          </p>
          <p className="text-sm text-pro-accent font-semibold">
            Probá Pro Plus gratis por un mes, luego decidí tu plan
          </p>
        </div>

        <div ref={tableRef} className="opacity-0">
          <GlassCard className="overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="p-4 text-left text-brand-cream font-semibold">Característica</th>
                    <th className="p-4 text-center bg-pro-accent/5">
                      <div>
                        <div className="text-xl font-bold text-brand-cream mb-1">Plan Pro</div>
                        <div className="text-2xl font-bold text-pro-accent">$9.99/mes</div>
                      </div>
                    </th>
                    <th className="p-4 text-center bg-brand-gold/5">
                      <div>
                        <div className="text-xl font-bold text-brand-cream mb-1">Plan Pro Plus</div>
                        <div className="text-2xl font-bold text-brand-gold">$14.99/mes</div>
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonRows.map((row, index) => (
                    <tr key={index} className="border-b border-white/5">
                      <td className="p-4 text-brand-cream/80">{row.feature}</td>
                      <td className="p-4 text-center bg-pro-accent/5">
                        {row.pro ? (
                          <Check className="w-5 h-5 text-pro-accent mx-auto" />
                        ) : (
                          <X className="w-5 h-5 text-brand-cream/20 mx-auto" />
                        )}
                      </td>
                      <td className="p-4 text-center bg-brand-gold/5">
                        {row.proPlus ? (
                          <Check className="w-5 h-5 text-brand-gold mx-auto" />
                        ) : (
                          <X className="w-5 h-5 text-brand-cream/20 mx-auto" />
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </GlassCard>
        </div>
      </div>
    </section>
  )
}
