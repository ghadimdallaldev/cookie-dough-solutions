/** Supplify flagship page assets — public/images/supplify-cursor-pack/ */
const B = '/images/supplify-cursor-pack'

export type PackImage = {
  src: string
  position?: string
  fit?: 'cover' | 'contain'
}

export const p = (path: string) => `${B}/${path}`

const UI = `${B}/08-real-ui`

export const SUPPLIFY_PACK = {
  hero: {
    scene: `${UI}/restaurant-dashboard.png`,
    primaryUI: `${UI}/restaurant-dashboard.png`,
    secondaryUI: [`${UI}/catalog.png`, `${UI}/restaurant-orders.png`] as const,
  },
  oldWay: {
    scene: `${UI}/restaurant-orders.png`,
  },
  walkthrough: {
    scenes: [`${UI}/catalog.png`, `${UI}/supplier-orders.png`] as const,
    ui: [
      `${UI}/catalog.png`,
      `${UI}/quick-lists.png`,
      `${UI}/supplier-fulfillment.png`,
      `${UI}/order-tracking.png`,
      `${UI}/order-calendar.png`,
      `${UI}/disputes.png`,
    ] as const,
  },
  pillars: {
    scene: `${UI}/disputes.png`,
    ui: [
      `${UI}/disputes.png`,
      `${UI}/restaurant-dashboard.png`,
      `${UI}/supplier-dashboard.png`,
      `${UI}/restaurant-inventory.png`,
    ] as const,
  },
  operationsTimeline: {
    ui: `${UI}/order-tracking.png`,
  },
  split: {
    restaurantScene: `${UI}/restaurant-dashboard.png`,
    restaurantUI: [`${UI}/catalog.png`, `${UI}/restaurant-inventory.png`] as const,
    supplierScene: `${UI}/supplier-orders.png`,
    supplierUI: [`${UI}/supplier-dashboard.png`, `${UI}/supplier-orders.png`] as const,
  },
  finale: {
    scene: `${UI}/order-tracking.png`,
    optionalUI: [`${UI}/order-tracking.png`, `${UI}/restaurant-dashboard.png`] as const,
  },
  ui: {
    catalog: `${UI}/catalog.png`,
    deals: `${UI}/deals.png`,
    disputes: `${UI}/disputes.png`,
    invoicesRestaurant: `${UI}/invoices-restaurant.png`,
    invoicesSupplier: `${UI}/invoices-supplier.png`,
    orderCalendar: `${UI}/order-calendar.png`,
    orderTracking: `${UI}/order-tracking.png`,
    quickLists: `${UI}/quick-lists.png`,
    reorderAssistance: `${UI}/reorder-assistance.png`,
    reservations: `${UI}/reservations.png`,
    staff: `${UI}/staff.png`,
    restaurantDashboard: `${UI}/restaurant-dashboard.png`,
    restaurantInventory: `${UI}/restaurant-inventory.png`,
    restaurantOrders: `${UI}/restaurant-orders.png`,
    supplierDashboard: `${UI}/supplier-dashboard.png`,
    supplierFulfillment: `${UI}/supplier-fulfillment.png`,
    supplierOrders: `${UI}/supplier-orders.png`,
    supplierProducts: `${UI}/supplier-products.png`,
  },
} as const

export const WALKTHROUGH_STEPS = [
  {
    title: 'Browse live catalogs',
    body: 'Stop chasing PDF price lists. Every supplier, every SKU, every price — current, searchable, and calm enough for a Tuesday rush.',
    scene: SUPPLIFY_PACK.walkthrough.scenes[0],
    ui: SUPPLIFY_PACK.walkthrough.ui[0],
  },
  {
    title: 'Build orders and standing lists',
    body: 'Smart carts, quick lists, and reorder assistance when stock runs low — the way your team actually orders, not screenshot archaeology in group chats.',
    scene: SUPPLIFY_PACK.walkthrough.scenes[0],
    ui: SUPPLIFY_PACK.walkthrough.ui[1],
  },
  {
    title: 'Confirm fulfillment',
    body: 'Suppliers pick, pack, and confirm in one place. Both sides see the same truth before the truck leaves — no more “I thought you knew.”',
    scene: SUPPLIFY_PACK.walkthrough.scenes[1],
    ui: SUPPLIFY_PACK.ui.supplierOrders,
  },
  {
    title: 'Track dispatch',
    body: 'Drivers, routes, and live delivery status — last mile without another spreadsheet or a frantic phone call at 6 AM.',
    scene: SUPPLIFY_PACK.walkthrough.scenes[1],
    ui: SUPPLIFY_PACK.walkthrough.ui[3],
  },
  {
    title: 'Receive goods',
    body: 'Receiving tied to the order line — what arrived, what didn’t, and what needs a conversation before service starts.',
    scene: SUPPLIFY_PACK.split.supplierScene,
    ui: SUPPLIFY_PACK.walkthrough.ui[4],
  },
  {
    title: 'Close the loop',
    body: 'Disputes, credit notes, and invoice reconciliation — handled in-app, securely, not over WhatsApp at midnight.',
    scene: SUPPLIFY_PACK.pillars.scene,
    ui: SUPPLIFY_PACK.walkthrough.ui[5],
  },
] as const

