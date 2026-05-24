import { motion } from 'framer-motion'
import { HOME_WARM_PACK } from '../../data/cookie-dough-homepage'
import { home as h } from '../../theme/home'
import { Reveal } from '../Reveal'
import { SplitText } from '../motion/SplitText'
import { StatNumber } from '../StatNumber'
import { HomeImage } from './HomeImage'

const STATS = [
  {
    target: 843,
    unit: 'unread',
    label: 'Messages in the average "Suppliers 🚨" WhatsApp group',
    aside: 'estimated. could be worse. probably is.',
  },
  {
    target: 47,
    unit: 'tabs',
    label: 'In the spreadsheet running your daily operations',
    aside: 'one is titled "FINAL_v3_REAL_FINAL_USE_THIS_ONE.xlsx"',
  },
  {
    target: 0,
    unit: 'times',
    label: 'A generic ERP shipped a feature built for your actual workflow',
    aside: '"submit a feature request." still open.',
  },
] as const

const NUM_SIZE = 'font-display text-[clamp(2.5rem,5vw,3.75rem)] font-bold leading-none tracking-[-0.04em]'

export function HomeRealityCheck() {
  return (
    <section className={`${h.sectionBorder} relative overflow-hidden bg-paper-deep/50 py-20 md:py-28`}>
      {/* Spreadsheet grid texture */}
      <motion.div
        className="pointer-events-none absolute inset-0 opacity-[0.045]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(27,23,20,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(27,23,20,0.6) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
        aria-hidden
      />

      <div className={h.container}>
        {/* Flipped layout: image left, text right */}
        <div className="grid gap-12 lg:grid-cols-2 lg:items-start lg:gap-20">
          <div className="order-2 lg:order-1">
            <HomeImage
              src={HOME_WARM_PACK.realityCheck}
              alt="The spreadsheet chaos running restaurant operations"
              variant="polaroid"
            />
          </div>

          <Reveal className="order-1 lg:order-2 lg:pt-8">
            <span
              className="mb-4 block font-display text-[clamp(3rem,8vw,5rem)] font-bold leading-none tracking-[-0.04em] text-ink/[0.06]"
              aria-hidden
            >
              02
            </span>
            <p className={h.eyebrow}>The honest numbers</p>
            <div className="mt-5">
              <SplitText
                as="h2"
                by="word"
                stagger={0.03}
                text="The state of restaurant tech. (It's not great.)"
                className={`${h.h2} max-w-[26ch]`}
              />
            </div>
            <p className={`${h.body} mt-4 max-w-md`}>
              We&apos;re not here to judge. We&apos;re here because we&apos;ve seen your Excel files and
              we genuinely want to help.
            </p>
          </Reveal>
        </div>

        {/* Vertical ledger-style stats — not cards */}
        <div className="mt-16 border-t border-ink/10">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.unit}
              className="group grid gap-6 border-b border-ink/10 py-8 md:grid-cols-[minmax(0,200px)_1fr] md:items-baseline md:gap-12 lg:grid-cols-[minmax(0,240px)_1fr_auto]"
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-8%' }}
              transition={{ duration: 0.65, delay: i * 0.08, ease: h.ease }}
            >
              <div className="flex items-baseline gap-2.5">
                <StatNumber
                  target={stat.target}
                  sizeClassName={NUM_SIZE}
                  valueClassName="text-ink"
                  duration={1400}
                />
                <span className="font-sans text-[10px] font-semibold uppercase tracking-[0.2em] text-chip">
                  {stat.unit}
                </span>
              </div>
              <p className="font-sans text-[0.9375rem] leading-[1.5] text-ink-muted md:text-base">
                {stat.label}
              </p>
              <p className="font-serif text-[0.8125rem] italic text-ink/30 transition-colors group-hover:text-ink/50 md:text-right">
                {stat.aside}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
