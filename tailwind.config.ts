import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        parchment: {
          50: '#2b2823',
          100: '#24211d',
          200: '#ded0b5',
          300: '#51493d',
          400: '#746955',
          500: '#95876d',
          600: '#b3a486',
          700: '#cfc09e',
          800: '#e2d5b9',
          900: '#302b22',
        },
        vellum: {
          100: '#302b22',
          200: '#453c2d',
          300: '#665740',
          400: '#75644c',
          500: '#7b6b55',
        },
        ink: {
          DEFAULT: '#302b22',
          light: '#514634',
          muted: '#75644c',
        },
        brass: {
          200: '#715322',
          300: '#856330',
          400: '#8b713f',
          500: '#b18e4c',
        },
        accent: {
          gold: '#856330',
          copper: '#986343',
          ruby: '#9b4650',
          emerald: '#477d68',
        },
        combat: {
          active: '#856330',
          damage: '#983e35',
          heal: '#3d6751',
        },
      },
      fontFamily: {
        display: ['"IM Fell English"', 'Georgia', 'serif'],
        body: ['"Geist"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      boxShadow: {
        card: '0 24px 60px -34px rgba(10, 9, 7, 0.72), inset 0 1px 0 rgba(255, 248, 225, 0.06)',
        'card-hover': '0 28px 70px -34px rgba(10, 9, 7, 0.82), inset 0 1px 0 rgba(255, 248, 225, 0.08)',
        'inner-light': 'inset 0 1px 0 rgba(255, 248, 225, 0.08)',
      },
      borderRadius: {
        card: '0.25rem',
      },
    },
  },
  plugins: [],
} satisfies Config
