import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, Menu, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'
import { CustomCursor } from './CustomCursor'
import { GrainOverlay } from './GrainOverlay'
import { Logo } from './Logo'
import { ScrollProgressBar } from './ScrollProgressBar'
import { SectionJumpRail } from './SectionJumpRail'
import { navVariantForPath, sectionsForPath } from '../config/page-sections'
import { useNavScroll } from '../hooks/useNavScroll'

const NAV = [
  { to: '/', label: 'Home', end: true },
  { to: '/supplify', label: 'Supplify', end: false },
  { to: '/ordering', label: 'Ordering app', end: false },
] as const

export function Layout() {
  const location = useLocation()
  const { pathname } = location
  const onSupplify = pathname.startsWith('/supplify')
  const onOrderingApp = pathname.startsWith('/ordering')
  const onDarkProduct = onOrderingApp
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const scrolled = useNavScroll()
  const onHome = pathname === '/'
  const onSupplifyHero = onSupplify && !scrolled
  const solidNav = onSupplify ? scrolled : onDarkProduct || scrolled || !onHome
  const lightHomeTop = onHome && !solidNav
  const supplifyNavInk = onSupplify
  const pageSections = sectionsForPath(pathname)
  const pageNavVariant = navVariantForPath(pathname)

  return (
    <div
      className={`min-h-screen ${onSupplify ? 'supplify-page' : onOrderingApp ? 'ordering-app-page bg-oapp-page' : 'bg-paper'}`}
      style={{ ['--site-header-h' as string]: lightHomeTop ? '5.25rem' : '4.25rem' }}
    >
      <GrainOverlay />
      <ScrollProgressBar />
      <CustomCursor />

      {/* Nav — floating pill on home hero, solid bar when scrolled */}
      <header
        className={`fixed z-[100] transition-[top,inset,background-color,border-color,backdrop-filter,box-shadow,border-radius] duration-300 ${
          lightHomeTop
            ? 'inset-x-4 top-4 mx-auto max-w-6xl rounded-2xl border border-ink/[0.08] bg-paper/75 shadow-editorial backdrop-blur-md'
            : onSupplifyHero
              ? 'inset-x-0 top-0 border-b border-transparent bg-transparent'
              : `inset-x-0 top-0 border-b ${
                  solidNav
                    ? onSupplify
                      ? 'border-border-editorial bg-paper/90 shadow-sm backdrop-blur-md'
                      : onOrderingApp
                        ? 'border-border-editorial bg-paper/90 shadow-sm backdrop-blur-md'
                        : 'border-border-editorial bg-paper/90 shadow-sm backdrop-blur-md'
                    : 'border-transparent bg-transparent'
                }`
        }`}
      >
        <motion.div className={`flex h-16 items-center justify-between gap-4 px-6 md:h-[4.25rem] ${lightHomeTop ? '' : 'mx-auto max-w-6xl'}`}>
          <Logo inverted={!onSupplify && (onSupplifyHero || (!onHome && !solidNav && !onSupplify))} linkHome showWordmark />

          {/* Desktop nav */}
          <nav className="hidden items-center gap-8 md:flex">
            {NAV.map(({ to, label, end }) => (
              <NavLink
                key={to}
                to={to}
                end={end}
                className={({ isActive }) => {
                  const base = supplifyNavInk || solidNav || onSupplifyHero
                    ? 'text-supplify-secondary hover:text-supplify-ink'
                    : lightHomeTop
                      ? 'text-ink-muted hover:text-ink'
                      : 'text-paper/90 hover:text-paper'
                  const active = supplifyNavInk || solidNav || onSupplifyHero
                    ? 'text-supplify-ink'
                    : lightHomeTop
                      ? 'text-ink'
                      : 'text-paper'
                  return `group relative cursor-pointer text-sm font-semibold transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-chip/50 focus-visible:ring-offset-2 ${isActive ? active : base}`
                }}
              >
                {({ isActive }) => (
                  <>
                    {label}
                    {isActive && (
                      <span
                        className={`absolute -bottom-1 left-0 h-px w-full ${
                          onOrderingApp ? 'bg-oapp-gold' : onSupplify ? 'bg-supplify' : 'bg-dough-400'
                        }`}
                      />
                    )}
                  </>
                )}
              </NavLink>
            ))}
            <a
              href="#contact"
              className={`cursor-pointer text-sm font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-chip/50 focus-visible:ring-offset-2 ${
                supplifyNavInk || solidNav
                  ? 'text-supplify-secondary hover:text-supplify-ink'
                  : lightHomeTop
                    ? 'text-ink-muted hover:text-ink'
                    : 'text-paper/90 hover:text-paper'
              }`}
            >
              Contact
            </a>
          </nav>

          <div className="flex items-center gap-3">
            {onOrderingApp ? (
              <a
                href="#contact"
                className="hidden shrink-0 cursor-pointer items-center gap-1 rounded-full bg-oapp-gold px-5 py-2.5 font-oapp-body text-sm font-bold text-white shadow-oapp-glow transition-[filter] duration-200 hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-oapp-gold focus-visible:ring-offset-2 focus-visible:ring-offset-paper sm:inline-flex"
              >
                Get your app <ArrowRight className="h-4 w-4" />
              </a>
            ) : onHome ? (
              <a
                href="#contact"
                className={`hidden shrink-0 cursor-pointer items-center gap-1 rounded-full px-5 py-2.5 text-sm font-bold transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-chip focus-visible:ring-offset-2 sm:inline-flex ${
                  solidNav
                    ? 'bg-ink text-paper hover:bg-chip'
                    : 'bg-paper/95 text-ink hover:bg-paper-warm backdrop-blur-sm'
                }`}
              >
                Get in touch <ArrowRight className="h-4 w-4" />
              </a>
            ) : (
              <Link
                to="/supplify"
                className={`hidden shrink-0 cursor-pointer items-center gap-1 rounded-full px-5 py-2.5 text-sm font-bold transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-supplify/40 focus-visible:ring-offset-2 sm:inline-flex ${
                  onSupplify
                    ? 'bg-supplify-ink text-white hover:bg-[#332720]'
                    : solidNav
                      ? 'bg-ink text-paper hover:bg-chip'
                      : 'bg-paper/95 text-ink hover:bg-paper-warm backdrop-blur-sm'
                }`}
              >
                Meet Supplify <ArrowRight className="h-4 w-4" />
              </Link>
            )}

            {/* Mobile hamburger */}
            <button
              onClick={() => setMenuOpen((v) => !v)}
              className={`flex h-10 w-10 items-center justify-center rounded-full transition md:hidden ${
                onSupplify || lightHomeTop || solidNav ? 'text-supplify-ink' : 'text-white'
              }`}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            >
              {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
          </motion.div>
      </header>

      {pageSections.length > 0 ? (
        <SectionJumpRail items={pageSections} variant={pageNavVariant} />
      ) : null}

      {/* Mobile full-screen menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-[99] flex flex-col justify-center bg-paper px-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <nav className="flex flex-col gap-2">
              {NAV.map(({ to, label, end }, i) => (
                <motion.div
                  key={to}
                  initial={{ opacity: 0, x: -24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.08 + i * 0.06, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                >
                  <NavLink
                    to={to}
                    end={end}
                    className={({ isActive }) =>
                      `block font-display text-4xl font-extrabold tracking-tight transition ${
                        isActive ? 'text-ink' : 'text-dough-400'
                      } hover:text-chip`
                    }
                  >
                    {label}
                  </NavLink>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, x: -24 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              >
                <a
                  href="#contact"
                  onClick={() => setMenuOpen(false)}
                  className="block font-display text-4xl font-extrabold tracking-tight text-dough-400 transition hover:text-chip"
                >
                  Contact
                </a>
              </motion.div>
            </nav>
            <motion.div
              className="mt-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.4 }}
            >
              <p className="text-sm text-dough-500">hello@cookiedough.app</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Avoid route fade — opacity 0 on enter could leave pages blank if animation stalls */}
      <main className="relative">
        <Outlet />
      </main>

      <footer
        className={`border-t py-16 md:py-20 ${
          onSupplify
            ? 'border-supplify-border bg-supplify-section text-supplify-secondary'
            : onOrderingApp
              ? 'border-border-editorial bg-paper-warm font-oapp-body text-ink-muted'
              : 'border-border-editorial bg-paper-warm text-ink-muted'
        }`}
      >
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
            <div>
              <Logo inverted={onOrderingApp} linkHome showWordmark />
              <p className="mt-4 max-w-sm text-sm leading-relaxed">
                <strong className={onOrderingApp ? 'text-paper' : 'text-supplify-ink'}>
                  Cookie Dough Solutions
                </strong>{' '}
                — Lebanon-based hospitality software studio. We fix everyday ops for restaurants,
                suppliers, and F&B operators: POS, ordering apps, inventory, and supplier coordination.{' '}
                <strong className={onSupplify ? 'text-supplify' : onOrderingApp ? 'text-oapp-gold-light' : 'text-chip'}>
                  Supplify
                </strong>{' '}
                is our flagship product; we also build{' '}
                <strong className={onOrderingApp ? 'text-oapp-gold-light' : 'text-chip'}>
                  custom ordering apps
                </strong>{' '}
                so you skip marketplace commissions and keep your prices.
              </p>
              <p className="mt-2 text-xs font-medium uppercase tracking-[0.14em] text-ink/45">
                Based in Lebanon · Beirut studio
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-8">
              <Link
                to="/supplify"
                className={`text-sm font-bold ${
                  onSupplify ? 'text-supplify hover:text-supplify-brown' : 'text-chip hover:text-dough-800'
                }`}
              >
                Explore Supplify →
              </Link>
              <Link
                to="/ordering"
                className={`text-sm font-bold ${
                  onOrderingApp ? 'text-oapp-gold-light hover:text-oapp-cream' : 'text-chip hover:text-dough-800'
                }`}
              >
                Custom ordering apps →
              </Link>
              <a
                href="mailto:hello@cookiedough.app"
                className={`text-sm font-semibold ${
                  onSupplify || onOrderingApp ? 'text-paper hover:text-paper/80' : 'text-chip hover:text-ink'
                }`}
              >
                hello@cookiedough.app
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
