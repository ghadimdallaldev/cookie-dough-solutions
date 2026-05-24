import { motion } from 'framer-motion'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { home as h } from '../../theme/home'

export type HomeImageVariant = 'default' | 'bleed-right' | 'polaroid' | 'full-bleed' | 'arch'

type HomeImageProps = {
  src: string
  alt: string
  priority?: boolean
  className?: string
  animate?: boolean
  variant?: HomeImageVariant
}

const FRAME: Record<HomeImageVariant, string> = {
  default:
    'relative overflow-hidden rounded-2xl border border-ink/[0.1] bg-paper/85 shadow-editorial-lg ring-1 ring-ink/[0.05]',
  'bleed-right':
    'relative overflow-hidden rounded-l-2xl rounded-r-none border border-r-0 border-ink/[0.1] bg-paper/85 shadow-editorial-lg ring-1 ring-ink/[0.05] lg:-mr-[calc((100vw-100%)/2+1.5rem)]',
  polaroid:
    'relative overflow-hidden rounded-sm border border-ink/[0.12] bg-paper p-3 pb-10 shadow-[0_8px_32px_rgba(27,23,20,0.12)] rotate-[-1.5deg]',
  'full-bleed': 'relative h-full min-h-[280px] overflow-hidden rounded-none border-0 shadow-none ring-0',
  arch:
    'relative overflow-hidden rounded-t-[999px] rounded-b-2xl border border-ink/[0.1] bg-paper/85 shadow-editorial-lg ring-1 ring-ink/[0.05]',
}

function ImageFrame({
  src,
  alt,
  priority,
  className,
  variant = 'default',
}: Pick<HomeImageProps, 'src' | 'alt' | 'priority' | 'className' | 'variant'>) {
  const imgClass =
    variant === 'full-bleed'
      ? 'block h-full min-h-[280px] w-full object-cover object-center'
      : 'block h-auto w-full object-contain object-center'

  return (
    <motion.div className={`${FRAME[variant]} ${className ?? ''}`}>
      <img
        src={src}
        alt={alt}
        width={1200}
        height={900}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        className={imgClass}
      />
    </motion.div>
  )
}

/** Large editorial frame — object-contain, no aggressive crop */
export function HomeImage({
  src,
  alt,
  priority = false,
  className = '',
  animate = true,
  variant = 'default',
}: HomeImageProps) {
  const reduced = useReducedMotion()

  if (!animate) {
    return (
      <ImageFrame
        src={src}
        alt={alt}
        priority={priority}
        className={className}
        variant={variant}
      />
    )
  }

  const floatAnim = reduced || variant === 'full-bleed' ? undefined : { y: [0, -6, 0] as number[] }

  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, y: 28 }}
      whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-8%' }}
      transition={{ duration: 0.85, ease: h.ease }}
    >
      <motion.div
        animate={floatAnim}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
      >
        <ImageFrame
          src={src}
          alt={alt}
          priority={priority}
          className={className}
          variant={variant}
        />
      </motion.div>
    </motion.div>
  )
}
