const colors = require('tailwindcss/colors');
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",

  ],
  theme: {
    colors: {
      aidonicOrange: '#FF8340',
      aidonicDarkOrange: '#F77833',

    },

  },
  plugins: ['typography']
};
