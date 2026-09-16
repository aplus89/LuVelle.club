"use client"

import { AnimatePresence, motion, useReducedMotion } from "framer-motion"
import { CalendarCheck, Check, Sparkles } from "lucide-react"
import { useEffect, useState, type ReactNode } from "react"

const scenes = [
  {
    id: "consulta",
    eyebrow: "1 · Consulta",
    title: "Una conversación empieza",
  },
  {
    id: "seguimiento",
    eyebrow: "2 · Seguimiento",
    title: "LuVelle AI te ayuda a retomarla",
  },
  {
    id: "recuperacion",
    eyebrow: "3 · Recuperación",
    title: "La conversación vuelve a avanzar",
  },
] as const

export function AiPhoneStory() {
  const reduceMotion = useReducedMotion()
  const [step, setStep] = useState(reduceMotion ? 2 : 0)

  useEffect(() => {
    if (reduceMotion) {
      setStep(2)
      return
    }

    const timer = window.setInterval(() => {
      setStep((current) => (current + 1) % scenes.length)
    }, 3600)

    return () => window.clearInterval(timer)
  }, [reduceMotion])

  const scene = scenes[step]

  return (
    <div className="relative mx-auto w-full max-w-[390px]">
      <div className="absolute -inset-8 rounded-[56px] bg-gradient-to-br from-[#FFD8CC]/55 via-[#E94B8A]/15 to-[#B388FF]/25 blur-3xl" />
      <motion.div
        initial={reduceMotion ? false : { opacity: 0, y: 20, rotate: 1.5 }}
        animate={reduceMotion ? undefined : { opacity: 1, y: 0, rotate: [0.8, -0.6, 0.8] }}
        transition={reduceMotion ? undefined : { opacity: { duration: 0.6 }, y: { duration: 0.6 }, rotate: { duration: 8, repeat: Infinity, ease: "easeInOut" } }}
        className="relative rounded-[48px] border-[10px] border-[#241335] bg-[#241335] shadow-[0_36px_100px_rgba(36,19,53,0.28)]"
      >
        <div className="relative overflow-hidden rounded-[36px] bg-[#FFFDFB]">
          <div className="absolute left-1/2 top-2 z-20 h-5 w-24 -translate-x-1/2 rounded-full bg-[#241335]" />

          <div className="border-b border-[#F1E1DC] bg-white/95 px-5 pb-4 pt-11 backdrop-blur">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[#FFD8CC] to-[#E94B8A]/35 text-[#5B2A86]">
                  <span className="text-sm font-bold">A</span>
                </div>
                <div>
                  <p className="text-sm font-bold text-[#241335]">Ana · Lifting de pestañas</p>
                  <p className="text-xs text-[#8A718F]">WhatsApp · hoy</p>
                </div>
              </div>
              <Sparkles className="h-5 w-5 text-[#E94B8A]" />
            </div>
          </div>

          <div className="min-h-[430px] bg-gradient-to-b from-[#FFFDFB] to-[#FFF7F3] px-4 py-5">
            <div className="mb-4 flex justify-center">
              <div className="rounded-full bg-white px-3 py-1 text-[11px] font-semibold text-[#8A718F] shadow-sm">
                {scene.eyebrow}
              </div>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={scene.id}
                initial={reduceMotion ? false : { opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduceMotion ? undefined : { opacity: 0, y: -10 }}
                transition={{ duration: reduceMotion ? 0 : 0.35 }}
              >
                <p className="mb-5 text-center text-sm font-semibold text-[#5B2A86]">{scene.title}</p>

                <div className="space-y-3">
                  <MessageBubble side="left">Hola, ¿cuánto cuesta el lifting?</MessageBubble>
                  <MessageBubble side="right">Hola Ana 💗 El lifting tiene un precio desde ₡18.000. ¿Querés que te cuente qué incluye?</MessageBubble>

                  {step >= 1 ? (
                    <motion.div initial={reduceMotion ? false : { opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: reduceMotion ? 0 : 0.15 }} className="rounded-3xl border border-[#E9DDF2] bg-[#FAF6FF] p-4 shadow-sm">
                      <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-[#8B5DB0]">
                        <Sparkles className="h-4 w-4" /> Sugerencia de LuVelle AI
                      </div>
                      <p className="mt-2 text-sm leading-6 text-[#5B2A86]">“Hola Ana 💗 Te escribo por si todavía querías reservar tu lifting. Tengo algunos espacios esta semana.”</p>
                      <div className="mt-3 flex gap-2">
                        <span className="rounded-full bg-[#241335] px-3 py-1.5 text-[11px] font-semibold text-white">Usar sugerencia</span>
                        <span className="rounded-full border border-[#D8C8E4] bg-white px-3 py-1.5 text-[11px] font-semibold text-[#6D5577]">Editar</span>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="pt-2 text-center text-xs text-[#9A859F]">
                      Pasaron unas horas sin respuesta…
                    </motion.div>
                  )}

                  {step >= 2 ? (
                    <motion.div initial={reduceMotion ? false : { opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: reduceMotion ? 0 : 0.18 }} className="space-y-3">
                      <MessageBubble side="left">Sí 💕 ¿tenés espacio el viernes?</MessageBubble>
                      <div className="rounded-3xl border border-[#DDEEDC] bg-[#F7FFF6] p-4">
                        <div className="flex items-center gap-2 text-sm font-bold text-[#2F7A4A]"><CalendarCheck className="h-4 w-4" /> Próximo paso</div>
                        <p className="mt-2 text-xs leading-5 text-[#55715D]">Podés revisar disponibilidad y responder con opciones concretas.</p>
                      </div>
                    </motion.div>
                  ) : null}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex items-center justify-between border-t border-[#F1E1DC] bg-white px-5 py-4">
            <div className="flex gap-1.5">
              {scenes.map((item, index) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setStep(index)}
                  aria-label={`Ver paso ${index + 1}: ${item.title}`}
                  className={`h-2 rounded-full transition-all ${index === step ? "w-7 bg-[#E94B8A]" : "w-2 bg-[#E6D6E9]"}`}
                />
              ))}
            </div>
            <div className="flex items-center gap-1 text-[11px] font-semibold text-[#6D5577]"><Check className="h-3.5 w-3.5 text-[#2F7A4A]" /> Vos decidís qué enviar</div>
          </div>
        </div>
      </motion.div>
      <p className="mt-5 text-center text-xs leading-5 text-[#8A718F]">Ejemplo ilustrativo de cómo LuVelle AI puede apoyar una conversación. La profesional mantiene el control.</p>
    </div>
  )
}

function MessageBubble({ children, side }: { children: ReactNode; side: "left" | "right" }) {
  return (
    <div className={`flex ${side === "right" ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[84%] rounded-3xl px-4 py-3 text-sm leading-6 shadow-sm ${
          side === "right"
            ? "rounded-br-md bg-gradient-to-br from-[#E94B8A] to-[#FF7A59] text-white"
            : "rounded-bl-md border border-[#F0E2DD] bg-white text-[#5F5056]"
        }`}
      >
        {children}
      </div>
    </div>
  )
}
