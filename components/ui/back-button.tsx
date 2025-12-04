"use client"

import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export function BackButton() {
  return (
    <Button asChild variant="ghost" className="glass-button-outline bg-transparent mb-8" size="sm">
      <Link href="/" className="flex items-center gap-2">
        <ArrowLeft className="w-4 h-4" />
        Volver al inicio
      </Link>
    </Button>
  )
}
