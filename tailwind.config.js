/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#2563eb',
        'dark-gray': '#1f2937',
        'light-bg': '#f9fafb',
        'persona-hitesh': '#FE7743',
        'persona-piyush': '#447D9B',
      },
      fontFamily: {
        sans: ['ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      maxWidth: {
        'chat': '800px',
      }
    },
  },
  plugins: [],
}