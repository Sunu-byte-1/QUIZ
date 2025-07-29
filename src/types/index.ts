export interface Question {
  id: number;
  question: string;
  reponses: string[];
  bonneReponse: number;
  explication?: string;
  theme: string;
  difficulte: 'facile' | 'moyen' | 'difficile';
}

export interface UtilisateurConnecte {
  identifiant: string;
  prenom?: string;
  nom?: string;
  pays?: string;
  age?: number;
}

export interface ReponseUtilisateur {
  questionId: number;
  reponseChoisie: number;
  estCorrecte: boolean;
  tempsReponse: number;
}

export interface StatistiquesPartie {
  score: number;
  totalQuestions: number;
  bonnesReponses: number;
  tempsTotal: number;
  reponses: ReponseUtilisateur[];
}

export type EtatJeu = 
  | 'connexion'
  | 'selectionMode'
  | 'selectionTheme'
  | 'selectionThemeEtendue'
  | 'quiz'
  | 'resultats'
  | 'resultatsEtendus'
  | 'douzeCoupsDeMidi'
  | 'genieEnHerbe';

export interface ConfigurationQuiz {
  mode: 'classique' | 'douzeCoupsDeMidi' | 'genieEnHerbe';
  theme?: string;
  nombreQuestions: number;
  difficulte: 'facile' | 'moyen' | 'difficile' | 'mixte';
}