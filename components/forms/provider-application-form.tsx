"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { ArrowRight, Loader2, ShieldCheck, Sparkles, Users } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from "@/hooks/use-toast"
import { createProviderApplicationAction } from "@/app/actions"
import { trackFormSubmit } from "@/lib/gtm-events"

const WHATSAPP_COMMUNITY_URL = "https://chat.whatsapp.com/J1auMfS3VnV783tKdTCozu"

const categoryOptions = [
  "Uñas",
  "Cabello",
  "Cejas",
  "Pestañas",
  "Maquillaje",
  "Skincare / Facial",
  "Masajes",
  "Estética",
  "Wellness",
  "Otro",
]

const workModes = ["Estudio propio", "Salón", "Desde casa", "A domicilio", "Freelance / varios lugares"]

const businessGoals = [
  "Conseguir más clientas",
  "Llenar espacios vacíos en mi agenda",
  "Mostrar mejor mi trabajo y generar confianza",
  "Responder y dar seguimiento más rápido",
  "Reducir no-shows",
  "Recuperar clientas o conversaciones antiguas",
  "Ordenar mejor mi negocio",
]

const discoverySources = [
  "Facebook",
  "Instagram",
  "WhatsApp",
  "Academia / centro de formación",
  "Evento",
  "Me invitó otra profesional",
  "Búsqueda / web",
  "Otro",
]

type Attribution = {
  utmSource: string
  utmMedium: string
  utmCampaign: string
  utmContent: string
  referralCode: string
}

