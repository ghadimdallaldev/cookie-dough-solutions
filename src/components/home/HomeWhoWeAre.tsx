import { useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { home as h } from '../../theme/home'
import { SplitText } from '../motion/SplitText'
import { Reveal } from '../Reveal'
import { HomeOpsBento } from './HomeOpsBento'

const PAINS = [
  { text: 'The POS crashed. During the rush. Obviously.', tag: 'every saturday' },
  { text: 'Your supplier price list is a PDF. From last year.', tag: 'printed. manually re-entered.' },
  { text: 'Ops runs via WhatsApp group "URGENT"', tag: '847 unread' },
  { text: 'Your inventory system is one person who just knows.', tag: 'what if they leave?' },
  { text: 'Your ERP: feature request #847293 — open since 2023.', tag: 'still pending' },
] as const

function PainCard({
  pain,
  index: i,
  className = '',
}: {
  pain: (typeof PAINS)[number]
  index: number
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const rotateX = useMotionValue(0)
  const rotateY = useMotionValue(0)
  const springRX = useSpring(rotateX, { stiffness: 200, damping: 26 })
  const springRY = useSpring(rotateY, { stiffness: 200, damping: 26 })

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 8
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 8
    rotateY.set(x)
    rotateX.set(-y)
  }

  const onMouseLeave = () => {
    rotateX.set(0)
    rotateY.set(0)
  }

  return (
    <motion.div
      ref={ref}
      className={`group relative overflow-hidden rounded-2xl border border-ink/[0.1] bg-paper/90 px-5 py-4 backdrop-blur-sm transform-gpu transition-[border-color,box-shadow] duration-200 hover:border-chip/25 hover:shadow-editorial ${className}`}
      style={{ rotateX: springRX, rotateY: springRY, transformPerspective: 800 }}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-8%' }}
      transition={{ duration: 0.6, delay: i * 0.06, ease: h.ease }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      <div className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-dough-400 to-chip opacity-0 transition-opacity group-hover:opacity-100" />
      <p className="font-serif text-[1rem] italic leading-snug text-ink-muted transition-colors group-hover:text-ink md:text-[1.0625rem]">
        {pain.text}
      </p>
      <p className="mt-1.5 font-sans text-[10px] font-semibold uppercase tracking-[0.18em] text-chip/50 transition-colors group-hover:text-chip/70">
        {pain.tag}
      </p>
    </motion.div>
  )
}

export function HomeWhoWeAre() {
  return (
    <section className={`${h.section} ${h.sectionBorder} relative overflow-x-clip`}>
      <span
        className="pointer-events-none absolute -left-4 top-16 select-none font-display text-[clamp(6rem,18vw,14rem)] font-bold leading-none tracking-[-0.04em] text-ink/[0.03] md:top-20"
        aria-hidden
      >
        01
      </span>

      <div
        className="pointer-events-none absolute inset-0 opacity-50"
        style={{
          background:
            'radial-gradient(ellipse 55% 45% at 85% 15%, rgba(184,149,111,0.12) 0%, transparent 60%)',
        }}
        aria-hidden
      />

      <div className={`${h.container} relative`}>
        <motion.div
          className="grid gap-10 lg:grid-cols-12 lg:items-start lg:gap-10 xl:gap-14"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: 0.75, ease: h.ease }}
        >
          <div className="relative z-10 lg:col-span-5 lg:pt-4">
            <p className={h.eyebrow}>Who we are</p>
            <div className="mt-6">
              <SplitText
                as="h2"
                by="word"
                stagger={0.035}
                text="We've seen your Excel file. We're here to help."
                className={`${h.h2} max-w-[18ch] text-balance`}
              />
            </div>
            <Reveal delay={0.12} className="mt-6 max-w-md">
              <p className={h.body}>
                Cookie Dough is a hospitality-native software studio — embedded in how restaurants
                and suppliers actually run. We ship POS and ordering apps, kill operational chaos,
                and build bespoke platforms when generic ERPs refuse to bend.
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <motion.a
                href="#contact"
                className={`${h.btnPrimary} group mt-10`}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                Contact us
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </motion.a>
            </Reveal>
          </div>

          <div className="relative lg:col-span-7">
            <HomeOpsBento />
          </div>
        </motion.div>

        <motion.div className="relative mt-16 md:mt-20">
          <p className={h.eyebrow}>Sound familiar?</p>
          <div className="mt-6 grid auto-rows-fr gap-3 sm:grid-cols-2 lg:grid-cols-12 lg:gap-4">
            <PainCard pain={PAINS[0]} index={0} className="lg:col-span-5" />
            <PainCard pain={PAINS[1]} index={1} className="lg:col-span-4" />
            <PainCard pain={PAINS[2]} index={2} className="lg:col-span-3" />
            <PainCard pain={PAINS[3]} index={3} className="lg:col-span-4 lg:col-start-2" />
            <PainCard pain={PAINS[4]} index={4} className="lg:col-span-5 lg:col-start-7" />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
