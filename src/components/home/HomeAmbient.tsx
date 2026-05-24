import { motion } from 'framer-motion'
import { useReducedMotion } from '../../hooks/useReducedMotion'

/** Full-page warm atmosphere — sits behind all home sections */
export function HomeAmbient() {
  const reduced = useReducedMotion()

  if (reduced) {
    return (
      <motion.div
        className="pointer-events-none fixed inset-0 -z-10 bg-gradient-to-b from-paper via-paper-warm to-paper-deep"
        aria-hidden
      />
    )
  }

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden>
      <div className="absolute inset-0 bg-gradient-to-b from-paper via-paper-warm/80 to-paper-deep" />

      {/* Orb 1 — top left, warm gold */}
      <motion.div
        className="absolute -left-[12%] top-[8%] h-[42vmin] w-[42vmin] rounded-full bg-dough-400/45 blur-[100px]"
        animate={{ x: [0, 40, 0], y: [0, 24, 0], scale: [1, 1.08, 1] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Orb 2 — right side, chip brown */}
      <motion.div
        className="absolute -right-[8%] top-[32%] h-[38vmin] w-[38vmin] rounded-full bg-chip/30 blur-[90px]"
        animate={{ x: [0, -32, 0], y: [0, 40, 0], scale: [1, 1.12, 1] }}
        transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Orb 3 — center bottom, pale dough */}
      <motion.div
        className="absolute bottom-[12%] left-[28%] h-[30vmin] w-[30vmin] rounded-full bg-dough-300/50 blur-[80px]"
        animate={{ x: [0, 24, 0], y: [0, -20, 0] }}
        transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Orb 4 — large, very slow, lower center-right for depth */}
      <motion.div
        className="absolute bottom-[35%] right-[5%] h-[50vmin] w-[50vmin] rounded-full bg-dough-200/20 blur-[130px]"
        animate={{ x: [0, -18, 0], y: [0, 28, 0], scale: [1, 1.06, 1] }}
        transition={{ duration: 30, repeat: Infinity, ease: 'easeInOut', delay: 5 }}
      />

      {/* Radial top highlight */}
      <div className="absolute inset-0 opacity-[0.35] bg-[radial-gradient(circle_at_50%_0%,rgba(184,149,111,0.12),transparent_55%)]" />
    </div>
  )
}
