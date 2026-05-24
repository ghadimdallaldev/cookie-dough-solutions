/** Supplify flagship page assets — public/images/supplify-cursor-pack/ */
const B = '/images/supplify-cursor-pack'

export type PackImage = {
  src: string
  position?: string
  fit?: 'cover' | 'contain'
}

export const p = (path: string) => `${B}/${path}`

export const SUPPLIFY_PACK = {
  hero: {
    scene: p('01-hero/supplify-hero-scene.png'),
    primaryUI: p('08-real-ui/restaurant-dashboard.png'),
    secondaryUI: [p('08-real-ui/catalog.png'), p('08-real-ui/restaurant-orders.png')] as const,
  },
  oldWay: {
    scene: p('02-old-way/old-way-chaos-scene.png'),
  },
  walkthrough: {
    scenes: [
      p('03-walkthrough/catalog-ordering-scene.png'),
      p('03-walkthrough/dispatch-fulfillment-scene.png'),
    ] as const,
    ui: [
      p('08-real-ui/catalog.png'),
      p('08-real-ui/quick-lists.png'),
      p('08-real-ui/supplier-fulfillment.png'),
      p('08-real-ui/order-calendar.png'),
    ] as const,
  },
  pillars: {
    scene: p('04-pillars/communication-disputes-scene.png'),
    ui: [
      p('08-real-ui/disputes.png'),
      p('08-real-ui/restaurant-dashboard.png'),
      p('08-real-ui/supplier-dashboard.png'),
      p('08-real-ui/restaurant-inventory.png'),
    ] as const,
  },
  operationsTimeline: {
    ui: p('05-operations-timeline/operations-timeline-ui.png'),
  },
  split: {
    restaurantScene: p('06-restaurant-vs-supplier/restaurant-operators-scene.png'),
    restaurantUI: [
      p('08-real-ui/restaurant-dashboard.png'),
      p('08-real-ui/restaurant-inventory.png'),
    ] as const,
    supplierScene: p('06-restaurant-vs-supplier/supplier-warehouse-scene.png'),
    supplierUI: [
      p('08-real-ui/supplier-dashboard.png'),
      p('08-real-ui/supplier-orders.png'),
    ] as const,
  },
  finale: {
    scene: p('07-finale/finale-product-scene.png'),
    optionalUI: [
      p('08-real-ui/supplier-fulfillment.png'),
      p('08-real-ui/restaurant-dashboard.png'),
    ] as const,
  },
  ui: {
    catalog: p('08-real-ui/catalog.png'),
    disputes: p('08-real-ui/disputes.png'),
    orderCalendar: p('08-real-ui/order-calendar.png'),
    quickLists: p('08-real-ui/quick-lists.png'),
    reservations: p('08-real-ui/reservations.png'),
    restaurantDashboard: p('08-real-ui/restaurant-dashboard.png'),
    restaurantInventory: p('08-real-ui/restaurant-inventory.png'),
    restaurantOrders: p('08-real-ui/restaurant-orders.png'),
    supplierDashboard: p('08-real-ui/supplier-dashboard.png'),
    supplierFulfillment: p('08-real-ui/supplier-fulfillment.png'),
    supplierOrders: p('08-real-ui/supplier-orders.png'),
    supplierProducts: p('08-real-ui/supplier-products.png'),
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
    body: 'No more screenshot archaeology in group chats. Smart carts, quick lists, and one-tap reorders — the way your team actually orders.',
    scene: SUPPLIFY_PACK.walkthrough.scenes[0],
    ui: SUPPLIFY_PACK.walkthrough.ui[1],
  },
  {
    title: 'Confirm fulfillment',
    body: 'Suppliers pick, pack, and confirm in one place. Both sides see the same truth before the truck leaves — no more “I thought you knew.”',
    scene: SUPPLIFY_PACK.walkthrough.scenes[1],
    ui: SUPPLIFY_PACK.walkthrough.ui[2],
  },
  {
    title: 'Track dispatch',
    body: 'Drivers, routes, and live status — last mile without another spreadsheet or a frantic phone call at 6 AM.',
    scene: SUPPLIFY_PACK.walkthrough.scenes[1],
    ui: SUPPLIFY_PACK.ui.supplierFulfillment,
  },
  {
    title: 'Receive goods',
    body: 'Receiving tied to the order line — what arrived, what didn’t, and what needs a conversation before service starts.',
    scene: SUPPLIFY_PACK.split.supplierScene,
    ui: SUPPLIFY_PACK.walkthrough.ui[3],
  },
  {
    title: 'Close the loop',
    body: 'Disputes, credit notes, and invoice reconciliation — handled in-app, securely, not over WhatsApp at midnight.',
    scene: SUPPLIFY_PACK.pillars.scene,
    ui: SUPPLIFY_PACK.ui.disputes,
  },
] as const

