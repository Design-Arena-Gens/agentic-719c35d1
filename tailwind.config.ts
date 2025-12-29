import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}"
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "#0f172a",
        accent: {
          DEFAULT: "#38bdf8",
          muted: "#0ea5e9"
        }
      },
      fontFamily: {
        display: ["var(--font-sans)", "Inter", "system-ui", "sans-serif"]
      },
      boxShadow: {
        soft: "0 20px 50px -20px rgba(56, 189, 248, 0.35)"
      }
    }
  },
  plugins: [require("@tailwindcss/forms")]
};

export default config;
