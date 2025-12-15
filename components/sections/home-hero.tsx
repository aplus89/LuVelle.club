"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { MessageCircle } from "lucide-react"
import { LuVelleButton } from "@/components/ui/luvelle-button"

const heroImages = [
  {
    src: "/images/downloadedimage-20-202025-12.png",
    alt: "Amigas abriendo una Beauty Box de LuVelle",
  },
  {
    src: "/images/42136967-f534-46ac-b5c3.jpeg",
    alt: "Mujer recibiendo masaje facial relajante",
  },
  {
    src: "/images/gemini-generated-image-nsehmznsehmznseh.png",
    alt: "Proveedora recibiendo a una clienta en su salón",
  },
  {
    src: "/images/gemini-generated-image-qg56yjqg56yjqg56.png",
    alt: "Servicio de manicure profesional",
  },
]

export function HomeHero() {
  const [currentImage, setCurrentImage] = useState(0)
  const [scrollOffset, setScrollOffset] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % heroImages.length)
    }, 7000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const onScroll = () => setScrollOffset(window.scrollY * 0.08)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <section className="relative min-h-[70vh] md:min-h-[85vh] overflow-hidden">
      <div className="absolute inset-0">
        {heroImages.map((image, index) => (
          <div
            key={image.src}
            className="absolute inset-0 transition-opacity duration-1500 ease-in-out"
            style={{
              opacity: index === currentImage ? 1 : 0,
              transform: `translateY(${scrollOffset}px) scale(1.1)`,
            }}
          >
            <img src={image.src || "/placeholder.svg"} alt={image.alt} className="w-full h-full object-cover" />
          </div>
        ))}
      </div>

      <div className="absolute inset-0 bg-[#141322]/70" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#141322]/50 via-transparent to-[#141322]/80" />

      <div className="relative z-10 flex items-center justify-center min-h-[70vh] md:min-h-[85vh] px-4 py-16 sm:py-20">
        <div className="max-w-sm sm:max-w-3xl w-full mx-auto text-center space-y-6 sm:space-y-8">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight max-w-[90vw] sm:max-w-full mx-auto">
            <span className="text-[#efedea] block">Una sola plataforma.</span>
            <span className="font-heading text-[#f4cc6e] block">Tres formas</span>
            <span className="text-[#efedea] block">de transformar tu bienestar.</span>
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-[#e8ded3]/90 max-w-2xl mx-auto leading-relaxed">
            LuVelle combina inteligencia artificial, una beauty box personalizada y herramientas profesionales para
            proveedoras en una experiencia única de belleza y bienestar.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center pt-2 sm:pt-4">
            <LuVelleButton
              asChild
              size="lg"
              variant="gold"
              className="px-6 sm:px-8 py-5 sm:py-6 text-base sm:text-lg rounded-full"
            >
              <Link
                href="https://wa.me/15557792120?text=Hola%20LuVelle%2C%20quiero%20probar%20Ai%20gratis"
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                <span className="leading-tight">Probar LuVelle Ai gratis en WhatsApp</span>
              </Link>
            </LuVelleButton>

            <LuVelleButton
              asChild
              size="lg"
              variant="outline"
              className="px-6 sm:px-8 py-5 sm:py-6 text-base sm:text-lg rounded-full"
            >
              <Link href="#productos">Ver todos los planes</Link>
            </LuVelleButton>
          </div>

          <div className="flex justify-center gap-2 pt-4">
            {heroImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImage(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentImage ? "bg-[#f4cc6e] w-6" : "bg-[#efedea]/40 hover:bg-[#efedea]/60"
                }`}
                aria-label={`Ver imagen ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
