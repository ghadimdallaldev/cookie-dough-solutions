/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        dough: {
          50: '#fffaf5',
          100: '#fef3e8',
          200: '#f5dfc4',
          300: '#e8c9a0',
          400: '#d4a574',
          500: '#b8834a',
          600: '#8f5e2e',
          700: '#6b4522',
          800: '#4a3018',
          900: '#2d1c0f',
          950: '#1a1008',
        },
        ink: '#0c0a09',
        chip: {
          DEFAULT: '#5c3d2e',
          light: '#8b5a3c',
        },
        supplify: {
          DEFAULT: '#7c3aed',
          dark: '#1a0a2e',
          glow: '#c4b5fd',
        },
      },
      fontFamily: {
        display: ['Syne', 'system-ui', 'sans-serif'],
        sans: ['DM Sans', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'display-xl': ['clamp(3.5rem,12vw,9rem)', { lineHeight: '0.95', letterSpacing: '-0.04em' }],
        'display-lg': ['clamp(2.5rem,6vw,5rem)', { lineHeight: '1.05', letterSpacing: '-0.03em' }],
      },
      animation: {
        marquee: 'marquee 40s linear infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
    },
  },
  plugins: [],
}
