"use client"

import type React from "react"

import { useState } from "react"
import { X, Bell, Send, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface NotificationModalProps {
  isOpen: boolean
  onClose: () => void
  categoryName: string
  categoryIcon: string
  onSubmit?: (data: { email?: string; whatsapp?: string }) => Promise<void>
}

export function NotificationModal({ isOpen, onClose, categoryName, categoryIcon, onSubmit }: NotificationModalProps) {
  const [email, setEmail] = useState("")
  const [whatsapp, setWhatsapp] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email && !whatsapp) return

    setIsLoading(true)

    try {
      if (onSubmit) {
        await onSubmit({ email: email || undefined, whatsapp: whatsapp || undefined })
      } else {
        // Simulate API call if no onSubmit provided
        await new Promise((resolve) => setTimeout(resolve, 1500))
      }

      setIsSubmitted(true)

      // Auto close after success
      setTimeout(() => {
        onClose()
        setIsSubmitted(false)
        setEmail("")
        setWhatsapp("")
      }, 2000)
    } catch (error) {
      console.error("Error submitting notification:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleClose = () => {
    onClose()
    setIsSubmitted(false)
    setEmail("")
    setWhatsapp("")
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={handleClose} />

      <Card className="relative w-full max-w-md bg-dark border-gold/20">
        <CardHeader className="relative">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClose}
            className="absolute right-2 top-2 text-beige/60 hover:text-beige"
          >
            <X className="h-4 w-4" />
          </Button>
          <CardTitle className="font-dancing text-2xl text-gold text-center">¡Te avisaremos!</CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">
          {isSubmitted ? (
            <div className="text-center py-6">
              <div className="w-16 h-16 mx-auto bg-gradient-to-br from-gold/20 to-gold/10 rounded-full flex items-center justify-center mb-4 border border-gold/30">
                <CheckCircle className="h-8 w-8 text-gold" />
              </div>
              <h3 className="text-xl font-playfair text-gold mb-2">¡Listo!</h3>
              <p className="text-beige/80 text-sm">
                Te notificaremos tan pronto como {categoryName} esté disponible en LuVelle
              </p>
            </div>
          ) : (
            <>
              <div className="text-center">
                <div className="w-16 h-16 mx-auto bg-gradient-to-br from-gold/20 to-gold/10 rounded-full flex items-center justify-center mb-4 border border-gold/30">
                  <span className="text-3xl">{categoryIcon}</span>
                </div>
                <p className="text-beige/80 text-sm">
                  Cuando <span className="text-gold font-medium">{categoryName}</span> esté disponible
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="text-center mb-4">
                  <div className="inline-flex items-center gap-2 bg-gradient-to-r from-gold/20 to-beige/20 text-gold px-3 py-1.5 rounded-full text-sm border border-gold/20">
                    <Bell className="h-3 w-3" />
                    <span>Déjanos tus datos</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="email" className="text-beige font-medium">
                      Correo electrónico
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="tu@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="bg-dark/60 border-gold/20 text-beige placeholder:text-beige/50 focus:border-gold focus:ring-gold/20"
                    />
                  </div>

                  <div>
                    <Label htmlFor="whatsapp" className="text-beige font-medium">
                      WhatsApp <span className="text-beige/60 text-sm">(opcional)</span>
                    </Label>
                    <Input
                      id="whatsapp"
                      type="tel"
                      placeholder="+506 8888-8888"
                      value={whatsapp}
                      onChange={(e) => setWhatsapp(e.target.value)}
                      className="bg-dark/60 border-gold/20 text-beige placeholder:text-beige/50 focus:border-gold focus:ring-gold/20"
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={(!email && !whatsapp) || isLoading}
                  className="w-full bg-gradient-to-r from-gold to-gold/80 text-dark font-semibold hover:from-gold/90 hover:to-gold/70 transition-all duration-300 disabled:opacity-50"
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-dark/30 border-t-dark rounded-full animate-spin" />
                      Enviando...
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Send className="h-4 w-4" />
                      Notificarme
                    </div>
                  )}
                </Button>

                <p className="text-xs text-beige/60 text-center">
                  Solo te contactaremos cuando esta categoría esté disponible.
                  <br />
                  Respetamos tu privacidad 💛
                </p>
              </form>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
