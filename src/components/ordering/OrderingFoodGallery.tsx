import { Reveal } from '../Reveal'
import { ORDERING_APP_PACK } from '../../data/ordering-app-pack'

type Tile = {
  src: string
  alt: string
  caption: string
  span: string
  width: number
  height: number
  priority?: boolean
}

// Real menu photography from the live almaalem.shop build — a grid that fills cleanly.
const GALLERY: Tile[] = [
  {
    src: ORDERING_APP_PACK.burger,
    alt: 'A lineup of Al Maalem signature charcoal burgers with brioche buns',
    caption: 'Signature burgers',
    span: 'sm:col-span-2 sm:row-span-2',
    width: 1200,
    height: 1200,
    priority: true,
  },
  {
    src: ORDERING_APP_PACK.shawarma,
    alt: 'Beef shawarma sandwich, halved, with tomato and tahini',
    caption: 'Beef shawarma',
    span: 'sm:col-span-2',
    width: 1200,
    height: 1200,
  },
  {
    src: ORDERING_APP_PACK.sub,
    alt: 'Grilled chicken sub with peppers and a side of fries',
    caption: 'Grilled subs',
    span: '',
    width: 1200,
    height: 900,
  },
  {
    src: ORDERING_APP_PACK.foodSpread,
    alt: 'A platter of crispy chicken tenders with fries and dips',
    caption: 'Tenders & sides',
    span: '',
    width: 1200,
    height: 1200,
  },
]

export function OrderingFoodGallery() {
  return (
    <section
      className="ordering-section relative border-y border-ink/8 bg-oapp-deep py-16 md:py-24"
      aria-label="Al Maalem menu photography"
    >
      <div className="pointer-events-none absolute inset-0 bg-oapp-mesh opacity-60" aria-hidden />
      <div className="relative mx-auto max-w-[86rem] px-6 lg:px-10">
        <Reveal>
          <p className="font-oapp-body text-[11px] font-bold uppercase tracking-[0.28em] text-oapp-gold">
            From the live build
          </p>
          <h2 className="mt-3 max-w-2xl font-oapp-display text-3xl font-bold tracking-tight text-oapp-cream md:text-4xl">
            Real food. Real menu. Real guests ordering direct.
          </h2>
          <p className="mt-4 max-w-xl font-oapp-body text-base leading-relaxed text-oapp-muted md:text-lg">
            Every photo below is pulled from{' '}
            <a
              href="https://www.almaalem.shop"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-oapp-gold underline decoration-oapp-gold/30 underline-offset-4 hover:text-oapp-cream"
            >
              almaalem.shop
            </a>
            — one client&apos;s live menu, shot and served through their own branded app.
          </p>
        </Reveal>

        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4 sm:auto-rows-[clamp(150px,20vw,232px)] lg:mt-14 lg:gap-5">
          {GALLERY.map((item, i) => (
            <Reveal key={item.src} delay={0.05 * i} className={item.span}>
              <figure className="group relative h-full min-h-[150px] overflow-hidden rounded-[1.35rem] border border-ink/8 bg-white shadow-editorial">
                <img
                  src={item.src}
                  alt={item.alt}
                  width={item.width}
                  height={item.height}
                  loading={item.priority ? 'eager' : 'lazy'}
                  decoding="async"
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                />
                <div
                  className="pointer-events-none absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-ink/70 via-ink/10 to-transparent"
                  aria-hidden
                />
                <figcaption className="absolute bottom-3 left-3.5 font-oapp-body text-xs font-bold uppercase tracking-[0.14em] text-white drop-shadow-sm">
                  {item.caption}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
