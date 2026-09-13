import Link from "next/link"
import { ArrowRight, Bot, BriefcaseBusiness, CheckCircle2, Gift, Heart, ShieldCheck, Sparkles, Store, Users } from "lucide-react"

const ecosystem = [
  {
    icon: BriefcaseBusiness,
    title: "Para profesionales",
    status: "Piloto activo",
    copy: "Creá un perfil profesional, mostrale al mercado lo que hacés y ayudanos a validar qué herramientas realmente impulsan tu negocio.",
    href: "/providers",
    cta: "Conocer la propuesta",
  },
  {
    icon: Bot,
    title: "LuVelle AI",
    status: "Piloto",
    copy: "Seguimiento, recuperación de oportunidades y operaciones simples para profesionales. AI como workflow, no como chatbot genérico.",
    href: "/ai",
    cta: "Ver piloto AI",
  },
  {
    icon: Store,
    title: "Para marcas",
    status: "Partner discovery",
    copy: "Exploramos colaboraciones con profesionales, comunidad, Club VIP, eventos y futuras experiencias de producto.",
    href: "/partners",
    cta: "Registrar mi marca",
  },
  {
    icon: Heart,
    title: "Club VIP",
    status: "Waitlist",
    copy: "Beneficios, rewards, experiencias y una posible capa financiera futura, validada paso a paso antes de construirla.",
    href: "/club-vip",
    cta: "Quiero acceso anticipado",
  },
  {
    icon: Gift,
    title: "Beauty Box",
    status: "Waitlist",
    copy: "Una experiencia curada de descubrimiento de productos que solo avanzará si encontramos demanda, formato y precio correctos.",
    href: "/beauty-box",
    cta: "Explorar Beauty Box",
  },
]

