module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      animation: {
        "fade-in": "fadeIn 1.5s ease-out forwards",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: 0, transform: "translateY(20px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [require("daisyui")],
  //   daisyui: {
  //     themes: ["dark --default", "light --preferslight", "dracula --dracula"],
  //   },
  daisyui: {
    themes: [
      {
        darktheme: {
          ...require("daisyui/src/colors/themes")["[data-theme=dark]"],
          primary: "#ff4100",
          secondary: "#ffffff",
          accent: "#ff4100",
          neutral: "#1f1f1f",
          "base-100": "#141414",
        },
      },
      {
        lighttheme: {
          ...require("daisyui/src/colors/themes")["[data-theme=light]"],
          primary: "#ff4100",
          secondary: "#000000",
          accent: "#ff4100",
          neutral: "#fafafa",
          "base-100": "#ffffff",
        },
      },
    ],
    darkTheme: "darktheme",
  },
};
