import React, { useState, useEffect } from 'react';
import { CheckCircle, XCircle, Home, Clock } from 'lucide-react';
import BasculeurTheme from './BasculeurTheme';
import { Question } from '../types';

// Fonction pour mélanger les réponses
const melangerReponses = (question: Question) => {
  const reponses = [...question.reponses];
  const bonneReponseTexte = reponses[question.bonneReponse];
  
  // Mélanger le tableau des réponses
  for (let i = reponses.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [reponses[i], reponses[j]] = [reponses[j], reponses[i]];
  }
  
  // Trouver le nouvel index de la bonne réponse
  const nouvelIndexBonneReponse = reponses.findIndex(reponse => reponse === bonneReponseTexte);
  
  return {
    ...question,
    reponses,
    bonneReponse: nouvelIndexBonneReponse
  };
};
interface PropsQuiz {
  questions: Question[];
  theme: string;
  surFinQuiz: (score: number, totalQuestions: number) => void;
  surRetourAccueil: () => void;
}

const Quiz: React.FC<PropsQuiz> = ({ questions, theme, surFinQuiz, surRetourAccueil }) => {
  const [questionActuelle, setQuestionActuelle] = useState(0);
  const [reponseSelectionnee, setReponseSelectionnee] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [aRepondu, setARepondu] = useState(false);
  const [afficherReponse, setAfficherReponse] = useState(false);
  const [tempsRestant, setTempsRestant] = useState(30); // 30 secondes par question
  const [timerActif, setTimerActif] = useState(true);
  const [questionsMelangees, setQuestionsMelangees] = useState<Question[]>([]);
  const [bonnesReponses, setBonnesReponses] = useState(0);

  // Mélanger les réponses de toutes les questions au début
  useEffect(() => {
    const questionsAvecReponsesMelangees = questions.map(melangerReponses);
    setQuestionsMelangees(questionsAvecReponsesMelangees);
  }, [questions]);

  // Timer pour chaque question
  useEffect(() => {
    if (!timerActif || afficherReponse || aRepondu) return;

    const timer = setInterval(() => {
      setTempsRestant((prev) => {
        if (prev <= 1) {
          // Temps écoulé, marquer comme mauvaise réponse et passer à la suivante
          setARepondu(true);
          setAfficherReponse(true);
          setTimerActif(false);
          setReponseSelectionnee(null); // Aucune réponse sélectionnée
          
          // Passer à la question suivante après 2 secondes
          setTimeout(() => {
            questionSuivante();
          }, 2000);
          
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [questionActuelle, timerActif, afficherReponse, aRepondu]);

  // Réinitialiser le timer à chaque nouvelle question
  useEffect(() => {
    setTempsRestant(30);
    setTimerActif(true);
  }, [questionActuelle]);

  const gererSelectionReponse = (index: number) => {
    if (aRepondu) return;
    setReponseSelectionnee(index);
    
    // Validation automatique dès la sélection
    setARepondu(true);
    setAfficherReponse(true);
    setTimerActif(false);
    
    // Vérifier si la réponse est correcte
    if (index === questionsMelangees[questionActuelle].bonneReponse) {
      const points = questionsMelangees[questionActuelle].points ?? 1;
      setScore(score + points);
      setBonnesReponses(bonnesReponses + 1);
    }

    // Passer à la question suivante après 2 secondes
    setTimeout(() => {
      questionSuivante();
    }, 2000);
  };

  const gererValidation = () => {
    // Cette fonction est maintenant appelée automatiquement
    // lors de la sélection d'une réponse
  };

  const questionSuivante = () => {
    if (questionActuelle < questionsMelangees.length - 1) {
      setQuestionActuelle(questionActuelle + 1);
      setReponseSelectionnee(null);
      setARepondu(false);
      setAfficherReponse(false);
    } else {
      // Quiz terminé
      const scoreTotal = bonnesReponses;
      surFinQuiz(scoreTotal, questionsMelangees.length);
    }
  };

  const obtenirCouleurReponse = (index: number) => {
    if (!afficherReponse) {
      return reponseSelectionnee === index ? 'bg-blue-500 text-white' : 'bg-white hover:bg-gray-50';
    }

    if (index === questionsMelangees[questionActuelle].bonneReponse) {
      return 'bg-green-500 text-white';
    } else if (reponseSelectionnee === index && reponseSelectionnee !== null) {
      return 'bg-red-500 text-white';
    } else {
      return 'bg-gray-100 text-gray-500';
    }
  };

  const obtenirIconeReponse = (index: number) => {
    if (!afficherReponse) return null;

    if (index === questionsMelangees[questionActuelle].bonneReponse) {
      return <CheckCircle className="w-5 h-5" />;
    } else if (reponseSelectionnee === index && reponseSelectionnee !== null) {
      return <XCircle className="w-5 h-5" />;
    }
    return null;
  };

  // Attendre que les questions soient mélangées
  if (questionsMelangees.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-2 sm:p-4 flex items-center justify-center transition-all duration-500">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300">Préparation du quiz...</p>
        </div>
      </div>
    );
  }

  const question = questionsMelangees[questionActuelle];
  const progressionPourcent = ((questionActuelle + 1) / questionsMelangees.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-2 sm:p-4 transition-all duration-500 flex flex-col">
      <div className="max-w-4xl mx-auto w-full flex-1 flex flex-col">
        {/* En-tête */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-3 sm:p-4 lg:p-6 mb-3 sm:mb-4 lg:mb-6 transition-colors duration-300">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-3 sm:mb-4 space-y-2 sm:space-y-0">
            <div>
              <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-800 dark:text-gray-100 animate-fade-in">{theme}</h1>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300">Question {questionActuelle + 1} sur {questionsMelangees.length}</p>
            </div>
            <div className="flex items-center space-x-2 sm:space-x-4">
              <BasculeurTheme />
              <div className="flex items-center space-x-1 sm:space-x-2 text-gray-600 dark:text-gray-300">
                <Clock className="w-5 h-5" />
                <span className={`font-bold text-sm sm:text-base ${tempsRestant <= 10 ? 'text-red-500' : 'text-gray-700 dark:text-gray-300'}`}>
                  {tempsRestant}s
                </span>
              </div>
              <button
                onClick={surRetourAccueil}
                className="bg-gray-500 hover:bg-gray-600 dark:bg-gray-600 dark:hover:bg-gray-700 text-white px-2 sm:px-3 lg:px-4 py-1 sm:py-2 rounded-lg transition-all duration-300 transform hover:scale-105 flex items-center space-x-1 sm:space-x-2 text-sm sm:text-base"
              >
                <Home className="w-4 h-4" />
                <span className="hidden sm:inline">Accueil</span>
              </button>
            </div>
          </div>
          
          {/* Barre de progression */}
          <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2 sm:h-3">
            <div 
              className="bg-blue-600 h-2 sm:h-3 rounded-full transition-all duration-500"
              style={{ width: `${progressionPourcent}%` }}
            />
          </div>
          <div className="mt-1 sm:mt-2 text-center">
            <span className="text-lg sm:text-xl text-gray-700 dark:text-gray-300">{bonnesReponses}</span>
            <span className="text-sm sm:text-base text-gray-500 dark:text-gray-400 ml-2">bonnes réponses</span>
          </div>
        </div>

        {/* Question et réponses */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-4 sm:p-6 lg:p-8 transition-colors duration-300 flex-1 flex flex-col">
          <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-4 sm:mb-6 lg:mb-8 text-center leading-relaxed">
            {question.question}
          </h2>
          
          <div className="space-y-3 sm:space-y-4 flex-1">
            {question.reponses.map((reponse, index) => (
              <button
                key={index}
                onClick={() => gererSelectionReponse(index)}
                disabled={aRepondu}
               className={`w-full p-3 sm:p-4 rounded-xl border-2 transition-all duration-300 text-left flex items-center justify-between ${
                 !afficherReponse ? (
                   reponseSelectionnee === index 
                     ? 'bg-blue-500 text-white border-blue-500' 
                     : 'bg-gray-800 dark:bg-gray-700 text-white border-gray-600 dark:border-gray-500 hover:border-blue-400 dark:hover:border-blue-400'
                 ) : (
                   index === question.bonneReponse
                     ? 'bg-green-500 text-white border-green-500'
                     : reponseSelectionnee === index && reponseSelectionnee !== null
                       ? 'bg-red-500 text-white border-red-500'
                       : 'bg-gray-600 text-gray-300 border-gray-500'
                 )
               } ${
                 aRepondu ? 'cursor-not-allowed' : 'cursor-pointer transform hover:scale-[1.02]'
                }`}
              >
                <span className="text-sm sm:text-base lg:text-lg">{reponse}</span>
                {obtenirIconeReponse(index)}
              </button>
            ))}
          </div>

          {/* Bouton de validation */}

          {/* Message de feedback */}
          {afficherReponse && (
            <div className="mt-4 sm:mt-6 text-center">
              {reponseSelectionnee === question.bonneReponse && reponseSelectionnee !== null ? (
                <div className="bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800 rounded-lg p-3 sm:p-4">
                  <p className="text-green-700 dark:text-green-300 font-semibold text-sm sm:text-base">Excellente réponse !</p>
                </div>
              ) : reponseSelectionnee === null ? (
                <div className="bg-orange-50 dark:bg-orange-900/30 border border-orange-200 dark:border-orange-800 rounded-lg p-3 sm:p-4">
                  <p className="text-orange-700 dark:text-orange-300 font-semibold text-sm sm:text-base">
                    Temps écoulé ! La bonne réponse était : {question.reponses[question.bonneReponse]}
                  </p>
                </div>
              ) : (
                <div className="bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-lg p-3 sm:p-4">
                  <p className="text-red-700 dark:text-red-300 font-semibold text-sm sm:text-base">
                    Réponse incorrecte. La bonne réponse était : {question.reponses[question.bonneReponse]}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Quiz;