import { motion } from 'framer-motion'
import { SUPPLIFY_PACK } from '../../data/supplify-cursor-pack'
import { Reveal } from '../Reveal'
import { AtmosphereImage, ProductScreenshot, SUPPLIFY_EASE } from './shared'

const SIDES = [
  {
    key: 'restaurant',
    label: 'Restaurants',
    scene: SUPPLIFY_PACK.split.restaurantScene,
    ui: SUPPLIFY_PACK.split.restaurantUI[0],
    description:
      'Order from every supplier in one place — live catalogs, reservations, receiving, and order chat with attachments. Built for operators tired of WhatsApp chaos and hoping the delivery matches the invoice.',
    delay: 0,
  },
  {
    key: 'supplier',
    label: 'Suppliers',
    scene: SUPPLIFY_PACK.split.supplierScene,
    ui: SUPPLIFY_PACK.split.supplierUI[0],
    description:
      'Incoming restaurant orders in one queue — fulfillment, dispatch, deals & promotions, and customer chat tied to every order. Warehouse-grade ops without juggling phones during peak hours.',
    delay: 0.1,
  },
] as const

export function SupplifySplit() {
  return (
    <section className="border-t border-white/[0.06] bg-[#0a0812] py-section md:py-section-lg">
      <div className="mx-auto max-w-[90rem] px-6 md:px-10 lg:px-14">
        <Reveal>
          <p className="font-sans text-[11px] font-medium uppercase tracking-[0.32em] text-supplify-light/80">
            Both sides of the market
          </p>
          <h2 className="mt-6 max-w-[22ch] font-display text-display-md font-bold text-paper">
            Restaurants order. Suppliers fulfill. Same platform, same truth.
          </h2>
          <p className="mt-6 max-w-2xl font-sans text-base leading-[1.75] text-dough-200/85 md:text-lg">
            Whether you run the kitchen or the warehouse — live ordering, reservations, staff management,
            supplier deals, and order-tied chat with attachments. One system both sides open during rush.
          </p>
        </Reveal>

        <div className="mt-20 grid gap-16 lg:grid-cols-2 lg:gap-12">
          {SIDES.map(({ key, label, scene, ui, description, delay }) => (
            <motion.article
              key={key}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay, ease: SUPPLIFY_EASE }}
              className="group rounded-2xl p-1 transition-[background-color] duration-200 hover:bg-white/[0.03]"
            >
              <p className="font-display text-sm font-bold uppercase tracking-[0.2em] text-supplify-light">
                {label}
              </p>

              {/* Scene + floating UI screenshot overlay */}
              <div className="relative mt-8 overflow-hidden rounded-2xl ring-1 ring-white/10 transition-[ring-color,box-shadow] duration-200 group-hover:ring-supplify-light/30 md:rounded-[1.25rem]">
                <AtmosphereImage
                  src={scene}
                  position="center center"
                  minHeight="min(46vh, 440px)"
                  className="w-full"
                  overlay="from-[#0a0812]/70 via-[#0a0812]/25 to-transparent"
                />
                {/* Floating product UI — sits atop the atmosphere image */}
                <motion.div
                  className="pointer-events-none absolute bottom-5 right-4 w-[56%] max-w-[280px]"
                  initial={{ opacity: 0, y: 14, scale: 0.96 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: delay + 0.4, duration: 0.7, ease: SUPPLIFY_EASE }}
                >
                  <ProductScreenshot src={ui} glow />
                </motion.div>
              </div>

              <p className="mt-8 max-w-md font-sans text-base leading-[1.75] text-dough-200/85">
                {description}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
