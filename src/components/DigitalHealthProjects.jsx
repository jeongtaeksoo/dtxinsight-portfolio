import React from 'react';
import { useTranslation } from 'react-i18next';
import styles from './DigitalHealthProjects.module.css';
import CTCModel from './CTCModel';

import { ExternalLink } from 'lucide-react';

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
                    <p className="max-w-2xl mx-auto text-muted text-lg leading-relaxed mb-8">
                        {t('innovation.description')}
                    </p>

                    <a
                        href="https://ctc-coach-qzujrcjvcf4g39jgr8hhsz.streamlit.app"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-gradient-to-r from-primary to-secondary text-white font-bold hover:shadow-lg hover:shadow-primary/25 transition-all transform hover:-translate-y-1"
                    >
                        {t('innovation.demoBtn')}
                        <ExternalLink size={20} />
                    </a>
                </div>

                {/* Interactive CTC Model */}
                <CTCModel />

                {/* Features List - Titles Only */}
                <div className="grid md:grid-cols-3 gap-8 mt-12">
                    <div className="p-6 rounded-xl bg-surface/50 border border-white/5 hover:border-primary/50 transition-colors text-center">
                        <h3 className="text-xl font-bold text-primary">Context-Aware</h3>
                    </div>
                    <div className="p-6 rounded-xl bg-surface/50 border border-white/5 hover:border-primary/50 transition-colors text-center">
                        <h3 className="text-xl font-bold text-primary">Multi-Modal</h3>
                    </div>
                    <div className="p-6 rounded-xl bg-surface/50 border border-white/5 hover:border-primary/50 transition-colors text-center">
                        <h3 className="text-xl font-bold text-primary">Evidence-Based</h3>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default DigitalHealthProjects;
