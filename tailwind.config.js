/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      /*
       * Theme tokens resolve through CSS variables (see index.css), so the whole
       * site flips between dark (default) and light (`html.light`) without every
       * component needing its own variant. `white` is deliberately remapped to
       * the foreground ink: that makes the existing text-white/x, bg-white/x and
       * border-white/x utilities theme-aware for free. Where a literal white is
       * genuinely needed (icons on coloured gradients) use text-[#fff].
       */
      colors: {
        bg: {
          primary: 'rgb(var(--bg-primary) / <alpha-value>)',
          secondary: 'rgb(var(--bg-secondary) / <alpha-value>)',
          card: 'rgb(var(--bg-card) / <alpha-value>)',
        },
        accent: {
          teal: 'rgb(var(--accent-teal) / <alpha-value>)',
          orange: '#ff5722',
          gold: '#f5a623',
        },
        white: 'rgb(var(--fg) / <alpha-value>)',
      },
      fontFamily: {
        sans: ['Inter', 'Inter Fallback', 'system-ui', 'sans-serif'],
        heading: ['Space Grotesk', 'Space Grotesk Fallback', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      backgroundImage: {
        'grid-pattern': `linear-gradient(rgb(var(--grid-line) / var(--grid-alpha)) 1px, transparent 1px),linear-gradient(90deg, rgb(var(--grid-line) / var(--grid-alpha)) 1px, transparent 1px)`,
      },
      backgroundSize: {
        grid: '60px 60px',
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        'float-delayed': 'float 8s ease-in-out 2s infinite',
        marquee: 'marquee 30s linear infinite',
        'gradient-x': 'gradientX 8s ease infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-20px) rotate(3deg)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        gradientX: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
      },
    },
  },
  plugins: [],
}

