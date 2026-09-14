"use client"

import type React from "react"
import { useState } from "react"
import { ArrowRight, Bot, CalendarCheck, CheckCircle2, Loader2, MessageCircleMore, RefreshCcw, Sparkles } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { createLeadAction } from "@/app/actions"
import { AtelierStrip, AuraWaves } from "@/components/brand/luvelle-visual-system"

const painOptions = [
  "Personas preguntan y no reservan",
  "Me cuesta dar seguimiento a conversaciones",
  "Tengo espacios vacíos en la agenda",
  "Tardo demasiado en responder mensajes",
  "Tengo no-shows o cancelaciones",
  "Quiero reactivar clientas antiguas",
  "Necesito ordenar mejor mi operación",
  "Otro",
]

const workflows = [
  { icon: MessageCircleMore, title: "Seguimiento de consultas", copy: "Ayuda para retomar conversaciones que quedaron a medias y preparar el siguiente mensaje." },
  { icon: RefreshCcw, title: "Recuperación de oportunidades", copy: "Volvé a conectar con clientas o consultas antiguas cuando exista una buena razón para hacerlo." },
  { icon: CalendarCheck, title: "Agenda y recordatorios", copy: "Confirmaciones y recordatorios pensados para ayudarte a reducir espacios perdidos." },
  { icon: Sparkles, title: "Apoyo para tu negocio", copy: "Respuestas, promociones y mensajes con menos tiempo frente al teléfono y más tiempo para tu trabajo." },
]

