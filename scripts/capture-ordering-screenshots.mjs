/**
 * Capture real Al Maalem ordering UI screenshots for the marketing site.
 * Flow: /menu/all → Fire Burger customize → add to cart → cart drawer → checkout.
 */
import { chromium } from '@playwright/test'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const OUT_DIR = path.join(__dirname, '../public/images/ordering-app-ui')
const BASE_URL = (process.env.ORDERING_CAPTURE_URL || 'https://www.almaalem.shop').replace(/\/$/, '')
const VIEWPORT = { width: 390, height: 844 }

const HOMEPAGE_PATTERNS = [
  /charcoal flavor, delivered hot/i,
  /order direct from al maalem/i,
  /skip the marketplace/i,
]

const EMPTY_CART_PATTERNS = [
  /your cart is empty/i,
  /add something from the grill/i,
]

/** @type {{ file: string; prepare: (ctx: import('@playwright/test').Page) => Promise<void>; assert?: (page: import('@playwright/test').Page) => Promise<void> }[]} */
const SHOTS = [
  {
    file: 'ordering-01-menu.png',
    async prepare(page) {
      await gotoMenu(page)
      await scrollToBurgers(page)
      await waitForMenuImages(page)
    },
    async assert(page) {
      await assertNotHomepage(page, 'ordering-01-menu.png')
      const body = await page.locator('body').innerText()
      if (!/full menu|burgers|combos|sandwiches/i.test(body)) {
        throw new Error('ordering-01-menu.png: menu categories not visible')
      }
    },
  },
  {
    file: 'ordering-02-customize.png',
    async prepare(page) {
      await gotoMenu(page)
      await openFireBurger(page)
      await page.waitForTimeout(800)
    },
    async assert(page) {
      await assertNotHomepage(page, 'ordering-02-customize.png')
      const body = await page.locator('body').innerText()
      if (!/fire burger|add to cart|special instructions/i.test(body)) {
        throw new Error('ordering-02-customize.png: customize sheet not visible')
      }
    },
  },
  {
    file: 'ordering-03-cart.png',
    async prepare(page) {
      await gotoMenu(page)
      await openFireBurger(page)
      await addToCart(page)
      await openCartDrawer(page)
      await page.waitForTimeout(600)
    },
    async assert(page) {
      await assertNotEmptyCart(page, 'ordering-03-cart.png')
      const body = await page.locator('body').innerText()
      if (!/fire burger|subtotal|checkout/i.test(body)) {
        throw new Error('ordering-03-cart.png: cart line items not visible')
      }
    },
  },
  {
    file: 'ordering-04-checkout.png',
    async prepare(page) {
      await gotoMenu(page)
      await openFireBurger(page)
      await addToCart(page)
      await openCartDrawer(page)
      await proceedToCheckout(page)
      await page.waitForTimeout(1200)
    },
    async assert(page) {
      await assertNotEmptyCart(page, 'ordering-04-checkout.png')
      const body = await page.locator('body').innerText()
      if (!/delivery|order summary|checkout|contact|address/i.test(body)) {
        throw new Error('ordering-04-checkout.png: checkout form not visible')
      }
    },
  },
]

async function gotoMenu(page) {
  await page.goto(`${BASE_URL}/menu/all`, { waitUntil: 'domcontentloaded', timeout: 90000 })
  await page.waitForLoadState('networkidle').catch(() => {})
  await page.waitForTimeout(1200)
  await dismissOverlays(page)
}

async function scrollToBurgers(page) {
  const burgersHeading = page.getByRole('heading', { name: /^burgers$/i }).first()
  if (await burgersHeading.count()) {
    await burgersHeading.scrollIntoViewIfNeeded()
    await page.waitForTimeout(500)
    return
  }
  const chip = page.locator('a[href="/menu/burgers"]').filter({ hasText: /^burgers$/i }).last()
  if (await chip.isVisible().catch(() => false)) {
    await chip.scrollIntoViewIfNeeded()
    await chip.click({ force: true })
    await page.waitForTimeout(800)
  }
}

async function waitForMenuImages(page) {
  await page.waitForFunction(() => {
    const imgs = [...document.querySelectorAll('main img, [role="main"] img, img')]
    return imgs.some((img) => img.complete && img.naturalWidth > 0)
  }).catch(() => {})
  await page.waitForTimeout(500)
}