export function ProviderApplicationForm() {
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [profileConsent, setProfileConsent] = useState(false)
  const [attribution, setAttribution] = useState<Attribution>({
    utmSource: "",
    utmMedium: "",
    utmCampaign: "",
    utmContent: "",
    referralCode: "",
  })
  const { toast } = useToast()

  const [formData, setFormData] = useState({
    name: "",
    businessName: "",
    whatsapp: "",
    email: "",
    city: "",
    workMode: "",
    yearsExperience: "",
    categories: [] as string[],
    portfolioUrl: "",
    mainServices: "",
    certifications: "",
    businessGoal: "",
    discoverySource: "",
    referrerName: "",
  })

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    setAttribution({
      utmSource: params.get("utm_source") || "",
      utmMedium: params.get("utm_medium") || "",
      utmCampaign: params.get("utm_campaign") || "",
      utmContent: params.get("utm_content") || "",
      referralCode: params.get("ref") || params.get("referral") || "",
    })
  }, [])

  const handleCategoryToggle = (category: string) => {
    setFormData((prev) => ({
      ...prev,
      categories: prev.categories.includes(category)
        ? prev.categories.filter((item) => item !== category)
        : [...prev.categories, category],
    }))
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()

    if (
      !formData.name ||
      !formData.whatsapp ||
      !formData.email ||
      !formData.city ||
      !formData.workMode ||
      !formData.yearsExperience ||
      formData.categories.length === 0 ||
      !formData.mainServices ||
      !formData.businessGoal ||
      !profileConsent
    ) {
      toast({
        title: "Revisá los campos requeridos",
        description: "Completá la información marcada y aceptá que LuVelle te contacte sobre el piloto.",
        variant: "destructive",
      })
      return
    }

    setLoading(true)

    const structuredNotes = [
      `Nombre comercial: ${formData.businessName || "No indicado"}`,
      `Modalidad de trabajo: ${formData.workMode}`,
      `Años de experiencia: ${formData.yearsExperience}`,
      `Servicios y precios desde: ${formData.mainServices}`,
      `Certificaciones / formación: ${formData.certifications || "No indicado"}`,
      `Objetivo principal (PMF): ${formData.businessGoal}`,
      `Cómo conoció LuVelle: ${formData.discoverySource || "No indicado"}`,
      `Profesional que invitó: ${formData.referrerName || "No indicado"}`,
      `UTM source: ${attribution.utmSource || "No indicado"}`,
      `UTM medium: ${attribution.utmMedium || "No indicado"}`,
      `UTM campaign: ${attribution.utmCampaign || "No indicado"}`,
      `UTM content: ${attribution.utmContent || "No indicado"}`,
      `Referral code: ${attribution.referralCode || "No indicado"}`,
      "Consentimiento de contacto para piloto: Sí",
    ].join("\n")

    const result = await createProviderApplicationAction({
      name: formData.name,
      whatsapp: formData.whatsapp,
      email: formData.email,
      city: formData.city,
      categories: formData.categories,
      portfolio_url: formData.portfolioUrl || undefined,
      message: structuredNotes,
      plan_requested: "founding-profile-9900",
    })

    if (result.success) {
      trackFormSubmit("provider")
      setSubmitted(true)
      toast({
        title: "Información recibida",
        description: "Gracias. Ahora podés unirte a la comunidad privada de profesionales de LuVelle.",
      })
    } else {
      toast({
        title: "No pudimos enviar tu información",
        description: "Intentá de nuevo en unos minutos.",
        variant: "destructive",
      })
    }

    setLoading(false)
  }

  if (submitted) {
    return (
      <div className="rounded-[28px] border border-[#F2DDD7] bg-white p-8 text-center shadow-[0_18px_60px_rgba(91,42,134,0.08)] md:p-12">
        <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-[#E94B8A]/10 text-[#E94B8A]">
          <Sparkles className="h-7 w-7" />
        </div>
        <p className="mb-2 text-sm font-semibold uppercase tracking-[0.18em] text-[#E94B8A]">Profesionales fundadoras</p>
        <h3 className="text-2xl font-bold text-[#241335]">Ya tenemos tu información 💗</h3>
        <p className="mx-auto mt-3 max-w-xl leading-7 text-[#6D5577]">
          Revisaremos tus datos para conversar sobre tu perfil y lo que más necesitás de LuVelle. Mientras tanto, podés entrar a la comunidad privada donde estamos escuchando y conectando a profesionales de belleza y bienestar.
        </p>

        <div className="mx-auto mt-7 grid max-w-xl gap-3 sm:grid-cols-2">
          <a
            href={WHATSAPP_COMMUNITY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#E94B8A] to-[#FF7A59] px-5 py-3.5 font-semibold text-white shadow-lg shadow-[#E94B8A]/15 transition hover:-translate-y-0.5 hover:shadow-xl"
          >
            <Users className="h-5 w-5" />
            Unirme a la comunidad
          </a>
          <a
            href="/providers/mariana-lopez"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-[#E5CEDF] bg-[#FAF6FF] px-5 py-3.5 font-semibold text-[#5B2A86] transition hover:border-[#B388FF] hover:bg-white"
          >
            Ver perfil demo
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>

        <p className="mx-auto mt-5 max-w-lg text-xs leading-5 text-[#8A718F]">
          El grupo es para profesionales de belleza y bienestar. El enlace se muestra después del registro para mantener una comunidad más relevante y segura.
        </p>
      </div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-[28px] border border-[#F2DDD7] bg-white p-6 shadow-[0_18px_60px_rgba(91,42,134,0.08)] md:p-8"
    >
      <div className="mb-8 rounded-2xl border border-[#FFD8CC] bg-[#FFF7F3] p-4 text-sm leading-6 text-[#6D5577]">
        <div className="mb-1 flex items-center gap-2 font-semibold text-[#5B2A86]">
          <ShieldCheck className="h-4 w-4" />
          Privacidad primero
        </div>
        Pedimos solo la información necesaria para preparar tu perfil y aprender del piloto. No solicitamos tu dirección exacta.
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <div>
          <Label htmlFor="name" className="text-[#241335]">Nombre completo *</Label>
          <Input id="name" required value={formData.name} onChange={(event) => setFormData({ ...formData, name: event.target.value })} className="mt-2 border-[#EFDCD6] bg-[#FFFDFC] text-[#241335]" placeholder="Mariana López" />
        </div>

        <div>
          <Label htmlFor="businessName" className="text-[#241335]">Nombre de tu negocio</Label>
          <Input id="businessName" value={formData.businessName} onChange={(event) => setFormData({ ...formData, businessName: event.target.value })} className="mt-2 border-[#EFDCD6] bg-[#FFFDFC] text-[#241335]" placeholder="Studio Mariana" />
        </div>

        <div>
          <Label htmlFor="whatsapp" className="text-[#241335]">WhatsApp *</Label>
          <Input id="whatsapp" type="tel" required value={formData.whatsapp} onChange={(event) => setFormData({ ...formData, whatsapp: event.target.value })} className="mt-2 border-[#EFDCD6] bg-[#FFFDFC] text-[#241335]" placeholder="+506 8888 8888" />
        </div>

        <div>
          <Label htmlFor="email" className="text-[#241335]">Email *</Label>
          <Input id="email" type="email" required value={formData.email} onChange={(event) => setFormData({ ...formData, email: event.target.value })} className="mt-2 border-[#EFDCD6] bg-[#FFFDFC] text-[#241335]" placeholder="tu@email.com" />
        </div>

        <div>
          <Label htmlFor="city" className="text-[#241335]">Ciudad o zona general *</Label>
          <Input id="city" required value={formData.city} onChange={(event) => setFormData({ ...formData, city: event.target.value })} className="mt-2 border-[#EFDCD6] bg-[#FFFDFC] text-[#241335]" placeholder="Escazú y alrededores" />
        </div>

        <div>
          <Label htmlFor="yearsExperience" className="text-[#241335]">Años de experiencia *</Label>
          <Input id="yearsExperience" type="number" min="0" required value={formData.yearsExperience} onChange={(event) => setFormData({ ...formData, yearsExperience: event.target.value })} className="mt-2 border-[#EFDCD6] bg-[#FFFDFC] text-[#241335]" placeholder="3" />
        </div>

        <div className="md:col-span-2">
          <Label htmlFor="workMode" className="text-[#241335]">¿Cómo trabajás hoy? *</Label>
          <select id="workMode" required value={formData.workMode} onChange={(event) => setFormData({ ...formData, workMode: event.target.value })} className="mt-2 h-10 w-full rounded-md border border-[#EFDCD6] bg-[#FFFDFC] px-3 text-sm text-[#241335] outline-none focus:ring-2 focus:ring-[#E94B8A]/30">
            <option value="">Seleccioná una opción</option>
            {workModes.map((mode) => <option key={mode} value={mode}>{mode}</option>)}
          </select>
        </div>

        <div className="md:col-span-2">
          <Label className="text-[#241335]">Especialidades *</Label>
          <div className="mt-3 grid gap-3 sm:grid-cols-2 md:grid-cols-3">
            {categoryOptions.map((category) => (
              <label key={category} className="flex cursor-pointer items-center gap-2 rounded-xl border border-[#F0E0DA] bg-[#FFFDFC] px-3 py-3 text-sm text-[#5B2A86]">
                <Checkbox checked={formData.categories.includes(category)} onCheckedChange={() => handleCategoryToggle(category)} />
                {category}
              </label>
            ))}
          </div>
        </div>

        <div className="md:col-span-2">
          <Label htmlFor="portfolio" className="text-[#241335]">Instagram, TikTok o portafolio</Label>
          <Input id="portfolio" type="url" value={formData.portfolioUrl} onChange={(event) => setFormData({ ...formData, portfolioUrl: event.target.value })} className="mt-2 border-[#EFDCD6] bg-[#FFFDFC] text-[#241335]" placeholder="https://instagram.com/tu-perfil" />
        </div>

        <div className="md:col-span-2">
          <Label htmlFor="services" className="text-[#241335]">Tus 3 servicios principales y precio desde *</Label>
          <Textarea id="services" required value={formData.mainServices} onChange={(event) => setFormData({ ...formData, mainServices: event.target.value })} className="mt-2 min-h-28 border-[#EFDCD6] bg-[#FFFDFC] text-[#241335]" placeholder={"Ejemplo:\nDiseño de cejas + henna — desde ₡18.000\nLifting de pestañas — desde ₡26.000\nFacial glow — desde ₡42.000"} />
        </div>

        <div className="md:col-span-2">
          <Label htmlFor="certifications" className="text-[#241335]">Certificaciones o formación relevante</Label>
          <Textarea id="certifications" value={formData.certifications} onChange={(event) => setFormData({ ...formData, certifications: event.target.value })} className="mt-2 min-h-24 border-[#EFDCD6] bg-[#FFFDFC] text-[#241335]" placeholder="Cursos, academias, certificaciones o especializaciones que te gustaría mostrar." />
        </div>

        <div className="md:col-span-2 rounded-2xl border border-[#E9DDF2] bg-[#FAF6FF] p-5">
          <Label htmlFor="businessGoal" className="text-base font-semibold text-[#241335]">¿Qué te gustaría que LuVelle te ayudara a conseguir primero? *</Label>
          <p className="mt-1 text-sm text-[#6D5577]">Esta pregunta nos ayuda a decidir qué producto construir después del perfil.</p>
          <select id="businessGoal" required value={formData.businessGoal} onChange={(event) => setFormData({ ...formData, businessGoal: event.target.value })} className="mt-4 h-11 w-full rounded-md border border-[#DCCDE8] bg-white px-3 text-sm text-[#241335] outline-none focus:ring-2 focus:ring-[#B388FF]/40">
            <option value="">Seleccioná tu prioridad principal</option>
            {businessGoals.map((goal) => <option key={goal} value={goal}>{goal}</option>)}
          </select>
        </div>

        <div className="md:col-span-2 rounded-2xl border border-[#F0E0DA] bg-[#FFFDFC] p-5">
          <Label htmlFor="discoverySource" className="font-semibold text-[#241335]">¿Cómo conociste LuVelle?</Label>
          <p className="mt-1 text-sm text-[#6D5577]">Opcional. Nos ayuda a saber qué comunidades y canales realmente funcionan.</p>
          <select id="discoverySource" value={formData.discoverySource} onChange={(event) => setFormData({ ...formData, discoverySource: event.target.value, referrerName: event.target.value === "Me invitó otra profesional" ? formData.referrerName : "" })} className="mt-3 h-11 w-full rounded-md border border-[#EFDCD6] bg-white px-3 text-sm text-[#241335] outline-none focus:ring-2 focus:ring-[#E94B8A]/30">
            <option value="">Seleccioná una opción</option>
            {discoverySources.map((source) => <option key={source} value={source}>{source}</option>)}
          </select>

          {formData.discoverySource === "Me invitó otra profesional" ? (
            <div className="mt-4">
              <Label htmlFor="referrerName" className="text-[#241335]">¿Quién te invitó? <span className="font-normal text-[#8A718F]">(opcional)</span></Label>
              <Input id="referrerName" value={formData.referrerName} onChange={(event) => setFormData({ ...formData, referrerName: event.target.value })} className="mt-2 border-[#EFDCD6] bg-white text-[#241335]" placeholder="Nombre de la profesional" />
            </div>
          ) : null}
        </div>
      </div>

      <label className="mt-6 flex cursor-pointer items-start gap-3 text-sm leading-6 text-[#6D5577]">
        <Checkbox checked={profileConsent} onCheckedChange={(checked) => setProfileConsent(checked === true)} className="mt-1" />
        <span>Acepto que LuVelle me contacte para conversar sobre mi perfil, validar esta propuesta y participar en el piloto inicial. *</span>
      </label>

      <button type="submit" disabled={loading} className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#E94B8A] to-[#FF7A59] px-6 py-3.5 font-semibold text-white shadow-lg shadow-[#E94B8A]/15 transition hover:-translate-y-0.5 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60">
        {loading ? <><Loader2 className="h-5 w-5 animate-spin" /> Enviando...</> : "Crear mi perfil"}
      </button>

      <p className="mt-3 text-center text-xs text-[#8A718F]">Oferta piloto: primer mes gratis. Luego ₡9.900/mes mientras validamos valor y resultados con profesionales fundadoras.</p>
    </form>
  )
}
