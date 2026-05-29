import { useEffect, useMemo, useState } from 'react'

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

export function SectionJumpRail({
  items,
  label = 'Jump to section',
  variant = 'warm',
  className = '',
}: SectionJumpRailProps) {
  const [activeId, setActiveId] = useState(items[0]?.id ?? '')
  const idsKey = useMemo(() => items.map((item) => item.id).join('|'), [items])

  useEffect(() => {
    if (!items.length) return

    const sections = items
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => Boolean(el))

    if (!sections.length) return

    const updateActiveFromScroll = () => {
      const viewportAnchor = window.innerHeight * 0.34
      let current = sections[0]

      for (const section of sections) {
        const rect = section.getBoundingClientRect()
        if (rect.top - viewportAnchor <= 0) current = section
      }

      setActiveId((prev) => (prev === current.id ? prev : current.id))
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]

        if (visible?.target?.id) {
          setActiveId((prev) => (prev === visible.target.id ? prev : visible.target.id))
        }
      },
      {
        threshold: [0.05, 0.2, 0.45, 0.7],
        rootMargin: '-30% 0px -52% 0px',
      },
    )

    sections.forEach((section) => observer.observe(section))
    updateActiveFromScroll()
    window.addEventListener('scroll', updateActiveFromScroll, { passive: true })
    window.addEventListener('resize', updateActiveFromScroll)

    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', updateActiveFromScroll)
      window.removeEventListener('resize', updateActiveFromScroll)
    }
  }, [idsKey, items])

  if (!items.length) return null

  return (
    <div className={`section-jump-wrap ${className}`}>
      <nav className="section-jump-rail" data-variant={variant} aria-label={label}>
        <ol className="section-jump-list">
          {items.map((item, i) => {
            const isActive = activeId === item.id
            return (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className="section-jump-link"
                  data-active={isActive ? 'true' : 'false'}
                  aria-current={isActive ? 'location' : undefined}
                >
                  <span className="section-jump-index" aria-hidden>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span>{item.label}</span>
                </a>
              </li>
            )
          })}
        </ol>
      </nav>
    </div>
  )
}
