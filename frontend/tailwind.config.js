/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        base: "#f5f5f4",
        panel: "#ffffff",
        ink: "#1f2937",
        muted: "#6b7280",
        accent: "#6366f1"
      }
    },
  },
  plugins: [],
}

