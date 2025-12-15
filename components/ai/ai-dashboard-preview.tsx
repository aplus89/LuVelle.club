"use client"

import { GlassCard } from "@/components/ui/glass-card"
import { MessageCircle, TrendingUp, PieChart, Percent, Sparkles } from "lucide-react"
import { useInView } from "@/hooks/use-in-view"
import { useCountUp } from "@/hooks/use-count-up"
import { useEffect } from "react"

const chatMessages = [
  { type: "user", text: "¿Qué me recomendás para el cabello seco?" },
  {
    type: "ai",
    text: "Te recomiendo una mascarilla con aceite de argán. ¿Querés que te diga cuáles tienen las proveedoras cerca de vos?",
  },
  { type: "user", text: "Sí, por favor!" },
  {
    type: "ai",
    text: "Ana tiene el tratamiento de hidratación profunda en ₡12,000. También hay un sérum en tu próxima Beauty Box 💆‍♀️",
  },
]

const categoryData = [
  { name: "Skincare", percentage: 45, color: "#f4cc6e" },
  { name: "Cabello", percentage: 30, color: "#1A5276" },
  { name: "Uñas", percentage: 25, color: "#e8ded3" },
]

export function AiDashboardPreview() {
  const { ref, isInView } = useInView({ threshold: 0.3 })
  const consultasCount = useCountUp(128, 2000)
  const growthCount = useCountUp(34, 2000)
  const savingsCount = useCountUp(18, 2000)

  useEffect(() => {
    if (isInView) {
      consultasCount.startAnimation()
      growthCount.startAnimation()
      savingsCount.startAnimation()
    }
  }, [isInView])

  return (
    <section ref={ref} className="py-12 md:py-16 px-4 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-ai-accent/5 via-transparent to-transparent" />

      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="text-center mb-10">
          <span className="text-brand-gold/80 text-sm font-medium uppercase tracking-wider">Tu Asistente Personal</span>
          <h2 className="font-heading text-3xl md:text-4xl text-brand-cream mt-2 mb-3">
            Así se ve LuVelle Ai en acción
          </h2>
          <p className="text-brand-cream/70 max-w-xl mx-auto text-sm md:text-base">
            Una amiga experta disponible 24/7 que te acompaña en cada decisión de belleza
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 items-stretch">
          {/* Left: Mobile Chat Mock */}
          <GlassCard className="p-4 md:p-6">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-full bg-brand-gold/20 flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-brand-gold" />
              </div>
              <div>
                <h3 className="text-brand-dark font-semibold text-sm bg-brand-gold px-3 py-1 rounded-lg">LuVelle Ai</h3>
                <p className="text-brand-cream/50 text-xs mt-0.5">en línea</p>
              </div>
            </div>

            {/* Chat Messages */}
            <div className="bg-[#0a0a12] rounded-xl p-3 space-y-3 min-h-[280px]">
              {chatMessages.map((msg, index) => (
                <div key={index} className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[85%] rounded-2xl px-3 py-2 ${
                      msg.type === "user"
                        ? "bg-brand-gold text-brand-dark rounded-br-sm"
                        : "bg-white/10 text-brand-cream rounded-bl-sm"
                    }`}
                  >
                    <p className="text-xs leading-relaxed">{msg.text}</p>
                  </div>
                </div>
              ))}

              {/* Typing indicator */}
              <div className="flex justify-start">
                <div className="bg-white/10 rounded-2xl rounded-bl-sm px-4 py-2">
                  <div className="flex gap-1">
                    <span
                      className="w-2 h-2 bg-brand-cream/50 rounded-full animate-bounce"
                      style={{ animationDelay: "0ms" }}
                    />
                    <span
                      className="w-2 h-2 bg-brand-cream/50 rounded-full animate-bounce"
                      style={{ animationDelay: "150ms" }}
                    />
                    <span
                      className="w-2 h-2 bg-brand-cream/50 rounded-full animate-bounce"
                      style={{ animationDelay: "300ms" }}
                    />
                  </div>
                </div>
              </div>
            </div>

            <p className="text-center text-brand-cream/40 text-xs mt-3">Chat real vía WhatsApp • Sin descargas</p>
          </GlassCard>

          {/* Right: Mini Dashboard */}
          <div className="space-y-4">
            {/* Stats Row */}
            <GlassCard className="p-4">
              <div className="flex items-center gap-2 mb-3">
                <MessageCircle className="w-4 h-4 text-brand-gold" />
                <span className="text-brand-cream/70 text-sm">Tu actividad este mes</span>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/5 rounded-lg p-3">
                  <p className="text-2xl font-bold text-brand-cream transition-all duration-300">
                    {consultasCount.count}
                  </p>
                  <p className="text-xs text-brand-cream/50">Consultas respondidas</p>
                </div>
                <div className="bg-white/5 rounded-lg p-3 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-green-400" />
                  <div>
                    <p className="text-sm font-semibold text-green-400 transition-all duration-300">
                      +{growthCount.count}%
                    </p>
                    <p className="text-xs text-brand-cream/50">vs mes anterior</p>
                  </div>
                </div>
              </div>
            </GlassCard>

            {/* Categories Chart */}
            <GlassCard className="p-4">
              <div className="flex items-center gap-2 mb-3">
                <PieChart className="w-4 h-4 text-brand-gold" />
                <span className="text-brand-cream/70 text-sm">Categorías más consultadas</span>
              </div>
              <div className="space-y-3">
                {categoryData.map((cat, index) => (
                  <div key={index} className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="text-brand-cream">{cat.name}</span>
                      <span className="text-brand-cream/70">{cat.percentage}%</span>
                    </div>
                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-1000 ease-out"
                        style={{
                          width: isInView ? `${cat.percentage}%` : "0%",
                          backgroundColor: cat.color,
                          transitionDelay: `${index * 150}ms`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </GlassCard>

            {/* Savings Highlight */}
            <GlassCard className="p-4 bg-gradient-to-r from-brand-gold/10 to-transparent border-brand-gold/30">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-brand-gold/20 flex items-center justify-center flex-shrink-0">
                  <Percent className="w-6 h-6 text-brand-gold" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-brand-gold transition-all duration-300">
                    {savingsCount.count}%
                  </p>
                  <p className="text-xs text-brand-cream/70">Ahorro promedio vs precio regular</p>
                  <p className="text-xs text-brand-cream/50 mt-1">
                    Gracias a descuentos exclusivos de proveedoras LuVelle
                  </p>
                </div>
              </div>
            </GlassCard>
          </div>
        </div>

        {/* Trust indicator */}
        <p className="text-center text-brand-cream/40 text-xs mt-6">
          Datos de ejemplo basados en usuarias activas del Club LuVelle
        </p>
      </div>
    </section>
  )
}
