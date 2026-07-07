import { AnimatePresence, motion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useCallback, useEffect, useRef, useState } from 'react'
import { SUPPLIFY_PACK } from '../../data/supplify-cursor-pack'
import { Reveal } from '../Reveal'
import { ProductScreenshot, SupplifyEyebrow, SUPPLIFY_EASE } from './shared'

const UI_TABS = [
  {
    id: 'restaurant',
    label: 'Restaurant',
    description: 'Dashboard, catalogs, orders, inventory, invoices, and front-of-house — built for rush mode.',
    screens: [
      { src: SUPPLIFY_PACK.ui.restaurantDashboard, label: 'Dashboard', alt: 'Supplify restaurant dashboard overview' },
      { src: SUPPLIFY_PACK.ui.catalog, label: 'Live catalog', alt: 'Supplify live supplier catalog browsing' },
      { src: SUPPLIFY_PACK.ui.restaurantOrders, label: 'Orders', alt: 'Supplify restaurant order management' },
      { src: SUPPLIFY_PACK.ui.quickLists, label: 'Quick lists', alt: 'Supplify standing order quick lists' },
      { src: SUPPLIFY_PACK.ui.reorderAssistance, label: 'Reorder assistance', alt: 'Supplify smart reorder assistance panel' },
      { src: SUPPLIFY_PACK.ui.restaurantInventory, label: 'Inventory', alt: 'Supplify restaurant inventory tracking' },
      { src: SUPPLIFY_PACK.ui.receiving, label: 'Receiving', alt: 'Supplify receiving workflows' },
      { src: SUPPLIFY_PACK.ui.deals, label: 'Deals', alt: 'Supplify restaurant deals and promotions' },
      { src: SUPPLIFY_PACK.ui.invoicesRestaurant, label: 'Invoices', alt: 'Supplify restaurant accounts payable' },
      { src: SUPPLIFY_PACK.ui.orderTracking, label: 'Delivery tracking', alt: 'Supplify order delivery tracking view' },
      { src: SUPPLIFY_PACK.ui.orderCalendar, label: 'Order calendar', alt: 'Supplify restaurant order calendar' },
      { src: SUPPLIFY_PACK.ui.reportsRestaurant, label: 'Reports', alt: 'Supplify restaurant reports and KPIs' },
      { src: SUPPLIFY_PACK.ui.recipeCosting, label: 'Recipe pricing', alt: 'Supplify recipe pricing and food cost' },
      { src: SUPPLIFY_PACK.ui.quoteRequests, label: 'RFQ & quotes', alt: 'Supplify quote requests' },
      { src: SUPPLIFY_PACK.ui.chat, label: 'Live chat', alt: 'Supplify order chat' },
      { src: SUPPLIFY_PACK.ui.disputes, label: 'Disputes', alt: 'Supplify order dispute resolution' },
      { src: SUPPLIFY_PACK.ui.reservations, label: 'Reservations', alt: 'Supplify front-of-house reservations' },
    ],
  },
  {
    id: 'supplier',
    label: 'Supplier',
    description: 'Command center, product catalog, fulfillment, dispatch, and receivables — warehouse-grade without ERP theater.',
    screens: [
      { src: SUPPLIFY_PACK.ui.commandCenter, label: 'Command center', alt: 'Supplify supplier command center dashboard' },
      { src: SUPPLIFY_PACK.ui.supplierProducts, label: 'Products', alt: 'Supplify supplier product catalog management' },
      { src: SUPPLIFY_PACK.ui.supplierOrders, label: 'Orders', alt: 'Supplify supplier incoming orders queue' },
      { src: SUPPLIFY_PACK.ui.supplierFulfillment, label: 'Fulfillment & dispatch', alt: 'Supplify supplier fulfillment and dispatch board' },
      { src: SUPPLIFY_PACK.ui.runSheet, label: 'Run sheet', alt: 'Supplify supplier run sheet and dispatch' },
      { src: SUPPLIFY_PACK.ui.driverDeliveries, label: 'Driver portal', alt: 'Supplify driver deliveries portal' },
      { src: SUPPLIFY_PACK.ui.promotionsSupplier, label: 'Promotions', alt: 'Supplify supplier promotions management' },
      { src: SUPPLIFY_PACK.ui.invoicesSupplier, label: 'Receivables', alt: 'Supplify supplier invoices and receivables' },
    ],
  },
] as const

type TabId = (typeof UI_TABS)[number]['id']

