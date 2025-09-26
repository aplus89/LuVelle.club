"use client"

import Link from "next/link"
import { Instagram, Facebook, Twitter, Mail, Phone, MapPin } from "lucide-react"
import { SOCIAL_LINKS } from "@/lib/constants"

export function Footer() {
  return (
    <footer className="bg-gradient-to-br from-dark via-dark/95 to-blue/20 border-t border-gold/20">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <img src="/images/luvelle-logo.png" alt="LuVelle" className="h-8 w-auto" />
              <span className="font-dancing text-2xl text-gold">LuVelle</span>
            </div>
            <p className="text-cream/80 text-sm leading-relaxed">
              Tu beauty box personalizada con productos y servicios de belleza premium, entregada mensualmente en Costa
              Rica.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://instagram.com/luvelle.cr"
                target="_blank"
                rel="noopener noreferrer"
                className="text-cream/60 hover:text-gold transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="https://facebook.com/luvelle.cr"
                target="_blank"
                rel="noopener noreferrer"
                className="text-cream/60 hover:text-gold transition-colors"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="https://twitter.com/luvelle_cr"
                target="_blank"
                rel="noopener noreferrer"
                className="text-cream/60 hover:text-gold transition-colors"
              >
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-playfair text-lg font-semibold text-cream">Enlaces Rápidos</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-cream/80 hover:text-gold transition-colors text-sm">
                  Inicio
                </Link>
              </li>
              <li>
                <Link href="/thebeautybox" className="text-cream/80 hover:text-gold transition-colors text-sm">
                  The Beauty Box
                </Link>
              </li>
              <li>
                <Link href="/partners" className="text-cream/80 hover:text-gold transition-colors text-sm">
                  Partners
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-cream/80 hover:text-gold transition-colors text-sm">
                  Nosotros
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h3 className="font-playfair text-lg font-semibold text-cream">Soporte</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/faq" className="text-cream/80 hover:text-gold transition-colors text-sm">
                  Preguntas Frecuentes
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-cream/80 hover:text-gold transition-colors text-sm">
                  Contacto
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="text-cream/80 hover:text-gold transition-colors text-sm">
                  Envíos
                </Link>
              </li>
              <li>
                <Link href="/returns" className="text-cream/80 hover:text-gold transition-colors text-sm">
                  Devoluciones
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="font-playfair text-lg font-semibold text-cream">Contacto</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-gold" />
                <a
                  href={`mailto:${SOCIAL_LINKS.email}`}
                  className="text-cream/80 hover:text-gold transition-colors text-sm"
                >
                  {SOCIAL_LINKS.email}
                </a>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-gold" />
                <a
                  href={SOCIAL_LINKS.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cream/80 hover:text-gold transition-colors text-sm"
                >
                  +1 555 779-2120
                </a>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-gold" />
                <span className="text-cream/80 text-sm">San José, Costa Rica</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gold/20 mt-8 pt-8 text-center space-y-4">
          {/* Founder Attribution */}
          <p className="text-sm text-cream/60">
            From Costa Rica with love 🇨🇷 — A startup by{" "}
            <a
              href="https://andres.castanaza.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-400 hover:text-emerald-300 underline transition-colors"
            >
              Andrés Castañaza
            </a>
          </p>

          {/* Copyright */}
          <p className="text-sm text-cream/60">© {new Date().getFullYear()} LuVelle. Todos los derechos reservados.</p>

          {/* Legal Links */}
          <div className="flex justify-center space-x-6">
            <Link href="/privacy" className="text-cream/60 hover:text-gold transition-colors text-xs">
              Política de Privacidad
            </Link>
            <Link href="/terms" className="text-cream/60 hover:text-gold transition-colors text-xs">
              Términos de Servicio
            </Link>
            <Link href="/cookies" className="text-cream/60 hover:text-gold transition-colors text-xs">
              Política de Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
