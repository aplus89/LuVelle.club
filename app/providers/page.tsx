import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, BadgeCheck, CheckCircle2, Eye, Link2, ShieldCheck, Sparkles, Star } from "lucide-react"
import { Header } from "@/components/sections/header"
import { Footer } from "@/components/sections/footer"
import { ProvidersForm } from "@/components/providers/providers-form"
import { AtelierStrip, AuraWaves } from "@/components/brand/luvelle-visual-system"
import { getDemoProvider } from "@/lib/providers/demo-providers"

export const metadata: Metadata = {
  title: "Para profesionales de belleza y bienestar",
  description: "Creá tu perfil profesional LuVelle para mostrar servicios, experiencia, portafolio y credenciales en un solo link compartible.",
  openGraph: {
    title: "LuVelle para profesionales | Tu trabajo merece ser visto",
    description: "Mostrá tu talento, inspirá confianza y compartí tu trabajo con un perfil profesional LuVelle.",
    url: "https://www.luvelle.club/providers",
  },
}

const benefits = [
  {
    icon: BadgeCheck,
    title: "Una presencia profesional",
    description: "Mostrá servicios, especialidades, experiencia, formación y portafolio en un solo link compartible.",
  },
  {
    icon: ShieldCheck,
    title: "Privacidad por diseño",
    description: "Compartí tu zona general y protegé dirección exacta, agenda y datos sensibles.",
  },
  {
    icon: Link2,
    title: "Hecho para compartir",
    description: "Usalo en WhatsApp, Instagram, TikTok o donde hoy conversás con tus clientas.",
  },
  {
    icon: Eye,
    title: "Más formas de crecer",
    description: "Sumate a una comunidad y accedé primero a nuevas herramientas creadas para profesionales como vos.",
  },
]

