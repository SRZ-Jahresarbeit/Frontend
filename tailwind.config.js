module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        first: "#4b5563", //gray-600
        second: "#dc2626",//red-600
        third: {
          100: ""
        }
      },
      fontFamily: {
        first: ["Noto Sans"]
      },
    
      spacing: {
        "140px": "140px",
        "150px": "150px",
        "600px": "600px",
        "200px": "200px"     
      },
    
      minHeight:{
        "5pr": "5%",
        "95pr": "95%",
        "600px": "600px",
        
      },
      minWidth: {
        "15pr": "15%",
      },


    },
  },



  variants: {
    extend: {},
  },
  plugins: [],
}
