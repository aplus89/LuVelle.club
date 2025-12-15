"use client"

import { GlassCard } from "@/components/ui/glass-card"
import { Package, Star, TrendingUp, Heart } from "lucide-react"
import { useInView } from "@/hooks/use-in-view"
import { useCountUp } from "@/hooks/use-count-up"
import { useEffect } from "react"

const monthlyData = [
  { month: "Jul", boxes: 120 },
  { month: "Ago", boxes: 185 },
  { month: "Sep", boxes: 240 },
  { month: "Oct", boxes: 310 },
  { month: "Nov", boxes: 380 },
  { month: "Dic", boxes: 450 },
]

const maxBoxes = Math.max(...monthlyData.map((d) => d.boxes))

export function PartnersDashboardPreview() {
  const { ref, isInView } = useInView({ threshold: 0.3 })
  const boxesCount = useCountUp(450, 2000)
  const growthCount = useCountUp(18, 1500)
  const ratingCount = useCountUp(48, 2000, 0) // 4.8 * 10 for decimal animation
  const recompraCount = useCountUp(67, 2000)

  useEffect(() => {
    if (isInView) {
      boxesCount.startAnimation()
      growthCount.startAnimation()
      ratingCount.startAnimation()
      recompraCount.startAnimation()
    }
  }, [isInView])

  return (
    <section ref={ref} className="py-12 md:py-16 px-4 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-brand-blue/10 via-transparent to-transparent" />

      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="text-center mb-10">
          <span className="text-brand-gold/80 text-sm font-medium uppercase tracking-wider">Panel de Marca</span>
          <h2 className="font-heading text-3xl md:text-4xl text-brand-cream mt-2 mb-3">
            Visualizá el impacto de tu marca
          </h2>
          <p className="text-brand-cream/70 max-w-xl mx-auto text-sm md:text-base">
            No es solo poner productos en una caja. Es obtener datos reales, feedback profundo y una conexión directa
            con tu audiencia.
          </p>
        </div>

        {/* Dashboard Mock */}
        <GlassCard className="p-4 md:p-6 border border-brand-gold/20">
          {/* Header */}
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-brand-gold to-brand-gold/60 flex items-center justify-center">
                <span className="text-brand-dark font-bold text-sm">TM</span>
              </div>
              <div>
                <h3 className="text-brand-cream font-semibold text-sm md:text-base">Tu Marca Beauty</h3>
                <p className="text-brand-cream/50 text-xs">Partner desde Julio 2024</p>
              </div>
            </div>
            <span className="text-xs text-brand-gold bg-brand-gold/10 px-2 py-1 rounded-full">Partner Activo</span>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-6">
            <div className="bg-white/5 rounded-xl p-3 md:p-4">
              <div className="flex items-center gap-2 mb-2">
                <Package className="w-4 h-4 text-brand-gold" />
                <span className="text-brand-cream/60 text-xs">Cajas este mes</span>
              </div>
              <p className="text-2xl md:text-3xl font-bold text-brand-cream transition-all duration-300">
                {boxesCount.count}
              </p>
              <span className="text-xs text-green-400 flex items-center gap-1 mt-1">
                <TrendingUp className="w-3 h-3" />+{growthCount.count}% vs mes anterior
              </span>
            </div>

            <div className="bg-white/5 rounded-xl p-3 md:p-4">
              <div className="flex items-center gap-2 mb-2">
                <Star className="w-4 h-4 text-brand-gold" />
                <span className="text-brand-cream/60 text-xs">Satisfacción</span>
              </div>
              <p className="text-2xl md:text-3xl font-bold text-brand-cream transition-all duration-300">
                {(ratingCount.count / 10).toFixed(1)}
              </p>
              <div className="flex gap-0.5 mt-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`w-3 h-3 ${star <= 4 ? "text-brand-gold fill-brand-gold" : "text-brand-gold/50 fill-brand-gold/50"}`}
                  />
                ))}
              </div>
            </div>

            <div className="bg-white/5 rounded-xl p-3 md:p-4">
              <div className="flex items-center gap-2 mb-2">
                <Heart className="w-4 h-4 text-brand-gold" />
                <span className="text-brand-cream/60 text-xs">Producto estrella</span>
              </div>
              <p className="text-sm md:text-base font-semibold text-brand-cream leading-tight">Sérum Vitamina C</p>
              <span className="text-xs text-brand-cream/50 mt-1 block">Pedido 340 veces</span>
            </div>

            <div className="bg-white/5 rounded-xl p-3 md:p-4">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-4 h-4 text-brand-gold" />
                <span className="text-brand-cream/60 text-xs">Recompra</span>
              </div>
              <p className="text-2xl md:text-3xl font-bold text-brand-cream transition-all duration-300">
                {recompraCount.count}%
              </p>
              <span className="text-xs text-brand-cream/50 mt-1 block">Usuarias que repiten</span>
            </div>
          </div>

          {/* Chart */}
          <div className="bg-white/5 rounded-xl p-4">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-brand-cream font-medium text-sm">Evolución de cajas con tu marca</h4>
              <span className="text-xs text-brand-cream/50">Últimos 6 meses</span>
            </div>

            {/* Simple Bar Chart */}
            <div className="flex items-end justify-between gap-2 h-32">
              {monthlyData.map((data, index) => (
                <div key={index} className="flex-1 flex flex-col items-center gap-2">
                  <div className="w-full flex flex-col items-center">
                    <span className="text-xs text-brand-gold font-medium mb-1">{data.boxes}</span>
                    <div
                      className="w-full bg-gradient-to-t from-brand-gold/60 to-brand-gold rounded-t-md transition-all duration-1000 ease-out"
                      style={{
                        height: isInView ? `${(data.boxes / maxBoxes) * 80}px` : "0px",
                        transitionDelay: `${index * 100}ms`,
                      }}
                    />
                  </div>
                  <span className="text-xs text-brand-cream/50">{data.month}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Feedback Preview */}
          <div className="mt-4 p-3 bg-brand-gold/5 border border-brand-gold/20 rounded-xl">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-brand-cream/20 flex items-center justify-center flex-shrink-0">
                <span className="text-xs font-bold text-brand-cream">ML</span>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-brand-cream text-sm font-medium">María L.</span>
                  <div className="flex gap-0.5">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="w-3 h-3 text-brand-gold fill-brand-gold" />
                    ))}
                  </div>
                </div>
                <p className="text-brand-cream/70 text-xs leading-relaxed">
                  "El sérum de vitamina C me encantó! Ya lo pedí de nuevo en mi próxima caja. La textura es perfecta y
                  se absorbe súper rápido."
                </p>
              </div>
            </div>
          </div>
        </GlassCard>

        {/* Trust indicator */}
        <p className="text-center text-brand-cream/50 text-xs mt-4">
          Datos de ejemplo. Al ser partner, tendrás acceso a tu panel personalizado.
        </p>
      </div>
    </section>
  )
}
