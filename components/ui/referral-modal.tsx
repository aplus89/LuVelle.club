"use client"

import { useState } from "react"
import { X, Copy, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface ReferralModalProps {
  isOpen: boolean
  onClose: () => void
}

export function ReferralModal({ isOpen, onClose }: ReferralModalProps) {
  const [copied, setCopied] = useState(false)
  const referralCode = "LUVELLE2024"

  const copyToClipboard = () => {
    navigator.clipboard.writeText(referralCode)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />

      <Card className="relative w-full max-w-md bg-dark border-gold/20">
        <CardHeader className="relative">
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="absolute right-2 top-2 text-beige/60 hover:text-beige"
          >
            <X className="h-4 w-4" />
          </Button>
          <CardTitle className="font-dancing text-2xl text-gold text-center">Programa de Referidos</CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="text-center">
            <p className="text-beige/80 text-sm mb-4">
              Comparte LuVelle con tus amigas y gana cashback en cada referido
            </p>
          </div>

          {/* Cashback Rates */}
          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 bg-beige/5 rounded-lg">
              <div>
                <span className="font-semibold text-gold">Premium</span>
                <p className="text-xs text-beige/60">Cashback 3%</p>
              </div>
              <span className="text-beige text-sm">Cualquier compra</span>
            </div>

            <div className="flex justify-between items-center p-3 bg-gold/10 rounded-lg border border-gold/20">
              <div>
                <span className="font-semibold text-gold">Deluxe</span>
                <p className="text-xs text-beige/60">Cashback 8%</p>
              </div>
              <span className="text-beige text-sm">Caja Deluxe +$120</span>
            </div>
          </div>

          {/* Referral Code */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-beige">Tu código de referido:</label>
            <div className="flex space-x-2">
              <div className="flex-1 p-3 bg-beige/5 rounded-lg border border-beige/20">
                <span className="font-mono text-gold">{referralCode}</span>
              </div>
              <Button onClick={copyToClipboard} size="sm" className="gradient-gold text-dark">
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              </Button>
            </div>
          </div>

          <div className="text-center">
            <p className="text-xs text-beige/60">
              Personalizá tu experiencia. Recompensamos a quienes comparten LuVelle 💛
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
