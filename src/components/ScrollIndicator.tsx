import { motion, useScroll, useTransform } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

export function ScrollIndicator() {
  const { scrollY } = useScroll()
  const scrollOpacity = useTransform(scrollY, [0, 120], [1, 0])

  return (
    <motion.div
      className="absolute bottom-8 left-1/2 -translate-x-1/2"
      style={{ opacity: scrollOpacity }}
      aria-hidden="true"
    >
      <motion.div
        className="flex flex-col items-center gap-1.5 text-white/50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.6 }}
      >
        <span className="text-[10px] font-semibold uppercase tracking-[0.25em]">Scroll</span>
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
        >
          <ChevronDown className="h-4 w-4" />
        </motion.div>
      </motion.div>
    </motion.div>
  )
}
