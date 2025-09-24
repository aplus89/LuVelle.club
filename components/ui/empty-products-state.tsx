"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Send, CheckCircle, MessageCircle } from "lucide-react"

interface EmptyProductsStateProps {
  title: string
  subtitle: string
  selectedCategories?: string[]
  showWhatsAppInput?: boolean
}

export function EmptyProductsState({
  title,
  subtitle,
  selectedCategories = [],
  showWhatsAppInput = false,
}: EmptyProductsStateProps) {
  const [whatsapp, setWhatsapp] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!whatsapp.trim()) return

    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setIsSubmitted(true)
    setIsLoading(false)

    // Auto reset after success
    setTimeout(() => {
      setIsSubmitted(false)
      setWhatsapp("")
    }, 3000)
  }

  return (
    <div className="max-w-2xl mx-auto text-center py-12">
      <Card className="border-gold/30 bg-gradient-to-br from-dark via-dark/95 to-blue/20 shadow-2xl shadow-gold/10">
        <CardContent className="p-8 space-y-6">
          {/* Crown SVG */}
          <div className="flex justify-center mb-6">
            <div className="relative">
              <svg
                width="80"
                height="80"
                viewBox="0 0 100 100"
                className="text-gold animate-pulse-slow"
                fill="currentColor"
              >
                <path d="M20 30 L30 20 L40 30 L50 15 L60 30 L70 20 L80 30 L75 70 L25 70 Z" />
                <circle cx="30" cy="25" r="3" className="fill-cream" />
                <circle cx="50" cy="20" r="4" className="fill-cream" />
                <circle cx="70" cy="25" r="3" className="fill-cream" />
                <rect x="25" y="65" width="50" height="8" rx="2" className="fill-gold" />
              </svg>
              <div className="absolute inset-0 bg-gradient-to-r from-gold/20 to-transparent rounded-full blur-xl animate-pulse" />
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="font-dancing text-3xl text-gold">{title}</h2>
            <p className="text-cream/80 text-lg">{subtitle}</p>

            {selectedCategories.length > 0 && (
              <div className="space-y-2">
                <p className="text-cream/70 text-sm">Categorías seleccionadas:</p>
                <div className="flex flex-wrap gap-2 justify-center">
                  {selectedCategories.map((category, index) => (
                    <span
                      key={index}
                      className="text-xs bg-gold/10 text-gold px-3 py-1 rounded-full border border-gold/20"
                    >
                      {category}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="bg-gradient-to-r from-gold/10 to-beige/10 border border-gold/20 rounded-xl p-4">
            <p className="text-gold font-medium text-lg mb-2">👑 Pronto te atenderemos</p>
            <p className="text-cream/80 text-sm">
              Estamos seleccionando cuidadosamente los mejores proveedores para ofrecerte productos y servicios de la
              más alta calidad.
            </p>
          </div>

          {showWhatsAppInput && (
            <div className="space-y-4">
              {isSubmitted ? (
                <div className="text-center py-4">
                  <div className="w-16 h-16 mx-auto bg-gradient-to-br from-gold/20 to-gold/10 rounded-full flex items-center justify-center mb-4 border border-gold/30">
                    <CheckCircle className="h-8 w-8 text-gold" />
                  </div>
                  <h3 className="text-xl font-playfair text-gold mb-2">¡Perfecto!</h3>
                  <p className="text-cream/80 text-sm">
                    Te contactaremos por WhatsApp tan pronto como tengamos productos disponibles
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="text-center mb-4">
                    <div className="inline-flex items-center gap-2 bg-gradient-to-r from-green-500/20 to-green-400/20 text-green-300 px-4 py-2 rounded-full text-sm border border-green-400/20">
                      <MessageCircle className="h-4 w-4" />
                      <span>Te avisaremos por WhatsApp</span>
                    </div>
                  </div>

                  <div className="max-w-sm mx-auto">
                    <Label htmlFor="whatsapp" className="text-cream font-medium block mb-2">
                      Tu número de WhatsApp
                    </Label>
                    <Input
                      id="whatsapp"
                      type="tel"
                      placeholder="+506 8888-8888"
                      value={whatsapp}
                      onChange={(e) => setWhatsapp(e.target.value)}
                      className="bg-dark/60 border-gold/20 text-cream placeholder:text-cream/50 focus:border-gold focus:ring-gold/20"
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={!whatsapp.trim() || isLoading}
                    className="bg-gradient-to-r from-gold to-gold/80 text-dark font-semibold hover:from-gold/90 hover:to-gold/70 transition-all duration-300 disabled:opacity-50"
                  >
                    {isLoading ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-dark/30 border-t-dark rounded-full animate-spin" />
                        Enviando...
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <Send className="h-4 w-4" />
                        Notificarme cuando esté listo
                      </div>
                    )}
                  </Button>

                  <p className="text-xs text-cream/60">
                    Solo te contactaremos cuando tengamos productos disponibles.
                    <br />
                    Respetamos tu privacidad 💛
                  </p>
                </form>
              )}
            </div>
          )}

          <div className="border-t border-gold/20 pt-4">
            <p className="text-cream/60 text-sm">
              Mientras tanto, puedes seguirnos en nuestras redes sociales para estar al día con las novedades de
              LuVelle.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
