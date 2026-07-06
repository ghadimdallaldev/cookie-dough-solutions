import { Reveal } from '../Reveal'
import { ORDERING_APP_PACK, ORDERING_APP_UI } from '../../data/ordering-app-pack'

const GALLERY: Array<{
  src: string
  alt: string
  span: string
  tall?: boolean
  contain?: boolean
}> = [
  {
    src: ORDERING_APP_PACK.hero,
    alt: 'Al Maalem charcoal grill hero — live ordering app',
    span: 'lg:col-span-2 lg:row-span-2',
    tall: true,
  },
  {
    src: ORDERING_APP_PACK.foodSpread,
    alt: 'Grilled burgers and sandwiches from Al Maalem menu',
    span: '',
  },
  {
    src: ORDERING_APP_PACK.burger,
    alt: 'Signature Fire Burger from Al Maalem',
    span: '',
  },
  {
    src: ORDERING_APP_UI.menu,
    alt: 'Al Maalem mobile menu categories',
    span: 'lg:col-span-2',
    contain: true,
  },
] 

export function OrderingFoodGallery() {
  return (
    <section
      className="ordering-section relative border-y border-oapp-gold/15 bg-oapp-ink py-16 md:py-24"
      aria-label="Al Maalem food and app visuals"
    >
      <div className="pointer-events-none absolute inset-0 bg-oapp-mesh opacity-25" aria-hidden />
      <div className="relative mx-auto max-w-[90rem] px-6 lg:px-10">
        <Reveal>
          <p className="font-oapp-body text-[11px] font-bold uppercase tracking-[0.28em] text-oapp-gold-light">
            From the live build
          </p>
          <h2 className="mt-3 max-w-2xl font-oapp-display text-3xl font-bold tracking-tight text-oapp-cream md:text-4xl">
            Real food. Real menu. Real guests ordering direct.
          </h2>
          <p className="mt-4 max-w-xl font-oapp-body text-base leading-relaxed text-oapp-muted md:text-lg">
            Every image below is from{' '}
            <a
              href="https://www.almaalem.shop"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-oapp-gold-light underline decoration-oapp-gold/40 underline-offset-4 hover:text-oapp-cream"
            >
              almaalem.shop
            </a>
            — one client&apos;s ordering experience, designed to their brand, colors, and menu. Yours
            will look and feel like you.
          </p>
        </Reveal>

        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:mt-14 lg:grid-cols-4 lg:auto-rows-[180px]">
          {GALLERY.map((item, i) => (
            <Reveal key={item.src} delay={0.05 * i} className={item.span}>
              <div
                className={`group relative h-full min-h-[200px] overflow-hidden rounded-2xl border border-oapp-cream/10 bg-oapp-surface shadow-[0_24px_60px_-32px_rgba(0,0,0,0.65)] ${
                  item.tall ? 'min-h-[280px] lg:min-h-full' : ''
                }`}
              >
                <img
                  src={item.src}
                  alt={item.alt}
                  loading="lazy"
                  decoding="async"
                  className={`h-full w-full transition-transform duration-700 ease-out group-hover:scale-[1.03] ${
                    item.contain ? 'bg-[#faf6f0] object-contain object-top p-2' : 'object-cover'
                  }`}
                />
                <div
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-oapp-ink/50 via-transparent to-transparent opacity-80"
                  aria-hidden
                />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
