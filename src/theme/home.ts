/** Homepage-only layout & type scale — balanced, not oversized */
export const home = {
  container: 'mx-auto w-full max-w-6xl px-6 md:px-8',
  section: 'relative scroll-section py-20 md:py-28',
  sectionBorder: 'border-t border-ink/[0.07]',
  eyebrow: 'font-sans text-[11px] font-semibold uppercase tracking-[0.28em] text-chip',
  h1: 'font-display text-[clamp(2.75rem,8vw,5.5rem)] font-extrabold leading-[0.94] tracking-[-0.04em] text-ink',
  h1Accent: 'font-serif text-[clamp(2.75rem,8vw,5.5rem)] font-normal italic leading-[0.98] tracking-[-0.02em] text-chip',
  h2: 'font-display text-[clamp(2rem,4.5vw,3.25rem)] font-bold leading-[1.04] tracking-[-0.03em] text-ink',
  h3: 'font-display text-[clamp(1.25rem,2.2vw,1.75rem)] font-bold leading-[1.15] tracking-[-0.02em] text-ink',
  lead: 'font-serif text-[clamp(1.125rem,1.8vw,1.35rem)] italic leading-[1.42] text-ink-muted',
  body: 'font-sans text-[1rem] leading-[1.72] text-ink-muted md:text-[1.0625rem]',
  rail: 'font-display text-[clamp(1.75rem,7vw,3.75rem)] font-bold uppercase leading-[0.98] tracking-[-0.02em]',
  ease: [0.22, 1, 0.36, 1] as const,
  /** Links & buttons — pointer + keyboard focus */
  link:
    'cursor-pointer transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-chip focus-visible:ring-offset-2 focus-visible:ring-offset-paper',
  btnPrimary:
    'inline-flex cursor-pointer items-center gap-2.5 rounded-full bg-ink px-7 py-3 font-sans text-sm font-semibold text-paper shadow-editorial-lg transition-[transform,box-shadow,background-color] duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-chip focus-visible:ring-offset-2 focus-visible:ring-offset-paper',
  btnGhost:
    'inline-flex cursor-pointer items-center gap-2 font-sans text-sm font-semibold text-chip transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-chip/60 focus-visible:ring-offset-2 focus-visible:ring-offset-paper',
} as const
