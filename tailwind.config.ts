import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./client/index.html", "./client/src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        card: {
          DEFAULT: "var(--card)",
          foreground: "var(--card-foreground)",
        },
        popover: {
          DEFAULT: "var(--popover)",
          foreground: "var(--popover-foreground)",
        },
        primary: {
          DEFAULT: "var(--primary)",
          foreground: "var(--primary-foreground)",
        },
        secondary: {
          DEFAULT: "var(--secondary)",
          foreground: "var(--secondary-foreground)",
        },
        muted: {
          DEFAULT: "var(--muted)",
          foreground: "var(--muted-foreground)",
        },
        accent: {
          DEFAULT: "var(--accent)",
          foreground: "var(--accent-foreground)",
        },
        destructive: {
          DEFAULT: "var(--destructive)",
          foreground: "var(--destructive-foreground)",
        },
        border: "var(--border)",
        input: "var(--input)",
        ring: "var(--ring)",
        chart: {
          "1": "var(--chart-1, var(--primary))",
          "2": "var(--chart-2, var(--secondary))",
          "3": "var(--chart-3, var(--accent))",
          "4": "var(--chart-4, var(--muted))",
          "5": "var(--chart-5, var(--border))",
        },
        sidebar: {
          DEFAULT: "var(--sidebar-background, var(--background))",
          foreground: "var(--sidebar-foreground, var(--foreground))",
          primary: "var(--sidebar-primary, var(--primary))",
          "primary-foreground": "var(--sidebar-primary-foreground, var(--primary-foreground))",
          accent: "var(--sidebar-accent, var(--accent))",
          "accent-foreground": "var(--sidebar-accent-foreground, var(--accent-foreground))",
          border: "var(--sidebar-border, var(--border))",
          ring: "var(--sidebar-ring, var(--ring))",
        },
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
        "shimmer": {
          from: {
            transform: "translateX(-100%)",
          },
          to: {
            transform: "translateX(100%)",
          },
        },
        "pulse-once": {
          "0%": { transform: "scale(0.95)" },
          "50%": { transform: "scale(1.05)" },
          "100%": { transform: "scale(1)" },
        },
        "bounce-subtle": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10%)" },
        },
        "spin-slow": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        "shake": {
          "0%, 100%": { transform: "translateX(0)" },
          "10%, 30%, 50%, 70%, 90%": { transform: "translateX(-2px)" },
          "20%, 40%, 60%, 80%": { transform: "translateX(2px)" },
        },
        "scale-in": {
          "0%": { transform: "scale(0)", opacity: "0" },
          "60%": { transform: "scale(1.1)" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        "slide-up": {
          "0%": { transform: "translateY(0.5rem)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        "slide-down": {
          "0%": { transform: "translateY(-0.5rem)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        "highlight": {
          "0%": { backgroundColor: "transparent" },
          "30%": { backgroundColor: "rgba(var(--color-primary-rgb), 0.2)" },
          "100%": { backgroundColor: "transparent" },
        },
        "pulse-ring": {
          "0%": { transform: "scale(0.95)", boxShadow: "0 0 0 0 rgba(var(--color-primary-rgb), 0.7)" },
          "70%": { transform: "scale(1)", boxShadow: "0 0 0 10px rgba(var(--color-primary-rgb), 0)" },
          "100%": { transform: "scale(0.95)", boxShadow: "0 0 0 0 rgba(var(--color-primary-rgb), 0)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "shimmer": "shimmer 2s linear infinite",
        "pulse-once": "pulse-once 0.5s ease-out",
        "bounce-subtle": "bounce-subtle 1s ease-in-out infinite",
        "spin-slow": "spin-slow 6s linear infinite",
        "shake": "shake 0.5s cubic-bezier(0.36, 0.07, 0.19, 0.97) both",
        "scale-in": "scale-in 0.2s ease-out",
        "slide-up": "slide-up 0.3s ease-out",
        "slide-down": "slide-down 0.3s ease-out",
        "highlight": "highlight 1.5s ease-in-out",
        "pulse-ring": "pulse-ring 1.5s cubic-bezier(0.24, 0, 0.38, 1) infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
} satisfies Config;
