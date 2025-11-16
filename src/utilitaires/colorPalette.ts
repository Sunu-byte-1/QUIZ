// Configuration des couleurs pour le design system
export const colorPalette = {
  light: {
    // Mode clair
    primary: {
      main: '#1E3A8A', // Bleu foncé - CTA, boutons, titres
      dark: '#0F1729',
      light: '#3B82F6'
    },
    secondary: {
      main: '#065F46', // Vert foncé - calme et concentration
      light: '#22C55E'
    },
    accent: {
      orange: '#F59E0B', // Orange doux
      cyan: '#06B6D4' // Turquoise clair
    },
    background: {
      primary: '#F9FAFB', // Blanc cassé
      secondary: '#E5E7EB' // Gris très clair
    },
    text: {
      primary: '#111827', // Gris foncé
      secondary: '#374151',
      muted: '#6B7280'
    },
    border: '#D1D5DB'
  },
  dark: {
    // Mode sombre
    primary: {
      main: '#3B82F6', // Bleu clair
      dark: '#1E40AF',
      light: '#60A5FA'
    },
    secondary: {
      main: '#22C55E', // Vert clair
      dark: '#16A34A'
    },
    accent: {
      orange: '#F97316', // Orange vif
      cyan: '#06B6D4' // Cyan clair
    },
    background: {
      primary: '#111827', // Gris très foncé
      secondary: '#1F2937' // Gris foncé
    },
    text: {
      primary: '#F3F4F6', // Blanc cassé
      secondary: '#D1D5DB', // Gris clair
      muted: '#9CA3AF'
    },
    border: '#374151'
  }
};

export const getColorsByTheme = (isDark: boolean) => {
  return isDark ? colorPalette.dark : colorPalette.light;
};
