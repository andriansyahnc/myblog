// @ts-check
const { fontFamily } = require('tailwindcss/defaultTheme')
const colors = require('tailwindcss/colors')

/** @type {import("tailwindcss/types").Config } */
module.exports = {
  content: [
    './node_modules/pliny/**/*.js',
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,tsx}',
    './components/**/*.{js,ts,tsx}',
    './layouts/**/*.{js,ts,tsx}',
    './data/**/*.mdx',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      lineHeight: {
        11: '2.75rem',
        12: '3rem',
        13: '3.25rem',
        14: '3.5rem',
      },
      fontFamily: {
        sans: ['var(--font-space-grotesk)', ...fontFamily.sans],
      },
      colors: {
        primary: colors.cyan,
        secondary: colors.blue,
        gray: colors.gray,
        dark: {
          bg: '#0a0a0a',
          card: '#1a1a1a',
          border: '#2a2a2a',
        },
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%)',
        'gradient-secondary': 'linear-gradient(135deg, #0ea5e9 0%, #2563eb 100%)',
        'gradient-text': 'linear-gradient(135deg, #22d3ee 0%, #60a5fa 100%)',
      },
      typography: (/** @type {any} */ { theme }) => ({
        DEFAULT: {
          css: {
            a: {
              color: theme('colors.primary.500'),
              '&:hover': {
                color: `${theme('colors.primary.600')}`,
              },
              code: { color: theme('colors.primary.400') },
            },
            'h1,h2': {
              fontWeight: '700',
              letterSpacing: theme('letterSpacing.tight'),
            },
            h3: {
              fontWeight: '600',
            },
            code: {
              color: theme('colors.indigo.500'),
            },
          },
        },
        invert: {
          css: {
            a: {
              color: theme('colors.pink.400'),
              '&:hover': {
                backgroundImage: 'linear-gradient(135deg, #f472b6 0%, #fb923c 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              },
              code: { color: theme('colors.pink.400') },
            },
            'h1,h2,h3,h4,h5,h6': {
              color: theme('colors.gray.50'),
              fontWeight: '700',
            },
            p: {
              color: theme('colors.gray.300'),
            },
          },
        },
      }),
    },
  },
  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/typography')],
}
