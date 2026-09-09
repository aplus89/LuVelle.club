"use client"

import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import {
  BadgeCheck,
  CalendarDays,
  ChevronRight,
  Clock3,
  Heart,
  Images,
  LockKeyhole,
  MapPin,
  MessageCircle,
  Share2,
  ShieldCheck,
  Sparkles,
  Star,
  Store,
  UserPlus,
  X,
  Zap,
} from "lucide-react"
import { LuVelleLogo } from "@/components/ui/luvelle-logo"
import type { DemoProvider } from "@/lib/providers/demo-providers"

const luvelleWhatsApp =
  "https://wa.me/15557792120?text=Hola%20LuVelle!%20Vi%20el%20perfil%20demo%20de%20Mariana%20y%20quiero%20solicitar%20una%20cita."

function LockedCard({
  icon,
  title,
  summary,
  action,
  onClick,
}: {
  icon: React.ReactNode
  title: string
  summary?: string
  action: string
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group min-h-[190px] rounded-[28px] border border-[#F1D7D0] bg-white/85 p-5 text-left shadow-[0_12px_40px_rgba(80,45,50,0.06)] transition hover:-translate-y-0.5 hover:border-[#FF9A84] hover:shadow-[0_18px_45px_rgba(80,45,50,0.10)]"
    >
      <div className="mb-5 flex items-start justify-between gap-3">
        <div className="flex items-center gap-2 text-[#30262D]">
          <span className="text-[#F06455]">{icon}</span>
          <h3 className="font-semibold">{title}</h3>
        </div>
        <LockKeyhole className="h-4 w-4 text-[#F06455]" />
      </div>
      {summary ? <p className="mb-5 text-sm leading-6 text-[#6E5A62]">{summary}</p> : null}
      <div className="rounded-2xl border border-[#F5E6E1] bg-[#FFF8F5] p-4 text-center">
        <LockKeyhole className="mx-auto mb-2 h-5 w-5 text-[#A98277]" />
        <p className="text-sm font-medium text-[#765D65]">{action}</p>
      </div>
    </button>
  )
}

export function ProviderProfileDemo({ provider }: { provider: DemoProvider }) {
  const [showStickyCta, setShowStickyCta] = useState(false)
  const [accessOpen, setAccessOpen] = useState(false)
  const [joinOpen, setJoinOpen] = useState(false)
  const [shareLabel, setShareLabel] = useState("Compartir perfil")

  useEffect(() => {
    const onScroll = () => setShowStickyCta(window.scrollY > 420)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const handleShare = async () => {
    const url = window.location.href
    try {
      if (navigator.share) {
        await navigator.share({
          title: `${provider.name} en LuVelle`,
          text: `Conocé el perfil de ${provider.name} en LuVelle.`,
          url,
        })
      } else {
        await navigator.clipboard.writeText(url)
        setShareLabel("Enlace copiado")
        window.setTimeout(() => setShareLabel("Compartir perfil"), 1800)
      }
    } catch {
      // The native share sheet can be cancelled by the visitor.
    }
  }

  const openAccess = () => setAccessOpen(true)

  return (
    <main className="min-h-screen bg-[#FFF8F5] text-[#2E252B]">
      <header className="sticky top-0 z-40 border-b border-[#F0DDD7] bg-[#FFF8F5]/95 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:h-20 md:px-6">
          <Link href="/" aria-label="Volver a LuVelle">
            <LuVelleLogo variant="dark-blue" width={116} height={42} />
          </Link>
          <nav className="hidden items-center gap-7 text-sm text-[#6F5A62] md:flex">
            <a href="#servicios" className="transition hover:text-[#E95D51]">Servicios</a>
            <a href="#portafolio" className="transition hover:text-[#E95D51]">Portafolio</a>
            <a href="#privacidad" className="transition hover:text-[#E95D51]">Privacidad</a>
            <Link href="/providers" className="rounded-full border border-[#E8C9BF] px-5 py-2.5 font-semibold text-[#6C4E55] transition hover:bg-white">
              Para especialistas
            </Link>
          </nav>
          <Link
            href="/providers"
            className="rounded-full border border-[#E8C9BF] px-4 py-2 text-xs font-semibold text-[#6C4E55] md:hidden"
          >
            Profesionales
          </Link>
        </div>
      </header>

      <section className="relative overflow-hidden border-b border-[#F0DDD7]">
        <div className="absolute inset-0">
          <Image src={provider.coverImage} alt="Ambiente de belleza LuVelle" fill priority className="object-cover opacity-25" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#FFF8F5] via-[#FFF8F5]/95 to-[#FFF8F5]/70" />
        </div>
        <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-10 md:grid-cols-[300px_1fr] md:px-6 md:py-16 lg:grid-cols-[340px_1fr]">
          <div className="flex items-start justify-center md:justify-start">
            <div className="relative h-56 w-56 overflow-hidden rounded-full border-[7px] border-white shadow-[0_22px_70px_rgba(101,64,71,0.18)] md:h-72 md:w-72">
              <Image src={provider.profileImage} alt={provider.name} fill priority className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#40272F]/15 to-transparent" />
            </div>
            <span className="relative -ml-12 mt-44 flex h-12 w-12 items-center justify-center rounded-full border-4 border-[#FFF8F5] bg-[#FF655B] text-white shadow-lg md:mt-56">
              <BadgeCheck className="h-7 w-7" />
            </span>
          </div>

          <div className="max-w-3xl self-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#F2DAD2] bg-white/80 px-3 py-1.5 text-xs font-semibold text-[#896B64]">
              <Sparkles className="h-3.5 w-3.5 text-[#F0A126]" />
              Especialista verificada
            </div>
            <h1 className="font-serif text-4xl font-semibold tracking-tight text-[#211A1E] md:text-6xl">{provider.name}</h1>
            <div className="mt-3 flex flex-wrap items-center gap-2 text-lg text-[#58464D] md:text-xl">
              {provider.specialties.map((specialty, index) => (
                <span key={specialty} className="flex items-center gap-2">
                  {specialty}
                  {index < provider.specialties.length - 1 ? <span className="h-1.5 w-1.5 rounded-full bg-[#FF655B]" /> : null}
                </span>
              ))}
            </div>
            <div className="mt-4 flex items-center gap-2 text-sm text-[#725F66]">
              <MapPin className="h-4 w-4" />
              {provider.area}
            </div>

            <div className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-4">
              <div className="border-r border-[#EAD8D2] pr-3">
                <div className="text-2xl font-semibold">{provider.yearsExperience}+</div>
                <div className="text-xs text-[#7C6970]">años de experiencia</div>
              </div>
              <div className="border-r border-[#EAD8D2] pr-3">
                <div className="text-2xl font-semibold">{provider.clientsServed}+</div>
                <div className="text-xs text-[#7C6970]">clientas</div>
              </div>
              <div className="border-r border-[#EAD8D2] pr-3">
                <div className="flex items-center gap-2 text-2xl font-semibold">
                  {provider.rating}
                  <Star className="h-4 w-4 fill-[#F4AE2B] text-[#F4AE2B]" />
                </div>
                <div className="text-xs text-[#7C6970]">{provider.ratingCount} valoraciones</div>
              </div>
              <div>
                <div className="flex items-center gap-2 text-sm font-semibold"><Zap className="h-5 w-5 text-[#E46758]" /> {provider.responseLabel}</div>
                <div className="mt-1 text-xs text-[#7C6970]">Generalmente en menos de 1 hora</div>
              </div>
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <button type="button" onClick={openAccess} className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#F25F54] px-6 py-3.5 font-semibold text-white shadow-[0_12px_30px_rgba(242,95,84,0.22)] transition hover:bg-[#E85248]">
                <CalendarDays className="h-5 w-5" />
                Solicitar una cita
              </button>
              <a href="#portafolio" className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#DDBEB4] bg-white/70 px-6 py-3.5 font-semibold text-[#72545B] transition hover:bg-white">
                <Images className="h-5 w-5" />
                Ver portafolio
              </a>
              <button type="button" onClick={handleShare} className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#DDBEB4] bg-white/70 px-6 py-3.5 font-semibold text-[#72545B] transition hover:bg-white">
                <Share2 className="h-5 w-5" />
                {shareLabel}
              </button>
            </div>
            <div className="mt-4 flex items-center gap-2 text-xs text-[#856F76]">
              <ShieldCheck className="h-4 w-4" />
              Tu privacidad protegida por LuVelle
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-10 md:px-6 md:py-14">
        <section className="grid gap-5 md:grid-cols-2">
          <article className="rounded-[28px] border border-[#F0DDD7] bg-white p-6 shadow-[0_12px_40px_rgba(80,45,50,0.05)] md:p-8">
            <div className="mb-4 flex items-center gap-2">
              <Heart className="h-5 w-5 fill-[#F06A60] text-[#F06A60]" />
              <h2 className="font-serif text-2xl font-semibold">Sobre mí</h2>
            </div>
            <p className="max-w-xl leading-7 text-[#66545B]">{provider.bio}</p>
            <p className="mt-5 font-serif text-2xl italic text-[#6F575F]">{provider.name}</p>
          </article>

          <article className="rounded-[28px] border border-[#F0DDD7] bg-white p-6 shadow-[0_12px_40px_rgba(80,45,50,0.05)] md:p-8">
            <h2 className="mb-5 font-serif text-2xl font-semibold">Especialidades</h2>
            <div className="flex flex-wrap gap-2.5">
              {provider.serviceTags.map((tag) => (
                <span key={tag} className="rounded-full bg-[#FFF0EA] px-4 py-2 text-sm font-medium text-[#775B62]">{tag}</span>
              ))}
            </div>
          </article>
        </section>

        <section id="servicios" className="scroll-mt-28 pt-14">
          <div className="mb-6 flex items-end justify-between gap-4">
            <div>
              <p className="mb-1 text-xs font-bold uppercase tracking-[0.18em] text-[#DD7568]">Servicios</p>
              <h2 className="font-serif text-3xl font-semibold md:text-4xl">Paquetes y servicios</h2>
            </div>
            <button type="button" onClick={openAccess} className="hidden text-sm font-semibold text-[#E55E52] sm:block">Consultar disponibilidad →</button>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {provider.services.map((service) => (
              <article key={service.name} className="overflow-hidden rounded-[26px] border border-[#F0DDD7] bg-white shadow-[0_12px_40px_rgba(80,45,50,0.05)]">
                <div className="relative h-52 overflow-hidden bg-[#F8E8E2]">
                  <Image src={service.image} alt={service.name} fill className="object-cover transition duration-500 hover:scale-105" />
                </div>
                <div className="p-5">
                  <h3 className="font-serif text-xl font-semibold">{service.name}</h3>
                  <p className="mt-2 min-h-[52px] text-sm leading-6 text-[#6E5C63]">{service.description}</p>
                  <div className="mt-5 flex items-end justify-between gap-3">
                    <span className="flex items-center gap-2 text-xs text-[#806C73]"><Clock3 className="h-4 w-4" /> {service.duration}</span>
                    <div className="text-right">
                      <div className="text-xs text-[#D96558]">Desde</div>
                      <div className="text-xl font-bold text-[#ED5D51]">{service.priceFrom}</div>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="portafolio" className="scroll-mt-28 pt-14">
          <div className="mb-6 flex items-end justify-between gap-4">
            <div>
              <p className="mb-1 text-xs font-bold uppercase tracking-[0.18em] text-[#DD7568]">Trabajo real</p>
              <h2 className="font-serif text-3xl font-semibold md:text-4xl">Portafolio destacado</h2>
            </div>
            <span className="text-sm text-[#8B7078]">Demo visual</span>
          </div>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
            {provider.portfolio.map((image, index) => (
              <div key={`${image}-${index}`} className="relative aspect-[4/5] overflow-hidden rounded-[24px] border border-[#F0DDD7] bg-white">
                <Image src={image} alt={`Trabajo de ${provider.name} ${index + 1}`} fill className="object-cover transition duration-500 hover:scale-105" />
              </div>
            ))}
          </div>
        </section>

        <section id="privacidad" className="scroll-mt-28 pt-14">
          <div className="mb-6 max-w-2xl">
            <p className="mb-1 text-xs font-bold uppercase tracking-[0.18em] text-[#DD7568]">Privacidad por diseño</p>
            <h2 className="font-serif text-3xl font-semibold md:text-4xl">Lo suficiente para elegir. Lo sensible, protegido.</h2>
            <p className="mt-3 leading-7 text-[#6C5961]">La zona general, el portafolio y los servicios son públicos. La dirección exacta, la agenda completa y los comentarios detallados requieren acceso.</p>
          </div>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            <article className="min-h-[190px] rounded-[28px] border border-[#D7E6D3] bg-[#FBFFF9] p-5 shadow-[0_12px_40px_rgba(80,45,50,0.04)]">
              <div className="mb-4 flex items-center gap-2 text-[#3E6A47]"><MapPin className="h-5 w-5" /><h3 className="font-semibold">Zona de atención</h3></div>
              <p className="font-semibold text-[#3B3336]">{provider.area}</p>
              <div className="mt-5 rounded-2xl bg-gradient-to-br from-[#EADFD4] via-[#F8E9DF] to-[#DCE8D8] p-5">
                <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-white/90 text-[#F06455] shadow"><MapPin className="h-5 w-5" /></div>
              </div>
              <p className="mt-3 text-xs leading-5 text-[#728071]">Por seguridad, no mostramos direcciones exactas.</p>
            </article>

            <LockedCard icon={<CalendarDays className="h-5 w-5" />} title="Disponibilidad completa" action="Inicia sesión para ver agenda completa" onClick={openAccess} />
            <LockedCard icon={<Star className="h-5 w-5" />} title="Reseñas detalladas" summary={`${provider.rating} promedio • ${provider.ratingCount} reseñas verificadas`} action="Inicia sesión para ver reseñas detalladas" onClick={openAccess} />
            <LockedCard icon={<MessageCircle className="h-5 w-5" />} title="Comentarios y contacto" action="Inicia sesión para guardar perfil, ver comentarios y contactar" onClick={openAccess} />
          </div>
        </section>

        <section className="mt-14 overflow-hidden rounded-[30px] border border-[#F0D7CF] bg-gradient-to-r from-[#2A2233] to-[#4A3038] px-6 py-8 text-white md:flex md:items-center md:justify-between md:px-9">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold text-[#F2C572]">Perfil demo LuVelle</p>
            <h2 className="mt-2 font-serif text-3xl font-semibold">¿Te gustaría tener un perfil como este?</h2>
            <p className="mt-3 text-sm leading-6 text-white/70">Mostrá tus servicios, portafolio y reputación sin publicar información sensible. Esta demo existe para validar el producto con profesionales reales.</p>
          </div>
          <button type="button" onClick={() => setJoinOpen(true)} className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#F2C572] px-6 py-3.5 font-bold text-[#2A2233] transition hover:bg-[#F6D48D] md:mt-0">
            <UserPlus className="h-5 w-5" />
            Quiero mi perfil
          </button>
        </section>
      </div>

      <footer className="border-t border-[#F0DDD7] bg-white/60 px-4 py-8">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-5 text-center text-xs text-[#806D73] md:flex-row md:text-left">
          <LuVelleLogo variant="dark-blue" width={100} height={34} />
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            <span className="flex items-center gap-1.5"><ShieldCheck className="h-4 w-4" /> Privacidad primero</span>
            <span>Sin direcciones exactas públicas</span>
            <span>Conexiones seguras y confiables</span>
          </div>
        </div>
      </footer>

      {showStickyCta ? (
        <div className="fixed inset-x-3 bottom-3 z-30 mx-auto max-w-3xl rounded-2xl border border-[#EFD7D0] bg-white/95 p-2 shadow-[0_18px_60px_rgba(66,39,47,0.20)] backdrop-blur-xl md:bottom-5 md:flex md:gap-2">
          <button type="button" onClick={openAccess} className="flex w-full items-center justify-between rounded-xl bg-[#F25F54] px-4 py-3 text-left text-white md:w-1/2">
            <span><span className="block text-xs text-white/80">¿Buscas una cita?</span><span className="font-semibold">Solicitar una cita</span></span>
            <ChevronRight className="h-5 w-5" />
          </button>
          <button type="button" onClick={() => setJoinOpen(true)} className="mt-2 flex w-full items-center justify-between rounded-xl bg-[#FFF0E9] px-4 py-3 text-left text-[#694E56] md:mt-0 md:w-1/2">
            <span><span className="block text-xs text-[#8B7078]">¿Ofrecés servicios o productos?</span><span className="font-semibold">Inscríbete aquí</span></span>
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      ) : null}

      {accessOpen ? (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-[#21191E]/65 p-4 backdrop-blur-sm" role="dialog" aria-modal="true" aria-label="Acceso protegido">
          <div className="relative w-full max-w-lg rounded-[30px] border border-[#EEDBD4] bg-[#FFFDFB] p-6 shadow-2xl md:p-8">
            <button type="button" onClick={() => setAccessOpen(false)} className="absolute right-4 top-4 rounded-full p-2 text-[#7B656D] hover:bg-[#F8ECE8]" aria-label="Cerrar"><X className="h-5 w-5" /></button>
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#FFF0EA] text-[#E75E52]"><ShieldCheck className="h-7 w-7" /></div>
            <h2 className="mt-5 text-center font-serif text-3xl font-semibold">Protegemos a especialistas y clientas</h2>
            <p className="mt-3 text-center text-sm leading-6 text-[#705D64]">La ubicación exacta, reseñas detalladas y contacto directo estarán disponibles para cuentas verificadas. En este MVP, LuVelle coordina la solicitud por su canal central.</p>
            <div className="mt-6 space-y-2 rounded-2xl bg-[#FFF7F3] p-4 text-sm text-[#5F5056]">
              <div className="flex items-center gap-2"><BadgeCheck className="h-4 w-4 text-[#4E925F]" /> Acceso a reseñas y comentarios detallados</div>
              <div className="flex items-center gap-2"><BadgeCheck className="h-4 w-4 text-[#4E925F]" /> Consulta de disponibilidad completa</div>
              <div className="flex items-center gap-2"><BadgeCheck className="h-4 w-4 text-[#4E925F]" /> Contacto sin publicar datos sensibles</div>
            </div>
            <a href={luvelleWhatsApp} target="_blank" rel="noopener noreferrer" className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-[#F25F54] px-5 py-3.5 font-semibold text-white transition hover:bg-[#E85248]">
              <CalendarDays className="h-5 w-5" />
              Solicitar cita por LuVelle
            </a>
            <button type="button" onClick={() => setAccessOpen(false)} className="mt-2 w-full rounded-xl border border-[#E5CEC6] px-5 py-3 text-sm font-semibold text-[#745C64]">Seguir explorando</button>
            <p className="mt-4 text-center text-xs text-[#9A858B]">Demo de validación: autenticación y mensajería privada se habilitarán después de validar demanda.</p>
          </div>
        </div>
      ) : null}

      {joinOpen ? (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-[#21191E]/65 p-4 backdrop-blur-sm" role="dialog" aria-modal="true" aria-label="Crear perfil LuVelle">
          <div className="relative w-full max-w-lg rounded-[30px] border border-[#EEDBD4] bg-[#FFFDFB] p-6 shadow-2xl md:p-8">
            <button type="button" onClick={() => setJoinOpen(false)} className="absolute right-4 top-4 rounded-full p-2 text-[#7B656D] hover:bg-[#F8ECE8]" aria-label="Cerrar"><X className="h-5 w-5" /></button>
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#FFF0EA] text-[#E75E52]"><UserPlus className="h-7 w-7" /></div>
            <h2 className="mt-5 text-center font-serif text-3xl font-semibold">Creá tu presencia en LuVelle</h2>
            <p className="mt-3 text-center text-sm leading-6 text-[#705D64]">Elegí el tipo de perfil que querés explorar. Por ahora te llevamos al flujo existente de LuVelle para validar interés sin agregar complejidad técnica innecesaria.</p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <Link href="/providers" className="rounded-2xl border border-[#E8CEC5] bg-[#FFF8F5] p-5 transition hover:border-[#F18779] hover:bg-white">
                <UserPlus className="mb-3 h-6 w-6 text-[#E75E52]" />
                <div className="font-semibold">Ofrezco servicios</div>
                <p className="mt-1 text-xs leading-5 text-[#806A72]">Belleza, bienestar, estética y servicios profesionales.</p>
              </Link>
              <Link href="/partners" className="rounded-2xl border border-[#E8CEC5] bg-[#FFF8F5] p-5 transition hover:border-[#F18779] hover:bg-white">
                <Store className="mb-3 h-6 w-6 text-[#E75E52]" />
                <div className="font-semibold">Vendo productos</div>
                <p className="mt-1 text-xs leading-5 text-[#806A72]">Marcas y productos de belleza o bienestar.</p>
              </Link>
            </div>
          </div>
        </div>
      ) : null}
    </main>
  )
}
