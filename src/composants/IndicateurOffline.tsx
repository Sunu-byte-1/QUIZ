import React, { useEffect, useState } from 'react';
import { Wifi, WifiOff } from 'lucide-react';

const IndicateurOffline: React.FC = () => {
  const [estEnLigne, setEstEnLigne] = useState(() => {
    // Utilise la détection précoce du window si disponible
    return (window as any).__isOffline !== undefined ? !(window as any).__isOffline : navigator.onLine;
  });
  const [afficherNotif, setAfficherNotif] = useState(false);

  useEffect(() => {
    const handleOnline = () => {
      setEstEnLigne(true);
      setAfficherNotif(true);
      const timer = setTimeout(() => setAfficherNotif(false), 5000);
      return () => clearTimeout(timer);
    };

    const handleOffline = () => {
      setEstEnLigne(false);
      setAfficherNotif(true);
      const timer = setTimeout(() => setAfficherNotif(false), 5000);
      return () => clearTimeout(timer);
    };

    // Écoute les événements standard et les événements personnalisés
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    window.addEventListener('app-online', handleOnline);
    window.addEventListener('app-offline', handleOffline);

    // Vérifier le statut initial toutes les 5 secondes sur iOS
    // (car navigator.onLine peut être incorrect sur iOS en mode hors ligne)
    const checkOnlineInterval = setInterval(() => {
      if (navigator.onLine !== estEnLigne) {
        setEstEnLigne(navigator.onLine);
        if (!navigator.onLine) {
          setAfficherNotif(true);
          setTimeout(() => setAfficherNotif(false), 5000);
        } else {
          setAfficherNotif(true);
          setTimeout(() => setAfficherNotif(false), 5000);
        }
      }
    }, 5000);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      window.removeEventListener('app-online', handleOnline);
      window.removeEventListener('app-offline', handleOffline);
      clearInterval(checkOnlineInterval);
    };
  }, [estEnLigne]);

  if (!afficherNotif) return null;

  return (
    <div className={`fixed top-4 right-4 px-4 py-2 rounded-lg flex items-center gap-2 z-40 animate-fade-in-out ${
      estEnLigne 
        ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-100' 
        : 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-100'
    }`}>
      {estEnLigne ? (
        <>
          <Wifi size={16} />
          <span className="text-sm font-medium">En ligne</span>
        </>
      ) : (
        <>
          <WifiOff size={16} />
          <span className="text-sm font-medium">Hors ligne</span>
        </>
      )}
    </div>
  );
};

export default IndicateurOffline;
