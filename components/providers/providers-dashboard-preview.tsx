"use client"

import { Calendar, TrendingUp, Users, Star, Package } from "lucide-react"
import { GlassCard } from "@/components/ui/glass-card"
import { useInView } from "@/hooks/use-in-view"
import { useCountUp } from "@/hooks/use-count-up"
import { useEffect } from "react"

export function ProvidersDashboardPreview() {
  const { ref, isInView } = useInView({ threshold: 0.3 })
  const citasCount = useCountUp(6, 1500)
  const ingresosCount = useCountUp(280000, 2000)
  const clientasCount = useCountUp(42, 1500)
  const growthCount = useCountUp(22, 1500)

  useEffect(() => {
    if (isInView) {
      citasCount.startAnimation()
      ingresosCount.startAnimation()
      clientasCount.startAnimation()
      growthCount.startAnimation()
    }
  }, [isInView])

  return (
    <section ref={ref} className="py-16 md:py-20 px-4 bg-gradient-to-b from-transparent to-white/[0.02]">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="font-heading text-3xl md:text-4xl text-[#f4cc6e] mb-4">Tu panel profesional en LuVelle</h2>
          <p className="text-lg text-[#efedea]/70 max-w-2xl mx-auto">
            Administrá tu negocio de belleza con un sistema claro y fácil de usar
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Main Dashboard Card */}
          <GlassCard className="md:col-span-2 p-6 md:p-8">
            <div className="grid md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-[#f4cc6e] mb-2">
                  <Calendar className="w-5 h-5" />
                  <span className="text-sm font-semibold">Próximas citas hoy</span>
                </div>
                <p className="text-3xl font-bold text-[#efedea] transition-all duration-300">{citasCount.count}</p>
                <p className="text-xs text-[#efedea]/60">3 confirmadas, 3 pendientes</p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-[#f4cc6e] mb-2">
                  <TrendingUp className="w-5 h-5" />
                  <span className="text-sm font-semibold">Ingresos del mes</span>
                </div>
                <p className="text-3xl font-bold text-[#efedea] transition-all duration-300">
                  ₡{ingresosCount.count.toLocaleString()}
                </p>
                <p className="text-xs text-[#efedea]/60">+{growthCount.count}% vs mes anterior</p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-[#f4cc6e] mb-2">
                  <Users className="w-5 h-5" />
                  <span className="text-sm font-semibold">Clientas LuVelle</span>
                </div>
                <p className="text-3xl font-bold text-[#efedea] transition-all duration-300">{clientasCount.count}</p>
                <p className="text-xs text-[#efedea]/60">8 nuevas esta semana</p>
              </div>
            </div>
          </GlassCard>

          {/* Reviews Card */}
          <GlassCard className="p-6">
            <div className="flex items-center gap-2 text-[#f4cc6e] mb-4">
              <Star className="w-5 h-5" />
              <span className="text-sm font-semibold">Nuevas reseñas</span>
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="flex gap-0.5">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} className="w-4 h-4 fill-[#f4cc6e] text-[#f4cc6e]" />
                  ))}
                </div>
                <span className="text-xs text-[#efedea]/70">María G.</span>
              </div>
              <p className="text-sm text-[#efedea]/80">"Excelente servicio, súper profesional"</p>
            </div>
          </GlassCard>

          {/* Products Card */}
          <GlassCard className="p-6">
            <div className="flex items-center gap-2 text-[#f4cc6e] mb-4">
              <Package className="w-5 h-5" />
              <span className="text-sm font-semibold">Productos más pedidos</span>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-[#efedea]/80">Manicure Gel</span>
                <span className="text-sm font-semibold text-[#f4cc6e]">24</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-[#efedea]/80">Facial Hidratante</span>
                <span className="text-sm font-semibold text-[#f4cc6e]">18</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-[#efedea]/80">Pedicure Spa</span>
                <span className="text-sm font-semibold text-[#f4cc6e]">15</span>
              </div>
            </div>
          </GlassCard>
        </div>

        <p className="text-center text-sm text-[#efedea]/60 mt-8 italic">
          Un panel simple y claro, como si fuera tu mini sistema de gestión
        </p>
      </div>
    </section>
  )
}
