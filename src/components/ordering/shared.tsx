import { motion } from 'framer-motion'
import { ArrowRight, Star } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { Magnetic } from '../motion/Magnetic'

export const ORDERING_EASE = [0.22, 1, 0.36, 1] as const

const FOCUS =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-oapp-gold/80 focus-visible:ring-offset-2 focus-visible:ring-offset-oapp-ink'

export const ORDERING_FLOW_STEPS = [
  'Menu',
  'Customize',
  'Cart',
  'Checkout',
  'Loyalty',
] as const

export function OrderingEyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-oapp-body text-[11px] font-bold uppercase tracking-[0.34em] text-oapp-gold-light">
      {children}
    </p>
  )
}

export function OrderingSectionHeader({
  eyebrow,
  title,
  titleAccent,
  description,
  className = '',
}: {
  eyebrow?: string
  title: string
  titleAccent?: string
  description?: string
  className?: string
}) {
  return (
    <div className={`max-w-2xl ${className}`}>
      {eyebrow ? <OrderingEyebrow>{eyebrow}</OrderingEyebrow> : null}
      <h2 className="mt-4 font-oapp-display text-[clamp(2rem,4.5vw,3.25rem)] font-bold leading-[1.08] tracking-[-0.02em] text-oapp-cream">
        {title}
        {titleAccent ? (
          <>
            <br />
            <span className="font-normal italic text-oapp-gold-light">{titleAccent}</span>
          </>
        ) : null}
      </h2>
      {description ? (
        <p className="mt-5 font-oapp-body text-base leading-[1.75] text-oapp-muted md:text-lg">{description}</p>
      ) : null}
    </div>
  )
}

export function OrderingPrimaryButton({
  href,
  children,
  external,
  className = '',
}: {
  href: string
  children: React.ReactNode
  external?: boolean
  className?: string
}) {
  const cls = `group inline-flex min-h-11 cursor-pointer items-center justify-center gap-2 rounded-full bg-oapp-gold px-8 py-3.5 font-oapp-body text-sm font-bold text-oapp-ink shadow-oapp-glow transition-[filter,box-shadow] duration-200 hover:brightness-110 hover:shadow-[0_0_56px_rgba(202,138,4,0.55)] active:scale-[0.98] ${FOCUS} ${className}`

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
        {children}
      </a>
    )
  }
  return (
    <a href={href} className={cls}>
      {children}
    </a>
  )
}

export function OrderingGhostButton({
  href,
  children,
  className = '',
}: {
  href: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <a
      href={href}
      className={`group inline-flex min-h-11 cursor-pointer items-center justify-center gap-2 rounded-full border border-oapp-cream/20 bg-oapp-surface/60 px-8 py-3.5 font-oapp-body text-sm font-semibold text-oapp-cream backdrop-blur-sm transition-[background-color,border-color] duration-200 hover:border-oapp-gold/45 hover:bg-oapp-elevated ${FOCUS} ${className}`}
    >
      {children}
    </a>
  )
}

export function OrderingBackLink() {
  return (
    <Link
      to="/"
      className={`inline-flex cursor-pointer items-center gap-2 font-oapp-body text-sm text-oapp-muted transition-colors duration-200 hover:text-oapp-cream ${FOCUS}`}
    >
      <span aria-hidden className="text-oapp-gold-light">
        ←
      </span>
      Cookie Dough Solutions
    </Link>
  )
}

export function OrderingStat({ value, label }: { value: string; label: string }) {
  return (
    <li className="group relative cursor-default overflow-hidden rounded-2xl border border-oapp-cream/10 bg-oapp-surface/80 px-5 py-5 transition-[border-color,background-color] duration-200 hover:border-oapp-gold/35 hover:bg-oapp-elevated sm:px-6 sm:py-6">
      <div
        className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-oapp-tomato/20 blur-2xl opacity-50 transition-opacity duration-300 group-hover:opacity-80"
        aria-hidden
      />
      <p className="relative font-oapp-display text-[clamp(1.85rem,4vw,2.85rem)] font-bold leading-none tracking-[-0.02em] text-oapp-gold-light">
        {value}
      </p>
      <p className="relative mt-2 font-oapp-body text-[10px] font-bold uppercase leading-snug tracking-[0.22em] text-oapp-muted">
        {label}
      </p>
    </li>
  )
}

