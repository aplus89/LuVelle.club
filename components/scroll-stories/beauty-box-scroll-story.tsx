"use client"

import { useEffect, useRef, useState } from "react"
import { Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"

export function BeautyBoxScrollStory() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return

      const rect = sectionRef.current.getBoundingClientRect()
      const sectionTop = rect.top
      const sectionHeight = rect.height
      const windowHeight = window.innerHeight

      const progress = Math.max(0, Math.min(1, (windowHeight - sectionTop) / (sectionHeight + windowHeight * 0.5)))
      setScrollProgress(progress)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()

    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const lidTranslateY = scrollProgress * -120
  const lidRotateX = scrollProgress * 35
  const lidScale = 1 - scrollProgress * 0.08
  const boxScale = 1 + scrollProgress * 0.03
  const lightOpacity = scrollProgress > 0.2 ? Math.min(1, (scrollProgress - 0.2) * 1.5) : 0
  const lightScale = 0.5 + scrollProgress * 0.8

  return (
    <section
      ref={sectionRef}
      className="min-h-screen py-12 md:py-16 px-4 bg-gradient-to-b from-[#141321] to-[#1b1b2e] relative overflow-hidden"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-20 left-20 w-64 h-64 bg-[#f4cc6e] rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-[#f4cc6e] rounded-full blur-3xl" />
      </div>

      <div
        className="absolute z-0 pointer-events-none bottom-0 left-0 right-0 md:right-auto"
        style={{ perspective: "1200px" }}
      >
        <div className="relative w-full md:w-[55vw] lg:w-[50vw] max-w-[700px] mx-auto md:mx-0 md:ml-[-5%] lg:ml-0">
          {/* Light effect rays */}
          <div
            className="absolute left-1/2 -translate-x-1/2 bottom-[40%] md:bottom-[45%] transition-all duration-500 ease-out"
            style={{
              opacity: lightOpacity,
              transform: `translateX(-50%) scale(${lightScale})`,
            }}
          >
            {/* Conic light rays */}
            <div
              className="w-40 md:w-64 lg:w-80 h-60 md:h-96 lg:h-[450px]"
              style={{
                background: `conic-gradient(from 180deg at 50% 100%, transparent 130deg, rgba(244, 204, 110, 0.4) 150deg, rgba(244, 204, 110, 0.6) 180deg, rgba(244, 204, 110, 0.4) 210deg, transparent 230deg)`,
                filter: "blur(25px)",
              }}
            />
            {/* Inner white light */}
            <div className="absolute inset-0 flex items-end justify-center">
              <div
                className="w-24 md:w-40 lg:w-52 h-40 md:h-64 lg:h-80"
                style={{
                  background: `conic-gradient(from 180deg at 50% 100%, transparent 140deg, rgba(255, 255, 255, 0.3) 160deg, rgba(255, 255, 255, 0.5) 180deg, rgba(255, 255, 255, 0.3) 200deg, transparent 220deg)`,
                  filter: "blur(18px)",
                }}
              />
            </div>
            {/* Center glow */}
            <div
              className="absolute bottom-[30%] left-1/2 -translate-x-1/2 w-32 md:w-48 lg:w-56 h-12 md:h-20 lg:h-24 rounded-full"
              style={{
                background: `radial-gradient(ellipse at center, rgba(244, 204, 110, 0.8) 0%, rgba(244, 204, 110, 0.4) 40%, transparent 70%)`,
                filter: "blur(12px)",
              }}
            />
            {/* Sparkle particles */}
            <div
              className="absolute w-2 h-2 bg-white rounded-full animate-pulse bottom-[60%] left-1/4"
              style={{ opacity: lightOpacity * 0.8 }}
            />
            <div
              className="absolute w-1.5 h-1.5 bg-[#f4cc6e] rounded-full animate-pulse bottom-[50%] right-1/3"
              style={{ animationDelay: "0.3s", opacity: lightOpacity * 0.6 }}
            />
            <div
              className="absolute w-2 h-2 bg-white rounded-full animate-pulse bottom-[70%] right-1/4"
              style={{ animationDelay: "0.6s", opacity: lightOpacity * 0.7 }}
            />
          </div>

          {/* Lid - positioned relative to container */}
          <div
            className="relative z-10 flex justify-center transition-all duration-300 ease-out"
            style={{
              transform: `translateY(${lidTranslateY}px) rotateX(${lidRotateX}deg) scale(${lidScale})`,
              transformOrigin: "center bottom",
            }}
          >
            <Image
              src="/images/tapa-the-beauty-box.svg"
              alt="Tapa de The Beauty Box"
              width={600}
              height={260}
              className="w-[80%] md:w-[85%] h-auto drop-shadow-2xl"
            />
          </div>

          {/* Base box - positioned at bottom, slightly overlapping lid */}
          <div
            className="relative z-0 flex justify-center -mt-[15%] md:-mt-[12%] transition-all duration-300 ease-out"
            style={{
              transform: `scale(${boxScale})`,
            }}
          >
            <Image
              src="/images/caja-the-beauty-box.svg"
              alt="Caja The Beauty Box"
              width={600}
              height={400}
              className="w-[80%] md:w-[85%] h-auto"
            />
          </div>

          {/* Background glow behind box */}
          <div
            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-[80%] transition-opacity duration-500 -z-10"
            style={{
              opacity: lightOpacity * 0.4,
              background: "radial-gradient(ellipse at center bottom, rgba(244, 204, 110, 0.5) 0%, transparent 60%)",
              filter: "blur(40px)",
            }}
          />
        </div>
      </div>

      <div className="container mx-auto max-w-7xl relative z-10 h-full flex flex-col justify-start md:justify-center pt-4 md:pt-0">
        <div className="md:ml-auto md:w-1/2 lg:w-[45%] space-y-6 md:space-y-8">
          {/* Header */}
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#f4cc6e]/20 border border-[#f4cc6e]/30 rounded-full">
              <Sparkles className="w-4 h-4 text-[#f4cc6e]" />
              <span className="text-sm text-[#f4cc6e] font-medium">The Beauty Box</span>
            </div>
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl text-[#f4cc6e]">Recibí y disfrutá cada mes</h2>
          </div>

          {/* Steps */}
          <div className="space-y-5 md:space-y-6">
            <div
              className="flex items-start gap-3 md:gap-5 opacity-0 animate-fade-in-up"
              style={{ animationDelay: "0.2s", animationFillMode: "forwards" }}
            >
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#f4cc6e] flex items-center justify-center flex-shrink-0">
                <span className="text-[#141321] font-bold text-base md:text-lg">1</span>
              </div>
              <div>
                <h3 className="text-lg md:text-xl font-semibold text-white mb-1">Elegí tu plan</h3>
                <p className="text-[#e8ded3] leading-relaxed text-sm">
                  Seleccioná entre Esencial, Premium o Deluxe según cuántos productos querés recibir cada mes.
                </p>
              </div>
            </div>

            <div
              className="flex items-start gap-3 md:gap-5 opacity-0 animate-fade-in-up"
              style={{ animationDelay: "0.4s", animationFillMode: "forwards" }}
            >
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#f4cc6e] flex items-center justify-center flex-shrink-0">
                <span className="text-[#141321] font-bold text-base md:text-lg">2</span>
              </div>
              <div>
                <h3 className="text-lg md:text-xl font-semibold text-white mb-1">Personalizá tu caja</h3>
                <p className="text-[#e8ded3] leading-relaxed text-sm">
                  Seleccioná las categorías que más te interesan: skincare, makeup, haircare, nails y más.
                </p>
              </div>
            </div>

            <div
              className="flex items-start gap-3 md:gap-5 opacity-0 animate-fade-in-up"
              style={{ animationDelay: "0.6s", animationFillMode: "forwards" }}
            >
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#f4cc6e] flex items-center justify-center flex-shrink-0">
                <span className="text-[#141321] font-bold text-base md:text-lg">3</span>
              </div>
              <div>
                <h3 className="text-lg md:text-xl font-semibold text-white mb-1">Recibí y disfrutá</h3>
                <p className="text-[#e8ded3] leading-relaxed text-sm">
                  Cada mes recibirás productos curados especialmente para vos, con sorpresas y descuentos exclusivos.
                </p>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="space-y-2 pt-2">
            <Button
              asChild
              size="lg"
              className="w-full sm:w-auto bg-[#f4cc6e] hover:bg-[#f4cc6e]/90 text-[#141321] font-semibold"
            >
              <Link href="/beauty-box">Crear mi Beauty Box</Link>
            </Button>
            <p className="text-sm text-[#e8ded3]/60 italic">Configuralá ahora, decidís mes a mes.</p>
          </div>
        </div>
      </div>
    </section>
  )
}
