/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./App.js"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        "custom-white": "rgba(255,255,255,0.2)", // Example - keep your custom colors
      },
      backdropBlur: { // Ensure this section is present
        sm: "4px",
        DEFAULT: "8px",
        md: "12px",
        lg: "16px",
        // You can add more sizes if needed
      },
    },
  },
  plugins: [],
};