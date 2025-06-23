/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#FFF5F5',
          100: '#FFE5E5',
          200: '#FFD1D1',
          300: '#FFB3B3',
          400: '#FF8A8A',
          500: '#FF5A5F',
          600: '#E63946',
          700: '#CC2936',
          800: '#B31E2B',
          900: '#9A1621'
        },
        secondary: {
          50: '#E6F7F6',
          100: '#B3EBE8',
          200: '#80DFDA',
          300: '#4DD3CC',
          400: '#26C7BE',
          500: '#00A699',
          600: '#00958A',
          700: '#00847B',
          800: '#00736C',
          900: '#00625D'
        },
        accent: {
          50: '#FFF4E6',
          100: '#FFE0B3',
          200: '#FFCC80',
          300: '#FFB84D',
          400: '#FFA426',
          500: '#FC642D',
          600: '#E8521A',
          700: '#D44107',
          800: '#C03000',
          900: '#AC2800'
        },
        neutral: {
          50: '#F9FAFB',
          100: '#F3F4F6',
          200: '#E5E7EB',
          300: '#D1D5DB',
          400: '#9CA3AF',
          500: '#6B7280',
          600: '#4B5563',
          700: '#374151',
          800: '#1F2937',
          900: '#111827'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'scale-in': 'scaleIn 0.2s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};