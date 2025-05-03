export default {content: [
  './index.html',
  './src/**/*.{js,ts,jsx,tsx}'
],
  theme: {
    extend: {
      animation: {
        'twinkle': 'twinkle 8s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      boxShadow: {
        'space': '0 0 30px rgba(37,99,235,0.2)',
      },
      textShadow: {
        'lg': '0 2px 4px rgba(0,0,0,0.3)',
      },
    },
  },
}