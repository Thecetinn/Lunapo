import type { Config } from "tailwindcss";
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: { DEFAULT: "#C8102E", dark: "#A00D24", light: "#FFF0F2" },
      },
    },
  },
  plugins: [],
};
export default config;