async function openFireBurger(page) {
  await scrollToBurgers(page)
  const fireBurger = page.getByRole('button', { name: /^fire burger/i }).first()
  const fallback = page.getByRole('button', { name: /burger|combo|sandwich/i }).first()
  if (await fireBurger.isVisible().catch(() => false)) {
    await fireBurger.scrollIntoViewIfNeeded()
    await fireBurger.click({ force: true })
  } else if (await fallback.isVisible().catch(() => false)) {
    await fallback.scrollIntoViewIfNeeded()
    await fallback.click({ force: true })
  } else {
    throw new Error('No menu item button found for customize capture')
  }
  await page.waitForSelector('text=/add to cart|special instructions|quantity/i', { timeout: 15000 })
}

async function addToCart(page) {
  const addBtn = page.getByRole('button', { name: /^add to cart$/i }).first()
  if (await addBtn.isVisible().catch(() => false)) {
    await addBtn.click()
    await page.waitForTimeout(1000)
    return
  }
  const fallback = page.locator('button:has-text("Add to cart"), button:has-text("Add To Cart")').first()
  if (await fallback.isVisible().catch(() => false)) {
    await fallback.click()
    await page.waitForTimeout(1000)
    return
  }
  throw new Error('Add to cart button not found')
}

async function openCartDrawer(page) {
  const cartBtn = page.getByRole('button', { name: /open cart/i }).first()
  if (await cartBtn.isVisible().catch(() => false)) {
    await cartBtn.click()
    await page.waitForTimeout(900)
    return
  }
  const cartLink = page.getByRole('link', { name: /^cart$/i }).first()
  if (await cartLink.isVisible().catch(() => false)) {
    await cartLink.click()
    await page.waitForTimeout(900)
    return
  }
  throw new Error('Cart open control not found')
}

async function proceedToCheckout(page) {
  const checkoutBtn = page
    .getByRole('button', { name: /checkout|proceed to checkout|continue to checkout/i })
    .first()
  if (await checkoutBtn.isVisible().catch(() => false)) {
    await checkoutBtn.click()
    await page.waitForLoadState('networkidle').catch(() => {})
    return
  }
  await page.goto(`${BASE_URL}/checkout`, { waitUntil: 'domcontentloaded', timeout: 60000 })
  await page.waitForLoadState('networkidle').catch(() => {})
}

async function dismissOverlays(page) {
  const cookieBtn = page.getByRole('button', { name: /accept|agree|got it|allow/i }).first()
  if (await cookieBtn.isVisible().catch(() => false)) {
    await cookieBtn.click().catch(() => {})
    await page.waitForTimeout(400)
  }
}

async function hideChrome(page) {
  await page.addStyleTag({
    content: `
      a[href*="whatsapp"],
      a[href*="wa.me"],
      [class*="whatsapp" i],
      [id*="whatsapp" i],
      [data-testid*="whatsapp" i],
      [class*="cookie" i],
      [id*="cookie" i],
      [aria-label*="cookie" i],
      .toast-viewport,
      [role="status"][aria-live="polite"] { display: none !important; visibility: hidden !important; }
    `,
  }).catch(() => {})
}

async function assertNotHomepage(page, label) {
  const body = await page.locator('body').innerText()
  for (const pattern of HOMEPAGE_PATTERNS) {
    if (pattern.test(body)) {
      throw new Error(`${label}: captured homepage hero instead of menu flow`)
    }
  }
}

async function assertNotEmptyCart(page, label) {
  const body = await page.locator('body').innerText()
  for (const pattern of EMPTY_CART_PATTERNS) {
    if (pattern.test(body)) {
      throw new Error(`${label}: cart is empty — add items before capture`)
    }
  }
}

async function captureShot(page, shot) {
  await shot.prepare(page)
  if (shot.assert) await shot.assert(page)
  await hideChrome(page)
  const outPath = path.join(OUT_DIR, shot.file)
  await page.screenshot({ path: outPath, fullPage: false, type: 'png' })
  console.log(`  ✓ ${shot.file} (${Math.round(fs.statSync(outPath).size / 1024)} KB)`)
}

async function main() {
  fs.mkdirSync(OUT_DIR, { recursive: true })
  const only = process.env.CAPTURE_ONLY?.split(',').map((x) => x.trim()).filter(Boolean)
  const shots = only?.length ? SHOTS.filter((s) => only.includes(s.file)) : SHOTS

  console.log(`Capturing from ${BASE_URL}`)
  console.log(`Output:     ${OUT_DIR}\n`)

  const browser = await chromium.launch({ headless: true })
  const context = await browser.newContext({
    viewport: VIEWPORT,
    deviceScaleFactor: 2,
    isMobile: true,
    hasTouch: true,
  })
  const page = await context.newPage()

  for (const shot of shots) {
    console.log(`Capturing ${shot.file}…`)
    await captureShot(page, shot)
  }

  await context.close()
  await browser.close()
  console.log('\nDone.')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
