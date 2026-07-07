import type { SectionJumpItem } from '../components/SectionJumpRail'

export const HOME_SECTIONS: SectionJumpItem[] = [
  { id: 'home-intro', label: 'Intro' },
  { id: 'home-team', label: 'Team' },
  { id: 'home-capabilities', label: 'Work' },
  { id: 'home-supplify', label: 'Supplify' },
  { id: 'home-ordering', label: 'Ordering' },
  { id: 'home-testimonials', label: 'Results' },
  { id: 'home-contact', label: 'Contact' },
]

export const SUPPLIFY_SECTIONS: SectionJumpItem[] = [
  { id: 'supplify-chaos', label: 'Problem', theme: 'light' },
  { id: 'ordering', label: 'Live loop', theme: 'light' },
  { id: 'supplify-trust', label: 'Proof', theme: 'light' },
  { id: 'walkthrough', label: 'Flow', theme: 'dark' },
  { id: 'screenshots', label: 'Product UI', theme: 'light' },
  { id: 'features', label: 'Platform', theme: 'light' },
  { id: 'beyond', label: 'Beyond', theme: 'light' },
  { id: 'supplier-ops', label: 'Supplier ops', theme: 'light' },
  { id: 'stories', label: 'Stories', theme: 'light' },
  { id: 'contact', label: 'Demo', theme: 'dark' },
]

export const ORDERING_SECTIONS: SectionJumpItem[] = [
  { id: 'ordering-problem', label: 'Problem' },
  { id: 'ordering-case-study', label: 'Al Maalem' },
  { id: 'ordering-loyalty', label: 'Loyalty' },
  { id: 'ordering-stack', label: 'Stack' },
  { id: 'screenshots', label: 'Screens' },
  { id: 'contact', label: 'Start' },
]

export type PageNavVariant = 'warm' | 'violet' | 'oapp'

export function sectionsForPath(pathname: string): SectionJumpItem[] {
  if (pathname.startsWith('/supplify')) return SUPPLIFY_SECTIONS
  if (pathname.startsWith('/ordering')) return ORDERING_SECTIONS
  if (pathname === '/') return HOME_SECTIONS
  return []
}

export function navVariantForPath(pathname: string): PageNavVariant {
  if (pathname.startsWith('/supplify')) return 'violet'
  if (pathname.startsWith('/ordering')) return 'warm'
  return 'warm'
}
