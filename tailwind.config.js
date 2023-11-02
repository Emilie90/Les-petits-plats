/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.{html,js}"],
  theme: {
    colors: {
      transparent: "transparent",
      current: "currentColor",
      "gris-souris": "#EDEDED",
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
      },
    },
  },
  plugins: [],
};
