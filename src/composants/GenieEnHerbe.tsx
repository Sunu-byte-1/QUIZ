import React, { useState, useEffect } from 'react';
import { Zap, Clock, Trophy, Target, ArrowLeft, Play, Star, BookOpen, Calculator, Atom, Globe, Computer, Shuffle } from 'lucide-react';
import { QuestionGenieEnHerbe, ScoreGenieEnHerbe } from '../types';
import { obtenirQuestionsGenieEnHerbe, rubriquesGenieEnHerbe, themesDisponibles } from '../donnees/questionsEtendues';

// Fonction pour mélanger les réponses
const melangerReponses = (question: QuestionGenieEnHerbe) => {
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
interface PropsGenieEnHerbe {
  surFinJeu: (score: ScoreGenieEnHerbe) => void;
  surRetourAccueil: () => void;
}

const GenieEnHerbe: React.FC<PropsGenieEnHerbe> = ({ surFinJeu, surRetourAccueil }) => {
  const [rubriqueActuelle, setRubriqueActuelle] = useState<number>(0);
  const [questionActuelle, setQuestionActuelle] = useState<number>(0);
  const [questions, setQuestions] = useState<QuestionGenieEnHerbe[]>([]);
  const [questionsMelangees, setQuestionsMelangees] = useState<QuestionGenieEnHerbe[]>([]);
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
  const [phaseJeu, setPhaseJeu] = useState<'presentation' | 'jeu' | 'selectionThemeRelais'>('presentation');
  const [themeRelaisSelectionne, setThemeRelaisSelectionne] = useState<string>('');
  const [indiceActuel, setIndiceActuel] = useState<number>(0);
  const [questionCantonnade, setQuestionCantonnade] = useState<number>(0); // 0 = question principale, 1-4 = questions bonus
  const [cantonnadeReussie, setCantonnadeReussie] = useState<boolean>(false);
  const [relaisActif, setRelaisActif] = useState<boolean>(true);

  const rubriques = [
    { nom: 'canonnade', titre: 'Canonnade', description: '1 question initiale + 4 bonus si réussie', couleur: 'bg-red-500', questionsParRubrique: 5 },
    { nom: 'eclair', titre: 'Éclair', description: '10 questions rapides aléatoires', couleur: 'bg-yellow-500', questionsParRubrique: 10 },
    { nom: 'relais', titre: 'Relais', description: 'Questions en séquence - arrêt à la première erreur', couleur: 'bg-blue-500', questionsParRubrique: 10 },
    { nom: 'identification', titre: 'Identification', description: 'Devinez avec des indices (40-30-20-10 points)', couleur: 'bg-purple-500', questionsParRubrique: 1 }
  ];

  const themesDisponiblesRelais = ['Mathématiques', 'Informatique', 'Physique', 'Astronomie', 'Histoire', 'Géographie', 'Biologie', 'Chimie'];

  // Charger les questions pour la rubrique actuelle
  useEffect(() => {
    if (phaseJeu === 'jeu') {
      const rubrique = rubriques[rubriqueActuelle];
      let nouvellesQuestions: QuestionGenieEnHerbe[] = [];
      
      if (rubrique.nom === 'relais' && themeRelaisSelectionne) {
        nouvellesQuestions = obtenirQuestionsGenieEnHerbe(rubrique.nom, rubrique.questionsParRubrique, themeRelaisSelectionne);
      } else {
        nouvellesQuestions = obtenirQuestionsGenieEnHerbe(rubrique.nom, rubrique.questionsParRubrique);
      }
      
      setQuestions(nouvellesQuestions);
      setQuestionActuelle(0);
      setReponseSelectionnee(null);
      setARepondu(false);
      setAfficherReponse(false);
      setQuestionCantonnade(0);
      setCantonnadeReussie(false);
      setRelaisActif(true);
      setIndiceActuel(0);
    }
  }, [rubriqueActuelle, phaseJeu, themeRelaisSelectionne]);

  // Mélanger les réponses quand les questions changent
  useEffect(() => {
    if (questions.length > 0) {
      const questionsAvecReponsesMelangees = questions.map(melangerReponses);
      setQuestionsMelangees(questionsAvecReponsesMelangees);
    }
  }, [questions]);
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
    if (phaseJeu === 'jeu' && questionsMelangees.length > 0) {
      const question = questionsMelangees[questionActuelle];
      if (question) {
        setTempsRestant(question.tempsLimite);
        setTimerActif(true);
      }
    }
  }, [questionActuelle, questionsMelangees, phaseJeu]);

  const demarrerRubrique = () => {
    const rubrique = rubriques[rubriqueActuelle];
    if (rubrique.nom === 'relais') {
      setPhaseJeu('selectionThemeRelais');
    } else {
      setPhaseJeu('jeu');
    }
  };

  const demarrerRelaisAvecTheme = (theme: string) => {
    setThemeRelaisSelectionne(theme);
    setPhaseJeu('jeu');
  };

  const demarrerRelaisSansTheme = () => {
    setThemeRelaisSelectionne('');
    setPhaseJeu('jeu');
  };

  const demarrerIdentification = () => {
    const nouvellesQuestions = obtenirQuestionsGenieEnHerbe('identification', 1);
    setQuestions(nouvellesQuestions);
    setQuestionActuelle(0);
    setReponseSelectionnee(null);
    setARepondu(false);
    setAfficherReponse(false);
    setIndiceActuel(0);
    setPhaseJeu('jeu');
  };

  const gererSelectionReponse = (index: number) => {
    if (aRepondu) return;
    setReponseSelectionnee(index);
    
    // Validation automatique dès la sélection
    setARepondu(true);
    setAfficherReponse(true);
    setTimerActif(false);
    
    const question = questionsMelangees[questionActuelle];
    const rubriqueNom = rubriques[rubriqueActuelle].nom as keyof ScoreGenieEnHerbe;
    
    // Vérifier si la réponse est correcte
    const reponseCorrecte = index === question.bonneReponse;
    
    if (reponseCorrecte) {
      let points = question.points;
      
      // Logique spéciale pour l'identification
      if (rubriqueNom === 'identification') {
        const pointsIdentification = [40, 30, 20, 10];
        points = pointsIdentification[indiceActuel] || 10;
      }
      
      setScore(prevScore => ({
        ...prevScore,
        [rubriqueNom]: prevScore[rubriqueNom] + points,
        total: prevScore.total + points
      }));
      
      // Marquer la canonnade comme réussie si c'est la première question
      if (rubriqueNom === 'canonnade' && questionCantonnade === 0) {
        setCantonnadeReussie(true);
      }
    } else {
      // Logique d'arrêt pour certaines rubriques
      if (rubriqueNom === 'canonnade' && questionCantonnade === 0) {
        // Canonnade échouée, passer à la rubrique suivante
        setTimeout(() => {
          passerRubriqueSuivante();
        }, 2000);
        return;
      } else if (rubriqueNom === 'relais') {
        // Relais échoué, arrêter le relais
        setRelaisActif(false);
        setTimeout(() => {
          passerRubriqueSuivante();
        }, 2000);
        return;
      }
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
    const rubrique = rubriques[rubriqueActuelle];
    
    // Logique spéciale pour la canonnade
    if (rubrique.nom === 'canonnade') {
      if (questionCantonnade === 0 && cantonnadeReussie) {
        // Passer aux questions bonus
        setQuestionCantonnade(1);
        setQuestionActuelle(questionActuelle + 1);
        setReponseSelectionnee(null);
        setARepondu(false);
        setAfficherReponse(false);
        return;
      } else if (questionCantonnade > 0 && questionCantonnade < 4 && cantonnadeReussie) {
        // Continuer les questions bonus
        setQuestionCantonnade(questionCantonnade + 1);
        setQuestionActuelle(questionActuelle + 1);
        setReponseSelectionnee(null);
        setARepondu(false);
        setAfficherReponse(false);
        return;
      } else {
        // Canonnade terminée
        passerRubriqueSuivante();
        return;
      }
    }
    
    // Logique normale pour les autres rubriques
    if (questionActuelle < questionsMelangees.length - 1) {
      setQuestionActuelle(questionActuelle + 1);
      setReponseSelectionnee(null);
      setARepondu(false);
      setAfficherReponse(false);
    } else {
      passerRubriqueSuivante();
    }
  };

  const passerRubriqueSuivante = () => {
    if (rubriqueActuelle < rubriques.length - 1) {
      setRubriqueActuelle(rubriqueActuelle + 1);
      setPhaseJeu('presentation');
    } else {
      // Jeu terminé
      surFinJeu(score);
    }
  };

  const gererIndiceIdentification = () => {
    if (indiceActuel < 3) {
      setIndiceActuel(indiceActuel + 1);
    }
  };

  const gererReponseIdentification = (index: number) => {
    if (aRepondu) return;
    setReponseSelectionnee(index);
    setARepondu(true);
    setAfficherReponse(true);
    setTimerActif(false);
    
    const question = questionsMelangees[questionActuelle];
    
    if (index === question.bonneReponse) {
      const pointsIdentification = [40, 30, 20, 10];
      const points = pointsIdentification[indiceActuel];
      
      setScore(prevScore => ({
        ...prevScore,
        identification: prevScore.identification + points,
        total: prevScore.total + points
      }));
    }

    // Terminer l'identification après 3 secondes
    setTimeout(() => {
      passerRubriqueSuivante();
    }, 3000);
  };

  const obtenirCouleurReponse = (index: number) => {
    if (!afficherReponse) {
      return reponseSelectionnee === index ? 'bg-blue-500 text-white' : 'bg-white hover:bg-gray-50';
    }

    const question = questionsMelangees[questionActuelle];
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

    const question = questionsMelangees[questionActuelle];
    if (index === question.bonneReponse) {
      return <Star className="w-5 h-5" />;
    } else if (reponseSelectionnee === index) {
      return <Target className="w-5 h-5" />;
    }
    return null;
  };

  // Écran de sélection de thème pour le relais
  if (phaseJeu === 'selectionThemeRelais') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-100 p-4 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-2xl text-center">
          <div className="bg-blue-500 text-white w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
            <Target className="w-12 h-12" />
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Relais - Sélection du Thème</h1>
          <p className="text-xl text-gray-600 mb-8">Choisissez un thème ou jouez avec des questions aléatoires</p>
          
          <div className="grid grid-cols-2 gap-4 mb-6">
            {themesDisponiblesRelais.map((theme) => (
              <button
                key={theme}
                onClick={() => demarrerRelaisAvecTheme(theme)}
                className="bg-blue-500 hover:bg-blue-600 text-white p-4 rounded-xl font-semibold transition-all transform hover:scale-105"
              >
                {theme}
              </button>
            ))}
          </div>
          
          <button
            onClick={demarrerRelaisSansTheme}
            className="bg-gray-500 hover:bg-gray-600 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all transform hover:scale-105 flex items-center space-x-3 mx-auto"
          >
            <Shuffle className="w-6 h-6" />
            <span>Questions Aléatoires (Tous Thèmes)</span>
          </button>
        </div>
      </div>
    );
  }

  // Logique spéciale pour l'identification
  if (rubriques[rubriqueActuelle].nom === 'identification' && phaseJeu === 'jeu') {
    if (questionsMelangees.length === 0) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 p-4 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-600 mx-auto mb-4"></div>
            <p className="text-xl text-gray-600">Chargement de l'identification...</p>
          </div>
        </div>
      );
    }

    const question = questionsMelangees[questionActuelle];
    const pointsRestants = [40, 30, 20, 10][indiceActuel];
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 p-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center space-x-4">
                <div className="bg-purple-500 text-white p-3 rounded-xl">
                  <Target className="w-6 h-6" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-800">Identification</h1>
                  <p className="text-gray-600">Indice {indiceActuel + 1}/4 - {pointsRestants} points</p>
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">{score.total}</div>
                <div className="text-gray-500 text-sm">points</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
              Qu'est-ce que c'est ?
            </h2>
            
            {question.indices && (
              <div className="bg-purple-50 rounded-xl p-6 mb-6">
                <h3 className="font-semibold text-purple-800 mb-4">Indices révélés :</h3>
                {question.indices.slice(0, indiceActuel + 1).map((indice, index) => (
                  <div key={index} className="mb-2 p-3 bg-white rounded-lg">
                    <span className="font-medium text-purple-600">Indice {index + 1}:</span> {indice}
                  </div>
                ))}
              </div>
            )}
            
            <div className="space-y-4 mb-6">
              {question.reponses.map((reponse, index) => (
                <button
                  key={index}
                  onClick={() => gererReponseIdentification(index)}
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

            {!aRepondu && indiceActuel < 3 && (
              <div className="text-center">
                <button
                  onClick={gererIndiceIdentification}
                  className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-3 rounded-xl font-semibold transition-colors"
                >
                  Révéler l'indice suivant ({[30, 20, 10][indiceActuel]} points)
                </button>
              </div>
            )}

            {afficherReponse && (
              <div className="mt-6 text-center">
                {reponseSelectionnee === question.bonneReponse ? (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <p className="text-green-700 font-semibold">
                      Excellente réponse ! +{[40, 30, 20, 10][indiceActuel]} points
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
  }
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
              <div>• {rubrique.nom === 'canonnade' ? 30 : rubrique.nom === 'eclair' ? 5 : rubrique.nom === 'relais' ? 15 : 30} secondes par question</div>
              <div>• {questionsMelangees.length > 0 ? questionsMelangees[0].points : rubrique.nom === 'canonnade' ? 1 : rubrique.nom === 'eclair' ? 2 : rubrique.nom === 'relais' ? 3 : 4} point(s) par bonne réponse</div>
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
  if (questionsMelangees.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 p-4 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-xl text-gray-600">Chargement des questions...</p>
        </div>
      </div>
    );
  }

  const question = questionsMelangees[questionActuelle];
  const rubrique = rubriques[rubriqueActuelle];
  const progressionPourcent = ((questionActuelle + 1) / questionsMelangees.length) * 100;
  
  // Titre spécial pour le relais avec thème
  let titrePhase = rubrique.titre;
  if (rubrique.nom === 'relais' && themeRelaisSelectionne) {
    titrePhase = `Relais - ${themeRelaisSelectionne}`;
  } else if (rubrique.nom === 'canonnade') {
    if (questionCantonnade === 0) {
      titrePhase = 'Canonnade - Question Principale';
    } else {
      titrePhase = `Canonnade - Bonus ${questionCantonnade}/4`;
    }
  } else if (rubrique.nom === 'relais' && !relaisActif) {
    titrePhase = 'Relais - Terminé';
  }

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
                <h1 className="text-2xl font-bold text-gray-800">{titrePhase}</h1>
                <p className="text-gray-600">Question {questionActuelle + 1} sur {questionsMelangees.length}</p>
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
          
          {/* Scores par rubrique */}
          <div className="grid grid-cols-4 gap-4 mt-4">
            <div className="p-2">
              <div className="text-lg font-bold text-red-600">{score.canonnade}</div>
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

          {/* Message spécial pour le relais arrêté */}
          {rubrique.nom === 'relais' && !relaisActif && (
            <div className="mt-6 text-center">
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                <p className="text-orange-700 font-semibold">Le relais s'arrête ici. Passage à la rubrique suivante...</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GenieEnHerbe;