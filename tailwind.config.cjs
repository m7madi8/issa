/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        arabic: ['"IBM Plex Sans Arabic"', 'Tajawal', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        inter: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      colors: {
        brand: {
          DEFAULT: '#e11d2e',
          soft: 'rgba(225, 29, 46, 0.1)',
        },
        lux: {
          ink: '#0a0a0a',
          mist: '#f4f2ef',
          stone: '#8a8580',
          umber: '#3d342c',
        },
      },
      transitionTimingFunction: {
        premium: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
      boxShadow: {
        premium: '0 24px 70px rgba(17, 17, 17, 0.18)',
        luxcard: '0 28px 80px rgba(10, 10, 10, 0.14)',
      },
    },
  },
  plugins: [],
};
