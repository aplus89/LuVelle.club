"use client"

import Link from "next/link"
import { useState } from "react"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const navLinks = [
  { href: "#inicio", label: "Inicio" },
  { href: "#como-funciona", label: "Cómo funciona" },
  { href: "#planes", label: "Planes" },
  { href: "#socias", label: "Socias" },
  { href: "#proveedoras", label: "Proveedoras" },
  { href: "#marcas", label: "Marcas" },
]

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-xl bg-[hsl(var(--brand-dark))]/80 border-b border-white/10">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="heading-font text-3xl font-bold hover:opacity-80 transition-opacity">
            LuVelle
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-[hsl(var(--brand-cream))] hover:text-[hsl(var(--brand-gold))] transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Button asChild className="glass-button">
              <Link href="/join">Comenzar</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-[hsl(var(--brand-cream))] hover:text-[hsl(var(--brand-gold))] transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={cn(
            "md:hidden overflow-hidden transition-all duration-300",
            mobileMenuOpen ? "max-h-96 pb-4" : "max-h-0",
          )}
        >
          <nav className="flex flex-col gap-4 pt-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-[hsl(var(--brand-cream))] hover:text-[hsl(var(--brand-gold))] transition-colors"
              >
                {link.label}
              </a>
            ))}
            <Button asChild className="glass-button w-full">
              <Link href="/join">Comenzar</Link>
            </Button>
          </nav>
        </div>
      </div>
    </header>
  )
}
