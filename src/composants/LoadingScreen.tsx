import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface LoadingScreenProps {
  message?: string;
  progress?: number;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ 
  message = "Chargement en cours...", 
  progress 
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const spinnerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Animation d'entrée
    const tl = gsap.timeline();

    tl.fromTo(containerRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.5, ease: "power2.out" }
    );

    // Animation du spinner
    tl.fromTo(spinnerRef.current,
      { scale: 0, rotation: 0 },
      { 
        scale: 1, 
        rotation: 360, 
        duration: 1, 
        ease: "back.out(1.7)",
        repeat: -1,
        ease: "none"
      },
      "-=0.3"
    );

    // Animation du texte
    tl.fromTo(textRef.current,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" },
      "-=0.5"
    );

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex flex-col items-center justify-center z-50"
    >
      {/* Spinner animé */}
      <div className="relative mb-8">
        <div 
          ref={spinnerRef}
          className="w-16 h-16 sm:w-20 sm:h-20 border-4 border-blue-200 dark:border-gray-700 border-t-blue-600 dark:border-t-blue-400 rounded-full"
        />
        
        {/* Cercle de progression si progress est fourni */}
        {progress !== undefined && (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-sm sm:text-base font-semibold text-blue-600 dark:text-blue-400">
              {Math.round(progress)}%
            </span>
          </div>
        )}
      </div>

      {/* Message de chargement */}
      <div 
        ref={textRef}
        className="text-center space-y-4"
      >
        <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-800 dark:text-gray-100">
          {message}
        </h2>
        
        {/* Barre de progression si progress est fourni */}
        {progress !== undefined && (
          <div className="w-64 sm:w-80 bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
            <div 
              className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        )}

        {/* Indicateur de chargement animé */}
        <div className="flex justify-center space-x-1">
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
        </div>
      </div>

      {/* Signature SUNU-BYTE */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">
            SUNU-BYTE by Abdallah
          </p>
          <p className="text-xs text-gray-400 dark:text-gray-500">
            Quiz Application
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen; 