/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Palette mode clair
        primary: '#1E3A8A',        // Bleu foncé
        primaryLight: '#3B82F6',   // Bleu clair
        secondary: '#065F46',      // Vert foncé
        secondaryLight: '#22C55E', // Vert clair
        accentOrange: '#F59E0B',   // Orange
        accentCyan: '#06B6D4',     // Cyan
        bgLight: '#F9FAFB',        // Blanc cassé
        bgLightSecond: '#E5E7EB',  // Gris très clair
        textDark: '#111827',       // Texte foncé
        textGray: '#374151',       // Texte gris
        textMuted: '#6B7280',      // Texte sourd
        borderLight: '#D1D5DB',    // Bordure claire
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};
