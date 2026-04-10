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
        brand: {
          dark: "#394854",
          red: "#ab052d",
          white: "#ffffff",
          card: "#f8f8f9",
          nav: "#2b3944",
        },
        /* keep legacy aliases for backward compat */
        primary: {
          50: "#f0f9ff",
          100: "#e0f2fe",
          500: "#ab052d",
          600: "#8b0424",
          700: "#6b031b",
          900: "#3b0110",
        },
        accent: {
          500: "#ab052d",
          600: "#8b0424",
        },
        dark: {
          900: "#394854",
          800: "#2b3944",
          700: "#3a4d5c",
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
