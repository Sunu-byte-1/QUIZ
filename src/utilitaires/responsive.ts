import React from 'react';

// Utilitaires pour la responsivité

/**
 * Breakpoints de l'application
 */
export const BREAKPOINTS = {
  xs: 0,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
} as const;

/**
 * Vérifie si l'écran est mobile
 */
export const estMobile = (): boolean => {
  return window.innerWidth < BREAKPOINTS.md;
};

/**
 * Vérifie si l'écran est tablette
 */
export const estTablette = (): boolean => {
  return window.innerWidth >= BREAKPOINTS.md && window.innerWidth < BREAKPOINTS.lg;
};

/**
 * Vérifie si l'écran est desktop
 */
export const estDesktop = (): boolean => {
  return window.innerWidth >= BREAKPOINTS.lg;
};

/**
 * Obtient la taille d'écran actuelle
 */
export const obtenirTailleEcran = (): keyof typeof BREAKPOINTS => {
  const width = window.innerWidth;
  
  if (width >= BREAKPOINTS['2xl']) return '2xl';
  if (width >= BREAKPOINTS.xl) return 'xl';
  if (width >= BREAKPOINTS.lg) return 'lg';
  if (width >= BREAKPOINTS.md) return 'md';
  if (width >= BREAKPOINTS.sm) return 'sm';
  return 'xs';
};

/**
 * Écoute les changements de taille d'écran
 */
export const ecouterResize = (callback: (size: keyof typeof BREAKPOINTS) => void) => {
  let currentSize = obtenirTailleEcran();
  
  const handleResize = () => {
    const newSize = obtenirTailleEcran();
    if (newSize !== currentSize) {
      currentSize = newSize;
      callback(newSize);
    }
  };
  
  window.addEventListener('resize', handleResize);
  
  return () => {
    window.removeEventListener('resize', handleResize);
  };
};

/**
 * Classes CSS responsives communes
 */
export const CLASSES_RESPONSIVES = {
  // Conteneurs
  container: 'w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8',
  containerSmall: 'w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8',
  containerLarge: 'w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12',
  
  // Grilles
  grid: {
    mobile: 'grid grid-cols-1 gap-4',
    tablet: 'grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6',
    desktop: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8',
    auto: 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6',
  },
  
  // Flexbox
  flex: {
    center: 'flex items-center justify-center',
    between: 'flex items-center justify-between',
    start: 'flex items-center justify-start',
    end: 'flex items-center justify-end',
    col: 'flex flex-col',
    row: 'flex flex-row',
    wrap: 'flex flex-wrap',
  },
  
  // Espacement
  spacing: {
    section: 'py-8 sm:py-12 lg:py-16',
    sectionSmall: 'py-4 sm:py-6 lg:py-8',
    sectionLarge: 'py-12 sm:py-16 lg:py-20',
    container: 'px-4 sm:px-6 lg:px-8',
    containerSmall: 'px-2 sm:px-4 lg:px-6',
    containerLarge: 'px-6 sm:px-8 lg:px-12',
  },
  
  // Typographie
  text: {
    h1: 'text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold',
    h2: 'text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold',
    h3: 'text-lg sm:text-xl lg:text-2xl xl:text-3xl font-semibold',
    h4: 'text-base sm:text-lg lg:text-xl xl:text-2xl font-semibold',
    body: 'text-sm sm:text-base lg:text-lg',
    small: 'text-xs sm:text-sm',
    large: 'text-base sm:text-lg lg:text-xl',
  },
  
  // Boutons
  button: {
    primary: 'px-4 py-2 sm:px-6 sm:py-3 text-sm sm:text-base font-semibold rounded-lg transition-all duration-200',
    secondary: 'px-3 py-2 sm:px-4 sm:py-2 text-sm font-medium rounded-md transition-all duration-200',
    small: 'px-2 py-1 sm:px-3 sm:py-2 text-xs sm:text-sm font-medium rounded transition-all duration-200',
    large: 'px-6 py-3 sm:px-8 sm:py-4 text-base sm:text-lg font-semibold rounded-lg transition-all duration-200',
  },
  
  // Cartes
  card: {
    base: 'bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700',
    elevated: 'bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700',
    interactive: 'bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow duration-200',
  },
  
  // Formulaires
  form: {
    input: 'w-full px-3 py-2 sm:px-4 sm:py-3 text-sm sm:text-base border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200',
    label: 'block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 sm:mb-2',
    error: 'text-red-600 dark:text-red-400 text-xs sm:text-sm mt-1',
  },
} as const;

