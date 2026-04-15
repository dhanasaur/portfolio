export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Core
        background: "#050505",
        surface: "#111111",
        surfaceHighlight: "#1a1a1a",
        paper: "#F5F5F5",

        // Accent palette
        secondary: "#A0A0A0",
        tertiary: "#606060",

        text: {
          main: "#F5F5F5",
          muted: "#888888",
          subtle: "#444444",
        },

        accent: {
          primary: "#FFFFFF",
          subtle: "rgba(255, 255, 255, 0.1)",
        },
      },
      fontFamily: {
        display: ['Syne', 'sans-serif'],
        heading: ['Syne', 'sans-serif'],
        sans: ['Archivo', 'sans-serif'],
        mono: ['monospace'],
      },
      transitionDuration: {
        'long': '500ms',
        'slow': '1000ms',
      },
    },
  },
  plugins: [],
}
