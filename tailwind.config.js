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
        secoundColor: "#fff",
        thirdColor: "#B3B3B3",
        AddText: "#5E5E5E",
      },
      backgroundColor: {
        mainBgColor: "#E5E5E5",
        secoundBgColor: "#cccccc",
        thirdBgColor: "#f6f6f6",
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
