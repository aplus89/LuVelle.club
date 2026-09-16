"use client"

import { useMemo, useState } from "react"
import { ArrowRight, BadgePercent, Crown, Gift, Heart, Loader2, ShieldCheck, Sparkles, Star, TicketPercent, WalletCards } from "lucide-react"
import { Header } from "@/components/sections/header"
import { Footer } from "@/components/sections/footer"
import { createClubVipWaitlistAction } from "@/app/waitlist-actions"
import { AuraHalo, AuraWaves, ConstellationField } from "@/components/brand/luvelle-visual-system"

const benefitOptions = [
  "Descuentos en servicios",
  "Recompensas por reservar",
  "Beneficios con marcas",
  "Eventos y experiencias VIP",
  "Gift card / saldo LuVelle",
  "Opción futura de pago en cuotas",
]

const spendingOptions = ["Menos de ₡25.000", "₡25.000–₡50.000", "₡50.000–₡100.000", "Más de ₡100.000"]
const membershipOptions = ["Sí, si ahorro más de lo que pago", "Tal vez, depende de los beneficios", "Prefiero que sea gratis"]

export function ClubVipExperiment() {
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState("")
  const [form, setForm] = useState({ name: "", email: "", whatsapp: "", benefits: [] as string[], spending: "", membershipIntent: "", notes: "" })

  const canSubmit = useMemo(() => Boolean(form.email && form.benefits.length > 0 && form.spending && form.membershipIntent), [form])

  const toggleBenefit = (benefit: string) => {
    setForm((current) => ({ ...current, benefits: current.benefits.includes(benefit) ? current.benefits.filter((item) => item !== benefit) : [...current.benefits, benefit] }))
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    setError("")
    if (!canSubmit) {
      setError("Completá los campos requeridos para sumarte a la lista VIP.")
      return
    }
    setLoading(true)
    const result = await createClubVipWaitlistAction({
      name: form.name || undefined,
      email: form.email,
      whatsapp: form.whatsapp || undefined,
      benefits: form.benefits,
      monthly_beauty_spend: form.spending,
      membership_intent: form.membershipIntent,
      open_feedback: form.notes || undefined,
      source: "club-vip-waitlist-v1",
    })
    if (result.success) {
      setSubmitted(true)
      setForm({ name: "", email: "", whatsapp: "", benefits: [], spending: "", membershipIntent: "", notes: "" })
    } else {
      setError("No pudimos guardar tu interés. Intentá de nuevo en unos segundos.")
    }
    setLoading(false)
  }

  return (
    <main className="min-h-screen bg-[#FFF7F3] text-[#241335]">
      <Header />

      <section className="relative overflow-hidden border-b border-[#F2DDD7]">
        <ConstellationField className="opacity-35" />
        <div className="absolute -right-24 top-10 h-80 w-80 rounded-full bg-[#FFD8CC]/55 blur-3xl" />
        <div className="absolute right-12 top-10 hidden lg:block"><AuraHalo className="w-64 opacity-60" /></div>
        <div className="relative mx-auto grid max-w-7xl gap-12 px-4 pb-28 pt-16 sm:px-6 md:pb-36 md:pt-24 lg:grid-cols-[1.05fr_.95fr] lg:items-center lg:px-8">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-[#EACEC5] bg-white/80 px-4 py-2 text-sm font-semibold text-[#8A5575]"><Sparkles className="h-4 w-4 text-[#E94B8A]" /> Acceso anticipado</div>
            <h1 className="mt-6 max-w-3xl text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">LuVelle Club VIP<span className="block bg-gradient-to-r from-[#E94B8A] to-[#FF7A59] bg-clip-text text-transparent">más beneficios para disfrutar lo que amás.</span></h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-[#6D5577]">Una futura membresía con beneficios en belleza y bienestar, recompensas, experiencias especiales y nuevas formas de regalar y disfrutar servicios dentro de LuVelle.</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center"><a href="#waitlist" className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#E94B8A] to-[#FF7A59] px-6 py-3.5 font-semibold text-white shadow-lg shadow-[#E94B8A]/15 transition hover:-translate-y-0.5">Quiero acceso anticipado <ArrowRight className="h-5 w-5" /></a><span className="text-sm text-[#8A718F]">Unirte a la lista no tiene costo.</span></div>
            <div className="mt-8 flex max-w-2xl items-start gap-3 rounded-2xl border border-[#F0DDD7] bg-white/75 p-4 text-xs leading-5 text-[#6D5577]"><ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-[#5B2A86]" /><p>Club VIP aún no es una tarjeta de crédito, cuenta bancaria ni producto financiero activo. Cualquier opción financiera futura dependerá de viabilidad, regulación y aliados autorizados.</p></div>
          </div>

          <div className="relative mx-auto w-full max-w-md">
            <div className="absolute inset-0 translate-x-6 translate-y-6 rounded-[36px] bg-gradient-to-br from-[#FFD8CC] to-[#B388FF]/30 blur-sm" />
            <div className="relative overflow-hidden rounded-[36px] border border-white/80 bg-gradient-to-br from-[#241335] via-[#4A1F58] to-[#8E3E74] p-7 text-white shadow-2xl shadow-[#5B2A86]/25 sm:p-8">
              <div className="flex items-start justify-between"><div><p className="text-xs uppercase tracking-[0.25em] text-white/60">LuVelle</p><p className="mt-1 text-2xl font-semibold">Club VIP</p></div><Crown className="h-8 w-8 text-[#F2C572]" /></div>
              <div className="mt-16"><p className="text-sm text-white/60">Founding Member</p><p className="mt-1 font-mono text-xl tracking-[0.22em] text-white/90">•••• •••• VIP</p></div>
              <div className="mt-8 grid grid-cols-2 gap-3 text-sm"><div className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur"><Gift className="h-5 w-5 text-[#FFD8CC]" /><p className="mt-2 font-medium">Recompensas</p></div><div className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur"><BadgePercent className="h-5 w-5 text-[#F2C572]" /><p className="mt-2 font-medium">Beneficios VIP</p></div></div>
            </div>
          </div>
        </div>
        <AuraWaves intensity="subtle" />
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 md:py-28">
        <div className="mx-auto max-w-3xl text-center"><p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#E94B8A]">Lo que podría incluir</p><h2 className="mt-3 text-3xl font-bold sm:text-5xl">Más valor alrededor de tus momentos de belleza y bienestar.</h2></div>
        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: TicketPercent, title: "Beneficios", body: "Ventajas con especialistas, servicios y marcas participantes." },
            { icon: Star, title: "Rewards", body: "Recompensas por reservar, recomendar y participar." },
            { icon: Gift, title: "Gift & saldo", body: "Regalá experiencias o guardá saldo para futuros momentos de belleza." },
            { icon: WalletCards, title: "Pagos flexibles", body: "Opciones futuras de pago que podrían hacer más accesibles ciertos servicios." },
          ].map(({ icon: Icon, title, body }) => (
            <article key={title} className="rounded-[28px] border border-[#F0DDD7] bg-white p-6 shadow-sm"><div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#FFF0EB] text-[#E94B8A]"><Icon className="h-5 w-5" /></div><h3 className="mt-5 text-lg font-semibold">{title}</h3><p className="mt-2 text-sm leading-6 text-[#6D5577]">{body}</p></article>
          ))}
        </div>
      </section>

      <section id="waitlist" className="mx-auto max-w-5xl scroll-mt-24 px-4 py-16 sm:px-6 lg:px-8 md:py-24">
        <div className="grid gap-10 rounded-[36px] border border-[#F0DDD7] bg-white p-6 shadow-xl shadow-[#5B2A86]/5 md:grid-cols-[.9fr_1.1fr] md:p-10">
          <div><div className="inline-flex items-center gap-2 rounded-full bg-[#FFF0EB] px-3 py-1.5 text-xs font-semibold text-[#E94B8A]"><Heart className="h-4 w-4" /> Lista VIP</div><h2 className="mt-4 text-3xl font-bold">Queremos saber qué haría Club VIP especial para vos.</h2><p className="mt-4 leading-7 text-[#6D5577]">Elegí los beneficios que más te interesan y dejanos tus datos para recibir novedades y acceso anticipado.</p></div>

          {submitted ? (
            <div className="flex min-h-[420px] flex-col items-center justify-center rounded-[28px] bg-gradient-to-br from-[#FFF0EB] to-[#F8EEFF] p-8 text-center"><div className="flex h-16 w-16 items-center justify-center rounded-full bg-white text-[#E94B8A] shadow-sm"><Crown className="h-8 w-8" /></div><h3 className="mt-5 text-2xl font-bold">Ya estás en la lista VIP.</h3><p className="mt-3 max-w-md text-[#6D5577]">Gracias. Te avisaremos cuando tengamos novedades y una primera experiencia para compartir.</p></div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid gap-4 sm:grid-cols-2"><label className="text-sm font-medium text-[#4A3653]">Nombre<input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="mt-2 w-full rounded-2xl border border-[#EEDCD6] bg-[#FFFDFB] px-4 py-3 outline-none transition focus:border-[#E94B8A]" placeholder="Tu nombre" /></label><label className="text-sm font-medium text-[#4A3653]">Email *<input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="mt-2 w-full rounded-2xl border border-[#EEDCD6] bg-[#FFFDFB] px-4 py-3 outline-none transition focus:border-[#E94B8A]" placeholder="tu@email.com" /></label></div>
              <label className="block text-sm font-medium text-[#4A3653]">WhatsApp<input value={form.whatsapp} onChange={(e) => setForm({ ...form, whatsapp: e.target.value })} className="mt-2 w-full rounded-2xl border border-[#EEDCD6] bg-[#FFFDFB] px-4 py-3 outline-none transition focus:border-[#E94B8A]" placeholder="+506 ..." /></label>
              <fieldset><legend className="text-sm font-medium text-[#4A3653]">¿Qué beneficios te interesan más? *</legend><div className="mt-3 grid gap-2 sm:grid-cols-2">{benefitOptions.map((benefit) => <button key={benefit} type="button" onClick={() => toggleBenefit(benefit)} className={`rounded-2xl border px-3 py-3 text-left text-sm transition ${form.benefits.includes(benefit) ? "border-[#E94B8A] bg-[#FFF0EB] text-[#5B2A86]" : "border-[#EEDCD6] bg-white text-[#6D5577] hover:border-[#E4B8C8]"}`}>{benefit}</button>)}</div></fieldset>
              <label className="block text-sm font-medium text-[#4A3653]">¿Cuánto gastás aproximadamente al mes en belleza y bienestar? *<select required value={form.spending} onChange={(e) => setForm({ ...form, spending: e.target.value })} className="mt-2 w-full rounded-2xl border border-[#EEDCD6] bg-[#FFFDFB] px-4 py-3 outline-none transition focus:border-[#E94B8A]"><option value="">Seleccioná una opción</option>{spendingOptions.map((option) => <option key={option}>{option}</option>)}</select></label>
              <label className="block text-sm font-medium text-[#4A3653]">¿Pagarías una membresía mensual si los beneficios superan su costo? *<select required value={form.membershipIntent} onChange={(e) => setForm({ ...form, membershipIntent: e.target.value })} className="mt-2 w-full rounded-2xl border border-[#EEDCD6] bg-[#FFFDFB] px-4 py-3 outline-none transition focus:border-[#E94B8A]"><option value="">Seleccioná una opción</option>{membershipOptions.map((option) => <option key={option}>{option}</option>)}</select></label>
              <label className="block text-sm font-medium text-[#4A3653]">¿Qué haría que Club VIP fuera indispensable para vos?<textarea value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} className="mt-2 min-h-24 w-full rounded-2xl border border-[#EEDCD6] bg-[#FFFDFB] px-4 py-3 outline-none transition focus:border-[#E94B8A]" placeholder="Contanos qué beneficio realmente usarías..." /></label>
              {error && <p className="text-sm font-medium text-red-600">{error}</p>}
              <button type="submit" disabled={loading || !canSubmit} className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#E94B8A] to-[#FF7A59] px-6 py-3.5 font-semibold text-white transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-50">{loading ? <><Loader2 className="h-5 w-5 animate-spin" /> Enviando...</> : <><Crown className="h-5 w-5" /> Quiero acceso anticipado</>}</button>
            </form>
          )}
        </div>
      </section>

      <Footer />
    </main>
  )
}