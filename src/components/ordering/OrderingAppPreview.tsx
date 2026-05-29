import { AnimatePresence, motion } from 'framer-motion'
import { useCallback, useState } from 'react'
import {
  ORDERING_PREVIEWS,
  type OrderingPreviewId,
} from '../../data/ordering-app-content'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { OrderingProductScreenshot } from './OrderingProductScreenshot'
import { ORDERING_EASE } from './shared'

type Props = {
  layoutId: string
  panelId?: string
}

export function OrderingAppPreview({ layoutId, panelId = 'ordering-app-preview-panel' }: Props) {
  const reduced = useReducedMotion()
  const [preview, setPreview] = useState<OrderingPreviewId>('menu')
  const active = ORDERING_PREVIEWS.find((p) => p.id === preview) ?? ORDERING_PREVIEWS[0]
  const activeIndex = ORDERING_PREVIEWS.findIndex((p) => p.id === preview)

  const onPreviewKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return
      e.preventDefault()
      const delta = e.key === 'ArrowRight' ? 1 : -1
      const next = (activeIndex + delta + ORDERING_PREVIEWS.length) % ORDERING_PREVIEWS.length
      setPreview(ORDERING_PREVIEWS[next].id)
    },
    [activeIndex],
  )

  return (
    <div className="relative overflow-hidden rounded-[1.5rem] border border-oapp-cream/10 bg-oapp-surface/70 p-4 shadow-oapp-glow backdrop-blur-md sm:p-5 md:p-6">
      <div
        className="pointer-events-none absolute -right-12 -top-12 h-36 w-36 rounded-full bg-oapp-tomato/10 blur-3xl"
        aria-hidden
      />

      <div
        role="tablist"
        aria-label="Ordering app preview"
        onKeyDown={onPreviewKeyDown}
        className="relative mb-5 flex max-w-full gap-1 overflow-x-auto rounded-full border border-oapp-cream/10 bg-oapp-deep/90 p-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {ORDERING_PREVIEWS.map(({ id, label }, i) => {
          const selected = preview === id
          return (
            <button
              key={id}
              type="button"
              role="tab"
              id={`ordering-preview-tab-${layoutId}-${id}`}
              aria-controls={panelId}
              aria-selected={selected}
              tabIndex={selected ? 0 : -1}
              onClick={() => setPreview(id)}
              className={`relative shrink-0 cursor-pointer rounded-full px-3.5 py-2 font-oapp-body text-xs font-bold transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-oapp-gold/80 sm:text-sm ${
                selected ? 'text-oapp-ink' : 'text-oapp-muted hover:text-oapp-cream'
              }`}
            >
              {selected && (
                <motion.span
                  layoutId={layoutId}
                  className="absolute inset-0 rounded-full bg-oapp-gold shadow-oapp-glow"
                  transition={{ duration: 0.25, ease: ORDERING_EASE }}
                />
              )}
              <span className="relative z-10 whitespace-nowrap">{label}</span>
              <span className="sr-only">
                {' '}
                ({i + 1} of {ORDERING_PREVIEWS.length})
              </span>
            </button>
          )
        })}
      </div>

      <p className="relative mb-5 font-oapp-body text-sm leading-relaxed text-oapp-muted">{active.blurb}</p>

      <AnimatePresence mode="wait">
        <motion.div
          key={active.id}
          initial={reduced ? false : { opacity: 0, y: 14 }}
          animate={reduced ? undefined : { opacity: 1, y: 0 }}
          exit={reduced ? undefined : { opacity: 0, y: -10 }}
          transition={{ duration: 0.35, ease: ORDERING_EASE }}
          role="tabpanel"
          id={panelId}
          aria-labelledby={`ordering-preview-tab-${layoutId}-${active.id}`}
        >
          <OrderingProductScreenshot
            src={active.image}
            alt={active.alt}
            fit={active.fit}
            step={`0${activeIndex + 1} · ${active.label}`}
            priority={active.id === 'menu'}
            glow={false}
            variant="desktop"
          />
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
