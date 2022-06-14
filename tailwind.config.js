const typography = require('@tailwindcss/typography')
const aspect = require('@tailwindcss/aspect-ratio')
const forms = require('@tailwindcss/forms')

module.exports = {
  content: [
    './src/**/*.{vue,js,ts,jsx,tsx}'
  ],
  darkMode: 'class',
  theme: {
    extend: {
      boxShadow: {
        'inner-border': 'inset 0 0 0 1px rgba(0, 0, 0, 0.10)',
      },

      typography: (theme) => ({
        DEFAULT: {
          css: {
            code: {
              color: theme('colors.gray.800'),
              background: theme('colors.gray.100'),
              paddingLeft: theme('spacing.0.5'),
              paddingRight: theme('spacing.0.5'),
              borderRadius: theme('borderRadius.sm'),
            },
            a: {
              color: theme('colors.blue.500'),
            },
          },
        },
      }),
    },
  },
  plugins: [
    typography,
    aspect,
    forms()
  ],
}
