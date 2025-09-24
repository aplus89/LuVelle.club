"use client"

import React from "react"

import type { ReactNode } from "react"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Sparkles, Heart, Leaf, Package, Calculator, Users, ArrowRight, X, Star } from "lucide-react"

interface Category {
  id: string
  title: string
  subtitle: string
  icon: ReactNode
  color: string
  bgColor: string
  description: string
  features: string[]
  examples: string[]
  benefits: string
}

const categories: Category[] = [
  {
    id: "facial",
    title: "Cuidado",
    subtitle: "facial",
    icon: <Sparkles className="h-6 w-6" />,
    color: "text-orange-600",
    bgColor: "bg-gradient-to-br from-orange-200 to-orange-300",
    description:
      "Rutinas personalizadas para el cuidado de tu rostro con productos premium y tratamientos profesionales.",
    features: [
      "Análisis de tipo de piel",
      "Productos dermatológicamente probados",
      "Rutinas paso a paso personalizadas",
      "Tratamientos faciales profesionales",
    ],
    examples: ["Sérums anti-edad", "Mascarillas hidratantes", "Limpiezas profundas", "Tratamientos con láser"],
    benefits: "Piel radiante, hidratada y con aspecto juvenil que refleje tu belleza natural.",
  },
  {
    id: "corporal",
    title: "Bienestar",
    subtitle: "corporal",
    icon: <Heart className="h-6 w-6" />,
    color: "text-red-600",
    bgColor: "bg-gradient-to-br from-red-200 to-red-300",
    description: "Cuidado integral de tu cuerpo con productos nutritivos y servicios de relajación y bienestar.",
    features: [
      "Productos para todo tipo de piel",
      "Masajes terapéuticos",
      "Tratamientos corporales",
      "Rutinas de autocuidado",
    ],
    examples: ["Cremas corporales premium", "Aceites esenciales", "Masajes relajantes", "Exfoliaciones corporales"],
    benefits: "Cuerpo nutrido, relajado y en armonía, con una piel suave y sedosa.",
  },
  {
    id: "naturales",
    title: "Productos",
    subtitle: "naturales",
    icon: <Leaf className="h-6 w-6" />,
    color: "text-green-600",
    bgColor: "bg-gradient-to-br from-green-200 to-green-300",
    description: "Productos orgánicos y naturales cuidadosamente seleccionados para tu bienestar y el del planeta.",
    features: [
      "100% ingredientes naturales",
      "Certificaciones orgánicas",
      "Libre de químicos dañinos",
      "Packaging eco-friendly",
    ],
    examples: ["Cosméticos orgánicos", "Aceites naturales", "Jabones artesanales", "Suplementos herbales"],
    benefits: "Cuidado consciente que respeta tu piel y el medio ambiente.",
  },
  {
    id: "servicios",
    title: "Servicios",
    subtitle: "profesionales",
    icon: <Package className="h-6 w-6" />,
    color: "text-teal-600",
    bgColor: "bg-gradient-to-br from-teal-200 to-teal-300",
    description: "Acceso exclusivo a servicios de belleza y bienestar con profesionales certificados.",
    features: [
      "Profesionales certificados",
      "Servicios a domicilio",
      "Tratamientos especializados",
      "Seguimiento personalizado",
    ],
    examples: ["Masajes terapéuticos", "Tratamientos faciales", "Manicure y pedicure", "Asesoría en imagen"],
    benefits: "Experiencias profesionales que transforman tu rutina de autocuidado.",
  },
  {
    id: "financiera",
    title: "Asesoría",
    subtitle: "financiera",
    icon: <Calculator className="h-6 w-6" />,
    color: "text-blue-600",
    bgColor: "bg-gradient-to-br from-blue-200 to-blue-300",
    description: "Educación financiera especializada para mujeres emprendedoras y profesionales.",
    features: [
      "Planificación financiera personal",
      "Estrategias de inversión",
      "Educación en finanzas",
      "Asesoría para emprendedoras",
    ],
    examples: ["Talleres de inversión", "Planificación de presupuesto", "Asesoría crediticia", "Estrategias de ahorro"],
    benefits: "Independencia financiera y toma de decisiones informadas sobre tu dinero.",
  },
  {
    id: "sexualidad",
    title: "Sexualidad",
    subtitle: "consciente",
    icon: <Users className="h-6 w-6" />,
    color: "text-purple-600",
    bgColor: "bg-gradient-to-br from-purple-200 to-purple-300",
    description: "Educación y productos para una sexualidad plena, saludable y consciente.",
    features: [
      "Educación sexual integral",
      "Productos de bienestar íntimo",
      "Talleres y conferencias",
      "Asesoría especializada",
    ],
    examples: ["Talleres de autoconocimiento", "Productos de cuidado íntimo", "Asesoría en pareja", "Educación sexual"],
    benefits: "Bienestar íntimo y una relación saludable contigo misma y tu sexualidad.",
  },
]

