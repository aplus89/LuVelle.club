"use client"

import { motion, useReducedMotion } from "framer-motion"

export function AuraWaves({ className = "" }: { className?: string }) {
  const reduceMotion = useReducedMotion()
  const paths = [
    { d: "M-40 132 C 120 70, 260 190, 430 118 S 760 72, 1040 138 S 1330 188, 1540 106", stroke: "#FFD8CC", width: 28 },
    { d: "M-40 146 C 140 88, 300 214, 474 136 S 800 88, 1070 154 S 1340 202, 1540 128", stroke: "#FF7A59", width: 16 },
    { d: "M-40 160 C 150 102, 330 230, 510 150 S 830 104, 1110 170 S 1370 222, 1540 146", stroke: "#E94B8A", width: 12 },
    { d: "M-40 176 C 180 118, 350 246, 546 162 S 860 122, 1140 184 S 1400 236, 1540 160", stroke: "#5B2A86", width: 10 },
  ]

  return (
    <div aria-hidden className={`pointer-events-none absolute inset-x-0 bottom-0 overflow-hidden ${className}`}>
      <svg viewBox="0 0 1500 230" className="h-auto w-full" preserveAspectRatio="none">
        {paths.map((path, index) => (
          <motion.path
            key={path.stroke}
            d={path.d}
            fill="none"
            stroke={path.stroke}
            strokeWidth={path.width}
            strokeLinecap="round"
            opacity={0.82 - index * 0.08}
            initial={reduceMotion ? undefined : { pathLength: 0.88, x: -20 }}
            animate={reduceMotion ? undefined : { pathLength: 1, x: [0, 18, 0] }}
            transition={reduceMotion ? undefined : { duration: 8 + index, repeat: Infinity, ease: "easeInOut" }}
          />
        ))}
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
