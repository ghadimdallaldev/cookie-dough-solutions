import { SUPPLIFY_PACK } from '../../data/supplify-cursor-pack'
import { Reveal } from '../Reveal'
import { PainMarquee } from './PainMarquee'

export function SupplifyOldWay() {
  return (
    <section className="relative overflow-hidden border-t border-white/[0.06] bg-[#0a0812]">
      <div className="relative mx-auto max-w-[90rem] px-6 py-section md:px-10 lg:px-14">
        <Reveal>
          <p className="font-sans text-[11px] font-medium uppercase tracking-[0.32em] text-supplify-light/80">
            The old way
          </p>
          <h2 className="mt-6 max-w-[22ch] font-display text-display-md font-bold text-paper">
            Operational chaos isn&apos;t a personality trait.
          </h2>
          <p className="mt-6 max-w-2xl font-sans text-base leading-[1.75] text-dough-200/85 md:text-lg">
            Restaurants fire orders through WhatsApp. Suppliers confirm on voice notes during rush hour.
            Neither side shares a source of truth — and everyone pays for it at close.{' '}
            <a
              href="#ordering"
              className="cursor-pointer font-medium text-supplify-light underline-offset-4 transition-colors duration-200 hover:text-paper hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-supplify-light/70"
            >
              Supplify fixes that loop.
            </a>
          </p>
        </Reveal>
      </div>

      <div className="relative mt-12 min-h-[min(52vh,520px)]">
        <div className="absolute inset-0 bg-[#0f0620]">
          <img
            src={SUPPLIFY_PACK.oldWay.scene}
            alt=""
            className="absolute inset-0 h-full w-full scale-105 object-cover object-center blur-[3px] brightness-[0.4]"
            loading="lazy"
            onError={(e) => {
              e.currentTarget.style.display = 'none'
            }}
          />
          <div className="absolute inset-0 bg-supplify-mesh opacity-50" aria-hidden />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0812] via-[#0a0812]/55 to-[#0a0812]/25" />
        <div className="pointer-events-none absolute inset-0 opacity-[0.05] supplify-grain" aria-hidden />

        <div className="absolute inset-x-0 bottom-0 pb-10 pt-28 md:pb-14 md:pt-32">
          <div className="absolute inset-x-0 bottom-0 h-full bg-gradient-to-t from-[#0a0812] via-[#0a0812]/90 to-transparent" />
          <div className="relative">
            <PainMarquee />
          </div>
        </div>
      </div>
    </section>
  )
}
