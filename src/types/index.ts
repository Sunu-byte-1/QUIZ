export interface Question {
  id: number;
  question: string;
  reponses: string[];
  bonneReponse: number;
  explication?: string;
  theme: string;
  difficulte: 'facile' | 'moyen' | 'difficile';
  points: number;
}

export interface UtilisateurConnecte {
  identifiant: string;
  connecte: boolean;
  prenom?: string;
  nom?: string;
  pays?: string;
  age?: number;
  role?: 'user' | 'admin';
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
  | 'quiz' 
  | 'resultats' 
  | 'genieEnHerbe' 
  | 'douzeCoupsDeMidi';

export type ModeJeu = 'theme' | 'aleatoire' | 'genieEnHerbe' | 'challenge100' | 'douzeCoupsDeMidi';

export interface ConfigurationQuiz {
  mode: 'theme' | 'aleatoire';
  theme?: string;
  nombreQuestions: number;
  niveau?: 'facile' | 'moyen' | 'difficile' | 'mixte';
}

export interface ScoreGenieEnHerbe {
  score: number;
  temps: number;
  questionsRepondues: number;
  precision: number;
}

export interface StatistiquesUtilisateur {
  partiesJouees: number;
  scoreTotal: number;
  meilleurScore: number;
  tempsTotal: number;
  precisionMoyenne: number;
  themesPrefere: string[];
  progression: {
    date: string;
    score: number;
  }[];
}

export interface ObjectifUtilisateur {
  id: string;
  titre: string;
  description: string;
  type: 'score' | 'parties' | 'temps' | 'precision';
  valeurCible: number;
  valeurActuelle: number;
  atteint: boolean;
  recompense?: string;
}

export interface Recommandation {
  type: 'theme' | 'difficulte' | 'pratique' | 'objectif';
  titre: string;
  description: string;
  priorite: 'basse' | 'moyenne' | 'haute';
  action?: string;
}