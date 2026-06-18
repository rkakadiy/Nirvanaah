import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./data/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        cream: "#FFF8F0",
        saffron: "#F6B73C",
        rose: "#F4D1D1",
        pistachio: "#B8D8A8",
        chocolate: "#3A2418",
        ink: "#121212"
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(255,255,255,0.08), 0 24px 80px rgba(58,36,24,0.18)"
      },
      backgroundImage: {
        "hero-orb":
          "radial-gradient(circle at 20% 20%, rgba(246,183,60,0.42), transparent 36%), radial-gradient(circle at 80% 20%, rgba(244,209,209,0.3), transparent 28%), radial-gradient(circle at 50% 80%, rgba(184,216,168,0.24), transparent 34%)"
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translate3d(0, 0, 0)" },
          "50%": { transform: "translate3d(0, -18px, 0)" }
        },
        melt: {
          "0%, 100%": { transform: "scaleY(1)", filter: "blur(0px)" },
          "50%": { transform: "scaleY(1.03)", filter: "blur(1px)" }
        },
        shimmer: {
          "0%": { backgroundPosition: "0% 50%" },
          "100%": { backgroundPosition: "100% 50%" }
        }
      },
      animation: {
        float: "float 8s ease-in-out infinite",
        melt: "melt 7s ease-in-out infinite",
        shimmer: "shimmer 10s linear infinite"
      }
    }
  },
  plugins: []
};

export default config;