export const PRODUCT_PILLARS = [
  {
    index: '01',
    category: 'Procurement',
    title: 'Ordering that ends the patchwork',
    body: 'Multi-supplier catalogs, carts, standing orders, and chat with context — built for rush mode and real receiving.',
    ui: SUPPLIFY_PACK.ui.catalog,
    scene: SUPPLIFY_PACK.walkthrough.scenes[0],
  },
  {
    index: '02',
    category: 'Supplier operations',
    title: 'Warehouse to dispatch, one thread',
    body: 'Pick lists, fulfillment confirmation, driver routes, and supplier command center — ops depth without ERP theater.',
    ui: SUPPLIFY_PACK.ui.supplierOrders,
    scene: SUPPLIFY_PACK.split.supplierScene,
  },
  {
    index: '03',
    category: 'Communication',
    title: 'Disputes where the order lives',
    body: 'Live order chat with file attachments, substitutions, and dispute handling — every conversation tied to the order line.',
    ui: SUPPLIFY_PACK.ui.disputes,
    scene: SUPPLIFY_PACK.pillars.scene,
  },
  {
    index: '04',
    category: 'Visibility',
    title: 'Leadership stops exporting to Excel',
    body: 'Order calendar, KPIs, inventory truth, and roles — operators see what matters without another module maze.',
    ui: SUPPLIFY_PACK.ui.orderCalendar,
    scene: SUPPLIFY_PACK.split.restaurantScene,
  },
] as const

export const OLD_WAY_PAINS = [
  'WhatsApp orders lost in group chat',
  'PDF price lists already outdated',
  '2 AM spreadsheet reconciliation',
  'Missed deliveries nobody tracked',
  'Invoice disputes over voice notes',
  'Supplier chaos during Friday rush',
  'Stockouts the kitchen never saw coming',
  'Substitutions agreed to — then forgotten',
] as const

export const TIMELINE_EVENTS = [
  'Order placed',
  'Supplier confirmed',
  'Substitutions approved',
  'Driver assigned',
  'Delay update',
  'Goods received',
  'Dispute opened',
  'Credit note issued',
  'Invoice closed',
] as const

export const CHAOS_FIX_PAIRS = [
  {
    before: 'Restaurants order on WhatsApp. Suppliers confirm on voice notes.',
    after: 'One live order thread — restaurant places, supplier confirms, both see the same truth.',
  },
  {
    before: 'PDF price lists, screenshot carts, and “did you get my message?”',
    after: 'Live catalogs, smart carts, and standing lists — no messages required.',
  },
  {
    before: 'Substitutions agreed in chat, forgotten by delivery.',
    after: 'Substitutions approved in-app, attached to the order line, visible to both sides.',
  },
  {
    before: '2 AM reconciliation across inboxes, spreadsheets, and group chats.',
    after: 'Every event on a living timeline — from placement to invoice, nothing lost.',
  },
] as const

export const ORDERING_LOOP = [
  {
    step: '01',
    side: 'Restaurant',
    title: 'Browse & order',
    body: 'Live supplier catalogs, multi-supplier carts, quick lists, and reorder assistance — built for rush mode.',
  },
  {
    step: '02',
    side: 'Supplify',
    title: 'One live thread',
    body: 'Every line item, substitution, chat message, and attachment lives on the order — auditable and visible to both sides.',
  },
  {
    step: '03',
    side: 'Supplier',
    title: 'Pick, pack & dispatch',
    body: 'Incoming restaurant orders in one queue. Fulfillment, driver routes, and delivery updates — no juggling phones during peak.',
  },
] as const

