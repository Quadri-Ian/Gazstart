import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          navy: '#0A1628',
          'navy-light': '#1A2E4A',
          'navy-dark': '#050E1A',
          blue: '#1E3A5F',
          'blue-light': '#2E5C8A',
          orange: '#F97316',
          'orange-light': '#FB923C',
          'orange-dark': '#EA580C',
          gold: '#F59E0B',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Montserrat', 'Inter', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-brand': 'linear-gradient(135deg, #0A1628 0%, #1E3A5F 50%, #0A1628 100%)',
        'gradient-orange': 'linear-gradient(135deg, #EA580C 0%, #F97316 50%, #FB923C 100%)',
      },
    },
  },
  plugins: [],
}

export default config
