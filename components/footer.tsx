import Link from "next/link"
import { Heart, Mail, MessageCircle, Instagram, Music, Linkedin, Twitter } from "lucide-react"
import { SOCIAL_LINKS } from "@/lib/constants"

export function Footer() {
  return (
    <footer className="bg-dark/95 border-t border-gold/20 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <img src="/images/luvelle-logo.png" alt="LuVelle" className="h-8 w-auto" />
            </div>
            <p className="text-gold-light/80 text-sm mb-6 max-w-md">
              Tu club de belleza y bienestar personalizado. Descubre productos premium y servicios exclusivos diseñados
              especialmente para ti.
            </p>
            <div className="flex items-center space-x-2 text-sm text-gold-light/60">
              <span>Hecho con</span>
              <Heart className="h-4 w-4 text-red-400" />
              <span>en Costa Rica 🇨🇷</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-gold font-semibold mb-4">Enlaces rápidos</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gold-light/80 hover:text-gold transition-colors text-sm">
                  Inicio
                </Link>
              </li>
              <li>
                <Link href="/thebeautybox" className="text-gold-light/80 hover:text-gold transition-colors text-sm">
                  The Beauty Box
                </Link>
              </li>
              <li>
                <Link href="/referidos" className="text-gold-light/80 hover:text-gold transition-colors text-sm">
                  Programa de Referidos
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & Social */}
          <div>
            <h3 className="text-gold font-semibold mb-4">Conecta con nosotras</h3>
            <div className="space-y-3">
              <a
                href={`mailto:${SOCIAL_LINKS.email}`}
                className="flex items-center space-x-2 text-gold-light/80 hover:text-gold transition-colors text-sm"
              >
                <Mail className="h-4 w-4" />
                <span>{SOCIAL_LINKS.email}</span>
              </a>
              <a
                href={SOCIAL_LINKS.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-gold-light/80 hover:text-gold transition-colors text-sm"
              >
                <MessageCircle className="h-4 w-4" />
                <span>WhatsApp</span>
              </a>
            </div>

            {/* Social Icons */}
            <div className="flex space-x-4 mt-6">
              <a
                href={SOCIAL_LINKS.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gold-light/60 hover:text-gold transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href={SOCIAL_LINKS.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gold-light/60 hover:text-gold transition-colors"
              >
                <Music className="h-5 w-5" />
              </a>
              <a
                href={SOCIAL_LINKS.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gold-light/60 hover:text-gold transition-colors"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href={SOCIAL_LINKS.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gold-light/60 hover:text-gold transition-colors"
              >
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gold/20 mt-8 pt-8 flex flex-col sm:flex-row justify-between items-center">
          <div className="flex space-x-6 text-xs text-gold-light/60 mb-4 sm:mb-0">
            <Link href="/terminos" className="hover:text-gold transition-colors">
              Términos y Condiciones
            </Link>
            <Link href="/privacidad" className="hover:text-gold transition-colors">
              Política de Privacidad
            </Link>
            <Link href="/cookies" className="hover:text-gold transition-colors">
              Cookies
            </Link>
          </div>
          <p className="text-xs text-gold-light/60">© 2024 LuVelle. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
