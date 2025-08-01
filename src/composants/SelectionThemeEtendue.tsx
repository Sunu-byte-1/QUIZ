import React, { useState, useEffect } from 'react';
import { Play, ArrowLeft, Calculator, Atom, Globe, Heart, Computer, Database, Code, Smartphone, Star, MapPin, BookOpen } from 'lucide-react';
import BasculeurTheme from './BasculeurTheme';
import { themesDisponibles } from '../donnees/questionsEtendues';
import { ConfigurationQuiz } from '../types';

interface PropsSelectionThemeEtendue {
  surConfigurationQuiz: (config: ConfigurationQuiz) => void;
  surRetour: () => void;
  modeSelectionne: 'theme' | 'aleatoire';
}

const SelectionThemeEtendue: React.FC<PropsSelectionThemeEtendue> = ({ 
  surConfigurationQuiz, 
  surRetour,
  modeSelectionne
}) => {
  const [themeSelectionne, setThemeSelectionne] = useState<string>('');
  const [nombreQuestions, setNombreQuestions] = useState<number>(20);
  const [niveau, setNiveau] = useState<'facile' | 'moyen' | 'difficile' | 'mixte'>('mixte');
  const [afficherPopupMaintenance, setAfficherPopupMaintenance] = useState<boolean>(false);

  // Afficher le popup de maintenance automatiquement en mode aléatoire
  useEffect(() => {
    if (modeSelectionne === 'aleatoire') {
      setAfficherPopupMaintenance(true);
    }
  }, [modeSelectionne]);

  // Démarrer immédiatement quand un thème est sélectionné
  const gererSelectionTheme = (theme: string) => {
    const config: ConfigurationQuiz = {
      mode: modeSelectionne,
      theme: theme,
      nombreQuestions,
      niveau
    };
    surConfigurationQuiz(config);
  };

  // Pour le mode aléatoire, démarrer le jeu
  const gererDemarrageAleatoire = () => {
    const config: ConfigurationQuiz = {
      mode: modeSelectionne,
      theme: undefined,
      nombreQuestions,
      niveau
    };
    surConfigurationQuiz(config);
  };

  // Mapping des icônes pour chaque thème
  const iconesPourTheme: Record<string, React.ReactNode> = {
    'Mathématiques': <Calculator className="w-8 h-8" />,
    'Physique': <Atom className="w-8 h-8" />,
    'Chimie': <Atom className="w-8 h-8" />,
    'Histoire': <BookOpen className="w-8 h-8" />,
    'Biologie': <Heart className="w-8 h-8" />,
    'Médecine': <Heart className="w-8 h-8" />,
    'Informatique': <Computer className="w-8 h-8" />,
    'Data Science': <Database className="w-8 h-8" />,
    'Développement logiciel': <Code className="w-8 h-8" />,
    'Mobile': <Smartphone className="w-8 h-8" />,
    'Astronomie': <Star className="w-8 h-8" />,
    'Géographie': <MapPin className="w-8 h-8" />
  };

  // Couleurs pour chaque thème - améliorées pour le mode sombre
  const couleursPourTheme: Record<string, string> = {
    'Mathématiques': 'bg-sky-500 dark:bg-sky-600',
    'Physique': 'bg-indigo-500 dark:bg-indigo-600',
    'Chimie': 'bg-green-500 dark:bg-green-600',
    'Histoire': 'bg-yellow-500 dark:bg-yellow-600',
    'Biologie': 'bg-emerald-500 dark:bg-emerald-600',
    'Médecine': 'bg-rose-500 dark:bg-rose-600',
    'Informatique': 'bg-cyan-500 dark:bg-cyan-600',
    'Data Science': 'bg-teal-500 dark:bg-teal-600',
    'Développement logiciel': 'bg-violet-500 dark:bg-violet-600',
    'Mobile': 'bg-pink-500 dark:bg-pink-600',
    'Astronomie': 'bg-blue-500 dark:bg-blue-600',
    'Géographie': 'bg-lime-500 dark:bg-lime-600'
  };

  const optionsNombreQuestions = [15, 20, 30];

  const gererDemarrage = () => {
    const config: ConfigurationQuiz = {
      mode: modeSelectionne,
      theme: modeSelectionne === 'theme' ? themeSelectionne : undefined,
      nombreQuestions,
      niveau
    };
    surConfigurationQuiz(config);
  };

  const peutDemarrer = modeSelectionne === 'aleatoire' || (modeSelectionne === 'theme' && themeSelectionne);

  // Fonctions pour gérer la maintenance
  const fermerPopupMaintenance = () => {
    setAfficherPopupMaintenance(false);
  };

  const estBoutonDesactive = (valeur: number | string) => {
    if (modeSelectionne === 'aleatoire') {
      // En mode aléatoire, seuls "mixte" et "20 questions" sont actifs
      if (typeof valeur === 'number') {
        return valeur !== 20; // Seules 20 questions sont actives
      } else {
        return valeur !== 'mixte'; // Seul le niveau "mixte" est actif
      }
    }
    return false; // En mode thème, tous les boutons sont actifs
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-green-50 to-yellow-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-2 sm:p-4 md:p-6 flex flex-col items-center justify-center transition-all duration-500 overflow-x-hidden gsap-theme-entrance">
      <div className="w-full max-w-4xl mx-auto px-2 sm:px-4 md:px-6">
        {/* En-tête */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg dark:shadow-gray-900/50 p-4 sm:p-6 mb-6 sm:mb-8 transition-colors duration-300">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center space-x-3 sm:space-x-4">
              <button
                onClick={surRetour}
                className="bg-gray-500 hover:bg-gray-600 dark:bg-gray-600 dark:hover:bg-gray-700 text-white p-2 sm:p-3 rounded-lg transition-all duration-300 transform hover:scale-105 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                title="Retour"
                aria-label="Retour à la page précédente"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div className="flex-1">
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 dark:text-gray-100 mb-2 animate-fade-in">
                  {modeSelectionne === 'theme' ? 'Sélection du Thème' : 'Quiz Aléatoire'}
                </h1>
                <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base">
                  {modeSelectionne === 'theme' 
                    ? 'Choisissez un thème et le nombre de questions'
                    : 'Configurez votre quiz avec des questions aléatoires'
                  }
                </p>
              </div>
            </div>
            <BasculeurTheme />
          </div>
        </div>

        {/* Sélection du nombre de questions */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg dark:shadow-gray-900/50 p-4 sm:p-6 mb-6 sm:mb-8 transition-colors duration-300">
          <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">Nombre de questions</h2>
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 justify-center">
            {optionsNombreQuestions.map((nombre) => {
              const estDesactive = estBoutonDesactive(nombre);
              return (
                <button
                  key={nombre}
                  onClick={() => !estDesactive && setNombreQuestions(nombre)}
                  disabled={estDesactive}
                  className={`flex-1 sm:flex-none px-4 sm:px-6 py-3 sm:py-4 rounded-lg font-semibold text-sm sm:text-base transition-all duration-300 transform hover:scale-105 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 ${
                    nombreQuestions === nombre
                      ? 'bg-blue-600 dark:bg-blue-500 text-white shadow-lg'
                      : estDesactive
                      ? 'bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed opacity-50'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                  aria-label={`${nombre} questions`}
                >
                  {nombre} questions
                </button>
              );
            })}
          </div>
        </div>

        {/* Sélection du niveau de difficulté */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg dark:shadow-gray-900/50 p-4 sm:p-6 mb-6 sm:mb-8 transition-colors duration-300">
          <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">Niveau de difficulté</h2>
          <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-2 sm:gap-4 justify-center">
            {['facile', 'moyen', 'difficile', 'mixte'].map((niv) => {
              const estDesactive = estBoutonDesactive(niv);
              return (
                <button
                  key={niv}
                  onClick={() => !estDesactive && setNiveau(niv as any)}
                  disabled={estDesactive}
                  className={`px-4 sm:px-6 py-3 sm:py-4 rounded-lg font-semibold text-sm sm:text-base transition-all duration-300 transform hover:scale-105 focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2 ${
                    niveau === niv
                      ? 'bg-green-600 dark:bg-green-500 text-white shadow-lg'
                      : estDesactive
                      ? 'bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed opacity-50'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                  aria-label={`Niveau ${niv}`}
                >
                  {niv.charAt(0).toUpperCase() + niv.slice(1)}
                </button>
              );
            })}
          </div>
        </div>

        {/* Sélection du thème (seulement pour le mode thème) */}
        {modeSelectionne === 'theme' && (
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg dark:shadow-gray-900/50 p-4 sm:p-6 mb-6 sm:mb-8 transition-colors duration-300">
            <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4 sm:mb-6">Choisissez un thème</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
              {themesDisponibles.map((theme) => (
                <button
                  key={theme}
                  onClick={() => gererSelectionTheme(theme)}
                  className="p-4 sm:p-6 rounded-xl shadow-lg dark:shadow-gray-900/50 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl group bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 border-2 border-transparent hover:border-blue-300 dark:hover:border-blue-500 animate-slide-up focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                  aria-label={`Commencer le quiz ${theme}`}
                >
                  <div className={`${couleursPourTheme[theme] || 'bg-gray-500 dark:bg-gray-600'} text-white w-12 h-12 sm:w-16 sm:h-16 rounded-xl flex items-center justify-center mx-auto mb-3 sm:mb-4 group-hover:scale-110 transition-transform shadow-lg`}>
                    {React.cloneElement(iconesPourTheme[theme] as React.ReactElement || <BookOpen />, { className: "w-6 h-6 sm:w-8 sm:h-8" })}
                  </div>
                  <h3 className="text-sm sm:text-base lg:text-lg font-semibold text-gray-800 dark:text-gray-100 mb-1 sm:mb-2 text-center">{theme}</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-xs sm:text-sm text-center hidden sm:block">100 questions</p>
                  <div className="flex items-center justify-center mt-2 sm:mt-3 lg:mt-4 text-blue-600 dark:text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Play className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2" />
                    <span className="font-medium text-xs sm:text-sm">Commencer</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Bouton de démarrage pour mode aléatoire */}
        {modeSelectionne === 'aleatoire' && (
          <div className="text-center mb-6 sm:mb-8">
            <button
              onClick={gererDemarrageAleatoire}
              className="w-full sm:w-auto px-6 sm:px-8 py-4 sm:py-5 rounded-xl font-bold text-base sm:text-lg transition-all duration-300 transform bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 dark:from-blue-500 dark:to-purple-500 dark:hover:from-blue-600 dark:hover:to-purple-600 text-white shadow-lg hover:scale-105 hover:shadow-2xl focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
              aria-label="Commencer le quiz aléatoire"
            >
              <div className="flex items-center justify-center space-x-3">
                <Play className="w-5 h-5 sm:w-6 sm:h-6" />
                <span>Commencer le Quiz Aléatoire</span>
              </div>
            </button>
          </div>
        )}

        {/* Configuration actuelle */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg dark:shadow-gray-900/50 p-4 sm:p-6 mb-6 sm:mb-8 transition-colors duration-300">
          <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">Configuration actuelle</h2>
          <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4 transition-colors duration-300">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-center">
              <div className="p-3 sm:p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
                <div className="text-xl sm:text-2xl font-bold text-blue-600 dark:text-blue-400">{modeSelectionne === 'theme' ? 'Thématique' : 'Aléatoire'}</div>
                <div className="text-gray-600 dark:text-gray-300 text-sm">Mode de jeu</div>
              </div>
              <div className="p-3 sm:p-4 rounded-lg bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800">
                <div className="text-xl sm:text-2xl font-bold text-purple-600 dark:text-purple-400">{nombreQuestions}</div>
                <div className="text-gray-600 dark:text-gray-300 text-sm">Questions</div>
              </div>
            </div>
          </div>
        </div>

        {/* Informations supplémentaires */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 dark:from-blue-600 dark:to-purple-700 text-white rounded-2xl p-4 sm:p-6 transition-all duration-300 shadow-lg">
          <h3 className="text-base sm:text-lg font-bold mb-3 sm:mb-4">Informations sur le quiz</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 text-sm">
            <div className="flex items-center">
              <div className="w-2 h-2 bg-white rounded-full mr-2 opacity-80 flex-shrink-0"></div>
              <span>Chaque question a 4 réponses possibles</span>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-white rounded-full mr-2 opacity-80 flex-shrink-0"></div>
              <span>Temps limité : 30 secondes par question</span>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-white rounded-full mr-2 opacity-80 flex-shrink-0"></div>
              <span>Feedback immédiat après chaque réponse</span>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-white rounded-full mr-2 opacity-80 flex-shrink-0"></div>
              <span>Score final avec statistiques détaillées</span>
            </div>
          </div>
        </div>

        {/* Popup de maintenance */}
        {afficherPopupMaintenance && (
          <div className="fixed inset-0 bg-black bg-opacity-50 dark:bg-opacity-70 flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-6 sm:p-8 max-w-md w-full transition-all duration-300">
              <div className="text-center">
                <div className="w-16 h-16 bg-yellow-100 dark:bg-yellow-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-yellow-600 dark:text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">
                  Information - Services en Maintenance
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6 text-sm sm:text-base">
                  Certaines options du quiz aléatoire sont temporairement indisponibles :<br/>
                  • 15 et 30 questions<br/>
                  • Niveaux Facile, Moyen, Difficile<br/><br/>
                  Seules les options "Mixte" et "20 questions" sont actuellement fonctionnelles. 
                  Le jeu peut continuer normalement avec ces options.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={fermerPopupMaintenance}
                    className="flex-1 bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition-colors duration-300 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    aria-label="Fermer la popup de maintenance"
                  >
                    Compris
                  </button>
                  <button
                    onClick={() => {
                      fermerPopupMaintenance();
                      surRetour();
                    }}
                    className="flex-1 bg-gray-500 hover:bg-gray-600 dark:bg-gray-600 dark:hover:bg-gray-700 text-white px-6 py-3 rounded-xl font-semibold transition-colors duration-300 focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2"
                    aria-label="Retour à la page précédente"
                  >
                    Retour
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SelectionThemeEtendue;