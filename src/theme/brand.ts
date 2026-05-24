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
    accent: '#7c3aed',
    accentDark: '#5b21b6',
    accentSoft: '#c4b5fd',
    eyebrow: 'text-[#7c3aed]',
    eyebrowCls: 'text-supplify',
    link: 'text-[#7c3aed] hover:text-[#5b21b6]',
    stat: 'text-[#e9d5ff]',
    watermark: 'text-[#7c3aed]/[0.08]',
    featureNum: 'text-[#7c3aed]',
    shadow: 'rgba(124,58,237,0.25)',
  },
} as const
