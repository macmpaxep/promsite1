import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        steel: {
          50: "#f0f4f8",
          100: "#d9e2ec",
          200: "#bcccdc",
          300: "#9fb3c8",
          400: "#829ab1",
          500: "#627d98",
          600: "#486581",
          700: "#334e68",
          750: "#253d52",
          800: "#1A2533",
          850: "#162030",
          900: "#0F1923",
          950: "#090f16",
        },
        amber: {
          400: "#f5b73d",
          500: "#E8A020",
          600: "#c8881a",
        },
        cold: "#8A9BAE",
      },
      fontFamily: {
        inter: ["Inter", "sans-serif"],
        barlow: ["Barlow Condensed", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
