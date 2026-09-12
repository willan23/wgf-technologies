import React, { createContext, useContext, useEffect, useState } from 'react';
import { getAnalyticsConsent, setAnalyticsConsent } from '../lib/analytics';

const ConsentContext = createContext(null);

export function ConsentProvider({ children }) {
  const [consent, setConsent] = useState(() => getAnalyticsConsent());
  const [showBanner, setShowBanner] = useState(() => {
    try {
      return localStorage.getItem('wgf-analytics-consent') == null;
    } catch {
      return true;
    }
  });

  useEffect(() => {
    const handler = (e) => setConsent(Boolean(e.detail?.granted));
    window.addEventListener('wgf-consent-change', handler);
    return () => window.removeEventListener('wgf-consent-change', handler);
  }, []);

  const accept = () => {
    setAnalyticsConsent(true);
    setConsent(true);
    setShowBanner(false);
  };

  const decline = () => {
    setAnalyticsConsent(false);
    setConsent(false);
    setShowBanner(false);
  };

  return (
    <ConsentContext.Provider value={{ consent, showBanner, accept, decline }}>
      {children}
    </ConsentContext.Provider>
  );
}

export function useConsent() {
  return useContext(ConsentContext);
}
