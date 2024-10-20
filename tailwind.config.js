/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      height: {
        "17": "69px",
        "19.5": "78px"
      },
      width: {
        "17": "69px",
        "158": "632px"
      },
      colors: {
        "primary": "#DB2C1D",
        "textPrimary": "#313642",
        "gray": "#757575",
        "lightGray": "#818181",
        "lighestGray": "#CECFD2"
      }
    },
  },
  plugins: [],
}

