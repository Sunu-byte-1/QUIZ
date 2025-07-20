import React, { useState } from 'react';
import { Lock, User, LogIn } from 'lucide-react';
import BasculeurTheme from './BasculeurTheme';

interface PropsConnexion {
  surConnexion: (identifiant: string) => void;
}

const Connexion: React.FC<PropsConnexion> = ({ surConnexion }) => {
  const [identifiant, setIdentifiant] = useState('');
  const [motDePasse, setMotDePasse] = useState('');
  const [erreur, setErreur] = useState('');
  const [chargement, setChargement] = useState(false);

  const gererSoumission = async (e: React.FormEvent) => {
    e.preventDefault();
    setChargement(true);
    setErreur('');

    // Simulation d'une vérification asynchrone
    await new Promise(resolve => setTimeout(resolve, 500));

    if (identifiant === 'nosleepman' && motDePasse === 'nosleepman') {
      surConnexion(identifiant);
    } else {
      setErreur('Identifiant ou mot de passe incorrect');
    }
    
    setChargement(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4 transition-all duration-500">
      <div className="absolute top-4 right-4">
        <BasculeurTheme />
      </div>
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <LogIn className="w-8 h-8 text-blue-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-2 animate-pulse">QUIZZZZZ</h1>
          <p className="text-gray-600 dark:text-gray-300">Connectez-vous pour commencer le quiz</p>
        </div>

        <form onSubmit={gererSoumission} className="space-y-6">
          <div>
            <label htmlFor="identifiant" className="block text-sm font-medium text-gray-700 mb-2">
              Identifiant
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                id="identifiant"
                value={identifiant}
                onChange={(e) => setIdentifiant(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="Entrez votre identifiant"
                required
                autoComplete="username"
              />
            </div>
          </div>

          <div>
            <label htmlFor="motDePasse" className="block text-sm font-medium text-gray-700 mb-2">
              Mot de passe
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="password"
                id="motDePasse"
                value={motDePasse}
                onChange={(e) => setMotDePasse(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="Entrez votre mot de passe"
                required
                autoComplete="current-password"
              />
            </div>
          </div>

          {erreur && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3">
              <p className="text-red-700 text-sm">{erreur}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={chargement}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-3 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2"
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
        </form>

        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-600 text-center mb-2">Identifiants de test :</p>
          <p className="text-xs text-gray-500 text-center">
            Identifiant : <span className="font-mono">nosleepman</span><br />
            Mot de passe : <span className="font-mono">nosleepman</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Connexion;