import {
  ArrowRight,
  BarChart3,
  CalendarDays,
  Check,
  ClipboardCheck,
  FileText,
  MessageSquare,
  Package,
  RefreshCw,
  Scale,
  Tag,
  Truck,
  UserCog,
  UtensilsCrossed,
  Warehouse,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { DEPTH_METRICS, PLATFORM_FEATURES, PLATFORM_MORE } from '../../data/supplify-cursor-pack'
import { Reveal } from '../Reveal'
import { SplitText } from '../motion/SplitText'
import { ProductScreenshot, SupplifyEyebrow } from './shared'

const FEATURE_ICONS: Record<string, LucideIcon> = {
  ordering: Package,
  fulfillment: Truck,
  invoicing: FileText,
  reorder: RefreshCw,
  deals: Tag,
  chat: MessageSquare,
  reservations: UtensilsCrossed,
  calendar: CalendarDays,
  inventory: Warehouse,
  staff: UserCog,
  reports: BarChart3,
  receiving: ClipboardCheck,
  rfq: Scale,
  'recipe-costing': Scale,
}

const SPAN_CLASS = {
  wide: 'md:col-span-2',
  normal: '',
  compact: 'md:col-span-1',
} as const

function FeatureCard({
  feature,
}: {
  feature: (typeof PLATFORM_FEATURES)[number]
}) {
  const Icon = FEATURE_ICONS[feature.id] ?? Package
  const hasUi = 'ui' in feature && feature.ui
  const badge = 'badge' in feature ? feature.badge : undefined

  return (
    <article
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-ink/8 bg-white shadow-sm transition-[border-color,background-color,transform,box-shadow] duration-300 hover:-translate-y-0.5 hover:border-supplify/25 hover:shadow-[0_20px_50px_-20px_rgba(109,94,247,0.15)]"
    >
      <div className={`flex flex-1 flex-col p-6 ${hasUi && feature.span !== 'compact' ? 'pb-4' : ''}`}>
        <div className="flex items-center gap-3">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-supplify/10 ring-1 ring-supplify/20 transition-[background-color,box-shadow] duration-300 group-hover:bg-supplify/15 group-hover:shadow-[0_0_22px_-6px_rgba(109,94,247,0.35)]">
            <Icon className="h-[18px] w-[18px] text-supplify" strokeWidth={1.75} aria-hidden />
          </span>
          <div className="flex min-w-0 flex-wrap items-center gap-2">
            <p className="font-sans text-[10px] font-medium uppercase tracking-[0.26em] text-supplify/70">
              {feature.category}
            </p>
            {badge ? (
              <span className="rounded-full bg-supplify/10 px-2 py-0.5 font-mono text-[9px] font-semibold uppercase tracking-[0.12em] text-supplify ring-1 ring-supplify/25">
                {badge}
              </span>
            ) : null}
          </div>
        </div>
        <h3 className="mt-4 font-display text-lg font-bold leading-snug text-supplify-ink transition-colors duration-300 group-hover:text-supplify md:text-xl">
          {feature.title}
        </h3>
        <p
          className={`mt-3 font-sans leading-[1.65] text-ink-muted ${
            feature.span === 'compact' ? 'text-sm' : 'text-sm md:text-base'
          }`}
        >
          {feature.body}
        </p>
      </div>

      {hasUi && (
        <div
          className={`mt-auto px-4 pb-4 pt-0 ${
            feature.span === 'compact' ? 'pt-2' : ''
          }`}
        >
          <ProductScreenshot
            src={feature.ui}
            alt={`Supplify — ${feature.title}`}
            fit="cover"
            glow={false}
            zoom
            compact={feature.span === 'compact'}
            theme="light"
            className="pointer-events-none"
          />
        </div>
      )}
    </article>
  )
}

export function SupplifyFeatures() {
  return (
    <section
      data-theme="light"
      className="relative border-t border-ink/8 bg-supplify-mist py-20 md:py-28"
    >
      <div className="pointer-events-none absolute inset-0 section-noise" aria-hidden />

      <div className="relative mx-auto max-w-[90rem] px-6 md:px-10 lg:px-14">
        <Reveal>
          <SupplifyEyebrow theme="light">Platform depth</SupplifyEyebrow>
          <div className="mt-6 max-w-3xl">
            <SplitText
              as="h2"
              by="word"
              text="Ordering, delivery, invoices, reorder — and much more."
              className="font-display text-display-md font-bold text-supplify-ink"
            />
          </div>
          <p className="mt-6 max-w-2xl font-sans text-base leading-[1.75] text-ink-muted md:text-lg">
            A practical system for everyday hospitality problems — not a generic ERP with modules
            nobody asked for. Built for restaurants, suppliers, kitchens, warehouses, and operators
            who need one live thread from catalog to closed invoice.
          </p>
          <dl className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-3 sm:gap-x-10">
            {DEPTH_METRICS.map(({ value, label }) => (
              <div key={label} className="flex items-baseline gap-2">
                <dt className="font-display text-2xl font-bold tracking-[-0.02em] text-supplify-ink md:text-[1.75rem]">
                  {value}
                </dt>
                <dd className="max-w-[16ch] font-sans text-xs leading-snug text-ink-muted/80 md:text-[13px]">
                  {label}
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>

        <div className="mt-12 grid items-start gap-4 md:grid-flow-row-dense md:grid-cols-3 md:gap-5">
          {PLATFORM_FEATURES.map((feature, i) => (
            <Reveal key={feature.id} delay={0.04 + i * 0.03} className={SPAN_CLASS[feature.span]}>
              <FeatureCard feature={feature} />
            </Reveal>
          ))}
        </div>

        {/* And much more */}
        <Reveal delay={0.15} className="mt-10">
          <div className="relative overflow-hidden rounded-2xl border border-ink/8 bg-white px-6 py-8 shadow-sm md:px-8 md:py-10">
            <div
              className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-supplify/10 blur-[90px]"
              aria-hidden
            />
            <div className="relative flex flex-wrap items-center gap-3">
              <p className="font-display text-lg font-bold text-supplify-ink md:text-xl">
                And much, much more.
              </p>
              <span className="inline-flex items-center rounded-full bg-supplify/10 px-2.5 py-1 font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-supplify ring-1 ring-supplify/25">
                +{PLATFORM_MORE.length} shipping today
              </span>
            </div>
            <p className="relative mt-2 max-w-2xl font-sans text-sm leading-relaxed text-ink-muted md:text-base">
              Every feature exists because operators on both sides told us what broke. The list keeps
              growing — here&apos;s what else ships today.
            </p>
            <ul className="relative mt-6 grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
              {PLATFORM_MORE.map((item) => (
                <li key={item}>
                  <span className="flex items-center gap-2.5 rounded-lg border border-ink/6 bg-supplify-cream/60 px-3 py-2 font-sans text-sm text-ink-muted transition-[border-color,background-color,color] duration-200 hover:border-supplify/20 hover:bg-supplify/5 hover:text-supplify-ink">
                    <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-supplify/15 ring-1 ring-supplify/25" aria-hidden>
                      <Check className="h-2.5 w-2.5 text-supplify" strokeWidth={2.5} />
                    </span>
                    {item}
                  </span>
                </li>
              ))}
            </ul>
            <a
              href="#screenshots"
              className="group/cta relative mt-7 inline-flex cursor-pointer items-center gap-2 font-sans text-sm font-semibold text-supplify underline-offset-4 transition-colors duration-200 hover:text-supplify-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-supplify/50 focus-visible:ring-offset-2 focus-visible:ring-offset-supplify-mist"
            >
              See every screen in the product tour
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover/cta:translate-x-0.5" />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
