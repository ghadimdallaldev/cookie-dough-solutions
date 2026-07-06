import { AnimatePresence, motion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useCallback, useEffect, useRef, useState } from 'react'
import { ORDERING_PREVIEWS } from '../../data/ordering-app-content'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { Reveal } from '../Reveal'
import { OrderingProductScreenshot } from './OrderingProductScreenshot'
import {
  ORDERING_EASE,
  OrderingFlowStrip,
  OrderingGlowOrb,
  OrderingMarqueeRule,
  OrderingSectionHeader,
} from './shared'

const SCREENS = ORDERING_PREVIEWS

export function OrderingAppUIShowcase() {
  const reduced = useReducedMotion()
  const sectionRef = useRef<HTMLElement>(null)
  const [active, setActive] = useState(0)
  const screen = SCREENS[active] ?? SCREENS[0]
  const total = SCREENS.length

  const goTo = useCallback(
    (index: number) => setActive(((index % total) + total) % total),
    [total],
  )

  // Arrow keys page through screens while the showcase is in view.
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      const section = sectionRef.current
      if (!section) return
      const rect = section.getBoundingClientRect()
      const inView = rect.top < window.innerHeight * 0.85 && rect.bottom > window.innerHeight * 0.15
      if (!inView) return
      if (e.key === 'ArrowLeft') { e.preventDefault(); goTo(active - 1) }
      else if (e.key === 'ArrowRight') { e.preventDefault(); goTo(active + 1) }
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [active, goTo])

  return (
    <section
      ref={sectionRef}
      id="screenshots"
      className="ordering-showcase ordering-section relative overflow-hidden py-section md:py-section-lg"
    >
      <OrderingMarqueeRule />
      <div className="pointer-events-none absolute inset-0 bg-oapp-mesh opacity-50" aria-hidden />
      <OrderingGlowOrb className="left-[62%] top-[22%] h-[30rem] w-[30rem] -translate-x-1/2 bg-oapp-gold/12" />

      <div className="relative mx-auto max-w-[86rem] px-6 lg:px-10">
        <Reveal>
          <OrderingSectionHeader
            eyebrow="Real product UI"
            title="Browse, customize, cart,"
            titleAccent="checkout — one flow."
            description="Screens from a live client build — layout, colors, and flows shaped to their brand. Your app gets the same treatment: menu, customization, cart, and checkout designed to your needs."
          />
        </Reveal>

        <Reveal delay={0.06} className="mt-8 hidden md:block">
          <OrderingFlowStrip activeIndex={active} />
        </Reveal>

        <div className="mt-10 grid items-center gap-10 lg:mt-14 lg:grid-cols-[minmax(0,340px)_minmax(0,1fr)] lg:gap-16 xl:gap-20">
          {/* Phone — the whole screen, uncropped, in a premium frame. */}
          <div className="mx-auto w-full max-w-[340px] lg:sticky lg:top-28">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={reduced ? false : { opacity: 0, y: 12, filter: 'blur(6px)' }}
                animate={reduced ? undefined : { opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={reduced ? undefined : { opacity: 0, y: -8, filter: 'blur(6px)' }}
                transition={{ duration: 0.36, ease: ORDERING_EASE }}
              >
                <OrderingProductScreenshot
                  src={screen.image}
                  alt={screen.alt}
                  fit={screen.fit}
                  step={`${String(active + 1).padStart(2, '0')} · ${screen.label}`}
                  glow
                  variant="phone"
                />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Selectable screen list — context beside the device, no stranded controls. */}
          <div>
            <ol className="flex flex-col gap-3">
              {SCREENS.map((item, i) => {
                const selected = active === i
                return (
                  <li key={item.id}>
                    <button
                      type="button"
                      onClick={() => goTo(i)}
                      aria-current={selected ? 'true' : undefined}
                      className={`group flex w-full cursor-pointer items-start gap-4 rounded-2xl border p-5 text-left transition-[border-color,background-color,box-shadow,transform] duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-oapp-gold/80 sm:p-6 ${
                        selected
                          ? 'border-oapp-gold/40 bg-white shadow-editorial'
                          : 'border-ink/8 bg-white/55 hover:border-oapp-gold/25 hover:bg-white/85'
                      }`}
                    >
                      <span
                        className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full font-oapp-body text-xs font-bold transition-colors duration-200 ${
                          selected
                            ? 'bg-oapp-gold text-white shadow-oapp-glow'
                            : 'bg-oapp-deep text-oapp-muted group-hover:text-oapp-cream'
                        }`}
                        aria-hidden
                      >
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="flex items-center gap-2">
                          <span className="font-oapp-display text-lg font-bold tracking-[-0.01em] text-oapp-cream">
                            {item.label}
                          </span>
                          {selected ? (
                            <span className="inline-flex items-center rounded-full bg-oapp-gold/12 px-2 py-0.5 font-oapp-body text-[9px] font-bold uppercase tracking-[0.18em] text-oapp-gold">
                              Viewing
                            </span>
                          ) : null}
                        </span>
                        <span className="mt-1.5 block font-oapp-body text-sm leading-relaxed text-oapp-muted">
                          {item.blurb}
                        </span>
                      </span>
                    </button>
                  </li>
                )
              })}
            </ol>

            <div className="mt-6 flex items-center justify-between gap-4 border-t border-ink/8 pt-5">
              <p className="font-oapp-body text-[11px] font-bold uppercase tracking-[0.22em] text-oapp-gold/70">
                Screen {String(active + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
              </p>
              <div className="flex items-center gap-3">
                <span className="hidden select-none items-center gap-1 font-oapp-body text-[10px] font-bold uppercase tracking-[0.18em] text-oapp-muted/45 md:flex" aria-hidden>
                  <kbd className="rounded border border-ink/10 bg-white px-1.5 py-0.5 text-[9px]">←</kbd>
                  <kbd className="rounded border border-ink/10 bg-white px-1.5 py-0.5 text-[9px]">→</kbd>
                </span>
                <button
                  type="button"
                  onClick={() => goTo(active - 1)}
                  aria-label="Previous screen"
                  className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-ink/10 bg-white text-oapp-cream transition-[border-color,background-color] duration-200 hover:border-oapp-gold/35 hover:bg-oapp-elevated focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-oapp-gold/80"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => goTo(active + 1)}
                  aria-label="Next screen"
                  className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-ink/10 bg-white text-oapp-cream transition-[border-color,background-color] duration-200 hover:border-oapp-gold/35 hover:bg-oapp-elevated focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-oapp-gold/80"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
