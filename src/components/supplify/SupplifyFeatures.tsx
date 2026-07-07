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

/** Accent logic: ordering/platform + delivery = sage; suppliers/pricing = caramel; finance = brown */
const FEATURE_ACCENTS: Record<string, { chip: string; icon: string; hover: string }> = {
  ordering: { chip: 'bg-supplify-soft text-supplify ring-supplify/20', icon: 'text-supplify', hover: 'hover:border-supplify/30' },
  fulfillment: { chip: 'bg-supplify-soft text-supplify ring-supplify/20', icon: 'text-supplify', hover: 'hover:border-supplify/30' },
  invoicing: { chip: 'bg-supplify-brown/10 text-supplify-brown ring-supplify-brown/20', icon: 'text-supplify-brown', hover: 'hover:border-supplify-brown/30' },
  reorder: { chip: 'bg-supplify-soft text-supplify ring-supplify/20', icon: 'text-supplify', hover: 'hover:border-supplify/30' },
  deals: { chip: 'bg-supplify-caramel/12 text-supplify-caramel ring-supplify-caramel/25', icon: 'text-supplify-caramel', hover: 'hover:border-supplify-caramel/35' },
  chat: { chip: 'bg-supplify-soft text-supplify ring-supplify/20', icon: 'text-supplify', hover: 'hover:border-supplify/30' },
  reservations: { chip: 'bg-supplify-soft text-supplify ring-supplify/20', icon: 'text-supplify', hover: 'hover:border-supplify/30' },
  inventory: { chip: 'bg-supplify-soft text-supplify ring-supplify/20', icon: 'text-supplify', hover: 'hover:border-supplify/30' },
  calendar: { chip: 'bg-supplify-soft text-supplify ring-supplify/20', icon: 'text-supplify', hover: 'hover:border-supplify/30' },
  staff: { chip: 'bg-supplify-soft text-supplify ring-supplify/20', icon: 'text-supplify', hover: 'hover:border-supplify/30' },
  reports: { chip: 'bg-supplify-soft text-supplify ring-supplify/20', icon: 'text-supplify', hover: 'hover:border-supplify/30' },
  receiving: { chip: 'bg-supplify-soft text-supplify ring-supplify/20', icon: 'text-supplify', hover: 'hover:border-supplify/30' },
  rfq: { chip: 'bg-supplify-caramel/12 text-supplify-caramel ring-supplify-caramel/25', icon: 'text-supplify-caramel', hover: 'hover:border-supplify-caramel/35' },
  'recipe-costing': { chip: 'bg-supplify-caramel/12 text-supplify-caramel ring-supplify-caramel/25', icon: 'text-supplify-caramel', hover: 'hover:border-supplify-caramel/35' },
}

