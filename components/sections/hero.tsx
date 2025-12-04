"use client"

import { usePersona } from "@/components/persona-provider"
import { Button } from "@/components/ui/button"
import { Check, ChevronLeft, ChevronRight } from "lucide-react"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import type { Persona } from "@/lib/supabase/types"

const personaCards = [
  {
    id: "user" as Persona,
    title: "AI para cada Mujer",
    description: "Productos de belleza curados con inteligencia artificial, personalizados para ti cada mes",
    image: "/elegant-woman-with-luxury-beauty-products-spa-sett.jpg",
    gradient: "from-rose-500/20 via-pink-500/20 to-rose-500/20",
    glowColor: "rgba(244, 114, 182, 0.3)",
  },
  {
    id: "provider" as Persona,
    title: "Ofrece servicios profesionales",
    description: "Conecta tu talento con miles de mujeres que buscan servicios de belleza premium",
    image: "/professional-beauty-salon-makeup-artist-working.jpg",
    gradient: "from-amber-500/20 via-orange-500/20 to-amber-500/20",
    glowColor: "rgba(251, 146, 60, 0.3)",
  },
  {
    id: "brand" as Persona,
    title: "Vende tus productos en LuVelle",
    description: "Expande tu marca a una comunidad apasionada por la belleza y el autocuidado",
    image: "/luxury-beauty-products-cosmetics-bottles-elegant-d.jpg",
    gradient: "from-blue-500/20 via-indigo-500/20 to-blue-500/20",
    glowColor: "rgba(99, 102, 241, 0.3)",
  },
]

const heroContent = {
  user: {
    bullets: [
      "Productos premium de marcas reconocidas",
      "Personalización según tu tipo de piel",
      "Envío gratis en Costa Rica",
    ],
    cta1: { text: "Crear mi Beauty Box", href: "/join" },
    cta2: { text: "Ver planes", href: "#planes" },
  },
  provider: {
    bullets: ["Acceso a clientas premium", "Gestión de reservas simplificada", "Marketing incluido"],
    cta1: { text: "Aplicar como Proveedora", href: "/providers" },
    cta2: { text: "Agendar llamada", href: "https://calendly.com/luvelle", external: true },
  },
  brand: {
    bullets: ["Exposición a audiencia calificada", "Distribución mensual garantizada", "Feedback directo de usuarias"],
    cta1: { text: "Postular mi marca", href: "/partners" },
    cta2: { text: "Hablar por WhatsApp", href: "https://wa.me/15557792120", external: true },
  },
}

