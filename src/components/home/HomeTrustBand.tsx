import { motion } from 'framer-motion'
import { Building2, Globe2, Layers, Users } from 'lucide-react'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { home as h } from '../../theme/home'
import { Reveal } from '../Reveal'

const TRUST_STATS = [
  { icon: Layers, label: '14+ Supplify modules', detail: 'One live platform' },
  { icon: Users, label: '2-sided market', detail: 'Restaurants & suppliers' },
  { icon: Building2, label: 'Hospitality-native', detail: 'Since 2024' },
  { icon: Globe2, label: '5 markets', detail: 'Lebanon · UAE · Malta · Greece · KSA' },
] as const

export function HomeTrustBand() {
  const reduced = useReducedMotion()

  return (
    <section
      className="relative z-[1] border-b border-ink/[0.07] bg-paper/85 py-8 backdrop-blur-md md:py-10"
      aria-label="Trust and reach"
    >
      <div className={h.container}>
        <Reveal>
          <p className="text-center font-sans text-[10px] font-semibold uppercase tracking-[0.24em] text-chip/80">
            Built for operators who cannot wait on feature request #847293
          </p>
        </Reveal>

        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4 lg:gap-4">
          {TRUST_STATS.map((stat, i) => {
            const Icon = stat.icon
            return (
              <motion.div
                key={stat.label}
                className="group flex cursor-default items-start gap-3 rounded-xl border border-ink/[0.08] bg-paper/90 px-4 py-3.5 shadow-sm transition-[border-color,box-shadow] duration-200 hover:border-chip/30 hover:shadow-editorial"
                initial={reduced ? false : { opacity: 0, y: 12 }}
                whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-5%' }}
                transition={{ delay: i * 0.06, duration: 0.5, ease: h.ease }}
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-dough-200/60 text-chip transition-colors duration-200 group-hover:bg-dough-300/70">
                  <Icon className="h-4 w-4" aria-hidden />
                </span>
                <div>
                  <p className="font-sans text-sm font-semibold text-ink">{stat.label}</p>
                  <p className="mt-0.5 font-sans text-xs text-ink-muted">{stat.detail}</p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
