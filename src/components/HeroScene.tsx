import { motion } from 'framer-motion'
import { useState } from 'react'
import { useMouseParallax } from '../hooks/useMouseParallax'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { HeroAurora } from './motion/HeroAurora'
import type { Brand } from '../theme/brand'

type Tone = 'warm' | 'violet'

function Atmosphere({ tone }: { tone: Tone }) {
  return (
    <motion.div
      className={`absolute inset-0 ${tone === 'violet' ? 'bg-[#0f0620]' : 'bg-paper-warm'}`}
    />
  )
}

export function HeroScene({
  tone = 'warm',
  cinematic = false,
  brand,
  children,
  gridLayer,
  backgroundSrc,
  objectPosition = 'center center',
  showBackground = true,
}: {
  tone?: Tone
  cinematic?: boolean
  brand?: Brand
  children: React.ReactNode
  gridLayer?: React.ReactNode
  backgroundSrc: string
  objectPosition?: string
  showBackground?: boolean
}) {
  const [fallback, setFallback] = useState(false)
  const reducedMotion = useReducedMotion()
  const useParallax = !reducedMotion && showBackground
  const mouse = useMouseParallax()
  const resolvedBrand: Brand = brand ?? (tone === 'violet' ? 'supplify' : 'studio')
  const noPhoto = !showBackground || fallback || !backgroundSrc

  const bgTransform = useParallax
    ? `translate3d(${mouse.x * 6}px, ${mouse.y * 4}px, 0) scale(1.03)`
    : undefined

  return (
    <section className="relative isolate min-h-svh overflow-hidden bg-paper-warm">
      <motion.div className="absolute inset-0">
        <motion.div
          className="absolute inset-0 overflow-hidden"
          style={bgTransform ? { transform: bgTransform } : undefined}
        >
          {noPhoto ? (
            <Atmosphere tone={tone} />
          ) : (
            <div
              className={`h-full w-full ${cinematic && !reducedMotion ? 'hero-ken-burns' : ''}`}
            >
              <img
                src={backgroundSrc}
                alt=""
                width={1920}
                height={1080}
                fetchPriority="high"
                decoding="async"
                className="h-full w-full object-cover"
                style={{ objectPosition }}
                onError={() => setFallback(true)}
              />
            </div>
          )}
        </motion.div>

        {showBackground && tone === 'warm' ? (
          <>
            <motion.div
              className="absolute inset-0 bg-gradient-to-b from-[#1B1714]/30 via-[#1B1714]/08 to-paper/95"
              aria-hidden
            />
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-[#1B1714]/25 via-transparent to-[#d4a574]/08"
              aria-hidden
            />
            <motion.div
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_100%,rgba(212,165,116,0.14)_0%,transparent_70%)]"
              aria-hidden
            />
          </>
        ) : showBackground ? (
          <motion.div
            className="absolute inset-0 bg-gradient-to-b from-[#0f0620]/85 via-[#1a1035]/45 to-[#0f0620]/90"
            aria-hidden
          />
        ) : null}

        {!showBackground && tone === 'warm' && (
          <motion.div className="absolute inset-0 bg-paper-texture" aria-hidden />
        )}

        {showBackground && !fallback && tone === 'violet' && !reducedMotion && (
          <HeroAurora brand={resolvedBrand} />
        )}

        {gridLayer && (
          <motion.div
            className="absolute inset-0 z-[1] opacity-30"
            style={
              useParallax
                ? { transform: `translate3d(${mouse.x * 4}px, ${mouse.y * 2}px, 0)` }
                : undefined
            }
          >
            {gridLayer}
          </motion.div>
        )}

        <motion.div
          className={`pointer-events-none absolute inset-0 z-[2] supplify-grain ${
            tone === 'warm' ? 'opacity-[0.03]' : 'opacity-[0.06]'
          }`}
          aria-hidden
          animate={
            reducedMotion
              ? undefined
              : { opacity: tone === 'warm' ? [0.02, 0.04, 0.02] : [0.04, 0.08, 0.04] }
          }
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        />

        {tone === 'violet' && (
          <motion.div
            className="pointer-events-none absolute inset-0 z-[1] bg-supplify-mesh opacity-35"
            aria-hidden
          />
        )}
      </motion.div>

      <motion.div className="relative z-10">{children}</motion.div>

      <motion.div
        className={`pointer-events-none absolute inset-x-0 bottom-0 z-[5] h-40 bg-gradient-to-t ${
          tone === 'warm' ? 'from-paper to-transparent' : 'from-[#1B1714] to-transparent'
        }`}
        aria-hidden
      />
    </section>
  )
}
