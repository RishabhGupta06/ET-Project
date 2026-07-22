/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#0a0a0f',
        panel: '#13131a',
        primary: '#4f46e5', // Indigo
        accent: '#0ea5e9', // Sky
        danger: '#ef4444',
        warning: '#f59e0b',
        success: '#10b981'
      }
    },
  },
  plugins: [],
}
