"use client"

import { useEffect, useState } from "react"
import { AnimatePresence, motion, useReducedMotion } from "framer-motion"
import { Sparkles } from "lucide-react"

const SESSION_KEY = "luvelle-beauty-box-ribbon-intro-v1"

export function BeautyBoxRibbonIntro() {
  const [visible, setVisible] = useState(false)
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    try {
      if (sessionStorage.getItem(SESSION_KEY)) return
      sessionStorage.setItem(SESSION_KEY, "seen")
      setVisible(true)
      const timeout = window.setTimeout(() => setVisible(false), reduceMotion ? 900 : 2600)
      return () => window.clearTimeout(timeout)
    } catch {
      return
    }
  }, [reduceMotion])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-[#FFF7F3]"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduceMotion ? 0.2 : 0.5 }}
          onClick={() => setVisible(false)}
          role="presentation"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,216,204,.7),transparent_46%)]" />
          <div className="relative h-[280px] w-[280px] sm:h-[360px] sm:w-[360px]">
            <motion.div
              className="absolute inset-0 rounded-[44px] border border-[#F0DDD7] bg-white shadow-[0_30px_100px_rgba(91,42,134,.14)]"
              initial={{ scale: 0.94 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.55, ease: "easeOut" }}
            />

            <motion.div
              className="absolute left-1/2 top-0 h-full w-16 -translate-x-1/2 bg-gradient-to-b from-[#E94B8A] via-[#FF7A59] to-[#E94B8A] sm:w-20"
              initial={{ scaleY: 1 }}
              animate={reduceMotion ? undefined : { scaleY: [1, 1, 0] }}
              transition={{ delay: 0.85, duration: 0.8, ease: "easeInOut" }}
              style={{ transformOrigin: "top" }}
            />
            <motion.div
              className="absolute left-0 top-1/2 h-16 w-full -translate-y-1/2 bg-gradient-to-r from-[#5B2A86] via-[#B388FF] to-[#5B2A86] sm:h-20"
              initial={{ scaleX: 1 }}
              animate={reduceMotion ? undefined : { scaleX: [1, 1, 0] }}
              transition={{ delay: 0.95, duration: 0.8, ease: "easeInOut" }}
              style={{ transformOrigin: "center" }}
            />

            <motion.div
              className="absolute left-1/2 top-1/2 z-10 h-24 w-24 -translate-x-1/2 -translate-y-1/2"
              initial={{ scale: 1, rotate: 0 }}
              animate={reduceMotion ? undefined : { scale: [1, 1.08, 0], rotate: [0, 3, -12] }}
              transition={{ delay: 0.85, duration: 0.9, ease: "easeInOut" }}
            >
              <div className="absolute left-0 top-1/2 h-14 w-14 -translate-y-1/2 -rotate-12 rounded-[60%_40%_60%_40%] border-[12px] border-[#E94B8A]" />
              <div className="absolute right-0 top-1/2 h-14 w-14 -translate-y-1/2 rotate-12 rounded-[40%_60%_40%_60%] border-[12px] border-[#FF7A59]" />
              <div className="absolute left-1/2 top-1/2 h-9 w-9 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#F2C572] shadow-lg" />
            </motion.div>

            <motion.div
              className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: [0, 0, 1], scale: [0.96, 0.96, 1] }}
              transition={{ delay: reduceMotion ? 0 : 1.45, duration: 0.55 }}
            >
              <Sparkles className="h-8 w-8 text-[#F2C572]" />
              <p className="mt-4 text-xs font-semibold uppercase tracking-[0.24em] text-[#E94B8A]">The Beauty Box</p>
              <p className="mt-2 text-2xl font-bold text-[#241335] sm:text-3xl">Algo especial viene para vos.</p>
              <p className="mt-3 text-sm text-[#6D5577]">Tocá para descubrirlo.</p>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
