import type { Config } from "tailwindcss";

// "U&I Global site" look: teal bars, warm cream ground, ink text, Kanit headings.
// Token names are kept from the original build so every component re-themes at once:
//   primary = teal, navy = ink (dark text / dark panels), accent = light teal used on dark grounds,
//   neutral = warm greys on cream.
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./content/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#F2FAF9",
          100: "#E5F4F2",
          300: "#7FD3CB",
          500: "#009C91",
          700: "#007D74",
          900: "#00665F",
        },
        navy: {
          100: "#E7E3DC",
          300: "#6A6862",
          700: "#12110F",
          900: "#12110F",
        },
        accent: {
          100: "#E5F4F2",
          500: "#7FD3CB",
          600: "#66C4BD",
        },
        coral: { 500: "#E65A41" },
        cream: "#FFFDFA",
        neutral: {
          50: "#FFFDFA",
          100: "#F6F3EE",
          200: "#E7E3DC",
          400: "#8C8A84",
          600: "#4A4844",
          700: "#3B3A36",
          900: "#12110F",
        },
      },
      fontFamily: {
        heading: ["var(--font-kanit)", "Noto Sans KR", "Noto Sans Thai", "system-ui", "sans-serif"],
        sans: ["var(--font-plex)", "Noto Sans KR", "system-ui", "sans-serif"],
        script: ["var(--font-yellowtail)", "cursive"],
      },
      fontSize: {
        "ds-small": ["0.875rem", { lineHeight: "1.5", fontWeight: "400" }],
        "ds-h2": ["2.625rem", { lineHeight: "1.15", fontWeight: "600" }],
      },
      backgroundImage: {
        bar: "linear-gradient(90deg, #009C91 0%, #007D74 100%)",
        fade: "linear-gradient(0deg, rgba(18,17,15,.85) 0%, rgba(18,17,15,0) 70%)",
      },
    },
  },
  plugins: [],
};

export default config;
