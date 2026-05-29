# Cookie Dough Ordering — Design System (Master)

Source: ui-ux-pro-max + culinary hospitality refinement.

## Pattern
App-store style product landing: hero device mockup, screenshot carousel, feature blocks, loyalty highlight, contact CTA.

## Typography
- **Display:** Playfair Display SC — headlines, hero, section titles
- **Body:** Karla — UI copy, labels, buttons, descriptions
- Scoped to `.ordering-app-page` and `.ordering-home-teaser` only

## Colors
| Role | Hex | Tailwind |
|------|-----|----------|
| Background | `#140C0A` | `oapp-ink` |
| Surface | `#1F1410` | `oapp-surface` |
| Elevated | `#2D1E18` | `oapp-elevated` |
| Text | `#FFF9F5` | `oapp-cream` |
| Muted text | `#C9B5A8` | `oapp-muted` |
| CTA / Gold | `#CA8A04` | `oapp-gold` |
| Accent / Tomato | `#E85D4C` | `oapp-tomato` |

Note: Tailwind reserves `order-*` for flexbox; theme prefix is `oapp` (ordering app).

## Rules
- Min body contrast 4.5:1 on dark (`order-muted` on `order-surface`)
- `cursor-pointer` on all interactive cards
- Transitions 200–300ms, ease-out
- `prefers-reduced-motion` respected
- Lucide icons only — no emoji UI icons
