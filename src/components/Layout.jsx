import React from 'react';
import { useTranslation } from 'react-i18next';
import Header from './Header';
import Contact from './Contact';

const Layout = ({ children }) => {
    const { t } = useTranslation();

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
                <main id="main-content" className="w-full max-w-[1200px] mx-auto flex flex-col gap-[120px] px-4">
                    {children}
                </main>
                <Contact />
            </div>
        </div>
    );
};

export default Layout;
