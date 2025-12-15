"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { CheckCircle2, Package, Sparkles, ArrowRight } from "lucide-react"
import { LuVelleButton } from "@/components/ui/luvelle-button"

export default function CheckoutSuccessPage() {
  const searchParams = useSearchParams()
  const subscriptionId = searchParams.get("subscription_id")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate loading state
    const timer = setTimeout(() => setLoading(false), 1500)
    return () => clearTimeout(timer)
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-[#141322] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#f4cc6e] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-[#EFEDEA]">Procesando tu pago...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#141322] flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        {/* Success Icon */}
        <div className="mb-8">
          <div className="w-24 h-24 bg-[#f4cc6e]/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-12 h-12 text-[#f4cc6e]" />
          </div>
          <h1 className="text-3xl font-bold text-[#EFEDEA] mb-2">¡Pago exitoso!</h1>
          <p className="text-[#EFEDEA]/70">Tu suscripción ha sido activada correctamente.</p>
        </div>

        {/* Next Steps */}
        <div className="bg-[#1a1a2e] rounded-2xl p-6 mb-8 text-left">
          <h2 className="text-lg font-semibold text-[#EFEDEA] mb-4">¿Qué sigue?</h2>
          <ul className="space-y-4">
            <li className="flex items-start gap-3">
              <div className="w-8 h-8 bg-[#f4cc6e]/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <Package className="w-4 h-4 text-[#f4cc6e]" />
              </div>
              <div>
                <p className="text-[#EFEDEA] font-medium">Recibirás un correo</p>
                <p className="text-[#EFEDEA]/60 text-sm">Con los detalles de tu suscripción y próximos pasos.</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-8 h-8 bg-[#f4cc6e]/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <Sparkles className="w-4 h-4 text-[#f4cc6e]" />
              </div>
              <div>
                <p className="text-[#EFEDEA] font-medium">Comenzá a disfrutar</p>
                <p className="text-[#EFEDEA]/60 text-sm">Ya podés acceder a todos los beneficios de tu plan.</p>
              </div>
            </li>
          </ul>
        </div>

        {/* CTA Buttons */}
        <div className="space-y-3">
          <Link href="/" className="block">
            <LuVelleButton variant="gold" className="w-full">
              Volver al inicio
              <ArrowRight className="w-4 h-4 ml-2" />
            </LuVelleButton>
          </Link>
          <a
            href="https://wa.me/50688888888?text=Hola!%20Acabo%20de%20suscribirme%20a%20LuVelle"
            target="_blank"
            rel="noopener noreferrer"
            className="block"
          >
            <LuVelleButton variant="outline" className="w-full">
              Contactar por WhatsApp
            </LuVelleButton>
          </a>
        </div>

        {/* Subscription ID for reference */}
        {subscriptionId && (
          <p className="mt-6 text-xs text-[#EFEDEA]/40">ID de suscripción: {subscriptionId.slice(0, 8)}...</p>
        )}
      </div>
    </div>
  )
}
