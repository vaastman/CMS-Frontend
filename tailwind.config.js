/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#0B3A6F",
        secondary: "#F4B400",

        page: "#F5F7FA",
        surface: "#FFFFFF",

        textPrimary: "#1F2937",
        textSecondary: "#6B7280",

        divider: "#E5E7EB",
      },
    },
  },
  plugins: [],
};
