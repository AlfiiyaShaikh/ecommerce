/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "green": "#BED754",
        "brown": "#750E21",
        "secondary": "#555",
        "primary": "#FCFCFC"
      }
    },
  },
  plugins: [
    require('daisyui'),
  ],
}

