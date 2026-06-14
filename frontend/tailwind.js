/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#6366f1',
        secondary: '#8b5cf6',
        accent: '#ec4899',
        dark: '#0f172a',
        darker: '#020617',
        light: '#f8fafc',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        node: '0 4px 12px rgba(0, 0, 0, 0.15)',
        'node-hover': '0 8px 24px rgba(99, 102, 241, 0.2)',
      },
    },
  },
  plugins: [],
}
