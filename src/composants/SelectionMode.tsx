import React from 'react';
import { ModeJeu, UtilisateurConnecte } from '../types';

interface SelectionModeProps {
  surSelectionMode: (mode: ModeJeu) => void;
  utilisateur: UtilisateurConnecte;
  surDeconnexion: () => void;
  surProfil: () => void;
  surAdmin: () => void;
}

const SelectionMode: React.FC<SelectionModeProps> = ({
  surSelectionMode,
  utilisateur,
  surDeconnexion,
  surProfil,
  surAdmin
}) => {
  const modes: { id: ModeJeu; titre: string; description: string; icone: string; couleur: string }[] = [
    {
      id: 'theme',
      titre: 'Quiz par Thème',
      description: 'Choisissez un thème et testez vos connaissances',
      icone: '📚',
      couleur: 'bg-blue-500 hover:bg-blue-600'
    },
    {
      id: 'aleatoire',
      titre: 'Quiz Aléatoire',
      description: 'Questions mélangées de tous les thèmes',
      icone: '🎲',
      couleur: 'bg-green-500 hover:bg-green-600'
    },
    {
      id: 'genieEnHerbe',
      titre: 'Génie en Herbe',
      description: 'Répondez le plus vite possible !',
      icone: '⚡',
      couleur: 'bg-yellow-500 hover:bg-yellow-600'
    },
    {
      id: 'challenge100',
      titre: 'Challenge 100 Questions',
      description: 'Marathon de 100 questions consécutives',
      icone: '🏃',
      couleur: 'bg-purple-500 hover:bg-purple-600'
    },
    {
      id: 'douzeCoupsDeMidi',
      titre: 'Les 12 Coups de Midi',
      description: '12 questions chronométrées',
      icone: '⏰',
      couleur: 'bg-red-500 hover:bg-red-600'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                🎮 Sélection du Mode de Jeu
              </h1>
              <p className="text-gray-600 dark:text-gray-300">
                Bienvenue {utilisateur.prenom || utilisateur.identifiant} ! Choisissez votre mode de jeu
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={surProfil}
                className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                👤 Profil
              </button>
              {utilisateur.role === 'admin' && (
                <button
                  onClick={surAdmin}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  🛡️ Admin
                </button>
              )}
              <button
                onClick={surDeconnexion}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors"
              >
                🚪 Déconnexion
              </button>
            </div>
          </div>
        </div>

        {/* Grille des modes */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {modes.map((mode) => (
            <div
              key={mode.id}
              className={`bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 cursor-pointer transform transition-all duration-200 hover:scale-105 hover:shadow-xl`}
              onClick={() => surSelectionMode(mode.id)}
            >
              <div className="text-center">
                <div className="text-4xl mb-4">{mode.icone}</div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  {mode.titre}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  {mode.description}
                </p>
                <div className={`mt-4 ${mode.couleur} text-white px-4 py-2 rounded-lg inline-block`}>
                  Jouer
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Statistiques rapides */}
        {utilisateur.prenom && (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mt-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              📊 Vos Informations
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Pays</p>
                <p className="font-semibold text-gray-900 dark:text-white">{utilisateur.pays}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Âge</p>
                <p className="font-semibold text-gray-900 dark:text-white">{utilisateur.age} ans</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Rôle</p>
                <p className="font-semibold text-gray-900 dark:text-white capitalize">{utilisateur.role || 'user'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Email</p>
                <p className="font-semibold text-gray-900 dark:text-white text-sm">{utilisateur.identifiant}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SelectionMode;