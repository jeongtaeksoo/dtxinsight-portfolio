import React from 'react';
import { useTranslation } from 'react-i18next';
import WindowCard from './WindowCard';
import poster1 from '../assets/poster_1.jpg';
import poster2 from '../assets/poster_2.jpg';

const Publications = () => {
    const { t } = useTranslation();

    const publications = [
        {
            title: "Development of AI-based Cognitive Training Framework",
            journal: "Frontiers in Neurology",
            year: "2024",
            role: t('publications.roles.first')
        },
        {
            title: "Digital Biomarkers for Mild Cognitive Impairment",
            journal: "MDPI Healthcare",
            year: "2023",
            role: t('publications.roles.co')
        }
    ];

    return (
        <section id="publications" className="py-20 bg-background relative z-10 border-t border-white/5">
            <div className="container mx-auto px-4">
                <div className="flex items-center gap-4 mb-10">
                    <h2 className="text-3xl font-bold">{t('publications.title')}</h2>
                    <div className="h-px flex-grow bg-gradient-to-r from-white/20 to-transparent"></div>
                    <span className="font-mono text-sm text-secondary">~/publications</span>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                    {/* Papers List */}
                    <div className="space-y-4">
                        <h3 className="text-xl font-semibold mb-4 text-muted">Journal Papers</h3>
                        {publications.map((pub, index) => (
                            <WindowCard
                                key={index}
                                title={pub.title}
                                type={pub.journal}
                                date={pub.year}
                            >
                                <span className="inline-block px-2 py-1 bg-white/10 rounded text-xs mt-2">{pub.role}</span>
                            </WindowCard>
                        ))}
                    </div>

                    {/* Posters */}
                    <div>
                        <h3 className="text-xl font-semibold mb-4 text-muted">{t('publications.posterTitle')}</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="group relative aspect-[3/4] bg-surface rounded-lg overflow-hidden border border-white/10 hover:border-primary/50 transition-all cursor-pointer">
                                <img src={poster1} alt="Poster 1" className="w-full h-full object-cover transition-transform group-hover:scale-105" />
                                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-4 text-center">
                                    <span className="text-sm font-bold">KOSCOPP 2024</span>
                                </div>
                            </div>
                            <div className="group relative aspect-[3/4] bg-surface rounded-lg overflow-hidden border border-white/10 hover:border-primary/50 transition-all cursor-pointer">
                                <img src={poster2} alt="Poster 2" className="w-full h-full object-cover transition-transform group-hover:scale-105" />
                                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-4 text-center">
                                    <span className="text-sm font-bold">ICDT 2024</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Publications;
