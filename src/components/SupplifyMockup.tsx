import {
  Bell,
  ClipboardList,
  MessageSquare,
  Package,
  Search,
  ShoppingCart,
  Truck,
} from 'lucide-react'

export type MockVariant = 'orders' | 'supplier' | 'restaurant' | 'inbox'

const CONFIG: Record<
  MockVariant,
  {
    title: string
    subtitle: string
    accent: string
    accentSoft: string
    nav: typeof ShoppingCart
    rows: { name: string; meta: string; badge?: string }[]
    kpis: { label: string; value: string }[]
  }
> = {
  orders: {
    title: 'Place your order',
    subtitle: 'Browse suppliers · build your cart · send in one tap',
    accent: '#7c3aed',
    accentSoft: '#ede9fe',
    nav: ShoppingCart,
    kpis: [
      { label: 'In cart', value: '$3,420' },
      { label: 'Suppliers', value: '6' },
      { label: 'Delivery', value: 'Tue AM' },
    ],
    rows: [
      { name: 'Fresh tomatoes — 20 kg', meta: 'Green Valley Farms', badge: 'In cart' },
      { name: 'Olive oil extra virgin', meta: 'Mediterranean Supply', badge: 'Reorder' },
      { name: 'Chicken breast — chilled', meta: 'Prime Proteins', badge: 'Low stock' },
      { name: 'House napkins (case)', meta: 'Pack & Serve Co.' },
    ],
  },
  supplier: {
    title: 'Orders to fulfill',
    subtitle: 'See what restaurants need · pack · ship · invoice',
    accent: '#059669',
    accentSoft: '#d1fae5',
    nav: Truck,
    kpis: [
      { label: 'To ship today', value: '31' },
      { label: 'On time', value: '96%' },
      { label: 'Awaiting pay', value: '12' },
    ],
    rows: [
      { name: 'Order #1842 — Downtown Bistro', meta: '24 items · due 8am', badge: 'Picking' },
      { name: 'Order #1841 — Harbor Kitchen', meta: '18 items · due 10am', badge: 'Packed' },
      { name: 'Order #1839 — Rue 42 Café', meta: '9 items · delivered', badge: 'Done' },
      { name: 'Order #1837 — Skyline Hotel F&B', meta: '41 items · due Fri' },
    ],
  },
  restaurant: {
    title: 'Your kitchen dashboard',
    subtitle: 'Spend, open orders, and suppliers at a glance',
    accent: '#7c3aed',
    accentSoft: '#ede9fe',
    nav: ClipboardList,
    kpis: [
      { label: 'Open orders', value: '24' },
      { label: 'This month', value: '$42.8k' },
      { label: 'Suppliers', value: '18' },
    ],
    rows: [
      { name: 'Weekly produce — standing order', meta: 'Arrives Tuesday', badge: 'Scheduled' },
      { name: 'Dairy & eggs restock', meta: 'Confirmed by supplier', badge: 'On the way' },
      { name: 'Invoice #INV-9021', meta: 'Paid · Mediterranean Supply' },
      { name: 'New message from Prime Proteins', meta: 'Substitution approved' },
    ],
  },
  inbox: {
    title: 'Messages & updates',
    subtitle: 'One thread per order — no more lost WhatsApp chains',
    accent: '#6366f1',
    accentSoft: '#e0e7ff',
    nav: MessageSquare,
    kpis: [
      { label: 'Unread', value: '3' },
      { label: 'This week', value: '28' },
      { label: 'Resolved', value: '94%' },
    ],
    rows: [
      { name: 'Prime Proteins', meta: '“Substitution OK for Tuesday delivery”', badge: 'New' },
      { name: 'Green Valley Farms', meta: '“Invoice #4412 is ready”' },
      { name: 'Pack & Serve Co.', meta: '“Added napkins to your quick list”' },
      { name: 'System', meta: '“Order #1842 marked as received”' },
    ],
  },
}

