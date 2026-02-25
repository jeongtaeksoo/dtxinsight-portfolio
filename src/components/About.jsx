import React from 'react';
import { useTranslation } from 'react-i18next';

const About = () => {
    const { t } = useTranslation();
    return (
        <section id="about" className="py-16 border-t border-border">
            <div className="flex items-center gap-4 mb-10">
                <h2 className="text-3xl font-bold text-text">{t('about.title')}</h2>
                <div className="h-px flex-grow bg-gradient-to-r from-border to-transparent" />
            </div>
            <div className="grid md:grid-cols-2 gap-8">
                <p className="text-muted leading-relaxed text-sm">{t('about.description1')}</p>
                <p className="text-muted leading-relaxed text-sm">{t('about.description2')}</p>
            </div>
        </section>
    );
};

export default About;
