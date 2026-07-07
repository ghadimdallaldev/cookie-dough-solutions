import type { HomeWarmImageKey } from './cookie-dough-homepage'

// ─── Hero ───────────────────────────────────────────────────────────────────

export const HOME_HERO = {
  eyebrow: 'Cookie Dough · Solutions · Studio',
  leadPrefix: 'We fix',
  rotatingWords: ['POS.', 'Ordering.', 'Inventory.', 'Operations.', 'Your stack.'] as const,
  rotatingAriaLabel:
    'We fix POS, ordering, inventory, operations, and your hospitality stack',
  subhead: "Less spreadsheet archaeology. More Saturday night that actually works.",
  body:
    'Cookie Dough Solutions fixes the everyday ops issues that slow Lebanese restaurants and suppliers down — scattered orders, manual price lists, inventory guesswork, POS that can\'t handle a rush. We ship POS, ordering apps, supplier tools, and bespoke builds that fit how your team actually works.',
  primaryCta: 'Tell us the chaos',
  secondaryCta: 'What we fix',
  secondaryHref: '#capabilities',
  imageAlt: 'Cookie Dough Solutions — Lebanon hospitality software studio',
  imagePill: 'Built for the rush',
  imageCaption: 'Not a bakery. Lebanese F&B software though.',
} as const

// ─── Intro ──────────────────────────────────────────────────────────────────

export type HomeIntroStat = {
  target: number
  suffix: string
  label: string
  sub: string
  featured?: boolean
  accent?: boolean
}

export const HOME_INTRO = {
  panelEyebrow: 'Who we are',
  badgeShort: 'Est. 2026',
  badgeLong: 'Serving Lebanon since 2026',
  headline: 'The hospitality tech partner operators',
  headlineAccent: 'actually call back.',
  body:
    'Built in Lebanon for Lebanese restaurants, suppliers, and F&B operators — we fix the ops issues that generic software ignores. POS, ordering, supplier coordination, and bespoke platforms when off-the-shelf refuses to bend.',
  locationLine: 'Based in Beirut · Serving Lebanon',
  quickFacts: [
    'Typical go-live in weeks, not quarters',
    'Built with operators, not for slide decks',
    'Ownable systems with zero ERP lock-in',
  ] as const,
  stats: [
    {
      target: 3,
      suffix: '',
      label: 'Ways we fix ops',
      sub: 'Front · back · bespoke',
      featured: true,
    },
    {
      target: 1,
      suffix: '',
      label: 'Country we serve',
      sub: 'Lebanon',
    },
    {
      target: 1,
      suffix: '',
      label: 'Order thread',
      sub: 'Not another group chat',
    },
    {
      target: 0,
      suffix: '',
      label: 'WhatsApp ERPs',
      sub: 'Still required',
      accent: true,
    },
  ] satisfies HomeIntroStat[],
  imageCaption: 'Built for Saturday night',
  imageAlt: 'Lebanese restaurant team during service rush',
  primaryCta: 'Contact us',
  secondaryCta: 'Our story',
  secondaryHref: '#who-we-are',
} as const

// ─── Who we are ─────────────────────────────────────────────────────────────

export const HOME_WHO_WE_ARE = {
  eyebrow: 'Who we are',
  headline: "We've seen your Excel file.",
  headlineAccent: "We're here to fix it.",
  body:
    'Cookie Dough is a Lebanon-based hospitality software studio — embedded in how restaurants, suppliers, and F&B groups actually run. We fix scattered orders, manual catalogs, rush-mode POS failures, and the workflows no generic product handles.',
  trust: [
    { label: 'Lebanon-based', detail: 'Beirut studio, nationwide' },
    { label: 'Operator-first', detail: 'Not vendor-first' },
    { label: 'Rush-mode ready', detail: 'Saturday night tested' },
  ] as const,
  serviceAreas: ['Beirut', 'Mount Lebanon', 'Across Lebanon'] as const,
  serviceAreasLabel: 'Where we work',
  bentoEyebrow: 'How we fix daily ops',
  painsEyebrow: 'Sound familiar?',
  painsHeadline: "The chaos is universal. The fix doesn't have to be generic.",
  painsAside: 'Every Lebanese operator we meet has a version of these stories.',
  pains: [
    {
      text: 'POS crashes during the rush. Obviously.',
      tag: 'Rush-mode flows · modifiers · split checks',
    },
    {
      text: 'Your supplier price list is a PDF from last month.',
      tag: 'Live catalog — update once, both sides see it',
    },
    {
      text: 'Orders buried in a WhatsApp group.',
      tag: 'One order thread with full context',
    },
    {
      text: 'Inventory lives in one person\'s head.',
      tag: 'Tracked stock your whole team can rely on',
    },
    {
      text: 'Your ERP vendor says "submit a feature request."',
      tag: 'We build the workflow you need — in weeks, not quarters',
    },
  ] as const,
  primaryCta: 'Contact us',
  secondaryCta: 'What we fix',
  secondaryHref: '#capabilities',
} as const

