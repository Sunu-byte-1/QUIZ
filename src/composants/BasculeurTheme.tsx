import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { utiliserTheme } from '../contextes/ThemeContexte';

const BasculeurTheme: React.FC = () => {
  const { theme, basculerTheme } = utiliserTheme();

  return (
    <button
      onClick={basculerTheme}
      className="relative inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-white/20 dark:border-gray-700/50 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 focus-visible-ring"
      aria-label={`Basculer vers le thème ${theme === 'clair' ? 'sombre' : 'clair'}`}
      title={`Basculer vers le thème ${theme === 'clair' ? 'sombre' : 'clair'}`}
    >
      <div className="relative w-5 h-5 sm:w-6 sm:h-6">
        <Sun 
          className={`absolute inset-0 w-5 h-5 sm:w-6 sm:h-6 transition-all duration-300 ${
            theme === 'clair' 
              ? 'text-yellow-500 opacity-100 rotate-0' 
              : 'text-gray-400 opacity-0 -rotate-90'
          }`}
        />
        <Moon 
          className={`absolute inset-0 w-5 h-5 sm:w-6 sm:h-6 transition-all duration-300 ${
            theme === 'sombre' 
              ? 'text-blue-400 opacity-100 rotate-0' 
              : 'text-gray-400 opacity-0 rotate-90'
          }`}
        />
      </div>
    </button>
  );
};

export default BasculeurTheme;