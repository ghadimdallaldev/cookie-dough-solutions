import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'

/** Passive scroll listener — no Framer scroll subscriptions */
export function ScrollProgressBar() {
  const barRef = useRef<HTMLDivElement>(null)
  const { pathname } = useLocation()
  const onOrdering = pathname.startsWith('/ordering')
  const onSupplify = pathname.startsWith('/supplify')

  useEffect(() => {
    const bar = barRef.current
    if (!bar) return

    let ticking = false
    const update = () => {
      ticking = false
      const el = document.documentElement
      const max = el.scrollHeight - el.clientHeight
      const p = max > 0 ? el.scrollTop / max : 0
      bar.style.transform = `scaleX(${p})`
    }

    const onScroll = () => {
      if (!ticking) {
        ticking = true
        requestAnimationFrame(update)
      }
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const barClass = onOrdering
    ? 'bg-gradient-to-r from-oapp-tomato via-oapp-gold to-oapp-honey'
    : onSupplify
      ? 'bg-gradient-to-r from-supplify via-supplify-caramel to-supplify-brown'
      : 'bg-gradient-to-r from-dough-300 via-chip to-dough-600'

  return (
    <div
      ref={barRef}
      className={`fixed left-0 right-0 top-0 z-[200] h-[2px] origin-left scale-x-0 will-change-transform ${barClass}`}
      aria-hidden
    />
  )
}
