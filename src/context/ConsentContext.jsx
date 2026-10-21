import React, { createContext, useContext, useEffect, useState } from 'react';
import { getConsentChoice, setAnalyticsConsent } from '../lib/analytics';

const ConsentContext = createContext(null);

export function ConsentProvider({ children }) {
  // 'granted' | 'denied' | null
  const [choice, setChoice] = useState(() => getConsentChoice());
  const [showBanner, setShowBanner] = useState(() => getConsentChoice() == null);

  useEffect(() => {
    const handler = (e) => setChoice(e.detail?.granted ? 'granted' : 'denied');
    window.addEventListener('wgf-consent-change', handler);
    return () => window.removeEventListener('wgf-consent-change', handler);
  }, []);

  const accept = () => {
    setAnalyticsConsent(true);
    setChoice('granted');
    setShowBanner(false);
  };

  const decline = () => {
    setAnalyticsConsent(false);
    setChoice('denied');
    setShowBanner(false);
  };

  const openSettings = () => setShowBanner(true);

  return (
    <ConsentContext.Provider value={{ consent: choice === 'granted', choice, showBanner, accept, decline, openSettings }}>
      {children}
    </ConsentContext.Provider>
  );
}

export function useConsent() {
  return useContext(ConsentContext);
}
