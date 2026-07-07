import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, ChevronLeft, ChevronRight, Pause, Play, Star } from 'lucide-react'
import { useCallback, useEffect, useRef, useState } from 'react'
import { HOME_TESTIMONIALS } from '../../data/homepage-copy'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { home as h } from '../../theme/home'
import { Reveal } from '../Reveal'

const TESTIMONIALS = HOME_TESTIMONIALS.items

const ROTATE_MS = 6000

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-1 text-dough-500" aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} className="h-4 w-4 fill-current" aria-hidden />
      ))}
    </div>
  )
}

export function HomeTestimonials() {
  const reduced = useReducedMotion()
  const [active, setActive] = useState(0)
  const [manualPaused, setManualPaused] = useState(false)
  const [interactionPaused, setInteractionPaused] = useState(false)
  const railRef = useRef<HTMLDivElement>(null)
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([])
  const paused = manualPaused || interactionPaused

  const current = TESTIMONIALS[active]

  const scrollActiveIntoView = useCallback((index: number) => {
    const rail = railRef.current
    const item = itemRefs.current[index]
    if (!rail || !item) return
    const railTop = rail.scrollTop
    const railHeight = rail.clientHeight
    const itemTop = item.offsetTop
    const itemHeight = item.offsetHeight
    const itemBottom = itemTop + itemHeight
    const visibleBottom = railTop + railHeight
    if (itemTop < railTop + 12) {
      rail.scrollTo({ top: itemTop - 12, behavior: reduced ? 'auto' : 'smooth' })
    } else if (itemBottom > visibleBottom - 12) {
      rail.scrollTo({ top: itemBottom - railHeight + 12, behavior: reduced ? 'auto' : 'smooth' })
    }
  }, [reduced])

  useEffect(() => {
    scrollActiveIntoView(active)
  }, [active, scrollActiveIntoView])

  useEffect(() => {
    if (reduced || paused) return
    const id = window.setInterval(() => {
      setActive((i) => (i + 1) % TESTIMONIALS.length)
    }, ROTATE_MS)
    return () => window.clearInterval(id)
  }, [reduced, paused])

  const goToNext = useCallback(() => {
    setActive((i) => (i + 1) % TESTIMONIALS.length)
  }, [])

  const goToPrevious = useCallback(() => {
    setActive((i) => (i - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)
  }, [])

  return (
    <section
      className={`${h.sectionBorder} section-noise relative scroll-section overflow-hidden bg-paper-warm/90 ${h.sectionLg}`}
      aria-labelledby="testimonials-heading"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-50"
        style={{
          background:
            'radial-gradient(ellipse 60% 45% at 0% 50%, rgba(184,149,111,0.1) 0%, transparent 55%)',
        }}
        aria-hidden
      />

      <div className={`${h.container} relative`}>
        <div className="flex flex-col gap-6 sm:gap-8 lg:flex-row lg:items-end lg:justify-between lg:gap-12">
          <Reveal className="max-w-2xl">
            <p className={h.eyebrow}>{HOME_TESTIMONIALS.eyebrow}</p>
            <h2
              id="testimonials-heading"
              className={`${h.h2} mt-4 text-balance sm:mt-5 md:mt-6`}
            >
              {HOME_TESTIMONIALS.headline}
            </h2>
          </Reveal>

          <Reveal delay={0.08} className="lg:shrink-0 lg:pb-1">
            <a
              href="#contact"
              className={`${h.link} group inline-flex cursor-pointer items-center gap-2 rounded-full border border-ink/10 bg-paper/90 px-5 py-2.5 font-sans text-sm font-semibold text-ink shadow-sm transition-[border-color,box-shadow,transform] duration-200 hover:border-chip/30 hover:shadow-editorial focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-chip focus-visible:ring-offset-2 focus-visible:ring-offset-paper-warm`}
            >
              {HOME_TESTIMONIALS.cta}
              <ArrowRight
                className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5"
                aria-hidden
              />
            </a>
          </Reveal>
        </div>

        <div className="mt-10 grid gap-8 sm:mt-14 sm:gap-10 lg:mt-16 lg:grid-cols-2 lg:gap-12 xl:gap-16">
          {/* Featured quote */}
          <div className="min-h-[240px] sm:min-h-[280px] lg:min-h-[360px]">
            <AnimatePresence mode="wait">
              <motion.article
                id="testimonials-featured"
                key={current.quote}
                className="glass-card relative flex h-full min-h-[inherit] flex-col justify-between rounded-xl p-6 sm:rounded-2xl sm:p-8 md:p-10 lg:p-12"
                role="tabpanel"
                aria-labelledby={`testimonial-tab-${active}`}
                initial={reduced ? false : { opacity: 0, y: 24 }}
                animate={reduced ? undefined : { opacity: 1, y: 0 }}
                exit={reduced ? undefined : { opacity: 0, y: -16 }}
                transition={{ duration: 0.5, ease: h.ease }}
                aria-live="polite"
                aria-atomic="true"
              >
                <div>
                  <Stars count={current.rating} />
                  <blockquote className={`${h.quote} mt-5 sm:mt-6 md:mt-8`}>
                    &ldquo;{current.quote}&rdquo;
                  </blockquote>
                </div>
                <footer className="mt-6 border-t border-ink/[0.08] pt-5 sm:mt-8 md:mt-10 md:pt-6">
                  <p className="font-sans text-base font-semibold text-ink">{current.role}</p>
                  <p className="mt-1 font-sans text-sm text-ink-muted">{current.market}</p>
                </footer>
              </motion.article>
            </AnimatePresence>
          </div>

          {/* Quote rail */}
          <div className="flex flex-col lg:min-h-[360px]">
            <div className="mb-3 flex flex-wrap items-center justify-between gap-3 sm:mb-4 sm:gap-4">
              <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.18em] text-ink/45 sm:text-[11px] sm:tracking-[0.22em]">
                More stories
              </p>
              <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                <button
                  type="button"
                  onClick={() => setManualPaused((v) => !v)}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-ink/15 bg-paper/80 text-ink-muted transition-colors duration-200 hover:border-chip/35 hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-chip focus-visible:ring-offset-2 focus-visible:ring-offset-paper-warm sm:h-8 sm:w-8"
                  aria-label={manualPaused ? 'Resume auto rotation' : 'Pause auto rotation'}
                >
                  {manualPaused ? (
                    <Play className="h-3.5 w-3.5" aria-hidden />
                  ) : (
                    <Pause className="h-3.5 w-3.5" aria-hidden />
                  )}
                </button>
                <button
                  type="button"
                  onClick={goToPrevious}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-ink/15 bg-paper/80 text-ink-muted transition-colors duration-200 hover:border-chip/35 hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-chip focus-visible:ring-offset-2 focus-visible:ring-offset-paper-warm sm:h-8 sm:w-8"
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft className="h-4 w-4" aria-hidden />
                </button>
                <button
                  type="button"
                  onClick={goToNext}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-ink/15 bg-paper/80 text-ink-muted transition-colors duration-200 hover:border-chip/35 hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-chip focus-visible:ring-offset-2 focus-visible:ring-offset-paper-warm sm:h-8 sm:w-8"
                  aria-label="Next testimonial"
                >
                  <ChevronRight className="h-4 w-4" aria-hidden />
                </button>
                <p className="font-sans text-xs tabular-nums text-ink-muted" aria-live="polite">
                  {active + 1} / {TESTIMONIALS.length}
                </p>
              </div>
            </div>

            <div
              className="testimonial-rail-fade relative min-h-0 flex-1 lg:max-h-[min(58vh,520px)]"
              onMouseEnter={() => setInteractionPaused(true)}
              onMouseLeave={() => setInteractionPaused(false)}
              onFocus={() => setInteractionPaused(true)}
              onBlur={(e) => {
                if (!e.currentTarget.contains(e.relatedTarget as Node)) setInteractionPaused(false)
              }}
            >
              <div
                ref={railRef}
                className="testimonial-rail-scroll flex max-h-[min(55vh,480px)] flex-col gap-2.5 overflow-y-auto pr-1 sm:max-h-[min(70vh,640px)] sm:gap-3 sm:pr-2 md:gap-3.5 lg:max-h-full lg:pr-3"
                role="tablist"
                aria-label="Select a testimonial"
              >
                {TESTIMONIALS.map((t, i) => {
                  const isActive = i === active
                  return (
                    <button
                      key={t.quote}
                      ref={(el) => {
                        itemRefs.current[i] = el
                      }}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      aria-controls="testimonials-featured"
                      id={`testimonial-tab-${i}`}
                      onClick={() => setActive(i)}
                      className={`cursor-pointer rounded-xl border px-4 py-3.5 text-left transition-[border-color,background-color,box-shadow,transform] duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-chip focus-visible:ring-offset-2 focus-visible:ring-offset-paper-warm sm:rounded-2xl sm:px-5 sm:py-4 md:px-6 md:py-5 ${
                        isActive
                          ? 'border-chip/35 bg-paper shadow-editorial'
                          : 'border-ink/[0.1] bg-paper/75 hover:border-chip/25 hover:bg-paper hover:shadow-sm'
                      }`}
                    >
                      <p
                        className={`font-serif text-[0.9375rem] italic leading-[1.55] md:text-base ${
                          isActive ? 'text-ink' : 'text-ink-muted'
                        }`}
                      >
                        {t.quote}
                      </p>
                      <p className="mt-3 flex flex-wrap items-baseline gap-x-2 gap-y-0.5 font-sans text-xs">
                        <span className={`font-semibold ${isActive ? 'text-ink' : 'text-ink-muted'}`}>
                          {t.role}
                        </span>
                        <span className="text-ink/25" aria-hidden>
                          ·
                        </span>
                        <span className="font-semibold uppercase tracking-[0.16em] text-chip/80">
                          {t.market}
                        </span>
                      </p>
                    </button>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