export function AiProviderExperiment() {
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const { toast } = useToast()
  const [formData, setFormData] = useState({ name: "", email: "", whatsapp: "", businessName: "", mainPain: "", weeklyInquiries: "", followupMethod: "", valueQuestion: "", notes: "" })

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    if (!formData.name || !formData.email || !formData.mainPain) {
      toast({ title: "Faltan datos", description: "Completá nombre, email y tu principal reto.", variant: "destructive" })
      return
    }
    setLoading(true)
    const result = await createLeadAction({
      persona: "provider-ai-pilot",
      email: formData.email,
      whatsapp: formData.whatsapp || undefined,
      source: "ai-provider-pilot-v1",
      notes: JSON.stringify({ business_name: formData.businessName, main_pain: formData.mainPain, weekly_inquiries: formData.weeklyInquiries, followup_method: formData.followupMethod, value_if_recovering_appointments: formData.valueQuestion, open_feedback: formData.notes }),
    })
    if (result.success) {
      setSubmitted(true)
      toast({ title: "Gracias", description: "Tu interés quedó registrado para LuVelle AI Beta." })
    } else {
      toast({ title: "No pudimos registrar tu interés", description: "Intentá de nuevo en unos minutos.", variant: "destructive" })
    }
    setLoading(false)
  }

  return (
    <>
      <section className="relative overflow-hidden bg-[#FFF7F3] px-4 pb-32 pt-20 md:pb-40 md:pt-28">
        <div className="absolute -right-24 top-8 h-72 w-72 rounded-full bg-[#FFD8CC]/60 blur-3xl" />
        <div className="relative mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1.05fr_.95fr] lg:items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-[#E9DDF2] bg-white px-4 py-2 text-sm font-semibold text-[#5B2A86]"><Bot className="h-4 w-4" /> LuVelle AI · Beta para profesionales</div>
            <h1 className="mt-6 max-w-3xl text-4xl font-bold leading-tight text-[#241335] sm:text-5xl lg:text-6xl">Menos conversaciones perdidas. Más tiempo para tu negocio.</h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-[#6D5577]">LuVelle AI está pensada para ayudarte a dar seguimiento, recuperar oportunidades y resolver tareas repetitivas sin perder el trato humano con tus clientas.</p>
            <a href="#piloto-ai" className="mt-9 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#E94B8A] to-[#FF7A59] px-6 py-3.5 font-semibold text-white shadow-lg shadow-[#E94B8A]/15 transition hover:-translate-y-0.5 hover:shadow-xl">Quiero probar la Beta <ArrowRight className="h-4 w-4" /></a>
          </div>

          <div className="rounded-[32px] border border-[#E9DDF2] bg-white p-6 shadow-[0_28px_90px_rgba(91,42,134,0.12)] md:p-8">
            <div className="flex items-center gap-3 border-b border-[#F2DDD7] pb-5"><div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#E94B8A] to-[#5B2A86] text-white"><Sparkles className="h-6 w-6" /></div><div><p className="font-bold text-[#241335]">Una conversación que no debería perderse</p><p className="text-sm text-[#8A718F]">La clienta preguntó por un servicio y dejó de responder.</p></div></div>
            <div className="mt-6 space-y-4">
              <div className="rounded-2xl bg-[#FFF7F3] p-4 text-sm leading-6 text-[#6D5577]">“Hola, ¿cuánto cuesta el lifting?” → recibió el precio → no respondió.</div>
              <div className="rounded-2xl border border-[#E9DDF2] bg-[#FAF6FF] p-4"><p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#8B5DB0]">LuVelle AI puede ayudarte</p><p className="mt-2 text-sm leading-6 text-[#5B2A86]">Preparando un seguimiento corto, natural y contextual para que vos decidás si querés enviarlo.</p></div>
              <div className="flex items-center gap-2 text-sm font-semibold text-[#2F7A4A]"><CheckCircle2 className="h-4 w-4" /> Más seguimiento sin perder tu voz.</div>
            </div>
          </div>
        </div>
        <AuraWaves />
      </section>

      <section className="bg-white px-4 py-20 md:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl"><p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#E94B8A]">Lo que LuVelle AI puede hacer por vos</p><h2 className="mt-3 text-3xl font-bold text-[#241335] md:text-5xl">Más apoyo en el día a día. Menos cosas que se te escapan.</h2></div>
          <div className="mt-8"><AtelierStrip /></div>
          <div className="mt-12 grid gap-x-10 gap-y-9 md:grid-cols-2">
            {workflows.map(({ icon: Icon, title, copy }) => (
              <article key={title} className="flex gap-5 border-b border-[#F2DDD7] pb-8"><div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#E94B8A]/10 text-[#E94B8A]"><Icon className="h-5 w-5" /></div><div><h3 className="font-bold text-[#241335]">{title}</h3><p className="mt-2 text-sm leading-6 text-[#6D5577]">{copy}</p></div></article>
            ))}
          </div>
        </div>
      </section>

      <section id="piloto-ai" className="bg-[#FAF6FF] px-4 py-20 md:py-28">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[.8fr_1.2fr] lg:items-start">
          <div><p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#8B5DB0]">Acceso Beta</p><h2 className="mt-3 text-3xl font-bold text-[#241335] md:text-4xl">Contanos dónde necesitás más ayuda.</h2><p className="mt-4 leading-7 text-[#6D5577]">Queremos conocer qué pasa hoy con tus consultas, seguimientos y agenda para invitar primero a profesionales cuyo reto encaje con las primeras funciones.</p></div>

          {submitted ? (
            <div className="rounded-[28px] border border-[#E9DDF2] bg-white p-8 text-center shadow-[0_18px_60px_rgba(91,42,134,0.08)]"><div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#E94B8A]/10 text-[#E94B8A]"><Sparkles className="h-7 w-7" /></div><h3 className="mt-5 text-2xl font-bold text-[#241335]">Ya estás en la lista de acceso Beta</h3><p className="mx-auto mt-3 max-w-lg leading-7 text-[#6D5577]">Gracias. Te contactaremos si las primeras funciones encajan con lo que nos contaste.</p></div>
          ) : (
            <form onSubmit={handleSubmit} className="rounded-[28px] border border-[#E9DDF2] bg-white p-6 shadow-[0_18px_60px_rgba(91,42,134,0.08)] md:p-8">
              <div className="grid gap-5 md:grid-cols-2">
                <div><Label htmlFor="ai-name">Nombre *</Label><Input id="ai-name" required className="mt-2" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} /></div>
                <div><Label htmlFor="ai-business">Negocio / marca personal</Label><Input id="ai-business" className="mt-2" value={formData.businessName} onChange={(e) => setFormData({ ...formData, businessName: e.target.value })} /></div>
                <div><Label htmlFor="ai-email">Email *</Label><Input id="ai-email" type="email" required className="mt-2" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} /></div>
                <div><Label htmlFor="ai-whatsapp">WhatsApp</Label><Input id="ai-whatsapp" type="tel" className="mt-2" value={formData.whatsapp} onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })} /></div>
                <div className="md:col-span-2"><Label htmlFor="ai-pain">¿Cuál problema te cuesta más hoy? *</Label><select id="ai-pain" required value={formData.mainPain} onChange={(e) => setFormData({ ...formData, mainPain: e.target.value })} className="mt-2 h-11 w-full rounded-md border border-input bg-background px-3 text-sm"><option value="">Seleccioná una opción</option>{painOptions.map((option) => <option key={option}>{option}</option>)}</select></div>
                <div><Label htmlFor="ai-volume">Consultas aproximadas por semana</Label><Input id="ai-volume" placeholder="Ej. 15–25" className="mt-2" value={formData.weeklyInquiries} onChange={(e) => setFormData({ ...formData, weeklyInquiries: e.target.value })} /></div>
                <div><Label htmlFor="ai-followup">¿Cómo das seguimiento hoy?</Label><Input id="ai-followup" placeholder="Ej. manual por WhatsApp" className="mt-2" value={formData.followupMethod} onChange={(e) => setFormData({ ...formData, followupMethod: e.target.value })} /></div>
                <div className="md:col-span-2"><Label htmlFor="ai-value">Si LuVelle te ayudara a recuperar 1–3 citas al mes, ¿qué valor tendría para tu negocio?</Label><Input id="ai-value" className="mt-2" placeholder="Contanos en tus palabras" value={formData.valueQuestion} onChange={(e) => setFormData({ ...formData, valueQuestion: e.target.value })} /></div>
                <div className="md:col-span-2"><Label htmlFor="ai-notes">¿Qué tendría que hacer para que valga la pena pagar por esto?</Label><Textarea id="ai-notes" className="mt-2 min-h-24" value={formData.notes} onChange={(e) => setFormData({ ...formData, notes: e.target.value })} /></div>
              </div>
              <button type="submit" disabled={loading} className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#E94B8A] to-[#FF7A59] px-6 py-3.5 font-semibold text-white disabled:opacity-60">{loading ? <><Loader2 className="h-5 w-5 animate-spin" /> Enviando...</> : <>Quiero probar la Beta <ArrowRight className="h-4 w-4" /></>}</button>
            </form>
          )}
        </div>
      </section>
    </>
  )
}
