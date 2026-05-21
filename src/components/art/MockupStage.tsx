const VARIANT_SRC: Record<string, string> = {
  orders: '/images/supplify/supplier-dashboard.png',
  supplier: '/images/supplify/supplier-fulfillment.png',
  restaurant: '/images/supplify/restaurant-dashboard.png',
  inbox: '/images/supplify/restaurant-inventory.png',
  reservations: '/images/supplify/reservations.png',
  'restaurant-orders': '/images/supplify/restaurant-orders.png',
  catalog: '/images/supplify/catalog.png',
  'quick-lists': '/images/supplify/quick-lists.png',
  disputes: '/images/supplify/disputes.png',
  'supplier-orders': '/images/supplify/supplier-orders.png',
  'order-calendar': '/images/supplify/order-calendar.png',
  'supplier-products': '/images/supplify/supplier-products.png',
  'supplier-deals': '/images/supplify/supplier-deals.png',
}

export function MockupStage({
  variant,
  className = '',
}: {
  variant: string
  className?: string
}) {
  const src = VARIANT_SRC[variant] ?? VARIANT_SRC.orders

  return (
    <div className={`relative ${className}`}>
      <div className="overflow-hidden rounded-[1.25rem] shadow-2xl ring-1 ring-dough-200/60">
        {/* Browser chrome bar */}
        <div className="flex h-8 shrink-0 items-center gap-2 bg-[#f0ede8] px-4">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
          <div className="mx-auto flex h-4 w-44 items-center justify-center rounded bg-white/70 px-3 text-[10px] text-dough-500">
            app.supplify.com
          </div>
        </div>
        <img
          src={src}
          alt="Supplify app screenshot"
          className="block w-full"
          loading="lazy"
          decoding="async"
        />
      </div>
    </div>
  )
}
