"use client"

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { ArrowRight, Menu, X } from "lucide-react"

const navLinks = [
  { href: "/", label: "Inicio" },
  { href: "/providers", label: "Para profesionales" },
  { href: "/partners", label: "Para marcas" },
  { href: "/club-vip", label: "Club VIP" },
  { href: "/providers/mariana-lopez", label: "Perfil demo" },
  { href: "/#como-funciona", label: "Cómo funciona" },
]

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const closeMenu = () => setMobileMenuOpen(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#F2DDD7] bg-[#FFF7F3]/95 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:h-20 lg:px-8">
        <Link href="/" onClick={closeMenu} className="flex items-center gap-2" aria-label="LuVelle inicio">
          <Image src="/images/luvelle-logo.png" alt="LuVelle" width={36} height={36} className="h-9 w-9" />
          <span className="text-xl font-bold text-[#241335]">LuVelle</span>
        </Link>

        <nav className="hidden items-center gap-5 lg:flex xl:gap-7">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-[#5B2A86] transition-colors hover:text-[#E94B8A]"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:block">
          <Link
            href="/providers#aplicacion"
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#E94B8A] to-[#FF7A59] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[#E94B8A]/20"
          >
            Crear mi perfil
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setMobileMenuOpen((open) => !open)}
          className="rounded-full p-2 text-[#241335] transition hover:bg-[#FFD8CC]/40 lg:hidden"
          aria-label={mobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {mobileMenuOpen ? (
        <div className="border-t border-[#F2DDD7] bg-white lg:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-4 sm:px-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={closeMenu}
                className="rounded-xl px-3 py-3 font-medium text-[#5B2A86] transition hover:bg-[#FFF0EB] hover:text-[#E94B8A]"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/providers#aplicacion"
              onClick={closeMenu}
              className="mt-3 inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#E94B8A] to-[#FF7A59] px-5 py-3 font-semibold text-white"
            >
              Crear mi perfil
              <ArrowRight className="h-4 w-4" />
            </Link>
          </nav>
        </div>
      ) : null}
    </header>
  )
}
