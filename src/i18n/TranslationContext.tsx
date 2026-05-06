import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { en } from './translations/en.ts';
import { hi } from './translations/hi.ts';
import { kn } from './translations/kn.ts';

export type Language = 'en' | 'hi' | 'kn';

interface TranslationContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (path: string) => string;
}

const translations: Record<Language, any> = {
  en,
  hi,
  kn
};

const TranslationContext = createContext<TranslationContextType | undefined>(undefined);

export const TranslationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('scamshield_lang');
    return (saved as Language) || 'en';
  });

  useEffect(() => {
    localStorage.setItem('scamshield_lang', language);
    document.documentElement.lang = language;
  }, [language]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const t = (path: string): string => {
    const keys = path.split('.');
    let current = translations[language];

    for (const key of keys) {
      if (current && typeof current === 'object' && key in current) {
        current = current[key];
      } else {
        // Fallback to English if key missing in current language
        let englishFallback = translations['en'];
        for (const fKey of keys) {
          if (englishFallback && typeof englishFallback === 'object' && fKey in englishFallback) {
            englishFallback = englishFallback[fKey];
          } else {
            return path; // Return path if not found in English either
          }
        }
        return typeof englishFallback === 'string' ? englishFallback : path;
      }
    }

    return typeof current === 'string' ? current : path;
  };

  return (
    <TranslationContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </TranslationContext.Provider>
  );
};

export const useTranslation = () => {
  const context = useContext(TranslationContext);
  if (!context) {
    throw new Error('useTranslation must be used within a TranslationProvider');
  }
  return context;
};
