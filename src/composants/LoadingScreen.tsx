import React, { useEffect, useRef } from 'react';
import { Sparkles, Zap, Target, Trophy } from 'lucide-react';
import { gsap } from 'gsap';

const LoadingScreen: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const iconsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ repeat: -1 });

    // Animation du logo principal
    tl.fromTo(logoRef.current,
      { scale: 0.8, rotation: -10 },
      { scale: 1, rotation: 0, duration: 1, ease: "back.out(1.7)" }
    )
    .to(logoRef.current, {
      scale: 1.1,
      duration: 0.5,
      ease: "power2.inOut"
    }, "+=0.5")
    .to(logoRef.current, {
      scale: 1,
      duration: 0.5,
      ease: "power2.inOut"
    });

    // Animation du texte
    gsap.fromTo(textRef.current,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" }
    );

    // Animation des icônes flottantes
    gsap.fromTo(iconsRef.current?.children || [],
      { y: 50, opacity: 0, scale: 0 },
      { 
        y: 0, 
        opacity: 1, 
        scale: 1, 
        duration: 0.6, 
        stagger: 0.2,
        ease: "back.out(1.7)" 
      }
    );

    // Animation continue des icônes
    gsap.to(iconsRef.current?.children || [], {
      y: -20,
      duration: 2,
      stagger: 0.1,
      ease: "power2.inOut",
      yoyo: true,
      repeat: -1
    });

  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center overflow-hidden" ref={containerRef}>
      {/* Icônes flottantes en arrière-plan */}
      <div className="absolute inset-0 pointer-events-none" ref={iconsRef}>
        <Sparkles className="absolute top-1/4 left-1/4 w-8 h-8 text-blue-400/30" />
        <Zap className="absolute top-1/3 right-1/4 w-6 h-6 text-yellow-400/30" />
        <Target className="absolute bottom-1/3 left-1/3 w-7 h-7 text-green-400/30" />
        <Trophy className="absolute bottom-1/4 right-1/3 w-8 h-8 text-purple-400/30" />
        <Sparkles className="absolute top-1/2 left-1/2 w-5 h-5 text-pink-400/30" />
      </div>

      <div className="text-center z-10">
        {/* Logo animé */}
        <div className="relative mb-8" ref={logoRef}>
          <div className="bg-gradient-to-br from-blue-500 to-purple-600 w-24 h-24 rounded-3xl flex items-center justify-center shadow-2xl mx-auto">
            <Trophy className="w-12 h-12 text-white" />
          </div>
          <div className="absolute -top-3 -right-3">
            <Sparkles className="w-8 h-8 text-yellow-500 animate-pulse" />
          </div>
        </div>

        {/* Texte de chargement */}
        <div ref={textRef}>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            QUIZZZZZ
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-xl mb-8">
            Chargement en cours...
          </p>
        </div>

        {/* Barre de progression animée */}
        <div className="w-64 h-2 bg-gray-200 dark:bg-gray-700 rounded-full mx-auto overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full animate-pulse" 
            style={{ 
              width: '60%',
              animation: 'loading 2s ease-in-out infinite'
            }} 
          />
        </div>

        {/* Points de chargement */}
        <div className="flex justify-center space-x-2 mt-6">
          <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
          <div className="w-3 h-3 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
          <div className="w-3 h-3 bg-pink-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
        </div>
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes loading {
            0%, 100% { transform: translateX(-100%); }
            50% { transform: translateX(100%); }
          }
        `
      }} />
    </div>
  );
};

export default LoadingScreen; 