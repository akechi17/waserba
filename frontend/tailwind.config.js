module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    fontFamily: {
      display: ["Open Sans", "sans-serif"],
      body: ["Open Sans", "sans-serif"],
    },
    extend: {
      colors: {
        secondary: "#F0F1F2",
        primary: {
          50: "#e3fde4",
          100: "#ebf4fb",
          200: "#c1dcf2",
          300: "#6cace1",
          400: "#16c829",
          500: "#277bc0",
          600: "#1e6096",
          700: "#16456b",
          800: "#0d2a41",
          900: "#050e16",
        },
      },
      fontSize: {
        14: "14px",
        xxs: [
          ".625rem",
          {
            lineHeight: ".75rem",
          },
        ],
      },
      backgroundColor: {
        "main-bg": "#FAFBFB",
        "main-dark-bg": "#20232A",
        "secondary-dark-bg": "#33373E",
        "light-gray": "#F7F7F7",
        "half-transparent": "rgba(0, 0, 0, 0.5)",
      },
      borderWidth: {
        1: "1px",
      },
      borderColor: {
        color: "rgba(0, 0, 0, 0.1)",
      },
      width: {
        400: "400px",
        760: "760px",
        780: "780px",
        800: "800px",
        1000: "1000px",
        1200: "1200px",
        1400: "1400px",
      },
      height: {
        80: "80px",
      },
      minHeight: {
        590: "590px",
      }
    },
  },
  plugins: [require("daisyui")],
};