export function Hero() {
  const { persona, setPersona } = usePersona()
  const [current, setCurrent] = useState(0)
  const wrapRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const [isMobile, setIsMobile] = useState(false)

  // Update current when persona changes
  useEffect(() => {
    const index = personaCards.findIndex((card) => card.id === persona)
    if (index !== -1 && index !== current) {
      setCurrent(index)
    }
  }, [persona])

  // Detect mobile
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.matchMedia("(max-width:767px)").matches)
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  // Center active card
  useEffect(() => {
    if (!wrapRef.current || !trackRef.current) return
    const wrap = wrapRef.current
    const cards = Array.from(trackRef.current.children) as HTMLElement[]
    const card = cards[current]
    if (!card) return

    const axis = isMobile ? "top" : "left"
    const size = isMobile ? "clientHeight" : "clientWidth"
    const start = isMobile ? card.offsetTop : card.offsetLeft

    wrap.scrollTo({
      [axis]: start - (wrap[size] / 2 - card[size] / 2),
      behavior: "smooth",
    })
  }, [current, isMobile])

  const activate = (index: number) => {
    if (index === current) return
    setCurrent(index)
    setPersona(personaCards[index].id)
  }

  const go = (step: number) => {
    activate(Math.min(Math.max(current + step, 0), personaCards.length - 1))
  }

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (["ArrowRight", "ArrowDown"].includes(e.key)) go(1)
      if (["ArrowLeft", "ArrowUp"].includes(e.key)) go(-1)
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [current])

  // Touch swipe support
  useEffect(() => {
    if (!trackRef.current) return
    const track = trackRef.current
    let sx = 0,
      sy = 0

    const handleTouchStart = (e: TouchEvent) => {
      sx = e.touches[0].clientX
      sy = e.touches[0].clientY
    }

    const handleTouchEnd = (e: TouchEvent) => {
      const dx = e.changedTouches[0].clientX - sx
      const dy = e.changedTouches[0].clientY - sy
      if (isMobile ? Math.abs(dy) > 60 : Math.abs(dx) > 60) {
        go((isMobile ? dy : dx) > 0 ? -1 : 1)
      }
    }

    track.addEventListener("touchstart", handleTouchStart, { passive: true })
    track.addEventListener("touchend", handleTouchEnd, { passive: true })

    return () => {
      track.removeEventListener("touchstart", handleTouchStart)
      track.removeEventListener("touchend", handleTouchEnd)
    }
  }, [current, isMobile])

  const content = heroContent[persona]

  return (
    <section
      id="inicio"
      className="relative min-h-screen flex flex-col overflow-hidden bg-gradient-to-b from-[hsl(var(--brand-dark))] to-[hsl(var(--brand-blue))]"
    >
      <div className="relative flex-1 flex items-center py-12 md:py-20">
        {/* Navigation buttons - Desktop only */}
        <button
          onClick={() => go(-1)}
          disabled={current === 0}
          className="hidden md:flex absolute left-4 z-20 items-center justify-center w-12 h-12 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
          aria-label="Previous"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={() => go(1)}
          disabled={current === personaCards.length - 1}
          className="hidden md:flex absolute right-4 z-20 items-center justify-center w-12 h-12 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
          aria-label="Next"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Scrollable container */}
        <div
          ref={wrapRef}
          className="w-full h-[600px] md:h-[500px] overflow-hidden relative"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          <div ref={trackRef} className="flex md:flex-row flex-col gap-4 md:gap-6 h-full items-center px-4 md:px-20">
            {personaCards.map((card, index) => {
              const isActive = index === current
              return (
                <div
                  key={card.id}
                  className={`relative flex-shrink-0 rounded-3xl overflow-hidden cursor-pointer transition-all duration-[550ms] ease-[cubic-bezier(0.4,0,0.2,1)] ${
                    isActive
                      ? "w-full md:w-[600px] h-[500px] md:h-[450px] scale-100"
                      : "w-full md:w-[200px] h-[120px] md:h-[450px] scale-95 md:scale-90"
                  }`}
                  onClick={() => activate(index)}
                  onMouseEnter={() => {
                    if (window.matchMedia("(hover:hover)").matches) activate(index)
                  }}
                >
                  {/* Background image with zoom effect */}
                  <div
                    className={`absolute inset-0 bg-cover bg-center transition-all duration-[550ms] ${
                      isActive ? "scale-110 brightness-110" : "scale-100 brightness-75"
                    }`}
                    style={{ backgroundImage: `url(${card.image})` }}
                  />

                  {/* Glass overlay with gradient */}
                  <div
                    className={`absolute inset-0 backdrop-blur-sm bg-gradient-to-br ${card.gradient} transition-all duration-[550ms]`}
                  />

                  {/* Border glow effect */}
                  <div
                    className={`absolute inset-0 rounded-3xl transition-all duration-[550ms] ${
                      isActive
                        ? "ring-2 ring-[hsl(var(--brand-gold))] shadow-[0_0_30px_rgba(246,206,111,0.4)]"
                        : "ring-1 ring-white/20"
                    }`}
                  />

                  {/* Content */}
                  <div className="relative h-full flex flex-col justify-end p-6 md:p-8">
                    {/* Vertical text for collapsed state on desktop */}
                    {!isActive && !isMobile && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <h3
                          className="text-2xl font-bold text-white"
                          style={{ writingMode: "vertical-rl", textOrientation: "mixed" }}
                        >
                          {card.title}
                        </h3>
                      </div>
                    )}

                    {/* Expanded content */}
                    <div
                      className={`transition-all duration-[550ms] ${
                        isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
                      }`}
                    >
                      {/* Shimmer effect on active */}
                      {isActive && <div className="absolute inset-0 animate-shimmer pointer-events-none" />}

                      <div className="space-y-4">
                        <h2 className="heading-font text-4xl md:text-5xl font-bold text-white leading-tight">
                          {card.title}
                        </h2>
                        <p className="text-lg md:text-xl text-white/90 max-w-lg">{card.description}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Dots indicator - Mobile only */}
        <div className="md:hidden absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-20">
          {personaCards.map((_, index) => (
            <button
              key={index}
              onClick={() => activate(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                index === current ? "bg-[hsl(var(--brand-gold))] w-6" : "bg-white/30"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      <div className="container mx-auto px-4 pb-20">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          {/* Bullets */}
          <div className="flex flex-col md:flex-row gap-4 justify-center items-start md:items-center text-left md:text-center">
            {content.bullets.map((bullet, index) => (
              <div key={index} className="flex items-center gap-2">
                <Check className="w-5 h-5 text-[hsl(var(--brand-gold))] flex-shrink-0" />
                <span className="text-[hsl(var(--brand-cream))]">{bullet}</span>
              </div>
            ))}
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Button asChild size="lg" className="glass-button text-lg px-8">
              {content.cta1.external ? (
                <a href={content.cta1.href} target="_blank" rel="noopener noreferrer">
                  {content.cta1.text}
                </a>
              ) : (
                <Link href={content.cta1.href}>{content.cta1.text}</Link>
              )}
            </Button>
            <Button asChild size="lg" variant="outline" className="glass-button-outline text-lg px-8 bg-transparent">
              {content.cta2.external ? (
                <a href={content.cta2.href} target="_blank" rel="noopener noreferrer">
                  {content.cta2.text}
                </a>
              ) : (
                <a href={content.cta2.href}>{content.cta2.text}</a>
              )}
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
