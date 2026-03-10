/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['"DM Serif Display"', 'Georgia', 'serif'],
        sans: ['"DM Sans"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      colors: {
        helix: {
          50:  '#f0f4ff',
          100: '#e0eaff',
          200: '#c4d4ff',
          300: '#9bb5ff',
          400: '#6b8eff',
          500: '#3d5eff',
          600: '#1e3aff',
          700: '#0d25e6',
          800: '#0f1eb8',
          900: '#121d8f',
          950: '#0a1060',
        },
        slate: {
          850: '#0f172a',
          950: '#020617',
        }
      },
      animation: {
        'fade-up': 'fadeUp 0.6s ease forwards',
        'slide-in': 'slideIn 0.4s ease forwards',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: 0, transform: 'translateY(20px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        slideIn: {
          '0%': { opacity: 0, transform: 'translateX(-20px)' },
          '100%': { opacity: 1, transform: 'translateX(0)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
    },
  },
  plugins: [],
}
