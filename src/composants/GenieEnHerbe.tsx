import React, { useState, useEffect } from 'react';
import { Zap, Clock, Trophy, Target, ArrowLeft, Play, Star } from 'lucide-react';
import { QuestionGenieEnHerbe, ScoreGenieEnHerbe } from '../types';
import { obtenirQuestionsGenieEnHerbe, rubriquesGenieEnHerbe } from '../donnees/questionsEtendues';

interface PropsGenieEnHerbe {
  surFinJeu: (score: ScoreGenieEnHerbe) => void;
  surRetourAccueil: () => void;
}

const GenieEnHerbe: React.FC<PropsGenieEnHerbe> = ({ surFinJeu, surRetourAccueil }) => {
  const [rubriqueActuelle, setRubriqueActuelle] = useState<number>(0);
  const [questionActuelle, setQuestionActuelle] = useState<number>(0);
  const [questions, setQuestions] = useState<QuestionGenieEnHerbe[]>([]);
  const [reponseSelectionnee, setReponseSelectionnee] = useState<number | null>(null);
  const [aRepondu, setARepondu] = useState(false);
  const [afficherReponse, setAfficherReponse] = useState(false);
  const [tempsRestant, setTempsRestant] = useState<number>(0);
  const [timerActif, setTimerActif] = useState(false);
  const [score, setScore] = useState<ScoreGenieEnHerbe>({
    canonnade: 0,
    eclair: 0,
    relais: 0,
    identification: 0,
    total: 0
  });
  const [phaseJeu, setPhaseJeu] = useState<'presentation' | 'jeu' | 'transition'>('presentation');

  const rubriques = [
    { nom: 'canonnade', titre: 'Canonnade', description: '10 questions rapides - 5 secondes chacune', couleur: 'bg-red-500', questionsParRubrique: 10 },
    { nom: 'eclair', titre: 'Éclair', description: '10 questions moyennes - 10 secondes chacune', couleur: 'bg-yellow-500', questionsParRubrique: 10 },
    { nom: 'relais', titre: 'Relais', description: '10 questions difficiles - 15 secondes chacune', couleur: 'bg-blue-500', questionsParRubrique: 10 },
    { nom: 'identification', titre: 'Identification', description: '10 questions expert - 20 secondes chacune', couleur: 'bg-purple-500', questionsParRubrique: 10 }
  ];

  // Charger les questions pour la rubrique actuelle
  useEffect(() => {
    if (phaseJeu === 'jeu') {
      const rubrique = rubriques[rubriqueActuelle];
      const nouvellesQuestions = obtenirQuestionsGenieEnHerbe(rubrique.nom, rubrique.questionsParRubrique);
      setQuestions(nouvellesQuestions);
      setQuestionActuelle(0);
      setReponseSelectionnee(null);
      setARepondu(false);
      setAfficherReponse(false);
    }
  }, [rubriqueActuelle, phaseJeu]);

  // Gérer le timer
  useEffect(() => {
    if (!timerActif || afficherReponse || phaseJeu !== 'jeu') return;

    const timer = setInterval(() => {
      setTempsRestant((prev) => {
        if (prev <= 1) {
          gererValidation();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timerActif, afficherReponse, phaseJeu]);

  // Initialiser le timer pour chaque question
  useEffect(() => {
    if (phaseJeu === 'jeu' && questions.length > 0) {
      const question = questions[questionActuelle];
      if (question) {
        setTempsRestant(question.tempsLimite);
        setTimerActif(true);
      }
    }
  }, [questionActuelle, questions, phaseJeu]);

  const demarrerRubrique = () => {
    setPhaseJeu('jeu');
  };

  const gererSelectionReponse = (index: number) => {
    if (aRepondu) return;
    setReponseSelectionnee(index);
    
    // Validation automatique dès la sélection
    setARepondu(true);
    setAfficherReponse(true);
    setTimerActif(false);
    
    const question = questions[questionActuelle];
    const rubriqueNom = rubriques[rubriqueActuelle].nom as keyof ScoreGenieEnHerbe;
    
    // Vérifier si la réponse est correcte
    if (index === question.bonneReponse) {
      setScore(prevScore => ({
        ...prevScore,
        [rubriqueNom]: prevScore[rubriqueNom] + question.points,
        total: prevScore.total + question.points
      }));
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
    if (questionActuelle < questions.length - 1) {
      setQuestionActuelle(questionActuelle + 1);
      setReponseSelectionnee(null);
      setARepondu(false);
      setAfficherReponse(false);
    } else {
      // Rubrique terminée
      if (rubriqueActuelle < rubriques.length - 1) {
        setRubriqueActuelle(rubriqueActuelle + 1);
        setPhaseJeu('presentation');
      } else {
        // Jeu terminé
        surFinJeu(score);
      }
    }
  };

  const obtenirCouleurReponse = (index: number) => {
    if (!afficherReponse) {
      return reponseSelectionnee === index ? 'bg-blue-500 text-white' : 'bg-white hover:bg-gray-50';
    }

    const question = questions[questionActuelle];
    if (index === question.bonneReponse) {
      return 'bg-green-500 text-white';
    } else if (reponseSelectionnee === index) {
      return 'bg-red-500 text-white';
    } else {
      return 'bg-gray-100 text-gray-500';
    }
  };

  const obtenirIconeReponse = (index: number) => {
    if (!afficherReponse) return null;

    const question = questions[questionActuelle];
    if (index === question.bonneReponse) {
      return <Star className="w-5 h-5" />;
    } else if (reponseSelectionnee === index) {
      return <Target className="w-5 h-5" />;
    }
    return null;
  };

  // Écran de présentation de rubrique
  if (phaseJeu === 'presentation') {
    const rubrique = rubriques[rubriqueActuelle];
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 p-4 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-2xl text-center">
          <div className="flex justify-between items-center mb-8">
            <button title="Action"
              onClick={surRetourAccueil}
              className="bg-gray-500 hover:bg-gray-600 text-white p-2 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="text-right">
              <div className="text-2xl font-bold text-purple-600">{score.total}</div>
              <div className="text-gray-600 text-sm">Points totaux</div>
            </div>
          </div>

          <div className={`${rubrique.couleur} text-white w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6`}>
            <Zap className="w-12 h-12" />
          </div>

          <h1 className="text-4xl font-bold text-gray-800 mb-4">{rubrique.titre}</h1>
          <p className="text-xl text-gray-600 mb-8">{rubrique.description}</p>

          <div className="bg-gray-50 rounded-xl p-6 mb-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Règles de cette rubrique :</h3>
            <div className="space-y-2 text-gray-600">
              <div>• {rubrique.questionsParRubrique} questions à répondre</div>
              <div>• {questions.length > 0 ? questions[0].tempsLimite : rubrique.nom === 'canonnade' ? 5 : rubrique.nom === 'eclair' ? 10 : rubrique.nom === 'relais' ? 15 : 20} secondes par question</div>
              <div>• {questions.length > 0 ? questions[0].points : rubrique.nom === 'canonnade' ? 1 : rubrique.nom === 'eclair' ? 2 : rubrique.nom === 'relais' ? 3 : 4} point(s) par bonne réponse</div>
              <div>• Réponse automatique si temps écoulé</div>
            </div>
          </div>

          <button
            onClick={demarrerRubrique}
            className={`${rubrique.couleur} hover:opacity-90 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all transform hover:scale-105 flex items-center space-x-3 mx-auto`}
          >
            <Play className="w-6 h-6" />
            <span>Commencer {rubrique.titre}</span>
          </button>

          {/* Progression des rubriques */}
          <div className="mt-8 flex justify-center space-x-2">
            {rubriques.map((r, index) => (
              <div
                key={r.nom}
                className={`w-3 h-3 rounded-full ${
                  index < rubriqueActuelle ? 'bg-green-500' :
                  index === rubriqueActuelle ? r.couleur :
                  'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Écran de jeu
  if (questions.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 p-4 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-xl text-gray-600">Chargement des questions...</p>
        </div>
      </div>
    );
  }

  const question = questions[questionActuelle];
  const rubrique = rubriques[rubriqueActuelle];
  const progressionPourcent = ((questionActuelle + 1) / questions.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 p-4">
      <div className="max-w-4xl mx-auto">
        {/* En-tête */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center space-x-4">
              <div className={`${rubrique.couleur} text-white p-3 rounded-xl`}>
                <Zap className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">{rubrique.titre}</h1>
                <p className="text-gray-600">Question {questionActuelle + 1} sur {questions.length}</p>
              </div>
            </div>
            <div className="flex items-center space-x-6">
              <div className="text-center">
                <div className={`text-3xl font-bold ${tempsRestant <= 5 ? 'text-red-500' : 'text-gray-700'}`}>
                  {tempsRestant}
                </div>
                <div className="text-gray-500 text-sm">secondes</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">{score.total}</div>
                <div className="text-gray-500 text-sm">points</div>
              </div>
              <button
                onClick={surRetourAccueil}
                className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors"
              >
                Quitter
              </button>
            </div>
          </div>
          
          {/* Barre de progression */}
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div 
              className={`${rubrique.couleur} h-3 rounded-full transition-all duration-300`}
              style={{ width: `${progressionPourcent}%` }}
            />
          </div>
          <div className="custom-inline-style">
            <div className="text-xs text-gray-500">Canonnade</div>
          </div>
          <div className="p-2">
              <div className="text-lg font-bold text-yellow-600">{score.eclair}</div>
              <div className="text-xs text-gray-500">Éclair</div>
            </div>
            <div className="p-2">
              <div className="text-lg font-bold text-blue-600">{score.relais}</div>
              <div className="text-xs text-gray-500">Relais</div>
            </div>
            <div className="p-2">
              <div className="text-lg font-bold text-purple-600">{score.identification}</div>
              <div className="text-xs text-gray-500">Identification</div>
            </div>
          </div>
        </div>

        {/* Question et réponses */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold text-gray-800 flex-1 text-center">
              {question.question}
            </h2>
            <div className={`w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-xl ${
              tempsRestant <= 5 ? 'bg-red-500 animate-pulse' : rubrique.couleur
            }`}>
              {tempsRestant}
            </div>
          </div>
          
          <div className="space-y-4">
            {question.reponses.map((reponse, index) => (
              <button
                key={index}
                onClick={() => gererSelectionReponse(index)}
                disabled={aRepondu}
                className={`w-full p-4 rounded-xl border-2 transition-all text-left flex items-center justify-between ${obtenirCouleurReponse(index)} ${
                  aRepondu ? 'cursor-not-allowed' : 'cursor-pointer border-gray-200 hover:border-purple-300'
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
                  <p className="text-green-700 font-semibold">
                    Excellente réponse ! +{question.points} point(s)
                  </p>
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

export default GenieEnHerbe;