/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        green:"#B3DCC5",
        "green-400":'#5DC090',
        "gray-600":'#7A7A7A',
        "gray-300":"#3C3C3C",
        "gray-200":'#242424',
        "gray-100":'#222222'
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
      },
      animation: {
        slideIn: 'slideIn 1s ease-in-out',
        slideOut: 'slideOut 1s ease-in-out',
        slideVoiceIn: 'slideVoiceIn 0.6s forwards ease-in-out',
        slideVoiceOut: 'slideVoiceOut 0.6s forwards ease-in-out',
        downArrowRotateUp:'downArrowRotateUp 0.3s ease-in-out',
        downArrowRotateDown:'downArrowRotateDown 0.3s ease-in-out',
      },
      backgroundImage: {
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
      fontFamily:{
      }
    },
  },
  plugins: [],
};