/**
 * Hook personnalisé pour la responsivité
 */
export const utiliserResponsive = () => {
  const [tailleEcran, setTailleEcran] = React.useState<keyof typeof BREAKPOINTS>(obtenirTailleEcran);
  
  React.useEffect(() => {
    return ecouterResize(setTailleEcran);
  }, []);
  
  return {
    tailleEcran,
    estMobile: tailleEcran === 'xs' || tailleEcran === 'sm',
    estTablette: tailleEcran === 'md',
    estDesktop: tailleEcran === 'lg' || tailleEcran === 'xl' || tailleEcran === '2xl',
    estPetitEcran: tailleEcran === 'xs' || tailleEcran === 'sm' || tailleEcran === 'md',
    estGrandEcran: tailleEcran === 'lg' || tailleEcran === 'xl' || tailleEcran === '2xl',
  };
};

/**
 * Utilitaires pour les images responsives
 */
export const imageResponsive = {
  // Classes pour les images responsives
  classes: {
    cover: 'w-full h-full object-cover',
    contain: 'w-full h-full object-contain',
    fill: 'w-full h-full object-fill',
    none: 'w-full h-full object-none',
  },
  
  // Tailles d'images communes
  sizes: {
    thumbnail: 'w-16 h-16 sm:w-20 sm:h-20',
    avatar: 'w-8 h-8 sm:w-10 sm:h-10',
    icon: 'w-6 h-6 sm:w-8 sm:h-8',
    large: 'w-32 h-32 sm:w-40 sm:h-40',
    xlarge: 'w-48 h-48 sm:w-64 sm:h-64',
  },
  
  // Ratios d'aspect
  aspect: {
    square: 'aspect-square',
    video: 'aspect-video',
    photo: 'aspect-[4/3]',
    wide: 'aspect-[16/9]',
    portrait: 'aspect-[3/4]',
  },
};

/**
 * Utilitaires pour les icônes responsives
 */
export const iconeResponsive = {
  // Tailles d'icônes
  sizes: {
    xs: 'w-3 h-3',
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
    xl: 'w-8 h-8',
    '2xl': 'w-10 h-10',
  },
  
  // Classes responsives pour les icônes
  classes: {
    small: 'w-4 h-4 sm:w-5 sm:h-5',
    medium: 'w-5 h-5 sm:w-6 sm:h-6',
    large: 'w-6 h-6 sm:w-8 sm:h-8',
  },
};

/**
 * Utilitaires pour les animations responsives
 */
export const animationResponsive = {
  // Animations conditionnelles basées sur la taille d'écran
  conditionnelles: {
    mobile: (animation: string) => estMobile() ? animation : '',
    desktop: (animation: string) => estDesktop() ? animation : '',
    tablet: (animation: string) => estTablette() ? animation : '',
  },
  
  // Durées d'animation adaptatives
  durees: {
    rapide: 'duration-150 sm:duration-200',
    normale: 'duration-300 sm:duration-400',
    lente: 'duration-500 sm:duration-600',
  },
};

/**
 * Utilitaires pour les transitions responsives
 */
export const transitionResponsive = {
  // Transitions adaptatives
  base: 'transition-all duration-200 ease-in-out',
  rapide: 'transition-all duration-150 ease-out',
  lente: 'transition-all duration-500 ease-in-out',
  
  // Transitions conditionnelles
  conditionnelles: {
    mobile: 'transition-transform duration-200 ease-out',
    desktop: 'transition-all duration-300 ease-in-out',
  },
}; 