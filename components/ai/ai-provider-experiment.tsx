"use client"

import type React from "react"
import { useState } from "react"
import { ArrowRight, Bot, CalendarCheck, CheckCircle2, Clock3, Loader2, MessageCircleMore, RefreshCcw, Sparkles, Users } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { createLeadAction } from "@/app/actions"

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
  {
    icon: MessageCircleMore,
    title: "Seguimiento de consultas",
    copy: "Detectar conversaciones que quedaron a medias y ayudarte a preparar el siguiente mensaje.",
  },
  {
    icon: RefreshCcw,
    title: "Recuperación de oportunidades",
    copy: "Reactivar clientas o consultas antiguas cuando exista una razón útil para volver a conversar.",
  },
  {
    icon: CalendarCheck,
    title: "Agenda y recordatorios",
    copy: "Explorar recordatorios, confirmaciones y acciones simples que reduzcan espacios perdidos.",
  },
  {
    icon: Sparkles,
    title: "Apoyo comercial",
    copy: "Ayudarte con respuestas, promociones y mensajes sin convertir tu negocio en otro dashboard complejo.",
  },
]

export function AiProviderExperiment() {
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    whatsapp: "",
    businessName: "",
    mainPain: "",
    weeklyInquiries: "",
    followupMethod: "",
    valueQuestion: "",
    notes: "",
  })

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
      notes: JSON.stringify({
        business_name: formData.businessName,
        main_pain: formData.mainPain,
        weekly_inquiries: formData.weeklyInquiries,
        followup_method: formData.followupMethod,
        value_if_recovering_appointments: formData.valueQuestion,
        open_feedback: formData.notes,
      }),
    })

    if (result.success) {
      setSubmitted(true)
      toast({ title: "Gracias", description: "Tu interés quedó registrado para el piloto de LuVelle AI." })
    } else {
      toast({ title: "No pudimos registrar tu interés", description: "Intentá de nuevo en unos minutos.", variant: "destructive" })
    }
    setLoading(false)
  }

  return (
    <>
      <section className="relative overflow-hidden bg-[#FFF7F3] px-4 py-20 md:py-28">
        <div className="absolute -right-24 top-8 h-72 w-72 rounded-full bg-[#FFD8CC]/60 blur-3xl" />
        <div className="absolute -left-24 bottom-0 h-72 w-72 rounded-full bg-[#B388FF]/20 blur-3xl" />
        <div className="relative mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1.05fr_.95fr] lg:items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-[#E9DDF2] bg-white px-4 py-2 text-sm font-semibold text-[#5B2A86]">
              <Bot className="h-4 w-4" />
              LuVelle AI · piloto para profesionales
            </div>
            <h1 className="mt-6 max-w-3xl text-4xl font-bold leading-tight text-[#241335] sm:text-5xl lg:text-6xl">
              Menos oportunidades perdidas. Más tiempo para tu negocio.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-[#6D5577]">
              Estamos validando una capa de AI para profesionales de belleza y bienestar enfocada en seguimiento, recuperación de consultas y operaciones simples. No otro chatbot genérico.
            </p>
            <div className="mt-8 flex flex-wrap gap-3 text-sm text-[#5B2A86]">
              <span className="rounded-full bg-white px-4 py-2 shadow-sm">WhatsApp + Instagram primero</span>
              <span className="rounded-full bg-white px-4 py-2 shadow-sm">Flujos simples</span>
              <span className="rounded-full bg-white px-4 py-2 shadow-sm">Medir citas y tiempo ahorrado</span>
            </div>
            <a href="#piloto-ai" className="mt-9 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#E94B8A] to-[#FF7A59] px-6 py-3.5 font-semibold text-white shadow-lg shadow-[#E94B8A]/15 transition hover:-translate-y-0.5 hover:shadow-xl">
              Quiero probar LuVelle AI
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>

          <div className="rounded-[32px] border border-[#E9DDF2] bg-white p-6 shadow-[0_28px_90px_rgba(91,42,134,0.12)] md:p-8">
            <div className="flex items-center gap-3 border-b border-[#F2DDD7] pb-5">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#E94B8A] to-[#5B2A86] text-white"><Sparkles className="h-6 w-6" /></div>
              <div>
                <p className="font-bold text-[#241335]">Ejemplo de workflow</p>
                <p className="text-sm text-[#8A718F]">Consulta que no terminó en reserva</p>
              </div>
            </div>
            <div className="mt-6 space-y-4">
              <div className="rounded-2xl bg-[#FFF7F3] p-4 text-sm leading-6 text-[#6D5577]">“Hola, ¿cuánto cuesta el lifting?” → recibió precio → no respondió.</div>
              <div className="flex items-center gap-3 text-sm text-[#5B2A86]"><Clock3 className="h-4 w-4" /> Oportunidad sin seguimiento</div>
              <div className="rounded-2xl border border-[#E9DDF2] bg-[#FAF6FF] p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#8B5DB0]">LuVelle AI sugiere</p>
                <p className="mt-2 text-sm leading-6 text-[#5B2A86]">Un seguimiento corto y contextual para que la profesional lo revise antes de enviar.</p>
              </div>
              <div className="flex items-center gap-2 text-sm font-semibold text-[#2F7A4A]"><CheckCircle2 className="h-4 w-4" /> Objetivo: recuperar conversaciones, no automatizar por automatizar.</div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-16 md:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#E94B8A]">Qué estamos validando</p>
            <h2 className="mt-3 text-3xl font-bold text-[#241335] md:text-4xl">AI como workflow de negocio, no como promesa vacía</h2>
            <p className="mt-4 leading-7 text-[#6D5577]">Estas funciones representan hipótesis. Priorizaremos únicamente las que demuestren ahorro de tiempo, recuperación de oportunidades o impacto comercial real.</p>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {workflows.map(({ icon: Icon, title, copy }) => (
              <article key={title} className="rounded-[26px] border border-[#F2DDD7] bg-[#FFFDFC] p-6">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#E94B8A]/10 text-[#E94B8A]"><Icon className="h-5 w-5" /></div>
                <h3 className="mt-5 font-bold text-[#241335]">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-[#6D5577]">{copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="piloto-ai" className="bg-[#FAF6FF] px-4 py-16 md:py-24">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[.8fr_1.2fr] lg:items-start">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#8B5DB0]">Discovery + piloto</p>
            <h2 className="mt-3 text-3xl font-bold text-[#241335] md:text-4xl">Decinos dónde se te están escapando oportunidades</h2>
            <p className="mt-4 leading-7 text-[#6D5577]">No necesitamos que cambies todo tu negocio. Queremos entender qué pasa hoy con tus consultas, seguimientos y agenda.</p>
            <div className="mt-7 space-y-3 text-sm text-[#5B2A86]">
              <p className="flex gap-2"><Users className="mt-0.5 h-4 w-4 shrink-0" /> Empezamos con profesionales reales y workflows manuales.</p>
              <p className="flex gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" /> Medimos respuestas, citas recuperadas y tiempo ahorrado.</p>
            </div>
          </div>

          {submitted ? (
            <div className="rounded-[28px] border border-[#E9DDF2] bg-white p-8 text-center shadow-[0_18px_60px_rgba(91,42,134,0.08)]">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#E94B8A]/10 text-[#E94B8A]"><Sparkles className="h-7 w-7" /></div>
              <h3 className="mt-5 text-2xl font-bold text-[#241335]">Ya estás en la lista del piloto</h3>
              <p className="mx-auto mt-3 max-w-lg leading-7 text-[#6D5577]">Revisaremos tu respuesta para identificar si tu problema encaja con los primeros workflows que estamos validando.</p>
              <a href="/providers" className="mt-6 inline-flex items-center gap-2 font-semibold text-[#E94B8A]">Ver LuVelle para profesionales <ArrowRight className="h-4 w-4" /></a>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="rounded-[28px] border border-[#E9DDF2] bg-white p-6 shadow-[0_18px_60px_rgba(91,42,134,0.08)] md:p-8">
              <div className="grid gap-5 md:grid-cols-2">
                <div><Label htmlFor="ai-name">Nombre *</Label><Input id="ai-name" required className="mt-2" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} /></div>
                <div><Label htmlFor="ai-business">Negocio / marca personal</Label><Input id="ai-business" className="mt-2" value={formData.businessName} onChange={(e) => setFormData({ ...formData, businessName: e.target.value })} /></div>
                <div><Label htmlFor="ai-email">Email *</Label><Input id="ai-email" type="email" required className="mt-2" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} /></div>
                <div><Label htmlFor="ai-whatsapp">WhatsApp</Label><Input id="ai-whatsapp" type="tel" className="mt-2" value={formData.whatsapp} onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })} /></div>
                <div className="md:col-span-2">
                  <Label htmlFor="ai-pain">¿Cuál problema te cuesta más hoy? *</Label>
                  <select id="ai-pain" required value={formData.mainPain} onChange={(e) => setFormData({ ...formData, mainPain: e.target.value })} className="mt-2 h-11 w-full rounded-md border border-input bg-background px-3 text-sm">
                    <option value="">Seleccioná una opción</option>{painOptions.map((option) => <option key={option}>{option}</option>)}
                  </select>
                </div>
                <div><Label htmlFor="ai-volume">Consultas aproximadas por semana</Label><Input id="ai-volume" placeholder="Ej. 15–25" className="mt-2" value={formData.weeklyInquiries} onChange={(e) => setFormData({ ...formData, weeklyInquiries: e.target.value })} /></div>
                <div><Label htmlFor="ai-followup">¿Cómo das seguimiento hoy?</Label><Input id="ai-followup" placeholder="Ej. manual por WhatsApp" className="mt-2" value={formData.followupMethod} onChange={(e) => setFormData({ ...formData, followupMethod: e.target.value })} /></div>
                <div className="md:col-span-2"><Label htmlFor="ai-value">Si LuVelle te ayudara a recuperar 1–3 citas al mes, ¿qué valor tendría para tu negocio?</Label><Input id="ai-value" className="mt-2" placeholder="Contanos en tus palabras" value={formData.valueQuestion} onChange={(e) => setFormData({ ...formData, valueQuestion: e.target.value })} /></div>
                <div className="md:col-span-2"><Label htmlFor="ai-notes">¿Qué tendría que hacer para que valga la pena pagar por esto?</Label><Textarea id="ai-notes" className="mt-2 min-h-24" value={formData.notes} onChange={(e) => setFormData({ ...formData, notes: e.target.value })} /></div>
              </div>
              <button type="submit" disabled={loading} className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#E94B8A] to-[#FF7A59] px-6 py-3.5 font-semibold text-white disabled:opacity-60">
                {loading ? <><Loader2 className="h-5 w-5 animate-spin" /> Enviando...</> : <>Quiero probar LuVelle AI <ArrowRight className="h-4 w-4" /></>}
              </button>
              <p className="mt-3 text-center text-xs leading-5 text-[#8A718F]">Estamos validando el producto. Registrarte no implica una compra ni promete automatizaciones todavía disponibles.</p>
            </form>
          )}
        </div>
      </section>
    </>
  )
}