const SIDEBAR = [ShoppingCart, Package, Truck, MessageSquare, Bell]

export function SupplifyMockup({
  variant = 'restaurant',
  className = '',
  elevated = false,
}: {
  variant?: MockVariant
  className?: string
  elevated?: boolean
}) {
  const c = CONFIG[variant]
  const ActiveNav = c.nav

  return (
    <div
      className={`overflow-hidden rounded-[1.25rem] border bg-white ${
        elevated
          ? 'border-slate-200 shadow-lg ring-1 ring-slate-100'
          : 'border-slate-200/90 shadow-md ring-1 ring-slate-100'
      } ${className}`}
    >
      <div className="flex items-center gap-2 border-b border-slate-100 bg-gradient-to-r from-slate-50 to-white px-4 py-3">
        <span className="h-3 w-3 rounded-full bg-red-400" />
        <span className="h-3 w-3 rounded-full bg-amber-400" />
        <span className="h-3 w-3 rounded-full bg-emerald-400" />
        <div className="ml-2 flex flex-1 items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-1.5">
          <Search className="h-3.5 w-3.5 text-slate-400" />
          <span className="text-xs text-slate-400">app.supplify.com</span>
        </div>
        <span
          className="rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white"
          style={{ background: c.accent }}
        >
          Live
        </span>
      </div>

      <div className="flex min-h-[300px] bg-[#f8fafc] md:min-h-[340px]">
        <aside className="hidden w-16 flex-col items-center gap-2 border-r border-slate-200 bg-white py-4 sm:flex">
          {SIDEBAR.map((Icon, i) => {
            const active = Icon === ActiveNav || (variant === 'inbox' && Icon === MessageSquare)
            return (
              <div
                key={i}
                className="flex h-10 w-10 items-center justify-center rounded-xl transition"
                style={{
                  background: active ? c.accentSoft : 'transparent',
                  color: active ? c.accent : '#94a3b8',
                }}
              >
                <Icon className="h-5 w-5" strokeWidth={active ? 2 : 1.5} />
              </div>
            )
          })}
        </aside>

        <div className="flex-1 p-4 md:p-6">
          <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em]" style={{ color: c.accent }}>
                Supplify
              </p>
              <h4 className="font-display text-base font-bold text-[#1e0b3a] md:text-lg">{c.title}</h4>
              <p className="text-xs text-slate-500">{c.subtitle}</p>
            </div>
            <button
              type="button"
              className="rounded-full px-4 py-2 text-xs font-bold text-white shadow-md"
              style={{ background: c.accent }}
            >
              {variant === 'orders' ? 'Checkout' : variant === 'supplier' ? 'Mark shipped' : 'New order'}
            </button>
          </div>

          <div className="mb-4 grid grid-cols-3 gap-2">
            {c.kpis.map((k) => (
              <div
                key={k.label}
                className="rounded-xl border border-slate-100 bg-white p-3 shadow-sm"
              >
                <p className="text-[10px] font-medium text-slate-500">{k.label}</p>
                <p className="font-display text-lg font-bold text-[#1e0b3a]">{k.value}</p>
              </div>
            ))}
          </div>

          <div className="space-y-2">
            {c.rows.map((row) => (
              <div
                key={row.name}
                className="flex items-center gap-3 rounded-xl border border-slate-100 bg-white px-3 py-2.5 shadow-sm transition hover:border-slate-200"
              >
                <div
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-xs font-bold text-white"
                  style={{ background: `linear-gradient(135deg, ${c.accent}, ${c.accent}99)` }}
                >
                  {row.name.charAt(0)}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-slate-800">{row.name}</p>
                  <p className="truncate text-xs text-slate-500">{row.meta}</p>
                </div>
                {row.badge && (
                  <span
                    className="shrink-0 rounded-full px-2 py-0.5 text-[10px] font-bold"
                    style={{ background: c.accentSoft, color: c.accent }}
                  >
                    {row.badge}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
