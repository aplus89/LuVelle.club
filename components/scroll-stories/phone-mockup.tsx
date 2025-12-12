"use client"

import type { ReactNode } from "react"

interface PhoneMockupProps {
  children?: ReactNode
  className?: string
}

export function PhoneMockup({ children, className = "" }: PhoneMockupProps) {
  return (
    <div className={`relative w-[300px] h-[600px] mx-auto ${className}`}>
      {/* Phone Frame */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 rounded-[3rem] shadow-2xl border-8 border-gray-900">
        {/* Notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-7 bg-gray-900 rounded-b-3xl z-10" />

        {/* Screen Content */}
        <div className="absolute inset-2 bg-white rounded-[2.5rem] overflow-hidden">{children}</div>
      </div>

      {/* Shine effect */}
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent rounded-[3rem] pointer-events-none" />
    </div>
  )
}
