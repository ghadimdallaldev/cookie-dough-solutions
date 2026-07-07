/**
 * Capture real Supplify dev UI screenshots for the marketing site.
 *
 * Accounts (seed:marketing-demo):
 *   restaurant-marina@supplify.com / Supplify1!
 *   supplier-al-barsha@supplify.com / Supplify1!
 */
import { chromium } from '@playwright/test'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const OUT_DIR = path.join(__dirname, '../public/images/supplify-cursor-pack/08-real-ui')
const BASE_URL = process.env.SUPPLIFY_CAPTURE_URL || 'https://app-dev.supplifyerp.com'
const VIEWPORT = { width: 1440, height: 900 }
const KEYCLOAK_REALM_PATH = '/realms/Supplify/'

const CRITICAL_PATTERNS = [
  /smoke_test/i,
  /could not load dispatch board/i,
  /failed to load command center/i,
  /access denied/i,
]

const SOFT_SKIP_PATTERNS = [
  /menu coming soon/i,
  /has not published a menu yet/i,
  /no quick lists yet/i,
  /no active deals right now/i,
]

/** @type {{ file: string; route: string; role: 'restaurant' | 'supplier'; waitMs?: number; hash?: string; prepare?: (page: import('@playwright/test').Page) => Promise<void> }[]} */
const SHOTS = [
  { file: 'restaurant-dashboard.png', route: '/app/dashboard', role: 'restaurant', waitMs: 4000 },
  {
    file: 'order-calendar.png',
    route: '/app/dashboard',
    role: 'restaurant',
    waitMs: 2000,
    async prepare(page) {
      const calTab = page.getByRole('tab', { name: /calendar/i }).first()
      const calBtn = page.getByRole('button', { name: /calendar/i }).first()
      if (await calTab.isVisible().catch(() => false)) await calTab.click()
      else if (await calBtn.isVisible().catch(() => false)) await calBtn.click()
      await page.waitForTimeout(1500)
    },
  },
  {
    file: 'catalog.png',
    route: '/app/products',
    role: 'restaurant',
    waitMs: 3500,
    async prepare(page) {
      const search = page.getByPlaceholder(/search product/i).first()
      if (await search.isVisible().catch(() => false)) {
        await search.fill('Burrata')
        await page.waitForTimeout(2500)
      }
    },
  },
  { file: 'restaurant-orders.png', route: '/app/orders', role: 'restaurant', waitMs: 3500 },
  { file: 'quick-lists.png', route: '/app/quick-lists', role: 'restaurant', waitMs: 3500 },
  { file: 'restaurant-inventory.png', route: '/app/restaurant-inventory', role: 'restaurant', waitMs: 3500 },
  {
    file: 'reorder-assistance.png',
    route: '/app/restaurant-inventory',
    role: 'restaurant',
    hash: 'reorder-assistance',
    waitMs: 3500,
    async prepare(page) {
      await page.evaluate(() => {
        const el =
          document.getElementById('reorder-assistance') ||
          document.querySelector('[data-testid="reorder-assistance-panel"]')
        el?.scrollIntoView({ block: 'start' })
      })
      await page.waitForTimeout(1000)
    },
  },
  { file: 'deals.png', route: '/app/deals', role: 'restaurant', waitMs: 3000 },
  { file: 'invoices-restaurant.png', route: '/app/invoices', role: 'restaurant', waitMs: 3500 },
  { file: 'disputes.png', route: '/app/disputes', role: 'restaurant', waitMs: 3000 },
  { file: 'chat.png', route: '/app/chat', role: 'restaurant', waitMs: 3500 },
  { file: 'receiving.png', route: '/app/receiving', role: 'restaurant', waitMs: 3500 },
  { file: 'reports-restaurant.png', route: '/app/reports', role: 'restaurant', waitMs: 4000 },
  { file: 'quote-requests.png', route: '/app/quote-requests', role: 'restaurant', waitMs: 3500 },
  {
    file: 'recipe-costing.png',
    route: '/app/recipe-costing',
    role: 'restaurant',
    waitMs: 3500,
  },
  { file: 'reservations.png', route: '/app/reservations', role: 'restaurant', waitMs: 4000 },
  {
    file: 'staff.png',
    route: '/app/staff',
    role: 'restaurant',
    waitMs: 3500,
    async prepare(page) {
      const team = page.getByRole('tab', { name: /^team$/i }).first()
      if (await team.isVisible().catch(() => false)) await team.click()
      await page.waitForTimeout(2000)
    },
  },
  { file: 'supplier-dashboard.png', route: '/app/dashboard', role: 'supplier', waitMs: 4000 },
  { file: 'command-center.png', route: '/app/command-center', role: 'supplier', waitMs: 4000 },
  { file: 'supplier-products.png', route: '/app/products', role: 'supplier', waitMs: 3500 },
  { file: 'supplier-orders.png', route: '/app/orders', role: 'supplier', waitMs: 3500 },
  { file: 'promotions-supplier.png', route: '/app/promotions', role: 'supplier', waitMs: 3500 },
  { file: 'run-sheet.png', route: '/app/run-sheet', role: 'supplier', waitMs: 4000 },
  { file: 'driver-deliveries.png', route: '/app/driver-deliveries', role: 'supplier', waitMs: 4000 },
  {
    file: 'supplier-fulfillment.png',
    route: '/app/fulfillment',
    role: 'supplier',
    waitMs: 4000,
    async prepare(page) {
      const routesTab = page.getByRole('tab', { name: /^routes$/i }).first()
      const dispatchTab = page.getByRole('tab', { name: /dispatch/i }).first()
      if (await routesTab.isVisible().catch(() => false)) {
        await routesTab.click()
        await page.waitForTimeout(3500)
        const body = await page.locator('body').innerText()
        if (!/could not load routes/i.test(body)) return
      }
      if (await dispatchTab.isVisible().catch(() => false)) {
        await dispatchTab.click()
        await page
          .waitForSelector(
            '[data-testid="dispatch-board-error"], [data-testid="dispatch-board-empty"], [data-testid^="dispatch-order-"], [data-testid="delivery-board-stats"]',
            { timeout: 25000 },
          )
          .catch(() => {})
        await page.waitForTimeout(3000)
      }
    },
  },
  { file: 'invoices-supplier.png', route: '/app/invoices', role: 'supplier', waitMs: 3500 },
  {
    file: 'consumer-menu.png',
    route: '/app/consumer-menu',
    role: 'restaurant',
    waitMs: 3500,
  },
  {
    file: 'public-reservations.png',
    route: '/reserve/demo',
    role: 'restaurant',
    waitMs: 4000,
    async prepare(page) {
      await page.waitForTimeout(2000)
    },
  },
  {
    file: 'staff-portal.png',
    route: '/staff/dashboard',
    role: 'restaurant',
    waitMs: 4000,
  },
  {
    file: 'supplier-ministore.png',
    route: '/supplier/al-barsha',
    role: 'supplier',
    waitMs: 4000,
  },
]

