import { Question, QuestionGenieEnHerbe } from '../types';
import { obtenirQuestionsParTheme } from '../donnees/questionsEtendues';

export const filtrerQuestionsDifficiles = (theme: string, nombreQuestions: number): QuestionGenieEnHerbe[] => {
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

export const obtenirQuestionsIdentification = (theme?: string): QuestionGenieEnHerbe[] => {
  // Pour l'identification, on prend des questions de tous les thèmes si aucun thème spécifique
  const questionsSource = theme ? 
    obtenirQuestionsParTheme(theme, 1000) : 
    obtenirQuestionsParTheme('Mathématiques', 200)
      .concat(obtenirQuestionsParTheme('Physique', 200))
      .concat(obtenirQuestionsParTheme('Histoire', 200))
      .concat(obtenirQuestionsParTheme('Biologie', 200));

  // Grouper les questions par réponse correcte
  const groupesParReponse = new Map<string, Question[]>();
  
  questionsSource.forEach((question: Question) => {
    const reponseCorrecte = question.reponses[question.bonneReponse];
    if (!groupesParReponse.has(reponseCorrecte)) {
      groupesParReponse.set(reponseCorrecte, []);
    }
    groupesParReponse.get(reponseCorrecte)!.push(question);
  });

  // Trouver un groupe avec au moins 4 questions
  for (const [reponse, questions] of groupesParReponse) {
    if (questions.length >= 4) {
      // Trier par difficulté (difficile -> moyen -> facile)
      const questionsTries = questions.sort((a, b) => {
        const ordreDifficulte = { 'difficile': 0, 'moyen': 1, 'facile': 2 };
        return (ordreDifficulte[a.difficulte || 'moyen'] || 1) - (ordreDifficulte[b.difficulte || 'moyen'] || 1);
      });

      // Prendre les 4 premières et créer des indices progressifs
      return questionsTries.slice(0, 4).map((question: Question, index: number) => ({
        ...question,
        rubrique: 'identification' as const,
        tempsLimite: 30,
        points: [40, 30, 20, 10][index],
        indices: [
          `Catégorie: ${question.theme}`,
          `Difficulté: ${question.difficulte || 'moyen'}`,
          `Première lettre: ${question.reponses[question.bonneReponse][0]}`,
          `Nombre de lettres: ${question.reponses[question.bonneReponse].length}`
        ]
      }));
    }
  }

  // Fallback si aucun groupe approprié n'est trouvé
  return [];
};