import React, { useState } from 'react';
import { FournisseurTheme } from './contextes/ThemeContexte';
import { EtatJeu, Question, UtilisateurConnecte, ModeJeu, ConfigurationQuiz, ScoreGenieEnHerbe } from './types';
import { obtenirQuestionsParTheme, obtenirQuestionsAleatoires, obtenirChallenge100Questions } from './donnees/questionsEtendues';
import { obtenirQuestionsPersonnalisees } from './utilitaires/questionsAdaptees';
import Connexion from './composants/Connexion';
import SelectionMode from './composants/SelectionMode';
import SelectionThemeEtendue from './composants/SelectionThemeEtendue';
import Quiz from './composants/Quiz';
import GenieEnHerbe from './composants/GenieEnHerbe';
import ResultatsEtendus from './composants/ResultatsEtendus';
import DouzeCoupsDeMidi from './composants/DouzeCoupsDeMidi';
import ProfilUtilisateur from './composants/ProfilUtilisateur';
import AdminDashboard from './composants/AdminDashboard';
import LoadingScreen from './composants/LoadingScreen';
import { apiService } from './services/api';

function App() {
  // État principal de l'application
  const [etatJeu, setEtatJeu] = useState<EtatJeu>('connexion');
  const [utilisateur, setUtilisateur] = useState<UtilisateurConnecte>({
    identifiant: '',
    connecte: false
  });
  const [chargementInitial, setChargementInitial] = useState(true);
  const [afficherAdmin, setAfficherAdmin] = useState(false);

  // Vérifier l'authentification au démarrage
  React.useEffect(() => {
    const verifierAuth = async () => {
      try {
        if (apiService.isAuthenticated()) {
          const userData = await apiService.checkAuth();
          setUtilisateur({
            identifiant: userData.email,
            connecte: true,
            prenom: userData.prenom,
            nom: userData.nom,
            pays: userData.pays,
            age: userData.age,
            role: userData.role
          });
          setEtatJeu('selectionMode');
        }
      } catch (error) {
        // Token invalide, déconnexion
        apiService.clearToken();
      } finally {
        setChargementInitial(false);
      }
    };

    verifierAuth();
  }, []);

  const [modeJeuActuel, setModeJeuActuel] = useState<ModeJeu>('theme');
  const [questionsActuelles, setQuestionsActuelles] = useState<Question[]>([]);
  const [themeActuel, setThemeActuel] = useState<string>('');
  const [scoreActuel, setScoreActuel] = useState<number>(0);
  const [scoreGenieEnHerbeActuel, setScoreGenieEnHerbeActuel] = useState<ScoreGenieEnHerbe | undefined>(undefined);
  const [totalQuestionsActuel, setTotalQuestionsActuel] = useState<number>(0);
  const [tempsJeuActuel, setTempsJeuActuel] = useState<number>(0);
  const [afficherProfil, setAfficherProfil] = useState(false);

  // Gestion de la connexion
  const gererConnexion = (email: string, role?: string) => {
    setUtilisateur({
      identifiant: email,
      connecte: true,
      prenom: undefined,
      nom: undefined,
      pays: undefined,
      age: undefined,
      role: (role as 'user' | 'admin' | undefined) || 'user'
    });
    setEtatJeu('selectionMode');
  };

  const gererDeconnexion = () => {
    // Déconnexion côté API
    apiService.clearToken();
    
    setUtilisateur({
      identifiant: '',
      connecte: false
    });
    setEtatJeu('connexion');
    setAfficherAdmin(false);
    // Réinitialiser les données du quiz
    setModeJeuActuel('theme');
    setQuestionsActuelles([]);
    setThemeActuel('');
    setScoreActuel(0);
    setScoreGenieEnHerbeActuel(undefined);
    setTotalQuestionsActuel(0);
    setTempsJeuActuel(0);
  };

  // Sélection du mode de jeu
  const gererSelectionMode = (mode: ModeJeu) => {
    setModeJeuActuel(mode);
    
    if (mode === 'genieEnHerbe') {
      setEtatJeu('genieEnHerbe');
      setThemeActuel('Génie en Herbe');
    } else if (mode === 'challenge100') {
      const questions = obtenirChallenge100Questions();
      setQuestionsActuelles(questions);
      setThemeActuel('Challenge 100 Questions');
      setEtatJeu('quiz');
    } else if (mode === 'douzeCoupsDeMidi') {
      setEtatJeu('douzeCoupsDeMidi');
      setThemeActuel('Les 12 Coups de Midi');
    } else {
      setEtatJeu('selectionTheme');
    }
  };

  // Configuration du quiz (thème + nombre de questions)
  const gererConfigurationQuiz = (config: ConfigurationQuiz) => {
    let questions: Question[] = [];
    
    if (config.mode === 'theme' && config.theme) {
      // Sélection par niveau
      if (config.niveau && config.niveau !== 'mixte') {
        const toutes = obtenirQuestionsParTheme(config.theme, 1000);
        questions = toutes.filter(q => q.difficulte === config.niveau).sort(() => Math.random() - 0.5).slice(0, config.nombreQuestions);
      } else {
        questions = obtenirQuestionsParTheme(config.theme, config.nombreQuestions);
      }
      setThemeActuel(config.theme);
    } else if (config.mode === 'aleatoire') {
      if (config.niveau && config.niveau !== 'mixte') {
        // Sélectionne toutes les questions du niveau demandé
        const toutes: Question[] = [];
        // Import dynamique pour éviter les erreurs TypeScript
        import('./donnees/questionsEtendues').then(module => {
          Object.values(module.questionsParTheme).forEach((qs: any) => {
            toutes.push(...qs.filter((q: any) => q.difficulte === config.niveau));
          });
        });
        questions = toutes.sort(() => Math.random() - 0.5).slice(0, config.nombreQuestions);
      } else {
        questions = obtenirQuestionsAleatoires(config.nombreQuestions);
      }
      setThemeActuel('Quiz Aléatoire');
    }

    // Adapter les questions selon le profil utilisateur si disponible
    if (utilisateur.age && utilisateur.pays) {
      questions = obtenirQuestionsPersonnalisees(questions, utilisateur.age, utilisateur.pays, config.nombreQuestions);
    }

    // Mettre à jour l'état du jeu
    setQuestionsActuelles(questions);
    setEtatJeu('quiz');
  };

  // Terminer le quiz et afficher les résultats
  const terminerQuiz = (score: number, totalQuestions: number) => {
    setScoreActuel(score);
    setTotalQuestionsActuel(totalQuestions);
    setScoreGenieEnHerbeActuel(undefined);
    setEtatJeu('resultats');
  };

  // Terminer le jeu Génie en Herbe
  const terminerGenieEnHerbe = (score: ScoreGenieEnHerbe) => {
    setScoreGenieEnHerbeActuel(score);
    setScoreActuel(0);
    setTotalQuestionsActuel(0);
    setEtatJeu('resultats');
  };

  // Rejouer le même quiz
  const rejouerQuiz = () => {
    if (modeJeuActuel === 'genieEnHerbe') {
      setEtatJeu('genieEnHerbe');
    } else if (modeJeuActuel === 'challenge100') {
      const questions = obtenirChallenge100Questions();
      setQuestionsActuelles(questions);
      setEtatJeu('quiz');
    } else if (modeJeuActuel === 'aleatoire') {
      const questions = obtenirQuestionsAleatoires(questionsActuelles.length);
      setQuestionsActuelles(questions);
      setEtatJeu('quiz');
    } else if (modeJeuActuel === 'theme') {
      const questions = obtenirQuestionsParTheme(themeActuel, questionsActuelles.length);
      setQuestionsActuelles(questions);
      setEtatJeu('quiz');
    }
  };

  // Retourner à l'accueil (sélection de mode)
  const retournerAccueil = () => {
    setEtatJeu('selectionMode');
    // Réinitialiser les données du quiz
    setModeJeuActuel('theme');
    setQuestionsActuelles([]);
    setThemeActuel('');
    setScoreActuel(0);
    setScoreGenieEnHerbeActuel(undefined);
    setTotalQuestionsActuel(0);
    setTempsJeuActuel(0);
  };

  // Retourner à la sélection de mode depuis la sélection de thème
  const retournerSelectionMode = () => {
    setEtatJeu('selectionMode');
  };

  // Rendu conditionnel selon l'état du jeu
  const renduComposant = () => {
    if (chargementInitial) {
      return <LoadingScreen />;
    }

    switch (etatJeu) {
      case 'connexion':
        return <Connexion surConnexion={gererConnexion} />;
      
      case 'selectionMode':
        return (
          <SelectionMode
            surSelectionMode={gererSelectionMode}
            utilisateur={utilisateur}
            surDeconnexion={gererDeconnexion}
            surProfil={() => setAfficherProfil(true)}
            surAdmin={() => setAfficherAdmin(true)}
          />
        );
      
      case 'selectionTheme':
        return (
          <SelectionThemeEtendue
            surConfigurationQuiz={gererConfigurationQuiz}
            surRetour={retournerSelectionMode}
            modeSelectionne={modeJeuActuel as 'theme' | 'aleatoire'}
          />
        );
      
      case 'genieEnHerbe':
        return (
          <GenieEnHerbe
            surFinJeu={terminerGenieEnHerbe}
            surRetourAccueil={retournerAccueil}
          />
        );
      
      case 'douzeCoupsDeMidi':
        return (
          <DouzeCoupsDeMidi
            surRetour={retournerAccueil}
          />
        );
      
      case 'quiz':
        return (
          <Quiz
            questions={questionsActuelles}
            theme={themeActuel}
            surFinQuiz={terminerQuiz}
            surRetourAccueil={retournerAccueil}
          />
        );
      
      case 'resultats':
        return (
          <ResultatsEtendus
            score={scoreActuel}
            totalQuestions={totalQuestionsActuel}
            scoreGenieEnHerbe={scoreGenieEnHerbeActuel}
            theme={themeActuel}
            mode={modeJeuActuel}
            surRejouer={rejouerQuiz}
            surRetourAccueil={retournerAccueil}
            temps={tempsJeuActuel}
          />
        );
      
      default:
        return <Connexion surConnexion={gererConnexion} />;
    }
  };

  // Afficher le profil si demandé
  if (afficherProfil) {
    return (
      <ProfilUtilisateur
        utilisateur={utilisateur}
        surModification={(donnees) => {
          setUtilisateur({ ...utilisateur, ...donnees });
          setAfficherProfil(false);
        }}
        surRetour={() => setAfficherProfil(false)}
      />
    );
  }

  // Afficher le dashboard admin si demandé
  if (afficherAdmin) {
    return (
      <AdminDashboard
        onRetour={() => setAfficherAdmin(false)}
      />
    );
  }

  return (
    <FournisseurTheme>
      <div className="App min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
        {renduComposant()}
      </div>
    </FournisseurTheme>
  );
}

export default App;