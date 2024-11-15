import plugin from 'tailwindcss/plugin'

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  variants: {
    extend: {
      backgroundColor: ["disabled"],
      borderWidth: ["disabled"],
      textColor: ["disabled"],
    },
  },
  plugins: [
    plugin(({ addUtilities }) => {
      addUtilities({
        ".disabled-btn": {
          "@apply mt-6 disabled:bg-black/10 disabled:border-0 disabled:text-white":
            {},
        },
      });
    }),
  ],
};