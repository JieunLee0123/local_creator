const plugin = require('tailwindcss/plugin')

module.exports = {
  // purge: [],
  purge: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  darkMode: false, 
  theme: {
    screens: { // 반응형
      sm: '480px',
      md: '768px',
      lg: '960px',
      xl: '1200px',
      '2xl': '1440px',
    },
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '2rem',
        lg: '3rem',
      },
    },

  },
  variants: {
    extend: {},
  },
  plugins: [
    plugin(function({ addComponents, addUtilities, addBase, theme }) {
      addComponents ({ // 컴포넌트 만들기
        
      }),
        addUtilities([ // 폰트
          {
            '.section_title': {
              'text-align': 'center',
              'font-weight': 700,
              'color': 'var(--black-color)',
              'font-size':'25px'
            }
          },
          {
            '@media (min-width: theme(screens.sm))': {
              '.section_title': {
                'font-size':'25px'
              }
            }
          },
          {
            '@media (min-width: theme(screens.md))': {
              '.section_title': {
                'font-size':'30px'
              }
            }
          },
          {
            '@media (min-width: theme(screens.lg))': {
              '.section_title': {
                'font-size':'35px'
              }
            }
          },
          {
            '@media (min-width: theme(screens.2xl))': {
              '.section_title': {
                'font-size':'45px'
              }
            }
          },
      ])
    }),
  ],
};
