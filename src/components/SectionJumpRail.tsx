import { motion, useReducedMotion } from 'framer-motion'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

export type SectionJumpItem = {
  id: string
  label: string
}

type SectionJumpRailProps = {
  items: readonly SectionJumpItem[]
  label?: string
  variant?: 'warm' | 'violet' | 'oapp'
  className?: string
}

const EASE = [0.22, 1, 0.36, 1] as const

export function SectionJumpRail({
  items,
  label = 'On this page',
  variant = 'warm',
  className = '',
}: SectionJumpRailProps) {
  const reduced = useReducedMotion()
  const [activeId, setActiveId] = useState(items[0]?.id ?? '')
  const [visible, setVisible] = useState(false)
  const pendingRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const idsKey = useMemo(() => items.map((item) => item.id).join('|'), [items])

  const setActiveDebounced = useCallback((id: string) => {
    if (pendingRef.current) clearTimeout(pendingRef.current)
    pendingRef.current = setTimeout(() => {
      setActiveId((prev) => (prev === id ? prev : id))
    }, 120)
  }, [])

  useEffect(() => {
    return () => {
      if (pendingRef.current) clearTimeout(pendingRef.current)
    }
  }, [])

  useEffect(() => {
    if (!items.length) return
    setActiveId(items[0].id)

    const onScroll = () => {
      setVisible(window.scrollY > 280)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [idsKey, items])

  useEffect(() => {
    if (!items.length) return

    const sections = items
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => Boolean(el))

    if (!sections.length) return

    const updateActive = () => {
      const marker = window.scrollY + window.innerHeight * 0.38
      let current = sections[0]

      for (const section of sections) {
        if (section.offsetTop <= marker) current = section
      }

      setActiveDebounced(current.id)
    }

    updateActive()
    window.addEventListener('scroll', updateActive, { passive: true })
    window.addEventListener('resize', updateActive)

    return () => {
      window.removeEventListener('scroll', updateActive)
      window.removeEventListener('resize', updateActive)
    }
  }, [idsKey, items, setActiveDebounced])

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault()
    const el = document.getElementById(id)
    if (!el) return
    setActiveId(id)
    el.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' })
    history.replaceState(null, '', `#${id}`)
  }

  if (!items.length) return null

  return (
    <div
      className={`section-jump-shell pointer-events-none fixed inset-x-0 z-[90] flex justify-center px-4 transition-[opacity,transform] duration-500 ${
        visible ? 'translate-y-0 opacity-100' : '-translate-y-2 opacity-0'
      } ${className}`}
      style={{ top: 'var(--site-header-h, 4.25rem)' }}
    >
      <nav
        className="section-jump-rail pointer-events-auto"
        data-variant={variant}
        aria-label={label}
      >
        <p className="section-jump-label sr-only">{label}</p>
        <ol className="section-jump-list">
          {items.map((item) => {
            const isActive = activeId === item.id
            return (
              <li key={item.id} className="relative">
                <a
                  href={`#${item.id}`}
                  onClick={(e) => handleClick(e, item.id)}
                  className="section-jump-link"
                  data-active={isActive ? 'true' : 'false'}
                  aria-current={isActive ? 'location' : undefined}
                >
                  {isActive && !reduced ? (
                    <motion.span
                      layoutId="section-jump-active"
                      className="section-jump-active-pill"
                      transition={{ duration: 0.35, ease: EASE }}
                      aria-hidden
                    />
                  ) : null}
                  <span className="relative z-[1]">{item.label}</span>
                </a>
              </li>
            )
          })}
        </ol>
      </nav>
    </div>
  )
}
