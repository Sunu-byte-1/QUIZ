import React from 'react';
import { Trophy, RotateCcw, Home, Target, Award, Star, Zap } from 'lucide-react';
import BasculeurTheme from './BasculeurTheme';
import { ScoreGenieEnHerbe } from '../types';

interface PropsResultatsEtendus {
  score?: number;
  totalQuestions?: number;
  scoreGenieEnHerbe?: ScoreGenieEnHerbe;
  theme: string;
  mode: string;
  surRejouer: () => void;
  surRetourAccueil: () => void;
  temps?: number;
}

const ResultatsEtendus: React.FC<PropsResultatsEtendus> = ({ 
  score, 
  totalQuestions, 
  scoreGenieEnHerbe,
  theme, 
  mode,
  surRejouer, 
  surRetourAccueil,
  temps
}) => {
  // Calculs pour quiz normal
  const pourcentage = score && totalQuestions ? Math.round((score / totalQuestions) * 100) : 0;
  
  // Calculs pour Génie en Herbe
  const scoreMaxGenieEnHerbe = 10 * 1 + 10 * 2 + 10 * 3 + 10 * 4; // 100 points max
  const pourcentageGenieEnHerbe = scoreGenieEnHerbe ? Math.round((scoreGenieEnHerbe.total / scoreMaxGenieEnHerbe) * 100) : 0;
  
  const obtenirMessageFelicitations = () => {
    const pct = scoreGenieEnHerbe ? pourcentageGenieEnHerbe : pourcentage;
    
    if (mode === 'genieEnHerbe') {
      if (pct >= 90) return "Champion Génie en Herbe ! 🏆";
      if (pct >= 80) return "Excellent niveau ! 🌟";
      if (pct >= 70) return "Très bon parcours ! 👏";
      if (pct >= 60) return "Bon résultat ! 👍";
      if (pct >= 50) return "Peut mieux faire ! 💪";
      return "Continuez à vous entraîner ! 📚";
    } else {
      if (pct >= 90) return "Exceptionnel ! 🏆";
      if (pct >= 80) return "Excellent travail ! 🌟";
      if (pct >= 70) return "Très bien ! 👏";
      if (pct >= 60) return "Bon résultat ! 👍";
      if (pct >= 50) return "Peut mieux faire ! 💪";
      return "Continuez vos efforts ! 📚";
    }
  };

  const obtenirCouleurScore = () => {
    const pct = scoreGenieEnHerbe ? pourcentageGenieEnHerbe : pourcentage;
    if (pct >= 80) return "text-green-600";
    if (pct >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  const obtenirIconePerformance = () => {
    const pct = scoreGenieEnHerbe ? pourcentageGenieEnHerbe : pourcentage;
    if (pct >= 90) return <Trophy className="w-16 h-16 text-yellow-500" />;
    if (pct >= 80) return <Award className="w-16 h-16 text-green-500" />;
    if (pct >= 70) return <Star className="w-16 h-16 text-blue-500" />;
    return <Target className="w-16 h-16 text-gray-500" />;
  };

  const obtenirTitreMode = () => {
    switch (mode) {
      case 'theme': return `Quiz ${theme}`;
      case 'aleatoire': return 'Quiz Aléatoire';
      case 'genieEnHerbe': return 'Génie en Herbe';
      case 'challenge100': return 'Challenge 100 Questions';
      default: return 'Quiz';
    }
  };

  // Sauvegarder le score dans localStorage
  React.useEffect(() => {
    const anciennesScores = JSON.parse(localStorage.getItem('scoresQuiz') || '[]');
    const nouveauScore = {
      score: scoreGenieEnHerbe ? scoreGenieEnHerbe.total : score,
      totalQuestions: scoreGenieEnHerbe ? scoreMaxGenieEnHerbe : totalQuestions,
      theme,
      mode,
      pourcentage: scoreGenieEnHerbe ? pourcentageGenieEnHerbe : pourcentage,
      date: new Date().toLocaleDateString('fr-FR'),
      temps: temps || 0,
      scoreGenieEnHerbe
    };
    
    const nouvellesScores = [nouveauScore, ...anciennesScores].slice(0, 10);
    localStorage.setItem('scoresQuiz', JSON.stringify(nouvellesScores));
  }, [score, totalQuestions, scoreGenieEnHerbe, theme, mode, pourcentage, pourcentageGenieEnHerbe, temps]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-4 flex items-center justify-center transition-all duration-500">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 w-full max-w-4xl transition-colors duration-300">
        <div className="absolute top-4 right-4">
          <BasculeurTheme />
        </div>
        {/* Icône et titre */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            {obtenirIconePerformance()}
          </div>
          <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-2 animate-fade-in">{obtenirTitreMode()} terminé !</h1>
          <p className="text-gray-600 dark:text-gray-300">{obtenirMessageFelicitations()}</p>
        </div>

        {/* Résultats principaux */}
        <div className="bg-gray-50 dark:bg-gray-700 rounded-2xl p-6 mb-8 transition-colors duration-300">
          {mode === 'genieEnHerbe' && scoreGenieEnHerbe ? (
            // Résultats Génie en Herbe
            <div>
              <div className="text-center mb-6">
                <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">Score Génie en Herbe</h2>
                <div className={`text-6xl font-bold ${obtenirCouleurScore()} mb-2`}>
                  {scoreGenieEnHerbe.total}/{scoreMaxGenieEnHerbe}
                </div>
                <div className={`text-2xl font-semibold ${obtenirCouleurScore()}`}>
                  {pourcentageGenieEnHerbe}%
                </div>
              </div>

              {/* Détail par rubrique */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <div className="text-center p-4 bg-white dark:bg-gray-600 rounded-lg border-l-4 border-red-500 transition-colors duration-300">
                  <Zap className="w-8 h-8 text-red-500 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-red-600">{scoreGenieEnHerbe.canonnade}/10</div>
                  <div className="text-gray-600 dark:text-gray-300 text-sm">Canonnade</div>
                </div>
                <div className="text-center p-4 bg-white dark:bg-gray-600 rounded-lg border-l-4 border-yellow-500 transition-colors duration-300">
                  <Zap className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-yellow-600">{scoreGenieEnHerbe.eclair}/20</div>
                  <div className="text-gray-600 dark:text-gray-300 text-sm">Éclair</div>
                </div>
                <div className="text-center p-4 bg-white dark:bg-gray-600 rounded-lg border-l-4 border-blue-500 transition-colors duration-300">
                  <Zap className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-blue-600">{scoreGenieEnHerbe.relais}/30</div>
                  <div className="text-gray-600 dark:text-gray-300 text-sm">Relais</div>
                </div>
                <div className="text-center p-4 bg-white dark:bg-gray-600 rounded-lg border-l-4 border-purple-500 transition-colors duration-300">
                  <Zap className="w-8 h-8 text-purple-500 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-purple-600">{scoreGenieEnHerbe.identification}/40</div>
                  <div className="text-gray-600 dark:text-gray-300 text-sm">Identification</div>
                </div>
              </div>
            </div>
          ) : (
            // Résultats quiz normal
            <div>
              <div className="text-center mb-6">
                <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">Votre score</h2>
                <div className={`text-6xl font-bold ${obtenirCouleurScore()} mb-2`}>
                  {score}/{totalQuestions}
                </div>
                <div className={`text-2xl font-semibold ${obtenirCouleurScore()}`}>
                  {pourcentage}%
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-white dark:bg-gray-600 rounded-lg transition-colors duration-300">
                  <div className="text-2xl font-bold text-blue-600">{score}</div>
                  <div className="text-gray-600 dark:text-gray-300 text-sm">Bonnes réponses</div>
                </div>
                <div className="text-center p-4 bg-white dark:bg-gray-600 rounded-lg transition-colors duration-300">
                  <div className="text-2xl font-bold text-red-600">{totalQuestions! - score!}</div>
                  <div className="text-gray-600 dark:text-gray-300 text-sm">Erreurs</div>
                </div>
                <div className="text-center p-4 bg-white dark:bg-gray-600 rounded-lg transition-colors duration-300">
                  <div className="text-2xl font-bold text-gray-600">{totalQuestions}</div>
                  <div className="text-gray-600 dark:text-gray-300 text-sm">Total</div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Détails du quiz */}
        <div className="bg-blue-50 dark:bg-blue-900/30 rounded-xl p-4 mb-8 transition-colors duration-300">
          <h3 className="font-semibold text-gray-700 dark:text-gray-300 mb-2">Détails du quiz</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600 dark:text-gray-300">
            <div className="flex justify-between">
              <span>Mode :</span>
              <span className="font-medium">{obtenirTitreMode()}</span>
            </div>
            <div className="flex justify-between">
              <span>Thème :</span>
              <span className="font-medium">{theme}</span>
            </div>
            <div className="flex justify-between">
              <span>Date :</span>
              <span className="font-medium">{new Date().toLocaleDateString('fr-FR')}</span>
            </div>
            <div className="flex justify-between">
              <span>Heure :</span>
              <span className="font-medium">{new Date().toLocaleTimeString('fr-FR')}</span>
            </div>
            {temps && (
              <div className="flex justify-between">
                <span>Temps total :</span>
                <span className="font-medium">{Math.floor(temps / 60)}m {temps % 60}s</span>
              </div>
            )}
          </div>
        </div>

        {/* Encouragement et conseils */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 dark:from-blue-600 dark:to-purple-700 text-white rounded-xl p-6 mb-8 transition-all duration-300">
          <h3 className="font-semibold mb-2">Le saviez-vous ?</h3>
          <p className="text-blue-100 text-sm">
            {mode === 'genieEnHerbe' 
              ? pourcentageGenieEnHerbe >= 80 
                ? "Vous avez le niveau d'un vrai champion de Génie en Herbe ! Participez à des compétitions."
                : pourcentageGenieEnHerbe >= 60
                  ? "Bon niveau ! Entraînez-vous sur les rubriques les plus difficiles pour progresser."
                  : "Le Génie en Herbe demande de la rapidité et de la précision. Continuez à vous entraîner !"
              : pourcentage >= 80 
                ? "Vous maîtrisez très bien ce domaine ! Essayez d'autres thèmes ou le mode Génie en Herbe."
                : pourcentage >= 60
                  ? "Bon travail ! Quelques révisions vous permettront d'atteindre l'excellence."
                  : "N'hésitez pas à réviser et à refaire le quiz. La pratique rend parfait !"
            }
          </p>
        </div>

        {/* Boutons d'action */}
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={surRejouer}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2"
          >
            <RotateCcw className="w-5 h-5" />
            <span>Rejouer</span>
          </button>
          <button
            onClick={surRetourAccueil}
            className="flex-1 bg-gray-600 hover:bg-gray-700 dark:bg-gray-700 dark:hover:bg-gray-600 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2"
          >
            <Home className="w-5 h-5" />
            <span>Accueil</span>
          </button>
        </div>

        {/* Performance indicator */}
        <div className="mt-6 text-center">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className={`h-2 rounded-full transition-all duration-1000 animate-pulse ${
                (scoreGenieEnHerbe ? pourcentageGenieEnHerbe : pourcentage) >= 80 ? 'bg-green-500' : 
                (scoreGenieEnHerbe ? pourcentageGenieEnHerbe : pourcentage) >= 60 ? 'bg-yellow-500' : 'bg-red-500'
              }`}
              style={{ width: `${scoreGenieEnHerbe ? pourcentageGenieEnHerbe : pourcentage}%` }}
            ></div>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Performance globale</p>
        </div>
      </div>
    </div>
  );
};

export default ResultatsEtendus;