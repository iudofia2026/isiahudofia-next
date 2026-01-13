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
        // Brand colors
        brand: {
          blue: '#4B9CD3',
          'blue-hover': '#3B8CC3',
          'blue-light': '#E8F4FA',
        },
        // Accent colors
        accent: {
          green: '#84D1AC',
          'green-light': '#E8F8F0',
        },
        // Neutral colors
        neutral: {
          50: '#FAFAFA',
          100: '#F5F5F5',
          200: '#E5E5E5',
          300: '#D4D4D4',
          400: '#A3A3A3',
          500: '#737373',
          600: '#525252',
          700: '#404040',
          800: '#262626',
          900: '#171717',
          950: '#0A0A0A',
        },
        // Semantic colors
        success: '#84D1AC',
        warning: '#F7EC88',
        error: '#FFC1C1',
        info: '#D6E8FF',
      },
      fontFamily: {
        display: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        body: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        mono: ['DM Mono', 'Courier New', 'monospace'],
      },
      fontSize: {
        'display-2xl': ['3.5rem', { lineHeight: '1.2', letterSpacing: '-0.02em' }],
        'display-xl': ['3rem', { lineHeight: '1.2', letterSpacing: '-0.02em' }],
        'display-lg': ['2.5rem', { lineHeight: '1.2', letterSpacing: '-0.02em' }],
        'heading-xl': ['2rem', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
        'heading-lg': ['1.5rem', { lineHeight: '1.3', letterSpacing: '-0.01em' }],
        'heading-md': ['1.25rem', { lineHeight: '1.4', letterSpacing: '0' }],
        'heading-sm': ['1.125rem', { lineHeight: '1.4', letterSpacing: '0' }],
        'body-xl': ['1.125rem', { lineHeight: '1.5', letterSpacing: '0' }],
        'body-lg': ['1rem', { lineHeight: '1.5', letterSpacing: '0' }],
        'body-md': ['0.9375rem', { lineHeight: '1.5', letterSpacing: '0' }],
        'body-sm': ['0.875rem', { lineHeight: '1.5', letterSpacing: '0' }],
        'body-xs': ['0.75rem', { lineHeight: '1.4', letterSpacing: '0' }],
      },
      spacing: {
        '18': '4.5rem',  // 72px
        '22': '5.5rem',  // 88px
        '26': '6.5rem',  // 104px
        '30': '7.5rem',  // 120px
        '34': '8.5rem',  // 136px
        '38': '9.5rem',  // 152px
      },
      maxWidth: {
        'container-sm': '640px',
        'container-md': '768px',
        'container-lg': '1024px',
        'container-xl': '1280px',
      },
      borderRadius: {
        '4xl': '2rem',
      },
      boxShadow: {
        'brand': '0 4px 12px rgba(75, 156, 211, 0.15)',
      },
      transitionTimingFunction: {
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
        'bounce': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
      },
      transitionDuration: {
        '400': '400ms',
        '600': '600ms',
        '800': '800ms',
      },
    },
  },
  plugins: [],
};
export default config;