export const PLATFORM_FEATURES = [
  {
    id: 'ordering',
    category: 'Core',
    title: 'Restaurant ↔ supplier ordering',
    body: 'Live multi-supplier catalogs, smart carts, and standing quick lists — procurement without WhatsApp chaos.',
    ui: SUPPLIFY_PACK.ui.catalog,
    span: 'wide' as const,
  },
  {
    id: 'fulfillment',
    category: 'Logistics',
    title: 'Delivery tracking & dispatch',
    body: 'Pick lists, driver assignment, live delivery status, and ETA visibility — last mile operators can actually trust.',
    ui: SUPPLIFY_PACK.ui.orderTracking,
    span: 'wide' as const,
  },
  {
    id: 'invoicing',
    category: 'Finance',
    title: 'Invoices & receivables',
    body: 'Accounts payable for restaurants, receivables for suppliers — credit notes, disputes, and reconciliation in one ledger.',
    ui: SUPPLIFY_PACK.ui.invoicesRestaurant,
    span: 'normal' as const,
  },
  {
    id: 'reorder',
    category: 'Procurement',
    title: 'Smart reorder assistance',
    body: 'Quick lists, scheduled reorders, and reorder assistance when stock runs low — practical reminders, not generic AI hype.',
    ui: SUPPLIFY_PACK.ui.reorderAssistance,
    span: 'normal' as const,
  },
  {
    id: 'deals',
    category: 'Growth',
    title: 'Deals & promotions',
    body: 'Suppliers run targeted deals and seasonal offers in catalog — restaurants see live pricing without another PDF.',
    ui: SUPPLIFY_PACK.ui.deals,
    span: 'normal' as const,
  },
  {
    id: 'chat',
    category: 'Communication',
    title: 'Live chat on every order',
    body: 'In-app chat tied to the order line — substitutions, delays, disputes, and attachments in one auditable thread.',
    ui: SUPPLIFY_PACK.ui.disputes,
    span: 'normal' as const,
  },
  {
    id: 'reservations',
    category: 'Front of house',
    title: 'Reservation system',
    body: 'Floor plans, table assignments, waitlists, and guest bookings — front-of-house on the same platform as back-of-house.',
    ui: SUPPLIFY_PACK.ui.reservations,
    span: 'normal' as const,
  },
  {
    id: 'inventory',
    category: 'Visibility',
    title: 'Inventory truth',
    body: 'Receiving tied to order lines. What arrived, what didn’t, and expiry alerts before service starts.',
    ui: SUPPLIFY_PACK.ui.restaurantInventory,
    span: 'compact' as const,
  },
  {
    id: 'calendar',
    category: 'Visibility',
    title: 'Order calendar',
    body: 'Plan deliveries and standing orders on a living calendar — leadership sees what lands when.',
    ui: SUPPLIFY_PACK.ui.orderCalendar,
    span: 'compact' as const,
  },
  {
    id: 'staff',
    category: 'Operations',
    title: 'Staff & permissions',
    body: 'Role-based access for kitchens and warehouses — purchaser, receiving, accountant, each sees what they need.',
    ui: SUPPLIFY_PACK.ui.staff,
    span: 'compact' as const,
  },
] as const

export const PLATFORM_MORE = [
  'Quick lists & standing orders',
  'Multi-supplier carts',
  'Credit notes & invoicing',
  'Delivery tracking & GPS',
  'Reorder assistance',
  'Supplier promotions',
  'Dispute resolution',
  'Substitution workflows',
  'Supplier command center',
  'Restaurant KPIs',
  'Order event timeline',
  'Receiving workflows',
  'Catalog search & filters',
  'Multi-location support',
] as const

export const MARQUEE_FEATURES = [
  'RESTAURANT ↔ SUPPLIER ORDERING',
  'EVERYDAY PROBLEMS. NOT ORDINARY ERPS.',
  'LIVE ORDER CHAT',
  'DELIVERY TRACKING',
  'REORDER ASSISTANCE',
  'INVOICES & RECEIVABLES',
  'SUPPLIER DEALS & PROMOS',
  'ONE LIVE SYSTEM',
] as const
