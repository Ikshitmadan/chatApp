/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    
    extend: {

      colors:{
        thapa:{
          400:'#e1ffc7'
        },

        hapu:{

          600:'#d3d3d3'
        }

      }

    },
  },
  plugins: [],
}

