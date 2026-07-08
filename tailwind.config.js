/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Surfaces — sampled from the mockups (near-black base, layered cards)
        bg: {
          DEFAULT: "#0a0b0f", // page background
          subtle: "#0d0f14",
          card: "#111318", // card surface
          elevated: "#161a22", // hover / elevated card
          input: "#1a1d26",
        },
        border: {
          DEFAULT: "#1f2430",
          subtle: "#191d27",
          strong: "#2a3140",
        },
        // Brand accent — the indigo/blue from buttons & active nav
        brand: {
          DEFAULT: "#5b6cff",
          hover: "#4856e6",
          muted: "#3a44a8",
          soft: "#5b6cff1a", // translucent fill for chips/badges
        },
        // Gradient stops for "Intelligent Learning" headline
        accentBlue: "#4f7cff",
        accentTeal: "#5fd3c0",
        // Semantic
        success: "#34d399",
        warning: "#fbbf24",
        danger: "#f87171",
        // Text
        ink: {
          DEFAULT: "#f3f4f6", // primary text
          muted: "#9aa3b2", // secondary text
          faint: "#5f6878", // tertiary / placeholder
        },
      },
      borderRadius: {
        card: "16px",
        pill: "9999px",
      },
      backgroundImage: {
        "brand-gradient": "linear-gradient(90deg, #4f7cff 0%, #5fd3c0 100%)",
        "hero-glow":
          "radial-gradient(1200px 500px at 50% -10%, #1c2550 0%, transparent 70%)",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
