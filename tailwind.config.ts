import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        np: {
          bg: "#071614",
          panel: "#0B201D",
          panel2: "#0E2A26",
          border: "#143A35",
          text: "#E7F2EF",
          muted: "#A7C1BB",
          green: "#15803D",
          green2: "#0E7A3B",
          lime: "#22C55E",
          amber: "#F59E0B",
          red: "#DC2626"
        }
      },
      boxShadow: {
        panel: "0 12px 30px rgba(0,0,0,.45)"
      }
    }
  },
  plugins: []
} satisfies Config;
