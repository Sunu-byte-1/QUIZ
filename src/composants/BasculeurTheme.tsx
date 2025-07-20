import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { utiliserTheme } from '../contextes/ThemeContexte';

const BasculeurTheme: React.FC = () => {
  const { theme, basculerTheme } = utiliserTheme();

  return (
    <button
      onClick={basculerTheme}
      className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-all duration-300 transform hover:scale-105"
      aria-label="Basculer le thème"
    >
      {theme === 'clair' ? (
        <Moon className="w-5 h-5 text-gray-700 dark:text-gray-300" />
      ) : (
        <Sun className="w-5 h-5 text-yellow-500" />
      )}
    </button>
  );
};

export default BasculeurTheme;