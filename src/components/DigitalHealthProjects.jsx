import React from 'react';
import { useTranslation } from 'react-i18next';
import styles from './DigitalHealthProjects.module.css';
import CTCModel from './CTCModel';

const DigitalHealthProjects = () => {
    const { t } = useTranslation();

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
                    <p className="max-w-2xl mx-auto text-muted text-lg leading-relaxed">
                        {t('innovation.description')}
                    </p>
                </div>

                {/* Interactive CTC Model */}
                <CTCModel />

                {/* Features List (keeping text for SEO/Accessibility, styled nicely) */}
                <div className="grid md:grid-cols-3 gap-8 mt-12">
                    <div className="p-6 rounded-xl bg-surface/50 border border-white/5 hover:border-primary/50 transition-colors">
                        <h3 className="text-xl font-bold mb-2 text-primary">Context-Aware</h3>
                        <p className="text-sm text-muted">Adapts intervention difficulty based on real-time fatigue and mood analysis.</p>
                    </div>
                    <div className="p-6 rounded-xl bg-surface/50 border border-white/5 hover:border-primary/50 transition-colors">
                        <h3 className="text-xl font-bold mb-2 text-primary">Multi-Modal</h3>
                        <p className="text-sm text-muted">Combines voice, touch, and visual cues for senior-friendly accessibility.</p>
                    </div>
                    <div className="p-6 rounded-xl bg-surface/50 border border-white/5 hover:border-primary/50 transition-colors">
                        <h3 className="text-xl font-bold mb-2 text-primary">Evidence-Based</h3>
                        <p className="text-sm text-muted">Designed based on clinical guidelines for cognitive rehabilitation.</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default DigitalHealthProjects;