// ─── Ops bento ──────────────────────────────────────────────────────────────

export const HOME_OPS_BENTO = {
  dailyOps: {
    eyebrow: 'Daily ops',
    statusBadge: 'Live in Lebanon',
    rows: [
      { title: 'Ordering', subtitle: 'Your menu · cart · checkout', status: 'Live' },
      { title: 'Suppliers', subtitle: 'Catalog · prices · dispatch', status: 'Synced' },
      { title: 'POS', subtitle: 'Modifiers · split checks · rush', status: 'Ready' },
    ] as const,
  },
  metric: {
    value: '1',
    label: 'One thread replaces the group chat',
  },
  sync: {
    title: 'Supplier sync',
    subtitle: 'Live catalogs · dispatch · order chat',
  },
  stack: {
    eyebrow: 'What we fix',
    pills: ['POS', 'Ordering apps', 'Inventory', 'Supplify'] as const,
  },
  beforeAfter: {
    before: 'WhatsApp orders + PDF price lists',
    after: 'One live system — restaurant & supplier',
  },
  operator: {
    caption: 'Built for Lebanese F&B operators',
    imageAlt: 'Lebanese restaurant operator — software built for real service',
  },
} as const

// ─── Marquee ────────────────────────────────────────────────────────────────

export const HOME_MARQUEE = {
  rowA: [
    'Orders tracked · not guessed',
    'Catalog live · no PDF',
    'Split checks · without tears',
    'Rush mode · actually works',
    'Not a bakery',
  ] as const,
  rowB: [
    'Dispatch tracked end-to-end',
    'Suppliers on one thread',
    'Stock your team can trust',
    'Built in Beirut · for Lebanon',
    'Fix the ops · keep the rush',
  ] as const,
} as const

// ─── Reality check ──────────────────────────────────────────────────────────

export const HOME_REALITY_CHECK = {
  sectionNumber: '02',
  eyebrow: 'The honest numbers',
  headline: "The state of F&B ops. (We've seen the spreadsheets.)",
  body:
    'We\'re not here to judge. We\'re here because Lebanese operators deserve software that fixes orders, prices, and stock — not another tab in the workbook.',
  imageAlt: 'Spreadsheet chaos running restaurant operations in Lebanon',
  stats: [
    {
      target: 3,
      unit: 'pain points',
      label: 'Common ops issues we fix every week — orders, prices, stock',
      aside: 'Sound familiar? Good. We built for this.',
    },
    {
      target: 1,
      unit: 'system',
      label: 'Instead of scattered spreadsheets and group chats',
      aside: 'One thread. One catalog. One source of truth.',
    },
    {
      target: 0,
      unit: 'times',
      label: 'A generic ERP shipped a feature built for your actual workflow',
      aside: 'We build around your workflow — not the other way around.',
    },
  ] as const,
} as const

// ─── Capabilities ───────────────────────────────────────────────────────────

export type HomeCapabilityCopy = {
  index: string
  category: string
  title: string
  lead: string
  body: string
  tags: readonly string[]
  imageKey: HomeWarmImageKey
  imageAlt: string
}

