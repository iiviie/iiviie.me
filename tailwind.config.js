/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    screens: {
      'xs': '375px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
    extend: {
      colors: {
        border: "rgb(63 63 70)",
        input: "rgb(31 31 36)",
        ring: "rgb(144 104 247)",
        background: "rgb(24 24 27)",
        foreground: "rgb(144 104 247)",
        primary: {
          DEFAULT: "rgb(144 104 247)",
          foreground: "rgb(24 24 27)",
        },
        secondary: {
          DEFAULT: "rgb(39 39 42)",
          foreground: "rgb(144 104 247)",
        },
        destructive: {
          DEFAULT: "rgb(239 68 68)",
          foreground: "rgb(229 231 235)",
        },
        muted: {
          DEFAULT: "rgb(31 31 36)",
          foreground: "rgb(156 163 175)",
        },
        accent: {
          DEFAULT: "rgb(144 104 247)",
          foreground: "rgb(24 24 27)",
        },
        popover: {
          DEFAULT: "rgb(24 24 27)",
          foreground: "rgb(144 104 247)",
        },
        card: {
          DEFAULT: "rgb(31 31 36)",
          foreground: "rgb(144 104 247)",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [],
} 