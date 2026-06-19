import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/features/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        seazone: {
          navy: "#0B192C",
          coral: "#FF5A5F",
          background: "#F8FAFC",
          card: "#FFFFFF",
        },
      },
    },
  },
  plugins: [],
};

export default config;
