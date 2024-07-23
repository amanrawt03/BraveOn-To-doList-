
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      margin: {
        'custom-left': '82vw',
        'mid-task': '26vw',
        'mid-header': '38vw',
      },
      width: {
        'custom-left': '45vw',
        'mid-left': '38vw',
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      "forest"
    ],
  },
};
