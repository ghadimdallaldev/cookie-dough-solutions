import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { HOME_WARM_PACK, type HomeWarmImageKey } from '../../data/cookie-dough-homepage'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { home as h } from '../../theme/home'
import { Reveal } from '../Reveal'
import { SplitText } from '../motion/SplitText'
import { HomeImage } from './HomeImage'

type Capability = {
  index: string
  category: string
  title: string
  lead: string
  body: string
  tags: readonly string[]
  imageKey: HomeWarmImageKey
  imageAlt: string
}

const CAPABILITIES: Capability[] = [
  {
    index: '01',
    category: 'Front of house',
    title: 'Customer mobile & web apps',
    lead: 'Branded ordering, counter flows, and guest experiences — built for rush mode.',
    body: "We don't just design screens; we craft seamless, scalable flows for modifiers, split checks, and staff who cannot afford a manual.",
    tags: ['UX/UI', 'Web & mobile native', 'Rush-mode POS', 'Modern design'],
    imageKey: 'pillarPOS',
    imageAlt: 'POS and ordering app built for hospitality rush mode',
  },
  {
    index: '02',
    category: 'Back of house',
    title: 'Fulfilment & operations',
    lead: 'Full-stack ops for suppliers, stock, and dispatch — without the 200-screen ERP.',
    body: 'When ops live in WhatsApp and Excel, we ship focused tools that connect only as deep as you need. PDA-friendly, operator-first.',
    tags: ['State-of-the-art', 'Seamless & easy', 'Mobile friendly', 'Ops excellence'],
    imageKey: 'pillarOps',
    imageAlt: 'Back of house operations — no ERP theater',
  },
  {
    index: '03',
    category: 'Bespoke',
    title: 'Insights & bespoke systems',
    lead: 'When the problem is uniquely yours, off-the-shelf is a polite lie.',
    body: 'Franchise logic, odd approvals, legacy hardware — we architect from scratch or extend Supplify with actionable data at every touchpoint.',
    tags: ['Sales & KPIs', 'Operations', 'Custom workflows', 'Business management'],
    imageKey: 'pillarBespoke',
    imageAlt: 'Bespoke hospitality software built from scratch',
  },
]

function CapabilityPanel({ cap, i }: { cap: Capability; i: number }) {
  const ref = useRef<HTMLElement>(null)
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const imageY = useTransform(scrollYProgress, [0, 1], [40, -40])
  const textY = useTransform(scrollYProgress, [0, 1], [24, -24])

  return (
    <article
      ref={ref}
      id={i === 0 ? 'capabilities' : undefined}
      className="relative border-t border-ink/[0.08] py-16 md:py-24"
    >
      <div className={`${h.container} grid items-center gap-12 lg:grid-cols-2 lg:gap-20`}>
        <motion.div style={reduced ? undefined : { y: textY }} className={i % 2 === 1 ? 'lg:order-2' : ''}>
          <motion.div
            className="glass-card p-8 md:p-10"
            initial={{ opacity: 0, x: i % 2 === 0 ? -24 : 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-12%' }}
            transition={{ duration: 0.75, ease: h.ease }}
          >
            <motion.div className="flex items-baseline gap-4">
              <span className="font-display text-[clamp(3rem,8vw,5rem)] font-bold leading-none tracking-[-0.04em] text-ink/[0.07]">
                {cap.index}
              </span>
              <p className={h.eyebrow}>{cap.category}</p>
            </motion.div>
            <h3 className={`${h.h3} mt-5 max-w-[22ch]`}>{cap.title}</h3>
            <p className={`${h.lead} mt-4 text-base md:text-[1.125rem]`}>{cap.lead}</p>
            <p className={`${h.body} mt-4 text-[0.9375rem]`}>{cap.body}</p>
            <div className="mt-8 flex flex-wrap gap-2">
              {cap.tags.map((tag, ti) => (
                <motion.span
                  key={tag}
                  className="rounded-full border border-ink/10 bg-paper/90 px-3 py-1 font-sans text-[11px] font-semibold uppercase tracking-[0.12em] text-ink-muted transition-colors duration-200 hover:border-chip/30 hover:text-ink"
                  initial={{ opacity: 0, scale: 0.92 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.15 + ti * 0.05, duration: 0.4, ease: h.ease }}
                >
                  {tag}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          style={reduced ? undefined : { y: imageY }}
          className={i % 2 === 1 ? 'lg:order-1' : ''}
        >
          <HomeImage
            src={HOME_WARM_PACK[cap.imageKey]}
            alt={cap.imageAlt}
            variant={i === 2 ? 'arch' : 'default'}
            animate={!reduced}
          />
        </motion.div>
      </div>
    </article>
  )
}

export function HomeCapabilities() {
  return (
    <section className="relative bg-paper-warm/50">
      <div className={`${h.container} pb-4 pt-20 md:pt-28`}>
        <Reveal className="max-w-2xl">
          <p className={h.eyebrow}>What we build</p>
          <SplitText
            as="h2"
            by="word"
            stagger={0.03}
            text="Three ways we end the chaos."
            className={`${h.h2} mt-5 max-w-[14ch]`}
          />
          <p className={`${h.body} mt-6 max-w-md`}>
            Organized systems for genuinely messy hospitality operations — without the ERP theater.
          </p>
        </Reveal>
      </div>

      {CAPABILITIES.map((cap, i) => (
        <CapabilityPanel key={cap.index} cap={cap} i={i} />
      ))}
    </section>
  )
}
