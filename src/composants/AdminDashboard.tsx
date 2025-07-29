import React, { useState, useEffect } from 'react';
import { apiService } from '../services/api';

interface Utilisateur {
  _id: string;
  email: string;
  prenom: string;
  nom: string;
  pays: string;
  age: number;
  role: string;
  dateInscription: string;
  derniereConnexion: string;
  statistiques: {
    partiesJouees: number;
    scoreTotal: number;
    meilleurScore: number;
    tempsTotal: number;
  };
}

interface StatistiquesGlobales {
  totalUtilisateurs: number;
  nouveauxUtilisateurs: number;
  utilisateursActifs: number;
  statsGlobales: {
    totalParties: number;
    totalScore: number;
    totalTemps: number;
    meilleurScoreGlobal: number;
  };
}

interface AdminDashboardProps {
  surRetour: () => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ surRetour }) => {
  const [utilisateurs, setUtilisateurs] = useState<Utilisateur[]>([]);
  const [statistiques, setStatistiques] = useState<StatistiquesGlobales | null>(null);
  const [chargement, setChargement] = useState(true);
  const [erreur, setErreur] = useState<string | null>(null);

  useEffect(() => {
    chargerDonnees();
  }, []);

  const chargerDonnees = async () => {
    try {
      setChargement(true);
      setErreur(null);

      const [utilisateursData, statsData] = await Promise.all([
        apiService.get('/auth/users'),
        apiService.get('/auth/stats')
      ]);

      setUtilisateurs(utilisateursData);
      setStatistiques(statsData);
    } catch (error) {
      console.error('Erreur chargement admin:', error);
      setErreur('Erreur lors du chargement des données');
    } finally {
      setChargement(false);
    }
  };

  const formaterDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formaterTemps = (secondes: number) => {
    const heures = Math.floor(secondes / 3600);
    const minutes = Math.floor((secondes % 3600) / 60);
    return `${heures}h ${minutes}m`;
  };

  if (chargement) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-300">Chargement du dashboard...</p>
        </div>
      </div>
    );
  }

  if (erreur) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-600 dark:text-red-400 text-xl mb-4">⚠️</div>
          <p className="text-gray-600 dark:text-gray-300 mb-4">{erreur}</p>
          <button
            onClick={chargerDonnees}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            Réessayer
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                🛡️ Dashboard Administrateur
              </h1>
              <p className="text-gray-600 dark:text-gray-300">
                Gestion des utilisateurs et statistiques globales
              </p>
            </div>
            <button
              onClick={surRetour}
              className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              ← Retour
            </button>
          </div>
        </div>

        {/* Statistiques Globales */}
        {statistiques && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-900">
                  <span className="text-2xl">👥</span>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Utilisateurs</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {statistiques.totalUtilisateurs}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-green-100 dark:bg-green-900">
                  <span className="text-2xl">🆕</span>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Nouveaux (7j)</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {statistiques.nouveauxUtilisateurs}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-yellow-100 dark:bg-yellow-900">
                  <span className="text-2xl">🎯</span>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Actifs (24h)</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {statistiques.utilisateursActifs}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-purple-100 dark:bg-purple-900">
                  <span className="text-2xl">🏆</span>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Meilleur Score</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {statistiques.statsGlobales.meilleurScoreGlobal}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Statistiques de Jeu */}
        {statistiques && (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">📊 Statistiques de Jeu</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                  {statistiques.statsGlobales.totalParties}
                </p>
                <p className="text-gray-600 dark:text-gray-400">Parties Jouées</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-green-600 dark:text-green-400">
                  {statistiques.statsGlobales.totalScore}
                </p>
                <p className="text-gray-600 dark:text-gray-400">Score Total</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-purple-600 dark:text-purple-400">
                  {formaterTemps(statistiques.statsGlobales.totalTemps)}
                </p>
                <p className="text-gray-600 dark:text-gray-400">Temps Total</p>
              </div>
            </div>
          </div>
        )}

        {/* Liste des Utilisateurs */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">👥 Liste des Utilisateurs</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Utilisateur
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Pays
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Âge
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Rôle
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Inscription
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Dernière Connexion
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Statistiques
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {utilisateurs.map((utilisateur) => (
                  <tr key={utilisateur._id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                          {utilisateur.prenom} {utilisateur.nom}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {utilisateur.email}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                      {utilisateur.pays}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                      {utilisateur.age} ans
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        utilisateur.role === 'admin' 
                          ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                          : 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                      }`}>
                        {utilisateur.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {formaterDate(utilisateur.dateInscription)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {formaterDate(utilisateur.derniereConnexion)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                      <div className="text-xs">
                        <div>Parties: {utilisateur.statistiques.partiesJouees}</div>
                        <div>Score: {utilisateur.statistiques.scoreTotal}</div>
                        <div>Meilleur: {utilisateur.statistiques.meilleurScore}</div>
                      </div>
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