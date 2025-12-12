"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

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
    <section className="relative min-h-[85vh] overflow-hidden">
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

      <div className="absolute inset-0 bg-gradient-to-b from-[#141322]/80 via-[#141322]/60 to-[#141322]/90" />

      <div className="relative z-10 flex items-center justify-center min-h-[85vh] px-4">
        <div className="max-w-3xl text-center space-y-8">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
            <span className="text-[#efedea]">Una sola plataforma.</span>
            <br />
            <span className="font-heading text-[#f4cc6e]">Tres formas</span>
            <br />
            <span className="text-[#efedea]">de transformar tu bienestar.</span>
          </h1>

          <p className="text-lg md:text-xl text-[#e8ded3]/90 max-w-2xl mx-auto">
            LuVelle combina inteligencia artificial, una beauty box personalizada y herramientas profesionales para
            proveedoras en una experiencia única de belleza y bienestar.
          </p>

          <div className="pt-4">
            <Button
              asChild
              size="lg"
              className="bg-[#f4cc6e] hover:bg-[#f4cc6e]/90 text-[#141321] font-semibold px-8 py-6 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <Link
                href="https://wa.me/15557792120?text=Hola%20LuVelle%2C%20quiero%20saber%20m%C3%A1s"
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                Empezar por WhatsApp
              </Link>
            </Button>
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
