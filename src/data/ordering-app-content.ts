import {
  ChefHat,
  Gift,
  Percent,
  ShoppingBag,
  Smartphone,
  Store,
  UtensilsCrossed,
} from 'lucide-react'
import { ORDERING_APP_UI } from './ordering-app-pack'

export const ORDERING_HIGHLIGHTS = [
  { value: '0%', label: 'Marketplace commission' },
  { value: 'Your', label: 'Brand & pricing' },
  { value: 'Points', label: 'Loyalty on every order' },
] as const

export const ORDERING_FEATURES = [
  { icon: UtensilsCrossed, label: 'Full menu & categories' },
  { icon: ChefHat, label: 'Customize every item' },
  { icon: ShoppingBag, label: 'Cart & bundle deals' },
  { icon: Gift, label: 'Loyalty & rewards' },
  { icon: Percent, label: 'Prices you control' },
  { icon: Smartphone, label: 'Mobile-first checkout' },
  { icon: Store, label: 'Pickup & delivery rules' },
] as const

export const ORDERING_PREVIEWS = [
  {
    id: 'menu' as const,
    label: 'Menu',
    blurb: 'Category browsing with rich imagery — guests add to cart without leaving your brand.',
    image: ORDERING_APP_UI.menu,
    alt: 'Full menu screen on a custom ordering app',
    fit: 'cover' as const,
  },
  {
    id: 'customize' as const,
    label: 'Customize',
    blurb: 'Modifiers, bundles, and special instructions — no “call the restaurant” workaround.',
    image: ORDERING_APP_UI.customize,
    alt: 'Item customization modal on an ordering app',
    fit: 'contain' as const,
  },
  {
    id: 'cart' as const,
    label: 'Cart',
    blurb: 'A cart drawer that stays in your flow — quantity controls, bundles, and checkout in one tap.',
    image: ORDERING_APP_UI.cart,
    alt: 'Shopping cart drawer on an ordering app',
    fit: 'contain' as const,
  },
  {
    id: 'checkout' as const,
    label: 'Checkout',
    blurb: 'Delivery details, order summary, and loyalty prompts — built for repeat guests, not one-off marketplace hops.',
    image: ORDERING_APP_UI.checkout,
    alt: 'Checkout screen with loyalty rewards on an ordering app',
    fit: 'cover' as const,
  },
] as const

export type OrderingPreviewId = (typeof ORDERING_PREVIEWS)[number]['id']

export const ORDERING_UI_SCREENS = ORDERING_PREVIEWS.map(({ image, label, alt, fit }) => ({
  src: image,
  label: label === 'Checkout' ? 'Checkout & loyalty' : label,
  alt,
  fit,
}))

export const ORDERING_LOYALTY = {
  eyebrow: 'Loyalty program',
  title: 'Turn repeat orders into points — not platform fees.',
  body: 'We ship a built-in rewards layer: guests see points they will earn at checkout, sign in or join free to save progress, and return through your app instead of a marketplace listing. You set the rules; they keep the relationship with you.',
  bullets: [
    'Points shown before guests place an order',
    'Sign-in or guest checkout — no forced account wall',
    'Rewards nav and account hooks wired to your brand',
  ],
} as const

export const ORDERING_VS_AGGREGATORS = [
  {
    title: 'No marketplace markup',
    body: 'Third-party apps take commission and platform fees — so menus get priced up. Your app keeps the margin on your side of the counter.',
  },
  {
    title: 'Customers order you, not a middleman',
    body: 'Your logo, your menu, your delivery rules. Guests tap straight into your flow instead of hunting you inside someone else’s catalog.',
  },
  {
    title: 'Built for repeat orders',
    body: 'Mobile-first checkout, loyalty points, saved preferences, and ops tools your team actually uses during rush — not a generic template with your logo pasted on.',
  },
] as const

export const ORDERING_STACK = [
  'Branded storefront',
  'Menu, modifiers & bundles',
  'Cart & checkout',
  'Loyalty & rewards',
  'Admin dashboard',
  'Order notifications',
] as const

export const ORDERING_HERO_COPY = {
  eyebrow: 'Custom ordering apps · We build, you own the customer',
  title: 'Your menu. Your prices. No marketplace markup.',
  lead: 'Listing on third-party apps means commission, platform fees, and menus priced up so everyone still earns. We build branded ordering apps your customers use directly — with loyalty baked in, simpler checkout for them, and margin for you.',
  badge: 'We provide the stack · You keep the relationship',
} as const
