import React, { useEffect, useRef } from 'react';
import { ModeJeu, UtilisateurConnecte } from '../types';
import { 
  BookOpen, 
  Shuffle, 
  Zap, 
  Target, 
  Clock, 
  ArrowLeft, 
  User, 
  Shield, 
  LogOut,
  Trophy,
  Users,
  MapPin,
  Calendar
} from 'lucide-react';
import { gsap } from 'gsap';

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
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  const modes: { id: ModeJeu; titre: string; description: string; icone: any; couleur: string; gradient: string }[] = [
    {
      id: 'theme',
      titre: 'Quiz par Thème',
      description: 'Choisissez un thème et testez vos connaissances',
      icone: BookOpen,
      couleur: 'from-blue-500 to-blue-600',
      gradient: 'from-blue-500/20 to-blue-600/20'
    },
    {
      id: 'aleatoire',
      titre: 'Quiz Aléatoire',
      description: 'Questions mélangées de tous les thèmes',
      icone: Shuffle,
      couleur: 'from-green-500 to-green-600',
      gradient: 'from-green-500/20 to-green-600/20'
    },
    {
      id: 'genieEnHerbe',
      titre: 'Génie en Herbe',
      description: 'Répondez le plus vite possible !',
      icone: Zap,
      couleur: 'from-yellow-500 to-yellow-600',
      gradient: 'from-yellow-500/20 to-yellow-600/20'
    },
    {
      id: 'challenge100',
      titre: 'Challenge 100 Questions',
      description: 'Marathon de 100 questions consécutives',
      icone: Target,
      couleur: 'from-purple-500 to-purple-600',
      gradient: 'from-purple-500/20 to-purple-600/20'
    },
    {
      id: 'douzeCoupsDeMidi',
      titre: 'Les 12 Coups de Midi',
      description: '12 questions chronométrées',
      icone: Clock,
      couleur: 'from-red-500 to-red-600',
      gradient: 'from-red-500/20 to-red-600/20'
    }
  ];

  useEffect(() => {
    // Animation d'entrée avec GSAP
    const tl = gsap.timeline();

    // Animation du header
    tl.fromTo(headerRef.current, 
      { y: -50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
    );

    // Animation des cartes avec stagger
    tl.fromTo(cardsRef.current?.children || [],
      { y: 100, opacity: 0, scale: 0.8 },
      { 
        y: 0, 
        opacity: 1, 
        scale: 1, 
        duration: 0.6, 
        stagger: 0.1,
        ease: "back.out(1.7)"
      },
      "-=0.4"
    );

    // Animation des stats
    tl.fromTo(statsRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" },
      "-=0.3"
    );

    // Animation des boutons d'action
    tl.fromTo('.action-button',
      { x: 50, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: "power2.out" },
      "-=0.2"
    );

  }, []);

  const handleCardClick = (mode: ModeJeu) => {
    // Animation de clic
    gsap.to(`[data-mode="${mode}"]`, {
      scale: 0.95,
      duration: 0.1,
      yoyo: true,
      repeat: 1,
      onComplete: () => surSelectionMode(mode)
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-4 overflow-hidden">
      <div className="max-w-6xl mx-auto" ref={containerRef}>
        {/* Header avec animations */}
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl shadow-2xl p-4 sm:p-8 mb-8 border border-white/20 dark:border-gray-700/50" ref={headerRef}>
          <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4">
            <div className="space-y-2">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                🎮 Sélection du Mode de Jeu
              </h1>
              <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-lg">
                Bienvenue <span className="font-semibold text-blue-600 dark:text-blue-400">{utilisateur.prenom || utilisateur.identifiant}</span> ! Choisissez votre mode de jeu
              </p>
            </div>
            <div className="flex flex-wrap gap-2 sm:gap-3 justify-center lg:justify-end">
              <button
                onClick={surProfil}
                className="action-button bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white px-3 sm:px-6 py-2 sm:py-3 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg flex items-center gap-1 sm:gap-2 text-sm sm:text-base"
              >
                <User className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="hidden sm:inline">Profil</span>
              </button>
              {utilisateur.role === 'admin' && (
                <button
                  onClick={surAdmin}
                  className="action-button bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-3 sm:px-6 py-2 sm:py-3 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg flex items-center gap-1 sm:gap-2 text-sm sm:text-base"
                >
                  <Shield className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span className="hidden sm:inline">Admin</span>
                </button>
              )}
              <button
                onClick={surDeconnexion}
                className="action-button bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-3 sm:px-6 py-2 sm:py-3 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg flex items-center gap-1 sm:gap-2 text-sm sm:text-base"
              >
                <LogOut className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="hidden sm:inline">Déconnexion</span>
              </button>
            </div>
          </div>
        </div>

        {/* Grille des modes avec animations */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8" ref={cardsRef}>
          {modes.map((mode) => {
            const IconComponent = mode.icone;
            return (
              <div
                key={mode.id}
                data-mode={mode.id}
                className={`group bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl shadow-xl p-8 cursor-pointer transform transition-all duration-500 hover:scale-105 hover:shadow-2xl border border-white/20 dark:border-gray-700/50 relative overflow-hidden`}
                onClick={() => handleCardClick(mode.id)}
              >
                {/* Gradient overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${mode.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                
                <div className="relative z-10 text-center">
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${mode.couleur} text-white mb-6 transform group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 group-hover:bg-clip-text transition-all duration-300">
                    {mode.titre}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-6">
                    {mode.description}
                  </p>
                  <div className={`inline-flex items-center gap-2 bg-gradient-to-r ${mode.couleur} text-white px-6 py-3 rounded-xl font-semibold transform group-hover:scale-105 transition-all duration-300`}>
                    <Trophy className="w-5 h-5" />
                    <span>Jouer</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Statistiques rapides avec animations */}
        {utilisateur.prenom && (
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl shadow-2xl p-8 border border-white/20 dark:border-gray-700/50" ref={statsRef}>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
              <Trophy className="w-6 h-6 text-yellow-500" />
              Vos Informations
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center group">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 text-white mb-3 group-hover:scale-110 transition-transform duration-300">
                  <MapPin className="w-6 h-6" />
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Pays</p>
                <p className="font-semibold text-gray-900 dark:text-white">{utilisateur.pays}</p>
              </div>
              <div className="text-center group">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-green-600 text-white mb-3 group-hover:scale-110 transition-transform duration-300">
                  <Calendar className="w-6 h-6" />
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Âge</p>
                <p className="font-semibold text-gray-900 dark:text-white">{utilisateur.age} ans</p>
              </div>
              <div className="text-center group">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 text-white mb-3 group-hover:scale-110 transition-transform duration-300">
                  <Shield className="w-6 h-6" />
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Rôle</p>
                <p className="font-semibold text-gray-900 dark:text-white capitalize">{utilisateur.role || 'user'}</p>
              </div>
              <div className="text-center group">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-red-500 to-red-600 text-white mb-3 group-hover:scale-110 transition-transform duration-300">
                  <Users className="w-6 h-6" />
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Email</p>
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