import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ExternalLink, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import WindowCard from './WindowCard';
import poster1 from '../assets/poster_1.jpg';
import poster2 from '../assets/poster_2.jpg';
import poster3 from '../assets/poster_3.png';

const Publications = () => {
    const { t } = useTranslation();
    const [selectedPoster, setSelectedPoster] = useState(null);

    const publications = t('publications.items', { returnObjects: true }) || [];

    const posters = [
        { id: 1, src: poster1, title: 'KOSCOPP 2024' },
        { id: 2, src: poster2, title: 'ICDT 2024' },
        { id: 3, src: poster3, title: 'E-Poster-Park-AI DRIVEN COGNITIVE' }
    ];

    return (
        <section id="publications" className="py-20 bg-background relative z-10 border-t border-white/5">
            <div className="container mx-auto px-4">
                <div className="flex items-center gap-4 mb-10">
                    <h2 className="text-3xl font-bold">{t('publications.title')}</h2>
                    <div className="h-px flex-grow bg-gradient-to-r from-white/20 to-transparent"></div>
                </div>

                <div className="grid lg:grid-cols-2 gap-12">
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

                    {/* Posters */}
                    <div>
                        <h3 className="text-xl font-semibold mb-6 text-muted">{t('publications.posterTitle')}</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            {posters.map((poster) => (
                                <motion.div
                                    key={poster.id}
                                    layoutId={`poster-${poster.id}`}
                                    onClick={() => setSelectedPoster(poster)}
                                    className="group relative aspect-[3/4] bg-surface rounded-lg overflow-hidden border border-white/10 hover:border-primary/50 transition-all cursor-pointer"
                                >
                                    <img
                                        src={poster.src}
                                        alt={poster.title}
                                        className="w-full h-full object-cover transition-transform group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-4 text-center">
                                        <span className="text-xs font-bold">{poster.title}</span>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Poster Modal */}
            <AnimatePresence>
                {selectedPoster && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10 pointer-events-none">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedPoster(null)}
                            className="absolute inset-0 bg-black/90 backdrop-blur-sm pointer-events-auto"
                        />
                        <motion.div
                            layoutId={`poster-${selectedPoster.id}`}
                            className="relative z-10 w-full max-w-4xl max-h-full aspect-[3/4] bg-surface rounded-xl overflow-hidden shadow-2xl pointer-events-auto"
                        >
                            <img
                                src={selectedPoster.src}
                                alt={selectedPoster.title}
                                className="w-full h-full object-contain"
                            />
                            <button
                                onClick={() => setSelectedPoster(null)}
                                className="absolute top-4 right-4 p-2 bg-black/50 hover:bg-black/80 rounded-full text-white transition-colors"
                            >
                                <X size={24} />
                            </button>
                            <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-black/80 to-transparent text-white text-center">
                                <h4 className="font-bold">{selectedPoster.title}</h4>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </section>
    );
};

export default Publications;
