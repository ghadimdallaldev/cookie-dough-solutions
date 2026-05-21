import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, Menu, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'
import { CustomCursor } from './CustomCursor'
import { GrainOverlay } from './GrainOverlay'
import { Logo } from './Logo'

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

  const solidNav = true

  return (
    <div className="min-h-screen bg-dough-50">
      <GrainOverlay />
      <CustomCursor />

      {/* Nav */}
      <header
        className={`fixed inset-x-0 top-0 z-[100] border-b transition-[background-color,border-color,backdrop-filter,box-shadow] duration-300 ${
          solidNav
            ? onSupplify
              ? 'border-white/10 bg-[#1a0a2e]/95 shadow-lg shadow-black/20 backdrop-blur-md'
              : 'border-dough-200/80 bg-dough-50/95 shadow-sm backdrop-blur-md'
            : 'border-transparent bg-transparent'
        }`}
      >
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-6 md:h-[4.25rem]">
          <Logo inverted={solidNav && onSupplify} linkHome showWordmark />

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
                      : 'text-dough-600 hover:text-ink'
                    : 'text-white/90 hover:text-white'
                  const active = solidNav
                    ? onSupplify ? 'text-white' : 'text-ink'
                    : 'text-white'
                  return `group relative text-sm font-semibold transition-colors ${isActive ? active : base}`
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
              className={
                solidNav
                  ? onSupplify
                    ? 'text-sm font-semibold text-dough-300 hover:text-white'
                    : 'text-sm font-semibold text-dough-600 hover:text-ink'
                  : 'text-sm font-semibold text-white/90 hover:text-white'
              }
            >
              Contact
            </a>
          </nav>

          <div className="flex items-center gap-3">
            <Link
              to="/supplify"
              className={`hidden shrink-0 items-center gap-1 rounded-full px-5 py-2.5 text-sm font-bold transition-colors sm:inline-flex ${
                onSupplify
                  ? 'bg-white text-[#2d1654] hover:bg-dough-100'
                  : solidNav
                    ? 'bg-ink text-white hover:bg-chip'
                    : 'bg-white text-ink hover:bg-dough-100'
              }`}
            >
              Meet Supplify <ArrowRight className="h-4 w-4" />
            </Link>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMenuOpen((v) => !v)}
              className={`flex h-10 w-10 items-center justify-center rounded-full transition md:hidden ${
                onSupplify || !solidNav ? 'text-white' : 'text-ink'
              }`}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            >
              {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile full-screen menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-[99] flex flex-col justify-center bg-dough-50 px-8"
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
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>

      <footer
        className={`border-t py-14 ${onSupplify ? 'border-white/10 bg-ink text-dough-300' : 'border-dough-200 bg-white'}`}
      >
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-8 px-6 md:flex-row">
          <Logo inverted={onSupplify} linkHome showWordmark />
          <p className="max-w-md text-center text-sm leading-relaxed md:text-left">
            <strong className={onSupplify ? 'text-dough-100' : 'text-ink'}>
              Cookie Dough Solutions
            </strong>{' '}
            — parent company.{' '}
            <strong className="text-[#a78bfa]">Supplify</strong> is our flagship product.
          </p>
          <a
            href="mailto:hello@cookiedough.app"
            className={`text-sm font-semibold ${
              onSupplify ? 'text-white hover:text-dough-200' : 'text-chip hover:text-ink'
            }`}
          >
            hello@cookiedough.app
          </a>
        </div>
      </footer>
    </div>
  )
}
