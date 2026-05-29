import { AnimatePresence, motion } from 'framer-motion'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { home as h } from '../../theme/home'

const LINES = [
  { main: 'Software that survives', accent: 'Saturday night.' },
  { main: 'Ops deep enough', accent: 'to matter.' },
  { main: 'No ERP theater.', accent: 'Ever.' },
  { main: 'Built with operators,', accent: 'not around them.' },
  { main: 'Custom when off-the-shelf', accent: 'is a polite lie.' },
] as const

const TOTAL = LINES.length
const SCROLL_HEIGHT_VH = 100 + TOTAL * 72
const EASE = [0.22, 1, 0.36, 1] as const

function ManifestoCopy({ main, accent }: { main: string; accent: string }) {
  return (
    <>
      <span className="text-ink">{main}</span>
      <br className="hidden sm:block" />
      <span className="sm:ml-[0.2em]">
        {' '}
        <span className="font-serif text-[1.05em] font-normal italic leading-[1.22] text-chip">
          {accent}
        </span>
      </span>
    </>
  )
}

function progressToIndex(progress: number) {
  const clamped = Math.min(1, Math.max(0, progress))
  return Math.min(TOTAL - 1, Math.floor(clamped * TOTAL))
}

export function HomeManifestoRail() {
  const ref = useRef<HTMLElement>(null)
  const reduced = useReducedMotion()
  const [activeIndex, setActiveIndex] = useState(0)
  const [glowOpacity, setGlowOpacity] = useState(0.35)

  const updateFromScroll = useCallback(() => {
    const el = ref.current
    if (!el) return

    const scrollable = el.offsetHeight - window.innerHeight
    if (scrollable <= 0) return

    const progress = Math.min(1, Math.max(0, -el.getBoundingClientRect().top / scrollable))
    const next = progressToIndex(progress)

    setActiveIndex((prev) => (prev === next ? prev : next))
    setGlowOpacity(0.35 + progress * 0.4)
  }, [])

  const jumpToIndex = useCallback(
    (index: number) => {
      const el = ref.current
      if (!el) return
      const scrollable = el.offsetHeight - window.innerHeight
      if (scrollable <= 0) return
      const progress = index / Math.max(1, TOTAL - 1)
      const targetTop = el.offsetTop + scrollable * progress
      window.scrollTo({ top: targetTop, behavior: reduced ? 'auto' : 'smooth' })
    },
    [reduced],
  )

  useEffect(() => {
    if (reduced) return

    updateFromScroll()
    window.addEventListener('scroll', updateFromScroll, { passive: true })
    window.addEventListener('resize', updateFromScroll)

    return () => {
      window.removeEventListener('scroll', updateFromScroll)
      window.removeEventListener('resize', updateFromScroll)
    }
  }, [reduced, updateFromScroll])

  if (reduced) {
    return (
      <section className={`${h.sectionBorder} section-noise bg-paper-warm py-12 sm:py-16 md:py-24`}>
        <div className={`${h.container} max-w-4xl space-y-10`}>
          {LINES.map(({ main, accent }) => (
            <p
              key={main}
              className="font-display text-[clamp(1.5rem,4vw,2.75rem)] font-bold leading-[1.2] tracking-[-0.03em] text-ink sm:text-[clamp(1.75rem,4vw,2.75rem)]"
            >
              <ManifestoCopy main={main} accent={accent} />
            </p>
          ))}
        </div>
      </section>
    )
  }

  const active = LINES[activeIndex]

  return (
    <section
      ref={ref}
      className="section-noise relative"
      style={{ height: `${SCROLL_HEIGHT_VH}vh` }}
      aria-label="Manifesto"
      aria-live="polite"
    >
      <div className="sticky top-0 flex h-svh flex-col justify-center overflow-hidden border-y border-ink/[0.06] bg-gradient-to-br from-paper-warm via-paper to-paper-deep">
        <div
          className="pointer-events-none absolute left-[8%] top-[14%] h-40 w-40 rounded-full bg-dough-300/25 blur-[90px] transition-opacity duration-300"
          style={{ opacity: glowOpacity }}
          aria-hidden
        />

        <div className={`${h.container} relative z-[1] flex w-full max-w-5xl flex-col gap-6 sm:gap-8 md:gap-10`}>
          <p className={h.eyebrow}>What we believe</p>

          <div className="absolute right-6 top-1/2 hidden -translate-y-1/2 lg:flex lg:flex-col lg:gap-2">
            {LINES.map(({ main }, i) => (
              <button
                key={main}
                type="button"
                onClick={() => jumpToIndex(i)}
                className={`inline-flex min-w-[2.25rem] cursor-pointer items-center justify-center rounded-full border px-2 py-1 font-sans text-[10px] font-semibold tracking-[0.16em] transition-colors duration-200 ${
                  i === activeIndex
                    ? 'border-chip/60 bg-chip/10 text-chip'
                    : 'border-ink/15 bg-paper/70 text-ink/55 hover:border-chip/35 hover:text-ink'
                }`}
                aria-label={`Jump to manifesto line ${i + 1}`}
                aria-current={i === activeIndex ? 'true' : undefined}
              >
                {i + 1}
              </button>
            ))}
          </div>

          <div className="relative flex min-h-[min(38vh,320px)] w-full items-center py-4 sm:min-h-[min(44vh,400px)] sm:py-6 md:min-h-[min(40vh,380px)] md:py-10">
            <AnimatePresence mode="wait" initial={false}>
              <motion.p
                key={active.main}
                className="w-full max-w-4xl font-display text-[clamp(1.75rem,calc(1rem+5vw),3.5rem)] font-bold leading-[1.14] tracking-[-0.03em] text-balance sm:leading-[1.16]"
                initial={{ opacity: 0, y: 28, filter: 'blur(8px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -24, filter: 'blur(6px)' }}
                transition={{ duration: 0.45, ease: EASE }}
              >
                <ManifestoCopy main={active.main} accent={active.accent} />
              </motion.p>
            </AnimatePresence>
          </div>

          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2" aria-hidden>
              {LINES.map((_, i) => (
                <span
                  key={i}
                  className={`h-1.5 rounded-full bg-chip transition-all duration-300 ${
                    i === activeIndex ? 'w-6 opacity-100' : 'w-1.5 opacity-25'
                  }`}
                />
              ))}
            </div>
            <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.22em] text-ink/40">
              {activeIndex + 1} / {TOTAL}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
