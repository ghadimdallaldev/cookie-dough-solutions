import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { useCallback, useRef } from 'react'
import { Link } from 'react-router-dom'
import { MockupStage } from './art/MockupStage'

type ProductCardProps = {
  name: string
  tagline: string
  description: string
  to: string
  cta: string
  variant: string
  accentColor?: string
}

export function ProductCard({
  name,
  tagline,
  description,
  to,
  cta,
  variant,
  accentColor = '#7c3aed',
}: ProductCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)
  const rotateX = useSpring(useTransform(rawY, [-0.5, 0.5], [8, -8]), { stiffness: 300, damping: 30 })
  const rotateY = useSpring(useTransform(rawX, [-0.5, 0.5], [-8, 8]), { stiffness: 300, damping: 30 })

  const onMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    rawX.set((e.clientX - rect.left) / rect.width - 0.5)
    rawY.set((e.clientY - rect.top) / rect.height - 0.5)
  }, [rawX, rawY])

  const onMouseLeave = useCallback(() => {
    rawX.set(0)
    rawY.set(0)
  }, [rawX, rawY])

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{ rotateX, rotateY, transformPerspective: 1200 }}
      className="group relative overflow-hidden rounded-2xl bg-ink p-8 md:p-10"
    >
      <div
        className="absolute inset-x-0 top-0 h-[3px]"
        style={{ backgroundColor: accentColor }}
      />
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ boxShadow: `0 0 80px ${accentColor}33` }}
      />
      <div className="relative z-10">
        <p
          className="text-xs font-bold uppercase tracking-[0.3em]"
          style={{ color: accentColor }}
        >
          {tagline}
        </p>
        <h3 className="mt-3 font-display text-4xl font-extrabold text-white md:text-5xl">
          {name}
        </h3>
        <p className="mt-4 max-w-lg text-lg leading-relaxed text-dough-300">{description}</p>
        <div className="mt-8">
          <MockupStage variant={variant} />
        </div>
        <Link
          to={to}
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-bold text-ink transition hover:bg-dough-100"
        >
          {cta} <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </motion.div>
  )
}
