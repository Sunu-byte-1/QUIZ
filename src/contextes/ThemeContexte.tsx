import React, { createContext, useContext, useState, useEffect } from 'react';

type Theme = 'clair' | 'sombre';

interface ContexteTheme {
  theme: Theme;
  basculerTheme: () => void;
}

const ContexteTheme = createContext<ContexteTheme | undefined>(undefined);

export const FournisseurTheme: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>('sombre');

  useEffect(() => {
    const themeStocke = localStorage.getItem('theme-quiz') as Theme;
    if (themeStocke) {
      setTheme(themeStocke);
    } else {
      // Définir le thème sombre par défaut si aucun thème n'est stocké
      setTheme('sombre');
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('theme-quiz', theme);
    if (theme === 'sombre') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const basculerTheme = () => {
    setTheme(prevTheme => prevTheme === 'clair' ? 'sombre' : 'clair');
  };

  return (
    <ContexteTheme.Provider value={{ theme, basculerTheme }}>
      {children}
    </ContexteTheme.Provider>
  );
};

export const utiliserTheme = () => {
  const contexte = useContext(ContexteTheme);
  if (contexte === undefined) {
    throw new Error('utiliserTheme doit être utilisé dans un FournisseurTheme');
  }
  return contexte;
};