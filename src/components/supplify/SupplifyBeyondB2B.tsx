import { Globe, Store, UserCircle, Utensils } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { BEYOND_B2B_CARDS } from '../../data/supplify-cursor-pack'
import { Reveal } from '../Reveal'
import { ProductScreenshot, SupplifyEyebrow } from './shared'

const CARD_ICONS: Record<string, LucideIcon> = {
  'b2c-ordering': Utensils,
  'public-reservations': Globe,
  'staff-portal': UserCircle,
  'supplier-ministore': Store,
}

export function SupplifyBeyondB2B() {
  return (
    <section
      data-theme="light"
      className="relative border-t border-ink/8 bg-paper-warm py-20 md:py-28"
    >
      <div className="pointer-events-none absolute inset-0 section-noise" aria-hidden />

      <div className="relative mx-auto max-w-[90rem] px-6 md:px-10 lg:px-14">
        <Reveal>
          <SupplifyEyebrow theme="light">Beyond B2B</SupplifyEyebrow>
          <h2 className="mt-6 max-w-[22ch] font-display text-display-md font-bold text-supplify-ink">
            Hospitality surfaces your guests and staff actually touch.
          </h2>
          <p className="mt-6 max-w-2xl font-sans text-base leading-[1.75] text-ink-muted md:text-lg">
            Supplify isn&apos;t only restaurant ↔ supplier procurement. Consumer ordering, public
            reservations, staff self-service, and supplier mini-stores ship in the same platform.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-5 sm:grid-cols-2">
          {BEYOND_B2B_CARDS.map((card, i) => {
            const Icon = CARD_ICONS[card.id] ?? Globe
            return (
              <Reveal key={card.id} delay={0.05 + i * 0.06}>
                <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-ink/8 bg-white shadow-editorial transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-0.5 hover:border-supplify/20 hover:shadow-[0_24px_60px_-28px_rgba(109,94,247,0.18)]">
                  <div className="flex flex-1 flex-col p-6 md:p-7">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-supplify/10 ring-1 ring-supplify/20 transition-[background-color,box-shadow] duration-300 group-hover:bg-supplify/15 group-hover:shadow-[0_0_22px_-6px_rgba(109,94,247,0.35)]">
                      <Icon className="h-5 w-5 text-supplify" strokeWidth={1.75} aria-hidden />
                    </span>
                    <h3 className="mt-5 font-display text-xl font-bold text-supplify-ink">
                      {card.title}
                    </h3>
                    <p className="mt-3 font-sans text-sm leading-[1.7] text-ink-muted md:text-base">
                      {card.body}
                    </p>
                  </div>
                  <div className="mt-auto px-4 pb-4">
                    <ProductScreenshot
                      src={card.ui}
                      alt={`Supplify — ${card.title}`}
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
