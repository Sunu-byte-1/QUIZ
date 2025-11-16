import React, { useEffect, useState } from 'react';
import { Wifi, WifiOff } from 'lucide-react';

const IndicateurOffline: React.FC = () => {
  const [estEnLigne, setEstEnLigne] = useState(navigator.onLine);
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

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

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
