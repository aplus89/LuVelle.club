"use client"

import type React from "react"
import { useState } from "react"
import { ArrowRight, Boxes, Gift, Handshake, Loader2, Megaphone, Sparkles, Store, Users } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { createBrandApplicationAction } from "@/app/actions"
import { ConstellationField } from "@/components/brand/luvelle-visual-system"

const interestOptions = [
  "Llegar a profesionales de belleza y bienestar",
  "Sampling / pruebas de producto",
  "Beneficios para Club VIP",
  "Beauty Box",
  "Eventos y experiencias",
  "Contenido / co-marketing",
  "Marketplace futuro",
  "Otro",
]

const opportunities = [
  { icon: Users, title: "Profesionales", copy: "Conectá tu marca con especialistas que conocen, usan y recomiendan productos en su trabajo diario." },
  { icon: Gift, title: "Club VIP", copy: "Creá beneficios y experiencias para una comunidad interesada en belleza y bienestar." },
  { icon: Boxes, title: "Beauty Box", copy: "Explorá sampling, descubrimiento y nuevas formas de llevar tus productos a potenciales clientas." },
  { icon: Megaphone, title: "Comunidad y eventos", copy: "Participá en conversaciones, educación, contenido y experiencias relevantes para el sector." },
]

export function PartnersGrowthExperiment() {
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const { toast } = useToast()
  const [formData, setFormData] = useState({ brandName: "", contactName: "", email: "", whatsapp: "", website: "", country: "Costa Rica", category: "", mainInterest: "", desiredOutcome: "", notes: "" })

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    if (!formData.brandName || !formData.contactName || !formData.email || !formData.whatsapp || !formData.mainInterest) {
      toast({ title: "Faltan datos", description: "Completá los campos requeridos para registrar tu marca.", variant: "destructive" })
      return
    }

    setLoading(true)
    const result = await createBrandApplicationAction({
      brand_name: formData.brandName,
      contact_name: formData.contactName,
      email: formData.email,
      whatsapp: formData.whatsapp,
      catalog_url: formData.website || undefined,
      country: formData.country || "Costa Rica",
      message: [
        `Categoría: ${formData.category || "No indicada"}`,
        `Interés principal: ${formData.mainInterest}`,
        `Resultado esperado: ${formData.desiredOutcome || "No indicado"}`,
        `Notas: ${formData.notes || "No indicadas"}`,
        "Fuente: partners-growth-v1",
      ].join("\n"),
    })

    if (result.success) {
      setSubmitted(true)
      toast({ title: "Marca registrada", description: "Gracias. Revisaremos cómo podría encajar tu marca dentro de LuVelle." })
    } else {
      toast({ title: "No pudimos registrar la marca", description: "Intentá de nuevo en unos minutos.", variant: "destructive" })
    }
    setLoading(false)
  }

  return (
    <>
      <section className="relative overflow-hidden bg-[#FFF7F3] px-4 py-20 md:py-28">
        <ConstellationField className="opacity-45" />
        <div className="absolute -right-20 top-0 h-80 w-80 rounded-full bg-[#FFD8CC]/70 blur-3xl" />
        <div className="relative mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1.05fr_.95fr] lg:items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-[#F2DDD7] bg-white px-4 py-2 text-sm font-semibold text-[#5B2A86]"><Handshake className="h-4 w-4" /> LuVelle para marcas</div>
            <h1 className="mt-6 max-w-3xl text-4xl font-bold leading-tight text-[#241335] sm:text-5xl lg:text-6xl">Acercá tu marca a una comunidad que vive la belleza todos los días.</h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-[#6D5577]">Profesionales, consumidoras y marcas pueden encontrarse dentro de LuVelle a través de colaboraciones, experiencias, contenido y nuevas formas de descubrimiento.</p>
            <a href="#registrar-marca" className="mt-9 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#E94B8A] to-[#FF7A59] px-6 py-3.5 font-semibold text-white shadow-lg shadow-[#E94B8A]/15 transition hover:-translate-y-0.5 hover:shadow-xl">Registrar mi marca <ArrowRight className="h-4 w-4" /></a>
          </div>

          <div className="relative rounded-[32px] border border-[#F2DDD7] bg-white/95 p-7 shadow-[0_28px_90px_rgba(91,42,134,0.10)] md:p-9">
            <div className="flex items-center gap-3"><div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#E94B8A]/10 text-[#E94B8A]"><Store className="h-6 w-6" /></div><div><p className="font-bold text-[#241335]">Tu marca puede formar parte de lo que viene.</p><p className="text-sm text-[#8A718F]">Contanos qué querés lograr.</p></div></div>
            <div className="mt-6 space-y-4 text-sm leading-6 text-[#6D5577]"><p>Buscamos colaboraciones que tengan sentido para la marca, las profesionales y la comunidad.</p><p>Sampling, beneficios, eventos, contenido o nuevas experiencias: queremos empezar por lo que más valor genere para ambas partes.</p></div>
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-20 md:py-28">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#E94B8A]">Formas de colaborar</p>
          <h2 className="mt-3 max-w-3xl text-3xl font-bold text-[#241335] md:text-5xl">Más puntos de encuentro entre marcas y comunidad.</h2>
          <div className="mt-12 grid gap-x-10 gap-y-9 md:grid-cols-2">
            {opportunities.map(({ icon: Icon, title, copy }) => (
              <article key={title} className="flex gap-5 border-b border-[#F2DDD7] pb-8"><div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#FAF6FF] text-[#5B2A86]"><Icon className="h-5 w-5" /></div><div><h3 className="font-bold text-[#241335]">{title}</h3><p className="mt-2 text-sm leading-6 text-[#6D5577]">{copy}</p></div></article>
            ))}
          </div>
        </div>
      </section>

      <section id="registrar-marca" className="bg-[#FAF6FF] px-4 py-20 md:py-28">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[.8fr_1.2fr]">
          <div><p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#8B5DB0]">Hablemos</p><h2 className="mt-3 text-3xl font-bold text-[#241335] md:text-4xl">Contanos sobre tu marca.</h2><p className="mt-4 leading-7 text-[#6D5577]">Queremos entender qué buscás y qué tipo de colaboración sería realmente valiosa para vos.</p></div>

          {submitted ? (
            <div className="rounded-[28px] border border-[#E9DDF2] bg-white p-8 text-center shadow-[0_18px_60px_rgba(91,42,134,0.08)]"><div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#E94B8A]/10 text-[#E94B8A]"><Sparkles className="h-7 w-7" /></div><h3 className="mt-5 text-2xl font-bold text-[#241335]">Ya tenemos tu marca</h3><p className="mx-auto mt-3 max-w-lg leading-7 text-[#6D5577]">Gracias. Revisaremos tu información y te contactaremos si vemos una oportunidad de colaboración que haga sentido.</p></div>
          ) : (
            <form onSubmit={handleSubmit} className="rounded-[28px] border border-[#E9DDF2] bg-white p-6 shadow-[0_18px_60px_rgba(91,42,134,0.08)] md:p-8">
              <div className="grid gap-5 md:grid-cols-2">
                <div><Label htmlFor="brand-name">Nombre de la marca *</Label><Input id="brand-name" required className="mt-2" value={formData.brandName} onChange={(e) => setFormData({ ...formData, brandName: e.target.value })} /></div>
                <div><Label htmlFor="contact-name">Persona de contacto *</Label><Input id="contact-name" required className="mt-2" value={formData.contactName} onChange={(e) => setFormData({ ...formData, contactName: e.target.value })} /></div>
                <div><Label htmlFor="brand-email">Email *</Label><Input id="brand-email" type="email" required className="mt-2" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} /></div>
                <div><Label htmlFor="brand-whatsapp">WhatsApp *</Label><Input id="brand-whatsapp" type="tel" required className="mt-2" value={formData.whatsapp} onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })} /></div>
                <div><Label htmlFor="brand-country">País</Label><Input id="brand-country" className="mt-2" value={formData.country} onChange={(e) => setFormData({ ...formData, country: e.target.value })} /></div>
                <div><Label htmlFor="brand-category">Categoría</Label><Input id="brand-category" placeholder="Skincare, cabello, uñas..." className="mt-2" value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} /></div>
                <div className="md:col-span-2"><Label htmlFor="brand-web">Web / catálogo / Instagram</Label><Input id="brand-web" type="url" className="mt-2" value={formData.website} onChange={(e) => setFormData({ ...formData, website: e.target.value })} /></div>
                <div className="md:col-span-2"><Label htmlFor="brand-interest">¿Qué te interesa explorar primero con LuVelle? *</Label><select id="brand-interest" required value={formData.mainInterest} onChange={(e) => setFormData({ ...formData, mainInterest: e.target.value })} className="mt-2 h-11 w-full rounded-md border border-input bg-background px-3 text-sm"><option value="">Seleccioná una opción</option>{interestOptions.map((option) => <option key={option}>{option}</option>)}</select></div>
                <div className="md:col-span-2"><Label htmlFor="brand-outcome">¿Qué resultado haría que una alianza con LuVelle valga la pena?</Label><Input id="brand-outcome" className="mt-2" value={formData.desiredOutcome} onChange={(e) => setFormData({ ...formData, desiredOutcome: e.target.value })} /></div>
                <div className="md:col-span-2"><Label htmlFor="brand-notes">Contanos algo más sobre tu marca</Label><Textarea id="brand-notes" className="mt-2 min-h-24" value={formData.notes} onChange={(e) => setFormData({ ...formData, notes: e.target.value })} /></div>
              </div>
              <button type="submit" disabled={loading} className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#E94B8A] to-[#FF7A59] px-6 py-3.5 font-semibold text-white disabled:opacity-60">{loading ? <><Loader2 className="h-5 w-5 animate-spin" /> Enviando...</> : <>Registrar mi marca <ArrowRight className="h-4 w-4" /></>}</button>
              <p className="mt-3 text-center text-xs text-[#8A718F]">Registrar tu marca no garantiza ventas, distribución ni inclusión automática en programas futuros.</p>
            </form>
          )}
        </div>
      </section>
    </>
  )
}
