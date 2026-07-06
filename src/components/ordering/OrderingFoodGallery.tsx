import { Reveal } from '../Reveal'
import { ORDERING_APP_PACK, ORDERING_APP_UI } from '../../data/ordering-app-pack'
import { OrderingProductScreenshot } from './OrderingProductScreenshot'

const GALLERY: Array<{
  kind: 'photo' | 'phone'
  src: string
  alt: string
  span: string
  tall?: boolean
  width: number
  height: number
}> = [
  {
    kind: 'photo',
    src: ORDERING_APP_PACK.hero,
    alt: 'Al Maalem charcoal grill hero — live ordering app',
    span: 'lg:col-span-2 lg:row-span-2',
    tall: true,
    width: 1920,
    height: 1080,
  },
  {
    kind: 'photo',
    src: ORDERING_APP_PACK.burger,
    alt: 'Signature Fire Burger from Al Maalem',
    span: '',
    width: 800,
    height: 800,
  },
  {
    kind: 'photo',
    src: ORDERING_APP_PACK.foodSpread,
    alt: 'Chef picks from the Al Maalem menu',
    span: '',
    width: 1600,
    height: 900,
  },
  {
    kind: 'phone',
    src: ORDERING_APP_UI.menu,
    alt: 'Al Maalem mobile menu',
    span: 'lg:col-span-2',
    width: 780,
    height: 1688,
  },
]

export function OrderingFoodGallery() {
  return (
    <section
      className="ordering-section relative border-y border-ink/8 bg-oapp-deep py-16 md:py-24"
      aria-label="Al Maalem food and app visuals"
    >
      <div className="pointer-events-none absolute inset-0 bg-oapp-mesh opacity-60" aria-hidden />
      <div className="relative mx-auto max-w-[90rem] px-6 lg:px-10">
        <Reveal>
          <p className="font-oapp-body text-[11px] font-bold uppercase tracking-[0.28em] text-oapp-gold">
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
              className="font-semibold text-oapp-gold underline decoration-oapp-gold/30 underline-offset-4 hover:text-oapp-cream"
            >
              almaalem.shop
            </a>
            — one client&apos;s ordering experience, designed to their brand, colors, and menu.
          </p>
        </Reveal>

        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:mt-14 lg:grid-cols-4 lg:auto-rows-[200px]">
          {GALLERY.map((item, i) => (
            <Reveal key={item.src} delay={0.05 * i} className={item.span}>
              {item.kind === 'phone' ? (
                <div
                  className={`flex h-full min-h-[320px] items-center justify-center rounded-[1.75rem] border border-ink/8 bg-white p-4 shadow-editorial lg:min-h-full ${item.span.includes('col-span-2') ? 'lg:px-8' : ''}`}
                >
                  <OrderingProductScreenshot
                    src={item.src}
                    alt={item.alt}
                    fit="cover"
                    glow={false}
                    variant="phone"
                    className="max-w-[220px] sm:max-w-[240px]"
                  />
                </div>
              ) : (
                <div
                  className={`group relative h-full min-h-[220px] overflow-hidden rounded-[1.75rem] border border-ink/8 bg-white shadow-editorial ${
                    item.tall ? 'min-h-[280px] lg:min-h-full' : ''
                  }`}
                >
                  <img
                    src={item.src}
                    alt={item.alt}
                    width={item.width}
                    height={item.height}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                  />
                </div>
              )}
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
