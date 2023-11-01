/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      gridTemplateRows: {
        board: "repeat(6, 62px)",
      },
      colors: {
        border: "rgb(58, 58, 60)",
        "board-background": "rgb(15, 15, 16)",
      },
    },
  },
  plugins: [require("tailwindcss-animated")],
};
