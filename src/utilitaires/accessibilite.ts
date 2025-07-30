// Utilitaires pour l'accessibilité

/**
 * Gère le focus pour l'accessibilité
 */
export const gererFocus = (element: HTMLElement | null) => {
  if (element) {
    element.focus();
  }
};

/**
 * Vérifie si l'utilisateur préfère les animations réduites
 */
export const prefersReducedMotion = (): boolean => {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

/**
 * Vérifie si l'utilisateur préfère un contraste élevé
 */
export const prefersHighContrast = (): boolean => {
  return window.matchMedia('(prefers-contrast: high)').matches;
};

/**
 * Vérifie si l'utilisateur utilise un lecteur d'écran
 */
export const isScreenReader = (): boolean => {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
         window.matchMedia('(prefers-contrast: high)').matches;
};

/**
 * Annonce un message aux lecteurs d'écran
 */
export const annoncerAuxLecteurs = (message: string) => {
  const annonce = document.createElement('div');
  annonce.setAttribute('aria-live', 'polite');
  annonce.setAttribute('aria-atomic', 'true');
  annonce.className = 'sr-only';
  annonce.textContent = message;
  
  document.body.appendChild(annonce);
  
  setTimeout(() => {
    document.body.removeChild(annonce);
  }, 1000);
};

/**
 * Gère la navigation au clavier
 */
export const gererNavigationClavier = (
  event: KeyboardEvent,
  elements: HTMLElement[],
  currentIndex: number,
  onIndexChange: (index: number) => void
) => {
  switch (event.key) {
    case 'ArrowDown':
    case 'ArrowRight':
      event.preventDefault();
      const nextIndex = (currentIndex + 1) % elements.length;
      onIndexChange(nextIndex);
      gererFocus(elements[nextIndex]);
      break;
    case 'ArrowUp':
    case 'ArrowLeft':
      event.preventDefault();
      const prevIndex = currentIndex === 0 ? elements.length - 1 : currentIndex - 1;
      onIndexChange(prevIndex);
      gererFocus(elements[prevIndex]);
      break;
    case 'Home':
      event.preventDefault();
      onIndexChange(0);
      gererFocus(elements[0]);
      break;
    case 'End':
      event.preventDefault();
      onIndexChange(elements.length - 1);
      gererFocus(elements[elements.length - 1]);
      break;
  }
};

/**
 * Crée un ID unique pour l'accessibilité
 */
export const creerIdUnique = (prefix: string): string => {
  return `${prefix}-${Math.random().toString(36).substr(2, 9)}`;
};

/**
 * Vérifie si un élément est visible à l'écran
 */
export const estVisible = (element: HTMLElement): boolean => {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
};

/**
 * Fait défiler un élément en vue
 */
export const faireDefilerEnVue = (element: HTMLElement, behavior: ScrollBehavior = 'smooth') => {
  element.scrollIntoView({
    behavior,
    block: 'nearest',
    inline: 'nearest'
  });
};

/**
 * Gère les raccourcis clavier globaux
 */
export const gererRaccourcisClavier = (event: KeyboardEvent) => {
  // Ctrl/Cmd + K pour ouvrir la recherche
  if ((event.ctrlKey || event.metaKey) && event.key === 'k') {
    event.preventDefault();
    // Implémenter la recherche
  }
  
  // Échap pour fermer les modales
  if (event.key === 'Escape') {
    // Fermer les modales ouvertes
  }
  
  // Entrée pour activer les boutons
  if (event.key === 'Enter' && document.activeElement?.tagName === 'BUTTON') {
    (document.activeElement as HTMLButtonElement).click();
  }
};

/**
 * Améliore l'accessibilité des images
 */
export const imageAccessible = (src: string, alt: string, description?: string) => {
  return {
    src,
    alt: description ? `${alt}. ${description}` : alt,
    'aria-describedby': description ? creerIdUnique('img-desc') : undefined
  };
};

/**
 * Crée un label accessible pour les formulaires
 */
export const labelAccessible = (id: string, texte: string, requis?: boolean) => {
  return {
    htmlFor: id,
    className: requis ? 'required' : '',
    children: requis ? `${texte} *` : texte
  };
};

/**
 * Gère les erreurs de formulaire de manière accessible
 */
export const erreurAccessible = (id: string, message: string) => {
  return {
    id: `${id}-error`,
    role: 'alert',
    'aria-live': 'polite',
    className: 'text-red-600 dark:text-red-400 text-sm mt-1',
    children: message
  };
};

/**
 * Améliore l'accessibilité des boutons
 */
export const boutonAccessible = (
  onClick: () => void,
  children: React.ReactNode,
  options: {
    ariaLabel?: string;
    ariaDescribedBy?: string;
    disabled?: boolean;
    loading?: boolean;
  } = {}
) => {
  return {
    onClick,
    'aria-label': options.ariaLabel,
    'aria-describedby': options.ariaDescribedBy,
    disabled: options.disabled || options.loading,
    'aria-busy': options.loading,
    children: options.loading ? (
      <div className="flex items-center space-x-2">
        <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
        <span>Chargement...</span>
      </div>
    ) : children
  };
}; 