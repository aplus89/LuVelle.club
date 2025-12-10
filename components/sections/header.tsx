"use client"

import Link from "next/link"
import { useState } from "react"
import { Menu, X, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const navLinks = [
  { href: "/ai", label: "LuVelle Ai" },
  { href: "/beauty-box", label: "The Beauty Box" },
  {
    label: "LuVelle Pro",
    submenu: [
      { href: "/providers", label: "Pro Servicios" },
      { href: "/partners", label: "Pro Marcas" },
    ],
  },
]

const whatsappUrl = "https://wa.me/15557792120?text=Hola!%20Quiero%20empezar%20con%20LuVelle"

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [proMenuOpen, setProMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-xl bg-[hsl(var(--brand-dark))]/95 border-b border-white/10">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link
            href="/"
            className="font-heading text-3xl md:text-4xl font-bold text-[hsl(var(--brand-gold))] hover:opacity-80 transition-opacity"
          >
            LuVelle
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
            {navLinks.map((link, idx) => {
              if (link.submenu) {
                return (
                  <div key={idx} className="relative group">
                    <button
                      className="text-sm text-[hsl(var(--brand-cream))] hover:text-[hsl(var(--brand-gold))] transition-colors font-medium flex items-center gap-1"
                      onMouseEnter={() => setProMenuOpen(true)}
                      onMouseLeave={() => setProMenuOpen(false)}
                    >
                      {link.label}
                      <ChevronDown className="w-4 h-4" />
                    </button>
                    {/* Dropdown Menu */}
                    <div
                      className={cn(
                        "absolute top-full left-0 mt-2 w-48 glass-card p-2 transition-all duration-200",
                        proMenuOpen ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-2",
                      )}
                      onMouseEnter={() => setProMenuOpen(true)}
                      onMouseLeave={() => setProMenuOpen(false)}
                    >
                      {link.submenu.map((sublink) => (
                        <Link
                          key={sublink.href}
                          href={sublink.href}
                          className="block px-4 py-2 text-sm text-[hsl(var(--brand-cream))] hover:text-[hsl(var(--brand-gold))] hover:bg-white/5 rounded-lg transition-colors"
                        >
                          {sublink.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )
              }
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-[hsl(var(--brand-cream))] hover:text-[hsl(var(--brand-gold))] transition-colors font-medium"
                >
                  {link.label}
                </Link>
              )
            })}
          </nav>

          {/* CTA Button - Desktop */}
          <div className="hidden lg:block">
            <Button asChild className="glass-button px-6">
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                Empezar por WhatsApp
              </a>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden text-[hsl(var(--brand-cream))] hover:text-[hsl(var(--brand-gold))] transition-colors p-2"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={cn(
            "lg:hidden overflow-hidden transition-all duration-300 ease-in-out",
            mobileMenuOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0",
          )}
        >
          <nav className="flex flex-col gap-4 py-6 border-t border-white/10">
            {navLinks.map((link, idx) => {
              if (link.submenu) {
                return (
                  <div key={idx}>
                    <div className="text-[hsl(var(--brand-gold))] font-medium py-2">{link.label}</div>
                    <div className="flex flex-col gap-2 pl-4">
                      {link.submenu.map((sublink) => (
                        <Link
                          key={sublink.href}
                          href={sublink.href}
                          onClick={() => setMobileMenuOpen(false)}
                          className="text-[hsl(var(--brand-cream))] hover:text-[hsl(var(--brand-gold))] transition-colors py-2"
                        >
                          {sublink.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )
              }
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-[hsl(var(--brand-cream))] hover:text-[hsl(var(--brand-gold))] transition-colors font-medium py-2"
                >
                  {link.label}
                </Link>
              )
            })}
            <Button asChild className="glass-button w-full mt-2">
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" onClick={() => setMobileMenuOpen(false)}>
                Empezar por WhatsApp
              </a>
            </Button>
          </nav>
        </div>
      </div>
    </header>
  )
}
