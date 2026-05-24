import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { HOME_WARM_PACK } from '../../data/cookie-dough-homepage'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { home as h } from '../../theme/home'
import { SplitText } from '../motion/SplitText'
import { Reveal } from '../Reveal'

const BEFORE = [
  'WhatsApp at midnight: "did you see my order?"',
  'PDF price lists from 2022, printed, re-entered by hand',
  '"Should arrive tomorrow" (narrator: it didn\'t)',
  'Supplier confusion on both sides of every order',
] as const

const AFTER = [
  'Live catalogs and standing orders, no messages required',
  'Centralized procurement that actually centralizes',
  'Dispatch visibility end to end — tracked, confirmed, done',
  'In-app chat with full order context (not a WhatsApp group)',
] as const

export function HomeSupplifyTeaser() {
  const reduced = useReducedMotion()

  return (
    <section
      id="supplify"
      className="relative overflow-hidden border-t border-white/[0.08] bg-[#0f0620] py-20 text-paper md:py-28"
    >
      {/* Glowing top edge */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-supplify-light/25 to-transparent" aria-hidden />

      {/* Dot grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.5) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
        aria-hidden
      />

      {/* Ambient blobs */}
      <div className="pointer-events-none absolute inset-0 bg-supplify-mesh opacity-45" aria-hidden />
      <motion.div
        className="pointer-events-none absolute -left-20 top-1/4 h-64 w-64 rounded-full bg-supplify/30 blur-[100px]"
        animate={reduced ? undefined : { scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        aria-hidden
      />
      <motion.div
        className="pointer-events-none absolute right-[10%] top-[15%] h-48 w-48 rounded-full bg-[#7c3aed]/20 blur-[80px]"
        animate={reduced ? undefined : { scale: [1, 1.3, 1], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
        aria-hidden
      />
      <motion.div
        className="pointer-events-none absolute bottom-[15%] right-[20%] h-56 w-56 rounded-full bg-[#4c1d95]/25 blur-[90px]"
        animate={reduced ? undefined : { scale: [1, 1.25, 1], opacity: [0.25, 0.45, 0.25] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut', delay: 6 }}
        aria-hidden
      />

      <div className={`${h.container} relative z-10`}>
        <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.28em] text-supplify-light">
          Flagship product
        </p>
        <div className="mt-6 max-w-2xl">
          <SplitText
            as="h2"
            by="word"
            stagger={0.03}
            text="Supplify fixed the part nobody talks about."
            className="font-display text-[clamp(1.65rem,3.2vw,2.65rem)] font-bold leading-[1.08] tracking-[-0.025em] text-paper"
          />
        </div>
        <Reveal delay={0.1} className="mt-5 max-w-lg">
          <p className="font-sans text-[1rem] leading-[1.72] text-dough-200/90 md:text-[1.0625rem]">
            Procurement, reservations, fulfillment, dispatch, and chat — one live system for both
            sides of the market. Yes, it actually works. No, it&apos;s not WhatsApp.
          </p>
        </Reveal>

        {/* Operator image */}
        <Reveal delay={0.15} className="mt-12">
          <motion.div
            className="overflow-hidden rounded-2xl border border-white/[0.1] shadow-[0_0_60px_rgba(139,92,246,0.15)]"
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <img
              src={HOME_WARM_PACK.sceneOperator}
              alt="Restaurant operator in the flow — this is who we build for"
              width={1200}
              height={500}
              loading="lazy"
              decoding="async"
              className="block h-auto max-h-[340px] w-full object-cover object-center"
            />
          </motion.div>
        </Reveal>

        <div className="mt-14 grid gap-12 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, ease: h.ease }}
          >
            <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.28em] text-dough-400/80">
              Before
            </p>
            <ul className="mt-5 space-y-3">
              {BEFORE.map((item, i) => (
                <motion.li
                  key={item}
                  className="font-sans text-[0.9375rem] text-dough-300/65 line-through decoration-dough-500/40 md:text-base"
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.08 + i * 0.05, duration: 0.5, ease: h.ease }}
                >
                  {item}
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, delay: 0.08, ease: h.ease }}
          >
            <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.28em] text-supplify-light">
              After
            </p>
            <ul className="mt-5 space-y-3">
              {AFTER.map((item, i) => (
                <motion.li
                  key={item}
                  className="flex items-start gap-2 font-sans text-[0.9375rem] text-paper md:text-base"
                  initial={{ opacity: 0, x: 12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.12 + i * 0.05, duration: 0.5, ease: h.ease }}
                >
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-supplify-light" />
                  {item}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>

        <Reveal delay={0.15} className="mt-12">
          <motion.div whileHover={reduced ? undefined : { scale: 1.03 }} whileTap={reduced ? undefined : { scale: 0.98 }}>
            <Link
              to="/supplify"
              className="group inline-flex cursor-pointer items-center gap-2 rounded-full bg-paper px-7 py-3 font-sans text-sm font-semibold text-[#2d1654] shadow-supplify-glow transition-shadow duration-200 hover:shadow-[0_0_40px_rgba(139,92,246,0.35)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-supplify-light focus-visible:ring-offset-2 focus-visible:ring-offset-[#0f0620]"
            >
              Explore Supplify
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </motion.div>
        </Reveal>
      </div>
    </section>
  )
}
