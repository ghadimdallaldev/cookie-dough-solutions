import { motion } from 'framer-motion'
import {
  Activity,
  Ban,
  Package,
  Smartphone,
  TrendingUp,
  UtensilsCrossed,
} from 'lucide-react'
import { HOME_WARM_PACK } from '../../data/cookie-dough-homepage'
import { HOME_OPS_BENTO } from '../../data/homepage-copy'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { home as h } from '../../theme/home'

function BentoShell({
  className = '',
  children,
  delay = 0,
}: {
  className?: string
  children: React.ReactNode
  delay?: number
}) {
  const reduced = useReducedMotion()

  return (
    <motion.div
      className={`glass-card ring-gradient surface-glow overflow-hidden p-4 md:p-5 ${className}`}
      initial={reduced ? false : { opacity: 0, y: 20, scale: 0.98 }}
      whileInView={reduced ? undefined : { opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-8%' }}
      transition={{ duration: 0.55, delay, ease: h.ease }}
      whileHover={reduced ? undefined : { scale: 1.02, y: -2 }}
    >
      {children}
    </motion.div>
  )
}

function LiveOrdersTile() {
  const reduced = useReducedMotion()

  return (
    <BentoShell className="col-span-2 row-span-2 flex flex-col" delay={0.05}>
      <motion.div className="mb-3 flex items-center justify-between">
        <span className={h.eyebrow}>{HOME_OPS_BENTO.dailyOps.eyebrow}</span>
        <span className="flex items-center gap-1.5 font-sans text-[10px] font-semibold uppercase tracking-wider text-emerald-700">
          <span className={`h-1.5 w-1.5 rounded-full bg-emerald-500 ${reduced ? '' : 'live-pulse-dot'}`} />
          {HOME_OPS_BENTO.dailyOps.statusBadge}
        </span>
      </motion.div>
      <div className="flex flex-1 flex-col gap-2">
        {HOME_OPS_BENTO.dailyOps.rows.map((order, i) => (
          <motion.div
            key={order.title}
            className="flex items-center justify-between rounded-xl border border-ink/[0.08] bg-paper/95 px-3 py-2.5"
            initial={reduced ? false : { opacity: 0, x: -12 }}
            whileInView={reduced ? undefined : { opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 + i * 0.12, duration: 0.45, ease: h.ease }}
          >
            <motion.div className="min-w-0">
              <p className="font-sans text-xs font-semibold text-ink">{order.title}</p>
              <p className="truncate font-sans text-[11px] text-ink-muted">{order.subtitle}</p>
            </motion.div>
            <span className="shrink-0 rounded-full bg-dough-200/80 px-2 py-0.5 font-sans text-[10px] font-bold uppercase tracking-wide text-chip">
              {order.status}
            </span>
          </motion.div>
        ))}
      </div>
      {!reduced && (
        <motion.div
          className="mt-3 h-1 overflow-hidden rounded-full bg-ink/[0.06]"
          aria-hidden
        >
          <motion.div
            className="h-full w-1/3 rounded-full bg-gradient-to-r from-dough-400 to-chip"
            animate={{ x: ['-100%', '320%'] }}
            transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.div>
      )}
    </BentoShell>
  )
}

function MetricTile() {
  const reduced = useReducedMotion()

  return (
    <BentoShell className="col-span-1" delay={0.12}>
      <TrendingUp className="h-4 w-4 text-chip" aria-hidden />
      <p className="mt-3 font-display text-3xl font-bold tracking-tight text-ink">{HOME_OPS_BENTO.metric.value}</p>
      <p className="mt-1 font-sans text-[11px] leading-snug text-ink-muted">
        {HOME_OPS_BENTO.metric.label}
      </p>
      {!reduced && (
        <div className="mt-3 flex items-end gap-1" aria-hidden>
          {[40, 65, 45, 80, 55, 90].map((bar, i) => (
            <motion.div
              key={i}
              className="w-2 rounded-sm bg-dough-400/70"
              initial={{ height: 8 }}
              animate={{ height: bar * 0.32 }}
              transition={{ delay: 0.3 + i * 0.08, duration: 0.5, ease: h.ease }}
            />
          ))}
        </div>
      )}
    </BentoShell>
  )
}

function SyncTile() {
  const reduced = useReducedMotion()

  return (
    <BentoShell className="col-span-1" delay={0.16}>
      <Activity className="h-4 w-4 text-chip" aria-hidden />
      <p className="mt-3 font-sans text-sm font-semibold text-ink">{HOME_OPS_BENTO.sync.title}</p>
      <p className="mt-1 font-sans text-[11px] text-ink-muted">{HOME_OPS_BENTO.sync.subtitle}</p>
      <div className="relative mx-auto mt-4 flex h-16 w-16 items-center justify-center">
        <svg viewBox="0 0 64 64" className="h-full w-full -rotate-90" aria-hidden>
          <circle cx="32" cy="32" r="26" fill="none" stroke="rgba(27,23,20,0.08)" strokeWidth="4" />
          {!reduced && (
            <motion.circle
              cx="32"
              cy="32"
              r="26"
              fill="none"
              stroke="#6B4E3D"
              strokeWidth="4"
              strokeLinecap="round"
              strokeDasharray="163"
              initial={{ strokeDashoffset: 163 }}
              whileInView={{ strokeDashoffset: 24 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: 0.25, ease: h.ease }}
            />
          )}
        </svg>
        <Package className="absolute h-5 w-5 text-chip" aria-hidden />
      </div>
    </BentoShell>
  )
}

function StackTile() {
  const reduced = useReducedMotion()

  return (
    <BentoShell className="col-span-2" delay={0.2}>
      <p className={h.eyebrow}>{HOME_OPS_BENTO.stack.eyebrow}</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {HOME_OPS_BENTO.stack.pills.map((label, i) => (
          <motion.span
            key={label}
            className="inline-flex items-center gap-1.5 rounded-full border border-ink/10 bg-paper px-3 py-1.5 font-sans text-xs font-semibold text-ink-muted"
            initial={reduced ? false : { opacity: 0, y: 8 }}
            whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.25 + i * 0.07, duration: 0.4, ease: h.ease }}
            whileHover={reduced ? undefined : { y: -2, borderColor: 'rgba(107,78,61,0.35)', color: '#1B1714' }}
          >
            <UtensilsCrossed className="h-3 w-3 text-dough-500" aria-hidden />
            {label}
          </motion.span>
        ))}
      </div>
    </BentoShell>
  )
}

