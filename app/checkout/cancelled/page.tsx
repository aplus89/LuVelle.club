"use client"

import Link from "next/link"
import { XCircle, ArrowLeft, MessageCircle } from "lucide-react"
import { LuVelleButton } from "@/components/ui/luvelle-button"

export default function CheckoutCancelledPage() {
  return (
    <div className="min-h-screen bg-[#141322] flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        {/* Cancelled Icon */}
        <div className="mb-8">
          <div className="w-24 h-24 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <XCircle className="w-12 h-12 text-red-400" />
          </div>
          <h1 className="text-3xl font-bold text-[#EFEDEA] mb-2">Pago cancelado</h1>
          <p className="text-[#EFEDEA]/70">No te preocupes, no se realizó ningún cargo.</p>
        </div>

        {/* Message */}
        <div className="bg-[#1a1a2e] rounded-2xl p-6 mb-8">
          <p className="text-[#EFEDEA]/80">
            Si tuviste algún problema durante el proceso de pago o tenés dudas sobre nuestros planes, estamos aquí para
            ayudarte.
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="space-y-3">
          <Link href="/#planes" className="block">
            <LuVelleButton variant="gold" className="w-full">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Ver planes de nuevo
            </LuVelleButton>
          </Link>
          <a
            href="https://wa.me/50688888888?text=Hola!%20Tuve%20un%20problema%20con%20el%20pago"
            target="_blank"
            rel="noopener noreferrer"
            className="block"
          >
            <LuVelleButton variant="outline" className="w-full">
              <MessageCircle className="w-4 h-4 mr-2" />
              Necesito ayuda
            </LuVelleButton>
          </a>
        </div>
      </div>
    </div>
  )
}
