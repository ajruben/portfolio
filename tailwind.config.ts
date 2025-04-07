import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      // Add custom keyframes and animation
      keyframes: {
        'pulse-scale': {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '.7', transform: 'scale(1.05)' },
        },
        'jump-attention': {
          '0%, 10%, 100%': { transform: 'translateY(0)' },
          '5%': { transform: 'translateY(-8px)' }, // Quick jump up
        },
        'flicker-shade': {
          '0%, 45%, 55%, 100%': { opacity: '1' },
          '50%': { opacity: '0.6' }, // Flicker effect
        },
        'shimmer': {
          '0%': { backgroundPosition: '-100% 0' },
          '100%': { backgroundPosition: '100% 0' },
        }
      },
      animation: {
        'pulse-scale': 'pulse-scale 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'jump-attention': 'jump-attention 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'flicker-shade': 'flicker-shade 4s ease-in-out infinite', // Keep flicker in case needed later
        'shimmer': 'shimmer 4s linear infinite', // Shimmer animation
      },
      // Add animation delay utility
      animationDelay: {
        '2000': '2s',
      },
      // Add background size utility
      backgroundSize: {
        '200': '200% 100%',
      }
    },
  },
  plugins: [],
};
export default config;
