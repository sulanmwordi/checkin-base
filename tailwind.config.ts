import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#2563EB",
        secondary: "#7C3AED",
        background: "#F8FAFC",
        surface: "#FFFFFF",
        textPrimary: "#0F172A",
        textSecondary: "#64748B",
        accent: "#14B8A6",
        success: "#22C55E",
        warning: "#F59E0B",
        danger: "#EF4444"
      },
      boxShadow: {
        soft: "0 18px 50px rgba(15, 23, 42, 0.08)"
      }
    }
  },
  plugins: []
};

export default config;
