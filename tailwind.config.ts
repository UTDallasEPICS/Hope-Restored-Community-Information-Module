/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./index.html",
    "./app.vue",
    "./error.vue",
  ],
  screens: {
    sm: "480px",
    md: "768px",
    lg: "976px",
    xl: "1440px",
  },
  theme: {
    extend: {
      colors: {
        "hrm-green": "#618930",
        "hrm-dark-green": "#15461F",
        "black-neutral": "#1A1A1A",
        "white-neutral": "#F7F7F7",
      },
      fontFamily: {
        default: ["Roboto", "sans-serif"],
      },
    },
  },
  plugins: [],
};
