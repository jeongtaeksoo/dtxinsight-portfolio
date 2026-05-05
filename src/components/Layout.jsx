import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Header from './Header';
import Contact from './Contact';

const Layout = ({ children }) => {
    const { t, i18n } = useTranslation();

    useEffect(() => {
        if (typeof document === 'undefined') {
            return;
        }

        const language = (i18n.resolvedLanguage || i18n.language || 'en').split('-')[0];
        document.documentElement.lang = language;
        document.title = t('meta.title');

        let description = document.querySelector('meta[name="description"]');
        if (!description) {
            description = document.createElement('meta');
            description.setAttribute('name', 'description');
            document.head.appendChild(description);
        }
        description.setAttribute('content', t('meta.description'));
    }, [i18n.language, i18n.resolvedLanguage, t]);

    return (
        <div className="relative min-h-screen bg-background text-text font-sans">
            <a
                href="#main-content"
                className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-text focus:shadow-lg"
            >
                {t('layout.skipToContent')}
            </a>
            <div className="flex flex-col min-h-screen">
                <Header />
                <main id="main-content" className="w-full max-w-[1200px] mx-auto flex flex-col px-4">
                    {children}
                </main>
                <Contact />
            </div>
        </div>
    );
};

export default Layout;
