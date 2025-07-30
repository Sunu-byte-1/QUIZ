import React, { useState, useEffect, useRef } from 'react';
import { Play, SkipForward, Clock, Star, ArrowLeft } from 'lucide-react';
import BasculeurTheme from './BasculeurTheme';
import { obtenirQuestionsAleatoires } from '../donnees/questionsEtendues';

interface PropsDouzeCoupsDeMidi {
  surRetour: () => void;
}

const DUREE_JEU = 500; // 5 minutes en secondes
const DUREE_PASSAGE = 500; // 2 minutes max pour "passer" (optionnel, voir logique)
const NB_QUESTIONS = 100; // On pioche dans un grand nombre

const DouzeCoupsDeMidi: React.FC<PropsDouzeCoupsDeMidi> = ({ surRetour }) => {
  const [questions, setQuestions] = useState<any[]>([]);
  const [questionActuelle, setQuestionActuelle] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [tempsRestant, setTempsRestant] = useState<number>(DUREE_JEU);
  const [aRepondu, setARepondu] = useState(false);
  const [reponseSelectionnee, setReponseSelectionnee] = useState<number | null>(null);
  const [afficherReponse, setAfficherReponse] = useState(false);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    setQuestions(obtenirQuestionsAleatoires(NB_QUESTIONS));
  }, []);

  useEffect(() => {
    if (tempsRestant <= 0) return;
    timerRef.current = setInterval(() => {
      setTempsRestant((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current!);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timerRef.current!);
  }, []);

  const gererSelectionReponse = (index: number) => {
    if (aRepondu || tempsRestant <= 0) return;
    setReponseSelectionnee(index);
    setARepondu(true);
    setAfficherReponse(true);
    const question = questions[questionActuelle];
    if (index === question.bonneReponse) {
      setScore((s) => s + 10);
    }
    setTimeout(() => {
      passerQuestion();
    }, 1000);
  };

  const passerQuestion = () => {
    setARepondu(false);
    setAfficherReponse(false);
    setReponseSelectionnee(null);
    if (questionActuelle < questions.length - 1) {
      setQuestionActuelle((q) => q + 1);
    } else {
      setQuestionActuelle(0);
    }
  };

  const minutes = Math.floor(tempsRestant / 60);
  const secondes = tempsRestant % 60;

  if (tempsRestant <= 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-yellow-100 via-orange-200 to-pink-200 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 gsap-midi-entrance">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 w-full max-w-xl text-center transition-colors duration-300">
          <h1 className="text-4xl font-bold text-purple-700 dark:text-purple-400 mb-4">Fin du jeu !</h1>
          <div className="text-2xl mb-6 text-gray-800 dark:text-gray-200">Votre score : <span className="font-bold text-green-600 dark:text-green-400">{score}</span></div>
          <button onClick={surRetour} className="bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-bold text-lg mt-4 flex items-center mx-auto transition-colors duration-300">
            <ArrowLeft className="w-5 h-5 mr-2" /> Retour
          </button>
        </div>
      </div>
    );
  }

  const question = questions[questionActuelle];

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-100 via-orange-200 to-pink-200 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-4 gsap-midi-entrance">
      <div className="max-w-3xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <button onClick={surRetour} className="bg-gray-500 hover:bg-gray-600 dark:bg-gray-600 dark:hover:bg-gray-700 text-white p-2 rounded-lg transition-colors duration-300">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex items-center space-x-6">
            <div className="flex items-center text-xl font-bold text-purple-700 dark:text-purple-400">
              <Clock className="w-6 h-6 mr-2" />
              {minutes}:{secondes.toString().padStart(2, '0')}
            </div>
            <div className="flex items-center text-xl font-bold text-green-700 dark:text-green-400">
              <Star className="w-6 h-6 mr-2" />
              {score}
            </div>
            <BasculeurTheme />
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 mb-6 transition-colors duration-300">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6 text-center">{question?.question}</h2>
          <div className="space-y-4">
            {question?.reponses.map((reponse: string, index: number) => (
              <button
                key={index}
                onClick={() => gererSelectionReponse(index)}
                disabled={aRepondu || tempsRestant <= 0}
                className={`w-full p-4 rounded-xl border-2 transition-all text-left flex items-center justify-between ${
                  aRepondu && index === question.bonneReponse ? 'bg-green-500 text-white' :
                  aRepondu && reponseSelectionnee === index ? 'bg-red-500 text-white' :
                  'bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600'
                } ${aRepondu ? 'cursor-not-allowed' : 'cursor-pointer border-gray-200 dark:border-gray-600 hover:border-purple-300 dark:hover:border-purple-500'}`}
              >
                <span className="text-lg text-gray-800 dark:text-gray-200">{reponse}</span>
                {aRepondu && index === question.bonneReponse && <Star className="w-5 h-5" />}
                {aRepondu && reponseSelectionnee === index && index !== question.bonneReponse && <SkipForward className="w-5 h-5" />}
              </button>
            ))}
          </div>
          <div className="flex justify-center mt-6">
            <button
              onClick={passerQuestion}
              disabled={aRepondu || tempsRestant <= 0}
              className="bg-yellow-500 hover:bg-yellow-600 dark:bg-yellow-600 dark:hover:bg-yellow-700 text-white px-6 py-3 rounded-xl font-bold text-lg flex items-center space-x-2 transition-colors duration-300"
            >
              <SkipForward className="w-5 h-5" />
              <span>Passer</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DouzeCoupsDeMidi;
