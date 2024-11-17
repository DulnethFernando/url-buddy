import daisyui from "daisyui";
import daisyUIThemes from "daisyui/src/theming/themes";
/** @type {import('tailwindcss').Config} */

export default {
  content: [
      "/index.html",
      "./src/**/*.{js,ts,jsx,tsx}"
  ],
    theme: {
        extend: {
            fontFamily: {
                "Quicksand": ['Quicksand', 'sans-serif']
            }
        },
    },
  plugins: [daisyui],
    daisyui: {
        themes: [
            "light",
            {
                white: {
                    ...daisyUIThemes["white"],
                    primary: "rgb(0, 152, 121)",
                    secondary: "rgb(255, 255, 255)",
                },
            },
        ],
    },
}

