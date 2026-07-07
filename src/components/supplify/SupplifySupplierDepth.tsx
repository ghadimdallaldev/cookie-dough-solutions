import {
  BarChart3,
  Gift,
  MapPin,
  PackageSearch,
  Radio,
  Route,
  Warehouse,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { SUPPLIER_DEPTH_ITEMS } from '../../data/supplify-cursor-pack'
import { Reveal } from '../Reveal'
import { ProductScreenshot, SupplifyEyebrow } from './shared'

const DEPTH_ICONS: Record<string, LucideIcon> = {
  'command-center': BarChart3,
  'pick-waves': PackageSearch,
  'run-sheet': Route,
  'driver-portal': MapPin,
  'customer-growth': Radio,
  promotions: Gift,
  inventory: Warehouse,
}

export function SupplifySupplierDepth() {
  return (
    <section
      data-theme="light"
      className="relative overflow-hidden border-t border-supplify-border bg-supplify-section py-20 md:py-24"
    >
      <div className="relative mx-auto max-w-[90rem] px-6 md:px-10 lg:px-14">
        <Reveal>
          <SupplifyEyebrow>Supplier ops depth</SupplifyEyebrow>
          <h2 className="mt-6 max-w-[24ch] font-display text-display-md font-bold text-supplify-ink">
            Warehouse-grade capabilities — without ERP theater.
          </h2>
          <p className="mt-6 max-w-2xl font-sans text-base leading-[1.75] text-supplify-secondary md:text-lg">
            Command center, pick waves, dispatch, driver proof-of-delivery, customer growth, and
            supplier promotions — the ops layer suppliers open during peak hours.
          </p>
        </Reveal>

        <div className="mt-12 flex gap-4 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {SUPPLIER_DEPTH_ITEMS.map((item, i) => {
            const Icon = DEPTH_ICONS[item.id] ?? Warehouse
            return (
              <Reveal key={item.id} delay={0.04 + i * 0.04}>
                <article className="group flex w-[min(88vw,20rem)] shrink-0 flex-col rounded-3xl border border-supplify-border bg-white p-5 shadow-supplify-card transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-0.5 hover:border-supplify/25 hover:shadow-supplify-glow sm:w-[18rem]">
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-supplify/10 ring-1 ring-supplify/20">
                    <Icon className="h-[18px] w-[18px] text-supplify" strokeWidth={1.75} aria-hidden />
                  </span>
                  <h3 className="mt-4 font-display text-lg font-bold leading-snug text-supplify-ink">
                    {item.title}
                  </h3>
                  <p className="mt-2 font-sans text-sm leading-[1.65] text-supplify-secondary">
                    {item.body}
                  </p>
                  <div className="mt-4">
                    <ProductScreenshot
                      src={item.ui}
                      alt={`Supplify — ${item.title}`}
                      fit="cover"
                      glow={false}
                      compact
                      theme="light"
                      className="pointer-events-none"
                    />
                  </div>
                </article>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
