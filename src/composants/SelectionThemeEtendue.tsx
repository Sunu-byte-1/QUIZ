import React, { useState } from 'react';
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

  // Démarrer immédiatement quand un thème est sélectionné
  const gererSelectionTheme = (theme: string) => {
    const config: ConfigurationQuiz = {
      mode: modeSelectionne,
      theme: theme,
      nombreQuestions
    };
    surConfigurationQuiz(config);
  };

  // Pour le mode aléatoire, démarrer immédiatement
  const gererDemarrageAleatoire = () => {
    const config: ConfigurationQuiz = {
      mode: modeSelectionne,
      theme: undefined,
      nombreQuestions
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

  // Couleurs pour chaque thème
  const couleursPourTheme: Record<string, string> = {
    'Mathématiques': 'bg-blue-500',
    'Physique': 'bg-purple-500',
    'Chimie': 'bg-green-500',
    'Histoire': 'bg-yellow-500',
    'Biologie': 'bg-emerald-500',
    'Médecine': 'bg-red-500',
    'Informatique': 'bg-indigo-500',
    'Data Science': 'bg-cyan-500',
    'Développement logiciel': 'bg-violet-500',
    'Mobile': 'bg-pink-500',
    'Astronomie': 'bg-amber-500',
    'Géographie': 'bg-teal-500'
  };

  const optionsNombreQuestions = [15, 20, 30];

  const gererDemarrage = () => {
    const config: ConfigurationQuiz = {
      mode: modeSelectionne,
      theme: modeSelectionne === 'theme' ? themeSelectionne : undefined,
      nombreQuestions
    };
    surConfigurationQuiz(config);
  };

  const peutDemarrer = modeSelectionne === 'aleatoire' || (modeSelectionne === 'theme' && themeSelectionne);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-4 transition-all duration-500">
      <div className="max-w-6xl mx-auto">
        {/* En-tête */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 mb-8 transition-colors duration-300">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={surRetour}
                className="bg-gray-500 hover:bg-gray-600 dark:bg-gray-600 dark:hover:bg-gray-700 text-white p-2 rounded-lg transition-all duration-300 transform hover:scale-105"
                title="Retour"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div>
                <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-2 animate-fade-in">
                  {modeSelectionne === 'theme' ? 'Sélection du Thème' : 'Quiz Aléatoire'}
                </h1>
                <p className="text-gray-600 dark:text-gray-300">
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
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 mb-8 transition-colors duration-300">
          <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4">Nombre de questions</h2>
          <div className="flex space-x-4">
            {optionsNombreQuestions.map((nombre) => (
              <button
                key={nombre}
                onClick={() => setNombreQuestions(nombre)}
                className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 ${
                  nombreQuestions === nombre
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                {nombre} questions
              </button>
            ))}
          </div>
        </div>

        {/* Sélection du thème (seulement pour le mode thème) */}
        {modeSelectionne === 'theme' && (
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 mb-8 transition-colors duration-300">
            <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-6">Choisissez un thème</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
              {themesDisponibles.map((theme) => (
                <button
                  key={theme}
                  onClick={() => gererSelectionTheme(theme)}
                  className="p-3 sm:p-4 lg:p-6 rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl group bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 border-2 border-transparent hover:border-blue-300 dark:hover:border-blue-500 animate-slide-up"
                >
                  <div className={`${couleursPourTheme[theme] || 'bg-gray-500'} text-white w-10 h-10 sm:w-12 sm:h-12 lg:w-16 lg:h-16 rounded-xl flex items-center justify-center mx-auto mb-2 sm:mb-3 lg:mb-4 group-hover:scale-110 transition-transform`}>
                    {React.cloneElement(iconesPourTheme[theme] || <BookOpen />, { className: "w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8" })}
                  </div>
                  <h3 className="text-sm sm:text-base lg:text-lg font-semibold text-gray-800 dark:text-gray-100 mb-1 sm:mb-2">{theme}</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-xs sm:text-sm hidden sm:block">100 questions</p>
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
          <div className="text-center mb-8">
            <button
              onClick={gererDemarrageAleatoire}
              className="px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 transform bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:scale-105 hover:shadow-2xl"
            >
              <div className="flex items-center space-x-3">
                <Play className="w-6 h-6" />
                <span>Commencer le Quiz Aléatoire</span>
              </div>
            </button>
          </div>
        )}

        {/* Configuration actuelle */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 transition-colors duration-300">
          <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4">Configuration actuelle</h2>
          <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4 transition-colors duration-300">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-blue-600">{modeSelectionne === 'theme' ? 'Thématique' : 'Aléatoire'}</div>
                <div className="text-gray-600 dark:text-gray-300 text-sm">Mode de jeu</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-purple-600">{nombreQuestions}</div>
                <div className="text-gray-600 dark:text-gray-300 text-sm">Questions</div>
              </div>
            </div>
          </div>
        </div>

        {/* Informations supplémentaires */}
        <div className="mt-8 bg-gradient-to-r from-blue-500 to-purple-600 dark:from-blue-600 dark:to-purple-700 text-white rounded-2xl p-6 transition-all duration-300">
          <h3 className="text-lg font-bold mb-3">Informations sur le quiz</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>• Chaque question a 4 réponses possibles</div>
            <div>• Temps limité : 30 secondes par question</div>
            <div>• Feedback immédiat après chaque réponse</div>
            <div>• Score final avec statistiques détaillées</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectionThemeEtendue;