/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['SuisseWorks', 'Georgia', 'Times', 'Times New Roman', 'serif', 'Lexend'],
        emoji: ['Apple Color Emoji', 'Segoe UI Emoji'],
        symbol: ['Segoe UI Symbol'],
      },
      fontSize: {
        'customFont': '1.3rem',
        'customHeadingFont': '70px',
        'customTextSize': '20px',
        'midTextSize': '40px',
        'midPTextSize': '25px',
        'midPPTextSize': '19px'
      },
      backgroundColor: {
        'customButton': '#6255A5',
        'hoverButton': '#8710d8',
        'customBg': '#F9F7FF'
      },
      borderColor: {
        'custom': '#A435F0',
        'hoverButton': '#8710d8',
      },
      borderRadius: {
        'custom': '15px',
      },

      textColor: {
        'customText': '#827A7A',
        'customWhiteText': '#FFFFFF',
        'customHeadingText': '#0C0531',
        'customPText': '#6A6B6C'
      },
      fontWeight: {
        'custom': 500,
        'customWeight': 600,
        'midFontWeight': 530
      },
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
}