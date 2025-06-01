"use client"

import type React from "react"

import { useState } from "react"
import { CheckCircle, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

export default function PartnersPage() {
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [partnerType, setPartnerType] = useState<string>("brand")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Simulate form submission
    setTimeout(() => {
      setFormSubmitted(true)
    }, 1000)
  }

  return (
    <div className="min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="font-dancing text-4xl md:text-5xl text-gold mb-4">Partners LuVelle</h1>
          <p className="text-lg text-cream/80 max-w-2xl mx-auto">
            Únete a nuestra red exclusiva de marcas y servicios de belleza y bienestar
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Benefits */}
          <div>
            <h2 className="font-playfair text-2xl text-cream mb-6">¿Por qué ser partner de LuVelle?</h2>

            <div className="space-y-6">
              {[
                {
                  title: "Alcance directo",
                  description: "Llega a miles de mujeres interesadas en belleza y bienestar en toda LATAM.",
                },
                {
                  title: "Exposición de marca",
                  description: "Posiciona tu marca entre un público selecto y de alto valor.",
                },
                {
                  title: "Feedback valioso",
                  description: "Recibe opiniones directas sobre tus productos o servicios.",
                },
                {
                  title: "Crecimiento conjunto",
                  description: "Crece con nosotras en un ecosistema de belleza y bienestar en expansión.",
                },
              ].map((benefit, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <CheckCircle className="h-6 w-6 text-gold flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-medium text-cream">{benefit.title}</h3>
                    <p className="text-cream/70">{benefit.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12">
              <h2 className="font-playfair text-2xl text-cream mb-6">Tipos de colaboración</h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Card className="border-gold/10 bg-dark/60">
                  <CardHeader>
                    <CardTitle className="text-gold">Marcas</CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm text-cream/70">
                    <p>
                      Incluye tus productos en nuestras Beauty Boxes y llega directamente a las manos de nuestras
                      clientas.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-gold/10 bg-dark/60">
                  <CardHeader>
                    <CardTitle className="text-gold">Servicios</CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm text-cream/70">
                    <p>
                      Ofrece tus servicios de belleza y bienestar a nuestra comunidad a través de experiencias
                      exclusivas.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <Card className="border-gold/20 bg-dark/60">
              <CardHeader>
                <CardTitle className="text-gold text-center">Contáctanos</CardTitle>
              </CardHeader>
              <CardContent>
                {formSubmitted ? (
                  <div className="text-center py-8">
                    <div className="flex justify-center mb-4">
                      <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center">
                        <CheckCircle className="h-8 w-8 text-gold" />
                      </div>
                    </div>
                    <h3 className="text-xl font-medium text-cream mb-2">¡Gracias por tu interés!</h3>
                    <p className="text-cream/70">
                      Hemos recibido tu información. Nuestro equipo se pondrá en contacto contigo en las próximas 48
                      horas.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="name" className="text-cream">
                          Nombre completo
                        </Label>
                        <Input
                          id="name"
                          placeholder="Tu nombre"
                          required
                          className="bg-cream/5 border-cream/20 text-cream placeholder:text-cream/50"
                        />
                      </div>

                      <div>
                        <Label htmlFor="company" className="text-cream">
                          Empresa / Marca
                        </Label>
                        <Input
                          id="company"
                          placeholder="Nombre de tu empresa"
                          required
                          className="bg-cream/5 border-cream/20 text-cream placeholder:text-cream/50"
                        />
                      </div>

                      <div>
                        <Label htmlFor="email" className="text-cream">
                          Email
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="tu@email.com"
                          required
                          className="bg-cream/5 border-cream/20 text-cream placeholder:text-cream/50"
                        />
                      </div>

                      <div>
                        <Label className="text-cream mb-2 block">Tipo de colaboración</Label>
                        <RadioGroup
                          value={partnerType}
                          onValueChange={setPartnerType}
                          className="flex space-x-4"
                          defaultValue="brand"
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="brand" id="brand" />
                            <Label htmlFor="brand" className="text-cream">
                              Marca / Productos
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="service" id="service" />
                            <Label htmlFor="service" className="text-cream">
                              Servicios
                            </Label>
                          </div>
                        </RadioGroup>
                      </div>

                      <div>
                        <Label htmlFor="message" className="text-cream">
                          Mensaje
                        </Label>
                        <Textarea
                          id="message"
                          placeholder="Cuéntanos sobre tu marca o servicio..."
                          rows={4}
                          className="bg-cream/5 border-cream/20 text-cream placeholder:text-cream/50"
                        />
                      </div>
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-transparent border border-gold text-gold hover:bg-gold/10 transition-all"
                    >
                      Enviar solicitud
                      <Send className="ml-2 h-4 w-4" />
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
