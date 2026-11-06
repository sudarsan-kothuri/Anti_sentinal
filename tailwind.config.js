/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          950: '#030B11',
          900: '#06131D',
          800: '#0A202C',
          700: '#0E2B3C',
          600: '#143C54',
          500: '#1C5272',
        },
        ocean: {
          900: '#081B27',
          800: '#0C2637',
          700: '#11354D',
          600: '#17496A',
        },
        aqua: {
          DEFAULT: '#20D9D0',
          300: '#75EEE7',
          400: '#40E2DA',
          500: '#20D9D0',
          600: '#17B5AD',
          700: '#118F89',
          glow: 'rgba(32, 217, 208, 0.25)',
        },
        electric: {
          DEFAULT: '#319BFF',
          400: '#5CAEFF',
          500: '#319BFF',
          600: '#1C7DE0',
        },
        emerald: {
          accent: '#36D69A',
        },
        amber: {
          warning: '#FFB84D',
        },
        coral: {
          alert: '#FF5D65',
        },
        text: {
          primary: '#EDF8FA',
          secondary: '#91A8B5',
          dim: '#5A7585',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
        display: ['Space Grotesk', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        'glow-aqua': '0 0 25px -5px rgba(32, 217, 208, 0.4)',
        'glow-electric': '0 0 25px -5px rgba(49, 155, 255, 0.4)',
        'glow-coral': '0 0 25px -5px rgba(255, 93, 101, 0.45)',
        'glass-panel': '0 8px 32px 0 rgba(0, 0, 0, 0.45)',
      },
      animation: {
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'scanline': 'scanline 6s linear infinite',
        'orbit': 'orbit 20s linear infinite',
      },
      keyframes: {
        scanline: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(1000%)' },
        }
      }
    },
  },
  plugins: [],
}
