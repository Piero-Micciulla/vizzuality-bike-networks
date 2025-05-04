import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";

const config: Config = {
  content: [
    "./src/**/*.{ts,tsx,js,jsx}",
    "./components/**/*.{ts,tsx,js,jsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Poppins", ...defaultTheme.fontFamily.sans],
      },
      colors: {
        "torea-50": "hsl(var(--color-torea-50))",
        "torea-100": "hsl(var(--color-torea-100))",
        "torea-200": "hsl(var(--color-torea-200))",
        "torea-300": "hsl(var(--color-torea-300))",
        "torea-600": "hsl(var(--color-torea-600))",
        "torea-700": "hsl(var(--color-torea-700))",
        "torea-800": "hsl(var(--color-torea-800))",
        "torea-900": "hsl(var(--color-torea-900))",
        "torea-950": "hsl(var(--color-torea-950))",

        "grenadier-400": "hsl(var(--color-grenadier-400))",
        "grenadier-500": "hsl(var(--color-grenadier-500))",
        "grenadier-800": "hsl(var(--color-grenadier-800))",

        "zinc-500": "hsl(var(--color-zinc-500))",
        "lime-500": "hsl(var(--color-lime-500))",
        white: "hsl(var(--color-white))",
      },
    },
  },
  plugins: [],
};

export default config;
