const colors = require("tailwindcss/colors");

module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
    colors: {
      transparent: "transparent",
      current: "currentColor",
      gray: colors.trueGray,
      red: colors.red,
      blue: colors.sky,
      green: colors.green,
      yellow: colors.amber,
      primary: "#370d08",
      secondary: "#6e1a11",
      myRed: "#a52819",
      myOrange: "#ed5100",
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
