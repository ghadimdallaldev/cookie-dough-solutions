import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { home as h } from '../../theme/home'

export function HomeScrollCTA() {
  const reduced = useReducedMotion()
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 520)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  if (reduced) return null

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="pointer-events-none fixed bottom-6 left-0 right-0 z-[90] flex justify-center px-4 md:bottom-8"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 16 }}
          transition={{ duration: 0.25, ease: h.ease }}
        >
          <a
            href="#contact"
            data-cursor-hover
            className="pointer-events-auto inline-flex cursor-pointer items-center gap-2 rounded-full border border-ink/10 bg-paper/95 px-5 py-2.5 font-sans text-sm font-semibold text-ink shadow-editorial-lg backdrop-blur-md transition-[transform,box-shadow,border-color] duration-200 hover:border-chip/35 hover:shadow-editorial focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-chip focus-visible:ring-offset-2 focus-visible:ring-offset-paper"
          >
            Tell us the chaos
            <ArrowRight className="h-4 w-4" aria-hidden />
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
