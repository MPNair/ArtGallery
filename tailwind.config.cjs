/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/views/**/*.ejs", "./public/assets/js/**/*.js"],
  theme: {
    extend: {
      colors: {
        ink: "#0b0a09",
        "lux-charcoal": "#050609",
        "lux-charcoal-soft": "#111118",
        "lux-gold": "#c7a45a",
        "lux-gold-deep": "#8f6b2f",
        "lux-cherry": "#7c1a1a",
        parchment: {
          50: "#fbf3df",
          100: "#f3e2bf",
          200: "#e8cfa0",
          300: "#d9b67b",
          400: "#c99b56",
          500: "#b5823e",
          600: "#926633",
          700: "#6f4d2a",
          800: "#4d351f",
          900: "#2f2014"
        }
      },
      fontFamily: {
        display: ["Cormorant Garamond", "ui-serif", "Georgia", "serif"],
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"]
      },
      boxShadow: {
        soft: "0 10px 30px rgba(0,0,0,0.35)"
      }
    }
  },
  plugins: []
};

