module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        theme_black: "#0d1117",
        primary_color: "#003C43",
        secondary_color: "#77B0AA",
      },
    },
  },
  variants: {
    extend: {
      colors: ["focus"],
    },
  },
  plugins: [],
};
