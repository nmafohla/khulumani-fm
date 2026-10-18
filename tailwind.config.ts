import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        station: {
          dark: "#0d0f12",
          card: "#15181e",
          border: "#232833",
          gold: "#f59e0b",
          amber: "#d97706",
          teal: "#0d9488",
          red: "#ef4444",
          muted: "#94a3b8",
        },
      },
      fontFamily: {
        display: ["system-ui", "sans-serif"],
        body: ["system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
