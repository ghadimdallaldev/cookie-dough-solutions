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
    accent: '#2F5D50',
    accentDark: '#1D1714',
    accentSoft: '#E4EFE9',
    eyebrow: 'text-supplify',
    eyebrowCls: 'text-supplify',
    link: 'text-supplify hover:text-supplify-brown',
    stat: 'text-supplify',
    watermark: 'text-supplify/[0.08]',
    featureNum: 'text-supplify',
    shadow: 'rgba(47, 93, 80, 0.22)',
  },
} as const
