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
        'persona-hitesh': '#059669',
        'persona-piyush': '#dc2626',
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