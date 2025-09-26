"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { RefreshCw, Heart, Sparkles, Coffee, Flower2 } from "lucide-react"

interface ProductsErrorStateProps {
  errorType: "connection" | "empty" | "unknown"
  onRetry?: () => void
  isRetrying?: boolean
  customMessage?: string
}

const errorMessages = {
  connection: [
    "A veces las mejores cosas toman su tiempo ☁️✨",
    "Tu belleza merece lo mejor… ¡Estamos preparando justo eso! 💫",
    "Todo lo bueno comienza con una pausa consciente ☕",
  ],
  empty: [
    "Estamos preparando algo hermoso para vos 💛",
    "LuVelle se toma su tiempo para sorprenderte 🌸",
    "Pequeño descanso. Grande estilo.",
  ],
  unknown: [
    "Ups… algo no salió como queríamos 😅. ¡Volvé a intentarlo en unos minutos!",
    "Patience is a form of self-care. Take a deep breath and let positivity fill your heart.",
    "Estamos trabajando en ello. Tu experiencia LuVelle vale la espera ✨",
  ],
}

const mascotIcons = [
  <Heart key="heart" className="h-8 w-8 text-gold" />,
  <Sparkles key="sparkles" className="h-8 w-8 text-gold" />,
  <Coffee key="coffee" className="h-8 w-8 text-gold" />,
  <Flower2 key="flower2" className="h-8 w-8 text-gold" />,
]

export function ProductsErrorState({ errorType, onRetry, isRetrying = false, customMessage }: ProductsErrorStateProps) {
  const [currentMessage, setCurrentMessage] = useState("")
  const [currentMascot, setCurrentMascot] = useState(0)

  useEffect(() => {
    // Select random message and mascot on mount
    const messages = errorMessages[errorType]
    const randomMessage = messages[Math.floor(Math.random() * messages.length)]
    setCurrentMessage(customMessage || randomMessage)
    setCurrentMascot(Math.floor(Math.random() * mascotIcons.length))
  }, [errorType, customMessage])

  return (
    <div className="max-w-2xl mx-auto text-center py-16">
      <Card className="border-gold/30 bg-gradient-to-br from-cream/10 via-beige/5 to-gold/5 shadow-2xl shadow-gold/10 overflow-hidden">
        <CardContent className="p-8 space-y-6 relative">
          {/* Floating background elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-4 right-4 w-16 h-16 bg-gold/10 rounded-full animate-pulse" />
            <div
              className="absolute bottom-8 left-8 w-12 h-12 bg-beige/20 rounded-full animate-pulse"
              style={{ animationDelay: "1s" }}
            />
            <div
              className="absolute top-1/2 left-4 w-8 h-8 bg-gold/5 rounded-full animate-pulse"
              style={{ animationDelay: "2s" }}
            />
          </div>

          {/* Main illustration area */}
          <div className="relative z-10 mb-8">
            <div className="relative mx-auto w-48 h-48 mb-6">
              {/* Main illustration */}
              <div className="absolute inset-0 bg-gradient-to-br from-beige/20 to-gold/10 rounded-full animate-pulse-slow" />
              <img
                src="/images/luvelle-error-mascot.png"
                alt="LuVelle está trabajando en ello"
                className="w-full h-full object-cover rounded-full shadow-lg"
                onError={(e) => {
                  // Fallback to icon if image fails to load
                  e.currentTarget.style.display = "none"
                }}
              />

              {/* Fallback mascot icon */}
              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-cream/90 to-beige/80 rounded-full shadow-lg">
                <div className="animate-float">{mascotIcons[currentMascot]}</div>
              </div>

              {/* Floating hearts animation */}
              <div className="absolute -top-2 -right-2">
                <div className="w-6 h-6 text-gold animate-bounce" style={{ animationDelay: "0.5s" }}>
                  <Heart className="h-6 w-6 fill-current" />
                </div>
              </div>
              <div className="absolute -bottom-2 -left-2">
                <div className="w-4 h-4 text-gold/60 animate-bounce" style={{ animationDelay: "1.5s" }}>
                  <Sparkles className="h-4 w-4 fill-current" />
                </div>
              </div>
            </div>

            {/* Main message */}
            <div className="space-y-4">
              <h2 className="font-dancing text-3xl md:text-4xl text-gold leading-tight">We're working on it.</h2>

              <p className="text-lg md:text-xl text-dark/80 font-medium max-w-md mx-auto leading-relaxed">
                {currentMessage}
              </p>
            </div>
          </div>

          {/* Error type specific content */}
          <div className="relative z-10 space-y-4">
            {errorType === "connection" && (
              <div className="bg-blue-50/50 border border-blue-200/30 rounded-xl p-4">
                <p className="text-blue-800/80 text-sm">
                  <strong>Tip:</strong> Verificá tu conexión a internet o intentá recargar la página.
                </p>
              </div>
            )}

            {errorType === "empty" && (
              <div className="bg-gold/10 border border-gold/20 rounded-xl p-4">
                <p className="text-dark/70 text-sm">
                  <strong>¡Pronto!</strong> Estamos agregando productos increíbles a nuestra colección.
                </p>
              </div>
            )}

            {errorType === "unknown" && (
              <div className="bg-orange-50/50 border border-orange-200/30 rounded-xl p-4">
                <p className="text-orange-800/80 text-sm">
                  <strong>Oops!</strong> Algo inesperado ocurrió. Nuestro equipo ya está trabajando en solucionarlo.
                </p>
              </div>
            )}
          </div>

          {/* Action buttons */}
          {onRetry && (
            <div className="relative z-10 pt-4">
              <Button
                onClick={onRetry}
                disabled={isRetrying}
                className="bg-gradient-to-r from-gold to-gold/80 text-dark font-semibold hover:from-gold/90 hover:to-gold/70 transition-all duration-300 disabled:opacity-50 px-8 py-3"
              >
                {isRetrying ? (
                  <div className="flex items-center gap-2">
                    <RefreshCw className="h-4 w-4 animate-spin" />
                    Intentando...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <RefreshCw className="h-4 w-4" />
                    Volver a intentar
                  </div>
                )}
              </Button>
            </div>
          )}

          {/* Inspirational footer */}
          <div className="relative z-10 pt-6 border-t border-gold/20">
            <p className="text-dark/60 text-sm italic">
              "Patience is a form of self-care. Take a deep breath and let positivity fill your heart."
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Additional mascot elements */}
      <div className="mt-8 flex justify-center space-x-4 opacity-60">
        <div className="w-3 h-3 bg-gold rounded-full animate-pulse" />
        <div className="w-3 h-3 bg-gold rounded-full animate-pulse" style={{ animationDelay: "0.5s" }} />
        <div className="w-3 h-3 bg-gold rounded-full animate-pulse" style={{ animationDelay: "1s" }} />
      </div>
    </div>
  )
}
