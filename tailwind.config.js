/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.tsx"],
  theme: {
    fontSize: {
      xs: 14,
      sm: 16,
      md: 18,
      lg: 20,
      xl: 24,
      '2xl': 32,
      '3xl': 40,
    },
    extend: {
      colors: {
        'transparent': 'transparent',
  
        'black': '#000',
        'white': '#fff',
        
        'gray-800': '#202024',
        'gray-900': '#121214',
        'gray-700': '#27272B',
        'gray-400': '#7c7c8a',
        'gray-200': '#c4c4cc',
        'gray-100': '#e1e1e6',
        
        'cyan-700': '#0C1C49',
        'cyan-500': '#183A96',
        'cyan-300': '#2457E3',
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar')({ nocompatible: true }),
  ],
}
