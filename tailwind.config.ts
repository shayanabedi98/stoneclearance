import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1b2a41",
        secondary: "#324a5f",
        bg: "#E9ECEF",
        darkerBg: "#DEE2E6",
        text: "#212529",
        neutral: "#6C757D",
      },
    },
  },
  plugins: [],
};
export default config;
