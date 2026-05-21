import { ArrowRight } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'
import { Logo } from './Logo'

const NAV = [
  { to: '/', label: 'Home', end: true },
  { to: '/supplify', label: 'Supplify', end: false },
] as const

export function Layout() {
  const { pathname } = useLocation()
  const onSupplify = pathname.startsWith('/supplify')
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [pathname])

  const solidNav = scrolled || onSupplify

  return (
    <div className="min-h-screen bg-dough-50">
      <header
        className={`fixed inset-x-0 top-0 z-[100] border-b transition-[background-color,border-color,box-shadow] duration-200 ${
          solidNav
            ? onSupplify
              ? 'border-white/10 bg-[#1a0a2e]/95 shadow-lg shadow-black/20'
              : 'border-dough-200/80 bg-dough-50/95 shadow-sm'
            : 'border-transparent bg-transparent'
        }`}
      >
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-6 md:h-[4.25rem]">
          <Logo inverted={solidNav && onSupplify} linkHome showWordmark />
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
                    ? onSupplify
                      ? 'text-white'
                      : 'text-ink'
                    : 'text-white'
                  return `text-sm font-semibold transition-colors ${isActive ? active : base}`
                }}
              >
                {label}
              </NavLink>
            ))}
            <a
              href="#contact"
              className={
                solidNav
                  ? onSupplify
                    ? 'text-dough-300 hover:text-white'
                    : 'text-dough-600 hover:text-ink'
                  : 'text-white/90 hover:text-white'
              }
            >
              Contact
            </a>
          </nav>
          <Link
            to="/supplify"
            className={`shrink-0 rounded-full px-5 py-2.5 text-sm font-bold transition-colors ${
              onSupplify
                ? 'bg-white text-[#2d1654] hover:bg-dough-100'
                : solidNav
                  ? 'bg-ink text-white hover:bg-chip'
                  : 'bg-white text-ink hover:bg-dough-100'
            }`}
          >
            <span className="hidden sm:inline">Meet </span>Supplify
            <ArrowRight className="ml-1 inline h-4 w-4" />
          </Link>
        </div>
      </header>

      <main>
        <Outlet />
      </main>

      <footer
        className={`border-t py-14 ${onSupplify ? 'border-white/10 bg-ink text-dough-300' : 'border-dough-200 bg-white'}`}
      >
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-8 px-6 md:flex-row">
          <Logo inverted={onSupplify} linkHome showWordmark />
          <p className="max-w-md text-center text-sm leading-relaxed md:text-left">
            <strong className={onSupplify ? 'text-dough-100' : 'text-ink'}>Cookie Dough Solutions</strong>
            {' '}— parent company. <strong className="text-[#a78bfa]">Supplify</strong> is our flagship
            product.
          </p>
          <a
            href="mailto:hello@cookiedough.app"
            className={`text-sm font-semibold ${onSupplify ? 'text-white hover:text-dough-200' : 'text-chip hover:text-ink'}`}
          >
            hello@cookiedough.app
          </a>
        </div>
      </footer>
    </div>
  )
}
