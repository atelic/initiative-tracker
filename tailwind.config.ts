import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        parchment: {
          50: '#fbfaf6',
          100: '#f3efe4',
          200: '#e7deca',
          300: '#d6c7a9',
          400: '#bba982',
          500: '#9a865f',
          600: '#74644a',
          700: '#544838',
          800: '#352f28',
          900: '#211f1c',
        },
        ink: {
          DEFAULT: '#221f1a',
          light: '#3a352d',
          muted: '#706755',
        },
        accent: {
          gold: '#b8923f',
          copper: '#a45d3b',
          ruby: '#8f2f45',
          emerald: '#266257',
        },
        combat: {
          active: '#b8923f',
          damage: '#8f2f45',
          heal: '#266257',
        },
      },
      fontFamily: {
        display: ['"Geist"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        body: ['"Geist"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      boxShadow: {
        'card': '0 18px 45px -32px rgba(34, 31, 26, 0.42), inset 0 1px 0 rgba(255, 255, 255, 0.58)',
        'card-hover': '0 24px 60px -36px rgba(34, 31, 26, 0.55), inset 0 1px 0 rgba(255, 255, 255, 0.62)',
        'inner-light': 'inset 0 1px 0 rgba(255, 255, 255, 0.28)',
      },
      borderRadius: {
        'card': '0.5rem',
      },
    },
  },
  plugins: [],
} satisfies Config