export default function ProvidersPage() {
  const demoProvider = getDemoProvider("mariana-lopez")!

  return (
    <main className="min-h-screen bg-[#FFF7F3] text-[#241335]">
      <Header />

      <section className="relative overflow-hidden px-4 pb-32 pt-16 md:pb-40 md:pt-24">
        <div className="absolute -right-40 top-0 h-[520px] w-[520px] rounded-full bg-[#FFD8CC]/60 blur-3xl" />
        <div className="absolute -left-32 bottom-0 h-[420px] w-[420px] rounded-full bg-[#B388FF]/15 blur-3xl" />

        <div className="relative mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1.05fr_.95fr] lg:items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-[#5B2A86]/10 px-4 py-2 text-sm font-semibold text-[#5B2A86]">
              <Sparkles className="h-4 w-4" />
              LuVelle para profesionales de belleza y bienestar
            </div>
            <h1 className="mt-6 max-w-3xl text-4xl font-bold leading-tight tracking-tight md:text-6xl">
              Tu trabajo merece un perfil que genere confianza.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-[#6D5577] md:text-xl">
              Mostrá tus servicios, experiencia, formación y portafolio en una presencia profesional que podés compartir con tus clientas, sin publicar información sensible.
            </p>

            <div className="mt-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
              <a href="#aplicacion" className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#E94B8A] to-[#FF7A59] px-7 py-3.5 font-semibold text-white shadow-lg shadow-[#E94B8A]/20 transition hover:-translate-y-0.5 hover:shadow-xl">
                Crear mi perfil
                <ArrowRight className="h-4 w-4" />
              </a>
              <Link href="/providers/mariana-lopez" className="text-sm font-semibold text-[#5B2A86] underline decoration-[#FFD8CC] decoration-2 underline-offset-4 transition hover:text-[#E94B8A]">
                Ver ejemplo de perfil
              </Link>
            </div>

            <div className="mt-9 flex flex-wrap gap-x-6 gap-y-3 text-sm text-[#6D5577]">
              <span className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-[#E94B8A]" /> Primer mes gratis</span>
              <span className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-[#E94B8A]" /> Luego ₡9.900/mes</span>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-xl">
            <div className="rounded-[32px] border border-[#F0DAD3] bg-white p-5 shadow-[0_28px_80px_rgba(91,42,134,0.12)] md:p-7">
              <div className="flex items-center gap-4">
                <div className="relative h-20 w-20 overflow-hidden rounded-full border-4 border-[#FFF0EA]">
                  <Image src={demoProvider.profileImage} alt={demoProvider.name} fill className="object-cover" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 text-xs font-semibold text-[#B06C43]"><BadgeCheck className="h-4 w-4" /> Especialista verificada</div>
                  <h2 className="mt-1 text-2xl font-bold">{demoProvider.name}</h2>
                  <p className="mt-1 text-sm text-[#6D5577]">{demoProvider.specialties.join(" • ")}</p>
                  <p className="mt-1 text-xs text-[#8A718F]">{demoProvider.area}</p>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-3 gap-3 rounded-2xl bg-[#FFF7F3] p-4 text-center">
                <div><div className="font-bold">{demoProvider.yearsExperience}+</div><div className="text-[11px] text-[#8A718F]">años</div></div>
                <div><div className="font-bold">{demoProvider.clientsServed}+</div><div className="text-[11px] text-[#8A718F]">clientas</div></div>
                <div><div className="flex items-center justify-center gap-1 font-bold">{demoProvider.rating}<Star className="h-3.5 w-3.5 fill-[#F2C572] text-[#F2C572]" /></div><div className="text-[11px] text-[#8A718F]">valoración</div></div>
              </div>

              <div className="mt-5 grid gap-3 sm:grid-cols-3">
                {demoProvider.services.map((service) => (
                  <div key={service.name} className="overflow-hidden rounded-2xl border border-[#F1E0DA] bg-white">
                    <div className="relative h-24"><Image src={service.image} alt={service.name} fill className="object-cover" /></div>
                    <div className="p-3"><p className="text-xs font-semibold leading-4">{service.name}</p><p className="mt-2 text-xs font-bold text-[#E94B8A]">Desde {service.priceFrom}</p></div>
                  </div>
                ))}
              </div>

              <Link href="/providers/mariana-lopez" className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full border border-[#E9CFC7] bg-[#FFFDFC] px-5 py-3 text-sm font-semibold text-[#5B2A86] transition hover:border-[#E94B8A] hover:text-[#E94B8A]">
                Explorar el perfil demo
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
        <AuraWaves />
      </section>

      <section className="bg-white px-4 py-20 md:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#E94B8A]">Creado alrededor de tu trabajo</p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-5xl">Más claridad para mostrar todo lo que sabés hacer.</h2>
            <p className="mt-4 text-lg leading-8 text-[#6D5577]">Tu perfil reúne lo esencial de tu negocio y te da una presencia profesional lista para compartir.</p>
          </div>

          <div className="mx-auto mt-10 flex justify-center"><AtelierStrip /></div>
          <div className="mt-12 grid gap-x-10 gap-y-9 md:grid-cols-2">
            {benefits.map((benefit) => (
              <article key={benefit.title} className="flex gap-5 border-b border-[#F2DDD7] pb-8">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#E94B8A]/10 text-[#E94B8A]"><benefit.icon className="h-5 w-5" /></div>
                <div><h3 className="text-lg font-bold">{benefit.title}</h3><p className="mt-2 text-sm leading-6 text-[#6D5577]">{benefit.description}</p></div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-20 md:py-28">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[.9fr_1.1fr] lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#5B2A86]">Perfil Profesional Fundador</p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-5xl">Una forma simple de empezar.</h2>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-[#6D5577]">Tu perfil, tu trabajo y tu historia profesional en un espacio cuidado, compartible y pensado para crecer con vos.</p>
          </div>

          <div className="rounded-[30px] border border-[#E9D9F3] bg-gradient-to-br from-white to-[#FAF6FF] p-7 shadow-[0_20px_70px_rgba(91,42,134,0.08)] md:p-8">
            <span className="inline-flex rounded-full bg-[#E94B8A]/10 px-3 py-1 text-xs font-bold text-[#E94B8A]">Profesionales fundadoras</span>
            <div className="mt-5 flex items-end gap-2"><span className="text-5xl font-bold">₡9.900</span><span className="pb-1 text-[#6D5577]">/ mes</span></div>
            <p className="mt-2 text-sm font-semibold text-[#5B2A86]">Tu primer mes va por nuestra cuenta.</p>
            <ul className="mt-6 space-y-3 text-sm text-[#6D5577]">
              <li className="flex gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#E94B8A]" /> Perfil público profesional y compartible</li>
              <li className="flex gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#E94B8A]" /> Servicios, precios, portafolio y formación</li>
              <li className="flex gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#E94B8A]" /> Privacidad para dirección, agenda y datos sensibles</li>
              <li className="flex gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#E94B8A]" /> Comunidad de profesionales LuVelle</li>
              <li className="flex gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#E94B8A]" /> Acceso anticipado a nuevas herramientas</li>
            </ul>
            <a href="#aplicacion" className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#E94B8A] to-[#FF7A59] px-6 py-3.5 font-semibold text-white">Crear mi perfil <ArrowRight className="h-4 w-4" /></a>
            <p className="mt-4 text-xs leading-5 text-[#8A718F]">*LuVelle puede ayudar a mejorar presencia, confianza, seguimiento y descubrimiento. Los resultados comerciales pueden variar.</p>
          </div>
        </div>
      </section>

      <ProvidersForm />

      <section className="bg-[#241335] px-4 py-12 text-white">
        <div className="mx-auto flex max-w-6xl flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div><p className="text-sm font-semibold text-[#FFD8CC]">¿Tenés una marca de belleza o bienestar?</p><p className="mt-1 text-lg font-semibold">También hay un espacio para marcas dentro de LuVelle.</p></div>
          <Link href="/partners" className="inline-flex items-center gap-2 text-sm font-semibold text-white underline decoration-[#E94B8A] decoration-2 underline-offset-4">Conocer propuesta para marcas <ArrowRight className="h-4 w-4" /></Link>
        </div>
      </section>

      <Footer />
    </main>
  )
}
