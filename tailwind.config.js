/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],     // Tailwindのデフォルトフォントに上書き
        poppins: ['Poppins', 'sans-serif'],  // 個別に指定も可能
      },
    },
  },
  plugins: [],
};