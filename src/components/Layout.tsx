import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, Menu, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'
import { CustomCursor } from './CustomCursor'
import { GrainOverlay } from './GrainOverlay'
import { Logo } from './Logo'
import { ScrollProgressBar } from './ScrollProgressBar'
import { useNavScroll } from '../hooks/useNavScroll'

const NAV = [
  { to: '/', label: 'Home', end: true },
  { to: '/supplify', label: 'Supplify', end: false },
] as const

export function Layout() {
  const location = useLocation()
  const { pathname } = location
  const onSupplify = pathname.startsWith('/supplify')
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
  const solidNav = onSupplify || scrolled || !onHome
  const lightHomeTop = onHome && !solidNav

  return (
    <div className={`min-h-screen ${onSupplify ? 'supplify-page bg-[#0a0812]' : 'bg-paper'}`}>
      <GrainOverlay />
      <ScrollProgressBar />
      <CustomCursor />

      {/* Nav — floating pill on home hero, solid bar when scrolled */}
      <header
        className={`fixed z-[100] transition-[top,inset,background-color,border-color,backdrop-filter,box-shadow,border-radius] duration-300 ${
          lightHomeTop
            ? 'inset-x-4 top-4 mx-auto max-w-6xl rounded-2xl border border-ink/[0.08] bg-paper/75 shadow-editorial backdrop-blur-md'
            : `inset-x-0 top-0 border-b ${
                solidNav
                  ? onSupplify
                    ? 'border-white/10 bg-supplify-dark/95 shadow-lg shadow-black/20 backdrop-blur-md'
                    : 'border-border-editorial bg-paper/90 shadow-sm backdrop-blur-md'
                  : 'border-transparent bg-transparent'
              }`
        }`}
      >
        <motion.div className={`flex h-16 items-center justify-between gap-4 px-6 md:h-[4.25rem] ${lightHomeTop ? '' : 'mx-auto max-w-6xl'}`}>
          <Logo inverted={onSupplify || (!onHome && !solidNav)} linkHome showWordmark />

          {/* Desktop nav */}
          <nav className="hidden items-center gap-8 md:flex">
            {NAV.map(({ to, label, end }) => (
              <NavLink
                key={to}
                to={to}
                end={end}
                className={({ isActive }) => {
                  const base = solidNav
                    ? onSupplify
                      ? 'text-dough-300 hover:text-white'
                      : 'text-ink-muted hover:text-ink'
                    : lightHomeTop
                      ? 'text-ink-muted hover:text-ink'
                      : 'text-paper/90 hover:text-paper'
                  const active = solidNav
                    ? onSupplify ? 'text-paper' : 'text-ink'
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
                      <span className="absolute -bottom-1 left-0 h-px w-full bg-dough-400" />
                    )}
                  </>
                )}
              </NavLink>
            ))}
            <a
              href="#contact"
              className={`cursor-pointer text-sm font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-chip/50 focus-visible:ring-offset-2 ${
                solidNav
                  ? onSupplify
                    ? 'font-semibold text-dough-300 hover:text-white'
                    : 'text-ink-muted hover:text-ink'
                  : lightHomeTop
                    ? 'text-ink-muted hover:text-ink'
                    : 'text-paper/90 hover:text-paper'
              }`}
            >
              Contact
            </a>
          </nav>

          <div className="flex items-center gap-3">
            <Link
              to="/supplify"
              className={`hidden shrink-0 cursor-pointer items-center gap-1 rounded-full px-5 py-2.5 text-sm font-bold transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-chip focus-visible:ring-offset-2 sm:inline-flex ${
                onSupplify
                  ? 'bg-paper text-supplify-dark hover:bg-paper-warm'
                  : solidNav
                    ? 'bg-ink text-paper hover:bg-chip'
                    : 'bg-paper/95 text-ink hover:bg-paper-warm backdrop-blur-sm'
              }`}
            >
              Meet Supplify <ArrowRight className="h-4 w-4" />
            </Link>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMenuOpen((v) => !v)}
              className={`flex h-10 w-10 items-center justify-center rounded-full transition md:hidden ${
                onSupplify || (!lightHomeTop && !solidNav) ? 'text-white' : 'text-ink'
              }`}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            >
              {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
          </motion.div>
      </header>

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

      {/* Page content with transition */}
      <main>
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={pathname}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>

      <footer
        className={`border-t py-16 md:py-20 ${
          onSupplify
            ? 'border-white/10 bg-[#0a0812] text-dough-300'
            : 'border-border-editorial bg-paper-warm text-ink-muted'
        }`}
      >
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
            <div>
              <Logo inverted={onSupplify} linkHome showWordmark />
              <p className="mt-4 max-w-sm text-sm leading-relaxed">
                <strong className={onSupplify ? 'text-dough-100' : 'text-ink'}>
                  Cookie Dough Solutions
                </strong>{' '}
                — F&B software for everyday problems: POS, ordering apps, and bespoke builds.{' '}
                <strong className={onSupplify ? 'text-[#a78bfa]' : 'text-chip'}>Supplify</strong> is our
                flagship.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-8">
              <Link
                to="/supplify"
                className={`text-sm font-bold ${
                  onSupplify ? 'text-[#c4b5fd] hover:text-white' : 'text-chip hover:text-dough-800'
                }`}
              >
                Explore Supplify →
              </Link>
              <a
                href="mailto:hello@cookiedough.app"
                className={`text-sm font-semibold ${
                  onSupplify ? 'text-white hover:text-dough-200' : 'text-chip hover:text-ink'
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
