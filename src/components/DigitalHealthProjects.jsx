import React from 'react';
import { useTranslation } from 'react-i18next';
import { ExternalLink } from 'lucide-react';

const features = [
    { title: 'Context-Aware',   featureKey: 0 },
    { title: 'Multi-Modal',     featureKey: 1 },
    { title: 'Evidence-Based',  featureKey: 2 },
];

const DigitalHealthProjects = () => {
    const { t } = useTranslation();
    const featureList = t('innovation.features', { returnObjects: true }) || [];

    return (
        <section id="innovation" className="py-16 bg-accent-bg rounded-2xl px-8 md:px-16">
            <div className="text-center mb-12">
                <span className="inline-block py-1 px-3 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4">
                    {t('innovation.label')}
                </span>
                <h2 className="text-3xl md:text-4xl font-bold text-text mb-4">
                    {t('innovation.title')}
                </h2>
                <p className="max-w-2xl mx-auto text-muted leading-relaxed mb-8">
                    {t('innovation.description')}
                </p>
                <a
                    href="https://hwiwasoo.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-colors shadow-sm"
                >
                    {t('innovation.cta')}
                    <ExternalLink size={18} />
                </a>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
                {features.map((f) => (
                    <div key={f.title} className="p-6 bg-surface rounded-xl border border-border hover:border-primary transition-colors text-center">
                        <h3 className="text-lg font-bold text-primary mb-2">{f.title}</h3>
                        <p className="text-sm text-muted">{featureList[f.featureKey] || ''}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default DigitalHealthProjects;
