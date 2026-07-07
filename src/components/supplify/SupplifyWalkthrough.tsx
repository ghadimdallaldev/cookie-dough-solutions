import { motion, useMotionValueEvent, useScroll, useTransform } from 'framer-motion'
import { useCallback, useRef, useState } from 'react'
import { WALKTHROUGH_STEPS } from '../../data/supplify-cursor-pack'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { ProductScreenshot, SupplifyEyebrow, SUPPLIFY_EASE } from './shared'

function WalkthroughProgress({ active, total }: { active: number; total: number }) {
  const pct = ((active + 1) / total) * 100
  return (
    <div className="absolute inset-x-0 top-0 z-20 h-0.5 bg-white/[0.06]" aria-hidden>
      <motion.div
        className="h-full origin-left bg-gradient-to-r from-supplify-light/80 to-supplify"
        animate={{ scaleX: pct / 100 }}
        transition={{ duration: 0.4, ease: SUPPLIFY_EASE }}
        style={{ transformOrigin: 'left' }}
      />
    </div>
  )
}

export function SupplifyWalkthrough() {
  const ref = useRef<HTMLElement>(null)
  const reduced = useReducedMotion()
  const [active, setActive] = useState(0)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  })

  const stepIndex = useTransform(scrollYProgress, (v) =>
    Math.min(WALKTHROUGH_STEPS.length - 1, Math.floor(v * WALKTHROUGH_STEPS.length)),
  )

  useMotionValueEvent(stepIndex, 'change', (v) => {
    if (!reduced) setActive(Math.round(v))
  })

  const scrollToStep = useCallback(
    (index: number) => {
      if (!ref.current || reduced) return
      const sectionTop = ref.current.offsetTop
      const sectionHeight = ref.current.offsetHeight
      const stepHeight = sectionHeight / WALKTHROUGH_STEPS.length
      const target = sectionTop + stepHeight * index + stepHeight * 0.5 - window.innerHeight * 0.5
      window.scrollTo({ top: Math.max(0, target), behavior: 'smooth' })
      setActive(index)
    },
    [reduced],
  )

  const step = WALKTHROUGH_STEPS[active] ?? WALKTHROUGH_STEPS[0]

  if (reduced) {
    return (
      <section className="border-t border-white/[0.06] bg-[#0f0620] py-section">
        <motion.div className="mx-auto max-w-[90rem] space-y-24 px-6 md:px-10 lg:px-14">
          <div>
            <SupplifyEyebrow>Product walkthrough</SupplifyEyebrow>
            <h2 className="mt-6 max-w-xl font-display text-display-md font-bold text-paper">
              Six steps from catalog to closed invoice.
            </h2>
          </div>
          {WALKTHROUGH_STEPS.map((s, i) => (
            <article
              key={s.title}
              className="grid gap-10 border-t border-white/10 pt-12 lg:grid-cols-2 lg:items-center"
            >
              <div>
                <p className="font-sans text-[11px] font-medium uppercase tracking-[0.24em] text-dough-400/70">
                  {String(i + 1).padStart(2, '0')}
                </p>
                <h3 className="mt-2 font-display text-2xl font-bold text-paper">{s.title}</h3>
                <p className="mt-4 font-sans text-base leading-[1.75] text-dough-200/90">{s.body}</p>
              </div>
              <ProductScreenshot src={s.ui} alt={`Supplify — ${s.title}`} />
            </article>
          ))}
        </motion.div>
      </section>
    )
  }

  return (
    <section
      id="walkthrough"
      ref={ref}
      className="relative h-[420vh] border-t border-white/[0.06] bg-[#0f0620]"
      aria-label="Product walkthrough"
    >
      <div className="sticky top-0 flex h-svh items-center overflow-hidden">
        <WalkthroughProgress active={active} total={WALKTHROUGH_STEPS.length} />
        <div className="pointer-events-none absolute inset-0 opacity-[0.06] supplify-grain" aria-hidden />

        <div className="relative mx-auto grid w-full max-w-[90rem] items-center gap-12 px-6 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20 lg:px-14">
          <motion.div>
            <SupplifyEyebrow>Product walkthrough</SupplifyEyebrow>

            <p className="mt-6 font-mono text-xs uppercase tracking-[0.28em] text-supplify-light/60">
              Step {String(active + 1).padStart(2, '0')} / {String(WALKTHROUGH_STEPS.length).padStart(2, '0')}
            </p>

            <div className="mt-8 space-y-6" role="list">
              {WALKTHROUGH_STEPS.map((s, i) => (
                <motion.button
                  key={s.title}
                  type="button"
                  role="listitem"
                  onClick={() => scrollToStep(i)}
                  className="block w-full cursor-pointer rounded-xl px-3 py-2 text-left transition-colors duration-200 hover:bg-white/[0.04] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-supplify-light/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0f0620]"
                  animate={{ opacity: active === i ? 1 : 0.32 }}
                  transition={{ duration: 0.35, ease: SUPPLIFY_EASE }}
                >
                  <p className="font-sans text-[11px] font-medium uppercase tracking-[0.24em] text-dough-400/70">
                    {String(i + 1).padStart(2, '0')}
                  </p>
                  <h3
                    className={`mt-1 font-display text-xl font-bold md:text-2xl ${
                      active === i ? 'text-paper' : 'text-paper/50'
                    }`}
                  >
                    {s.title}
                  </h3>
                  {active === i && (
                    <motion.p
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.35, ease: SUPPLIFY_EASE }}
                      className="mt-3 max-w-md font-sans text-base leading-[1.75] text-dough-200/90"
                    >
                      {s.body}
                    </motion.p>
                  )}
                </motion.button>
              ))}
            </div>

            <div className="mt-8 flex gap-2" aria-hidden>
              {WALKTHROUGH_STEPS.map((_, i) => (
                <span
                  key={i}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    active === i ? 'w-6 bg-supplify-light' : 'w-1.5 bg-white/20'
                  }`}
                />
              ))}
            </div>
          </motion.div>

          <div className="relative flex min-h-[min(52vh,560px)] items-center justify-center px-2">
            <motion.div
              key={step.ui}
              className="w-full max-w-[min(100%,44rem)]"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: SUPPLIFY_EASE }}
            >
              <ProductScreenshot src={step.ui} alt={`Supplify — ${step.title}`} glow />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
