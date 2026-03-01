import React, { createContext, useState } from 'react';
import type { ARContextType, ARSession } from '../types';

export const ARContext = createContext<ARContextType | undefined>(undefined);

export const ARProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isARSupported, setIsARSupported] = useState(false);
  const [isARJSSupported, setIsARJSSupported] = useState(false);
  const [arSession] = useState<ARSession | null>(null);
  const [markerDetected] = useState(false);
  const [error] = useState<string | null>(null);
  const [loadedModel] = useState<any>(null);

  // Check AR capability on mount
  React.useEffect(() => {
    const checkARSupport = () => {
      // Check for AR.js support (basic WebGL check)
      try {
        const canvas = document.createElement('canvas');
        const webgl = canvas.getContext('webgl') || canvas.getContext('webgl2');
        setIsARJSSupported(!!webgl);
        setIsARSupported(!!webgl);
      } catch (e) {
        setIsARJSSupported(false);
        setIsARSupported(false);
      }
    };

    checkARSupport();
  }, []);

  const value: ARContextType = {
    isARSupported,
    isARJSSupported,
    arSession,
    markerDetected,
    error,
    loadedModel,
  };

  return (
    <ARContext.Provider value={value}>
      {children}
    </ARContext.Provider>
  );
};

export const useAR = () => {
  const context = React.useContext(ARContext);
  if (!context) {
    throw new Error('useAR must be used within ARProvider');
  }
  return context;
};
