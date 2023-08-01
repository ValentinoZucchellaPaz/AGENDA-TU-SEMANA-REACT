/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))'
      },
      colors: {
        primary: '#2d2d96',
        secondary: 'rgb(203, 203, 233)',
        darkGray: '#444',
        transparentBlack: 'rgba(0, 0, 0, 0.2)',
        danger: 'rgb(199, 28, 28)',
        success: 'rgb(128, 214, 42)'
      }
    }
  },
  plugins: []
}
