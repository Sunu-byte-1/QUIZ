import React, { useState, useEffect, useRef } from 'react';
import { Lock, LogIn, Mail, AlertTriangle, Heart, X, Eye, EyeOff, Sparkles } from 'lucide-react';
import BasculeurTheme from './BasculeurTheme';
import { apiService } from '../services/api';
import Inscription from './Inscription';
import { gsap } from 'gsap';

interface PropsConnexion {
  surConnexion: (identifiant: string) => void;
}

const Connexion: React.FC<PropsConnexion> = ({ surConnexion }) => {
  const [email, setEmail] = useState('');
  const [motDePasse, setMotDePasse] = useState('');
  const [erreur, setErreur] = useState('');
  const [chargement, setChargement] = useState(false);
  const [modeInscription, setModeInscription] = useState(false);
  const [showWarning, setShowWarning] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const warningRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Animation d'entrée avec GSAP
    const tl = gsap.timeline();

    // Animation du conteneur principal
    tl.fromTo(containerRef.current,
      { scale: 0.8, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.8, ease: "back.out(1.7)" }
    );

    // Animation du formulaire
    tl.fromTo(formRef.current?.children || [],
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "power2.out" },
      "-=0.4"
    );

    // Animation du warning
    if (showWarning) {
      tl.fromTo(warningRef.current,
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.5, ease: "back.out(1.7)" },
        "-=0.2"
      );
    }

  }, []);

  const gererSoumission = async (e: React.FormEvent) => {
    e.preventDefault();
    setChargement(true);
    setErreur('');

    // Animation de soumission
    gsap.to(formRef.current, {
      scale: 0.98,
      duration: 0.1,
      yoyo: true,
      repeat: 1
    });

    try {
      // Connexion via API (admin inclus)
      const response = await apiService.login(email, motDePasse);
      surConnexion(response.user.email);
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

  const handleWarningClose = () => {
    gsap.to(warningRef.current, {
      scale: 0,
      opacity: 0,
      duration: 0.3,
      ease: "back.in(1.7)",
      onComplete: () => setShowWarning(false)
    });
  };

  // Afficher le formulaire d'inscription si en mode inscription
  if (modeInscription) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-2 sm:p-4 transition-all duration-500">
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-3 sm:p-4 lg:p-6 transition-all duration-500">
      <div className="absolute top-4 right-4 z-10">
        <BasculeurTheme />
      </div>
      
      {/* Popup d'avertissement - affiché une seule fois */}
      {showWarning && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-2xl shadow-2xl max-w-md w-full p-8 relative border border-white/20 dark:border-gray-700/50" ref={warningRef}>
            {/* Bouton fermer */}
            <button
              onClick={handleWarningClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Contenu du popup */}
            <div className="text-center">
              <div className="flex items-center justify-center space-x-3 mb-6">
                <div className="p-3 rounded-full bg-yellow-100 dark:bg-yellow-900/30">
                  <AlertTriangle className="w-8 h-8 text-yellow-600 dark:text-yellow-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200">
                  Maintenance en cours
                </h3>
              </div>

              <div className="space-y-4 text-sm text-gray-600 dark:text-gray-300">
                <p>Des problèmes de connexion peuvent survenir.</p>
                <p>Nos excuses pour les désagréments.</p>
              </div>

              {/* Signature SUNU-BYTE */}
              <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-center space-x-2">
                  <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                    SUNU-BYTE by Abdallah
                  </span>
                </div>
              </div>

              {/* Bouton fermer en bas */}
              <button
                onClick={handleWarningClose}
                className="mt-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
              >
                Compris
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl shadow-2xl p-6 sm:p-8 lg:p-10 w-full max-w-md mx-2 border border-white/20 dark:border-gray-700/50" ref={containerRef}>
        <div className="text-center mb-8 sm:mb-10">
          <div className="relative mb-6">
            <div className="bg-gradient-to-br from-blue-500 to-purple-600 w-16 h-16 sm:w-20 sm:h-20 rounded-3xl flex items-center justify-center mx-auto shadow-lg">
              <LogIn className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
            </div>
            <div className="absolute -top-2 -right-2">
              <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-500 animate-pulse" />
            </div>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-3">
            QUIZZZZZ
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-base sm:text-lg">Connectez-vous pour commencer le quiz</p>
        </div>

        <form onSubmit={gererSoumission} className="space-y-5 sm:space-y-6" ref={formRef}>
          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
              Email
            </label>
            <div className="relative group">
              <Mail className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 sm:pl-12 pr-4 py-3 sm:py-4 border-2 border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-sm sm:text-base bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm"
                placeholder="Entrez votre email"
                required
                autoComplete="email"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="motDePasse" className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
              Mot de passe
            </label>
            <div className="relative group">
              <Lock className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
              <input
                type={showPassword ? "text" : "password"}
                id="motDePasse"
                value={motDePasse}
                onChange={(e) => setMotDePasse(e.target.value)}
                className="w-full pl-10 sm:pl-12 pr-10 sm:pr-12 py-3 sm:py-4 border-2 border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-sm sm:text-base bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm"
                placeholder="Entrez votre mot de passe"
                required
                autoComplete="current-password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 sm:right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors p-1"
              >
                {showPassword ? <EyeOff className="w-4 h-4 sm:w-5 sm:h-5" /> : <Eye className="w-4 h-4 sm:w-5 sm:h-5" />}
              </button>
            </div>
          </div>

          {/* Message d'erreur dans le formulaire */}
          {erreur && (
            <div className="bg-red-50 dark:bg-red-900/30 border-2 border-red-200 dark:border-red-800 rounded-xl p-4">
              <div className="flex items-center space-x-3">
                <AlertTriangle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0" />
                <p className="text-red-700 dark:text-red-300 text-sm font-medium">{erreur}</p>
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={chargement}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold py-3 sm:py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl disabled:transform-none disabled:shadow-none flex items-center justify-center space-x-2 sm:space-x-3 text-base sm:text-lg min-h-[44px] sm:min-h-[48px]"
          >
            {chargement ? (
              <div className="w-5 h-5 sm:w-6 sm:h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <LogIn className="w-5 h-5 sm:w-6 sm:h-6" />
                <span>Se connecter</span>
              </>
            )}
          </button>

          <div className="text-center">
            <button
              type="button"
              onClick={() => setModeInscription(true)}
              className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 text-sm font-medium underline hover:no-underline transition-all duration-300"
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