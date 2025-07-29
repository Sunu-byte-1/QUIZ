import React, { useState, useEffect } from 'react';
import { Users, BarChart3, Activity, Clock, TrendingUp, UserCheck, ArrowLeft } from 'lucide-react';
import BasculeurTheme from './BasculeurTheme';

interface AdminDashboardProps {
  onRetour: () => void;
}

interface Utilisateur {
  id: string;
  email: string;
  prenom: string;
  nom: string;
  pays: string;
  age: number;
  dateInscription: string;
  derniereConnexion: string;
  partiesJouees: number;
  meilleurScore: number;
}

interface Statistiques {
  totalUtilisateurs: number;
  nouveauxUtilisateurs: number;
  utilisateursActifs: number;
  totalParties: number;
  totalScore: number;
  meilleurScoreGlobal: number;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ onRetour }) => {
  const [utilisateurs, setUtilisateurs] = useState<Utilisateur[]>([]);
  const [statistiques, setStatistiques] = useState<Statistiques>({
    totalUtilisateurs: 0,
    nouveauxUtilisateurs: 0,
    utilisateursActifs: 0,
    totalParties: 0,
    totalScore: 0,
    meilleurScoreGlobal: 0
  });

  useEffect(() => {
    // Données mockées pour la démo
    const mockUtilisateurs: Utilisateur[] = [
      {
        id: '1',
        email: 'abdallahdiouf.dev@gmail.com',
        prenom: 'Abdallah',
        nom: 'Diouf',
        pays: 'Sénégal',
        age: 25,
        dateInscription: '2024-01-15',
        derniereConnexion: '2024-01-20',
        partiesJouees: 15,
        meilleurScore: 850
      },
      {
        id: '2',
        email: 'user1@example.com',
        prenom: 'Marie',
        nom: 'Dupont',
        pays: 'France',
        age: 28,
        dateInscription: '2024-01-18',
        derniereConnexion: '2024-01-19',
        partiesJouees: 8,
        meilleurScore: 720
      },
      {
        id: '3',
        email: 'user2@example.com',
        prenom: 'John',
        nom: 'Smith',
        pays: 'États-Unis',
        age: 32,
        dateInscription: '2024-01-16',
        derniereConnexion: '2024-01-20',
        partiesJouees: 12,
        meilleurScore: 680
      },
      {
        id: '4',
        email: 'user3@example.com',
        prenom: 'Anna',
        nom: 'Kowalski',
        pays: 'Pologne',
        age: 24,
        dateInscription: '2024-01-17',
        derniereConnexion: '2024-01-18',
        partiesJouees: 5,
        meilleurScore: 450
      }
    ];

    const mockStats: Statistiques = {
      totalUtilisateurs: 4,
      nouveauxUtilisateurs: 2,
      utilisateursActifs: 3,
      totalParties: 40,
      totalScore: 2700,
      meilleurScoreGlobal: 850
    };

    setUtilisateurs(mockUtilisateurs);
    setStatistiques(mockStats);
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-4">
      <div className="absolute top-4 right-4">
        <BasculeurTheme />
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <button
              onClick={onRetour}
              className="flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Retour</span>
            </button>
            <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">
              🛡️ Dashboard Administrateur
            </h1>
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Connecté en tant qu'admin
          </div>
        </div>

        {/* Statistiques */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Utilisateurs</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{statistiques.totalUtilisateurs}</p>
              </div>
              <Users className="w-8 h-8 text-blue-600" />
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Nouveaux (7j)</p>
                <p className="text-2xl font-bold text-green-600">{statistiques.nouveauxUtilisateurs}</p>
              </div>
              <UserCheck className="w-8 h-8 text-green-600" />
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Actifs (24h)</p>
                <p className="text-2xl font-bold text-orange-600">{statistiques.utilisateursActifs}</p>
              </div>
              <Activity className="w-8 h-8 text-orange-600" />
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Meilleur Score</p>
                <p className="text-2xl font-bold text-purple-600">{statistiques.meilleurScoreGlobal}</p>
              </div>
              <TrendingUp className="w-8 h-8 text-purple-600" />
            </div>
          </div>
        </div>

        {/* Tableau des utilisateurs */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
              Liste des Utilisateurs
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Utilisateur
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Pays
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Inscription
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Dernière Connexion
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Parties
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Meilleur Score
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {utilisateurs.map((utilisateur) => (
                  <tr key={utilisateur.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                          {utilisateur.prenom} {utilisateur.nom}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {utilisateur.email}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                      {utilisateur.pays}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                      {formatDate(utilisateur.dateInscription)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                      {formatDate(utilisateur.derniereConnexion)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                      {utilisateur.partiesJouees}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                        {utilisateur.meilleurScore}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard; 