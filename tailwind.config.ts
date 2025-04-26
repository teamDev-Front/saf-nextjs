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
        'main-1': '#AF5C50',
        'main-0': '#840000',
        'main--1': '#600000',
        'main--2': '#4F0000',
        'grey-2': '#F5F7F9',
        'grey-1': '#D2D7DC',
        'grey-0': '#9EA8B3',
        'grey--1': '#2A2A2A',
        'black': '#0A0101',
        'red': '#C5343A',
      },
    },
  },
  plugins: [],
};
export default config;
