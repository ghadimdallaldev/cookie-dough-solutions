/** Warm homepage image pack — home page only */
const BASE = '/images/cookie-dough-homepage'

export const HOME_WARM_PACK = {
  hero: `${BASE}/01-hero/home-hero-cookie-dough.png`,
  finalCTA: `${BASE}/04-finale/final-cta-warm-workspace.png`,
  pillarPOS: `${BASE}/05-pillars/pillar-pos-ordering.png`,
  pillarOps: `${BASE}/05-pillars/pillar-operations.png`,
  pillarBespoke: `${BASE}/05-pillars/pillar-bespoke.png`,
  realityCheck: `${BASE}/06-reality-check/spreadsheet-chaos.png`,
  sceneRestaurant: `${BASE}/08-scenes/restaurant-rush.png`,
  sceneOperator: `${BASE}/08-scenes/operator-closeup.png`,
} as const

export type HomeWarmImageKey = keyof typeof HOME_WARM_PACK