export const HOME_CAPABILITIES = {
  eyebrow: 'What we fix',
  headline: 'Three kinds of problems we fix every week.',
  body:
    'Front of house, back of house, and the stuff no generic product handles — for Lebanese restaurants, suppliers, and F&B operators.',
  cta: 'Start a project',
  panels: [
    {
      index: '01',
      category: 'Front of house',
      title: 'Guest ordering & rush-mode POS',
      lead:
        'Guests can\'t order smoothly, modifiers break the POS, and marketplace apps take your margin.',
      body:
        'We fix it with branded ordering and rush-proof POS your staff can actually use — modifiers, split checks, and Saturday night flows included.',
      tags: ['Branded ordering', 'Rush-mode POS', 'Modifiers & splits', 'Your margin'],
      imageKey: 'pillarPOS',
      imageAlt: 'POS and ordering app built for Lebanese hospitality rush mode',
    },
    {
      index: '02',
      category: 'Back of house',
      title: 'Supplier ops & inventory',
      lead:
        'Supplier orders in WhatsApp, prices re-entered by hand, dispatch is guesswork.',
      body:
        'We fix it with live catalogs, procurement, inventory, and dispatch in one ops layer — connected only as deep as you need, without the 200-screen ERP.',
      tags: ['Live catalogs', 'Procurement', 'Inventory', 'Dispatch'],
      imageKey: 'pillarOps',
      imageAlt: 'Back of house operations — supplier sync without ERP theater',
    },
    {
      index: '03',
      category: 'Bespoke',
      title: 'Workflows generic products can\'t touch',
      lead: 'Your workflow doesn\'t fit any off-the-shelf product.',
      body:
        'We architect from scratch or extend what we already built for you — franchise logic, odd approvals, legacy hardware, and the workflows ERP vendors put on a roadmap.',
      tags: ['Custom workflows', 'Integrations', 'Franchise logic', 'Actionable data'],
      imageKey: 'pillarBespoke',
      imageAlt: 'Bespoke hospitality software built for Lebanese operators',
    },
  ] satisfies HomeCapabilityCopy[],
} as const

// ─── Manifesto ───────────────────────────────────────────────────────────────

export const HOME_MANIFESTO = {
  eyebrow: 'What we believe',
  lines: [
    { main: 'Fix the ops issue,', accent: 'not the slide deck.' },
    { main: 'Software that survives', accent: 'Saturday night.' },
    { main: 'Built in Lebanon,', accent: 'for how you actually work.' },
    { main: 'No ERP theater.', accent: 'Ever.' },
    { main: 'Custom when off-the-shelf', accent: 'is a polite lie.' },
  ] as const,
} as const

// ─── Testimonials ───────────────────────────────────────────────────────────

export const HOME_TESTIMONIALS = {
  eyebrow: 'What operators say',
  headline: 'Real kitchens. Real fixes.',
  cta: 'Tell us the chaos',
  items: [
    {
      quote:
        'Orders lived in three WhatsApp groups and a spreadsheet nobody trusted. Cookie Dough gave us one thread — suppliers see what we see, and morning reconciliation actually finishes before service.',
      role: 'Multi-branch restaurant owner',
      market: 'Lebanon',
      rating: 5,
    },
    {
      quote:
        'Our price list was a PDF someone retyped every week. Now the catalog updates once and both sides see it live. No more "which version is correct?" arguments.',
      role: 'Procurement lead',
      market: 'Lebanon',
      rating: 5,
    },
    {
      quote:
        'Modifiers used to crash the POS every Saturday. The rush-mode flow they built handles split checks and custom orders without the whole floor stopping.',
      role: 'Front-of-house manager',
      market: 'Lebanon',
      rating: 5,
    },
    {
      quote:
        'Supplify replaced the group chats and the printed price lists. Dispatch is tracked, chat stays on the order, and we stopped losing requests in unread messages.',
      role: 'Supplier ops manager',
      market: 'Lebanon',
      rating: 5,
    },
    {
      quote:
        'Our ERP vendor quoted eighteen months for a workflow we needed next quarter. Cookie Dough built it in weeks — approvals, franchise rules, and all.',
      role: 'Franchise operator',
      market: 'Lebanon',
      rating: 5,
    },
    {
      quote:
        'Inventory was tribal knowledge — one person knew what was left. Now stock is tracked and the kitchen trusts the numbers. Variance went from panic to boring.',
      role: 'Kitchen & inventory lead',
      market: 'Lebanon',
      rating: 5,
    },
    {
      quote:
        'Training new staff on the old POS took a week. The new flows are an afternoon — modifiers, splits, and rush shortcuts without a manual the size of a menu.',
      role: 'Restaurant group operator',
      market: 'Lebanon',
      rating: 5,
    },
    {
      quote:
        'We stopped losing orders in group chats. Restaurants and suppliers work from the same numbers now — that alone paid for the project.',
      role: 'Regional distributor',
      market: 'Lebanon',
      rating: 5,
    },
  ] as const,
} as const

