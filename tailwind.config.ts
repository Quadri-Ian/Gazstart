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
          50: "#eef5ff",
          100: "#dce9ff",
          400: "#014ab1",
          500: "#014ab1",
          600: "#014ab1",
          700: "#014ab1",
          900: "#06285f",
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
