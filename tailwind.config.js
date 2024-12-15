/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
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