// ─── Finale ─────────────────────────────────────────────────────────────────

export const HOME_FINALE = {
  aboutEyebrow: 'Success is more',
  aboutHeadline: 'Co-piloting the future of Lebanese hospitality.',
  aboutEmail: 'hello@cookiedough.app',
  aboutTagline: 'Beirut studio · Serving Lebanon since 2026',
  stats: [
    { value: 3, suffix: '', label: 'Ways we fix ops' },
    { value: 1, suffix: '', label: 'Country we serve' },
    { value: 0, suffix: '', label: 'WhatsApp groups needed as ERPs' },
  ] as const,
  regionsLabel: 'Where we work',
  regions: ['Lebanon', 'Beirut', 'Mount Lebanon', 'Nationwide'] as const,
  contactEyebrow: 'Cookie Dough Solutions',
  contactHeadline: "We've seen worse. Tell us anyway.",
  contactBody:
    'POS, ordering, supplier ops — or just describe your current spreadsheet situation. We fix everyday Lebanese F&B problems, not generic software demos.',
  contactPromises: [
    'Reply in one business day',
    'Practical roadmap, no jargon deck',
    'Clear scope before build',
  ] as const,
  contactPrimaryCta: "Let's fix this",
  contactSecondaryCta: 'See capabilities',
  contactImageAlt: 'Warm Cookie Dough workspace in Beirut — start a conversation',
} as const

// ─── Trust band (unused — kept in sync) ─────────────────────────────────────

export const HOME_TRUST_BAND = {
  tagline: 'Built for operators who cannot wait on another feature request',
  stats: [
    { label: '3 ways we fix ops', detail: 'Front · back · bespoke' },
    { label: 'Lebanon-based', detail: 'Beirut studio' },
    { label: 'Operator-first', detail: 'Since 2026' },
    { label: '1 country', detail: 'Serving Lebanon' },
  ] as const,
} as const

// ─── Pillars (unused — kept in sync) ────────────────────────────────────────

export const HOME_PILLARS = {
  eyebrow: 'What we fix',
  headline: 'Three kinds of problems we fix every week.',
  body:
    'Front of house, back of house, and bespoke workflows for Lebanese F&B — without the ERP theater and the six-month timeline nobody warned you about.',
  items: [
    {
      index: '01',
      category: 'Front of house',
      title: 'Guest ordering & rush-mode POS',
      lead: "Guests can't order smoothly and the POS breaks when modifiers pile up.",
      body:
        'We fix it with branded ordering, counter flows, and rush-mode POS — built for modifiers, split checks, and staff who cannot afford a manual.',
      callout: 'Fix the rush. Keep the margin.',
      imageKey: 'pillarPOS' as HomeWarmImageKey,
      imageAlt: 'POS and ordering app built for Lebanese hospitality rush mode',
    },
    {
      index: '02',
      category: 'Back of house',
      title: 'Supplier ops without ERP baggage',
      lead: 'Supplier orders in WhatsApp, prices re-entered by hand, dispatch is guesswork.',
      body:
        'We fix it with live catalogs, procurement, inventory, and dispatch — connected only as deep as you need, without the enterprise suite nobody uses.',
      callout: 'One catalog. Both sides. No PDF archaeology.',
      imageKey: 'pillarOps' as HomeWarmImageKey,
      imageAlt: 'Back of house operations — supplier sync for Lebanese operators',
    },
    {
      index: '03',
      category: 'Bespoke',
      title: 'Workflows generic products can\'t touch',
      lead: "Your workflow doesn't fit any off-the-shelf product.",
      body:
        'We architect from scratch or extend what we already built — franchise logic, odd approvals, legacy hardware. No two kitchens are alike.',
      callout: 'Custom when off-the-shelf is a polite lie.',
      imageKey: 'pillarBespoke' as HomeWarmImageKey,
      imageAlt: 'Bespoke hospitality software built for Lebanese operators',
    },
  ] as const,
} as const

// ─── Meta ───────────────────────────────────────────────────────────────────

export const HOME_META = {
  title: 'Cookie Dough Solutions',
  description:
    'Cookie Dough Solutions — Lebanon-based software that fixes everyday ops for restaurants, suppliers, and F&B operators. POS, ordering, inventory, and supplier coordination.',
} as const
