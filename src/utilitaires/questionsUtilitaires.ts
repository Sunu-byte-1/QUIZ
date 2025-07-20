import { Question, QuestionGenieEnHerbe } from '../types';
import { obtenirQuestionsParTheme, themesDisponibles } from '../donnees/questionsEtendues';

export const obtenirQuestionsAleatoiresTousThemes = (nombreQuestions: number): QuestionGenieEnHerbe[] => {
  // Obtenir des questions de tous les thèmes disponibles
  const toutesLesQuestions: Question[] = [];
  
  // Collecter des questions de chaque thème
  themesDisponibles.forEach(theme => {
    const questionsTheme = obtenirQuestionsParTheme(theme, 50); // 50 questions par thème
    toutesLesQuestions.push(...questionsTheme);
  });
  
  // Mélanger toutes les questions
  const questionsMelangees = [...toutesLesQuestions].sort(() => Math.random() - 0.5);
  
  // Limiter le nombre et convertir en QuestionGenieEnHerbe
  return questionsMelangees.slice(0, nombreQuestions).map((question: Question) => ({
    ...question,
    rubrique: 'eclair' as const,
    tempsLimite: 15,
    points: 5
  }));
};

export const filtrerQuestionsDifficiles = (theme: string, nombreQuestions: number): QuestionGenieEnHerbe[] => {
  if (!theme) {
    return obtenirQuestionsAleatoiresTousThemes(nombreQuestions);
  }
  
  const toutesLesQuestions = obtenirQuestionsParTheme(theme, 1000);
  
  // Filtrer uniquement les questions difficiles
  const questionsDifficiles = toutesLesQuestions.filter(
    (question: Question) => question.difficulte === 'difficile'
  );
  
  // Mélanger les questions
  const questionsMelangees = [...questionsDifficiles].sort(() => Math.random() - 0.5);
  
  // Convertir en QuestionGenieEnHerbe et limiter le nombre
  return questionsMelangees.slice(0, nombreQuestions).map((question: Question) => ({
    ...question,
    rubrique: 'relais' as const,
    tempsLimite: 15,
    points: 10
  }));
};

export const obtenirQuestionsRelaisAleatoires = (nombreQuestions: number): QuestionGenieEnHerbe[] => {
  return obtenirQuestionsAleatoiresTousThemes(nombreQuestions).map(question => ({
    ...question,
    rubrique: 'relais' as const,
    tempsLimite: 15,
    points: 10
  }));
};

// Données pour l'identification : pays, nationalités, capitales et monnaies
const donneesIdentification = [
  {
    question: "Quel est ce pays ?",
    reponse: "France",
    indices: [
      "Pays européen avec une riche histoire",
      "Connu pour la Tour Eiffel et le Louvre",
      "Capitale : Paris",
      "Monnaie : Euro"
    ]
  },
  {
    question: "Quelle est cette nationalité ?",
    reponse: "Japonaise",
    indices: [
      "Nationalité d'un pays insulaire d'Asie",
      "Connu pour les sushis et les mangas",
      "Capitale : Tokyo",
      "Monnaie : Yen"
    ]
  },
  {
    question: "Quelle est cette capitale ?",
    reponse: "Londres",
    indices: [
      "Capitale d'un royaume européen",
      "Connue pour Big Ben et la Tamise",
      "Pays : Royaume-Uni",
      "Monnaie : Livre sterling"
    ]
  },
  {
    question: "Quelle est cette monnaie ?",
    reponse: "Dollar américain",
    indices: [
      "Monnaie d'une grande puissance mondiale",
      "Utilisée dans de nombreux pays",
      "Symbole : $",
      "Pays principal : États-Unis"
    ]
  }
];
  
export const obtenirQuestionsIdentification = (): QuestionGenieEnHerbe[] => {
  // Choisir aléatoirement une donnée d'identification
  const donneesAleatoires = donneesIdentification[Math.floor(Math.random() * donneesIdentification.length)];

  // Créer des réponses alternatives plausibles
  const autresReponses = [
    "Allemagne", "Espagne", "Italienne", "Chinoise", "Berlin", "Madrid", "Euro", "Yen"
  ].filter(r => r !== donneesAleatoires.reponse).slice(0, 3);

  const reponses = [donneesAleatoires.reponse, ...autresReponses].sort(() => Math.random() - 0.5);
  const bonneReponse = reponses.indexOf(donneesAleatoires.reponse);
  
  // Créer une seule question avec 4 indices progressifs
  return [{
    id: 1,
    question: donneesAleatoires.question,
    reponses: reponses,
    bonneReponse: bonneReponse,
    theme: 'Géographie',
    difficulte: 'difficile' as const,
    rubrique: 'identification' as const,
    tempsLimite: 30,
    points: 40,
    indices: donneesAleatoires.indices
  }];
};