export function HomeStrategyV1() {
  return (
    <>
      <section className="relative overflow-hidden bg-[#FFF7F3] px-4 py-20 md:py-28">
        <div className="absolute -right-28 top-0 h-96 w-96 rounded-full bg-[#FFD8CC]/70 blur-3xl" />
        <div className="absolute -left-24 bottom-0 h-80 w-80 rounded-full bg-[#B388FF]/20 blur-3xl" />
        <div className="relative mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1.08fr_.92fr] lg:items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-[#F2DDD7] bg-white px-4 py-2 text-sm font-semibold text-[#5B2A86]">
              <Sparkles className="h-4 w-4" />
              Construyendo con profesionales, validando antes de escalar
            </div>
            <h1 className="mt-6 max-w-4xl text-4xl font-bold leading-tight text-[#241335] sm:text-5xl lg:text-6xl">
              Tu trabajo de belleza merece una presencia profesional y herramientas que sí ayuden a crecer.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-[#6D5577]">
              LuVelle está construyendo perfiles, comunidad y herramientas para profesionales de belleza y bienestar. Alrededor de ese núcleo estamos validando AI, marcas, Club VIP y Beauty Box con datos reales, no promesas.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link href="/providers#aplicacion" className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#E94B8A] to-[#FF7A59] px-7 py-3.5 font-semibold text-white shadow-lg shadow-[#E94B8A]/15 transition hover:-translate-y-0.5 hover:shadow-xl">
                Crear mi perfil
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/providers/mariana-lopez" className="inline-flex items-center justify-center gap-2 rounded-full border border-[#E5CEDF] bg-white px-7 py-3.5 font-semibold text-[#5B2A86] transition hover:border-[#B388FF]">
                Ver perfil demo
              </Link>
            </div>
            <div className="mt-8 flex flex-wrap gap-3 text-sm text-[#6D5577]">
              <span className="rounded-full bg-white px-4 py-2">Primer mes gratis</span>
              <span className="rounded-full bg-white px-4 py-2">Luego ₡9.900/mes</span>
              <span className="rounded-full bg-white px-4 py-2">Precio en validación</span>
            </div>
          </div>

          <div className="rounded-[34px] border border-[#F2DDD7] bg-white p-7 shadow-[0_30px_100px_rgba(91,42,134,0.12)] md:p-9">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#E94B8A]">Wedge actual</p>
            <h2 className="mt-3 text-2xl font-bold text-[#241335]">Perfil profesional + aprendizaje de PMF</h2>
            <div className="mt-6 space-y-4">
              {[
                "Mostrá servicios, experiencia, formación y portfolio.",
                "Protegé ubicación exacta, comentarios sensibles y datos de contacto.",
                "Decinos qué problema de negocio necesitás resolver primero.",
                "Compartí tu perfil y ayudanos a medir si genera confianza e intención real.",
              ].map((item) => (
                <div key={item} className="flex gap-3 rounded-2xl bg-[#FFF7F3] p-4 text-sm leading-6 text-[#6D5577]">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#E94B8A]" />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="como-funciona" className="bg-white px-4 py-16 md:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#E94B8A]">Cómo funciona hoy</p>
            <h2 className="mt-3 text-3xl font-bold text-[#241335] md:text-4xl">Empezamos por una necesidad concreta y aprendemos antes de automatizar.</h2>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            <article className="rounded-[28px] border border-[#F2DDD7] bg-[#FFFDFC] p-7"><div className="text-sm font-bold text-[#E94B8A]">01</div><h3 className="mt-3 text-xl font-bold text-[#241335]">Creás tu perfil</h3><p className="mt-3 leading-7 text-[#6D5577]">Nos contás qué hacés, dónde atendés de forma general, qué servicios ofrecés y qué querés mejorar.</p></article>
            <article className="rounded-[28px] border border-[#F2DDD7] bg-[#FFFDFC] p-7"><div className="text-sm font-bold text-[#E94B8A]">02</div><h3 className="mt-3 text-xl font-bold text-[#241335]">Validamos el problema</h3><p className="mt-3 leading-7 text-[#6D5577]">Medimos si necesitás más demanda, seguimiento, agenda, confianza, recuperación de clientas u otra cosa.</p></article>
            <article className="rounded-[28px] border border-[#F2DDD7] bg-[#FFFDFC] p-7"><div className="text-sm font-bold text-[#E94B8A]">03</div><h3 className="mt-3 text-xl font-bold text-[#241335]">Probamos el mínimo útil</h3><p className="mt-3 leading-7 text-[#6D5577]">Solo convertimos en producto los workflows que demuestren ahorro de tiempo, interés, citas o revenue.</p></article>
          </div>
        </div>
      </section>

      <section className="bg-[#FAF6FF] px-4 py-16 md:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#8B5DB0]">Ecosistema LuVelle</p>
            <h2 className="mt-3 text-3xl font-bold text-[#241335] md:text-4xl">Una visión grande, experimentos pequeños.</h2>
            <p className="mt-4 leading-7 text-[#6D5577]">Cada iniciativa tiene un propósito distinto y un estado claro. No tratamos una waitlist como si fuera un producto terminado.</p>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {ecosystem.map(({ icon: Icon, title, status, copy, href, cta }) => (
              <article key={title} className="flex flex-col rounded-[28px] border border-[#E9DDF2] bg-white p-7 shadow-[0_12px_40px_rgba(91,42,134,0.05)]">
                <div className="flex items-start justify-between gap-4"><div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#E94B8A]/10 text-[#E94B8A]"><Icon className="h-5 w-5" /></div><span className="rounded-full bg-[#FAF6FF] px-3 py-1 text-xs font-semibold text-[#7B55A0]">{status}</span></div>
                <h3 className="mt-5 text-xl font-bold text-[#241335]">{title}</h3>
                <p className="mt-3 flex-1 text-sm leading-6 text-[#6D5577]">{copy}</p>
                <Link href={href} className="mt-6 inline-flex items-center gap-2 font-semibold text-[#E94B8A]">{cta}<ArrowRight className="h-4 w-4" /></Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="precio" className="bg-white px-4 py-16 md:py-24">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[.9fr_1.1fr] lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#E94B8A]">Oferta inicial para profesionales</p>
            <h2 className="mt-3 text-3xl font-bold text-[#241335] md:text-4xl">Un precio para validar valor, no para fingir que el producto ya terminó.</h2>
            <p className="mt-4 leading-7 text-[#6D5577]">Si en el futuro el costo operativo y la propuesta de valor aumentan de forma demostrable, el precio podrá evolucionar. Primero necesitamos probar que LuVelle genera suficiente valor para justificarlo.</p>
          </div>
          <div className="rounded-[32px] border border-[#FFD8CC] bg-[#FFF7F3] p-8 shadow-[0_20px_70px_rgba(233,75,138,0.08)]">
            <div className="flex items-center gap-3"><Users className="h-6 w-6 text-[#E94B8A]" /><span className="font-semibold text-[#5B2A86]">Perfil profesional fundador</span></div>
            <div className="mt-5"><span className="text-4xl font-bold text-[#241335]">₡9.900</span><span className="text-[#6D5577]"> / mes</span></div>
            <p className="mt-2 text-sm font-semibold text-[#E94B8A]">Primer mes gratis durante la validación inicial.</p>
            <div className="mt-6 space-y-3 text-sm text-[#6D5577]">
              <p className="flex gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#E94B8A]" /> Perfil público profesional y compartible.</p>
              <p className="flex gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#E94B8A]" /> Servicios, precios, portfolio y credenciales.</p>
              <p className="flex gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#E94B8A]" /> Privacidad por diseño y comunidad de profesionales.</p>
              <p className="flex gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#E94B8A]" /> Participación en pilotos y aprendizaje de producto.</p>
            </div>
            <Link href="/providers#aplicacion" className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#E94B8A] to-[#FF7A59] px-6 py-3.5 font-semibold text-white">Crear mi perfil <ArrowRight className="h-4 w-4" /></Link>
          </div>
        </div>
      </section>

      <section className="bg-[#241335] px-4 py-16 text-white md:py-20">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-2 lg:items-center">
          <div><div className="flex items-center gap-2 text-[#FFD8CC]"><ShieldCheck className="h-5 w-5" /><span className="text-sm font-semibold uppercase tracking-[0.18em]">Transparencia</span></div><h2 className="mt-4 text-3xl font-bold">No garantizamos clientas. Queremos demostrar valor antes de prometerlo.</h2></div>
          <p className="leading-7 text-white/75">LuVelle puede ayudar a mejorar presencia, confianza, seguimiento y descubrimiento. El resultado comercial depende de múltiples factores. Nuestra responsabilidad ahora es medir qué funciona y concentrarnos ahí.</p>
        </div>
      </section>

      <section className="bg-white px-4 py-16 md:py-24">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold text-[#241335] md:text-4xl">Cada perfil nos acerca a un producto que realmente haga falta.</h2>
          <p className="mx-auto mt-4 max-w-2xl leading-7 text-[#6D5577]">Si sos profesional de belleza o bienestar, empezá por contarnos sobre tu negocio. Esa información decide qué construimos después.</p>
          <Link href="/providers#aplicacion" className="mt-8 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#E94B8A] to-[#FF7A59] px-7 py-3.5 font-semibold text-white">Crear mi perfil <ArrowRight className="h-4 w-4" /></Link>
        </div>
      </section>
    </>
  )
}
