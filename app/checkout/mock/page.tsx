"use client"

import { useSearchParams, useRouter } from "next/navigation"
import { useState } from "react"
import { CreditCard, Lock } from "lucide-react"
import { LuVelleButton } from "@/components/ui/luvelle-button"

// Mock checkout page for development/testing
export default function MockCheckoutPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const subscriptionId = searchParams.get("subscription_id")
  const planSlug = searchParams.get("plan")
  const [processing, setProcessing] = useState(false)

  const handleSimulatePayment = async (success: boolean) => {
    setProcessing(true)

    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000))

    if (success) {
      router.push(`/checkout/success?subscription_id=${subscriptionId}`)
    } else {
      router.push(`/checkout/cancelled?subscription_id=${subscriptionId}`)
    }
  }

  return (
    <div className="min-h-screen bg-[#141322] flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-[#f4cc6e]/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <CreditCard className="w-8 h-8 text-[#f4cc6e]" />
          </div>
          <h1 className="text-2xl font-bold text-[#EFEDEA] mb-2">Checkout de Prueba</h1>
          <p className="text-[#EFEDEA]/60 text-sm">Este es un checkout simulado para desarrollo</p>
        </div>

        {/* Mock Form */}
        <div className="bg-[#1a1a2e] rounded-2xl p-6 mb-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-[#EFEDEA]/70 mb-2">Plan</label>
              <p className="text-[#EFEDEA] font-medium capitalize">
                {planSlug?.replace(/-/g, " ") || "Plan seleccionado"}
              </p>
            </div>

            <div className="border-t border-[#EFEDEA]/10 pt-4">
              <label className="block text-sm text-[#EFEDEA]/70 mb-2">Número de tarjeta (simulado)</label>
              <input
                type="text"
                placeholder="4242 4242 4242 4242"
                className="w-full bg-[#141322] border border-[#EFEDEA]/20 rounded-lg px-4 py-3 text-[#EFEDEA] placeholder:text-[#EFEDEA]/40"
                disabled={processing}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-[#EFEDEA]/70 mb-2">Vencimiento</label>
                <input
                  type="text"
                  placeholder="12/25"
                  className="w-full bg-[#141322] border border-[#EFEDEA]/20 rounded-lg px-4 py-3 text-[#EFEDEA] placeholder:text-[#EFEDEA]/40"
                  disabled={processing}
                />
              </div>
              <div>
                <label className="block text-sm text-[#EFEDEA]/70 mb-2">CVC</label>
                <input
                  type="text"
                  placeholder="123"
                  className="w-full bg-[#141322] border border-[#EFEDEA]/20 rounded-lg px-4 py-3 text-[#EFEDEA] placeholder:text-[#EFEDEA]/40"
                  disabled={processing}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Security Badge */}
        <div className="flex items-center justify-center gap-2 mb-6 text-[#EFEDEA]/50 text-sm">
          <Lock className="w-4 h-4" />
          <span>Pago seguro simulado</span>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <LuVelleButton
            variant="gold"
            className="w-full"
            onClick={() => handleSimulatePayment(true)}
            disabled={processing}
          >
            {processing ? "Procesando..." : "Simular Pago Exitoso"}
          </LuVelleButton>

          <LuVelleButton
            variant="outline"
            className="w-full"
            onClick={() => handleSimulatePayment(false)}
            disabled={processing}
          >
            Simular Pago Fallido
          </LuVelleButton>
        </div>

        {/* Dev Note */}
        <p className="mt-6 text-center text-xs text-[#EFEDEA]/40">
          En producción, esto será reemplazado por el checkout de Onvopay
        </p>
      </div>
    </div>
  )
}
