import { motion, useTransform } from 'framer-motion'
import { ArrowRight, CheckCircle2, Mail, PackageCheck, ShieldCheck, Sparkles, Truck } from 'lucide-react'
import { ParentCompanyBadge } from '../Logo'
import { SupplifyLogo } from '../SupplifyLogo'
import { Reveal } from '../Reveal'
import { ScrollIndicator } from '../ScrollIndicator'
import { Magnetic } from '../motion/Magnetic'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { usePointerParallax } from '../../hooks/usePointerParallax'
import { ProductScreenshot, SupplifyEyebrow, SupplifyPrimaryButton, SupplifySecondaryButton, SUPPLIFY_EASE } from './shared'
import { SUPPLIFY_PACK } from '../../data/supplify-cursor-pack'

const HERO_METRICS = [
  { value: '14+', label: 'modules live' },
  { value: '5', label: 'role-specific portals' },
  { value: '1', label: 'catalog to invoice thread' },
] as const

const SIGNALS = [
  { icon: Mail, label: 'Email + WhatsApp', value: 'Nothing missed' },
  { icon: PackageCheck, label: 'Fulfillment health', value: '98% line visibility' },
  { icon: Truck, label: 'Dispatch status', value: 'Driver assigned' },
] as const

const TRUST_STRIP = ['Procurement', 'Inventory', 'Supplier ops', 'Recipe costing', 'Invoices', 'Dispatch'] as const

