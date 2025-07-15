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
      },
      // Add fluid font sizes using clamp()
      fontSize: {
        'fluid-xs': 'clamp(0.75rem, 1.5vw, 0.875rem)',
        'fluid-sm': 'clamp(0.875rem, 1.8vw, 1rem)',
        'fluid-base': 'clamp(1rem, 2vw, 1.125rem)',
        'fluid-lg': 'clamp(1.125rem, 2.5vw, 1.25rem)',
        'fluid-xl': 'clamp(1.25rem, 3vw, 1.5rem)',
        'fluid-2xl': 'clamp(1.5rem, 3.5vw, 1.875rem)',
        'fluid-3xl': 'clamp(1.875rem, 4vw, 2.25rem)',
        'fluid-4xl': 'clamp(2.25rem, 5vw, 3rem)',
        'fluid-5xl': 'clamp(3rem, 6vw, 3.75rem)',
        'fluid-6xl': 'clamp(3.75rem, 7vw, 4.5rem)',
      },
      // Add spacing scale for better responsive design
      spacing: {
        'fluid-xs': 'clamp(0.5rem, 1vw, 0.75rem)',
        'fluid-sm': 'clamp(0.75rem, 1.5vw, 1rem)',
        'fluid-md': 'clamp(1rem, 2vw, 1.5rem)',
        'fluid-lg': 'clamp(1.5rem, 3vw, 2rem)',
        'fluid-xl': 'clamp(2rem, 4vw, 3rem)',
      }
    },
    // Better responsive breakpoints
    screens: {
      'xs': '475px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
      'fullhd': '1920px',
      '2k': '2560px',
      '4k': '3840px',
    },
  },
  plugins: [],
};
export default config;
