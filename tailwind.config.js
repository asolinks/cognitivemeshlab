/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}', './components/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['var(--font-display)', 'serif'],
        body: ['var(--font-body)', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
      colors: {
        mesh: {
          50:  '#f0f4ff',
          100: '#e0e9ff',
          200: '#c7d7fe',
          300: '#a4bafd',
          400: '#7c95fa',
          500: '#5a6ef5',
          600: '#3d4ee8',
          700: '#2f3bcc',
          800: '#2830a5',
          900: '#252d82',
          950: '#161a4e',
        },
        teal: {
          400: '#2dd4bf',
          500: '#14b8a6',
          600: '#0d9488',
        },
        amber: { 400: '#fbbf24', 500: '#f59e0b' },
        coral: { 400: '#f87171', 500: '#ef4444' },
      },
      animation: {
        'mesh-pulse': 'mesh-pulse 8s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'fade-up': 'fade-up 0.6s ease forwards',
        'scan': 'scan 3s linear infinite',
      },
      keyframes: {
        'mesh-pulse': {
          '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
          '50%': { opacity: '0.7', transform: 'scale(1.02)' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'scan': {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
      },
    },
  },
  plugins: [],
}
