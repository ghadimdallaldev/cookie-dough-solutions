import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { home as h } from '../../theme/home'

const PHRASES = ['fix the chaos', 'ship the software', 'scale the ops'] as const

export function HomeActionRail() {
  const ref = useRef<HTMLElement>(null)
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const x = useTransform(scrollYProgress, [0, 1], ['8%', '-35%'])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.35, 1, 1, 0.35])

  if (reduced) {
    return (
      <section ref={ref} className={`${h.sectionBorder} bg-ink py-12 sm:py-16 md:py-20`}>
        <div className={`${h.container} flex flex-wrap gap-x-8 gap-y-4`}>
          {PHRASES.map((p) => (
            <span key={p} className={`${h.rail} text-paper/90`}>
              {p}
            </span>
          ))}
        </div>
      </section>
    )
  }

  return (
    <section ref={ref} className={`${h.sectionBorder} relative overflow-hidden bg-ink py-14 sm:py-20 md:py-28`}>
      <motion.div
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          background:
            'radial-gradient(ellipse 70% 80% at 20% 50%, rgba(184,149,111,0.35) 0%, transparent 60%), radial-gradient(ellipse 50% 60% at 90% 30%, rgba(109,94,247,0.2) 0%, transparent 55%)',
        }}
        aria-hidden
      />

      <motion.div style={{ opacity }} className="marquee-edge-fade overflow-hidden">
        <motion.div style={{ x }} className="flex w-max items-baseline gap-10 whitespace-nowrap pl-[6vw] md:gap-16">
          {[...PHRASES, ...PHRASES, ...PHRASES].map((phrase, i) => (
            <span
              key={`${phrase}-${i}`}
              className={`${h.rail} shrink-0 ${i % 3 === 1 ? 'text-dough-400' : 'text-paper/95'}`}
            >
              {phrase}
              <span className="ml-8 inline-block text-chip/50 md:ml-14" aria-hidden>
                ◆
              </span>
            </span>
          ))}
        </motion.div>
      </motion.div>
    </section>
  )
}
