import React, { useState } from 'react';
import { User, Lock, Mail, MapPin, Calendar, UserCheck } from 'lucide-react';
import { paysListe } from '../donnees/pays';

interface PropsInscription {
  surInscription: (data: {
    email: string;
    password: string;
    prenom: string;
    nom: string;
    pays: string;
    age: number;
  }) => Promise<void>;
  surRetour: () => void;
  erreur: string;
  chargement: boolean;
}

const Inscription: React.FC<PropsInscription> = ({ 
  surInscription, 
  surRetour, 
  erreur, 
  chargement 
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [prenom, setPrenom] = useState('');
  const [nom, setNom] = useState('');
  const [pays, setPays] = useState('');
  const [age, setAge] = useState('');
  const [erreurs, setErreurs] = useState<{[key: string]: string}>({});

  const validerFormulaire = () => {
    const nouvellesErreurs: {[key: string]: string} = {};

    if (!email) nouvellesErreurs.email = 'Email requis';
    else if (!/\S+@\S+\.\S+/.test(email)) nouvellesErreurs.email = 'Email invalide';

    if (!password) nouvellesErreurs.password = 'Mot de passe requis';
    else if (password.length < 6) nouvellesErreurs.password = 'Minimum 6 caractères';

    if (password !== confirmPassword) nouvellesErreurs.confirmPassword = 'Mots de passe différents';

    if (!prenom) nouvellesErreurs.prenom = 'Prénom requis';
    if (!nom) nouvellesErreurs.nom = 'Nom requis';
    if (!pays) nouvellesErreurs.pays = 'Pays requis';
    if (!age) nouvellesErreurs.age = 'Âge requis';
    else if (parseInt(age) < 5 || parseInt(age) > 120) nouvellesErreurs.age = 'Âge entre 5 et 120 ans';

    setErreurs(nouvellesErreurs);
    return Object.keys(nouvellesErreurs).length === 0;
  };

  const gererSoumission = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validerFormulaire()) return;

    await surInscription({
      email,
      password,
      prenom,
      nom,
      pays,
      age: parseInt(age)
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-3 sm:p-4 lg:p-6 transition-all duration-500">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-4 sm:p-6 lg:p-8 w-full max-w-md mx-2 transition-colors duration-300">
        <div className="text-center mb-6 sm:mb-8">
          <div className="bg-blue-100 w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <UserCheck className="w-7 h-7 sm:w-8 sm:h-8 text-blue-600" />
          </div>
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800 dark:text-gray-100 mb-2">Créer un compte</h1>
          <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base">Rejoignez notre communauté de quiz</p>
        </div>

        <form onSubmit={gererSoumission} className="space-y-4">
          {/* Prénom et Nom */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label htmlFor="prenom" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Prénom
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  id="prenom"
                  value={prenom}
                  onChange={(e) => setPrenom(e.target.value)}
                  className={`w-full pl-10 pr-4 py-2.5 sm:py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm ${
                    erreurs.prenom ? 'border-red-300' : 'border-gray-300 dark:border-gray-600'
                  } dark:bg-gray-700 dark:text-gray-100`}
                  placeholder="Prénom"
                />
              </div>
              {erreurs.prenom && <p className="text-red-500 text-xs mt-1">{erreurs.prenom}</p>}
            </div>

            <div>
              <label htmlFor="nom" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Nom
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  id="nom"
                  value={nom}
                  onChange={(e) => setNom(e.target.value)}
                  className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm ${
                    erreurs.nom ? 'border-red-300' : 'border-gray-300 dark:border-gray-600'
                  } dark:bg-gray-700 dark:text-gray-100`}
                  placeholder="Nom"
                />
              </div>
              {erreurs.nom && <p className="text-red-500 text-xs mt-1">{erreurs.nom}</p>}
            </div>
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm ${
                  erreurs.email ? 'border-red-300' : 'border-gray-300 dark:border-gray-600'
                } dark:bg-gray-700 dark:text-gray-100`}
                placeholder="votre@email.com"
              />
            </div>
            {erreurs.email && <p className="text-red-500 text-xs mt-1">{erreurs.email}</p>}
          </div>

          {/* Pays et Âge */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label htmlFor="pays" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Pays
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <select
                  id="pays"
                  value={pays}
                  onChange={(e) => setPays(e.target.value)}
                  className={`w-full pl-10 pr-4 py-2.5 sm:py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm ${
                    erreurs.pays ? 'border-red-300' : 'border-gray-300 dark:border-gray-600'
                  } dark:bg-gray-700 dark:text-gray-100`}
                >
                  <option value="">Sélectionner un pays</option>
                  {paysListe.map((pays) => (
                    <option key={pays.code} value={pays.nom}>
                      {pays.nom}
                    </option>
                  ))}
                </select>
              </div>
              {erreurs.pays && <p className="text-red-500 text-xs mt-1">{erreurs.pays}</p>}
            </div>

            <div>
              <label htmlFor="age" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Âge
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="number"
                  id="age"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  min="5"
                  max="120"
                  className={`w-full pl-10 pr-4 py-2.5 sm:py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm ${
                    erreurs.age ? 'border-red-300' : 'border-gray-300 dark:border-gray-600'
                  } dark:bg-gray-700 dark:text-gray-100`}
                  placeholder="Âge"
                />
              </div>
              {erreurs.age && <p className="text-red-500 text-xs mt-1">{erreurs.age}</p>}
            </div>
          </div>

          {/* Mot de passe */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Mot de passe
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm ${
                  erreurs.password ? 'border-red-300' : 'border-gray-300 dark:border-gray-600'
                } dark:bg-gray-700 dark:text-gray-100`}
                placeholder="Minimum 6 caractères"
              />
            </div>
            {erreurs.password && <p className="text-red-500 text-xs mt-1">{erreurs.password}</p>}
          </div>

          {/* Confirmation mot de passe */}
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Confirmer le mot de passe
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm ${
                  erreurs.confirmPassword ? 'border-red-300' : 'border-gray-300 dark:border-gray-600'
                } dark:bg-gray-700 dark:text-gray-100`}
                placeholder="Confirmer le mot de passe"
              />
            </div>
            {erreurs.confirmPassword && <p className="text-red-500 text-xs mt-1">{erreurs.confirmPassword}</p>}
          </div>

          {erreur && (
            <div className="bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-lg p-3">
              <p className="text-red-700 dark:text-red-300 text-sm">{erreur}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={chargement}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-3 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2 min-h-[44px] sm:min-h-[48px]"
          >
            {chargement ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <UserCheck className="w-5 h-5" />
                <span>Créer mon compte</span>
              </>
            )}
          </button>

          <div className="text-center">
            <button
              type="button"
              onClick={surRetour}
              className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 text-sm underline"
            >
              Déjà un compte ? Se connecter
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Inscription; 