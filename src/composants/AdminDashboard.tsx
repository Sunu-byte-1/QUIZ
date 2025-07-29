import React, { useEffect, useRef, useState } from 'react';
import { 
  ArrowLeft, 
  Users, 
  Trophy, 
  TrendingUp, 
  Activity, 
  Globe, 
  Calendar,
  BarChart3,
  PieChart,
  LineChart,
  Target,
  Clock,
  Star,
  Award,
  UserCheck,
  UserX,
  Eye,
  EyeOff,
  Shield
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  LineChart as RechartsLineChart,
  Line,
  AreaChart,
  Area
} from 'recharts';
import { gsap } from 'gsap';

interface Utilisateur {
  id: string;
  email: string;
  prenom: string;
  nom: string;
  pays: string;
  age: number;
  role: string;
  dateInscription: string;
  derniereConnexion: string;
  statistiques: {
    quizCompletes: number;
    scoreMoyen: number;
    tempsMoyen: number;
    themesPrefere: string[];
  };
}

interface Statistiques {
  totalUtilisateurs: number;
  nouveauxUtilisateurs: number;
  utilisateursActifs: number;
  scoreMoyenGlobal: number;
  quizCompletes: number;
  tempsMoyenGlobal: number;
  repartitionPays: { pays: string; utilisateurs: number }[];
  repartitionAge: { tranche: string; utilisateurs: number }[];
  evolutionUtilisateurs: { date: string; utilisateurs: number }[];
  performanceThemes: { theme: string; scoreMoyen: number }[];
}

