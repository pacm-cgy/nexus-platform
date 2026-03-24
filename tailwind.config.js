/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          950: '#050D1A',
          900: '#0A1628',
          800: '#112240',
          700: '#1A3057',
          600: '#1E3A5F',
          500: '#2A4D7A',
        },
        lime: {
          DEFAULT: '#B8FF47',
          dim: '#8ECC2D',
          pale: '#D4FF8A',
          glow: 'rgba(184,255,71,0.15)',
        },
        ember: '#FF6B35',
        frost: '#7ECFF4',
      },
      fontFamily: {
        display: ['var(--font-bebas)', 'sans-serif'],
        mono: ['var(--font-spacemono)', 'monospace'],
        body: ['var(--font-noto)', 'sans-serif'],
      },
      backgroundImage: {
        'grid-navy': `linear-gradient(rgba(184,255,71,0.04) 1px, transparent 1px),
                      linear-gradient(90deg, rgba(184,255,71,0.04) 1px, transparent 1px)`,
        'hero-glow': 'radial-gradient(ellipse 80% 50% at 50% -20%, rgba(184,255,71,0.15), transparent)',
        'card-shine': 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, transparent 50%)',
      },
      backgroundSize: {
        'grid': '40px 40px',
      },
      animation: {
        'fade-up': 'fadeUp 0.6s ease forwards',
        'fade-in': 'fadeIn 0.4s ease forwards',
        'glow-pulse': 'glowPulse 3s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'scan': 'scan 8s linear infinite',
        'counter': 'counter 2s ease forwards',
      },
      keyframes: {
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(30px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        glowPulse: {
          '0%,100%': { boxShadow: '0 0 20px rgba(184,255,71,0.2)' },
          '50%': { boxShadow: '0 0 40px rgba(184,255,71,0.5)' },
        },
        float: {
          '0%,100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        scan: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
      },
      boxShadow: {
        'lime': '0 0 30px rgba(184,255,71,0.3)',
        'lime-sm': '0 0 15px rgba(184,255,71,0.2)',
        'card': '0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.05)',
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
      },
    },
  },
  plugins: [],
}
