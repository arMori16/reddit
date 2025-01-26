/** @type {import('tailwindcss').Config} */
const colors = require('./tailwind/tailwind.color')
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    './src/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        ...colors
      },
      boxShadow:{
        'image':'0px -1px 8px rgba(143, 143, 143, 0.3)',
      },
      keyframes: {
        slideIn: {
          '0%': { transform: 'translateY(100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideOut: {
          '0%': { transform: 'translateY(0)', opacity: '1' },
          '100%': { transform: 'translateY(100%)', opacity: '0' },
        },
        slideVoiceOut:{
          '0%': {maxHeight:'0px',overflow:'hidden'},
          '100%': {maxHeight:'12rem',overflow: 'hidden'},
        },
        slideVoiceIn: {
          '0%': { maxHeight:'12rem',overflow: 'hidden'},
          '100%': { maxHeight:'0px' ,overflow: 'hidden'},
        },
        downArrowRotateUp: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(180deg)' },
        },
        downArrowRotateDown: {
          '0%': { transform: 'rotate(180deg)' },
          '100%': { transform: 'rotate(0deg)' },
        },
        slideCommentsOut:{
          '0%': {maxHeight:'0px',overflow:'hidden'},
          '100%': {maxHeight:'1000px',overflow: 'hidden'},
        },
        slideCommentsIn: {
          '0%': { maxHeight:'1000px',overflow: 'hidden'},
          '100%': { maxHeight:'0px' ,overflow: 'hidden'},
        },
        rotate:{
          '0%': { transform : `rotate(0deg)`},
          '100%': { transform : `rotate(360deg)`}
        }
      },
      transitionProperty: {
        'left': 'left',  // Добавим свойство transition для left
      },
      animation: {
        rotate: `rotate 3s linear infinite`,
        slideIn: 'slideIn 1s ease-in-out',
        slideOut: 'slideOut 1s ease-in-out',
        slideVoiceIn: 'slideVoiceIn 0.4s forwards ease-in-out',
        slideVoiceOut: 'slideVoiceOut 0.4s forwards ease-in-out',
        slideCommentsOut: 'slideCommentsOut 0.5s forwards ease-in-out',
        slideCommentsIn: 'slideCommentsIn 0.5s forwards ease-in-out',
        downArrowRotateUp:'downArrowRotateUp 0.3s ease-in-out',
        downArrowRotateDown:'downArrowRotateDown 0.3s ease-in-out',
      },
      backgroundImage: {
        'orange-yellow': 'linear-gradient(to right, #F5ED04, #F3C83B)',
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      screens: {
        'custom-s':{max:'26rem'},
        'custom-md': { max: '40.5rem' }, // 648px breakpoint
        'custom-xs': { max: '36.25rem' },
        'custom-lg': { max: '59.125rem' },
        'custom-65':{ max: ''},
        'custom-image':{max:'21.62rem'},
        'custom-xl2':{max:'71.25rem'},
        landscape:{
          raw:"(orientation:landscape)"
        }
      },
      fontFamily: {
        inknut: ['Inknut Antiqua', 'serif'], // The name you used in @font-face
      },
    },
  },
  plugins: [require('@tailwindcss/line-clamp')],
};
