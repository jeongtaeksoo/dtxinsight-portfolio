import React from 'react';
import { useTranslation } from 'react-i18next';
import { ExternalLink } from 'lucide-react';
import styles from './DigitalHealthProjects.module.css';
import CTCModel from './CTCModel';

const DigitalHealthProjects = () => {
    const { t } = useTranslation();
    const features = t('innovation.features', { returnObjects: true }) || [];

    return (
        <section id="innovation" className="py-20 bg-background relative z-10">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <span className="inline-block py-1 px-3 rounded-full bg-primary/20 text-primary text-sm font-semibold mb-4">
                        {t('innovation.label')}
                    </span>
                    <h2 className="text-3xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                        {t('innovation.title')}
                    </h2>
                    <p className="max-w-2xl mx-auto text-muted text-lg leading-relaxed mb-8">
                        {t('innovation.description')}
                    </p>

                    <a
                        href="https://hwiwasoo.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-full font-bold hover:bg-primary/80 transition-all transform hover:scale-105 shadow-lg shadow-primary/20"
                    >
                        {t('innovation.cta')}
                        <ExternalLink size={20} />
                    </a>
                </div>

                {/* Interactive CTC Model */}
                <CTCModel />

                {/* Features List - Titles Only */}
                <div className="grid md:grid-cols-3 gap-8 mt-12">
                    {features.map((feature, index) => (
                        <div key={`${feature}-${index}`} className="p-6 rounded-xl bg-surface/50 border border-white/5 hover:border-primary/50 transition-colors text-center">
                            <h3 className="text-xl font-bold text-primary">{feature}</h3>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default DigitalHealthProjects;