export function OrderingFeatureCard({
  index,
  title,
  body,
}: {
  index: string
  title: string
  body: string
}) {
  return (
    <li className="group relative flex cursor-default flex-col overflow-hidden rounded-[1.35rem] border border-oapp-cream/10 bg-gradient-to-b from-oapp-surface/90 to-oapp-ink/40 p-6 transition-[border-color,transform] duration-200 hover:border-oapp-tomato/25 hover:-translate-y-0.5 md:p-7">
      <span
        className="font-oapp-body text-[11px] font-bold uppercase tracking-[0.3em] text-oapp-gold/60"
        aria-hidden
      >
        {index}
      </span>
      <h3 className="mt-4 font-oapp-display text-xl font-bold tracking-[-0.02em] text-oapp-cream md:text-2xl">
        {title}
      </h3>
      <p className="mt-3 flex-1 font-oapp-body text-sm leading-[1.7] text-oapp-muted">{body}</p>
      <span
        className="mt-6 inline-flex h-0.5 w-8 bg-oapp-tomato/70 transition-[width] duration-300 group-hover:w-16"
        aria-hidden
      />
    </li>
  )
}

export function OrderingTrustStrip() {
  return (
    <ul className="flex flex-wrap items-center gap-x-6 gap-y-2 font-oapp-body text-sm text-oapp-muted">
      <li className="flex cursor-default items-center gap-1.5">
        {[1, 2, 3, 4, 5].map((i) => (
          <Star
            key={i}
            className="h-3.5 w-3.5 fill-oapp-gold text-oapp-gold"
            strokeWidth={0}
            aria-hidden
          />
        ))}
        <span className="ml-1 font-semibold text-oapp-cream">Built for repeat guests</span>
      </li>
      <li className="hidden h-4 w-px bg-oapp-cream/15 sm:block" aria-hidden />
      <li>Mobile-first checkout</li>
      <li className="hidden h-4 w-px bg-oapp-cream/15 md:block" aria-hidden />
      <li>Loyalty at checkout</li>
    </ul>
  )
}

export function OrderingFlowStrip({ activeIndex = 0 }: { activeIndex?: number }) {
  return (
    <ol className="flex flex-wrap gap-2" aria-label="Order flow steps">
      {ORDERING_FLOW_STEPS.map((step, i) => (
        <li
          key={step}
          className={`ordering-flow-pill ${i === activeIndex ? 'is-active' : ''}`}
          aria-current={i === activeIndex ? 'step' : undefined}
        >
          <span className="mr-1.5 font-mono text-[10px] opacity-60">{String(i + 1).padStart(2, '0')}</span>
          {step}
        </li>
      ))}
    </ol>
  )
}

export function OrderingGlowOrb({
  className = '',
  delay = 0,
}: {
  className?: string
  delay?: number
}) {
  const reduced = useReducedMotion()
  return (
    <motion.div
      className={`pointer-events-none absolute rounded-full blur-[120px] ${className}`}
      animate={reduced ? undefined : { scale: [1, 1.1, 1], opacity: [0.15, 0.32, 0.15] }}
      transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay }}
      aria-hidden
    />
  )
}

export function OrderingMarqueeRule() {
  return (
    <div
      className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-oapp-gold/50 to-transparent"
      aria-hidden
    />
  )
}

export function OrderingCtaRow({
  demoUrl,
  primaryHref = '#contact',
  primaryLabel = 'Talk about your app',
}: {
  demoUrl?: string
  primaryHref?: string
  primaryLabel?: string
}) {
  return (
    <div className="flex flex-wrap items-center gap-4">
      {demoUrl ? (
        <Magnetic strength={0.22}>
          <OrderingPrimaryButton href={demoUrl} external>
            See a live example
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
          </OrderingPrimaryButton>
        </Magnetic>
      ) : null}
      <Magnetic strength={0.18}>
        <OrderingGhostButton href={primaryHref}>
          {primaryLabel}
          <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
        </OrderingGhostButton>
      </Magnetic>
    </div>
  )
}
