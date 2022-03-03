module.exports = {
  important: true,
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: '#148f64',
        secondary: {
          hover: '#ACB274',
          DEFAULT: '#958a5f',
        },
        subTitleText: '#777',
        goldPrimary: '#958a5f',
      },
    },
    screens: {
      xs: {min: '0', max: '639px'},
      sm: '640px',
      // => @media (min-width: 640px) { ... }

      md: '768px',
      // => @media (min-width: 768px) { ... }

      lg: '1024px',
      // => @media (min-width: 1024px) { ... }

      xl: '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }
    },
    fontFamily: {
      nunito: ['Nunito Sans', 'sans-serif'],
      Almarai: ['Almarai', 'sans-serif'],
    },
  },
  variants: {
    extend: {},
    margin: ['responsive', 'direction'],
    padding: ['responsive', 'direction'],
    inset: ['responsive', 'direction'],
    translate: ['responsive', 'direction'],
    display: ['responsive', 'direction'],
    textAlign: ['responsive', 'direction'],
    flexDirection: ['responsive', 'direction'],
  },
  plugins: [require('tailwindcss-dir')()],
}
