import { AnimatePresence, motion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useCallback, useEffect, useRef, useState } from 'react'
import { ORDERING_UI_SCREENS } from '../../data/ordering-app-content'
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

export function OrderingAppUIShowcase() {
  const reduced = useReducedMotion()
  const stripRef = useRef<HTMLDivElement>(null)
  const sectionRef = useRef<HTMLElement>(null)
  const [activeScreen, setActiveScreen] = useState(0)
  const screen = ORDERING_UI_SCREENS[activeScreen] ?? ORDERING_UI_SCREENS[0]
  const total = ORDERING_UI_SCREENS.length

  const goTo = useCallback(
    (index: number) => {
      const next = Math.max(0, Math.min(total - 1, index))
      setActiveScreen(next)
      const thumb = stripRef.current?.children[next] as HTMLElement | undefined
      thumb?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' })
    },
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
      if (e.key === 'ArrowLeft') { e.preventDefault(); goTo(activeScreen - 1) }
      else if (e.key === 'ArrowRight') { e.preventDefault(); goTo(activeScreen + 1) }
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [activeScreen, goTo])

  return (
    <section
      ref={sectionRef}
      id="screenshots"
      className="ordering-showcase ordering-section relative overflow-hidden py-section md:py-section-lg"
    >
      <OrderingMarqueeRule />
      <div className="pointer-events-none absolute inset-0 bg-oapp-mesh opacity-50" aria-hidden />
      <OrderingGlowOrb className="left-1/2 top-[20%] h-[28rem] w-[28rem] -translate-x-1/2 bg-oapp-gold/12" />

      <div className="relative mx-auto max-w-[90rem] px-6 lg:px-10">
        <Reveal>
          <OrderingSectionHeader
            eyebrow="Real product UI"
            title="Browse, customize, cart,"
            titleAccent="checkout — one flow."
            description="Screens from a live client build — layout, colors, and flows shaped to their brand. Your app gets the same treatment: menu, customization, cart, and checkout designed to your needs."
          />
        </Reveal>

        <Reveal delay={0.06} className="mt-8 hidden md:block">
          <OrderingFlowStrip activeIndex={activeScreen} />
        </Reveal>

        <div className="mt-10 md:mt-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeScreen}
              initial={reduced ? false : { opacity: 0, y: 12, filter: 'blur(6px)' }}
              animate={reduced ? undefined : { opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={reduced ? undefined : { opacity: 0, y: -8, filter: 'blur(6px)' }}
              transition={{ duration: 0.36, ease: ORDERING_EASE }}
            >
              <OrderingProductScreenshot
                src={screen.src}
                alt={screen.alt}
                fit={screen.fit}
                step={`${String(activeScreen + 1).padStart(2, '0')} · ${screen.label}`}
                glow
                variant="phone"
              />
            </motion.div>
          </AnimatePresence>

          <div className="mt-8 flex items-center justify-between gap-4 border-t border-ink/8 pt-6">
            <div className="min-w-0">
              <p className="font-oapp-display text-xl font-bold tracking-[-0.02em] text-oapp-cream">
                {screen.label}
              </p>
              <p className="font-oapp-body text-[11px] font-bold uppercase tracking-[0.24em] text-oapp-gold/70">
                Screen {String(activeScreen + 1).padStart(2, '0')} of {String(total).padStart(2, '0')}
              </p>
            </div>
            <div className="flex shrink-0 items-center gap-3">
              <span className="hidden select-none items-center gap-1 font-oapp-body text-[10px] font-bold uppercase tracking-[0.18em] text-oapp-muted/45 md:flex" aria-hidden>
                <kbd className="rounded border border-ink/10 bg-white px-1.5 py-0.5 text-[9px]">←</kbd>
                <kbd className="rounded border border-ink/10 bg-white px-1.5 py-0.5 text-[9px]">→</kbd>
              </span>
              <button
                type="button"
                onClick={() => goTo(activeScreen - 1)}
                disabled={activeScreen === 0}
                aria-label="Previous screen"
                className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-ink/10 bg-white text-oapp-cream transition-[border-color,background-color,color] duration-200 hover:border-oapp-gold/35 hover:bg-oapp-elevated disabled:cursor-not-allowed disabled:opacity-25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-oapp-gold/80"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => goTo(activeScreen + 1)}
                disabled={activeScreen === total - 1}
                aria-label="Next screen"
                className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-ink/10 bg-white text-oapp-cream transition-[border-color,background-color,color] duration-200 hover:border-oapp-gold/35 hover:bg-oapp-elevated disabled:cursor-not-allowed disabled:opacity-25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-oapp-gold/80"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div
            ref={stripRef}
            className="mt-5 flex gap-3 overflow-x-auto pb-2 md:hidden [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {ORDERING_UI_SCREENS.map((item, i) => {
              const selected = activeScreen === i
              return (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => goTo(i)}
                  aria-label={`View ${item.label}`}
                  aria-current={selected ? 'true' : undefined}
                  className={`w-[8.75rem] shrink-0 cursor-pointer overflow-hidden rounded-xl text-left ring-1 transition duration-200 ${
                    selected
                      ? 'bg-white ring-oapp-gold/45 shadow-sm'
                      : 'bg-oapp-elevated ring-ink/8'
                  }`}
                >
                  <div className="aspect-[9/16] overflow-hidden bg-[#faf6f0]">
                    <img
                      src={item.src}
                      alt=""
                      width={780}
                      height={1688}
                      loading="lazy"
                      decoding="async"
                      className={`h-full w-full object-top ${
                        item.fit === 'cover' ? 'object-cover' : 'object-contain'
                      }`}
                    />
                  </div>
                  <p
                    className={`truncate px-2.5 py-2 font-oapp-body text-[11px] font-semibold ${
                      selected ? 'text-oapp-cream' : 'text-oapp-muted'
                    }`}
                  >
                    {item.label}
                  </p>
                </button>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