export function SupplifyUIShowcase() {
  const stripRef = useRef<HTMLDivElement>(null)
  const sectionRef = useRef<HTMLElement>(null)
  const [activeTab, setActiveTab] = useState<TabId>('restaurant')
  const [activeScreen, setActiveScreen] = useState(0)
  const tab = UI_TABS.find((t) => t.id === activeTab) ?? UI_TABS[0]
  const screen = tab.screens[activeScreen] ?? tab.screens[0]
  const total = tab.screens.length

  function selectTab(id: TabId) {
    setActiveTab(id)
    setActiveScreen(0)
  }

  const goTo = useCallback(
    (index: number) => {
      const next = Math.max(0, Math.min(total - 1, index))
      setActiveScreen(next)
      const strip = stripRef.current
      const thumb = strip?.children[next] as HTMLElement | undefined
      thumb?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' })
    },
    [total],
  )

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      const section = sectionRef.current
      if (!section) return
      const rect = section.getBoundingClientRect()
      const inView = rect.top < window.innerHeight * 0.85 && rect.bottom > window.innerHeight * 0.15
      if (!inView) return
      if (e.key === 'ArrowLeft') { e.preventDefault(); goTo(activeScreen - 1) }
      else if (e.key === 'ArrowRight') { e.preventDefault(); goTo(activeScreen + 1) }
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [activeScreen, goTo])

  return (
    <section
      ref={sectionRef}
      data-theme="light"
      className="relative overflow-hidden border-t border-supplify-border bg-white py-20 md:py-24"
    >
      <div className="pointer-events-none absolute inset-0 section-noise" aria-hidden />
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-supplify/25 to-transparent"
        aria-hidden
      />

      <div className="relative mx-auto max-w-[90rem] px-6 md:px-10 lg:px-14">
        <Reveal>
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between lg:gap-10">
            <motion.div className="max-w-2xl">
              <SupplifyEyebrow>Real product UI</SupplifyEyebrow>
              <h2 className="mt-4 font-display text-display-md font-bold text-supplify-ink">
                See what operators actually open during rush.
              </h2>
              <p className="mt-4 max-w-xl font-sans text-base leading-[1.7] text-supplify-secondary">
                {UI_TABS.reduce((n, t) => n + t.screens.length, 0)} screens captured from Supplify dev — switch
                audience, pick a view.
              </p>
            </motion.div>

            <div className="shrink-0">
              <div
                role="tablist"
                aria-label="Product audience"
                className="inline-flex rounded-full border border-supplify-border bg-supplify-cream p-1 shadow-supplify-card"
              >
                {UI_TABS.map(({ id, label }) => {
                  const selected = activeTab === id
                  return (
                    <button
                      key={id}
                      type="button"
                      role="tab"
                      aria-selected={selected}
                      onClick={() => selectTab(id)}
                      className={`relative cursor-pointer rounded-full px-5 py-2 font-sans text-sm font-semibold transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-supplify/50 focus-visible:ring-offset-2 focus-visible:ring-offset-supplify-cream ${
                        selected ? 'text-white' : 'text-supplify-secondary hover:text-supplify-ink'
                      }`}
                    >
                      {selected && (
                        <motion.span
                          layoutId="supplify-ui-tab"
                          className="absolute inset-0 rounded-full bg-supplify shadow-supplify-glow"
                          transition={{ duration: 0.25, ease: SUPPLIFY_EASE }}
                        />
                      )}
                      <span className="relative z-10">{label}</span>
                    </button>
                  )
                })}
              </div>
              <p className="mt-3 max-w-xs font-sans text-sm leading-relaxed text-supplify-secondary lg:text-right">
                {tab.description}
              </p>
            </div>
          </div>
        </Reveal>

        <div className="mt-8 md:mt-10" role="tabpanel">
          <AnimatePresence mode="wait">
            <motion.div
              key={`${activeTab}-${activeScreen}`}
              initial={{ opacity: 0, y: 8, filter: 'blur(6px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -6, filter: 'blur(6px)' }}
              transition={{ duration: 0.32, ease: SUPPLIFY_EASE }}
            >
              <ProductScreenshot
                src={screen.src}
                alt={screen.alt}
                fit="cover"
                glow
                theme="light"
                priority={activeScreen === 0}
              />
            </motion.div>
          </AnimatePresence>

          <div className="mt-4 flex items-center justify-between gap-4">
            <div className="min-w-0">
              <p className="truncate font-sans text-sm font-semibold text-supplify-ink">{screen.label}</p>
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-supplify/60">
                {String(activeScreen + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
              </p>
            </div>
            <div className="flex shrink-0 items-center gap-3">
              <span className="hidden select-none items-center gap-1 font-mono text-[10px] uppercase tracking-widest text-ink/25 lg:flex" aria-hidden>
                <kbd className="rounded border border-ink/10 bg-white px-1.5 py-0.5 text-[9px]">←</kbd>
                <kbd className="rounded border border-ink/10 bg-white px-1.5 py-0.5 text-[9px]">→</kbd>
              </span>
              <button
                type="button"
                onClick={() => goTo(activeScreen - 1)}
                disabled={activeScreen === 0}
                aria-label="Previous screen"
                className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-ink/10 bg-white text-ink-muted transition-colors duration-200 hover:border-supplify/25 hover:bg-supplify-soft hover:text-supplify-ink disabled:cursor-not-allowed disabled:opacity-30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-supplify/50"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => goTo(activeScreen + 1)}
                disabled={activeScreen === total - 1}
                aria-label="Next screen"
                className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-ink/10 bg-white text-ink-muted transition-colors duration-200 hover:border-supplify/25 hover:bg-supplify-soft hover:text-supplify-ink disabled:cursor-not-allowed disabled:opacity-30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-supplify/50"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div
            ref={stripRef}
            className="mt-4 flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {tab.screens.map((item, i) => {
              const selected = activeScreen === i
              return (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => goTo(i)}
                  aria-label={`View ${item.label}`}
                  aria-current={selected ? 'true' : undefined}
                  className={`group w-[clamp(7.5rem,18vw,11rem)] shrink-0 cursor-pointer overflow-hidden rounded-lg text-left ring-1 transition-[ring-color,background-color] duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-supplify/50 focus-visible:ring-offset-2 focus-visible:ring-offset-supplify-cream ${
                    selected
                      ? 'bg-white ring-supplify/40'
                      : 'bg-white/80 ring-ink/10 hover:bg-white hover:ring-supplify/20'
                  }`}
                >
                  <div className="aspect-[16/10] overflow-hidden">
                    <img
                      src={item.src}
                      alt=""
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover object-top transition-opacity duration-200 group-hover:opacity-90"
                    />
                  </div>
                  <p
                    className={`truncate px-2 py-2 font-sans text-[11px] font-medium transition-colors duration-200 ${
                      selected ? 'text-supplify-ink' : 'text-ink-muted group-hover:text-supplify-ink'
                    }`}
                  >
                    {item.label}
                  </p>
                </button>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
