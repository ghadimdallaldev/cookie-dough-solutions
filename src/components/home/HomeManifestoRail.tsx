import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion'
import { useRef } from 'react'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { home as h } from '../../theme/home'

const LINES = [
  { main: 'Software that survives', accent: 'Saturday night.' },
  { main: 'Ops deep enough', accent: 'to matter.' },
  { main: 'No ERP theater.', accent: 'Ever.' },
  { main: 'Built with operators,', accent: 'not around them.' },
  { main: 'Custom when off-the-shelf', accent: 'is a polite lie.' },
] as const

function ManifestoLine({
  main,
  accent,
  index,
  total,
  progress,
}: {
  main: string
  accent: string
  index: number
  total: number
  progress: MotionValue<number>
}) {
  const start = index / total
  const end = (index + 1) / total
  const lineProgress = useTransform(progress, [start, end], [0, 1])
  const opacity = useTransform(lineProgress, [0, 0.35, 0.65, 1], [0.12, 1, 1, 0.12])
  const y = useTransform(lineProgress, [0, 0.35, 0.65, 1], [28, 0, 0, -28])
  const scale = useTransform(lineProgress, [0, 0.35, 0.65, 1], [0.96, 1, 1, 0.96])

  return (
    <motion.p
      className={`${h.h2} absolute inset-x-0 top-1/2 max-w-4xl -translate-y-1/2 px-6 text-balance md:px-8`}
      style={{ opacity, y, scale }}
    >
      <span className="text-ink">{main}</span>{' '}
      <span className="font-serif italic text-chip">{accent}</span>
    </motion.p>
  )
}

function ManifestoDot({
  index,
  total,
  progress,
}: {
  index: number
  total: number
  progress: MotionValue<number>
}) {
  const opacity = useTransform(
    progress,
    [(index - 0.5) / total, index / total, (index + 0.5) / total],
    [0.25, 1, 0.25]
  )

  return (
    <motion.span
      className="h-1.5 w-1.5 rounded-full bg-chip"
      style={{ opacity, scale: opacity }}
      aria-hidden
    />
  )
}

export function HomeManifestoRail() {
  const ref = useRef<HTMLElement>(null)
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  const glowOpacity = useTransform(scrollYProgress, [0, 1], [0.4, 0.8])

  if (reduced) {
    return (
      <section className={`${h.sectionBorder} bg-paper-warm py-16 md:py-20`}>
        <div className={`${h.container} space-y-6`}>
          {LINES.map(({ main, accent }) => (
            <p key={main} className={`${h.h2} text-ink`}>
              {main} <span className="text-chip">{accent}</span>
            </p>
          ))}
        </div>
      </section>
    )
  }

  return (
    <section ref={ref} className="relative h-[220vh]" aria-label="Manifesto">
      <motion.div className="sticky top-0 flex h-svh flex-col justify-center overflow-hidden border-y border-ink/[0.06] bg-gradient-to-br from-paper-warm via-paper to-paper-deep">
        <motion.div
          className="pointer-events-none absolute left-[8%] top-[12%] h-32 w-32 rounded-full bg-dough-300/30 blur-[80px]"
          style={{ opacity: glowOpacity }}
          aria-hidden
        />

        <div className={`${h.container} relative z-[1] h-[40vh] max-h-[320px] min-h-[200px]`}>
          {LINES.map(({ main, accent }, i) => (
            <ManifestoLine
              key={main}
              main={main}
              accent={accent}
              index={i}
              total={LINES.length}
              progress={scrollYProgress}
            />
          ))}
        </div>

        <div className="absolute bottom-8 left-1/2 flex -translate-x-1/2 gap-2" aria-hidden>
          {LINES.map((_, i) => (
            <ManifestoDot key={i} index={i} total={LINES.length} progress={scrollYProgress} />
          ))}
        </div>
      </motion.div>
    </section>
  )
}
