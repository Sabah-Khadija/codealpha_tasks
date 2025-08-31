// tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'spin-slow': 'spin 3s linear infinite',
      },
      transitionTimingFunction: {
        'custom': 'cubic-bezier(0.19, 1, 0.22, 1)',
      }
    },
  },
  plugins: [],
}