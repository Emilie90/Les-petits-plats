/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.{html,js}"],
  theme: {
    colors: {
      transparent: "transparent",
      current: "currentColor",
      "gris-souris": "#EDEDED",
      gris: "#C6C6C6",
      white: "#ffffff",
      jaune: "#FFD15B",
      "gris-dark": "#7A7A7A",
      zinc: "#1B1B1B",
    },
    extend: {
      backgroundImage: {
        "header-image":
          "url('/images/lampos-aritonang-24gR_9lCdes-unsplash1.png')",
      },
      fontFamily: {
        anton: ["Anton", "sans-serif"],
        manrope: ["Manrope", "sans-serif"],
      },
    },
  },
  plugins: [],
};
