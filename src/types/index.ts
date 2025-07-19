// Types pour l'application de quiz
export interface Question {
  id: number;
  question: string;
  reponses: string[];
  bonneReponse: number; // Index de la bonne réponse (0-3)
  theme: string;
  difficulte?: 'facile' | 'moyen' | 'difficile';
  rubrique?: 'canonnade' | 'eclair' | 'relais' | 'identification' | 'normale';
  points?: number; // Score attribué à la question (optionnel)
}

export interface ScoreQuiz {
  bonnesReponses: number;
  totalQuestions: number;
  theme: string;
  date: string;
  mode: string;
  temps?: number;
}

export type EtatJeu = 'connexion' | 'selectionMode' | 'selectionTheme' | 'quiz' | 'resultats' | 'genieEnHerbe';

export interface UtilisateurConnecte {
  identifiant: string;
  connecte: boolean;
}

export type ModeJeu = 'theme' | 'aleatoire' | 'genieEnHerbe' | 'challenge100';

export interface ConfigurationQuiz {
  mode: ModeJeu;
  theme?: string;
  nombreQuestions: number;
  rubrique?: string;
}

export interface QuestionGenieEnHerbe extends Question {
  rubrique: 'canonnade' | 'eclair' | 'relais' | 'identification';
  tempsLimite: number; // en secondes
  points: number;
}

export interface ScoreGenieEnHerbe {
  canonnade: number;
  eclair: number;
  relais: number;
  identification: number;
  total: number;
}