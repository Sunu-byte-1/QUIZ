import React, { useState } from 'react';
import { Play, ArrowLeft, Calculator, Atom, Globe, Heart, Computer, Database, Code, Smartphone, Star, MapPin, BookOpen } from 'lucide-react';
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-6xl mx-auto">
        {/* En-tête */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button title="Choisir ce thème"
                onClick={surRetour}
                className="bg-gray-500 hover:bg-gray-600 text-white p-2 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div>
                <h1 className="text-3xl font-bold text-gray-800 mb-2">
                  {modeSelectionne === 'theme' ? 'Sélection du Thème' : 'Quiz Aléatoire'}
                </h1>
                <p className="text-gray-600">
                  {modeSelectionne === 'theme' 
                    ? 'Choisissez un thème et le nombre de questions'
                    : 'Configurez votre quiz avec des questions aléatoires'
                  }
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Sélection du nombre de questions */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Nombre de questions</h2>
          <div className="flex space-x-4">
            {optionsNombreQuestions.map((nombre) => (
              <button
                key={nombre}
                onClick={() => setNombreQuestions(nombre)}
                className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                  nombreQuestions === nombre
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {nombre} questions
              </button>
            ))}
          </div>
        </div>

        {/* Sélection du thème (seulement pour le mode thème) */}
        {modeSelectionne === 'theme' && (
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
            <h2 className="text-xl font-bold text-gray-800 mb-6">Choisissez un thème</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {themesDisponibles.map((theme) => (
                <button
                  key={theme}
                  onClick={() => setThemeSelectionne(theme)}
                  className={`p-6 rounded-xl shadow-lg transition-all transform hover:scale-105 group ${
                    themeSelectionne === theme
                      ? 'bg-blue-50 border-2 border-blue-500'
                      : 'bg-white hover:bg-gray-50 border-2 border-transparent'
                  }`}
                >
                  <div className={`${couleursPourTheme[theme] || 'bg-gray-500'} text-white w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                    {iconesPourTheme[theme] || <BookOpen className="w-8 h-8" />}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">{theme}</h3>
                  <p className="text-gray-600 text-sm">100 questions disponibles</p>
                  {themeSelectionne === theme && (
                    <div className="flex items-center justify-center mt-4 text-blue-600">
                      <Play className="w-5 h-5 mr-2" />
                      <span className="font-medium">Sélectionné</span>
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Résumé de la configuration */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Résumé de votre configuration</h2>
          <div className="bg-gray-50 rounded-xl p-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-blue-600">{modeSelectionne === 'theme' ? 'Thématique' : 'Aléatoire'}</div>
                <div className="text-gray-600 text-sm">Mode de jeu</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-600">
                  {modeSelectionne === 'theme' ? (themeSelectionne || '?') : 'Tous thèmes'}
                </div>
                <div className="text-gray-600 text-sm">Thème</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-purple-600">{nombreQuestions}</div>
                <div className="text-gray-600 text-sm">Questions</div>
              </div>
            </div>
          </div>
        </div>

        {/* Bouton de démarrage */}
        <div className="text-center">
          <button
            onClick={gererDemarrage}
            disabled={!peutDemarrer}
            className={`px-8 py-4 rounded-xl font-bold text-lg transition-all transform ${
              peutDemarrer
                ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:scale-105'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            <div className="flex items-center space-x-3">
              <Play className="w-6 h-6" />
              <span>Commencer le Quiz</span>
            </div>
          </button>
        </div>

        {/* Informations supplémentaires */}
        <div className="mt-8 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-2xl p-6">
          <h3 className="text-lg font-bold mb-3">Informations sur le quiz</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>• Chaque question a 4 réponses possibles</div>
            <div>• Temps limité : 2 minutes (120 secondes) par question</div>
            <div>• Feedback immédiat après chaque réponse</div>
            <div>• Score final avec statistiques détaillées</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectionThemeEtendue;