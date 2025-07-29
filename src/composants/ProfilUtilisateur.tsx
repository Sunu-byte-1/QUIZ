import React, { useState } from 'react';
import { User, Mail, MapPin, Calendar, Edit, Save, X } from 'lucide-react';
import { UtilisateurConnecte } from '../types';
import { paysListe } from '../donnees/pays';

interface PropsProfilUtilisateur {
  utilisateur: UtilisateurConnecte;
  surModification: (donnees: Partial<UtilisateurConnecte>) => void;
  surRetour: () => void;
}

const ProfilUtilisateur: React.FC<PropsProfilUtilisateur> = ({ 
  utilisateur, 
  surModification, 
  surRetour 
}) => {
  const [modeEdition, setModeEdition] = useState(false);
  const [prenom, setPrenom] = useState(utilisateur.prenom || '');
  const [nom, setNom] = useState(utilisateur.nom || '');
  const [pays, setPays] = useState(utilisateur.pays || '');
  const [age, setAge] = useState(utilisateur.age?.toString() || '');
  const [erreurs, setErreurs] = useState<{[key: string]: string}>({});

  const validerFormulaire = () => {
    const nouvellesErreurs: {[key: string]: string} = {};

    if (!prenom) nouvellesErreurs.prenom = 'Prénom requis';
    if (!nom) nouvellesErreurs.nom = 'Nom requis';
    if (!pays) nouvellesErreurs.pays = 'Pays requis';
    if (!age) nouvellesErreurs.age = 'Âge requis';
    else if (parseInt(age) < 5 || parseInt(age) > 120) nouvellesErreurs.age = 'Âge entre 5 et 120 ans';

    setErreurs(nouvellesErreurs);
    return Object.keys(nouvellesErreurs).length === 0;
  };

  const gererSauvegarde = () => {
    if (!validerFormulaire()) return;

    surModification({
      prenom,
      nom,
      pays,
      age: parseInt(age)
    });
    setModeEdition(false);
  };

  const gererAnnulation = () => {
    setPrenom(utilisateur.prenom || '');
    setNom(utilisateur.nom || '');
    setPays(utilisateur.pays || '');
    setAge(utilisateur.age?.toString() || '');
    setErreurs({});
    setModeEdition(false);
  };

  const obtenirCategorieAge = (age: number): string => {
    if (age < 13) return 'Enfant (5-12 ans)';
    if (age < 18) return 'Adolescent (13-17 ans)';
    return 'Adulte (18+ ans)';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Mon Profil</h1>
          <button
            onClick={surRetour}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="space-y-4">
          {/* Email (non modifiable) */}
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
            <div className="flex items-center space-x-3">
              <Mail className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Email</p>
                <p className="font-medium text-gray-900 dark:text-gray-100">{utilisateur.identifiant}</p>
              </div>
            </div>
          </div>

          {/* Prénom et Nom */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Prénom
              </label>
              {modeEdition ? (
                <input
                  type="text"
                  value={prenom}
                  onChange={(e) => setPrenom(e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm ${
                    erreurs.prenom ? 'border-red-300' : 'border-gray-300 dark:border-gray-600'
                  } dark:bg-gray-700 dark:text-gray-100`}
                />
              ) : (
                <div className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <User className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-900 dark:text-gray-100">{utilisateur.prenom || 'Non renseigné'}</span>
                </div>
              )}
              {erreurs.prenom && <p className="text-red-500 text-xs mt-1">{erreurs.prenom}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Nom
              </label>
              {modeEdition ? (
                <input
                  type="text"
                  value={nom}
                  onChange={(e) => setNom(e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm ${
                    erreurs.nom ? 'border-red-300' : 'border-gray-300 dark:border-gray-600'
                  } dark:bg-gray-700 dark:text-gray-100`}
                />
              ) : (
                <div className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <User className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-900 dark:text-gray-100">{utilisateur.nom || 'Non renseigné'}</span>
                </div>
              )}
              {erreurs.nom && <p className="text-red-500 text-xs mt-1">{erreurs.nom}</p>}
            </div>
          </div>

          {/* Pays et Âge */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Pays
              </label>
              {modeEdition ? (
                <select
                  value={pays}
                  onChange={(e) => setPays(e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm ${
                    erreurs.pays ? 'border-red-300' : 'border-gray-300 dark:border-gray-600'
                  } dark:bg-gray-700 dark:text-gray-100`}
                >
                  <option value="">Sélectionner un pays</option>
                  {paysListe.map((paysOption) => (
                    <option key={paysOption.code} value={paysOption.nom}>
                      {paysOption.nom}
                    </option>
                  ))}
                </select>
              ) : (
                <div className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <MapPin className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-900 dark:text-gray-100">{utilisateur.pays || 'Non renseigné'}</span>
                </div>
              )}
              {erreurs.pays && <p className="text-red-500 text-xs mt-1">{erreurs.pays}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Âge
              </label>
              {modeEdition ? (
                <input
                  type="number"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  min="5"
                  max="120"
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm ${
                    erreurs.age ? 'border-red-300' : 'border-gray-300 dark:border-gray-600'
                  } dark:bg-gray-700 dark:text-gray-100`}
                />
              ) : (
                <div className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-900 dark:text-gray-100">
                    {utilisateur.age ? `${utilisateur.age} ans` : 'Non renseigné'}
                  </span>
                </div>
              )}
              {erreurs.age && <p className="text-red-500 text-xs mt-1">{erreurs.age}</p>}
            </div>
          </div>

          {/* Catégorie d'âge */}
          {utilisateur.age && (
            <div className="bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 rounded-lg p-3">
              <p className="text-sm text-blue-700 dark:text-blue-300">
                <strong>Catégorie :</strong> {obtenirCategorieAge(utilisateur.age)}
              </p>
            </div>
          )}

          {/* Boutons d'action */}
          <div className="flex space-x-3 pt-4">
            {modeEdition ? (
              <>
                <button
                  onClick={gererSauvegarde}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2"
                >
                  <Save className="w-4 h-4" />
                  <span>Sauvegarder</span>
                </button>
                <button
                  onClick={gererAnnulation}
                  className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-700 font-semibold py-2 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2"
                >
                  <X className="w-4 h-4" />
                  <span>Annuler</span>
                </button>
              </>
            ) : (
              <button
                onClick={() => setModeEdition(true)}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2"
              >
                <Edit className="w-4 h-4" />
                <span>Modifier le profil</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilUtilisateur; 