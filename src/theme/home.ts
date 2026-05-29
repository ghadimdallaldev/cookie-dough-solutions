/** Homepage-only layout & type scale — mobile-first rhythm at 375–390px */
export const home = {
  container: 'mx-auto w-full max-w-6xl px-5 sm:px-6 md:px-8',
  section: 'relative scroll-section py-14 sm:py-20 md:py-28',
  sectionBorder: 'border-t border-ink/[0.07]',
  /** Vertical section padding presets */
  sectionSm: 'py-12 sm:py-16 md:py-20 lg:py-24',
  sectionMd: 'py-14 sm:py-20 md:py-28',
  sectionLg: 'py-16 sm:py-24 md:py-32 lg:py-36',
  sectionXl: 'py-16 sm:py-28 md:py-32 lg:py-40',
  /** Panel shells */
  panel: 'rounded-[1.25rem] sm:rounded-[1.75rem] md:rounded-[2rem]',
  panelPad: 'px-5 py-8 sm:px-6 sm:py-10 md:px-10 md:py-12',
  panelPadLg: 'px-5 py-8 sm:px-6 sm:py-10 md:px-10 md:py-12 lg:py-14',
  eyebrow:
    'font-sans text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.2em] sm:tracking-[0.28em] text-chip',
  h1: 'font-display text-[clamp(2.5rem,7.5vw,5.5rem)] font-extrabold leading-[0.94] tracking-[-0.04em] text-ink sm:text-[clamp(2.75rem,8vw,5.5rem)]',
  h1Accent:
    'font-serif text-[clamp(2.5rem,7.5vw,5.5rem)] font-normal italic leading-[0.98] tracking-[-0.02em] text-chip sm:text-[clamp(2.75rem,8vw,5.5rem)]',
  h2: 'font-display text-[clamp(1.75rem,calc(1rem+4.5vw),3.25rem)] font-bold leading-[1.08] tracking-[-0.03em] text-ink sm:leading-[1.06]',
  h2Serif:
    'font-serif text-[clamp(2rem,calc(1.1rem+5vw),4.75rem)] font-normal leading-[1.08] tracking-[-0.02em] text-ink sm:leading-[1.06]',
  h3: 'font-display text-[clamp(1.2rem,2.2vw,1.75rem)] font-bold leading-[1.15] tracking-[-0.02em] text-ink sm:text-[clamp(1.25rem,2.2vw,1.75rem)]',
  lead: 'font-serif text-[clamp(1.0625rem,1.8vw,1.35rem)] italic leading-[1.42] text-ink-muted',
  body: 'font-sans text-[0.9375rem] leading-[1.68] text-ink-muted sm:text-base sm:leading-[1.72]',
  bodyLg:
    'font-sans text-[1rem] leading-[1.68] text-ink-muted sm:text-[1.0625rem] sm:leading-[1.75]',
  quote:
    'font-serif text-[clamp(1.125rem,calc(0.85rem+2.8vw),1.75rem)] italic leading-[1.48] text-ink sm:leading-[1.45]',
  rail: 'font-display text-[clamp(1.5rem,7vw,3.75rem)] font-bold uppercase leading-[0.98] tracking-[-0.02em] sm:text-[clamp(1.75rem,7vw,3.75rem)]',
  ease: [0.22, 1, 0.36, 1] as const,
  /** CTA rows — full-width buttons on narrow viewports */
  btnRow: 'flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:flex-wrap sm:items-center sm:gap-4',
  link:
    'cursor-pointer transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-chip focus-visible:ring-offset-2 focus-visible:ring-offset-paper',
  btnPrimary:
    'inline-flex min-h-11 w-full cursor-pointer items-center justify-center gap-2.5 rounded-full bg-ink px-7 py-3 font-sans text-sm font-semibold text-paper shadow-editorial-lg transition-[transform,box-shadow,background-color] duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-chip focus-visible:ring-offset-2 focus-visible:ring-offset-paper sm:min-h-0 sm:w-auto sm:justify-start',
  btnGhost:
    'inline-flex min-h-11 w-full cursor-pointer items-center justify-center gap-2 font-sans text-sm font-semibold text-chip transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-chip/60 focus-visible:ring-offset-2 focus-visible:ring-offset-paper sm:min-h-0 sm:w-auto sm:justify-start',
} as const
