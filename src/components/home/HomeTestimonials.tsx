import { motion } from 'framer-motion'
import { Star } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { home as h } from '../../theme/home'
import { Reveal } from '../Reveal'
import { SplitText } from '../motion/SplitText'

const TESTIMONIALS = [
  {
    quote:
      'Our ops manager used to spend three hours every morning reconciling WhatsApp messages. Now he gets coffee first.',
    role: 'Multi-unit operator',
    market: 'Lebanon',
    rating: 5,
  },
  {
    quote:
      'We finally have one catalog both sides trust. No more PDF price lists printed and re-entered by hand.',
    role: 'Procurement lead',
    market: 'UAE',
    rating: 5,
  },
  {
    quote:
      'The POS flow actually handles modifiers during rush. Our old system crashed every Saturday. Obviously.',
    role: 'Restaurant group',
    market: 'Malta',
    rating: 5,
  },
  {
    quote:
      'Supplify replaced four WhatsApp groups and a spreadsheet called FINAL_v3_REAL.xlsx. Worth it.',
    role: 'Supplier ops',
    market: 'Greece',
    rating: 5,
  },
  {
    quote:
      'Cookie Dough built what our ERP vendor said would take eighteen months. We needed it before next quarter.',
    role: 'Franchise operator',
    market: 'KSA',
    rating: 5,
  },
  {
    quote:
      'Inventory finally matches what the kitchen actually uses. Our variance reports went from horror stories to boring.',
    role: 'Head of operations',
    market: 'Cyprus',
    rating: 5,
  },
  {
    quote:
      'Training new staff on the POS used to take a week. Now it is an afternoon — modifiers and all.',
    role: 'Front-of-house lead',
    market: 'Jordan',
    rating: 5,
  },
  {
    quote:
      'We stopped losing orders in group chats. Suppliers see the same numbers we do. That alone paid for the project.',
    role: 'Regional distributor',
    market: 'Qatar',
    rating: 5,
  },
] as const

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5 text-dough-500" aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} className="h-3.5 w-3.5 fill-current" aria-hidden />
      ))}
    </div>
  )
}

export function HomeTestimonials() {
  const reduced = useReducedMotion()
  const [active, setActive] = useState(0)

  useEffect(() => {
    if (reduced) return
    const id = window.setInterval(() => {
      setActive((i) => (i + 1) % TESTIMONIALS.length)
    }, 5500)
    return () => window.clearInterval(id)
  }, [reduced])

  const current = TESTIMONIALS[active]

  return (
    <section className={`${h.sectionBorder} bg-paper-warm/80 py-20 md:py-28`}>
      <div className={h.container}>
        <Reveal className="max-w-xl">
          <p className={h.eyebrow}>What operators say</p>
          <SplitText
            as="h2"
            by="word"
            stagger={0.03}
            text="Real kitchens. Real results."
            className={`${h.h2} mt-5 max-w-[14ch]`}
          />
        </Reveal>

        <div className="mt-12 grid gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] lg:items-start">
          <motion.div
            key={current.quote}
            className="glass-card relative min-h-[220px] p-8 md:p-10"
            initial={reduced ? false : { opacity: 0, y: 20, filter: 'blur(4px)' }}
            animate={reduced ? undefined : { opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.55, ease: h.ease }}
          >
            <Stars count={current.rating} />
            <blockquote className={`${h.lead} mt-5 text-ink`}>&ldquo;{current.quote}&rdquo;</blockquote>
            <p className="mt-6 font-sans text-sm font-semibold text-ink">
              {current.role}
              <span className="font-normal text-ink-muted"> · {current.market}</span>
            </p>
          </motion.div>

          <div className="flex max-h-[min(52vh,420px)] flex-col gap-3 overflow-y-auto pr-1">
            {TESTIMONIALS.map((t, i) => (
              <motion.button
                key={t.quote}
                type="button"
                onClick={() => setActive(i)}
                className={`cursor-pointer rounded-xl border px-4 py-3 text-left transition-[border-color,background-color,transform] duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-chip focus-visible:ring-offset-2 ${
                  i === active
                    ? 'border-chip/40 bg-paper shadow-editorial'
                    : 'border-ink/10 bg-paper/70 hover:border-chip/25'
                }`}
                whileHover={reduced ? undefined : { x: 4 }}
              >
                <p className="line-clamp-2 font-serif text-sm italic text-ink-muted">{t.quote}</p>
                <p className="mt-1 font-sans text-[10px] font-semibold uppercase tracking-wider text-chip/70">
                  {t.market}
                </p>
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
