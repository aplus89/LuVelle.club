"use client"

import Image from "next/image"
import Link from "next/link"
import { Instagram, Linkedin } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t border-[#F2DDD7] bg-white py-12 md:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[1.35fr_1fr_1fr_1fr]">
          <div className="max-w-sm">
            <Link href="/" className="flex items-center gap-2" aria-label="LuVelle inicio">
              <Image src="/images/luvelle-logo.png" alt="LuVelle" width={36} height={36} className="h-9 w-9" />
              <span className="text-xl font-bold text-[#241335]">LuVelle</span>
            </Link>
            <p className="mt-4 text-sm leading-6 text-[#6D5577]">
              Perfiles, comunidad y herramientas para profesionales de belleza y bienestar. Construimos con datos reales antes de escalar.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-[#241335]">Empezá acá</h4>
            <ul className="mt-4 space-y-3 text-sm">
              <li><Link href="/providers" className="text-[#6D5577] transition hover:text-[#E94B8A]">Para profesionales</Link></li>
              <li><Link href="/providers/mariana-lopez" className="text-[#6D5577] transition hover:text-[#E94B8A]">Perfil demo</Link></li>
              <li><Link href="/partners" className="text-[#6D5577] transition hover:text-[#E94B8A]">Para marcas</Link></li>
              <li><Link href="/club-vip" className="text-[#6D5577] transition hover:text-[#E94B8A]">Club VIP</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-[#241335]">Experimentos</h4>
            <ul className="mt-4 space-y-3 text-sm">
              <li><Link href="/ai" className="text-[#6D5577] transition hover:text-[#E94B8A]">LuVelle AI para profesionales</Link></li>
              <li><Link href="/beauty-box" className="text-[#6D5577] transition hover:text-[#E94B8A]">Beauty Box</Link></li>
              <li><Link href="/#como-funciona" className="text-[#6D5577] transition hover:text-[#E94B8A]">Cómo funciona</Link></li>
              <li><Link href="/#precio" className="text-[#6D5577] transition hover:text-[#E94B8A]">Precio para profesionales</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-[#241335]">Conectá con LuVelle</h4>
            <div className="mt-4 flex gap-3">
              <a href="https://www.instagram.com/luvelle_club" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="flex h-10 w-10 items-center justify-center rounded-full border border-[#F0DDD7] text-[#5B2A86] transition hover:border-[#E94B8A] hover:text-[#E94B8A]">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="https://www.linkedin.com/company/luvelleai" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="flex h-10 w-10 items-center justify-center rounded-full border border-[#F0DDD7] text-[#5B2A86] transition hover:border-[#E94B8A] hover:text-[#E94B8A]">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
            <p className="mt-4 text-sm text-[#6D5577]">
              <a href="mailto:hello@luvelle.club" className="transition hover:text-[#E94B8A]">hello@luvelle.club</a>
            </p>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-[#F2DDD7] pt-6 text-xs text-[#8A718F] sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} LuVelle.club. Todos los derechos reservados.</p>
          <p>Construyendo con profesionales, validando antes de escalar.</p>
        </div>
      </div>
    </footer>
  )
}