interface AdminDashboardProps {
  onRetour: () => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ onRetour }) => {
  const [utilisateurs, setUtilisateurs] = useState<Utilisateur[]>([]);
  const [statistiques, setStatistiques] = useState<Statistiques | null>(null);
  const [chargement, setChargement] = useState(true);
  const [erreur, setErreur] = useState('');
  const [filtrePays, setFiltrePays] = useState('Tous');
  const [filtreRole, setFiltreRole] = useState('Tous');
  const [showPassword, setShowPassword] = useState<{ [key: string]: boolean }>({});

  const containerRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const chartsRef = useRef<HTMLDivElement>(null);
  const usersRef = useRef<HTMLDivElement>(null);

  // Données mockées pour la démonstration
  const mockUtilisateurs: Utilisateur[] = [
    {
      id: '1',
      email: 'abdallahdiouf.dev@gmail.com',
      prenom: 'Abdallah',
      nom: 'Diouf',
      pays: 'Sénégal',
      age: 25,
      role: 'admin',
      dateInscription: '2024-01-15',
      derniereConnexion: '2024-01-20',
      statistiques: {
        quizCompletes: 45,
        scoreMoyen: 85,
        tempsMoyen: 120,
        themesPrefere: ['Histoire', 'Géographie', 'Science']
      }
    },
    {
      id: '2',
      email: 'marie.dubois@email.com',
      prenom: 'Marie',
      nom: 'Dubois',
      pays: 'France',
      age: 28,
      role: 'user',
      dateInscription: '2024-01-10',
      derniereConnexion: '2024-01-19',
      statistiques: {
        quizCompletes: 32,
        scoreMoyen: 78,
        tempsMoyen: 95,
        themesPrefere: ['Littérature', 'Art', 'Musique']
      }
    },
    {
      id: '3',
      email: 'john.smith@email.com',
      prenom: 'John',
      nom: 'Smith',
      pays: 'États-Unis',
      age: 30,
      role: 'user',
      dateInscription: '2024-01-08',
      derniereConnexion: '2024-01-18',
      statistiques: {
        quizCompletes: 28,
        scoreMoyen: 82,
        tempsMoyen: 110,
        themesPrefere: ['Science', 'Technologie', 'Mathématiques']
      }
    },
    {
      id: '4',
      email: 'sophie.martin@email.com',
      prenom: 'Sophie',
      nom: 'Martin',
      pays: 'Canada',
      age: 26,
      role: 'user',
      dateInscription: '2024-01-12',
      derniereConnexion: '2024-01-17',
      statistiques: {
        quizCompletes: 38,
        scoreMoyen: 75,
        tempsMoyen: 105,
        themesPrefere: ['Histoire', 'Politique', 'Économie']
      }
    },
    {
      id: '5',
      email: 'carlos.rodriguez@email.com',
      prenom: 'Carlos',
      nom: 'Rodriguez',
      pays: 'Espagne',
      age: 29,
      role: 'user',
      dateInscription: '2024-01-05',
      derniereConnexion: '2024-01-16',
      statistiques: {
        quizCompletes: 41,
        scoreMoyen: 88,
        tempsMoyen: 115,
        themesPrefere: ['Sport', 'Cinéma', 'Gastronomie']
      }
    }
  ];

  const mockStats: Statistiques = {
    totalUtilisateurs: 1250,
    nouveauxUtilisateurs: 45,
    utilisateursActifs: 890,
    scoreMoyenGlobal: 82.5,
    quizCompletes: 15420,
    tempsMoyenGlobal: 112,
    repartitionPays: [
      { pays: 'Sénégal', utilisateurs: 320 },
      { pays: 'France', utilisateurs: 280 },
      { pays: 'États-Unis', utilisateurs: 250 },
      { pays: 'Canada', utilisateurs: 180 },
      { pays: 'Espagne', utilisateurs: 120 },
      { pays: 'Autres', utilisateurs: 100 }
    ],
    repartitionAge: [
      { tranche: '18-25', utilisateurs: 450 },
      { tranche: '26-35', utilisateurs: 380 },
      { tranche: '36-45', utilisateurs: 280 },
      { tranche: '46+', utilisateurs: 140 }
    ],
    evolutionUtilisateurs: [
      { date: '2024-01-01', utilisateurs: 1000 },
      { date: '2024-01-05', utilisateurs: 1050 },
      { date: '2024-01-10', utilisateurs: 1120 },
      { date: '2024-01-15', utilisateurs: 1180 },
      { date: '2024-01-20', utilisateurs: 1250 }
    ],
    performanceThemes: [
      { theme: 'Histoire', scoreMoyen: 85 },
      { theme: 'Science', scoreMoyen: 78 },
      { theme: 'Géographie', scoreMoyen: 82 },
      { theme: 'Littérature', scoreMoyen: 75 },
      { theme: 'Sport', scoreMoyen: 88 },
      { theme: 'Art', scoreMoyen: 80 }
    ]
  };

  useEffect(() => {
    // Simuler le chargement des données
    setTimeout(() => {
      setUtilisateurs(mockUtilisateurs);
      setStatistiques(mockStats);
      setChargement(false);
    }, 1000);

    // Animations GSAP
    const tl = gsap.timeline();

    // Animation du header
    tl.fromTo(containerRef.current,
      { y: -50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
    );

    // Animation des stats cards
    tl.fromTo(statsRef.current?.children || [],
      { y: 100, opacity: 0, scale: 0.8 },
      { y: 0, opacity: 1, scale: 1, duration: 0.6, stagger: 0.1, ease: "back.out(1.7)" },
      "-=0.4"
    );

    // Animation des graphiques
    tl.fromTo(chartsRef.current?.children || [],
      { x: 100, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.8, stagger: 0.2, ease: "power2.out" },
      "-=0.3"
    );

    // Animation de la liste des utilisateurs
    tl.fromTo(usersRef.current?.children || [],
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5, stagger: 0.05, ease: "power2.out" },
      "-=0.2"
    );

  }, []);

  const couleursGraphiques = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899'];

  const utilisateursFiltres = utilisateurs.filter(user => {
    const matchPays = filtrePays === 'Tous' || user.pays === filtrePays;
    const matchRole = filtreRole === 'Tous' || user.role === filtreRole;
    return matchPays && matchRole;
  });

  const togglePasswordVisibility = (userId: string) => {
    setShowPassword(prev => ({
      ...prev,
      [userId]: !prev[userId]
    }));
  };

  if (chargement) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-300">Chargement du dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-4 overflow-auto">
      <div className="max-w-7xl mx-auto" ref={containerRef}>
        {/* Header */}
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl shadow-2xl p-8 mb-8 border border-white/20 dark:border-gray-700/50">
          <div className="flex justify-between items-center">
            <div className="space-y-2">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                🛡️ Dashboard Administrateur
              </h1>
              <p className="text-gray-600 dark:text-gray-300 text-lg">
                Gestion complète de la plateforme QUIZZZZZ
              </p>
            </div>
            <button
              onClick={onRetour}
              className="bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white px-6 py-3 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg flex items-center gap-2"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Retour</span>
            </button>
          </div>
        </div>

        {/* Statistiques principales */}
        {statistiques && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8" ref={statsRef}>
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl shadow-xl p-6 border border-white/20 dark:border-gray-700/50">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Total Utilisateurs</p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white">{statistiques.totalUtilisateurs}</p>
                </div>
                <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-xl">
                  <Users className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                </div>
              </div>
            </div>

            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl shadow-xl p-6 border border-white/20 dark:border-gray-700/50">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Nouveaux (7j)</p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white">+{statistiques.nouveauxUtilisateurs}</p>
                </div>
                <div className="bg-green-100 dark:bg-green-900/30 p-3 rounded-xl">
                  <TrendingUp className="w-8 h-8 text-green-600 dark:text-green-400" />
                </div>
              </div>
            </div>

            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl shadow-xl p-6 border border-white/20 dark:border-gray-700/50">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Score Moyen</p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white">{statistiques.scoreMoyenGlobal}%</p>
                </div>
                <div className="bg-yellow-100 dark:bg-yellow-900/30 p-3 rounded-xl">
                  <Trophy className="w-8 h-8 text-yellow-600 dark:text-yellow-400" />
                </div>
              </div>
            </div>

            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl shadow-xl p-6 border border-white/20 dark:border-gray-700/50">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Quiz Complétés</p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white">{statistiques.quizCompletes}</p>
                </div>
                <div className="bg-purple-100 dark:bg-purple-900/30 p-3 rounded-xl">
                  <Activity className="w-8 h-8 text-purple-600 dark:text-purple-400" />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Graphiques */}
        {statistiques && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8" ref={chartsRef}>
            {/* Évolution des utilisateurs */}
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl shadow-xl p-6 border border-white/20 dark:border-gray-700/50">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                <TrendingUp className="w-6 h-6 text-blue-500" />
                Évolution des Utilisateurs
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={statistiques.evolutionUtilisateurs}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="date" stroke="#6B7280" />
                  <YAxis stroke="#6B7280" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1F2937', 
                      border: 'none', 
                      borderRadius: '8px',
                      color: '#F9FAFB'
                    }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="utilisateurs" 
                    stroke="#3B82F6" 
                    fill="#3B82F6" 
                    fillOpacity={0.3}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* Répartition par pays */}
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl shadow-xl p-6 border border-white/20 dark:border-gray-700/50">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                <Globe className="w-6 h-6 text-green-500" />
                Répartition par Pays
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={statistiques.repartitionPays}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="pays" stroke="#6B7280" />
                  <YAxis stroke="#6B7280" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1F2937', 
                      border: 'none', 
                      borderRadius: '8px',
                      color: '#F9FAFB'
                    }}
                  />
                  <Bar dataKey="utilisateurs" fill="#10B981" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Performance par thème */}
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl shadow-xl p-6 border border-white/20 dark:border-gray-700/50">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                <BarChart3 className="w-6 h-6 text-purple-500" />
                Performance par Thème
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={statistiques.performanceThemes}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="theme" stroke="#6B7280" />
                  <YAxis stroke="#6B7280" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1F2937', 
                      border: 'none', 
                      borderRadius: '8px',
                      color: '#F9FAFB'
                    }}
                  />
                  <Bar dataKey="scoreMoyen" fill="#8B5CF6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Répartition par âge */}
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl shadow-xl p-6 border border-white/20 dark:border-gray-700/50">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                <PieChart className="w-6 h-6 text-pink-500" />
                Répartition par Âge
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <RechartsPieChart>
                  <Pie
                    data={statistiques.repartitionAge}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    dataKey="utilisateurs"
                    label={({ tranche, percent }) => `${tranche} ${(percent * 100).toFixed(0)}%`}
                  >
                    {statistiques.repartitionAge.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={couleursGraphiques[index % couleursGraphiques.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1F2937', 
                      border: 'none', 
                      borderRadius: '8px',
                      color: '#F9FAFB'
                    }}
                  />
                </RechartsPieChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* Filtres */}
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl shadow-xl p-6 mb-8 border border-white/20 dark:border-gray-700/50">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Filtres</h3>
          <div className="flex flex-wrap gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Pays</label>
              <select
                value={filtrePays}
                onChange={(e) => setFiltrePays(e.target.value)}
                className="bg-white/50 dark:bg-gray-700/50 border-2 border-gray-200 dark:border-gray-600 rounded-xl px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="Tous">Tous les pays</option>
                <option value="Sénégal">Sénégal</option>
                <option value="France">France</option>
                <option value="États-Unis">États-Unis</option>
                <option value="Canada">Canada</option>
                <option value="Espagne">Espagne</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Rôle</label>
              <select
                value={filtreRole}
                onChange={(e) => setFiltreRole(e.target.value)}
                className="bg-white/50 dark:bg-gray-700/50 border-2 border-gray-200 dark:border-gray-600 rounded-xl px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="Tous">Tous les rôles</option>
                <option value="admin">Admin</option>
                <option value="user">Utilisateur</option>
              </select>
            </div>
          </div>
        </div>

        {/* Liste des utilisateurs */}
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl shadow-xl p-6 border border-white/20 dark:border-gray-700/50" ref={usersRef}>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
            <Users className="w-6 h-6 text-blue-500" />
            Liste des Utilisateurs ({utilisateursFiltres.length})
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">Utilisateur</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">Pays</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">Âge</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">Rôle</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">Quiz</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">Score</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">Dernière Connexion</th>
                </tr>
              </thead>
              <tbody>
                {utilisateursFiltres.map((user) => (
                  <tr key={user.id} className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-3">
                        <div className="bg-gradient-to-br from-blue-500 to-purple-600 w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold">
                          {user.prenom.charAt(0)}{user.nom.charAt(0)}
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900 dark:text-white">{user.prenom} {user.nom}</p>
                          <div className="flex items-center space-x-2">
                            <span className="text-sm text-gray-500 dark:text-gray-400">{user.email}</span>
                            <button
                              onClick={() => togglePasswordVisibility(user.id)}
                              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                            >
                              {showPassword[user.id] ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </button>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
                        {user.pays}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-gray-900 dark:text-white">{user.age} ans</td>
                    <td className="py-4 px-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        user.role === 'admin' 
                          ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300' 
                          : 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
                      }`}>
                        {user.role === 'admin' ? <Shield className="w-3 h-3 mr-1" /> : <UserCheck className="w-3 h-3 mr-1" />}
                        {user.role}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-gray-900 dark:text-white">{user.statistiques.quizCompletes}</td>
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-2">
                        <span className="text-gray-900 dark:text-white font-semibold">{user.statistiques.scoreMoyen}%</span>
                        <div className="w-16 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-gradient-to-r from-green-500 to-blue-500 rounded-full"
                            style={{ width: `${user.statistiques.scoreMoyen}%` }}
                          />
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-sm text-gray-500 dark:text-gray-400">{user.derniereConnexion}</td>
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