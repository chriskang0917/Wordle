/** @type {import('tailwindcss').Config} */
const { nextui } = require("@nextui-org/react");

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
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
  darkMode: "class",
  plugins: [require("tailwindcss-animated"), nextui()],
};
