import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { home as h } from '../../theme/home'
import { Reveal } from '../Reveal'
import { SplitText } from '../motion/SplitText'

export function HomeIntro() {
  return (
    <section id="intro" className={`${h.sectionBorder} relative overflow-hidden bg-paper py-24 md:py-32`}>
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.4]"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 100% 0%, rgba(184,149,111,0.18) 0%, transparent 55%)',
        }}
        aria-hidden
      />

      <motion.div
        className={`${h.container} relative grid gap-14 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-end lg:gap-20`}
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-10%' }}
        transition={{ duration: 0.8, ease: h.ease }}
      >
        <motion.div>
          <p className={h.eyebrow}>Who we are</p>
          <SplitText
            as="h2"
            by="word"
            stagger={0.03}
            text="The hospitality tech partner operators actually call back."
            className={`${h.h2} mt-6 max-w-[20ch] text-balance`}
          />
          <Reveal delay={0.1} className="mt-8 max-w-xl">
            <p className={h.body}>
              Trusted across Lebanon, UAE, Malta, Greece, and KSA — we combine deep industry
              expertise with software that survives a Saturday rush. POS, ordering, supplier ops,
              and bespoke platforms when off-the-shelf refuses to bend.
            </p>
          </Reveal>
          <Reveal delay={0.18}>
            <motion.a
              href="#contact"
              className={`${h.btnPrimary} group mt-10`}
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              Contact us
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
            </motion.a>
          </Reveal>
        </motion.div>

        <div className="grid gap-4 sm:grid-cols-2">
          {[
            { value: '14+', label: 'Supplify modules', sub: 'One live platform' },
            { value: '65+', label: 'Businesses empowered', sub: 'Since 2024' },
            { value: '5', label: 'Active markets', sub: 'MENA & Europe' },
            { value: '0', label: 'WhatsApp ERPs', sub: 'Still required' },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              className="glass-card group cursor-default p-6 transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:shadow-editorial-lg"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-8%' }}
              transition={{ delay: i * 0.08, duration: 0.6, ease: h.ease }}
            >
              <p className="font-display text-[clamp(2.25rem,4vw,3rem)] font-bold leading-none tracking-[-0.04em] text-ink">
                {stat.value}
              </p>
              <p className="mt-2 font-sans text-sm font-semibold text-ink">{stat.label}</p>
              <p className="mt-1 font-sans text-xs text-ink-muted">{stat.sub}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
