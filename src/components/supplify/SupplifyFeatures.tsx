import {
  Calendar,
  MessageSquare,
  Package,
  Tag,
  Truck,
  UserCog,
  Warehouse,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { PLATFORM_FEATURES, PLATFORM_MORE } from '../../data/supplify-cursor-pack'
import { Reveal } from '../Reveal'
import { SplitText } from '../motion/SplitText'
import { ProductScreenshot, SupplifyEyebrow } from './shared'

const FEATURE_ICONS: Record<string, LucideIcon> = {
  ordering: Package,
  reservations: Warehouse,
  chat: MessageSquare,
  staff: UserCog,
  deals: Tag,
  fulfillment: Truck,
  inventory: Warehouse,
  calendar: Calendar,
}

const SPAN_CLASS = {
  wide: 'md:col-span-2',
  normal: '',
  compact: '',
} as const

function FeatureCard({
  feature,
}: {
  feature: (typeof PLATFORM_FEATURES)[number]
}) {
  const Icon = FEATURE_ICONS[feature.id] ?? Package
  const hasUi = 'ui' in feature && feature.ui

  return (
    <article
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] transition-[border-color,background-color] duration-200 hover:border-supplify-light/25 hover:bg-white/[0.05]"
    >
      <div className={`flex flex-1 flex-col p-6 ${hasUi && feature.span !== 'compact' ? 'pb-4' : ''}`}>
        <div className="flex items-start justify-between gap-4">
          <p className="font-sans text-[10px] font-medium uppercase tracking-[0.26em] text-supplify-light/65">
            {feature.category}
          </p>
          <Icon className="h-5 w-5 shrink-0 text-supplify-light/70" strokeWidth={1.5} aria-hidden />
        </div>
        <h3 className="mt-3 font-display text-lg font-bold leading-snug text-paper md:text-xl">
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

      {hasUi && feature.span !== 'compact' && (
        <div className="mt-auto px-4 pb-4 pt-0">
          <ProductScreenshot
            src={feature.ui}
            alt={`Supplify — ${feature.title}`}
            fit="cover"
            glow={false}
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
              text="Reservations, staff, deals, live chat — and much more."
              className="font-display text-display-md font-bold text-paper"
            />
          </div>
          <p className="mt-6 max-w-2xl font-sans text-base leading-[1.75] text-dough-200/90 md:text-lg">
            Supplify isn&apos;t just ordering between restaurants and suppliers. It&apos;s the full
            operating stack — inventory reservations, team permissions, supplier promotions, order-tied
            chat with attachments, and the depth operators need when rush mode hits.
          </p>
        </Reveal>

        <div className="mt-12 grid auto-rows-fr gap-4 md:grid-cols-3 md:gap-5">
          {PLATFORM_FEATURES.map((feature, i) => (
            <Reveal key={feature.id} delay={0.04 + i * 0.03} className={SPAN_CLASS[feature.span]}>
              <FeatureCard feature={feature} />
            </Reveal>
          ))}
        </div>

        {/* And much more */}
        <Reveal delay={0.15} className="mt-10">
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] px-6 py-8 md:px-8">
            <p className="font-display text-lg font-bold text-paper md:text-xl">
              And much, much more.
            </p>
            <p className="mt-2 max-w-2xl font-sans text-sm leading-relaxed text-dough-300/80 md:text-base">
              Every feature exists because operators on both sides told us what broke. The list keeps
              growing — here&apos;s what else ships today.
            </p>
            <ul className="mt-6 grid gap-x-6 gap-y-2 sm:grid-cols-2 lg:grid-cols-3">
              {PLATFORM_MORE.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-2 font-sans text-sm text-dough-200/85"
                >
                  <span className="h-1 w-1 shrink-0 rounded-full bg-supplify-light" aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
