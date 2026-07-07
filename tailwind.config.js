/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        paper: {
          DEFAULT: '#F5F0E8',
          warm: '#EFE7DB',
          deep: '#E7DDCF',
        },
        ink: {
          DEFAULT: '#1B1714',
          muted: '#3A2E26',
          faint: 'rgba(27,23,20,0.08)',
        },
        chip: {
          DEFAULT: '#6B4E3D',
          light: '#8B6B57',
          dark: '#3A2E26',
        },
        dough: {
          50: '#F5F0E8',
          100: '#EFE7DB',
          200: '#E7DDCF',
          300: '#D4C4B0',
          400: '#B8956F',
          500: '#8B6B57',
          600: '#6B4E3D',
          700: '#3A2E26',
          800: '#2A221C',
          900: '#1B1714',
        },
        supplify: {
          DEFAULT: '#6D5EF7',
          light: '#8B7CFF',
          dark: '#1a1035',
          ink: '#1a1035',
          cream: '#FAF8F5',
          mist: '#F3F0FF',
          card: '#FFFFFF',
          surface: '#221845',
          glow: 'rgba(139,124,255,0.35)',
        },
        maalem: {
          navy: '#140c0a',
          deep: '#0e0806',
          gold: '#ca8a04',
          'gold-light': '#e8c468',
          ember: '#e85d4c',
        },
        /** Ordering app theme — warm light palette aligned with Cookie Dough paper/ink */
        oapp: {
          ink: '#1B1714',
          deep: '#EFE7DB',
          page: '#F5F0E8',
          surface: '#FFFFFF',
          elevated: '#FFFCF8',
          cream: '#1B1714',
          muted: '#5c5048',
          tomato: '#e85d4c',
          'tomato-deep': '#dc2626',
          gold: '#A56828',
          'gold-light': '#C4834A',
          honey: '#d97706',
        },
        border: {
          editorial: 'rgba(27,23,20,0.08)',
        },
      },
      fontFamily: {
        display: ['Syne', 'system-ui', 'sans-serif'],
        serif: ['Instrument Serif', 'Georgia', 'serif'],
        sans: ['DM Sans', 'system-ui', 'sans-serif'],
        'oapp-display': ['"Playfair Display SC"', 'Georgia', 'serif'],
        'oapp-body': ['Karla', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'paper-texture':
          'linear-gradient(180deg, rgba(245,240,232,0.97) 0%, rgba(239,231,219,0.99) 100%)',
        'hero-warm':
          'linear-gradient(105deg, rgba(27,23,20,0.72) 0%, rgba(27,23,20,0.35) 45%, rgba(27,23,20,0.55) 100%)',
        'supplify-mesh':
          'radial-gradient(ellipse 100% 80% at 0% 0%, rgba(109,94,247,0.28) 0%, transparent 55%), radial-gradient(ellipse 70% 50% at 100% 30%, rgba(139,124,255,0.15) 0%, transparent 50%), radial-gradient(ellipse 90% 60% at 50% 100%, rgba(26,16,53,0.95) 0%, transparent 60%)',
        'maalem-mesh':
          'radial-gradient(ellipse 75% 55% at 12% 18%, rgba(232,93,76,0.14) 0%, transparent 52%), radial-gradient(ellipse 55% 45% at 88% 28%, rgba(202,138,4,0.16) 0%, transparent 48%), radial-gradient(ellipse 90% 65% at 50% 100%, rgba(14,8,6,0.92) 0%, transparent 58%)',
        'oapp-mesh':
          'radial-gradient(ellipse 75% 55% at 12% 18%, rgba(232,93,76,0.08) 0%, transparent 52%), radial-gradient(ellipse 55% 45% at 88% 28%, rgba(165,104,40,0.1) 0%, transparent 48%), radial-gradient(ellipse 90% 65% at 50% 100%, rgba(245,240,232,0.95) 0%, transparent 58%)',
        'oapp-hero-glow':
          'radial-gradient(ellipse 60% 50% at 70% 40%, rgba(196,131,74,0.14) 0%, transparent 60%)',
      },
      fontSize: {
        'display-hero': [
          'clamp(3.25rem, 9vw, 8.125rem)',
          { lineHeight: '0.92', letterSpacing: '-0.04em', fontWeight: '700' },
        ],
        'display-xl': [
          'clamp(3.5rem, 10vw, 8.5rem)',
          { lineHeight: '0.92', letterSpacing: '-0.04em' },
        ],
        'display-lg': [
          'clamp(2.75rem, 5.5vw, 5rem)',
          { lineHeight: '1.0', letterSpacing: '-0.035em' },
        ],
        'display-md': [
          'clamp(2rem, 3.5vw, 3.25rem)',
          { lineHeight: '1.08', letterSpacing: '-0.025em' },
        ],
        'rail': [
          'clamp(2.75rem, 11vw, 6.5rem)',
          { lineHeight: '0.95', letterSpacing: '-0.03em' },
        ],
      },
      spacing: {
        section: 'clamp(5rem, 12vw, 9rem)',
        'section-lg': 'clamp(7rem, 16vw, 12rem)',
      },
      boxShadow: {
        editorial: '0 20px 60px -28px rgba(27, 23, 20, 0.14)',
        'editorial-lg': '0 40px 100px -32px rgba(27, 23, 20, 0.2)',
        'ui-float': '0 48px 120px -40px rgba(27, 23, 20, 0.35), 0 0 0 1px rgba(27,23,20,0.06)',
        'supplify-glow': '0 32px 80px -20px rgba(109, 94, 247, 0.45)',
        'maalem-glow': '0 32px 80px -20px rgba(202, 138, 4, 0.38)',
        'oapp-glow': '0 24px 60px -20px rgba(165, 104, 40, 0.22), 0 0 0 1px rgba(165, 104, 40, 0.08)',
        'oapp-device': '0 32px 80px -24px rgba(27, 23, 20, 0.18), 0 0 0 1px rgba(27, 23, 20, 0.06)',
      },
      transitionTimingFunction: {
        cinematic: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
      animation: {
        marquee: 'marquee 55s linear infinite',
        'marquee-slow': 'marquee 90s linear infinite',
        'marquee-reverse': 'marquee-reverse 65s linear infinite',
        'index-rail': 'marquee 60s linear infinite',
        'drift-slow': 'drift 14s ease-in-out infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translate3d(0, 0, 0)' },
          '100%': { transform: 'translate3d(-50%, 0, 0)' },
        },
        'marquee-reverse': {
          '0%': { transform: 'translate3d(-50%, 0, 0)' },
          '100%': { transform: 'translate3d(0, 0, 0)' },
        },
        drift: {
          '0%, 100%': { transform: 'translate3d(0, 0, 0)' },
          '50%': { transform: 'translate3d(0, -8px, 0)' },
        },
      },
    },
  },
  plugins: [],
}
