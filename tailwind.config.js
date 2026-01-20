export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Monochromatic Greyscale Palette
        background: "#050505",     // Deepest Black
        surface: "#111111",        // Off-black
        surfaceHighlight: "#1a1a1a",
        
        text: {
          main: "#F5F5F5",         // Stark White
          muted: "#888888",        // Mid Grey
          subtle: "#444444",       // Dark Grey
        },

        accent: {
          primary: "#FFFFFF",      // Pure White (from image concept)
          subtle: "rgba(255, 255, 255, 0.1)",
        },
      },
      fontFamily: {
        display: ['Syne', 'sans-serif'],
        sans: ['Archivo', 'sans-serif'],
        mono: ['monospace'], 
      },
      transitionDuration: {
        'long': '500ms',
        'slow': '1000ms',
      },
      // Removed gradient-calm to rely on video background
    },
  },
  plugins: [],
}
