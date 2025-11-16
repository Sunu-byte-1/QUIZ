import React, { useEffect, useRef } from 'react';
import { ModeJeu, UtilisateurConnecte } from '../types';
import { 
  BookOpen, 
  Shuffle, 
  Zap, 
  Target, 
  Clock, 
  ArrowLeft, 
  Shield, 
  Trophy,
  Users,
  MapPin,
  Calendar
} from 'lucide-react';
import { gsap } from 'gsap';
import BasculeurTheme from './BasculeurTheme';

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

  const modes: { id: ModeJeu; titre: string; description: string; icone: any; bgColor: string; textColor: string }[] = [
    {
      id: 'theme',
      titre: 'Quiz par Thème',
      description: 'Choisissez un thème et testez vos connaissances',
      icone: BookOpen,
      bgColor: 'bg-blue-900 dark:bg-blue-500',
      textColor: 'text-blue-900 dark:text-blue-500'
    },
    {
      id: 'genieEnHerbe',
      titre: 'Génie en Herbe',
      description: 'Répondez le plus vite possible !',
      icone: Zap,
      bgColor: 'bg-amber-600 dark:bg-orange-500',
      textColor: 'text-amber-600 dark:text-orange-500'
    },
    {
      id: 'challenge100',
      titre: 'Challenge 100 Questions',
      description: 'Marathon de 100 questions consécutives',
      icone: Target,
      bgColor: 'bg-blue-900 dark:bg-blue-500',
      textColor: 'text-blue-900 dark:text-blue-500'
    },
    {
      id: 'douzeCoupsDeMidi',
      titre: 'Les 12 Coups de Midi',
      description: '12 questions chronométrées',
      icone: Clock,
      bgColor: 'bg-green-800 dark:bg-green-500',
      textColor: 'text-green-800 dark:text-green-500'
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
    <div className="min-h-screen bg-white dark:bg-gray-900 p-4 overflow-hidden">
      <div className="max-w-6xl mx-auto" ref={containerRef}>
        {/* Header */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-4 sm:p-8 mb-8 border border-gray-200 dark:border-gray-700" ref={headerRef}>
          <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4">
            <div className="space-y-2">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-blue-900 dark:text-blue-400">
                🎮 Sélection du Mode de Jeu
              </h1>
              <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-lg">
                Bienvenue <span className="font-semibold text-blue-900 dark:text-blue-400">{utilisateur.prenom || utilisateur.identifiant}</span> ! Choisissez votre mode de jeu
              </p>
            </div>
            <div className="flex flex-wrap gap-2 sm:gap-3 justify-center lg:justify-end">
              <BasculeurTheme />
              {utilisateur.role === 'admin' && (
                <button
                  onClick={surAdmin}
                  className="action-button btn btn-accent text-sm sm:text-base"
                >
                  <Shield className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span className="hidden sm:inline">Admin</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Grille des modes */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8" ref={cardsRef}>
          {modes.map((mode) => {
            const IconComponent = mode.icone;
            return (
              <div
                key={mode.id}
                data-mode={mode.id}
                className="card-hover"
                onClick={() => handleCardClick(mode.id)}
              >
                <div className="text-center">
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl ${mode.bgColor} text-white mb-6`}>
                    <IconComponent className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    {mode.titre}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-6">
                    {mode.description}
                  </p>
                  <div className={`inline-flex items-center gap-2 ${mode.bgColor} text-white px-6 py-3 rounded-xl font-semibold`}>
                    <Trophy className="w-5 h-5" />
                    <span>Jouer</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Statistiques rapides */}
        {false && (
          <div className="card" ref={statsRef}>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
              <Trophy className="w-6 h-6 text-amber-600 dark:text-orange-500" />
              Vos Informations
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-blue-900 dark:bg-blue-500 text-white mb-3">
                  <MapPin className="w-6 h-6" />
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Pays</p>
                <p className="font-semibold text-gray-900 dark:text-white">{utilisateur.pays}</p>
              </div>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-green-800 dark:bg-green-500 text-white mb-3">
                  <Calendar className="w-6 h-6" />
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Âge</p>
                <p className="font-semibold text-gray-900 dark:text-white">{utilisateur.age} ans</p>
              </div>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-blue-900 dark:bg-blue-500 text-white mb-3">
                  <Shield className="w-6 h-6" />
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Rôle</p>
                <p className="font-semibold text-gray-900 dark:text-white capitalize">{utilisateur.role || 'user'}</p>
              </div>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-amber-600 dark:bg-orange-500 text-white mb-3">
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