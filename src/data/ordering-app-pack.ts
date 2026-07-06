/** Ordering app showcase assets */
const STOCK = '/images/al-maalem'
const UI = '/images/ordering-app-ui'

/** Live demo — Al Maalem ordering app (override with VITE_ORDERING_APP_DEMO_URL). */
export const ORDERING_APP_DEMO_URL =
  import.meta.env.VITE_ORDERING_APP_DEMO_URL?.trim() ||
  import.meta.env.VITE_AL_MAALEM_APP_URL?.trim() ||
  'https://www.almaalem.shop'

export const ORDERING_APP_PACK = {
  hero: `${STOCK}/hero-bg.jpg`,
  foodSpread: `${STOCK}/hero-food-spread.jpg`,
  restaurant: `${STOCK}/restaurant.png`,
  burger: `${STOCK}/burger-maalem.png`,
} as const

/** Screenshots captured from a live ordering app build */
export const ORDERING_APP_UI = {
  menu: `${UI}/ordering-01-menu.png`,
  customize: `${UI}/ordering-02-customize.png`,
  cart: `${UI}/ordering-03-cart.png`,
  checkout: `${UI}/ordering-04-checkout.png`,
} as const