const ACCOUNT = {
  restaurant: { email: 'restaurant-marina@supplify.com', password: 'Supplify1!' },
  supplier: { email: 'supplier-al-barsha@supplify.com', password: 'Supplify1!' },
}

async function assertPageOk(page, label) {
  const scope =
    label === 'catalog.png'
      ? page.locator('main, [role="main"], table').first()
      : page.locator('body')
  const body = await scope.innerText().catch(() => page.locator('body').innerText())

  for (const pattern of CRITICAL_PATTERNS) {
    if (pattern.test(body)) {
      throw new Error(`${label}: page contains "${pattern.source}"`)
    }
  }
  for (const pattern of SOFT_SKIP_PATTERNS) {
    if (pattern.test(body)) {
      return { skip: true, reason: pattern.source }
    }
  }
  if (
    label.startsWith('supplier') &&
    /restaurant inventory|quick lists|reorder assistance|restaurant dashboard/i.test(body)
  ) {
    throw new Error(`${label}: captured restaurant portal instead of supplier`)
  }
  if (label.startsWith('supplier') && /Restaurant:\s*Marina Trattoria/i.test(body) && !/Supplier:\s*Al Barsha/i.test(body)) {
    throw new Error(`${label}: captured Marina restaurant tenant instead of Al Barsha supplier`)
  }
  return { skip: false }
}

