"use client"

import Link from "next/link"
import { Instagram, Linkedin, Twitter } from "lucide-react"
import { LuVelleLogo } from "@/components/ui/luvelle-logo"

export function Footer() {
  const handleNavClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <footer className="border-t border-white/10 py-12 md:py-16 bg-[#141322]">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <Link href="/" onClick={handleNavClick} className="inline-block mb-4">
              <LuVelleLogo variant="gold" width={120} height={48} />
            </Link>
            <p className="text-sm text-[#e8ded3]/70 leading-relaxed">
              Una plataforma. Tres formas de transformar tu bienestar.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-[#e8ded3] mb-4">Productos</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/ai"
                  onClick={handleNavClick}
                  className="text-[#e8ded3]/70 hover:text-[#f4cc6e] transition-colors"
                >
                  LuVelle Ai
                </Link>
              </li>
              <li>
                <Link
                  href="/beauty-box"
                  onClick={handleNavClick}
                  className="text-[#e8ded3]/70 hover:text-[#f4cc6e] transition-colors"
                >
                  The Beauty Box
                </Link>
              </li>
              <li>
                <Link
                  href="/providers"
                  onClick={handleNavClick}
                  className="text-[#e8ded3]/70 hover:text-[#f4cc6e] transition-colors"
                >
                  LuVelle Pro – Servicios
                </Link>
              </li>
              <li>
                <Link
                  href="/partners"
                  onClick={handleNavClick}
                  className="text-[#e8ded3]/70 hover:text-[#f4cc6e] transition-colors"
                >
                  LuVelle Pro – Marcas
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-[#e8ded3] mb-4">Recursos</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/#como-funciona" className="text-[#e8ded3]/70 hover:text-[#f4cc6e] transition-colors">
                  Cómo funciona
                </a>
              </li>
              <li>
                <a href="/#planes" className="text-[#e8ded3]/70 hover:text-[#f4cc6e] transition-colors">
                  Planes y precios
                </a>
              </li>
              <li>
                <Link
                  href="/join"
                  onClick={handleNavClick}
                  className="text-[#e8ded3]/70 hover:text-[#f4cc6e] transition-colors"
                >
                  Comenzar ahora
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-[#e8ded3] mb-4">Conectá con nosotras</h4>
            <div className="flex gap-4 mb-4">
              <a
                href="https://www.instagram.com/luvelle_club"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#e8ded3]/70 hover:text-[#f4cc6e] transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://www.linkedin.com/company/luvelleai"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#e8ded3]/70 hover:text-[#f4cc6e] transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="https://twitter.com/LuVelleAi"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#e8ded3]/70 hover:text-[#f4cc6e] transition-colors"
                aria-label="X (Twitter)"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="https://www.tiktok.com/@luvelle.club"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#e8ded3]/70 hover:text-[#f4cc6e] transition-colors"
                aria-label="TikTok"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                </svg>
              </a>
            </div>
            <p className="text-sm text-[#e8ded3]/70 mb-1">
              <a href="mailto:hello@luvelle.club" className="hover:text-[#f4cc6e] transition-colors">
                hello@luvelle.club
              </a>
            </p>
            <p className="text-sm text-[#e8ded3]/70">
              <a href="https://wa.me/15557792120" className="hover:text-[#f4cc6e] transition-colors">
                WhatsApp: +1 555 779 2120
              </a>
            </p>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 text-center text-sm text-[#e8ded3]/60">
          <p>&copy; {new Date().getFullYear()} LuVelle.club. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
