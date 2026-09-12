import React, { createContext, useContext, useEffect, useState } from 'react';
import { translations } from '../i18n/translations';

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => {
    const saved = localStorage.getItem('wgf-portfolio-lang');
    return saved && translations[saved] ? saved : 'EN';
  });

  useEffect(() => {
    localStorage.setItem('wgf-portfolio-lang', lang);
    document.documentElement.lang = lang === 'PT' ? 'pt-PT' : lang === 'FR' ? 'fr' : 'en';
  }, [lang]);

  const t = translations[lang] || translations.EN;

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
