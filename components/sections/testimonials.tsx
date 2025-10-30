"use client"

import { GlassCard } from "@/components/ui/glass-card"
import { Star } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

const testimonials = [
  {
    name: "María González",
    role: "Socia Premium",
    content:
      "LuVelle transformó mi rutina de belleza. Cada mes recibo productos increíbles que realmente funcionan para mi piel. ¡Lo recomiendo 100%!",
    rating: 5,
  },
  {
    name: "Ana Rodríguez",
    role: "Socia Deluxe",
    content:
      "La personalización es perfecta. Los productos siempre llegan a tiempo y la calidad es excepcional. Vale cada colón.",
    rating: 5,
  },
  {
    name: "Laura Jiménez",
    role: "Proveedora",
    content:
      "Como proveedora, LuVelle me ha ayudado a crecer mi negocio. Tengo clientas constantes y el sistema es muy fácil de usar.",
    rating: 5,
  },
]

export function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const next = () => setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  const prev = () => setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)

  return (
    <section id="socias" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="heading-font text-4xl md:text-5xl font-bold mb-4">Lo que dicen nuestras socias</h2>
          <p className="text-xl text-[hsl(var(--brand-cream))]/80">Historias reales de nuestra comunidad</p>
        </div>

        <div className="max-w-4xl mx-auto relative">
          <GlassCard className="p-8 md:p-12">
            <div className="flex gap-1 mb-6 justify-center">
              {Array.from({ length: testimonials[currentIndex].rating }).map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-[hsl(var(--brand-gold))] text-[hsl(var(--brand-gold))]" />
              ))}
            </div>

            <p className="text-lg md:text-xl text-[hsl(var(--brand-cream))] text-center mb-8 leading-relaxed">
              "{testimonials[currentIndex].content}"
            </p>

            <div className="text-center">
              <p className="font-bold text-[hsl(var(--brand-cream))]">{testimonials[currentIndex].name}</p>
              <p className="text-sm text-[hsl(var(--brand-cream))]/60">{testimonials[currentIndex].role}</p>
            </div>
          </GlassCard>

          {/* Navigation */}
          <div className="flex justify-center gap-4 mt-8">
            <Button onClick={prev} variant="outline" size="icon" className="glass-button-outline bg-transparent">
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <div className="flex items-center gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentIndex(i)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    i === currentIndex ? "bg-[hsl(var(--brand-gold))] w-8" : "bg-white/30"
                  }`}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>
            <Button onClick={next} variant="outline" size="icon" className="glass-button-outline bg-transparent">
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
