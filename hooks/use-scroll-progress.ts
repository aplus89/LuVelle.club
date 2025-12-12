"use client"

import { useEffect, useState, type RefObject } from "react"

export function useScrollProgress(ref: RefObject<HTMLElement>) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const el = ref.current
      if (!el) return

      const rect = el.getBoundingClientRect()
      const vh = window.innerHeight

      // Start animating when element center enters 90% from top
      const start = vh * 0.9
      const end = vh * 0.1
      const relative = (start - rect.top) / (start - end)

      const clamped = Math.min(1, Math.max(0, relative))
      setProgress(clamped)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener("scroll", handleScroll)
  }, [ref])

  return progress
}
