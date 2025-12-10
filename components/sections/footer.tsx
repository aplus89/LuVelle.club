import Link from "next/link"
import { Instagram, Linkedin, Twitter } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t border-white/10 py-12 md:py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h3 className="font-heading text-3xl font-bold text-brand-gold mb-4">LuVelle</h3>
            <p className="text-sm text-brand-cream/70 leading-relaxed">
              Una plataforma. Tres formas de transformar tu bienestar.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-brand-cream mb-4">Productos</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/ai" className="text-brand-cream/70 hover:text-brand-gold transition-colors">
                  Club LuVelle Ai
                </Link>
              </li>
              <li>
                <Link href="/beauty-box" className="text-brand-cream/70 hover:text-brand-gold transition-colors">
                  The Beauty Box
                </Link>
              </li>
              <li>
                <Link href="/providers" className="text-brand-cream/70 hover:text-brand-gold transition-colors">
                  LuVelle Pro – Servicios
                </Link>
              </li>
              <li>
                <Link href="/partners" className="text-brand-cream/70 hover:text-brand-gold transition-colors">
                  LuVelle Pro – Marcas
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-brand-cream mb-4">Recursos</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/#como-funciona" className="text-brand-cream/70 hover:text-brand-gold transition-colors">
                  Cómo funciona
                </a>
              </li>
              <li>
                <a href="/#planes" className="text-brand-cream/70 hover:text-brand-gold transition-colors">
                  Planes y precios
                </a>
              </li>
              <li>
                <Link href="/join" className="text-brand-cream/70 hover:text-brand-gold transition-colors">
                  Comenzar ahora
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-brand-cream mb-4">Conectá con nosotras</h4>
            <div className="flex gap-4 mb-4">
              <a
                href="https://www.instagram.com/luvelle_club"
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-cream/70 hover:text-brand-gold transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://www.linkedin.com/company/luvelleai"
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-cream/70 hover:text-brand-gold transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="https://twitter.com/LuVelleAi"
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-cream/70 hover:text-brand-gold transition-colors"
                aria-label="X (Twitter)"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="https://www.tiktok.com/@luvelle.club"
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-cream/70 hover:text-brand-gold transition-colors"
                aria-label="TikTok"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                </svg>
              </a>
            </div>
            <p className="text-sm text-brand-cream/70 mb-1">
              <a href="mailto:hello@luvelle.club" className="hover:text-brand-gold transition-colors">
                hello@luvelle.club
              </a>
            </p>
            <p className="text-sm text-brand-cream/70">
              <a href="https://wa.me/15557792120" className="hover:text-brand-gold transition-colors">
                WhatsApp: +1 555 779 2120
              </a>
            </p>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 text-center text-sm text-brand-cream/60">
          <p>&copy; {new Date().getFullYear()} LuVelle.club. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
