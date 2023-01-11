const { colors } = require("tailwindcss/colors")

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./content/**/*.{md,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ...colors,
        "docsy-blue": '#30638e'
      },
      animation: {
        'my-loading': 'coloredspin 4s linear infinite'
      },
      keyframes: {
        'coloredspin': {
          '0%': {
            'transform': 'rotate(0deg)',
            'border-top-color': '#1abc9c',
            'border-bottom-color': '#1abc9c'
          },
          '25%': {
            'border-top-color': '#2ecc71',
            'border-bottom-color': '#2ecc71'
          },
          '50%': {
            'transform': 'rotate(360deg)',
            'border-top-color': '#3498db',
            'border-bottom-color': '#3498db'
          },
          '75%': {
            'border-top-color': '#9b59b6',
            'border-bottom-color': '#9b59b6'
          },
          '100%': {
            transform: 'rotate(720deg)',
            'border-top-color': '#1abc9c',
            'border-bottom-color': '#1abc9c'
          }
        }
      }
    },
  },
  plugins: [],
}