function ChaosVsCalmTile() {
  const reduced = useReducedMotion()

  return (
    <BentoShell className="col-span-2" delay={0.24}>
      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-xl border border-red-200/80 bg-red-50/80 p-3">
          <Ban className="h-4 w-4 text-red-600/70" aria-hidden />
          <p className="mt-2 font-sans text-[11px] font-semibold text-red-900/80">Before</p>
          <p className="mt-1 font-serif text-xs italic text-red-800/70">{HOME_OPS_BENTO.beforeAfter.before}</p>
        </div>
        <div className="rounded-xl border border-emerald-200/80 bg-emerald-50/70 p-3">
          <Smartphone className="h-4 w-4 text-emerald-700/80" aria-hidden />
          <p className="mt-2 font-sans text-[11px] font-semibold text-emerald-900/90">After</p>
          <p className="mt-1 font-serif text-xs italic text-emerald-800/80">{HOME_OPS_BENTO.beforeAfter.after}</p>
        </div>
      </div>
      {!reduced && (
        <motion.div
          className="mt-3 flex justify-center"
          animate={{ x: [0, 6, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          aria-hidden
        >
          <span className="font-sans text-[10px] font-bold uppercase tracking-[0.2em] text-chip/60">
            →
          </span>
        </motion.div>
      )}
    </BentoShell>
  )
}

function OperatorTile() {
  const reduced = useReducedMotion()

  return (
    <BentoShell className="col-span-2 overflow-hidden p-0" delay={0.28}>
      <div className="relative h-[120px] overflow-hidden md:h-[132px]">
        <img
          src={HOME_WARM_PACK.sceneOperator}
          alt={HOME_OPS_BENTO.operator.imageAlt}
          width={480}
          height={132}
          loading="lazy"
          decoding="async"
          className={`h-full w-full object-cover object-[center_30%] ${reduced ? '' : 'motion-safe:animate-ken-burns-subtle'}`}
        />
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-ink/50 via-ink/10 to-transparent"
          aria-hidden
        />
        <p className="absolute bottom-3 left-4 font-sans text-[11px] font-semibold uppercase tracking-[0.18em] text-paper">
          {HOME_OPS_BENTO.operator.caption}
        </p>
      </div>
    </BentoShell>
  )
}

export function HomeOpsBento() {
  return (
    <div
      className="grid auto-rows-[minmax(100px,auto)] grid-cols-2 gap-3 md:grid-cols-4 md:gap-4"
      aria-label="Hospitality operations showcase"
    >
      <LiveOrdersTile />
      <MetricTile />
      <SyncTile />
      <StackTile />
      <ChaosVsCalmTile />
      <OperatorTile />
    </div>
  )
}
