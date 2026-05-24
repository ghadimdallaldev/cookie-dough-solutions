/** Subtle film grain — visible but not muddy */
export function GrainOverlay() {
  return (
    <div
      aria-hidden
      className="supplify-grain pointer-events-none fixed inset-0 z-[90] opacity-[0.055]"
    />
  )
}
