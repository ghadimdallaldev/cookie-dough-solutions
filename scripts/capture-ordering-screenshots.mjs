import { chromium } from '@playwright/test'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const OUT_DIR = path.join(__dirname, '../public/images/ordering-app-ui')
const BASE_URL = process.env.ORDERING_CAPTURE_URL || 'https://www.almaalem.shop'

const SHOTS = [
  { file: 'ordering-01-menu.png', path: '/', wait: 2500 },
  { file: 'ordering-02-customize.png', path: '/', wait: 3500, action: 'openCustomizer' },
  { file: 'ordering-03-cart.png', path: '/', wait: 3500, action: 'openCart' },
  { file: 'ordering-04-checkout.png', path: '/checkout', wait: 3000 },
]

async function run() {
  fs.mkdirSync(OUT_DIR, { recursive: true })
  const browser = await chromium.launch({ headless: true })
  const page = await browser.newPage({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 2,
  })

  for (const shot of SHOTS) {
    const url = `${BASE_URL.replace(/\/$/, '')}${shot.path}`
    console.log(`Capturing ${shot.file} from ${url}`)
    await page.goto(url, { waitUntil: 'networkidle', timeout: 60000 })
    await page.waitForTimeout(shot.wait)

    if (shot.action === 'openCustomizer') {
      const addBtn = page.getByRole('button', { name: /add to cart|أضف/i }).first()
      if (await addBtn.isVisible().catch(() => false)) {
        await addBtn.click()
        await page.waitForTimeout(1200)
      }
    }

    if (shot.action === 'openCart') {
      const addBtn = page.getByRole('button', { name: /add to cart|أضف/i }).first()
      if (await addBtn.isVisible().catch(() => false)) {
        await addBtn.click()
        await page.waitForTimeout(800)
      }
      const cartBtn = page.getByRole('button', { name: /cart|السلة/i }).first()
      if (await cartBtn.isVisible().catch(() => false)) {
        await cartBtn.click()
        await page.waitForTimeout(1200)
      }
    }

    await page.screenshot({
      path: path.join(OUT_DIR, shot.file),
      fullPage: false,
    })
  }

  await browser.close()
  console.log(`Saved ${SHOTS.length} screenshots to ${OUT_DIR}`)
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