async function assertSupplierFulfillmentReady(page, label) {
  const body = await page.locator('body').innerText()
  if (!/Supplier:\s*Al Barsha/i.test(body)) {
    throw new Error(`${label}: expected Al Barsha supplier breadcrumb`)
  }
  if (/Restaurant:\s*Marina Trattoria/i.test(body) && !/Supplier:\s*Al Barsha/i.test(body)) {
    throw new Error(`${label}: captured Marina restaurant tenant`)
  }
  const dispatchError = page.locator('[data-testid="dispatch-board-error"]')
  if (await dispatchError.isVisible().catch(() => false)) {
    throw new Error(`${label}: dispatch board API error`)
  }
  const hasDispatchOrders = (await page.locator('[data-testid^="dispatch-order-"]').count()) > 0
  const hasRouteContent =
    /RT-|route/i.test(body) &&
    !/could not load routes/i.test(body) &&
    !/no routes/i.test(body)
  const hasPickLists = /pick list|pick wave/i.test(body) && !/could not load pick lists/i.test(body)
  if (!hasDispatchOrders && !hasRouteContent && !hasPickLists) {
    throw new Error(`${label}: fulfillment tabs look empty — seed marketing demo or pick another tab`)
  }
}

async function attemptLogin(page, context, email, password) {
  await context.clearCookies()
  await page.goto(`${BASE_URL}/app/dashboard`, { waitUntil: 'domcontentloaded', timeout: 90000 })
  await page.waitForLoadState('networkidle').catch(() => {})

  let activePage = page
  let currentUrl = page.url()

  if (currentUrl.includes('/login')) {
    const keycloakButton = page.getByRole('button', { name: /keycloak/i }).first()
    const keycloakLink = page.getByRole('link', { name: /keycloak/i }).first()
    const keycloakFallback = page.locator('button:has-text("Keyclo")').first()
    let popup = null
    context.once('page', (p) => {
      popup = p
    })
    if (await keycloakButton.isVisible().catch(() => false)) await keycloakButton.click()
    else if (await keycloakLink.isVisible().catch(() => false)) await keycloakLink.click()
    else if (await keycloakFallback.isVisible().catch(() => false)) await keycloakFallback.click()
    else throw new Error('Keycloak sign-in control not found on /login')

    await page.waitForTimeout(1200)
    if (popup) {
      activePage = popup
      await activePage.waitForLoadState('domcontentloaded')
    } else {
      await page
        .waitForURL(
          (url) => {
            const h = typeof url === 'string' ? url : url.href
            return (h.includes('/realms/') && h.includes('/protocol/openid-connect/auth')) || !h.includes('/login')
          },
          { timeout: 20000 },
        )
        .catch(() => {})
      activePage = page
    }
    currentUrl = activePage.url()
  }

  const onKeycloak =
    currentUrl.includes(KEYCLOAK_REALM_PATH) ||
    (currentUrl.includes('/realms/') && currentUrl.includes('Supplify'))

  if (onKeycloak) {
    const usernameField = activePage.locator('#username').or(activePage.locator('input[name="username"]'))
    const passwordField = activePage.locator('#password').or(activePage.locator('input[name="password"]'))
    await usernameField.waitFor({ state: 'visible', timeout: 20000 })
    await passwordField.waitFor({ state: 'visible', timeout: 5000 })
    await usernameField.fill(email)
    await passwordField.fill(password)
    await activePage.locator('button[type="submit"]').or(activePage.locator('#kc-login')).first().click()

    const baseRegex = new RegExp(
      '^' + BASE_URL.replace(/[.*+?^${}()|[\]\\]/g, '\\$&').replace(/\/?$/, '') + '(/|$)',
    )
    await activePage.waitForURL(baseRegex, { timeout: 30000 })
  }

  await page.waitForTimeout(2500)
  if (page.url().includes('/login') || page.url().includes('expired=true')) {
    throw new Error(`Login failed for ${email}`)
  }
  await page.waitForSelector('[data-testid="sidebar"], aside nav, nav a', { timeout: 25000 }).catch(() => {})
}

