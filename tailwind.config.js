/** @type {import('tailwindcss').Config} */
const { hairlineWidth } = require("nativewind/theme");

module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: [
    "./*.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}",
    "./src/components/**/*.{js,jsx,ts,tsx}",
    "./src/screens/**/*.{js,jsx,ts,tsx}",
    "./src/ui/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    fontFamily: {
      "inter-regular": "Inter-Regular",
      "inter-medium": "Inter-Medium",
      "inter-semibold": "Inter-SemiBold",
      "inter-bold": "Inter-Bold",
    },
    extend: {
      colors: require("./tailwindColors.js"),
      padding: {
        street: "1rem",
      },
      borderWidth: {
        hairline: hairlineWidth(),
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        ".icon-sm": {
          height: "1rem",
          width: "1rem",
        },
        ".icon-md": {
          height: "1.5rem",
          width: "1.5rem",
        },
        ".icon-lg": {
          height: "2rem",
          width: "2rem",
        },
      };
      addUtilities(newUtilities, ["responsive"]);
    },
  ],
};
