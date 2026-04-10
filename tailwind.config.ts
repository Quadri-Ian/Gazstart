import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#fff1f2",
          100: "#ffe4e6",
          400: "#c21b4b",
          500: "#b20d38",
          600: "#ab052d",
          700: "#8b0425",
          900: "#560218",
        },
        dark: {
          900: "#394854",
          800: "#435465",
          700: "#516374",
          600: "#607284",
        },
      },
      fontFamily: {
        sans: [
          "Suisse Intl",
          "Helvetica",
          "Arial",
          "sans-serif",
        ],
      },
    },
  },
  plugins: [],
};

export default config;
