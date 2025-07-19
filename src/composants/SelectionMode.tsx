import React from 'react';
import { Play, Shuffle, Trophy, Target, BookOpen, Zap } from 'lucide-react';
import { ModeJeu } from '../types';

interface PropsSelectionMode {
  surSelectionMode: (mode: ModeJeu) => void;
  utilisateur: string;
  surDeconnexion: () => void;
}

const SelectionMode: React.FC<PropsSelectionMode> = ({ 
  surSelectionMode, 
  utilisateur,
  surDeconnexion 
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
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-6xl mx-auto">
        {/* En-tête */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">Bienvenue, {utilisateur} !</h1>
              <p className="text-gray-600">Choisissez votre mode de jeu préféré</p>
            </div>
            <button
              onClick={surDeconnexion}
              className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors"
            >
              Déconnexion
            </button>
          </div>
        </div>

        {/* Grille des modes de jeu */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {modes.map((mode) => (
            <button
              key={mode.id}
              onClick={() => surSelectionMode(mode.id)}
              className={`bg-gradient-to-r ${mode.couleur} hover:${mode.couleurHover} text-white p-8 rounded-2xl shadow-lg transition-all transform hover:scale-105 group`}
            >
              <div className="text-center">
                <div className="flex justify-center mb-6 group-hover:scale-110 transition-transform">
                  {mode.icone}
                </div>
                <h3 className="text-2xl font-bold mb-4">{mode.titre}</h3>
                <p className="text-white/90 text-lg leading-relaxed">{mode.description}</p>
                <div className="flex items-center justify-center mt-6 text-white/80 group-hover:text-white">
                  <Play className="w-6 h-6 mr-2" />
                  <span className="font-medium">Commencer</span>
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Statistiques globales */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-6">Statistiques de l'application</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center p-4 bg-blue-50 rounded-xl">
              <div className="text-3xl font-bold text-blue-600 mb-2">12</div>
              <div className="text-gray-600">Thèmes disponibles</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-xl">
              <div className="text-3xl font-bold text-green-600 mb-2">1200+</div>
              <div className="text-gray-600">Questions au total</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-xl">
              <div className="text-3xl font-bold text-purple-600 mb-2">4</div>
              <div className="text-gray-600">Modes de jeu</div>
            </div>
            <div className="text-center p-4 bg-red-50 rounded-xl">
              <div className="text-3xl font-bold text-red-600 mb-2">∞</div>
              <div className="text-gray-600">Possibilités</div>
            </div>
          </div>
        </div>

        {/* Conseils et astuces */}
        <div className="mt-8 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-2xl p-6">
          <h3 className="text-xl font-bold mb-4">Conseils pour bien jouer</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
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