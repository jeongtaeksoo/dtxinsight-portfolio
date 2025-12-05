import React from 'react';
import { useTranslation } from 'react-i18next';
import { ExternalLink } from 'lucide-react';
import WindowCard from './WindowCard';
import poster1 from '../assets/poster_1.jpg';
import poster2 from '../assets/poster_2.jpg';

const Publications = () => {
    const { t } = useTranslation();

    const publications = t('publications.items', { returnObjects: true }) || [];

    return (
        <section id="publications" className="py-20 bg-background relative z-10 border-t border-white/5">
            <div className="container mx-auto px-4">
                <div className="flex items-center gap-4 mb-10">
                    <h2 className="text-3xl font-bold">{t('publications.title')}</h2>
                    <div className="h-px flex-grow bg-gradient-to-r from-white/20 to-transparent"></div>

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
                                date={pub.date || pub.year}
                            >
                                <div className="flex flex-wrap items-center gap-2 mt-2">
                                    <span className={`inline-block px-2 py-1 rounded text-xs ${pub.status === 'Published' || pub.status === '게재 완료' || pub.status === '掲載完了' ? 'bg-green-500/20 text-green-400' : pub.status === 'Under Review' || pub.status === '심사 중' || pub.status === '審査中' ? 'bg-blue-500/20 text-blue-400' : 'bg-yellow-500/20 text-yellow-400'}`}>
                                        {pub.role} | {pub.status || 'Published'}
                                    </span>
                                    {pub.doi && (
                                        <a
                                            href={pub.doi}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-1 px-2 py-1 rounded text-xs bg-primary/20 text-primary hover:bg-primary/30 transition-colors"
                                        >
                                            DOI <ExternalLink size={10} />
                                        </a>
                                    )}
                                </div>
                            </WindowCard>
                        ))}
                    </div>

                    {/* Posters - Enlarged by 15-20% */}
                    <div>
                        <h3 className="text-xl font-semibold mb-4 text-muted">{t('publications.posterTitle')}</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div className="group relative aspect-[3/4] bg-surface rounded-lg overflow-hidden border border-white/10 hover:border-primary/50 transition-all cursor-pointer">
                                <img
                                    src={poster1}
                                    alt="Poster 1"
                                    className="w-full h-full object-cover transition-transform group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-4 text-center">
                                    <span className="text-sm font-bold">KOSCOPP 2024</span>
                                </div>
                            </div>
                            <div className="group relative aspect-[3/4] bg-surface rounded-lg overflow-hidden border border-white/10 hover:border-primary/50 transition-all cursor-pointer">
                                <img
                                    src={poster2}
                                    alt="Poster 2"
                                    className="w-full h-full object-cover transition-transform group-hover:scale-105"
                                />
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
