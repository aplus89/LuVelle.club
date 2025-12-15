"use client"

import { useEffect, useRef, useState } from "react"
import { PhoneMockup } from "./phone-mockup"
import { Briefcase, DollarSign, Calendar, TrendingUp, MessageCircle } from "lucide-react"
import { LuVelleButton } from "@/components/ui/luvelle-button"
import Link from "next/link"

export function ProScrollStory() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return

      const rect = sectionRef.current.getBoundingClientRect()
      const sectionTop = rect.top
      const sectionHeight = rect.height
      const windowHeight = window.innerHeight

      const rawProgress = Math.max(0, Math.min(1, (windowHeight - sectionTop) / (sectionHeight - windowHeight)))
      const easedProgress = Math.pow(rawProgress, 0.8)
      setScrollProgress(easedProgress)
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll()

    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const notification1Opacity = scrollProgress > 0.15 ? Math.min(1, (scrollProgress - 0.15) * 4) : 0
  const notification2Opacity = scrollProgress > 0.45 ? Math.min(1, (scrollProgress - 0.45) * 4) : 0
  const notification3Opacity = scrollProgress > 0.7 ? Math.min(1, (scrollProgress - 0.7) * 4) : 0

  const notification1Y = scrollProgress > 0.15 ? Math.max(80, 200 - (scrollProgress - 0.15) * 400) : 200
  const notification2Y = scrollProgress > 0.45 ? Math.max(200, 320 - (scrollProgress - 0.45) * 400) : 320
  const notification3Y = scrollProgress > 0.7 ? Math.max(320, 440 - (scrollProgress - 0.7) * 400) : 440

  return (
    <section
      ref={sectionRef}
      className="min-h-[180vh] md:min-h-[220vh] py-12 md:py-0 px-4 bg-[#1b5276] relative overflow-hidden"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 right-10 w-64 h-64 bg-[#f4cc6e] rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-white rounded-full blur-3xl" />
      </div>

      <div className={`${isMobile ? "" : "sticky top-0 min-h-screen flex items-center"}`}>
        <div className="container mx-auto max-w-7xl relative z-10 py-12 md:py-24">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left Column - Text Content */}
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#f4cc6e]/20 border border-[#f4cc6e]/30 rounded-full">
                <Briefcase className="w-4 h-4 text-[#f4cc6e]" />
                <span className="text-sm text-[#f4cc6e] font-medium">LuVelle Pro</span>
              </div>

              <h2 className="font-heading text-4xl md:text-6xl text-[#f4cc6e]">
                Convertí tu talento en ingresos constantes
              </h2>

              <p className="text-lg text-[#efedea] leading-relaxed">
                Sin hacer malabares con WhatsApp, Excel y agendas de papel. Mientras das un servicio, LuVelle se encarga
                de las reservas y los cobros.
              </p>

              <div className="space-y-4">
                <div
                  className="flex items-start gap-4 opacity-0 animate-fade-in-up"
                  style={{ animationDelay: "0.2s", animationFillMode: "forwards" }}
                >
                  <div className="w-10 h-10 rounded-full bg-[#f4cc6e] flex items-center justify-center flex-shrink-0">
                    <MessageCircle className="w-5 h-5 text-[#1b5276]" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-1">Más clientas</h3>
                    <p className="text-[#efedea]/80 text-sm">Conectá con nuevas clientas que te buscan activamente.</p>
                  </div>
                </div>

                <div
                  className="flex items-start gap-4 opacity-0 animate-fade-in-up"
                  style={{ animationDelay: "0.4s", animationFillMode: "forwards" }}
                >
                  <div className="w-10 h-10 rounded-full bg-[#f4cc6e] flex items-center justify-center flex-shrink-0">
                    <Calendar className="w-5 h-5 text-[#1b5276]" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-1">Menos desorden</h3>
                    <p className="text-[#efedea]/80 text-sm">
                      Olvidate de Excel y agendas de papel, todo en un solo lugar.
                    </p>
                  </div>
                </div>

                <div
                  className="flex items-start gap-4 opacity-0 animate-fade-in-up"
                  style={{ animationDelay: "0.6s", animationFillMode: "forwards" }}
                >
                  <div className="w-10 h-10 rounded-full bg-[#f4cc6e] flex items-center justify-center flex-shrink-0">
                    <TrendingUp className="w-5 h-5 text-[#1b5276]" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-1">Pagos claros y a tiempo</h3>
                    <p className="text-[#efedea]/80 text-sm">Cobrá fácil y rápido, sin perseguir clientas.</p>
                  </div>
                </div>
              </div>

              <div className="pt-4 space-y-2">
                <LuVelleButton asChild size="lg" variant="gold" className="w-full sm:w-auto">
                  <Link href="/providers">Empezar prueba gratis Pro (1 mes)</Link>
                </LuVelleButton>
                <p className="text-sm text-[#efedea]/60">Sin tarjeta, sin compromiso. Decidís después.</p>
              </div>
            </div>

            {/* Right Column - Phone with Payment Notifications */}
            <div className="perspective-1000 flex justify-center">
              <div
                className="transition-transform duration-500 ease-out hover:scale-105 hover:-rotate-1"
                style={{
                  transform: isMobile ? "none" : `translateY(${scrollProgress * 20}px)`,
                }}
              >
                <PhoneMockup>
                  <div className="absolute inset-0 bg-gradient-to-b from-gray-50 to-gray-100 p-4">
                    <div
                      className="absolute left-4 right-4 bg-white rounded-xl p-4 shadow-lg border-l-4 border-blue-500 transition-all duration-500"
                      style={{
                        opacity: notification1Opacity,
                        transform: `translateY(${notification1Y}px)`,
                      }}
                    >
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                          <MessageCircle className="w-5 h-5 text-blue-600" />
                        </div>
                        <div className="flex-1">
                          <p className="text-gray-900 font-semibold text-sm">Nuevo mensaje</p>
                          <p className="text-gray-600 text-xs mt-1">Ana quiere agendar uñas para el viernes ✨</p>
                          <p className="text-gray-400 text-xs mt-1">Hace 3 minutos</p>
                        </div>
                      </div>
                    </div>

                    <div
                      className="absolute left-4 right-4 bg-white rounded-xl p-4 shadow-lg border-l-4 border-green-500 transition-all duration-500"
                      style={{
                        opacity: notification2Opacity,
                        transform: `translateY(${notification2Y}px)`,
                      }}
                    >
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                          <Calendar className="w-5 h-5 text-green-600" />
                        </div>
                        <div className="flex-1">
                          <p className="text-gray-900 font-semibold text-sm">Nueva reserva confirmada</p>
                          <p className="text-gray-600 text-xs mt-1">Viernes 3:00 pm</p>
                          <p className="text-gray-400 text-xs mt-1">Ana González</p>
                        </div>
                      </div>
                    </div>

                    <div
                      className="absolute left-4 right-4 bg-white rounded-xl p-4 shadow-lg border-l-4 border-[#f4cc6e] transition-all duration-500"
                      style={{
                        opacity: notification3Opacity,
                        transform: `translateY(${notification3Y}px)`,
                      }}
                    >
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center">
                          <DollarSign className="w-5 h-5 text-yellow-600" />
                        </div>
                        <div className="flex-1">
                          <p className="text-gray-900 font-semibold text-sm">Pago recibido ₡27.500 vía LuVelle</p>
                          <p className="text-gray-600 text-xs mt-1">Ventas del mes +35%</p>
                          <p className="text-gray-400 text-xs mt-1">Hace 10 minutos</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </PhoneMockup>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
