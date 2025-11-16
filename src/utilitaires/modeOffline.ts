// Utilitaire pour gérer le mode offline
const OFFLINE_USER_KEY = 'quiz_offline_user';

export const creerUtilisateurOffline = () => ({
  identifiant: 'offline@quiz.local',
  connecte: true,
  prenom: 'Quiz',
  nom: 'Offline',
  pays: undefined,
  age: undefined,
  role: 'user' as const
});

export const obtenirUtilisateurOffline = () => {
  const stored = localStorage.getItem(OFFLINE_USER_KEY);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch {
      return creerUtilisateurOffline();
    }
  }
  return creerUtilisateurOffline();
};

export const sauvegarderUtilisateurOffline = (utilisateur: any) => {
  localStorage.setItem(OFFLINE_USER_KEY, JSON.stringify(utilisateur));
};

export const estEnOffline = () => !navigator.onLine;

export const obtenirScoreOfflineKey = (theme: string) => `quiz_score_${theme}`;

export const sauvegarderScoreOffline = (theme: string, score: number, total: number) => {
  const key = obtenirScoreOfflineKey(theme);
  localStorage.setItem(key, JSON.stringify({ score, total, date: new Date().toISOString() }));
};

export const obtenirScoreOffline = (theme: string) => {
  const key = obtenirScoreOfflineKey(theme);
  const stored = localStorage.getItem(key);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch {
      return null;
    }
  }
  return null;
};
