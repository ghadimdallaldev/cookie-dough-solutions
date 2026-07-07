/** Cookie Dough (studio) vs Supplify product brand */
export type Brand = 'studio' | 'supplify'

export const BRAND = {
  studio: {
    accent: '#8b5a3c',
    accentDark: '#6b4522',
    accentSoft: '#d4a574',
    eyebrow: 'text-chip',
    eyebrowCls: 'text-chip',
    link: 'text-chip hover:text-dough-800',
    stat: 'text-dough-500',
    watermark: 'text-dough-200',
    featureNum: 'text-dough-500',
    shadow: 'rgba(139,90,60,0.25)',
  },
  supplify: {
    accent: '#6D5EF7',
    accentDark: '#1a1035',
    accentSoft: '#8B7CFF',
    eyebrow: 'text-supplify',
    eyebrowCls: 'text-supplify',
    link: 'text-supplify hover:text-supplify-dark',
    stat: 'text-supplify-light',
    watermark: 'text-supplify/[0.08]',
    featureNum: 'text-supplify',
    shadow: 'rgba(109,94,247,0.35)',
  },
} as const
