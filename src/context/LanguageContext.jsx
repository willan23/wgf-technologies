import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { translations } from '../i18n/translations';

const LanguageContext = createContext(null);

const SUPPORTED = ['PT', 'EN', 'FR'];

function normalizeLang(value) {
  if (!value) return null;
  const code = String(value).trim().toUpperCase().slice(0, 2);
  return SUPPORTED.includes(code) ? code : null;
}

function detectInitialLang() {
  try {
    const saved = normalizeLang(localStorage.getItem('wgf-portfolio-lang'));
    if (saved) return saved;
  } catch {
    /* ignore */
  }

  if (typeof navigator !== 'undefined') {
    const browser = normalizeLang(navigator.language || navigator.languages?.[0]);
    if (browser) return browser;
  }

  return 'PT';
}

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState(detectInitialLang);

  const setLang = useCallback((next) => {
    const code = normalizeLang(next);
    if (!code) return;
    setLangState(code);
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('wgf-portfolio-lang', lang);
    } catch {
      /* ignore */
    }
    document.documentElement.lang = lang === 'PT' ? 'pt-PT' : lang === 'FR' ? 'fr' : 'en';
  }, [lang]);

  const t = useMemo(() => translations[lang] || translations.PT, [lang]);

  const value = useMemo(() => ({ lang, setLang, t, languages: SUPPORTED }), [lang, setLang, t]);

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return ctx;
}
