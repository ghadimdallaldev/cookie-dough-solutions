/**
 * Capture real Al Maalem food/lifestyle photos from almaalem.shop for the marketing site.
 */
import { chromium } from '@playwright/test'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const OUT_DIR = path.join(__dirname, '../public/images/al-maalem')
const BASE_URL = (process.env.ORDERING_CAPTURE_URL || 'https://www.almaalem.shop').replace(/\/$/, '')
const VIEWPORT = { width: 390, height: 844 }

async function hideChrome(page) {
  await page.addStyleTag({
    content: `
      a[href*="whatsapp"],
      a[href*="wa.me"],
      [class*="whatsapp" i],
      [class*="cookie" i],
      [id*="cookie" i] { display: none !important; }
    `,
  }).catch(() => {})
}

async function dismissOverlays(page) {
  const cookieBtn = page.getByRole('button', { name: /accept|agree|got it|allow/i }).first()
  if (await cookieBtn.isVisible().catch(() => false)) {
    await cookieBtn.click().catch(() => {})
    await page.waitForTimeout(400)
  }
}

async function fetchImageBuffer(page, url) {
  const absolute = url.startsWith('http') ? url : new URL(url, BASE_URL).href
  const response = await page.request.get(absolute)
  if (!response.ok()) throw new Error(`Failed to fetch image: ${absolute} (${response.status()})`)
  return Buffer.from(await response.body())
}

async function captureHeroBg(page) {
  await page.goto(BASE_URL, { waitUntil: 'networkidle', timeout: 90000 })
  await dismissOverlays(page)
  await hideChrome(page)
  await page.waitForTimeout(1500)

  const hero = page.locator('section').filter({ has: page.getByRole('heading', { name: /charcoal flavor/i }) }).first()
  const target = (await hero.count()) > 0 ? hero : page.locator('main section').first()
  await target.waitFor({ state: 'visible', timeout: 15000 })

  const rawPath = path.join(OUT_DIR, '_hero-bg-raw.png')
  await target.screenshot({ path: rawPath, type: 'png' })

  const outPath = path.join(OUT_DIR, 'hero-bg.jpg')
  await sharp(rawPath)
    .resize(1920, 1080, { fit: 'cover', position: 'centre' })
    .jpeg({ quality: 88, mozjpeg: true })
    .toFile(outPath)
  fs.unlinkSync(rawPath)
  console.log(`  ✓ hero-bg.jpg (${Math.round(fs.statSync(outPath).size / 1024)} KB)`)
}

