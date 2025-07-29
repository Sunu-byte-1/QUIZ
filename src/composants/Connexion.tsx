import React, { useState } from 'react';
import { Lock, LogIn, Mail } from 'lucide-react';
import BasculeurTheme from './BasculeurTheme';
import { apiService } from '../services/api';
import Inscription from './Inscription';

interface PropsConnexion {
  surConnexion: (identifiant: string) => void;
}

const Connexion: React.FC<PropsConnexion> = ({ surConnexion }) => {
  const [email, setEmail] = useState('');
  const [motDePasse, setMotDePasse] = useState('');
  const [erreur, setErreur] = useState('');
  const [chargement, setChargement] = useState(false);
  const [modeInscription, setModeInscription] = useState(false);

  const gererSoumission = async (e: React.FormEvent) => {
    e.preventDefault();
    setChargement(true);
    setErreur('');

    try {
      // Mode connexion uniquement
      const response = await apiService.login({ email, password: motDePasse });
      surConnexion(response.email);
    } catch (error) {
      if (error instanceof Error) {
        setErreur(error.message);
      } else {
        setErreur('Erreur de connexion');
      }
    } finally {
      setChargement(false);
    }
  };

  const gererInscription = async (data: {
    email: string;
    password: string;
    prenom: string;
    nom: string;
    pays: string;
    age: number;
  }) => {
    setChargement(true);
    setErreur('');

    try {
      await apiService.register(data);
      setErreur('');
      setModeInscription(false);
      // Rediriger vers la connexion après inscription réussie
    } catch (error) {
      if (error instanceof Error) {
        setErreur(error.message);
      } else {
        setErreur('Erreur d\'inscription');
      }
    } finally {
      setChargement(false);
    }
  };

  // Afficher le formulaire d'inscription si en mode inscription
  if (modeInscription) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-2 sm:p-4 transition-all duration-500">
        <div className="absolute top-4 right-4">
          <BasculeurTheme />
        </div>
        <Inscription
          surInscription={gererInscription}
          surRetour={() => setModeInscription(false)}
          erreur={erreur}
          chargement={chargement}
        />
      </div>
    );
  }

  // Formulaire de connexion
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-2 sm:p-4 transition-all duration-500">
      <div className="absolute top-4 right-4">
        <BasculeurTheme />
      </div>
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-4 sm:p-6 lg:p-8 w-full max-w-md mx-2 transition-colors duration-300">
        <div className="text-center mb-8">
          <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <LogIn className="w-8 h-8 text-blue-600" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-gray-100 mb-2 animate-pulse">QUIZZZZZ</h1>
          <p className="text-gray-600 dark:text-gray-300">Connectez-vous pour commencer le quiz</p>
        </div>

        <form onSubmit={gererSoumission} className="space-y-4 sm:space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2 sm:py-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm sm:text-base"
                placeholder="Entrez votre email"
                required
                autoComplete="email"
              />
            </div>
          </div>

          <div>
            <label htmlFor="motDePasse" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Mot de passe
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="password"
                id="motDePasse"
                value={motDePasse}
                onChange={(e) => setMotDePasse(e.target.value)}
                className="w-full pl-10 pr-4 py-2 sm:py-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm sm:text-base"
                placeholder="Entrez votre mot de passe"
                required
                autoComplete="current-password"
              />
            </div>
          </div>

          {erreur && (
            <div className="bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-lg p-3">
              <p className="text-red-700 dark:text-red-300 text-sm">{erreur}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={chargement}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-2 sm:py-3 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2 text-sm sm:text-base"
          >
            {chargement ? (
             <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <LogIn className="w-5 h-5" />
                <span>Se connecter</span>
              </>
            )}
          </button>

          <div className="text-center">
            <button
              type="button"
              onClick={() => setModeInscription(true)}
              className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 text-sm underline"
            >
              Pas de compte ? S'inscrire
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Connexion;