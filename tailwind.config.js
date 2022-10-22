/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        xl: "1020px",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        display: ["InterDisplay", "sans-serif"],
      },
    },
  },
  plugins: [],
};
