import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Fantasy parchment palette
        parchment: {
          50: '#fdfcfa',
          100: '#f9f6f0',
          200: '#f3ede0',
          300: '#e8dcc6',
          400: '#d4c4a8',
          500: '#c4b08a',
          600: '#a08860',
          700: '#7a6848',
          800: '#5c4d38',
          900: '#3d3226',
        },
        ink: {
          DEFAULT: '#2c2416',
          light: '#4a3f2d',
          muted: '#6b5d47',
        },
        accent: {
          gold: '#c9a227',
          copper: '#b87333',
          ruby: '#9b2335',
          emerald: '#2e5a4c',
        },
        combat: {
          active: '#c9a227',
          damage: '#9b2335',
          heal: '#2e5a4c',
        },
      },
      fontFamily: {
        display: ['"Cinzel"', 'serif'],
        body: ['"Crimson Text"', 'Georgia', 'serif'],
        mono: ['"Fira Code"', 'monospace'],
      },
      boxShadow: {
        'card': '0 2px 8px rgba(44, 36, 22, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.5)',
        'card-hover': '0 4px 16px rgba(44, 36, 22, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.5)',
        'inner-light': 'inset 0 1px 2px rgba(255, 255, 255, 0.3)',
      },
      borderRadius: {
        'card': '0.5rem',
      },
    },
  },
  plugins: [],
} satisfies Config
