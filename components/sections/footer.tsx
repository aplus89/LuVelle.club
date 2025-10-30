import Link from "next/link"
import { Instagram, Linkedin, Twitter } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t border-white/10 py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h3 className="heading-font text-2xl font-bold text-[hsl(var(--brand-gold))] mb-4">LuVelle</h3>
            <p className="text-sm text-[hsl(var(--brand-cream))]/70 leading-relaxed">
              Tu belleza, curada con amor. Suscripción mensual de productos premium en Costa Rica.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold text-[hsl(var(--brand-cream))] mb-4">Navegación</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#inicio" className="text-[hsl(var(--brand-cream))]/70 hover:text-[hsl(var(--brand-gold))]">
                  Inicio
                </a>
              </li>
              <li>
                <a
                  href="#como-funciona"
                  className="text-[hsl(var(--brand-cream))]/70 hover:text-[hsl(var(--brand-gold))]"
                >
                  Cómo funciona
                </a>
              </li>
              <li>
                <a href="#planes" className="text-[hsl(var(--brand-cream))]/70 hover:text-[hsl(var(--brand-gold))]">
                  Planes
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-[hsl(var(--brand-cream))] mb-4">Para ti</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/join" className="text-[hsl(var(--brand-cream))]/70 hover:text-[hsl(var(--brand-gold))]">
                  Crear Beauty Box
                </Link>
              </li>
              <li>
                <Link
                  href="/providers"
                  className="text-[hsl(var(--brand-cream))]/70 hover:text-[hsl(var(--brand-gold))]"
                >
                  Ser Proveedora
                </Link>
              </li>
              <li>
                <Link
                  href="/partners"
                  className="text-[hsl(var(--brand-cream))]/70 hover:text-[hsl(var(--brand-gold))]"
                >
                  Postular Marca
                </Link>
              </li>
            </ul>
          </div>

          {/* Social & Contact */}
          <div>
            <h4 className="font-semibold text-[hsl(var(--brand-cream))] mb-4">Conectá con nosotras</h4>
            <div className="flex gap-4 mb-4">
              <a
                href="https://www.instagram.com/luvelle_club"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[hsl(var(--brand-cream))]/70 hover:text-[hsl(var(--brand-gold))]"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://www.linkedin.com/company/luvelleai"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[hsl(var(--brand-cream))]/70 hover:text-[hsl(var(--brand-gold))]"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="https://twitter.com/LuVelleAi"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[hsl(var(--brand-cream))]/70 hover:text-[hsl(var(--brand-gold))]"
                aria-label="Twitter/X"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="https://www.tiktok.com/@luvelle.club"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[hsl(var(--brand-cream))]/70 hover:text-[hsl(var(--brand-gold))]"
                aria-label="TikTok"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                </svg>
              </a>
            </div>
            <p className="text-sm text-[hsl(var(--brand-cream))]/70">
              <a href="mailto:hello@luvelle.club" className="hover:text-[hsl(var(--brand-gold))]">
                hello@luvelle.club
              </a>
            </p>
            <p className="text-sm text-[hsl(var(--brand-cream))]/70">
              <a href="https://wa.me/15557792120" className="hover:text-[hsl(var(--brand-gold))]">
                WhatsApp: +1 555 779 2120
              </a>
            </p>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 text-center text-sm text-[hsl(var(--brand-cream))]/60">
          <p>&copy; {new Date().getFullYear()} LuVelle.club. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
