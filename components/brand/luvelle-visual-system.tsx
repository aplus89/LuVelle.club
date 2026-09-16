"use client"

import { motion, useReducedMotion } from "framer-motion"

type AuraWaveIntensity = "hero" | "soft" | "subtle"

export function AuraWaves({
  className = "",
  intensity = "hero",
}: {
  className?: string
  intensity?: AuraWaveIntensity
}) {
  const reduceMotion = useReducedMotion()
  const settings = {
    hero: { height: "h-44 sm:h-52 md:h-64", opacity: 1 },
    soft: { height: "h-40 sm:h-48 md:h-56", opacity: 0.82 },
    subtle: { height: "h-28 sm:h-36 md:h-44", opacity: 0.6 },
  }[intensity]

  const layers = [
    {
      d: "M-80 118 C 90 54 245 116 390 92 C 560 63 675 19 845 74 C 1020 130 1155 38 1325 74 C 1425 96 1515 82 1580 52 L1580 340 L-80 340 Z",
      fill: "#B388FF",
      opacity: 0.28,
      duration: 16,
      x: 12,
    },
    {
      d: "M-80 150 C 105 78 245 160 425 124 C 580 92 720 54 890 108 C 1070 166 1185 74 1360 108 C 1450 126 1525 116 1580 90 L1580 340 L-80 340 Z",
      fill: "#5B2A86",
      opacity: 0.25,
      duration: 18,
      x: -10,
    },
    {
      d: "M-80 188 C 80 124 265 202 440 170 C 610 138 750 94 920 148 C 1090 202 1225 118 1390 150 C 1470 166 1530 164 1580 142 L1580 340 L-80 340 Z",
      fill: "#E94B8A",
      opacity: 0.42,
      duration: 14,
      x: 9,
    },
    {
      d: "M-80 226 C 95 164 260 242 455 210 C 635 180 780 140 955 190 C 1120 238 1255 166 1410 194 C 1490 208 1540 210 1580 194 L1580 340 L-80 340 Z",
      fill: "#FF7A59",
      opacity: 0.5,
      duration: 17,
      x: -8,
    },
    {
      d: "M-80 266 C 90 214 275 282 470 254 C 650 228 795 198 970 236 C 1140 274 1280 224 1430 246 C 1500 256 1545 260 1580 250 L1580 340 L-80 340 Z",
      fill: "#FFD8CC",
      opacity: 0.88,
      duration: 15,
      x: 7,
    },
  ]

  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-x-0 bottom-0 overflow-hidden ${settings.height} ${className}`}
      style={{ opacity: settings.opacity }}
    >
      <div className="absolute inset-x-[8%] bottom-0 h-2/3 rounded-full bg-[#FFD8CC]/30 blur-3xl" />
      <svg viewBox="0 0 1500 340" className="absolute -left-[4%] bottom-0 h-full w-[108%]" preserveAspectRatio="none">
        {layers.map((layer, index) => (
          <motion.path
            key={layer.fill}
            d={layer.d}
            fill={layer.fill}
            opacity={layer.opacity}
            initial={false}
            animate={
              reduceMotion
                ? undefined
                : {
                    x: [0, layer.x, 0],
                    y: [0, index % 2 === 0 ? 4 : -3, 0],
                  }
            }
            transition={
              reduceMotion
                ? undefined
                : {
                    duration: layer.duration,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }
            }
          />
        ))}
        <path
          d="M-80 208 C 95 146 260 224 455 192 C 635 162 780 122 955 172 C 1120 220 1255 148 1410 176 C 1490 190 1540 192 1580 176"
          fill="none"
          stroke="rgba(255,255,255,.48)"
          strokeWidth="2"
        />
      </svg>
    </div>
  )
}

export function AuraHalo({ className = "" }: { className?: string }) {
  const reduceMotion = useReducedMotion()
  return (
    <motion.div
      aria-hidden
      className={`pointer-events-none relative aspect-square w-48 ${className}`}
      animate={reduceMotion ? undefined : { rotate: [0, 4, -3, 0], scale: [1, 1.03, 0.99, 1] }}
      transition={reduceMotion ? undefined : { duration: 10, repeat: Infinity, ease: "easeInOut" }}
    >
      {[0, 1, 2, 3, 4].map((i) => (
        <div
          key={i}
          className="absolute rounded-[44%_56%_51%_49%/52%_43%_57%_48%] border"
          style={{
            inset: `${i * 9}px`,
            borderColor: i % 2 ? "rgba(233,75,138,.28)" : "rgba(255,122,89,.28)",
            transform: `rotate(${i * 7}deg)`,
          }}
        />
      ))}
      <div className="absolute inset-[36%] rounded-full bg-[#FFD8CC]/80 blur-xl" />
      <Spark className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" />
    </motion.div>
  )
}

export function Spark({ className = "" }: { className?: string }) {
  return (
    <span aria-hidden className={`relative block h-7 w-7 ${className}`}>
      <span className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-[#F2C572]" />
      <span className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-[#F2C572]" />
      <span className="absolute left-1/2 top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rotate-45 bg-[#F2C572]" />
    </span>
  )
}

export function ConstellationField({ className = "" }: { className?: string }) {
  const reduceMotion = useReducedMotion()
  const nodes = [
    [12, 28], [34, 16], [57, 34], [80, 18], [90, 53], [66, 72], [38, 66], [18, 82],
  ]
  return (
    <div aria-hidden className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      <svg viewBox="0 0 100 100" className="h-full w-full" preserveAspectRatio="none">
        <path d="M12 28 Q35 3 57 34 T90 53 Q82 80 66 72 Q48 88 38 66 Q23 56 18 82" fill="none" stroke="rgba(91,42,134,.16)" strokeWidth=".7" />
        <path d="M34 16 Q52 38 80 18" fill="none" stroke="rgba(233,75,138,.14)" strokeWidth=".5" strokeDasharray="2 3" />
      </svg>
      {nodes.map(([left, top], i) => (
        <motion.span
          key={`${left}-${top}`}
          className="absolute h-2 w-2 rounded-full bg-[#E94B8A]/55 shadow-[0_0_0_5px_rgba(233,75,138,.08)]"
          style={{ left: `${left}%`, top: `${top}%` }}
          animate={reduceMotion ? undefined : { scale: [1, 1.45, 1], opacity: [0.55, 0.9, 0.55] }}
          transition={reduceMotion ? undefined : { duration: 3.6 + i * 0.35, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  )
}

export function AtelierStrip({ className = "" }: { className?: string }) {
  const icons = [
    <path key="comb" d="M6 7h34v8H6zM10 15v18m5-18v14m5-14v18m5-18v14m5-14v18m5-18v14" />,
    <path key="scissor" d="M10 11a5 5 0 1 0 0 .1m0 20a5 5 0 1 0 0 .1M14 14l24 16M14 28l24-16" />,
    <path key="spoolie" d="M8 34l24-24m-3 2 7-2m-10 5 8 1m-11 2 8 3m-12 0 7 5M7 35l5 5" />,
    <path key="mirror" d="M23 8a11 11 0 1 0 0 22 11 11 0 0 0 0-22m0 22v11m-6 0h12" />,
  ]
  return (
    <div className={`flex items-center gap-4 ${className}`} aria-hidden>
      {icons.map((icon, i) => (
        <div key={i} className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[#EEDCD6] bg-white/75 text-[#5B2A86]">
          <svg viewBox="0 0 46 46" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">{icon}</svg>
        </div>
      ))}
    </div>
  )
}