const DEFAULT_ACCENT = FEATURE_ACCENTS.ordering

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
  const accent = FEATURE_ACCENTS[feature.id] ?? DEFAULT_ACCENT
  const hasUi = 'ui' in feature && feature.ui
  const badge = 'badge' in feature ? feature.badge : undefined

  return (
    <article
      className={`group flex h-full flex-col overflow-hidden rounded-3xl border border-supplify-border bg-white shadow-supplify-card transition-[border-color,transform,box-shadow] duration-300 hover:-translate-y-0.5 hover:shadow-supplify-glow ${accent.hover}`}
    >
      <div className={`flex flex-1 flex-col p-6 md:p-7 ${hasUi && feature.span !== 'compact' ? 'pb-4' : ''}`}>
        <div className="flex items-center gap-3">
          <span
            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ring-1 transition-[background-color] duration-300 ${accent.chip}`}
          >
            <Icon className={`h-[18px] w-[18px] ${accent.icon}`} strokeWidth={1.75} aria-hidden />
          </span>
          <div className="flex min-w-0 flex-wrap items-center gap-2">
            <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.26em] text-supplify-muted">
              {feature.category}
            </p>
            {badge ? (
              <span className="rounded-full bg-supplify-caramel/12 px-2 py-0.5 font-mono text-[9px] font-semibold uppercase tracking-[0.12em] text-supplify-caramel ring-1 ring-supplify-caramel/25">
                {badge}
              </span>
            ) : null}
          </div>
        </div>
        <h3 className="mt-4 font-display text-lg font-bold leading-snug text-supplify-ink md:text-xl">
          {feature.title}
        </h3>
        <p
          className={`mt-3 font-sans leading-[1.65] text-supplify-secondary ${
            feature.span === 'compact' ? 'text-sm' : 'text-sm md:text-base'
          }`}
        >
          {feature.body}
        </p>
      </div>

      {hasUi && (
        <div className={`mt-auto px-4 pb-4 pt-0 ${feature.span === 'compact' ? 'pt-2' : ''}`}>
          <ProductScreenshot
            src={feature.ui}
            alt={`Supplify — ${feature.title}`}
            fit="cover"
            glow={false}
            zoom
            compact={feature.span === 'compact'}
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
      className="relative border-t border-supplify-border bg-supplify-cream py-20 md:py-28"
    >
      <div className="relative mx-auto max-w-[90rem] px-6 md:px-10 lg:px-14">
        <Reveal>
          <SupplifyEyebrow>Platform depth</SupplifyEyebrow>
          <div className="mt-6 max-w-3xl">
            <SplitText
              as="h2"
              by="word"
              text="Ordering, delivery, invoices, recipe pricing — and much more."
              className="font-display text-display-md font-bold text-supplify-ink"
            />
          </div>
          <p className="mt-6 max-w-2xl font-sans text-base leading-[1.75] text-supplify-secondary md:text-lg">
            A practical system for everyday hospitality problems — not a generic ERP with modules
            nobody asked for.
          </p>
          <dl className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-3 sm:gap-x-10">
            {DEPTH_METRICS.map(({ value, label }) => (
              <div key={label} className="flex items-baseline gap-2">
                <dt className="font-display text-2xl font-bold tracking-[-0.02em] text-supplify-ink md:text-[1.75rem]">
                  {value}
                </dt>
                <dd className="max-w-[16ch] font-sans text-xs leading-snug text-supplify-muted md:text-[13px]">
                  {label}
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>

        <div className="mt-12 grid items-start gap-5 md:grid-flow-row-dense md:grid-cols-3">
          {PLATFORM_FEATURES.map((feature, i) => (
            <Reveal key={feature.id} delay={0.04 + i * 0.03} className={SPAN_CLASS[feature.span]}>
              <FeatureCard feature={feature} />
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.15} className="mt-10">
          <div className="relative overflow-hidden rounded-3xl border border-supplify-border bg-white px-6 py-8 shadow-supplify-card md:px-8 md:py-10">
            <div className="relative flex flex-wrap items-center gap-3">
              <p className="font-display text-lg font-bold text-supplify-ink md:text-xl">
                And much, much more.
              </p>
              <span className="supplify-pill supplify-pill-accent">
                +{PLATFORM_MORE.length} shipping today
              </span>
            </div>
            <p className="relative mt-2 max-w-2xl font-sans text-sm leading-relaxed text-supplify-secondary md:text-base">
              Every feature exists because operators on both sides told us what broke.
            </p>
            <ul className="relative mt-6 grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
              {PLATFORM_MORE.map((item) => (
                <li key={item}>
                  <span className="flex items-center gap-2.5 rounded-xl border border-supplify-border bg-supplify-cream/80 px-3 py-2.5 font-sans text-sm text-supplify-secondary transition-[border-color,background-color,color] duration-200 hover:border-supplify/25 hover:bg-supplify-soft hover:text-supplify-ink">
                    <span
                      className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-supplify-soft ring-1 ring-supplify/20"
                      aria-hidden
                    >
                      <Check className="h-2.5 w-2.5 text-supplify" strokeWidth={2.5} />
                    </span>
                    {item}
                  </span>
                </li>
              ))}
            </ul>
            <a
              href="#screenshots"
              className="group/cta relative mt-7 inline-flex cursor-pointer items-center gap-2 font-sans text-sm font-semibold text-supplify underline-offset-4 transition-colors duration-200 hover:text-supplify-brown"
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
