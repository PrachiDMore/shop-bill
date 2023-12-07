/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "accent": "#0e9f6e",
        "lightBlue": "#EEFCFF",
        "darkBlue": "#4589B8",
        "mediumBlue": "#01AAE0",
        "navIcon": "#9FCEEE"
      }
    },
  },
  plugins: [],
}