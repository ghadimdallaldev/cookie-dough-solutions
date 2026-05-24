import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion'
import { ArrowRight, ChevronDown } from 'lucide-react'
import { useRef } from 'react'
import { HOME_WARM_PACK } from '../../data/cookie-dough-homepage'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { home as h } from '../../theme/home'
import { RotatingWords } from '../motion/RotatingWords'
import { Reveal } from '../Reveal'

const ROTATING = ['POS.', 'Ordering.', 'Operations.', 'Supplify.'] as const

export function HomeHero() {
  const heroRef = useRef<HTMLElement>(null)
  const reduced = useReducedMotion()

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springX = useSpring(mouseX, { stiffness: 40, damping: 20 })
  const springY = useSpring(mouseY, { stiffness: 40, damping: 20 })
  const spotlight = useMotionTemplate`radial-gradient(600px circle at ${springX}px ${springY}px, rgba(184,149,111,0.14), transparent 70%)`

  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const heroOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0])
  const heroScale = useTransform(scrollYProgress, [0, 0.85], [1, 0.96])
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 120])
  const imageY = useTransform(scrollYProgress, [0, 1], [0, -80])

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (reduced) return
    const rect = heroRef.current?.getBoundingClientRect()
    if (!rect) return
    mouseX.set(e.clientX - rect.left)
    mouseY.set(e.clientY - rect.top)
  }

  return (
    <section
      ref={heroRef}
      onMouseMove={handleMouseMove}
      className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden pb-12 pt-28 md:pb-16 md:pt-36"
    >
      {!reduced && (
        <motion.div
          className="pointer-events-none absolute inset-0 z-0"
          style={{ background: spotlight }}
          aria-hidden
        />
      )}

      <motion.div
        style={reduced ? undefined : { opacity: heroOpacity, scale: heroScale, y: heroY }}
        className="relative z-10 flex flex-1 flex-col"
      >
        <motion.div
          className={`${h.container} flex flex-1 flex-col justify-center pb-10 md:pb-16`}
        >
          <Reveal immediate delay={0.05}>
            <p className={h.eyebrow}>Cookie Dough · Solutions · Studio</p>
          </Reveal>

          <div className="mt-6 md:mt-8">
            <motion.p
              className="font-display text-[clamp(1.25rem,2.5vw,1.75rem)] font-semibold tracking-[-0.02em] text-ink-muted"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.08, ease: h.ease }}
            >
              We build
            </motion.p>
            <RotatingWords
              words={ROTATING}
              className="mt-1 block font-display text-[clamp(3rem,11vw,7.5rem)] font-extrabold leading-[0.92] tracking-[-0.045em] text-ink"
              ariaLabel="We build POS, Ordering, Operations, and Supplify"
            />
            <motion.p
              className="mt-4 max-w-xl font-serif text-[clamp(1.25rem,2.2vw,1.65rem)] italic leading-snug text-chip md:mt-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.35, ease: h.ease }}
            >
              The name&apos;s a long story. The software speaks for itself.
            </motion.p>
          </div>

          <Reveal immediate delay={0.45} className="mt-8 max-w-lg md:mt-10">
            <p className={h.body}>
              A fully customized hospitality stack — POS, ordering flows, supplier platforms, and
              bespoke builds when generic ERPs refuse to bend.
            </p>
          </Reveal>

          <Reveal immediate delay={0.55} className="mt-10 flex flex-wrap items-center gap-4">
            <motion.a
              href="#contact"
              data-cursor-hover
              className={`${h.btnPrimary} group`}
              whileHover={reduced ? undefined : { scale: 1.03, y: -2 }}
              whileTap={reduced ? undefined : { scale: 0.98 }}
            >
              Tell us the chaos
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
            </motion.a>
            <motion.a
              href="#capabilities"
              className={`${h.btnGhost} group glass-pill px-5 py-2.5`}
              whileHover={reduced ? undefined : { x: 4 }}
            >
              What we build
              <ArrowRight className="h-3.5 w-3.5 opacity-60" />
            </motion.a>
          </Reveal>
        </motion.div>

        {/* Cinematic hero visual — suppy-style full bleed bottom */}
        <motion.div
          style={reduced ? undefined : { y: imageY }}
          className={`${h.container} relative mt-auto`}
        >
          <motion.div
            className="glass-card relative overflow-hidden rounded-3xl shadow-ui-float"
            initial={reduced ? false : { opacity: 0, y: 40 }}
            animate={reduced ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2, ease: h.ease }}
          >
            <motion.div
              className="overflow-hidden"
              whileHover={reduced ? undefined : { scale: 1.01 }}
              transition={{ duration: 0.5, ease: h.ease }}
            >
              <img
                src={HOME_WARM_PACK.hero}
                alt="Cookie Dough Solutions — warm hospitality software studio"
                width={1400}
                height={780}
                loading="eager"
                decoding="async"
                className={`block h-auto max-h-[min(52vh,520px)] w-full object-cover object-center ${reduced ? '' : 'motion-safe:animate-ken-burns-subtle'}`}
              />
            </motion.div>
            <motion.div
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/25 via-transparent to-transparent"
              aria-hidden
            />
            <div className="absolute bottom-4 left-4 right-4 flex flex-wrap items-end justify-between gap-3 md:bottom-6 md:left-6 md:right-6">
              <span className="glass-pill rounded-full px-4 py-1.5 font-sans text-[11px] font-semibold uppercase tracking-[0.2em] text-paper">
                Built for the rush
              </span>
              <span className="font-sans text-xs text-paper/80">Not a bakery. Excellent software though.</span>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>

      {!reduced && (
        <motion.a
          href="#intro"
          className="absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 cursor-pointer flex-col items-center gap-1 text-chip/60 transition-colors hover:text-chip"
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
          aria-label="Scroll to content"
        >
          <span className="text-[10px] font-semibold uppercase tracking-[0.22em]">Scroll</span>
          <ChevronDown className="h-4 w-4" />
        </motion.a>
      )}
    </section>
  )
}