export const PRODUCT_PILLARS = [
  {
    index: '01',
    category: 'Procurement',
    title: 'Ordering that ends the patchwork',
    body: 'Tired of orders scattered across phones and inboxes? Multi-supplier catalogs, carts, standing orders, and chat with context — built for rush mode and real receiving.',
    ui: SUPPLIFY_PACK.ui.catalog,
    scene: SUPPLIFY_PACK.walkthrough.scenes[0],
  },
  {
    index: '02',
    category: 'Supplier operations',
    title: 'Warehouse to dispatch, one thread',
    body: 'Stop drowning in restaurant requests during peak hours. Pick lists, fulfillment confirmation, driver routes, and supplier dashboards — ops depth without ERP theater.',
    ui: SUPPLIFY_PACK.ui.supplierDashboard,
    scene: SUPPLIFY_PACK.split.supplierScene,
  },
  {
    index: '03',
    category: 'Communication',
    title: 'Disputes where the order lives',
    body: 'Context lost in voice notes? Live order chat with file attachments, substitutions, and dispute handling — every conversation tied to the order line, safe and traceable.',
    ui: SUPPLIFY_PACK.ui.disputes,
    scene: SUPPLIFY_PACK.pillars.scene,
  },
  {
    index: '04',
    category: 'Visibility',
    title: 'Leadership stops exporting to Excel',
    body: 'No more blind spots at close. Order calendar, KPIs, inventory truth, and roles — operators see what matters without another module maze.',
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

/** Before → after: the restaurant–supplier ordering problem we solved */
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

/** The connected ordering loop — restaurant ↔ supplier */
export const ORDERING_LOOP = [
  {
    step: '01',
    side: 'Restaurant',
    title: 'Browse & order',
    body: 'Live supplier catalogs, multi-supplier carts, quick lists, and one-tap reorders — built for rush mode, not spreadsheet archaeology.',
  },
  {
    step: '02',
    side: 'Supplify',
    title: 'One live thread',
    body: 'Every line item, substitution, chat message, and attachment lives on the order — auditable, secure, and visible to both sides in real time.',
  },
  {
    step: '03',
    side: 'Supplier',
    title: 'Pick, pack & dispatch',
    body: 'Incoming restaurant orders in one queue. Fulfillment confirmation, driver routes, and delivery updates — no juggling phones during peak hours.',
  },
] as const

/** Platform capabilities — bento feature grid */
export const PLATFORM_FEATURES = [
  {
    id: 'ordering',
    category: 'Core',
    title: 'Restaurant ↔ supplier ordering',
    body: 'The heart of Supplify. Restaurants order from live catalogs; suppliers receive, confirm, and fulfill in one connected loop — we fixed the chaos between both sides.',
    ui: SUPPLIFY_PACK.ui.catalog,
    span: 'wide' as const,
  },
  {
    id: 'reservations',
    category: 'Inventory',
    title: 'Full reservation system',
    body: 'Hold stock before you commit. Full inventory reservations — reserve quantities against incoming orders, prevent overselling, and give both sides clarity before the truck leaves.',
    ui: SUPPLIFY_PACK.ui.reservations,
    span: 'normal' as const,
  },
  {
    id: 'chat',
    category: 'Communication',
    title: 'Live chat on every order',
    body: 'No more context-free WhatsApp threads. In-app chat tied to the order line — substitutions, delays, disputes, and file attachments, all in one auditable thread.',
    ui: SUPPLIFY_PACK.ui.disputes,
    span: 'wide' as const,
  },
  {
    id: 'staff',
    category: 'Operations',
    title: 'Staff management',
    body: 'Role-based access for kitchens and warehouses. Assign permissions by location, department, or function — so the right people see the right orders, catalogs, and reports.',
    span: 'normal' as const,
  },
  {
    id: 'deals',
    category: 'Growth',
    title: 'Deals & promotions for suppliers',
    body: 'Suppliers run targeted deals, volume promos, and seasonal offers directly in catalog — restaurants see live pricing without another PDF or phone call.',
    ui: SUPPLIFY_PACK.ui.supplierProducts,
    span: 'normal' as const,
  },
  {
    id: 'fulfillment',
    category: 'Logistics',
    title: 'Dispatch & fulfillment',
    body: 'Pick lists, pack confirmation, driver assignment, and live delivery status — last mile without another spreadsheet.',
    ui: SUPPLIFY_PACK.ui.supplierFulfillment,
    span: 'compact' as const,
  },
  {
    id: 'inventory',
    category: 'Visibility',
    title: 'Inventory truth',
    body: 'Receiving tied to order lines. What arrived, what didn’t, and what needs a conversation before service starts.',
    ui: SUPPLIFY_PACK.ui.restaurantInventory,
    span: 'compact' as const,
  },
  {
    id: 'calendar',
    category: 'Planning',
    title: 'Order calendar',
    body: 'Standing orders, delivery windows, and procurement planning — leadership stops exporting to Excel.',
    ui: SUPPLIFY_PACK.ui.orderCalendar,
    span: 'compact' as const,
  },
] as const

export const PLATFORM_MORE = [
  'Quick lists & standing orders',
  'Multi-supplier carts',
  'Credit notes & invoicing',
  'Dispute resolution',
  'Substitution workflows',
  'Supplier dashboards',
  'Restaurant KPIs',
  'Role-based permissions',
  'Order event timeline',
  'Receiving workflows',
  'Catalog search & filters',
  'Multi-location support',
] as const

export const MARQUEE_FEATURES = [
  'RESTAURANT ↔ SUPPLIER ORDERING',
  'WE FIXED THE CHAOS',
  'LIVE ORDER CHAT',
  'FILE ATTACHMENTS IN-THREAD',
  'INVENTORY RESERVATIONS',
  'STAFF MANAGEMENT',
  'SUPPLIER DEALS & PROMOS',
  'ONE LIVE SYSTEM',
] as const
