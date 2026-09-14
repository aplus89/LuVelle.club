"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, Bot, CheckCircle2, Gift, Heart, Store, Users } from "lucide-react"
import { AtelierStrip, AuraHalo, AuraWaves, ConstellationField, Spark } from "@/components/brand/luvelle-visual-system"

const ecosystem = [
  {
    icon: Bot,
    title: "LuVelle AI",
    status: "Beta",
    copy: "Ayuda para dar seguimiento a conversaciones, recuperar oportunidades y ahorrar tiempo en tareas repetitivas.",
    href: "/ai",
  },
  {
    icon: Store,
    title: "Para marcas",
    status: "Colaboraciones",
    copy: "Un espacio para conectar marcas con profesionales, comunidad, eventos y nuevas experiencias LuVelle.",
    href: "/partners",
  },
  {
    icon: Heart,
    title: "Club VIP",
    status: "Acceso anticipado",
    copy: "Beneficios, recompensas y experiencias pensadas para quienes viven la belleza y el bienestar de forma frecuente.",
    href: "/club-vip",
  },
  {
    icon: Gift,
    title: "Beauty Box",
    status: "Acceso anticipado",
    copy: "Una experiencia curada para descubrir productos, marcas y favoritos de belleza de una forma más personal.",
    href: "/beauty-box",
  },
]

const steps = [
  {
    number: "01",
    title: "Creá tu perfil",
    body: "Mostrá lo que hacés, tus servicios, experiencia y todo lo que hace especial tu trabajo.",
  },
  {
    number: "02",
    title: "Contanos qué necesitás",
    body: "Queremos entender qué te ayudaría más: visibilidad, seguimiento, una agenda más llena o menos tiempo resolviendo mensajes.",
  },
  {
    number: "03",
    title: "Crecemos con vos",
    body: "A medida que conozcamos mejor tu negocio, LuVelle podrá acercarte nuevas herramientas, conexiones y oportunidades para llegar más lejos.",
  },
]

