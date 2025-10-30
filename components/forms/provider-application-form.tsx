"use client"

import type React from "react"

import { useState } from "react"
import { GlassCard } from "@/components/ui/glass-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from "@/hooks/use-toast"
import { createProviderApplicationAction } from "@/app/actions"
import { Loader2 } from "lucide-react"

const categoryOptions = [
  "Skincare",
  "Maquillaje",
  "Cabello",
  "Uñas",
  "Masajes",
  "Tratamientos Faciales",
  "Depilación",
  "Otro",
]

export function ProviderApplicationForm() {
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const { toast } = useToast()

  const [formData, setFormData] = useState({
    name: "",
    whatsapp: "",
    email: "",
    city: "",
    categories: [] as string[],
    portfolio_url: "",
    message: "",
  })

  const handleCategoryToggle = (category: string) => {
    setFormData((prev) => ({
      ...prev,
      categories: prev.categories.includes(category)
        ? prev.categories.filter((c) => c !== category)
        : [...prev.categories, category],
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.name || !formData.whatsapp || !formData.email || formData.categories.length === 0) {
      toast({
        title: "Campos requeridos",
        description: "Por favor completá todos los campos obligatorios.",
        variant: "destructive",
      })
      return
    }

    setLoading(true)

    const result = await createProviderApplicationAction(formData)

    if (result.success) {
      setSubmitted(true)
      toast({
        title: "Aplicación enviada",
        description: "Gracias por tu interés. Nos pondremos en contacto pronto.",
      })

      // Reset form
      setFormData({
        name: "",
        whatsapp: "",
        email: "",
        city: "",
        categories: [],
        portfolio_url: "",
        message: "",
      })
    } else {
      toast({
        title: "Error",
        description: "No pudimos enviar tu aplicación. Intentá de nuevo.",
        variant: "destructive",
      })
    }

    setLoading(false)
  }

  if (submitted) {
    return (
      <GlassCard className="p-12 text-center">
        <div className="text-6xl mb-6">✨</div>
        <h3 className="text-2xl font-bold text-[hsl(var(--brand-cream))] mb-4">Aplicación recibida</h3>
        <p className="text-[hsl(var(--brand-cream))]/70 mb-6">
          Gracias por tu interés en unirte a LuVelle. Revisaremos tu aplicación y nos pondremos en contacto pronto.
        </p>
        <Button onClick={() => setSubmitted(false)} variant="outline" className="glass-button-outline bg-transparent">
          Enviar otra aplicación
        </Button>
      </GlassCard>
    )
  }

  return (
    <GlassCard className="p-8">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name */}
        <div>
          <Label htmlFor="name" className="text-[hsl(var(--brand-cream))]">
            Nombre completo *
          </Label>
          <Input
            id="name"
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="bg-white/5 border-white/20 text-[hsl(var(--brand-cream))] placeholder:text-[hsl(var(--brand-cream))]/40"
            placeholder="Tu nombre"
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
            placeholder="tu@email.com"
          />
        </div>

        {/* City */}
        <div>
          <Label htmlFor="city" className="text-[hsl(var(--brand-cream))]">
            Ciudad
          </Label>
          <Input
            id="city"
            type="text"
            value={formData.city}
            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
            className="bg-white/5 border-white/20 text-[hsl(var(--brand-cream))] placeholder:text-[hsl(var(--brand-cream))]/40"
            placeholder="San José"
          />
        </div>

        {/* Categories */}
        <div>
          <Label className="text-[hsl(var(--brand-cream))] mb-3 block">Categorías de servicio *</Label>
          <div className="grid grid-cols-2 gap-3">
            {categoryOptions.map((category) => (
              <div key={category} className="flex items-center gap-2">
                <Checkbox
                  id={category}
                  checked={formData.categories.includes(category)}
                  onCheckedChange={() => handleCategoryToggle(category)}
                  className="border-white/20"
                />
                <label
                  htmlFor={category}
                  className="text-sm text-[hsl(var(--brand-cream))]/80 cursor-pointer select-none"
                >
                  {category}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Portfolio URL */}
        <div>
          <Label htmlFor="portfolio" className="text-[hsl(var(--brand-cream))]">
            Portfolio / Instagram
          </Label>
          <Input
            id="portfolio"
            type="url"
            value={formData.portfolio_url}
            onChange={(e) => setFormData({ ...formData, portfolio_url: e.target.value })}
            className="bg-white/5 border-white/20 text-[hsl(var(--brand-cream))] placeholder:text-[hsl(var(--brand-cream))]/40"
            placeholder="https://instagram.com/tu-perfil"
          />
        </div>

        {/* Message */}
        <div>
          <Label htmlFor="message" className="text-[hsl(var(--brand-cream))]">
            Contanos sobre tu experiencia
          </Label>
          <Textarea
            id="message"
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            className="bg-white/5 border-white/20 text-[hsl(var(--brand-cream))] placeholder:text-[hsl(var(--brand-cream))]/40 min-h-32"
            placeholder="Años de experiencia, especialidades, certificaciones..."
          />
        </div>

        {/* Submit */}
        <Button type="submit" disabled={loading} className="glass-button w-full" size="lg">
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
              Enviando...
            </>
          ) : (
            "Enviar aplicación"
          )}
        </Button>
      </form>
    </GlassCard>
  )
}
