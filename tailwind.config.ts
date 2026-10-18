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
        khulumani: {
          green: "#11753d",
          greenDark: "#0d5c31",
          greenLight: "#e8f6ee",
          tangelo: "#c24b00",
          teal: "#0e6f7a",
          bg: "#f6f9f7",
          surface: "#ffffff",
          border: "#dce8e0",
          ink: "#141f18",
          muted: "#4a5d50",
        },
      },
      fontFamily: {
        display: ["system-ui", "-apple-system", "sans-serif"],
        body: ["system-ui", "-apple-system", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