function InteractiveCategories() {
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null)

  return (
    <>
      <div className="max-w-4xl mx-auto space-y-4">
        {categories.map((category) => (
          <Card
            key={category.id}
            className={`
              relative overflow-hidden cursor-pointer transition-all duration-300 border-0 shadow-lg
              ${
                hoveredCategory === category.id
                  ? "transform scale-105 shadow-2xl shadow-gold/30 bg-gradient-to-r from-dark/95 to-blue/20"
                  : "bg-dark/80 hover:bg-dark/90 hover:shadow-xl"
              }
            `}
            onMouseEnter={() => setHoveredCategory(category.id)}
            onMouseLeave={() => setHoveredCategory(null)}
            onClick={() => setSelectedCategory(category)}
          >
            <CardContent className="p-6">
              <div className="flex items-center gap-6">
                {/* Round Icon */}
                <div className="relative flex-shrink-0">
                  <div
                    className={`
                      w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg
                      ${category.bgColor}
                      ${hoveredCategory === category.id ? "scale-110 shadow-xl" : ""}
                    `}
                  >
                    <div className={`transition-all duration-300 ${category.color}`}>{category.icon}</div>
                  </div>

                  {/* Animated ring effect on hover */}
                  {hoveredCategory === category.id && (
                    <div className="absolute inset-0 rounded-full border-2 border-gold animate-ping opacity-75" />
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-playfair text-xl font-semibold text-cream">
                      {category.title} <span className="text-gold">{category.subtitle}</span>
                    </h3>
                    <ArrowRight
                      className={`
                        h-5 w-5 text-gold/60 transition-all duration-300
                        ${hoveredCategory === category.id ? "translate-x-1 text-gold" : ""}
                      `}
                    />
                  </div>
                  <p className="text-cream/80 text-sm leading-relaxed">{category.description}</p>
                </div>
              </div>

              {/* Hover overlay effect */}
              <div
                className={`
                  absolute inset-0 bg-gradient-to-r from-gold/5 to-transparent opacity-0 transition-opacity duration-300
                  ${hoveredCategory === category.id ? "opacity-100" : ""}
                `}
              />

              {/* Floating particles effect */}
              {hoveredCategory === category.id && (
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                  {[...Array(8)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-1 h-1 bg-gold rounded-full animate-ping opacity-60"
                      style={{
                        left: `${15 + i * 10}%`,
                        top: `${20 + (i % 3) * 30}%`,
                        animationDelay: `${i * 0.15}s`,
                        animationDuration: "2s",
                      }}
                    />
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Detailed Modal */}
      {selectedCategory && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto border-gold/30 bg-gradient-to-br from-dark via-dark/95 to-blue/20">
            <CardContent className="p-0">
              {/* Header */}
              <div
                className={`
                relative p-6 text-center
                ${selectedCategory.bgColor}
              `}
              >
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedCategory(null)}
                  className="absolute right-2 top-2 text-dark hover:bg-dark/10"
                >
                  <X className="h-4 w-4" />
                </Button>

                <div className={`mb-4 flex justify-center ${selectedCategory.color}`}>
                  <div className="p-4 bg-white/20 rounded-full">
                    <div className="w-8 h-8 flex items-center justify-center">
                      {React.cloneElement(selectedCategory.icon as React.ReactElement, {
                        className: "h-8 w-8",
                      })}
                    </div>
                  </div>
                </div>

                <h2 className="font-dancing text-3xl text-dark mb-2">
                  {selectedCategory.title} {selectedCategory.subtitle}
                </h2>
                <p className="text-dark/80 text-lg">{selectedCategory.description}</p>
              </div>

              {/* Content */}
              <div className="p-6 space-y-6">
                {/* Features */}
                <div>
                  <h3 className="font-playfair text-xl text-gold mb-4 flex items-center gap-2">
                    <Star className="h-5 w-5" />
                    ¿Qué incluye?
                  </h3>
                  <div className="grid md:grid-cols-2 gap-3">
                    {selectedCategory.features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-gold" />
                        <span className="text-cream/80 text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Examples */}
                <div>
                  <h3 className="font-playfair text-xl text-gold mb-4">Ejemplos de productos/servicios</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedCategory.examples.map((example, index) => (
                      <span
                        key={index}
                        className="text-xs bg-gold/10 text-gold px-3 py-1 rounded-full border border-gold/20"
                      >
                        {example}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Benefits */}
                <div className="bg-gradient-to-r from-gold/10 to-beige/10 border border-gold/20 rounded-xl p-4">
                  <h3 className="font-playfair text-lg text-gold mb-2">Beneficios para ti</h3>
                  <p className="text-cream/80 text-sm italic">{selectedCategory.benefits}</p>
                </div>

                {/* CTA */}
                <div className="text-center pt-4">
                  <Button
                    className="bg-transparent border border-gold text-gold hover:bg-gold/10 transition-all font-semibold px-8"
                    onClick={() => {
                      setSelectedCategory(null)
                      // Here you could navigate to the specific category or wizard
                      window.location.href = "/thebeautybox"
                    }}
                  >
                    Explorar {selectedCategory.title} {selectedCategory.subtitle}
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  )
}

export default InteractiveCategories
