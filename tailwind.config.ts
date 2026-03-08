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
        benita: {
          blue: "#4f7fff",
          orange: "#ffa41b",
          "orange-dark": "#f87004",
          pink: "#c99bc4",
          cream: "#fff8f0",
        },
      },
      fontFamily: {
        jonesy: ["var(--font-jonesy)"],
        poppins: ["var(--font-poppins)"],
      },
    },
  },
  plugins: [],
};
export default config;
