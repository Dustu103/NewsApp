/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      animation: {
        sparkle: 'sparkle 3s infinite linear',
      },
      // colors: {
      //   background: "var(--background)",
      //   foreground: "var(--foreground)",
      // },
      keyframes: {
        sparkle: {
          '0%': { 'border-image-source': 'linear-gradient(90deg, #FFD700, #FF4500, #FFD700)' },
          '50%': { 'border-image-source': 'linear-gradient(180deg, #FF4500, #FFD700, #FF4500)' },
          '100%': { 'border-image-source': 'linear-gradient(360deg, #FFD700, #FF4500, #FFD700)' },
        },
      },
    },
  },
  plugins: [],
};
