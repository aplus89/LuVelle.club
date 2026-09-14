"use client"

import type React from "react"
import { useState } from "react"
import { ArrowRight, Box, Gift, Loader2, PackageOpen, Sparkles, Star } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { createBeautyBoxWaitlistAction } from "@/app/waitlist-actions"
import { BeautyBoxRibbonIntro } from "@/components/beauty-box/beauty-box-ribbon-intro"
import { AuraHalo, AuraWaves } from "@/components/brand/luvelle-visual-system"

const categoryOptions = ["Skincare", "Maquillaje", "Cabello", "Uñas", "Fragancias", "Wellness", "Mixto / sorpresa"]
const purchaseOptions = ["Compra única", "Suscripción mensual", "Cada 2–3 meses", "Todavía no sé"]

export function BeautyBoxInterestExperiment() {
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const { toast } = useToast()
  const [formData, setFormData] = useState({ name: "", email: "", whatsapp: "", category: "", purchasePreference: "", budget: "", mustHave: "" })

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    if (!formData.name || !formData.email || !formData.category) {
      toast({ title: "Faltan datos", description: "Completá nombre, email y categoría de mayor interés.", variant: "destructive" })
      return
    }
    setLoading(true)
    const result = await createBeautyBoxWaitlistAction({
      name: formData.name,
      email: formData.email,
      whatsapp: formData.whatsapp || undefined,
      preferred_category: formData.category,
      purchase_preference: formData.purchasePreference || undefined,
      approximate_budget: formData.budget || undefined,
      must_have: formData.mustHave || undefined,
      source: "beauty-box-waitlist-v1",
    })
    if (result.success) {
      setSubmitted(true)
      toast({ title: "Acceso anticipado confirmado", description: "Gracias. Ya estás en la lista de The Beauty Box." })
    } else {
      toast({ title: "No pudimos registrarte", description: "Intentá de nuevo en unos minutos.", variant: "destructive" })
    }
    setLoading(false)
  }

  return (
    <>
      <BeautyBoxRibbonIntro />
      <section className="relative overflow-hidden bg-[#FFF7F3] px-4 pb-32 pt-20 md:pb-40 md:pt-28">
        <div className="absolute -right-20 top-0 h-80 w-80 rounded-full bg-[#FFD8CC]/80 blur-3xl" />
        <div className="absolute right-12 top-20 hidden lg:block"><AuraHalo className="w-64 opacity-70" /></div>
        <div className="relative mx-auto grid max-w-7xl gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-[#F2DDD7] bg-white px-4 py-2 text-sm font-semibold text-[#5B2A86]"><Box className="h-4 w-4" /> The Beauty Box by LuVelle</div>
            <h1 className="mt-6 max-w-3xl text-4xl font-bold leading-tight text-[#241335] sm:text-5xl lg:text-6xl">Una caja pensada para convertir descubrir belleza en un momento especial.</h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-[#6D5577]">Productos, marcas y favoritos seleccionados para sorprenderte, inspirarte y ayudarte a descubrir nuevas formas de cuidarte.</p>
            <a href="#beauty-box-waitlist" className="mt-9 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#E94B8A] to-[#FF7A59] px-6 py-3.5 font-semibold text-white shadow-lg shadow-[#E94B8A]/15">Quiero acceso anticipado <ArrowRight className="h-4 w-4" /></a>
          </div>

          <div className="relative mx-auto w-full max-w-md rounded-[34px] border border-[#F2DDD7] bg-white p-8 shadow-[0_28px_90px_rgba(91,42,134,0.12)]">
            <div className="absolute -right-4 -top-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#E94B8A] text-white shadow-lg"><Sparkles className="h-6 w-6" /></div>
            <div className="flex aspect-[4/3] items-center justify-center rounded-[26px] bg-gradient-to-br from-[#FFD8CC] via-[#FFF7F3] to-[#E9DDF2]">
              <div className="text-center"><PackageOpen className="mx-auto h-16 w-16 text-[#5B2A86]" /><p className="mt-4 text-2xl font-bold text-[#241335]">Beauty Box</p><p className="mt-1 text-sm text-[#6D5577]">Acceso anticipado</p></div>
            </div>
            <div className="mt-6 grid grid-cols-2 gap-3 text-sm text-[#5B2A86]"><span className="rounded-xl bg-[#FFF7F3] px-3 py-3">Curaduría</span><span className="rounded-xl bg-[#FAF6FF] px-3 py-3">Descubrimiento</span><span className="rounded-xl bg-[#FFF7F3] px-3 py-3">Marcas</span><span className="rounded-xl bg-[#FAF6FF] px-3 py-3">Sorpresa</span></div>
          </div>
        </div>
        <AuraWaves />
      </section>

      <section className="bg-white px-4 py-20 md:py-28">
        <div className="mx-auto max-w-6xl">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#E94B8A]">Hecha alrededor de tus gustos</p>
          <h2 className="mt-3 text-3xl font-bold text-[#241335] md:text-5xl">Queremos que abrirla se sienta como recibir algo elegido para vos.</h2>
          <div className="mt-12 grid gap-x-10 gap-y-9 md:grid-cols-3">
            <article className="border-b border-[#F2DDD7] pb-8"><Star className="h-6 w-6 text-[#E94B8A]" /><h3 className="mt-4 font-bold text-[#241335]">Tus categorías favoritas</h3><p className="mt-2 text-sm leading-6 text-[#6D5577]">Skincare, maquillaje, cabello, wellness y otras categorías que realmente te interesen.</p></article>
            <article className="border-b border-[#F2DDD7] pb-8"><Gift className="h-6 w-6 text-[#5B2A86]" /><h3 className="mt-4 font-bold text-[#241335]">Una experiencia para descubrir</h3><p className="mt-2 text-sm leading-6 text-[#6D5577]">Nuevos productos, favoritos y marcas que podrían convertirse en parte de tu rutina.</p></article>
            <article className="border-b border-[#F2DDD7] pb-8"><Box className="h-6 w-6 text-[#FF7A59]" /><h3 className="mt-4 font-bold text-[#241335]">A tu manera</h3><p className="mt-2 text-sm leading-6 text-[#6D5577]">Contanos cómo preferirías recibirla y qué haría que una Beauty Box realmente valga la pena para vos.</p></article>
          </div>
        </div>
      </section>

      <section id="beauty-box-waitlist" className="bg-[#FAF6FF] px-4 py-20 md:py-28">
        <div className="mx-auto grid max-w-5xl gap-10 lg:grid-cols-[.8fr_1.2fr]">
          <div><p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#8B5DB0]">Acceso anticipado</p><h2 className="mt-3 text-3xl font-bold text-[#241335] md:text-4xl">Sé de las primeras en descubrirla.</h2><p className="mt-4 leading-7 text-[#6D5577]">Dejanos tus datos y contanos qué te gustaría recibir. Te avisaremos cuando tengamos una primera experiencia lista para compartir.</p></div>
          {submitted ? (
            <div className="rounded-[28px] border border-[#E9DDF2] bg-white p-8 text-center shadow-[0_18px_60px_rgba(91,42,134,0.08)]"><div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#E94B8A]/10 text-[#E94B8A]"><Sparkles className="h-7 w-7" /></div><h3 className="mt-5 text-2xl font-bold text-[#241335]">Ya estás en la lista</h3><p className="mt-3 leading-7 text-[#6D5577]">Gracias. Te escribiremos cuando The Beauty Box esté lista para una primera experiencia.</p></div>
          ) : (
            <form onSubmit={handleSubmit} className="rounded-[28px] border border-[#E9DDF2] bg-white p-6 shadow-[0_18px_60px_rgba(91,42,134,0.08)] md:p-8">
              <div className="grid gap-5 md:grid-cols-2">
                <div><Label htmlFor="box-name">Nombre *</Label><Input id="box-name" required className="mt-2" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} /></div>
                <div><Label htmlFor="box-email">Email *</Label><Input id="box-email" type="email" required className="mt-2" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} /></div>
                <div className="md:col-span-2"><Label htmlFor="box-whatsapp">WhatsApp</Label><Input id="box-whatsapp" type="tel" className="mt-2" value={formData.whatsapp} onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })} /></div>
                <div><Label htmlFor="box-category">Categoría que más te interesa *</Label><select id="box-category" required value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} className="mt-2 h-11 w-full rounded-md border border-input bg-background px-3 text-sm"><option value="">Seleccioná</option>{categoryOptions.map((option) => <option key={option}>{option}</option>)}</select></div>
                <div><Label htmlFor="box-format">¿Cómo preferirías comprar?</Label><select id="box-format" value={formData.purchasePreference} onChange={(e) => setFormData({ ...formData, purchasePreference: e.target.value })} className="mt-2 h-11 w-full rounded-md border border-input bg-background px-3 text-sm"><option value="">Seleccioná</option>{purchaseOptions.map((option) => <option key={option}>{option}</option>)}</select></div>
                <div className="md:col-span-2"><Label htmlFor="box-budget">¿Qué rango pagarías por una caja que realmente te sorprenda?</Label><Input id="box-budget" placeholder="Ej. ₡15.000–₡25.000" className="mt-2" value={formData.budget} onChange={(e) => setFormData({ ...formData, budget: e.target.value })} /></div>
                <div className="md:col-span-2"><Label htmlFor="box-must">¿Qué tendría que incluir para que dijeras “sí, la quiero”?</Label><Textarea id="box-must" className="mt-2 min-h-24" value={formData.mustHave} onChange={(e) => setFormData({ ...formData, mustHave: e.target.value })} /></div>
              </div>
              <button type="submit" disabled={loading} className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#E94B8A] to-[#FF7A59] px-6 py-3.5 font-semibold text-white disabled:opacity-60">{loading ? <><Loader2 className="h-5 w-5 animate-spin" /> Enviando...</> : <>Quiero acceso anticipado <ArrowRight className="h-4 w-4" /></>}</button>
            </form>
          )}
        </div>
      </section>
    </>
  )
}
