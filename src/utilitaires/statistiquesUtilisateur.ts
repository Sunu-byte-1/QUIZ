import { UtilisateurConnecte } from '../types';

export interface StatistiquesUtilisateur {
  totalParties: number;
  scoreMoyen: number;
  meilleurScore: number;
  themesJoues: string[];
  tempsTotal: number;
  niveauRecommandation: 'debutant' | 'intermediaire' | 'expert';
}

// Fonction pour calculer les statistiques de l'utilisateur
export const calculerStatistiques = (
  utilisateur: UtilisateurConnecte,
  historiqueParties: any[] = []
): StatistiquesUtilisateur => {
  const totalParties = historiqueParties.length;
  const scores = historiqueParties.map(p => p.score || 0);
  const scoreMoyen = totalParties > 0 ? scores.reduce((a, b) => a + b, 0) / totalParties : 0;
  const meilleurScore = totalParties > 0 ? Math.max(...scores) : 0;
  const themesJoues = [...new Set(historiqueParties.map(p => p.theme).filter(Boolean))];
  const tempsTotal = historiqueParties.reduce((total, p) => total + (p.temps || 0), 0);

  // Déterminer le niveau de recommandation
  let niveauRecommandation: 'debutant' | 'intermediaire' | 'expert' = 'debutant';
  
  if (totalParties > 20 && scoreMoyen > 80) {
    niveauRecommandation = 'expert';
  } else if (totalParties > 10 && scoreMoyen > 60) {
    niveauRecommandation = 'intermediaire';
  }

  return {
    totalParties,
    scoreMoyen: Math.round(scoreMoyen * 10) / 10,
    meilleurScore,
    themesJoues,
    tempsTotal,
    niveauRecommandation
  };
};

// Fonction pour obtenir des recommandations personnalisées
export const obtenirRecommandations = (
  utilisateur: UtilisateurConnecte,
  statistiques: StatistiquesUtilisateur
): string[] => {
  const recommandations: string[] = [];

  // Recommandations selon l'âge
  if (utilisateur.age) {
    if (utilisateur.age < 13) {
      recommandations.push('Commencez par des thèmes simples comme "Animaux" ou "Couleurs"');
      recommandations.push('Essayez le mode "Quiz par Thème" avec 15 questions');
    } else if (utilisateur.age < 18) {
      recommandations.push('Testez vos connaissances avec le mode "Quiz Aléatoire"');
      recommandations.push('Défiez vos amis avec le mode "Génie en Herbe"');
    } else {
      recommandations.push('Essayez le "Challenge 100 Questions" pour un défi complet');
      recommandations.push('Participez au mode "Les 12 Coups de Midi" pour la rapidité');
    }
  }

  // Recommandations selon le niveau
  if (statistiques.niveauRecommandation === 'debutant') {
    recommandations.push('Commencez par des questions faciles pour prendre confiance');
    recommandations.push('Jouez régulièrement pour améliorer vos scores');
  } else if (statistiques.niveauRecommandation === 'intermediaire') {
    recommandations.push('Essayez des questions de difficulté moyenne');
    recommandations.push('Diversifiez les thèmes pour élargir vos connaissances');
  } else {
    recommandations.push('Défiez-vous avec des questions difficiles');
    recommandations.push('Participez aux modes compétitifs pour vous mesurer aux autres');
  }

  // Recommandations selon le pays
  if (utilisateur.pays) {
    const paysAfriqueOuest = ['Sénégal', 'Côte d\'Ivoire', 'Mali', 'Guinée', 'Burkina Faso'];
    const paysEurope = ['France', 'Belgique', 'Suisse'];
    
    if (paysAfriqueOuest.includes(utilisateur.pays)) {
      recommandations.push('Découvrez les questions sur l\'Afrique de l\'Ouest');
      recommandations.push('Testez vos connaissances sur la culture africaine');
    } else if (paysEurope.includes(utilisateur.pays)) {
      recommandations.push('Explorez l\'histoire et la culture européennes');
      recommandations.push('Découvrez la géographie européenne');
    }
  }

  return recommandations;
};

// Fonction pour obtenir des objectifs personnalisés
export const obtenirObjectifs = (
  utilisateur: UtilisateurConnecte,
  statistiques: StatistiquesUtilisateur
): string[] => {
  const objectifs: string[] = [];

  // Objectifs selon le niveau
  if (statistiques.niveauRecommandation === 'debutant') {
    objectifs.push('Jouer à 5 parties pour découvrir l\'application');
    objectifs.push('Obtenir un score de 60% sur un quiz');
    objectifs.push('Essayer 3 thèmes différents');
  } else if (statistiques.niveauRecommandation === 'intermediaire') {
    objectifs.push('Atteindre un score de 80% sur un quiz');
    objectifs.push('Jouer à tous les modes de jeu');
    objectifs.push('Compléter 10 parties');
  } else {
    objectifs.push('Obtenir un score parfait (100%)');
    objectifs.push('Terminer le Challenge 100 Questions');
    objectifs.push('Battre votre record personnel');
  }

  return objectifs;
}; 