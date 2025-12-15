"use client"

import { useEffect, useRef, useState } from "react"
import { PhoneMockup } from "./phone-mockup"
import { Sparkles } from "lucide-react"
import { LuVelleButton } from "@/components/ui/luvelle-button"
import Link from "next/link"

const whatsappUrl = "https://wa.me/15557792120?text=Hola!%20Quiero%20probar%20LuVelle%20Ai"

export function AiScrollStory() {
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

  const lockScreenOpacity = scrollProgress < 0.3 ? 1 : Math.max(0, 1 - (scrollProgress - 0.3) * 3)
  const notificationOpacity =
    scrollProgress > 0.25 && scrollProgress < 0.7
      ? Math.min(1, (scrollProgress - 0.25) * 3)
      : scrollProgress >= 0.7
        ? 1 - (scrollProgress - 0.7) * 3
        : 0
  const notificationY = scrollProgress > 0.25 ? Math.max(-80, -200 + (scrollProgress - 0.25) * 400) : 0
  const chatOpacity = scrollProgress > 0.6 ? Math.min(1, (scrollProgress - 0.6) * 2.5) : 0

  const initialMessageOpacity = scrollProgress < 0.25 ? 1 : Math.max(0, 1 - (scrollProgress - 0.25) * 4)
  const userResponseOpacity =
    scrollProgress > 0.2 && scrollProgress < 0.5
      ? Math.min(1, (scrollProgress - 0.2) * 4)
      : scrollProgress >= 0.5
        ? 1
        : 0
  const aiResponse1Opacity =
    scrollProgress > 0.45 && scrollProgress < 0.75
      ? Math.min(1, (scrollProgress - 0.45) * 4)
      : scrollProgress >= 0.75
        ? 1
        : 0
  const aiResponse2Opacity = scrollProgress > 0.7 ? Math.min(1, (scrollProgress - 0.7) * 4) : 0

  return (
    <section
      ref={sectionRef}
      className="min-h-[180vh] md:min-h-[220vh] py-12 md:py-0 px-4 bg-[#141322] relative overflow-hidden"
    >
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-64 h-64 bg-[#1A5276] rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#f4cc6e] rounded-full blur-3xl" />
      </div>

      <div className={`${isMobile ? "" : "sticky top-0 min-h-screen flex items-center"}`}>
        <div className="container mx-auto max-w-7xl relative z-10 py-12 md:py-24">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#1A5276]/20 border border-[#1A5276]/30 rounded-full">
                <Sparkles className="w-4 h-4 text-[#f4cc6e]" />
                <span className="text-sm text-[#f4cc6e] font-medium">LuVelle Ai</span>
              </div>

              {/* Updated headline to be more conversational */}
              <h2 className="font-heading text-4xl md:text-6xl text-[#f4cc6e]">Cómo LuVelle Ai acompaña tu día</h2>

              {/* Emphasized emotional benefit */}
              <p className="text-lg text-[#efedea] leading-relaxed">
                El chat de WhatsApp que te ayuda a cuidar tu belleza como una amiga experta. Nunca estás sola en tu
                rutina de bienestar.
              </p>

              <div className="space-y-4">
                <div
                  className="flex items-start gap-4 opacity-0 animate-fade-in-up"
                  style={{ animationDelay: "0.2s", animationFillMode: "forwards" }}
                >
                  <div className="w-10 h-10 rounded-full bg-[#1A5276] flex items-center justify-center flex-shrink-0">
                    <span className="text-[#f4cc6e] font-bold text-sm">1</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-1">Recomendaciones personalizadas</h3>
                    <p className="text-[#efedea]/80 text-sm">
                      Recibe sugerencias únicas basadas en tus necesidades y preferencias.
                    </p>
                  </div>
                </div>

                <div
                  className="flex items-start gap-4 opacity-0 animate-fade-in-up"
                  style={{ animationDelay: "0.4s", animationFillMode: "forwards" }}
                >
                  <div className="w-10 h-10 rounded-full bg-[#1A5276] flex items-center justify-center flex-shrink-0">
                    <span className="text-[#f4cc6e] font-bold text-sm">2</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-1">Encuentra servicios y productos</h3>
                    <p className="text-[#efedea]/80 text-sm">
                      Descubre opciones curadas de proveedoras y marcas de confianza.
                    </p>
                  </div>
                </div>

                <div
                  className="flex items-start gap-4 opacity-0 animate-fade-in-up"
                  style={{ animationDelay: "0.6s", animationFillMode: "forwards" }}
                >
                  <div className="w-10 h-10 rounded-full bg-[#1A5276] flex items-center justify-center flex-shrink-0">
                    <span className="text-[#f4cc6e] font-bold text-sm">3</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-1">Tips y consejos</h3>
                    <p className="text-[#efedea]/80 text-sm">Recibe tips de belleza y bienestar adaptados a ti.</p>
                  </div>
                </div>
              </div>

              <div className="pt-4 flex flex-col sm:flex-row gap-3">
                <LuVelleButton asChild size="lg" variant="gold">
                  <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                    Probar LuVelle Ai gratis
                  </a>
                </LuVelleButton>
                <LuVelleButton asChild size="lg" variant="outline">
                  <Link href="/ai">Ver planes del Club LuVelle</Link>
                </LuVelleButton>
              </div>
            </div>

            <div className="perspective-1000 flex justify-center">
              <div
                className="transition-transform duration-500 ease-out hover:scale-105 hover:rotate-2"
                style={{
                  transform: isMobile ? "none" : `translateY(${scrollProgress * 30}px)`,
                }}
              >
                <PhoneMockup>
                  <div
                    className="absolute inset-0 bg-gradient-to-br from-[#1A5276] to-[#141322] flex flex-col items-center justify-center transition-opacity duration-500"
                    style={{ opacity: lockScreenOpacity }}
                  >
                    <div className="text-white text-6xl font-light mb-2">14:30</div>
                    <div className="text-white/60 text-sm">Martes, 10 de diciembre</div>
                    <div className="absolute bottom-8 w-full px-8">
                      <div className="w-full h-1 bg-white/20 rounded-full" />
                    </div>
                  </div>

                  <div
                    className="absolute left-4 right-4 bg-white rounded-2xl p-4 shadow-xl transition-all duration-500"
                    style={{ opacity: notificationOpacity, transform: `translateY(${notificationY}px)`, top: "50%" }}
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#f4cc6e] flex items-center justify-center flex-shrink-0">
                        <Sparkles className="w-5 h-5 text-[#141322]" />
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold text-gray-900 text-sm mb-1">LuVelle Ai</div>
                        <p className="text-gray-700 text-xs leading-relaxed">
                          Tenemos tres opciones perfectas para tu tipo de piel ✨
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="absolute inset-0 bg-gradient-to-b from-gray-50 to-gray-100">
                    <div className="bg-[#1A5276] px-4 py-3 flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#f4cc6e] flex items-center justify-center">
                        <Sparkles className="w-5 h-5 text-[#141322]" />
                      </div>
                      <div>
                        <div className="text-white font-semibold text-sm">LuVelle Ai</div>
                        <div className="text-white/70 text-xs">En línea</div>
                      </div>
                    </div>

                    <div className="p-4 space-y-3">
                      <div
                        className="flex justify-start transition-opacity duration-500"
                        style={{ opacity: initialMessageOpacity }}
                      >
                        <div className="bg-white rounded-2xl rounded-tl-sm px-4 py-2.5 max-w-[80%] shadow-sm">
                          <p className="text-gray-800 text-xs leading-relaxed">
                            Hola, ¿cómo te gustaría consentirte hoy? 💫
                          </p>
                        </div>
                      </div>

                      <div
                        className="flex justify-end transition-opacity duration-500"
                        style={{ opacity: userResponseOpacity }}
                      >
                        <div className="bg-[#f4cc6e] rounded-2xl rounded-tr-sm px-4 py-2.5 max-w-[80%]">
                          <p className="text-[#141322] text-xs leading-relaxed">
                            Quiero mejorar mi rutina de skincare, tengo piel mixta.
                          </p>
                        </div>
                      </div>

                      <div
                        className="flex justify-start transition-opacity duration-500"
                        style={{ opacity: aiResponse1Opacity }}
                      >
                        <div className="bg-white rounded-2xl rounded-tl-sm px-4 py-2.5 max-w-[80%] shadow-sm">
                          <p className="text-gray-800 text-xs leading-relaxed">
                            Te muestro 3 opciones perfectas para vos ✨
                          </p>
                        </div>
                      </div>

                      <div
                        className="flex justify-start transition-opacity duration-500"
                        style={{ opacity: aiResponse2Opacity }}
                      >
                        <div className="bg-white rounded-2xl rounded-tl-sm px-4 py-2.5 max-w-[80%] shadow-sm">
                          <p className="text-gray-800 text-xs leading-relaxed">
                            También encontré un spa cerca tuyo con agenda abierta este sábado. 💆‍♀️
                          </p>
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