export function HomeStrategyV1() {
  return (
    <>
      <section className="relative isolate overflow-hidden bg-[#FFF7F3] px-4 pb-32 pt-20 md:pb-40 md:pt-28">
        <ConstellationField className="opacity-40" />
        <div className="absolute -right-24 top-16 hidden lg:block"><AuraHalo className="w-72" /></div>
        <div className="relative mx-auto grid max-w-7xl gap-14 lg:grid-cols-[1.02fr_.98fr] lg:items-center">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65 }}>
            <div className="mb-5 flex items-center gap-3 text-sm font-semibold text-[#5B2A86]">
              <Spark className="h-5 w-5" />
              Belleza · bienestar · conexión
            </div>
            <h1 className="max-w-4xl text-5xl font-bold leading-[1.04] tracking-tight text-[#241335] sm:text-6xl lg:text-7xl">
              Tu talento merece ser visto.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-[#6D5577] md:text-xl">
              Creá un perfil profesional que muestre tu trabajo, inspire confianza y te ayude a hacer crecer tu negocio.
            </p>
            <Link href="/providers#aplicacion" className="mt-9 inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#E94B8A] to-[#FF7A59] px-7 py-3.5 font-semibold text-white shadow-lg shadow-[#E94B8A]/15 transition hover:-translate-y-0.5 hover:shadow-xl">
              Crear mi perfil LuVelle
              <ArrowRight className="h-4 w-4" />
            </Link>
            <p className="mt-4 text-sm text-[#8A718F]">Primer mes gratis · luego ₡9.900/mes</p>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 28 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15, duration: 0.7 }} className="relative">
            <div className="absolute -inset-8 rounded-[44px] bg-gradient-to-br from-[#FFD8CC]/45 via-transparent to-[#B388FF]/20 blur-2xl" />
            <div className="relative overflow-hidden rounded-[36px] border border-[#F0DAD3] bg-white/95 p-6 shadow-[0_30px_100px_rgba(91,42,134,0.12)] md:p-8">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#E94B8A]">Tu espacio LuVelle</p>
                  <h2 className="mt-2 text-2xl font-bold text-[#241335]">Todo lo que hace especial tu trabajo, en un solo lugar.</h2>
                </div>
                <Spark className="shrink-0" />
              </div>
              <div className="mt-7 overflow-hidden rounded-[26px] border border-[#F2DDD7] bg-[#FFF7F3] p-5">
                <div className="flex items-center gap-4">
                  <div className="h-16 w-16 rounded-full bg-gradient-to-br from-[#FFD8CC] via-[#E94B8A]/30 to-[#B388FF]/45" />
                  <div>
                    <p className="font-bold text-[#241335]">Tu nombre profesional</p>
                    <p className="mt-1 text-sm text-[#6D5577]">Especialidades · zona general · experiencia</p>
                  </div>
                </div>
                <div className="mt-5 grid grid-cols-3 gap-3">
                  {["Servicios", "Portafolio", "Credenciales"].map((item) => (
                    <div key={item} className="rounded-2xl bg-white px-3 py-4 text-center text-xs font-semibold text-[#5B2A86] shadow-sm">{item}</div>
                  ))}
                </div>
              </div>
              <div className="mt-6 flex items-center justify-between gap-4">
                <AtelierStrip />
                <Link href="/providers/mariana-lopez" className="hidden text-sm font-semibold text-[#E94B8A] underline decoration-[#FFD8CC] decoration-2 underline-offset-4 sm:inline">Ver ejemplo</Link>
              </div>
            </div>
          </motion.div>
        </div>
        <AuraWaves />
      </section>

      <section id="como-funciona" className="relative overflow-hidden bg-white px-4 py-20 md:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#E94B8A]">Tu camino con LuVelle</p>
            <h2 className="mt-3 text-3xl font-bold text-[#241335] md:text-5xl">Empezá simple. Crecé acompañada.</h2>
          </div>

          <div className="relative mt-14">
            <div className="absolute left-7 top-0 hidden h-full w-px bg-gradient-to-b from-[#FF7A59] via-[#E94B8A] to-[#B388FF] md:block" />
            <div className="space-y-8 md:space-y-12">
              {steps.map((step, index) => (
                <motion.article
                  key={step.number}
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.35 }}
                  transition={{ duration: 0.55, delay: index * 0.08 }}
                  className="grid gap-5 md:grid-cols-[58px_1fr] md:items-start"
                >
                  <div className="relative z-10 flex h-14 w-14 items-center justify-center rounded-full bg-[#241335] text-sm font-bold text-white shadow-lg shadow-[#5B2A86]/15">{step.number}</div>
                  <div className="max-w-3xl border-b border-[#F2DDD7] pb-8 md:pb-10">
                    <h3 className="text-2xl font-bold text-[#241335] md:text-3xl">{step.title}</h3>
                    <p className="mt-3 text-lg leading-8 text-[#6D5577]">{step.body}</p>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#FFF7F3] px-4 py-20 md:py-28">
        <ConstellationField className="opacity-55" />
        <div className="relative mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#5B2A86]">Más de LuVelle</p>
            <h2 className="mt-3 text-3xl font-bold text-[#241335] md:text-5xl">Un ecosistema que puede crecer con vos.</h2>
            <p className="mt-4 text-lg leading-8 text-[#6D5577]">Tu perfil es el punto de partida. Alrededor de él estamos creando nuevas formas de acompañar a profesionales, marcas y clientas.</p>
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {ecosystem.map(({ icon: Icon, title, status, copy, href }, index) => (
              <motion.article key={title} initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.06 }} className="group relative overflow-hidden rounded-[28px] border border-[#E9DDF2] bg-white/90 p-6 shadow-[0_12px_40px_rgba(91,42,134,0.05)]">
                <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-[#FFD8CC]/45 blur-2xl transition group-hover:scale-125" />
                <div className="relative flex h-11 w-11 items-center justify-center rounded-2xl bg-[#E94B8A]/10 text-[#E94B8A]"><Icon className="h-5 w-5" /></div>
                <p className="relative mt-5 text-xs font-semibold uppercase tracking-[0.16em] text-[#8B5DB0]">{status}</p>
                <h3 className="relative mt-2 text-xl font-bold text-[#241335]">{title}</h3>
                <p className="relative mt-3 text-sm leading-6 text-[#6D5577]">{copy}</p>
                <Link href={href} className="relative mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#E94B8A]">Descubrir más <ArrowRight className="h-4 w-4" /></Link>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section id="precio" className="bg-white px-4 py-20 md:py-28">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[.9fr_1.1fr] lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#E94B8A]">Una forma simple de empezar</p>
            <h2 className="mt-3 text-3xl font-bold text-[#241335] md:text-5xl">Tu presencia profesional, lista para compartir.</h2>
            <p className="mt-5 max-w-xl text-lg leading-8 text-[#6D5577]">Mostrá tu trabajo con claridad, cuidá tu información sensible y sumate a una comunidad creada alrededor de profesionales como vos.</p>
          </div>
          <div className="relative overflow-hidden rounded-[34px] border border-[#FFD8CC] bg-[#FFF7F3] p-8 shadow-[0_22px_80px_rgba(233,75,138,0.09)]">
            <div className="absolute -right-8 -top-8"><AuraHalo className="w-40 opacity-60" /></div>
            <div className="relative flex items-center gap-3"><Users className="h-6 w-6 text-[#E94B8A]" /><span className="font-semibold text-[#5B2A86]">Perfil Profesional Fundador</span></div>
            <div className="relative mt-5"><span className="text-5xl font-bold text-[#241335]">₡9.900</span><span className="text-[#6D5577]"> / mes</span></div>
            <p className="relative mt-2 text-sm font-semibold text-[#E94B8A]">Tu primer mes va por nuestra cuenta.</p>
            <div className="relative mt-6 space-y-3 text-sm text-[#6D5577]">
              <p className="flex gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#E94B8A]" /> Perfil profesional público y compartible.</p>
              <p className="flex gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#E94B8A]" /> Servicios, precios, portafolio y credenciales.</p>
              <p className="flex gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#E94B8A]" /> Privacidad para tu información sensible.</p>
              <p className="flex gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#E94B8A]" /> Comunidad de profesionales LuVelle.</p>
              <p className="flex gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#E94B8A]" /> Acceso anticipado a nuevas herramientas.</p>
            </div>
            <Link href="/providers#aplicacion" className="relative mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#E94B8A] to-[#FF7A59] px-6 py-3.5 font-semibold text-white">Crear mi perfil <ArrowRight className="h-4 w-4" /></Link>
            <p className="relative mt-4 text-xs leading-5 text-[#8A718F]">*LuVelle ofrece herramientas de visibilidad, confianza y crecimiento. Los resultados comerciales pueden variar y no se garantizan nuevas clientas.</p>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#241335] px-4 py-20 text-white md:py-28">
        <ConstellationField className="opacity-25" />
        <div className="relative mx-auto max-w-5xl text-center">
          <Spark className="mx-auto" />
          <h2 className="mt-6 text-3xl font-bold md:text-5xl">Queremos convertirnos en la aliada que todo negocio de belleza merece tener.</h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-white/75">Una que conozca tus metas, cuide tu trabajo y te ayude a crecer hacia todo lo que soñás construir.</p>
          <Link href="/providers#aplicacion" className="mt-8 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#E94B8A] to-[#FF7A59] px-7 py-3.5 font-semibold text-white">Crear mi perfil LuVelle <ArrowRight className="h-4 w-4" /></Link>
        </div>
      </section>
    </>
  )
}