async function hideChrome(page) {
  await page.addStyleTag({
    content: `
      [data-testid="impersonation-banner"],
      [data-testid="billing-banner"],
      .toast-viewport,
      [role="status"][aria-live="polite"] { display: none !important; }
    `,
  }).catch(() => {})
}

async function captureShot(page, shot) {
  const hash = shot.hash ? `#${shot.hash}` : ''
  await page.goto(`${BASE_URL}${shot.route}${hash}`, { waitUntil: 'domcontentloaded', timeout: 90000 })
  await page.waitForLoadState('networkidle').catch(() => {})
  await page.waitForTimeout(shot.waitMs ?? 2500)
  if (shot.prepare) await shot.prepare(page)

  if (shot.file === 'supplier-fulfillment.png') {
    await assertSupplierFulfillmentReady(page, shot.file)
  }

  const check = await assertPageOk(page, shot.file)
  if (check.skip) {
    console.log(`  ⚠ ${shot.file} skipped (${check.reason}) — keeping existing file`)
    return
  }

  await hideChrome(page)
  const outPath = path.join(OUT_DIR, shot.file)
  await page.screenshot({ path: outPath, fullPage: false, type: 'png' })
  console.log(`  ✓ ${shot.file} (${Math.round(fs.statSync(outPath).size / 1024)} KB)`)
}

async function captureOrderTracking(page) {
  await page.goto(`${BASE_URL}/app/orders`, { waitUntil: 'domcontentloaded' })
  await page.waitForLoadState('networkidle').catch(() => {})
  await page.waitForTimeout(2500)

  const orderLink = page.locator('a[href*="/app/orders/"]').first()
  if (await orderLink.isVisible().catch(() => false)) await orderLink.click()
  else throw new Error('order-tracking: no orders visible')

  await page.waitForLoadState('networkidle').catch(() => {})
  await page.waitForTimeout(3500)
  await assertPageOk(page, 'order-tracking.png')
  await hideChrome(page)

  const outPath = path.join(OUT_DIR, 'order-tracking.png')
  await page.screenshot({ path: outPath, fullPage: false, type: 'png' })
  console.log(`  ✓ order-tracking.png (${Math.round(fs.statSync(outPath).size / 1024)} KB)`)
}

async function createRoleContext(browser, role) {
  const context = await browser.newContext({
    viewport: VIEWPORT,
    deviceScaleFactor: 2,
    ignoreHTTPSErrors: true,
  })
  const page = await context.newPage()
  const creds = ACCOUNT[role]
  console.log(`\nLogging in (${role}) as ${creds.email}…`)
  await attemptLogin(page, context, creds.email, creds.password)
  console.log(`  → ${page.url()}`)
  return { context, page }
}

async function main() {
  fs.mkdirSync(OUT_DIR, { recursive: true })
  console.log(`Capturing from ${BASE_URL}`)
  console.log(`Output:     ${OUT_DIR}\n`)

  const browser = await chromium.launch({ headless: true })
  let currentRole = null
  let session = null

  for (const shot of SHOTS.filter((s) => {
    const only = process.env.CAPTURE_ONLY?.split(',').map((x) => x.trim()).filter(Boolean)
    return !only?.length || only.includes(s.file)
  })) {
    if (shot.role !== currentRole) {
      if (session) await session.context.close()
      session = await createRoleContext(browser, shot.role)
      currentRole = shot.role
    }
    console.log(`Capturing ${shot.file}…`)
    await captureShot(session.page, shot)
  }

  if (session?.context) await session.context.close()
  const only = process.env.CAPTURE_ONLY?.split(',').map((x) => x.trim()).filter(Boolean)
  if (!only?.length || only.includes('order-tracking.png')) {
    const restaurant = await createRoleContext(browser, 'restaurant')
    console.log('\nCapturing order-tracking.png…')
    await captureOrderTracking(restaurant.page)
    await restaurant.context.close()
  }

  await browser.close()
  console.log('\nDone.')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
