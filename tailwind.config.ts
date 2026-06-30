import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        forest: {
          DEFAULT: "#14503B",
          dark: "#0E3B2E",
        },
        gold: "#C8972F",
        coral: "#E36458",
        cream: "#F5F1E8",
        graphite: "#1C1C1C",
      },
      fontFamily: {
        heading: ["var(--font-heading)"],
        body: ["var(--font-body)"],
      },
      boxShadow: {
        soft: "0 10px 40px -10px rgba(14, 59, 46, 0.25)",
        card: "0 8px 30px -8px rgba(28, 28, 28, 0.18)",
      },
      borderRadius: {
        xl2: "1.25rem",
      },
    },
  },
  plugins: [],
};

export default config;