async function captureFoodSpread(page) {
  await page.goto(BASE_URL, { waitUntil: 'networkidle', timeout: 90000 })
  await dismissOverlays(page)
  await hideChrome(page)

  const section = page.locator('section').filter({
    has: page.getByRole('heading', { name: /chef'?s picks from the grill/i }),
  }).first()
  await section.scrollIntoViewIfNeeded()
  await page.waitForFunction(() => {
    const section = [...document.querySelectorAll('section')].find((el) =>
      /chef'?s picks from the grill/i.test(el.textContent || ''),
    )
    if (!section) return false
    const imgs = [...section.querySelectorAll('img')]
    return imgs.length >= 3 && imgs.every((img) => img.complete && img.naturalWidth > 0)
  }).catch(() => {})
  await page.waitForTimeout(1200)

  const rawPath = path.join(OUT_DIR, '_food-spread-raw.png')
  await section.screenshot({ path: rawPath, type: 'png' })

  const outPath = path.join(OUT_DIR, 'hero-food-spread.jpg')
  await sharp(rawPath)
    .resize(1600, 900, { fit: 'cover', position: 'centre' })
    .jpeg({ quality: 88, mozjpeg: true })
    .toFile(outPath)
  fs.unlinkSync(rawPath)
  console.log(`  ✓ hero-food-spread.jpg (${Math.round(fs.statSync(outPath).size / 1024)} KB)`)
}

async function captureFireBurger(page) {
  await page.goto(`${BASE_URL}/menu/all`, { waitUntil: 'networkidle', timeout: 90000 })
  await dismissOverlays(page)

  const burgersHeading = page.getByRole('heading', { name: /^burgers$/i }).first()
  if (await burgersHeading.count()) {
    await burgersHeading.scrollIntoViewIfNeeded()
    await page.waitForTimeout(600)
  } else {
    const chip = page.locator('a[href="/menu/burgers"]').filter({ hasText: /^burgers$/i }).last()
    if (await chip.isVisible().catch(() => false)) {
      await chip.click({ force: true })
      await page.waitForTimeout(800)
    }
  }

  const fireCard = page.getByRole('button', { name: /^fire burger/i }).first()
  await fireCard.scrollIntoViewIfNeeded()
  const img = fireCard.locator('img').first()
  await img.waitFor({ state: 'visible', timeout: 15000 })
  const src = await img.getAttribute('src')
  if (!src) throw new Error('Fire Burger image src not found')

  const buffer = await fetchImageBuffer(page, src)
  const outPath = path.join(OUT_DIR, 'burger-maalem.png')
  await sharp(buffer)
    .resize(800, 800, { fit: 'cover', position: 'centre' })
    .png({ compressionLevel: 9, effort: 10, palette: false })
    .toFile(outPath)

  // Recompress large photo PNGs via JPEG round-trip quality tuning when over budget
  if (fs.statSync(outPath).size > 600 * 1024) {
    const jpegBuf = await sharp(outPath).jpeg({ quality: 88, mozjpeg: true }).toBuffer()
    await sharp(jpegBuf).png({ compressionLevel: 9, effort: 10 }).toFile(outPath)
  }
  console.log(`  ✓ burger-maalem.png (${Math.round(fs.statSync(outPath).size / 1024)} KB)`)
}

async function captureRestaurant(page) {
  await page.goto(BASE_URL, { waitUntil: 'networkidle', timeout: 90000 })
  await dismissOverlays(page)
  await hideChrome(page)

  const section = page.locator('section, div').filter({
    has: page.getByRole('heading', { name: /real charcoal flavor, right in haret hreik/i }),
  }).first()
  await section.scrollIntoViewIfNeeded()
  await page.waitForTimeout(1200)

  const rawPath = path.join(OUT_DIR, '_restaurant-raw.png')
  await section.screenshot({ path: rawPath, type: 'png' })

  const outPath = path.join(OUT_DIR, 'restaurant.png')
  await sharp(rawPath)
    .resize(800, 600, { fit: 'cover', position: 'centre' })
    .png({ compressionLevel: 9 })
    .toFile(outPath)
  fs.unlinkSync(rawPath)
  console.log(`  ✓ restaurant.png (${Math.round(fs.statSync(outPath).size / 1024)} KB)`)
}

const ASSETS = [
  { name: 'hero-bg.jpg', fn: captureHeroBg },
  { name: 'hero-food-spread.jpg', fn: captureFoodSpread },
  { name: 'burger-maalem.png', fn: captureFireBurger },
  { name: 'restaurant.png', fn: captureRestaurant },
]

async function main() {
  fs.mkdirSync(OUT_DIR, { recursive: true })
  const only = process.env.CAPTURE_ONLY?.split(',').map((x) => x.trim()).filter(Boolean)
  const assets = only?.length ? ASSETS.filter((a) => only.includes(a.name)) : ASSETS

  console.log(`Capturing food assets from ${BASE_URL}`)
  console.log(`Output: ${OUT_DIR}\n`)

  const browser = await chromium.launch({ headless: true })
  const context = await browser.newContext({
    viewport: VIEWPORT,
    deviceScaleFactor: 2,
    isMobile: true,
  })
  const page = await context.newPage()

  for (const asset of assets) {
    console.log(`Capturing ${asset.name}…`)
    await asset.fn(page)
  }

  await context.close()
  await browser.close()
  console.log('\nDone.')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