export function SupplifyHero() {
  const reduced = useReducedMotion()
  const { x: px, y: py } = usePointerParallax()

  const clusterX = useTransform(px, (v) => v * 7)
  const clusterY = useTransform(py, (v) => v * 5)
  const frontX = useTransform(px, (v) => v * 20)
  const frontY = useTransform(py, (v) => v * 12)
  const backX = useTransform(px, (v) => v * -14)
  const backY = useTransform(py, (v) => v * -10)

  return (
    <section className="relative isolate min-h-svh overflow-hidden bg-supplify-hero">
      <div className="pointer-events-none absolute inset-0 bg-supplify-mesh" aria-hidden />
      <div className="supplify-shell-grid pointer-events-none absolute inset-0 opacity-80" aria-hidden />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-white/90 to-transparent" aria-hidden />
      <div className="pointer-events-none absolute -right-24 top-24 h-[34rem] w-[46rem] rotate-[-18deg] bg-supplify-soft/65 blur-3xl" aria-hidden />
      <div className="pointer-events-none absolute -left-28 bottom-16 h-72 w-[38rem] rotate-12 bg-supplify-caramel/12 blur-3xl" aria-hidden />

      <div className="relative mx-auto grid min-h-svh max-w-[92rem] items-end gap-12 px-6 pb-16 pt-28 md:px-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-16 lg:px-14 lg:pb-24 lg:pt-32">
        <div className="max-w-3xl lg:max-w-none">
          <Reveal immediate delay={0.04}>
            <div className="flex flex-wrap items-center gap-4">
              <SupplifyLogo size={66} />
              <div>
                <SupplifyEyebrow>Supplify by Cookie Dough</SupplifyEyebrow>
                <p className="mt-2 inline-flex items-center gap-2 rounded-full border border-supplify-border bg-white/80 px-3 py-1 font-sans text-xs font-semibold text-supplify-secondary shadow-supplify-card backdrop-blur">
                  <Sparkles className="h-3.5 w-3.5 text-supplify-caramel" aria-hidden />
                  Built for multi-branch hospitality teams
                </p>
              </div>
            </div>
          </Reveal>

          <motion.div className="mt-8 space-y-1 md:space-y-2">
            {(['The restaurant supply', 'operating system.'] as const).map((line, i) => (
              <motion.div key={line} className="overflow-hidden">
                <motion.h1
                  className={`text-balance font-display text-[clamp(3.2rem,7vw,6.8rem)] font-bold leading-[0.94] tracking-normal ${
                    i === 1 ? 'supplify-highlight-text' : 'text-supplify-ink'
                  }`}
                  initial={{ y: '105%' }}
                  animate={{ y: 0 }}
                  transition={{ duration: 1, delay: 0.12 + i * 0.1, ease: SUPPLIFY_EASE }}
                >
                  {line}
                </motion.h1>
              </motion.div>
            ))}
          </motion.div>

          <Reveal immediate delay={0.42} className="mt-8 max-w-2xl">
            <p className="font-sans text-lg leading-[1.75] text-supplify-secondary md:text-xl">
              Supplify connects restaurants, suppliers, kitchens, warehouses, and drivers in one calm procurement flow, from live catalogs and approvals to delivery, invoices, and recipe margin.
            </p>
          </Reveal>

          <Reveal immediate delay={0.52} className="mt-8 flex flex-wrap gap-2.5">
            {(['Live catalogs', 'Orders and requisitions', 'Email + WhatsApp alerts', 'AI-ready invoices'] as const).map((badge, i) => (
              <span key={badge} className={`supplify-pill ${i === 0 || i === 3 ? 'supplify-pill-accent' : ''}`}>
                {badge}
              </span>
            ))}
          </Reveal>

          <Reveal immediate delay={0.62} className="mt-10 flex flex-wrap items-center gap-4">
            <Magnetic strength={0.2}>
              <SupplifyPrimaryButton href="#contact">
                Request a walkthrough
                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
              </SupplifyPrimaryButton>
            </Magnetic>
            <SupplifySecondaryButton href="#screenshots">Explore product UI</SupplifySecondaryButton>
          </Reveal>

          <Reveal immediate delay={0.76} className="mt-10 grid max-w-2xl grid-cols-3 overflow-hidden rounded-2xl border border-supplify-border bg-white/75 shadow-supplify-card backdrop-blur">
            {HERO_METRICS.map((metric) => (
              <div key={metric.label} className="border-r border-supplify-border px-4 py-4 last:border-r-0 md:px-5">
                <p className="font-display text-2xl font-bold text-supplify-ink md:text-3xl">{metric.value}</p>
                <p className="mt-1 font-sans text-[11px] font-semibold uppercase tracking-[0.12em] text-supplify-secondary md:text-xs">
                  {metric.label}
                </p>
              </div>
            ))}
          </Reveal>

          <Reveal immediate delay={0.84} className="mt-8">
            <ParentCompanyBadge />
          </Reveal>
        </div>

        <motion.div
          className="relative mt-6 lg:mt-0"
          initial={{ opacity: 0, y: 34 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.95, delay: 0.42, ease: SUPPLIFY_EASE }}
        >
          <motion.div
            className="supplify-command-surface relative mx-auto max-w-[40rem] rounded-[2rem] border border-supplify-border p-3 md:p-4"
            style={reduced ? undefined : { x: clusterX, y: clusterY }}
          >
            <div className="mb-3 flex items-center justify-between gap-3 px-2">
              <div className="flex items-center gap-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-supplify text-white shadow-supplify-glow">
                  <ShieldCheck className="h-4 w-4" aria-hidden />
                </span>
                <div>
                  <p className="font-sans text-sm font-bold text-supplify-ink">Operations cockpit</p>
                  <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-supplify-muted">Live across both sides</p>
                </div>
              </div>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-supplify/20 bg-supplify-soft px-3 py-1 font-sans text-xs font-semibold text-supplify">
                <span className="h-1.5 w-1.5 rounded-full bg-supplify live-pulse-dot" aria-hidden />
                Online
              </span>
            </div>

            <ProductScreenshot
              src={SUPPLIFY_PACK.hero.primaryUI}
              alt="Supplify restaurant dashboard, live procurement overview"
              glow={false}
              priority
              zoom
              className="relative z-10"
            />

            <motion.div
              className="absolute -bottom-5 -left-3 z-20 hidden w-[50%] md:block lg:-left-7"
              style={reduced ? undefined : { x: frontX, y: frontY }}
            >
              <ProductScreenshot src={SUPPLIFY_PACK.hero.secondaryUI[0]} alt="Supplify live supplier catalog" glow={false} zoom />
            </motion.div>
            <motion.div
              className="absolute -right-3 -top-5 z-20 hidden w-[42%] md:block lg:-right-7"
              style={reduced ? undefined : { x: backX, y: backY }}
            >
              <ProductScreenshot src={SUPPLIFY_PACK.hero.secondaryUI[1]} alt="Supplify restaurant orders view" glow={false} zoom />
            </motion.div>
          </motion.div>

          <div className="pointer-events-none absolute -bottom-10 left-4 right-4 z-30 hidden grid-cols-3 gap-3 md:grid">
            {SIGNALS.map((signal, i) => (
              <motion.div
                key={signal.label}
                className="supplify-signal-card rounded-2xl border border-supplify-border px-4 py-3 backdrop-blur"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, delay: 0.72 + i * 0.1, ease: SUPPLIFY_EASE }}
              >
                <signal.icon className="h-4 w-4 text-supplify" aria-hidden />
                <p className="mt-2 font-sans text-[11px] font-semibold uppercase tracking-[0.12em] text-supplify-muted">{signal.label}</p>
                <p className="mt-1 truncate font-sans text-sm font-bold text-supplify-ink">{signal.value}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      <Reveal immediate delay={0.9} className="relative mx-auto max-w-[92rem] px-6 pb-12 md:px-10 lg:px-14">
        <div className="marquee-edge-fade flex overflow-hidden rounded-2xl border border-supplify-border bg-white/70 py-3 shadow-supplify-card backdrop-blur">
          <div className="flex min-w-full animate-marquee items-center gap-8 whitespace-nowrap px-4">
            {[...TRUST_STRIP, ...TRUST_STRIP].map((item, i) => (
              <span key={`${item}-${i}`} className="inline-flex items-center gap-2 font-sans text-xs font-bold uppercase tracking-[0.14em] text-supplify-secondary">
                <CheckCircle2 className="h-4 w-4 text-supplify" aria-hidden />
                {item}
              </span>
            ))}
          </div>
          <div className="flex min-w-full animate-marquee items-center gap-8 whitespace-nowrap px-4" aria-hidden>
            {[...TRUST_STRIP, ...TRUST_STRIP].map((item, i) => (
              <span key={`${item}-copy-${i}`} className="inline-flex items-center gap-2 font-sans text-xs font-bold uppercase tracking-[0.14em] text-supplify-secondary">
                <CheckCircle2 className="h-4 w-4 text-supplify" aria-hidden />
                {item}
              </span>
            ))}
          </div>
        </div>
      </Reveal>

      <ScrollIndicator light />
    </section>
  )
}
