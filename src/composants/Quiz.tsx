import React, { useState, useEffect } from 'react';
import { CheckCircle, XCircle, Home, Clock } from 'lucide-react';
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

  // Mélanger les réponses de toutes les questions au début
  useEffect(() => {
    const questionsAvecReponsesMelangees = questions.map(melangerReponses);
    setQuestionsMelangees(questionsAvecReponsesMelangees);
  }, [questions]);

  // Timer pour chaque question
  useEffect(() => {
    if (!timerActif || afficherReponse) return;

    const timer = setInterval(() => {
      setTempsRestant((prev) => {
        if (prev <= 1) {
          // Temps écoulé, passer automatiquement à la question suivante
          gererValidation();
          return 30;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [questionActuelle, timerActif, afficherReponse]);

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
      surFinQuiz(score + (reponseSelectionnee === questionsMelangees[questionActuelle].bonneReponse ? 1 : 0), questionsMelangees.length);
    }
  };

  const obtenirCouleurReponse = (index: number) => {
    if (!afficherReponse) {
      return reponseSelectionnee === index ? 'bg-blue-500 text-white' : 'bg-white hover:bg-gray-50';
    }

    if (index === questionsMelangees[questionActuelle].bonneReponse) {
      return 'bg-green-500 text-white';
    } else if (reponseSelectionnee === index) {
      return 'bg-red-500 text-white';
    } else {
      return 'bg-gray-100 text-gray-500';
    }
  };

  const obtenirIconeReponse = (index: number) => {
    if (!afficherReponse) return null;

    if (index === questionsMelangees[questionActuelle].bonneReponse) {
      return <CheckCircle className="w-5 h-5" />;
    } else if (reponseSelectionnee === index) {
      return <XCircle className="w-5 h-5" />;
    }
    return null;
  };

  // Attendre que les questions soient mélangées
  if (questionsMelangees.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-xl text-gray-600">Préparation du quiz...</p>
        </div>
      </div>
    );
  }

  const question = questionsMelangees[questionActuelle];
  const progressionPourcent = ((questionActuelle + 1) / questionsMelangees.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-4xl mx-auto">
        {/* En-tête */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">{theme}</h1>
              <p className="text-gray-600">Question {questionActuelle + 1} sur {questionsMelangees.length}</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-gray-600">
                <Clock className="w-5 h-5" />
                <span className={`font-bold ${tempsRestant <= 10 ? 'text-red-500' : 'text-gray-700'}`}>
                  {tempsRestant}s
                </span>
              </div>
              <button
                onClick={surRetourAccueil}
                className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors flex items-center space-x-2"
              >
                <Home className="w-4 h-4" />
                <span>Accueil</span>
              </button>
            </div>
          </div>
          
          {/* Barre de progression */}
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div 
              className="bg-blue-600 h-3 rounded-full transition-all duration-300"
              style={{ width: `${progressionPourcent}%` }}
            />
          </div>
          <div className="mt-2 text-center">
            <span className="text-xl text-gray-700">{questionActuelle + (aRepondu ? 1 : 0)}</span>
            <span className="text-gray-500 ml-2">bonnes réponses</span>
          </div>
        </div>

        {/* Question et réponses */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-8 text-center leading-relaxed">
            {question.question}
          </h2>
          
          <div className="space-y-4">
            {question.reponses.map((reponse, index) => (
              <button
                key={index}
                onClick={() => gererSelectionReponse(index)}
                disabled={aRepondu}
                className={`w-full p-4 rounded-xl border-2 transition-all text-left flex items-center justify-between ${obtenirCouleurReponse(index)} ${
                  aRepondu ? 'cursor-not-allowed' : 'cursor-pointer border-gray-200 hover:border-blue-300'
                }`}
              >
                <span className="text-lg">{reponse}</span>
                {obtenirIconeReponse(index)}
              </button>
            ))}
          </div>

          {/* Bouton de validation */}

          {/* Message de feedback */}
          {afficherReponse && (
            <div className="mt-6 text-center">
              {reponseSelectionnee === question.bonneReponse ? (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <p className="text-green-700 font-semibold">Excellente réponse !</p>
                </div>
              ) : (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <p className="text-red-700 font-semibold">
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