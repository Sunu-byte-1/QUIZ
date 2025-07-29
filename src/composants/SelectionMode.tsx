import React from 'react';
import { Play, Shuffle, Trophy, Target, BookOpen, Zap, Clock, User } from 'lucide-react';
import BasculeurTheme from './BasculeurTheme';
import { ModeJeu, UtilisateurConnecte } from '../types';

interface PropsSelectionMode {
  surSelectionMode: (mode: ModeJeu) => void;
  utilisateur: UtilisateurConnecte;
  surDeconnexion: () => void;
  surProfil: () => void;
}

const SelectionMode: React.FC<PropsSelectionMode> = ({ 
  surSelectionMode, 
  utilisateur,
  surDeconnexion,
  surProfil
}) => {
  
  const modes = [
    {
      id: 'theme' as ModeJeu,
      titre: 'Quiz par Thème',
      description: 'Choisissez un thème spécifique et le nombre de questions (15, 20 ou 30)',
      icone: <BookOpen className="w-12 h-12" />,
      couleur: 'from-blue-500 to-blue-600',
      couleurHover: 'from-blue-600 to-blue-700'
    },
    {
      id: 'aleatoire' as ModeJeu,
      titre: 'Quiz Aléatoire',
      description: 'Questions mélangées de tous les thèmes (15, 20 ou 30 questions)',
      icone: <Shuffle className="w-12 h-12" />,
      couleur: 'from-green-500 to-green-600',
      couleurHover: 'from-green-600 to-green-700'
    },
    {
      id: 'genieEnHerbe' as ModeJeu,
      titre: 'Génie en Herbe',
      description: 'Mode compétition avec canonnade, éclair, relais et identification',
      icone: <Zap className="w-12 h-12" />,
      couleur: 'from-purple-500 to-purple-600',
      couleurHover: 'from-purple-600 to-purple-700'
    },
    {
      id: 'challenge100' as ModeJeu,
      titre: 'Challenge 100 Questions',
      description: 'Défi ultime : 100 questions aléatoires de tous les thèmes',
      icone: <Target className="w-12 h-12" />,
      couleur: 'from-red-500 to-red-600',
      couleurHover: 'from-red-600 to-red-700'
    },
    {
      id: 'douzeCoupsDeMidi' as ModeJeu,
      titre: 'Les 12 Coups de Midi',
      description: 'Répondez à un maximum de questions en un temps limité, comme à la TV !',
      icone: <Clock className="w-12 h-12" />,
      couleur: 'from-yellow-400 to-pink-400',
      couleurHover: 'from-yellow-500 to-pink-500'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-100 via-pink-200 to-blue-200 p-2 sm:p-4 flex flex-col items-center justify-center transition-all duration-500 overflow-x-hidden">
      <div className="w-full max-w-2xl mx-auto px-2 sm:px-4 gsap-menu-entrance">
        {/* En-tête */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-4 sm:p-6 mb-4 sm:mb-8 transition-colors duration-300">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
            <div>
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800 dark:text-gray-100 mb-2 animate-fade-in">
                Bienvenue, {utilisateur.prenom || utilisateur.identifiant} !
              </h1>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300">Choisissez votre mode de jeu préféré</p>
            </div>
            <div className="flex items-center space-x-4">
              <BasculeurTheme />
              <button
                onClick={surProfil}
                className="bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white px-3 sm:px-4 py-2 rounded-lg transition-all duration-300 transform hover:scale-105 text-sm sm:text-base flex items-center space-x-2"
              >
                <User className="w-4 h-4" />
                <span>Profil</span>
              </button>
              <button
                onClick={surDeconnexion}
                className="bg-gray-500 hover:bg-gray-600 dark:bg-gray-600 dark:hover:bg-gray-700 text-white px-3 sm:px-4 py-2 rounded-lg transition-all duration-300 transform hover:scale-105 text-sm sm:text-base"
              >
                Déconnexion
              </button>
            </div>
          </div>
        </div>

        {/* Grille des modes de jeu */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 lg:gap-6 mb-4 sm:mb-8">
          {modes.map((mode) => (
            <button
              key={mode.id}
              onClick={() => surSelectionMode(mode.id)}
              className={`bg-gradient-to-r ${mode.couleur} hover:${mode.couleurHover} text-white p-3 sm:p-4 lg:p-6 rounded-2xl shadow-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl group animate-slide-up focus:outline-none focus:ring-4 focus:ring-pink-200`}
            >
              <div className="text-center">
                <div className="flex justify-center mb-2 sm:mb-3 lg:mb-4 group-hover:scale-110 transition-transform">
                  {mode.icone}
                </div>
                <h3 className="text-base sm:text-lg lg:text-xl font-bold mb-1 sm:mb-2 lg:mb-3">{mode.titre}</h3>
                <p className="text-white/90 text-xs sm:text-sm lg:text-base leading-relaxed">{mode.description}</p>
                <div className="flex items-center justify-center mt-2 sm:mt-3 lg:mt-4 text-white/80 group-hover:text-white">
                  <Play className="w-6 h-6 mr-2" />
                  <span className="font-medium text-xs sm:text-sm lg:text-base">Commencer</span>
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Statistiques globales */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-4 sm:p-6 transition-colors duration-300">
          <h2 className="text-lg sm:text-xl font-bold text-gray-800 dark:text-gray-100 mb-4 sm:mb-6">Statistiques de l'application</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
            <div className="text-center p-3 sm:p-4 bg-blue-50 dark:bg-blue-900/30 rounded-xl transition-colors duration-300">
              <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-blue-600 mb-1 sm:mb-2">12</div>
              <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">Thèmes disponibles</div>
            </div>
            <div className="text-center p-3 sm:p-4 bg-green-50 dark:bg-green-900/30 rounded-xl transition-colors duration-300">
              <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-green-600 mb-1 sm:mb-2">1200+</div>
              <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">Questions au total</div>
            </div>
            <div className="text-center p-3 sm:p-4 bg-purple-50 dark:bg-purple-900/30 rounded-xl transition-colors duration-300">
              <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-purple-600 mb-1 sm:mb-2">4</div>
              <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">Modes de jeu</div>
            </div>
            <div className="text-center p-3 sm:p-4 bg-red-50 dark:bg-red-900/30 rounded-xl transition-colors duration-300">
              <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-red-600 mb-1 sm:mb-2">∞</div>
              <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">Possibilités</div>
            </div>
          </div>
        </div>

        {/* Conseils et astuces */}
        <div className="mt-4 sm:mt-8 bg-gradient-to-r from-indigo-500 to-purple-600 dark:from-indigo-600 dark:to-purple-700 text-white rounded-2xl p-4 sm:p-6 transition-all duration-300">
          <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">Conseils pour bien jouer</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 text-xs sm:text-sm">
            <div className="flex items-start space-x-2">
              <Trophy className="w-5 h-5 mt-0.5 text-yellow-300" />
              <span>Commencez par un thème que vous maîtrisez pour prendre confiance</span>
            </div>
            <div className="flex items-start space-x-2">
              <Zap className="w-5 h-5 mt-0.5 text-yellow-300" />
              <span>Le mode Génie en Herbe teste votre rapidité et vos réflexes</span>
            </div>
            <div className="flex items-start space-x-2">
              <Target className="w-5 h-5 mt-0.5 text-yellow-300" />
              <span>Le Challenge 100 Questions est réservé aux experts</span>
            </div>
            <div className="flex items-start space-x-2">
              <Shuffle className="w-5 h-5 mt-0.5 text-yellow-300" />
              <span>Le mode aléatoire vous fait découvrir tous les domaines</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectionMode;