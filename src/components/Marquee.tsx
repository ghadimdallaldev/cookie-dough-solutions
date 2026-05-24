type MarqueeProps = {
  words?: string[]
  dark?: boolean
  className?: string
  variant?: 'default' | 'statement'
  editorial?: boolean
}

const DEFAULT = ['explore it', 'enable it', 'scale it']

export function Marquee({
  words = DEFAULT,
  dark = false,
  className = '',
  variant = 'default',
  editorial = false,
}: MarqueeProps) {
  const row = [...words, ...words, ...words, ...words]
  const statement = variant === 'statement'

  return (
    <section
      className={`overflow-hidden ${
        statement
          ? `border-y border-border-editorial py-6 md:py-8 ${
              dark ? 'bg-ink' : editorial ? 'bg-paper-deep' : 'bg-paper-warm'
            }`
          : `border-y border-border-editorial py-8 ${dark ? 'bg-ink' : 'bg-chip'}`
      } ${className}`}
      aria-hidden={statement}
    >
      <div
        className={`flex whitespace-nowrap will-change-transform [transform:translateZ(0)] ${
          statement ? 'animate-marquee-slow' : 'animate-marquee'
        }`}
      >
        {row.map((word, i) => (
          <span
            key={`${word}-${i}`}
            className={
              statement
                ? `mx-12 font-display font-bold uppercase tracking-[0.08em] ${
                    editorial
                      ? 'text-[clamp(1.5rem,4vw,2.75rem)] text-ink/45'
                      : `text-lg md:text-2xl ${dark ? 'text-dough-200/80' : 'text-ink/50'}`
                  }`
                : `mx-12 font-display text-3xl font-bold uppercase md:text-5xl ${
                    dark ? 'text-dough-200/90' : 'text-paper/90'
                  }`
            }
          >
            {word}
          </span>
        ))}
      </div>
    </section>
  )
}
