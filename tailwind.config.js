module.exports = {
  theme: {
    container: (theme) => ({
      // To center containers by default
      center: true,

      // To add horizontal padding by default
      padding: {
        default: theme("spacing.4"),
        sm: theme("spacing.5"),
        lg: theme("spacing.6"),
        xl: theme("spacing.8"),
      },
    }),
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('daisyui')
  ],
  daisyui: {
    styled: true,
    themes: false,
    base: true,
    utils: true,
    logs: false,
    rtl: true,
  },
}
