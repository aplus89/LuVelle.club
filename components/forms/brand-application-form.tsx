"use client"

import type React from "react"

import { useState } from "react"
import { GlassCard } from "@/components/ui/glass-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { createBrandApplicationAction } from "@/app/actions"
import { Loader2 } from "lucide-react"
import { trackFormSubmit } from "@/lib/gtm-events"

export function BrandApplicationForm() {
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const { toast } = useToast()

  const [formData, setFormData] = useState({
    brand_name: "",
    contact_name: "",
    email: "",
    whatsapp: "",
    catalog_url: "",
    country: "Costa Rica",
    message: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.brand_name || !formData.contact_name || !formData.email || !formData.whatsapp) {
      toast({
        title: "Campos requeridos",
        description: "Por favor completá todos los campos obligatorios.",
        variant: "destructive",
      })
      return
    }

    setLoading(true)

    const result = await createBrandApplicationAction(formData)

    if (result.success) {
      trackFormSubmit("brand")

      setSubmitted(true)
      toast({
        title: "Postulación enviada",
        description: "Gracias por tu interés. Nos pondremos en contacto pronto.",
      })

      // Reset form
      setFormData({
        brand_name: "",
        contact_name: "",
        email: "",
        whatsapp: "",
        catalog_url: "",
        country: "Costa Rica",
        message: "",
      })
    } else {
      toast({
        title: "Error",
        description: "No pudimos enviar tu postulación. Intentá de nuevo.",
        variant: "destructive",
      })
    }

    setLoading(false)
  }

  if (submitted) {
    return (
      <GlassCard className="p-12 text-center">
        <div className="text-6xl mb-6">✨</div>
        <h3 className="text-2xl font-bold text-[hsl(var(--brand-cream))] mb-4">Postulación recibida</h3>
        <p className="text-[hsl(var(--brand-cream))]/70 mb-6">
          Gracias por tu interés en aliarte con LuVelle. Revisaremos tu postulación y nos pondremos en contacto pronto.
        </p>
        <Button onClick={() => setSubmitted(false)} variant="outline" className="glass-button-outline bg-transparent">
          Enviar otra postulación
        </Button>
      </GlassCard>
    )
  }

  return (
    <GlassCard className="p-8">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Brand Name */}
        <div>
          <Label htmlFor="brand_name" className="text-[hsl(var(--brand-cream))]">
            Nombre de la marca *
          </Label>
          <Input
            id="brand_name"
            type="text"
            required
            value={formData.brand_name}
            onChange={(e) => setFormData({ ...formData, brand_name: e.target.value })}
            className="bg-white/5 border-white/20 text-[hsl(var(--brand-cream))] placeholder:text-[hsl(var(--brand-cream))]/40"
            placeholder="Tu marca"
          />
        </div>

        {/* Contact Name */}
        <div>
          <Label htmlFor="contact_name" className="text-[hsl(var(--brand-cream))]">
            Nombre de contacto *
          </Label>
          <Input
            id="contact_name"
            type="text"
            required
            value={formData.contact_name}
            onChange={(e) => setFormData({ ...formData, contact_name: e.target.value })}
            className="bg-white/5 border-white/20 text-[hsl(var(--brand-cream))] placeholder:text-[hsl(var(--brand-cream))]/40"
            placeholder="Tu nombre"
          />
        </div>

        {/* Email */}
        <div>
          <Label htmlFor="email" className="text-[hsl(var(--brand-cream))]">
            Email *
          </Label>
          <Input
            id="email"
            type="email"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="bg-white/5 border-white/20 text-[hsl(var(--brand-cream))] placeholder:text-[hsl(var(--brand-cream))]/40"
            placeholder="contacto@marca.com"
          />
        </div>

        {/* WhatsApp */}
        <div>
          <Label htmlFor="whatsapp" className="text-[hsl(var(--brand-cream))]">
            WhatsApp *
          </Label>
          <Input
            id="whatsapp"
            type="tel"
            required
            value={formData.whatsapp}
            onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
            className="bg-white/5 border-white/20 text-[hsl(var(--brand-cream))] placeholder:text-[hsl(var(--brand-cream))]/40"
            placeholder="+506 1234 5678"
          />
        </div>

        {/* Catalog URL */}
        <div>
          <Label htmlFor="catalog" className="text-[hsl(var(--brand-cream))]">
            Catálogo / Sitio web
          </Label>
          <Input
            id="catalog"
            type="url"
            value={formData.catalog_url}
            onChange={(e) => setFormData({ ...formData, catalog_url: e.target.value })}
            className="bg-white/5 border-white/20 text-[hsl(var(--brand-cream))] placeholder:text-[hsl(var(--brand-cream))]/40"
            placeholder="https://tumarca.com"
          />
        </div>

        {/* Country */}
        <div>
          <Label htmlFor="country" className="text-[hsl(var(--brand-cream))]">
            País
          </Label>
          <Input
            id="country"
            type="text"
            value={formData.country}
            onChange={(e) => setFormData({ ...formData, country: e.target.value })}
            className="bg-white/5 border-white/20 text-[hsl(var(--brand-cream))] placeholder:text-[hsl(var(--brand-cream))]/40"
            placeholder="Costa Rica"
          />
        </div>

        {/* Message */}
        <div>
          <Label htmlFor="message" className="text-[hsl(var(--brand-cream))]">
            Contanos sobre tu marca
          </Label>
          <Textarea
            id="message"
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            className="bg-white/5 border-white/20 text-[hsl(var(--brand-cream))] placeholder:text-[hsl(var(--brand-cream))]/40 min-h-32"
            placeholder="Historia de la marca, productos principales, valores..."
          />
        </div>

        {/* Submit */}
        <Button
          type="submit"
          disabled={loading}
          className="bg-brand-gold hover:bg-brand-gold/90 text-brand-dark font-semibold w-full"
          size="lg"
        >
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
              Enviando...
            </>
          ) : (
            "Postular mi marca"
          )}
        </Button>
      </form>
    </GlassCard>
  )
}
