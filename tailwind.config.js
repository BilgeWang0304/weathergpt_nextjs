/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',  // Ensure Tailwind scans your app directory
    './pages/**/*.{js,ts,jsx,tsx}',  // Include any other directories with JS/TS files
    './components/**/*.{js,ts,jsx,tsx}',  // Include your components folder
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
