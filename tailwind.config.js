/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        TextFontLight: ["Light"],
        TextFontRegular: ["Regular"],
        TextFontMedium: ["Medium"],
        TextFontSemiBold: ["SemiBold"],
        TextFontBold: ["Bold"],
      },
      colors: {
        mainColor: "#9E090F",
        secoundColor: "#6B6A6A",
        thirdColor: "#6B6A6A",
        AddText: "#5E5E5E",
      },
      backgroundColor: {
        mainBgColor: "#E5E5E5",
        secoundBgColor: "#F5F5F5",
        thirdBgColor: "#9D9D9D",
        AddButton: "#ffffff",
      },
      screens: {
        sm: "320px",
        md: "640px",
        lg: "740px",
        xl: "1280px",
        // "2xl": "1536px",
      },
    },
  },
  plugins: [],
};
