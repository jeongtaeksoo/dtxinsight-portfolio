import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';

i18n
    .use(Backend)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        fallbackLng: 'en',
        debug: true, // Enable debug for development
        interpolation: {
            escapeValue: false, // React already safe from XSS
        },
        backend: {
            loadPath: '/locales/{{lng}}/translation.json',
        },
        detection: {
            order: ['queryString', 'cookie', 'localStorage', 'navigator'],
            caches: ['localStorage'],
        },
    });

export default i18n;
