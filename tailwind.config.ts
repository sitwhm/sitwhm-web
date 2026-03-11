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
        syntax: {
          blue: '#0632A0',
          cyan: '#1EB4E6',
          green: '#3CC85A',
          gray: '#F5F5F5',
          dark: '#262626',
        },
      },
    },
  },
  plugins: [],
};

export default config;
