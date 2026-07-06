import {
  ArrowRight,
  CalendarDays,
  Check,
  FileText,
  MessageSquare,
  Package,
  RefreshCw,
  Tag,
  Truck,
  UserCog,
  UtensilsCrossed,
  Warehouse,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { PLATFORM_FEATURES, PLATFORM_MORE } from '../../data/supplify-cursor-pack'
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
}

const SPAN_CLASS = {
  wide: 'md:col-span-2',
  normal: '',
  compact: '',
} as const

const DEPTH_METRICS = [
  { value: `${PLATFORM_FEATURES.length}`, label: 'core modules, live today' },
  { value: '2', label: 'sides of the market, one platform' },
  { value: '1', label: 'live thread, catalog to invoice' },
] as const

function FeatureCard({
  feature,
}: {
  feature: (typeof PLATFORM_FEATURES)[number]
}) {
  const Icon = FEATURE_ICONS[feature.id] ?? Package
  const hasUi = 'ui' in feature && feature.ui

  return (
    <article
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] transition-[border-color,background-color,transform,box-shadow] duration-300 hover:-translate-y-0.5 hover:border-supplify-light/25 hover:bg-white/[0.05] hover:shadow-[0_20px_50px_-20px_rgba(109,94,247,0.2)]"
    >
      <div className={`flex flex-1 flex-col p-6 ${hasUi && feature.span !== 'compact' ? 'pb-4' : ''}`}>
        <div className="flex items-center gap-3">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-supplify/[0.12] ring-1 ring-supplify-light/25 transition-[background-color,box-shadow] duration-300 group-hover:bg-supplify/20 group-hover:shadow-[0_0_22px_-6px_rgba(139,124,255,0.55)]">
            <Icon className="h-[18px] w-[18px] text-supplify-light" strokeWidth={1.75} aria-hidden />
          </span>
          <p className="font-sans text-[10px] font-medium uppercase tracking-[0.26em] text-supplify-light/65">
            {feature.category}
          </p>
        </div>
        <h3 className="mt-4 font-display text-lg font-bold leading-snug text-paper transition-colors duration-300 group-hover:text-supplify-light md:text-xl">
          {feature.title}
        </h3>
        <p
          className={`mt-3 font-sans leading-[1.65] text-dough-200/85 ${
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
            className="pointer-events-none"
          />
        </div>
      )}
    </article>
  )
}

export function SupplifyFeatures() {
  return (
    <section id="features" className="relative border-t border-white/[0.06] bg-[#0f0620] py-20 md:py-28">
      <div className="pointer-events-none absolute inset-0 opacity-[0.05] supplify-grain" aria-hidden />

      <div className="relative mx-auto max-w-[90rem] px-6 md:px-10 lg:px-14">
        <Reveal>
          <SupplifyEyebrow>Platform depth</SupplifyEyebrow>
          <div className="mt-6 max-w-3xl">
            <SplitText
              as="h2"
              by="word"
              text="Ordering, delivery, invoices, reorder — and much more."
              className="font-display text-display-md font-bold text-paper"
            />
          </div>
          <p className="mt-6 max-w-2xl font-sans text-base leading-[1.75] text-dough-200/90 md:text-lg">
            A practical system for everyday hospitality problems — not a generic ERP with modules
            nobody asked for. Built for restaurants, suppliers, kitchens, warehouses, and operators
            who need one live thread from catalog to closed invoice.
          </p>
          <dl className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-3 sm:gap-x-10">
            {DEPTH_METRICS.map(({ value, label }) => (
              <div key={label} className="flex items-baseline gap-2">
                <dt className="font-display text-2xl font-bold tracking-[-0.02em] text-paper md:text-[1.75rem]">
                  {value}
                </dt>
                <dd className="max-w-[16ch] font-sans text-xs leading-snug text-dough-300/70 md:text-[13px]">
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
          <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] px-6 py-8 md:px-8 md:py-10">
            <div
              className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-supplify/15 blur-[90px]"
              aria-hidden
            />
            <div className="relative flex flex-wrap items-center gap-3">
              <p className="font-display text-lg font-bold text-paper md:text-xl">
                And much, much more.
              </p>
              <span className="inline-flex items-center rounded-full bg-supplify/15 px-2.5 py-1 font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-supplify-light ring-1 ring-supplify-light/30">
                +{PLATFORM_MORE.length} shipping today
              </span>
            </div>
            <p className="relative mt-2 max-w-2xl font-sans text-sm leading-relaxed text-dough-300/80 md:text-base">
              Every feature exists because operators on both sides told us what broke. The list keeps
              growing — here&apos;s what else ships today.
            </p>
            <ul className="relative mt-6 grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
              {PLATFORM_MORE.map((item) => (
                <li key={item}>
                  <span className="flex items-center gap-2.5 rounded-lg border border-white/[0.06] bg-white/[0.02] px-3 py-2 font-sans text-sm text-dough-200/85 transition-[border-color,background-color,color] duration-200 hover:border-supplify-light/25 hover:bg-supplify/[0.06] hover:text-paper">
                    <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-supplify/20 ring-1 ring-supplify-light/30" aria-hidden>
                      <Check className="h-2.5 w-2.5 text-supplify-light" strokeWidth={2.5} />
                    </span>
                    {item}
                  </span>
                </li>
              ))}
            </ul>
            <a
              href="#screenshots"
              className="group/cta relative mt-7 inline-flex cursor-pointer items-center gap-2 font-sans text-sm font-semibold text-supplify-light underline-offset-4 transition-colors duration-200 hover:text-paper focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-supplify-light/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0f0620]"
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
