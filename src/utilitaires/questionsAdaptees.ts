import { Question } from '../types';

// Fonction pour adapter les questions selon l'âge
export const adapterQuestionsParAge = (questions: Question[], age: number): Question[] => {
  if (age < 13) {
    // Questions simplifiées pour les enfants (5-12 ans)
    return questions.filter(q => q.difficulte === 'facile' || !q.difficulte);
  } else if (age < 18) {
    // Questions intermédiaires pour les adolescents (13-17 ans)
    return questions.filter(q => q.difficulte !== 'difficile');
  } else {
    // Toutes les questions pour les adultes (18+)
    return questions;
  }
};

// Fonction pour adapter les questions selon le pays
export const adapterQuestionsParPays = (questions: Question[], pays: string): Question[] => {
  const paysAfriqueOuest = ['Sénégal', 'Côte d\'Ivoire', 'Mali', 'Guinée', 'Burkina Faso'];
  const paysEurope = ['France', 'Belgique', 'Suisse'];
  const paysAmeriqueNord = ['États-Unis', 'Canada'];

  if (paysAfriqueOuest.includes(pays)) {
    // Prioriser les questions sur l'Afrique de l'Ouest
    return questions.sort((a, b) => {
      const aAfrique = a.theme.toLowerCase().includes('afrique') || a.theme.toLowerCase().includes('sénégal') || a.theme.toLowerCase().includes('ouest');
      const bAfrique = b.theme.toLowerCase().includes('afrique') || b.theme.toLowerCase().includes('sénégal') || b.theme.toLowerCase().includes('ouest');
      return aAfrique && !bAfrique ? -1 : bAfrique && !aAfrique ? 1 : 0;
    });
  } else if (paysEurope.includes(pays)) {
    // Prioriser les questions sur l'Europe
    return questions.sort((a, b) => {
      const aEurope = a.theme.toLowerCase().includes('europe') || a.theme.toLowerCase().includes('france') || a.theme.toLowerCase().includes('belgique');
      const bEurope = b.theme.toLowerCase().includes('europe') || b.theme.toLowerCase().includes('france') || b.theme.toLowerCase().includes('belgique');
      return aEurope && !bEurope ? -1 : bEurope && !aEurope ? 1 : 0;
    });
  } else if (paysAmeriqueNord.includes(pays)) {
    // Prioriser les questions sur l'Amérique du Nord
    return questions.sort((a, b) => {
      const aAmerique = a.theme.toLowerCase().includes('amérique') || a.theme.toLowerCase().includes('états-unis') || a.theme.toLowerCase().includes('canada');
      const bAmerique = b.theme.toLowerCase().includes('amérique') || b.theme.toLowerCase().includes('états-unis') || b.theme.toLowerCase().includes('canada');
      return aAmerique && !bAmerique ? -1 : bAmerique && !aAmerique ? 1 : 0;
    });
  }

  // Pour "Autre" ou autres pays, garder l'ordre original
  return questions;
};

// Fonction pour obtenir des questions personnalisées
export const obtenirQuestionsPersonnalisees = (
  questions: Question[], 
  age: number, 
  pays: string, 
  nombreQuestions: number
): Question[] => {
  // Adapter selon l'âge
  let questionsAdaptees = adapterQuestionsParAge(questions, age);
  
  // Adapter selon le pays
  questionsAdaptees = adapterQuestionsParPays(questionsAdaptees, pays);
  
  // Retourner le nombre demandé de questions
  return questionsAdaptees.slice(0, nombreQuestions);
};

// Fonction pour obtenir des suggestions de thèmes selon le profil
export const obtenirSuggestionsThemes = (age: number, pays: string): string[] => {
  const suggestions: string[] = [];
  
  // Suggestions selon l'âge
  if (age < 13) {
    suggestions.push('Animaux', 'Couleurs', 'Nombres', 'Fruits et Légumes');
  } else if (age < 18) {
    suggestions.push('Sport', 'Musique', 'Cinéma', 'Géographie');
  } else {
    suggestions.push('Histoire', 'Politique', 'Économie', 'Sciences');
  }
  
  // Suggestions selon le pays
  const paysAfriqueOuest = ['Sénégal', 'Côte d\'Ivoire', 'Mali', 'Guinée', 'Burkina Faso'];
  const paysEurope = ['France', 'Belgique', 'Suisse'];
  
  if (paysAfriqueOuest.includes(pays)) {
    suggestions.push('Afrique de l\'Ouest', 'Culture Africaine', 'Géographie Africaine');
  } else if (paysEurope.includes(pays)) {
    suggestions.push('Europe', 'Histoire Européenne', 'Culture Européenne');
  }
  
  return suggestions;
}; 